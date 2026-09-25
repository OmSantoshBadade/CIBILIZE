import { RecommendationFormData } from "@/components/credit-card/recommendation-form-schema";
// Optional adapter imports to use CREDIT_DATA.ts directly
import { CREDIT_CARDS, type CreditCardTypes } from "@/lib/CREDIT_DATA";

// Credit card interface based on the dataset structure
interface CreditCard {
  id: string;
  title: string;
  issuer: string;
  image?: string;
  rating?: string;
  annual_fee?: string | number | string[] | Record<string, unknown>;
  rewards?: string[] | string | Record<string, unknown>;
  benefits?: string[] | string | Record<string, unknown>;
  why_to_recommend?: string;
  best_suited_for?: string | string[];
  eligibility?: string[] | Record<string, unknown>;
  cta?: string[] | Record<string, unknown>;
  tags?: string[];
  welcome_bonus?: string;
  waiver_condition?: string | string[];
  reward_rate?: string;
  lounge_access?: string;
  dining?: string;
  golf?: string;
  insurance?: string;
  created_at?: string;
  apply_link?: string;
}

interface ScoredCard extends CreditCard {
  matchPercentage: number;
  reasons: string[];
  confidenceScore: number;
  categoryScores: {
    eligibility: number;
    spending: number;
    benefits: number;
    lifestyle: number;
    fees: number;
  };
}

export class CreditCardScorer {
  private cards: CreditCard[];

  constructor(cards: CreditCard[]) {
    this.cards = cards;
  }

