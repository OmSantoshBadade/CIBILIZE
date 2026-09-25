import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepGolfInterestProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepGolfInterest = ({ form }: StepGolfInterestProps) => {
  const watchedGolf = form.watch("lifestyle.golfInterest");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          17. Are you interested in golf privileges?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.golfInterest"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Typography.Heading variant="lg">
                    I'm interested in golf privileges
                  </Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    {watchedGolf
                      ? "We'll look for cards with golf course access and discounts"
                      : "We'll focus on other lifestyle benefits"}
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
