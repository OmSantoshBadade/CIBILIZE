// routes/openai.js - Now using Google Gemini API

import express from "express";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
 

// Fallback credit score calculation
function calculateFallbackScore(
  income,
  loanAmount,
  utilization,
  missedEMIs,
  age,
) {
  let score = 750; // Start with average score
  let factors = [];

  // Income factor
  const monthlyIncome = parseFloat(income) || 0;
  if (monthlyIncome >= 100000) {
    score += 30;
    factors.push("high income");
  } else if (monthlyIncome >= 50000) {
    score += 15;
    factors.push("good income");
  } else if (monthlyIncome < 25000) {
    score -= 20;
    factors.push("low income");
  }

  // Credit utilization factor
  const utilizationRate = parseFloat(utilization) || 0;
  if (utilizationRate <= 30) {
    score += 25;
    factors.push("low credit utilization");
  } else if (utilizationRate <= 50) {
    score += 10;
  } else if (utilizationRate <= 70) {
    score -= 15;
    factors.push("high credit utilization");
  } else {
    score -= 35;
    factors.push("very high credit utilization");
  }

  // Missed EMIs factor
  const missedPayments = parseInt(missedEMIs) || 0;
  if (missedPayments === 0) {
    score += 20;
    factors.push("no missed payments");
  } else if (missedPayments <= 2) {
    score -= 15;
    factors.push("few missed payments");
  } else {
    score -= 40;
    factors.push("multiple missed payments");
  }

  // Age factor
  const userAge = parseInt(age) || 0;
  if (userAge >= 30 && userAge <= 50) {
    score += 10;
    factors.push("stable age group");
  } else if (userAge < 25) {
    score -= 5;
    factors.push("young age");
  }

  // Loan amount vs income ratio
  const loanToIncomeRatio =
    (parseFloat(loanAmount) || 0) / (monthlyIncome * 12);
  if (loanToIncomeRatio > 5) {
    score -= 25;
    factors.push("high debt-to-income ratio");
  } else if (loanToIncomeRatio < 2) {
    score += 15;
    factors.push("manageable debt level");
  }

  // Ensure score is within valid range
  score = Math.max(300, Math.min(900, Math.round(score)));

  const reason = `Based on your financial profile: ${factors.join(", ")}. Your predicted CIBIL score reflects your payment history, credit utilization of ${utilizationRate}%, and overall financial stability.`;

  return { score, reason };
}

