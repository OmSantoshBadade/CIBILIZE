import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Award, Banknote, CreditCard } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepRewardTypeProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepRewardType = ({ form }: StepRewardTypeProps) => {
  const rewardTypeOptions = [
    {
      value: "cashback",
      label: "Cashback",
      icon: Banknote,
      desc: "Direct money credited to account",
    },
    {
      value: "points",
      label: "Reward Points",
      icon: Award,
      desc: "Points that can be redeemed flexibly",
    },
    {
      value: "no_preference",
      label: "No Preference",
      icon: CreditCard,
      desc: "Either cashback or points is fine",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          12. Do you prefer cashback or reward points?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="benefitPreferences.rewardType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {rewardTypeOptions.map((option) => {
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
