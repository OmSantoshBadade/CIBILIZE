import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

const CALCULATOR_ROUTES = [
  "/app/calculator/emi-calculator",
  "/app/calculator/sip-calculator",
  "/app/calculator/lumpsum-calculator",
  "/app/calculator/tax-calculator",
  "/app/calculator/retirement-calculator",
  "/app/calculator/emergency-calculator",
  "/app/calculator/networth-calculator",
  "/app/calculator/cc-payoff-calculator",
  "/app/calculator/fdrd-calculator",
  "/app/calculator/debt-calculator",
];

export const CalculatorLayout = ({ title, children }: CalculatorLayoutProps) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{title} Calculator</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="order-2 col-span-12 lg:order-1 lg:col-span-8">
          <CardContent>{children}</CardContent>
        </Card>

        <Card className="order-1 col-span-4 hidden w-full p-0 lg:order-2 lg:flex">
          <CardContent className="w-full space-y-4 p-0">
            <h3 className="px-4 pt-2 text-lg font-semibold">Popular Calculators</h3>
            <div className="flex flex-col">
              {CALCULATOR_ROUTES.map((calc) => {
                return (
                  <Button
                    key={calc}
                    variant={pathname === calc ? "secondary" : "ghost"}
                    onClick={() => navigate(calc)}
                    className="flex h-auto flex-col items-start justify-start gap-2 rounded-none p-4 text-left capitalize"
                  >
                    {calc.split("/").pop().replace("-", " ")}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 col-span-12 flex w-full p-4 lg:col-span-4 lg:hidden">
          <CardContent className="w-full space-y-4 p-0">
            <h3 className="text-lg font-semibold">Popular Calculators</h3>
            <div className="w-full">
              <Select value={pathname} onValueChange={(value) => navigate(value)}>
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Select a calculator" />
                </SelectTrigger>
                <SelectContent>
                  {CALCULATOR_ROUTES.map((calc) => (
                    <SelectItem key={calc} value={calc} className="capitalize">
                      {calc.split("/").pop().replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
