import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepCreditScoreProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepCreditScore = ({ form }: StepCreditScoreProps) => {
  const creditScoreOptions = [
    { value: "poor", label: "Below 600 (Poor)", color: "bg-red-100 text-red-800" },
    { value: "average", label: "600 - 700 (Average)", color: "bg-orange-100 text-orange-800" },
    { value: "good", label: "700 - 750 (Good)", color: "bg-yellow-100 text-yellow-800" },
    { value: "excellent", label: "Above 750 (Excellent)", color: "bg-green-100 text-green-800" },
    { value: "unknown", label: "I don't know", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          5. What's your credit score?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="personalInfo.creditScore"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid space-y-4">
                {creditScoreOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={field.value === option.value ? "default" : "secondary"}
                    className="flex w-full items-center justify-start md:w-60"
                    onClick={() => field.onChange(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
