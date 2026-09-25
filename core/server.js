import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import { initializeDatabase, query } from "./db.js";
import authRouter from "./routes/auth.js";
import expensesRouter from "./routes/expenses.js";
import openaiRouter from "./routes/openai.js";
import creditCardsRouter from "./routes/credit-cards.js";
import cloudinaryUploadRouter from "./routes/cloudinary-upload.js";
import expenseProcessingRouter from "./routes/expense-processing.js";
import {
  // generalLimiter,
  helmetConfig,
  corsOptions,
  sanitizeInput,
} from "./middleware/security.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.set("trust proxy", 1);

app.use(helmetConfig);
app.use(cors(corsOptions));
// app.use(generalLimiter);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(sanitizeInput);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/openai", openaiRouter);
app.use("/api/credit-cards", creditCardsRouter);
app.use("/api/upload", cloudinaryUploadRouter);
app.use("/api/expense-processing", expenseProcessingRouter);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      error: "File too large",
      message: "File size must be less than 10MB",
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Invalid JSON",
      message: "Request body contains invalid JSON",
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔒 Security middleware enabled`);
      console.log(
        `🔑 Google OAuth configured: ${!!process.env.GOOGLE_CLIENT_ID}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

startServer();
