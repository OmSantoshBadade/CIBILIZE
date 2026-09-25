// utils/pdfParser.js

/**
 * Converts various date formats into a MySQL-compatible format "YYYY-MM-DD".
 * @param {string} dateStr The date string from the PDF.
 * @returns {string} The formatted date string.
 */
function formatDateForMySQL(dateStr) {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Handle different date formats
  const dateFormats = [
    // DD/MM/YYYY or DD-MM-YYYY
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/,
    // MM/DD/YYYY or MM-DD-YYYY
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/,
    // DD MMM YYYY or DD Month YYYY
    /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/,
    // DD MMM (current year)
    /^(\d{1,2})\s+([A-Za-z]+)$/,
    // YYYY-MM-DD
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
  ];

  const monthMap = {
    jan: "01", january: "01",
    feb: "02", february: "02",
    mar: "03", march: "03",
    apr: "04", april: "04",
    may: "05",
    jun: "06", june: "06",
    jul: "07", july: "07",
    aug: "08", august: "08",
    sep: "09", september: "09",
    oct: "10", october: "10",
    nov: "11", november: "11",
    dec: "12", december: "12",
  };

  const cleanDateStr = dateStr.trim().toLowerCase();
  
  // Try DD MMM YYYY or DD Month YYYY
  const monthYearMatch = cleanDateStr.match(/^(\d{1,2})\s+([a-z]+)(?:\s+(\d{4}))?$/);
  if (monthYearMatch) {
    const day = monthYearMatch[1].padStart(2, "0");
    const monthName = monthYearMatch[2];
    const year = monthYearMatch[3] || currentYear;
    const month = monthMap[monthName] || monthMap[monthName.substring(0, 3)];
    
    if (month) {
      return `${year}-${month}-${day}`;
    }
  }

  // Try DD/MM/YYYY format
  const ddmmyyyyMatch = cleanDateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ddmmyyyyMatch) {
    const day = ddmmyyyyMatch[1].padStart(2, "0");
    const month = ddmmyyyyMatch[2].padStart(2, "0");
    const year = ddmmyyyyMatch[3];
    return `${year}-${month}-${day}`;
  }

  // Try YYYY-MM-DD format (already correct)
  const isoMatch = cleanDateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const year = isoMatch[1];
    const month = isoMatch[2].padStart(2, "0");
    const day = isoMatch[3].padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Fallback to current date
  return today.toISOString().slice(0, 10);
}

/**
 * Extracts currency and amount from text with support for INR and USD
 * @param {string} text The text containing currency and amount
 * @returns {Object} Object with currency and amount
 */
function extractCurrencyAndAmount(text) {
  // Currency patterns for INR and USD
  const currencyPatterns = [
    // INR patterns
    { regex: /₹\s*([\d,]+(?:\.\d{2})?)/g, currency: 'INR' },
    { regex: /INR\s*([\d,]+(?:\.\d{2})?)/gi, currency: 'INR' },
    { regex: /Rs\.?\s*([\d,]+(?:\.\d{2})?)/gi, currency: 'INR' },
    { regex: /([\d,]+(?:\.\d{2})?)\s*₹/g, currency: 'INR' },
    
    // USD patterns
    { regex: /\$\s*([\d,]+(?:\.\d{2})?)/g, currency: 'USD' },
    { regex: /USD\s*([\d,]+(?:\.\d{2})?)/gi, currency: 'USD' },
    { regex: /([\d,]+(?:\.\d{2})?)\s*USD/gi, currency: 'USD' },
    
    // Generic amount patterns (assume INR if no currency specified)
    { regex: /([\d,]+\.\d{2})/g, currency: 'INR' },
    { regex: /([\d,]+)/g, currency: 'INR' },
  ];

  for (const pattern of currencyPatterns) {
    const matches = [...text.matchAll(pattern.regex)];
    if (matches.length > 0) {
      const amountStr = matches[0][1];
      const amount = parseFloat(amountStr.replace(/,/g, ''));
      if (!isNaN(amount) && amount > 0) {
        return {
          amount: amount,
          currency: pattern.currency,
          originalText: matches[0][0]
        };
      }
    }
  }

  return null;
}

