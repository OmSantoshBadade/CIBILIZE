import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Car,
  Coffee,
  Film,
  Gem,
  Globe,
  MapPin,
  Plane,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface LifestyleStepProps {
  form: UseFormReturn<RecommendationFormData>;
}

export const LifestyleStep = ({ form }: LifestyleStepProps) => {
  const watchedTravelFreq = form.watch("lifestyle.travelFrequency");
  const watchedTravelType = form.watch("lifestyle.travelType") || [];
  const watchedLounge = form.watch("lifestyle.loungeAccess");
  const watchedGolf = form.watch("lifestyle.golfInterest");
  const watchedLuxury = form.watch("lifestyle.luxuryPreferences");

  const travelFrequencyOptions = [
    {
      value: "rarely",
      label: "Rarely",
      icon: MapPin,
      desc: "Once a year or less",
      color: "bg-gray-100 text-gray-800",
    },
    {
      value: "1_2_times_year",
      label: "Occasional",
      icon: Car,
      desc: "1-2 times per year",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "monthly",
      label: "Regular",
      icon: Plane,
      desc: "Monthly or bi-monthly",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "frequent",
      label: "Frequent",
      icon: Globe,
      desc: "Multiple times per month",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const travelTypeOptions = [
    { value: "domestic", label: "Domestic Travel", icon: MapPin, desc: "Within India" },
    { value: "international", label: "International Travel", icon: Globe, desc: "Outside India" },
  ];

  const frequencyOptions = [
    { value: "rarely", label: "Rarely", desc: "Once a month or less" },
    { value: "weekly", label: "Weekly", desc: "1-3 times per week" },
    { value: "daily", label: "Daily", desc: "Almost every day" },
  ];

  const movieFrequencyOptions = [
    { value: "rarely", label: "Rarely", desc: "Few times a year" },
    { value: "monthly", label: "Monthly", desc: "1-2 times per month" },
    { value: "weekly", label: "Weekly", desc: "Every week" },
  ];

  const toggleTravelType = (type: string) => {
    const currentTypes = watchedTravelType as string[];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    form.setValue("lifestyle.travelType", newTypes as any);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Plane className="text-primary h-6 w-6" />
          Lifestyle & Travel
        </h2>
        <p className="text-muted-foreground">
          Help us understand your lifestyle to recommend cards with relevant benefits
        </p>
      </div>

      {/* Travel Frequency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Travel Frequency
          </CardTitle>
          <CardDescription>How often do you travel for business or leisure?</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="lifestyle.travelFrequency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {travelFrequencyOptions.map((option) => {
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

      {/* Travel Type - Only show if user travels */}
      {watchedTravelFreq && watchedTravelFreq !== "rarely" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Travel Type
            </CardTitle>
            <CardDescription>What type of travel do you do most often? (Optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="lifestyle.travelType"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {travelTypeOptions.map((option) => {
                      const IconComponent = option.icon;

                      const isSelected = watchedTravelType.includes(option.value as any);

                      return (
                        <Button
                          key={option.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          className="relative flex h-auto items-center gap-3 p-4"
                          onClick={() => toggleTravelType(option.value)}
                        >
                          <IconComponent className="h-5 w-5" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-muted-foreground text-xs">{option.desc}</div>
                          </div>
                          {isSelected && (
                            <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">✓</Badge>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lounge Access */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coffee className="h-5 w-5" />
              Airport Lounge Access
            </CardTitle>
            <CardDescription>Do you value airport lounge access?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="lifestyle.loungeAccess"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        Airport lounge access is important
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        {watchedLounge
                          ? "We'll prioritize cards with complimentary lounge access"
                          : "We'll focus on other benefits instead"}
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

        {/* Golf Interest */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5" />
              Golf & Premium Events
            </CardTitle>
            <CardDescription>Do you play golf or attend premium events?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="lifestyle.golfInterest"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">
                        I'm interested in golf privileges
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        {watchedGolf
                          ? "We'll look for cards with golf course access and discounts"
                          : "We'll focus on other lifestyle benefits"}
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dining Frequency */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UtensilsCrossed className="h-5 w-5" />
              Dining Out Frequency
            </CardTitle>
            <CardDescription>How often do you dine out at restaurants?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="lifestyle.diningFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {frequencyOptions.map((option) => (
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

        {/* Movie Frequency */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Film className="h-5 w-5" />
              Movie Watching Frequency
            </CardTitle>
            <CardDescription>How often do you watch movies in theaters?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="lifestyle.movieFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {movieFrequencyOptions.map((option) => (
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
      </div>

      {/* Luxury Preferences */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gem className="h-5 w-5" />
            Luxury & Premium Lifestyle
          </CardTitle>
          <CardDescription>
            Are you interested in luxury brands and premium experiences?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="lifestyle.luxuryPreferences"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">
                      I enjoy luxury shopping and premium experiences
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      {watchedLuxury
                        ? "We'll prioritize premium cards with luxury brand partnerships"
                        : "We'll focus on everyday value and practical benefits"}
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
