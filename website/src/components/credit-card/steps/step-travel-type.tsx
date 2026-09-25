import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Globe, MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepTravelTypeProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepTravelType = ({ form }: StepTravelTypeProps) => {
  const watchedTravelType = form.watch("lifestyle.travelType") || [];

  const travelTypeOptions = [
    { value: "domestic", label: "Domestic Travel", icon: MapPin, desc: "Within India" },
    { value: "international", label: "International Travel", icon: Globe, desc: "Outside India" },
  ];

  const toggleTravelType = (type: string) => {
    const currentTypes = watchedTravelType as string[];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];

    form.setValue("lifestyle.travelType", newTypes as any);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          15. What type of travel do you do most?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.travelType"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {travelTypeOptions.map((option) => {
                  const isSelected = watchedTravelType.includes(option.value as any);

                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={isSelected ? "default" : "secondary"}
                      className="flex w-full items-center justify-start py-8"
                      onClick={() => toggleTravelType(option.value)}
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
