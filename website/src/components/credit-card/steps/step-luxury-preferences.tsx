import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepLuxuryPreferencesProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepLuxuryPreferences = ({ form }: StepLuxuryPreferencesProps) => {
  const watchedLuxury = form.watch("lifestyle.luxuryPreferences");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          20. Do you enjoy luxury shopping?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.luxuryPreferences"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Typography.Heading variant="lg">
                    I enjoy luxury shopping and premium experiences
                  </Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    {watchedLuxury
                      ? "We'll prioritize premium cards with luxury brand partnerships"
                      : "We'll focus on everyday value and practical benefits"}
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
