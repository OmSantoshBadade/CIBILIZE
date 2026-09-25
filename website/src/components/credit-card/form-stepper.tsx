import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const FormStepper = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
}: FormStepperProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || isSubmitting}
          className="flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? (
            isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Getting Recommendations...
              </>
            ) : (
              "Get Recommendations"
            )
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
