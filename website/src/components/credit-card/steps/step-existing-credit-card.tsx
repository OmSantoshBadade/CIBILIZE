import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepExistingCreditCardProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepExistingCreditCard = ({ form }: StepExistingCreditCardProps) => {
  const watchedExistingCard = form.watch("personalInfo.existingCreditCard");

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          4. Do you have existing credit cards?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="personalInfo.existingCreditCard"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Typography.Heading variant="lg">I have existing credit cards</Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    {watchedExistingCard
                      ? "Great! This helps with credit history and approval chances"
                      : "No worries, we'll find beginner-friendly options for you"}
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
