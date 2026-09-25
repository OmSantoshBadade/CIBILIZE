import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/auth-provider";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const { isLoading, error } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const errorParam = urlParams.get("error");

    // console.log("Auth callback loaded");
    // console.log("URL Params:", window.location.search);
    // console.log("token:", token);
    // console.log("errorParam:", errorParam);

    if (errorParam) {
      // console.log("Error param detected in callback, navigating to error page");
      navigate("/?error=google_auth_failed", { replace: true });
      return;
    }

    if (!token) {
      // console.log("No token found in callback, redirecting to home");
      navigate("/", { replace: true });
      return;
    }

    // If token exists, set auth cookie + onboarding cookie and redirect to onboarding
    try {
      // Persist auth token cookie so AuthProvider doesn't clear auth on next route
      // 7 days expiry, SameSite=Strict to match store behavior
      const isSecure = window.location.protocol === "https:";
      const maxAge = 60 * 60 * 24 * 7; // 7 days
      document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}; SameSite=Strict${isSecure ? "; Secure" : ""}`;

      // Set onboarding cookie to true for the entire site
      document.cookie = "onboarding=true; path=/; SameSite=Lax";
      // console.log("Token found. Onboarding cookie set. Redirecting to /onboarding");
      navigate("/onboarding", { replace: true });
      return;
    } catch (e) {
      console.error("Failed to set onboarding cookie:", e);
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      if (isLoading) {
        // console.log("Auth callback timeout hit, navigating to error page");
        navigate("/?error=callback_timeout", { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate, isLoading]);

  useEffect(() => {
    if (error && !isLoading) {
      // console.log("Auth error from provider:", error);
      navigate("/?error=auth_failed", { replace: true });
    }
  }, [error, isLoading, navigate]);

  return (
    <div className="bg-background flex min-h-[90vh] items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Completing authentication...</p>
        <p className="text-muted-foreground text-sm">Please wait while we verify your account</p>
      </div>
    </div>
  );
}
