import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepWrapperProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
  children: ReactNode;
}

export const StepWrapper = ({
  form,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isSubmitting = false,
  children,
}: StepWrapperProps) => {
  return (
    <div className="mx-auto mb-40 w-full max-w-6xl">
      <Card className="border-none bg-transparent p-0 shadow-transparent">
        <CardContent className="border-none p-0 shadow-none">
          <Form {...form}>
            <form className="space-y-8">
              {/* Step Content */}
              <div className="min-h-[600px]">{children}</div>

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
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                  </div>

                  <Button
                    type="button"
                    onClick={onNext}
                    disabled={!canGoNext || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {currentStep === totalSteps - 1 ? (
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
