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
import { Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Pie, PieChart } from "recharts";
import { z } from "zod";
import Typography from "../ui/typography";
import { CalculatorLayout } from "./calculator-layout";

const networthCalculatorSchema = z.object({
  income: z
    .number()
    .min(0, "Minimum liquid assets is ₹0")
    .max(10000000, "Maximum liquid assets is ₹1,00,00,000"),
  principal: z
    .number()
    .min(0, "Minimum investments is ₹0")
    .max(10000000, "Maximum investments is ₹1,00,00,000"),
  ccBalance: z
    .number()
    .min(0, "Minimum liabilities is ₹0")
    .max(5000000, "Maximum liabilities is ₹50,00,000"),
});

type NetworthCalculatorForm = z.infer<typeof networthCalculatorSchema>;

export const NetworthCalculator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<{
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  } | null>(null);

  const form = useForm<NetworthCalculatorForm>({
    resolver: zodResolver(networthCalculatorSchema),
    defaultValues: {
      income: 1000000,
      principal: 500000,
      ccBalance: 50000,
    },
  });

  useEffect(() => {
    const income = searchParams.get("income");
    const principal = searchParams.get("principal");
    const ccBalance = searchParams.get("ccBalance");

    if (income || principal || ccBalance) {
      form.setValue("income", income ? parseFloat(income) : 1000000);
      form.setValue("principal", principal ? parseFloat(principal) : 500000);
      form.setValue("ccBalance", ccBalance ? parseFloat(ccBalance) : 50000);
    }
  }, [searchParams, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (
        values.income !== undefined &&
        values.principal !== undefined &&
        values.ccBalance !== undefined
      ) {
        calculate(values as NetworthCalculatorForm);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    calculate({
      income: 1000000,
      principal: 500000,
      ccBalance: 50000,
    });
  }, []);

  const updateUrlWithValues = (values: NetworthCalculatorForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("income", values.income.toString());
    params.set("principal", values.principal.toString());
    params.set("ccBalance", values.ccBalance.toString());
    setSearchParams(params);
  };

  const calculate = (values: NetworthCalculatorForm) => {
    const totalAssets = values.income + values.principal;
    const totalLiabilities = values.ccBalance;
    const netWorth = totalAssets - totalLiabilities;

    setResults({
      totalAssets,
      totalLiabilities,
      netWorth,
    });
    updateUrlWithValues(values);
  };

  return (
    <CalculatorLayout
      title="Net Worth"
      description="Calculate your net worth"
      icon={<Banknote className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-7 flex flex-col space-y-10">
          <form className="space-y-6">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="income">Liquid Assets</Label>
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
                            if (
                              currentValues.principal !== undefined &&
                              currentValues.ccBalance !== undefined
                            ) {
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
                  min={0}
                  max={10000000}
                  step={50000}
                  value={[form.watch("income")]}
                  onValueChange={(value) => {
                    form.setValue("income", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (
                      currentValues.principal !== undefined &&
                      currentValues.ccBalance !== undefined
                    ) {
                      calculate({ ...currentValues, income: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="principal">Investments</Label>
                  <div className="relative">
                    <Input
                      id="principal"
                      inputMode="numeric"
                      variant="shaded"
                      {...form.register("principal", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            form.setValue("principal", value);
                            const currentValues = form.getValues();
                            if (
                              currentValues.income !== undefined &&
                              currentValues.ccBalance !== undefined
                            ) {
                              calculate({ ...currentValues, principal: value });
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
                  min={0}
                  max={10000000}
                  step={50000}
                  value={[form.watch("principal")]}
                  onValueChange={(value) => {
                    form.setValue("principal", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (
                      currentValues.income !== undefined &&
                      currentValues.ccBalance !== undefined
                    ) {
                      calculate({ ...currentValues, principal: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ccBalance">Total Liabilities</Label>
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
                            if (
                              currentValues.income !== undefined &&
                              currentValues.principal !== undefined
                            ) {
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
                  min={0}
                  max={5000000}
                  step={25000}
                  value={[form.watch("ccBalance")]}
                  onValueChange={(value) => {
                    form.setValue("ccBalance", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (
                      currentValues.income !== undefined &&
                      currentValues.principal !== undefined
                    ) {
                      calculate({ ...currentValues, ccBalance: value[0] });
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
                  <Typography.SubHeading variant="md">Total Assets</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.totalAssets || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Total Liabilities</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.totalLiabilities || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Net Worth</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      results?.netWorth && results.netWorth >= 0
                        ? "bg-green-500 text-white"
                        : "bg-destructive text-destructive-foreground",
                    )}
                  >
                    {formatPrice(results?.netWorth || 0)}
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
                <span className="text-muted-foreground text-sm">Total Assets</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "var(--chart-2)" }}
                ></div>
                <span className="text-muted-foreground text-sm">Total Liabilities</span>
              </div>
            </div>

            <ChartContainer
              config={{
                totalAssets: {
                  label: "Total Assets",
                  color: "var(--chart-1)",
                },
                totalLiabilities: {
                  label: "Total Liabilities",
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
                      name: "totalAssets",
                      value: results?.totalAssets || 0,
                      fill: "var(--chart-1)",
                    },
                    {
                      name: "totalLiabilities",
                      value: results?.totalLiabilities || 0,
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
