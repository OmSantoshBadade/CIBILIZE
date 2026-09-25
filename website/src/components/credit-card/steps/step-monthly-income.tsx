import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import Typography from "@/components/ui/typography";
import { formatINRShort } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";
import { Input } from "@/components/ui/input";

interface StepMonthlyIncomeProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepMonthlyIncome = ({ form }: StepMonthlyIncomeProps) => {
  const income = form.watch("personalInfo.monthlyIncome") || 0;
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          2. What's your monthly income?
        </Typography.Heading>
        <Input
          id="monthlyIncome"
          inputMode="numeric"
          variant="shaded"
          {...form.register("personalInfo.monthlyIncome", {
            valueAsNumber: true,
            onChange: (e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                form.setValue("personalInfo.monthlyIncome", value);
              }
            },
          })}
          className="w-64"
          placeholder="0"
        />
      </div>

      <FormField
        control={form.control}
        name="personalInfo.monthlyIncome"
        render={({ field }) => (
          <FormItem>
            <Slider
              min={0}
              max={1000000}
              step={1000}
              value={[field.value || 0]}
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
