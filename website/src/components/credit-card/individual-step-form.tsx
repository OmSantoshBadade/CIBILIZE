import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { useRecommendationFormStore } from "@/store/recommendation-form-store";
import { ButtonGroup } from "../ui/button-group";
import { useCreditCardLayout } from "./credit-card-layout-provider";
import {
  recommendationFormSchema,
  type RecommendationFormData,
} from "./recommendation-form-schema";
import { StepAge } from "./steps/step-age";
import { StepAnnualFeeTolerance } from "./steps/step-annual-fee-tolerance";
import { StepCardTier } from "./steps/step-card-tier";
import { StepCreditScore } from "./steps/step-credit-score";
import { StepDiningFrequency } from "./steps/step-dining-frequency";
import { StepExistingCreditCard } from "./steps/step-existing-credit-card";
import { StepFeeWaiverImportant } from "./steps/step-fee-waiver-important";
import { StepFoodDeliveryFrequency } from "./steps/step-food-delivery-frequency";
import { StepGolfInterest } from "./steps/step-golf-interest";
import { StepLoungeAccess } from "./steps/step-lounge-access";
import { StepLuxuryPreferences } from "./steps/step-luxury-preferences";
import { StepMilestoneRewards } from "./steps/step-milestone-rewards";
import { StepMonthlyIncome } from "./steps/step-monthly-income";
import { StepMonthlySpend } from "./steps/step-monthly-spend";
import { StepMovieFrequency } from "./steps/step-movie-frequency";
import { StepOccupation } from "./steps/step-occupation";
import { StepPaymentPreference } from "./steps/step-payment-preference";
import { StepPreferredBanks } from "./steps/step-preferred-banks";
import { StepPriorityBenefits } from "./steps/step-priority-benefits";
import { StepRedemptionPreference } from "./steps/step-redemption-preference";
import { StepRewardType } from "./steps/step-reward-type";
import { StepShoppingPlatforms } from "./steps/step-shopping-platforms";
import { StepSpendingCategories } from "./steps/step-spending-categories";
import { StepTravelFrequency } from "./steps/step-travel-frequency";
import { StepTravelType } from "./steps/step-travel-type";

interface IndividualStepFormProps {
  onSubmit: (data: RecommendationFormData) => Promise<void>;
  isSubmitting?: boolean;
}

// Define all individual steps
const FORM_STEPS = [
  { id: 0, name: "Age", field: "personalInfo.age" },
  { id: 1, name: "Monthly Income", field: "personalInfo.monthlyIncome" },
  { id: 2, name: "Occupation", field: "personalInfo.occupation" },
  { id: 3, name: "Existing Credit Card", field: "personalInfo.existingCreditCard" },
  { id: 4, name: "Credit Score", field: "personalInfo.creditScore" },
  { id: 5, name: "Spending Categories", field: "spendingHabits.primarySpendingCategories" },
  { id: 6, name: "Monthly Spend", field: "spendingHabits.monthlySpend" },
  { id: 7, name: "Payment Preference", field: "spendingHabits.paymentPreference" },
  { id: 8, name: "Food Delivery Frequency", field: "spendingHabits.foodDeliveryFrequency" },
  { id: 9, name: "Shopping Platforms", field: "spendingHabits.shoppingPlatforms" },
  { id: 10, name: "Priority Benefits", field: "benefitPreferences.priorityBenefits" },
  { id: 11, name: "Reward Type", field: "benefitPreferences.rewardType" },
  { id: 12, name: "Redemption Preference", field: "benefitPreferences.redemptionPreference" },
  { id: 13, name: "Milestone Rewards", field: "benefitPreferences.milestoneRewards" },
  { id: 14, name: "Travel Frequency", field: "lifestyle.travelFrequency" },
  { id: 15, name: "Travel Type", field: "lifestyle.travelType" },
  { id: 16, name: "Lounge Access", field: "lifestyle.loungeAccess" },
  { id: 17, name: "Golf Interest", field: "lifestyle.golfInterest" },
  { id: 18, name: "Dining Frequency", field: "lifestyle.diningFrequency" },
  { id: 19, name: "Movie Frequency", field: "lifestyle.movieFrequency" },
  { id: 20, name: "Luxury Preferences", field: "lifestyle.luxuryPreferences" },
  { id: 21, name: "Annual Fee Tolerance", field: "feePreference.annualFeeTolerance" },
  { id: 22, name: "Fee Waiver Important", field: "feePreference.feeWaiverImportant" },
  { id: 23, name: "Card Tier", field: "feePreference.cardTier" },
  { id: 24, name: "Preferred Banks", field: "feePreference.preferredBanks" },
];

