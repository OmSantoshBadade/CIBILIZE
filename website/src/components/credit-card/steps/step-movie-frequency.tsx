import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepMovieFrequencyProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepMovieFrequency = ({ form }: StepMovieFrequencyProps) => {
  const movieFrequencyOptions = [
    { value: "rarely", label: "Rarely", desc: "Few times a year" },
    { value: "monthly", label: "Monthly", desc: "1-2 times per month" },
    { value: "weekly", label: "Weekly", desc: "Every week" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          19. How often do you watch movies?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="lifestyle.movieFrequency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {movieFrequencyOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={field.value === option.value ? "default" : "secondary"}
                    className="flex w-full items-center justify-start py-8"
                    onClick={() => field.onChange(option.value)}
                  >
                    <div className="text-left">
                      <Typography.SubHeading variant="md" className="text-primary">
                        {option.label}
                      </Typography.SubHeading>
                      <Typography.SubHeading variant="sm">{option.desc}</Typography.SubHeading>
                    </div>
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