  public scoreAndRank(preferences: RecommendationFormData, limit: number = 10): ScoredCard[] {
    const scoredCards = this.cards.map((card) => this.scoreCard(card, preferences));

    // Sort by match percentage (descending)
    scoredCards.sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) return b.matchPercentage - a.matchPercentage;
      // Tie-breaker on confidenceScore, then eligibility sub-score
      if (b.confidenceScore !== a.confidenceScore) return b.confidenceScore - a.confidenceScore;
      return (b.categoryScores?.eligibility || 0) - (a.categoryScores?.eligibility || 0);
    });

    return scoredCards.slice(0, 10);
  }

  private scoreCard(card: CreditCard, preferences: RecommendationFormData): ScoredCard {
    const categoryScores = {
      eligibility: this.scoreEligibility(card, preferences.personalInfo),
      spending: this.scoreSpendingMatch(card, preferences.spendingHabits),
      benefits: this.scoreBenefitMatch(card, preferences.benefitPreferences),
      lifestyle: this.scoreLifestyleMatch(card, preferences.lifestyle),
      fees: this.scoreFeeMatch(card, preferences.feePreference),
    };

    console.log(`Scoring card: ${card.title}`);
    console.log("Category scores:", categoryScores);

    // Weighted scoring (total = 100)
    const weights = {
      eligibility: 20, // Must be eligible
      spending: 30, // Heavier impact for spending fit
      benefits: 25, // Desired benefits matter more
      lifestyle: 15, // Lifestyle alignment
      fees: 10, // Fee tolerance a bit lower to avoid dominating
    };

    const totalScore = Object.entries(categoryScores).reduce(
      (sum, [category, score]) => sum + score * weights[category as keyof typeof weights],
      0,
    );

    console.log("Total score:", totalScore);

    // totalScore is already on a 0..100 scale; convert to an integer percentage
    const matchPercentage = Math.round(totalScore);
    const reasons = this.generateReasons(card, preferences, categoryScores);
    const confidenceScore = this.calculateConfidence(categoryScores);

    console.log("Match percentage:", matchPercentage);
    console.log("Confidence score:", confidenceScore);

    // Ensure we have valid numbers
    const validMatchPercentage = isNaN(matchPercentage)
      ? 0
      : Math.max(0, Math.min(100, matchPercentage));
    const validConfidenceScore = isNaN(confidenceScore)
      ? 0
      : Math.max(0, Math.min(100, confidenceScore));

    return {
      ...card,
      matchPercentage: validMatchPercentage,
      reasons,
      confidenceScore: validConfidenceScore,
      categoryScores,
    };
  }

  private scoreEligibility(
    card: CreditCard,
    personalInfo: RecommendationFormData["personalInfo"],
  ): number {
    if (!card.eligibility) {
      return 0.7; // Neutral score if no eligibility info
    }

    let score = 0;
    const eligibilityText = Array.isArray(card.eligibility)
      ? card.eligibility.join(" ").toLowerCase()
      : String(card.eligibility).toLowerCase();

    // Age check
    if (personalInfo.age >= 18 && personalInfo.age <= 65) {
      score += 0.3;
    }

    // Income check
    const incomeScore = this.checkIncomeEligibility(eligibilityText, personalInfo.monthlyIncome);
    score += incomeScore * 0.4;

    // Occupation check
    if (personalInfo.occupation === "salaried" && eligibilityText.includes("salaried")) {
      score += 0.2;
    } else if (personalInfo.occupation === "self_employed" && eligibilityText.includes("self")) {
      score += 0.2;
    } else {
      score += 0.1; // Partial credit
    }

    // Credit history check
    if (personalInfo.existingCreditCard && eligibilityText.includes("existing")) {
      score += 0.1;
    }

    return Math.min(score, 1);
  }

  private checkIncomeEligibility(eligibilityText: string, monthlyIncome: string | number): number {
    const monthlyIncomeMap = {
      below_20k: 20000,
      "20k_50k": 35000,
      "50k_1l": 75000,
      "1l_2l": 150000,
      above_2l: 250000,
    } as const;

    let monthlyIncomeNumber: number | undefined;
    if (typeof monthlyIncome === "number") {
      // If number is suspiciously large, assume it's annual and convert to monthly
      if (monthlyIncome > 100000) {
        // treat as annual rupees
        monthlyIncomeNumber = Math.max(0, Math.round(monthlyIncome / 12));
      } else {
        // already monthly rupees
        monthlyIncomeNumber = monthlyIncome;
      }
    } else if (typeof monthlyIncome === "string") {
      const mapped = monthlyIncomeMap[monthlyIncome as keyof typeof monthlyIncomeMap];
      monthlyIncomeNumber = mapped ?? undefined;
    }

    const annualIncome = monthlyIncomeNumber ? monthlyIncomeNumber * 12 : NaN;

    // Extract income requirements from eligibility text
    const incomeMatches = eligibilityText.match(/(\d+)\s*lakh/gi);
    if (!incomeMatches) return 0.8; // No specific requirement found

    const requiredIncome = Math.min(
      ...incomeMatches.map((match) => {
        const amount = parseInt(match.replace(/[^\d]/g, ""));
        return amount * 100000; // Convert lakhs to rupees
      }),
    );

    if (Number.isNaN(annualIncome)) return 0.6; // Unknown user income → neutral-ish
    return annualIncome >= requiredIncome ? 1 : 0.3;
  }

  private scoreSpendingMatch(
    card: CreditCard,
    spendingHabits: RecommendationFormData["spendingHabits"],
  ): number {
    let score = 0;
    const userCategories = spendingHabits.primarySpendingCategories;

    // Check best_suited_for field
    const suitedFor = Array.isArray(card.best_suited_for)
      ? card.best_suited_for
      : card.best_suited_for
        ? [card.best_suited_for]
        : [];

    // Enrich with rewards/benefits text and rewardJson keys embedded by mapCreditDataCard
    const extraFromBenefits = [
      ...(Array.isArray(card.benefits)
        ? card.benefits
        : card.benefits
          ? [String(card.benefits)]
          : []),
      ...(Array.isArray(card.rewards) ? card.rewards : card.rewards ? [String(card.rewards)] : []),
    ];

    const cardCategories = [...suitedFor, ...(card.tags || []), ...extraFromBenefits]
      .map((cat) => String(cat).toLowerCase());

    // Category matching
    const categoryMatches = userCategories.filter((userCat) => {
      const categoryMappings = {
        food_dining: ["food", "dining", "restaurant", "swiggy", "zomato"],
        travel: ["travel", "flight", "hotel", "lounge"],
        online_shopping: ["online", "shopping", "e-commerce", "amazon", "flipkart"],
        groceries: ["grocery", "supermarket", "bigbasket"],
        fuel: ["fuel", "petrol", "gas"],
        movies_entertainment: ["movie", "entertainment", "cinema"],
        emi_bills: ["emi", "bill", "utility"],
        luxury_shopping: ["luxury", "premium"],
        medical: ["medical", "health"],
      };

      const mappedTerms = categoryMappings[userCat as keyof typeof categoryMappings] || [userCat];
      return mappedTerms.some((term) => cardCategories.some((cardCat) => cardCat.includes(term)));
    });

    score += (categoryMatches.length / userCategories.length) * 0.7;

    // Spending amount alignment
    const monthlySpend = spendingHabits.monthlySpend;
    if (monthlySpend >= 50000) {
      // High spenders - premium cards
      if (
        cardCategories.some((cat) =>
          ["premium", "luxury", "high"].some((term) => cat.includes(term)),
        )
      ) {
        score += 0.2;
      }
    } else if (monthlySpend <= 15000) {
      // Low spenders - entry level cards
      if (
        cardCategories.some((cat) =>
          ["entry", "basic", "starter"].some((term) => cat.includes(term)),
        )
      ) {
        score += 0.2;
      }
    } else {
      score += 0.15; // Mid-range spenders
    }

    // Payment preference alignment
    if (
      spendingHabits.paymentPreference === "online" &&
      cardCategories.some((cat) => cat.includes("online"))
    ) {
      score += 0.1;
    }

    // Food delivery frequency
    if (
      spendingHabits.foodDeliveryFrequency === "daily" &&
      cardCategories.some((cat) => ["swiggy", "zomato", "food"].some((term) => cat.includes(term)))
    ) {
      score += 0.1;
    }

    return Math.min(score, 1);
  }

  private scoreBenefitMatch(
    card: CreditCard,
    benefitPrefs: RecommendationFormData["benefitPreferences"],
  ): number {
    let score = 0;
    const userBenefits = benefitPrefs.priorityBenefits;

    const cardBenefitsText = [
      ...(Array.isArray(card.benefits)
        ? card.benefits
        : card.benefits
          ? [String(card.benefits)]
          : []),
      ...(Array.isArray(card.rewards) ? card.rewards : card.rewards ? [String(card.rewards)] : []),
      ...(card.tags || []),
      card.why_to_recommend || "",
    ]
      .join(" ")
      .toLowerCase();

    // Benefit matching
    const benefitMatches = userBenefits.filter((benefit) => {
      const benefitMappings = {
        cashback: ["cashback", "cash back", "money back"],
        reward_points: ["points", "rewards", "membership rewards"],
        lounge_access: ["lounge", "airport lounge"],
        travel_insurance: ["travel insurance", "insurance"],
        movie_offers: ["movie", "cinema", "film"],
        golf_privileges: ["golf"],
        fuel_waiver: ["fuel", "petrol", "waiver"],
        welcome_bonus: ["welcome", "bonus", "sign up"],
        milestone_rewards: ["milestone", "spending bonus"],
        dining_discounts: ["dining", "restaurant"],
      };

      const mappedTerms = benefitMappings[benefit as keyof typeof benefitMappings] || [benefit];
      return mappedTerms.some((term) => cardBenefitsText.includes(term));
    });

    score += (benefitMatches.length / userBenefits.length) * 0.7;

    // Reward type preference
    if (benefitPrefs.rewardType === "cashback" && cardBenefitsText.includes("cashback")) {
      score += 0.15;
    } else if (benefitPrefs.rewardType === "points" && cardBenefitsText.includes("points")) {
      score += 0.15;
    } else if (benefitPrefs.rewardType === "no_preference") {
      score += 0.1;
    }

    // Milestone rewards preference
    if (benefitPrefs.milestoneRewards && cardBenefitsText.includes("milestone")) {
      score += 0.15;
    }

    return Math.min(score, 1);
  }

  private scoreLifestyleMatch(
    card: CreditCard,
    lifestyle: RecommendationFormData["lifestyle"],
  ): number {
    let score = 0;

    const cardText = [
      ...(Array.isArray(card.benefits)
        ? card.benefits
        : card.benefits
          ? [String(card.benefits)]
          : []),
      ...(card.tags || []),
      card.why_to_recommend || "",
    ]
      .join(" ")
      .toLowerCase();

    // Travel frequency alignment
    if (lifestyle.travelFrequency === "frequent" || lifestyle.travelFrequency === "monthly") {
      if (cardText.includes("travel") || cardText.includes("lounge")) {
        score += 0.3;
      }
    }

    // Lounge access
    if (lifestyle.loungeAccess && cardText.includes("lounge")) {
      score += 0.2;
    }

    // Golf interest
    if (lifestyle.golfInterest && cardText.includes("golf")) {
      score += 0.2;
    }

    // Dining frequency
    if (lifestyle.diningFrequency === "daily" && cardText.includes("dining")) {
      score += 0.15;
    }

    // Movie frequency
    if (lifestyle.movieFrequency === "weekly" && cardText.includes("movie")) {
      score += 0.15;
    }

    // Luxury preferences
    if (
      lifestyle.luxuryPreferences &&
      (cardText.includes("luxury") || cardText.includes("premium"))
    ) {
      score += 0.2;
    }

    return Math.min(score, 1);
  }

  private scoreFeeMatch(
    card: CreditCard,
    feePrefs: RecommendationFormData["feePreference"],
  ): number {
    let score = 0;

    // Extract fee information
    const feeInfo = this.extractFeeInfo(card.annual_fee);

    // Fee tolerance matching (use joining fee if available, else renewal)
    const feeToleranceMap = {
      free: 0,
      low: 500,
      medium: 2500,
      high: 5000,
      premium: 10000,
    };

    const maxAcceptableFee =
      feeToleranceMap[feePrefs.annualFeeTolerance as keyof typeof feeToleranceMap];

    const comparableFee = feeInfo.joiningFee || feeInfo.renewalFee;
    if (comparableFee <= maxAcceptableFee) {
      score += 0.5;
    } else if (comparableFee <= maxAcceptableFee * 1.5) {
      score += 0.3; // Slightly over budget
    }

    // Fee waiver consideration
    if (feePrefs.feeWaiverImportant && feeInfo.hasWaiver) {
      score += 0.3;
    }

    // Card tier preference can nudge scoring
    if (feePrefs.cardTier) {
      const tier = feePrefs.cardTier;
      const tagsText = (card.tags || []).join(" ").toLowerCase();

      const isPremiumTagged = tagsText.includes("premium");

      // Boost based on fee bands and explicit premium intent
      if (
        (tier === "entry" && comparableFee <= 1000) ||
        (tier === "mid_tier" && comparableFee > 1000 && comparableFee <= 3000) ||
        (tier === "premium" && comparableFee > 3000 && comparableFee <= 10000) ||
        (tier === "super_premium" && comparableFee > 10000)
      ) {
        score += 0.15;
      }

      // Additional nudge when user wants premium tiers and card is premium-tagged
      if ((tier === "premium" || tier === "super_premium") && isPremiumTagged) {
        score += 0.1;
      }
    }

    // Bank preference
    if (feePrefs.preferredBanks && feePrefs.preferredBanks.length > 0) {
      if (feePrefs.preferredBanks.includes("no_preference")) {
        score += 0.2;
      } else {
        const bankMatch = feePrefs.preferredBanks.some((bank) =>
          card.issuer.toLowerCase().includes(bank.replace("_", " ")),
        );
        score += bankMatch ? 0.2 : 0;
      }
    } else {
      score += 0.2; // No preference
    }

    return Math.min(score, 1);
  }

  private extractFeeInfo(annualFee?: string | number | string[] | Record<string, unknown>): {
    joiningFee: number;
    renewalFee: number;
    hasWaiver: boolean;
  } {
    let joiningFee = 0;
    let renewalFee = 0;
    let hasWaiver = false;

    if (!annualFee) {
      return { joiningFee, renewalFee, hasWaiver };
    }

    if (Array.isArray(annualFee)) {
      const feeText = annualFee.join(" ").toLowerCase();

      // Extract joining fee
      const joiningMatch =
        feeText.match(/joining[^₹]*₹\s*(\d+)/i) || feeText.match(/first year[^₹]*₹\s*(\d+)/i);
      if (joiningMatch) {
        joiningFee = parseInt(joiningMatch[1]);
      }

      // Extract renewal fee
      const renewalMatch =
        feeText.match(/renewal[^₹]*₹\s*(\d+)/i) || feeText.match(/second year[^₹]*₹\s*(\d+)/i);
      if (renewalMatch) {
        renewalFee = parseInt(renewalMatch[1]);
      }

      // Check for waiver
      hasWaiver = feeText.includes("waiver") || feeText.includes("waived");
    } else if (typeof annualFee === "string") {
      const feeText = annualFee.toLowerCase();
      const feeMatch = feeText.match(/₹\s*(\d+)/);
      if (feeMatch) {
        joiningFee = parseInt(feeMatch[1]);
        renewalFee = joiningFee;
      }
      hasWaiver = feeText.includes("waiver") || feeText.includes("waived");
    } else if (typeof annualFee === "number") {
      joiningFee = annualFee;
      renewalFee = annualFee;
    }

    return { joiningFee, renewalFee, hasWaiver };
  }

  private generateReasons(
    card: CreditCard,
    preferences: RecommendationFormData,
    scores: { [key: string]: number },
  ): string[] {
    const reasons: string[] = [];

    // Spending category matches
    const userCategories = preferences.spendingHabits.primarySpendingCategories;
    const cardCategories = [
      ...(Array.isArray(card.best_suited_for)
        ? card.best_suited_for
        : [card.best_suited_for || ""]),
      ...(card.tags || []),
    ];

    userCategories.forEach((category) => {
      const categoryMappings = {
        food_dining: "food and dining",
        travel: "travel",
        online_shopping: "online shopping",
        fuel: "fuel purchases",
        movies_entertainment: "entertainment",
      };

      const categoryName = categoryMappings[category as keyof typeof categoryMappings] || category;
      const hasMatch = cardCategories.some((cardCat) =>
        cardCat.toLowerCase().includes(category.replace("_", "")),
      );

      if (hasMatch) {
        reasons.push(`Excellent rewards for ${categoryName}`);
      }
    });

    // Benefit matches
    const userBenefits = preferences.benefitPreferences.priorityBenefits;
    const cardBenefitsText = [
      ...(Array.isArray(card.benefits)
        ? card.benefits
        : card.benefits
          ? [String(card.benefits)]
          : []),
      ...(Array.isArray(card.rewards) ? card.rewards : card.rewards ? [String(card.rewards)] : []),
    ]
      .join(" ")
      .toLowerCase();

    if (userBenefits.includes("cashback") && cardBenefitsText.includes("cashback")) {
      reasons.push("Offers attractive cashback rewards");
    }
    if (userBenefits.includes("lounge_access") && cardBenefitsText.includes("lounge")) {
      reasons.push("Includes airport lounge access");
    }
    if (userBenefits.includes("travel_insurance") && cardBenefitsText.includes("insurance")) {
      reasons.push("Provides comprehensive travel insurance");
    }

    // Fee considerations
    const feeInfo = this.extractFeeInfo(card.annual_fee);
    if (feeInfo.joiningFee === 0) {
      reasons.push("No annual fee");
    } else if (feeInfo.hasWaiver) {
      reasons.push("Annual fee can be waived with spending");
    }

    // Income alignment
    if (scores.eligibility > 0.8) {
      reasons.push("Matches your income and eligibility criteria");
    }

    // Lifestyle alignment
    if (preferences.lifestyle.travelFrequency !== "rarely" && cardBenefitsText.includes("travel")) {
      reasons.push("Perfect for frequent travelers");
    }

    return reasons.slice(0, 4); // Limit to top 4 reasons
  }

  private calculateConfidence(scores: { [key: string]: number }): number {
    const values = Object.values(scores);
    const average = values.reduce((sum, score) => sum + score, 0) / values.length;

    // Calculate standard deviation
    const variance =
      values.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    // Higher confidence when scores are consistently high and have low variance
    const consistencyScore = Math.max(0, 1 - stdDev);
    const averageScore = average;

    return Math.round((consistencyScore * 0.3 + averageScore * 0.7) * 100);
  }
}

