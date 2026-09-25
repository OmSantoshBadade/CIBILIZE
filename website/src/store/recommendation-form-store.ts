import { RecommendationFormData } from "@/components/credit-card/recommendation-form-schema";
import { ScoredCard } from "@/lib/credit-card-scoring";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FormProgress {
  currentStep: number;
  completedSteps: number[];
  formData: Partial<RecommendationFormData>;
  lastUpdated: string;
}

interface RecommendationResult {
  id: string;
  formData: RecommendationFormData;
  recommendations: ScoredCard[];
  timestamp: string;
  sessionId: string;
}

interface RecommendationFormStore {
  // Form progress state
  progress: FormProgress;

  // Actions for form progress
  setCurrentStep: (step: number) => void;
  addCompletedStep: (step: number) => void;
  updateFormData: (stepData: Partial<RecommendationFormData>) => void;
  resetProgress: () => void;
  resetAll: () => Promise<void>;

  // Actions for recommendations
  saveRecommendation: (
    formData: RecommendationFormData,
    recommendations: ScoredCard[],
  ) => Promise<string>;
  getLatestRecommendation: () => Promise<RecommendationResult | null>;
  getRecommendationById: (id: string) => Promise<RecommendationResult | null>;

  // Utility actions
  hasStoredProgress: () => boolean;
  getStoredProgress: () => FormProgress | null;
}

// IndexedDB utilities
const DB_NAME = "CibilizeRecommendations";
const DB_VERSION = 1;
const STORE_NAME = "recommendations";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("timestamp", "timestamp", { unique: false });
        store.createIndex("sessionId", "sessionId", { unique: false });
      }
    };
  });
};

const saveToIndexedDB = async (recommendation: RecommendationResult): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.add(recommendation);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

  } catch (error) {
    console.error("Error saving to IndexedDB:", error);
    throw error;
  }
};

const getFromIndexedDBById = async (id: string): Promise<RecommendationResult | null> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    return await new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error reading recommendation by id from IndexedDB:", error);
    return null;
  }
};

const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const generateRecommendationId = (): string => {
  return `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const initialProgress: FormProgress = {
  currentStep: 0,
  completedSteps: [],
  formData: {},
  lastUpdated: new Date().toISOString(),
};

export const useRecommendationFormStore = create<RecommendationFormStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      setCurrentStep: (step: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            currentStep: step,
            lastUpdated: new Date().toISOString(),
          },
        }));
      },

      addCompletedStep: (step: number) => {
        set((state) => {
          const completedSteps = state.progress.completedSteps.includes(step)
            ? state.progress.completedSteps
            : [...state.progress.completedSteps, step];

          return {
            progress: {
              ...state.progress,
              completedSteps,
              lastUpdated: new Date().toISOString(),
            },
          };
        });
      },

      updateFormData: (stepData: Partial<RecommendationFormData>) => {
        set((state) => ({
          progress: {
            ...state.progress,
            formData: {
              ...state.progress.formData,
              ...stepData,
            },
            lastUpdated: new Date().toISOString(),
          },
        }));
      },

      resetProgress: () => {
        set({ progress: initialProgress });
      },

      resetAll: async () => {
        try {
          await clearIndexedDBData();
        } catch (e) {
          // ignore IndexedDB errors during reset
        }
        try {
          localStorage.removeItem("recommendation-form-storage");
          localStorage.removeItem("creditCardResults");
        } catch (e) {
          // ignore localStorage errors during reset
        }
        set({ progress: initialProgress });
      },

      saveRecommendation: async (
        formData: RecommendationFormData,
        recommendations: ScoredCard[],
      ) => {
        const recommendationResult: RecommendationResult = {
          id: generateRecommendationId(),
          formData,
          recommendations,
          timestamp: new Date().toISOString(),
          sessionId: generateSessionId(),
        };

        try {
          // Save to IndexedDB
          await saveToIndexedDB(recommendationResult);

          // Clear localStorage after successful save
          get().resetProgress();

          return recommendationResult.id;
        } catch (error) {
          console.error("Failed to save recommendation:", error);
          throw error;
        }
      },

      hasStoredProgress: () => {
        const { progress } = get();
        return progress.completedSteps.length > 0 || Object.keys(progress.formData).length > 0;
      },

      getStoredProgress: () => {
        const { progress } = get();
        return progress;
      },

      getLatestRecommendation: async () => {
        try {
          const recommendations = await getRecommendationsFromIndexedDB();
          if (recommendations.length === 0) return null;

          // Sort by timestamp descending and return the latest
          const sortedRecommendations = recommendations.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          );

          return sortedRecommendations[0];
        } catch (error) {
          console.error("Error getting latest recommendation:", error);
          return null;
        }
      },

      getRecommendationById: async (id: string) => {
        try {
          return await getFromIndexedDBById(id);
        } catch (error) {
          console.error("Error getting recommendation by id:", error);
          return null;
        }
      },
    }),
    {
      name: "recommendation-form-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ progress: state.progress }),
    },
  ),
);

// Export utility functions for accessing IndexedDB data
export const getRecommendationsFromIndexedDB = async (): Promise<RecommendationResult[]> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error reading from IndexedDB:", error);
    return [];
  }
};

export const clearIndexedDBData = async (): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise<void>((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

  } catch (error) {
    console.error("Error clearing IndexedDB:", error);
    throw error;
  }
};
