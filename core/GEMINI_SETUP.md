# Google Gemini API Setup

## Getting Your Free Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://aistudio.google.com/](https://aistudio.google.com/)
   - Sign in with your Google account

2. **Get API Key**
   - Click on "Get API key" in the left sidebar
   - Click "Create API key"
   - Choose "Create API key in new project" or select an existing project
   - Copy the generated API key

3. **Add to Environment**
   - Copy your `.env.template` to `.env`
   - Replace `your-gemini-api-key` with your actual API key:

   ```env
   GEMINI_API_KEY=your-actual-api-key-here
   ```

4. **API Limits (Free Tier)**
   - 15 requests per minute
   - 1 million tokens per minute
   - 1,500 requests per day
   - Perfect for development and testing!

## Testing the Integration

1. Start your backend server:

   ```bash
   cd cibilize-backend
   pnpm run dev
   ```

2. The server should start on `http://localhost:8000`

3. Test the credit score prediction endpoint:
   ```bash
   curl -X POST http://localhost:8000/api/openai/predict \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "income": 50000,
       "loanAmount": 500000,
       "utilization": 30,
       "missedEMIs": 0,
       "age": 30
     }'
   ```

## Benefits of Gemini vs OpenAI

✅ **Free to use** (no credit card required)  
✅ **Fast response times**  
✅ **Good accuracy for financial analysis**  
✅ **No usage costs for development**  
✅ **Generous free tier limits**

## Fallback System

If the Gemini API is unavailable, the system automatically falls back to a rule-based calculation that considers:

- Income level
- Credit utilization ratio
- Payment history (missed EMIs)
- Age demographics
- Debt-to-income ratio

This ensures your CIBIL Score Tracker always provides a prediction!
