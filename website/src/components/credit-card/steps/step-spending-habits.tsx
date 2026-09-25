import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";
import { SpendingHabitsStep } from "./spending-habits-step";
import { StepWrapper } from "./step-wrapper";

interface StepSpendingHabitsProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepSpendingHabits = ({
  form,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: StepSpendingHabitsProps) => {
  return (
    <StepWrapper
      form={form}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrevious={onPrevious}
      canGoNext={canGoNext}
      canGoPrevious={canGoPrevious}
      isSubmitting={isSubmitting}
    >
      <SpendingHabitsStep form={form} />
    </StepWrapper>
  );
};
