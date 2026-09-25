import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepLoungeAccessProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepLoungeAccess = ({ form }: StepLoungeAccessProps) => {
  const watchedLounge = form.watch("lifestyle.loungeAccess");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          16. Do you value airport lounge access?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.loungeAccess"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Typography.Heading variant="lg">
                    Airport lounge access is important
                  </Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    {watchedLounge
                      ? "We'll prioritize cards with complimentary lounge access"
                      : "We'll focus on other benefits instead"}
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
