import { z } from "zod";

// Comprehensive schema for advanced credit card recommendation form
export const recommendationFormSchema = z.object({
  // Step 1: Personal Profile
  personalInfo: z.object({
    age: z.number().min(18).max(65),
    monthlyIncome: z.number().min(0),
    occupation: z.enum(["salaried", "self_employed", "student", "retired"]),
    existingCreditCard: z.boolean(),
    creditScore: z
      .enum([
        "poor", // <600
        "average", // 600-700
        "good", // 700-750
        "excellent", // >750
        "unknown",
      ])
      .optional(),
  }),

  // Step 2: Spending Habits
  spendingHabits: z.object({
    primarySpendingCategories: z
      .array(
        z.enum([
          "food_dining",
          "travel",
          "online_shopping",
          "groceries",
          "fuel",
          "movies_entertainment",
          "emi_bills",
          "luxury_shopping",
          "medical",
          "others",
        ]),
      )
      .optional(),
    monthlySpend: z.number().min(5000).max(200000),
    paymentPreference: z.enum(["online", "offline", "mixed"]),
    foodDeliveryFrequency: z.enum(["rarely", "weekly", "daily"]),
    shoppingPlatforms: z
      .array(
        z.enum([
          "amazon_in",
          "flipkart",
          "myntra",
          "ajio",
          "nykaa",
          "tatacliq",
          "snapdeal",
          "reliance_digital",
          "croma",
          "bigbasket",
          "grofers",
          "meesho",
          "firstcry",
          "lenskart",
          "bookmyshow",
          "paytm_mall",
          "swiggy",
          "zomato",
          "redbus",
          "makemytrip",
          "cleartrip",
          "yatra",
          "amazon_global",
          "ebay",
          "aliexpress",
          "shein",
          "zara",
          "h&m",
          "others",
        ]),
      )
      .optional(),
  }),

  // Step 3: Benefit Preferences
  benefitPreferences: z.object({
    priorityBenefits: z
      .array(
        z.enum([
          "cashback",
          "reward_points",
          "lounge_access",
          "travel_insurance",
          "movie_offers",
          "golf_privileges",
          "fuel_waiver",
          "welcome_bonus",
          "milestone_rewards",
          "dining_discounts",
        ]),
      )
      .optional(),
    rewardType: z.enum(["cashback", "points", "no_preference"]),
    redemptionPreference: z.enum([
      "direct_cashback",
      "travel_bookings",
      "vouchers",
      "gift_cards",
      "statement_credit",
    ]),
    milestoneRewards: z.boolean(),
  }),

  // Step 4: Lifestyle & Travel
  lifestyle: z.object({
    travelFrequency: z.enum(["rarely", "1_2_times_year", "monthly", "frequent"]),
    travelType: z.array(z.enum(["domestic", "international"])).optional(),
    loungeAccess: z.boolean(),
    golfInterest: z.boolean(),
    diningFrequency: z.enum(["rarely", "weekly", "daily"]),
    movieFrequency: z.enum(["rarely", "monthly", "weekly"]),
    luxuryPreferences: z.boolean(),
  }),

  // Step 5: Fee Preference
  feePreference: z.object({
    annualFeeTolerance: z.enum([
      "free", // ₹0
      "low", // ₹500
      "medium", // ₹1000-2500
      "high", // ₹5000+
      "premium", // ₹10000+
    ]),
    feeWaiverImportant: z.boolean(),
    cardTier: z.enum(["entry", "mid_tier", "premium", "super_premium"]),
    preferredBanks: z
      .array(
        z.enum([
          "no_preference",
          "amex",
          "au",
          "csb",
          "federal",
          "citibank",
          "indian",
          "rbl",
          "indusind",
          "sbi",
          "sbm",
          "kotak",
          "axis",
          "dbs",
          "sc",
          "south_indian",
          "yes_bank",
          "utkarsh",
          "bob",
          "hdfc",
          "hsbc",
          "equitas",
          "idfc",
          "canara",
          "icici",
          "idbi",
          "pnb",
        ]),
      )
      .optional(),
  }),
});

export type RecommendationFormData = z.infer<typeof recommendationFormSchema>;

// Helper functions for form options
export const getIncomeLabel = (value: string) => {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  // Lazy import to avoid circulars in some bundlers is unnecessary here; direct import sits at top-level file.
  // But we keep util usage minimal here by duplicating small formatting via Intl for fallback if needed.
  return `${num}`;
};

export const getSpendingCategoryLabel = (value: string) => {
  const labels = {
    food_dining: "Food & Dining 🍽️",
    travel: "Travel ✈️",
    online_shopping: "Online Shopping 🛒",
    groceries: "Groceries 🛍️",
    fuel: "Fuel ⛽",
    movies_entertainment: "Movies & Entertainment 🎬",
    emi_bills: "EMI & Bills 💳",
    luxury_shopping: "Luxury Shopping 💎",
    medical: "Medical 🏥",
    others: "Others",
  };
  return labels[value as keyof typeof labels] || value;
};

export const getBenefitLabel = (value: string) => {
  const labels = {
    cashback: "Cashback 💰",
    reward_points: "Reward Points 🎟️",
    lounge_access: "Lounge Access ✈️",
    travel_insurance: "Travel Insurance 🧳",
    movie_offers: "Movie Offers 🍿",
    golf_privileges: "Golf Privileges 🏌️",
    fuel_waiver: "Fuel Waiver ⛽",
    welcome_bonus: "Welcome Bonus 🎉",
    milestone_rewards: "Milestone Rewards 🎯",
    dining_discounts: "Dining Discounts 🍽️",
  };
  return labels[value as keyof typeof labels] || value;
};

export const getBankLabel = (value: string) => {
  const labels = {
    hdfc: "HDFC Bank",
    sbi: "State Bank of India",
    icici: "ICICI Bank",
    axis: "Axis Bank",
    kotak: "Kotak Mahindra Bank",
    american_express: "American Express",
    citibank: "Citibank",
    standard_chartered: "Standard Chartered",
    yes_bank: "Yes Bank",
    indusind: "IndusInd Bank",
    no_preference: "No Preference",
  };
  return labels[value as keyof typeof labels] || value;
};
