export interface CreditCardTypes {
  id: number;
  value: string;
  program: string;
  token: string;
  guid: string;
  partnerId: number;
  pbcoOfferId: string;
  beaconUserIdentifier: string;
  name: string;
  image?: string;
  applyLink?: string;

  features: {
    creditCardSpecialOfferDetails: string;
    creditCardTermCondition: string;
    creditCardOneLinerDescription: string;
    cardType: string;
    isRupay: boolean;
    categories?: string[];
    isSecuredCard?: boolean;
    isRedirect?: string | boolean;
    redirectUrl?: string;
    bestFeature?: string[];
    saveOnFeeToolTip?: string;
    bestSuitedFor?: Record<string, string[]>;
    cardBenefits?: string[];
    moreInfo?: Record<string, string[]>;
    creditCardJoiningFeeAmount?: string;
    creditCardJoiningFeeAdditionalText?: string;
    creditCardJoiningFeeDescription?: string;
    creditCardAnnualFeeAmount?: string;
    creditCardAnnualFeeAdditionalText?: string;
    creditCardAnnualFeeDescription?: string;
    cardOrientation?: string;
    cardCategory?: Record<string, string>;
    cardCategoryDescription?: Record<string, string[]>;
    seoLink?: string;
    voucherEligibility?: string;
    nameOnCard?: {
      singleLine?: boolean;
      position?: { x: number; y: number };
      color?: string;
    };
    exclusivelyOnPb?: boolean;
    trendingOffers?:
      | {
          brandId: number;
          brandName: string;
          brandColour: string;
          shortDescription: string;
          detailedDescription: string;
        }[]
      | null;
    voucherValue?: string;
    maximumBenifits?: number;
    effectiveFree?: number;
    cardNetwork?: string;
  };

  preApproved: boolean;
  rewardJson: {
    [category: string]:
      | {
          rewardsPercent?: string;
          dynamicRewardsPercent?: {
            minExpense: number;
            maxExpense: number | string;
            rate: number;
          }[];
          domestic?: {
            visitsPerYear: number;
            rule: string;
          };
          international?: {
            visitsPerYear: number;
            rule: string;
          };
          nonSpendBased?: {
            [rewardType: string]: {
              baseValue: string | number;

              rules: {
                expenseBase: number;
                operator: string;
                multiplicationFactor: number;
                maxValue?: number | string;
              }[];
              rewardDesc: string;
              subCategory?: string;
            };
          };
          spendBased?: {
            [rewardType: string]: {
              baseValue: string | number;
              rules: {
                expenseBase: number;
                operator: string;
                multiplicationFactor: number;
                maxValue?: number | string;
              }[];
              rewardDesc: string;
              subCategory?: string;
            };
          };
        }
      | number;
  };

  domestic?: {
    visitsPerYear: number;
    rule: string;
  };
  international?: {
    visitsPerYear: number;
    rule: string;
  };
  // Optional/extras found in dataset:
  priority?: number;
  pcoPriority?: number;
  slug?: string;
  isActive?: number;
  createdBy?: string | number;
  updatedBy?: string | number;
  additionalPayload?: string;
  cardDisplay?: number;
  createdAt?: string;
  updatedAt?: string;
  sortOrder?: string;
  isCrossSell?: string | boolean;
}

