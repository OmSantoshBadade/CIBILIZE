import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { IndividualStepForm } from "@/components/credit-card/individual-step-form";
import { RecommendationFormData } from "@/components/credit-card/recommendation-form-schema";
import { createScorerFromCreditData } from "@/lib/credit-card-scoring";
import { useRecommendationFormStore } from "@/store/recommendation-form-store";
import CreditCardResults from "./credit-card-results";

const AdvancedCreditCardRecommendations = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { saveRecommendation } = useRecommendationFormStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("result");

  const handleFormSubmit = async (data: RecommendationFormData) => {
    if (!user) {
      toast.error("Please log in to get personalized recommendations");
      return;
    }

    setLoading(true);

    try {
      // Use mapped CREDIT_DATA.ts source via the scorer factory
      const scorer = createScorerFromCreditData();
      const scoredCards = scorer.scoreAndRank(data, 5);

      // console.log("Scored cards:", scoredCards);
      // console.log("First card details:", scoredCards[0]);

      // Save recommendation to IndexedDB and clear localStorage
      const recId = await saveRecommendation(data, scoredCards);

      toast.success(`Found ${scoredCards.length} personalized recommendations!`);

      // Navigate to results page
      navigate("/app/credit-cards/recommendations?result=" + encodeURIComponent(recId));
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast.error("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (resultId) {
    return <CreditCardResults />;
  }

  if (!searchParams.get("step")) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center py-80">
        <Card className="w-full max-w-xl">
          <CardHeader>
            Start by answering a few questions to get personalized recommendations
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/app/credit-cards/recommendations?step=0")}>
              Start Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full w-full space-y-6 py-80">
      <IndividualStepForm onSubmit={handleFormSubmit} isSubmitting={loading} />
    </div>
  );
};

export default AdvancedCreditCardRecommendations;
