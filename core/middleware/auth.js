import jwt from "jsonwebtoken";
import { query } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const headerToken = authHeader && authHeader.split(" ")[1];
    const cookieToken = req.cookies?.auth_token;

    const token = headerToken || cookieToken;

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await query(
      "SELECT id, email, username, auth_provider, is_active FROM users WHERE id = $1",
      [decoded.id],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(401).json({ error: "Account is deactivated" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      authProvider: user.auth_provider,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  return { accessToken };
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const headerToken = authHeader && authHeader.split(" ")[1];
    const cookieToken = req.cookies?.auth_token;

    const token = headerToken || cookieToken;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await query(
      "SELECT id, email, username, auth_provider, is_active FROM users WHERE id = $1",
      [decoded.id],
    );

    if (result.rows.length > 0 && result.rows[0].is_active) {
      const user = result.rows[0];
      req.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        authProvider: user.auth_provider,
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export { authenticateToken, generateToken, optionalAuth };
