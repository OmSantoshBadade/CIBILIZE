export interface ValidationFeedback {
  message: string;
  type: "success" | "warning" | "error" | "info";
  icon: string;
  scoreImpact?: string;
}

export const getValidationFeedback = (
  field: string,
  value: string | number,
  allValues?: Record<string, unknown>,
): ValidationFeedback | null => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  switch (field) {
    case "income":
      if (numValue >= 100000) {
        return {
          message: "Excellent! High income positively impacts your score",
          type: "success",
          icon: "💰",
          scoreImpact: "+25 to +35 points",
        };
      } else if (numValue >= 50000) {
        return {
          message: "Good income level for credit applications",
          type: "success",
          icon: "✅",
          scoreImpact: "+10 to +20 points",
        };
      } else if (numValue >= 25000) {
        return {
          message: "Moderate income - consider building credit history",
          type: "info",
          icon: "ℹ️",
          scoreImpact: "Neutral impact",
        };
      } else if (numValue > 0) {
        return {
          message: "Lower income may limit premium card options",
          type: "warning",
          icon: "⚠️",
          scoreImpact: "-10 to -20 points",
        };
      }
      break;

    case "utilization":
      if (numValue <= 10) {
        return {
          message: "Perfect! Very low utilization boosts your score",
          type: "success",
          icon: "🎯",
          scoreImpact: "+30 to +40 points",
        };
      } else if (numValue <= 30) {
        return {
          message: "Great! Keeping utilization under 30% is ideal",
          type: "success",
          icon: "👍",
          scoreImpact: "+15 to +25 points",
        };
      } else if (numValue <= 50) {
        return {
          message: "Consider paying down balances to improve score",
          type: "warning",
          icon: "📊",
          scoreImpact: "-5 to -15 points",
        };
      } else if (numValue <= 70) {
        return {
          message: "High utilization significantly impacts score",
          type: "warning",
          icon: "⚠️",
          scoreImpact: "-20 to -35 points",
        };
      } else {
        return {
          message: "Very high utilization - urgent attention needed",
          type: "error",
          icon: "🚨",
          scoreImpact: "-40 to -60 points",
        };
      }
      break;

    case "missedEMIs":
      if (numValue === 0) {
        return {
          message: "Excellent payment history! This boosts your score",
          type: "success",
          icon: "🏆",
          scoreImpact: "+20 to +30 points",
        };
      } else if (numValue <= 1) {
        return {
          message: "One missed payment - maintain consistency going forward",
          type: "warning",
          icon: "⚠️",
          scoreImpact: "-10 to -20 points",
        };
      } else if (numValue <= 3) {
        return {
          message: "Multiple missed payments hurt your score significantly",
          type: "error",
          icon: "❌",
          scoreImpact: "-30 to -50 points",
        };
      } else {
        return {
          message: "Frequent missed payments severely impact creditworthiness",
          type: "error",
          icon: "🚨",
          scoreImpact: "-50 to -80 points",
        };
      }
      break;

    case "age":
      if (numValue >= 30 && numValue <= 50) {
        return {
          message: "Prime age group for credit applications",
          type: "success",
          icon: "👤",
          scoreImpact: "+5 to +15 points",
        };
      } else if (numValue >= 25 && numValue < 30) {
        return {
          message: "Good age for building long-term credit history",
          type: "info",
          icon: "📈",
          scoreImpact: "Neutral to +5 points",
        };
      } else if (numValue < 25) {
        return {
          message: "Young age - focus on building credit history",
          type: "info",
          icon: "🌱",
          scoreImpact: "-5 to 0 points",
        };
      } else if (numValue > 50) {
        return {
          message: "Mature age with established credit patterns",
          type: "info",
          icon: "🎯",
          scoreImpact: "Neutral impact",
        };
      }
      break;

    case "loanAmount":
      if (allValues?.income) {
        const debtToIncomeRatio = numValue / (allValues.income * 12);
        if (debtToIncomeRatio <= 2) {
          return {
            message: "Low debt-to-income ratio - excellent for your score",
            type: "success",
            icon: "💪",
            scoreImpact: "+10 to +20 points",
          };
        } else if (debtToIncomeRatio <= 3) {
          return {
            message: "Moderate debt level - manageable for your income",
            type: "info",
            icon: "⚖️",
            scoreImpact: "Neutral impact",
          };
        } else if (debtToIncomeRatio <= 5) {
          return {
            message: "High debt-to-income ratio may affect score",
            type: "warning",
            icon: "📊",
            scoreImpact: "-10 to -25 points",
          };
        } else {
          return {
            message: "Very high debt burden - consider debt consolidation",
            type: "error",
            icon: "⚠️",
            scoreImpact: "-25 to -40 points",
          };
        }
      }
      break;

    default:
      return null;
  }

  return null;
};

export const getScoreImprovementTips = (
  currentScore: number,
  formData: Record<string, unknown>,
): Array<{ tip: string; impact: string; priority: "high" | "medium" | "low" }> => {
  const tips = [];
  const utilization = parseFloat(formData.utilization) || 0;
  const missedEMIs = parseInt(formData.missedEMIs) || 0;
  const income = parseFloat(formData.income) || 0;
  const loanAmount = parseFloat(formData.loanAmount) || 0;

  // Utilization tips
  if (utilization > 30) {
    const reduction = Math.ceil((utilization - 25) / 5) * 5;
    const potentialGain = Math.min(reduction * 2, 50);
    tips.push({
      tip: `Reduce credit utilization by ${reduction}% to boost your score`,
      impact: `+${potentialGain} points`,
      priority: "high" as const,
    });
  }

  // Payment history tips
  if (missedEMIs > 0) {
    tips.push({
      tip: "Set up auto-pay to avoid future missed payments",
      impact: "+20-30 points over 6 months",
      priority: "high" as const,
    });
  }

  // Income tips
  if (income < 50000) {
    tips.push({
      tip: "Consider adding additional income sources to improve eligibility",
      impact: "+15-25 points",
      priority: "medium" as const,
    });
  }

  // Debt management tips
  const debtToIncomeRatio = loanAmount / (income * 12);
  if (debtToIncomeRatio > 3) {
    tips.push({
      tip: "Pay down existing loans to improve debt-to-income ratio",
      impact: "+20-35 points",
      priority: "high" as const,
    });
  }

  // General tips based on score range
  if (currentScore < 650) {
    tips.push({
      tip: "Consider a secured credit card to build payment history",
      impact: "+30-50 points over 12 months",
      priority: "medium" as const,
    });
  }

  return tips.slice(0, 3); // Return top 3 tips
};
