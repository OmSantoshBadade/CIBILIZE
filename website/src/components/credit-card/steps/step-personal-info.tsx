import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";
import { PersonalInfoStep } from "./personal-info-step";
import { StepWrapper } from "./step-wrapper";

interface StepPersonalInfoProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepPersonalInfo = ({
  form,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: StepPersonalInfoProps) => {
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
      <PersonalInfoStep form={form} />
    </StepWrapper>
  );
};