const CREDIT_CARDS_RAW: CreditCardTypes[] = [
  {
    id: 3421,
    value: "AU LIT Credit Card",
    program: "AU Small Finance Bank",
    token: "au-lit-credit-card",
    guid: "c9d5e2a4-7f3b-4e8c-9a6d-1b4e8c9f2a3b",
    partnerId: 34,
    pbcoOfferId: "AU_LIT_2025",
    beaconUserIdentifier: "au_lit_user_tracker",
    name: "AU LIT Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2024/04/au-litttt.png",
    applyLink: "https://www.aubank.in/credit-card/au-lit-credit-card",
    features: {
      creditCardSpecialOfferDetails:
        "Lifetime free with customizable features. Up to 10X rewards on online/offline spends. 5% cashback on groceries, travel, dining, electronics, apparel. Complimentary ZEE5, Amazon Prime, Cult Fit memberships.",
      creditCardTermCondition:
        "Quarterly fee Rs. 49-Rs. 499 per feature. Max 25,000 reward points per statement cycle (excluding utilities). Penalty charges apply on not meeting spend milestones. 1 RP = Rs. 0.25. Features auto-renew every 90 days. Fuel, rent, EMI, BBPS, quasi cash excluded.",
      creditCardOneLinerDescription:
        "Cashback, Shopping, Dining, Travel, Rewards, Utilities, Bill Payments, Brand Voucher",
      cardType: "Cashback & Rewards",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: true,
      redirectUrl: "https://www.aubank.in/credit-card/au-lit-credit-card",
      bestFeature: [
        "India's first customizable credit card",
        "Lifetime free (features require quarterly fees)",
        "Up to 10X rewards on online & offline spends",
        "5% cashback on 5 day-to-day categories",
        "Complimentary Amazon Prime, ZEE5, Cult Fit memberships",
      ],
      saveOnFeeToolTip:
        "Lifetime free card - pay only for features you choose. Quarterly fees range from Rs. 49 to Rs. 499 per feature for 90 days.",
      bestSuitedFor: {
        "Flexible Spenders": [
          "Users wanting customizable benefits",
          "Category-specific spenders",
          "Feature-conscious users",
        ],
        "Budget-Conscious Consumers": [
          "Pay-as-you-use preference",
          "No annual fee seekers",
          "Selective benefit users",
        ],
        "Everyday Shoppers": [
          "Grocery buyers",
          "Online shoppers",
          "Dining enthusiasts",
          "Apparel shoppers",
        ],
      },
      cardBenefits: [
        "Customizable features - choose what you need",
        "Base 1% reward rate on all retail spends (1 RP per Rs. 100)",
        "Up to 10X reward points on online domestic & international transactions",
        "Up to 10X reward points on POS & contactless offline transactions",
        "5% cashback on groceries (max Rs. 1,000/month)",
        "5% cashback on travel (max Rs. 1,000/month)",
        "5% cashback on dining (max Rs. 1,000/month)",
        "5% cashback on electronics (max Rs. 1,000/month)",
        "5% cashback on apparel (max Rs. 1,000/month)",
        "Up to 5% milestone cashback (3 times in 90 days)",
        "Complimentary 3-month ZEE5 membership (on Rs. 5,000 spend in 90 days)",
        "Complimentary 3-month Amazon Prime membership (on Rs. 10,000 spend in 90 days)",
        "Complimentary 3-month Cult Fit membership (on Rs. 20,000 spend in 90 days)",
        "Up to 4 complimentary domestic lounge visits per quarter",
        "1% fuel surcharge waiver (Rs. 400-Rs. 5,000)",
        "Features valid for 90 days with auto-renewal option",
      ],
      moreInfo: {
        "Feature-wise Quarterly Fees": [
          "10X rewards on online spends: Rs. 299",
          "10X rewards on offline spends: Rs. 299",
          "5X rewards on online spends: Rs. 199",
          "5X rewards on offline spends: Rs. 199",
          "5% category cashback: Rs. 199-Rs. 299 per category",
          "5% milestone cashback: Rs. 299",
          "2% milestone cashback: Rs. 199",
          "1 lounge visit per quarter: Rs. 199",
          "2 lounge visits per quarter: Rs. 299",
          "Fuel surcharge waiver: Rs. 49",
          "ZEE5 membership: Rs. 99",
          "Amazon Prime membership: Rs. 199",
          "Cult Fit membership: Rs. 499",
        ],
        "Reward Redemption": [
          "1 Reward Point = Rs. 0.25",
          "Redeemed through AU rewards catalogue",
          "No statement cashback redemption",
          "No air miles conversion available",
        ],
        "Milestone Cashback": [
          "5% cashback: Min. Rs. 7,500 retail spends, max Rs. 500/month (Rs. 299 quarterly fee)",
          "2% cashback: Min. Rs. 10,000 retail spends, max Rs. 1,000/month (Rs. 199 quarterly fee)",
          "3 times in 90-day period",
        ],
        "Penalty Charges": [
          "ZEE5: Rs. 50 (if spend < Rs. 5,000 in 90 days)",
          "Amazon Prime: Rs. 100 (if spend < Rs. 10,000 in 90 days)",
          "Cult Fit: Rs. 200 (if spend < Rs. 20,000 in 90 days)",
          "Penalty levied 5 days after feature end date",
        ],
        Exclusions: [
          "Fuel transactions (no rewards)",
          "Rent payments (no rewards)",
          "Cash withdrawals (no rewards)",
          "BBPS transactions (no rewards)",
          "Quasi cash transactions (no rewards)",
          "Education & Government services (no rewards)",
          "EMI transactions (no rewards)",
        ],
      },
      creditCardJoiningFeeAmount: "₹0",
      creditCardJoiningFeeAdditionalText: "Lifetime Free",
      creditCardJoiningFeeDescription:
        "No joining fee. Pay only for features you activate (Rs. 49-Rs. 499 per feature per quarter)",
      creditCardAnnualFeeAmount: "₹0",
      creditCardAnnualFeeAdditionalText: "Lifetime Free",
      creditCardAnnualFeeDescription:
        "No annual fee. Quarterly feature fees apply based on your selection",
      cardOrientation: "horizontal",
      cardCategory: {
        primary: "Cashback",
        secondary: "Rewards",
        tertiary: "Customizable",
      },
      cardCategoryDescription: {
        Cashback: [
          "5% cashback on 5 everyday categories",
          "Up to 5% milestone cashback",
          "Category-wise monthly capping of Rs. 1,000",
          "Direct cashback on day-to-day spends",
        ],
        Rewards: [
          "Base 1% reward rate (1 RP per Rs. 100)",
          "Up to 10X rewards on online spends",
          "Up to 10X rewards on offline spends",
          "Max 25,000 reward points per statement cycle",
        ],
        Customizable: [
          "India's first set-and-change feature card",
          "Choose benefits via AU 0101 app",
          "90-day feature validity",
          "Pay only for what you use",
        ],
      },
      seoLink:
        "https://www.paisabazaar.com/credit-card/au-small-finance-bank-credit-card/au-lit-credit-card/",
      voucherEligibility: "not_available",
      nameOnCard: {
        singleLine: true,
        position: { x: 30, y: 170 },
        color: "#000000",
      },
      exclusivelyOnPb: false,
      trendingOffers: [
        {
          brandId: 301,
          brandName: "Customizable Features",
          brandColour: "#FF6B35",
          shortDescription: "Set & Change Benefits",
          detailedDescription:
            "India's first customizable credit card. Choose features according to your lifestyle via AU 0101 app. Features valid for 90 days with auto-renewal option.",
        },
        {
          brandId: 302,
          brandName: "Category Cashback",
          brandColour: "#4ECDC4",
          shortDescription: "5% on Essentials",
          detailedDescription:
            "Earn 5% cashback on groceries, travel, dining, electronics, and apparel. Maximum cashback of Rs. 1,000 per category per month.",
        },
        {
          brandId: 303,
          brandName: "Memberships",
          brandColour: "#95E1D3",
          shortDescription: "Free Subscriptions",
          detailedDescription:
            "Complimentary 3-month memberships of Amazon Prime, ZEE5, and Cult Fit on meeting minimum spend criteria.",
        },
      ],
      voucherValue: "0",
      maximumBenifits: 10,
      effectiveFree: 10,
      cardNetwork: "Visa",
    },
    preApproved: false,
    rewardJson: {
      Shopping: {
        rewardsPercent: "2.5",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: "unlimited",
            rate: 0.25,
          },
          {
            minExpense: 0,
            maxExpense: "unlimited",
            rate: 1.25,
          },
          {
            minExpense: 0,
            maxExpense: "unlimited",
            rate: 2.5,
          },
        ],
        spendBased: {
          base_rewards: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
                maxValue: 25000,
              },
            ],
            rewardDesc: "1 reward point per Rs. 100 spent (base rate)",
            subCategory: "Base Rate",
          },
          online_10x: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 25000,
              },
            ],
            rewardDesc: "10X reward points on online shopping (Rs. 299 quarterly fee)",
            subCategory: "Online Shopping - 10X",
          },
          offline_10x: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 25000,
              },
            ],
            rewardDesc: "10X reward points on offline shopping (Rs. 299 quarterly fee)",
            subCategory: "Offline Shopping - 10X",
          },
          apparel_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on apparel (max Rs. 1,000/month, Rs. 199 quarterly fee)",
            subCategory: "Apparel",
          },
          electronics_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on electronics (max Rs. 1,000/month, Rs. 299 quarterly fee)",
            subCategory: "Electronics",
          },
        },
      },
      CashBack: {
        rewardsPercent: "5",
        spendBased: {
          grocery_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on groceries (max Rs. 1,000/month, Rs. 299 quarterly fee)",
            subCategory: "Grocery",
          },
          travel_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on travel (max Rs. 1,000/month, Rs. 299 quarterly fee)",
            subCategory: "Travel",
          },
          dining_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on dining (max Rs. 1,000/month, Rs. 199 quarterly fee)",
            subCategory: "Dining",
          },
          electronics_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on electronics (max Rs. 1,000/month, Rs. 299 quarterly fee)",
            subCategory: "Electronics",
          },
          apparel_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on apparel (max Rs. 1,000/month, Rs. 199 quarterly fee)",
            subCategory: "Apparel",
          },
          milestone_5percent: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 7500,
                operator: "minimum_spend",
                multiplicationFactor: 5,
                maxValue: 500,
              },
            ],
            rewardDesc:
              "5% milestone cashback, 3 times in 90 days (min Rs. 7,500, max Rs. 500/month, Rs. 299 quarterly fee)",
            subCategory: "Milestone - 5%",
          },
          milestone_2percent: {
            baseValue: "2",
            rules: [
              {
                expenseBase: 10000,
                operator: "minimum_spend",
                multiplicationFactor: 2,
                maxValue: 1000,
              },
            ],
            rewardDesc:
              "2% milestone cashback, 3 times in 90 days (min Rs. 10,000, max Rs. 1,000/month, Rs. 199 quarterly fee)",
            subCategory: "Milestone - 2%",
          },
        },
      },
      Dining: {
        rewardsPercent: "5",
        spendBased: {
          dining_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on dining (max Rs. 1,000/month, Rs. 199 quarterly fee)",
            subCategory: "Dining",
          },
          base_rewards: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
                maxValue: 25000,
              },
            ],
            rewardDesc: "1 reward point per Rs. 100 spent",
            subCategory: "Base Rate",
          },
        },
      },
      Travel: {
        rewardsPercent: "5",
        spendBased: {
          travel_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1000,
              },
            ],
            rewardDesc: "5% cashback on travel (max Rs. 1,000/month, Rs. 299 quarterly fee)",
            subCategory: "Travel",
          },
          base_rewards: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
                maxValue: 25000,
              },
            ],
            rewardDesc: "1 reward point per Rs. 100 spent",
            subCategory: "Base Rate",
          },
        },
      },
      Rewards: {
        rewardsPercent: "2.5",
        spendBased: {
          online_10x: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 25000,
              },
            ],
            rewardDesc: "10X reward points on online spends (Rs. 299 quarterly fee)",
            subCategory: "Online 10X",
          },
          offline_10x: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 25000,
              },
            ],
            rewardDesc: "10X reward points on offline spends (Rs. 299 quarterly fee)",
            subCategory: "Offline 10X",
          },
          online_5x: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "multiplier",
                multiplicationFactor: 5,
                maxValue: 25000,
              },
            ],
            rewardDesc: "5X reward points on online spends (Rs. 199 quarterly fee)",
            subCategory: "Online 5X",
          },
          offline_5x: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "multiplier",
                multiplicationFactor: 5,
                maxValue: 25000,
              },
            ],
            rewardDesc: "5X reward points on offline spends (Rs. 199 quarterly fee)",
            subCategory: "Offline 5X",
          },
        },
        nonSpendBased: {
          zee5_membership: {
            baseValue: "3_months",
            rules: [
              {
                expenseBase: 5000,
                operator: "minimum_spend_90days",
                multiplicationFactor: 1,
                maxValue: 1,
              },
            ],
            rewardDesc:
              "Complimentary 3-month ZEE5 membership (Rs. 99 quarterly fee, min Rs. 5,000 spend, Rs. 50 penalty)",
          },
          amazon_prime: {
            baseValue: "3_months",
            rules: [
              {
                expenseBase: 10000,
                operator: "minimum_spend_90days",
                multiplicationFactor: 1,
                maxValue: 1,
              },
            ],
            rewardDesc:
              "Complimentary 3-month Amazon Prime membership (Rs. 199 quarterly fee, min Rs. 10,000 spend, Rs. 100 penalty)",
          },
          cultfit_membership: {
            baseValue: "3_months",
            rules: [
              {
                expenseBase: 20000,
                operator: "minimum_spend_90days",
                multiplicationFactor: 1,
                maxValue: 1,
              },
            ],
            rewardDesc:
              "Complimentary 3-month Cult Fit membership (Rs. 499 quarterly fee, min Rs. 20,000 spend, Rs. 200 penalty)",
          },
          lounge_access_1: {
            baseValue: 1,
            rules: [
              {
                expenseBase: 0,
                operator: "per_quarter",
                multiplicationFactor: 1,
                maxValue: 4,
              },
            ],
            rewardDesc:
              "1 complimentary domestic lounge visit per quarter, max 4 visits (Rs. 199 quarterly fee)",
          },
          lounge_access_2: {
            baseValue: 2,
            rules: [
              {
                expenseBase: 0,
                operator: "per_quarter",
                multiplicationFactor: 2,
                maxValue: 4,
              },
            ],
            rewardDesc:
              "2 complimentary domestic lounge visits per quarter, max 4 visits (Rs. 299 quarterly fee)",
          },
        },
      },
      Utilities: {
        rewardsPercent: "0.25",
        spendBased: {
          utility_rewards: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
                maxValue: 100,
              },
            ],
            rewardDesc:
              "1 reward point per Rs. 100 spent on utilities (max 100 points per transaction)",
            subCategory: "Utilities",
          },
        },
      },
      "Bill Payments": {
        rewardsPercent: "0",
        spendBased: {
          bill_payment_exclusion: {
            baseValue: "0",
            rules: [
              {
                expenseBase: 100,
                operator: "excluded",
                multiplicationFactor: 0,
                maxValue: 0,
              },
            ],
            rewardDesc: "BBPS transactions excluded from rewards and cashback",
            subCategory: "BBPS Excluded",
          },
        },
      },
      "Brand Voucher": {
        rewardsPercent: "0.25",
        spendBased: {
          voucher_redemption: {
            baseValue: "0.25",
            rules: [
              {
                expenseBase: 1,
                operator: "redemption_ratio",
                multiplicationFactor: 1,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "1 RP = Rs. 0.25 redemption through AU rewards catalogue",
            subCategory: "Rewards Catalogue",
          },
        },
      },
      Fuel: {
        rewardsPercent: "1",
        spendBased: {
          fuel_surcharge: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 400,
                operator: "waiver",
                multiplicationFactor: 1,
                maxValue: 5000,
              },
            ],
            rewardDesc:
              "1% fuel surcharge waiver on transactions between Rs. 400-Rs. 5,000 (Rs. 49 quarterly fee)",
            subCategory: "Fuel Waiver",
          },
        },
      },
    },
    priority: 8,
    pcoPriority: 8,
    slug: "au-lit-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    additionalPayload:
      '{"lifetimeFree":true,"customizable":true,"quarterlyFeeBased":true,"maxRewardPointsPerCycle":25000,"featureValidity":90}',
    cardDisplay: 1,
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2025-08-31T14:08:05Z",
    sortOrder: "8",
    isCrossSell: false,
  },

  {
    id: 84844,
    value: "American Express SmartEarn™ Credit Card",
    program: "American Express",
    token: "amex-smartearn-credit-card",
    guid: "amex-smartearn-guid",
    partnerId: 10042,
    pbcoOfferId: "pbco-amex-smartearn-2025",
    beaconUserIdentifier: "amex-smartearn-user",
    name: "American Express SmartEarn™ Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/06/American-Express-SmartEarn%E2%84%A2-Credit-Card.png.webp",
    applyLink: "https://www.americanexpress.com/in/credit-cards/smartearn-credit-card/",

    features: {
      creditCardSpecialOfferDetails:
        "Earn up to 10X Membership Rewards® Points on top brands like Amazon, Flipkart, Zomato, Myntra, Uber, Nykaa, and more. Get Rs. 500 cashback as a welcome gift on spends of Rs. 10,000 in the first 90 days.",
      creditCardTermCondition:
        "Bonus reward points are subject to monthly caps. Annual fee waived on spends of Rs. 40,000 and above in the previous year. Terms and conditions of American Express apply.",
      creditCardOneLinerDescription:
        "Rewards, Online Shopping, Cashback, Dining, Movies, Travel Bookings",
      cardType: "Credit Card",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: true,
      redirectUrl: "https://www.americanexpress.com/in/credit-cards/smartearn-credit-card/",
      bestFeature: [
        "10X Membership Rewards Points on top brands like Zomato, Flipkart, Uber, Nykaa, BookMyShow, and more",
        "5X Points on Amazon purchases (up to 250 points/month)",
        "1 Point per Rs. 50 on all other spends",
        "Rs. 500 cashback on Rs. 10,000 spends in the first 90 days",
        "Annual fee waiver on Rs. 40,000 annual spend",
      ],
      saveOnFeeToolTip: "Get annual fee waiver by spending Rs. 40,000 annually.",
      bestSuitedFor: {
        Categories: ["Rewards", "Shopping", "Dining", "Movies", "Online Payments"],
      },
      cardBenefits: [
        "10X Membership Rewards Points on Zomato, Flipkart, Uber, Myntra, Nykaa, PVR, Ajio, BlinkIt, BookMyShow, EaseMyTrip",
        "5X Membership Rewards Points on Amazon (up to 250 points per month)",
        "1 Membership Rewards Point for every Rs. 50 spent on other purchases",
        "Rs. 500 cashback on Rs. 10,000 spend in first 90 days",
        "Vouchers worth Rs. 500 each on spends of Rs. 1.2L, Rs. 1.8L, Rs. 2.4L annually",
        "Annual fee waiver on Rs. 40,000 annual spend",
        "0% fuel surcharge for HPCL transactions below Rs. 5,000",
        "Easy EMI conversion at 14% p.a. with zero foreclosure charges",
        "Interest-free period up to 48 days",
      ],
      creditCardJoiningFeeAmount: "₹495",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "Payable at the time of card issuance.",
      creditCardAnnualFeeAmount: "₹495",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Waived off on annual spends of Rs. 40,000 or more.",
      cardOrientation: "horizontal",
      cardCategory: {
        tier: "Entry-Level",
      },
      cardCategoryDescription: {
        "Entry-Level": [
          "Best suited for new credit card users who want to earn rewards on online shopping and everyday purchases.",
        ],
      },
      seoLink: "/credit-card/american-express-smartearn-credit-card",
      voucherEligibility:
        "Earn vouchers worth Rs. 500 each on annual spend milestones of Rs. 1.2L, Rs. 1.8L, and Rs. 2.4L.",
      exclusivelyOnPb: false,
      voucherValue: "Up to ₹1,500 annual milestone vouchers",
      maximumBenifits: 10000,
      effectiveFree: 1,
      cardNetwork: "American Express",
    },

    preApproved: false,

    rewardJson: {
      "Online Partner Spends": {
        rewardsPercent: "10X",
        spendBased: {
          points: {
            baseValue: 10,
            rules: [
              {
                expenseBase: 50,
                operator: "per",
                multiplicationFactor: 10,
              },
            ],
            rewardDesc: "10X Points on eligible partner merchants with monthly caps applied.",
          },
        },
      },
      "Amazon Spends": {
        rewardsPercent: "5X",
      },
      "Other Spends": {
        rewardsPercent: "1 Point per ₹50",
      },
      "Milestone Benefits": {
        nonSpendBased: {
          vouchers: {
            baseValue: 1500,
            rules: [
              {
                expenseBase: 120000,
                operator: "gte",
                multiplicationFactor: 1,
              },
              {
                expenseBase: 180000,
                operator: "gte",
                multiplicationFactor: 1,
              },
              {
                expenseBase: 240000,
                operator: "gte",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Earn ₹500 vouchers each at ₹1.2L, ₹1.8L, and ₹2.4L spend milestones per membership year.",
          },
        },
      },
    },

    priority: 9,
    pcoPriority: 1,
    slug: "american-express-smartearn-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    cardDisplay: 1,
    createdAt: "2025-11-01T11:15:00+05:30",
    updatedAt: "2025-11-01T11:15:00+05:30",
    sortOrder: "101",
    isCrossSell: false,
  },

  {
    id: 39499,
    value: "American Express® Gold Card",
    program: "American Express",
    token: "amex-gold-card",
    guid: "amex-gold-card-guid",
    partnerId: 10042,
    pbcoOfferId: "pbco-amex-gold-2025",
    beaconUserIdentifier: "amex-gold-user",
    name: "American Express® Gold Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2022/11/American-Express%C2%AE-Gold-Card.png.webp",
    applyLink: "https://www.americanexpress.com/in/credit-cards/gold-card/",

    features: {
      creditCardSpecialOfferDetails:
        "Earn up to 5X Membership Rewards Points on select spends, complimentary hotel benefits, and unlimited spending flexibility.",
      creditCardTermCondition:
        "Welcome bonus applicable on spends within 90 days. Reward points capped for utility transactions. Terms and conditions of American Express apply.",
      creditCardOneLinerDescription:
        "Rewards, Travel, Dining, Hotel Benefits, No Pre-set Limit, Cashback Offers",
      cardType: "Charge Card",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: true,
      redirectUrl: "https://www.americanexpress.com/in/credit-cards/gold-card/",
      bestFeature: [
        "No pre-set spending limit",
        "5X Membership Rewards Points on purchases through Reward Multiplier",
        "4,000 bonus points on first spend of Rs. 10,000 within 90 days",
        "Complimentary room upgrade and hotel credits at top hotels",
        "1,000 bonus points on 6 transactions of Rs. 1,000 each monthly",
      ],
      saveOnFeeToolTip:
        "Earn high reward value and redeem for premium vouchers to offset fees effectively.",
      bestSuitedFor: {
        Categories: ["Rewards", "Travel", "Dining"],
      },
      cardBenefits: [
        "5X Membership Rewards Points on select spends through Reward Multiplier",
        "1 Reward Point per Rs. 50 on general spends",
        "Reward redemption options for Amazon, Taj, Myntra, Shoppers Stop and more",
        "Complimentary room upgrade and US$100 hotel credit at top hotels",
        "Welcome benefit of 4,000 Membership Rewards Points",
        "Milestone bonus of 1,000 points on 6 monthly transactions of Rs. 1,000 each",
        "Rs. 500 cashback at select Lakme Salons during offer period",
        "Fuel convenience fee waiver at HPCL petrol pumps",
        "Up to 20% discount on dining at partner restaurants",
        "No pre-set spending limit",
      ],
      creditCardJoiningFeeAmount: "₹1,000",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "Payable at the time of card issuance.",
      creditCardAnnualFeeAmount: "₹4,500",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Charged annually from second year onward.",
      cardOrientation: "horizontal",
      cardCategory: {
        tier: "Premium",
      },
      cardCategoryDescription: {
        Premium: [
          "Designed for users seeking premium lifestyle and travel benefits with high reward potential.",
        ],
      },
      seoLink: "/credit-card/american-express-gold-card",
      voucherEligibility:
        "Redeem points for brand vouchers like Amazon, Taj, Myntra, and Shoppers Stop under 18K and 24K Gold Collections.",
      exclusivelyOnPb: false,
      voucherValue: "Up to ₹14,000 worth brand vouchers on redemption",
      maximumBenifits: 24000,
      effectiveFree: 0,
      cardNetwork: "American Express",
    },

    preApproved: false,

    rewardJson: {
      "Reward Multiplier": {
        rewardsPercent: "5X",
      },
      "General Spends": {
        rewardsPercent: "1 Point per ₹50",
      },
      "Utility Payments": {
        rewardsPercent: "1 Point per ₹50 (up to 10,000 Points/month)",
      },
    },

    priority: 10,
    pcoPriority: 1,
    slug: "american-express-gold-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    cardDisplay: 1,
    createdAt: "2025-11-01T10:45:00+05:30",
    updatedAt: "2025-11-01T10:45:00+05:30",
    sortOrder: "100",
    isCrossSell: false,
  },

  {
    id: 2156,
    value: "Swiggy HDFC Bank Credit Card",
    program: "HDFC Bank",
    token: "swiggy-hdfc-bank-credit-card",
    guid: "b7e9f4d3-6c8a-4f2e-8b5d-9a3c2d6e7f8a",
    partnerId: 18,
    pbcoOfferId: "HDFC_SWIGGY_2025",
    beaconUserIdentifier: "hdfc_swiggy_user_tracker",
    name: "Swiggy HDFC Bank Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2023/07/Swiggy-HDFC-Bank-Credit-Card.png",
    applyLink:
      "https://www.paisabazaar.com/credit-card/hdfc-bank-credit-card/swiggy-hdfc-bank-credit-card/",
    features: {
      creditCardSpecialOfferDetails:
        "10% cashback on Swiggy platforms (max Rs. 1,500/month). 5% cashback on online spends (max Rs. 1,500/month). Complimentary 3-month Swiggy One membership on activation.",
      creditCardTermCondition:
        "Monthly cashback capping: Rs. 1,500 on Swiggy, Rs. 1,500 on online spends, Rs. 500 on other spends. Annual fee waiver on Rs. 2 Lakh annual spends. Exclusions apply for Swiggy Money Wallet, Minis, and Liquor. Minimum transaction Rs. 100 for cashback.",
      creditCardOneLinerDescription:
        "Dining, Cashback, Shopping, Brand Voucher, Utilities, Bill Payments, Movies",
      cardType: "Cashback",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: false,
      bestFeature: [
        "10% cashback on all Swiggy platforms",
        "5% cashback on online shopping",
        "Complimentary 3-month Swiggy One membership",
        "Low annual fee of Rs. 500",
        "Fee waiver on Rs. 2 Lakh annual spends",
      ],
      saveOnFeeToolTip:
        "Annual fee waived on spending Rs. 2 Lakh in a year - easily achievable with regular Swiggy and online shopping",
      bestSuitedFor: {
        "Frequent Swiggy Users": [
          "Food delivery enthusiasts",
          "Instamart shoppers",
          "Dineout users",
          "Genie service users",
        ],
        "Online Shoppers": [
          "E-commerce buyers",
          "Digital payment users",
          "Subscription service users",
        ],
        "Budget-Conscious Consumers": [
          "Entry-level card seekers",
          "Direct cashback preferrers",
          "Low-fee card users",
        ],
      },
      cardBenefits: [
        "10% cashback on Swiggy food delivery, Instamart, Dineout, and Genie (max Rs. 1,500/month)",
        "5% cashback on online spends across eligible categories (max Rs. 1,500/month)",
        "1% cashback on all other spends including offline (max Rs. 500/month)",
        "Complimentary 3-month Swiggy One membership on card activation",
        "6% discount on flight and bus bookings via Paytm Travel",
        "4 complimentary golf rounds and 12 free golf lessons (Mastercard variant)",
        "50% off on green fees beyond complimentary sessions",
        "Zero lost card liability on immediate reporting",
        "Annual fee waiver on Rs. 2 Lakh yearly spends",
        "Low entry barrier - minimum income Rs. 15,000/month",
      ],
      moreInfo: {
        "Cashback Structure": [
          "Maximum monthly cashback: Rs. 3,500 across all categories",
          "Maximum yearly cashback potential: Rs. 42,000",
          "Cashback credited as statement credit",
          "Minimum transaction value: Rs. 100 for cashback eligibility",
        ],
        "Eligible Online Categories (5% cashback)": [
          "Apparel and footwear",
          "Department stores",
          "Entertainment",
          "Electronics and appliances",
          "Home décor",
          "Online marketplaces",
        ],
        Exclusions: [
          "Fuel transactions",
          "Rent payments",
          "EMI transactions",
          "Jewellery purchases",
          "Wallet loads",
          "Government-related transactions",
          "Swiggy Money wallet, Swiggy Minis, Swiggy Liquor",
        ],
        Eligibility: [
          "Age: 21 to 60 years",
          "Salaried: Minimum income Rs. 15,000/month",
          "Self-employed: ITR above Rs. 6 LPA",
        ],
      },
      creditCardJoiningFeeAmount: "₹500",
      creditCardJoiningFeeAdditionalText: "+ Applicable Taxes",
      creditCardJoiningFeeDescription: "Complimentary 3-month Swiggy One membership on activation",
      creditCardAnnualFeeAmount: "₹500",
      creditCardAnnualFeeAdditionalText: "+ Applicable Taxes",
      creditCardAnnualFeeDescription: "Waived on annual spends of Rs. 2 Lakh",
      cardOrientation: "horizontal",
      cardCategory: {
        primary: "Dining",
        secondary: "Cashback",
        tertiary: "Shopping",
      },
      cardCategoryDescription: {
        Dining: [
          "10% cashback on Swiggy food delivery",
          "10% cashback on Swiggy Dineout",
          "3-month complimentary Swiggy One membership",
        ],
        Cashback: [
          "Up to Rs. 42,000 yearly cashback potential",
          "Direct cashback as statement credit",
          "No reward point conversion hassles",
          "Transparent cashback structure",
        ],
        Shopping: [
          "5% cashback on online shopping",
          "10% cashback on Swiggy Instamart",
          "1% cashback on all other spends",
          "Wide range of eligible merchants",
        ],
      },
      seoLink:
        "https://www.paisabazaar.com/credit-card/hdfc-bank-credit-card/swiggy-hdfc-bank-credit-card/",
      voucherEligibility: "eligible",
      nameOnCard: {
        singleLine: true,
        position: { x: 30, y: 175 },
        color: "#FFFFFF",
      },
      exclusivelyOnPb: false,
      trendingOffers: [
        {
          brandId: 201,
          brandName: "Swiggy",
          brandColour: "#FC8019",
          shortDescription: "10% Cashback",
          detailedDescription:
            "Earn 10% cashback on all Swiggy platforms including food delivery, Instamart, Dineout, and Genie services. Maximum cashback of Rs. 1,500 per month.",
        },
        {
          brandId: 202,
          brandName: "Online Shopping",
          brandColour: "#4A90E2",
          shortDescription: "5% Cashback",
          detailedDescription:
            "Get 5% cashback on online spends across apparel, electronics, entertainment, home décor and more. Maximum cashback of Rs. 1,500 per month.",
        },
        {
          brandId: 203,
          brandName: "Paytm Travel",
          brandColour: "#00BAF2",
          shortDescription: "6% Discount",
          detailedDescription:
            "Save 6% on domestic and international flight bookings and intercity bus bookings through Paytm Travel platform.",
        },
      ],
      voucherValue: "0",
      maximumBenifits: 10,
      effectiveFree: 2,
      cardNetwork: "Mastercard",
    },
    preApproved: false,
    rewardJson: {
      Dining: {
        rewardsPercent: "10",
        spendBased: {
          swiggy_cashback: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 10,
                maxValue: 1500,
              },
            ],
            rewardDesc: "10% cashback on Swiggy food delivery and Dineout (max Rs. 1,500/month)",
            subCategory: "Swiggy Food & Dineout",
          },
        },
      },
      Shopping: {
        rewardsPercent: "5",
        spendBased: {
          online_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1500,
              },
            ],
            rewardDesc: "5% cashback on eligible online shopping categories (max Rs. 1,500/month)",
            subCategory: "Online Shopping",
          },
          instamart_cashback: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 10,
                maxValue: 1500,
              },
            ],
            rewardDesc: "10% cashback on Swiggy Instamart grocery shopping (max Rs. 1,500/month)",
            subCategory: "Swiggy Instamart",
          },
          other_spends: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 1,
                maxValue: 500,
              },
            ],
            rewardDesc: "1% cashback on all other spends (max Rs. 500/month)",
            subCategory: "Other Spends",
          },
        },
      },
      CashBack: {
        rewardsPercent: "10",
        spendBased: {
          swiggy_platforms: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 10,
                maxValue: 1500,
              },
            ],
            rewardDesc: "10% cashback across all Swiggy platforms (max Rs. 1,500/month)",
            subCategory: "Swiggy Ecosystem",
          },
          online_categories: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1500,
              },
            ],
            rewardDesc: "5% cashback on online shopping (max Rs. 1,500/month)",
            subCategory: "Online Spends",
          },
          base_cashback: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 1,
                maxValue: 500,
              },
            ],
            rewardDesc: "1% cashback on all other transactions (max Rs. 500/month)",
            subCategory: "Base Rate",
          },
        },
      },
      "Brand Voucher": {
        rewardsPercent: "5",
        spendBased: {
          voucher_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1500,
              },
            ],
            rewardDesc: "5% cashback on eligible brand voucher purchases online",
            subCategory: "Brand Vouchers",
          },
        },
      },
      Utilities: {
        rewardsPercent: "1",
        spendBased: {
          utility_cashback: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 1,
                maxValue: 500,
              },
            ],
            rewardDesc: "1% cashback on utility bill payments (max Rs. 500/month)",
            subCategory: "Utilities",
          },
        },
      },
      "Bill Payments": {
        rewardsPercent: "1",
        spendBased: {
          bill_cashback: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 1,
                maxValue: 500,
              },
            ],
            rewardDesc: "1% cashback on bill payments (max Rs. 500/month)",
            subCategory: "Bill Payments",
          },
        },
      },
      Movies: {
        rewardsPercent: "5",
        spendBased: {
          entertainment_cashback: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 5,
                maxValue: 1500,
              },
            ],
            rewardDesc: "5% cashback on movie ticket bookings online (max Rs. 1,500/month)",
            subCategory: "Entertainment",
          },
        },
      },
      Travel: {
        rewardsPercent: "6",
        spendBased: {
          paytm_travel: {
            baseValue: "6",
            rules: [
              {
                expenseBase: 100,
                operator: "discount",
                multiplicationFactor: 6,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "6% discount on flight and bus bookings via Paytm Travel",
            subCategory: "Paytm Travel",
          },
          genie_cashback: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 10,
                maxValue: 1500,
              },
            ],
            rewardDesc: "10% cashback on Swiggy Genie services (max Rs. 1,500/month)",
            subCategory: "Swiggy Genie",
          },
        },
      },
      Fuel: {
        rewardsPercent: "0",
      },
      Rewards: {
        nonSpendBased: {
          welcome_benefit: {
            baseValue: "3_months",
            rules: [
              {
                expenseBase: 0,
                operator: "on_activation",
                multiplicationFactor: 1,
                maxValue: 1,
              },
            ],
            rewardDesc: "Complimentary 3-month Swiggy One membership on card activation",
          },
          golf_rounds: {
            baseValue: 4,
            rules: [
              {
                expenseBase: 0,
                operator: "complimentary",
                multiplicationFactor: 1,
                maxValue: 4,
              },
            ],
            rewardDesc: "4 complimentary golf rounds per year (Mastercard variant)",
          },
          golf_lessons: {
            baseValue: 12,
            rules: [
              {
                expenseBase: 0,
                operator: "complimentary",
                multiplicationFactor: 1,
                maxValue: 12,
              },
            ],
            rewardDesc: "12 free golf lessons/sessions per year (Mastercard variant)",
          },
          annual_fee_waiver: {
            baseValue: 500,
            rules: [
              {
                expenseBase: 200000,
                operator: "annual_spends",
                multiplicationFactor: 1,
                maxValue: 500,
              },
            ],
            rewardDesc: "Annual fee waiver on spending Rs. 2 Lakh per year",
          },
        },
      },
    },
    priority: 5,
    pcoPriority: 5,
    slug: "swiggy-hdfc-bank-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    additionalPayload:
      '{"coBranded":true,"partner":"Swiggy","monthlyCashbackCap":3500,"annualFeewaiverSpends":200000}',
    cardDisplay: 1,
    createdAt: "2023-07-15T09:00:00Z",
    updatedAt: "2025-10-28T19:00:00Z",
    sortOrder: "5",
    isCrossSell: false,
  },

  {
    id: 1847,
    value: "HDFC Infinia Credit Card",
    program: "HDFC Bank",
    token: "hdfc-infinia-credit-card",
    guid: "a3f8d9c2-4b7e-4a1c-9d3f-8e2a1b5c6d7e",
    partnerId: 18,
    pbcoOfferId: "HDFC_INFINIA_2025",
    beaconUserIdentifier: "hdfc_infinia_user_tracker",
    name: "HDFC Infinia Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2019/10/HDFC-Infinia-Credit-Card.png",
    applyLink:
      "https://www.paisabazaar.com/credit-card/hdfc-bank-credit-card/hdfc-infinia-credit-card/",
    features: {
      creditCardSpecialOfferDetails:
        "12,500 bonus reward points on joining and renewal. Up to 10X rewards on SmartBuy. 1:1 redemption on travel, air miles, Apple and Tanishq.",
      creditCardTermCondition:
        "Invite-only card. Monthly capping of 2 Lakh reward points across all categories. Max 15,000 points per month on SmartBuy 10X rewards. Forex markup 2% + GST. Terms apply.",
      creditCardOneLinerDescription:
        "Travel, Rewards, Shopping, Dining, Hotels, Flights, Brand Voucher, Utilities, Bill Payments",
      cardType: "Super Premium",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: false,
      bestFeature: [
        "3.33% value-back across all categories",
        "Unlimited domestic & international lounge access",
        "1:1 redemption on flights, hotels, air miles",
        "Up to 10X rewards on SmartBuy",
        "ITC & Marriott hotel benefits",
      ],
      saveOnFeeToolTip:
        "Earn 12,500 bonus points on fee payment - effectively offsetting the annual fee when redeemed optimally",
      bestSuitedFor: {
        Travellers: ["Frequent flyers", "International travelers", "Luxury hotel guests"],
        "Premium Spenders": [
          "High-income individuals",
          "Premium lifestyle enthusiasts",
          "Existing HDFC relationship holders",
        ],
        "Reward Maximizers": [
          "SmartBuy users",
          "Points-to-miles converters",
          "Strategic redeemers",
        ],
      },
      cardBenefits: [
        "5 reward points per Rs. 150 spent across all retail categories",
        "Up to 10X rewards on SmartBuy (max 15,000 points/month)",
        "12,500 bonus reward points on joining and renewal",
        "Unlimited domestic lounge access for primary and add-on cardholders",
        "Unlimited international Priority Pass lounge access",
        "Book 3 nights, pay for 2 at ITC Hotels",
        "1+1 complimentary buffet at ITC Hotels",
        "Club Marriott membership benefits",
        "Unlimited complimentary golf games",
        "15% discount on Swiggy Dineout",
        "Dedicated concierge service",
        "2% + GST forex markup",
      ],
      moreInfo: {
        "Reward Redemption": [
          "1 RP = Rs. 1 on flights and hotels via SmartBuy",
          "1 RP = Rs. 1 on Apple products and Tanishq vouchers via SmartBuy",
          "1 RP = 1 Air Mile (transfer to partner airlines)",
          "1 RP = Rs. 0.50 for other vouchers and products",
          "1 RP = Rs. 0.30 on cashback conversion",
        ],
        "Miles Transfer Partners": [
          "Air Canada",
          "Air France",
          "British Airways",
          "Etihad Airways",
          "Air Asia",
          "Multiple other leading airlines",
        ],
        Eligibility: [
          "Invite-only card",
          "High-income individuals",
          "Long-standing HDFC Bank relationship",
          "Excellent credit history",
          "Premium credit card holders from other banks",
        ],
      },
      creditCardJoiningFeeAmount: "₹12,500",
      creditCardJoiningFeeAdditionalText: "+ Applicable Taxes",
      creditCardJoiningFeeDescription: "12,500 bonus reward points credited on fee payment",
      creditCardAnnualFeeAmount: "₹12,500",
      creditCardAnnualFeeAdditionalText: "+ Applicable Taxes",
      creditCardAnnualFeeDescription: "12,500 bonus reward points credited on renewal fee payment",
      cardOrientation: "horizontal",
      cardCategory: {
        primary: "Travel",
        secondary: "Premium",
        tertiary: "Rewards",
      },
      cardCategoryDescription: {
        Travel: [
          "Unlimited lounge access worldwide",
          "Low forex markup of 2% + GST",
          "Hotel benefits with ITC and Marriott",
          "1:1 air miles conversion",
        ],
        Premium: [
          "Invite-only super premium card",
          "Metal card edition available",
          "Dedicated concierge service",
          "Unlimited golf games",
        ],
        Rewards: [
          "3.33% value-back rate",
          "Up to 10X rewards on SmartBuy",
          "Rewards on insurance, utilities, education",
          "Premium redemption options",
        ],
      },
      seoLink:
        "https://www.paisabazaar.com/credit-card/hdfc-bank-credit-card/hdfc-infinia-credit-card/",
      voucherEligibility: "eligible",
      nameOnCard: {
        singleLine: true,
        position: { x: 30, y: 180 },
        color: "#FFFFFF",
      },
      exclusivelyOnPb: false,
      trendingOffers: [
        {
          brandId: 101,
          brandName: "SmartBuy",
          brandColour: "#004C8F",
          shortDescription: "Up to 10X Rewards",
          detailedDescription:
            "Earn up to 10X reward points on travel and shopping through HDFC SmartBuy platform. Maximum 15,000 bonus points per month.",
        },
        {
          brandId: 102,
          brandName: "ITC Hotels",
          brandColour: "#8B4513",
          shortDescription: "Book 3, Pay for 2",
          detailedDescription:
            "Book stay for 3 nights at participating ITC Hotels and pay for only 2 nights using HDFC Infinia Credit Card.",
        },
        {
          brandId: 103,
          brandName: "Air Miles",
          brandColour: "#0066CC",
          shortDescription: "1:1 Conversion",
          detailedDescription:
            "Convert reward points to air miles at 1:1 ratio with partner airlines including Etihad, Air Canada, British Airways and more.",
        },
      ],
      voucherValue: "12500",
      maximumBenifits: 33,
      effectiveFree: 0,
      cardNetwork: "Visa",
    },
    preApproved: false,
    rewardJson: {
      "Travel Bookings": {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent",
          },
          smartbuy_bonus: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 150,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 15000,
              },
            ],
            rewardDesc: "Up to 10X rewards on SmartBuy (max 15,000 points/month)",
            subCategory: "SmartBuy Travel",
          },
        },
      },
      Shopping: {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent",
          },
          smartbuy_bonus: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 150,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 15000,
              },
            ],
            rewardDesc: "Up to 10X rewards on SmartBuy shopping",
            subCategory: "SmartBuy Shopping",
          },
        },
      },
      Dining: {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent",
          },
          swiggy_dineout: {
            baseValue: "15",
            rules: [
              {
                expenseBase: 100,
                operator: "percentage",
                multiplicationFactor: 15,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "Flat 15% discount on Swiggy Dineout",
            subCategory: "Dineout",
          },
        },
      },
      Hotels: {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent",
          },
          smartbuy_hotels: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 150,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 15000,
              },
            ],
            rewardDesc: "Up to 10X rewards on hotel bookings via SmartBuy",
            subCategory: "SmartBuy Hotels",
          },
          itc_hotels: {
            baseValue: "33.33",
            rules: [
              {
                expenseBase: 3,
                operator: "nights",
                multiplicationFactor: 1,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "Book 3 nights, pay for 2 at ITC Hotels",
            subCategory: "ITC Hotels",
          },
        },
      },
      Flights: {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent",
          },
          smartbuy_flights: {
            baseValue: "10",
            rules: [
              {
                expenseBase: 150,
                operator: "multiplier",
                multiplicationFactor: 10,
                maxValue: 15000,
              },
            ],
            rewardDesc: "Up to 10X rewards on flight bookings via SmartBuy",
            subCategory: "SmartBuy Flights",
          },
        },
      },
      Utilities: {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent on utilities",
          },
        },
      },
      "Bill Payments": {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent on bill payments",
          },
        },
      },
      "Brand Voucher": {
        rewardsPercent: "3.33",
        spendBased: {
          apple_tanishq: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 1,
                operator: "redemption_ratio",
                multiplicationFactor: 1,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "1 RP = Rs. 1 for Apple and Tanishq vouchers via SmartBuy",
            subCategory: "Premium Vouchers",
          },
          other_vouchers: {
            baseValue: "0.5",
            rules: [
              {
                expenseBase: 1,
                operator: "redemption_ratio",
                multiplicationFactor: 1,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "1 RP = Rs. 0.50 for other vouchers",
            subCategory: "Regular Vouchers",
          },
        },
      },
      Rewards: {
        nonSpendBased: {
          welcome_bonus: {
            baseValue: 12500,
            rules: [
              {
                expenseBase: 0,
                operator: "on_issuance",
                multiplicationFactor: 1,
                maxValue: 12500,
              },
            ],
            rewardDesc: "12,500 bonus points on joining fee payment",
          },
          renewal_bonus: {
            baseValue: 12500,
            rules: [
              {
                expenseBase: 0,
                operator: "on_renewal",
                multiplicationFactor: 1,
                maxValue: 12500,
              },
            ],
            rewardDesc: "12,500 bonus points on annual fee payment",
          },
          lounge_access: {
            baseValue: "unlimited",
            rules: [
              {
                expenseBase: 0,
                operator: "visits",
                multiplicationFactor: 0,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "Unlimited domestic and international lounge access",
          },
        },
      },
      Fuel: {
        rewardsPercent: "0",
      },
      Movies: {
        rewardsPercent: "3.33",
        spendBased: {
          base_rewards: {
            baseValue: "0.033",
            rules: [
              {
                expenseBase: 150,
                operator: "per",
                multiplicationFactor: 5,
                maxValue: "unlimited",
              },
            ],
            rewardDesc: "5 reward points per Rs. 150 spent, redeemable for BookMyShow vouchers",
          },
        },
      },
    },
    priority: 1,
    pcoPriority: 1,
    slug: "hdfc-infinia-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    additionalPayload: '{"inviteOnly":true,"metalCard":true,"monthlyPointsCap":200000}',
    cardDisplay: 1,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2025-09-22T10:55:00Z",
    sortOrder: "1",
    isCrossSell: false,
  },
  {
    value: "flipkart-sbi-credit-card",
    program: "SBI Cards",
    token: "FLIPKART_SBI_CARD_001",
    guid: "FLIPKART_SBI_CARD_001",
    partnerId: 104,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Flipkart SBI Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Flipkart-SBI-Card-Images.png.webp",
    features: {
      creditCardSpecialOfferDetails:
        "Cashback across Flipkart ecosystem brands with base cashback on all other spends",
      creditCardTermCondition:
        "Annual fee waiver on ₹3.5 Lakh yearly spend; network: Mastercard/Visa",
      creditCardOneLinerDescription:
        "5% cashback on Flipkart & Cleartrip, 7.5% on Myntra, 4% on Zomato PVR Uber Netmeds, 1% base cashback on all other spends",
      cardType: "Cashback & Shopping Rewards",
      categories: ["Shopping", "Cashback", "Dining", "Travel", "Entertainment", "Rewards"],
      isRupay: false,
      exclusivelyOnPb: false,
      creditCardJoiningFeeAmount: "₹500",
      creditCardAnnualFeeAmount: "₹500",
      creditCardAnnualFeeAdditionalText: "Annual fee waived on spending ₹3.5 Lakh in a year",
      cardNetwork: "Mastercard / Visa",
      seoLink: "/credit-card/sbi/flipkart-sbi-card",
      voucherEligibility: "Flipkart e-gift voucher ₹500 + Cleartrip coupon ₹500 on activation",
      voucherValue: "₹1,000",
      maximumBenifits: 48000,
      effectiveFree: 350000,
      moreInfo: {
        WelcomeBenefits: [
          "Flipkart gift card worth ₹250 after payment of joining fee",
          "₹500 Flipkart e-gift card + ₹500 Cleartrip flight coupon on first Flipkart transaction within 30 days",
        ],
        TravelBenefits: ["5% cashback on Cleartrip flights & hotels"],
        EntertainmentBenefits: ["4% cashback on PVR movie spends"],
        AnnualFeeWaiver: ["Spend ₹3.5 Lakh in a year to get annual fee reversal"],
      },
      trendingOffers: [
        {
          brandId: 101,
          brandName: "EazyDiner",
          brandColour: "#E85C0D",
          shortDescription: "Get extra 25% off up to ₹1,000 on dining via PayEazy.",
          detailedDescription:
            "Use PayEazy to pay dining bills at partner restaurants and get an additional 25% discount, up to ₹1,000 per transaction.",
        },
        {
          brandId: 102,
          brandName: "BookMyShow",
          brandColour: "#E32E32",
          shortDescription: "Get 2 complimentary movie tickets every month.",
          detailedDescription:
            "Enjoy up to ₹200 off per ticket, maximum of 2 tickets per month on BookMyShow using this credit card.",
        },
      ],
    },
    preApproved: false,
    rewardJson: {
      "Online Shopping": {
        rewardsPercent: "5%",
        spendBased: {
          cashback: {
            baseValue: 5,
            rules: [
              {
                expenseBase: 1,
                operator: "x",
                multiplicationFactor: 0.05,
                maxValue: 4000,
              },
            ],
            rewardDesc: "5% cashback on Flipkart & Cleartrip spends (up to ₹4,000/quarter)",
            subCategory: "Flipkart, Cleartrip",
          },
        },
      },
      Fashion: {
        rewardsPercent: "7.5%",
        spendBased: {
          cashback: {
            baseValue: 7.5,
            rules: [
              {
                expenseBase: 1,
                operator: "x",
                multiplicationFactor: 0.075,
                maxValue: 4000,
              },
            ],
            rewardDesc: "7.5% cashback on Myntra (up to ₹4,000/quarter)",
            subCategory: "Myntra",
          },
        },
      },
      Lifestyle: {
        rewardsPercent: "4%",
        spendBased: {
          cashback: {
            baseValue: 4,
            rules: [
              {
                expenseBase: 1,
                operator: "x",
                multiplicationFactor: 0.04,
                maxValue: 4000,
              },
            ],
            rewardDesc: "4% cashback on Netmeds, PVR, Uber & Zomato (up to ₹4,000/quarter)",
            subCategory: "Netmeds, PVR, Uber, Zomato",
          },
        },
      },
      "Other Spends": {
        rewardsPercent: "1%",
        spendBased: {
          cashback: {
            baseValue: 1,
            rules: [
              {
                expenseBase: 1,
                operator: "x",
                multiplicationFactor: 0.01,
              },
            ],
            rewardDesc: "1% unlimited cashback on all other eligible spends",
            subCategory: "General",
          },
        },
      },
      Fuel: {
        rewardsPercent: "1%",
        nonSpendBased: {
          waiver: {
            baseValue: 400,
            rules: [
              {
                expenseBase: 500,
                operator: "<=",
                multiplicationFactor: 1,
                maxValue: 4000,
              },
            ],
            rewardDesc:
              "1% fuel surcharge waiver on fuel transactions between ₹500–₹4,000 (max ₹400/month)",
          },
        },
      },
    },
    additionalPayload:
      '{"feesAndCharges":{"financeCharges":"3.75% per month (45% p.a.)","forexMarkupFee":"3.5%","latePaymentCharges":{"Up to ₹500":"Nil","₹501 – ₹1,000":"₹400","₹1,001 – ₹10,000":"₹750","₹10,001 – ₹25,000":"₹950","₹25,001 – ₹50,000":"₹1,100","Above ₹50,000":"₹1,300"}}}',
    priority: 4,
    cardDisplay: 1,
    createdAt: "2025-10-31T12:30:00Z",
    updatedAt: "2025-10-31T12:30:00Z",
    sortOrder: "15",
    isActive: 1,
    slug: "flipkart-sbi-card",
    createdBy: "Niranjan Jadhav",
    updatedBy: "Niranjan Jadhav",
    id: 1,
  },
  {
    value: "sbi-card-elite",
    program: "SBI Cards",
    token: "SBI_CARD_ELITE_010",
    guid: "SBI_CARD_ELITE_010",
    partnerId: 104,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "SBI Card ELITE",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/12/SBI-Elite-Credit-Card-new-1.png.webp",
    features: {
      creditCardSpecialOfferDetails:
        "Premium lifestyle benefits with complimentary movies, lounge, and milestone rewards",
      creditCardTermCondition:
        "Joining/Annual fee ₹4,999 + taxes; low 1.99% forex markup; lounge access per T&C",
      creditCardOneLinerDescription:
        "Premium lifestyle card with movie tickets, milestone points, and lounge access",
      cardType: "Premium Lifestyle & Rewards",
      isRupay: false,
      creditCardJoiningFeeAmount: "₹4,999 + taxes",
      creditCardAnnualFeeAmount: "₹4,999 + taxes",
      cardNetwork: "Visa / Mastercard",
      bestFeature: [
        "Complimentary movie tickets",
        "Milestone bonus reward points",
        "Domestic and international lounge access",
      ],
    },
    preApproved: false,
    rewardJson: {},
    id: 2,
  },
  {
    value: "adani-one-icici-platinum-credit-card",
    program: "ICICI Bank",
    token: "ADANI_ONE_ICICI_PLATINUM_CARD_002",
    guid: "ADANI_ONE_ICICI_PLATINUM_CARD_002",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Adani One ICICI Platinum Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/adani-one-icici-platinum-credit-card.png.webp",
    applyLink:
      "https://www.icicibank.com/Personal-Banking/cards/Consumer-Cards/Credit-Card/adani-one-icici-credit-card.page",
    features: {
      seoLink: "https://www.paisabazaar.com/icici-bank/adani-one-icici-platinum-credit-card/",
      creditCardSpecialOfferDetails:
        "3% Adani Reward Points on Adani ecosystem spends (airports, Adani One, Trainman, Gas, Electricity, etc.), 1.5% on international spends, 1% on domestic spends (excluding fuel, rent & EMI), and 0.5% on utility and insurance. Earn hotel voucher worth ₹1,000 on activation and flight voucher worth ₹2,000 on ₹10,000 spend in 60 days. Also enjoy 2 complimentary domestic lounge accesses per quarter and 2 premium lounge upgrades every quarter.",
      creditCardTermCondition:
        "Joining Fee ₹750 + taxes; Annual Fee ₹750 + taxes (waived on ₹3L annual spend); Finance charges 3.75% p.m. (45% p.a.); Late payment up to ₹1,300; 3.5% forex markup; fuel, rent, EMI excluded from rewards.",
      creditCardOneLinerDescription:
        "Shopping, Travel, Movies, Lounge Access, Rewards, Adani Ecosystem",
      cardType: "Co-branded Travel & Shopping Rewards",
      isRupay: false,
      exclusivelyOnPb: false,
      voucherEligibility:
        "Hotel voucher ₹1,000 on activation, Flight voucher ₹2,000 on ₹10,000 spend in 60 days, Annual fee waiver on ₹3L annual spend",
      bestFeature: [
        "3% Adani Reward Points on Adani ecosystem spends",
        "1.5% on international spends and 1% on other spends",
        "Hotel voucher ₹1,000 on activation",
        "Flight voucher ₹2,000 on ₹10,000 spend within 60 days",
        "2 complimentary domestic lounge access per quarter",
        "2 premium lounge upgrades & 2 valet parkings per year",
      ],
      bestSuitedFor: {
        Shopping: ["Adani ecosystem spends", "Online shopping", "Retail purchases"],
        Travel: ["Domestic lounge access", "Flight and hotel redemptions"],
        Movies: ["25% off on BookMyShow tickets"],
      },
      cardBenefits: [
        "Earn 3% Adani Reward Points on spends across Adani ecosystem",
        "1.5% Adani Reward Points on international spends",
        "1% on other domestic spends excluding fuel, rent & EMI",
        "0.5% on utility and insurance spends",
        "Redeem points for travel, hotels, parking, cab, and more via Adani One portal",
        "Hotel voucher worth ₹1,000 on activation",
        "Flight voucher worth ₹2,000 on ₹10,000 spend within 60 days",
        "2 complimentary domestic lounges per quarter",
        "2 premium lounge upgrades every quarter",
        "2 valet parking & 2 premium car parking services annually",
      ],
      creditCardJoiningFeeAmount: "₹750",
      creditCardAnnualFeeAmount: "₹750",
      creditCardAnnualFeeAdditionalText: "Plus applicable taxes; waived on ₹3L annual spend",
      cardCategory: {
        Shopping: "Shopping",
        Travel: "Travel",
        Movies: "Movies",
        LoungeAccess: "Lounge Access",
        Rewards: "Rewards",
      },
      cardNetwork: "Visa",
      trendingOffers: [
        {
          brandId: 1,
          brandName: "Adani One",
          brandColour: "#002D62",
          shortDescription: "Earn 3% Adani Reward Points on Adani ecosystem",
          detailedDescription:
            "Get 3% value back as Adani Reward Points on Adani ecosystem spends — including airports, Trainman, Adani Gas, Electricity, and Adani One services.",
        },
        {
          brandId: 2,
          brandName: "BookMyShow",
          brandColour: "#E50914",
          shortDescription: "Get 25% off on movie tickets",
          detailedDescription:
            "Enjoy 25% instant discount on movie ticket bookings via BookMyShow with your Adani One ICICI Platinum Credit Card.",
        },
      ],
      voucherValue: "₹3,000 (Hotel + Flight Vouchers)",
    },
    preApproved: false,
    rewardJson: {
      shopping: {
        rewardsPercent: "3%",
        spendBased: {
          adaniEcosystem: {
            baseValue: 3,
            rules: [
              {
                expenseBase: 150,
                operator: "=",
                multiplicationFactor: 3,
              },
            ],
            rewardDesc: "3% Adani Reward Points on Adani ecosystem spends",
            subCategory: "Shopping",
          },
        },
      },
      travel: {
        rewardsPercent: "1.5%",
        spendBased: {
          international: {
            baseValue: 1.5,
            rules: [
              {
                expenseBase: 150,
                operator: "=",
                multiplicationFactor: 1.5,
              },
            ],
            rewardDesc: "1.5% Adani Reward Points on international spends",
            subCategory: "Travel",
          },
        },
      },
      movies: {
        nonSpendBased: {
          bmsOffer: {
            baseValue: "25%",
            rules: [
              {
                expenseBase: 1,
                operator: "=",
                multiplicationFactor: 0.25,
              },
            ],
            rewardDesc: "25% off on BookMyShow movie tickets",
            subCategory: "Movies",
          },
        },
      },
    },
    priority: 3,
    pcoPriority: 3,
    slug: "adani-one-icici-platinum-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    additionalPayload: "",
    cardDisplay: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    sortOrder: "3",
    isCrossSell: false,
    id: 3,
  },
  {
    value: "icici-bank-sapphiro-credit-card",
    program: "ICICI Bank",
    token: "ICICI_BANK_SAPPHIRO_CARD_003",
    guid: "ICICI_BANK_SAPPHIRO_CARD_003",
    partnerId: 103,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "ICICI Bank Sapphiro Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Sapphiro-Credit-Card.png.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/sapphiro-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "Welcome vouchers worth Rs. 9,000, Buy 1 Get 1 movie offer, 16 domestic & 2 international lounge visits, milestone reward points, golf & dining benefits",
      creditCardTermCondition:
        "Joining fee Rs. 6,500 + taxes, Annual fee Rs. 3,500 + taxes (waived on Rs. 6 lakh annual spend); Finance charges 3.75% p.m.; Late payment charges as per slab",
      creditCardOneLinerDescription:
        "Travel, Shopping, Movies, Dining, Golf, Rewards, Lounge Access",
      cardType: "Premium Lifestyle & Rewards",
      isRupay: false,
      bestFeature: [
        "Welcome vouchers worth Rs. 9,000",
        "Up to 16 domestic lounge visits per year",
        "2 international lounge visits per year",
        "Buy 1 Get 1 movie tickets twice per month",
        "Milestone reward points on annual spends",
        "Golf and dining benefits",
      ],
      bestSuitedFor: {
        Lifestyle: ["Dining", "Movies", "Shopping", "Golf"],
        Travel: ["Domestic & International Lounge Access", "Travel vouchers"],
        Rewards: ["Milestone reward points", "Accelerated international spends"],
      },
      cardBenefits: [
        "4 reward points per Rs. 100 on international spends",
        "2 reward points per Rs. 100 on domestic spends",
        "1 reward point per Rs. 100 on utility & insurance",
        "Welcome vouchers from Uber, EaseMyTrip, Tata CLiQ & Croma",
        "Buy 1 Get 1 movie offer on BookMyShow",
        "Up to 16 domestic lounge visits per year",
        "2 international lounge visits per year",
        "Milestone bonus points on spending Rs. 4 lakh+ annually",
        "Golf & dining privileges",
      ],
      creditCardJoiningFeeAmount: "Rs. 6,500",
      creditCardAnnualFeeAmount: "Rs. 3,500",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 6 lakh/year",
      cardCategory: {
        Travel: "Travel",
        Shopping: "Shopping",
        Movies: "Movies",
        Rewards: "Rewards",
        Dining: "Dining",
        Experience: "Golf & Lifestyle",
      },
      cardNetwork: "Mastercard & American Express",
    },
    preApproved: false,
    rewardJson: {
      InternationalSpends: {
        rewardsPercent: "4",
      },
      DomesticSpends: {
        rewardsPercent: "2",
      },
      UtilityInsurance: {
        rewardsPercent: "1",
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 4,
  },
  {
    value: "times-black-icici-bank-credit-card",
    program: "ICICI Bank",
    token: "TIMES_BLACK_ICICI_BANK_CARD_004",
    guid: "TIMES_BLACK_ICICI_BANK_CARD_004",
    partnerId: 103,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Times Black ICICI Bank Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2017/10/times-black.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/times-black-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "Welcome benefits worth Rs. 24,000 including EaseMyTrip, Atlys, Toni&Guy, and Interflora vouchers, Zomato Gold membership, and Quorum Club access. Earn up to 2.5% reward points on spends and enjoy unlimited domestic and international lounge access.",
      creditCardTermCondition:
        "Joining and Annual Fee: Rs. 20,000 + taxes; Finance Charges: 3.67% per month (44% p.a.); Forex Mark-up Fee: 1.49%; No cash withdrawal fee; Late payment fees applicable as per outstanding slabs.",
      creditCardOneLinerDescription:
        "Travel, Premium, Shopping, Rewards, Lounge Access, Dining, Lifestyle",
      cardType: "Super Premium Travel & Lifestyle",
      isRupay: false,
      bestFeature: [
        "Unlimited international & domestic lounge access",
        "Up to 2.5% reward points on card spends",
        "Low 1.49% forex mark-up fee",
        "Welcome benefits worth Rs. 24,000",
        "Up to Rs. 70,000 milestone rewards annually",
        "Luxury concierge and lifestyle privileges",
      ],
      bestSuitedFor: {
        Travel: [
          "Unlimited lounge access",
          "Low forex fee",
          "Luxury travel vouchers via EaseMyTrip",
        ],
        Lifestyle: [
          "CribLife lifestyle management",
          "Toni&Guy and Interflora vouchers",
          "Zomato Gold membership",
        ],
        Rewards: [
          "2% on domestic spends",
          "2.5% on international spends",
          "6X–12X on iShop bookings",
        ],
      },
      cardBenefits: [
        "2% reward points on all domestic spends",
        "2.5% reward points on international spends (net 1% after forex fee)",
        "Up to 6X rewards on flights & vouchers, 12X on hotels via iShop",
        "Unlimited complimentary airport lounge access (domestic & international)",
        "EaseMyTrip luxury stay voucher worth Rs. 10,000",
        "Visa travel benefits worth Rs. 10,000",
        "Toni&Guy & Interflora vouchers worth Rs. 4,000",
        "Zomato Gold membership",
        "Access to The Quorum Club",
        "Milestone benefit worth up to Rs. 70,000 annually",
      ],
      creditCardJoiningFeeAmount: "Rs. 20,000",
      creditCardAnnualFeeAmount: "Rs. 20,000",
      creditCardAnnualFeeAdditionalText: "Spend-based waiver and milestone rewards available",
      cardCategory: {
        Travel: "Travel",
        Premium: "Premium",
        Shopping: "Shopping",
        Rewards: "Rewards",
        Dining: "Dining",
        Experience: "Lifestyle & Concierge",
      },
      cardNetwork: "Mastercard / Visa",
    },
    preApproved: false,
    rewardJson: {
      DomesticSpends: {
        rewardsPercent: "2",
      },
      InternationalSpends: {
        rewardsPercent: "2.5",
      },
      iShopFlights: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 6,
          },
        ],
      },
      iShopHotels: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 12,
          },
        ],
      },
    },
    priority: 2,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 5,
  },
  {
    value: "icici-bank-emeralde-private-metal-credit-card",
    program: "ICICI Bank",
    token: "ICICI_BANK_EMERALDE_PRIVATE_METAL_CARD_005",
    guid: "ICICI_BANK_EMERALDE_PRIVATE_METAL_CARD_005",
    partnerId: 103,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "ICICI Bank Emeralde Private Metal Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2023/10/ICICI-Bank-Emeralde-Private-Metal-Credit-Card.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/emerald-private-metal-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "3% value-back across all spending categories, unlimited domestic & international lounge access for primary and add-on members, Taj Epicure membership, EazyDiner and Golf benefits, EaseMyTrip milestone vouchers worth Rs. 6,000 annually.",
      creditCardTermCondition:
        "Joining fee Rs. 12,499 + taxes; Annual fee Rs. 12,499 + taxes (waived on Rs. 10 lakh annual spend); Finance charge 3.75% p.m.; No cash withdrawal fee; Late payment as per slab; Low forex mark-up 2%.",
      creditCardOneLinerDescription: "Travel, Premium, Lifestyle, Rewards, Golf, Dining, Movies",
      cardType: "Invite-only Super Premium Lifestyle & Rewards Card",
      isRupay: false,
      bestFeature: [
        "3% value-back on all spends",
        "Unlimited lounge access (domestic & international)",
        "Complimentary Taj Epicure membership",
        "Unlimited golf rounds or lessons",
        "Movie & dining offers with EazyDiner and BookMyShow",
        "EaseMyTrip milestone vouchers worth Rs. 6,000",
        "Travel cancellation cover worth Rs. 12,000 annually",
      ],
      bestSuitedFor: {
        Travel: ["Unlimited lounge access", "Low forex mark-up (2%)", "Trip cancellation cover"],
        Lifestyle: [
          "Taj Epicure membership",
          "Luxury concierge services",
          "EazyDiner premium dining offers",
        ],
        Rewards: ["3% value-back on all spends", "6X on flights and 12X on hotels via iShop"],
      },
      cardBenefits: [
        "3% value-back across all spend categories including insurance & utilities",
        "6X reward points on flights & vouchers via iShop",
        "12X reward points on hotel bookings via iShop",
        "Unlimited domestic & international lounge access",
        "Taj Epicure membership with luxury hotel privileges",
        "EaseMyTrip milestone vouchers worth Rs. 6,000 annually",
        "Buy 1 Get 1 free movie tickets (up to Rs. 750 off, twice/month)",
        "Unlimited golf lessons or games through Golftripz",
        "Complimentary EazyDiner Prime membership",
        "Low forex markup fee of 2%",
        "Travel insurance and trip cancellation cover up to Rs. 12,000",
      ],
      creditCardJoiningFeeAmount: "Rs. 12,499",
      creditCardAnnualFeeAmount: "Rs. 12,499",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 10 lakh annually",
      cardCategory: {
        Travel: "Travel",
        Premium: "Premium",
        Lifestyle: "Lifestyle",
        Rewards: "Rewards",
        Dining: "Dining",
        Golf: "Golf",
        Movies: "Movies",
      },
      cardNetwork: "Mastercard / Visa Infinite",
    },
    preApproved: false,
    rewardJson: {
      AllSpends: {
        rewardsPercent: "3",
      },
      iShopFlights: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 6,
          },
        ],
      },
      iShopHotels: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 12,
          },
        ],
      },
    },
    priority: 3,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 6,
  },
  {
    value: "icici-bank-emeralde-private-metal-credit-card",
    program: "ICICI Bank",
    token: "ICICI_BANK_EMERALDE_PRIVATE_METAL_CARD_006",
    guid: "ICICI_BANK_EMERALDE_PRIVATE_METAL_CARD_006",
    partnerId: 103,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "ICICI Bank Emeralde Private Metal Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2023/10/ICICI-Bank-Emeralde-Private-Metal-Credit-Card.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/emerald-private-metal-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "3% value-back across all spending categories, unlimited domestic & international lounge access for primary and add-on members, Taj Epicure membership, EazyDiner and Golf benefits, EaseMyTrip milestone vouchers worth Rs. 6,000 annually.",
      creditCardTermCondition:
        "Joining fee Rs. 12,499 + taxes; Annual fee Rs. 12,499 + taxes (waived on Rs. 10 lakh annual spend); Finance charge 3.75% p.m.; No cash withdrawal fee; Late payment as per slab; Low forex mark-up 2%.",
      creditCardOneLinerDescription: "Travel, Premium, Lifestyle, Rewards, Golf, Dining, Movies",
      cardType: "Invite-only Super Premium Lifestyle & Rewards Card",
      isRupay: false,
      bestFeature: [
        "3% value-back on all spends",
        "Unlimited lounge access (domestic & international)",
        "Complimentary Taj Epicure membership",
        "Unlimited golf rounds or lessons",
        "Movie & dining offers with EazyDiner and BookMyShow",
        "EaseMyTrip milestone vouchers worth Rs. 6,000",
        "Travel cancellation cover worth Rs. 12,000 annually",
      ],
      bestSuitedFor: {
        Travel: ["Unlimited lounge access", "Low forex mark-up (2%)", "Trip cancellation cover"],
        Lifestyle: [
          "Taj Epicure membership",
          "Luxury concierge services",
          "EazyDiner premium dining offers",
        ],
        Rewards: ["3% value-back on all spends", "6X on flights and 12X on hotels via iShop"],
      },
      cardBenefits: [
        "3% value-back across all spend categories including insurance & utilities",
        "6X reward points on flights & vouchers via iShop",
        "12X reward points on hotel bookings via iShop",
        "Unlimited domestic & international lounge access",
        "Taj Epicure membership with luxury hotel privileges",
        "EaseMyTrip milestone vouchers worth Rs. 6,000 annually",
        "Buy 1 Get 1 free movie tickets (up to Rs. 750 off, twice/month)",
        "Unlimited golf lessons or games through Golftripz",
        "Complimentary EazyDiner Prime membership",
        "Low forex markup fee of 2%",
        "Travel insurance and trip cancellation cover up to Rs. 12,000",
      ],
      creditCardJoiningFeeAmount: "Rs. 12,499",
      creditCardAnnualFeeAmount: "Rs. 12,499",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 10 lakh annually",
      cardCategory: {
        Travel: "Travel",
        Premium: "Premium",
        Lifestyle: "Lifestyle",
        Rewards: "Rewards",
        Dining: "Dining",
        Golf: "Golf",
        Movies: "Movies",
      },
      cardNetwork: "Mastercard / Visa Infinite",
    },
    preApproved: false,
    rewardJson: {
      AllSpends: {
        rewardsPercent: "3",
      },
      iShopFlights: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 6,
          },
        ],
      },
      iShopHotels: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 12,
          },
        ],
      },
    },
    priority: 3,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 7,
  },
  {
    value: "icici-bank-emeralde-private-metal-credit-card",
    program: "ICICI Bank",
    token: "ICICI_BANK_EMERALDE_PRIVATE_METAL_CARD_007",
    guid: "ICICI_BANK_EMERALDE_PRIVATE_METAL_CARD_007",
    partnerId: 103,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "ICICI Bank Emeralde Private Metal Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2023/10/ICICI-Bank-Emeralde-Private-Metal-Credit-Card.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/emerald-private-metal-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "3% value-back across all spending categories, unlimited domestic & international lounge access for primary and add-on members, Taj Epicure membership, EazyDiner and Golf benefits, EaseMyTrip milestone vouchers worth Rs. 6,000 annually.",
      creditCardTermCondition:
        "Joining fee Rs. 12,499 + taxes; Annual fee Rs. 12,499 + taxes (waived on Rs. 10 lakh annual spend); Finance charge 3.75% p.m.; No cash withdrawal fee; Late payment as per slab; Low forex mark-up 2%.",
      creditCardOneLinerDescription: "Travel, Premium, Lifestyle, Rewards, Golf, Dining, Movies",
      cardType: "Invite-only Super Premium Lifestyle & Rewards Card",
      isRupay: false,
      bestFeature: [
        "3% value-back on all spends",
        "Unlimited lounge access (domestic & international)",
        "Complimentary Taj Epicure membership",
        "Unlimited golf rounds or lessons",
        "Movie & dining offers with EazyDiner and BookMyShow",
        "EaseMyTrip milestone vouchers worth Rs. 6,000",
        "Travel cancellation cover worth Rs. 12,000 annually",
      ],
      bestSuitedFor: {
        Travel: ["Unlimited lounge access", "Low forex mark-up (2%)", "Trip cancellation cover"],
        Lifestyle: [
          "Taj Epicure membership",
          "Luxury concierge services",
          "EazyDiner premium dining offers",
        ],
        Rewards: ["3% value-back on all spends", "6X on flights and 12X on hotels via iShop"],
      },
      cardBenefits: [
        "3% value-back across all spend categories including insurance & utilities",
        "6X reward points on flights & vouchers via iShop",
        "12X reward points on hotel bookings via iShop",
        "Unlimited domestic & international lounge access",
        "Taj Epicure membership with luxury hotel privileges",
        "EaseMyTrip milestone vouchers worth Rs. 6,000 annually",
        "Buy 1 Get 1 free movie tickets (up to Rs. 750 off, twice/month)",
        "Unlimited golf lessons or games through Golftripz",
        "Complimentary EazyDiner Prime membership",
        "Low forex markup fee of 2%",
        "Travel insurance and trip cancellation cover up to Rs. 12,000",
      ],
      creditCardJoiningFeeAmount: "Rs. 12,499",
      creditCardAnnualFeeAmount: "Rs. 12,499",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 10 lakh annually",
      cardCategory: {
        Travel: "Travel",
        Premium: "Premium",
        Lifestyle: "Lifestyle",
        Rewards: "Rewards",
        Dining: "Dining",
        Golf: "Golf",
        Movies: "Movies",
      },
      cardNetwork: "Mastercard / Visa Infinite",
    },
    preApproved: false,
    rewardJson: {
      AllSpends: {
        rewardsPercent: "3",
      },
      iShopFlights: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 6,
          },
        ],
      },
      iShopHotels: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 12,
          },
        ],
      },
    },
    priority: 3,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 8,
  },
  {
    value: "indusind-bank-tiger-credit-card",
    program: "IndusInd Bank",
    token: "INDUSIND_BANK_TIGER_CARD_008",
    guid: "INDUSIND_BANK_TIGER_CARD_008",
    partnerId: 104,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "IndusInd Bank Tiger Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/IndusInd-Bank-Tiger-Credit-Card.png.webp",
    applyLink:
      "https://www.indusind.com/personal-banking/cards/credit-cards/indusind-bank-tiger-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "Lifetime free card, up to 6X rewards, low 1.5% forex markup, complimentary lounge access, golf and movie benefits",
      creditCardTermCondition:
        "Lifetime free card, up to 6X rewards, low 1.5% forex markup, complimentary lounge access, golf and movie benefits",
      creditCardOneLinerDescription: "Travel, Rewards, Movies, Lifestyle",
      cardType: "Credit Card",
      isRupay: false,
      bestFeature: [
        "2 complimentary domestic lounge visits per quarter and 2 international per year",
        "Low forex markup of 1.5% for international transactions",
        "Complimentary BookMyShow movie ticket every 6 months",
        "Complimentary golf game or lesson every quarter",
        "1% fuel surcharge waiver across all petrol pumps",
      ],
      bestSuitedFor: {
        Travel: ["2 complimentary domestic lounge visits per quarter and 2 international per year"],
        Rewards: ["Low forex markup of 1.5% for international transactions"],
        Movies: ["Complimentary BookMyShow movie ticket every 6 months"],
        Golf: ["Complimentary golf game or lesson every quarter"],
        Lifestyle: ["1% fuel surcharge waiver across all petrol pumps"],
      },
      cardBenefits: [
        "2 complimentary domestic lounge visits per quarter and 2 international per year",
        "Low forex markup of 1.5% for international transactions",
        "Complimentary BookMyShow movie ticket every 6 months",
        "Complimentary golf game or lesson every quarter",
      ],
    },
    preApproved: false,
    rewardJson: {
      AllSpends: {
        rewardsPercent: "3",
      },
      iShopFlights: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 6,
          },
        ],
      },
      iShopHotels: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "unlimited",
            rate: 12,
          },
        ],
      },
    },
    id: 9,
  },
  {
    value: "eazydiner-indusind-bank-signature-credit-card",
    program: "IndusInd Bank",
    token: "EASYDINER_INDUSIND_BANK_SIGNATURE_CARD_009",
    guid: "EASYDINER_INDUSIND_BANK_SIGNATURE_CARD_009",
    partnerId: 104,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "EazyDiner IndusInd Bank Signature Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2022/01/EazyDiner-IndusInd-Bank-Credit-Card.png.webp",
    features: {
      creditCardSpecialOfferDetails:
        "Dining rewards with complimentary lounge access and movie benefits",
      creditCardTermCondition:
        "Annual fee as per issuer; dining and lounge benefits per program terms",
      creditCardOneLinerDescription: "Dining, Rewards, Lounge Access, Movies, Fuel, Lifestyle",
      cardType: "Dining & Rewards",
      isRupay: false,
      cardNetwork: "Visa",
      trendingOffers: [
        {
          brandId: 101,
          brandName: "Myntra",
          brandColour: "#ff3f6c",
          shortDescription: "Flat 7.5% instant discount",
          detailedDescription:
            "Enjoy a 7.5% instant discount on all Myntra purchases with no minimum spend and unlimited eligible transactions.",
        },
        {
          brandId: 102,
          brandName: "Swiggy",
          brandColour: "#fc8019",
          shortDescription: "5% cashback on food orders",
          detailedDescription: "Earn 5% cashback on Swiggy and Swiggy Instamart purchases.",
        },
        {
          brandId: 103,
          brandName: "PVR",
          brandColour: "#ffd700",
          shortDescription: "Free movie tickets",
          detailedDescription:
            "Get 2 complimentary PVR movie tickets every quarter upon achieving the quarterly spend milestone.",
        },
      ],
    },
    preApproved: false,
    rewardJson: {
      Dining: {
        rewardsPercent: "10%",
        spendBased: {
          "Dining Spend": {
            baseValue: 10,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 10,
              },
            ],
            rewardDesc: "Earn 10 reward points per ₹100 spent on dining at partner restaurants.",
            subCategory: "Dining",
          },
        },
        nonSpendBased: {
          "EazyDiner Prime Membership": {
            baseValue: "₹2,495",
            rules: [],
            rewardDesc:
              "Complimentary 12-month EazyDiner Prime Membership worth ₹2,495 with 25%-50% discount at premium restaurants.",
          },
        },
      },
      Shopping: {
        rewardsPercent: "10%",
        spendBased: {
          "Shopping & Entertainment": {
            baseValue: 10,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 10,
              },
            ],
            rewardDesc: "Earn 10 reward points per ₹100 spent on shopping and entertainment.",
            subCategory: "Rewards",
          },
        },
      },
      "All Other Categories": {
        rewardsPercent: "4%",
        spendBased: {
          "General Spends": {
            baseValue: 4,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc:
              "Earn 4 reward points per ₹100 spent across all other categories except fuel.",
            subCategory: "Rewards",
          },
        },
      },
      Movies: {
        nonSpendBased: {
          "BookMyShow Offer": {
            baseValue: 400,
            rules: [
              {
                expenseBase: 200,
                operator: "*",
                multiplicationFactor: 2,
              },
            ],
            rewardDesc: "Get 2 free movie tickets per month worth ₹200 each on BookMyShow.",
          },
        },
      },
      Lounge: {
        nonSpendBased: {
          "Domestic Lounge Access": {
            baseValue: 2,
            rules: [],
            rewardDesc: "Get 2 complimentary domestic lounge visits per year.",
          },
        },
      },
      Fuel: {
        nonSpendBased: {
          "Fuel Surcharge Waiver": {
            baseValue: "1%",
            rules: [],
            rewardDesc:
              "Enjoy 1% fuel surcharge waiver on transactions between ₹500 and ₹3,000, up to ₹250 per month.",
          },
        },
      },
    },
    slug: "indusind-bank-eazydiner-signature-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    cardDisplay: 1,
    createdAt: "2025-10-31T18:45:00.000Z",
    updatedAt: "2025-10-31T18:45:00.000Z",
    sortOrder: "1",
    isCrossSell: false,
    id: 10,
  },
  {
    value: "jupiter-edge-csb-bank-rupay-credit-card",
    program: "CSB Bank",
    token: "JUPITER_EDGE_CSB_BANK_RUPAY_CARD_011",
    guid: "JUPITER_EDGE_CSB_BANK_RUPAY_CARD_011",
    partnerId: 104,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Jupiter Edge CSB Bank RuPay Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2025/05/Is-Paying-the-Minimum-Amount-Due-a-Smart-Choice-188x300.png.webp",
    features: {
      creditCardOneLinerDescription:
        "UPI enabled, Category switchable once every 3 months, Lifetime free for initial users, No joining fee, Cashback form: Jewels system (low redemption value)",
      bestFeature: [
        "UPI enabled",
        "Category switchable once every 3 months",
        "Lifetime free for initial users",
        "No joining fee",
        "Cashback form: Jewels system (low redemption value)",
      ],
      cardBenefits: [
        "UPI enabled",
        "Category switchable once every 3 months",
        "Lifetime free for initial users",
        "No joining fee",
        "Cashback form: Jewels system (low redemption value)",
      ],
      creditCardSpecialOfferDetails:
        "Lifetime free card, up to 6X rewards, low 1.5% forex markup, complimentary lounge access, golf and movie benefits",
      creditCardTermCondition:
        "Lifetime free card, up to 6X rewards, low 1.5% forex markup, complimentary lounge access, golf and movie benefits",
      cardType: "Credit Card",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: false,
      cardNetwork: "RuPay",
      cardCategory: {
        Travel: "Travel",
        Premium: "Premium",
        Lifestyle: "Lifestyle",
        Rewards: "Rewards",
        Dining: "Dining",
        Golf: "Golf",
        Movies: "Movies",
      },
      trendingOffers: [
        {
          brandId: 101,
          brandName: "EazyDiner",
          brandColour: "#E85C0D",
          shortDescription: "Get extra 25% off up to ₹1,000 on dining via PayEazy.",
          detailedDescription:
            "Use PayEazy to pay dining bills at partner restaurants and get an additional 25% discount, up to ₹1,000 per transaction.",
        },
        {
          brandId: 102,
          brandName: "BookMyShow",
          brandColour: "#E32E32",
          shortDescription: "Get 2 complimentary movie tickets every month.",
          detailedDescription:
            "Enjoy up to ₹200 off per ticket, maximum of 2 tickets per month on BookMyShow using this credit card.",
        },
      ],
    },
    preApproved: false,
    rewardJson: {},
    id: 11,
  },
  {
    value: "myntra-kotak-credit-card",
    program: "Kotak Mahindra Bank",
    token: "MYNTRA_KOTAK_CARD_016",
    guid: "MYNTRA_KOTAK_CARD_016",
    partnerId: 0,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Myntra Kotak Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/06/Myntra-Kotak-Credit-Card.jpg.webp",
    features: {
      creditCardSpecialOfferDetails:
        "Instant Myntra discount with partner cashback benefits and lounge access",
      creditCardTermCondition: "Joining/Annual fee ₹500 + taxes; fee waiver on ₹2 L annual spend",
      creditCardOneLinerDescription:
        "7.5% instant Myntra discount; 5% partner cashback; 1.25% base",
      categories: ["Shopping", "Cashback", "Lounge Access"],
      bestFeature: ["7.5% instant Myntra discount", "5% partner cashback", "1.25% base"],
      cardType: "Shopping & Cashback",
      isRupay: false,
      creditCardJoiningFeeAmount: "₹500 + Taxes",
      creditCardAnnualFeeAmount: "₹500 + Taxes",
      cardNetwork: "Visa",
      trendingOffers: [
        {
          brandId: 101,
          brandName: "Myntra",
          brandColour: "#ff3f6c",
          shortDescription: "Flat 7.5% instant discount",
          detailedDescription:
            "Enjoy a 7.5% instant discount on all Myntra purchases with no  minimum spend and unlimited eligible transactions.",
        },
        {
          brandId: 102,
          brandName: "Swiggy",
          brandColour: "#fc8019",
          shortDescription: "5% cashback on food orders",
          detailedDescription: "Earn 5% cashback on Swiggy and Swiggy Instamart  purchases.",
        },
        {
          brandId: 103,
          brandName: "PVR",
          brandColour: "#ffd700",
          shortDescription: "Free movie tickets",
          detailedDescription:
            "Get 2 complimentary PVR movie tickets every quarter upon achieving  the quarterly spend milestone.",
        },
      ],
    },
    preApproved: false,
    rewardJson: {
      Shopping: {
        rewardsPercent: "7.5%",
      },
      Cashback: {
        rewardsPercent: "5%",
      },
      Base: {
        rewardsPercent: "1.25%",
      },
    },
    isActive: 1,
    id: 12,
  },
  {
    value: "hsbc-taj-credit-card",
    program: "HSBC Bank",
    token: "HSBC_TAJ_CARD_017",
    guid: "HSBC_TAJ_CARD_017",
    partnerId: 0,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HSBC Taj Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/HSBC-Taj-Credit-Card.png.webp",
    features: {
      creditCardSpecialOfferDetails:
        "Luxury hotel privileges with Taj InnerCircle Platinum and unlimited lounge access",
      creditCardTermCondition:
        "Joining/Annual fee ₹1,10,000 + taxes; premium travel and lifestyle benefits",
      creditCardOneLinerDescription: "Luxury travel, hotel privileges, and unlimited lounge access",
      categories: ["Travel", "Hotel", "Lounge Access", "Dining", "Fuel"],
      cardType: "Super Premium Co-branded Hotel Credit Card",
      isRupay: false,
      cardNetwork: "Visa Infinite",
      voucherEligibility: "Complimentary Taj stays and Platinum NeuPass membership",
      maximumBenifits: 200000,
      voucherValue: "Free night at Taj Palace + 2 nights at participating IHCL hotels",
      trendingOffers: [
        {
          brandId: 101,
          brandName: "Taj Hotels",
          brandColour: "#B38B59",
          shortDescription: "Complimentary Taj stay & Platinum NeuPass membership",
          detailedDescription:
            "Get 1 night at Taj Palace + 2 nights at participating IHCL hotels and enjoy complimentary Platinum NeuPass membership.",
        },
        {
          brandId: 102,
          brandName: "Starbucks",
          brandColour: "#00704A",
          shortDescription: "50% off at Starbucks up to ₹150, 4 times/month",
          detailedDescription:
            "Avail 50% discount (max ₹150) on 4 Starbucks visits per month using HSBC Taj Credit Card.",
        },
      ],
    },
    preApproved: false,
    rewardJson: {
      "Hotel Spends": {
        rewardsPercent: "5%",
        spendBased: {
          "Reward Points": {
            baseValue: 5,
            rules: [
              {
                expenseBase: 100,
                operator: "=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Earn 5 reward points per ₹100 spent at Taj, Vivanta, SeleQtions, Gateway & Ginger hotels",
          },
        },
      },
      "Other Spends": {
        rewardsPercent: "1.5%",
        spendBased: {
          "Reward Points": {
            baseValue: 1.5,
            rules: [
              {
                expenseBase: 100,
                operator: "=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Earn 1.5 reward points per ₹100 spent on other categories",
          },
        },
      },
      "Lounge Access": {
        nonSpendBased: {
          "Domestic & International Lounge": {
            baseValue: "Unlimited",
            rules: [
              {
                expenseBase: 0,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Unlimited domestic & international lounge access with complimentary Taj Club and Chambers Lounge entries",
          },
        },
      },
      "Dining & Lifestyle": {
        nonSpendBased: {
          "Partner Discounts": {
            baseValue: "10%-50%",
            rules: [
              {
                expenseBase: 0,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "50% off at Starbucks (4 times/month), 25% off at Tira, 10% off at PVR, 12% off at Zomato",
          },
        },
      },
      "Travel Benefits": {
        nonSpendBased: {
          "Complimentary Nights": {
            baseValue: 3,
            rules: [
              {
                expenseBase: 0,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "1 free night at Taj Palace + 2 free nights at participating IHCL properties",
          },
        },
      },
      "Membership Benefits": {
        nonSpendBased: {
          "NeuPass Platinum": {
            baseValue: "Platinum Tier",
            rules: [
              {
                expenseBase: 0,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Complimentary Taj InnerCircle Platinum NeuPass membership with dedicated concierge and elite privileges",
          },
        },
      },
      Fuel: {
        nonSpendBased: {
          "Fuel Surcharge Waiver": {
            baseValue: "1%",
            rules: [
              {
                expenseBase: 400,
                operator: ">=",
                multiplicationFactor: 1,
                maxValue: 4000,
              },
            ],
            rewardDesc: "1% fuel surcharge waiver on transactions between ₹400–₹4,000",
          },
        },
      },
    },
    priority: 2,
    slug: "hsbc-taj-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    additionalPayload:
      "India’s first ultra-premium hotel co-branded credit card offering Taj InnerCircle Platinum, luxury privileges, concierge, and global lounge access.",
    cardDisplay: 1,
    createdAt: "2025-10-31T19:30:00.000Z",
    updatedAt: "2025-10-31T19:30:00.000Z",
    sortOrder: "2",
    isCrossSell: false,
    id: 13,
  },
  {
    value: "hsbc-travelone-credit-card",
    program: "HSBC Bank",
    token: "HSBC_TRAVELONE_018",
    guid: "HSBC_TRAVELONE_018",
    partnerId: 0,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HSBC TravelOne Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/HSBC-TravelOne-CC.png.webp",
    features: {
      creditCardSpecialOfferDetails:
        "Up to 12% travel rewards, lounge visits, welcome bonuses, and partner discounts",
      creditCardTermCondition:
        "Joining/Annual fee ₹4,999; waiver on ₹8L annual spend; 1:1 air mile conversion",
      creditCardOneLinerDescription: "High travel rewards with lounge access and milestone bonuses",
      categories: ["Travel", "Lounge Access", "Milestone Bonus", "Welcome Benefits"],
      cardType: "Travel Rewards",
      isRupay: false,
      cardNetwork: "Visa Signature",
      seoLink: "/credit-card/hsbc-travelone-credit-card/",
    },
    preApproved: false,
    rewardJson: {
      Hotels: {
        spendBased: {
          RewardPoints: {
            baseValue: 12,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc:
              "Earn 12 reward points on every ₹100 spent on hotel bookings via HSBC Rewards Marketplace",
            subCategory: "Travel",
          },
        },
      },
      Flights: {
        spendBased: {
          RewardPoints: {
            baseValue: 8,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 8,
              },
            ],
            rewardDesc:
              "Earn 8 reward points on every ₹100 spent on flight bookings via HSBC Rewards Marketplace",
            subCategory: "Travel",
          },
        },
      },
      "Car Rentals": {
        spendBased: {
          RewardPoints: {
            baseValue: 4,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc:
              "Earn 4 reward points on every ₹100 spent on car rentals via HSBC Rewards Marketplace",
          },
        },
      },
      "Travel Aggregators": {
        spendBased: {
          RewardPoints: {
            baseValue: 4,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc:
              "Earn 4 reward points on every ₹100 spent on travel aggregators like Yatra, EaseMyTrip, and Cleartrip",
          },
        },
      },
      "Foreign Currency": {
        spendBased: {
          RewardPoints: {
            baseValue: 4,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc:
              "Earn 4 reward points on every ₹100 spent in foreign currency (capped at 50,000 points/month)",
          },
        },
      },
      General: {
        spendBased: {
          RewardPoints: {
            baseValue: 2,
            rules: [
              {
                expenseBase: 100,
                operator: "/",
                multiplicationFactor: 2,
              },
            ],
            rewardDesc: "Earn 2 reward points on every ₹100 spent on all other categories",
          },
        },
      },
      "Milestone Bonus": {
        nonSpendBased: {
          RewardPoints: {
            baseValue: 10000,
            rules: [
              {
                expenseBase: 1200000,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Earn 10,000 bonus reward points on annual spending above ₹12 lakh",
          },
        },
      },
      "Welcome Benefits": {
        nonSpendBased: {
          Cashback: {
            baseValue: 1000,
            rules: [
              {
                expenseBase: 10000,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "₹1,000 cashback on spending ₹10,000 within the first 30 days",
          },
          BonusPoints: {
            baseValue: 3000,
            rules: [
              {
                expenseBase: 100000,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "3,000 bonus reward points on spending ₹1 lakh within the first 90 days",
          },
        },
      },
    },
    additionalPayload:
      '{"loungeAccess":{"domestic":6,"international":4},"golfAccess":{"rounds":4,"lessons":12},"discounts":"Up to 15% off on Yatra, EaseMyTrip, Cleartrip, and StayVista Hotels"}',
    createdAt: "2025-10-31T18:00:00.000Z",
    updatedAt: "2025-10-31T18:00:00.000Z",
    id: 14,
  },
  {
    value: "hsbc-rupay-cashback-credit-card",
    program: "HSBC Bank",
    token: "HSBC_RUPAY_CASHBACK_012",
    guid: "HSBC_RUPAY_CASHBACK_012",
    partnerId: 104,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HSBC RuPay Cashback Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/HSBC-RuPay-Cashback-Credit-Card.png.webp",
    applyLink: "https://www.hsbc.co.in/credit-cards/products/rupay-cashback-credit-card/",
    features: {
      creditCardSpecialOfferDetails:
        "Up to 10% cashback on dining, grocery & food delivery spends; 1% cashback on other eligible spends including UPI; airport lounge access; zero forex markup till Dec 2025; discount offers on Swiggy Instamart, Tira, Cleartrip & Paytm.",
      creditCardTermCondition:
        "Joining/annual fee Rs. 499 + taxes; annual fee waiver on Rs. 2 lakh yearly spend; finance charges 3.75% p.m.; late payment fees 100% of minimum due (Rs. 250 – Rs. 1,200); capped cashback earnings at Rs. 400/month.",
      creditCardOneLinerDescription:
        "Cashback, Dining, Grocery, Travel, Lifestyle, Lounge Access, UPI",
      categories: ["Cashback", "Dining", "Grocery", "Travel", "Lifestyle", "Lounge Access", "UPI"],
      cardType: "Cashback & Lifestyle",
      isRupay: true,
      bestFeature: [
        "10% cashback on dining, grocery & food delivery",
        "1% cashback on other eligible spends including UPI",
        "Complimentary airport lounge access (domestic & international)",
        "Zero forex mark-up fee till Dec 2025",
        "Discount offers on Swiggy Instamart, Tira, Cleartrip & Paytm",
        "Low annual fee with easy waiver condition",
      ],
      bestSuitedFor: {
        Cashback: ["Dining", "Grocery", "Food delivery", "UPI transactions"],
        Travel: ["Airport lounge access", "Zero forex mark-up"],
        Lifestyle: ["Discounts on popular platforms", "EazyDiner membership"],
      },
      cardBenefits: [
        "10% cashback on dining, grocery & food delivery spends",
        "1% cashback on other eligible spends including UPI payments",
        "Complimentary 2 domestic lounge visits per quarter",
        "2 international lounge visits per year",
        "Zero forex markup fee till Dec 2025",
        "Rs. 500 cashback on app login & Rs. 10,000 spend in 30 days",
        "EazyDiner membership for 2 months",
        "Discounts on Swiggy Instamart, Tira, Cleartrip, Paytm",
      ],
      creditCardJoiningFeeAmount: "Rs. 499",
      creditCardAnnualFeeAmount: "Rs. 499",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 2 lakh/year",
      cardCategory: {
        Cashback: "Cashback",
        Dining: "Dining",
        Shopping: "Shopping",
        Travel: "Travel",
        Experience: "Lifestyle",
      },
      cardNetwork: "RuPay",
    },
    preApproved: false,
    rewardJson: {
      DiningSpends: {
        rewardsPercent: "10",
      },
      GrocerySpends: {
        rewardsPercent: "10",
      },
      UPISpends: {
        rewardsPercent: "1",
      },
      OtherSpends: {
        rewardsPercent: "1",
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 15,
  },
  {
    value: "hsbc-visa-platinum-credit-card",
    program: "HSBC Bank",
    token: "HSBC_VISA_PLATINUM_013",
    guid: "HSBC_VISA_PLATINUM_013",
    partnerId: 105,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HSBC Visa Platinum Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2015/11/HSBC-Visa-Platinum-1-3.png.webp",
    applyLink: "https://www.hsbc.co.in/credit-cards/products/visa-platinum-credit-card/",
    features: {
      creditCardSpecialOfferDetails:
        "Lifetime free credit card with up to 5X rewards on annual spends above Rs. 4 lakh; welcome Amazon voucher worth Rs. 250; redeem rewards for vouchers or air miles; zero liability on lost card; emergency card replacement; fuel surcharge waiver up to Rs. 3,000 annually.",
      creditCardTermCondition:
        "No joining or annual fee; finance charges 3.3% per month (39.6% p.a.); minimum payment due 5% of total (minimum Rs. 100); capped accelerated reward points at 15,000 per anniversary year.",
      creditCardOneLinerDescription:
        "Lifetime Free, Shopping, Rewards, Travel, Fuel, Basic, Entry-Level",
      categories: ["Shopping", "Rewards", "Travel", "Fuel", "Basic", "Entry-Level"],
      cardType: "Entry-level Rewards & Lifestyle",
      isRupay: false,
      bestFeature: [
        "Lifetime free credit card with no joining or annual fee",
        "Up to 5X reward points on annual spends above Rs. 4 lakh",
        "Welcome Amazon voucher worth Rs. 250",
        "Redeem points for vouchers or convert to air miles",
        "Zero liability for lost/stolen card",
        "Emergency card replacement within 3 days",
        "Fuel surcharge waiver up to Rs. 3,000 annually",
      ],
      bestSuitedFor: {
        Shopping: ["Retail & online purchases", "Lifestyle products"],
        Rewards: ["Accelerated 5X reward points on high spends", "Air miles conversion"],
        Travel: ["Redeem points for flight miles", "International usage benefits"],
        Fuel: ["Fuel surcharge waiver across fuel stations"],
      },
      cardBenefits: [
        "2 reward points for every Rs. 150 spent",
        "5X reward points on annual spends above Rs. 4 lakh",
        "Welcome Amazon voucher worth Rs. 250 on completing Video KYC",
        "Redeem points for vouchers or air miles (2:1 ratio)",
        "Zero liability on lost or stolen card",
        "Emergency card replacement within 3 days worldwide",
        "Annual fuel savings up to Rs. 3,000",
        "Lifetime free with no joining or annual fee",
      ],
      creditCardJoiningFeeAmount: "Nil",
      creditCardAnnualFeeAmount: "Nil",
      creditCardAnnualFeeAdditionalText: "Lifetime free credit card",
      cardCategory: {
        Shopping: "Shopping",
        Rewards: "Rewards",
        Travel: "Travel",
        Fuel: "Fuel",
        Experience: "Basic Lifestyle",
      },
      cardNetwork: "Visa",
    },
    preApproved: false,
    rewardJson: {
      GeneralSpends: {
        rewardsPercent: "1.3",
      },
      HighAnnualSpends: {
        dynamicRewardsPercent: [
          {
            minExpense: 400000,
            maxExpense: "Infinity",
            rate: 5,
          },
        ],
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 16,
  },
  {
    value: "hsbc-visa-platinum-credit-card",
    program: "HSBC Bank",
    token: "HSBC_VISA_PLATINUM_ALT_014",
    guid: "HSBC_VISA_PLATINUM_ALT_014",
    partnerId: 105,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HSBC Visa Platinum Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/HSBC.png.webp",
    applyLink: "https://www.hsbc.co.in/credit-cards/products/visa-platinum-credit-card/",
    features: {
      seoLink: "https://www.paisabazaar.com/hsbc-bank/hsbc-visa-platinum-credit-card/",
      creditCardSpecialOfferDetails:
        "Lifetime free credit card with up to 5X rewards on annual spends above Rs. 4 lakh. Earn an Amazon voucher worth Rs. 250 on joining, redeem rewards for vouchers or air miles, and enjoy fuel surcharge waiver up to Rs. 3,000 annually.",
      creditCardTermCondition:
        "No joining or annual fee. Finance charges at 3.3% per month (39.6% p.a.). Minimum payment due 5% of total (min Rs. 100). Capped accelerated reward points at 15,000 per anniversary year.",
      creditCardOneLinerDescription:
        "Lifetime Free, Shopping, Rewards, Travel, Fuel, Basic, Entry-Level",
      categories: ["Shopping", "Rewards", "Travel", "Fuel", "Basic", "Entry-Level"],
      cardType: "Entry-level Rewards & Lifestyle",
      isRupay: false,
      exclusivelyOnPb: false,
      voucherEligibility: "Amazon voucher on joining via online Video KYC",
      bestFeature: [
        "Lifetime free credit card with no joining or annual fee",
        "Up to 5X reward points on annual spends above Rs. 4 lakh",
        "Welcome Amazon voucher worth Rs. 250",
        "Redeem points for vouchers or convert to air miles",
        "Zero liability for lost/stolen card",
        "Emergency card replacement within 3 days",
        "Fuel surcharge waiver up to Rs. 3,000 annually",
      ],
      bestSuitedFor: {
        Shopping: ["Retail & online purchases", "Lifestyle products"],
        Rewards: ["Accelerated 5X reward points on high spends", "Air miles conversion"],
        Travel: ["Redeem points for flight miles", "International usage benefits"],
        Fuel: ["Fuel surcharge waiver across fuel stations"],
      },
      cardBenefits: [
        "2 reward points for every Rs. 150 spent",
        "5X reward points on annual spends above Rs. 4 lakh",
        "Welcome Amazon voucher worth Rs. 250 on completing Video KYC",
        "Redeem points for vouchers or air miles (2:1 ratio)",
        "Zero liability on lost or stolen card",
        "Emergency card replacement within 3 days worldwide",
        "Annual fuel savings up to Rs. 3,000",
        "Lifetime free with no joining or annual fee",
      ],
      creditCardJoiningFeeAmount: "Nil",
      creditCardAnnualFeeAmount: "Nil",
      creditCardAnnualFeeAdditionalText: "Lifetime free credit card",
      cardCategory: {
        Shopping: "Shopping",
        Rewards: "Rewards",
        Travel: "Travel",
        Fuel: "Fuel",
        Experience: "Basic Lifestyle",
      },
      cardNetwork: "Visa",
      trendingOffers: [
        {
          brandId: 1,
          brandName: "Amazon",
          brandColour: "#FF9900",
          shortDescription: "₹250 Amazon Voucher on Joining",
          detailedDescription:
            "Receive an Amazon voucher worth ₹250 on completing your HSBC Visa Platinum application and Video KYC process.",
        },
        {
          brandId: 2,
          brandName: "HSBC Bank",
          brandColour: "#DB0011",
          shortDescription: "5X Reward Points on spends above ₹4 lakh",
          detailedDescription:
            "Earn accelerated 5X reward points on spends exceeding ₹4 lakh annually, up to 15,000 bonus points per anniversary year.",
        },
      ],
    },
    preApproved: false,
    rewardJson: {
      GeneralSpends: {
        rewardsPercent: "1.3",
      },
      HighAnnualSpends: {
        dynamicRewardsPercent: [
          {
            minExpense: 400000,
            maxExpense: "Infinity",
            rate: 5,
          },
        ],
      },
    },
    priority: 1,
    pcoPriority: 1,
    slug: "hsbc-visa-platinum-credit-card",
    isActive: 1,
    createdBy: "admin",
    updatedBy: "system",
    cardDisplay: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    sortOrder: "1",
    isCrossSell: false,
    id: 17,
  },
  {
    value: "hsbc-premier-mastercard-credit-card",
    program: "HSBC Bank",
    token: "HSBC_PREMIER_MASTERCARD_015",
    guid: "HSBC_PREMIER_MASTERCARD_015",
    partnerId: 106,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HSBC Premier MasterCard Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2017/10/HSBC-Premier3.png",
    applyLink: "https://www.hsbc.co.in/credit-cards/products/premier-credit-card/",
    features: {
      creditCardSpecialOfferDetails:
        "Complimentary Taj Experiences Gift Card worth Rs. 12,000, Taj Epicure & EazyDiner Prime memberships, unlimited domestic and international lounge access with 8 free guest visits per year, 3% reward rate across all spends, low forex mark-up of 0.99%, and 12X rewards on hotel bookings via HSBC Rewards Marketplace.",
      creditCardTermCondition:
        "Joining fee Rs. 12,000 + taxes; Renewal fee Rs. 20,000 + taxes (waived for HSBC Premier customers); Finance charges 2.99% p.m. (35.88% p.a.); Late payment fee 100% of MAD (min Rs. 250, max Rs. 1,200).",
      creditCardOneLinerDescription: "Travel, Premium, Rewards, Lounge Access, Dining, Lifestyle",
      categories: ["Travel", "Premium", "Rewards", "Lounge Access", "Dining", "Lifestyle"],
      cardType: "Premium Travel & Lifestyle Credit Card",
      isRupay: false,
      bestFeature: [
        "Unlimited complimentary domestic and international lounge access",
        "Complimentary Taj Epicure and EazyDiner Prime memberships",
        "Low forex mark-up fee of 0.99%",
        "3% reward rate across all spends",
        "Up to 12X rewards on hotel bookings and 6X on flights",
        "Welcome Taj Experiences Gift Card worth Rs. 12,000",
      ],
      bestSuitedFor: {
        Travel: [
          "Unlimited lounge access worldwide",
          "Accelerated 12X rewards on hotels and 6X on flights",
          "Low forex mark-up of 0.99%",
        ],
        Rewards: [
          "3% reward rate across all spends",
          "Convert points to Airmiles at 1:1 ratio",
          "Redeem for Apple product vouchers (1:1 ratio)",
        ],
        Dining: ["Up to 30% discount on dining via EazyDiner", "Complimentary dining memberships"],
        Experience: ["Luxury hotel and lifestyle benefits", "Global concierge support"],
      },
      cardBenefits: [
        "3 reward points per Rs. 100 spent across all categories",
        "12X reward points on hotel bookings and 6X on flights",
        "Unlimited complimentary domestic and international lounge visits",
        "8 free guest lounge visits per year",
        "Complimentary Taj Experiences Gift Card worth Rs. 12,000",
        "Complimentary Taj Epicure and EazyDiner Prime memberships",
        "Buy 1 Get 1 BookMyShow movie offer",
        "Low forex mark-up fee of 0.99%",
        "Flexible reward redemption across 20+ travel partners",
        "Points never expire and can be converted to Airmiles (1:1 ratio)",
      ],
      creditCardJoiningFeeAmount: "Rs. 12,000",
      creditCardAnnualFeeAmount: "Rs. 20,000",
      creditCardAnnualFeeAdditionalText: "Annual fee waived for HSBC Premier relationship holders",
      cardCategory: {
        Travel: "Travel",
        Rewards: "Rewards",
        Dining: "Dining",
        Experience: "Premium Lifestyle",
      },
      cardNetwork: "Mastercard",
    },
    preApproved: false,
    rewardJson: {
      GeneralSpends: {
        rewardsPercent: "3",
      },
      TravelBookings: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "Infinity",
            rate: 12,
          },
        ],
      },
      Flights: {
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: "Infinity",
            rate: 6,
          },
        ],
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 18,
  },
  {
    value: "marriott-bonvoy-hdfc-bank-credit-card",
    program: "HDFC Bank",
    token: "HDFC_MARRIOTT_BONVOY_001",
    guid: "HDFC_MARRIOTT_BONVOY_001",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Marriott Bonvoy HDFC Bank Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/09/HDFC-Bank-Marriott-Bonvoy-Credit-Card.png.webp",
    applyLink:
      "https://www.hdfcbank.com/personal/pay/cards/credit-cards/marriott-bonvoy-hdfc-credit-card",
    features: {
      seoLink: "https://www.paisabazaar.com/hdfc-bank/marriott-bonvoy-hdfc-credit-card/",
      creditCardSpecialOfferDetails:
        "1 Free Night Award (worth up to 15,000 Marriott Bonvoy Points) on joining, complimentary Silver Elite Status, 10 Elite Night Credits every year, and up to 8 Marriott Bonvoy Points per ₹150 spent on Marriott stays. Additional milestone free night awards on ₹6L, ₹9L, and ₹15L annual spends.",
      creditCardTermCondition:
        "Joining Fee ₹3,000 + taxes; Annual Fee ₹3,000 + taxes; Finance charges 3.75% p.m. (45% p.a.); Late payment up to ₹1,300; 2.5% cash advance charge (min ₹500); Fuel transactions not eligible for rewards.",
      creditCardOneLinerDescription: "Travel, Lounge Access, Hotel Stays, Rewards, Dining, Luxury",
      categories: ["Travel", "Lounge Access", "Hotel Stays", "Rewards", "Dining", "Luxury"],
      cardType: "Travel & Hotel Rewards",
      isRupay: false,
      exclusivelyOnPb: false,
      voucherEligibility: "Free Night Awards on joining and milestone spends up to ₹15L per year",
      bestFeature: [
        "Up to 8 Marriott Bonvoy Points per ₹150 on Marriott stays",
        "Complimentary Silver Elite Status under Marriott Bonvoy Program",
        "10 Elite Night Credits every year",
        "1 Free Night Award on joining (worth 15,000 points)",
        "Free Night Awards on ₹6L, ₹9L & ₹15L annual spends",
        "24 complimentary airport lounge visits (12 domestic + 12 international)",
      ],
      bestSuitedFor: {
        Travel: ["Luxury Hotel Stays", "Airport Lounge Access", "International Travel"],
        Rewards: ["Marriott Bonvoy Points", "Milestone Free Night Awards", "Elite Night Credits"],
        Lifestyle: ["Dining", "Luxury Stays", "Exclusive Member Privileges"],
      },
      cardBenefits: [
        "Earn 8 Marriott Bonvoy Points per ₹150 spent at Marriott properties",
        "4 Marriott Bonvoy Points per ₹150 on travel, dining & entertainment",
        "2 Marriott Bonvoy Points per ₹150 on all other spends",
        "1 Free Night Award worth 15,000 points on joining or renewal",
        "Complimentary Marriott Bonvoy Silver Elite Status",
        "10 Elite Night Credits annually for room upgrades and faster status",
        "24 complimentary lounge visits (12 India + 12 International)",
        "Free Night Awards on ₹6L, ₹9L, and ₹15L annual spends",
        "Milestone and welcome awards redeemable for hotel stays",
        "Reward points redeemable across 8,000+ Marriott Bonvoy hotels worldwide",
      ],
      creditCardJoiningFeeAmount: "₹3,000",
      creditCardAnnualFeeAmount: "₹3,000",
      creditCardAnnualFeeAdditionalText: "Plus applicable taxes",
      cardCategory: {
        Travel: "Travel",
        Hotels: "Hotels",
        LoungeAccess: "Lounge Access",
        Rewards: "Rewards",
        Dining: "Dining",
        Luxury: "Luxury Experience",
      },
      cardNetwork: "Diners Club International",
      trendingOffers: [
        {
          brandId: 1,
          brandName: "Marriott Bonvoy",
          brandColour: "#5C2E91",
          shortDescription: "Earn 8 Points per ₹150 on Marriott stays",
          detailedDescription:
            "Get 8 Marriott Bonvoy Points for every ₹150 spent at Marriott participating hotels like St. Regis, JW Marriott, Sheraton, and more.",
        },
        {
          brandId: 2,
          brandName: "Diners Club",
          brandColour: "#0074BC",
          shortDescription: "Access 24 lounges globally",
          detailedDescription:
            "Enjoy 24 complimentary domestic and international lounge visits every year via Diners Club International network.",
        },
      ],
      voucherValue: "Free Night Award (worth 15,000 points)",
      maximumBenifits: 70000,
      effectiveFree: 0,
    },
    preApproved: false,
    rewardJson: {
      MarriottStays: {
        rewardsPercent: "8",
        spendBased: {
          MarriottPoints: {
            baseValue: "8",
            rules: [
              {
                expenseBase: 150,
                operator: "=",
                multiplicationFactor: 8,
              },
              {
                expenseBase: 1000000,
                operator: "<=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Earn 8 Marriott Bonvoy Points per ₹150 spent at Marriott Bonvoy participating hotels",
          },
        },
      },
      TravelDiningEntertainment: {
        rewardsPercent: "4",
        spendBased: {
          MarriottPoints: {
            baseValue: "4",
            rules: [
              {
                expenseBase: 150,
                operator: "=",
                multiplicationFactor: 4,
              },
              {
                expenseBase: 500000,
                operator: "<=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Earn 4 Marriott Bonvoy Points per ₹150 spent on travel, dining, and entertainment",
          },
        },
      },
      OtherSpends: {
        rewardsPercent: "2",
        spendBased: {
          MarriottPoints: {
            baseValue: "2",
            rules: [
              {
                expenseBase: 150,
                operator: "=",
                multiplicationFactor: 2,
              },
            ],
            rewardDesc: "Earn 2 Marriott Bonvoy Points per ₹150 spent on other categories",
          },
        },
      },
      MilestoneBenefits: {
        nonSpendBased: {
          FreeNightAwards: {
            baseValue: "15000",
            rules: [
              {
                expenseBase: 600000,
                operator: ">=",
                multiplicationFactor: 1,
              },
              {
                expenseBase: 900000,
                operator: ">=",
                multiplicationFactor: 1,
              },
              {
                expenseBase: 1500000,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "Earn 1 Free Night Award on reaching ₹6L, ₹9L, and ₹15L annual spend milestones",
          },
        },
      },
      WelcomeBonus: {
        nonSpendBased: {
          JoiningFreeNightAward: {
            baseValue: "15000",
            rules: [
              {
                expenseBase: 1,
                operator: "=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "1 Free Night Award worth 15,000 points on first eligible transaction",
          },
        },
      },
    },
    priority: 4,
    pcoPriority: 3,
    slug: "marriott-bonvoy-hdfc-bank-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    cardDisplay: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    sortOrder: "4",
    isCrossSell: true,
    id: 19,
  },
  {
    value: "axis-magnus-credit-card",
    program: "Axis Bank",
    token: "AXIS_MAGNUS_001",
    guid: "AXIS_MAGNUS_001",
    partnerId: 104,
    pbcoOfferId: "PB_AXIS_MAGNUS_001",
    beaconUserIdentifier: "AXIS_MAGNUS_001",
    name: "Axis Magnus Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2017/10/Axis-Magnus-Credit-Card-image.png",
    applyLink: "https://www.axisbank.com/credit-card/magnus-card",
    features: {
      creditCardSpecialOfferDetails:
        "High EDGE reward rates with monthly spend milestones, unlimited Priority Pass international lounge access, low forex markup (2%), hotel & dining privileges",
      creditCardTermCondition:
        "Joining Fee ₹12,500, Annual Fee ₹12,500 (waivable on spend), Finance charges 3.0% p.m., exclusions apply for certain MCCs, T&C apply",
      creditCardOneLinerDescription: "Travel,Rewards,Premium,Dining,Hotels",
      categories: ["Travel", "Rewards", "Premium", "Dining", "Hotels"],
      cardType: "Premium",
      isRupay: false,
      bestFeature: [
        "12 EDGE points per ₹200 (base up to ₹1.5L/month)",
        "35 EDGE points per ₹200 above ₹1.5L/month",
        "60 EDGE points per ₹200 on Travel EDGE up to ₹2L/month",
        "Unlimited Priority Pass international lounge access + guest visits",
      ],
      saveOnFeeToolTip: "Annual fee waivable on hitting spend milestone of ₹25 Lakh/year",
      bestSuitedFor: {
        Profile: ["High spenders", "Frequent travellers", "Premium card users"],
        Income: ["Above 24 LPA"],
      },
      cardBenefits: [
        "12 EDGE points per ₹200 spent (up to ₹1.5L/month)",
        "35 EDGE points per ₹200 spent above ₹1.5L/month",
        "60 EDGE points per ₹200 on Travel EDGE portal (up to ₹2L/month)",
        "Unlimited international lounge access with Priority Pass (primary + add-on)",
        "Low forex markup fee (1.5%–2% depending on variant)",
        "Hotel benefits: discounts & complimentary night offers at select hotels",
        "Dining offers (up to 40% at select restaurants)",
        "Fuel, utilities, wallet spends excluded from rewards",
      ],
      moreInfo: {
        Lounge: [
          "Unlimited Priority Pass visits (plus 4 guest visits/year)",
          "Unlimited domestic lounge visits on meeting spend criteria",
        ],
        Hotels: [
          "Special offers at Oberoi & Trident",
          "Complimentary night offers on select bookings",
        ],
        Redemptions: [
          "Transfer EDGE points to airline/hotel partners (conversion subject to Group A / B caps)",
        ],
      },
      creditCardJoiningFeeAmount: "₹12,500",
      creditCardJoiningFeeAdditionalText: "Plus applicable taxes",
      creditCardAnnualFeeAmount: "₹12,500",
      creditCardAnnualFeeAdditionalText: "Waived on spending ₹25 Lakh in previous year",
      cardCategory: {
        Travel: "Premium",
        Rewards: "Premium",
        Dining: "Premium",
        Hotels: "Premium",
      },
      cardCategoryDescription: {
        Travel: ["Unlimited lounge access", "Low forex markup fee"],
        Rewards: [
          "Tiered EDGE points with monthly milestones",
          "Transfer to airline/hotel partners",
        ],
        Dining: ["Dining discounts up to 40% at partner restaurants"],
        Hotels: ["Exclusive hotel member benefits & discounts"],
      },
      cardNetwork: "Visa / Mastercard",
    },
    preApproved: false,
    rewardJson: {
      generalSpends: {
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 150000,
            rate: 12,
          },
          {
            minExpense: 150001,
            maxExpense: "infinity",
            rate: 35,
          },
        ],
      },
      travelEdgePortal: {
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 200000,
            rate: 60,
          },
          {
            minExpense: 200001,
            maxExpense: "infinity",
            rate: 35,
          },
        ],
      },
      travelRedemption: {
        nonSpendBased: {
          convertToMiles: {
            baseValue: "5:2",
            rules: [
              {
                expenseBase: 1,
                operator: "=>",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Points to airline/hotel loyalty conversion (subject to Group caps)",
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    id: 20,
  },
  {
    value: "flipkart-axis-bank-credit-card",
    program: "Axis Bank",
    token: "AXIS_FLIPKART_001",
    guid: "AXIS_FLIPKART_001",
    partnerId: 103,
    pbcoOfferId: "PB_AXIS_FLIPKART_001",
    beaconUserIdentifier: "AXIS_FLIPKART_001",
    name: "Flipkart Axis Bank Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Flipkart-Axis-Bank-Credit-Card.jpg.webp",
    applyLink: "https://www.axisbank.com/credit-card/flipkart-axis-card",
    features: {
      creditCardSpecialOfferDetails:
        "7.5% cashback on Myntra, 5% cashback on Flipkart & Cleartrip, 4% unlimited cashback on preferred merchants, 1% base cashback on other spends, Fuel surcharge waiver, Dining benefits",
      creditCardTermCondition:
        "Joining/Annual Fee Rs. 500 + Taxes, Finance Charges 3.75% per month, Late Payment Fees applicable as per slab",
      creditCardOneLinerDescription: "Shopping, Online Shopping, Cashback, Travel, Dining, Movies",
      categories: ["Shopping", "Online Shopping", "Cashback", "Travel", "Dining", "Movies"],
      cardType: "Entry-level",
      isRupay: false,
      bestFeature: [
        "7.5% cashback on Myntra",
        "5% cashback on Flipkart and Cleartrip",
        "Unlimited 4% cashback on preferred merchants",
        "Fuel surcharge waiver up to Rs. 400/month",
        "Dining discounts via Axis Bank Dining Delights",
      ],
      bestSuitedFor: {
        Profile: ["Online shoppers", "Travelers", "Frequent Myntra & Flipkart users"],
        Income: ["No strict minimum income required"],
      },
      cardBenefits: [
        "Accelerated cashback on Flipkart & Myntra",
        "Cleartrip travel cashback",
        "Unlimited cashback on preferred merchants (cult.fit, PVR, Swiggy, Uber)",
        "1% base cashback on other transactions",
        "Fuel surcharge waiver (1% up to Rs. 400/month)",
        "Dining discount up to 15% on partner restaurants",
        "EMI conversion facility for spends above Rs. 2,500",
      ],
      creditCardJoiningFeeAmount: "₹500",
      creditCardJoiningFeeAdditionalText:
        "Plus applicable taxes; waived for first year via Paisabazaar",
      creditCardAnnualFeeAmount: "₹500",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 3.5 Lakh in previous year",
      cardCategory: {
        Cashback: "Entry-level",
        Shopping: "Entry-level",
        Travel: "Entry-level",
        Dining: "Entry-level",
        Movies: "Entry-level",
      },
      cardCategoryDescription: {
        Cashback: [
          "7.5% on Myntra",
          "5% on Flipkart & Cleartrip",
          "4% on preferred merchants",
          "1% base cashback",
        ],
        Shopping: ["Flipkart & Myntra online shopping discounts"],
        Travel: ["Cleartrip cashback"],
        Dining: ["Up to 15% off at 10,000+ partner restaurants"],
        Movies: ["Cashback on PVR and entertainment partners"],
      },
      cardNetwork: "Visa / Mastercard",
    },
    preApproved: false,
    rewardJson: {
      Shopping: {
        rewardsPercent: "7.5%",
      },
      OnlineShopping: {
        rewardsPercent: "5%",
      },
      Cashback: {
        rewardsPercent: "4%",
      },
      Travel: {
        rewardsPercent: "5%",
      },
      Dining: {
        rewardsPercent: "15%",
      },
      Movies: {
        rewardsPercent: "4%",
      },
    },
    priority: 3,
    isActive: 1,
    id: 21,
  },

  {
    value: "axis-bank-select-credit-card",
    program: "Axis Bank",
    token: "AXIS_SELECT_001",
    guid: "AXIS_SELECT_001",
    partnerId: 101,
    pbcoOfferId: "PB_AXIS_SELECT_001",
    beaconUserIdentifier: "AXIS_SELECT_001",
    name: "Axis Bank SELECT Credit Card",
    image: "https://www.axisbank.com/images/default-source/credit-cards/select-card.png",
    applyLink: "https://www.axisbank.com/credit-card/select-card",
    features: {
      creditCardSpecialOfferDetails:
        "2X reward points on retail spends, fuel surcharge waiver, airport lounge access",
      creditCardTermCondition:
        "Joining Fee Rs. 3,000, Annual Fee Rs. 3,000 from 2nd year onwards, T&C apply",
      creditCardOneLinerDescription: "Shopping,Dining,Fuel,Travel,Rewards",
      categories: ["Shopping", "Dining", "Fuel", "Travel", "Rewards", "Premium"],
      cardType: "Premium",
      isRupay: false,
      bestFeature: [
        "2X reward points on retail spends",
        "Fuel surcharge waiver",
        "Airport lounge access",
      ],
      bestSuitedFor: {
        Profile: ["Salaried professionals", "Frequent travelers"],
        Income: ["Above 6 LPA"],
      },
      cardBenefits: [
        "2X reward points on retail spends",
        "Fuel surcharge waiver up to Rs. 500 per statement cycle",
        "Complimentary airport lounge access (VISA/MasterCard lounges)",
        "Reward points redeemable for shopping, travel, and gift vouchers",
      ],
      creditCardJoiningFeeAmount: "₹3,000",
      creditCardJoiningFeeAdditionalText: "From 2nd year onwards",
      creditCardAnnualFeeAmount: "₹3,000",
      creditCardAnnualFeeAdditionalText: "Waived on spends above Rs. 3 Lakh/year",
      cardCategory: {
        Rewards: "Premium",
        Travel: "Premium",
        Shopping: "Accelerated",
      },
      cardCategoryDescription: {
        Rewards: ["2X points on all retail spends", "Bonus points on anniversary month"],
        Travel: ["Airport lounge access", "Travel insurance coverage"],
      },
      cardNetwork: "Visa / Mastercard",
    },
    preApproved: false,
    rewardJson: {
      Shopping: {
        rewardsPercent: "2%",
      },
      Dining: {
        rewardsPercent: "2%",
      },
      Fuel: {
        rewardsPercent: "1%",
      },
      Travel: {
        rewardsPercent: "1%",
      },
    },
    priority: 1,
    isActive: 1,
    id: 23,
  },
  {
    value: "tata-neu-infinity-hdfc-credit-card",
    program: "HDFC Bank",
    token: "TATA_NEU_INFINITY_HDFC_CREDIT_CARD",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Tata Neu Infinity HDFC Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/12/500x500.png.webp",
    applyLink: "https://www.hdfcbank.com/personal/resources/credit-cards/tata-neu-infinity",
    features: {
      creditCardSpecialOfferDetails:
        "Up to 10% NeuCoins on select Tata Neu purchases, 5% back on non-EMI Tata Neu spends, welcome 1,499 NeuCoins, UPI rewards on RuPay variant, lounge access (domestic & international subject to voucher/priority-pass issuance), fuel surcharge waiver, annual fee waiver on Rs. 3 Lakh yearly spend.",
      creditCardTermCondition:
        "Joining & Annual fee: Rs. 1,499 + taxes; Finance charges: 3.75% p.m.; Late payment charges as per slab; Annual fee waiver on Rs. 3,00,000 annual spend; Lounge benefits subject to spend/voucher rules effective June 10, 2025.",
      creditCardOneLinerDescription:
        "Co-branded shopping & rewards card, up to 10% NeuCoins on Tata Neu, 1.5% on other spends, RuPay UPI rewards, lounge access, annual fee Rs.1,499",
      categories: ["Shopping", "Rewards", "Travel", "Fuel", "Experience", "Co-branded"],
      cardType: "Co-branded, Shopping & Rewards",
      isRupay: true,
      bestFeature: [
        "Up to 10% NeuCoins on select Tata Neu purchases",
        "5% back on non-EMI Tata Neu spends",
        "Welcome 1,499 NeuCoins on first transaction",
        "1.5% NeuCoins on other spends",
        "RuPay variant earns on UPI spends (up to 500 NeuCoins/month)",
        "Annual fee waiver on Rs. 3 Lakh annual spend",
      ],
      bestSuitedFor: {
        Shopping: ["Frequent Tata Neu shoppers", "Users of BigBasket, Croma, Westside"],
        Travel: ["Air India & IHCL bookings inside Tata ecosystem"],
        Rewards: ["Users wanting cashback-equivalent NeuCoin rewards"],
      },
      cardBenefits: [
        "5% back as NeuCoins on Tata Neu non-EMI spends",
        "Additional 5% NeuCoins on Tata Neu App after Tata NeuPass registration",
        "1.5% NeuCoins on non-Tata spends and merchant EMIs",
        "1.5% NeuCoins (up to 500 NeuCoins/month) on UPI spends via RuPay variant",
        "Welcome benefit: 1,499 NeuCoins on first transaction within 30 days",
        "8 domestic lounge visits (subject to quarterly spend/voucher rules)",
        "4 international lounge visits per year (Priority Pass on request)",
        "Fuel surcharge waiver: 1% up to Rs. 500/month on fuel spends Rs.400–5,000",
        "Low forex mark-up: 2%",
      ],
      creditCardJoiningFeeAmount: "Rs. 1,499",
      creditCardAnnualFeeAmount: "Rs. 1,499",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 3,00,000 in a year",
      cardCategory: {
        Shopping: "Shopping",
        Rewards: "Rewards",
        Travel: "Travel",
        Fuel: "Fuel",
        Experience: "Lifestyle & Co-branded Benefits",
      },
      cardNetwork: "Visa | RuPay",
    },
    preApproved: false,
    rewardJson: {
      TataNeu: {
        rewardsPercent: "5",
      },
      TataNeuAppBonus: {
        rewardsPercent: "5",
      },
      OtherSpends: {
        rewardsPercent: "1.5",
      },
      UPI_RuPay: {
        rewardsPercent: "1.5",
        dynamicRewardsPercent: [
          {
            minExpense: 1,
            maxExpense: 500,
            rate: 1.5,
          },
        ],
      },
      LoungeAccess: {
        domestic: {
          visitsPerYear: 8,
          rule: "Max 2 per quarter, requires Rs.50,000 quarterly spend for vouchers",
        },
        international: {
          visitsPerYear: 4,
          rule: "Priority Pass on request, capped 1 per quarter",
        },
      },
    },
    priority: 2,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 24,
  },
  {
    value: "hdfc-millennia-credit-card",
    program: "HDFC Bank",
    token: "HDFC_MILLENNIA_CREDIT_CARD",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HDFC Millennia Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/HDFC-Millennia-Credit-Card-1.png.webp",
    applyLink: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-credit-card",
    features: {
      seoLink: "https://www.paisabazaar.com/hdfc-bank/millennia-credit-card/",
      creditCardSpecialOfferDetails:
        "Earn up to 5% cashback (as CashPoints) on leading brands including Amazon, Flipkart, Swiggy, Zomato, BookMyShow, and Uber. 1% cashback on all other spends. Welcome bonus of 1,000 CashPoints, milestone voucher worth ₹1,000 per quarter, and annual fee waiver on ₹1 lakh yearly spend.",
      creditCardTermCondition:
        "Joining Fee ₹1,000 + taxes; Annual Fee ₹1,000 + taxes (waived on ₹1L annual spend). Finance charges 3.75% p.m. Late payment charges up to ₹1,300 based on outstanding balance. 1% fuel surcharge waiver on spends ₹400–₹5,000 (max ₹250/month).",
      creditCardOneLinerDescription:
        "Cashback, Online Shopping, Dining, Movies, Everyday Spends, Rewards, Travel",
      categories: ["Cashback", "Online Shopping", "Dining", "Movies", "Rewards", "Travel"],
      cardType: "Cashback & Lifestyle",
      isRupay: true,
      exclusivelyOnPb: false,
      voucherEligibility: "Joining and milestone vouchers on ₹1L quarterly spend",
      bestFeature: [
        "5% cashback on Amazon, Flipkart, Swiggy, Zomato, BookMyShow & Uber",
        "1% cashback on other spends",
        "1,000 CashPoints as welcome benefit",
        "Quarterly milestone benefit worth ₹1,000 or 1 lounge visit",
        "Annual fee waiver on ₹1L yearly spend",
        "Up to 10% dining discount via Swiggy Dineout",
      ],
      bestSuitedFor: {
        Cashback: ["Online Shopping", "Food Delivery", "Movies", "Travel"],
        Lifestyle: ["Dining", "Entertainment", "Shopping"],
      },
      cardBenefits: [
        "5% cashback on popular brands: Amazon, Flipkart, Swiggy, Zomato, BookMyShow, Uber, Tata CLiQ",
        "1% cashback on all other retail spends",
        "1,000 bonus CashPoints on card activation",
        "Quarterly milestone: ₹1,000 voucher or 1 complimentary lounge visit on ₹1L spend",
        "Annual fee waived on ₹1L spend in the previous year",
        "10% off on dining via Swiggy Dineout",
        "1% fuel surcharge waiver (up to ₹250/month)",
        "CashPoints valid for 2 years; redeemable against statement balance, travel, or vouchers",
      ],
      creditCardJoiningFeeAmount: "₹1,000",
      creditCardAnnualFeeAmount: "₹1,000",
      creditCardAnnualFeeAdditionalText: "Waived on ₹1 lakh annual spend",
      cardCategory: {
        Cashback: "Cashback",
        Shopping: "Online Shopping",
        Dining: "Dining",
        Movies: "Movies",
        Rewards: "Rewards",
        Travel: "Travel",
      },
      cardNetwork: "Visa | RuPay | MasterCard",
      trendingOffers: [
        {
          brandId: 1,
          brandName: "Amazon",
          brandColour: "#FF9900",
          shortDescription: "5% cashback on Amazon spends",
          detailedDescription:
            "Earn 5% cashback as CashPoints when you shop on Amazon using your HDFC Millennia Credit Card.",
        },
        {
          brandId: 2,
          brandName: "Swiggy",
          brandColour: "#FC8019",
          shortDescription: "5% cashback on food orders",
          detailedDescription:
            "Get 5% cashback on Swiggy orders when paid with your HDFC Millennia Credit Card.",
        },
      ],
      voucherValue: "₹1,000 per quarter on ₹1L spend",
      maximumBenifits: 12000,
      effectiveFree: 1,
    },
    preApproved: false,
    rewardJson: {
      CashbackBrands: {
        rewardsPercent: "5",
        spendBased: {
          CashPoints: {
            baseValue: "5",
            rules: [
              {
                expenseBase: 1,
                operator: "=",
                multiplicationFactor: 0.05,
              },
              {
                expenseBase: 20000,
                operator: "<=",
                multiplicationFactor: 1,
                maxValue: 1000,
              },
            ],
            rewardDesc:
              "5% cashback (max 1,000 CP/month) on Amazon, Flipkart, Swiggy, Zomato, etc.",
          },
        },
      },
      OtherSpends: {
        rewardsPercent: "1",
        spendBased: {
          CashPoints: {
            baseValue: "1",
            rules: [
              {
                expenseBase: 1,
                operator: "=",
                multiplicationFactor: 0.01,
              },
              {
                expenseBase: 100000,
                operator: "<=",
                multiplicationFactor: 1,
                maxValue: 1000,
              },
            ],
            rewardDesc: "1% cashback on all other retail spends (max 1,000 CP/month)",
          },
        },
      },
      Milestone: {
        nonSpendBased: {
          QuarterlyVoucher: {
            baseValue: "1000",
            rules: [
              {
                expenseBase: 100000,
                operator: ">=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "₹1,000 voucher or 1 lounge visit on ₹1L quarterly spend",
          },
        },
      },
      WelcomeBonus: {
        nonSpendBased: {
          ActivationReward: {
            baseValue: "1000",
            rules: [
              {
                expenseBase: 1,
                operator: "=",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "1,000 CashPoints on first transaction",
          },
        },
      },
    },
    priority: 3,
    pcoPriority: 2,
    slug: "hdfc-millennia-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    cardDisplay: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    sortOrder: "3",
    isCrossSell: true,
    id: 25,
  },
  {
    value: "yes-bank-paisabazaar-paisasave-credit-card",
    program: "Yes Bank",
    token: "YES_PAISASAVE_001",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 102,
    pbcoOfferId: "PB_YES_PAISASAVE_001",
    beaconUserIdentifier: "YES_PAISASAVE_001",
    name: "YES BANK Paisabazaar PaisaSave Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/500x500-1.png.webp",
    applyLink: "https://www.yesbank.in/credit-cards/paisasave-credit-card",
    features: {
      creditCardSpecialOfferDetails:
        "3% cashback on online spends, 1.5% cashback on other spends, low annual fee, cashback points redeemed as statement credit",
      creditCardTermCondition:
        "Joining Fee Nil, Annual Fee Rs. 499 from 2nd year onwards (Nil for RuPay), Finance Charges 3.99% per month, Forex Mark-up 3.40%",
      creditCardOneLinerDescription:
        "Cashback, Online Shopping, Low Fee, Statement Credit Redemption",
      categories: ["Cashback", "Online Shopping", "Low Fee", "Statement Credit Redemption"],
      cardType: "Entry-level",
      isRupay: true,
      bestFeature: [
        "3% cashback on online spends",
        "1.5% cashback on other spends",
        "Low annual fee of Rs. 499",
      ],
      bestSuitedFor: {
        OnlineShoppers: [
          "E-commerce users",
          "Cashback seekers",
          "Entry-level card users",
          "Low annual fee preference",
        ],
      },
      cardBenefits: [
        "3% cashback on online transactions (capped at 5,000 points/month)",
        "1.5% cashback on offline & UPI spends above Rs. 2,000",
        "Cashback points redeemable as statement credit (1 point = Rs. 1)",
        "Fuel surcharge waiver up to Rs. 250",
        "Annual fee waiver on spending Rs. 1.2 Lakh in previous year",
      ],
      creditCardJoiningFeeAmount: "₹0",
      creditCardJoiningFeeAdditionalText: "Nil",
      creditCardAnnualFeeAmount: "₹499",
      creditCardAnnualFeeAdditionalText: "From 2nd year onwards (Nil for RuPay card)",
      cardCategory: {
        Cashback: "Entry-level",
        OnlineShopping: "Accelerated",
        Lifestyle: "Basic",
      },
      cardCategoryDescription: {
        Cashback: ["3% on online spends", "1.5% on other spends"],
        OnlineShopping: [
          "All major e-commerce platforms included",
          "No merchant/brand restriction",
        ],
      },
      cardNetwork: "Mastercard / RuPay",
    },
    preApproved: false,
    rewardJson: {
      onlineShopping: {
        rewardsPercent: "3%",
      },
      offlineSpends: {
        rewardsPercent: "1.5%",
      },
      upiSpends: {
        rewardsPercent: "1.5%",
      },
    },
    priority: 2,
    isActive: 1,
    id: 26,
  },
  {
    value: "yes-bank-marquee-credit-card",
    program: "Yes Bank",
    token: "YES_MARQUEE_001",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 102,
    pbcoOfferId: "PB_YES_MARQUEE_001",
    beaconUserIdentifier: "YES_MARQUEE_001",
    name: "YES BANK Marquee Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/YES-Marquee-Credit-Card.png.webp",
    applyLink: "https://www.yesbank.in/credit-cards/marquee-credit-card",
    features: {
      creditCardSpecialOfferDetails:
        "40,000 YES Rewardz points as welcome bonus, ETPrime subscription, unlimited lounge access, movie & golf benefits",
      creditCardTermCondition:
        "Joining fee Rs. 9,999 + taxes; annual fee Rs. 4,999 + taxes; low forex mark-up 1%; invite not required",
      creditCardOneLinerDescription:
        "Travel, Rewards, Movies, Dining, Online Shopping, Flights, Hotels, Golf, Premium Lifestyle",
      categories: [
        "Travel",
        "Rewards",
        "Movies",
        "Dining",
        "Online Shopping",
        "Flights",
        "Hotels",
        "Golf",
        "Premium Lifestyle",
      ],
      cardType: "Premium",
      isRupay: false,
      bestFeature: [
        "Unlimited international lounge access",
        "High reward rate up to 4.5%",
        "Welcome bonus 40,000 points",
      ],
      bestSuitedFor: {
        FrequentTravelers: [
          "High-income individuals",
          "Online shoppers",
          "Movie enthusiasts",
          "International travelers",
          "Golf lovers",
        ],
      },
      cardBenefits: [
        "Up to 4.5% reward back on online spends",
        "Unlimited international lounge access",
        "24 domestic lounge visits per year",
        "Buy 1 get 1 movie offer",
        "Low forex mark-up 1%",
        "Complimentary ETPrime subscription",
      ],
      creditCardJoiningFeeAmount: "₹9,999",
      creditCardJoiningFeeAdditionalText: "Plus applicable taxes",
      creditCardAnnualFeeAmount: "₹4,999",
      creditCardAnnualFeeAdditionalText: "Plus applicable taxes",
      cardCategory: {
        Travel: "Premium",
        Rewards: "High",
        Lifestyle: "Exclusive",
      },
      cardCategoryDescription: {
        Travel: ["Airport lounge access", "Flights", "Hotels"],
        Rewards: ["Online/offline shopping rewards", "Movie tickets", "Golf benefits"],
      },
      cardNetwork: "Mastercard",
    },
    preApproved: false,
    rewardJson: {
      onlineShopping: {
        rewardsPercent: "4.5%",
      },
      offlineShopping: {
        rewardsPercent: "2.25%",
      },
      otherSpends: {
        rewardsPercent: "1%",
      },
      welcomeBonus: {
        nonSpendBased: {
          bonusPoints: {
            baseValue: 40000,
            rules: [],
            rewardDesc: "40,000 YES Rewardz points on joining",
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    id: 27,
  },
  {
    value: "yes-private-credit-card",
    program: "Yes Bank",
    token: "YES_PRIVATE_001",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 101,
    pbcoOfferId: "PB_YES_PRIVATE_001",
    beaconUserIdentifier: "YES_PRIVATE_001",
    name: "YES Private Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/YES-Private-Credit-Card.png.webp",
    applyLink: "https://www.paisabazaar.com/credit-card/yes-bank/yes-private-credit-card/",
    features: {
      creditCardSpecialOfferDetails:
        "2 Lakh bonus reward points, Oberoi e-gift voucher worth Rs. 9,000, unlimited lounge access, complimentary golf & movie benefits",
      creditCardTermCondition:
        "Invite-only card; joining fee Rs. 50,000 + taxes; annual fee Rs. 10,000 + taxes",
      creditCardOneLinerDescription:
        "Travel, Rewards, Hotels, Flights, Dining, Movies, Premium Lifestyle, Luxury, Airport Lounge",
      categories: [
        "Travel",
        "Rewards",
        "Hotels",
        "Flights",
        "Dining",
        "Movies",
        "Premium Lifestyle",
        "Luxury",
        "Airport Lounge",
      ],
      cardType: "Super-Premium",
      isRupay: false,
      bestFeature: [
        "Unlimited domestic & international lounge access",
        "Low forex mark-up 0.5%",
        "VIP airport meet & greet",
      ],
      bestSuitedFor: {
        FrequentTravelers: [
          "International travelers",
          "Luxury lifestyle enthusiasts",
          "Golf lovers",
          "Hotel & airport privileges seekers",
        ],
      },
      cardBenefits: [
        "2.5% value-back on domestic spends",
        "5% reward on international spends",
        "VIP airport concierge",
        "Complimentary golf sessions",
        "Movie & event discounts",
      ],
      creditCardJoiningFeeAmount: "₹50,000",
      creditCardJoiningFeeAdditionalText: "Plus applicable taxes",
      creditCardAnnualFeeAmount: "₹10,000",
      creditCardAnnualFeeAdditionalText: "Plus applicable taxes",
      cardCategory: {
        Travel: "Premium",
        Rewards: "High",
        Lifestyle: "Exclusive",
      },
      cardCategoryDescription: {
        Travel: ["Airport Lounge", "VIP Meet & Greet", "Flights", "Hotels"],
        Rewards: [
          "Domestic and international spend rewards",
          "Bonus reward points",
          "Gift vouchers",
        ],
      },
      cardNetwork: "Mastercard",
    },
    preApproved: false,
    rewardJson: {
      domestic: {
        rewardsPercent: "2.5%",
      },
      international: {
        rewardsPercent: "5%",
      },
      welcomeBonus: {
        nonSpendBased: {
          bonusPoints: {
            baseValue: 200000,
            rules: [],
            rewardDesc: "2 Lakh bonus reward points on joining",
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    id: 28,
  },
  {
    value: "icici-bank-sapphiro-credit-card",
    program: "ICICI Bank",
    token: "ICICI_SAPPHIRO",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 103,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "ICICI Bank Sapphiro Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/Sapphiro-Credit-Card.png.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/sapphiro-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "Welcome vouchers Rs. 9,000, Buy 1 Get 1 movie offer, 16 domestic & 2 international lounge visits, milestone reward points, golf & dining benefits",
      creditCardTermCondition:
        "Joining fee Rs. 6,500 + taxes, Annual fee Rs. 3,500 + taxes, waived on Rs. 6 lakh annual spend; Finance charges 3.75% p.m.; Late payment charges as per slab",
      creditCardOneLinerDescription:
        "Travel, Shopping, Movies, Rewards, Dining, Golf, Lounge Access",
      categories: ["Travel", "Shopping", "Movies", "Rewards", "Dining", "Golf", "Lounge Access"],
      cardType: "Premium Lifestyle & Rewards",
      isRupay: false,
      bestFeature: [
        "Welcome vouchers worth Rs. 9,000",
        "Up to 16 domestic lounge visits per year",
        "2 international lounge visits per year",
        "Buy 1 Get 1 movie tickets twice per month",
        "Milestone reward points on annual spends",
        "Golf and dining benefits",
      ],
      bestSuitedFor: {
        Lifestyle: ["Dining", "Movies", "Shopping", "Golf"],
        Travel: ["Domestic & International Lounge Access", "Travel vouchers"],
        Rewards: ["Milestone reward points", "Accelerated international spends"],
      },
      cardBenefits: [
        "4 reward points per Rs. 100 on international spends",
        "2 reward points per Rs. 100 on domestic spends",
        "1 reward point per Rs. 100 on utility & insurance",
        "Welcome vouchers from Uber, EaseMyTrip, Tata CLiQ & Croma",
        "Buy 1 Get 1 movie offer",
        "Up to 16 domestic lounge visits per year",
        "2 international lounge visits per year",
        "Milestone bonus points on spending Rs. 4 lakh+ annually",
        "Golf & dining benefits",
      ],
      creditCardJoiningFeeAmount: "Rs. 6,500",
      creditCardAnnualFeeAmount: "Rs. 3,500",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 6 lakh/year",
      cardCategory: {
        Travel: "Travel",
        Shopping: "Shopping",
        Movies: "Movies",
        Rewards: "Rewards",
        Dining: "Dining",
        Experience: "Golf & Lifestyle",
      },
      cardNetwork: "Mastercard & American Express",
    },
    preApproved: false,
    rewardJson: {
      InternationalSpends: {
        rewardsPercent: "4",
      },
      DomesticSpends: {
        rewardsPercent: "2",
      },
      UtilityInsurance: {
        rewardsPercent: "1",
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 29,
  },
  {
    value: "adani-one-icici-platinum-credit-card",
    program: "ICICI Bank",
    token: "ADANI_ONE_ICICI_PLATINUM",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 102,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Adani One ICICI Platinum Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/adani-one-icici-platinum-credit-card.png.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/adani-one-icici-platinum-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "3% Adani reward points within Adani ecosystem, 25% off on movies, lounge access, hotel and flight vouchers, valet & premium parking",
      creditCardTermCondition:
        "Joining & annual fee Rs. 750, waived on spending Rs. 3 Lakh/year; Finance charges 3.75% p.m.; Late payment charges applicable as per slab",
      creditCardOneLinerDescription:
        "Shopping, Travel, Movies, Rewards, Lounge Access, Dining, Utilities",
      cardType: "Entry-Level Co-branded",
      isRupay: false,
      bestFeature: [
        "3% reward points on Adani ecosystem spends",
        "25% off BookMyShow movie tickets",
        "Welcome hotel voucher Rs. 1,000",
        "Flight voucher Rs. 2,000 on Rs. 10,000 spend within 60 days",
        "2 domestic lounge accesses per quarter",
        "2 premium lounge upgrades per quarter",
        "2 valet & 2 premium parking per year",
      ],
      bestSuitedFor: {
        Lifestyle: ["Shopping", "Dining", "Movies"],
        Travel: ["Airport lounge access", "Flight vouchers", "Premium parking"],
        Utilities: ["Utility & insurance reward points"],
      },
      cardBenefits: [
        "3% reward points within Adani ecosystem",
        "1.5% reward points on international spends",
        "1% reward points on domestic spends",
        "0.5% reward points on utility & insurance",
        "Welcome hotel & flight vouchers",
        "Airport lounge & lounge upgrades",
        "Valet & premium parking benefits",
      ],
      creditCardAnnualFeeAmount: "Rs. 750",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 3 Lakh/year",
      cardCategory: {
        Shopping: "Shopping",
        Travel: "Travel",
        Movies: "Movies",
        Rewards: "Rewards",
        Dining: "Dining",
      },
      cardNetwork: "Visa",
    },
    preApproved: false,
    rewardJson: {
      AdaniEcosystem: {
        rewardsPercent: "3",
      },
      InternationalSpends: {
        rewardsPercent: "1.5",
      },
      DomesticSpends: {
        rewardsPercent: "1",
      },
      UtilityInsurance: {
        rewardsPercent: "0.5",
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 30,
  },
  {
    value: "icici-bank-coral-credit-card",
    program: "ICICI Bank",
    token: "ICICI_CORAL",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 102,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "ICICI Bank Coral Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2025/04/ICICI-Bank-Coral-Credit-Card.png.webp",
    applyLink:
      "https://www.icicibank.com/personal-banking/cards/credit-cards/coral-credit-card.page",
    features: {
      creditCardSpecialOfferDetails:
        "Complimentary lounge access, Movie offers, Dining discounts, Milestone bonus rewards, Fee waiver on spending Rs. 1.5 lakh",
      creditCardTermCondition:
        "Annual fee Rs. 500, waived on spending Rs. 1.5 lakh; Fuel surcharge 1%; Reward points on retail, utility & insurance spends; Reward points expiry 1 year",
      creditCardOneLinerDescription:
        "Movies, Rewards, Lounge Access, Dining, Travel, Shopping, Fuel, Bill Payments",
      cardType: "Entry-Level",
      isRupay: true,
      bestFeature: [
        "Milestone bonus up to 10,000 reward points/year",
        "4 airport & railway lounge visits/year",
        "25% off on movies (BookMyShow & INOX)",
        "Dining discounts",
        "Low annual fee Rs. 500",
      ],
      bestSuitedFor: {
        Lifestyle: ["Dining", "Shopping", "Movies"],
        Travel: ["Airport lounge access", "Railway lounge access"],
        Utilities: ["Fuel benefits", "Utility payments rewards"],
      },
      cardBenefits: [
        "2 reward points per Rs. 100 retail spend",
        "1 reward point per Rs. 100 utility/insurance spend",
        "Milestone bonus: 2,000 points on Rs. 2 lakh annual spend",
        "Lounge access: 1 domestic airport per quarter, 4 railway lounges/year",
        "Movie benefit: 25% off, up to Rs. 100, 2 tickets per month",
        "Dining discounts via ICICI Culinary Treats",
        "Fuel surcharge 1% waiver on Rs. 400-4,000 HPCL spends",
      ],
      creditCardAnnualFeeAmount: "Rs. 500",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 1.5 lakh per year",
      cardCategory: {
        Movies: "Movies",
        Rewards: "Rewards",
        Travel: "Travel",
        Dining: "Dining",
        Shopping: "Shopping",
      },
      cardNetwork: "Visa",
    },
    preApproved: false,
    rewardJson: {
      Retail: {
        rewardsPercent: "2",
      },
      UtilityInsurance: {
        rewardsPercent: "1",
      },
      MilestoneBonus: {
        nonSpendBased: {
          Milestone: {
            baseValue: 2000,
            rewardDesc:
              "2,000 reward points on reaching Rs. 2 lakh annual spends; 1,000 points on every additional Rs. 1 lakh",
            rules: [
              {
                expenseBase: 200000,
                operator: ">=",
                multiplicationFactor: 1,
                maxValue: 10000,
              },
            ],
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 31,
  },
  {
    value: "federal-bank-visa-imperio-credit-card",
    program: "Federal Bank",
    token: "FEDERAL_BANK_VISA_IMPERIO",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "Federal Bank Visa Imperio Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2016/01/Federal-Bank-Visa-Imperio-Credit-Card.jpg.webp",
    applyLink: "https://www.federalbank.co.in/credit-cards",
    features: {
      creditCardSpecialOfferDetails:
        "Welcome vouchers, Fuel surcharge waiver, BOGO movie offer, Lounge access",
      creditCardTermCondition:
        "Annual fee waiver on spending Rs. 1.5 lakh per year; 1% fuel surcharge waiver; reward points expiry 1 year",
      creditCardOneLinerDescription:
        "Travel, Lifestyle, Entertainment, Dining, Shopping, Rewards, Utilities, Movies",
      cardType: "Mid-level",
      isRupay: false,
      bestFeature: [
        "3X rewards on healthcare & groceries",
        "Complimentary vouchers",
        "BOGO movie offer",
        "Lounge access",
        "Fuel surcharge waiver",
      ],
      bestSuitedFor: {
        Lifestyle: ["Dining", "Shopping", "Movies"],
        Travel: ["Domestic lounge access", "Fuel benefits"],
      },
      cardBenefits: [
        "3X rewards on healthcare & groceries",
        "2X rewards on utility spends",
        "1X rewards on other spends",
        "Complimentary Amazon Pay & Big Basket vouchers",
        "BOGO offer on movies",
        "Complimentary domestic lounge access",
        "Fuel surcharge waiver",
      ],
      creditCardAnnualFeeAmount: "Rs. 1,500",
      creditCardAnnualFeeAdditionalText: "Waived on spending Rs. 1.5 lakh per year",
      cardCategory: {
        Travel: "Travel",
        Lifestyle: "Lifestyle",
        Entertainment: "Entertainment",
      },
      cardNetwork: "Visa",
    },
    preApproved: false,
    rewardJson: {
      HealthcareGrocery: {
        rewardsPercent: "3",
      },
      Utilities: {
        rewardsPercent: "2",
      },
      Others: {
        rewardsPercent: "1",
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 32,
  },
  {
    value: "federal-bank-scapia-credit-card",
    program: "Bank",
    token: "SCAPIA",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 104,
    pbcoOfferId: "SCAPIA_2025",
    beaconUserIdentifier: "SCAPIA_USER",
    name: "Federal Bank Scapia Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2017/10/Scapia-Federal-Card-image.png",
    applyLink: "https://www.federalbank.co.in/scapia-credit-card",
    features: {
      creditCardOneLinerDescription:
        "Travel, Rewards, Lounge Access, Lifetime Free, International Use, EMI Conversion, Fuel Waiver",
      creditCardSpecialOfferDetails:
        "Accelerated Scapia coins on travel spends, zero forex mark-up",
      creditCardTermCondition: "Subject to Federal Bank policy, fees & charges applicable",
      cardType: "Credit",
      isRupay: true,
      cardBenefits: [
        "20% Scapia coins on travel bookings via Scapia app",
        "10% Scapia coins on other spends in India",
        "Unlimited domestic airport lounge access",
        "No-cost EMI on travel bookings",
        "Fuel surcharge waiver 1% per month",
      ],
      bestSuitedFor: {
        Travel: ["Frequent travellers", "Flight & hotel bookings"],
        Rewards: ["High-spenders", "Scapia app users"],
        LoungeAccess: ["Domestic airport access"],
      },
      creditCardJoiningFeeAmount: "Nil",
      creditCardAnnualFeeAmount: "Nil",
      cardNetwork: "Visa/RuPay",
    },
    preApproved: false,
    rewardJson: {
      Travel: {
        rewardsPercent: "20% on travel via Scapia app, 10% on other domestic spends",
        spendBased: {
          RewardPoints: {
            baseValue: 10,
            rewardDesc: "Earn 20% Scapia coins on travel, 10% on domestic spends",
            rules: [
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 20,
                maxValue: "Unlimited",
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 10,
                maxValue: "Unlimited",
              },
            ],
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    slug: "federal-scapia-credit-card",
    id: 33,
  },
  {
    value: "federal-bank-celesta-credit-card",
    program: "Bank",
    token: "CELESTA",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 105,
    pbcoOfferId: "CELESTA_2025",
    beaconUserIdentifier: "CELESTA_USER",
    name: "Federal Bank Celesta Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/card-image-1.png.webp",
    applyLink: "https://www.federalbank.co.in/celesta-credit-card",
    features: {
      creditCardOneLinerDescription:
        "Travel, Rewards, Lounge Access, Dining, Movies, Lifetime Free, Forex Benefit",
      creditCardSpecialOfferDetails: "Amazon Pay e-voucher on first spends, low forex markup",
      creditCardTermCondition: "Subject to Federal Bank policy, fees & charges applicable",
      cardType: "Credit",
      isRupay: true,
      cardBenefits: [
        "3X reward points on travel & international spends",
        "2X reward points on dining",
        "Buy 1 Get 1 movie tickets at INOX",
        "Low forex markup fee of 2%",
        "Complimentary domestic & international lounge visits",
        "Amazon Pay e-voucher Rs.600 on first spend",
      ],
      bestSuitedFor: {
        Travel: ["Frequent travellers", "International & domestic flights"],
        Dining: ["Regular diners", "Weekend dining"],
        Movies: ["Movie-goers"],
      },
      creditCardJoiningFeeAmount: "Nil",
      creditCardAnnualFeeAmount: "Nil",
      cardNetwork: "Visa/Mastercard",
    },
    preApproved: false,
    rewardJson: {
      Travel: {
        rewardsPercent: "3X on travel & international, 2X on dining",
        spendBased: {
          RewardPoints: {
            baseValue: 3,
            rewardDesc:
              "Earn 3X on travel & international spends, 2X on dining, 1X on other spends",
            rules: [
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 3,
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 2,
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 1,
              },
            ],
          },
        },
      },
    },
    priority: 2,
    isActive: 1,
    slug: "federal-celesta-credit-card",
    id: 34,
  },
  {
    value: "rbl-bank-icon-credit-card",
    program: "Bank",
    token: "RBL_ICON",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 103,
    pbcoOfferId: "RBL_ICON_2025",
    beaconUserIdentifier: "RBL_ICON_USER",
    name: "RBL Bank Icon Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/RBL-Bank-Icon-Credit-Card.png.webp",
    applyLink: "https://www.rblbank.com/personal/cards/credit-cards/icon-credit-card",
    features: {
      creditCardOneLinerDescription:
        "Movies, Rewards, Dining, Lounge Access, Golf Benefits, Weekend Dining, International Spending",
      creditCardSpecialOfferDetails:
        "Welcome bonus of 20,000 reward points on retail spend within 30 days and paying joining fee",
      creditCardTermCondition: "Subject to RBL Bank credit policy, fees & charges applicable",
      cardType: "Credit",
      isRupay: false,
      cardBenefits: [
        "Up to 10X reward points on international & weekend dining spends",
        "Buy 1 get 1 free movie tickets up to Rs. 200 twice per month",
        "Up to 8 complimentary domestic airport lounge visits per year",
        "Up to 12 complimentary golf lessons per year with green fee benefits",
        "Milestone reward points up to 45,000 per year",
      ],
      bestSuitedFor: {
        Movies: ["Frequent movie-goers", "BookMyShow users"],
        Travel: ["Airport lounge access", "Domestic travelers"],
        Dining: ["Weekend dining enthusiasts"],
        Experience: ["Golf players", "Lifestyle spenders"],
      },
      creditCardJoiningFeeAmount: "Rs. 5,000 + Taxes",
      creditCardAnnualFeeAmount: "Rs. 5,000 + Taxes",
      cardNetwork: "Mastercard",
      moreInfo: {
        Fees: [
          "Finance charges up to 3.99% p.m.",
          "Late payment fees 12.5% of outstanding, min Rs.5, max Rs.1,300",
        ],
        MilestoneRewards: [
          "10,000 points on Rs. 3L annual spends",
          "Additional 15,000 points on Rs. 5L",
          "Additional 20,000 points on Rs. 8L",
        ],
      },
    },
    preApproved: false,
    rewardJson: {
      Dining: {
        rewardsPercent: "10% on international & weekend dining",
        spendBased: {
          RewardPoints: {
            baseValue: 10,
            rewardDesc: "Earn 10X points on international & weekend dining, 1X on other purchases",
            rules: [
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 10,
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 1,
              },
            ],
          },
        },
      },
      Movies: {
        nonSpendBased: {
          MovieTickets: {
            baseValue: 2,
            rewardDesc: "Buy 1 get 1 free movie tickets up to Rs.200, twice per month",
            rules: [
              {
                expenseBase: 0,
                operator: "*",
                multiplicationFactor: 1,
                maxValue: 2,
              },
            ],
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    slug: "rbl-icon-credit-card",
    id: 35,
  },
  {
    value: "irctc-rbl-bank-credit-card",
    program: "Bank",
    token: "IRCTC_RBL",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 102,
    pbcoOfferId: "IRCTC_RBL_2025",
    beaconUserIdentifier: "IRCTC_RBL_USER",
    name: "IRCTC RBL Bank Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/IRCTC-RBL-Bank-Credit-Card.png.webp",
    applyLink: "https://www.rblbank.com/personal/cards/credit-cards/irctc-credit-card",
    features: {
      creditCardOneLinerDescription:
        "Travel, Railway Booking Rewards, FASTag Cashback, Lounge Access, Milestone Bonuses",
      creditCardSpecialOfferDetails:
        "Welcome benefit of 500 reward points on spend above Rs. 500 within 30 days",
      creditCardTermCondition: "Subject to RBL Bank credit policy, fees & charges applicable",
      cardType: "Credit",
      isRupay: false,
      cardBenefits: [
        "Up to 5X reward points on IRCTC train bookings",
        "1.5% value-back on FASTag recharges",
        "Up to 8 complimentary railway lounge visits per year",
        "Milestone reward points up to 2,000 per year",
        "Train cancellation protection cover up to Rs. 5,000",
        "Transaction fee reversal up to Rs. 200 per month",
      ],
      bestSuitedFor: {
        Travel: ["Frequent train travelers", "IRCTC users"],
        Rewards: ["Railway booking points", "FASTag cashback"],
      },
      creditCardJoiningFeeAmount: "Rs. 500 + Taxes",
      creditCardAnnualFeeAmount: "Rs. 500 + Taxes",
      cardNetwork: "Visa / Mastercard",
      moreInfo: {
        Fees: [
          "Finance charges up to 3.99% p.m.",
          "Late payment charges 12.5% of outstanding, min Rs.5, max Rs.1,300",
        ],
        LoungeAccess: ["Up to 8 visits per year, capped at 2 per quarter"],
      },
    },
    preApproved: false,
    rewardJson: {
      Travel: {
        rewardsPercent: "5% on IRCTC bookings",
        spendBased: {
          RewardPoints: {
            baseValue: 5,
            rewardDesc:
              "Earn 5X points on train bookings, 3X on FASTag, 2X on flight/hotel bookings via IRCTC",
            rules: [
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 5,
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 3,
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 2,
              },
            ],
          },
        },
      },
    },
    priority: 2,
    isActive: 1,
    slug: "irctc-rbl-credit-card",
    id: 36,
  },
  {
    value: "rbl-world-safari-credit-card",
    program: "Bank",
    token: "RBL_WORLD_SAFARI",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 101,
    pbcoOfferId: "RBL_WS_2025",
    beaconUserIdentifier: "RBL_WS_USER",
    name: "RBL World Safari Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/11/world-safari.png.webp",
    applyLink: "https://www.rblbank.com/personal/cards/credit-cards/world-safari-credit-card",
    features: {
      creditCardOneLinerDescription: "Travel, Zero Forex Fee, Lounge Access, Rewards, Insurance",
      creditCardSpecialOfferDetails: "Welcome gift of MakeMyTrip voucher worth Rs. 3,000",
      creditCardTermCondition: "Subject to RBL Bank credit policy, fees & charges applicable",
      cardType: "Credit",
      isRupay: false,
      cardBenefits: [
        "2 travel points per Rs.100 spent on all transactions",
        "5 travel points per Rs.100 spent on travel",
        "0% forex markup fee on international transactions",
        "Airport lounge access domestic & international",
        "Travel insurance including trip delay, baggage loss, personal liability",
      ],
      bestSuitedFor: {
        Travel: ["Frequent travelers", "International trips"],
        Rewards: ["Travel points", "Milestone bonuses"],
      },
      creditCardJoiningFeeAmount: "Rs. 3,000",
      creditCardAnnualFeeAmount: "Rs. 3,000",
      cardNetwork: "Visa / Mastercard",
      moreInfo: {
        Fees: [
          "Joining fee: Rs. 3,000",
          "Renewal fee: Rs. 3,000",
          "Finance charges up to 3.99% p.m.",
        ],
        LoungeAccess: [
          "2 domestic and 2 international complimentary visits",
          "Additional $27 per visit beyond free quota",
        ],
      },
    },
    preApproved: false,
    rewardJson: {
      Travel: {
        rewardsPercent: "5% on travel",
        spendBased: {
          TravelPoints: {
            baseValue: 2,
            rewardDesc: "Earn 2 points on every Rs.100 spent, 5 points on travel expenditure",
            rules: [
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 2,
              },
              {
                expenseBase: 100,
                operator: "*",
                multiplicationFactor: 5,
              },
            ],
          },
        },
      },
    },
    priority: 1,
    isActive: 1,
    slug: "rbl-world-safari-credit-card",
    id: 37,
  },
  {
    value: "hdfc-diners-club-black-metal-edition-credit-card",
    program: "HDFC Bank",
    token: "7f3b9a6c-2d18-4f1a-9c2a-a1b2c3d4e5f6",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HDFC Diners Club Black Metal Edition Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/04/HDFC-Diners-Club-Black-Credit-Card.png.webp",
    applyLink: "https://www.hdfcbank.com/personal/resources/credit-cards/diners-club-black-metal",
    features: {
      creditCardSpecialOfferDetails:
        "Complimentary memberships (Marriott, Amazon Prime, Times Prime, MMT BLACK Elite) on spend, monthly milestone vouchers, unlimited domestic & international lounge access, 6 complimentary golf games per quarter, low forex mark-up (2%).",
      creditCardTermCondition:
        "Joining fee: Rs. 10,000 + taxes; Annual fee: Rs. 10,000 + taxes; Finance charges: 1.99% p.m.; Cash withdrawal fee: 2.5% or Rs.500 whichever is higher; Fee waiver on meeting milestone (renewal waiver on Rs. 8 Lakh annual spend).",
      creditCardOneLinerDescription:
        "Premium travel and lifestyle, 3.33% value-back across spends, unlimited lounge access, luxury memberships, 1:1 air-mile conversion",
      categories: ["Travel", "Rewards", "Lifestyle", "Dining", "Shopping", "Experience"],
      cardType: "Premium Travel & Rewards",
      isRupay: false,
      bestFeature: [
        "3.33% value-back across all spends",
        "Unlimited domestic & international lounge visits for primary & add-on",
        "1:1 reward point to air mile conversion",
        "Complimentary annual memberships (Marriott, Amazon Prime, Times Prime, MMT BLACK)",
        "Low forex mark-up fee of 2%",
        "6 complimentary golf games per quarter",
      ],
      bestSuitedFor: {
        Travel: [
          "Frequent international & domestic travellers",
          "Users who convert points to air miles",
          "Users who use SmartBuy for flights/hotels",
        ],
        Lifestyle: [
          "Users who value premium memberships",
          "High spenders seeking lounge & concierge services",
        ],
        Rewards: ["Users who want high value-back on everyday spends", "Point-to-mile converters"],
      },
      cardBenefits: [
        "5 reward points per Rs. 150 spent (base earning)",
        "Up to 10X reward points on SmartBuy (select categories)",
        "Convert reward points to air miles at 1 RP = 1 Air Mile",
        "Redeem points for travel bookings at 1 RP = ₹1 on SmartBuy",
        "Monthly milestone vouchers (₹500) on meeting spend thresholds",
        "Unlimited lounge access worldwide for primary & add-on users",
        "6 complimentary golf games per quarter",
        "Welcome & milestone membership benefits renewed on specified spends",
        "Low forex mark-up fee of 2%",
      ],
      creditCardJoiningFeeAmount: "Rs. 10,000",
      creditCardAnnualFeeAmount: "Rs. 10,000",
      creditCardAnnualFeeAdditionalText:
        "Renewal fee waiver available on yearly spends of Rs. 8,00,000",
      cardCategory: {
        Travel: "Travel",
        Rewards: "Rewards",
        Lifestyle: "Lifestyle",
        Dining: "Dining",
        Shopping: "Shopping",
        Experience: "Golf & Concierge",
      },
      cardNetwork: "Diners Club",
    },
    preApproved: false,
    rewardJson: {
      AllSpends: {
        rewardsPercent: "3.33",
      },
      SmartBuy: {
        rewardsPercent: "Up to 33",
      },
      PointToMile: {
        rewardsPercent: "1:1",
      },
      MaxPointsPerCycle: {
        rewardsPercent: "75000",
      },
    },
    priority: 1,
    isActive: 1,
    createdAt: "2025-10-31T19:18:49.126Z",
    updatedAt: "2025-10-31T19:18:49.126Z",
    id: 38,
  },
  {
    value: "bob-tiara-credit-card",
    program: "Bank of Baroda",
    token: "7f3b9a6c-2d18-4f1a-9c2a-a1b2c3d4e5f6",
    guid: "b9a2f1d4-8c3e-4d6a-9f7b-123456789abc",
    partnerId: 1024,
    pbcoOfferId: "pb-offer-2091",
    beaconUserIdentifier: "beacon-001-BOBTIARA",
    name: "BOB Tiara Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/BOB-Tiara-CC-Image.png.webp",
    applyLink: "https://www.bankofbaroda.in/cards/credit-cards/tiara",
    features: {
      creditCardSpecialOfferDetails:
        "Complimentary Amazon Prime, Disney+ Hotstar, Gaana Plus; Fitpass Pro 6 months; Swiggy One 3 months; Quarterly shopping & salon vouchers; Unlimited domestic lounge access on quarterly spends.",
      creditCardTermCondition:
        "Joining & Annual fee applicable; Rewards capped and exclusions apply; Fuel spends excluded from rewards; Terms & conditions apply.",
      creditCardOneLinerDescription:
        "Travel,Rewards,Shopping,Lifestyle,Domestic Lounge Access,Low Forex Fee,Complimentary Subscriptions,Women Health Benefits",
      categories: [
        "Travel",
        "Rewards",
        "Shopping",
        "Lifestyle",
        "Domestic Lounge Access",
        "Low Forex Fee",
        "Complimentary Subscriptions",
        "Women Health Benefits",
      ],
      cardType: "Lifestyle",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: false,
      bestFeature: [
        "Unlimited domestic lounge access",
        "Complimentary entertainment & fitness subscriptions",
      ],
      saveOnFeeToolTip: "Joining/annual fee reversible on meeting spend thresholds",
      bestSuitedFor: {
        primary: [
          "Frequent domestic travellers",
          "Lifestyle shoppers",
          "Dining & entertainment spenders",
        ],
        secondary: ["Users seeking bundled subscriptions", "Women who value health check benefits"],
      },
      cardBenefits: [
        "5X rewards on dining, travel and international spends (capped)",
        "3 RP per ₹100 on other spends",
        "1% fuel surcharge waiver (conditions apply)",
        "Low forex markup fee (2%)",
      ],
      moreInfo: {
        welcomeBenefits: [
          "Amazon Prime / Disney+ Hotstar / Gaana Plus (annual)",
          "Swiggy One (3 months)",
          "Fitpass Pro (6 months)",
        ],
        quarterlyVouchers: [
          "Nykaa ₹500",
          "Flipkart ₹500",
          "Myntra ₹500",
          "BookMyShow ₹250",
          "BigBasket ₹250",
          "Lakme Salon ₹1500",
        ],
      },
      creditCardJoiningFeeAmount: "Rs. 2,499 + Taxes",
      creditCardJoiningFeeAdditionalText: "Reversal on spending Rs. 25,000 in first 60 days",
      creditCardAnnualFeeAmount: "Rs. 2,499 + Taxes",
      creditCardAnnualFeeAdditionalText: "Annual fee waiver on spends of Rs. 2.5 Lakh in a year",
      cardOrientation: "Horizontal",
      cardCategory: {
        primary: "Travel & Lifestyle",
        secondary: "All-rounder",
      },
      cardCategoryDescription: {
        "Travel & Lifestyle": ["Travel benefits", "Lifestyle discounts", "Wellness benefits"],
      },
      voucherEligibility: "Spends/activation conditions apply",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 50,
          y: 220,
        },
        color: "#FFFFFF",
      },
      exclusivelyOnPb: false,
      trendingOffers: null,
      voucherValue: "Varies",
      maximumBenifits: 15000,
      effectiveFree: 0,
      cardNetwork: "VISA/Mastercard (varies by issuing branch)",
    },
    preApproved: false,
    rewardJson: {
      dining_travel_international: {
        rewardsPercent: "15 RP per ₹100",
        spendBased: {
          accelerated: {
            baseValue: 15,
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
                maxValue: 5000,
              },
            ],
            rewardDesc:
              "15 reward points per ₹100 on dining, travel & international transactions (5X equivalent)",
            subCategory: "Dining/Travel/International",
          },
        },
      },
      other_spends: {
        rewardsPercent: "3 RP per ₹100",
        spendBased: {
          base: {
            baseValue: 3,
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "3 reward points per ₹100 on other categories",
          },
        },
      },
      fuel: {
        rewardsPercent: "0",
        nonSpendBased: {
          fuelSurchargeWaiver: {
            baseValue: "1% waiver",
            rules: [
              {
                expenseBase: 400,
                operator: "min",
                multiplicationFactor: 1,
                maxValue: 4000,
              },
            ],
            rewardDesc: "1% fuel surcharge waiver between ₹400 and ₹4,000 (capped)",
          },
        },
      },
      redemption: {
        rewardsPercent: "1 RP per ₹0.25",
      },
    },
    priority: 5,
    pcoPriority: 2,
    slug: "bob-tiara-credit-card",
    isActive: 1,
    createdBy: "paisabazaar-scrape-2025",
    updatedBy: "paisabazaar-scrape-2025",
    additionalPayload: "{}",
    cardDisplay: 1,
    createdAt: "2025-10-24T18:24:00Z",
    updatedAt: "2025-10-24T18:24:00Z",
    sortOrder: "standard",
    isCrossSell: false,
    id: 39,
  },
  {
    value: "bank-of-baroda-eterna-credit-card",
    program: "Bank of Baroda",
    token: "9e2a7f13-1c4b-4e82-913e-97a2f5b3c791",
    guid: "b12a9e5d-6c3f-4e97-8a20-123456789abc",
    partnerId: 1024,
    pbcoOfferId: "pb-offer-3077",
    beaconUserIdentifier: "beacon-eterna-001",
    name: "Bank of Baroda Eterna Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/03/bob-eterna-credit-card.png.webp",
    applyLink:
      "https://www.bankofbaroda.in/personal-banking/cards/credit-cards/bob-eterna-credit-card",
    features: {
      creditCardSpecialOfferDetails:
        "Complimentary FitPass Pro membership worth ₹15,000, Buy 1 Get 1 on Paytm Movies, unlimited domestic lounge access on quarterly spends.",
      creditCardTermCondition:
        "Joining and annual fee of ₹2,499 each; joining fee waived on spends of ₹25,000 in 60 days; annual fee waived on ₹2.5L annual spends; 2% forex markup; reward exclusions apply.",
      creditCardOneLinerDescription:
        "Travel,Rewards,Lifestyle,Movies,Lounge Access,Low Forex Fee,Insurance",
      categories: [
        "Travel",
        "Rewards",
        "Shopping",
        "Lifestyle",
        "Movies",
        "Lounge Access",
        "Low Forex Fee",
        "Insurance",
      ],
      cardType: "Premium Lifestyle",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: false,
      bestFeature: [
        "Unlimited domestic lounge access",
        "Low 2% forex markup fee",
        "Complimentary FitPass Pro membership worth ₹15,000",
      ],
      saveOnFeeToolTip:
        "Joining fee reversal on ₹25,000 spend within 60 days; annual fee waiver on ₹2.5L yearly spends",
      bestSuitedFor: {
        primary: [
          "Frequent travellers",
          "Premium lifestyle users",
          "Online shoppers",
          "Dining enthusiasts",
        ],
        secondary: ["Movie lovers", "International spenders"],
      },
      cardBenefits: [
        "15 Reward Points per ₹100 on travel, international spends, dining, and online shopping",
        "3 Reward Points per ₹100 on all other spends",
        "Buy 1 Get 1 on Paytm Movies (max ₹250 on 2nd ticket)",
        "Unlimited domestic lounge access (on ₹40,000 quarterly spend)",
        "Personal accident insurance up to ₹1 crore",
        "1% fuel surcharge waiver (₹400–₹10,000 spends)",
      ],
      moreInfo: {
        welcomeBenefits: ["Complimentary FitPass Pro worth ₹15,000"],
        milestoneBenefits: [
          "10,000 bonus points on ₹50,000 spend in 60 days",
          "20,000 bonus points on ₹5 lakh annual spend",
        ],
        insuranceCoverage: [
          "Air Accidental Death – ₹1 crore",
          "Non-Air Accidental Death – ₹10 lakh",
        ],
      },
      creditCardJoiningFeeAmount: "₹2,499 + Taxes",
      creditCardJoiningFeeAdditionalText: "Waived on ₹25,000 spend within 60 days",
      creditCardAnnualFeeAmount: "₹2,499 + Taxes",
      creditCardAnnualFeeAdditionalText: "Waived on annual spends of ₹2.5 lakh",
      cardOrientation: "Horizontal",
      cardCategory: {
        primary: "Premium Lifestyle",
        secondary: "Travel & Rewards",
      },
      cardCategoryDescription: {
        "Premium Lifestyle": [
          "Lounge access",
          "Movies",
          "Dining",
          "Fitness benefits",
          "Travel rewards",
        ],
      },
      voucherEligibility: "Spend thresholds apply for benefits",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 50,
          y: 220,
        },
        color: "#FFFFFF",
      },
      exclusivelyOnPb: false,
      voucherValue: "Varies by milestone",
      maximumBenifits: 25000,
      effectiveFree: 0,
      cardNetwork: "MasterCard",
    },
    preApproved: false,
    rewardJson: {
      travel_dining_online_international: {
        rewardsPercent: "15 RP per ₹100",
        spendBased: {
          accelerated: {
            baseValue: 15,
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc:
              "15 reward points per ₹100 on travel, international, dining, and online transactions",
            subCategory: "Travel/Dining/International",
          },
        },
      },
      other_spends: {
        rewardsPercent: "3 RP per ₹100",
        spendBased: {
          base: {
            baseValue: 3,
            rules: [
              {
                expenseBase: 100,
                operator: "per",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "3 reward points per ₹100 on all other transactions",
          },
        },
      },
      fuel: {
        rewardsPercent: "0%",
        nonSpendBased: {
          fuelSurchargeWaiver: {
            baseValue: "1% waiver",
            rules: [
              {
                expenseBase: 400,
                operator: "min",
                multiplicationFactor: 1,
                maxValue: 10000,
              },
            ],
            rewardDesc: "1% fuel surcharge waiver between ₹400 and ₹10,000",
            subCategory: "Fuel",
          },
        },
      },
      redemption: {
        rewardsPercent: "1 RP per ₹0.25",
      },
    },
    priority: 5,
    pcoPriority: 2,
    slug: "bank-of-baroda-eterna-credit-card",
    isActive: 1,
    createdBy: "paisabazaar-sync-2025",
    updatedBy: "paisabazaar-sync-2025",
    additionalPayload: "{}",
    cardDisplay: 1,
    createdAt: "2025-10-31T18:35:00Z",
    updatedAt: "2025-10-31T18:35:00Z",
    sortOrder: "standard",
    isCrossSell: false,
    id: 40,
  },
  {
    value: "hpcl-bank-of-baroda-energie-credit-card",
    program: "Bank of Baroda",
    token: "",
    guid: "",
    partnerId: 101,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "HPCL Bank of Baroda ENERGIE Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/03/HPCL-Bank-of-Baroda-ENERGIE-Credit-Card-300x189.png.webp",
    applyLink:
      "https://www.bankofbaroda.in/personal-banking/cards/credit-cards/hpcl-bob-energie-credit-card",
    features: {
      creditCardSpecialOfferDetails:
        "Up to 6.5% savings on HPCL fuel spends, 4 free domestic lounge visits per year, 25% off on movie tickets via District App.",
      creditCardTermCondition:
        "Offer applicable on HPCL fuel spends through HP Pay app and BoB network. Annual fee waiver on ₹50,000 yearly spend.",
      creditCardOneLinerDescription:
        "Fuel savings, lounge access, movie discounts, utility rewards, low annual fee",
      categories: ["Fuel", "Lounge Access", "Movies", "Utility Rewards", "Annual Fee"],
      cardType: "Fuel",
      isRupay: true,
      isSecuredCard: false,
      isRedirect: true,
      redirectUrl:
        "https://www.bankofbaroda.in/personal-banking/cards/credit-cards/hpcl-bob-energie-credit-card",
      bestFeature: [
        "Up to 6.5% fuel savings at HPCL outlets",
        "1.5% extra Payback Points on HP Pay App",
        "4 complimentary domestic lounge visits per year",
        "25% movie discount via District App",
        "Annual fee waiver on ₹50,000 yearly spend",
      ],
      saveOnFeeToolTip: "Spend ₹50,000 annually to waive off renewal fee.",
      bestSuitedFor: {
        category: ["Fuel", "Utilities", "Movies"],
      },
      cardBenefits: [
        "4% savings (24 Reward Points per ₹150) on HPCL fuel spends",
        "1% fuel surcharge waiver (up to ₹100/month)",
        "1.5% additional cashback via HP Pay App",
        "10 reward points per ₹150 on departmental and utility spends",
        "2 reward points per ₹150 on other spends including UPI",
      ],
      moreInfo: {
        welcomeBenefit: ["500 bonus Reward Points on spending ₹5,000 within 60 days"],
        renewalFeeWaiver: ["Fee waived on ₹50,000 annual spend"],
      },
      creditCardJoiningFeeAmount: "₹499",
      creditCardJoiningFeeAdditionalText: "+ Applicable Taxes",
      creditCardJoiningFeeDescription: "One-time joining fee",
      creditCardAnnualFeeAmount: "₹499",
      creditCardAnnualFeeAdditionalText: "+ Applicable Taxes",
      creditCardAnnualFeeDescription: "Waived off on ₹50,000 annual spend",
      cardOrientation: "horizontal",
      cardCategory: {
        Fuel: "Fuel Benefits",
      },
      cardCategoryDescription: {
        Fuel: [
          "Up to 6.5% savings on HPCL fuel spends",
          "1.5% cashback via HP Pay App",
          "1% surcharge waiver",
        ],
      },
      seoLink: "hpcl-bank-of-baroda-energie-credit-card",
      voucherEligibility: "Eligible for HP Pay and Payback rewards",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 25,
          y: 90,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: null,
      voucherValue: "₹500 Bonus Points",
      maximumBenifits: 6500,
      effectiveFree: 50000,
      cardNetwork: "RuPay",
    },
    preApproved: false,
    rewardJson: {
      Fuel: {
        rewardsPercent: "6.5",
        spendBased: {
          fuelSavings: {
            baseValue: 6.5,
            rules: [
              {
                expenseBase: 100,
                operator: ">=",
                multiplicationFactor: 0.065,
              },
            ],
            rewardDesc: "Up to 6.5% savings on HPCL fuel spends",
            subCategory: "Fuel",
          },
        },
      },
      Movies: {
        rewardsPercent: "25",
        spendBased: {
          movieOffer: {
            baseValue: 25,
            rules: [
              {
                expenseBase: 2,
                operator: ">=",
                multiplicationFactor: 0.25,
              },
            ],
            rewardDesc: "25% off (up to ₹100) twice a month via District App",
            subCategory: "Movies",
          },
        },
      },
    },
    priority: 2,
    slug: "hpcl-bob-energie-credit-card",
    isActive: 1,
    createdBy: "system",
    updatedBy: "system",
    additionalPayload: "",
    cardDisplay: 1,
    createdAt: "2025-10-31T22:20:00.000Z",
    updatedAt: "2025-10-31T22:20:00.000Z",
    sortOrder: "2",
    isCrossSell: false,
    id: 41,
  },
  {
    value: "american-express®-platinum-reservesm-credit-card",
    program: "American Express",
    token: "",
    guid: "",
    partnerId: 0,
    pbcoOfferId: "",
    beaconUserIdentifier: "",
    name: "American Express® Platinum ReserveSM Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/06/American-Express%C2%AE-Platinum-Travel-Credit-Card.png.webp",
    applyLink: "",
    features: {
      creditCardSpecialOfferDetails:
        "Currently, American Express is not accepting new card applications.",
      creditCardTermCondition:
        "Terms and conditions apply. Visit American Express website for details.",
      creditCardOneLinerDescription:
        "Brand Voucher, Rewards, Shopping, Dining, Utilities, Bill Payments",
      categories: ["Shopping", "Rewards", "Dining", "Utilities", "Bill Payments", "Brand Voucher"],
      cardType: "Premium",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: false,
      bestFeature: [
        "Complimentary Taj Epicure membership (worth Rs. 25,000)",
        "Complimentary Accor Plus Silver Tier membership",
        "Monthly voucher worth Rs. 1,000 on spending Rs. 50,000",
        "100% annual fee waiver on spending Rs. 10 lakh annually",
        "EazyDiner Prime membership (worth Rs. 2,395)",
      ],
      bestSuitedFor: {
        "High Spenders": ["Monthly spenders of Rs. 50,000+", "Can reach Rs. 10 lakh annual spend"],
        Travelers: [
          "Frequent hotel stays at Taj and Accor properties",
          "Domestic and international travelers",
        ],
        Lifestyle: ["Golf enthusiasts", "Regular diners", "Movie and shopping lovers"],
      },
      cardBenefits: [
        "Welcome bonus: 11,000 reward points on paying annual fee and spending Rs. 30,000 in 90 days",
        "Monthly milestone: Rs. 1,000 voucher (Flipkart, BookMyShow, Shoppers Stop, Myntra, BigBasket, PVR, MakeMyTrip) on Rs. 50,000 spend",
        "1 Membership Rewards Point per Rs. 50 spent (2% earn rate)",
        "3X rewards on select brands via Rewards Multiplier",
        "12 complimentary domestic lounge visits per year (max 3 per quarter)",
        "Complimentary Priority Pass membership with 2 free international lounge visits per year",
        "Taj Epicure membership (worth Rs. 25,000) - free stays, meals, discounts at Taj properties",
        "Accor Plus Silver Tier membership - discounted stays, late check-out, health club access",
        "EazyDiner Prime membership - 25% discount at select restaurants, 2X EazyPoints",
        "2 complimentary golf rounds per month (max 24 per year) on Rs. 50,000 monthly spend",
        "Up to 20% dining discount at select restaurants",
        "Dedicated concierge service 24x7",
        "0% fuel convenience fee on purchases below Rs. 5,000 at HPCL",
        "Purchase protection for 60 days",
        "Lost card liability protection",
        "EMI conversion available on purchases Rs. 5,000+",
        "Contactless payment enabled",
      ],
      moreInfo: {
        "Redemption Options": [
          "Products/vouchers/travel: 1 MR Point = Rs. 0.25 (0.5% value)",
          "Asia Miles, British Airways, Emirates, Etihad, Qatar, Singapore Airlines, Virgin Atlantic: 2:1",
          "Club Vistara: 3:1",
          "Marriott Bonvoy: 1:1",
          "Hilton Honors: 1,000 Points = 900 Hilton Points",
          "Can use points to pay card charges",
        ],
        "Major Drawbacks": [
          "Poor reward rate of 0.5% (vs 3.33% on HDFC Infinia, 3% on ICICI Emeralde)",
          "Limited lounge access: only 12 domestic + 2 international per year",
          "High forex markup of 3.5% (vs 2% on competitors)",
          "Welcome benefit worth only Rs. 2,750 (25% of annual fee)",
          "No free renewal benefits",
        ],
        "Competitors Comparison": [
          "HDFC Infinia: Unlimited lounge access, 3.33% rewards, Rs. 12,500 renewal benefits",
          "ICICI Emeralde Private: Unlimited lounge access, 3% rewards, Rs. 12,500 renewal benefits",
          "HDFC Diners Club Black: Unlimited lounge, 3.33% rewards, Rs. 10,000 fee",
          "Axis Magnus: Unlimited lounge, better rewards, Rs. 12,500 fee",
        ],
        "Annual Benefits Summary": [
          "Monthly vouchers: Rs. 12,000 (at Rs. 50,000 x 12 months spend)",
          "Taj Epicure membership: Rs. 25,000 value",
          "Accor Plus membership: High value for frequent travelers",
          "EazyDiner Prime: Rs. 2,395 value",
          "Golf rounds: 24 rounds per year (at Rs. 50,000 monthly spend)",
          "Priority Pass: $99 value",
        ],
      },
      creditCardJoiningFeeAmount: "₹10,000",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "No joining fee waiver available",
      creditCardAnnualFeeAmount: "₹10,000",
      creditCardAnnualFeeAdditionalText: "Waived on annual spend of ₹10 lakh",
      creditCardAnnualFeeDescription:
        "100% annual fee waiver on spending Rs. 10 lakh in the preceding year. No other fee waivers available.",
      cardOrientation: "horizontal",
      cardCategory: {
        primary: "Premium",
        secondary: "Travel",
        tertiary: "Lifestyle",
      },
      cardCategoryDescription: {
        Premium: [
          "High-end hotel memberships",
          "Concierge service",
          "Golf privileges",
          "Premium dining benefits",
        ],
        Travel: [
          "Domestic and international lounge access",
          "Taj Epicure membership",
          "Accor Plus membership",
          "Travel vouchers",
        ],
        Lifestyle: [
          "Monthly shopping/movie vouchers",
          "EazyDiner Prime",
          "Golf rounds",
          "Dining discounts",
        ],
        Rewards: ["1 point per Rs. 50 spent", "3X on select brands", "Flexible redemption options"],
      },
      seoLink: "american-express-platinum-reserve-credit-card",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 50,
          y: 70,
        },
        color: "#FFFFFF",
      },
      exclusivelyOnPb: false,
      voucherValue: "₹12,000",
      maximumBenifits: 50000,
      effectiveFree: 0,
      cardNetwork: "American Express",
    },
    preApproved: false,
    rewardJson: {
      default: {
        rewardsPercent: "2",
        spendBased: {
          welcomeBonus: {
            baseValue: 11000,
            rules: [
              {
                expenseBase: 30000,
                operator: ">=",
                multiplicationFactor: 1,
                maxValue: 11000,
              },
            ],
            rewardDesc:
              "11,000 bonus points (worth Rs. 2,750) on paying annual fee and spending Rs. 30,000 within 90 days",
            subCategory: "Welcome Benefit",
          },
          monthlyMilestone: {
            baseValue: 1000,
            rules: [
              {
                expenseBase: 50000,
                operator: ">=",
                multiplicationFactor: 1,
                maxValue: 1000,
              },
            ],
            rewardDesc:
              "Rs. 1,000 voucher on monthly spend of Rs. 50,000 (Flipkart, BookMyShow, Shoppers Stop, Myntra, BigBasket, PVR, MakeMyTrip)",
            subCategory: "Monthly Milestone",
          },
          annualFeeWaiver: {
            baseValue: 10000,
            rules: [
              {
                expenseBase: 1000000,
                operator: ">=",
                multiplicationFactor: 1,
                maxValue: 10000,
              },
            ],
            rewardDesc: "100% annual fee waiver (Rs. 10,000) on spending Rs. 10 lakh annually",
            subCategory: "Annual Benefit",
          },
          golfBenefit: {
            baseValue: 2,
            rules: [
              {
                expenseBase: 50000,
                operator: ">=",
                multiplicationFactor: 1,
                maxValue: 2,
              },
            ],
            rewardDesc:
              "2 complimentary golf rounds per month (max 24 per year) on monthly spend of Rs. 50,000",
            subCategory: "Golf Privilege",
          },
        },
        nonSpendBased: {
          tajEpicure: {
            baseValue: 25000,
            rules: [],
            rewardDesc:
              "Complimentary Taj Epicure membership (worth Rs. 25,000) - free stays, meals, F&B discounts at Taj properties",
          },
          accorPlus: {
            baseValue: "High",
            rules: [],
            rewardDesc:
              "Complimentary Accor Plus Silver Tier membership - discounted stays, late check-out, health club access",
          },
          eazyDiner: {
            baseValue: 2395,
            rules: [],
            rewardDesc:
              "EazyDiner Prime membership (worth Rs. 2,395) - 25% discount at restaurants, 2X EazyPoints",
          },
          priorityPass: {
            baseValue: 99,
            rules: [],
            rewardDesc:
              "Complimentary Priority Pass membership (worth $99) with 2 free international lounge visits per year",
          },
          domesticLounge: {
            baseValue: 12,
            rules: [],
            rewardDesc:
              "12 complimentary domestic airport lounge visits per year (max 3 per quarter)",
          },
        },
      },
      shopping: 2,
      groceries: 2,
      travel: 2,
      dining: 2,
      entertainment: 2,
      apparel: 2,
      fuel: 0,
      utilities: 0,
      insurance: 0,
      selectBrands: 6,
    },
    priority: 0,
    pcoPriority: 0,
    slug: "american-express-platinum-reserve-credit-card",
    isActive: 0,
    sortOrder: "0",
    isCrossSell: false,
    id: 42,
  },
  {
    priority: 1,
    program: "PA",
    token: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    guid: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    pbcoOfferId: "7f0c8484-1a16-4820-9eea-02ffce601bab",
    beaconUserIdentifier: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    preApproved: true,
    pcoPriority: 1,
    partnerId: 67,
    name: "IndusInd Bank Legend Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/12/IndusInd-Bank-Legend-Credit-Card.png.webp",
    slug: "legend-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"visa":{"productCode":"654","pctCode":"I01","wgCode":"13"}}',
    cardDisplay: 1,
    createdAt: "2020-01-27T09:54:05.000Z",
    updatedAt: "2025-09-29T06:57:51.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 50, "travel": 180, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 360, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "Get complimentary Golf games and lessons each month*",
      creditCardTermCondition:
        "https://www.indusind.com/content/dam/indusind-corporate/schedule-of-charges/credit-cards/MITC_Premium.pdf",
      creditCardOneLinerDescription: "Rewards,Travel,Movies",
      categories: ["Rewards", "Travel", "Movies"],
      cardType: "general",
      isRupay: false,
      bestFeature: [
        "Buy 1 Get 1 offer on BookMyShow",
        "2X rewards on weekends",
        "Low forex markup fee of 1.8%",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Travel: ["Priority Pass membership, forex mark-up fee of 1.8%"],
        Movies: ["Buy 1 Get 1 offer on BookMyShow movie tickets every month"],
        Rewards: ["Up to 2 reward points for every spend of Rs. 100"],
      },
      cardBenefits: [
        "Multiple card activation benefits from leading hotel chains like Oberoi Hotels, Postcard Hotels and Resorts*",
        "Bonus 3,000 reward points on spending Rs. 5 lakh or more in a year",
        "Multiple reward redemption options including airmiles and cash credit",
        "Complimentary auto assist and concierge service",
      ],
      moreInfo: {
        "Welcome Benefits": [
          "Benefits on Oberoi Hotels, Postcard Hotels and Resorts, Montblanc, Vouchagram and complimentary Luxe gift card*",
        ],
        "Rewards Benefits": [
          "1 reward point for every Rs. 100 spent on weekdays",
          "2 reward points for every Rs. 100 spent on weekends",
          "100 reward points = 100 Miles on the partner airlines",
          "Value of 1 reward point = Rs. 0.50 for cash credit",
          "Value of 1 reward point = Rs. 0.75 for non-cash redemption (IndusMoments and Pay with Rewards)",
        ],
        "Travel Benefits": [
          "Low forex markup fees of 1.8% on international spends",
          "Priority Pass Membership for primary and add-on members",
        ],
        "Milestone Benefits": ["3,000 bonus reward points on spending Rs. 5 lakh in a year "],
        "Movie Benefits": [
          "Buy 1 get 1 movie ticket offer on BookMyShow, up to Rs. 200 off per month and Rs. 50 off on food & beverages",
        ],
        "Insurance Benefits": [
          "Personal air accident insurance cover of Rs. 25 lakh",
          "Lost card liability cover up to the credit limit, under IndusInd Bank's Total Protect Program",
          "Cover for lost baggage worth Rs. 1 lakh & cover for delayed baggage worth Rs. 25,000",
          "Insurance cover for loss of passport worth Rs. 50,000",
          "Lost ticket & missed connection cover of Rs. 25,000 each",
        ],
        Fuel: [
          "1% fuel surcharge waiver for all your fuel transactions value of Rs. 400 to Rs. 4,000",
        ],
        Disclaimer: [
          "*Welcome benefit applicable only on payment of joining fee, not with lifetime-free cards",
        ],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "0",
      creditCardAnnualFeeAdditionalText: "",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Visa",
      cardCategory: {
        Movies: "movies",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        movies: [
          "12 free movie tickets in a year",
          "2 reward points per Rs. 100 spent on weekends",
          "1 reward point per Rs. 100 spent on weekdays",
        ],
      },
      seoLink: "https://www.paisabazaar.com/indusind-bank/indusind-bank-legend-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "2.00",
        nonSpendBased: {
          domesticAirportLounge: {
            baseValue: "750",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc: "Domestic Airport Lounge",
          },
          priorityPass: {
            baseValue: "3500",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Priority Pass",
          },
        },
        spendBased: {},
      },
      shopping: {
        rewardsPercent: "2.00",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "2.00",
        nonSpendBased: {
          easyDiner: {
            baseValue: "750",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Easy Diner",
          },
        },
      },
      movies: {
        rewardsPercent: "2.00",
        nonSpendBased: {},
        spendBased: {
          discount: {
            baseValue: "200",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc: "Discount",
          },
        },
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 2400,
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {
          golf: {
            baseValue: "1000",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc: "Golf",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "indusind-bank-legend-credit-card",
    id: 43,
  },
  {
    priority: 2,
    program: "PA",
    token: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    guid: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    pbcoOfferId: "75226102-f455-45da-9294-92a44a471b3b",
    beaconUserIdentifier: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    preApproved: true,
    pcoPriority: 2,
    partnerId: 67,
    name: "Indusind Platinum Credit Card",
    image: "https://static.paisabazaar.com/components/images/credit_card/small_images/305.png",
    slug: "indusind-bank-platinum-credit-cards",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"visa":{"productCode":"676","pctCode":"I01","wgCode":"13"},"mastercard":{"productCode":"684","pctCode":"I01","wgCode":"13"}}',
    cardDisplay: 1,
    createdAt: "2019-08-19T07:41:40.000Z",
    updatedAt: "2025-09-29T07:03:03.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 390, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "Enjoy 1% Fuel surcharge waiver within India*",
      creditCardTermCondition:
        "https://www.indusind.com/content/dam/indusind-corporate/schedule-of-charges/credit-cards/MITC_Premium.pdf",
      creditCardOneLinerDescription: "Rewards,Fuel,Shopping",
      categories: ["Rewards", "Fuel", "Shopping"],
      cardType: "general",
      isRupay: false,
      bestFeature: [
        "Lifetime free credit card",
        "Earn 1.5 reward points every Rs. 150 spent",
        "Convert reward points into Air Miles",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Rewards: ["1.5 reward points for every Rs. 150 spent "],
        Travel: ["Redeem reward points against InterMiles/Krisflyer miles"],
      },
      cardBenefits: [
        "Lifetime free credit card",
        "Redeem accumulated rewards against IndusMoments, Singapore Airlines, InterMiles, Cash Credit & Pay with Rewards",
        "Comprehensive insurance cover for travel-related issues",
      ],
      moreInfo: {
        "Welcome Benefits": [
          "Benefits from Montblanc, The Postcard Hotel, Vouchagram and a complimentary Luxe gift card*",
          "*Welcome benefit applicable only on payment of joining fee, not with lifetime-free cards.",
        ],
        "Rewards Program": [
          "1.5 reward points for every Rs. 150 spent",
          "0.7 reward points for every Rs.100 spent on utility bills, insurance premium, education & Government services",
          "Value of 1 reward point= Up to 1 Airmile (Airmile partners: Krisflyer & InterMiles)",
          "Value of 1 reward point = Rs. 0.40 for cash credit",
          "Value of 1 reward point= Rs. 0.60 for non-cash redemption (IndusMoments, Pay with Rewards)",
          "Maximum 2500 reward points are allowed for cash redemption every month",
        ],
        "Insurance cover": [
          "Air accident insurance cover of up to Rs. 25 lakh",
          "Cover for lost baggage worth Rs. 1 lakh & cover for delayed baggage worth Rs. 25,000",
          "Insurance cover for loss of passport worth Rs. 50,000",
          "Lost ticket & missed connection cover of Rs. 25,000 each",
        ],
        Fuel: [
          "1% fuel surcharge waiver for all fuel transaction valued between Rs. 400 and Rs. 4,000",
        ],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "0",
      creditCardAnnualFeeAdditionalText: "",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {},
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        utilities: [
          "0.7 reward points per Rs.100 on utilities",
          "1 RP per Rs. 150 on other eligible spends",
          "Convert reward points into Air Miles",
        ],
      },
      seoLink: "https://www.paisabazaar.com/indusind-bank/indusind-bank-platinum-credit-cards/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "1.00",
        spendBased: {},
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "1.00",
        spendBased: {},
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "1.00",
        spendBased: {},
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "1.00",
        spendBased: {},
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "^",
                multiplicationFactor: 0.01,
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {},
      },
    },
    isCrossSell: "true",
    value: "indusind-platinum-credit-card",
    id: 44,
  },
  {
    priority: 4,
    program: "PA",
    token: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    guid: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    pbcoOfferId: "36b4e8c3-f344-42cb-87a0-7d74edd4505a",
    beaconUserIdentifier: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    preApproved: true,
    pcoPriority: 3,
    partnerId: 67,
    name: "EazyDiner IndusInd Platinum Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2022/01/EazyDiner-IndusInd-Bank-Credit-Card.png.webp",
    slug: "eazydiner-ibl-platinum-credit-card",
    isActive: 1,
    createdBy: "2025-03-18 09:45:02",
    updatedBy: "2025-03-18 09:45:02",
    additionalPayload: '{"visa":{"productCode":"703","pctCode":"W52","wgCode":"682"}}',
    cardDisplay: 1,
    createdAt: "2025-03-18T04:15:02.000Z",
    updatedAt: "2025-09-29T07:02:28.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 370, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "EazyDiner Prime membership",
      creditCardTermCondition: "",
      creditCardOneLinerDescription: "Dining",
      categories: ["Dining", "Cashback", "Rewards"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "EazyDiner Prime membership",
        "Extra 20% off on dining bills",
        "Lifetime free offer",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Dining: ["Extra 20% off (up to Rs. 500) on dining bills via PayEazy"],
        Cashback: ["Up to 2 reward points for every Rs. 100 spent"],
      },
      cardBenefits: [
        "3 months EazyDiner Prime membership and 500 bonus EazyPoints on card activation",
        "Renewal of EazyDiner Prime membership and bonus 2,000 reward points on spending Rs. 30,000 in every 90 days",
        "Up to 2 reward points for every Rs. 100 spent",
      ],
      moreInfo: {
        "Welcome Benefits": [
          "3 months EazyDiner Prime membership worth Rs. 1,095 with up to 50% off on dining bills",
          "2X EazyPoints on all spends redeemable across hotel stays & free meals and bonus 500 EazyPoints",
        ],
        "Dining Discount": [
          "Extra 20% off on dining bills up to Rs. 500 via PayEazy, up to three times every month",
        ],
        "Reward Structure": [
          "2 reward points for every Rs. 100 spent (Except fuel)",
          "0.7 reward points for every Rs. 100 spent on Insurance, Rent, Utility and Government spends",
          "Value of 1 reward point Rs. 0.2 (20 paise)",
        ],
        "Renewal Benefits": [
          "On spending Rs. 30,000 in 90 days, renewal of EazyDiner Prime membership for three months",
        ],
        "Milestone Benefits": ["2,000 bonus reward points, on spends of Rs. 30,000 in 90 days"],
        "Fuel Benefits": [
          "1 % fuel surcharge waiver on transactions ranging between Rs. 400 and Rs. 4,000",
        ],
        "Insurance Benefits": ["Total Protect Cover with sum up to the credit limit"],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "0",
      creditCardAnnualFeeAdditionalText: "",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {},
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {},
      seoLink: "https://www.paisabazaar.com/indusind-bank/eazy-diner-indusind-bank-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      fuel: 5000,
      movies: 5000,
      travel: 5000,
      cashback: 140,
      topRated: 5000,
      utilities: 5000,
      pbRecommended: 480,
      onlineShopping: 5000,
    },
    value: "eazydiner-indusind-platinum-credit-card",
    id: 45,
  },
  {
    priority: 3,
    program: "PA",
    token: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    guid: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    pbcoOfferId: "b0c7e60a-b799-4ebf-a86b-ab37d9af82e4",
    beaconUserIdentifier: "bo8ArOjJXyiCvJXAqcxP1Vr7gLYefRL-uFaw09bVHno9mh",
    preApproved: true,
    pcoPriority: 4,
    partnerId: 67,
    name: "IndusInd Bank Platinum Aura Edge Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/12/IndusInd-Bank-Platinum-Aura-Edge-Credit-Card.png.webp",
    slug: "platinum-aura-edge-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"mastercard":{"productCode":"652","pctCode":"","wgCode":"13"}}',
    cardDisplay: 1,
    createdAt: "2020-01-27T09:54:05.000Z",
    updatedAt: "2025-09-29T07:04:26.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 80, "pbRecommended": 390, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "Earn up to 4X rewards points on select merchant categories",
      creditCardTermCondition:
        "https://www.indusind.com/content/dam/indusind-corporate/schedule-of-charges/credit-cards/MITC_Premium.pdf",
      creditCardOneLinerDescription: "Rewards,Shopping,Dining",
      categories: ["Rewards", "Shopping", "Dining"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "Up to 8X rewards on every spend",
        "Flexibility to choose from 4 reward plans",
        "Use rewards for CV Points, InterMiles etc.",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Rewards: ["Up to 4 reward points for every Rs. 100 spent via card"],
      },
      cardBenefits: [
        "Choose between Home, Party, Travel and Shop rewards plan",
        "Redeem reward points against IndusMoments, InterMiles, Cash Credit & Pay with Rewards",
      ],
      moreInfo: {
        "Rewards Benefits": [
          "Up to 4 reward points per Rs. 100 spent on departmental stores, grocery, hotels and restaurants",
          "Up to 2.5 reward points per Rs. 100 spent on phone bills, electronic bills, airline tickets",
          "Up to 2 reward points per Rs. 100 spent on purchase of consumer durables, electronic items",
          "Up to 1.5 reward points per Rs. 100 spent on books, insurance, medical spends, car rental, railways & movie",
          "0.5 reward points on all other spends (expect fuel)",
          "1 Reward Point equals to Rs. 0.35 cash credit, or 0.5 Airline Mile, or equals 0.5 CV Points",
        ],
        "Insurance Benefits": [
          "Get air accident insurance cover of up to Rs. 25 lakh",
          "Cover for lost baggage worth Rs. 1 lakh & cover for delayed baggage worth Rs. 25,000",
          "Insurance cover for loss of passport worth Rs. 50,000",
          "Lost ticket & missed connection cover of Rs. 25,000 each",
        ],
        Fuel: [
          "1% fuel surcharge waiver for all your fuel transactions of value from Rs. 400 to Rs. 4,000",
        ],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "0",
      creditCardAnnualFeeAdditionalText: "",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Mastercard",
      cardCategory: {
        Utilities: "utilities",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        utilities: [
          "1.4 rewards per Rs. 100 spent on utilities",
          "Flexibility to choose from 4 reward plans",
          "Up to 8X rewards on every spend",
        ],
      },
      seoLink: "https://www.paisabazaar.com/indusind-bank/platinum-aura-edge-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "2.00",
        spendBased: {},
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "2.00",
        spendBased: {},
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "2.00",
        spendBased: {},
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "2.00",
        spendBased: {},
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "^",
                multiplicationFactor: 0.01,
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        spendBased: {},
        nonSpendBased: {},
      },
    },
    isCrossSell: "true",
    value: "indusind-bank-platinum-aura-edge-credit-card",
    id: 46,
  },
  {
    priority: 1,
    program: "PA",
    token: "fnbn8AXtoC0ViA8ydTLeYvdab5YHJw2N-9F9mhLyRuJO9r",
    guid: "fnbn8AXtoC0ViA8ydTLeYvdab5YHJw2N-9F9mhLyRuJO9r",
    pbcoOfferId: "c71731f8-b62d-48e4-a103-764c9efbe6c5",
    beaconUserIdentifier: "fnbn8AXtoC0ViA8ydTLeYvdab5YHJw2N-9F9mhLyRuJO9r",
    preApproved: true,
    pcoPriority: 5,
    partnerId: 66,
    name: "RBL Bank Paisabazaar DUET Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2025/01/Duet-card.png.webp",
    slug: "rbl-titanium-delight-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"externalCardId":"61","externalCardName":"Paisabazaar CL 500","externalOfferCode":null}',
    cardDisplay: 1,
    createdAt: "2017-10-09T13:53:20.000Z",
    updatedAt: "2025-08-06T15:26:12.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 130, "topRated": 5000, "utilities": 5000, "pbRecommended": 350, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "1% cashback on online & offline spends*",
      creditCardTermCondition:
        "https://drws17a9qx558.cloudfront.net/document/Credit%20Cards/RBL-MITC-final.pdf",
      creditCardOneLinerDescription: "Cashback,XpressCash",
      categories: ["Cashback", "XpressCash", "EMI Service"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: true,
      redirectUrl: "https://www.paisabazaar.com/digital-lending/",
      bestFeature: [
        "1% cashback on all online & offline spends",
        "2in1 Product: Credit Card + Credit Line",
        "Convert purchases into Easy EMIs",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Cashback: ["1% cashback on online as well as offline transactions"],
      },
      cardBenefits: [
        "Cash transfer by XpressCash programme",
        "Easy EMI conversion of card purchases for repayment",
      ],
      moreInfo: {
        "Cashback Benefits": [
          "1% cashback on all your online and POS transactions capped at Rs.500 per month",
          "Cashback not applicable on fuel, wallet loading, rent and Cash/ loan transactions",
        ],
        "Money Transfer": [
          "You can transfer min. Rs. 3,000 and up to your credit limit to your registered bank account using RBL MyCard mobile App",
        ],
        "EMI Service": ["Convert purchases into easy EMIs to repay in installments"],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "0",
      creditCardAnnualFeeAdditionalText: "",
      creditCardAnnualFeeDescription: "Lifetime Free",
      cardOrientation: "vertical",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        Cashback: "cashback",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        cashback: [
          "1% cashback on all card spends",
          "Cash transfer by XpressCash programme",
          "Buy now pay later in easy EMIs",
        ],
      },
      seoLink: "https://www.paisabazaar.com/paisabazaar-duet/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 3,
          y: 16,
        },
        color: "#ffffff",
      },
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "1.00",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 700000,
            rate: 1,
          },
          {
            minExpense: 700000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "1.00",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 700000,
            rate: 1,
          },
          {
            minExpense: 700000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "1.00",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 700000,
            rate: 1,
          },
          {
            minExpense: 700000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "0.88",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 700000,
            rate: 1,
          },
          {
            minExpense: 700000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        nonSpendBased: {},
        spendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "^",
                multiplicationFactor: 0.01,
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {},
      },
    },
    isCrossSell: "true",
    value: "rbl-bank-paisabazaar-duet-credit-card",
    id: 47,
  },
  {
    priority: 1,
    program: "PQ",
    token: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    guid: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    pbcoOfferId: "521f5df7-b6fe-4508-b3ba-47e0190fb789",
    beaconUserIdentifier: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    preApproved: true,
    pcoPriority: 6,
    partnerId: 27,
    name: "Axis Bank Ace Visa Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2019/10/axis-bank-ace-credit-card.jpg",
    slug: "axis-ace-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"productCode":"521","promoCode":"pn2"}',
    cardDisplay: 1,
    createdAt: "2023-08-23T20:15:58.000Z",
    updatedAt: "2025-10-06T13:21:15.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 200, "cashback": 110, "topRated": 5000, "utilities": 40, "pbRecommended": 270, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "Unlimited 5% cashback on Flipkart",
      creditCardTermCondition:
        "https://www.axisbank.com/docs/default-source/default-document-library/mitc-credit-cards.pdf",
      creditCardOneLinerDescription: "Shopping,Travel,Fuel",
      categories: ["Shopping", "Travel", "Fuel"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "5% cashback on bill payments & recharges",
        "4% cashback on Swiggy, Zomato & Ola",
        "Up to 15% discount on dining bills",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Cashback: [
          "5% cashback on bill payments & recharges via Google Pay  and 4% cashback on Swiggy, Zomato & Ola",
        ],
      },
      cardBenefits: [
        "5% cashback on utility bill payments, DTH recharges and mobile recharges via Google Pay",
        "4% cashback on transactions at Swiggy, Zomato and Ola",
      ],
      moreInfo: {
        "Cashback Benefits": [
          "5% cashback on utility bill payments, DTH recharges and mobile recharges via Google Pay",
          "4% cashback on transactions at Swiggy, Zomato and Ola",
          "1.5% cashback on spends across other categories",
        ],
        "Lounge Access": [
          "4 domestic lounge visits in a year on spending min. Rs. 50,000 during the previous 3 months",
        ],
        "Fuel Benefits": [
          "1% fuel surcharge waiver (Max. Rs. 500 p.m.) on fuel spends between Rs. 400 and Rs. 4,000",
        ],
        "Dining Benefits": [
          "Up to 15% discount on dining at partner restaurants under the Dining Delights program",
        ],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Waived off on annual spends of Rs. 2 lakh",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        Utilities: "utilities",
        Cashback: "cashback",
        Travel: "travel",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        cashback: [
          "5% back on utility payments via Google Pay",
          "5% back on DTH recharges via Google Pay",
          "5% back on mobile recharges via Google Pay",
        ],
        utilities: [
          "5% back on bill payments via Google Pay",
          "4% back on Swiggy, Zomato and Ola",
          "1.5% back on other retail spends",
        ],
        travel: [
          "Spend Based Complimentary Lounge Access",
          "5% cashback on bill payments & recharges",
          "4% cashback on Swiggy, Zomato & Ola",
        ],
      },
      seoLink: "https://www.paisabazaar.com/axis-bank/ace-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 3,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "1.50",
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "5.00",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "2.75",
        nonSpendBased: {},
        spendBased: {
          diningDiscount: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.15,
                maxValue: 6000,
              },
            ],
            rewardDesc: "Dining Discount",
          },
        },
      },
      movies: {
        rewardsPercent: "1.50",
        spendBased: {},
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuel: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 6000,
              },
            ],
            rewardDesc: "Fuel",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          feeWaiver: {
            baseValue: "499",
            rules: [
              {
                expenseBase: 199999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Fee Waiver",
          },
          domesticLoungAccess: {
            baseValue: "750",
            subCategory: "travel",
            rules: [
              {
                expenseBase: 199999,
                operator: ">",
                multiplicationFactor: 4,
              },
              {
                expenseBase: 149999,
                operator: ">",
                multiplicationFactor: 3,
              },
              {
                expenseBase: 99999,
                operator: ">",
                multiplicationFactor: 2,
              },
              {
                expenseBase: 49999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Domestic Lounge Access",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "axis-bank-ace-visa-credit-card",
    id: 48,
  },
  {
    priority: 2,
    program: "PQ",
    token: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    guid: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    pbcoOfferId: "141a150e-d452-4023-9cdb-18bd3d7624ed",
    beaconUserIdentifier: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    preApproved: true,
    pcoPriority: 7,
    partnerId: 27,
    name: "Flipkart Axis Bank Mastercard Credit Card",
    image: "https://media.banksathi.com/products/Flipkart-Axis-Bank-Credit-Card.png",
    slug: "flipkart-axis-bank-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"productCode":"517","promoCode":"pf2"}',
    cardDisplay: 1,
    createdAt: "2021-04-21T05:33:16.000Z",
    updatedAt: "2025-10-06T13:24:31.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 250, "cashback": 90, "topRated": 5000, "utilities": 5000, "pbRecommended": 290, "onlineShopping": 150}',
    features: {
      creditCardSpecialOfferDetails: "Unlimited 5% cashback on Flipkart",
      creditCardTermCondition:
        "https://www.axisbank.com/docs/default-source/default-document-library/mitc-credit-cards.pdf",
      creditCardOneLinerDescription: "Shopping,Travel,Fuel",
      categories: ["Shopping", "Travel", "Fuel"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "5% cashback on Flipkart and Cleartrip",
        "4% cashback on preferred merchants",
        "Activation benefits worth Rs. 600 ",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Shopping: [
          "4% cashback on preferred merchants including Uber, Tata Play, Cult.fit, Swiggy, Cleartrip and PVR",
        ],
      },
      cardBenefits: [
        "Flipkart voucher worth Rs. 500 on first transaction",
        "50% discount up to Rs. 100 on the first Swiggy order ",
        "1% cashback on spends across all other categories",
        "4 complimentary domestic airport lounge visits yearly on spending Rs. 50,000 in the previous 3 months",
      ],
      moreInfo: {
        "Fuel Benefits": [
          "1% fuel surcharge waiver, up to Rs. 400 per month, for transaction value of Rs. 400 to Rs. 4,000",
        ],
        "Dining Benefits": [
          "15% off, up to Rs. 500 per month, under Axis Bank Dining Delights at 1,000+ partner restaurants",
        ],
      },
      creditCardJoiningFeeAmount: "500",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "500",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Annual fee waiver on annual spends of Rs. 3,50,000",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        Cashback: "cashback",
        "Online Shopping": "onlineShopping",
        Travel: "travel",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        cashback: [
          "5% cashback on Flipkart & Cleartrip",
          "4% cashback on Uber, Cult.fit, Swiggy, PVR",
          "1% cashback on other retail spends",
        ],
        onlineShopping: [
          "5% unlimited cashback on Flipkart",
          "Unlimited 1% cashback on retail spends",
          "Flipkart voucher worth Rs. 500 on joining",
        ],
        travel: [
          "Spend based Complimentary Lounge Access",
          "5% cashback on Flipkart & Cleartrip",
          "1% cashback on other retail spends",
        ],
      },
      seoLink: "https://www.paisabazaar.com/axis-bank/flipkart-axis-bank-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "4.00",
        nonSpendBased: {
          domesticAirportLounge: {
            baseValue: "750",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc: "Domestic Airport Lounge",
          },
        },
      },
      shopping: {
        rewardsPercent: "5.00",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "3.60",
        spendBased: {
          discount: {
            baseValue: 500,
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc: "Discount",
          },
        },
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "4.00",
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          surchargeWavier: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 4800,
              },
            ],
            rewardDesc: "Surcharge Wavier",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          complimentaryVoucher: {
            baseValue: "600",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Complimentary Voucher",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "flipkart-axis-bank-mastercard-credit-card",
    id: 49,
  },
  {
    priority: 8,
    program: "PQ",
    token: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    guid: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    pbcoOfferId: "20d8b935-f8de-4f04-8181-9ae5ac7fd60f",
    beaconUserIdentifier: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    preApproved: true,
    pcoPriority: 8,
    partnerId: 27,
    name: "Airtel Axis Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Airtel-Axis-Bank-Credit-Card.png.webp",
    slug: "airetl-axis-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"productCode":"910","promoCode":"ffp"}',
    cardDisplay: 1,
    createdAt: "2025-01-10T13:00:18.000Z",
    updatedAt: "2025-10-06T13:25:17.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 50, "topRated": 5000, "utilities": 30, "pbRecommended": 300, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "10% cashback on popular brands",
      creditCardTermCondition:
        "https://www.axisbank.com/docs/default-source/default-document-library/mitc-credit-cards.pdf",
      creditCardOneLinerDescription: "Utilities,Bill Payments,Dining",
      categories: ["Utilities", "Bill Payments", "Dining"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "25% cashback on Airtel bill payments",
        "10% cashback on popular brands",
        "10% back on utility bill payments",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Cashback: ["Up to 25% back on bill payments"],
      },
      cardBenefits: [
        "25% cashback on bill payments of Airtel Mobile, Broadband, WiFi and DTH via Airtel Thanks app",
        "10% cashback on Zomato, Swiggy, BigBasket & utility bills paid for electricity, gas, etc. via Airtel Thanks app",
        "Unlimited 1% cashback on spends at other categories",
        "Amazon e-voucher worth Rs. 500 as a welcome benefit",
        "Unlimited 1% cashback on other categories, including UPI spends",
      ],
      moreInfo: {
        "Welcome Benefits": [
          "Amazon e-voucher worth Rs. 500 on first transaction within 30 days of card issuance",
        ],
        "Cashback Benefits": [
          "25% cashback on bill payments of Airtel Mobile, Broadband, WiFi and DTH via Airtel Thanks app",
          "10% cashback on utility bill payments via Airtel Thanks App",
          "10% cashback on Zomato, Swiggy, BigBasket",
          "1% cashback on spends at other categories, including UPI spends",
        ],
        "Lounge Access": [
          "4 complimentary domestic lounge visits in a year (on quarterly spends of Rs. 50,000)",
        ],
        "Fuel Benefits": [
          "1% fuel surcharge waiver (Max. Rs. 500 p.m.) across all fuel stations on spends between Rs. 400 and Rs. 4,000",
        ],
        "Dining Benefits": ["Up to 15% discount on dining at select restaurants via EazyDiner"],
      },
      creditCardJoiningFeeAmount: "500",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "500",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Waived off on annual spends of Rs. 2 lakh",
      cardOrientation: "horizontal",
      cardNetwork: "Rupay",
      cardCategory: {
        Utilities: "utilities",
        Cashback: "cashback",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        cashback: [
          "25% cashback on Airtel bill payments",
          "10% cashback on popular brands",
          "10% back on utility bill payments",
        ],
        utilities: [
          "25% cashback on Airtel bill payments",
          "10% cashback on popular brands",
          "10% back on utility bill payments",
        ],
      },
      seoLink: "https://www.paisabazaar.com/axis-bank/airtel-axis-bank-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "1.50",
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "5.00",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "2.75",
        nonSpendBased: {},
        spendBased: {
          diningDiscount: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.15,
                maxValue: 6000,
              },
            ],
            rewardDesc: "Dining Discount",
          },
        },
      },
      movies: {
        rewardsPercent: "1.50",
        spendBased: {},
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuel: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 6000,
              },
            ],
            rewardDesc: "Fuel",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          feeWaiver: {
            baseValue: "499",
            rules: [
              {
                expenseBase: 199999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Fee Waiver",
          },
          domesticLoungAccess: {
            baseValue: "750",
            subCategory: "travel",
            rules: [
              {
                expenseBase: 199999,
                operator: ">",
                multiplicationFactor: 4,
              },
              {
                expenseBase: 149999,
                operator: ">",
                multiplicationFactor: 3,
              },
              {
                expenseBase: 99999,
                operator: ">",
                multiplicationFactor: 2,
              },
              {
                expenseBase: 49999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Domestic Lounge Access",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "airtel-axis-credit-card",
    id: 50,
  },
  {
    priority: 3,
    program: "PQ",
    token: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    guid: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    pbcoOfferId: "79b6e868-51ea-4dc7-a87e-ad98b0ec2210",
    beaconUserIdentifier: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    preApproved: true,
    pcoPriority: 9,
    partnerId: 27,
    name: "Axis Bank MY Zone Rupay Credit Card",
    image:
      "https://cd9941cc.delivery.rocketcdn.me/wp-content/uploads/2021/08/Axis-My-Zone-Credit-Card.webp",
    slug: "axis-bank-my-zone-credit-cards",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"productCode":"906","promoCode":"pnn"}',
    cardDisplay: 1,
    createdAt: "2017-10-09T13:53:20.000Z",
    updatedAt: "2025-10-06T13:27:30.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 220, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 315, "onlineShopping": 230}',
    features: {
      creditCardSpecialOfferDetails: "SonyLiv Premium 1 year subscription worth Rs. 999",
      creditCardTermCondition:
        "https://www.axisbank.com/docs/default-source/default-document-library/mitc-credit-cards.pdf",
      creditCardOneLinerDescription: "Dining, Shopping, Movies",
      categories: ["Dining", "Shopping", "Movies"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "40% discount on Swiggy Food Delivery",
        "4 EDGE reward points per Rs. 200 spent",
        "Instant discount at Swiggy food delivery",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Movies: ["Buy One Get One Free at Distric App"],
        Shopping: ["Upto Rs. 1,000 Discount at Ajio"],
      },
      cardBenefits: [
        "Complimentary SonyLiv Premium Annual Subscription",
        "40% discount on Swiggy food delivery",
        "Upto Rs. 1,000 off on Ajio on select styles",
        "1 complimentary domestic lounge visit in a quarter ",
        "4 rewards on every Rs. 200 spent",
      ],
      moreInfo: {
        "Lounge Access": ["1 complimentary domestic lounge visit per quarter"],
        "Movie Benefits": ["Buy One Get One offer on District App, upto Rs. 200 p.m"],
        "Dining Benefits": [
          "40% off on food delivery via Swiggy, upto Rs. 120 per order, on minimum order of Rs. 200",
          "Discount offer can be availed 4 times in a month",
        ],
        "Reward Benefits": [
          "4 Axis EDGE reward points on every Rs. 200 spent",
          "Value of 1 Axis EDGE Reward Point is Rs. 0.20",
        ],
        "Activation Benefit": [
          "Complimentary SonyLiv Premium Membership worth Rs. 999",
          "On making the first spend within 30 days of card issuance",
        ],
        "Fuel Surcharge Benefit": [
          "1% fuel surcharge waiver, upto Rs. 400 p.m. for transaction value of Rs. 400 to Rs. 4,000",
        ],
      },
      creditCardJoiningFeeAmount: "500",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription:
        "SonyLiv Premium 1 year subscription worth Rs. 999 on card activation!",
      creditCardAnnualFeeAmount: "500",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Rupay",
      cardCategory: {
        "Online Shopping": "onlineShopping",
        Travel: "travel",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        onlineShopping: [
          "Discount of up to Rs. 1,000 off on Ajio",
          "4 reward points for every Rs. 200 spent",
          "Flat Rs. 120 off on Swiggy food delivery",
        ],
        travel: [
          "1 complimentary domestic lounge visit/quarter",
          "4 reward points for every Rs. 200 spent",
          "Flat Rs. 120 off on Swiggy food delivery",
        ],
      },
      seoLink: "https://www.paisabazaar.com/axis-bank/axis-bank-my-zone-credit-cards/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 3,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "0.40",
        nonSpendBased: {
          domesticAirportLounge: {
            baseValue: "750",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc: "Domestic Airport Lounge",
          },
        },
        spendBased: {},
      },
      shopping: {
        rewardsPercent: "0.40",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "0.34",
        nonSpendBased: {},
        spendBased: {
          diningDiscount: {
            baseValue: "0",
            rules: [
              {
                expenseBase: 0,
                operator: "mimmax",
                multiplicationFactor: 0.15,
                maxValue: 6000,
              },
            ],
            rewardDesc: "Dining Discount",
          },
          swiggyDiscount: {
            baseValue: "2880",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Swiggy Discount",
          },
        },
      },
      movies: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          discount: {
            baseValue: "200",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc: "Discount",
          },
        },
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          surchargeWavier: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 4800,
              },
            ],
            rewardDesc: "Surcharge Wavier",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {
          sonyLivMembership: {
            baseValue: "599",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Sony Liv Membership",
          },
        },
        spendBased: {
          complimentaryVoucher: {
            baseValue: "1000",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 6,
              },
            ],
            rewardDesc: "Complimentary Voucher",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "axis-bank-my-zone-rupay-credit-card",
    id: 51,
  },
  {
    priority: 4,
    program: "PQ",
    token: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    guid: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    pbcoOfferId: "b1d8a038-322d-4b96-b1a0-7c88dc8d7a08",
    beaconUserIdentifier: "eNsXCo9A9d0vtptayt8jg1eGmLg-m3biuVYHRnV8yOFmJr",
    preApproved: true,
    pcoPriority: 10,
    partnerId: 27,
    name: "IndianOil Axis Bank RuPay Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/IndianOil-Axis-Bank-Credit-Card.png.webp",
    slug: "indianoil-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload: '{"productCode":"900","promoCode":"pf2"}',
    cardDisplay: 1,
    createdAt: "2023-07-12T10:31:10.000Z",
    updatedAt: "2025-10-06T13:26:48.000Z",
    sortOrder:
      '{"fuel": 50, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 310, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "1% value back on online shopping ",
      creditCardTermCondition:
        "https://www.axisbank.com/docs/default-source/default-document-library/mitc-credit-cards.pdf",
      creditCardOneLinerDescription: "Fuel, Dining, Movies",
      categories: ["Fuel", "Dining", "Movies"],
      cardType: "general",
      isRupay: true,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "4% value-back at Indian Oil Fuel Stations",
        "Up to 10% discount on BookMyShow",
        "5x rewards on online spends",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Fuel: ["4% value back as EDGE REWARD points at all IOCL outlets"],
        Dining: ["5% discount at the partner restaurants via EazyDiner"],
        Movies: ["10% discount on movie tickets booked via BookMyShow"],
      },
      cardBenefits: [
        "100% cashback of up to Rs. 250 on making 1st fuel spend",
        "Up to 1% value back as EDGE REWARD points on online shopping",
      ],
      moreInfo: {
        "Fuel Benefits": [
          "100% cashback of up to Rs. 250 on the 1st fuel transaction made within 30 days of card issuance",
          "4% unlimited value back as 20 EDGE REWARD points per Rs. 100 spent on IOCL fuel spends of Rs. 400 to Rs. 4,000",
        ],
        "Reward Benefits": [
          "Earn 1 EDGE REWARD point for every Rs. 100 spent and 5X EDGE REWARD points across all online spends",
        ],
        "Fuel Surcharge Benefit": [
          "1% fuel surcharge waiver, up to Rs. 50 per month, on fuel spends of Rs. 400 to Rs. 4,000",
        ],
      },
      creditCardJoiningFeeAmount: "500",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "500",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Waived off on annual spend of Rs. 3.5 lakh",
      cardOrientation: "horizontal",
      cardNetwork: "Rupay",
      cardCategory: {
        Fuel: "fuel",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        fuel: [
          "4% unlimited value back on IOCL fuel spends",
          "1% fuel surcharge waiver at any fuel pump",
          "100% back on 1st fuel spend (up to Rs. 250)",
        ],
      },
      seoLink: "",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 3,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "1.00",
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "1.00",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "0.90",
        spendBased: {
          discount: {
            baseValue: 500,
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc: "Discount",
          },
        },
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "0.94",
        nonSpendBased: {},
        spendBased: {
          discount: {
            baseValue: "100",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 12,
              },
            ],
            rewardDesc: "Discount",
          },
        },
      },
      fuel: {
        rewardsPercent: "4.00",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 600,
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          annualFeeWaiver: {
            baseValue: "500",
            rules: [
              {
                expenseBase: 50000,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Annual Fee Waiver",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "indianoil-axis-bank-rupay-credit-card",
    id: 52,
  },
  {
    priority: 1,
    program: "PA",
    token: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    guid: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    pbcoOfferId: "33ea802d-936e-4e50-b5f8-2a82b1415cd2",
    beaconUserIdentifier: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    preApproved: true,
    pcoPriority: 11,
    partnerId: 3,
    name: "SimplyCLICK SBI Card",
    image: "https://potfin.in/assets/img/sbicard.webp",
    slug: "simplyclick-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"Mastercard":{"cardType":"CSC1","feeCode":"SBT1","promoCode":"DUMY"},"Visa":{"cardType":"CSC2","feeCode":"SBT1","promoCode":"DUMY"}}',
    cardDisplay: 1,
    createdAt: "2017-10-09T13:53:20.000Z",
    updatedAt: "2025-10-06T13:12:24.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 200, "onlineShopping": 140}',
    features: {
      creditCardSpecialOfferDetails: "Get ₹500 eGift Card on annual fee payment",
      creditCardTermCondition:
        "https://www.sbicard.com/sbi-card-en/assets/docs/pdf/most-important-terms-and-conditions/mitc-english.pdf",
      creditCardOneLinerDescription: "Rewards,Dining,Fuel",
      categories: ["Rewards", "Dining", "Fuel"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "10X rewards on Swiggy, Myntra & more",
        "Travel vouchers worth Rs. 4,000 every year",
        "5X rewards across all online spends",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Rewards: ["Up to 10X reward points on spends made on partner brands"],
        Shopping: ["5X reward points on spends made on online purchases"],
      },
      cardBenefits: [
        "Rs. 500 Amazon gift voucher on joining fee payment",
        "Cleartrip/Yatra e-vouchers of Rs. 2,000 each on annual spends of Rs. 1 lakh and Rs. 2 lakh",
      ],
      moreInfo: {
        "Rewards Benefits": [
          "1 reward point per Rs. 100 spent on offline purchases",
          "5X reward points on every Rs. 100 on all online spends",
          "10X reward points on online partners: BookMyShow, EazyDiner, Apollo24X7, Netmeds & Cleartrip",
        ],
        "Fuel Surcharge Benefits": [
          "1% fuel surcharge waiver, up to Rs. 400 per month, for transaction value of Rs. 400 to Rs. 4,000",
        ],
      },
      creditCardJoiningFeeAmount: "499",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "Rs. 500 Amazon gift voucher on joining fee payment",
      creditCardAnnualFeeAmount: "499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        "Online Shopping": "onlineShopping",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        onlineShopping: [
          "10X rewards on Myntra, Swiggy & more",
          "5X rewards on all online transactions",
          "Rs. 500 Amazon gift voucher on joining",
        ],
      },
      seoLink: "https://www.paisabazaar.com/sbi-bank/simplyclick-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "2.50",
        nonSpendBased: {},
        spendBased: {},
      },
      shopping: {
        rewardsPercent: "2.50",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "2.50",
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "2.50",
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          surchargeWavier: {
            baseValue: "0",
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: "1200",
              },
            ],
            rewardDesc: "Surcharge Wavier",
          },
        },
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          complimentaryVoucher: {
            baseValue: "2000",
            subCategory: "travel",
            rules: [
              {
                expenseBase: 200000,
                operator: ">",
                multiplicationFactor: 2,
              },
              {
                expenseBase: 100000,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Complimentary Voucher",
          },
          annualFeeWaiver: {
            baseValue: "499",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Annual Fee Waiver",
          },
          complimentaryVoucherTravel: {
            baseValue: "2000",
            rules: [
              {
                expenseBase: 200000,
                operator: ">",
                multiplicationFactor: 2,
              },
              {
                expenseBase: 100000,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Complimentary Voucher - Travel",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "simplyclick-sbi-card",
    id: 53,
  },
  {
    priority: 4,
    program: "PA",
    token: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    guid: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    pbcoOfferId: "102a2452-18ce-40ac-a5c6-d6c11e85d56e",
    beaconUserIdentifier: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    preApproved: true,
    pcoPriority: 12,
    partnerId: 3,
    name: "BPCL SBI Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/BPCL-SBI-Card-Face-01.png.webp",
    slug: "sbi-bpcl-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"Rupay":{"cardType":"BPCR","feeCode":"BPR1","promoCode":"DUMY"},"Visa":{"cardType":"BPCV","feeCode":"SBT1","promoCode":"DUMY"}}',
    cardDisplay: 1,
    createdAt: "2019-09-03T09:19:10.000Z",
    updatedAt: "2025-10-06T13:14:44.000Z",
    sortOrder:
      '{"fuel": 10, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 210, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails:
        "Get 2,000 Activation Bonus Reward Points worth ₹500 on payment of joining fee",
      creditCardTermCondition:
        "https://www.sbicard.com/sbi-card-en/assets/docs/pdf/most-important-terms-and-conditions/mitc-english.pdf",
      creditCardOneLinerDescription: "Fuel,Rewards,Shopping",
      categories: ["Fuel", "Rewards", "Shopping"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "Save up to 4.25% on BPCL fuel spends",
        "5X rewards on dining, movies & groceries",
        "2000 reward points as welcome benefit",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Fuel: ["Up to 4.25% back on fuel expenses at BPCL petrol pumps"],
        Rewards: ["5X rewards on select lifestyle categories other than fuel"],
      },
      cardBenefits: [
        "3.25% value back on BPCL fuel through reward points and 1% through fuel surcharge waiver",
        "2,000 bonus rewards worth Rs. 500 on paying joining fee",
      ],
      moreInfo: {
        "Fuel Benefits": [
          "4.25% back on fuel spends (3.25% as rewards & 1% surcharge waiver on BPCL transactions of up to Rs. 4,000",
        ],
        "Reward Benefits": [
          "Up to 4.25% back on fuel expenses at BPCL petrol pumps",
          "13X reward points equivalent to 3.25% value back on fuel expenses at any BPCL petrol pump",
          "5X reward points on every Rs. 100 spent at groceries, departmental stores, movies & dining",
          "1 reward point for every Rs. 100 spent on non-fuel retail purchases, where 4 reward points = Rs. 1",
        ],
      },
      creditCardJoiningFeeAmount: "499",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "2,000 bonus rewards worth Rs. 500 on paying joining fee",
      creditCardAnnualFeeAmount: "499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Fee reversed if Annual Spends for last year = ₹50,000",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        Fuel: "fuel",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        fuel: [
          "Save up to 4.25% on BPCL fuel spends",
          "13X rewards on fuel spends",
          "Surcharge waiver up to Rs. 1,200 per year",
        ],
      },
      seoLink: "https://www.paisabazaar.com/sbi-bank/sbi-bpcl-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "0.25",
        spendBased: {},
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "1.25",
        spendBased: {},
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "1.25",
        spendBased: {},
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "1.25",
        spendBased: {},
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "3.25",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 1200,
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          bonus: {
            baseValue: "500",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Bonus",
          },
        },
      },
    },
    value: "bpcl-sbi-card",
    id: 54,
  },
  {
    priority: 2,
    program: "PA",
    token: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    guid: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    pbcoOfferId: "adc09877-8960-46f2-934d-4bfc70b88637",
    beaconUserIdentifier: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    preApproved: true,
    pcoPriority: 13,
    partnerId: 3,
    name: "SimplySAVE SBI Card",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREgXBdk1VpNeOqg8NBMkkvph1igGwn_QJ-BA&s",
    slug: "sbi-simply-save-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"Mastercard":{"cardType":"SSU1","feeCode":"SBT1","promoCode":"DUMY"},"Visa":{"cardType":"SSU2","feeCode":"SBT1","promoCode":"DUMY"}}',
    cardDisplay: 1,
    createdAt: "2017-10-09T13:53:20.000Z",
    updatedAt: "2025-10-06T13:15:18.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 220, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "2000 Bonus points ON spending ₹2,000 in the first 60 days",
      creditCardTermCondition:
        "https://www.sbicard.com/sbi-card-en/assets/docs/pdf/most-important-terms-and-conditions/mitc-english.pdf",
      creditCardOneLinerDescription: "Rewards,Dining,Fuel",
      categories: ["Rewards", "Dining", "Fuel"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "10X rewards on dining, movies & groceries",
        "2000 reward points as welcome bonus",
        "1 reward point per Rs. 150 on all spends",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Rewards: ["10X rewards on spends made on select lifestyle categories"],
      },
      cardBenefits: [
        "Spend Rs. 2,000 in the first 60 days for 2,000 rewards",
        "Accelerated SBI reward points on select lifestyle spends",
      ],
      moreInfo: {
        "Rewards Benefits": [
          "1 reward point for every spend of Rs. 150, where the value of 1 reward point is Rs. 0.25",
          "10 reward points per Rs. 150 spent on dining, movies, groceries & departmental store spends",
        ],
        "Fuel Surcharge Benefits": [
          "1% fuel surcharge waiver, up to Rs. 100 per month, for transaction value of Rs. 500 to Rs. 3,000",
        ],
      },
      creditCardJoiningFeeAmount: "499",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription:
        "Joining fee of INR 499 will be reversed on Annual spends of INR 1,00,000 and above",
      creditCardAnnualFeeAmount: "499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Fee reversed if Annual Spends for last year = ₹1,00,000",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {},
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        movies: [
          "10X reward points on movie spends",
          "10X rewards on dining, groceries & departmental store spends",
          "1 reward point per Rs. 150 spent",
        ],
      },
      seoLink: "https://www.paisabazaar.com/sbi-bank/sbi-simply-save-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "0.17",
        nonSpendBased: {},
      },
      shopping: {
        rewardsPercent: "1.67",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "1.67",
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "1.67",
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          surchargeWavier: {
            baseValue: "0",
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: "1200",
              },
            ],
            rewardDesc: "Surcharge Wavier",
          },
        },
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          bonus: {
            baseValue: "500",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Bonus",
          },
          annualFeeWaiver: {
            baseValue: "499",
            rules: [
              {
                expenseBase: 100000,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Annual Fee Waiver",
          },
        },
      },
    },
    isCrossSell: "true",
    value: "simplysave-sbi-card",
    id: 55,
  },
  {
    priority: 3,
    program: "PA",
    token: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    guid: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    pbcoOfferId: "55c83a68-4a46-447f-8794-450d03aee9ba",
    beaconUserIdentifier: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    preApproved: true,
    pcoPriority: 14,
    partnerId: 3,
    name: "IRCTC SBI Platinum Card",
    image:
      "https://www.paisabazaar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2017/10/IRCTC-SBI-Platinum-Credit-Card.png.webp",
    slug: "sbi-irctc-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"Rupay":{"cardType":"IRRT","feeCode":"IRRF","promoCode":"DUMY"},"Visa":{"cardType":"IRCP","feeCode":"IRCL","promoCode":"DUMY"}}',
    cardDisplay: 1,
    createdAt: "2017-10-09T13:53:20.000Z",
    updatedAt: "2025-10-06T13:15:49.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 130, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 230, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "Get 350 Bonus Points",
      creditCardTermCondition:
        "https://www.sbicard.com/sbi-card-en/assets/docs/pdf/most-important-terms-and-conditions/mitc-english.pdf",
      creditCardOneLinerDescription: "Travel, Rewards, Dining",
      categories: ["Travel", "Rewards", "Dining"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "Save up to 10% on IRCTC train bookings",
        "4 railway lounge visits every year",
        "1% transaction charge waiver on IRCTC",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Travel: ["Up to 10% savings on travel bookings made via IRCTC"],
        Rewards: ["1 reward point for every Rs. 125 non-fuel retail spend"],
      },
      cardBenefits: [
        "4 complimentary railway lounge access given every year with up to 1 per calendar quarter",
        "Save 1% of transaction charges on railway bookings",
        "350 activation bonus reward points on a transaction of Rs. 500 or more within 45 days of card issuance",
        "Rs. 100 cashback on the first ATM cash withdrawal made within 30 days of receiving the card",
      ],
      moreInfo: {
        "Reward Benefits": [
          "10% back as reward points on ticket bookings for AC1, AC2, AC3 and AC CC made via IRCTC platforms",
          "1 reward point for every Rs. 125 spent on non-fuel retail purchases, where 1 reward point = Rs. 1",
        ],
        "Travel Benefits": [
          "Save 1% of the transaction charges on railway ticket bookings made through IRCTC website",
        ],
        "Fuel Surcharge Benefits": [
          "1% fuel surcharge waiver, up to Rs. 100 per month, for transaction value of Rs. 500 to Rs. 3,000",
        ],
      },
      creditCardJoiningFeeAmount: "500",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "Get 350 Reward Points as activation bonus!*",
      creditCardAnnualFeeAmount: "500",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        Travel: "travel",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        travel: [
          "10% savings on IRCTC train bookings",
          "4 free railway lounge visits per year",
          "1% transaction charge waiver on IRCTC",
        ],
      },
      seoLink: "https://www.paisabazaar.com/sbi-bank/sbi-irctc-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#000000",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "10.00",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 400000,
            rate: 10,
          },
          {
            minExpense: 400000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        nonSpendBased: {
          railwayLounge: {
            baseValue: "150",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc: "Railway Lounge",
          },
        },
        spendBased: {
          discount: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "^",
                multiplicationFactor: 0.01,
              },
            ],
            rewardDesc: "Railway Surcharge Waiver",
          },
        },
      },
      shopping: {
        rewardsPercent: "0.80",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "0.80",
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "0.80",
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          surchargeWavier: {
            baseValue: "0",
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: "1200",
              },
            ],
            rewardDesc: "Surcharge Wavier",
          },
        },
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          bonusRewards: {
            baseValue: "350",
            subCategory: "travel",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Bonus Rewards - Travel",
          },
        },
      },
    },
    value: "irctc-sbi-platinum-card",
    id: 56,
  },
  {
    priority: 5,
    program: "PA",
    token: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    guid: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    pbcoOfferId: "0aaafc03-8d05-46b8-8aa9-9090e0178ccb",
    beaconUserIdentifier: "iPnX8A9rCmOJEe84xdUkXa6Zg-LHkxtBYJ8pFbZouy9V0R",
    preApproved: true,
    pcoPriority: 15,
    partnerId: 3,
    name: "PULSE SBI Card",
    image:
      "https://bankkaro.com/blog/wp-content/uploads/2022/05/sbi-pulse-credit-card-1536x819.jpg",
    slug: "sbi-pulse-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"Mastercard":{"cardType":"PULM","feeCode":"PUSP","promoCode":"DUMY"},"Visa":{"cardType":"PULS","feeCode":"PUSP","promoCode":"DUMY"}}',
    cardDisplay: 1,
    createdAt: "2023-01-19T12:27:22.000Z",
    updatedAt: "2025-10-06T13:16:37.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 245, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 240, "onlineShopping": 5000}',
    features: {
      creditCardSpecialOfferDetails: "Priority Pass lounge membership worth USD 99",
      creditCardTermCondition:
        "https://www.sbicard.com/sbi-card-en/assets/docs/pdf/most-important-terms-and-conditions/mitc-english.pdf",
      creditCardOneLinerDescription: "Travel,Rewards,Fuel",
      categories: ["Travel", "Rewards", "Fuel"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: false,
      isRedirect: "",
      redirectUrl: "",
      bestFeature: [
        "FITPASS PRO and Netmeds First membership",
        "5X rewards on pharmacy, dining & more",
        "Smart Watch worth Rs. 5,999 on joining",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Travel: ["Complimentary domestic & international lounge access"],
        Rewards: ["Up to 10 reward points for every spend worth Rs. 100"],
      },
      cardBenefits: [
        "FITPASS PRO & Netmeds First memberships on card renewal",
        "Join for Rs. 5,999 Noise ColorFit Pulse 2 Max Smart Watch",
      ],
      moreInfo: {
        "Insurance Cover": [
          "Insurance cover worth Rs. 1 lakh for fraud liability",
          "Insurance cover worth Rs. 50 lakh for air accident",
          "Check-in baggage loss insurance cover of up to Rs. 72,000",
          "Check-in baggage delay insurance cover of Rs. 7,500",
          "Travel documents loss cover worth up to Rs. 12,500",
          "Insurance for baggage damage worth up to Rs. 5,000",
        ],
        "Reward Benefits": [
          "2 reward points for every spend off Rs. 100, where the value of 4 reward points = Rs. 1",
          "10 reward points for every spend of Rs. 100 made on dining, chemist, pharmacy and movies",
        ],
        "Travel Benefits": [
          "8 complimentary domestic airport lounge visits in a year",
          "Complimentary Priority Pass membership worth US $99 for the first 2 years with international lounge access",
        ],
        "Milestone Benefits": ["Rs. 1,500 e-voucher on annual retail spends of Rs. 4 lakh"],
        "Fuel Surcharge Benefits": [
          "1% fuel surcharge waiver, up to Rs. 250 per month, for transaction value of Rs. 500 to Rs. 4,000",
        ],
      },
      creditCardJoiningFeeAmount: "1499",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription:
        "Rs. 5,999 Noise ColorFit Pulse 2 Max Smart Watch on card activation!*",
      creditCardAnnualFeeAmount: "1499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Fee Waiver on Annual Spends of ₹2 Lacs",
      cardOrientation: "horizontal",
      cardNetwork: "Visa/Mastercard",
      cardCategory: {
        Travel: "travel",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        travel: [
          "8 domestic airport lounge visits per year",
          "Rs. 1,500 e-voucher as milestone benefit",
          "Priority Pass Membership for first 2 years",
        ],
      },
      seoLink: "https://www.paisabazaar.com/sbi-bank/sbi-pulse-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 11,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    rewardJson: {
      travel: {
        rewardsPercent: "0.50",
        nonSpendBased: {
          domesticAirportLounge: {
            baseValue: "750",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 8,
              },
            ],
            rewardDesc: "Domestic Airport Lounge",
          },
          priorityPass: {
            baseValue: "3500",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Priority Pass",
          },
        },
      },
      shopping: {
        rewardsPercent: "0.50",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "2.50",
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "2.50",
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          surchargeWavier: {
            baseValue: "0",
            rules: [
              {
                expenseBase: 0,
                operator: "^",
                multiplicationFactor: 0.01,
                maxValue: "3000",
              },
            ],
            rewardDesc: "Surcharge Wavier",
          },
        },
      },
      general: {
        nonSpendBased: {
          fitpassMembership: {
            baseValue: "700",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Fitpass Membership",
          },
          netmedsFirstMembership: {
            baseValue: "299",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Netmeds First Membership",
          },
          noiseColorfit: {
            baseValue: "5999",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Noise Colorfit",
          },
        },
        spendBased: {
          complimentaryVoucher: {
            baseValue: "1500",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 399999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Complimentary Voucher",
          },
          annualFeeWaiver: {
            baseValue: "1499",
            rules: [
              {
                expenseBase: 199999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Annual Fee Waiver",
          },
        },
      },
    },
    value: "pulse-sbi-card",
    id: 57,
  },

  {
    program: "PQ",
    token: "sec-tn-plus",
    guid: "sec-tn-plus",
    partnerId: 2,
    pbcoOfferId: "00000000-0000-0000-0000-tnpls0000001",
    beaconUserIdentifier: "sec-tn-plus",
    preApproved: true,
    name: "Tata Neu Plus HDFC Bank Secured Credit Card",
    image: "https://www.paisabazaar.com/wp-content/uploads/2024/12/500x500.png",
    slug: "tata-neu-plus-secured-credit-card",
    isActive: 1,
    createdBy: "2025-03-07 09:56:47",
    updatedBy: "2025-03-07 09:56:47",
    additionalPayload:
      '{"fuel":5000,"movies":5000,"utilities":160,"travel":380,"cashback":160,"onlineShopping":230,"topRated":5000,"pbRecommended":520}',
    cardDisplay: 1,
    createdAt: "2025-03-07T04:26:47.000Z",
    updatedAt: "2025-10-23T06:45:26.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 380, "cashback": 180, "topRated": 5000, "utilities": 150, "pbRecommended": 590, "onlineShopping": 310}',
    rewardJson: {
      travel: {
        rewardsPercent: "1.50",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 1120000,
            rate: 1.5,
          },
          {
            minExpense: 1120000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {
          domesticAirportLounge: {
            baseValue: "750",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 8,
              },
            ],
            rewardDesc: "Domestic Airport Lounge",
          },
          internationAirportLounge: {
            baseValue: "1200",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 4,
              },
            ],
            rewardDesc: "International Airport Lounge",
          },
        },
      },
      shopping: {
        rewardsPercent: "5.00",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 1120000,
            rate: 5,
          },
          {
            minExpense: 1120000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "1.50",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 1120000,
            rate: 1.5,
          },
          {
            minExpense: 1120000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {},
      },
      movies: {
        rewardsPercent: "1.50",
        dynamicRewardsPercent: [
          {
            minExpense: 0,
            maxExpense: 1120000,
            rate: 1.5,
          },
          {
            minExpense: 1120000,
            maxExpense: "Infinity",
            rate: 0,
          },
        ],
        spendBased: {},
        nonSpendBased: {},
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {
          fuelWaiver: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: "6000",
              },
            ],
            rewardDesc: "Fuel Waiver",
          },
        },
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          bonus: {
            baseValue: "1499",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Bonus",
          },
          annualFeeWaiver: {
            baseValue: "1499",
            rules: [
              {
                expenseBase: 299999,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Annual Fee Waiver",
          },
        },
      },
    },
    features: {
      creditCardSpecialOfferDetails:
        "1% fuel surcharge waiver at all fuel stations across India (on Minimum transaction of INR 400 & maximum transaction of INR 5,000. Maximum waiver of INR 250 per statement cycle",
      creditCardTermCondition:
        "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?path=/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Manage%20Your%20Credit%20Cards%20PDFs/MITC%201.64.pdf",
      creditCardOneLinerDescription: "Travel,Shopping,Rewards",
      categories: ["Travel", "Shopping", "Rewards"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: true,
      isRedirect: true,
      redirectUrl:
        "https://www.tatadigital.com/finance/creditcard/product-detail?contentTag=securedcard&utm_source=Partnerships_external&utm_medium=Paisabazaar&utm_campaign=MKT_ST-FS_HD-PRF_BS-ALL_PL-BOT_CH-AL_TP-PLC_DT-20250305_CT-NC_OJ-ACQ_LP-TN_BD-NCD_CO-paisabazaar_secured_",
      bestFeature: [
        "FD Starting from Rs. 15,000",
        "UPI Powered Credit Card",
        "4 free domestic lounge visits per year",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Shopping: ["Up to 7% back as NeuCoins on spends on Tata Neu platforms"],
      },
      cardBenefits: [
        "FD Backed Rupay Credit Card",
        "Get Min. 90% FD Amount as your Credit Limit",
        "Earn up to 7.25% Interest on Fixed Deposit",
        "FD Starting from Rs. 15,000",
        "5% cashback on all Zomato food delivery orders above Rs 99",
        "4 complimentary domestic airport lounge access per calendar year",
        "2% back as NeuCoins on non-EMI spends made on Tata Neu app/website and partner Tata brands",
        "Additional 5% back as NeuCoins on select category spends made via Tata Neu app/website",
        "1% back as NeuCoins on other brands & merchant EMI spends",
      ],
      moreInfo: {
        "Joining Benefit": [
          "499 NeuCoins on Tata Neu app after making 1st transaction within 30 days of card issuance",
        ],
        "Rewards Benefits": [
          "2% back as NeuCoins on non-EMI spends made on Tata Neu app/website and partner Tata brands",
          "Additional 5% back as NeuCoins on select category spends made via Tata Neu app/website",
          "1% back as NeuCoins on other brands & merchant EMI spends",
          "Up to 1% value-back as NeuCoins on all the UPI spends",
        ],
        "Dining Benefits": [
          "5% cashback on all Zomato food delivery orders above Rs 99 by using code - NEUCARD5",
          "Cashback is added to Zomato Money after delivery",
          "Cashback has an expiry of 30 days",
        ],
        "Lounge Access Benefits": ["4 complimentary domestic lounge visits every year"],
        "Fee Waiver": ["Renewal fee waived on reaching Rs. 1 lakh annual spends"],
        "Fuel Benefits": [
          "1% fuel surcharge waiver, max. Rs. 250 per month, on transactions between Rs. 400 to Rs. 5,000",
        ],
      },
      creditCardJoiningFeeAmount: "0",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription: "",
      creditCardAnnualFeeAmount: "499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "Waived off on annual spend of Rs. 1 lakh",
      cardOrientation: "vertical",
      cardNetwork: "Rupay",
      cardCategory: {
        "Online Shopping": "onlineShopping",
        Utilities: "utilities",
        Cashback: "cashback",
        Travel: "travel",
      },
      maximumBenifits: 0,
      effectiveFree: 0,
      cardCategoryDescription: {
        onlineShopping: [
          "2% cashback on partner brands",
          "Additional 5% back on select Tata Neu spends",
          "FD Starting from Rs. 15,000",
        ],
        cashback: [
          "2% cashback via Tata Neu App",
          "Additional 5% back on select Tata Neu spends",
          "FD Starting from Rs. 15,000",
        ],
        utilities: [
          "1% back on spends at utilities",
          "2% cashback on Tata Neu & partner brands",
          "FD Starting from Rs. 15,000",
        ],
        travel: [
          "4 free domestic lounge visits per year",
          "Up to 7% back as NeuCoins on every spend",
          "FD Starting from Rs. 15,000",
        ],
      },
      seoLink: "",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 2,
          y: 16,
        },
        color: "#ffffff",
      },
      exclusivelyOnPb: false,
      trendingOffers: [
        {
          brandId: 2,
          brandName: "Zomato",
          brandColour: "#E23747",
          shortDescription: "5% Cashback on Zomato!",
          detailedDescription:
            "5% cashback on all Zomato orders above Rs 99 by using code - NEUCARD5, Cashback is added to Zomato Money after delivery.",
        },
      ],
      voucherValue: "",
    },
    value: "tata-neu-plus-hdfc-bank-secured-credit-card",
    id: 59,
  },
  {
    program: "PA",
    token: "idfc-first-earn",
    guid: "idfc-first-earn",
    partnerId: 247,
    pbcoOfferId: "00000000-0000-0000-0000-idfcearn0001",
    beaconUserIdentifier: "idfc-first-earn",
    preApproved: true,
    name: "IDFC FIRST Earn Credit Card",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2025/02/IDFC-FIRST-Earn-Credit-Card.webp",
    slug: "idfc-first-earn-credit-card",
    isActive: 1,
    createdBy: "0",
    updatedBy: "0",
    additionalPayload:
      '{"fuel":140,"movie":100,"dining":110,"travel":40,"rewards":80,"shopping":110,"topRated":120,"pbRecommended":311}',
    cardDisplay: 1,
    createdAt: "2024-11-25T10:20:28.000Z",
    updatedAt: "2025-07-24T04:41:16.000Z",
    sortOrder:
      '{"fuel": 5000, "movies": 5000, "travel": 5000, "cashback": 5000, "topRated": 5000, "utilities": 5000, "pbRecommended": 600, "onlineShopping": 5000}',
    rewardJson: {
      travel: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {},
      },
      shopping: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
      },
      dining: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          diningDiscount: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 1000,
              },
            ],
            rewardDesc: "Dining Discount",
          },
        },
      },
      movies: {
        rewardsPercent: "0.00",
        nonSpendBased: {},
        spendBased: {
          movieDiscount: {
            baseValue: 0,
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 1000,
              },
            ],
            rewardDesc: "Movie Discount",
          },
        },
      },
      fuel: {
        rewardsPercent: "0.00",
        spendBased: {},
        nonSpendBased: {},
      },
      general: {
        nonSpendBased: {},
        spendBased: {
          travelVoucher: {
            baseValue: 0,
            subCategory: "travel",
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.01,
                maxValue: 1000,
              },
            ],
            rewardDesc: "Travel Voucher",
          },
          shoppingVoucher: {
            baseValue: "1200",
            subCategory: "shopping",
            rules: [
              {
                expenseBase: 0,
                operator: ">",
                multiplicationFactor: 1,
              },
            ],
            rewardDesc: "Bonus Shopping Rewards",
          },
          movieDiscount: {
            baseValue: 0,
            subCategory: "movies",
            rules: [
              {
                expenseBase: 0,
                operator: "minmax",
                multiplicationFactor: 0.25,
                maxValue: 1200,
              },
            ],
            rewardDesc: "Movie Discount",
          },
        },
      },
    },
    features: {
      creditCardSpecialOfferDetails:
        "Applicable on UPI transaction done within 15 days of card generation",
      creditCardTermCondition:
        "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/pdf/credit-card/MITC-Document-Customer.pdf",
      creditCardOneLinerDescription: "Cashback,Movies,Dining",
      categories: ["Cashback", "Movies", "Dining"],
      cardType: "general",
      isRupay: false,
      isSecuredCard: true,
      isRedirect: true,
      redirectUrl:
        "https://www.idfcfirstbank.com/credit-card/ntb-diy/cashback-card-standalone?utm_source=Partner&utm_medium=PB_EARN&utm_campaign=PB_Earn",
      bestFeature: [
        "UPI Powered Credit Card",
        "Earn upto 1% Cashback on all UPI spends",
        "0.5% cashback on all online spends",
      ],
      saveOnFeeToolTip: "",
      bestSuitedFor: {
        Cashback: [
          "100% Cashback Upto Rs. 500 cashback on 1st UPI Transaction done within 15 days of card generation",
        ],
        Rewards: ["Get 1% cashback on card spends made via IDFC FIRST Bank mobile app"],
        Dining: [
          "Get 0.5% cashback on card spends made on insurance, utility, wallet load and all online spends ",
        ],
      },
      cardBenefits: [
        "FD Backed Virtual Rupay Credit Card",
        "Get Min. 100% FD Amount as your Credit Limit",
        "Earn up to 7.25% Interest on Fixed Deposit",
        "FD Starting from Rs. 5,000",
        "Enjoy upto Rs. 1,000 cashback on 1st EMI done within 30 days of card set-up",
        "25% Off on Movie tickets, up to Rs. 100 on District by Zomato once a month",
      ],
      moreInfo: {
        "Cashback Benefits": [
          "1% cashback on UPI spends via IDFC FIRST Bank mobile app",
          "Earn a cashback of 0.5% on all the spends made via other UPI apps and all online spends",
          "Cashback is capped at Rs. 500 for every statement cycle",
        ],
        "Welcome Benefits": [
          "Upto Rs.500 cashback on 1st UPI Transaction done within 15 days of card generation",
        ],
        "Renewal Benefits": [
          "7,500 reward points on the payment of annual fee and on spending Rs. 8 lakh in a statement year",
        ],
        "Other Benefits": [
          "Get complimentary roadside assistance in India, up to 4 times every year, worth Rs. 1,399",
          "Lost card liability and purchase protection cover of Rs. 25,000 each with Rs. 2 lakh personal accident cover",
          "Avail credit shield coverage of Rs. 50,000 via this card",
        ],
      },
      creditCardJoiningFeeAmount: "499",
      creditCardJoiningFeeAdditionalText: "plus applicable taxes",
      creditCardJoiningFeeDescription:
        "Get up to ₹500 cashback on 1st UPI transaction within 15 days of card issue",
      creditCardAnnualFeeAmount: "499",
      creditCardAnnualFeeAdditionalText: "plus applicable taxes",
      creditCardAnnualFeeDescription: "",
      cardOrientation: "vertical",
      cardNetwork: "Rupay",
      cardCategory: {
        Cashback: "cashback",
      },
      maximumBenifits: 0,
      effectiveFree: 1,
      cardCategoryDescription: {
        cashback: [
          "1% cashback on all UPI transactions",
          "0.5% cashback on insurance & utilities",
          "0.5% cashback on all online spends",
        ],
      },
      seoLink: "https://www.paisabazaar.com/idfc-first-bank/idfc-first-earn-credit-card/",
      voucherEligibility: "",
      nameOnCard: {
        singleLine: true,
        position: {
          x: 3,
          y: 17,
        },
        color: "#000000",
      },
      exclusivelyOnPb: false,
      trendingOffers: [],
      voucherValue: "",
    },
    value: "idfc-first-earn-credit-card",
    id: 60,
  },
];

export const CREDIT_CARDS = Array.from(
  new Map(CREDIT_CARDS_RAW.map((card) => [card.value, card])).values(),
);
