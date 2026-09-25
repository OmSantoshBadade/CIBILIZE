import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRecommendationFormStore } from "@/store/recommendation-form-store";
import {
  recommendationFormSchema,
  type RecommendationFormData,
} from "./recommendation-form-schema";
import { BenefitPreferencesStep } from "./steps/benefit-preferences-step";
import { FeePreferenceStep } from "./steps/fee-preference-step";
import { LifestyleStep } from "./steps/lifestyle-step";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { SpendingHabitsStep } from "./steps/spending-habits-step";

export const AdvancedRecommendationForm = () => {
  const { progress, setCurrentStep, hasStoredProgress, getStoredProgress } =
    useRecommendationFormStore();

  const [currentStep, setCurrentStepLocal] = useState(progress.currentStep);
  const [, setCompletedStepsLocal] = useState<number[]>(progress.completedSteps);

  // Initialize form with stored data or defaults
  const getInitialFormData = useCallback((): RecommendationFormData => {
    const storedProgress = getStoredProgress();
    if (storedProgress && Object.keys(storedProgress.formData).length > 0) {
      return {
        personalInfo: {
          age: 25,
          monthlyIncome: 200000,
          occupation: "self_employed",
          existingCreditCard: true,
          creditScore: "excellent",
          ...storedProgress.formData.personalInfo,
        },
        spendingHabits: {
          primarySpendingCategories: ["food_dining", "online_shopping","fuel","luxury_shopping","online_shopping"],
          monthlySpend: 55000,
          paymentPreference: "mixed",
          foodDeliveryFrequency: "daily",
          shoppingPlatforms: ["amazon_in", "flipkart","myntra","croma","ajio","lenskart","h&m"],
          ...storedProgress.formData.spendingHabits,
        },
        benefitPreferences: {
          priorityBenefits: ["cashback", "reward_points"],
          rewardType: "cashback",
          redemptionPreference: "direct_cashback",
          milestoneRewards: true,
          ...storedProgress.formData.benefitPreferences,
        },
        lifestyle: {
          travelFrequency: "",
          travelType: [],
          loungeAccess: true,
          golfInterest: true,
          diningFrequency: "weekly",
          movieFrequency: "weekly",
          luxuryPreferences: true,
          ...storedProgress.formData.lifestyle,
        },
        feePreference: {
          annualFeeTolerance: "premium",
          feeWaiverImportant: true,
          cardTier: "super_premium",
          preferredBanks: [],
          ...storedProgress.formData.feePreference,
        },
      };
    }

    return {
      personalInfo: {
        age: 25,
        monthlyIncome: 200000,
        occupation: "self_employed",
        existingCreditCard: true,
        creditScore: "excellent",
      },
      spendingHabits: {
        primarySpendingCategories: [
          "food_dining",
          "online_shopping",
          "fuel",
          "luxury_shopping",
          "online_shopping"
        ],
        monthlySpend: 55000,
        paymentPreference: "mixed",
        foodDeliveryFrequency: "daily",
        shoppingPlatforms: [
          "amazon_in",
          "flipkart",
          "myntra",
          "croma",
          "ajio",
          "lenskart",
          "h&m"
        ],
      },
      benefitPreferences: {
        priorityBenefits: ["cashback", "reward_points"],
        rewardType: "cashback",
        redemptionPreference: "direct_cashback",
        milestoneRewards: true,
      },
      lifestyle: {
        travelFrequency: "1_2_times_year",
        travelType: [],
        loungeAccess: true,
        golfInterest: true,
        diningFrequency: "weekly",
        movieFrequency: "weekly",
        luxuryPreferences: true,
      },
      feePreference: {
        annualFeeTolerance: "premium",
        feeWaiverImportant: true,
        cardTier: "super_premium",
        preferredBanks: [],
      },
    };
  }, [getStoredProgress]);

  const form = useForm<RecommendationFormData>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: getInitialFormData(),
  });

  // Load stored progress on component mount
  useEffect(() => {
    if (hasStoredProgress()) {
      const storedProgress = getStoredProgress();
      if (storedProgress) {
        setCurrentStepLocal(storedProgress.currentStep);
        setCompletedStepsLocal(storedProgress.completedSteps);
        setCurrentStep(storedProgress.currentStep);

        // Reset form with stored data
        form.reset(getInitialFormData());

        toast.info("Restored your previous progress");
      }
    }
  }, [form, getInitialFormData, getStoredProgress, hasStoredProgress, setCurrentStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep form={form} />;
      case 1:
        return <SpendingHabitsStep form={form} />;
      case 2:
        return <BenefitPreferencesStep form={form} />;
      case 3:
        return <LifestyleStep form={form} />;
      case 4:
        return <FeePreferenceStep form={form} />;
      default:
        return <PersonalInfoStep form={form} />;
    }
  };

  return (
    <div className="mx-auto mb-40 w-full max-w-6xl">
      <Card className="border-none bg-transparent p-0 shadow-transparent">
        <CardContent className="border-none p-0 shadow-none">
          <Form {...form}>
            <form className="space-y-8">
              <div className="min-h-[600px]">{renderCurrentStep()}</div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
