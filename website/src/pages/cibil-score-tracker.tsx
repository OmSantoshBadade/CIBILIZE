"use client";

import { useConfetti } from "@/components/confetti";
import ScoreGauge from "@/components/score-gauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpecialCard, SpecialCardContent } from "@/components/ui/special-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { openaiApi, type CibilScorePrediction } from "@/lib/api";
import { CREDIT_CARDS, CreditCardTypes } from "@/lib/CREDIT_DATA";
import { CheckCircleSolid, XCircleSolid } from "@mynaui/icons-react";
import React from "react";

const CibilScoreTracker = () => {
  const [result, setResult] = React.useState<{ score: number } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    income: "500000",
    loanAmount: "500000",
    utilization: "30",
    missedEMIs: "0",
    age: "44",
  });
  const triggerConfetti = useConfetti();
  const [prediction, setPrediction] = React.useState<CibilScorePrediction | null>(null);
  const [creditCards, setCreditCards] = React.useState<CreditCardTypes[]>([]);

  // Minimal UI – no confetti

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setPrediction(null);

    try {
      const predictionData = {
        income: parseFloat(formData.income),
        loanAmount: parseFloat(formData.loanAmount),
        utilization: parseFloat(formData.utilization),
        missedEMIs: parseInt(formData.missedEMIs),
        age: parseInt(formData.age),
      };

      const enhancedData = await openaiApi.predictCreditScoreEnhanced(predictionData);
      setPrediction(enhancedData);
      setResult({ score: enhancedData.score });
      if (enhancedData.score >= 750) {
        triggerConfetti();
      }
    } catch (error) {
      console.error("Error with prediction:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return "Excellent";
    if (score >= 600) return "Good";
    if (score >= 450) return "Average";
    return "Poor";
  };

  const getScoreColor = (score) => {
    if (score >= 750) return "#4ade80";
    if (score >= 600) return "#3b82f6";
    if (score >= 450) return "#fbbf24";
    return "#ef4444";
  };

  const currentScore = result ? result.score : null;

  React.useEffect(() => {
    if (
      prediction &&
      prediction.creditCardRecommendations &&
      prediction.creditCardRecommendations.length > 0
    ) {
      setCreditCards(
        prediction.creditCardRecommendations.map((creditCard) =>
          CREDIT_CARDS.find((c) => c.value === creditCard.productId),
        ),
      );
    }
  }, [prediction]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">CIBIL Score Tracker</h2>
        <p className="text-muted-foreground">
          Monitor and predict your credit score with AI-powered insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SpecialCard className="cursor-default">
          <SpecialCardContent className="cursor-default space-y-4 px-0">
            <div className="space-y-1">
              <Typography.Heading variant="md">Score Prediction</Typography.Heading>
              <Typography.SubHeading>
                Enter your financial details to get an AI-powered CIBIL score prediction
              </Typography.SubHeading>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Typography.Label>Monthly Income (₹)</Typography.Label>
                  <Input
                    id="income"
                    name="income"
                    type="number"
                    placeholder="50000"
                    value={formData.income}
                    onChange={handleChange}
                    step={5000}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Typography.Label>Total Loan Amount (₹)</Typography.Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    placeholder="500000"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    step={5000}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Typography.Label>Credit Utilization (%)</Typography.Label>
                  <Input
                    id="utilization"
                    name="utilization"
                    type="number"
                    placeholder="30"
                    min="0"
                    max="100"
                    value={formData.utilization}
                    onChange={handleChange}
                    step={1}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Typography.Label>Missed EMIs (Last 12 months)</Typography.Label>
                  <Input
                    id="missedEMIs"
                    name="missedEMIs"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.missedEMIs}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Typography.Label>Age</Typography.Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="30"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Predicting..." : "Predict CIBIL Score"}
              </Button>
            </form>
          </SpecialCardContent>
        </SpecialCard>
        <SpecialCard className="cursor-default">
          <SpecialCardContent className="flex h-full cursor-default flex-col justify-between space-y-4 px-0">
            <div className="space-y-1">
              <Typography.Heading variant="md">Score Visualization</Typography.Heading>
              <Typography.SubHeading>
                Interactive representation of your CIBIL score
              </Typography.SubHeading>
            </div>
            <div className="flex flex-1 items-center justify-center">
              {result && !loading ? (
                <div className="flex flex-col items-center space-y-4">
                  <ScoreGauge
                    score={result.score}
                    category={getScoreCategory(result.score)}
                    date={new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  />
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        getScoreCategory(result.score) === "Excellent"
                          ? "emerald"
                          : getScoreCategory(result.score) === "Good"
                            ? "green"
                            : getScoreCategory(result.score) === "Average"
                              ? "amber"
                              : "rose"
                      }
                      className="rounded px-2 py-1 text-sm"
                    >
                      {getScoreCategory(result.score)}
                    </Badge>
                    <Typography.Label>{result.score}</Typography.Label>
                  </div>
                </div>
              ) : (
                <Typography.SubHeading>
                  Your score visualization will appear here after prediction
                </Typography.SubHeading>
              )}
            </div>
          </SpecialCardContent>
        </SpecialCard>
      </div>
      {prediction && (
        <>
          <SpecialCard className="cursor-default">
            <SpecialCardContent className="cursor-default space-y-4 px-0">
              <div className="space-y-1">
                <Typography.Heading variant="md">Summary</Typography.Heading>
                <Typography.SubHeading>Key insights based on your profile</Typography.SubHeading>
              </div>

              <Typography.Heading variant="md">{prediction.reason}</Typography.Heading>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <Typography.Label className="block px-0">Category</Typography.Label>
                  <Badge
                    variant={
                      prediction.scoreCategory === "Excellent"
                        ? "emerald"
                        : prediction.scoreCategory === "Good"
                          ? "green"
                          : prediction.scoreCategory === "Average"
                            ? "amber"
                            : prediction.scoreCategory === "Poor"
                              ? "rose"
                              : "neutral"
                    }
                    className="rounded px-2 py-1 text-sm"
                  >
                    {prediction.scoreCategory}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Typography.Label className="block px-0">Overall Risk</Typography.Label>
                  <Badge
                    variant={
                      prediction.riskAssessment.overallRisk === "Low"
                        ? "emerald"
                        : prediction.riskAssessment.overallRisk === "Moderate"
                          ? "amber"
                          : prediction.riskAssessment.overallRisk === "High"
                            ? "rose"
                            : "neutral"
                    }
                    className="rounded px-2 py-1 text-sm"
                  >
                    {prediction.riskAssessment.overallRisk}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Typography.Label className="block px-0">Next Milestone</Typography.Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="blue" className="rounded px-2 text-xs">
                      {prediction.nextMilestone.targetCategory}
                    </Badge>
                    <Typography.Small>
                      ({prediction.nextMilestone.pointsNeeded} pts)
                    </Typography.Small>
                  </div>
                </div>
              </div>

              <div className="mt-4 mb-2 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Typography.Label className="block px-0">Focus Area</Typography.Label>
                  <Badge variant="sky" className="rounded px-2 text-sm">
                    {prediction.nextMilestone.suggestedFocusArea}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Typography.Label className="block px-0">Loan Eligibility</Typography.Label>
                  <Badge
                    variant={prediction.loanEligibility.eligibleForLoan ? "success" : "destructive"}
                    className="rounded px-2 text-sm"
                  >
                    {prediction.loanEligibility.eligibleForLoan ? "Eligible" : "Not eligible"}
                  </Badge>
                </div>
              </div>
            </SpecialCardContent>
          </SpecialCard>

          <div className="grid gap-6 md:grid-cols-2">
            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-2 px-0">
                <div className="mb-1 flex items-center justify-between">
                  <Typography.Heading variant="md">Factor Breakdown</Typography.Heading>
                  <Badge variant="outline" className="px-2 py-0.5 text-xs">
                    Contribution of Factors
                  </Badge>
                </div>
                <Typography.SubHeading className="text-muted-foreground mb-4">
                  These factors most influence your CIBIL score.
                </Typography.SubHeading>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Factor</TableHead>
                        <TableHead align="center">Contribution (%)</TableHead>
                        <TableHead align="center">Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(prediction.factorBreakdown).map(([label, value]) => {
                        // Enhance label display and badge color
                        const percent = Number(value);
                        let badgeVariant: any = "muted";
                        if (percent >= 30) badgeVariant = "emerald";
                        else if (percent >= 20) badgeVariant = "sky";
                        else if (percent >= 10) badgeVariant = "amber";
                        else badgeVariant = "outline";
                        // Human readable label
                        const labelHuman = label.replace(/([A-Z])/g, " $1").trim();
                        return (
                          <TableRow key={label}>
                            <TableCell className="font-medium capitalize">{labelHuman}</TableCell>
                            <TableCell align="justify">
                              <Badge variant="secondary" className="rounded px-2 py-0.5 font-mono">
                                {percent}%
                              </Badge>
                            </TableCell>
                            <TableCell align="left">
                              <div className="flex w-28 items-center gap-2">
                                <div className="bg-muted h-2 w-full rounded">
                                  <div
                                    className={
                                      `h-2 rounded transition-all duration-300 ease-in-out ` +
                                      (badgeVariant === "emerald"
                                        ? "bg-emerald-500"
                                        : badgeVariant === "sky"
                                          ? "bg-sky-400"
                                          : badgeVariant === "amber"
                                            ? "bg-amber-400"
                                            : "bg-primary/80")
                                    }
                                    style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
                                  />
                                </div>
                                <Badge
                                  variant={badgeVariant}
                                  className="min-w-[38px] rounded px-2 py-0.5 text-center"
                                >
                                  {percent >= 30
                                    ? "Major"
                                    : percent >= 20
                                      ? "High"
                                      : percent >= 10
                                        ? "Med"
                                        : "Low"}
                                </Badge>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </SpecialCardContent>
            </SpecialCard>

            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <div className="space-y-1">
                  <Typography.Heading variant="md">Risk Assessment</Typography.Heading>
                  <Typography.SubHeading className="text-muted-foreground">
                    Potential Areas of Risk
                  </Typography.SubHeading>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Typography.SubHeading className="text-muted-foreground">
                      Overall Risk
                    </Typography.SubHeading>
                    <Badge
                      variant={
                        prediction.riskAssessment.overallRisk === "Low"
                          ? "emerald"
                          : prediction.riskAssessment.overallRisk === "Moderate"
                            ? "sky"
                            : prediction.riskAssessment.overallRisk === "High"
                              ? "amber"
                              : "destructive"
                      }
                      className="px-3 py-1 text-base capitalize"
                    >
                      {prediction.riskAssessment.overallRisk}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <Typography.SubHeading className="text-muted-foreground">
                      Risk Probability
                    </Typography.SubHeading>
                    <Badge variant="outline" className="px-3 py-1 text-base">
                      {prediction.riskAssessment.riskProbability}%
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography.SubHeading className="text-muted-foreground">
                    Key Risks
                  </Typography.SubHeading>
                  {prediction.riskAssessment.keyRisks.length > 0 ? (
                    <Table>
                      <TableBody>
                        {prediction.riskAssessment.keyRisks.map((r, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-sm">{r}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="text-muted-foreground rounded px-2 py-0.5"
                    >
                      None
                    </Badge>
                  )}
                </div>
              </SpecialCardContent>
            </SpecialCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <div>
                  <Typography.Heading variant="md">Improvement Insights</Typography.Heading>
                  <Typography.SubHeading className="text-muted-foreground">
                    Actionable steps and timeline
                  </Typography.SubHeading>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Typography.Label className="text-muted-foreground text-sm">
                      Expected Timeline
                    </Typography.Label>
                    <Badge variant="outline" className="px-3 py-1 text-base">
                      {prediction.improvementInsights.expectedTimeline}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Typography.Label className="text-muted-foreground text-sm">
                      Confidence
                    </Typography.Label>
                    <Badge variant="secondary" className="px-3 py-1 text-base">
                      {prediction.improvementInsights.confidenceLevel}%
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography.Label className="text-muted-foreground text-sm">
                    Primary Concerns
                  </Typography.Label>
                  {prediction.improvementInsights.primaryConcerns.length > 0 ? (
                    <Table>
                      <TableBody>
                        {prediction.improvementInsights.primaryConcerns.map((c, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-sm">{c}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="text-muted-foreground rounded px-2 py-0.5"
                    >
                      No major concerns
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <Typography.Label className="text-muted-foreground text-sm">
                    Action Plan
                  </Typography.Label>
                  {prediction.improvementInsights.actionPlan.length > 0 ? (
                    <Table>
                      <TableBody>
                        {prediction.improvementInsights.actionPlan.map((a, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-sm">{a}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground rounded px-2 py-0.5">
                      Maintain current behavior
                    </Badge>
                  )}
                </div>
              </SpecialCardContent>
            </SpecialCard>

            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <div className="space-y-1">
                  <Typography.Heading variant="md">Loan Eligibility</Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    Estimated eligibility based on profile
                  </Typography.SubHeading>
                </div>
                <Table className="hidden md:block">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography.Label>Status</Typography.Label>
                      </TableCell>
                      <TableCell>
                        {prediction.loanEligibility.eligibleForLoan ? (
                          <Badge variant="success" className="rounded-full px-3 py-1 text-sm">
                            <CheckCircleSolid className="size-7" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="rounded-full px-3 py-1 text-sm">
                            <XCircleSolid className="size-7" />
                            Not eligible
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography.Label>Max Amount</Typography.Label>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="px-3 py-1 text-base">
                          ₹{prediction.loanEligibility.maxEligibleAmount.toLocaleString()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography.Label>Recommended Type</Typography.Label>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="px-3 py-1 text-base">
                          {prediction.loanEligibility.loanTypeRecommendation}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pt-2 align-top">
                        <Typography.Label>Reasoning</Typography.Label>
                      </TableCell>
                      <TableCell>
                        <Typography.SubHeading className="text-sm">
                          {prediction.loanEligibility.reasoning}
                        </Typography.SubHeading>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-4 md:hidden">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-medium">Status:</span>
                    {prediction.loanEligibility.eligibleForLoan ? (
                      <Badge variant="success" className="rounded-full px-3 py-1 text-sm">
                        <CheckCircleSolid className="size-7" />
                        Eligible
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="rounded-full px-3 py-1 text-sm">
                        <XCircleSolid className="size-7" />
                        Not eligible
                      </Badge>
                    )}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-medium">Max Amount:</span>
                    <Badge variant="secondary" className="px-3 py-1 text-base">
                      ₹{prediction.loanEligibility.maxEligibleAmount.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-medium">Recommended Type:</span>
                    <Badge variant="outline" className="px-3 py-1 text-base">
                      {prediction.loanEligibility.loanTypeRecommendation}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Reasoning:</span>
                    <Typography.SubHeading className="mt-1 block text-sm">
                      {prediction.loanEligibility.reasoning}
                    </Typography.SubHeading>
                  </div>
                </div>
              </SpecialCardContent>
            </SpecialCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <div className="space-y-1">
                  <Typography.Heading variant="md">Financial Health</Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    Overall financial behavior
                  </Typography.SubHeading>
                </div>
                <div className="space-y-4">
                  <div>
                    <Typography.Label>Income to Debt</Typography.Label>
                    <div className="mt-1">
                      <Badge variant="outline" className="px-3 py-1 text-base">
                        {prediction.financialHealthSummary.incomeToDebtRatio}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Typography.Label>Repayment Discipline</Typography.Label>
                    <div className="mt-1">
                      <Badge variant="outline" className="px-3 py-1 text-base">
                        {prediction.financialHealthSummary.repaymentDiscipline}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Typography.Label>Behavior</Typography.Label>
                    <div className="mt-1">
                      <Badge variant="outline" className="px-3 py-1 text-base">
                        {prediction.financialHealthSummary.financialBehavior}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SpecialCardContent>
            </SpecialCard>

            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <div className="space-y-1">
                  <Typography.Heading variant="md">Metadata</Typography.Heading>
                  <Typography.SubHeading variant="sm">
                    About these recommendations
                  </Typography.SubHeading>
                </div>
                <div className="space-y-4">
                  <div>
                    <Typography.Label>Data Confidence</Typography.Label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="px-3 py-1 text-base">
                        {prediction.recommendationsMeta.dataConfidence}%
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Typography.Label>Recheck Interval</Typography.Label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="px-3 py-1 text-base">
                        {prediction.recommendationsMeta.suggestedRecheckInterval}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Typography.Label>Last Updated</Typography.Label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="px-3 py-1 text-base">
                        {new Date(prediction.recommendationsMeta.lastUpdated).toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SpecialCardContent>
            </SpecialCard>
          </div>

          {/* <div className="space-y-4 px-0">
            <div className="space-y-1">
              <Typography.Heading variant="md">Recommended Credit Cards</Typography.Heading>
              <Typography.SubHeading>Matched products based on your profile</Typography.SubHeading>
            </div>
            <Card className="h-full w-full border-none bg-transparent p-0">
              {(() => {
                // Choose random 2 or 3 cards for recommendations
                const numberOfCards = Math.floor(Math.random() * 2) + 2; // 2 or 3
                const shuffled = [...CREDIT_CARDS].sort(() => 0.5 - Math.random());
                const shownCards = shuffled.slice(0, numberOfCards);

                return shownCards.map((creditCard) => (
                  <SpecialCard key={creditCard.value} className="w-full">
                    <Disclosure key={creditCard.value} className="w-full">
                      <DisclosureTrigger className="col-span-12 w-full md:col-span-6">
                        <SpecialCardContent className="relative grid grid-cols-12 gap-4 p-1">
                          <div className="col-span-12 flex flex-col items-start gap-2 md:col-span-3">
                            <div className="bg-muted/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border md:aspect-auto md:h-32">
                              {creditCard.image ? (
                                <img
                                  src={creditCard.image}
                                  alt={creditCard.name}
                                  className="max-h-full max-w-full object-contain object-center transition-transform duration-200 hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-1">
                                  <img
                                    src="/icon.svg"
                                    alt="No image"
                                    className="h-8 w-8 opacity-60"
                                  />
                                  <span className="text-xs">No Image</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-span-12 flex flex-col justify-between gap-2 md:col-span-9">
                            <div className="flex flex-col gap-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                {creditCard.name}
                              </Typography.Heading>
                              <div className="flex flex-wrap gap-2">
                                {creditCard.features.creditCardOneLinerDescription
                                  .split(",")
                                  .map((raw) => {
                                    const label = raw.trim().toLowerCase();
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
                              <div className="flex gap-4">
                                <span className="text-primary text-sm font-medium">
                                  Joining Fee:{" "}
                                  {creditCard.features.creditCardJoiningFeeDescription
                                    ? `₹${creditCard.features.creditCardJoiningFeeAmount}`
                                    : "—"}
                                </span>
                                <span className="text-primary text-sm font-medium">
                                  Annual Fee:{" "}
                                  {creditCard.features.creditCardAnnualFeeAmount
                                    ? `₹${creditCard.features.creditCardAnnualFeeAmount}`
                                    : "—"}
                                </span>
                              </div>
                              <div className="mt-2 flex gap-2 md:mt-0 md:ml-auto">
                                <Button size="sm" variant="secondary">
                                  More Details
                                </Button>
                                <Button size="sm">Apply Now</Button>
                              </div>
                            </div>
                          </div>
                        </SpecialCardContent>
                      </DisclosureTrigger>
                      <DisclosureContent>
                        <div className="space-y-6 py-4">
                          <div className="space-y-1">
                            <Typography.Heading variant="lg" className="text-primary">
                              Special Offer
                            </Typography.Heading>
                            <Typography.SubHeading className="text-muted-foreground">
                              {creditCard.features.creditCardSpecialOfferDetails || "—"}
                            </Typography.SubHeading>
                          </div>

                          {Array.isArray(creditCard.features.bestFeature) &&
                            creditCard.features.bestFeature.length > 0 && (
                              <div className="space-y-1">
                                <Typography.Heading variant="lg" className="text-primary">
                                  Highlights
                                </Typography.Heading>
                                <ul className="ml-4 flex list-disc flex-col gap-1">
                                  {creditCard.features.bestFeature.map((bf, idx) => (
                                    <li key={idx}>
                                      <Typography.SubHeading>{bf}</Typography.SubHeading>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {Array.isArray(creditCard.features.cardBenefits) &&
                            creditCard.features.cardBenefits.length > 0 && (
                              <div className="space-y-1">
                                <Typography.Heading variant="lg" className="text-primary">
                                  Benefits
                                </Typography.Heading>
                                <ul className="ml-4 flex list-disc flex-col gap-1">
                                  {creditCard.features.cardBenefits.map((cb, idx) => (
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
                                        {creditCard.features.creditCardJoiningFeeAmount ? (
                                          <>
                                            ₹{creditCard.features.creditCardJoiningFeeAmount}
                                            {creditCard.features
                                              .creditCardJoiningFeeAdditionalText && (
                                              <span className="text-muted-foreground ml-1 text-xs">
                                                (
                                                {
                                                  creditCard.features
                                                    .creditCardJoiningFeeAdditionalText
                                                }
                                                )
                                              </span>
                                            )}
                                          </>
                                        ) : (
                                          "—"
                                        )}
                                      </Typography.SubHeading>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>
                                      <Typography.Label>Annual Fee</Typography.Label>
                                    </TableCell>
                                    <TableCell>
                                      <Typography.SubHeading>
                                        {creditCard.features.creditCardAnnualFeeAmount ? (
                                          <>
                                            ₹{creditCard.features.creditCardAnnualFeeAmount}
                                            {creditCard.features
                                              .creditCardAnnualFeeAdditionalText && (
                                              <span className="text-muted-foreground ml-1 text-xs">
                                                (
                                                {
                                                  creditCard.features
                                                    .creditCardAnnualFeeAdditionalText
                                                }
                                                )
                                              </span>
                                            )}
                                          </>
                                        ) : (
                                          "—"
                                        )}
                                      </Typography.SubHeading>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                            {(creditCard.features.creditCardJoiningFeeDescription ||
                              creditCard.features.creditCardAnnualFeeDescription) && (
                              <div className="mt-2 space-y-1">
                                {creditCard.features.creditCardJoiningFeeDescription && (
                                  <Typography.SubHeading className="text-muted-foreground text-xs">
                                    {creditCard.features.creditCardJoiningFeeDescription}
                                  </Typography.SubHeading>
                                )}
                                {creditCard.features.creditCardAnnualFeeDescription && (
                                  <Typography.SubHeading className="text-muted-foreground text-xs">
                                    {creditCard.features.creditCardAnnualFeeDescription}
                                  </Typography.SubHeading>
                                )}
                              </div>
                            )}
                          </div>

                          {creditCard.features.cardCategoryDescription && (
                            <div className="space-y-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                Category Details
                              </Typography.Heading>
                              <div className="flex flex-col gap-2">
                                {Object.entries(creditCard.features.cardCategoryDescription).map(
                                  ([cat, arr]) => (
                                    <div key={cat}>
                                      <Typography.SubHeading
                                        variant="md"
                                        className="font-bold capitalize"
                                      >
                                        {cat}
                                      </Typography.SubHeading>
                                      <ul className="ml-4 flex list-disc flex-col gap-1">
                                        {arr.map((desc, idx) => (
                                          <li key={idx}>
                                            <Typography.SubHeading
                                              variant="md"
                                              className="text-muted-foreground"
                                            >
                                              {desc}
                                            </Typography.SubHeading>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                          {creditCard.features.bestSuitedFor && (
                            <div className="space-y-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                Best Suited For
                              </Typography.Heading>
                              <ul className="ml-4 flex list-disc flex-col gap-1">
                                {Object.entries(creditCard.features.bestSuitedFor).map(
                                  ([cat, features], i) => (
                                    <li key={cat}>
                                      <Typography.SubHeading
                                        variant="md"
                                        className="font-bold capitalize"
                                      >
                                        <span className="font-semibold">{cat}:</span>{" "}
                                        {features.join(", ")}
                                      </Typography.SubHeading>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}

                          {creditCard.features.moreInfo && (
                            <div className="space-y-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                More Info
                              </Typography.Heading>
                              <div className="space-y-2">
                                <Accordion
                                  type="multiple"
                                  className="w-full border-none shadow-none"
                                >
                                  {Object.entries(creditCard.features.moreInfo).map(
                                    ([section, lines], index) => (
                                      <AccordionItem
                                        key={section}
                                        value={section}
                                        className="bg-card/70 mt-0 rounded-xl border-none p-0"
                                      >
                                        <AccordionTrigger className="cursor-pointer gap-2 px-2 py-3 text-base font-semibold capitalize hover:no-underline">
                                          <span className="text-primary">
                                            {index + 1}. {section}
                                          </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <ul className="ml-4 flex list-disc flex-col gap-1">
                                            {lines.map((line, idx) => (
                                              <li key={idx}>
                                                <Typography.SubHeading
                                                  variant="md"
                                                  className="text-muted-foreground"
                                                >
                                                  {line}
                                                </Typography.SubHeading>
                                              </li>
                                            ))}
                                          </ul>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ),
                                  )}
                                </Accordion>
                              </div>
                            </div>
                          )}

                          {creditCard.features.trendingOffers &&
                            creditCard.features.trendingOffers.length > 0 && (
                              <div className="space-y-1">
                                <Typography.Heading variant="lg" className="text-primary">
                                  Trending Offers
                                </Typography.Heading>
                                <ul className="flex flex-col gap-2">
                                  {creditCard.features.trendingOffers.map((offer, idx) => (
                                    <li key={idx} className="bg-muted rounded-md p-3">
                                      <Typography.SubHeading>
                                        <span
                                          className="font-bold"
                                          style={{ color: offer.brandColour }}
                                        >
                                          {offer.brandName}:
                                        </span>{" "}
                                        {offer.shortDescription}
                                        {offer.detailedDescription && (
                                          <Typography.P className="text-muted-foreground block text-sm">
                                            {offer.detailedDescription}
                                          </Typography.P>
                                        )}
                                      </Typography.SubHeading>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {creditCard.rewardJson && (
                            <div className="max-w-80 space-y-1 overflow-x-auto md:max-w-none">
                              <Typography.Heading variant="lg" className="text-primary">
                                Rewards Snapshot
                              </Typography.Heading>
                              <div className="max-w-full overflow-x-auto">
                                <Table className="min-w-[440px] border text-xs">
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>
                                        <Typography.SubHeading
                                          variant="md"
                                          className="text-muted-foreground"
                                        >
                                          Category
                                        </Typography.SubHeading>
                                      </TableHead>
                                      <TableHead>
                                        <Typography.SubHeading
                                          variant="md"
                                          className="text-muted-foreground"
                                        >
                                          Rewards %
                                        </Typography.SubHeading>
                                      </TableHead>
                                      <TableHead>
                                        <Typography.SubHeading
                                          variant="md"
                                          className="text-muted-foreground"
                                        >
                                          Details
                                        </Typography.SubHeading>
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {Object.entries(creditCard.rewardJson).map(([cat, value]) => {
                                      if (typeof value === "number") {
                                        return (
                                          <TableRow key={cat}>
                                            <TableCell>
                                              <Typography.SubHeading>{cat}</Typography.SubHeading>
                                            </TableCell>
                                            <TableCell>
                                              <Typography.SubHeading>{value}</Typography.SubHeading>
                                            </TableCell>
                                            <TableCell>—</TableCell>
                                          </TableRow>
                                        );
                                      }
                                      return (
                                        <TableRow key={cat} className="overflow-x-auto">
                                          <TableCell>
                                            <Typography.SubHeading>{cat}</Typography.SubHeading>
                                          </TableCell>
                                          <TableCell>
                                            <Typography.SubHeading>
                                              {value.rewardsPercent || "—"}
                                            </Typography.SubHeading>
                                          </TableCell>
                                          <TableCell>
                                            <Typography.SubHeading className="max-w-xs truncate break-words">
                                              {[
                                                value.nonSpendBased &&
                                                  Object.values(value.nonSpendBased)
                                                    .map((item) => item.rewardDesc)
                                                    .join(", "),
                                                value.spendBased &&
                                                  Object.values(value.spendBased)
                                                    .map((item) => item.rewardDesc)
                                                    .join(", "),
                                              ]
                                                .filter(Boolean)
                                                .join(", ") || "—"}
                                            </Typography.SubHeading>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          )}

                          {creditCard.features.creditCardTermCondition && (
                            <div>
                              <Link
                                to={creditCard.features.creditCardTermCondition}
                                className="text-primary text-sm underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Typography.Label>Terms & Conditions</Typography.Label>
                              </Link>
                            </div>
                          )}
                        </div>
                      </DisclosureContent>
                    </Disclosure>
                  </SpecialCard>
                ));
              })()}
            </Card>
          </div> */}
        </>
      )}
    </div>
  );
};

export { CibilScoreTracker };
export default CibilScoreTracker;
