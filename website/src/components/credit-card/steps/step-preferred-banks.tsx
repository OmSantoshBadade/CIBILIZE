import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { ChevronDown } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { RecommendationFormData } from "../recommendation-form-schema";

interface StepPreferredBanksProps {
  form: UseFormReturn<RecommendationFormData>;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isSubmitting?: boolean;
  isFinalStep?: boolean;
}

type BankValue =
  | "no_preference"
  | "amex"
  | "au"
  | "csb"
  | "federal"
  | "citibank"
  | "indian"
  | "rbl"
  | "indusind"
  | "sbi"
  | "sbm"
  | "kotak"
  | "axis"
  | "dbs"
  | "sc"
  | "south_indian"
  | "yes_bank"
  | "utkarsh"
  | "bob"
  | "hdfc"
  | "hsbc"
  | "equitas"
  | "idfc"
  | "canara"
  | "icici"
  | "idbi"
  | "pnb";

export const StepPreferredBanks = ({ form }: StepPreferredBanksProps) => {
  const watchedBanks = form.watch("feePreference.preferredBanks") || [];

  // const bankOptions = [
  //   // 🔹 Popular Private Sector Banks
  //   { value: "hdfc", label: "HDFC Bank", popular: true },
  //   { value: "icici", label: "ICICI Bank", popular: true },
  //   { value: "axis", label: "Axis Bank", popular: true },
  //   { value: "kotak", label: "Kotak Mahindra Bank", popular: true },
  //   { value: "indusind", label: "IndusInd Bank", popular: false },
  //   { value: "yes_bank", label: "Yes Bank", popular: false },
  //   { value: "idfc_first", label: "IDFC FIRST Bank", popular: false },
  //   { value: "federal", label: "Federal Bank", popular: false },
  //   { value: "south_indian", label: "South Indian Bank", popular: false },
  //   { value: "rbl", label: "RBL Bank", popular: false },
  //   { value: "karur_vysya", label: "Karur Vysya Bank", popular: false },
  //   { value: "dcb", label: "DCB Bank", popular: false },
  //   { value: "city_union", label: "City Union Bank", popular: false },
  //   { value: "tmb", label: "Tamilnad Mercantile Bank", popular: false },
  //   { value: "nainital", label: "Nainital Bank", popular: false },

  //   // 🔹 Public Sector (Government) Banks
  //   { value: "sbi", label: "State Bank of India", popular: true },
  //   { value: "pnb", label: "Punjab National Bank", popular: true },
  //   { value: "boi", label: "Bank of India", popular: false },
  //   { value: "bob", label: "Bank of Baroda", popular: false },
  //   { value: "canara", label: "Canara Bank", popular: false },
  //   { value: "uco", label: "UCO Bank", popular: false },
  //   { value: "indian_bank", label: "Indian Bank", popular: false },
  //   { value: "indian_overseas", label: "Indian Overseas Bank", popular: false },
  //   { value: "union_bank", label: "Union Bank of India", popular: false },
  //   { value: "central_bank", label: "Central Bank of India", popular: false },
  //   { value: "bank_of_maharashtra", label: "Bank of Maharashtra", popular: false },
  //   { value: "punjab_sind", label: "Punjab & Sind Bank", popular: false },

  //   // 🔹 Foreign Banks (Operating in India)
  //   { value: "hsbc", label: "HSBC Bank", popular: false },
  //   { value: "standard_chartered", label: "Standard Chartered Bank", popular: false },
  //   { value: "citi", label: "Citibank", popular: false },
  //   { value: "dbs", label: "DBS Bank", popular: false },
  //   { value: "deutsche", label: "Deutsche Bank", popular: false },
  //   { value: "barclays", label: "Barclays Bank", popular: false },
  //   { value: "bnpp", label: "BNP Paribas", popular: false },
  //   { value: "american_express", label: "American Express", popular: false },

  //   // 🔹 Small Finance Banks
  //   { value: "au_small_finance", label: "AU Small Finance Bank", popular: false },
  //   { value: "ujjivan", label: "Ujjivan Small Finance Bank", popular: false },
  //   { value: "equitas", label: "Equitas Small Finance Bank", popular: false },
  //   { value: "janalakshmi", label: "Jana Small Finance Bank", popular: false },
  //   { value: "suryoday", label: "Suryoday Small Finance Bank", popular: false },
  //   { value: "capital_small", label: "Capital Small Finance Bank", popular: false },
  //   { value: "esaf", label: "ESAF Small Finance Bank", popular: false },
  //   { value: "north_east_small", label: "North East Small Finance Bank", popular: false },
  //   { value: "fincare", label: "Fincare Small Finance Bank", popular: false },
  //   { value: "unity", label: "Unity Small Finance Bank", popular: false },

  //   // 🔹 Payments Banks
  //   { value: "airtel_payments", label: "Airtel Payments Bank", popular: false },
  //   { value: "paytm_payments", label: "Paytm Payments Bank", popular: false },
  //   { value: "india_post", label: "India Post Payments Bank", popular: false },
  //   { value: "fino", label: "Fino Payments Bank", popular: false },
  //   { value: "nsdl_payments", label: "NSDL Payments Bank", popular: false },

  //   // 🔹 Others
  //   { value: "no_preference", label: "No Preference", popular: true },
  // ];

  const BANK_OPTIONS = React.useMemo(
    () => [
      {
        value: "amex",
        label: "Amex",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/AMEX.png",
      },
      {
        value: "au",
        label: "AU",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/AU.png",
      },
      {
        value: "csb",
        label: "CSB",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/CSB.png",
      },
      {
        value: "federal",
        label: "Federal",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/FEDERAL.png",
      },
      {
        value: "citibank",
        label: "Citibank",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/CITI.png",
      },
      {
        value: "indian",
        label: "Indian",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/INDIAN.png",
      },
      {
        value: "rbl",
        label: "RBL",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/RBL.png",
      },
      {
        value: "indusind",
        label: "IndusInd",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/INDUSIND.png",
      },
      {
        value: "sbi",
        label: "SBI",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SBI.png",
      },
      {
        value: "sbm",
        label: "SBM",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SBM.png",
      },
      {
        value: "kotak",
        label: "Kotak",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/KOTAK.png",
      },
      {
        value: "axis",
        label: "Axis",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/AXIS.png",
      },
      {
        value: "dbs",
        label: "DBS",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/DBS+(2).png",
      },
      {
        value: "sc",
        label: "SC",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SCB.png",
      },
      {
        value: "south_indian",
        label: "South Indian",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SOUTH+INDIAN.png",
      },
      {
        value: "yes_bank",
        label: "Yes Bank",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/YES+BANK.png",
      },
      {
        value: "utkarsh",
        label: "Utkarsh",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/utkarsh.png",
      },
      {
        value: "bob",
        label: "BOB",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/BOB.png",
      },
      {
        value: "hdfc",
        label: "HDFC",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/HDFC.png",
      },
      {
        value: "hsbc",
        label: "HSBC",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/HSBC.png",
      },
      {
        value: "equitas",
        label: "Equitas",
        icon: "https://d2skafu249b3x9.cloudfront.net/bankLogo2/Equitas.png",
      },
      {
        value: "idfc",
        label: "IDFC",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/IDFC.png",
      },
      {
        value: "canara",
        label: "Canara",
        icon: "https://d2skafu249b3x9.cloudfront.net/bankLogoWebsite3/Canara.png",
      },
      {
        value: "icici",
        label: "ICICI",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/ICICI.png",
      },
      {
        value: "idbi",
        label: "IDBI",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/IDBI.png",
      },
      {
        value: "pnb",
        label: "PNB",
        icon: "https://d2skafu249b3x9.cloudfront.net/bankLogo2/PNB.png",
      },
    ],
    [],
  );

  const toggleBank = (bank: string) => {
    if (bank === "no_preference") {
      form.setValue("feePreference.preferredBanks", ["no_preference"]);
      return;
    }

    const currentBanks = watchedBanks.filter((b) => b !== "no_preference");

    const newBanks = currentBanks.includes(bank as any)
      ? currentBanks.filter((b) => b !== bank)
      : [...currentBanks, bank as BankValue];
    form.setValue("feePreference.preferredBanks", newBanks);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <div className="flex items-center justify-between">
        <Typography.Heading variant="2xl" className="font-semibold">
          24. Do you have any bank preferences?
        </Typography.Heading>
      </div>

      <FormField
        control={form.control}
        name="feePreference.preferredBanks"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="space-y-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-96 justify-between">
                      {watchedBanks.length > 0
                        ? `Add more banks (${watchedBanks.length} selected)`
                        : "Select your preferred banks"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 w-full overflow-y-auto">
                    {BANK_OPTIONS.map((bank) => {
                      const isSelected = watchedBanks.includes(bank.value as BankValue);
                      const hasNoPreference = watchedBanks.includes("no_preference");
                      const isNoPreference = bank.value === "no_preference";

                      return (
                        <DropdownMenuCheckboxItem
                          key={bank.value}
                          checked={isSelected}
                          onCheckedChange={() => toggleBank(bank.value)}
                          disabled={!isNoPreference && hasNoPreference}
                        >
                          {bank?.icon && (
                            <img src={bank.icon} alt={bank.label} className="h-4 w-4" />
                          )}
                          {bank.label}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {watchedBanks.length > 0 && (
                  <div className="space-y-2">
                    <Typography.SubHeading variant="sm" className="text-muted-foreground">
                      Selected banks ({watchedBanks.length}):
                    </Typography.SubHeading>
                    <div className="flex flex-wrap gap-2">
                      {watchedBanks.map((bankValue) => {
                        const bank = BANK_OPTIONS.find((b) => b.value === bankValue);
                        return (
                          <Button
                            key={bankValue}
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => toggleBank(bankValue)}
                          >
                            {bank?.icon && (
                              <img src={bank.icon} alt={bank.label} className="h-4 w-4" />
                            )}
                            {bank?.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
