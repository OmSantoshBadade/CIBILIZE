import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepDiningFrequencyProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepDiningFrequency = ({ form }: StepDiningFrequencyProps) => {
  const frequencyOptions = [
    { value: "rarely", label: "Rarely", desc: "Once a month or less" },
    { value: "weekly", label: "Weekly", desc: "1-3 times per week" },
    { value: "daily", label: "Daily", desc: "Almost every day" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          18. How often do you dine out?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.diningFrequency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {frequencyOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={field.value === option.value ? "default" : "secondary"}
                    className="flex w-full items-center justify-start py-8"
                    onClick={() => field.onChange(option.value)}
                  >
                    <div className="text-left">
                      <Typography.SubHeading variant="md" className="text-primary">
                        {option.label}
                      </Typography.SubHeading>
                      <Typography.SubHeading variant="sm">{option.desc}</Typography.SubHeading>
                    </div>
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
