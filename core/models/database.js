import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

let pool;

const dbUrl = process.env.DATABASE_URL || "";
const needsSSL =
  process.env.PGSSLMODE === "require" ||
  /sslmode=require/i.test(dbUrl) ||
  process.env.NODE_ENV === "production";

const dbConfig = {
  connectionString: dbUrl,
  ssl: needsSSL ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
};

async function initializeDatabase() {
  try {
    pool = new Pool(dbConfig);

    const client = await pool.connect();
    try {
      const targetHost = (() => {
        try {
          const u = new URL(dbUrl);
          return `${u.hostname}:${u.port || "5432"}`;
        } catch {
          return "unknown";
        }
      })();
      console.log(
        `PostgreSQL connected successfully! 🚀 (host=${targetHost}, ssl=${!!dbConfig.ssl})`,
      );
    } catch {
      console.log("PostgreSQL connected successfully! 🚀");
    }

    await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        google_id VARCHAR(255) UNIQUE,
        profile_picture TEXT,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        auth_provider VARCHAR(20) DEFAULT 'local',
        email_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT true
      );
    `);

    // Expenses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        description VARCHAR(255) NOT NULL,
        amount DECIMAL(12, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Add file_id column to expenses table if it doesn't exist
    await client.query(`
      ALTER TABLE expenses 
      ADD COLUMN IF NOT EXISTS file_id UUID;
    `);

    // Expense files table
    await client.query(`
      CREATE TABLE IF NOT EXISTS expense_files (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        file_key VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_url TEXT NOT NULL,
        file_size INTEGER,
        mime_type VARCHAR(100),
        upload_status VARCHAR(50) DEFAULT 'uploaded',
        processing_status VARCHAR(50) DEFAULT 'pending',
        extracted_expenses_count INTEGER DEFAULT 0,
        processing_error TEXT,
        processed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // User sessions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        token_hash VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ip_address INET,
        user_agent TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Credit cards table
    await client.query(`
      CREATE TABLE IF NOT EXISTS credit_cards (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        card_id VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
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
        lounge_access TEXT,
        dining TEXT,
        golf TEXT,
        insurance TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // User recommendations table - NEW
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_recommendations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        card_id UUID NOT NULL,
        score INTEGER NOT NULL,
        match_percentage INTEGER NOT NULL,
        reasons JSONB NOT NULL,
        match_factors JSONB NOT NULL,
        user_preferences JSONB NOT NULL,
        is_fallback BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (card_id) REFERENCES credit_cards(id) ON DELETE CASCADE,
        UNIQUE(user_id, card_id, created_at)
      );
    `);

    // User recommendation sessions table - to group recommendations by session
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_recommendation_sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        session_preferences JSONB NOT NULL,
        total_recommendations INTEGER NOT NULL,
        is_fallback BOOLEAN DEFAULT false,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Add session_id to user_recommendations
    await client.query(`
      ALTER TABLE user_recommendations 
      ADD COLUMN IF NOT EXISTS session_id UUID REFERENCES user_recommendation_sessions(id) ON DELETE CASCADE;
    `);

    // Add foreign key constraint for file_id in expenses table
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'expenses_file_id_fkey' 
          AND table_name = 'expenses'
        ) THEN
          ALTER TABLE expenses 
          ADD CONSTRAINT expenses_file_id_fkey 
          FOREIGN KEY (file_id) REFERENCES expense_files(id) ON DELETE SET NULL;
        END IF;
      END $$;
    `);

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
      CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
      CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
      CREATE INDEX IF NOT EXISTS idx_expenses_file_id ON expenses(file_id);
      CREATE INDEX IF NOT EXISTS idx_expense_files_user_id ON expense_files(user_id);
      CREATE INDEX IF NOT EXISTS idx_expense_files_file_key ON expense_files(file_key);
      CREATE INDEX IF NOT EXISTS idx_expense_files_processing_status ON expense_files(processing_status);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_credit_cards_issuer ON credit_cards(issuer);
      CREATE INDEX IF NOT EXISTS idx_credit_cards_card_id ON credit_cards(card_id);
      CREATE INDEX IF NOT EXISTS idx_user_recommendations_user_id ON user_recommendations(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_recommendations_card_id ON user_recommendations(card_id);
      CREATE INDEX IF NOT EXISTS idx_user_recommendations_session_id ON user_recommendations(session_id);
      CREATE INDEX IF NOT EXISTS idx_user_recommendation_sessions_user_id ON user_recommendation_sessions(user_id);
    `);

    // Create update triggers
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    const tables = [
      "users",
      "expenses",
      "expense_files",
      "credit_cards",
      "user_recommendations",
      "user_recommendation_sessions",
    ];

    for (const table of tables) {
      await client.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column();
      `);
    }

    client.release();
    console.log("Database tables and indexes are ready. ✅");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL or create tables:", err);
    process.exit(1);
  }
}

async function cleanupExpiredSessions() {
  try {
    const client = await pool.connect();
    await client.query("DELETE FROM user_sessions WHERE expires_at < NOW()");
    client.release();
  } catch (err) {
    console.error("Error cleaning up expired sessions:", err);
  }
}

setInterval(cleanupExpiredSessions, 60 * 60 * 1000);

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

const getClient = async () => {
  return await pool.connect();
};

// Database model functions
const UserModel = {
  async create(userData) {
    const {
      email,
      username,
      password,
      googleId,
      profilePicture,
      firstName,
      lastName,
      authProvider = "local",
    } = userData;
    const result = await query(
      `INSERT INTO users (email, username, password, google_id, profile_picture, first_name, last_name, auth_provider, email_verified) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        email,
        username,
        password,
        googleId,
        profilePicture,
        firstName,
        lastName,
        authProvider,
        authProvider === "google",
      ],
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  async findByGoogleId(googleId) {
    const result = await query("SELECT * FROM users WHERE google_id = $1", [
      googleId,
    ]);
    return result.rows[0];
  },

  async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");

    const result = await query(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return result.rows[0];
  },
};

