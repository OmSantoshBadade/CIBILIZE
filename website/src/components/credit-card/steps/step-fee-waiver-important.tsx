import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepFeeWaiverImportantProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepFeeWaiverImportant = ({ form }: StepFeeWaiverImportantProps) => {
  const watchedFeeWaiver = form.watch("feePreference.feeWaiverImportant");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          22. Are fee waiver conditions important to you?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="feePreference.feeWaiverImportant"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Typography.Heading variant="lg">
                    Fee waiver conditions are important
                  </Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    {watchedFeeWaiver
                      ? "We'll prioritize cards where fees can be waived with spending"
                      : "We'll focus on overall value regardless of fee waiver conditions"}
                  </Typography.SubHeading>
                </div>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
