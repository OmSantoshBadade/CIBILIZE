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
import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Pie, PieChart } from "recharts";
import { z } from "zod";
import Typography from "../ui/typography";
import { CalculatorLayout } from "./calculator-layout";

const emiCalculatorSchema = z.object({
  principal: z
    .number()
    .min(100000, "Minimum loan amount is ₹1,00,000")
    .max(10000000, "Maximum loan amount is ₹1,00,00,000"),
  rate: z.number().min(1, "Minimum interest rate is 1%").max(20, "Maximum interest rate is 20%"),
  tenure: z.number().min(1, "Minimum tenure is 1 year").max(30, "Maximum tenure is 30 years"),
});

type EmiCalculatorForm = z.infer<typeof emiCalculatorSchema>;

export const EmiCalculator = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<{
    monthlyEMI: number;
    principalAmount: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const form = useForm<EmiCalculatorForm>({
    resolver: zodResolver(emiCalculatorSchema),
    defaultValues: {
      principal: 500000,
      rate: 8.5,
      tenure: 5,
    },
  });

  useEffect(() => {
    const principal = searchParams.get("principal");
    const rate = searchParams.get("rate");
    const tenure = searchParams.get("tenure");

    if (principal || rate || tenure) {
      form.setValue("principal", principal ? parseFloat(principal) : 500000);
      form.setValue("rate", rate ? parseFloat(rate) : 8.5);
      form.setValue("tenure", tenure ? parseFloat(tenure) : 5);
    }
  }, [searchParams, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.principal && values.rate && values.tenure) {
        calculate(values as EmiCalculatorForm);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    calculate({
      principal: 500000,
      rate: 8.5,
      tenure: 5,
    });
  }, []);

  const updateUrlWithValues = (values: EmiCalculatorForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("principal", values.principal.toString());
    params.set("rate", values.rate.toString());
    params.set("tenure", values.tenure.toString());
    setSearchParams(params);
  };

  const calculate = (values: EmiCalculatorForm) => {
    const P = values.principal;
    const r = values.rate / 100 / 12;
    const n = values.tenure * 12;

    let monthlyEMI: number;
    let totalAmount: number;
    let totalInterest: number;

    if (r === 0) {
      monthlyEMI = P / n;
      totalAmount = monthlyEMI * n;
      totalInterest = 0;
    } else {
      monthlyEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      totalAmount = monthlyEMI * n;
      totalInterest = totalAmount - P;
    }

    setResults({
      monthlyEMI,
      principalAmount: P,
      totalInterest,
      totalAmount,
    });
    updateUrlWithValues(values);
  };

  return (
    <CalculatorLayout
      title="EMI"
      description="Calculate loan EMI payments"
      icon={<Calculator className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="col-span-7 flex flex-col space-y-10">
          <form className="space-y-6">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="principal">Loan Amount</Label>
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
                            if (currentValues.rate && currentValues.tenure) {
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
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={[form.watch("principal")]}
                  onValueChange={(value) => {
                    form.setValue("principal", value[0]);
                    // Trigger immediate calculation
                    const currentValues = form.getValues();
                    if (currentValues.rate && currentValues.tenure) {
                      calculate({ ...currentValues, principal: value[0] });
                    }
                  }}
                  className="flex-1"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rate">Interest Rate</Label>
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
                          if (currentValues.principal && currentValues.tenure) {
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
                    max={20}
                    step={0.1}
                    value={[form.watch("rate")]}
                    onValueChange={(value) => {
                      form.setValue("rate", value[0]);
                      // Trigger immediate calculation
                      const currentValues = form.getValues();
                      if (currentValues.principal && currentValues.tenure) {
                        calculate({ ...currentValues, rate: value[0] });
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tenure">Loan Tenure</Label>
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
                          if (currentValues.principal && currentValues.rate) {
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
                    max={30}
                    step={1}
                    value={[form.watch("tenure")]}
                    onValueChange={(value) => {
                      form.setValue("tenure", value[0]);
                      // Trigger immediate calculation
                      const currentValues = form.getValues();
                      if (currentValues.principal && currentValues.rate) {
                        calculate({ ...currentValues, tenure: value[0] });
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
                  <Typography.SubHeading variant="md">Monthly EMI</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.monthlyEMI || 0)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Principal Amount</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.principalAmount || 0)}
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
                <div className="flex items-center justify-between">
                  <Typography.SubHeading variant="md">Total Amount</Typography.SubHeading>
                  <Badge
                    className={cn(
                      "text-sm font-medium",
                      "bg-secondary text-foreground border-none",
                    )}
                  >
                    {formatPrice(results?.totalAmount || 0)}
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
                <span className="text-muted-foreground text-sm">Principal Amount</span>
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
                principal: {
                  label: "Principal Amount",
                  color: "var(--chart-1)",
                },
                interest: {
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
                      name: "principal",
                      value: results?.principalAmount || 0,
                      fill: "var(--chart-1)",
                    },
                    {
                      name: "interest",
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