const ExpenseModel = {
  async create(userId, expenseData) {
    const { description, amount, category, date, fileId } = expenseData;
    const result = await query(
      `INSERT INTO expenses (user_id, description, amount, category, date, file_id) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, description, amount, category, date, fileId || null],
    );
    return result.rows[0];
  },

  async findByUserId(userId, options = {}) {
    const { page = 1, limit = 50, category, startDate, endDate } = options;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT id, description, amount, category, date, created_at, updated_at
      FROM expenses WHERE user_id = $1
    `;
    const queryParams = [userId];
    let paramCount = 1;

    if (category) {
      paramCount++;
      queryText += ` AND category = $${paramCount}`;
      queryParams.push(category);
    }

    if (startDate) {
      paramCount++;
      queryText += ` AND date >= $${paramCount}`;
      queryParams.push(startDate);
    }

    if (endDate) {
      paramCount++;
      queryText += ` AND date <= $${paramCount}`;
      queryParams.push(endDate);
    }

    queryText += ` ORDER BY date DESC, created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    queryParams.push(limit, offset);

    const result = await query(queryText, queryParams);
    return result.rows;
  },

  async update(id, userId, updateData) {
    const { description, amount, category, date } = updateData;
    const result = await query(
      `UPDATE expenses SET description = $1, amount = $2, category = $3, date = $4 
       WHERE id = $5 AND user_id = $6 RETURNING *`,
      [description, amount, category, date, id, userId],
    );
    return result.rows[0];
  },

  async delete(id, userId) {
    const result = await query(
      "DELETE FROM expenses WHERE id = $1 AND user_id = $2",
      [id, userId],
    );
    return result.rowCount > 0;
  },
};

const CreditCardModel = {
  async findAll(options = {}) {
    const {
      page = 1,
      limit = 20,
      issuer,
      category,
      search,
      sortBy = "title",
      sortOrder = "ASC",
    } = options;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT id, card_id, title, issuer, image, rating, annual_fee, rewards, benefits,
             welcome_bonus, milestones, why_to_recommend, best_suited_for, eligibility,
             cta, tags, waiver_condition, reward_rate, created_at
      FROM credit_cards WHERE 1=1
    `;
    const queryParams = [];
    let paramCount = 0;

    if (issuer) {
      paramCount++;
      queryText += ` AND LOWER(issuer) = LOWER($${paramCount})`;
      queryParams.push(issuer);
    }

    if (category) {
      paramCount++;
      queryText += ` AND best_suited_for ? $${paramCount}`;
      queryParams.push(category);
    }

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

    queryText += ` ORDER BY ${sortBy} ${sortOrder} LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    queryParams.push(limit, offset);

    const result = await query(queryText, queryParams);
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      "SELECT * FROM credit_cards WHERE id = $1 OR card_id = $1",
      [id],
    );
    return result.rows[0];
  },

  async create(cardData) {
    const fields = Object.keys(cardData);
    const values = Object.values(cardData);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const result = await query(
      `INSERT INTO credit_cards (${fields.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      values,
    );
    return result.rows[0];
  },
};

const ExpenseFileModel = {
  async create(fileData) {
    const { userId, fileKey, fileName, fileUrl, fileSize, mimeType } = fileData;
    const result = await query(
      `INSERT INTO expense_files (user_id, file_key, file_name, file_url, file_size, mime_type) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, fileKey, fileName, fileUrl, fileSize, mimeType],
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await query("SELECT * FROM expense_files WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async findByUserId(userId, options = {}) {
    const { limit = 20, offset = 0 } = options;
    const result = await query(
      `SELECT * FROM expense_files 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    );
    return result.rows;
  },

  async updateProcessingStatus(id, status, error = null, extractedCount = 0) {
    const result = await query(
      `UPDATE expense_files 
       SET processing_status = $1, processing_error = $2, extracted_expenses_count = $3, processed_at = CURRENT_TIMESTAMP
       WHERE id = $4 RETURNING *`,
      [status, error, extractedCount, id],
    );
    return result.rows[0];
  },

  async delete(id, userId) {
    const result = await query(
      "DELETE FROM expense_files WHERE id = $1 AND user_id = $2",
      [id, userId],
    );
    return result.rowCount > 0;
  },
};

const RecommendationModel = {
  async createSession(
    userId,
    preferences,
    totalRecommendations,
    isFallback = false,
    message = "",
  ) {
    const result = await query(
      `INSERT INTO user_recommendation_sessions (user_id, session_preferences, total_recommendations, is_fallback, message) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        userId,
        JSON.stringify(preferences),
        totalRecommendations,
        isFallback,
        message,
      ],
    );
    return result.rows[0];
  },

  async saveRecommendation(userId, sessionId, cardId, recommendationData) {
    const {
      score,
      matchPercentage,
      reasons,
      matchFactors,
      userPreferences,
      isFallback = false,
    } = recommendationData;

    const result = await query(
      `INSERT INTO user_recommendations (user_id, session_id, card_id, score, match_percentage, reasons, match_factors, user_preferences, is_fallback) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        userId,
        sessionId,
        cardId,
        score,
        matchPercentage,
        JSON.stringify(reasons),
        JSON.stringify(matchFactors),
        JSON.stringify(userPreferences),
        isFallback,
      ],
    );
    return result.rows[0];
  },

  async getUserRecommendations(userId, options = {}) {
    const { limit = 10, sessionId } = options;

    let queryText = `
      SELECT ur.*, cc.title, cc.issuer, cc.image, cc.rating, cc.annual_fee, cc.rewards, cc.benefits,
             cc.welcome_bonus, cc.why_to_recommend, cc.best_suited_for, cc.eligibility, cc.cta,
             urs.message, urs.created_at as session_created_at
      FROM user_recommendations ur
      JOIN credit_cards cc ON ur.card_id = cc.id
      JOIN user_recommendation_sessions urs ON ur.session_id = urs.id
      WHERE ur.user_id = $1
    `;
    const queryParams = [userId];
    let paramCount = 1;

    if (sessionId) {
      paramCount++;
      queryText += ` AND ur.session_id = $${paramCount}`;
      queryParams.push(sessionId);
    }

    queryText += ` ORDER BY ur.created_at DESC, ur.score DESC LIMIT $${paramCount + 1}`;
    queryParams.push(limit);

    const result = await query(queryText, queryParams);
    return result.rows;
  },

  async getUserRecommendationSessions(userId, limit = 5) {
    const result = await query(
      `SELECT * FROM user_recommendation_sessions 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2`,
      [userId, limit],
    );
    return result.rows;
  },
};

export {
  initializeDatabase,
  query,
  getClient,
  pool,
  uuidv4,
  UserModel,
  ExpenseModel,
  ExpenseFileModel,
  CreditCardModel,
  RecommendationModel,
};
