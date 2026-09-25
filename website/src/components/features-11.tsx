import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";
import { Button } from "./ui/button";

export default function Features() {
  const { loginWithGoogle } = useAuth();

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto grid gap-2 sm:grid-cols-5">
          <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl">
            <CardHeader>
              <div className="md:p-6">
                <p className="text-base font-medium">Smart Credit Card Matching</p>
                <p className="text-muted-foreground mt-3 max-w-sm text-sm">
                  AI-powered credit card recommendations tailored to your spending habits, credit
                  score, and financial objectives.
                </p>
              </div>
            </CardHeader>

            <div className="relative h-fit mask-b-from-75% mask-b-to-95% pl-6 md:pl-12">
              <div className="bg-background overflow-hidden rounded-tl-lg border-t border-l pt-2 pl-2 dark:bg-zinc-950">
                <img
                  src="/smart-cc-recommendation.png"
                  alt="smart cc recommendation"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Card>

          <Card className="group overflow-hidden shadow-zinc-950/5 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl">
            <p className="mx-auto my-6 max-w-md px-6 text-center text-lg font-semibold text-balance sm:text-2xl md:p-6">
              Intelligent Expense Management
            </p>

            <CardContent className="mt-auto h-fit">
              <div className="relative mask-radial-[75%_75%] mask-radial-from-75% mask-radial-at-right max-sm:mb-6">
                <div className="aspect-76/59 overflow-hidden rounded-r-lg border">
                  <img
                    src="/intelligent-expense-management.png"
                    alt="intelligent expense management"
                    className="h-full w-full bg-left object-cover object-left"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group p-6 shadow-zinc-950/5 sm:col-span-2 sm:rounded-none md:p-12">
            <p className="mx-auto mb-12 max-w-md text-center text-lg font-semibold text-balance sm:text-2xl">
              Comprehensive Financial Calculators
            </p>

            <div className="relative flex justify-center gap-6">
              <div className="bg-primary pointer-events-none absolute top-1/2 left-1/2 z-0 flex size-20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-2xl"></div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="88px"
                height="88px"
                viewBox="0 0 18 18"
                className="z-40"
              >
                <path
                  d="M8.72449 13.3672L11.5247 16.1674C12.2082 16.8509 13.3166 16.8519 14 16.1667L16.1669 13.9997C16.8503 13.3164 16.851 12.2079 16.1663 11.5244L13.3668 8.72491L8.72449 13.3672Z"
                  fill="currentColor"
                  fill-opacity="0.4"
                  data-color="color-2"
                ></path>{" "}
                <path
                  d="M9.27611 4.63424L6.47493 1.83306C5.79155 1.14968 4.68346 1.14857 4 1.83334L1.83265 4.00071C1.14928 4.68408 1.14859 5.79259 1.83333 6.47605L4.63382 9.27654L9.27611 4.63424Z"
                  fill="currentColor"
                  fill-opacity="0.4"
                  data-color="color-2"
                ></path>{" "}
                <path
                  d="M10.959 15.6017L9.89832 14.541L11.4697 12.9697C11.7626 12.6768 12.2374 12.6768 12.5303 12.9697C12.8232 13.2626 12.8232 13.7374 12.5303 14.0303L10.959 15.6017Z"
                  fill="currentColor"
                ></path>{" "}
                <path
                  d="M3.45898 8.10169L2.39832 7.04103L3.96967 5.46967C4.26257 5.17678 4.73744 5.17678 5.03033 5.46967C5.32323 5.76256 5.32323 6.23744 5.03033 6.53033L3.45898 8.10169Z"
                  fill="currentColor"
                ></path>{" "}
                <path
                  d="M15.2127 6.87901L15.9034 6.18835C17.0331 5.05863 17.0335 3.22648 15.903 2.09734C14.7734 0.968018 12.9417 0.967592 11.8126 2.09775L11.122 2.78836L15.2127 6.87901Z"
                  fill="currentColor"
                  fill-opacity="0.4"
                  data-color="color-2"
                ></path>{" "}
                <path
                  d="M11.122 2.78836L3.2357 10.6747C2.88477 11.0256 2.6261 11.5499 2.43252 12.0386C2.22987 12.5501 2.06103 13.1224 1.92679 13.6473C1.79186 14.1749 1.68812 14.6696 1.6182 15.0316C1.58315 15.213 1.5564 15.362 1.53831 15.4664C1.52926 15.5186 1.52231 15.56 1.51761 15.5885C1.46252 15.838 1.53832 16.1007 1.72221 16.2828C1.90203 16.461 2.16552 16.5379 2.41287 16.4834C2.44132 16.4787 2.48241 16.4718 2.53462 16.4627C2.639 16.4446 2.78804 16.4179 2.96943 16.3828C3.33138 16.3129 3.82613 16.2092 4.35372 16.0742C4.87862 15.94 5.45088 15.7712 5.96243 15.5685C6.45109 15.3749 6.97543 15.1163 7.32636 14.7653L15.2127 6.87901L11.122 2.78836Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </Card>
          <Card className="group relative shadow-zinc-950/5 sm:col-span-3 sm:rounded-none">
            <CardHeader className="p-6 md:p-12">
              <p className="text-left text-base font-medium">AI Financial Advisor</p>
              <p className="text-muted-foreground mt-2 max-w-sm text-sm">
                24/7 AI-powered financial guidance, personalized advice, and real-time insights for
                smarter money decisions.
              </p>
            </CardHeader>
            <CardContent className="relative h-fit px-6 pb-6 md:px-12 md:pb-12">
              <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                <div className="aspect-square rounded-(--radius) border border-dashed"></div>
                <div className="bg-muted/50 flex aspect-square items-center justify-center rounded-(--radius) border p-4">
                  <img
                    className="m-auto size-8 invert dark:invert-0"
                    src="https://oxymor-ns.tailus.io/logos/linear.svg"
                    alt="Linear logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="aspect-square rounded-(--radius) border border-dashed"></div>
                <div className="bg-muted/50 flex aspect-square items-center justify-center rounded-(--radius) border p-4">
                  <img
                    className="m-auto size-8 invert dark:invert-0"
                    src="https://oxymor-ns.tailus.io/logos/netlify.svg"
                    alt="Netlify logo"
                    width="32"
                    height="32"
                  />
                </div>
                <div className="aspect-square rounded-(--radius) border border-dashed"></div>
                <div className="bg-muted/50 flex aspect-square items-center justify-center rounded-(--radius) border p-4">
                  <img
                    className="m-auto size-8 invert dark:invert-0"
                    src="https://oxymor-ns.tailus.io/logos/github.svg"
                    alt="github logo"
                    width="32"
                    height="32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative p-0 shadow-zinc-950/5 sm:col-span-5 sm:rounded-none sm:rounded-br-xl sm:rounded-bl-xl">
            <CardContent className="relative h-fit py-6 md:py-12">
              <div className="grid place-items-center items-center sm:grid-cols-5">
                <div className="relative mx-auto w-fit sm:col-span-2">
                  <div className="mx-auto my-2 flex w-fit justify-center gap-2">
                    <IntegrationCard>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 90 60"
                        aria-label="Kite logo trimmed"
                      >
                        <title>Kite logo trimmed</title>
                        <polygon fill="#f6461a" points="30 0 0 30 30 60 60 30 90 0 30 0" />
                        <polygon fill="#db342c" points="30 60 60 30 90 60 30 60" />
                      </svg>
                    </IntegrationCard>
                  </div>
                </div>
                <div className="mx-auto max-w-lg space-y-6 text-center sm:col-span-3 sm:mt-0 sm:text-left">
                  <h2 className="text-3xl font-semibold text-balance md:text-4xl">
                    Connect with Your Favorite Trading Platform
                  </h2>
                  <p className="text-muted-foreground">
                    Seamlessly integrate with Zerodha, Upstox, and other trading platforms to get
                    advanced stock analysis and portfolio insights.
                  </p>

                  <Button size="sm" onClick={() => loginWithGoogle()}>
                    Get Started
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
}) => {
  return (
    <div className={cn("relative flex size-60 rounded-xl", className)}>
      <div className="relative z-20 m-auto *:size-40">{children}</div>
    </div>
  );
};
