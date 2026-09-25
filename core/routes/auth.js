import express from "express";
import passport from "../config/passport.js";
import { query } from "../db.js";
import { generateToken } from "../middleware/auth.js";
import {
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  rateLimitAttempts,
} from "../utils/passwordSecurity.js";
import {
  authLimiter,
  validateRegistration,
  validateLogin,
  handleValidationErrors,
  sanitizeInput,
} from "../middleware/security.js";

const router = express.Router();

router.post(
  "/register",
  authLimiter,
  sanitizeInput,
  validateRegistration,
  handleValidationErrors,
  async (req, res) => {
    const { email, password, username } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress;

    if (rateLimitAttempts.isBlocked(clientIp)) {
      const remainingTime = rateLimitAttempts.getRemainingTime(clientIp);
      return res.status(429).json({
        error: "Too many failed attempts",
        message: `Please try again in ${remainingTime} minutes`,
      });
    }

    try {
      const passwordValidation = validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        rateLimitAttempts.recordAttempt(clientIp, false);
        return res.status(400).json({
          error: "Password validation failed",
          details: passwordValidation.errors,
        });
      }

      const existingUser = await query(
        "SELECT id FROM users WHERE email = $1 OR username = $2",
        [email, username || null],
      );

      if (existingUser.rows.length > 0) {
        rateLimitAttempts.recordAttempt(clientIp, false);
        return res.status(409).json({
          error: "User already exists",
          message: "Email or username is already registered",
        });
      }

      const hashedPassword = await hashPassword(password);

      const result = await query(
        `INSERT INTO users (email, username, password, auth_provider, email_verified) 
         VALUES ($1, $2, $3, 'local', false) RETURNING id, email, username`,
        [email, username || null, hashedPassword],
      );

      const user = result.rows[0];
      const { accessToken } = generateToken(user);

      rateLimitAttempts.recordAttempt(clientIp, true);

      res.cookie("auth_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        accessToken,
      });
    } catch (error) {
      console.error("Registration error:", error);
      rateLimitAttempts.recordAttempt(clientIp, false);
      res.status(500).json({
        error: "Registration failed",
        message: "Internal server error",
      });
    }
  },
);

router.post(
  "/login",
  authLimiter,
  sanitizeInput,
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    const clientIp = req.ip || req.connection.remoteAddress;

    if (rateLimitAttempts.isBlocked(clientIp)) {
      const remainingTime = rateLimitAttempts.getRemainingTime(clientIp);
      return res.status(429).json({
        error: "Too many failed attempts",
        message: `Please try again in ${remainingTime} minutes`,
      });
    }

    try {
      const result = await query(
        "SELECT id, email, username, password, auth_provider, is_active FROM users WHERE email = $1",
        [email],
      );

      const user = result.rows[0];

      if (!user || !user.password) {
        rateLimitAttempts.recordAttempt(clientIp, false);
        return res.status(401).json({
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
      }

      if (!user.is_active) {
        rateLimitAttempts.recordAttempt(clientIp, false);
        return res.status(401).json({
          error: "Account deactivated",
          message: "Your account has been deactivated",
        });
      }

      const isValidPassword = await verifyPassword(password, user.password);

      if (!isValidPassword) {
        rateLimitAttempts.recordAttempt(clientIp, false);
        return res.status(401).json({
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
      }

      await query(
        "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1",
        [user.id],
      );

      const { accessToken } = generateToken(user);
      rateLimitAttempts.recordAttempt(clientIp, true);

      res.cookie("auth_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          authProvider: user.auth_provider,
        },
        accessToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      rateLimitAttempts.recordAttempt(clientIp, false);
      res.status(500).json({
        error: "Login failed",
        message: "Internal server error",
      });
    }
  },
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const { accessToken } = generateToken(user);

      res.cookie("auth_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

      res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
    } catch (error) {
      console.error("Google callback error:", error);
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      res.redirect(`${frontendUrl}/auth/error`);
    }
  },
);

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Logout failed",
    });
  }
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await query(
        `SELECT id, email, username, first_name, last_name, 
         profile_picture, auth_provider, email_verified, created_at 
         FROM users WHERE id = $1`,
        [req.user.id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      const user = result.rows[0];
      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          profilePicture: user.profile_picture,
          authProvider: user.auth_provider,
          emailVerified: user.email_verified,
          createdAt: user.created_at,
        },
      });
    } catch (error) {
      console.error("Get user profile error:", error);
      res.status(500).json({
        error: "Failed to get user profile",
      });
    }
  },
);

export default router;