export { type ScoredCard };

// ----------------------------
// CREDIT_DATA.ts compatibility
// ----------------------------

function mapCreditDataCard(card: CreditCardTypes): CreditCard {
  const annualFeeParts: string[] = [];
  if (card.features?.creditCardJoiningFeeAmount) {
    const joining = card.features.creditCardJoiningFeeAmount;
    const joiningText = card.features?.creditCardJoiningFeeDescription || "Joining Fee";
    annualFeeParts.push(`${joiningText}: ${joining}`);
  }
  if (card.features?.creditCardAnnualFeeAmount) {
    const renewal = card.features.creditCardAnnualFeeAmount;
    const renewalText = card.features?.creditCardAnnualFeeDescription || "Annual Fee";
    annualFeeParts.push(`${renewalText}: ${renewal}`);
  }

  // Derive tags/best suited for strings from structured features
  const bestSuitedStrings: string[] = card.features?.bestSuitedFor
    ? Object.entries(card.features.bestSuitedFor).flatMap(([group, items]) => [group, ...items])
    : [];

  const categoryDescriptionStrings: string[] = card.features?.cardCategoryDescription
    ? Object.values(card.features.cardCategoryDescription).flat()
    : [];

  // Build extra semantic tags from structured data to improve matching
  const rewardKeys = card.rewardJson ? Object.keys(card.rewardJson) : [];
  const categories = card.features?.categories || [];

  return {
    id: String(card.id ?? card.value ?? card.guid ?? card.name),
    title: card.name,
    issuer: card.program,
    image: card.image,
    rating: undefined,
    annual_fee: annualFeeParts.length ? annualFeeParts : undefined,
    rewards: card.features?.cardBenefits || (card.rewardJson ? rewardKeys : undefined),
    benefits: card.features?.cardBenefits || undefined,
    why_to_recommend: card.features?.creditCardOneLinerDescription,
    best_suited_for: bestSuitedStrings.length ? bestSuitedStrings : undefined,
    eligibility: card.features?.voucherEligibility ? [card.features.voucherEligibility] : undefined,
    cta: card.applyLink ? [card.applyLink] : undefined,
    tags: [
      ...(card.features?.cardBenefits || []),
      ...(bestSuitedStrings || []),
      ...(categoryDescriptionStrings || []),
      ...rewardKeys,
      ...categories,
    ].slice(0, 20),
    welcome_bonus: undefined,
    waiver_condition: card.features?.saveOnFeeToolTip,
    reward_rate: undefined,
    lounge_access: undefined,
    dining: undefined,
    golf: undefined,
    insurance: undefined,
    created_at: card.createdAt,
    apply_link: card.applyLink,
  };
}

export function mapCreditDataToScoring(cards: CreditCardTypes[]): CreditCard[] {
  return cards.map(mapCreditDataCard);
}

export function createScorerFromCreditData(cards?: CreditCardTypes[]): CreditCardScorer {
  const source = cards && cards.length ? cards : CREDIT_CARDS;
  return new CreditCardScorer(mapCreditDataToScoring(source));
}