/**
 * Categorizes expenses based on description keywords
 * @param {string} description The expense description
 * @returns {string} The category
 */
function categorizeExpense(description) {
  const desc = description.toLowerCase();
  
  // Food & Dining
  if (desc.includes('swiggy') || desc.includes('zomato') || desc.includes('uber eats') || 
      desc.includes('restaurant') || desc.includes('food') || desc.includes('dining') ||
      desc.includes('cafe') || desc.includes('pizza') || desc.includes('mcdonald') ||
      desc.includes('kfc') || desc.includes('domino') || desc.includes('starbucks')) {
    return 'Food';
  }
  
  // Travel & Transportation
  if (desc.includes('uber') || desc.includes('ola') || desc.includes('taxi') ||
      desc.includes('flight') || desc.includes('hotel') || desc.includes('booking') ||
      desc.includes('airbnb') || desc.includes('travel') || desc.includes('petrol') ||
      desc.includes('fuel') || desc.includes('metro') || desc.includes('bus')) {
    return 'Travel';
  }
  
  // Shopping
  if (desc.includes('amazon') || desc.includes('flipkart') || desc.includes('myntra') ||
      desc.includes('shopping') || desc.includes('mall') || desc.includes('store') ||
      desc.includes('purchase') || desc.includes('buy')) {
    return 'Shopping';
  }
  
  // Bills & Utilities
  if (desc.includes('electricity') || desc.includes('water') || desc.includes('gas') ||
      desc.includes('internet') || desc.includes('mobile') || desc.includes('phone') ||
      desc.includes('bill') || desc.includes('recharge') || desc.includes('utility')) {
    return 'Utilities';
  }
  
  // Entertainment
  if (desc.includes('movie') || desc.includes('cinema') || desc.includes('netflix') ||
      desc.includes('spotify') || desc.includes('game') || desc.includes('entertainment') ||
      desc.includes('theatre') || desc.includes('concert')) {
    return 'Entertainment';
  }
  
  // Default category
  return 'Other';
}

/**
 * Parses raw text from a bank statement to extract expense transactions.
 * @param {string} text The raw text content of the bank statement.
 * @returns {Array<Object>} An array of objects, where each object represents an expense.
 */
function parseBankStatement(text) {
  const expenses = [];
  const lines = text.split("\n");

  // Enhanced patterns for different bank statement formats
  const transactionPatterns = [
    // Pattern 1: Date at start of line (DD MMM or DD/MM/YYYY)
    /^(\d{1,2}[\s\/\-]\w+(?:[\s\/\-]\d{4})?)\s+(.+)/,
    // Pattern 2: Date with transaction details
    /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})\s+(.+)/,
    // Pattern 3: Transaction with amount at end
    /^(.+?)\s+([\d,]+\.\d{2}|\$[\d,]+\.\d{2}|₹[\d,]+(?:\.\d{2})?)\s*$/,
  ];

  // Skip patterns (credits, deposits, transfers)
  const skipPatterns = [
    /salary/i, /deposit/i, /credit/i, /transfer.*in/i, /interest.*credit/i,
    /refund/i, /cashback/i, /reward/i, /biweekly payment/i, /direct deposit/i,
    /atm.*deposit/i, /cheque.*deposit/i, /neft.*credit/i, /imps.*credit/i,
    /upi.*credit/i, /rtgs.*credit/i
  ];

  let currentTransaction = null;
  let transactionBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Try to match transaction patterns
    let transactionFound = false;
    
    for (const pattern of transactionPatterns) {
      const match = line.match(pattern);
      if (match) {
        // Process previous transaction if exists
        if (currentTransaction) {
          const expense = processTransaction(currentTransaction, transactionBuffer.join(' '));
          if (expense) {
            expenses.push(expense);
          }
        }

        // Start new transaction
        if (pattern.source.includes('Date at start')) {
          currentTransaction = {
            date: match[1],
            description: match[2],
            rawLine: line
          };
        } else {
          currentTransaction = {
            date: match[1] || extractDateFromLine(line),
            description: match[2] || line,
            rawLine: line
          };
        }
        
        transactionBuffer = [];
        transactionFound = true;
        break;
      }
    }

    if (!transactionFound && currentTransaction) {
      // Add to current transaction buffer
      transactionBuffer.push(line);
    } else if (!transactionFound) {
      // Try to extract standalone transaction
      const currencyInfo = extractCurrencyAndAmount(line);
      if (currencyInfo && !isSkippableTransaction(line, skipPatterns)) {
        const expense = {
          date: extractDateFromLine(line) || new Date().toISOString().slice(0, 10),
          description: cleanDescription(line.replace(currencyInfo.originalText, '').trim()),
          amount: currencyInfo.amount,
          currency: currencyInfo.currency,
          category: categorizeExpense(line)
        };
        
        if (expense.description && expense.amount > 0) {
          expenses.push(expense);
        }
      }
    }
  }

  // Process final transaction
  if (currentTransaction) {
    const expense = processTransaction(currentTransaction, transactionBuffer.join(' '));
    if (expense) {
      expenses.push(expense);
    }
  }

  return expenses.filter(expense => 
    expense.amount > 0 && 
    expense.description && 
    expense.description.length > 2
  );
}

