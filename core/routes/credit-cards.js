import express from "express";
import { query, RecommendationModel, CreditCardModel } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import { sanitizeInput } from "../middleware/security.js";

const router = express.Router();

// Get all credit cards with filtering and pagination (PRIVATE - authenticated users only)
router.get("/", authenticateToken, sanitizeInput, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      issuer,
      category,
      search,
      sortBy = "title",
      sortOrder = "ASC",
    } = req.query;

    const offset = (page - 1) * limit;
    const validSortColumns = ["title", "issuer", "rating", "created_at"];
    const validSortOrders = ["ASC", "DESC"];

    const finalSortBy = validSortColumns.includes(sortBy) ? sortBy : "title";
    const finalSortOrder = validSortOrders.includes(sortOrder.toUpperCase())
      ? sortOrder.toUpperCase()
      : "ASC";

    let queryText = `
      SELECT 
        id, card_id, title, issuer, image, rating, annual_fee, rewards, benefits,
        welcome_bonus, milestones, why_to_recommend, best_suited_for, eligibility,
        cta, tags, waiver_condition, reward_rate, created_at
      FROM credit_cards 
      WHERE 1=1
    `;
    const queryParams = [];
    let paramCount = 0;

    // Filter by issuer
    if (issuer) {
      paramCount++;
      queryText += ` AND LOWER(issuer) = LOWER($${paramCount})`;
      queryParams.push(issuer);
    }

    // Filter by category (best_suited_for)
    if (category) {
      paramCount++;
      queryText += ` AND best_suited_for ? $${paramCount}`;
      queryParams.push(category);
    }

    // Search functionality
    if (search) {
      paramCount++;
      queryText += ` AND (
        LOWER(title) LIKE LOWER($${paramCount}) OR 
        LOWER(issuer) LIKE LOWER($${paramCount}) OR 
        LOWER(why_to_recommend) LIKE LOWER($${paramCount}) OR
        tags::text ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
    }

    // Add sorting and pagination
    queryText += ` ORDER BY ${finalSortBy} ${finalSortOrder} LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    queryParams.push(limit, offset);

    const result = await query(queryText, queryParams);

    // Get total count for pagination
    let countQuery = "SELECT COUNT(*) as total FROM credit_cards WHERE 1=1";
    const countParams = [];
    let countParamCount = 0;

    if (issuer) {
      countParamCount++;
      countQuery += ` AND LOWER(issuer) = LOWER($${countParamCount})`;
      countParams.push(issuer);
    }

    if (category) {
      countParamCount++;
      countQuery += ` AND best_suited_for ? $${countParamCount}`;
      countParams.push(category);
    }

    if (search) {
      countParamCount++;
      countQuery += ` AND (
        LOWER(title) LIKE LOWER($${countParamCount}) OR 
        LOWER(issuer) LIKE LOWER($${countParamCount}) OR 
        LOWER(why_to_recommend) LIKE LOWER($${countParamCount}) OR
        tags::text ILIKE $${countParamCount}
      )`;
      countParams.push(`%${search}%`);
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      cards: result.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching credit cards:", error);
    res.status(500).json({
      error: "Failed to fetch credit cards",
      message: "Internal server error",
    });
  }
});

