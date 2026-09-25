import fs from "fs/promises";
import path from "path";
import { query, initializeDatabase } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

async function createCreditCardsTable() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS credit_cards (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        card_id VARCHAR(500) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        issuer VARCHAR(100) NOT NULL,
        image TEXT,
        rating VARCHAR(10),
        annual_fee JSONB,
        rewards JSONB,
        benefits JSONB,
        welcome_bonus TEXT,
        milestones JSONB,
        why_to_recommend TEXT,
        best_suited_for JSONB,
        eligibility JSONB,
        cta JSONB,
        tags JSONB,
        waiver_condition TEXT,
        reward_rate TEXT,
        reward_redemption TEXT,
        travel TEXT,
        lounge_access TEXT,
        dining TEXT,
        golf TEXT,
        insurance TEXT,
        fees_and_charges JSONB,
        exclusions_on_cashback JSONB,
        foreign_currency_markup TEXT,
        domestic_lounge_access TEXT,
        international_lounge_access TEXT,
        insurance_benefits TEXT,
        apply_link TEXT,
        learn_more TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_credit_cards_issuer ON credit_cards(issuer);
      CREATE INDEX IF NOT EXISTS idx_credit_cards_tags ON credit_cards USING GIN(tags);
      CREATE INDEX IF NOT EXISTS idx_credit_cards_best_suited_for ON credit_cards USING GIN(best_suited_for);
    `);

    await query(`
      CREATE OR REPLACE FUNCTION update_credit_cards_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    await query(`
      DROP TRIGGER IF EXISTS update_credit_cards_updated_at ON credit_cards;
      CREATE TRIGGER update_credit_cards_updated_at
        BEFORE UPDATE ON credit_cards
        FOR EACH ROW
        EXECUTE FUNCTION update_credit_cards_updated_at();
    `);

    console.log("✅ Credit cards table created successfully");
  } catch (error) {
    console.error("❌ Error creating credit cards table:", error);
    throw error;
  }
}

function normalizeCardData(card) {
  // Generate a clean card_id from the existing id or title
  const cardId =
    card.id ||
    card.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 500);

  // Normalize annual_fee to consistent format
  let annualFee = card.annual_fee;
  if (Array.isArray(annualFee)) {
    annualFee = {
      joining: annualFee[0] || null,
      renewal: annualFee[1] || null,
      waiver_condition: annualFee[2] || card.waiver_condition || null,
    };
  }

  // Normalize best_suited_for to array
  let bestSuitedFor = card.best_suited_for;
  if (typeof bestSuitedFor === "string") {
    bestSuitedFor = bestSuitedFor.split(",").map((s) => s.trim());
  }

  return {
    card_id: cardId,
    title: card.title,
    issuer: card.issuer,
    image: card.image,
    rating: card.rating ? String(card.rating) : null,
    annual_fee: annualFee,
    rewards: card.rewards,
    benefits: card.benefits,
    welcome_bonus: card.welcome_bonus,
    milestones: card.milestones,
    why_to_recommend: card.why_to_recommend,
    best_suited_for: bestSuitedFor,
    eligibility: card.eligibility,
    cta: card.cta,
    tags: card.tags,
    waiver_condition: card.waiver_condition,
    reward_rate: card.reward_rate,
    reward_redemption: card.reward_redemption,
    travel: card.travel,
    lounge_access: card.lounge_access,
    dining: card.dining,
    golf: card.golf,
    insurance: card.insurance,
    fees_and_charges: card.fees_and_charges,
    exclusions_on_cashback: card.exclusions_on_cashback,
    foreign_currency_markup: card.foreign_currency_markup,
    domestic_lounge_access: card.domestic_lounge_access,
    international_lounge_access: card.international_lounge_access,
    insurance_benefits: card.insurance_benefits,
    apply_link: card.apply_link,
    learn_more: card.learn_more,
  };
}

