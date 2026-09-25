import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { creditCardApi, type SavedRecommendation } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Calendar, Link, Loader2, Star, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "sonner";

const RecommendationsHistory = () => {
  const [recommendations, setRecommendations] = useState<SavedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await creditCardApi.getRecommendationHistory({
          limit: 50,
        });
        setRecommendations(response.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast.error("Failed to load recommendation history");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col gap-0">
        <Typography.H3>Recommendations History</Typography.H3>
        <Typography.H4>
          View your personalized credit card recommendations and past sessions.
        </Typography.H4>
      </div> */}

      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Recommendations History</h1>
        <p className="text-muted-foreground text-lg">
          View your personalized credit card recommendations and past sessions.
        </p>
      </div>

      {recommendations.length === 0 ? (
        <Card
          className={cn(
            "flex h-full w-full flex-col items-center justify-center rounded-none border-none bg-transparent shadow-none",
          )}
        >
          <CardContent className="flex w-full max-w-xl flex-col items-center justify-center space-y-6 p-6">
            <div className="border-border flex size-16 items-center justify-center rounded-2xl border-2 border-dashed p-2">
              <FaInfoCircle />
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-1.5 text-center">
                <Typography.H4>No recommendations found</Typography.H4>
                <Typography.P className="mt-0 leading-normal text-balance">
                  No recommendations found
                </Typography.P>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid">
          {recommendations.map((recommendation, index) => (
            <Card
              key={`subscription-card-${index}`}
              className={cn(
                "group bg-background flex flex-col gap-0 rounded-none border-b-0 p-0 shadow-none transition-all",
                index === 0 && "rounded-t-lg",
                index === recommendations.length - 1 && "rounded-b-lg border-b",
              )}
            >
              <CardHeader className="bg-muted/30 rounded-t-lg border-b p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {recommendation.card.image && (
                      <div className="bg-background flex h-10 w-16 items-center justify-center overflow-hidden rounded-sm border">
                        <img
                          src={recommendation.card.image}
                          alt={recommendation.card.title}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg leading-tight font-semibold">
                        {recommendation.card.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {recommendation.card.issuer}
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-[110px] flex-col items-end gap-1">
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded px-2 py-1 text-xs font-medium"
                    >
                      <Target className="h-3 w-3" />
                      {recommendation.matchPercentage}% Match
                    </Badge>
                    {recommendation.card.rating && (
                      <Badge
                        variant="outline"
                        className="gap-1 rounded px-2 py-1 text-xs font-medium"
                      >
                        <Star className="h-3 w-3" />
                        {recommendation.card.rating}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 p-6">
                <div>
                  <h4 className="text-primary mb-2 text-sm font-semibold">Why Recommended</h4>
                  <ul className="space-y-1">
                    {recommendation.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                        <span className="leading-snug">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {recommendation.card.why_to_recommend && (
                  <div>
                    <h4 className="text-primary mb-2 text-sm font-semibold">Card Overview</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {recommendation.card.why_to_recommend}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(recommendation.createdAt)}</span>
                    {recommendation.isFallback && (
                      <Badge variant="outline" className="rounded px-2 py-0.5 text-xs">
                        Popular Choice
                      </Badge>
                    )}
                  </div>
                  {recommendation.card.cta?.apply_link && (
                    <Button size="sm" asChild>
                      <Link to={recommendation.card.cta.apply_link} target="_blank">
                        Apply Now
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsHistory;
