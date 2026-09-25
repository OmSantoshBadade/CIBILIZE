import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExpenseFileModel, ExpenseModel } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import { sanitizeInput } from "../middleware/security.js";
import { parseBankStatement } from "../utils/pdfParser.js";

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini AI
let genAI = null;
let model = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Function to get a working model by trying different model names
async function getWorkingModel() {
  if (!genAI) {
    throw new Error("Gemini AI not initialized - check API key");
  }

  const modelNames = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-pro-latest",
    "gemini-flash-latest",
    "gemini-2.5-pro",
    "gemini-2.0-flash-001",
    "gemini-2.5-flash-lite"
  ];

  for (const modelName of modelNames) {
    try {
      const testModel = genAI.getGenerativeModel({ model: modelName });
      // Test the model with a simple prompt
      const result = await testModel.generateContent("Hello");
      await result.response;
      console.log(`✅ Successfully initialized Gemini model: ${modelName}`);
      return testModel;
    } catch (error) {
      console.warn(`❌ Model ${modelName} failed:`, error.message);
      continue;
    }
  }
  
  throw new Error("No working Gemini model found. Please check your API key and model availability.");
}

/**
 * Consolidates duplicate or similar expenses from the same document
 * @param {Array} expenses Array of extracted expenses
 * @param {string} fileName Name of the source file
 * @returns {Array} Consolidated expenses array
 */
function consolidateExpenses(expenses, fileName) {
  if (expenses.length <= 1) {
    return expenses;
  }

  // Group expenses by currency and similar amounts
  const groups = {};
  
  expenses.forEach((expense, index) => {
    const currency = expense.currency || 'INR';
    const amount = parseFloat(expense.amount);
    const key = `${currency}_${amount}`;
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push({ ...expense, originalIndex: index });
  });

  const consolidated = [];
  
  Object.values(groups).forEach(group => {
    if (group.length === 1) {
      // Single expense, keep as is
      const { originalIndex, ...expense } = group[0];
      consolidated.push(expense);
    } else {
      // Multiple expenses with same currency and amount - likely duplicates
      console.log(`🔍 Found ${group.length} similar transactions:`, 
        group.map(e => `${e.description} (${e.currency} ${e.amount})`));
      
      // Choose the best description (longest, most descriptive)
      const bestExpense = group.reduce((best, current) => {
        const bestScore = getDescriptionScore(best.description, fileName);
        const currentScore = getDescriptionScore(current.description, fileName);
        return currentScore > bestScore ? current : best;
      });
      
      const { originalIndex, ...expense } = bestExpense;
      consolidated.push(expense);
      
      console.log(`✅ Consolidated to: ${expense.description} (${expense.currency} ${expense.amount})`);
    }
  });

  // Additional check for invoice files - should typically have only 1 expense
  if (fileName.toLowerCase().includes('inv') && consolidated.length > 1) {
    console.log(`⚠️  Invoice file has ${consolidated.length} expenses, checking for total amount...`);
    
    // For invoices, prefer the largest amount (likely the total)
    const largestExpense = consolidated.reduce((max, current) => {
      const maxAmount = parseFloat(max.amount);
      const currentAmount = parseFloat(current.amount);
      return currentAmount > maxAmount ? current : max;
    });
    
    console.log(`📋 Using largest amount for invoice: ${largestExpense.description} (${largestExpense.currency} ${largestExpense.amount})`);
    return [largestExpense];
  }

  return consolidated;
}

/**
 * Scores description quality for consolidation
 * @param {string} description The expense description
 * @param {string} fileName The source file name
 * @returns {number} Quality score
 */
function getDescriptionScore(description, fileName) {
  let score = description.length; // Longer descriptions are generally better
  
  // Bonus for descriptive terms
  if (description.toLowerCase().includes('invoice')) score += 20;
  if (description.toLowerCase().includes('payment')) score += 15;
  if (description.toLowerCase().includes('total')) score += 25;
  if (description.toLowerCase().includes('professional')) score += 10;
  if (description.toLowerCase().includes('service')) score += 10;
  
  // Penalty for generic terms
  if (description.toLowerCase().includes('expense from')) score -= 30;
  if (description.toLowerCase() === 'other') score -= 20;
  
  return score;
}

