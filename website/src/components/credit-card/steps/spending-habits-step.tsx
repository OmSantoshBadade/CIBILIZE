import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import {
  Car,
  CreditCard,
  Film,
  Globe,
  MapPin,
  Plane,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface SpendingHabitsStepProps {
  form: UseFormReturn<RecommendationFormData>;
}

export const SpendingHabitsStep = ({ form }: SpendingHabitsStepProps) => {
  const watchedCategories = form.watch("spendingHabits.primarySpendingCategories") || [];
  const watchedSpend = form.watch("spendingHabits.monthlySpend");
  const watchedPlatforms = form.watch("spendingHabits.shoppingPlatforms") || [];

  const spendingCategories = [
    {
      value: "food_dining",
      label: "Food & Dining",
      icon: UtensilsCrossed,
      color: "bg-orange-100 text-orange-800",
    },
    { value: "travel", label: "Travel", icon: Plane, color: "bg-blue-100 text-blue-800" },
    {
      value: "online_shopping",
      label: "Online Shopping",
      icon: ShoppingCart,
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "groceries",
      label: "Groceries",
      icon: ShoppingCart,
      color: "bg-green-100 text-green-800",
    },
    { value: "fuel", label: "Fuel", icon: Car, color: "bg-red-100 text-red-800" },
    {
      value: "movies_entertainment",
      label: "Movies & Entertainment",
      icon: Film,
      color: "bg-pink-100 text-pink-800",
    },
    {
      value: "emi_bills",
      label: "EMI & Bills",
      icon: CreditCard,
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "luxury_shopping",
      label: "Luxury Shopping",
      icon: ShoppingCart,
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "medical", label: "Medical", icon: CreditCard, color: "bg-teal-100 text-teal-800" },
    { value: "others", label: "Others", icon: CreditCard, color: "bg-slate-100 text-slate-800" },
  ];

  const paymentPreferences = [
    {
      value: "online",
      label: "Primarily Online",
      icon: Smartphone,
      desc: "Most purchases through apps/websites",
    },
    {
      value: "offline",
      label: "Primarily Offline",
      icon: MapPin,
      desc: "Most purchases at physical stores",
    },
    { value: "mixed", label: "Mixed", icon: Globe, desc: "Equal mix of online and offline" },
  ];

  const foodFrequencyOptions = [
    { value: "rarely", label: "Rarely", desc: "Once a month or less" },
    { value: "weekly", label: "Weekly", desc: "1-3 times per week" },
    { value: "daily", label: "Daily", desc: "Almost every day" },
  ];

  const shoppingPlatforms = [
    { value: "amazon", label: "Amazon" },
    { value: "flipkart", label: "Flipkart" },
    { value: "myntra", label: "Myntra" },
    { value: "ajio", label: "Ajio" },
    { value: "nykaa", label: "Nykaa" },
    { value: "bigbasket", label: "BigBasket" },
    { value: "swiggy", label: "Swiggy" },
    { value: "zomato", label: "Zomato" },
    { value: "others", label: "Others" },
  ];

  const toggleCategory = (category: string) => {
    const currentCategories = watchedCategories as string[];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];

    form.setValue("spendingHabits.primarySpendingCategories", newCategories as any);
  };

  const togglePlatform = (platform: string) => {
    const currentPlatforms = watchedPlatforms as string[];
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter((p) => p !== platform)
      : [...currentPlatforms, platform];

    form.setValue("spendingHabits.shoppingPlatforms", newPlatforms as any);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <ShoppingCart className="text-primary h-6 w-6" />
          Spending Habits
        </h2>
        <p className="text-muted-foreground">
          Tell us about your spending patterns to find cards with the best rewards
        </p>
      </div>

      {/* Primary Spending Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Primary Spending Categories
          </CardTitle>
          <CardDescription>
            Select all categories where you spend the most (choose at least one)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="spendingHabits.primarySpendingCategories"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                  {spendingCategories.map((category) => {
                    const IconComponent = category.icon;

                    const isSelected = watchedCategories.includes(category.value as any);

                    return (
                      <Button
                        key={category.value}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        className="relative flex h-auto flex-col gap-2 p-4"
                        onClick={() => toggleCategory(category.value)}
                      >
                        <IconComponent className="h-6 w-6" />
                        <span className="text-center text-xs leading-tight font-medium">
                          {category.label}
                        </span>
                        {isSelected && (
                          <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">✓</Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
                <div className="mt-3">
                  <p className="text-muted-foreground text-sm">
                    Selected: {watchedCategories.length} categories
                  </p>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Spend */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Monthly Credit Card Spend
            </CardTitle>
            <CardDescription>Your average monthly spending on credit cards</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="spendingHabits.monthlySpend"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <div className="px-3">
                      <Slider
                        min={5000}
                        max={200000}
                        step={5000}
                        value={[field.value || 25000]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-primary text-2xl font-bold">
                        ₹{((watchedSpend || 25000) / 1000).toFixed(0)}K
                      </span>
                      <p className="text-muted-foreground mt-1 text-sm">per month</p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Payment Preference */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone className="h-5 w-5" />
              Payment Preference
            </CardTitle>
            <CardDescription>How do you prefer to make payments?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="spendingHabits.paymentPreference"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {paymentPreferences.map((option) => {
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Food Delivery Frequency */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UtensilsCrossed className="h-5 w-5" />
              Food Delivery Frequency
            </CardTitle>
            <CardDescription>How often do you order food online?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="spendingHabits.foodDeliveryFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {foodFrequencyOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={field.value === option.value ? "default" : "secondary"}
                          className="h-auto w-full justify-start p-3"
                          onClick={() => field.onChange(option.value)}
                        >
                          <div className="w-full text-left">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-muted-foreground text-xs">{option.desc}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Shopping Platforms */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5" />
              Preferred Shopping Platforms
            </CardTitle>
            <CardDescription>Which platforms do you shop on most? (Optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="spendingHabits.shoppingPlatforms"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-3 gap-2">
                    {shoppingPlatforms.map((platform) => {
                      const isSelected = watchedPlatforms.includes(platform.value as any);

                      return (
                        <Button
                          key={platform.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          className="relative h-auto p-2 text-xs"
                          onClick={() => togglePlatform(platform.value)}
                        >
                          {platform.label}
                          {isSelected && (
                            <Badge className="absolute -top-1 -right-1 px-1 py-0 text-xs">✓</Badge>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                  <div className="mt-3">
                    <p className="text-muted-foreground text-sm">
                      Selected: {watchedPlatforms.length} platforms
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
