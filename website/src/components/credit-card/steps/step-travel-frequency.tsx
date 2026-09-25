import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Car, Globe, MapPin, Plane } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepTravelFrequencyProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepTravelFrequency = ({ form }: StepTravelFrequencyProps) => {
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

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          14. How often do you travel?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.travelFrequency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {travelFrequencyOptions.map((option) => {
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={field.value === option.value ? "default" : "secondary"}
                      className="flex w-full items-center justify-start py-8"
                      onClick={() => field.onChange(option.value)}
                    >
                      <div className="flex items-center gap-2">
                        <option.icon className="size-6" />
                        <div className="text-left">
                          <Typography.SubHeading variant="md" className="text-primary">
                            {option.label}
                          </Typography.SubHeading>
                          <Typography.SubHeading variant="sm">{option.desc}</Typography.SubHeading>
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
