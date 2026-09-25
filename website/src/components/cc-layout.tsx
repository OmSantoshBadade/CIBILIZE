import React from "react";
import { useLocation } from "react-router-dom";
import CreditCardStepper from "./credit-card/credit-card-stepper";

type Props = {
  children: React.ReactNode;
};

const CCLayout = ({ children }: Props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const step = searchParams.get("step");

  return (
    <main className="mx-auto min-h-svh w-full">
      <div className="bg-input/40 flex h-screen flex-col">
        <section className="m-1.5 flex-1 overflow-hidden rounded-xl md:m-2">
          <div className="bg-background relative flex h-full w-full flex-col overflow-y-auto rounded-xl border shadow-sm">
            {/* <LayoutHeader /> */}
            {step && (
              <div className="px-6 py-4">
                <CreditCardStepper />
              </div>
            )}
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CCLayout;
