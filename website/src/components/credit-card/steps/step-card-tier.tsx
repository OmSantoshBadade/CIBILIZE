import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Award, CreditCard, Crown, Star } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepCardTierProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepCardTier = ({ form }: StepCardTierProps) => {
  const cardTierOptions = [
    {
      value: "entry",
      label: "Entry Level",
      icon: CreditCard,
      desc: "Basic cards for beginners",
      features: ["Low fees", "Basic rewards", "Easy approval"],
    },
    {
      value: "mid_tier",
      label: "Mid Tier",
      icon: Award,
      desc: "Balanced benefits and fees",
      features: ["Good rewards", "Some premium benefits", "Moderate fees"],
    },
    {
      value: "premium",
      label: "Premium",
      icon: Star,
      desc: "High-end cards with luxury benefits",
      features: ["High rewards", "Lounge access", "Premium services"],
    },
    {
      value: "super_premium",
      label: "Super Premium",
      icon: Crown,
      desc: "Ultra-luxury cards with exclusive perks",
      features: ["Maximum rewards", "Concierge services", "Exclusive access"],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          23. What level of card are you looking for?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="feePreference.cardTier"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {cardTierOptions.map((option) => {
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={field.value === option.value ? "default" : "secondary"}
                      className="flex w-full items-center justify-start py-8"
                      onClick={() => field.onChange(option.value)}
                    >
                      <div className="text-left">
                        <Typography.SubHeading variant="md" className="text-primary">
                          {option.label}
                        </Typography.SubHeading>
                        <Typography.SubHeading variant="sm">{option.desc}</Typography.SubHeading>
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
