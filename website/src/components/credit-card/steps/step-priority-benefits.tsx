import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import {
  Award,
  Car,
  DollarSign,
  Film,
  Gift,
  Plane,
  Shield,
  Target,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepPriorityBenefitsProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepPriorityBenefits = ({ form }: StepPriorityBenefitsProps) => {
  const watchedBenefits = form.watch("benefitPreferences.priorityBenefits") || [];

  const benefitOptions = [
    {
      value: "cashback",
      label: "Cashback",
      icon: DollarSign,
      color: "bg-green-100 text-green-800",
      desc: "Direct money back on purchases",
    },
    {
      value: "reward_points",
      label: "Reward Points",
      icon: Award,
      color: "bg-blue-100 text-blue-800",
      desc: "Points for flexible redemption",
    },
    {
      value: "lounge_access",
      label: "Lounge Access",
      icon: Plane,
      color: "bg-purple-100 text-purple-800",
      desc: "Airport lounge privileges",
    },
    {
      value: "travel_insurance",
      label: "Travel Insurance",
      icon: Shield,
      color: "bg-teal-100 text-teal-800",
      desc: "Coverage for trips",
    },
    {
      value: "movie_offers",
      label: "Movie Offers",
      icon: Film,
      color: "bg-pink-100 text-pink-800",
      desc: "Discounts on movie tickets",
    },
    {
      value: "golf_privileges",
      label: "Golf Privileges",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-800",
      desc: "Golf course access & discounts",
    },
    {
      value: "fuel_waiver",
      label: "Fuel Waiver",
      icon: Car,
      color: "bg-red-100 text-red-800",
      desc: "No surcharge on fuel purchases",
    },
    {
      value: "welcome_bonus",
      label: "Welcome Bonus",
      icon: Gift,
      color: "bg-orange-100 text-orange-800",
      desc: "Sign-up rewards",
    },
    {
      value: "milestone_rewards",
      label: "Milestone Rewards",
      icon: Target,
      color: "bg-indigo-100 text-indigo-800",
      desc: "Bonus for spending targets",
    },
    {
      value: "dining_discounts",
      label: "Dining Discounts",
      icon: UtensilsCrossed,
      color: "bg-amber-100 text-amber-800",
      desc: "Restaurant offers & discounts",
    },
  ];

  const toggleBenefit = (benefit: string) => {
    const currentBenefits = watchedBenefits as string[];
    const newBenefits = currentBenefits.includes(benefit)
      ? currentBenefits.filter((b) => b !== benefit)
      : [...currentBenefits, benefit];

    form.setValue("benefitPreferences.priorityBenefits", newBenefits as any);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          11. What benefits are most important to you?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="benefitPreferences.priorityBenefits"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {benefitOptions.map((benefit) => {
                  const isSelected = watchedBenefits.includes(benefit.value as any);

                  return (
                    <Button
                      key={benefit.value}
                      type="button"
                      variant={isSelected ? "default" : "secondary"}
                      className="flex w-full items-center justify-start py-8"
                      onClick={() => toggleBenefit(benefit.value)}
                    >
                      <div className="flex items-center gap-2">
                        <benefit.icon className="size-6" />

                        <div className="text-left">
                          <Typography.SubHeading variant="md" className="text-primary">
                            {benefit.label}
                          </Typography.SubHeading>
                          <Typography.SubHeading variant="sm">{benefit.desc}</Typography.SubHeading>
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
