import { useAuthStore } from "../store/auth-store";

export const useAuthStoreActions = () => {
  const { setUser, setLoading, setError, setAuthenticated, clearAuth, reset } = useAuthStore();

  return {
    setUser,
    setLoading,
    setError,
    setAuthenticated,
    clearAuth,
    reset,
  };
};

export const useAuthStoreState = () => {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};
