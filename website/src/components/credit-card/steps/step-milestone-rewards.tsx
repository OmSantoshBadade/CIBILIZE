import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepMilestoneRewardsProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepMilestoneRewards = ({ form }: StepMilestoneRewardsProps) => {
  const watchedMilestone = form.watch("benefitPreferences.milestoneRewards");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          13. Do you like milestone-based rewards?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="benefitPreferences.milestoneRewards"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Typography.Heading variant="lg">
                    I like milestone-based rewards
                  </Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    {watchedMilestone
                      ? "Great! We'll prioritize cards with spending targets and bonus rewards"
                      : "We'll focus on cards with consistent earning rates instead"}
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
