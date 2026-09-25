import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepMonthlySpendProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepMonthlySpend = ({ form }: StepMonthlySpendProps) => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <Typography.Heading variant="2xl" className="font-semibold">
          7. How much do you spend monthly on credit cards?
        </Typography.Heading>

        <div className="relative">
          <Input
            id="monthlySpend"
            inputMode="numeric"
            variant="shaded"
            {...form.register("spendingHabits.monthlySpend", {
              valueAsNumber: true,
              onChange: (e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                  form.setValue("spendingHabits.monthlySpend", value);
                }
              },
            })}
            className="w-full pl-10 md:w-60"
            placeholder="50000"
          />

          <div className="absolute top-1/2 left-3 -translate-y-1/2">
            <svg
              height="14"
              width="14"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
            >
              <path
                className="text-primary/75 fill-current"
                d="M318.213,66.588h107.818L465.37,0H85.969L46.63,66.588h145.727c32.137,9.476,58.259,28.504,72.702,52.656
                  H85.969l-39.34,66.588h227.316c-13.482,45.473-65.618,79.365-127.924,79.365H68.313v60.013L288.818,512h96.012v-23.222
                  L183.333,321.936c84.557-3.351,153.634-61.218,166.283-136.105h76.415l39.339-66.588H345.687
                  C340.062,100.028,330.637,82.256,318.213,66.588z"
              />
            </svg>
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="spendingHabits.monthlySpend"
        render={({ field }) => (
          <FormItem>
            <Slider
              min={5000}
              max={200000}
              step={1}
              value={[field.value || 25000]}
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
