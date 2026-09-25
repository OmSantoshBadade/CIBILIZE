import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { useAuthStore } from "@/store/auth-store";
import { BarChart3, MessageCircle, Shield, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";

import LayoutHeader from "@/components/layout-header";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/disclosure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpecialCard, SpecialCardContent } from "@/components/ui/special-card";
import { ScoredCard } from "@/lib/credit-card-scoring";
import { CreditCardTypes } from "@/lib/CREDIT_DATA";
import { useRecommendationFormStore } from "@/store/recommendation-form-store";

const CreditCardResults = () => {
  const [recommendations, setRecommendations] = useState<ScoredCard[]>([]);
  const [chartType, setChartType] = useState<"pie" | "bar" | "radial">("pie");
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // load recommendation by id (from URL) or fallback to latest

  // Vibrant color palette derived from badge variants for high contrast charts
  const colorPalette = [
    "#ff2400", // scarlet
    "#dc143c", // crimson
    "#e0115f", // ruby
    "#ff7f50", // coral
    "#ffcbad", // peach
    "#fa8072", // salmon
    "#ffd700", // gold
    "#cd7f32", // bronze
    "#b87333", // copper
    "#ffc30b", // honey
    "#ffbf00", // amberVivid
    "#d4ff00", // chartreuse
    "#d0ff14", // limeVivid
    "#00ff7f", // spring
    "#00a86b", // jade
    "#7fffd4", // aquamarine
    "#00fff7", // cyanBright
    "#007ba7", // cerulean
    "#007fff", // azure
    "#87ceeb", // skyBright
    "#6f00ff", // indigoBright
    "#8f00ff", // violetBright
    "#9966cc", // amethyst
    "#dda0dd", // plum
    "#da70d6", // orchid
    "#ff33ff", // fuchsiaBright
    "#ff66cc", // roseBright
    "#ff69b4", // hotpink
    "#de3163", // cherry
    "#e35335", // poppy
    "#ffee00", // bright yellow alt
    "#66b447", // apple
    "#3bb9ff", // ocean
    "#4f86f7", // blueberry
    "#2243b6", // navyBright
    "#0f52ba", // sapphire
    "#5da9e9", // bluejeans
    "#eea9b8", // blushRose
    "#ffc324", // mango
  ];

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const resultId = params.get("result");
        const { getRecommendationById } = useRecommendationFormStore.getState();
        if (resultId) {
          const rec = await getRecommendationById(resultId);
          if (isMounted && rec && Array.isArray(rec.recommendations)) {
            setRecommendations(rec.recommendations);
            return;
          }
          // If ID not found, show empty state rather than falling back to a random latest
          if (isMounted) setRecommendations([]);
          return;
        }
        // No id provided → empty to prompt user to start a new run
        if (isMounted) setRecommendations([]);
      } catch (e) {
        if (isMounted) setRecommendations([]);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [location.search]);

  const resetForm = () => {
    navigate("/app/credit-cards/recommendations?step");
  };

  const talkToAgent = () => {
    navigate("/agent");
    localStorage.setItem("agentCreditcardRecommedatinoData", JSON.stringify(recommendations));
  };
 

  const getChartData = () => {
    if (recommendations.length === 0) return [];

    return recommendations.map((card, index) => ({
      name: card.title.length > 25 ? card.title.substring(0, 25) + "..." : card.title,
      fullName: card.title,
      issuer: card.issuer,
      score: isNaN(card.matchPercentage) ? 0 : card.matchPercentage,
      confidence: isNaN(card.confidenceScore) ? 0 : card.confidenceScore,
      reasons: Array.isArray(card.reasons) ? card.reasons : [],
      fill: colorPalette[index % colorPalette.length],
    }));
  };

  const chartConfig = {
    score: {
      label: "Match Score",
      color: "var(--chart-1)",
    },
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: {
        fullName: string;
        issuer: string;
        score: number;
        confidence: number;
        reasons: string[];
        fill: string;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background max-w-xs rounded-lg border p-4 shadow-lg">
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-semibold">{data.fullName}</h4>
              <p className="text-muted-foreground text-xs">{data.issuer}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.fill }} />
              <span className="text-sm font-medium">{data.score}% Match</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-blue-500" />
              <span className="text-sm">{data.confidence}% Confidence</span>
            </div>
            {data.reasons && data.reasons.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-1 text-xs font-medium">Why recommended:</p>
                <ul className="space-y-1 text-xs">
                  {data.reasons.map((reason: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-green-600">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // if (loading) {
  //   return (
  //     <div className="flex min-h-svh w-full flex-col">
  //       <LayoutHeader />
  //       <div className="flex flex-1 items-center justify-center">
  //         <div className="text-center">
  //           <div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
  //           <p className="text-muted-foreground">Loading your recommendations...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (recommendations.length === 0) {
    return (
      <div className="flex min-h-svh w-full flex-col">
        <LayoutHeader />
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>No Recommendations Found</CardTitle>
              <CardDescription>
                It looks like you haven't completed the credit card recommendation form yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/app/credit-cards")} className="w-full">
                Start Credit Card Recommendation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-start space-y-8">
      <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <Typography.Heading variant="2xl">Your Personalized Recommendations</Typography.Heading>
          <Typography.SubHeading variant="md">
            Based on your comprehensive profile analysis
          </Typography.SubHeading>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={talkToAgent} className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Talk to Agent
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Start Over
          </Button>
        </div>
      </div>

      {/* */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SpecialCard className="w-full cursor-default lg:col-span-2">
          <SpecialCardContent className="space-y-4 p-0">
            <CardHeader className="px-0 text-left">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center justify-start gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Match Analysis
                  </CardTitle>
                  <CardDescription>How well each card matches your profile</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={chartType} onValueChange={(v) => setChartType(v as any)}>
                    <SelectTrigger className="h-8 min-w-[130px]">
                      <SelectValue placeholder="Chart type" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="pie">Pie</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                      <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            {getChartData().length > 0 ? (
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[300px] w-full"
              >
                {chartType === "pie" ? (
                  <PieChart>
                    <ChartTooltip cursor={false} content={<CustomTooltip />} />
                    <Pie
                      data={getChartData()}
                      dataKey="score"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={120}
                    >
                      {getChartData().map((entry, idx) => (
                        <Cell key={`pie-cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                ) : chartType === "bar" ? (
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide={false} interval={0} angle={0} dy={8} />
                    <YAxis />
                    <ChartTooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
                    <Bar dataKey="score">
                      {getChartData().map((entry, idx) => (
                        <Cell key={`bar-cell-${idx}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <RadialBarChart data={getChartData()} innerRadius={40} outerRadius={120}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <ChartTooltip cursor={false} content={<CustomTooltip />} />
                    <RadialBar dataKey="score" background cornerRadius={4}>
                      {getChartData().map((entry, idx) => (
                        <Cell key={`radial-cell-${idx}`} fill={entry.fill} />
                      ))}
                    </RadialBar>
                  </RadialBarChart>
                )}
              </ChartContainer>
            ) : (
              <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                No chart data available
              </div>
            )}

            <div className="space-y-2">
              <p className="text-muted-foreground text-left text-xs">
                Hover over each segment to see detailed analysis
              </p>
              <div className="flex flex-wrap justify-start gap-2">
                {getChartData().map((item, index) => (
                  <Badge
                    key={index}
                    className="text-primary bg-muted flex items-center gap-1 rounded-full border-none px-3 py-0.5 text-xs font-medium capitalize"
                  >
                    <span
                      className="mr-1 inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.fill, border: `1.5px solid ${item.fill}` }}
                    />
                    <span className="text-xs">{item.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </SpecialCardContent>
        </SpecialCard>

        <SpecialCard className="cursor-default">
          <SpecialCardContent className="space-y-4 p-0">
            <CardHeader className="px-0 text-left">
              <CardTitle className="flex items-center justify-start gap-2">
                <BarChart3 className="h-5 w-5" />
                Analysis Summary
              </CardTitle>
              <CardDescription>Your recommendation insights</CardDescription>
            </CardHeader>
            <div className="flex flex-col gap-4">
              <div className="bg-cibilize-blue/10 flex flex-col items-center justify-center rounded-lg border p-4 transition">
                <span className="text-primary text-3xl font-bold">{recommendations.length}</span>
                <span className="text-muted-foreground mt-1 text-sm">Cards Found</span>
              </div>
              <div className="bg-cibilize-green/20 flex flex-col items-center justify-center rounded-lg border p-4 transition">
                <span className="text-cibilize-green text-3xl font-bold">
                  {recommendations.length > 0
                    ? Math.max(
                        ...recommendations.map((r) =>
                          isNaN(r.matchPercentage) ? 0 : r.matchPercentage,
                        ),
                      )
                    : 0}
                  <span className="text-cibilize-green/70 align-super text-xl font-semibold">
                    %
                  </span>
                </span>
                <span className="text-muted-foreground mt-1 text-sm">Best Match</span>
              </div>
              <div className="bg-cibilize-blue/10 flex flex-col items-center justify-center rounded-lg border p-4 transition">
                <span className="text-cibilize-blue text-3xl font-bold">
                  {recommendations.length > 0
                    ? Math.max(
                        ...recommendations.map((r) =>
                          isNaN(r.confidenceScore) ? 0 : r.confidenceScore,
                        ),
                      )
                    : 0}
                  <span className="text-cibilize-blue/70 align-super text-xl font-semibold">%</span>
                </span>
                <span className="text-muted-foreground mt-1 text-sm">Confidence</span>
              </div>
            </div>

            {recommendations.length > 0 && (
              <div className="border-t pt-4">
                <div className="text-foreground mb-1 flex items-center gap-2 text-sm font-semibold">
                  <BarChart3 className="text-primary h-4 w-4" />
                  Top Recommendation
                </div>
                <div className="bg-muted/40 hover:ring-primary/10 flex flex-col gap-2 rounded-lg p-3 shadow transition hover:ring-2 md:flex-row md:items-center md:gap-4">
                  {recommendations[0].image ? (
                    <img
                      src={recommendations[0].image}
                      alt={recommendations[0].title}
                      className="h-12 w-20 rounded border bg-white object-contain object-center shadow-sm transition-shadow"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-muted flex h-12 w-20 items-center justify-center rounded border">
                      <img src="/icon.svg" alt="No image" className="h-6 w-6 opacity-50" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-medium">{recommendations[0].title}</div>
                    <div className="text-muted-foreground truncate text-xs">
                      {recommendations[0].issuer}
                    </div>
                  </div>
                  <div className="flex min-w-[105px] flex-col items-end justify-end gap-0">
                    <Badge className="mb-1 bg-green-100 px-2 py-1 text-xs text-green-800">
                      {isNaN(recommendations[0].matchPercentage)
                        ? 0
                        : recommendations[0].matchPercentage}
                      % Match
                    </Badge>
                    <div className="text-muted-foreground text-xs">
                      <span className="font-medium">
                        {isNaN(recommendations[0].confidenceScore)
                          ? 0
                          : recommendations[0].confidenceScore}
                        %
                      </span>{" "}
                      Confidence
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SpecialCardContent>
        </SpecialCard>
      </div>

      <Separator />

      <div className="w-full space-y-5">
        <div className="space-y-1">
          <Typography.Heading variant="lg">Detailed Recommendations</Typography.Heading>
          <Typography.SubHeading variant="sm">
            Each card is analyzed across multiple factors for the best match
          </Typography.SubHeading>
        </div>

        <Card className="h-full w-full border-none bg-transparent p-0">
          {recommendations.map((creditCard) => (
            <SpecialCard key={creditCard.id} className="w-full">
              <Disclosure key={creditCard.id} className="w-full">
                <DisclosureTrigger className="col-span-12 w-full md:col-span-6">
                  <SpecialCardContent className="relative grid grid-cols-12 gap-4 p-1">
                    <div className="col-span-12 flex flex-col items-start gap-2 md:col-span-3">
                      <div className="bg-muted/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border md:aspect-auto md:h-44">
                        {creditCard.image ? (
                          <img
                            src={creditCard.image}
                            alt={creditCard.title}
                            className="max-h-full max-w-full object-contain object-center transition-transform duration-200 hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-1">
                            <img src="/icon.svg" alt="No image" className="h-8 w-8 opacity-60" />
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-12 flex flex-col justify-between gap-2 md:col-span-9">
                      <div className="flex flex-col gap-1">
                        <Typography.Heading variant="lg" className="text-primary">
                          {creditCard.title}
                        </Typography.Heading>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(creditCard.best_suited_for)
                            ? creditCard.best_suited_for
                            : typeof creditCard.best_suited_for === "string"
                              ? // fix: split comma-separated strings into array
                                creditCard.best_suited_for
                                  .split(",")
                                  .map((val) => val.trim())
                                  .filter(Boolean)
                              : []
                          ).map((categoryRaw) => {
                            const label = categoryRaw.trim().toLowerCase();
                            let variant: any = "secondary";
                            switch (label) {
                              case "rewards":
                                variant = "emerald";
                                break;
                              case "travel":
                                variant = "blue";
                                break;
                              case "movies":
                                variant = "crimson";
                                break;
                              case "fuel":
                                variant = "amberVivid";
                                break;
                              case "shopping":
                                variant = "violetBright";
                                break;
                              case "dining":
                                variant = "apricot";
                                break;
                              case "utilities":
                                variant = "tealBright";
                                break;
                              case "bill payments":
                                variant = "skyBright";
                                break;
                              case "cashback":
                                variant = "gold";
                                break;
                              case "xpresscash":
                                variant = "jade";
                                break;
                              default:
                                variant = "secondary";
                            }
                            return (
                              <Badge
                                key={label}
                                variant={variant}
                                className="rounded-full capitalize"
                              >
                                {label}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-2 flex w-full flex-col gap-2 md:flex-row md:items-center">
                        <div className="flex flex-col space-y-4">
                          <span className="text-primary text-sm font-medium">
                            Joining Fee: {creditCard.annual_fee ? `${creditCard.annual_fee}` : "—"}
                          </span>
                          <span className="text-primary text-sm font-medium">
                            Annual Fee: {creditCard.annual_fee ? `${creditCard.annual_fee}` : "—"}
                          </span>
                          <span className="text-primary text-sm font-medium">
                            Waiver Condition:{" "}
                            {creditCard.waiver_condition ? creditCard.waiver_condition : "—"}
                          </span>
                        </div>
                        <div className="mt-2 flex gap-2 md:mt-0 md:ml-auto">
                          {creditCard.apply_link && (
                            <Button size="sm" asChild>
                              <Link to={creditCard.apply_link} target="_blank">
                                Apply Now
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </SpecialCardContent>
                </DisclosureTrigger>
                <DisclosureContent>
                  <div className="space-y-6 py-4">
                    <div className="space-y-1">
                      <Typography.Heading variant="lg" className="text-primary">
                        Why we recommend this card
                      </Typography.Heading>
                      <Typography.SubHeading className="text-muted-foreground">
                        {creditCard.why_to_recommend || "—"}
                      </Typography.SubHeading>
                    </div>

                    {Array.isArray(creditCard.benefits) && creditCard.benefits.length > 0 && (
                      <div className="space-y-1">
                        <Typography.Heading variant="lg" className="text-primary">
                          Benefits
                        </Typography.Heading>
                        <ul className="ml-4 flex list-disc flex-col gap-1">
                          {creditCard.benefits.map((cb, idx) => (
                            <li key={idx}>
                              <Typography.SubHeading>{cb}</Typography.SubHeading>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-1">
                      <Typography.Heading variant="lg" className="text-primary">
                        Fees &amp; Charges
                      </Typography.Heading>
                      <div className="max-w-md">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Typography.Label>Joining Fee</Typography.Label>
                              </TableCell>
                              <TableCell>
                                <Typography.SubHeading>
                                  {creditCard.annual_fee ? <>{creditCard.annual_fee}</> : "—"}
                                </Typography.SubHeading>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography.Label>Annual Fee</Typography.Label>
                              </TableCell>
                              <TableCell>
                                <Typography.SubHeading>
                                  {creditCard.annual_fee ? <>{creditCard.annual_fee}</> : "—"}
                                </Typography.SubHeading>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {creditCard.reasons && (
                      <div className="space-y-1">
                        <Typography.Heading variant="lg" className="text-primary">
                          Why This Card is Perfect for You:{" "}
                        </Typography.Heading>
                        <ul className="ml-4 flex list-disc flex-col gap-1">
                          {Object.entries(creditCard.reasons).map(([cat, features], i) => (
                            <li key={cat}>
                              <Typography.SubHeading variant="md" className="font-bold capitalize">
                                {features}
                              </Typography.SubHeading>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </DisclosureContent>
              </Disclosure>
            </SpecialCard>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default CreditCardResults;
