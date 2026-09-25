import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 12;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error verifying password");
  }
};

const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

const validatePasswordStrength = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (password.length > 128) {
    errors.push("Password must be less than 128 characters long");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (@$!%*?&)",
    );
  }

  const commonPasswords = [
    "password",
    "123456",
    "123456789",
    "qwerty",
    "abc123",
    "password123",
    "admin",
    "letmein",
    "welcome",
    "monkey",
  ];

  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Password is too common, please choose a different one");
  }

  const hasRepeatingChars = /(.)\1{2,}/.test(password);
  if (hasRepeatingChars) {
    errors.push(
      "Password should not contain more than 2 consecutive identical characters",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: calculatePasswordScore(password),
  };
};

const calculatePasswordScore = (password) => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;
  if (password.length >= 16) score += 1;
  if (/[^a-zA-Z0-9@$!%*?&]/.test(password)) score += 1;

  return Math.min(score, 5);
};

const generatePasswordResetToken = () => {
  return {
    token: generateSecureToken(32),
    expires: new Date(Date.now() + 60 * 60 * 1000),
  };
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const rateLimitAttempts = {
  attempts: new Map(),

  isBlocked: (identifier) => {
    const attempts = rateLimitAttempts.attempts.get(identifier);
    if (!attempts) return false;

    if (
      attempts.count >= 5 &&
      Date.now() - attempts.lastAttempt < 15 * 60 * 1000
    ) {
      return true;
    }

    if (Date.now() - attempts.lastAttempt > 15 * 60 * 1000) {
      rateLimitAttempts.attempts.delete(identifier);
      return false;
    }

    return false;
  },

  recordAttempt: (identifier, success = false) => {
    if (success) {
      rateLimitAttempts.attempts.delete(identifier);
      return;
    }

    const attempts = rateLimitAttempts.attempts.get(identifier) || {
      count: 0,
      lastAttempt: 0,
    };
    attempts.count += 1;
    attempts.lastAttempt = Date.now();
    rateLimitAttempts.attempts.set(identifier, attempts);
  },

  getRemainingTime: (identifier) => {
    const attempts = rateLimitAttempts.attempts.get(identifier);
    if (!attempts || attempts.count < 5) return 0;

    const timeRemaining = 15 * 60 * 1000 - (Date.now() - attempts.lastAttempt);
    return Math.max(0, Math.ceil(timeRemaining / 1000 / 60));
  },
};

setInterval(
  () => {
    const now = Date.now();
    for (const [identifier, attempts] of rateLimitAttempts.attempts.entries()) {
      if (now - attempts.lastAttempt > 15 * 60 * 1000) {
        rateLimitAttempts.attempts.delete(identifier);
      }
    }
  },
  5 * 60 * 1000,
);

export {
  hashPassword,
  verifyPassword,
  generateSecureToken,
  validatePasswordStrength,
  calculatePasswordScore,
  generatePasswordResetToken,
  hashToken,
  rateLimitAttempts,
};
