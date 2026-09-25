import Firecrawl from "@mendable/firecrawl-js";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

const urls = [
  // "https://www.americanexpress.com/in/credit-cards/membership-rewards-card/?linknav=in-amex-cardshop-details-browse-AmericanExpressMembershipRewards&cpid=100495995",
  // "https://cardinsider.com/hdfc-bank/swiggy-hdfc-bank-credit-card/",
  // "https://cardinsider.com/hdfc-bank/hdfc-bank-regalia-gold-credit-card/",
  // "https://cardinsider.com/hdfc-bank/hdfc-bank-diners-club-black-metal-credit-card/",
  // "https://cardinsider.com/hdfc-bank/hdfc-bank-infinia-credit-card/",
  // "https://cardinsider.com/hdfc-bank/hdfc-bank-moneyback-plus-credit-card/",
  // "https://cardinsider.com/axis-bank/axis-bank-atlas-credit-card/",
  // "https://cardinsider.com/axis-bank/axis-bank-select-credit-card/",
  // "https://cardinsider.com/axis-bank/axis-bank-magnus-credit-card/",
  // "https://cardinsider.com/axis-bank/axis-bank-neo-credit-card/",
  // "https://cardinsider.com/icici-bank/icici-bank-coral-credit-card/",
  // "https://cardinsider.com/icici-bank/icici-bank-platinum-chip-credit-card/",
  // "https://cardinsider.com/icici-bank/times-black-icici-bank-credit-card-review/",
  // "https://cardinsider.com/icici-bank/amazon-pay-icici-bank-credit-card/",
  // "https://cardinsider.com/icici-bank/icici-bank-hpcl-coral-credit-card/",
  // "https://cardinsider.com/sbi-card/cashback-sbi-credit-card/",
  // "https://cardinsider.com/sbi-card/bpcl-sbi-card-octane/",
  // "https://cardinsider.com/sbi-card/reliance-sbi-card-prime/",
  // "https://cardinsider.com/sbi-card/sbi-simplyclick-credit-card/",
  // "https://cardinsider.com/sbi-card/sbi-simplysave-credit-card/",
  // "https://cardinsider.com/au-bank/lit-credit-card/",
  // "https://cardinsider.com/au-bank/zenith-plus-credit-card/",
  // "https://cardinsider.com/kotak/myntra-kotak-credit-card/",
  // "https://cardinsider.com/kotak/kotak-811-credit-card/",
  // "https://cardinsider.com/kotak/indianoil-kotak-credit-card/",
  // "https://cardinsider.com/indusind-bank/indusind-bank-avios-visa-infinite-credit-card/",
  // "https://cardinsider.com/indusind-bank/indusind-bank-platinum-rupay-credit-card/",
  // "https://cardinsider.com/indusind-bank/eazydiner-indusind-bank-credit-card/",
  // "https://cardinsider.com/idfc-first-bank/idfc-first-millennia-card/",
  // "https://cardinsider.com/idfc-first-bank/mayura-credit-card/",
  // "https://cardinsider.com/idfc-first-bank/idfc-hpcl-first-power-plus-credit-card/",
  // "https://cardinsider.com/rbl-bank/rbl-platinum-delight-credit-card/",
  // "https://cardinsider.com/hsbc-bank/hsbc-visa-platinum-credit-card/",
  // "https://cardinsider.com/hsbc-bank/hsbc-cashback-credit-card/",
  // "https://cardinsider.com/standard-chartered/standard-chartered-platinum-rewards-credit-card/",
  // "https://cardinsider.com/yes-bank/yes-bank-first-exclusive-credit-card/",
  // "https://cardinsider.com/yes-bank/yes-premia-credit-card/",


  "https://www.paisabazaar.com/indusind-bank/indusind-bank-legend-credit-card/",
  "https://www.paisabazaar.com/indusind-bank/indusind-bank-platinum-credit-cards/",
  "https://www.paisabazaar.com/indusind-bank/eazy-diner-indusind-platinum-credit-card/",
  "https://www.paisabazaar.com/indusind-bank/platinum-aura-edge-credit-card/",
  // "RBL Bank Paisabazaar Duet Credit Card" // No dedicated Paisabazaar link found
  "https://www.paisabazaar.com/axis-bank/ace-credit-card/",
  // "Flipkart Axis Bank Mastercard Credit Card" // No dedicated Paisabazaar link found
  "https://www.paisabazaar.com/axis-bank/airtel-axis-bank-credit-card/",
  "https://www.paisabazaar.com/axis-bank/axis-bank-my-zone-credit-cards/",
  // "IndianOil Axis Bank RuPay Credit Card" // No dedicated Paisabazaar link found
  "https://www.paisabazaar.com/sbi-bank/simplyclick-credit-card/",
  // "SBI BPCL Credit Card" // No dedicated Paisabazaar link found
  "https://www.paisabazaar.com/sbi-bank/sbi-simply-save-credit-card/",
  // "IRCTC SBI Platinum Card" // No dedicated Paisabazaar link found
  // "Tata Neu Infinity HDFC Bank Secured Credit Card" // No dedicated Paisabazaar link found
  // "Tata Neu Plus HDFC Bank Secured Credit Card" // No dedicated Paisabazaar link found
  "https://www.paisabazaar.com/idfc-first-bank/idfc-first-earn-credit-card/"
];

const outputFile = path.resolve(process.cwd(), "scraped_cards_json.txt");

async function appendToFile(content) {
  await fs.appendFile(outputFile, content, "utf8");
}

const jsonFormat = {
  type: "json",
  prompt:
    "Extract all relevant credit card details from the page in the following JSON array format. Each object should include: id, title, issuer, image, rating, annual_fee (joining, renewal, waiver_condition), rewards (type, rate, welcome_bonus, milestones), benefits (travel, lounge_access, dining, golf, insurance), why_to_recommend, best_suited_for, eligibility (age, income, credit_score), cta (apply_link, learn_more), and tags.",
  schema: [
    {
      id: "string",
      title: "string",
      issuer: "string",
      image: "string",
      rating: "number",
      annual_fee: {
        joining: "string",
        renewal: "string",
        waiver_condition: "string",
      },
      rewards: {
        type: "string",
        rate: "string",
        welcome_bonus: ["string"],
        milestones: ["string"],
      },
      benefits: {
        travel: ["string"],
        lounge_access: {
          domestic: "string|null",
          international: "string|null",
        },
        dining: ["string"],
        golf: "string|null",
        insurance: "string|null",
      },
      why_to_recommend: "string",
      best_suited_for: ["string"],
      eligibility: {
        age: "string",
        income: "string",
        credit_score: "string",
      },
      cta: {
        apply_link: "string",
        learn_more: "string",
      },
      tags: ["string"],
    },
  ],
};

async function main() {
  for (const url of urls) {
    try {
      const scrapeResult = await firecrawl.crawl(url, {
        formats: [jsonFormat],
        maxAge: 3600000,
      });

      let section = `\n\n==============================\nURL: ${url}\n==============================\n\n`;
      section += "----- JSON -----\n";
      section += JSON.stringify(scrapeResult.json, null, 2) + "\n\n";

      await appendToFile(section);

      console.log(`✅ Done (${url})`);
    } catch (err) {
      console.error(`❌ Error processing URL (${url}):`, err);
    }
  }
}

main();
