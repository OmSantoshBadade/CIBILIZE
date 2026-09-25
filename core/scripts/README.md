# Credit Cards Import Script

This script imports credit card data from `scraped_cards_json.json` into the PostgreSQL database.

## Usage

1. Make sure your database is set up and the `.env` file is configured properly
2. Ensure the `scraped_cards_json.json` file exists in the root directory
3. Run the import script:

```bash
cd cibilize-backend
pnpm run import-cards
```

## What it does

1. **Creates the credit_cards table** with all necessary columns and indexes
2. **Normalizes the data** to handle different data formats in the JSON
3. **Imports or updates** credit card records (upsert functionality)
4. **Provides detailed logging** of the import process

## Database Schema

The script creates a `credit_cards` table with the following structure:

- `id` - UUID primary key
- `card_id` - Unique identifier for the card
- `title` - Card name
- `issuer` - Bank/financial institution
- `image` - Card image URL
- `rating` - Card rating
- `annual_fee` - Fee structure (JSONB)
- `rewards` - Rewards information (JSONB)
- `benefits` - Card benefits (JSONB)
- `eligibility` - Eligibility criteria (JSONB)
- `tags` - Search tags (JSONB)
- And many more fields...

## API Endpoints

After importing, the following endpoints will be available:

- `GET /api/credit-cards` - List all cards with filtering and pagination
- `GET /api/credit-cards/:cardId` - Get specific card details
- `GET /api/credit-cards/meta/issuers` - Get list of all issuers
- `GET /api/credit-cards/meta/categories` - Get list of all categories
- `POST /api/credit-cards/recommendations` - Get personalized recommendations

## Features

- **Pagination** - Efficient handling of large datasets
- **Filtering** - By issuer, category, rating, etc.
- **Search** - Full-text search across card details
- **Recommendations** - AI-powered card suggestions
- **Upsert logic** - Updates existing cards or creates new ones
- **Data validation** - Ensures data integrity
- **Performance optimized** - With proper indexes and JSONB columns

## Error Handling

The script includes comprehensive error handling and will:

- Continue processing even if individual cards fail
- Provide detailed error messages
- Show a summary of successful imports, updates, and errors