// Enhanced prediction with multiple models and detailed insights
router.post("/predict-enhanced", authenticateToken, async (req, res) => {
  const { income, loanAmount, utilization, missedEMIs, age, model = "gemini" } = req.body;

  const enhancedPrompt = `You are an expert financial analyst specializing in Indian credit scoring, personal finance, and product recommendations. Predict a CIBIL credit score and generate structured financial intelligence in pure JSON format based on the following user profile:

- Monthly Income: ₹${income}
- Total Loan Amount: ₹${loanAmount}
- Credit Utilization: ${utilization}%
- Missed EMIs (last 12 months): ${missedEMIs}
- Age: ${age}

Use this weight distribution:
- Payment History: 35%
- Credit Utilization: 30%
- Credit History Length: 15%
- Credit Mix: 10%
- New Credit Inquiries: 10%

---

### 🔧 Output Format (Return JSON Only — No Explanations)
Return a single, valid JSON object that follows this exact schema:

{
  "score": number,
  "scoreCategory": "Excellent" | "Good" | "Average" | "Poor",
  "reason": string,

  "factorBreakdown": {
    "paymentHistory": number,
    "creditUtilization": number,
    "creditHistory": number,
    "creditMix": number,
    "newCredit": number
  },

  "riskAssessment": {
    "overallRisk": "Low" | "Moderate" | "High",
    "keyRisks": [string],
    "riskProbability": number
  },

  "improvementInsights": {
    "primaryConcerns": [string],
    "actionPlan": [string],
    "expectedTimeline": "3 months" | "6 months" | "12 months",
    "confidenceLevel": number
  },

  "loanEligibility": {
    "eligibleForLoan": boolean,
    "maxEligibleAmount": number,
    "loanTypeRecommendation": "personal" | "home" | "auto" | "not recommended",
    "reasoning": string
  },

  "creditCardRecommendations": [
    {
      "productId": string,
      "matchReason": string,
      "eligibility": "High" | "Moderate" | "Low",
      "annualFee": number,
      "rewardHighlights": [string]
    }
  ],

  "nextMilestone": {
    "targetCategory": "Good" | "Excellent",
    "pointsNeeded": number,
    "suggestedFocusArea": string
  },

  "financialHealthSummary": {
    "incomeToDebtRatio": string,
    "repaymentDiscipline": string,
    "financialBehavior": string
  },

  "recommendationsMeta": {
    "dataConfidence": number,
    "suggestedRecheckInterval": "3 months" | "6 months",
    "lastUpdated": "{{currentDate}}"
  }
}

---

### 💳 Credit Card Catalog (STRICT)
Gemini, you must select **3 to 5** unique items from this list only.  
Every item in "creditCardRecommendations" must exactly match a "productId" from the list below:

[
  "indusind-bank-legend-credit-card",
  "indusind-platinum-credit-card",
  "eazydiner-indusind-platinum-credit-card",
  "indusind-bank-platinum-aura-edge-credit-card",
  "rbl-bank-paisabazaar-duet-credit-card",
  "axis-bank-ace-visa-credit-card",
  "flipkart-axis-bank-mastercard-credit-card",
  "airtel-axis-credit-card",
  "axis-bank-my-zone-rupay-credit-card",
  "indianoil-axis-bank-rupay-credit-card",
  "simplyclick-sbi-card",
  "bpcl-sbi-card",
  "simplysave-sbi-card",
  "irctc-sbi-platinum-card",
  "pulse-sbi-card",
  "tata-neu-infinity-hdfc-bank-secured-credit-card",
  "tata-neu-plus-hdfc-bank-secured-credit-card",
  "idfc-first-earn-credit-card"
]

---

### 🧠 Credit Card Selection Logic
Always return at least **3** recommendations based on this mapping:
- **Excellent (≥750):** include premium/reward/travel cards (e.g., Axis ACE, IndusInd Legend, SBI SimplyCLICK)
- **Good (600–749):** include cashback, co-branded, or lifestyle cards (e.g., Flipkart Axis, Airtel Axis, RBL Duet)
- **Average (450–599):** include entry-level or secured cards (e.g., IDFC FIRST Earn, Tata Neu Plus)
- **Poor (<450):** include only secured cards (e.g., Tata Neu Infinity, IDFC FIRST Earn)

Each recommended card must include:
- "matchReason": a concise explanation (max 15 words) relating to the user’s profile
- "annualFee": realistic INR number (0–5000)
- "rewardHighlights": 2–5 short bullet-style benefit strings
- Unique "productId" values
- A plausible "eligibility" level: "High", "Moderate", or "Low"

Even for high scores, recommendations are **mandatory** — do not leave this array empty.

---

### ⚠️ Output Rules (Critical)
- Always populate **riskAssessment.keyRisks** and **improvementInsights.actionPlan** with at least 2 items.
- Always include **creditCardRecommendations** with 3–5 valid entries.
- All numeric values must be realistic (not random).
- YOU MUST ALWAYS return the "creditCardRecommendations" array with 3–5 valid cards. STRICTLY DO NOT ever return an empty or missing "creditCardRecommendations" array, no matter the profile or data.
- Only JSON is allowed. No markdown, code fences, or explanations allowed under any circumstances.`;

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    const payload = {
      contents: [
        {
          parts: [
            {
              text: enhancedPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from Gemini API");
    }

    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/```json\s*/, "").replace(/```\s*$/, "");
    }
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```\s*/, "").replace(/```\s*$/, "");
    }

    const parsedJson = JSON.parse(cleanText);

    // Build CibilScorePrediction-compliant response
    const clampScore = (s) => Math.max(300, Math.min(900, Math.round(Number(s) || 750)));
    const score = clampScore(parsedJson.score);
    const scoreCategory = score >= 750 ? "Excellent" : score >= 600 ? "Good" : score >= 450 ? "Average" : "Poor";
    const defaultFactorBreakdown = {
      paymentHistory: 75,
      creditUtilization: 60,
      creditHistory: 50,
      creditMix: 70,
      newCredit: 80,
    };
    const factorBreakdown = {
      ...defaultFactorBreakdown,
      ...(parsedJson.factorBreakdown || {}),
    };

    const riskAssessment = {
      overallRisk: parsedJson?.riskAssessment?.overallRisk || (score >= 750 ? "Low" : score >= 600 ? "Moderate" : "High"),
      keyRisks: Array.isArray(parsedJson?.riskAssessment?.keyRisks) && parsedJson.riskAssessment.keyRisks.length
        ? parsedJson.riskAssessment.keyRisks
        : ["Credit utilization management", "Payment history consistency"],
      riskProbability: Math.max(0, Math.min(100, Number(parsedJson?.riskAssessment?.riskProbability) || (scoreCategory === "Excellent" ? 15 : scoreCategory === "Good" ? 35 : scoreCategory === "Average" ? 60 : 80))),
    };

    const improvementInsights = {
      primaryConcerns: Array.isArray(parsedJson?.improvementInsights?.primaryConcerns) && parsedJson.improvementInsights.primaryConcerns.length
        ? parsedJson.improvementInsights.primaryConcerns.slice(0, 4)
        : ["Reduce credit utilization below 30%", "Maintain on-time payments"],
      actionPlan: Array.isArray(parsedJson?.improvementInsights?.actionPlan) && parsedJson.improvementInsights.actionPlan.length
        ? parsedJson.improvementInsights.actionPlan.slice(0, 5)
        : [
            "Pay down revolving balances",
            "Set up auto-pay for EMIs",
            "Avoid multiple new inquiries",
          ],
      expectedTimeline: parsedJson?.improvementInsights?.expectedTimeline || (scoreCategory === "Excellent" ? "3 months" : scoreCategory === "Good" ? "6 months" : "12 months"),
      confidenceLevel: Math.max(0, Math.min(100, Number(parsedJson?.improvementInsights?.confidenceLevel) || 85)),
    };

    const loanEligibility = {
      eligibleForLoan: Boolean(parsedJson?.loanEligibility?.eligibleForLoan ?? score >= 650),
      maxEligibleAmount: Number(parsedJson?.loanEligibility?.maxEligibleAmount ?? Math.max(0, Math.round((Number(income) || 0) * 12 * (score / 1000)))),
      loanTypeRecommendation: parsedJson?.loanEligibility?.loanTypeRecommendation || (score >= 750 ? "home" : score >= 650 ? "personal" : score >= 550 ? "auto" : "not recommended"),
      reasoning: parsedJson?.loanEligibility?.reasoning || "Eligibility estimated based on score and income-to-debt indicators",
    };

    const allowedProducts = new Set([
      "indusind-bank-legend-credit-card",
      "indusind-platinum-credit-card",
      "eazydiner-indusind-platinum-credit-card",
      "indusind-bank-platinum-aura-edge-credit-card",
      "rbl-bank-paisabazaar-duet-credit-card",
      "axis-bank-ace-visa-credit-card",
      "flipkart-axis-bank-mastercard-credit-card",
      "airtel-axis-credit-card",
      "axis-bank-my-zone-rupay-credit-card",
      "indianoil-axis-bank-rupay-credit-card",
      "simplyclick-sbi-card",
      "bpcl-sbi-card",
      "simplysave-sbi-card",
      "irctc-sbi-platinum-card",
      "pulse-sbi-card",
      "tata-neu-infinity-hdfc-bank-secured-credit-card",
      "tata-neu-plus-hdfc-bank-secured-credit-card",
      "idfc-first-earn-credit-card",
    ]);

    const creditCardRecommendationsRaw = Array.isArray(parsedJson?.creditCardRecommendations)
      ? parsedJson.creditCardRecommendations
      : [];
    const creditCardRecommendations = creditCardRecommendationsRaw
      .filter((r) => r && allowedProducts.has(r.productId))
      .map((r) => ({
        productId: r.productId,
        matchReason: r.matchReason || "Good fit based on spending and profile",
        eligibility: r.eligibility === "High" || r.eligibility === "Moderate" || r.eligibility === "Low" ? r.eligibility : (score >= 750 ? "High" : score >= 650 ? "Moderate" : "Low"),
        annualFee: Number(r.annualFee ?? 0),
        rewardHighlights: Array.isArray(r.rewardHighlights) ? r.rewardHighlights.slice(0, 5) : [],
      }));

    const nextMilestone = parsedJson?.nextMilestone && typeof parsedJson.nextMilestone === "object"
      ? parsedJson.nextMilestone
      : {
          targetCategory: scoreCategory === "Excellent" ? "Excellent" : "Excellent",
          pointsNeeded: Math.max(0, (scoreCategory === "Excellent" ? 0 : 750) - score),
          suggestedFocusArea: scoreCategory === "Excellent" ? "Maintain low utilization" : "Reduce utilization and maintain timely payments",
        };

    const financialHealthSummary = parsedJson?.financialHealthSummary || {
      incomeToDebtRatio: "Moderate",
      repaymentDiscipline: scoreCategory === "Excellent" ? "Excellent" : scoreCategory === "Good" ? "Good" : "Needs improvement",
      financialBehavior: "Balanced with room for optimization",
    };

    const recommendationsMeta = {
      dataConfidence: Math.max(0, Math.min(100, Number(parsedJson?.recommendationsMeta?.dataConfidence) || improvementInsights.confidenceLevel)),
      suggestedRecheckInterval: parsedJson?.recommendationsMeta?.suggestedRecheckInterval || (scoreCategory === "Excellent" ? "6 months" : "3 months"),
      lastUpdated: new Date().toISOString(),
    };

    const responseBody = {
      score,
      scoreCategory,
      reason: parsedJson.reason || "Score calculated based on provided financial information",
      factorBreakdown,
      riskAssessment,
      improvementInsights,
      loanEligibility,
      creditCardRecommendations,
      nextMilestone,
      financialHealthSummary,
      recommendationsMeta,
      model: "gemini-enhanced",
    };

    res.json(responseBody);
  } catch (error) {
    console.error("Error calling enhanced Gemini API:", error);

    // Enhanced fallback with detailed breakdown mapped to CibilScorePrediction structure
    const fb = calculateEnhancedFallbackScore(
      income,
      loanAmount,
      utilization,
      missedEMIs,
      age,
    );

    const fbScore = fb.score;
    const fbCategory = fbScore >= 750 ? "Excellent" : fbScore >= 600 ? "Good" : fbScore >= 450 ? "Average" : "Poor";

    const fallbackResponse = {
      score: fbScore,
      scoreCategory: fbCategory,
      reason: fb.reason,
      factorBreakdown: fb.factorBreakdown,
      riskAssessment: {
        overallRisk: fbCategory === "Excellent" ? "Low" : fbCategory === "Good" ? "Moderate" : "High",
        keyRisks: fb.riskFactors.length ? fb.riskFactors.slice(0, 3) : ["Credit utilization", "Payment history"],
        riskProbability: fbCategory === "Excellent" ? 15 : fbCategory === "Good" ? 35 : fbCategory === "Average" ? 60 : 80,
      },
      improvementInsights: {
        primaryConcerns: fb.riskFactors.slice(0, 4),
        actionPlan: fb.improvementTips,
        expectedTimeline: fbCategory === "Excellent" ? "3 months" : fbCategory === "Good" ? "6 months" : "12 months",
        confidenceLevel: fb.confidence,
      },
      loanEligibility: {
        eligibleForLoan: fbScore >= 650,
        maxEligibleAmount: Math.max(0, Math.round((Number(income) || 0) * 12 * (fbScore / 1000))),
        loanTypeRecommendation: fbScore >= 750 ? "home" : fbScore >= 650 ? "personal" : fbScore >= 550 ? "auto" : "not recommended",
        reasoning: "Rule-based estimation due to AI fallback",
      },
      creditCardRecommendations: [],
      nextMilestone: {
        targetCategory: fbCategory === "Excellent" ? "Excellent" : "Excellent",
        pointsNeeded: Math.max(0, (fbCategory === "Excellent" ? 0 : 750) - fbScore),
        suggestedFocusArea: fbCategory === "Excellent" ? "Maintain low utilization" : "Reduce utilization and on-time payments",
      },
      financialHealthSummary: {
        incomeToDebtRatio: "Moderate",
        repaymentDiscipline: fbCategory === "Excellent" ? "Excellent" : fbCategory === "Good" ? "Good" : "Needs improvement",
        financialBehavior: "Balanced with room for optimization",
      },
      recommendationsMeta: {
        dataConfidence: fb.confidence,
        suggestedRecheckInterval: fbCategory === "Excellent" ? "6 months" : "3 months",
        lastUpdated: new Date().toISOString(),
      },
      model: "fallback-enhanced",
      note: "AI service temporarily unavailable - using enhanced rule-based calculation",
    };

    res.json(fallbackResponse);
  }
});

