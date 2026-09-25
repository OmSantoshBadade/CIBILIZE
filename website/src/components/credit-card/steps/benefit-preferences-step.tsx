import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Award,
  Banknote,
  Car,
  CreditCard,
  DollarSign,
  Film,
  Gift,
  Plane,
  Shield,
  Target,
  Ticket,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface BenefitPreferencesStepProps {
  form: UseFormReturn<RecommendationFormData>;
}

export const BenefitPreferencesStep = ({ form }: BenefitPreferencesStepProps) => {
  const watchedBenefits = form.watch("benefitPreferences.priorityBenefits") || [];
  const watchedMilestone = form.watch("benefitPreferences.milestoneRewards");

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

  const redemptionOptions = [
    {
      value: "direct_cashback",
      label: "Direct Cashback",
      icon: DollarSign,
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
    { value: "gift_cards", label: "Gift Cards", icon: Gift, desc: "Amazon, Flipkart gift cards" },
    {
      value: "statement_credit",
      label: "Statement Credit",
      icon: CreditCard,
      desc: "Reduce outstanding balance",
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
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Gift className="text-primary h-6 w-6" />
          Benefit Preferences
        </h2>
        <p className="text-muted-foreground">
          Choose the benefits and rewards that matter most to you
        </p>
      </div>

      {/* Priority Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Priority Benefits
          </CardTitle>
          <CardDescription>
            Select all benefits that are important to you (choose at least one)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="benefitPreferences.priorityBenefits"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {benefitOptions.map((benefit) => {
                    const IconComponent = benefit.icon;

                    const isSelected = watchedBenefits.includes(benefit.value as any);

                    return (
                      <Button
                        key={benefit.value}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        className="relative flex h-auto flex-col gap-2 p-4 text-left"
                        onClick={() => toggleBenefit(benefit.value)}
                      >
                        <div className="flex w-full items-center gap-2">
                          <IconComponent className="h-5 w-5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{benefit.label}</div>
                            <div className="text-muted-foreground mt-1 text-xs leading-tight">
                              {benefit.desc}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">✓</Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <p className="text-muted-foreground text-sm">
                    Selected: {watchedBenefits.length} benefits
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Reward Type Preference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Reward Type Preference
            </CardTitle>
            <CardDescription>Do you prefer cashback or reward points?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="benefitPreferences.rewardType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {rewardTypeOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <Button
                            key={option.value}
                            type="button"
                            variant={field.value === option.value ? "default" : "secondary"}
                            className="h-auto w-full justify-start p-3"
                            onClick={() => field.onChange(option.value)}
                          >
                            <div className="flex w-full items-center gap-3">
                              <IconComponent className="h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">{option.label}</div>
                                <div className="text-muted-foreground text-xs">{option.desc}</div>
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
          </CardContent>
        </Card>

        {/* Redemption Preference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ticket className="h-5 w-5" />
              Redemption Preference
            </CardTitle>
            <CardDescription>How do you prefer to redeem your rewards?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="benefitPreferences.redemptionPreference"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {redemptionOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <Button
                            key={option.value}
                            type="button"
                            variant={field.value === option.value ? "default" : "secondary"}
                            className="h-auto w-full justify-start p-3"
                            onClick={() => field.onChange(option.value)}
                          >
                            <div className="flex w-full items-center gap-3">
                              <IconComponent className="h-5 w-5" />
                              <div className="text-left">
                                <div className="font-medium">{option.label}</div>
                                <div className="text-muted-foreground text-xs">{option.desc}</div>
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
          </CardContent>
        </Card>
      </div>

      {/* Milestone Rewards */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5" />
            Milestone Rewards
          </CardTitle>
          <CardDescription>Do you prefer cards with spending milestone bonuses?</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="benefitPreferences.milestoneRewards"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">I like milestone-based rewards</Label>
                    <p className="text-muted-foreground text-sm">
                      {watchedMilestone
                        ? "Great! We'll prioritize cards with spending targets and bonus rewards"
                        : "We'll focus on cards with consistent earning rates instead"}
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
