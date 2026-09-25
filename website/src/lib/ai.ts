import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";

// Validate API keys
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("VITE_GEMINI_API_KEY is not set in environment variables");
}

if (!MISTRAL_API_KEY) {
  console.warn("VITE_MISTRAL_API_KEY is not set in environment variables");
}

// Create Google Generative AI instance with error handling
export const gemini = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY || "",
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
});

// Create Mistral instance with error handling
export const mistral = createMistral({
  apiKey: MISTRAL_API_KEY || "",
});

// Helper function to check if API is configured
export const isGeminiConfigured = (): boolean => {
  return !!GEMINI_API_KEY && GEMINI_API_KEY.length > 0;
};

export const isMistralConfigured = (): boolean => {
  return !!MISTRAL_API_KEY && MISTRAL_API_KEY.length > 0;
};

// Export available models
export const AVAILABLE_MODELS = {
  GEMINI_FLASH: "gemini-1.5-flash", // Most reliable and fastest
  GEMINI_PRO: "gemini-1.5-pro", // More capable but slower
  GEMINI_FLASH_8B: "gemini-1.5-flash-8b", // Lightweight version
} as const;
