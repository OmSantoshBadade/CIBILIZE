import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  authProvider: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseStats {
  summary: {
    total_expenses: number;
    total_amount: number;
    average_amount: number;
  };
  byCategory: Array<{
    category: string;
    count: number;
    total_amount: number;
  }>;
  byMonth: Array<{
    month: string;
    count: number;
    total_amount: number;
  }>;
}

export interface PaginatedExpenses {
  expenses: Expense[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CreditScorePrediction {
  score: number;
  reason: string;
}

export interface CibilScorePrediction {
  score: number;
  scoreCategory: "Excellent" | "Good" | "Average" | "Poor";
  reason: string;
  factorBreakdown: {
    paymentHistory: number;
    creditUtilization: number;
    creditHistory: number;
    creditMix: number;
    newCredit: number;
  };
  riskAssessment: {
    overallRisk: "Low" | "Moderate" | "High";
    keyRisks: string[];
    riskProbability: number;
  };
  improvementInsights: {
    primaryConcerns: string[];
    actionPlan: string[];
    expectedTimeline: "3 months" | "6 months" | "12 months";
    confidenceLevel: number;
  };
  loanEligibility: {
    eligibleForLoan: boolean;
    maxEligibleAmount: number;
    loanTypeRecommendation: "personal" | "home" | "auto" | "not recommended";
    reasoning: string;
  };
  creditCardRecommendations: Array<{
    productId:
      | "indusind-bank-legend-credit-card"
      | "indusind-platinum-credit-card"
      | "eazydiner-indusind-platinum-credit-card"
      | "indusind-bank-platinum-aura-edge-credit-card"
      | "rbl-bank-paisabazaar-duet-credit-card"
      | "axis-bank-ace-visa-credit-card"
      | "flipkart-axis-bank-mastercard-credit-card"
      | "airtel-axis-credit-card"
      | "axis-bank-my-zone-rupay-credit-card"
      | "indianoil-axis-bank-rupay-credit-card"
      | "simplyclick-sbi-card"
      | "bpcl-sbi-card"
      | "simplysave-sbi-card"
      | "irctc-sbi-platinum-card"
      | "pulse-sbi-card"
      | "tata-neu-infinity-hdfc-bank-secured-credit-card"
      | "tata-neu-plus-hdfc-bank-secured-credit-card"
      | "idfc-first-earn-credit-card";
    matchReason: string;
    eligibility: "High" | "Moderate" | "Low";
    annualFee: number;
    rewardHighlights: string[];
  }>;
  nextMilestone: {
    targetCategory: "Good" | "Excellent";
    pointsNeeded: number;
    suggestedFocusArea: string;
  };
  financialHealthSummary: {
    incomeToDebtRatio: string;
    repaymentDiscipline: string;
    financialBehavior: string;
  };
  recommendationsMeta: {
    dataConfidence: number;
    suggestedRecheckInterval: "3 months" | "6 months";
    lastUpdated: string;
  };
  model: string;
  note?: string;
}

export interface ScenarioSimulationResponse {
  baseScore: number;
  scenarios: Array<{
    scenarioName: string;
    changes: Record<string, unknown>;
    predictedScore: number;
    scoreDifference: number;
    reason: string;
  }>;
}

export interface AIInsightsResponse {
  primaryConcerns: string[];
  strengths: string[];
  actionPlan: string[];
  creditProducts: string[];
  timeline: string;
}

export interface CreditCard {
  id: string;
  card_id: string;
  title: string;
  issuer: string;
  image?: string;
  rating?: string;
  annual_fee?: string | number;
  rewards?: string | Record<string, unknown>;
  benefits?: string[] | Record<string, unknown>;
  welcome_bonus?: string;
  milestones?: Record<string, unknown>;
  why_to_recommend?: string;
  best_suited_for?: string[];
  eligibility?: Record<string, unknown>;
  cta?: Record<string, unknown>;
  tags?: string[];
  waiver_condition?: string;
  reward_rate?: string;
  lounge_access?: string;
  dining?: string;
  golf?: string;
  insurance?: string;
  created_at?: string;
}

export interface CreditCardRecommendation extends CreditCard {
  score: number;
  reasons: string[];
  matchFactors: string[];
  matchPercentage: number;
  isFallback?: boolean;
}

export interface CreditCardRecommendationsResponse {
  recommendations: CreditCardRecommendation[];
  count: number;
  message: string;
  isFallback?: boolean;
  preferences?: {
    spendingHabit?: string;
    incomeLevel?: string;
    cibilScore?: string;
    desiredBenefit?: string;
  };
}

export interface SavedRecommendation {
  id: string;
  sessionId: string;
  score: number;
  matchPercentage: number;
  reasons: string[];
  matchFactors: string[];
  userPreferences: UserPreferences;
  isFallback: boolean;
  createdAt: string;
  sessionCreatedAt: string;
  message: string;
  card: CreditCard;
}

export interface RecommendationSession {
  id: string;
  preferences: UserPreferences;
  totalRecommendations: number;
  isFallback: boolean;
  message: string;
  createdAt: string;
}

export interface RecommendationHistoryResponse {
  recommendations: SavedRecommendation[];
  count: number;
}

export interface RecommendationSessionsResponse {
  sessions: RecommendationSession[];
  count: number;
}

export interface UserPreferences {
  spendingHabit: "travel" | "dining" | "everyday_spending" | "commuter";
  incomeLevel: "low" | "medium" | "high" | "very_high";
  cibilScore: "poor" | "average" | "good" | "excellent" | "new_to_credit";
  desiredBenefit: "cashback" | "travel" | "points" | "build_credit";
  maxAnnualFee?: number;
  preferredIssuers?: string[];
  limit?: number;
}

export interface ExpenseFile {
  id: string;
  user_id: string;
  file_key: string;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  upload_status: string;
  processing_status: string;
  extracted_expenses_count: number;
  processing_error?: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseProcessingResponse {
  message: string;
  totalFound: number;
  successCount: number;
  errors?: string[];
  fileId: string;
  processingNote?: string;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAuthHeader(): Record<string, string> {
    const token = Cookies.get("auth_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(errorData.message || errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async register(data: {
    email: string;
    password: string;
    username?: string;
  }): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async logout(): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${this.baseURL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  getGoogleAuthUrl(): string {
    return `${this.baseURL}/api/auth/google`;
  }

  async getExpenses(params?: {
    page?: number;
    limit?: number;
    category?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedExpenses> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.category) searchParams.append("category", params.category);
    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);

    const url = `${this.baseURL}/api/expenses${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse<PaginatedExpenses>(response);
  }

  async createExpense(data: {
    description: string;
    amount: number;
    category: string;
    date: string;
  }): Promise<{
    message: string;
    expense: Expense;
  }> {
    const response = await fetch(`${this.baseURL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async updateExpense(
    id: number,
    data: {
      description: string;
      amount: number;
      category: string;
      date: string;
    },
  ): Promise<{
    message: string;
    expense: Expense;
  }> {
    const response = await fetch(`${this.baseURL}/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deleteExpense(id: number): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async getExpenseStats(params?: { startDate?: string; endDate?: string }): Promise<ExpenseStats> {
    const searchParams = new URLSearchParams();
    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);

    const url = `${this.baseURL}/api/expenses/stats${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse<ExpenseStats>(response);
  }

  async uploadBankStatement(file: File): Promise<{
    message: string;
    totalFound: number;
    successCount: number;
    errors?: string[];
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.baseURL}/api/expenses/upload`, {
      method: "POST",
      headers: {
        ...this.getAuthHeader(),
      },
      body: formData,
    });
    return this.handleResponse(response);
  }

  async uploadFile(file: File): Promise<{
    success: boolean;
    fileId: string;
    message: string;
    file: {
      id: string;
      fileName: string;
      fileUrl: string;
      fileSize: number;
      mimeType: string;
      publicId: string;
    };
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.baseURL}/api/upload/upload`, {
      method: "POST",
      headers: {
        ...this.getAuthHeader(),
      },
      body: formData,
    });
    return this.handleResponse(response);
  }

  async uploadMultipleFiles(files: File[]): Promise<{
    success: boolean;
    message: string;
    files: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      fileSize: number;
      mimeType: string;
      publicId: string;
    }>;
  }> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await fetch(`${this.baseURL}/api/upload/upload-multiple`, {
      method: "POST",
      headers: {
        ...this.getAuthHeader(),
      },
      body: formData,
    });
    return this.handleResponse(response);
  }

  async getExpenseFiles(params?: { page?: number; limit?: number }): Promise<{
    files: ExpenseFile[];
    pagination: {
      currentPage: number;
      itemsPerPage: number;
    };
  }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const url = `${this.baseURL}/api/upload/files${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async deleteExpenseFile(fileId: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseURL}/api/upload/files/${fileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async getFileDetails(fileId: string): Promise<{
    file: {
      id: string;
      fileName: string;
      fileUrl: string;
      fileSize: number;
      mimeType: string;
      uploadStatus: string;
      processingStatus: string;
      extractedExpensesCount: number;
      processingError?: string;
      processedAt?: string;
      createdAt: string;
      updatedAt: string;
    };
  }> {
    const response = await fetch(`${this.baseURL}/api/upload/files/${fileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async processExpenseFile(fileId: string): Promise<ExpenseProcessingResponse> {
    const response = await fetch(`${this.baseURL}/api/expense-processing/process/${fileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse<ExpenseProcessingResponse>(response);
  }

  async getProcessingStatus(fileId: string): Promise<{
    fileId: string;
    fileName: string;
    processingStatus: string;
    extractedExpensesCount: number;
    processingError?: string;
    processedAt?: string;
    createdAt: string;
  }> {
    const response = await fetch(`${this.baseURL}/api/expense-processing/status/${fileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse(response);
  }

  async predictCreditScore(data: {
    income: number;
    loanAmount: number;
    utilization: number;
    missedEMIs: number;
    age: number;
  }): Promise<CreditScorePrediction> {
    const response = await fetch(`${this.baseURL}/api/openai/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<CreditScorePrediction>(response);
  }

  async predictCreditScoreEnhanced(data: {
    income: number;
    loanAmount: number;
    utilization: number;
    missedEMIs: number;
    age: number;
    model?: string;
  }): Promise<CibilScorePrediction> {
    const response = await fetch(`${this.baseURL}/api/openai/predict-enhanced`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<CibilScorePrediction>(response);
  }

  async simulateScenario(data: {
    baseData: {
      income: number;
      loanAmount: number;
      utilization: number;
      missedEMIs: number;
      age: number;
    };
    scenarios: Array<{
      name: string;
      changes: Record<string, unknown>;
    }>;
  }): Promise<ScenarioSimulationResponse> {
    const response = await fetch(`${this.baseURL}/api/openai/simulate-scenario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<ScenarioSimulationResponse>(response);
  }

  async getAIInsights(data: {
    score: number;
    formData: {
      income: number;
      loanAmount: number;
      utilization: number;
      missedEMIs: number;
      age: number;
    };
  }): Promise<AIInsightsResponse> {
    const response = await fetch(`${this.baseURL}/api/openai/ai-insights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<AIInsightsResponse>(response);
  }

  async getCreditCardRecommendations(
    preferences: UserPreferences,
  ): Promise<CreditCardRecommendationsResponse> {
    const response = await fetch(`${this.baseURL}/api/credit-cards/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(preferences),
    });
    return this.handleResponse<CreditCardRecommendationsResponse>(response);
  }

  async getRecommendationHistory(params?: {
    limit?: number;
    sessionId?: string;
  }): Promise<RecommendationHistoryResponse> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.sessionId) searchParams.append("sessionId", params.sessionId);

    const url = `${this.baseURL}/api/credit-cards/recommendations/history${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse<RecommendationHistoryResponse>(response);
  }

  async getRecommendationSessions(params?: {
    limit?: number;
  }): Promise<RecommendationSessionsResponse> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const url = `${this.baseURL}/api/credit-cards/recommendations/sessions${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
      },
    });
    return this.handleResponse<RecommendationSessionsResponse>(response);
  }

  async healthCheck(): Promise<{
    status: string;
    timestamp: string;
    environment: string;
  }> {
    const response = await fetch(`${this.baseURL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.handleResponse(response);
  }
}

const apiClient = new ApiClient();

export const authApi = {
  register: (data: { email: string; password: string; username?: string }) =>
    apiClient.register(data),
  login: (data: { email: string; password: string }) => apiClient.login(data),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getProfile(),
  getGoogleAuthUrl: () => apiClient.getGoogleAuthUrl(),
};

export const expenseApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => apiClient.getExpenses(params),
  create: (data: { description: string; amount: number; category: string; date: string }) =>
    apiClient.createExpense(data),
  update: (
    id: number,
    data: {
      description: string;
      amount: number;
      category: string;
      date: string;
    },
  ) => apiClient.updateExpense(id, data),
  delete: (id: number) => apiClient.deleteExpense(id),
  getStats: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.getExpenseStats(params),
  uploadBankStatement: (file: File) => apiClient.uploadBankStatement(file),
  uploadFile: (file: File) => apiClient.uploadFile(file),
  uploadMultipleFiles: (files: File[]) => apiClient.uploadMultipleFiles(files),
  getFiles: (params?: { page?: number; limit?: number }) => apiClient.getExpenseFiles(params),
  getFileDetails: (fileId: string) => apiClient.getFileDetails(fileId),
  deleteFile: (fileId: string) => apiClient.deleteExpenseFile(fileId),
  processFile: (fileId: string) => apiClient.processExpenseFile(fileId),
  getProcessingStatus: (fileId: string) => apiClient.getProcessingStatus(fileId),
};

export const openaiApi = {
  predictCreditScore: (data: {
    income: number;
    loanAmount: number;
    utilization: number;
    missedEMIs: number;
    age: number;
  }) => apiClient.predictCreditScore(data),

  predictCreditScoreEnhanced: (data: {
    income: number;
    loanAmount: number;
    utilization: number;
    missedEMIs: number;
    age: number;
    model?: string;
  }) => apiClient.predictCreditScoreEnhanced(data),

  simulateScenario: (data: {
    baseData: {
      income: number;
      loanAmount: number;
      utilization: number;
      missedEMIs: number;
      age: number;
    };
    scenarios: Array<{
      name: string;
      changes: Record<string, unknown>;
    }>;
  }) => apiClient.simulateScenario(data),

  getAIInsights: (data: {
    score: number;
    formData: {
      income: number;
      loanAmount: number;
      utilization: number;
      missedEMIs: number;
      age: number;
    };
  }) => apiClient.getAIInsights(data),
};

export const creditCardApi = {
  getRecommendations: (preferences: UserPreferences) =>
    apiClient.getCreditCardRecommendations(preferences),
  getRecommendationHistory: (params?: { limit?: number; sessionId?: string }) =>
    apiClient.getRecommendationHistory(params),
  getRecommendationSessions: (params?: { limit?: number }) =>
    apiClient.getRecommendationSessions(params),
};

export const systemApi = {
  healthCheck: () => apiClient.healthCheck(),
};

export default apiClient;