// Scenario simulation endpoint
router.post("/simulate-scenario", authenticateToken, async (req, res) => {
  const { baseData, scenarios } = req.body;

  try {
    const results = [];

    for (const scenario of scenarios) {
      const simulatedData = { ...baseData, ...scenario.changes };
      const prediction = calculateFallbackScore(
        simulatedData.income,
        simulatedData.loanAmount,
        simulatedData.utilization,
        simulatedData.missedEMIs,
        simulatedData.age,
      );

      results.push({
        scenarioName: scenario.name,
        changes: scenario.changes,
        predictedScore: prediction.score,
        scoreDifference: prediction.score - calculateFallbackScore(
          baseData.income,
          baseData.loanAmount,
          baseData.utilization,
          baseData.missedEMIs,
          baseData.age,
        ).score,
        reason: prediction.reason,
      });
    }

    res.json({
      baseScore: calculateFallbackScore(
        baseData.income,
        baseData.loanAmount,
        baseData.utilization,
        baseData.missedEMIs,
        baseData.age,
      ).score,
      scenarios: results,
    });
  } catch (error) {
    console.error("Error in scenario simulation:", error);
    res.status(500).json({
      error: "Scenario simulation failed",
      message: "Internal server error",
    });
  }
});

// AI insights endpoint
router.post("/ai-insights", authenticateToken, async (req, res) => {
  const { score, formData } = req.body;

  const insightsPrompt = `As a financial advisor, provide personalized insights for someone with a CIBIL score of ${score} and the following profile:

- Monthly Income: ₹${formData.income}
- Credit Utilization: ${formData.utilization}%
- Missed EMIs: ${formData.missedEMIs}
- Age: ${formData.age}

Provide a JSON response with:
- "primaryConcerns": array of top 2-3 areas needing attention
- "strengths": array of positive aspects of their credit profile
- "actionPlan": array of 3 specific steps to improve their score in the next 6 months
- "creditProducts": array of suitable credit products they should consider
- "timeline": expected timeline to see score improvements

Return only the JSON object.`;

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    const payload = {
      contents: [
        {
          parts: [
            {
              text: insightsPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1536,
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const data = await geminiResponse.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response from Gemini API");
    }

    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/```json\s*/, "").replace(/```\s*$/, "");
    }
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```\s*/, "").replace(/```\s*$/, "");
    }

    const insights = JSON.parse(cleanText);
    res.json(insights);
  } catch (error) {
    console.error("Error getting AI insights:", error);
    
    // Fallback insights
    const fallbackInsights = generateFallbackInsights(score, formData);
    res.json(fallbackInsights);
  }
});

