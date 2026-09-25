import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepAgeProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
  isFinalStep?: boolean;
}

export const StepAge = ({ form }: StepAgeProps) => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          1. What's your age?
        </Typography.Heading>

        <Input
          id="tenure"
          inputMode="numeric"
          variant="shaded"
          {...form.register("personalInfo.age", {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                form.setValue("personalInfo.age", value);
              }
            },
          })}
          className="w-20"
          placeholder="5"
        />
      </div>

      <FormField
        control={form.control}
        name="personalInfo.age"
        render={({ field }) => (
          <FormItem>
            <Slider
              min={18}
              max={65}
              step={1}
              value={[field.value || 25]}
              onValueChange={(value) => field.onChange(value[0])}
              className="w-full"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
