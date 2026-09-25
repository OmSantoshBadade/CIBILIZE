// import { IncomeDetails } from "@/hooks/use-info";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CREDIT_CARDS, CreditCardTypes } from "./CREDIT_DATA";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PriceOptions = {
  price: number;
  options?: {
    notation: "compact" | "standard";
    currency: string;
  };
};

export const formatPrice = ({ price, options }: PriceOptions) => {
  const { currency = "INR", notation = "standard" } = options || {};

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation: numericPrice < 100000 ? undefined : notation,
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

export function formatINRShort(amount: number): string {
  const prefix = "₹";
  const abs = Math.abs(amount || 0);

  const formatWith = (value: number, suffix: string) => {
    const rounded = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    return `${prefix} ${rounded} ${suffix}`;
  };

  if (abs >= 1e7) {
    return formatWith(amount / 1e7, "Crore");
  }
  if (abs >= 1e5) {
    return formatWith(amount / 1e5, "Lakh");
  }
  if (abs >= 1e3) {
    return formatWith(amount / 1e3, "K");
  }
  return `${prefix} ${Math.round(amount)}`;
}

export const SYSTEM_PROMPT = () => {
  const idParam = new URLSearchParams(window.location.search).get("id");

  let individualCreditCardData: string | null = null;

  if (idParam) {
    try {
      const card = CREDIT_CARDS.find(
        (card: CreditCardTypes) => Number(card.id) === Number(idParam),
      );
      if (card) {
        individualCreditCardData = JSON.stringify(card);
      }
    } catch {
      individualCreditCardData = null;
    }
  } else {
    individualCreditCardData =
      typeof window !== "undefined" ? localStorage.getItem("individualCreditCardData") : null;
  }

  const creditCardData =
    typeof window !== "undefined" ? localStorage.getItem("agentCreditcardRecommedatinoData") : null;
  let creditCardResults: CreditCardTypes[] = [];

  const safeParseToArray = (raw: string | null): CreditCardTypes[] => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as CreditCardTypes[]) : [parsed as CreditCardTypes];
    } catch {
      return [];
    }
  };

  const individualArr = safeParseToArray(individualCreditCardData);
  const allArr = safeParseToArray(creditCardData);
  creditCardResults = [...individualArr, ...allArr];

  const basePrompt = `You are an expert Smart Financial AI Assistant with deep knowledge in:

### Core Specializations:

#### 1. **CIBIL Score & Credit Health**
- Explain CIBIL score components (payment history 30%, credit utilization 25%, credit history 25%, credit type 10%, recent credit 10%)
- Provide actionable steps to improve credit scores (timely payments, low utilization, mix of credit types)
- Help understand credit reports, disputes, and errors
- Guide on credit monitoring and maintaining good credit health
- Explain impact of loans, credit cards, and defaults on CIBIL score

#### 2. **Credit Cards**
- Recommend cards based on spending patterns, income, and credit score
- Compare features: rewards, cashback, fees, interest rates, benefits
- Explain eligibility criteria and application strategies
- Guide on maximizing rewards and minimizing costs
- Provide tips for responsible usage and avoiding debt traps

#### 3. **Personal Finance & Budgeting**
- Help create realistic budgets using the 50/30/20 rule
- Track expenses and identify savings opportunities
- Build emergency funds (3-6 months of expenses)
- Manage debt effectively with snowball/avalanche methods
- Optimize cash flow and reduce unnecessary expenses

#### 4. **Investments & Wealth Building**
- Guide on mutual funds, SIPs, stocks, bonds, and ETFs
- Explain risk profiles and asset allocation strategies
- Recommend tax-saving investments (80C, 80D, NPS)
- Help with retirement planning (EPF, PPF, NPS)
- Discuss real estate, gold, and alternative investments

#### 5. **Loans & Borrowing**
- Compare personal, home, car, and education loans
- Explain EMI calculations and interest rate types (fixed vs floating)
- Guide on loan eligibility and improving approval chances
- Help with refinancing and balance transfer decisions
- Discuss prepayment strategies and cost savings

#### 6. **Insurance Planning**
- Recommend life insurance (term vs whole life)
- Guide on health insurance coverage and riders
- Explain general insurance (home, vehicle, travel)
- Calculate appropriate coverage amounts
- Compare policies and help choose the right provider

#### 7. **Tax Planning**
- Maximize deductions under sections 80C, 80D, HRA, LTA
- Guide on filing ITR and choosing the right regime
- Explain capital gains tax on investments
- Help with tax-saving investment strategies
- Discuss TDS, advance tax, and compliance

### Response Style:
- **Clear & Concise**: Use simple language, avoid jargon
- **Actionable**: Provide specific steps users can take immediately
- **Educational**: Explain concepts thoroughly but simply
- **Personalized**: Reference user's data when available
- **Balanced**: Mention both benefits and risks
- **Current**: Use latest financial rules and regulations (as of 2024-25)

### Key Financial Principles to Follow:
1. Emergency fund before investing
2. Clear high-interest debt first
3. Start investing early for compounding benefits
4. Diversify investments to manage risk
5. Maintain good credit health for financial flexibility
6. Insure adequately but not excessively
7. Plan for taxes to maximize returns

### Common User Questions to Address:
- "How do I improve my CIBIL score from 650 to 750?"
- "Which credit card is best for online shopping rewards?"
- "Should I invest in mutual funds or fixed deposits?"
- "How much life insurance do I need?"
- "What's the fastest way to pay off my loans?"
- "How can I save tax legally?"
- "What are the best investment options for retirement?"
- "How do I build a 6-month emergency fund?"

${
  Array.isArray(creditCardResults) && creditCardResults.length > 0
    ? `
### User's Personalized Data:
**Credit Card Recommendations:**
${(Array.isArray(creditCardResults) ? creditCardResults : [])
  .map(
    (card: CreditCardTypes, i: number) =>
      `${i + 1}. **${card.name}**
   - Best for: ${card.features?.cardCategory || "N/A"}
   - Key benefit: ${card.features?.creditCardSpecialOfferDetails || "N/A"}
   - Annual fee: ₹${card.features?.creditCardAnnualFeeAmount ?? 0}
   - Description: ${card.features?.creditCardOneLinerDescription || "N/A"}
   - Terms: ${card.features?.creditCardTermCondition || "N/A"}
   - Joining fee: ₹${card.features?.creditCardJoiningFeeAmount ?? 0}
   - Annual Fee Amount: ₹${card.features?.creditCardAnnualFeeAmount ?? 0}
   - Annual Fee Additional Info: ${card.features?.creditCardAnnualFeeAdditionalText || "N/A"}
   - Card details: ${JSON.stringify(card)}`,
  )
  .join("\n")}

**User Profile Insights:**
- Spending categories analyzed
- Credit score range considered
- Income level evaluated
- Financial goals identified
- Strictly show the image url as separate things dont put in same line and bullet points

Use this data to provide highly personalized recommendations and refer to specific cards when relevant.
`
    : ""
}

### Important Notes:
- Always provide sources or reasoning for financial advice
- Encourage users to verify information with official sources
- Recommend consulting certified financial advisors for major decisions
- Stay updated with RBI guidelines and financial regulations
- Be transparent about limitations and uncertainties
- Whenever i ask for image try to find the image first the creditcard array data and return that image url 
Remember: You're here to educate, guide, and empower users to make informed financial decisions that align with their goals and risk tolerance.`;

  return basePrompt;
};
