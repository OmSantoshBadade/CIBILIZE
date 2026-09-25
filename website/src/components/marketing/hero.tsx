// import { ArrowRight, Shield, TrendingUp, Upload } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../provider/auth-provider";
// import { HeroHeader } from "../header";
// import { Button } from "../ui/button";
// import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

// export function Hero() {
//   const { isAuthenticated, loginWithGoogle } = useAuth();

//   return (
//     <div className="min-h-screen w-full">
//       <HeroHeader />

//       <main className="px-4 pt-20">
//         <div className="mx-auto max-w-3xl space-y-8 text-center">
//           <div className="space-y-4">
//             <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
//               Master Your <span className="text-primary">Financial Future</span>
//             </h1>
//             <p className="text-muted-foreground mx-auto max-w-xl">
//               Track expenses, predict credit scores, and get personalized financial insights with
//               our AI-powered platform.
//             </p>
//           </div>

//           <div className="flex justify-center gap-3">
//             {isAuthenticated ? (
//               <Link to="/app">
//                 <Button className="gap-2">
//                   Go to Dashboard
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               </Link>
//             ) : (
//               <Button onClick={() => loginWithGoogle()} className="gap-2">
//                 Get Started
//                 <ArrowRight className="h-4 w-4" />
//               </Button>
//             )}
//           </div>

//           <div className="mt-12 grid gap-4 md:grid-cols-3">
//             <Card>
//               <CardHeader className="text-center">
//                 <TrendingUp className="text-primary mx-auto h-8 w-8" />
//                 <CardTitle className="text-lg">Expense Tracking</CardTitle>
//                 <CardDescription>
//                   Automatically categorize and track your expenses with AI analysis
//                 </CardDescription>
//               </CardHeader>
//             </Card>

//             <Card>
//               <CardHeader className="text-center">
//                 <Shield className="text-primary mx-auto h-8 w-8" />
//                 <CardTitle className="text-lg">Credit Score Prediction</CardTitle>
//                 <CardDescription>
//                   Get accurate credit score predictions based on your financial behavior
//                 </CardDescription>
//               </CardHeader>
//             </Card>

//             <Card>
//               <CardHeader className="text-center">
//                 <Upload className="text-primary mx-auto h-8 w-8" />
//                 <CardTitle className="text-lg">Bank Statement Upload</CardTitle>
//                 <CardDescription>
//                   Upload PDF bank statements and let AI extract expense data
//                 </CardDescription>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { HeroHeader } from "@/components/hero-header";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { useAuth } from "@/provider/auth-provider";
import { Mail, SendHorizonal } from "lucide-react";
import FAQsFour from "../faqs-4";
import Features from "../features-11";
import Footer from "../footer";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

function Hero() {
  const { loginWithGoogle } = useAuth();

  return (
    <>
      <HeroHeader />

      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 lg:pt-48">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-5xl font-medium text-balance md:text-6xl"
              >
                Smarter Finance Starts Here
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-6 max-w-2xl text-lg text-pretty"
              >
                Get smart credit card picks, AI insights, and tools to grow your finances
                confidently.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12"
              >
                <div className="mx-auto max-w-sm">
                  <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                    <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

                    <input
                      placeholder="Your mail address"
                      className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                      type="email"
                    />

                    <div className="md:pr-1.5 lg:pr-0">
                      <Button
                        aria-label="submit"
                        size="sm"
                        className="rounded-(--radius)"
                        onClick={() => loginWithGoogle()}
                      >
                        <span className="hidden md:block">Get Started</span>
                        <SendHorizonal
                          className="relative mx-auto size-5 md:hidden"
                          strokeWidth={2}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="from-primary/50 dark:from-primary/25 relative mx-auto mt-32 max-w-2xl bg-radial to-transparent to-55% text-left"
                >
                  <div className="bg-background border-border/50 absolute inset-0 mx-auto w-80 -translate-x-3 -translate-y-12 rounded-[2rem] border [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] p-2 sm:-translate-x-6">
                    <div className="relative h-96 overflow-hidden rounded-[1.5rem] border p-2 pb-12 before:absolute before:inset-0 before:bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)] before:opacity-50"></div>
                  </div>
                  <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)] p-2 backdrop-blur-3xl sm:translate-x-8">
                    <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                      <AppComponent />

                      <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] [background-size:16px_16px] mix-blend-overlay dark:opacity-5"></div>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
        {/* <LogoCloud /> */}
      </main>

      <Features />

      <FAQsFour />

      <Footer />
    </>
  );
}

const AppComponent = () => {
  return (
    <div className="relative space-y-3 rounded-[1rem] bg-white/5 p-4">
      <div className="flex items-center gap-1.5 text-green-400">
        <svg
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
        <div className="text-sm font-medium">Credit Score</div>
      </div>
      <div className="space-y-3">
        <div className="text-foreground border-b border-white/10 pb-3 text-sm font-medium">
          Your credit score has improved significantly this year.
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="space-x-1">
              <span className="text-foreground align-baseline text-xl font-medium">785</span>
              <span className="text-muted-foreground text-xs">Current Score</span>
            </div>
            <div className="flex h-5 items-center rounded bg-gradient-to-l from-emerald-400 to-indigo-600 px-2 text-xs text-white">
              2024
            </div>
          </div>
          <div className="space-y-1">
            <div className="space-x-1">
              <span className="text-foreground align-baseline text-xl font-medium">720</span>
              <span className="text-muted-foreground text-xs">Previous Score</span>
            </div>
            <div className="text-foreground bg-muted flex h-5 w-2/3 items-center rounded px-2 text-xs dark:bg-white/20">
              2023
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero };
