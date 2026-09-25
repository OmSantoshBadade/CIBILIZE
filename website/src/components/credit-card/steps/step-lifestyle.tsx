import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";
import { LifestyleStep } from "./lifestyle-step";
import { StepWrapper } from "./step-wrapper";

interface StepLifestyleProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepLifestyle = ({
  form,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: StepLifestyleProps) => {
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
      <LifestyleStep form={form} />
    </StepWrapper>
  );
};
