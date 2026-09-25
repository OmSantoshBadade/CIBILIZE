import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../lib/api";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  clearAuth: () => void;
  reset: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => {
        const currentState = get();
        // Only update if user actually changed
        if (currentState.user?.id !== user?.id) {
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          });
        }
      },

      setToken: (token) => {
        Cookies.set("auth_token", token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        set({
          error: null,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      clearAuth: () => {
        Cookies.remove("auth_token");
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      reset: () => set(initialState),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
