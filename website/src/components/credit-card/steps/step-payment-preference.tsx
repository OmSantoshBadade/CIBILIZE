import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepPaymentPreferenceProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepPaymentPreference = ({ form }: StepPaymentPreferenceProps) => {
  const paymentPreferences = [
    { value: "online", label: "Primarily Online" },
    { value: "offline", label: "Primarily Offline" },
    { value: "mixed", label: "Mixed" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          8. How do you prefer to make payments?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="spendingHabits.paymentPreference"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid space-y-4">
                {paymentPreferences.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={field.value === option.value ? "default" : "secondary"}
                    className="flex w-full items-center justify-start md:w-60"
                    onClick={() => field.onChange(option.value)}
                  >
                    {option.label}
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