// Get single credit card by ID (PRIVATE)
router.get("/:cardId", authenticateToken, async (req, res) => {
  try {
    const { cardId } = req.params;

    const result = await query(
      `SELECT * FROM credit_cards WHERE card_id = $1 OR id = $1`,
      [cardId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Credit card not found",
        message: "The requested credit card could not be found",
      });
    }

    res.json({
      card: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching credit card:", error);
    res.status(500).json({
      error: "Failed to fetch credit card",
      message: "Internal server error",
    });
  }
});

// Get unique issuers for filtering
router.get("/meta/issuers", async (req, res) => {
  try {
    const result = await query(
      `SELECT DISTINCT issuer FROM credit_cards ORDER BY issuer ASC`,
    );

    res.json({
      issuers: result.rows.map((row) => row.issuer),
    });
  } catch (error) {
    console.error("Error fetching issuers:", error);
    res.status(500).json({
      error: "Failed to fetch issuers",
      message: "Internal server error",
    });
  }
});

// Get unique categories for filtering
router.get("/meta/categories", async (req, res) => {
  try {
    const result = await query(`
      SELECT DISTINCT jsonb_array_elements_text(best_suited_for) as category 
      FROM credit_cards 
      WHERE best_suited_for IS NOT NULL
      ORDER BY category ASC
    `);

    res.json({
      categories: result.rows.map((row) => row.category),
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      error: "Failed to fetch categories",
      message: "Internal server error",
    });
  }
});

// Get personalized credit card recommendations (PRIVATE)
router.post(
  "/recommendations",
  authenticateToken,
  sanitizeInput,
  async (req, res) => {
    try {
      const {
        spendingHabit, // 'travel', 'dining', 'everyday_spending', 'commuter'
        incomeLevel, // 'low', 'medium', 'high', 'very_high'
        cibilScore, // 'poor', 'average', 'good', 'excellent', 'new_to_credit'
        desiredBenefit, // 'cashback', 'travel', 'points', 'build_credit'
        maxAnnualFee, // optional number
        preferredIssuers = [], // optional array of issuer names
        limit = 5,
      } = req.body;

      // Get all credit cards
      const allCardsResult = await query(`
      SELECT 
        id, card_id, title, issuer, image, rating, annual_fee, rewards, benefits,
        welcome_bonus, milestones, why_to_recommend, best_suited_for, eligibility,
        cta, tags, waiver_condition, reward_rate, lounge_access, dining, golf, insurance
      FROM credit_cards 
      ORDER BY title ASC
    `);

      const cards = allCardsResult.rows;

      // Smart recommendation algorithm
      const scoredCards = cards.map((card) => {
        let score = 0;
        let reasons = [];
        let matchFactors = [];

        // Spending Habit Matching (30% weight)
        if (spendingHabit && card.best_suited_for) {
          const suitableFor = Array.isArray(card.best_suited_for)
            ? card.best_suited_for
            : [];
          const spendingMatches = {
            travel: ["Travel", "travel", "Luxury Travel", "High Spenders"],
            dining: ["Dining", "dining", "Food", "food", "Food Delivery"],
            everyday_spending: [
              "Shopping",
              "shopping",
              "Online Shopping",
              "Everyday Spends",
            ],
            commuter: ["Fuel", "fuel", "Travel", "travel"],
          };

          const matchingCategories = spendingMatches[spendingHabit] || [];
          const hasMatch = suitableFor.some((category) =>
            matchingCategories.some((match) =>
              category.toLowerCase().includes(match.toLowerCase()),
            ),
          );

          if (hasMatch) {
            score += 30;
            reasons.push(
              `Perfect for ${spendingHabit.replace("_", " ")} expenses`,
            );
            matchFactors.push("spending_match");
          }
        }

        // Income Level Matching (25% weight)
        if (incomeLevel && card.eligibility) {
          const eligibility = card.eligibility;
          let incomeMatch = false;

          if (typeof eligibility === "object" && eligibility !== null) {
            const incomeReq = JSON.stringify(eligibility).toLowerCase();

            switch (incomeLevel) {
              case "low":
                incomeMatch =
                  incomeReq.includes("20,000") ||
                  incomeReq.includes("3 lakh") ||
                  incomeReq.includes("entry");
                break;
              case "medium":
                incomeMatch =
                  incomeReq.includes("15,000") ||
                  incomeReq.includes("6 lakh") ||
                  incomeReq.includes("medium");
                break;
              case "high":
                incomeMatch =
                  incomeReq.includes("1 lakh") ||
                  incomeReq.includes("18 lakh") ||
                  incomeReq.includes("high");
                break;
              case "very_high":
                incomeMatch =
                  incomeReq.includes("invite") ||
                  incomeReq.includes("45 lakh") ||
                  incomeReq.includes("premium");
                break;
            }
          }

          if (incomeMatch) {
            score += 25;
            reasons.push("Matches your income bracket");
            matchFactors.push("income_match");
          }
        }

        // CIBIL Score Matching (20% weight)
        if (cibilScore) {
          let cibilMatch = false;
          const cardInfo = JSON.stringify(card).toLowerCase();

          switch (cibilScore) {
            case "poor":
            case "new_to_credit":
              cibilMatch =
                cardInfo.includes("entry") ||
                cardInfo.includes("first") ||
                cardInfo.includes("basic") ||
                card.title.toLowerCase().includes("simplysave");
              break;
            case "average":
              cibilMatch =
                !cardInfo.includes("premium") &&
                !cardInfo.includes("invite") &&
                !cardInfo.includes("elite") &&
                !cardInfo.includes("infinia");
              break;
            case "good":
              cibilMatch =
                cardInfo.includes("gold") ||
                cardInfo.includes("platinum") ||
                cardInfo.includes("regalia") ||
                cardInfo.includes("prime");
              break;
            case "excellent":
              cibilMatch =
                cardInfo.includes("premium") ||
                cardInfo.includes("elite") ||
                cardInfo.includes("infinia") ||
                cardInfo.includes("invite") ||
                cardInfo.includes("metal");
              break;
          }

          if (cibilMatch) {
            score += 20;
            reasons.push("Suitable for your credit profile");
            matchFactors.push("cibil_match");
          }
        }

        // Desired Benefit Matching (15% weight)
        if (desiredBenefit) {
          const cardDetails = JSON.stringify(card).toLowerCase();
          let benefitMatch = false;

          switch (desiredBenefit) {
            case "cashback":
              benefitMatch =
                cardDetails.includes("cashback") ||
                cardDetails.includes("cash back");
              break;
            case "travel":
              benefitMatch =
                cardDetails.includes("lounge") ||
                cardDetails.includes("travel") ||
                cardDetails.includes("miles") ||
                cardDetails.includes("priority pass");
              break;
            case "points":
              benefitMatch =
                cardDetails.includes("reward points") ||
                cardDetails.includes("membership rewards") ||
                cardDetails.includes("points");
              break;
            case "build_credit":
              benefitMatch =
                card.title.toLowerCase().includes("entry") ||
                card.title.toLowerCase().includes("first") ||
                cardDetails.includes("no annual fee");
              break;
          }

          if (benefitMatch) {
            score += 15;
            reasons.push(`Great ${desiredBenefit.replace("_", " ")} benefits`);
            matchFactors.push("benefit_match");
          }
        }

        // Annual Fee Consideration (5% weight)
        if (maxAnnualFee && card.annual_fee) {
          const feeInfo = JSON.stringify(card.annual_fee).toLowerCase();
          const hasLowFee =
            feeInfo.includes("nil") ||
            feeInfo.includes("free") ||
            feeInfo.includes("499") ||
            feeInfo.includes("500");

          if (maxAnnualFee <= 1000 && hasLowFee) {
            score += 5;
            reasons.push("Low annual fee");
            matchFactors.push("fee_match");
          } else if (maxAnnualFee > 1000) {
            score += 5;
            matchFactors.push("fee_acceptable");
          }
        }

        // Preferred Issuer Bonus (5% weight)
        if (
          preferredIssuers.length > 0 &&
          preferredIssuers.includes(card.issuer)
        ) {
          score += 5;
          reasons.push(`From your preferred bank: ${card.issuer}`);
          matchFactors.push("issuer_match");
        }

        // Rating bonus
        if (card.rating) {
          const rating = parseFloat(card.rating);
          if (rating >= 4.5) {
            score += 3;
            matchFactors.push("high_rating");
          }
        }

        return {
          ...card,
          score,
          reasons: reasons.slice(0, 3), // Top 3 reasons
          matchFactors,
          matchPercentage: Math.min(Math.round(score), 100),
        };
      });

      // Sort by score and get top recommendations
      const topRecommendations = scoredCards
        .filter((card) => card.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, parseInt(limit));

      // Prepare final recommendations (either matched or fallback)
      let finalRecommendations = topRecommendations;
      let isFallback = false;
      let responseMessage = `Found ${topRecommendations.length} personalized recommendations`;

      // If no matches found, return top-rated cards as fallback
      if (topRecommendations.length === 0) {
        finalRecommendations = scoredCards
          .sort((a, b) => {
            const ratingA = parseFloat(a.rating) || 0;
            const ratingB = parseFloat(b.rating) || 0;
            return ratingB - ratingA;
          })
          .slice(0, 3)
          .map((card) => ({
            ...card,
            score: 50,
            reasons: ["Popular choice", "Good overall rating"],
            matchPercentage: 50,
            isFallback: true,
          }));

        isFallback = true;
        responseMessage =
          "No perfect matches found. Here are some popular options.";
      }

      // Save recommendations to database
      try {
        const preferences = {
          spendingHabit,
          incomeLevel,
          cibilScore,
          desiredBenefit,
          maxAnnualFee,
          preferredIssuers,
        };

        // Create a recommendation session
        const session = await RecommendationModel.createSession(
          req.user.id,
          preferences,
          finalRecommendations.length,
          isFallback,
          responseMessage,
        );

        // Save each recommendation
        for (const recommendation of finalRecommendations) {
          await RecommendationModel.saveRecommendation(
            req.user.id,
            session.id,
            recommendation.id,
            {
              score: recommendation.score,
              matchPercentage: recommendation.matchPercentage,
              reasons: recommendation.reasons,
              matchFactors: recommendation.matchFactors,
              userPreferences: preferences,
              isFallback: recommendation.isFallback || false,
            },
          );
        }

        console.log(
          `✅ Saved ${finalRecommendations.length} recommendations for user ${req.user.id}`,
        );
      } catch (saveError) {
        console.error("Error saving recommendations:", saveError);
        // Don't fail the request if saving fails, just log the error
      }

      // Return response
      if (isFallback) {
        return res.json({
          recommendations: finalRecommendations,
          count: finalRecommendations.length,
          message: responseMessage,
          isFallback: true,
        });
      }

      res.json({
        recommendations: finalRecommendations,
        count: finalRecommendations.length,
        message: responseMessage,
        preferences: {
          spendingHabit,
          incomeLevel,
          cibilScore,
          desiredBenefit,
        },
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({
        error: "Failed to get recommendations",
        message: "Internal server error",
      });
    }
  },
);

// Get user's saved recommendations (PRIVATE)
router.get("/recommendations/history", authenticateToken, async (req, res) => {
  try {
    const { limit = 10, sessionId } = req.query;

    const recommendations = await RecommendationModel.getUserRecommendations(
      req.user.id,
      { limit: parseInt(limit), sessionId },
    );

    res.json({
      recommendations: recommendations.map((rec) => ({
        id: rec.id,
        sessionId: rec.session_id,
        score: rec.score,
        matchPercentage: rec.match_percentage,
        reasons: rec.reasons,
        matchFactors: rec.match_factors,
        userPreferences: rec.user_preferences,
        isFallback: rec.is_fallback,
        createdAt: rec.created_at,
        sessionCreatedAt: rec.session_created_at,
        message: rec.message,
        card: {
          id: rec.card_id,
          title: rec.title,
          issuer: rec.issuer,
          image: rec.image,
          rating: rec.rating,
          annual_fee: rec.annual_fee,
          rewards: rec.rewards,
          benefits: rec.benefits,
          welcome_bonus: rec.welcome_bonus,
          why_to_recommend: rec.why_to_recommend,
          best_suited_for: rec.best_suited_for,
          eligibility: rec.eligibility,
          cta: rec.cta,
        },
      })),
      count: recommendations.length,
    });
  } catch (error) {
    console.error("Error fetching recommendation history:", error);
    res.status(500).json({
      error: "Failed to fetch recommendation history",
      message: "Internal server error",
    });
  }
});

// Get user's recommendation sessions (PRIVATE)
router.get("/recommendations/sessions", authenticateToken, async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const sessions = await RecommendationModel.getUserRecommendationSessions(
      req.user.id,
      parseInt(limit),
    );

    res.json({
      sessions: sessions.map((session) => ({
        id: session.id,
        preferences: session.session_preferences,
        totalRecommendations: session.total_recommendations,
        isFallback: session.is_fallback,
        message: session.message,
        createdAt: session.created_at,
      })),
      count: sessions.length,
    });
  } catch (error) {
    console.error("Error fetching recommendation sessions:", error);
    res.status(500).json({
      error: "Failed to fetch recommendation sessions",
      message: "Internal server error",
    });
  }
});

export default router;