// Enhanced fallback calculation with detailed breakdown
function calculateEnhancedFallbackScore(income, loanAmount, utilization, missedEMIs, age) {
  let score = 750;
  let factorBreakdown = {
    paymentHistory: 75,
    creditUtilization: 60,
    creditHistory: 50,
    creditMix: 70,
    newCredit: 80,
  };
  let riskFactors = [];
  let improvementTips = [];

  const monthlyIncome = parseFloat(income) || 0;
  const utilizationRate = parseFloat(utilization) || 0;
  const missedPayments = parseInt(missedEMIs) || 0;
  const userAge = parseInt(age) || 0;

  // Payment history analysis
  if (missedPayments === 0) {
    factorBreakdown.paymentHistory = 95;
    score += 25;
  } else if (missedPayments <= 2) {
    factorBreakdown.paymentHistory = 60;
    score -= 20;
    riskFactors.push("Recent missed payments");
    improvementTips.push("Set up automatic payments to avoid future missed EMIs");
  } else {
    factorBreakdown.paymentHistory = 30;
    score -= 50;
    riskFactors.push("Multiple missed payments");
    improvementTips.push("Focus on making all payments on time for the next 6 months");
  }

  // Credit utilization analysis
  if (utilizationRate <= 10) {
    factorBreakdown.creditUtilization = 95;
    score += 35;
  } else if (utilizationRate <= 30) {
    factorBreakdown.creditUtilization = 80;
    score += 20;
  } else if (utilizationRate <= 50) {
    factorBreakdown.creditUtilization = 50;
    score -= 10;
    riskFactors.push("High credit utilization");
    improvementTips.push(`Reduce credit utilization to below 30% (currently ${utilizationRate}%)`);
  } else {
    factorBreakdown.creditUtilization = 25;
    score -= 40;
    riskFactors.push("Very high credit utilization");
    improvementTips.push("Urgently pay down credit card balances");
  }

  // Income factor
  if (monthlyIncome >= 100000) {
    score += 20;
  } else if (monthlyIncome >= 50000) {
    score += 10;
  } else if (monthlyIncome < 25000) {
    score -= 15;
    riskFactors.push("Low income relative to credit requirements");
  }

  // Age factor
  if (userAge >= 30 && userAge <= 50) {
    factorBreakdown.creditHistory = 80;
    score += 10;
  } else if (userAge < 25) {
    factorBreakdown.creditHistory = 40;
    score -= 5;
    improvementTips.push("Build longer credit history over time");
  }

  // Debt-to-income ratio
  const debtToIncomeRatio = (parseFloat(loanAmount) || 0) / (monthlyIncome * 12);
  if (debtToIncomeRatio > 5) {
    score -= 30;
    riskFactors.push("High debt-to-income ratio");
    improvementTips.push("Consider debt consolidation or additional income sources");
  }

  score = Math.max(300, Math.min(900, Math.round(score)));

  // Determine next milestone
  let nextMilestone = "Excellent (851+)";
  if (score < 551) nextMilestone = "Fair (551+)";
  else if (score < 701) nextMilestone = "Good (701+)";
  else if (score < 851) nextMilestone = "Excellent (851+)";

  return {
    score,
    reason: `Score calculated based on payment history, credit utilization, and overall financial profile`,
    factorBreakdown,
    improvementTips: improvementTips.slice(0, 3),
    riskFactors,
    nextMilestone,
    confidence: 80,
  };
}

