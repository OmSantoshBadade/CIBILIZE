import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { useRecommendationFormStore } from "@/store/recommendation-form-store";
import { useCreditCardLayout } from "./credit-card-layout-provider";
import {
  recommendationFormSchema,
  type RecommendationFormData,
} from "./recommendation-form-schema";
import { StepBenefitPreferences } from "./steps/step-benefit-preferences";
import { StepFeePreference } from "./steps/step-fee-preference";
import { StepLifestyle } from "./steps/step-lifestyle";
import { StepPersonalInfo } from "./steps/step-personal-info";
import { StepSpendingHabits } from "./steps/step-spending-habits";

interface StepBasedRecommendationFormProps {
  onSubmit: (data: RecommendationFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const FORM_STEPS = [
  {
    id: "personal-info",
    title: "Personal Info",
    description: "Basic profile",
  },
  {
    id: "spending-habits",
    title: "Spending Habits",
    description: "Where you spend",
  },
  {
    id: "benefits",
    title: "Benefits",
    description: "What you value",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    description: "Travel & activities",
  },
  {
    id: "fees",
    title: "Fees",
    description: "Budget & preferences",
  },
];

export const StepBasedRecommendationForm = ({
  onSubmit,
  isSubmitting = false,
}: StepBasedRecommendationFormProps) => {
  const { stepIndex } = useParams<{ stepIndex: string }>();
  const navigate = useNavigate();
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
    const urlStep = parseInt(stepIndex || "0", 10);
    if (urlStep !== currentStepIndex) {
      setCurrentStepIndex(urlStep);
    }
  }, [stepIndex, currentStepIndex, setCurrentStepIndex]);

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
          monthlyIncome: 500000,
          occupation: "salaried",
          existingCreditCard: false,
          creditScore: "unknown",
          ...storedProgress.formData.personalInfo,
        },
        spendingHabits: {
          primarySpendingCategories: ["food_dining", "online_shopping"],
          monthlySpend: 25000,
          paymentPreference: "mixed",
          foodDeliveryFrequency: "weekly",
          shoppingPlatforms: ["amazon_in", "flipkart"],
          ...storedProgress.formData.spendingHabits,
        },
        benefitPreferences: {
          priorityBenefits: ["cashback", "reward_points"],
          rewardType: "no_preference",
          redemptionPreference: "direct_cashback",
          milestoneRewards: false,
          ...storedProgress.formData.benefitPreferences,
        },
        lifestyle: {
          travelFrequency: "1_2_times_year",
          travelType: [],
          loungeAccess: false,
          golfInterest: false,
          diningFrequency: "weekly",
          movieFrequency: "monthly",
          luxuryPreferences: false,
          ...storedProgress.formData.lifestyle,
        },
        feePreference: {
          annualFeeTolerance: "medium",
          feeWaiverImportant: true,
          cardTier: "mid_tier",
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

  // Validate current step
  const validateCurrentStep = async () => {
    const stepFields = {
      0: ["personalInfo"],
      1: ["spendingHabits"],
      2: ["benefitPreferences"],
      3: ["lifestyle"],
      4: ["feePreference"],
    };

    const fieldsToValidate = stepFields[currentStepIndex as keyof typeof stepFields];

    try {
      for (const field of fieldsToValidate) {
        await form.trigger(field as keyof RecommendationFormData);
      }

      const errors = form.formState.errors;
      const hasStepErrors = fieldsToValidate.some((field) => errors[field as keyof typeof errors]);

      return !hasStepErrors;
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

    if (currentStepIndex < FORM_STEPS.length - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStepIndex)) {
        addCompletedStepToContext(currentStepIndex);
        addCompletedStep(currentStepIndex);
      }

      const nextStep = currentStepIndex + 1;
      setCurrentStep(nextStep);
      setCurrentStepIndex(nextStep);

      // Save current step data to store
      const currentFormData = form.getValues();
      updateFormData(getStepData(currentFormData, currentStepIndex));

      // Navigate to next step
      navigate(`/app/credit-cards/step/${nextStep}`);
    } else {
      // Final step - submit form
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const prevStep = currentStepIndex - 1;
      setCurrentStep(prevStep);
      setCurrentStepIndex(prevStep);
      navigate(`/app/credit-cards/step/${prevStep}`);
    }
  };

  // Helper function to extract step-specific data
  const getStepData = (formData: RecommendationFormData, step: number) => {
    const stepFields = {
      0: { personalInfo: formData.personalInfo },
      1: { spendingHabits: formData.spendingHabits },
      2: { benefitPreferences: formData.benefitPreferences },
      3: { lifestyle: formData.lifestyle },
      4: { feePreference: formData.feePreference },
    };

    return stepFields[step as keyof typeof stepFields] || {};
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to get personalized recommendations");
      return;
    }

    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      const formData = form.getValues();
      await onSubmit(formData);

      // Mark final step as completed
      const finalStepIndex = FORM_STEPS.length - 1;
      if (!completedSteps.includes(finalStepIndex)) {
        addCompletedStepToContext(finalStepIndex);
        addCompletedStep(finalStepIndex);
      }
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
    };

    switch (currentStepIndex) {
      case 0:
        return <StepPersonalInfo {...stepProps} />;
      case 1:
        return <StepSpendingHabits {...stepProps} />;
      case 2:
        return <StepBenefitPreferences {...stepProps} />;
      case 3:
        return <StepLifestyle {...stepProps} />;
      case 4:
        return <StepFeePreference {...stepProps} />;
      default:
        return <StepPersonalInfo {...stepProps} />;
    }
  };

  return <div className="space-y-6">{renderCurrentStep()}</div>;
};
