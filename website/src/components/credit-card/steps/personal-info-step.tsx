import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BarChart3, Briefcase, CreditCard, DollarSign, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface PersonalInfoStepProps {
  form: UseFormReturn<RecommendationFormData>;
}

export const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  const watchedAge = form.watch("personalInfo.age");
  const watchedExistingCard = form.watch("personalInfo.existingCreditCard");

  const incomeOptions = [
    { value: "below_20k", label: "Below ₹20,000", color: "bg-red-100 text-red-800" },
    { value: "20k_50k", label: "₹20,000 - ₹50,000", color: "bg-orange-100 text-orange-800" },
    { value: "50k_1l", label: "₹50,000 - ₹1,00,000", color: "bg-yellow-100 text-yellow-800" },
    { value: "1l_2l", label: "₹1,00,000 - ₹2,00,000", color: "bg-green-100 text-green-800" },
    { value: "above_2l", label: "Above ₹2,00,000", color: "bg-blue-100 text-blue-800" },
  ];

  const occupationOptions = [
    { value: "salaried", label: "Salaried Employee", icon: Briefcase },
    { value: "self_employed", label: "Self Employed", icon: User },
    { value: "student", label: "Student", icon: User },
    { value: "retired", label: "Retired", icon: User },
  ];

  const creditScoreOptions = [
    { value: "poor", label: "Below 600 (Poor)", color: "bg-red-100 text-red-800" },
    { value: "average", label: "600 - 700 (Average)", color: "bg-orange-100 text-orange-800" },
    { value: "good", label: "700 - 750 (Good)", color: "bg-yellow-100 text-yellow-800" },
    { value: "excellent", label: "Above 750 (Excellent)", color: "bg-green-100 text-green-800" },
    { value: "unknown", label: "I don't know", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">
          Help us understand your profile to find the most suitable credit cards
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Age */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Age
            </CardTitle>
            <CardDescription>Your current age determines card eligibility</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="personalInfo.age"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-4">
                    <div className="px-3">
                      <Slider
                        min={18}
                        max={65}
                        step={1}
                        value={[field.value || 25]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-primary text-2xl font-bold">
                        {watchedAge || 25} years
                      </span>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Monthly Income
            </CardTitle>
            <CardDescription>
              Your income level affects credit limit and eligibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="personalInfo.monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-3">
                      {incomeOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={field.value === option.value ? "default" : "secondary"}
                          className={`h-auto w-full justify-start p-3 ${
                            field.value === option.value ? "" : "hover:bg-muted/50"
                          }`}
                          onClick={() => field.onChange(option.value)}
                        >
                          <div className="flex w-full items-center justify-between">
                            <span className="font-medium">{option.label}</span>
                            {field.value === option.value && (
                              <div className={`rounded-full px-2 py-1 text-xs ${option.color}`}>
                                Selected
                              </div>
                            )}
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

        {/* Occupation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5" />
              Occupation
            </CardTitle>
            <CardDescription>Your employment type affects card approval</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="personalInfo.occupation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      {occupationOptions.map((option) => {
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
                            <span className="text-sm font-medium">{option.label}</span>
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

        {/* Existing Credit Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Credit Card Experience
            </CardTitle>
            <CardDescription>Do you currently have any credit cards?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="personalInfo.existingCreditCard"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">I have existing credit cards</Label>
                      <p className="text-muted-foreground text-sm">
                        {watchedExistingCard
                          ? "Great! This helps with credit history"
                          : "No worries, we'll find beginner-friendly options"}
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

      {/* Credit Score - Full Width */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" />
            Credit Score (Optional)
          </CardTitle>
          <CardDescription>
            Your credit score helps us recommend cards with better approval chances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="personalInfo.creditScore"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
                    {creditScoreOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={field.value === option.value ? "default" : "secondary"}
                        className="flex h-auto flex-col gap-2 p-4"
                        onClick={() => field.onChange(option.value)}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold">{option.label.split(" (")[0]}</div>
                          <div className="text-muted-foreground mt-1 text-xs">
                            {option.label.includes("(") ? `(${option.label.split("(")[1]}` : ""}
                          </div>
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
  );
};
