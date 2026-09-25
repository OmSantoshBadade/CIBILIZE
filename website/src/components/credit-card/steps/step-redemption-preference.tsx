import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Banknote, CreditCard, Gift, Plane, Ticket } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepRedemptionPreferenceProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepRedemptionPreference = ({ form }: StepRedemptionPreferenceProps) => {
  const redemptionOptions = [
    {
      value: "direct_cashback",
      label: "Direct Cashback",
      icon: Banknote,
      desc: "Money credited to account",
    },
    {
      value: "travel_bookings",
      label: "Travel Bookings",
      icon: Plane,
      desc: "Flight/hotel bookings",
    },
    {
      value: "vouchers",
      label: "Shopping Vouchers",
      icon: Ticket,
      desc: "Brand vouchers & gift cards",
    },
    {
      value: "gift_cards",
      label: "Gift Cards",
      icon: Gift,
      desc: "Amazon, Flipkart gift cards",
    },
    {
      value: "statement_credit",
      label: "Statement Credit",
      icon: CreditCard,
      desc: "Reduce outstanding balance",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          13. How do you prefer to redeem your rewards?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="benefitPreferences.redemptionPreference"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {redemptionOptions.map((option) => {
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={field.value === option.value ? "default" : "secondary"}
                      className="flex w-full items-center justify-start py-8"
                      onClick={() => field.onChange(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        <option.icon className="size-6" />
                        <div className="text-left">
                          <Typography.SubHeading variant="md" className="text-primary">
                            {option.label}
                          </Typography.SubHeading>
                          <Typography.SubHeading variant="sm">{option.desc}</Typography.SubHeading>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
