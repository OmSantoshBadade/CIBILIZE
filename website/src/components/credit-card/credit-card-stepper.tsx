// import { Stepper, StepperItem, StepperSeparator, StepperTitle } from "@/components/ui/stepper";
// import { cn } from "@/lib/utils";
// import { Check } from "lucide-react";
// import { useLocation } from "react-router-dom";

// // Simple array approach for steps
// const STEPS = [
//   { id: "personal", title: "Personal Information" },
//   { id: "spending", title: "Spending Habits" },
//   { id: "benefits", title: "Benefit Preferences" },
//   { id: "lifestyle", title: "Lifestyle & Travel" },
//   { id: "fees", title: "Fee Preferences" },
// ];

// // Map individual step (0-24) to main step (0-4)
// const getMainStep = (individualStep: number): number => {
//   if (individualStep >= 0 && individualStep <= 4) return 0;
//   if (individualStep >= 5 && individualStep <= 9) return 1;
//   if (individualStep >= 10 && individualStep <= 13) return 2;
//   if (individualStep >= 14 && individualStep <= 20) return 3;
//   if (individualStep >= 21 && individualStep <= 24) return 4;
//   return 0;
// };

// // Get completed steps based on current step
// const getCompletedSteps = (currentStep: number): number[] => {
//   const completed: number[] = [];
//   if (currentStep > 4) completed.push(0);
//   if (currentStep > 9) completed.push(1);
//   if (currentStep > 13) completed.push(2);
//   if (currentStep > 20) completed.push(3);
//   return completed;
// };

// export const CreditCardStepper = ({ className }: { className?: string }) => {
//   const param = useLocation().search.split("step=")[1];
//   const currentStep = parseInt(param || "0");

//   // Calculate main step and completed steps
//   const mainStepIndex = getMainStep(currentStep);
//   const effectiveCompletedSteps = getCompletedSteps(currentStep);
//   const displaySteps = STEPS;

//   return (
//     <div className={cn("mx-auto w-full  flex items-center justify-center", className)}>
//       <Stepper value={mainStepIndex} orientation="horizontal" className="w-full flex items-center justify-center">
//         {displaySteps.map((step, index) => {
//           const isCompleted = effectiveCompletedSteps.includes(index);
//           const isCurrent = mainStepIndex === index;
//           const isUpcoming = index > mainStepIndex;

//           return (
//             <div key={step.id} className="flex items-center justify-center gap-2 flex-1 min-w-0">
//               <StepperItem step={index} completed={isCompleted} className="flex-1 min-w-0">
//                 <div className="flex items-center w-full gap-2 min-w-0">
//                   <div
//                     className={cn(
//                       "flex aspect-square size-8 items-center justify-center rounded-full flex-shrink-0",
//                       isCurrent && "bg-background text-primary",
//                       isCompleted && "bg-background text-primary",
//                       isUpcoming && "bg-primary text-background",
//                     )}
//                   >
//                     {isCompleted ? (
//                       <Check className="size-4" />
//                     ) : isCurrent ? (
//                       <span>{index + 1}</span>
//                     ) : (
//                       <span>{index + 1}</span>
//                     )}
//                   </div>
//                   <StepperTitle className={cn("text-sm font-medium whitespace-nowrap overflow-visible flex-shrink-0")}>
//                     {step.title || `Step ${index + 1}`}
//                   </StepperTitle>
//                 </div>
//               </StepperItem>
//               {index < displaySteps.length - 1 && (
//                 <StepperSeparator
//                   className={cn(
//                     "mx-2 h-0.5 flex-1",
//                     isCompleted && "bg-primary",
//                     isUpcoming && "bg-muted-foreground",
//                   )}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </Stepper>
//     </div>
//   );
// };

import {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";

const STEPS = [
  { id: "personal", title: "Personal Information" },
  { id: "spending", title: "Spending Habits" },
  { id: "benefits", title: "Benefit Preferences" },
  { id: "lifestyle", title: "Lifestyle & Travel" },
  { id: "fees", title: "Fee Preferences" },
];

const getMainStep = (individualStep: number): number => {
  if (individualStep >= 0 && individualStep <= 4) return 0;
  if (individualStep >= 5 && individualStep <= 9) return 1;
  if (individualStep >= 10 && individualStep <= 13) return 2;
  if (individualStep >= 14 && individualStep <= 20) return 3;
  if (individualStep >= 21 && individualStep <= 24) return 4;
  return 0;
};

const getCompletedSteps = (currentStep: number): number[] => {
  const completed: number[] = [];
  if (currentStep > 4) completed.push(0);
  if (currentStep > 9) completed.push(1);
  if (currentStep > 13) completed.push(2);
  if (currentStep > 20) completed.push(3);
  return completed;
};

const CreditCardStepper = () => {
  const param = useLocation().search.split("step=")[1];
  const currentStep = parseInt(param || "0");

  // Calculate main step and completed steps
  const mainStepIndex = getMainStep(currentStep);
  const effectiveCompletedSteps = getCompletedSteps(currentStep);
  const displaySteps = STEPS;

  return (
    <div className="mx-auto max-w-7xl space-y-8 text-center">
      <Stepper defaultValue={2}>
        {displaySteps.map(({ id, title }, index) => {
          const isCompleted = effectiveCompletedSteps.includes(index);
          const isCurrent = mainStepIndex === index;
          const isUpcoming = index > mainStepIndex;
          return (
            <StepperItem
              key={id}
              step={parseInt(id)}
              className="not-last:flex-1 max-md:items-start"
            >
              <StepperTrigger className="rounded max-md:flex-col">
                <div
                  className={cn(
                    "flex aspect-square size-6 flex-shrink-0 items-center justify-center rounded-full",
                    isCurrent && "bg-primary text-background",
                    isCompleted && "bg-primary text-background",
                    isUpcoming && "bg-background text-primary",
                  )}
                >
                  {isCompleted ? (
                    <Check className="size-4" />
                  ) : isCurrent ? (
                    <span>{index + 1}</span>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </StepperTrigger>
              {STEPS.indexOf({ id, title }) < STEPS.length - 1 && (
                <StepperSeparator className="bg-primary group-data-[orientation=horizontal]/stepper:h-[1px] max-md:mt-3.5 md:mx-4" />
              )}
            </StepperItem>
          );
        })}
      </Stepper>
    </div>
  );
};

export default CreditCardStepper;
