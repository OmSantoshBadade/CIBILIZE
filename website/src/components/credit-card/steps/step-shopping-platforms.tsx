import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepShoppingPlatformsProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepShoppingPlatforms = ({ form }: StepShoppingPlatformsProps) => {
  const watchedPlatforms = form.watch("spendingHabits.shoppingPlatforms") || [];

  // Expanded to include all major Indian national and popular international shopping platforms
  const shoppingPlatforms = [
    // Indian National Platforms
    { value: "amazon_in", label: "Amazon India" },
    { value: "flipkart", label: "Flipkart" },
    { value: "myntra", label: "Myntra" },
    { value: "ajio", label: "Ajio" },
    { value: "nykaa", label: "Nykaa" },
    { value: "tatacliq", label: "Tata Cliq" },
    { value: "snapdeal", label: "Snapdeal" },
    { value: "reliance_digital", label: "Reliance Digital" },
    { value: "croma", label: "Croma" },
    { value: "bigbasket", label: "BigBasket" },
    { value: "grofers", label: "Blinkit (Grofers)" },
    { value: "meesho", label: "Meesho" },
    { value: "firstcry", label: "FirstCry" },
    { value: "lenskart", label: "Lenskart" },
    { value: "bookmyshow", label: "BookMyShow" },
    { value: "paytm_mall", label: "Paytm Mall" },
    { value: "swiggy", label: "Swiggy" },
    { value: "zomato", label: "Zomato" },
    { value: "redbus", label: "RedBus" },
    { value: "makemytrip", label: "MakeMyTrip" },
    { value: "cleartrip", label: "Cleartrip" },
    { value: "yatra", label: "Yatra" },
    // International Platforms widely used in India
    { value: "amazon_global", label: "Amazon Global/US/UK" },
    { value: "ebay", label: "eBay" },
    { value: "aliexpress", label: "AliExpress" },
    { value: "shein", label: "SHEIN" },
    { value: "zara", label: "Zara" },
    { value: "h&m", label: "H&M" },
    // Others and catch-all
    { value: "others", label: "Others" },
  ];

  const togglePlatform = (platform: string) => {
    const currentPlatforms = watchedPlatforms as string[];
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter((p) => p !== platform)
      : [...currentPlatforms, platform];

    form.setValue("spendingHabits.shoppingPlatforms", newPlatforms as any);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          10. Which platforms do you shop on most?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="spendingHabits.shoppingPlatforms"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-96 justify-between">
                      {watchedPlatforms.length > 0
                        ? `Add more platforms (${watchedPlatforms.length} selected)`
                        : "Select your preferred platforms"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 w-full overflow-y-auto">
                    {shoppingPlatforms.map((platform) => {
                      const isSelected = watchedPlatforms.includes(platform.value as any);

                      return (
                        <DropdownMenuCheckboxItem
                          key={platform.value}
                          checked={isSelected}
                          onCheckedChange={() => togglePlatform(platform.value)}
                        >
                          {platform.label}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {watchedPlatforms.length > 0 && (
                  <div className="space-y-2">
                    <Typography.SubHeading variant="sm" className="text-muted-foreground">
                      Selected platforms ({watchedPlatforms.length}):
                    </Typography.SubHeading>
                    <div className="flex flex-wrap gap-2">
                      {watchedPlatforms.map((platformValue) => {
                        const platform = shoppingPlatforms.find((p) => p.value === platformValue);
                        return (
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => togglePlatform(platformValue)}
                          >
                            {platform?.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
