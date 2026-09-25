import React from "react";
import { useLocation } from "react-router-dom";
import CreditCardStepper from "./credit-card/credit-card-stepper";
import LayoutHeader from "./layout-header";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Layout = (props: Props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const step = searchParams.get("step");

  return (
    <main className="mx-auto min-h-svh w-full">
      <div className="bg-input/40 flex min-h-svh flex-col">
        <section className="m-1.5 flex-1 rounded-xl md:m-2">
          <div className="bg-background relative flex h-[calc(100vh-1rem)] w-full flex-col rounded-xl border shadow-sm">
          {step ? (
              <div className="px-6 py-4">
                <CreditCardStepper />
              </div>
            ) : (
              <LayoutHeader />
            )}

            <div className="mx-auto w-full max-w-7xl overflow-y-auto p-4 md:p-6">
              {props.children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
