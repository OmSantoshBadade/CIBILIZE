import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";
import { FeePreferenceStep } from "./fee-preference-step";
import { StepWrapper } from "./step-wrapper";

interface StepFeePreferenceProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepFeePreference = ({
  form,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: StepFeePreferenceProps) => {
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
      <FeePreferenceStep form={form} />
    </StepWrapper>
  );
};
