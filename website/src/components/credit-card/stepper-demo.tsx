import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { CreditCardStepper } from "./credit-card-stepper";

export const StepperDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [completedSubsteps, setCompletedSubsteps] = useState(0);
  const totalSteps = 5;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
      setCompletedSubsteps(0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCompletedSubsteps(0);
    }
  };

  const handleNextSubstep = () => {
    const maxSubsteps = [5, 5, 4, 7, 4][currentStep]; // Substeps for each step
    if (completedSubsteps < maxSubsteps) {
      setCompletedSubsteps(completedSubsteps + 1);
    }
  };

  const handlePreviousSubstep = () => {
    if (completedSubsteps > 0) {
      setCompletedSubsteps(completedSubsteps - 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setCompletedSubsteps(0);
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Credit Card Stepper Demo</CardTitle>
          <CardDescription>
            Interactive demo showing the stepper with substep progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stepper Component */}
          <CreditCardStepper
            currentStep={currentStep}
            completedSteps={completedSteps}
            totalSteps={totalSteps}
            completedSubsteps={completedSubsteps}
          />

          {/* Demo Controls */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePreviousStep} disabled={currentStep === 0}>
              Previous Step
            </Button>
            <Button onClick={handleNextStep} disabled={currentStep === totalSteps - 1}>
              Next Step
            </Button>
            <Button
              onClick={handlePreviousSubstep}
              disabled={completedSubsteps === 0}
              variant="outline"
            >
              Previous Substep
            </Button>
            <Button
              onClick={handleNextSubstep}
              disabled={completedSubsteps >= [5, 5, 4, 7, 4][currentStep]}
              variant="outline"
            >
              Next Substep
            </Button>
            <Button onClick={resetDemo} variant="destructive">
              Reset Demo
            </Button>
          </div>

          {/* Current State Display */}
          <div className="text-muted-foreground text-sm">
            <p>Current Step: {currentStep + 1}</p>
            <p>Completed Steps: {completedSteps.join(", ") || "None"}</p>
            <p>Completed Substeps: {completedSubsteps}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
