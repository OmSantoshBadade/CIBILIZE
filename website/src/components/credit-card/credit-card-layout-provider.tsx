import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface Step {
  id: number | string;
  name?: string;
  field?: string;
  title?: string;
  description?: string;
}

interface CreditCardLayoutContextType {
  currentStepIndex: number;
  setCurrentStepIndex: (step: number) => void;
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
  addCompletedStep: (step: number) => void;
  removeCompletedStep: (step: number) => void;
  isStepCompleted: (step: number) => boolean;
  getTotalSteps: () => number;
  getCompletedStepsCount: () => number;
  getProgressPercentage: () => number;
}

const CreditCardLayoutContext = createContext<CreditCardLayoutContextType | undefined>(undefined);

interface CreditCardLayoutProviderProps {
  children: ReactNode;
  initialSteps?: Step[];
  initialCurrentStep?: number;
  initialCompletedSteps?: number[];
}

export const CreditCardLayoutProvider = ({
  children,
  initialSteps = [],
  initialCurrentStep = 0,
  initialCompletedSteps = [],
}: CreditCardLayoutProviderProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialCurrentStep);
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [completedSteps, setCompletedSteps] = useState<number[]>(initialCompletedSteps);

  const addCompletedStep = useCallback((step: number) => {
    setCompletedSteps((prev) => {
      if (!prev.includes(step)) {
        return [...prev, step];
      }
      return prev;
    });
  }, []);

  const removeCompletedStep = useCallback((step: number) => {
    setCompletedSteps((prev) => prev.filter((s) => s !== step));
  }, []);

  const isStepCompleted = useCallback(
    (step: number) => {
      return completedSteps.includes(step);
    },
    [completedSteps],
  );

  const getTotalSteps = useCallback(() => {
    return steps.length;
  }, [steps]);

  const getCompletedStepsCount = useCallback(() => {
    return completedSteps.length;
  }, [completedSteps]);

  const getProgressPercentage = useCallback(() => {
    if (steps.length === 0) return 0;
    return Math.round((completedSteps.length / steps.length) * 100);
  }, [completedSteps.length, steps.length]);

  const value: CreditCardLayoutContextType = {
    currentStepIndex,
    setCurrentStepIndex,
    steps,
    setSteps,
    completedSteps,
    setCompletedSteps,
    addCompletedStep,
    removeCompletedStep,
    isStepCompleted,
    getTotalSteps,
    getCompletedStepsCount,
    getProgressPercentage,
  };

  return (
    <CreditCardLayoutContext.Provider value={value}>{children}</CreditCardLayoutContext.Provider>
  );
};

export const useCreditCardLayout = () => {
  const context = useContext(CreditCardLayoutContext);
  if (context === undefined) {
    throw new Error("useCreditCardLayout must be used within a CreditCardLayoutProvider");
  }
  return context;
};
