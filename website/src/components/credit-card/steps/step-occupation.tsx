import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Briefcase, User } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepOccupationProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepOccupation = ({ form }: StepOccupationProps) => {
  const occupationOptions = [
    { value: "salaried", label: "Salaried Employee", icon: Briefcase },
    { value: "self_employed", label: "Self Employed", icon: User },
    { value: "student", label: "Student", icon: User },
    { value: "retired", label: "Retired", icon: User },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          3. What's your occupation?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="personalInfo.occupation"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-2 gap-4">
                {occupationOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={field.value === option.value ? "default" : "secondary"}
                    className="flex w-full items-center justify-start"
                    onClick={() => field.onChange(option.value)}
                  >
                    <option.icon className="h-6 w-6" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
