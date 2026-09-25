"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SpecialCard,
  SpecialCardContent,
  SpecialCardDescription,
  SpecialCardHeader,
  SpecialCardTitle,
} from "@/components/ui/special-card";
import Typography from "@/components/ui/typography";
import {
  Banknote,
  Calculator,
  Calendar,
  CreditCard,
  PiggyBank,
  Receipt,
  Shield,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinancialCalculatorHub = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "emi",
      name: "EMI",
      icon: Calculator,
      description: "Calculate loan EMI payments",
      route: "/app/calculator/emi-calculator",
    },
    {
      id: "sip",
      name: "SIP",
      icon: TrendingUp,
      description: "Plan your SIP investments",
      route: "/app/calculator/sip-calculator",
    },
    {
      id: "lumpsum",
      name: "Lumpsum",
      icon: Wallet,
      description: "One-time investment returns",
      route: "/app/calculator/lumpsum-calculator",
    },
    {
      id: "debt",
      name: "Debt",
      icon: PiggyBank,
      description: "Track savings and expenses",
      route: "/app/calculator/debt-calculator",
    },
    {
      id: "tax",
      name: "Tax",
      icon: Receipt,
      description: "Calculate income tax",
      route: "/app/calculator/tax-calculator",
    },
    {
      id: "retirement",
      name: "Retirement",
      icon: Target,
      description: "Plan your retirement corpus",
      route: "/app/calculator/retirement-calculator",
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: Shield,
      description: "Emergency fund calculator",
      route: "/app/calculator/emergency-calculator",
    },
    {
      id: "networth",
      name: "Net Worth",
      icon: Banknote,
      description: "Calculate your net worth",
      route: "/app/calculator/networth-calculator",
    },
    {
      id: "ccpayoff",
      name: "CC Payoff",
      icon: CreditCard,
      description: "Credit card payoff plan",
      route: "/app/calculator/cc-payoff-calculator",
    },
    {
      id: "fdrd",
      name: "FD/RD",
      icon: Calendar,
      description: "Fixed/Recurring deposits",
      route: "/app/calculator/fdrd-calculator",
    },
  ];

  const handleCalculatorClick = (route) => {
    navigate(route);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography.Heading variant="xl">Financial Calculators</Typography.Heading>
        <Typography.P className="text-muted-foreground">
          Choose from our comprehensive suite of financial calculators to plan your finances better.
        </Typography.P>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => {
          const IconComponent = calc.icon;
          return (
            <SpecialCard key={calc.id} onClick={() => handleCalculatorClick(calc.route)}>
              <SpecialCardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <IconComponent className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <SpecialCardTitle>{calc.name}</SpecialCardTitle>
                    <SpecialCardDescription>{calc.description}</SpecialCardDescription>
                  </div>
                </div>
              </SpecialCardHeader>
              <SpecialCardContent className="Cibilize Dashboard Smarter Finance Starts HereSmarter Finance Starts Here Get smart credit card picks, AI insights, and tools to your finances confidently. Credit Score Your credit score has improved significantly this year. 785Current Score 2024 720Previous Score 2023 Smart Credit Card Matching AI-powered credit card recommendations tailored to your spending habits, credit score, and financial objectives. payments illustration dark Intelligent Expense Management payments illustration light Comprehensive Financial Calculators fn K AI Financial Advisor 24/7 AI-powered financial guidance, personalized advice, and real-time insights for smarter money decisions. Linear logo Netlify logo github logo Connect with Your Favorite Trading Platform Seamlessly integrate with Zerodha, Upstox, and other trading platforms to get advanced stock analysis and portfolio insights. Frequently Asked Questions Discover quick and comprehensive answers to common questions about our platform, services, and features. Cibilize App Features Credit Cards Expense Tracker CIBIL Score EMI Tracker Recommendations Calculators EMI Calculator SIP Calculator Tax Calculator Retirement Calculator Emergency Fund Net Worth Credit Card Payoff Debt Calculator Community GitHub Discord Slack X / Twitter © Cibilize 2025 Privacy Policy grow px-0 pt-0">
                <Button
                  onClick={() => handleCalculatorClick(calc.route)}
                  className="w-full"
                  // variant="d"
                >
                  Open Calculator
                </Button>
              </SpecialCardContent>
            </SpecialCard>
          );
        })}
      </div>

      <Card className="mt-8 gap-0">
        <CardHeader>
          <CardTitle>About Our Calculators</CardTitle>
        </CardHeader>
        <CardContent className="gap-2">
          <div className="space-y-4">
            <Typography.P>
              Our financial calculators are designed to help you make informed decisions about your
              money. Each calculator is built with precision and follows standard financial formulas
              to give you accurate results.
            </Typography.P>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Typography.Heading variant="sm" className="mb-2">
                  Features
                </Typography.Heading>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Real-time calculations</li>
                  <li>• Interactive charts and graphs</li>
                  <li>• URL parameter sharing</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
              <div>
                <Typography.Heading variant="sm" className="mb-2">
                  Benefits
                </Typography.Heading>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Plan your investments</li>
                  <li>• Calculate loan payments</li>
                  <li>• Track your net worth</li>
                  <li>• Optimize your savings</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCalculatorHub;
