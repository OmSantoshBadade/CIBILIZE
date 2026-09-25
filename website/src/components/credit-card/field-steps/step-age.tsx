import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepAgeProps {
  form: UseFormReturn<RecommendationFormData>;
}

export const StepAge = ({ form }: StepAgeProps) => {
  const watchedAge = form.watch("personalInfo.age");

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <User className="text-primary h-6 w-6" />
          What's your age?
        </h2>
        <p className="text-muted-foreground">
          Your age helps us determine card eligibility and recommendations
        </p>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
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
                <div className="space-y-6">
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
                    <span className="text-primary text-4xl font-bold">
                      {watchedAge || 25} years
                    </span>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {watchedAge &&
                        watchedAge < 25 &&
                        "Young adult - great time to start building credit!"}
                      {watchedAge &&
                        watchedAge >= 25 &&
                        watchedAge < 35 &&
                        "Prime age for credit building and premium cards"}
                      {watchedAge &&
                        watchedAge >= 35 &&
                        watchedAge < 50 &&
                        "Established credit profile - many options available"}
                      {watchedAge &&
                        watchedAge >= 50 &&
                        "Senior citizen - special rates and benefits available"}
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