async function importCreditCards() {
  try {
    const jsonPath = path.resolve(process.cwd(), "scraped_cards_json.json");
    const jsonData = await fs.readFile(jsonPath, "utf8");
    const cards = JSON.parse(jsonData);

    console.log(`📊 Found ${cards.length} credit cards to import`);

    let imported = 0;
    let updated = 0;
    let errors = 0;

    for (const card of cards) {
      try {
        const normalizedCard = normalizeCardData(card);

        // Check if card already exists
        const existingCard = await query(
          "SELECT id FROM credit_cards WHERE card_id = $1",
          [normalizedCard.card_id],
        );

        if (existingCard.rows.length > 0) {
          // Update existing card
          await query(
            `
            UPDATE credit_cards SET
              title = $2,
              issuer = $3,
              image = $4,
              rating = $5,
              annual_fee = $6,
              rewards = $7,
              benefits = $8,
              welcome_bonus = $9,
              milestones = $10,
              why_to_recommend = $11,
              best_suited_for = $12,
              eligibility = $13,
              cta = $14,
              tags = $15,
              waiver_condition = $16,
              reward_rate = $17,
              reward_redemption = $18,
              travel = $19,
              lounge_access = $20,
              dining = $21,
              golf = $22,
              insurance = $23,
              fees_and_charges = $24,
              exclusions_on_cashback = $25,
              foreign_currency_markup = $26,
              domestic_lounge_access = $27,
              international_lounge_access = $28,
              insurance_benefits = $29,
              apply_link = $30,
              learn_more = $31,
              updated_at = CURRENT_TIMESTAMP
            WHERE card_id = $1
          `,
            [
              normalizedCard.card_id,
              normalizedCard.title,
              normalizedCard.issuer,
              normalizedCard.image,
              normalizedCard.rating,
              JSON.stringify(normalizedCard.annual_fee),
              JSON.stringify(normalizedCard.rewards),
              JSON.stringify(normalizedCard.benefits),
              normalizedCard.welcome_bonus,
              JSON.stringify(normalizedCard.milestones),
              normalizedCard.why_to_recommend,
              JSON.stringify(normalizedCard.best_suited_for),
              JSON.stringify(normalizedCard.eligibility),
              JSON.stringify(normalizedCard.cta),
              JSON.stringify(normalizedCard.tags),
              normalizedCard.waiver_condition,
              normalizedCard.reward_rate,
              normalizedCard.reward_redemption,
              normalizedCard.travel,
              normalizedCard.lounge_access,
              normalizedCard.dining,
              normalizedCard.golf,
              normalizedCard.insurance,
              JSON.stringify(normalizedCard.fees_and_charges),
              JSON.stringify(normalizedCard.exclusions_on_cashback),
              normalizedCard.foreign_currency_markup,
              normalizedCard.domestic_lounge_access,
              normalizedCard.international_lounge_access,
              normalizedCard.insurance_benefits,
              normalizedCard.apply_link,
              normalizedCard.learn_more,
            ],
          );
          updated++;
          console.log(`🔄 Updated: ${normalizedCard.title}`);
        } else {
          // Insert new card
          await query(
            `
            INSERT INTO credit_cards (
              card_id, title, issuer, image, rating, annual_fee, rewards, benefits,
              welcome_bonus, milestones, why_to_recommend, best_suited_for, eligibility,
              cta, tags, waiver_condition, reward_rate, reward_redemption, travel,
              lounge_access, dining, golf, insurance, fees_and_charges, exclusions_on_cashback,
              foreign_currency_markup, domestic_lounge_access, international_lounge_access,
              insurance_benefits, apply_link, learn_more
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
              $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31
            )
          `,
            [
              normalizedCard.card_id,
              normalizedCard.title,
              normalizedCard.issuer,
              normalizedCard.image,
              normalizedCard.rating,
              JSON.stringify(normalizedCard.annual_fee),
              JSON.stringify(normalizedCard.rewards),
              JSON.stringify(normalizedCard.benefits),
              normalizedCard.welcome_bonus,
              JSON.stringify(normalizedCard.milestones),
              normalizedCard.why_to_recommend,
              JSON.stringify(normalizedCard.best_suited_for),
              JSON.stringify(normalizedCard.eligibility),
              JSON.stringify(normalizedCard.cta),
              JSON.stringify(normalizedCard.tags),
              normalizedCard.waiver_condition,
              normalizedCard.reward_rate,
              normalizedCard.reward_redemption,
              normalizedCard.travel,
              normalizedCard.lounge_access,
              normalizedCard.dining,
              normalizedCard.golf,
              normalizedCard.insurance,
              JSON.stringify(normalizedCard.fees_and_charges),
              JSON.stringify(normalizedCard.exclusions_on_cashback),
              normalizedCard.foreign_currency_markup,
              normalizedCard.domestic_lounge_access,
              normalizedCard.international_lounge_access,
              normalizedCard.insurance_benefits,
              normalizedCard.apply_link,
              normalizedCard.learn_more,
            ],
          );
          imported++;
          console.log(`✅ Imported: ${normalizedCard.title}`);
        }
      } catch (error) {
        console.error(
          `❌ Error processing card "${card.title}":`,
          error.message,
        );
        errors++;
      }
    }

    console.log("\n📈 Import Summary:");
    console.log(`✅ Imported: ${imported} new cards`);
    console.log(`🔄 Updated: ${updated} existing cards`);
    console.log(`❌ Errors: ${errors} cards failed`);
    console.log(
      `📊 Total processed: ${imported + updated + errors}/${cards.length}`,
    );
  } catch (error) {
    console.error("❌ Error importing credit cards:", error);
    throw error;
  }
}

async function main() {
  try {
    console.log("🚀 Starting credit cards import...");

    // Initialize database connection
    await initializeDatabase();

    // Create table
    await createCreditCardsTable();

    // Import data
    await importCreditCards();

    console.log("🎉 Credit cards import completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("💥 Import failed:", error);
    process.exit(1);
  }
}

// Run the script
main();