export const IndividualStepForm = ({ onSubmit, isSubmitting = false }: IndividualStepFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  const {
    progress,
    setCurrentStep,
    addCompletedStep,
    updateFormData,
    hasStoredProgress,
    getStoredProgress,
  } = useRecommendationFormStore();

  const {
    currentStepIndex,
    setCurrentStepIndex,
    steps,
    setSteps,
    completedSteps,
    setCompletedSteps,
    addCompletedStep: addCompletedStepToContext,
  } = useCreditCardLayout();

  // Initialize steps if not already set
  useEffect(() => {
    if (steps.length === 0) {
      setSteps(FORM_STEPS);
    }
  }, [steps, setSteps]);

  // Sync currentStepIndex with URL param
  useEffect(() => {
    const urlStep = parseInt(searchParams.get("step") || "0", 10);
    if (urlStep !== currentStepIndex) {
      setCurrentStepIndex(urlStep);
    }
  }, [searchParams, currentStepIndex, setCurrentStepIndex]);

  // Sync completedSteps with store
  useEffect(() => {
    if (progress.completedSteps.length > 0 && completedSteps.length === 0) {
      setCompletedSteps(progress.completedSteps);
    }
  }, [progress.completedSteps, completedSteps, setCompletedSteps]);

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
        monthlyIncome: 500000,
        occupation: "salaried",
        existingCreditCard: false,
        creditScore: "unknown",
      },
      spendingHabits: {
        primarySpendingCategories: ["food_dining", "online_shopping"],
        monthlySpend: 25000,
        paymentPreference: "mixed",
        foodDeliveryFrequency: "weekly",
        shoppingPlatforms: ["amazon_in", "flipkart"],
      },
      benefitPreferences: {
        priorityBenefits: ["cashback", "reward_points"],
        rewardType: "no_preference",
        redemptionPreference: "direct_cashback",
        milestoneRewards: false,
      },
      lifestyle: {
        travelFrequency: "1_2_times_year",
        travelType: [],
        loungeAccess: false,
        golfInterest: false,
        diningFrequency: "weekly",
        movieFrequency: "monthly",
        luxuryPreferences: false,
      },
      feePreference: {
        annualFeeTolerance: "medium",
        feeWaiverImportant: true,
        cardTier: "mid_tier",
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
        setCompletedSteps(storedProgress.completedSteps);
        setCurrentStep(currentStepIndex);

        // Reset form with stored data
        form.reset(getInitialFormData());

        toast.info("Restored your previous progress");
      }
    }
  }, [
    form,
    getInitialFormData,
    getStoredProgress,
    hasStoredProgress,
    setCurrentStep,
    currentStepIndex,
  ]);

  // Save form data whenever it changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as RecommendationFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  // Validate current step
  const validateCurrentStep = async () => {
    const currentStep = FORM_STEPS[currentStepIndex];
    if (!currentStep) return false;

    try {
      await form.trigger(currentStep.field as keyof RecommendationFormData);
      const errors = form.formState.errors;
      return !errors[currentStep.field.split(".")[0] as keyof typeof errors];
    } catch {
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();

    if (!isValid) {
      toast.error("Please fill in all required fields before continuing");
      return;
    }

    console.log(
      `Current step: ${currentStepIndex}, Total steps: ${FORM_STEPS.length}, Is final step: ${currentStepIndex === FORM_STEPS.length - 1}`,
    );

    if (currentStepIndex < FORM_STEPS.length - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStepIndex)) {
        addCompletedStepToContext(currentStepIndex);
        addCompletedStep(currentStepIndex);
      }

      const nextStep = currentStepIndex + 1;
      setCurrentStep(nextStep);

      // Save current step data to store
      const currentFormData = form.getValues();
      updateFormData(currentFormData);

      // Navigate to next step
      setSearchParams({ step: nextStep.toString() });
    } else {
      console.log("dd");
      // Final step - submit form
      console.log("Final step reached, submitting form...");
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      // Save current form data before going back
      const currentFormData = form.getValues();
      updateFormData(currentFormData);

      const prevStep = currentStepIndex - 1;
      setCurrentStep(prevStep);
      setSearchParams({ step: prevStep.toString() });
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called");

    if (!user) {
      toast.error("Please log in to get personalized recommendations");
      return;
    }

    console.log("User authenticated, validating form...");
    console.log("Current form data:", form.getValues());

    const isValid = await form.trigger();
    if (!isValid) {
      console.log("Form validation failed");
      console.log("Form errors:", form.formState.errors);

      // Log specific validation errors
      const errors = form.formState.errors;
      if (errors.personalInfo) {
        console.log("Personal Info errors:", errors.personalInfo);
      }
      if (errors.spendingHabits) {
        console.log("Spending Habits errors:", errors.spendingHabits);
      }
      if (errors.benefitPreferences) {
        console.log("Benefit Preferences errors:", errors.benefitPreferences);
      }
      if (errors.lifestyle) {
        console.log("Lifestyle errors:", errors.lifestyle);
      }
      if (errors.feePreference) {
        console.log("Fee Preference errors:", errors.feePreference);
      }

      toast.error("Please complete all required fields");
      return;
    }

    console.log("Form is valid, submitting...");
    try {
      const formData = form.getValues();
      console.log("Form data:", formData);
      await onSubmit(formData);

      // Mark final step as completed
      if (!completedSteps.includes(currentStepIndex)) {
        addCompletedStepToContext(currentStepIndex);
        addCompletedStep(currentStepIndex);
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to get recommendations. Please try again.");
    }
  };

  const canGoNext = () => {
    if (currentStepIndex === FORM_STEPS.length - 1) {
      return true; // Can always try to submit
    }
    return true; // Allow navigation, validation happens on next
  };

  const canGoPrevious = () => {
    return currentStepIndex > 0;
  };

  const renderCurrentStep = () => {
    const stepProps = {
      form,
      currentStep: currentStepIndex,
      totalSteps: FORM_STEPS.length,
      onNext: handleNext,
      onPrevious: handlePrevious,
      canGoNext: canGoNext(),
      canGoPrevious: canGoPrevious(),
      isSubmitting,
      isFinalStep: currentStepIndex === FORM_STEPS.length - 1,
    };

    return (
      <Form {...form}>
        <form className="flex h-full w-full flex-col items-center justify-center space-y-8 px-3 md:px-0">
          {(() => {
            switch (currentStepIndex) {
              case 0:
                return <StepAge {...stepProps} />;
              case 1:
                return <StepMonthlyIncome {...stepProps} />;
              case 2:
                return <StepOccupation {...stepProps} />;
              case 3:
                return <StepExistingCreditCard {...stepProps} />;
              case 4:
                return <StepCreditScore {...stepProps} />;
              case 5:
                return <StepSpendingCategories {...stepProps} />;
              case 6:
                return <StepMonthlySpend {...stepProps} />;
              case 7:
                return <StepPaymentPreference {...stepProps} />;
              case 8:
                return <StepFoodDeliveryFrequency {...stepProps} />;
              case 9:
                return <StepShoppingPlatforms {...stepProps} />;
              case 10:
                return <StepPriorityBenefits {...stepProps} />;
              case 11:
                return <StepRewardType {...stepProps} />;
              case 12:
                return <StepRedemptionPreference {...stepProps} />;
              case 13:
                return <StepMilestoneRewards {...stepProps} />;
              case 14:
                return <StepTravelFrequency {...stepProps} />;
              case 15:
                return <StepTravelType {...stepProps} />;
              case 16:
                return <StepLoungeAccess {...stepProps} />;
              case 17:
                return <StepGolfInterest {...stepProps} />;
              case 18:
                return <StepDiningFrequency {...stepProps} />;
              case 19:
                return <StepMovieFrequency {...stepProps} />;
              case 20:
                return <StepLuxuryPreferences {...stepProps} />;
              case 21:
                return <StepAnnualFeeTolerance {...stepProps} />;
              case 22:
                return <StepFeeWaiverImportant {...stepProps} />;
              case 23:
                return <StepCardTier {...stepProps} />;
              case 24:
                return <StepPreferredBanks {...stepProps} />;
              // All 25 steps are now implemented
              default:
                return <StepAge {...stepProps} />;
            }
          })()}
        </form>
      </Form>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
      {renderCurrentStep()}

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        {currentStepIndex === FORM_STEPS.length - 1 ? (
          <Button type="button" size="sm" onClick={handleSubmit} disabled={isSubmitting}>
            Get Recommendations
          </Button>
        ) : (
          <ButtonGroup>
            <Button type="button" size="lg" onClick={handlePrevious} disabled={!canGoPrevious()}>
              Previous
            </Button>

            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              disabled={!canGoNext() || isSubmitting}
            >
              Next
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};
