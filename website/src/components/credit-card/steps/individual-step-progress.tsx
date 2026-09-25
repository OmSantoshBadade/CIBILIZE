import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface IndividualStepProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export const IndividualStepProgress = ({
  currentStep,
  totalSteps,
  completedSteps,
}: IndividualStepProgressProps) => {
  const steps = [
    { id: 0, name: "Age" },
    { id: 1, name: "Income" },
    { id: 2, name: "Occupation" },
    { id: 3, name: "Credit Cards" },
    { id: 4, name: "Credit Score" },
    { id: 5, name: "Spending" },
    { id: 6, name: "Benefits" },
    { id: 7, name: "Lifestyle" },
    { id: 8, name: "Fees" },
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isPast = step.id < currentStep;

              return (
                <div key={step.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : isCurrent ? (
                      <Circle className="h-4 w-4 fill-blue-600 text-blue-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        isCurrent
                          ? "text-blue-600"
                          : isCompleted
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-px w-4 ${isPast ? "bg-green-600" : "bg-gray-300"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <Badge variant="outline" className="text-sm">
            Step {currentStep + 1} of {totalSteps}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