// Generate fallback insights
function generateFallbackInsights(score, formData) {
  const utilization = parseFloat(formData.utilization) || 0;
  const missedEMIs = parseInt(formData.missedEMIs) || 0;
  const income = parseFloat(formData.income) || 0;

  let primaryConcerns = [];
  let strengths = [];
  let actionPlan = [];
  let creditProducts = [];

  // Analyze concerns and strengths
  if (utilization > 50) {
    primaryConcerns.push("High credit utilization significantly impacting score");
  }
  if (missedEMIs > 0) {
    primaryConcerns.push("Payment history needs improvement");
  }
  if (income < 30000) {
    primaryConcerns.push("Income level may limit credit options");
  }

  if (utilization <= 30) {
    strengths.push("Good credit utilization management");
  }
  if (missedEMIs === 0) {
    strengths.push("Excellent payment history");
  }
  if (income >= 50000) {
    strengths.push("Strong income profile");
  }

  // Generate action plan
  if (utilization > 30) {
    actionPlan.push("Reduce credit utilization to below 30% within 3 months");
  }
  if (missedEMIs > 0) {
    actionPlan.push("Set up automatic payments for all credit obligations");
  }
  actionPlan.push("Monitor credit report monthly for accuracy");

  // Suggest credit products
  if (score >= 750) {
    creditProducts.push("Premium credit cards with travel benefits");
    creditProducts.push("Personal loans at competitive rates");
  } else if (score >= 650) {
    creditProducts.push("Standard credit cards");
    creditProducts.push("Secured credit cards for building history");
  } else {
    creditProducts.push("Secured credit cards");
    creditProducts.push("Credit builder loans");
  }

  return {
    primaryConcerns,
    strengths,
    actionPlan,
    creditProducts,
    timeline: "3-6 months for significant improvement with consistent effort",
  };
}

export default router;
