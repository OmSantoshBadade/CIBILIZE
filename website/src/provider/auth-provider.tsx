import Cookies from "js-cookie";
import React, { createContext, ReactNode, useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi, AuthResponse, User } from "../lib/api";
import { useAuthStore } from "../store/auth-store";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRefreshingRef = React.useRef(false);
  const isFetchingProfileRef = React.useRef(false);
  const isInitializingRef = React.useRef(false);

  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setLoading,
    setError,
    setAuthenticated,
    clearAuth,
  } = useAuthStore();

  const handleAuthResponse = useCallback(
    async (response: AuthResponse) => {
      const { user, accessToken } = response;
      setToken(accessToken);
      setUser(user);
      setAuthenticated(true);
      setError(null);

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    },
    [setToken, setUser, setAuthenticated, setError, navigate, location.state],
  );

  const fetchUserProfile = useCallback(async () => {
    if (isFetchingProfileRef.current) {
      return user;
    }

    if (user && isAuthenticated) {
      return user;
    }

    isFetchingProfileRef.current = true;
    try {
      const response = await authApi.getProfile();
      setUser(response.user);
      setAuthenticated(true);
      setError(null);
      return response.user;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      throw error;
    } finally {
      isFetchingProfileRef.current = false;
    }
  }, [setUser, setAuthenticated, setError, user, isAuthenticated]);

  const checkAuthToken = useCallback(async () => {
    if (isRefreshingRef.current) {
      return;
    }

    const token = Cookies.get("auth_token");

    if (!token) {
      clearAuth();
      setLoading(false);
      return;
    }

    isRefreshingRef.current = true;
    try {
      setLoading(true);
      await fetchUserProfile();
    } catch (error) {
      console.error("Token validation failed:", error);
      clearAuth();
      setError("Session expired. Please login again.");
    } finally {
      setLoading(false);
      isRefreshingRef.current = false;
    }
  }, [fetchUserProfile, clearAuth, setLoading, setError]);

  const verifyToken = useCallback(async () => {
    if (isInitializingRef.current) {
      return;
    }

    if (user && isAuthenticated && !isLoading) {
      return;
    }

    isInitializingRef.current = true;

    try {
      await checkAuthToken();
    } finally {
      isInitializingRef.current = false;
    }
  }, [checkAuthToken, user, isAuthenticated, isLoading]);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authApi.login({ email, password });
        await handleAuthResponse(response);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Login failed";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, handleAuthResponse],
  );

  const register = useCallback(
    async (email: string, password: string, username?: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authApi.register({ email, password, username });
        await handleAuthResponse(response);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Registration failed";
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, handleAuthResponse],
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      clearAuth();
      setLoading(false);
      navigate("/", { replace: true });
    }
  }, [setLoading, clearAuth, navigate]);

  const loginWithGoogle = useCallback(() => {
    const googleAuthUrl = authApi.getGoogleAuthUrl();
    window.location.href = googleAuthUrl;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const handleGoogleCallback = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");

    if (error) {
      setError("Google authentication failed");
      navigate("/", { replace: true });
      return;
    }

    if (token) {
      try {
        setLoading(true);
        setToken(token);
        await fetchUserProfile();

        window.history.replaceState({}, document.title, "/");
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Failed to complete Google authentication:", error);
        setError("Failed to complete Google authentication");
        clearAuth();
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    }
  }, [setToken, fetchUserProfile, setError, setLoading, clearAuth, navigate]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitializingRef.current || (user && isAuthenticated && !isLoading)) {
        return;
      }

      if (location.pathname === "/auth/callback") {
        await handleGoogleCallback();
        return;
      }

      await verifyToken();
    };

    const timeoutId = setTimeout(initializeAuth, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, handleGoogleCallback, verifyToken, user, isAuthenticated, isLoading]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    loginWithGoogle,
    clearError,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
