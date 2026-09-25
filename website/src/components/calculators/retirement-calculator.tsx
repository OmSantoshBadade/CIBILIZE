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
import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Pie, PieChart } from "recharts";
import { z } from "zod";
import Typography from "../ui/typography";
import { CalculatorLayout } from "./calculator-layout";

const retirementCalculatorSchema = z.object({
  monthly: z
    .number()
    .min(500, "Minimum monthly investment is ₹500")
    .max(100000, "Maximum monthly investment is ₹1,00,000"),
  rate: z
    .number()
    .min(1, "Minimum expected return is 1%")
    .max(25, "Maximum expected return is 25%"),
  tenure: z.number().min(1, "Minimum tenure is 1 year").max(40, "Maximum tenure is 40 years"),
  target: z
    .number()
    .min(500000, "Minimum target corpus is ₹5,00,000")
    .max(50000000, "Maximum target corpus is ₹5,00,00,000"),
});

type RetirementCalculatorForm = z.infer<typeof retirementCalculatorSchema>;

export const RetirementCalculator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<{
    futureCorpus: number;
    targetCorpus: number;
    shortfallSurplus: number;
    totalInvested: number;
    wealthGained: number;
  } | null>(null);

  const form = useForm<RetirementCalculatorForm>({
    resolver: zodResolver(retirementCalculatorSchema),
    defaultValues: {
      monthly: 5000,
      rate: 8.5,
      tenure: 5,
      target: 1000000,
    },
  });

  useEffect(() => {
    const monthly = searchParams.get("monthly");
    const rate = searchParams.get("rate");
    const tenure = searchParams.get("tenure");
    const target = searchParams.get("target");

    if (monthly || rate || tenure || target) {
      form.setValue("monthly", monthly ? parseFloat(monthly) : 5000);
      form.setValue("rate", rate ? parseFloat(rate) : 8.5);
      form.setValue("tenure", tenure ? parseFloat(tenure) : 5);
      form.setValue("target", target ? parseFloat(target) : 1000000);
    }
  }, [searchParams, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.monthly && values.rate && values.tenure && values.target) {
        calculate(values as RetirementCalculatorForm);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    calculate({
      monthly: 5000,
      rate: 8.5,
      tenure: 5,
      target: 1000000,
    });
  }, []);

  const updateUrlWithValues = (values: RetirementCalculatorForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("monthly", values.monthly.toString());
    params.set("rate", values.rate.toString());
    params.set("tenure", values.tenure.toString());
    params.set("target", values.target.toString());
    setSearchParams(params);
  };

  const calculate = (values: RetirementCalculatorForm) => {
    const monthlyInvest = values.monthly;
    const rate = values.rate / 100 / 12;
    const monthsLeft = values.tenure * 12;
    const totalInvested = monthlyInvest * monthsLeft;
    const futureCorpus = monthlyInvest * ((Math.pow(1 + rate, monthsLeft) - 1) / rate) * (1 + rate);
    const shortfallSurplus = values.target - futureCorpus;
    const wealthGained = futureCorpus - totalInvested;

    setResults({
      futureCorpus,
      targetCorpus: values.target,
      shortfallSurplus,
      totalInvested,
      wealthGained,
    });
    updateUrlWithValues(values);
  };

  return (
    <CalculatorLayout
      title="Retirement"
      description="Plan your retirement corpus"
      icon={<Target className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-7 flex flex-col space-y-10">
          <form className="space-y-6">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="monthly">Monthly Investment</Label>
                  <div className="relative">
                    <Input
                      id="monthly"
                      inputMode="numeric"
                      variant="shaded"
                      {...form.register("monthly", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            form.setValue("monthly", value);
                            const currentValues = form.getValues();
                            if (
                              currentValues.rate &&
                              currentValues.tenure &&
                              currentValues.target
                            ) {
                              calculate({ ...currentValues, monthly: value });
                            }
                          }
                        },
                      })}
                      className="flex-1 pl-10"
                      placeholder="5000"
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
                  min={500}
                  max={100000}
                  step={500}
                  value={[form.watch("monthly")]}
                  onValueChange={(value) => {
                    form.setValue("monthly", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (currentValues.rate && currentValues.tenure && currentValues.target) {
                      calculate({ ...currentValues, monthly: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rate">Expected Return</Label>
                  <Input
                    id="rate"
                    step="0.1"
                    variant="shaded"
                    {...form.register("rate", {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          form.setValue("rate", value);
                          const currentValues = form.getValues();
                          if (
                            currentValues.monthly &&
                            currentValues.tenure &&
                            currentValues.target
                          ) {
                            calculate({ ...currentValues, rate: value });
                          }
                        }
                      },
                    })}
                    className="max-w-40 flex-1"
                    placeholder="8.5"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Slider
                    min={1}
                    max={25}
                    step={0.5}
                    value={[form.watch("rate")]}
                    onValueChange={(value) => {
                      form.setValue("rate", value[0]);
                      // Trigger immediate calculation
                      const currentValues = form.getValues();
                      if (currentValues.monthly && currentValues.tenure && currentValues.target) {
                        calculate({ ...currentValues, rate: value[0] });
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tenure">Investment Period</Label>
                  <Input
                    id="tenure"
                    inputMode="numeric"
                    variant="shaded"
                    {...form.register("tenure", {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          form.setValue("tenure", value);
                          const currentValues = form.getValues();
                          if (currentValues.monthly && currentValues.rate && currentValues.target) {
                            calculate({ ...currentValues, tenure: value });
                          }
                        }
                      },
                    })}
                    className="max-w-40 flex-1"
                    placeholder="5"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Slider
                    min={1}
                    max={40}
                    step={1}
                    value={[form.watch("tenure")]}
                    onValueChange={(value) => {
                      form.setValue("tenure", value[0]);
                      // Trigger immediate calculation
                      const currentValues = form.getValues();
                      if (currentValues.monthly && currentValues.rate && currentValues.target) {
                        calculate({ ...currentValues, tenure: value[0] });
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="target">Target Corpus</Label>
                  <div className="relative">
                    <Input
                      id="target"
                      inputMode="numeric"
                      variant="shaded"
                      {...form.register("target", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            form.setValue("target", value);
                            const currentValues = form.getValues();
                            if (
                              currentValues.monthly &&
                              currentValues.rate &&
                              currentValues.tenure
                            ) {
                              calculate({ ...currentValues, target: value });
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
                  min={500000}
                  max={50000000}
                  step={100000}
                  value={[form.watch("target")]}
                  onValueChange={(value) => {
                    form.setValue("target", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (currentValues.monthly && currentValues.rate && currentValues.tenure) {
                      calculate({ ...currentValues, target: value[0] });
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
                  <Typography.SubHeading variant="md">Future Corpus</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.futureCorpus || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Target Corpus</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.targetCorpus || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">
                    {results?.shortfallSurplus && results.shortfallSurplus > 0
                      ? "Shortfall"
                      : "Surplus"}
                  </Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      results?.shortfallSurplus && results.shortfallSurplus > 0
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-green-500 text-white",
                    )}
                  >
                    {results?.shortfallSurplus && results.shortfallSurplus > 0 ? "-" : "+"}
                    {formatPrice(Math.abs(results?.shortfallSurplus || 0))}
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
                <span className="text-muted-foreground text-sm">Total Invested</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: "var(--chart-2)" }}
                ></div>
                <span className="text-muted-foreground text-sm">Wealth Gained</span>
              </div>
            </div>

            <ChartContainer
              config={{
                totalInvested: {
                  label: "Total Invested",
                  color: "var(--chart-1)",
                },
                wealthGained: {
                  label: "Wealth Gained",
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
                      name: "totalInvested",
                      value: results?.totalInvested || 0,
                      fill: "var(--chart-1)",
                    },
                    {
                      name: "wealthGained",
                      value: results?.wealthGained || 0,
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
