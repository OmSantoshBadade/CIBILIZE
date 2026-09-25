import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Award, CreditCard, Crown, DollarSign, Star } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepAnnualFeeToleranceProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepAnnualFeeTolerance = ({ form }: StepAnnualFeeToleranceProps) => {
  const feeToleranceOptions = [
    {
      value: "free",
      label: "Free Cards Only",
      icon: DollarSign,
      desc: "₹0 annual fee",
      color: "bg-green-100 text-green-800",
      detail: "No annual fee cards",
    },
    {
      value: "low",
      label: "Low Fee",
      icon: CreditCard,
      desc: "Up to ₹500",
      color: "bg-blue-100 text-blue-800",
      detail: "Entry-level cards",
    },
    {
      value: "medium",
      label: "Medium Fee",
      icon: Award,
      desc: "₹1,000 - ₹2,500",
      color: "bg-yellow-100 text-yellow-800",
      detail: "Mid-tier cards with good benefits",
    },
    {
      value: "high",
      label: "High Fee",
      icon: Star,
      desc: "₹5,000+",
      color: "bg-purple-100 text-purple-800",
      detail: "Premium cards with extensive benefits",
    },
    {
      value: "premium",
      label: "Premium Fee",
      icon: Crown,
      desc: "₹10,000+",
      color: "bg-red-100 text-red-800",
      detail: "Super premium cards with luxury benefits",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          21. What's your annual fee tolerance?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="feePreference.annualFeeTolerance"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {feeToleranceOptions.map((option) => {
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={field.value === option.value ? "default" : "secondary"}
                      className="flex w-full items-center justify-start py-10"
                      onClick={() => field.onChange(option.value)}
                    >
                      <div className="text-left">
                        <Typography.SubHeading variant="md" className="text-primary">
                          {option.label}
                        </Typography.SubHeading>
                        <Typography.SubHeading variant="sm">{option.desc}</Typography.SubHeading>
                        <Typography.SubHeading variant="sm">{option.detail}</Typography.SubHeading>
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
