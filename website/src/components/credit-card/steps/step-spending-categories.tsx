import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { Car, CreditCard, Film, Plane, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepSpendingCategoriesProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
}

export const StepSpendingCategories = ({ form }: StepSpendingCategoriesProps) => {
  const watchedCategories = form.watch("spendingHabits.primarySpendingCategories") || [];

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

  const toggleCategory = (category: string) => {
    const currentCategories = watchedCategories as string[];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];

    form.setValue("spendingHabits.primarySpendingCategories", newCategories as any);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          6. What are your main spending categories?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="spendingHabits.primarySpendingCategories"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {spendingCategories.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={
                      watchedCategories.includes(option.value as any) ? "default" : "secondary"
                    }
                    className="flex w-full items-center justify-start"
                    onClick={() => toggleCategory(option.value)}
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
