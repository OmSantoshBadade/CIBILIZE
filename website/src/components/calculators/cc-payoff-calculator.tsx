"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/price";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Pie, PieChart } from "recharts";
import { z } from "zod";
import Typography from "../ui/typography";
import { CalculatorLayout } from "./calculator-layout";

const ccPayoffCalculatorSchema = z.object({
  ccBalance: z
    .number()
    .min(1000, "Minimum credit card balance is ₹1,000")
    .max(1000000, "Maximum credit card balance is ₹10,00,000"),
  ccRate: z
    .number()
    .min(12, "Minimum interest rate is 12%")
    .max(48, "Maximum interest rate is 48%"),
});

type CcPayoffCalculatorForm = z.infer<typeof ccPayoffCalculatorSchema>;

export const CcPayoffCalculator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<{
    suggestedPayment: number;
    monthsToPayoff: number;
    totalInterest: number;
    principalBalance: number;
  } | null>(null);

  const form = useForm<CcPayoffCalculatorForm>({
    resolver: zodResolver(ccPayoffCalculatorSchema),
    defaultValues: {
      ccBalance: 50000,
      ccRate: 18,
    },
  });

  useEffect(() => {
    const ccBalance = searchParams.get("ccBalance");
    const ccRate = searchParams.get("ccRate");

    if (ccBalance || ccRate) {
      form.setValue("ccBalance", ccBalance ? parseFloat(ccBalance) : 50000);
      form.setValue("ccRate", ccRate ? parseFloat(ccRate) : 18);
    }
  }, [searchParams, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.ccBalance && values.ccRate) {
        calculate(values as CcPayoffCalculatorForm);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    calculate({
      ccBalance: 50000,
      ccRate: 18,
    });
  }, []);

  const updateUrlWithValues = (values: CcPayoffCalculatorForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("ccBalance", values.ccBalance.toString());
    params.set("ccRate", values.ccRate.toString());
    setSearchParams(params);
  };

  const calculate = (values: CcPayoffCalculatorForm) => {
    const balance = values.ccBalance;
    const APR = values.ccRate / 100 / 12;
    const monthlyPayment = Math.max(balance * 0.05, balance * APR + 100);

    let monthsToPayoff: number;
    let totalInterest: number;

    if (APR === 0) {
      monthsToPayoff = Math.ceil(balance / monthlyPayment);
      totalInterest = 0;
    } else {
      monthsToPayoff = Math.ceil(
        -Math.log(1 - (balance * APR) / monthlyPayment) / Math.log(1 + APR),
      );
      const totalPaid = monthlyPayment * monthsToPayoff;
      totalInterest = totalPaid - balance;
    }

    setResults({
      suggestedPayment: monthlyPayment,
      monthsToPayoff,
      totalInterest,
      principalBalance: balance,
    });
    updateUrlWithValues(values);
  };

  return (
    <CalculatorLayout
      title="CC Payoff"
      description="Credit card payoff plan"
      icon={<CreditCard className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-7 flex flex-col space-y-10">
          <form className="space-y-6">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ccBalance">Credit Card Balance</Label>
                  <div className="relative">
                    <Input
                      id="ccBalance"
                      inputMode="numeric"
                      variant="shaded"
                      {...form.register("ccBalance", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            form.setValue("ccBalance", value);
                            const currentValues = form.getValues();
                            if (currentValues.ccRate) {
                              calculate({ ...currentValues, ccBalance: value });
                            }
                          }
                        },
                      })}
                      className="flex-1 pl-10"
                      placeholder="50000"
                    />

                    <div className="absolute top-1/2 left-3 -translate-y-1/2">
                      <svg
                        height="14"
                        width="14"
                        version="1.1"
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                      >
                        <path
                          className="text-primary/75 fill-current"
                          d="M318.213,66.588h107.818L465.37,0H85.969L46.63,66.588h145.727c32.137,9.476,58.259,28.504,72.702,52.656
                  H85.969l-39.34,66.588h227.316c-13.482,45.473-65.618,79.365-127.924,79.365H68.313v60.013L288.818,512h96.012v-23.222
                  L183.333,321.936c84.557-3.351,153.634-61.218,166.283-136.105h76.415l39.339-66.588H345.687
                  C340.062,100.028,330.637,82.256,318.213,66.588z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <Slider
                  min={1000}
                  max={1000000}
                  step={1000}
                  value={[form.watch("ccBalance")]}
                  onValueChange={(value) => {
                    form.setValue("ccBalance", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (currentValues.ccRate) {
                      calculate({ ...currentValues, ccBalance: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ccRate">Annual Interest Rate</Label>
                  <Input
                    id="ccRate"
                    step="0.1"
                    variant="shaded"
                    {...form.register("ccRate", {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          form.setValue("ccRate", value);
                          const currentValues = form.getValues();
                          if (currentValues.ccBalance) {
                            calculate({ ...currentValues, ccRate: value });
                          }
                        }
                      },
                    })}
                    className="max-w-40 flex-1"
                    placeholder="18"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Slider
                    min={12}
                    max={48}
                    step={0.5}
                    value={[form.watch("ccRate")]}
                    onValueChange={(value) => {
                      form.setValue("ccRate", value[0]);
                      // Trigger immediate calculation
                      const currentValues = form.getValues();
                      if (currentValues.ccBalance) {
                        calculate({ ...currentValues, ccRate: value[0] });
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </form>

          <Card className="border-none bg-transparent p-0 shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">
                    Suggested Monthly Payment
                  </Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.suggestedPayment || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Months to Payoff</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {results?.monthsToPayoff || 0} months
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Total Interest</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.totalInterest || 0)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-5 border-none bg-transparent p-0">
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "var(--chart-1)" }}
                ></div>
                <span className="text-muted-foreground text-sm">Principal Balance</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "var(--chart-2)" }}
                ></div>
                <span className="text-muted-foreground text-sm">Interest Amount</span>
              </div>
            </div>

            <ChartContainer
              config={{
                principalBalance: {
                  label: "Principal Balance",
                  color: "var(--chart-1)",
                },
                interestAmount: {
                  label: "Interest Amount",
                  color: "var(--chart-2)",
                },
              }}
              className="mx-auto aspect-square max-h-[300px] w-full"
            >
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={[
                    {
                      name: "principalBalance",
                      value: results?.principalBalance || 0,
                      fill: "var(--chart-1)",
                    },
                    {
                      name: "interestAmount",
                      value: results?.totalInterest || 0,
                      fill: "var(--chart-2)",
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={120}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};
