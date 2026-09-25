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
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Pie, PieChart } from "recharts";
import { z } from "zod";
import Typography from "../ui/typography";
import { CalculatorLayout } from "./calculator-layout";

const emergencyCalculatorSchema = z.object({
  income: z
    .number()
    .min(100000, "Minimum annual income is ₹1,00,000")
    .max(10000000, "Maximum annual income is ₹1,00,00,000"),
  expense: z
    .number()
    .min(50000, "Minimum annual expense is ₹50,000")
    .max(5000000, "Maximum annual expense is ₹50,00,000"),
});

type EmergencyCalculatorForm = z.infer<typeof emergencyCalculatorSchema>;

export const EmergencyCalculator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<{
    emergencyFund: number;
    monthlyExpense: number;
    coveragePeriod: string;
    emergencyBuffer: number;
  } | null>(null);

  const form = useForm<EmergencyCalculatorForm>({
    resolver: zodResolver(emergencyCalculatorSchema),
    defaultValues: {
      income: 1000000,
      expense: 500000,
    },
  });

  useEffect(() => {
    const income = searchParams.get("income");
    const expense = searchParams.get("expense");

    if (income || expense) {
      form.setValue("income", income ? parseFloat(income) : 1000000);
      form.setValue("expense", expense ? parseFloat(expense) : 500000);
    }
  }, [searchParams, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.income && values.expense) {
        calculate(values as EmergencyCalculatorForm);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    calculate({
      income: 1000000,
      expense: 500000,
    });
  }, []);

  const updateUrlWithValues = (values: EmergencyCalculatorForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("income", values.income.toString());
    params.set("expense", values.expense.toString());
    setSearchParams(params);
  };

  const calculate = (values: EmergencyCalculatorForm) => {
    const monthlyExpense = values.expense / 12;
    const emergencyFund = monthlyExpense * 6;
    const emergencyBuffer = emergencyFund - monthlyExpense;

    setResults({
      emergencyFund,
      monthlyExpense,
      coveragePeriod: "6 months",
      emergencyBuffer,
    });
    updateUrlWithValues(values);
  };

  return (
    <CalculatorLayout
      title="Emergency"
      description="Emergency fund calculator"
      icon={<Shield className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-7 flex flex-col space-y-10">
          <form className="space-y-6">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="income">Annual Income</Label>
                  <div className="relative">
                    <Input
                      id="income"
                      inputMode="numeric"
                      variant="shaded"
                      {...form.register("income", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            form.setValue("income", value);
                            const currentValues = form.getValues();
                            if (currentValues.expense) {
                              calculate({ ...currentValues, income: value });
                            }
                          }
                        },
                      })}
                      className="flex-1 pl-10"
                      placeholder="1000000"
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
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={[form.watch("income")]}
                  onValueChange={(value) => {
                    form.setValue("income", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (currentValues.expense) {
                      calculate({ ...currentValues, income: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="expense">Annual Expenses</Label>
                  <div className="relative">
                    <Input
                      id="expense"
                      inputMode="numeric"
                      variant="shaded"
                      {...form.register("expense", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            form.setValue("expense", value);
                            const currentValues = form.getValues();
                            if (currentValues.income) {
                              calculate({ ...currentValues, expense: value });
                            }
                          }
                        },
                      })}
                      className="flex-1 pl-10"
                      placeholder="500000"
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
                  min={50000}
                  max={5000000}
                  step={25000}
                  value={[form.watch("expense")]}
                  onValueChange={(value) => {
                    form.setValue("expense", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (currentValues.income) {
                      calculate({ ...currentValues, expense: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </form>

          <Card className="border-none bg-transparent p-0 shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">
                    Emergency Fund Required
                  </Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.emergencyFund || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Monthly Expense</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.monthlyExpense || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Coverage Period</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {results?.coveragePeriod || "6 months"}
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
                <span className="text-muted-foreground text-sm">Monthly Expenses</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "var(--chart-2)" }}
                ></div>
                <span className="text-muted-foreground text-sm">Emergency Buffer</span>
              </div>
            </div>

            <ChartContainer
              config={{
                monthlyExpenses: {
                  label: "Monthly Expenses",
                  color: "var(--chart-1)",
                },
                emergencyBuffer: {
                  label: "Emergency Buffer",
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
                      name: "monthlyExpenses",
                      value: results?.monthlyExpense || 0,
                      fill: "var(--chart-1)",
                    },
                    {
                      name: "emergencyBuffer",
                      value: results?.emergencyBuffer || 0,
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
