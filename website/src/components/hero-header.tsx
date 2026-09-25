"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";
import React from "react";
import { Link } from "react-router-dom";

export const HeroHeader = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const { loginWithGoogle, isAuthenticated } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed z-20 w-full px-2">
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
          isScrolled && "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
        )}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          <div className="flex w-full justify-between">
            <Link to="/" aria-label="home" className="flex items-center space-x-2">
              <Logo />
            </Link>

            {isAuthenticated ? (
              <Button asChild size="sm">
                <Link to="/app/credit-cards">
                  <span>Dashboard</span>
                </Link>
              </Button>
            ) : (
              <Button size="sm" onClick={() => loginWithGoogle()}>
                <span>Get Started</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