async function extractExpensesWithGemini(fileUrl, fileName, mimeType) {
  // Get a working model dynamically
  if (!model) {
    model = await getWorkingModel();
  }

  try {
    // Download the file to process it
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to download file: ${fileResponse.status}`);
    }

    const buffer = await fileResponse.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    // Determine the MIME type for Gemini
    let geminiMimeType = mimeType;
    if (mimeType === 'application/pdf') {
      geminiMimeType = 'application/pdf';
    } else if (mimeType.includes('image')) {
      geminiMimeType = mimeType;
    } else {
      // For other file types, convert to text and process as text
      const textContent = Buffer.from(buffer).toString('utf-8');
      return await extractExpensesFromTextWithGemini(textContent, fileName);
    }

    const prompt = `You are an expert financial document analyzer. Analyze this document and extract UNIQUE expense/payment transactions with precise currency detection.

Document: ${fileName}
Type: ${mimeType}

CRITICAL CURRENCY RULES:
- Look for $ symbols → currency: "USD" 
- Look for ₹, Rs, INR → currency: "INR"
- Look for €, EUR → currency: "EUR"
- For invoices/receipts: Use the EXACT currency shown in the document
- NEVER assume currency - extract what you see
- If amount shows "$804" → amount: 804, currency: "USD"
- If amount shows "₹1,234" → amount: 1234, currency: "INR"

SMART EXTRACTION RULES:
1. For INVOICES: Extract ONLY the final total amount (not individual line items)
2. For RECEIPTS: Extract ONLY the final total (not subtotals + tax separately)
3. For BANK STATEMENTS: Extract each unique debit transaction
4. AVOID DUPLICATES: Don't extract both subtotal and total - choose the final amount
5. SKIP: deposits, credits, refunds, salary, interest earned

CONSOLIDATION LOGIC:
- If you see subtotal + tax + total → Extract ONLY the total
- If you see multiple line items + grand total → Extract ONLY the grand total
- If you see the same transaction mentioned multiple times → Extract ONLY once
- For invoices: One entry per invoice (use the total amount)
- For bank statements: One entry per unique transaction

DESCRIPTION RULES:
- For invoices: "Invoice Payment - [Service Type]" or "Invoice #[Number]"
- For receipts: "[Merchant Name] Purchase" 
- For bank transactions: Clean merchant name
- Remove reference numbers, transaction IDs

CATEGORIZATION:
- Professional services, consulting, invoices → "Bills"
- Software, subscriptions → "Utilities" 
- Travel, hotels, flights → "Travel"
- Food, restaurants → "Food"
- Shopping, retail → "Shopping"
- Entertainment → "Entertainment"
- Default → "Other"

DATE HANDLING:
- Use document date if available
- For invoices: use invoice date or due date
- Format as YYYY-MM-DD
- If unclear, use current date

Return JSON array format:
[
  {
    "description": "Invoice Payment - Professional Services",
    "amount": 804.00,
    "currency": "USD",
    "category": "Bills",
    "date": "2024-10-15"
  }
]

CRITICAL: 
- Return ONLY the JSON array, no other text
- If no expenses found, return []
- ONE ENTRY per unique transaction/invoice/receipt
- Use FINAL/TOTAL amounts only (not subtotals)
- Avoid duplicate entries for the same transaction`;

    let result;
    try {
      // Try with file data first
      result = await model.generateContent([
        {
          inlineData: {
            data: base64Data,
            mimeType: geminiMimeType
          }
        },
        prompt
      ]);
    } catch (fileError) {
      console.warn("File processing failed, trying text-only approach:", fileError.message);
      
      // Fallback: convert file to text and process as text
      if (mimeType === 'application/pdf') {
        throw new Error("PDF processing requires file upload support");
      }
      
      const textContent = Buffer.from(buffer).toString('utf-8');
      return await extractExpensesFromTextWithGemini(textContent, fileName);
    }

    const aiResponse = await result.response;
    const text = aiResponse.text();

    if (!text) {
      throw new Error("No response from Gemini AI");
    }

    // Clean the response
    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/```json\s*/, "").replace(/```\s*$/, "");
    }
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```\s*/, "").replace(/```\s*$/, "");
    }

    try {
      const expenses = JSON.parse(cleanText);
      if (!Array.isArray(expenses)) {
        throw new Error("Response is not an array");
      }
      
      console.log(`✅ Gemini extracted ${expenses.length} expenses with currencies:`, 
        expenses.map(e => `${e.currency} ${e.amount}`).join(', '));
      
      // Post-process to remove duplicates and consolidate similar transactions
      const consolidatedExpenses = consolidateExpenses(expenses, fileName);
      
      if (consolidatedExpenses.length !== expenses.length) {
        console.log(`🔄 Consolidated ${expenses.length} → ${consolidatedExpenses.length} expenses (removed duplicates)`);
      }
      
      return consolidatedExpenses;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", cleanText);
      throw new Error("Invalid JSON response from Gemini");
    }

  } catch (error) {
    console.error("Gemini processing error:", error);
    throw error;
  }
}

async function extractExpensesFromTextWithGemini(textContent, fileName) {
  // Get a working model dynamically
  if (!model) {
    model = await getWorkingModel();
  }

  const prompt = `Analyze this text content from file "${fileName}" and extract expense transactions:

${textContent}

Extract expenses following the same rules as before. Return JSON array format.`;

  try {
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();

    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.replace(/```json\s*/, "").replace(/```\s*$/, "");
    }
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```\s*/, "").replace(/```\s*$/, "");
    }

    const expenses = JSON.parse(cleanText);
    return Array.isArray(expenses) ? expenses : [];
  } catch (error) {
    console.error("Text processing error:", error);
    return [];
  }
}

/**
 * Simple text-based expense extraction for non-PDF files
 * @param {string} fileUrl The URL of the file to process
 * @param {string} fileName The name of the file
 * @param {string} mimeType The MIME type of the file
 * @returns {Array} Array of extracted expenses or empty array
 */
async function extractExpensesFromText(fileUrl, fileName, mimeType) {
  try {
    // Only handle text-based files (CSV, TXT)
    if (!mimeType.includes('text') && !mimeType.includes('csv')) {
      console.log(`📄 Skipping non-text file: ${mimeType}`);
      return [];
    }
    
    // Download the text file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Use our improved text parser for CSV/text files
    const expenses = parseBankStatement(text);
    
    console.log(`📄 Text parser extracted ${expenses.length} expenses from ${fileName}`);
    return expenses;
  } catch (error) {
    console.error("Text parsing error:", error);
    console.log("📄 Text parsing failed, relying on AI processing only");
    return []; // Return empty array instead of dummy data
  }
}

router.post(
  "/process/:fileId",
  authenticateToken,
  sanitizeInput,
  async (req, res) => {
    try {
      const { fileId } = req.params;

      const file = await ExpenseFileModel.findById(fileId);

      if (!file) {
        return res.status(404).json({
          error: "File not found",
          message: "The specified file could not be found",
        });
      }

      if (file.user_id !== req.user.id) {
        return res.status(403).json({
          error: "Access denied",
          message: "You don't have permission to process this file",
        });
      }

      if (file.processing_status === "completed") {
        return res.status(400).json({
          error: "Already processed",
          message: "This file has already been processed",
        });
      }

      await ExpenseFileModel.updateProcessingStatus(fileId, "processing");

      let extractedExpenses = [];
      let processingError = null;

      try {
        console.log(`🤖 Processing file with Gemini AI: ${file.file_name}`);
        extractedExpenses = await extractExpensesWithGemini(
          file.file_url,
          file.file_name,
          file.mime_type
        );
        console.log(`✅ Gemini extracted ${extractedExpenses.length} expenses`);
      } catch (error) {
        console.error("Gemini processing failed:", error);
        
        // Try text-based parsing for CSV/text files
        if (file.mime_type && (file.mime_type.includes('text') || file.mime_type.includes('csv'))) {
          console.log("🔄 Falling back to text-based extraction");
          try {
            extractedExpenses = await extractExpensesFromText(file.file_url, file.file_name, file.mime_type);
            processingError = `AI processing failed: ${error.message}. Used text-based extraction.`;
          } catch (textError) {
            console.error("Text parsing also failed:", textError);
            extractedExpenses = [];
            processingError = `Both AI and text parsing failed: ${error.message}`;
          }
        } else {
          console.log("🚫 No fallback available for this file type");
          extractedExpenses = [];
          processingError = `AI processing failed: ${error.message}. No fallback available for ${file.mime_type || 'unknown file type'}.`;
        }
      }

      if (extractedExpenses.length === 0) {
        await ExpenseFileModel.updateProcessingStatus(
          fileId,
          "completed",
          "No expenses found in the document",
          0,
        );

        return res.json({
          message: "File processed but no expenses found",
          totalFound: 0,
          successCount: 0,
          fileId,
        });
      }

      let successCount = 0;
      const errors = [];

      for (const expense of extractedExpenses) {
        try {
          if (
            !expense.description ||
            !expense.amount ||
            !expense.category ||
            !expense.date
          ) {
            errors.push(`Invalid expense data: ${JSON.stringify(expense)}`);
            continue;
          }

          // Handle currency properly - preserve original currency info
          let finalAmount = parseFloat(expense.amount);
          const currency = expense.currency || 'INR';
          
          // Convert to INR for storage consistency, but preserve original info
          let conversionRate = 1;
          if (currency === 'USD') {
            conversionRate = 88; // USD to INR
            finalAmount = finalAmount * conversionRate;
          } else if (currency === 'EUR') {
            conversionRate = 90; // EUR to INR  
            finalAmount = finalAmount * conversionRate;
          } else if (currency === 'GBP') {
            conversionRate = 105; // GBP to INR
            finalAmount = finalAmount * conversionRate;
          }

          // Always show original currency in description for non-INR
          let description = expense.description;
          if (currency !== 'INR') {
            description = `${expense.description} (${currency} ${expense.amount.toFixed(2)})`;
          }

          console.log(`💰 Processing: ${description} - Original: ${currency} ${expense.amount}, Converted: INR ${finalAmount.toFixed(2)}`);

          await ExpenseModel.create(req.user.id, {
            description: description,
            amount: finalAmount,
            category: expense.category,
            date: expense.date,
            fileId: fileId,
          });

          successCount++;
        } catch (error) {
          console.error("Error inserting expense:", error);
          errors.push(`Failed to save: ${expense.description}`);
        }
      }

      await ExpenseFileModel.updateProcessingStatus(
        fileId,
        "completed",
        processingError ||
          (errors.length > 0
            ? `Some expenses failed to save: ${errors.join(", ")}`
            : null),
        successCount,
      );

      console.log(
        `✅ Successfully processed ${successCount}/${extractedExpenses.length} expenses from file ${fileId}`,
      );

      res.json({
        message: `Successfully processed ${successCount} expenses`,
        totalFound: extractedExpenses.length,
        successCount,
        errors: errors.length > 0 ? errors : undefined,
        fileId,
        processingNote: processingError,
      });
    } catch (error) {
      console.error("Expense processing error:", error);

      if (req.params.fileId) {
        await ExpenseFileModel.updateProcessingStatus(
          req.params.fileId,
          "failed",
          error.message,
          0,
        );
      }

      res.status(500).json({
        error: "Processing failed",
        message: "Failed to process the expense file",
      });
    }
  },
);

router.get("/status/:fileId", authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await ExpenseFileModel.findById(fileId);

    if (!file) {
      return res.status(404).json({
        error: "File not found",
        message: "The specified file could not be found",
      });
    }

    if (file.user_id !== req.user.id) {
      return res.status(403).json({
        error: "Access denied",
        message: "You don't have permission to view this file",
      });
    }

    res.json({
      fileId: file.id,
      fileName: file.file_name,
      processingStatus: file.processing_status,
      extractedExpensesCount: file.extracted_expenses_count,
      processingError: file.processing_error,
      processedAt: file.processed_at,
      createdAt: file.created_at,
    });
  } catch (error) {
    console.error("Error fetching processing status:", error);
    res.status(500).json({
      error: "Failed to fetch status",
      message: "Internal server error",
    });
  }
});

export default router;
