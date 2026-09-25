import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Award, Building, CreditCard, Crown, DollarSign, Shield, Star } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface FeePreferenceStepProps {
  form: UseFormReturn<RecommendationFormData>;
}

export const FeePreferenceStep = ({ form }: FeePreferenceStepProps) => {
  const watchedFeeWaiver = form.watch("feePreference.feeWaiverImportant");
  const watchedBanks = form.watch("feePreference.preferredBanks") || [];

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

  const bankOptions = [
    { value: "hdfc", label: "HDFC Bank", popular: true },
    { value: "sbi", label: "State Bank of India", popular: true },
    { value: "icici", label: "ICICI Bank", popular: true },
    { value: "axis", label: "Axis Bank", popular: true },
    { value: "kotak", label: "Kotak Mahindra Bank", popular: false },
    { value: "american_express", label: "American Express", popular: false },
    { value: "citibank", label: "Citibank", popular: false },
    { value: "standard_chartered", label: "Standard Chartered", popular: false },
    { value: "yes_bank", label: "Yes Bank", popular: false },
    { value: "indusind", label: "IndusInd Bank", popular: false },
    { value: "no_preference", label: "No Preference", popular: true },
  ];

  const toggleBank = (bank: string) => {
    if (bank === "no_preference") {
      form.setValue("feePreference.preferredBanks", ["no_preference"]);
      return;
    }

    const currentBanks = watchedBanks.filter((b) => b !== "no_preference");
    const newBanks = currentBanks.includes(bank)
      ? currentBanks.filter((b) => b !== bank)
      : [...currentBanks, bank];
    form.setValue("feePreference.preferredBanks", newBanks);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <DollarSign className="text-primary h-6 w-6" />
          Fee Preferences
        </h2>
        <p className="text-muted-foreground">
          Help us understand your budget and preferences for annual fees
        </p>
      </div>

      {/* Annual Fee Tolerance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Annual Fee Tolerance
          </CardTitle>
          <CardDescription>
            What's the maximum annual fee you're comfortable paying?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="feePreference.annualFeeTolerance"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {feeToleranceOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <Button
                          key={option.value}
                          type="button"
                          variant={field.value === option.value ? "default" : "secondary"}
                          className="flex h-auto flex-col gap-2 p-4"
                          onClick={() => field.onChange(option.value)}
                        >
                          <IconComponent className="h-6 w-6" />
                          <div className="text-center">
                            <div className="text-sm font-medium">{option.label}</div>
                            <div className="text-muted-foreground mt-1 text-xs">{option.desc}</div>
                            <div className="text-muted-foreground mt-1 text-xs italic">
                              {option.detail}
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Fee Waiver Preference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Fee Waiver Preference
            </CardTitle>
            <CardDescription>Do you prefer cards with spend-based fee waivers?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="feePreference.feeWaiverImportant"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        Fee waiver conditions are important
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        {watchedFeeWaiver
                          ? "We'll prioritize cards where fees can be waived with spending"
                          : "We'll focus on overall value regardless of fee waiver conditions"}
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

        {/* Card Tier Preference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Card Tier Preference
            </CardTitle>
            <CardDescription>What level of card are you looking for?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="feePreference.cardTier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {cardTierOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <Button
                            key={option.value}
                            type="button"
                            variant={field.value === option.value ? "default" : "secondary"}
                            className="h-auto w-full justify-start p-4"
                            onClick={() => field.onChange(option.value)}
                          >
                            <div className="flex w-full items-start gap-3">
                              <IconComponent className="mt-1 h-5 w-5 flex-shrink-0" />
                              <div className="flex-1 text-left">
                                <div className="font-medium">{option.label}</div>
                                <div className="text-muted-foreground mb-2 text-xs">
                                  {option.desc}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {option.features.map((feature, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
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

      {/* Preferred Banks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Preferred Banks (Optional)
          </CardTitle>
          <CardDescription>
            Do you have any bank preferences? Leave unselected for all banks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="feePreference.preferredBanks"
            render={() => (
              <FormItem>
                <div className="space-y-4">
                  {/* Popular Banks */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Star className="h-4 w-4" />
                      Popular Banks
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      {bankOptions
                        .filter((bank) => bank.popular)
                        .map((bank) => {
                          const isSelected = watchedBanks.includes(bank.value);
                          const isNoPreference = bank.value === "no_preference";
                          const hasNoPreference = watchedBanks.includes("no_preference");

                          return (
                            <Button
                              key={bank.value}
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              className="relative h-auto p-3 text-sm"
                              onClick={() => toggleBank(bank.value)}
                              disabled={!isNoPreference && hasNoPreference}
                            >
                              {bank.label}
                              {isSelected && (
                                <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">
                                  ✓
                                </Badge>
                              )}
                            </Button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Other Banks */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold">Other Banks</h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      {bankOptions
                        .filter((bank) => !bank.popular && bank.value !== "no_preference")
                        .map((bank) => {
                          const isSelected = watchedBanks.includes(bank.value);
                          const hasNoPreference = watchedBanks.includes("no_preference");

                          return (
                            <Button
                              key={bank.value}
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              className="relative h-auto p-3 text-sm"
                              onClick={() => toggleBank(bank.value)}
                              disabled={hasNoPreference}
                            >
                              {bank.label}
                              {isSelected && (
                                <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">
                                  ✓
                                </Badge>
                              )}
                            </Button>
                          );
                        })}
                    </div>
                  </div>

                  <div className="bg-muted/30 mt-4 rounded-lg p-3">
                    <p className="text-muted-foreground text-sm">
                      {watchedBanks.includes("no_preference")
                        ? "All banks will be considered for recommendations"
                        : watchedBanks.length > 0
                          ? `Selected: ${watchedBanks.length} bank(s)`
                          : "No specific bank preference - all banks will be considered"}
                    </p>
                  </div>
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