/**
 * Processes a transaction and extracts expense information
 * @param {Object} transaction The transaction object
 * @param {string} additionalInfo Additional transaction info
 * @returns {Object|null} Processed expense or null
 */
function processTransaction(transaction, additionalInfo) {
  const fullText = `${transaction.description} ${additionalInfo}`.trim();
  
  // Skip if it's a credit transaction
  const skipPatterns = [
    /salary/i, /deposit/i, /credit/i, /transfer.*in/i, /interest.*credit/i,
    /refund/i, /cashback/i, /reward/i, /biweekly payment/i, /direct deposit/i
  ];
  
  if (isSkippableTransaction(fullText, skipPatterns)) {
    return null;
  }

  // Extract currency and amount
  const currencyInfo = extractCurrencyAndAmount(fullText);
  if (!currencyInfo) {
    return null;
  }

  // Clean description
  let description = fullText.replace(currencyInfo.originalText, '').trim();
  description = cleanDescription(description);
  
  if (!description || description.length < 2) {
    return null;
  }

  return {
    date: formatDateForMySQL(transaction.date),
    description: description,
    amount: currencyInfo.amount,
    currency: currencyInfo.currency,
    category: categorizeExpense(description)
  };
}

/**
 * Checks if a transaction should be skipped
 * @param {string} text Transaction text
 * @param {Array} skipPatterns Array of regex patterns to skip
 * @returns {boolean} True if should be skipped
 */
function isSkippableTransaction(text, skipPatterns) {
  return skipPatterns.some(pattern => pattern.test(text));
}

/**
 * Extracts date from a line of text
 * @param {string} line The line of text
 * @returns {string|null} Extracted date or null
 */
function extractDateFromLine(line) {
  const datePatterns = [
    /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/,
    /(\d{1,2}\s+\w+\s+\d{4})/,
    /(\d{1,2}\s+\w+)/,
    /(\d{4}-\d{1,2}-\d{1,2})/
  ];

  for (const pattern of datePatterns) {
    const match = line.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Cleans and normalizes transaction descriptions
 * @param {string} description Raw description
 * @returns {string} Cleaned description
 */
function cleanDescription(description) {
  return description
    // Remove common bank statement noise
    .replace(/\b(card payment|direct debit|cash withdrawal|atm|pos|online|mobile)\b/gi, '')
    .replace(/\b(transaction|txn|ref no|reference)\b/gi, '')
    .replace(/\b\d{10,}\b/g, '') // Remove long numbers (reference numbers)
    .replace(/[*]{2,}/g, '') // Remove multiple asterisks
    .replace(/[-]{2,}/g, '') // Remove multiple dashes
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
    .replace(/^[\/\-\s]+|[\/\-\s]+$/g, '') // Remove leading/trailing separators
    .trim();
}

export { parseBankStatement, extractCurrencyAndAmount, categorizeExpense, formatDateForMySQL };
