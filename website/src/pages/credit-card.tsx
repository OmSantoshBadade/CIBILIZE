import CreditCardInfoAlertContent from "@/components/credit-card-info-alert-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import BaseEmptyState from "@/components/ui/base-empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/disclosure";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { SpecialCard, SpecialCardContent } from "@/components/ui/special-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { CREDIT_CARDS, CreditCardTypes } from "@/lib/CREDIT_DATA";
import { Chat, Dollar } from "@mynaui/icons-react";
import {
  BadgePercent,
  Check,
  CreditCard,
  Diamond,
  Droplets,
  FileText,
  Film,
  Fuel as FuelIcon,
  Gem,
  Gift,
  Globe2,
  Handshake,
  Heart,
  Hotel,
  Infinity,
  Layers,
  PartyPopper,
  Plane,
  Plug,
  Plug2,
  QrCode,
  ReceiptText,
  Repeat,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sofa,
  Sparkles,
  Star,
  Train,
  Umbrella,
  Utensils,
  UtensilsCrossed,
  Vegan,
  Wallet,
} from "lucide-react";
import * as React from "react";
import { FaGolfBall } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const CreditCardPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);

  const BANKS = React.useMemo(
    () => [
      { name: "Amex", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/AMEX.png" },
      { name: "AU", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/AU.png" },
      { name: "CSB", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/CSB.png" },
      { name: "Federal", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/FEDERAL.png" },
      { name: "Citibank", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/CITI.png" },
      { name: "Indian", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/INDIAN.png" },
      { name: "RBL", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/RBL.png" },
      { name: "IndusInd", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/INDUSIND.png" },
      { name: "SBI", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SBI.png" },
      { name: "SBM", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SBM.png" },
      { name: "Kotak", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/KOTAK.png" },
      { name: "Axis", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/AXIS.png" },
      { name: "DBS", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/DBS+(2).png" },
      { name: "SC", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SCB.png" },
      {
        name: "South Indian",
        icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/SOUTH+INDIAN.png",
      },
      { name: "Yes Bank", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/YES+BANK.png" },
      { name: "Utkarsh", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/utkarsh.png" },
      { name: "BOB", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/BOB.png" },
      { name: "HDFC", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/HDFC.png" },
      { name: "HSBC", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/HSBC.png" },
      { name: "Equitas", icon: "https://d2skafu249b3x9.cloudfront.net/bankLogo2/Equitas.png" },
      { name: "IDFC", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/IDFC.png" },
      { name: "Canara", icon: "https://d2skafu249b3x9.cloudfront.net/bankLogoWebsite3/Canara.png" },
      { name: "ICICI", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/ICICI.png" },
      { name: "IDBI", icon: "https://d2skafu249b3x9.cloudfront.net/bank_square/IDBI.png" },
      { name: "PNB", icon: "https://d2skafu249b3x9.cloudfront.net/bankLogo2/PNB.png" },
    ],
    [],
  );

  const EXTRA_CATEGORIES = React.useMemo(
    () => [
      {
        name: "Flights",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/aeroplane.png",
      },
      {
        name: "Hotels",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/hotel.png",
      },
      {
        name: "CashBack",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/cash.png",
      },
      {
        name: "Brand Voucher",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/voucher.png",
      },
      {
        name: "Fuel",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/fuel.png",
      },
      {
        name: "Catalogue Products",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/products.png",
      },
      {
        name: "Travel Bookings",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/travel.png",
      },
      {
        name: "Brand Wallet",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/brand+wallet.png",
      },
      {
        name: "Experience",
        icon: "https://d2skafu249b3x9.cloudfront.net/Credit-card-categories/experience.png",
      },
    ],
    [],
  );

  // Mapping of all known feature/oneLiner categories to icons (show all properly)
  const CATEGORY_LUCIDE_ICON: Record<string, React.ReactNode> = {
    // Travel & Transport
    Travel: <Plane className="size-5" />,
    Flights: <Plane className="size-5" />,
    "Travel Bookings": <Plane className="size-5" />,
    "Railway Booking Rewards": <Train className="size-5" />,
    "Zero Forex Fee": <Globe2 className="size-5" />,
    "Forex Benefit": <Globe2 className="size-5" />,
    "Low Forex Fee": <Globe2 className="size-5" />,
    "International Use": <Globe2 className="size-5" />,

    // Lodging
    Hotels: <Hotel className="size-5" />,
    "Hotel Stays": <Hotel className="size-5" />,

    // Shopping & Rewards & Vouchers
    Shopping: <ShoppingBag className="size-5" />,
    "Online Shopping": <ShoppingCart className="size-5" />,
    "Brand Voucher": <Gift className="size-5" />,
    "Catalogue Products": <ShoppingBag className="size-5" />,
    "Brand Wallet": <Wallet className="size-5" />,
    "Co-branded": <Handshake className="size-5" />,

    // Cashback
    Cashback: <BadgePercent className="size-5" />,
    CashBack: <BadgePercent className="size-5" />,

    // Dining
    Dining: <Utensils className="size-5" />,
    "Weekend Dining": <UtensilsCrossed className="size-5" />,

    // Movies & Entertainment
    Movies: <Film className="size-5" />,
    Entertainment: <Gift className="size-5" />,

    // Rewards
    Rewards: <Gift className="size-5" />,
    Experience: <Sparkles className="size-5" />,

    // UPI
    UPI: <QrCode className="size-5" />,

    // Fuel
    Fuel: <FuelIcon className="size-5" />,
    "Fuel Waiver": <Droplets className="size-5" />,

    // Utilities & Bill Payments
    Utilities: <Plug className="size-5" />,
    "Bill Payments": <ReceiptText className="size-5" />,
    "Utility Rewards": <Plug2 className="size-5" />,

    // Lounge access
    "Lounge Access": <Sofa className="size-5" />,
    "Airport Lounge": <Sofa className="size-5" />,
    "Domestic Lounge Access": <Sofa className="size-5" />,

    // Milestone
    "Milestone Bonus": <Star className="size-5" />,
    "Milestone Bonuses": <Star className="size-5" />,

    // Welcome Benefits
    "Welcome Benefits": <PartyPopper className="size-5" />,

    // Golf
    Golf: <FaGolfBall className="size-5" />,
    "Golf Benefits": <FaGolfBall className="size-5" />,

    // Lifestyle
    Lifestyle: <Vegan className="size-5" />,
    "Premium Lifestyle": <Vegan className="size-5" />,

    // Premium
    Premium: <Gem className="size-5" />,

    // Luxury
    Luxury: <Diamond className="size-5" />,

    // Insurance
    Insurance: <Umbrella className="size-5" />,

    // EMI
    "EMI Service": <Repeat className="size-5" />,
    "EMI Conversion": <Repeat className="size-5" />,

    // Fees
    "Annual Fee": <Dollar className="size-5" />,
    "Low Fee": <Dollar className="size-5" />,

    // Statement
    "Statement Credit": <FileText className="size-5" />,
    "Statement Credit Redemption": <FileText className="size-5" />,

    // Everyday, base, entry, basic
    "Everyday Spends": <Layers className="size-5" />,
    "Entry-Level": <Layers className="size-5" />,
    "Lifetime Free": <Infinity className="size-5" />,

    // Women/health/complimentary
    "Complimentary Subscriptions": <Gift className="size-5" />,
    "Women Health Benefits": <Heart className="size-5" />,
    "Women Health": <Heart className="size-5" />,

    // FASTag
    "FASTag Cashback": <CreditCard className="size-5" />,

    // Misc
  };

  // Aliases for category mapping (esp. for badges & icons, e.g. synonyms, etc)
  const CATEGORY_ALIASES: Record<string, string[]> = {
    // group aliases for icon display etc
    Flights: ["Travel"],
    Hotels: ["Travel"],
    "Hotel Stays": ["Hotels", "Travel"],
    "Travel Bookings": ["Travel"],
    CashBack: ["Cashback"],
    Cashback: ["Cashback"],
    Fuel: ["Fuel"],
    "Fuel Waiver": ["Fuel"],
    "Catalogue Products": ["Shopping", "Rewards"],
    "Brand Voucher": ["Rewards", "Shopping"],
    "Brand Wallet": ["Online Shopping", "Shopping"],
    Experience: ["Movies", "Dining"],
    "Everyday Spends": ["Rewards"],
    "Milestone Bonuses": ["Milestone Bonus"],
    "Zero Forex Fee": ["Forex Benefit"],
    "Low Forex Fee": ["Forex Benefit"],
    "International Use": ["Travel"],
    "Premium Lifestyle": ["Premium", "Lifestyle"],
    "Complimentary Subscriptions": ["Rewards"],
    "Women Health Benefits": ["Lifestyle", "Health"],
    "EMI Service": ["EMI Conversion"],
    "UPI enabled": ["UPI"],
    "Lifetime Free": ["Basic", "Entry-Level"],
    "Entry-Level": ["Basic"],
    "Bill Payments": ["Utilities"],
    XpressCash: ["Cashback"],
    "Weekend Dining": ["Dining"],
    "Golf Benefits": ["Golf"],
    "Airport Lounge": ["Lounge Access"],
    "Domestic Lounge Access": ["Lounge Access"],
    "Statement Credit Redemption": ["Statement Credit"],
    "FASTag Cashback": ["Cashback"],
    Movie: ["Movies", "Entertainment"],
    "Low Fee": ["Annual Fee"],
    CoBranded: ["Co-branded"],
  };

  const selectedBanks = React.useMemo(() => {
    const bankParam = searchParams.get("bank");
    if (!bankParam) return [] as string[];
    return bankParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [searchParams]);

  const selectedCategories = React.useMemo(() => {
    const catParam = searchParams.get("categories");
    if (!catParam) return [] as string[];
    return catParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [searchParams]);

  const extractBank = React.useCallback((name: string): string | null => {
    const lower = name.toLowerCase();
    if (lower.includes("american express") || lower.includes("amex")) return "Amex";
    if (lower.includes("hdfc")) return "HDFC";
    if (lower.includes("icici")) return "ICICI";
    if (lower.includes("axis")) return "Axis";
    if (lower.includes("sbi")) return "SBI";
    if (lower.includes("kotak")) return "Kotak";
    if (lower.includes("indusind")) return "IndusInd";
    if (lower.includes("idfc")) return "IDFC";
    if (lower.includes("yes bank")) return "Yes Bank";
    if (lower.includes("au")) return "AU";
    if (lower.includes("hsbc")) return "HSBC";
    if (lower.includes("rbl")) return "RBL";
    if (lower.includes("standard chartered") || lower.includes("scb")) return "SC";
    if (lower.includes("citibank") || lower.includes("citi")) return "Citibank";
    if (lower.includes("canara")) return "Canara";
    if (lower.includes("idbi")) return "IDBI";
    if (lower.includes("punjab national") || lower.includes("pnb")) return "PNB";
    if (lower.includes("federal")) return "Federal";
    if (lower.includes("south indian")) return "South Indian";
    if (lower.includes("dbs")) return "DBS";
    if (lower.includes("utkarsh")) return "Utkarsh";
    if (lower.includes("equitas")) return "Equitas";
    if (lower.includes("csb")) return "CSB";
    if (lower.includes("bank of baroda") || lower.includes("bob")) return "BOB";
    if (lower.includes("indian bank")) return "Indian";
    return null;
  }, []);

  const allBanks = React.useMemo(() => BANKS.map((b) => b.name), [BANKS]);

  const getCategoriesForCard = (card: CreditCardTypes) => {
    const featureCats = card.features.categories;
    return featureCats || [];
  };

  const allCategories = React.useMemo(() => {
    const normalizedToDisplay = new Map<string, string>();
    for (const extra of EXTRA_CATEGORIES) {
      const key = extra.name.trim().toLowerCase();
      if (!normalizedToDisplay.has(key)) normalizedToDisplay.set(key, extra.name);
    }

    // Add dataset categories if not already represented (case-insensitive)
    CREDIT_CARDS.forEach((card) => {
      getCategoriesForCard(card).forEach((cat) => {
        const key = cat.trim().toLowerCase();
        if (!normalizedToDisplay.has(key)) normalizedToDisplay.set(key, cat.trim());
      });
    });

    return Array.from(normalizedToDisplay.values()).sort();
  }, [EXTRA_CATEGORIES]);

  const categoryMatches = (selected: string[], cardCats: string[]) => {
    if (selected.length === 0) return true;
    const cardSet = new Set(cardCats);
    return selected.some((sel) => {
      if (cardSet.has(sel)) return true;
      const aliases = CATEGORY_ALIASES[sel] || [];
      return aliases.some((al) => cardSet.has(al));
    });
  };

  const [visibleCards, setVisibleCards] = React.useState<CreditCardTypes[]>(CREDIT_CARDS);

  React.useEffect(() => {
    const next = CREDIT_CARDS.filter((card) => {
      const bank = extractBank(card.name) || extractBank((card as any)?.program || "");
      const cats = getCategoriesForCard(card);
      const bankOk = selectedBanks.length === 0 || (bank ? selectedBanks.includes(bank) : false);
      const catsOk = categoryMatches(selectedCategories, cats);
      return bankOk && catsOk;
    });
    setVisibleCards(next);
  }, [selectedBanks, selectedCategories, extractBank, CREDIT_CARDS]);

  const toggleParamValue = (key: string, value: string) => {
    const current = new Set(
      (searchParams.get(key) || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
    if (current.has(value)) current.delete(value);
    else current.add(value);
    const next = Array.from(current).join(",");
    const sp = new URLSearchParams(searchParams.toString());
    if (next) sp.set(key, next);
    else sp.delete(key);
    setSearchParams(sp, { replace: true });
  };

  const getCategoryIconNode = (name: string) => {
    const extra = EXTRA_CATEGORIES.find((c) => c.name === name);
    if (extra?.icon) {
      return (
        <img src={extra.icon} alt={name} className="aspect-square size-6 rounded object-contain" />
      );
    }
    return CATEGORY_LUCIDE_ICON[name] || <Sparkles className="size-6" />;
  };

  // console.log(
  //   CREDIT_CARDS.map((card) => {
  //     return {
  //       categories: getCategoriesForCard(card),
  //       oneLiner: card.features.creditCardOneLinerDescription.split(","),
  //     };
  //   }),
  // );

  return (
    <section>
      <div className="relative w-full space-y-6">
        <div className="col-span-12 flex w-full items-center justify-between md:hidden">
          <Drawer open={openFilterDrawer} onOpenChange={setOpenFilterDrawer}>
            <DrawerTrigger>
              <Button variant="secondary" size="sm">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.5 7h15M7 12h10m-7 5h4" />
                </svg>
                <span>Filters</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="pb-0 text-left">
                <DrawerTitle className="text-left">Filters</DrawerTitle>
              </DrawerHeader>

              <div className="space-y-4 px-4">
                <Accordion
                  defaultValue={["bank", "categories"]}
                  type="multiple"
                  className="space-y-2 border-none bg-transparent p-0 shadow-none"
                >
                  <div className="group" key="bank">
                    <AccordionItem value="bank" className="peer rounded-xl border-none shadow-none">
                      <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                        <Typography.Label variant="md" className="flex items-center gap-2 px-0">
                          Bank
                        </Typography.Label>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 space-y-2">
                          {BANKS.map((b) => (
                            <div
                              key={b.name}
                              className="flex cursor-pointer items-center justify-between gap-2"
                              onClick={() => toggleParamValue("bank", b.name)}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={b.icon}
                                  alt={b.name}
                                  className="aspect-square size-6 rounded object-contain"
                                />
                                <span className="text-sm">{b.name}</span>
                              </div>
                              <Checkbox
                                checked={selectedBanks.includes(b.name)}
                                onCheckedChange={() => toggleParamValue("bank", b.name)}
                              />
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <Separator className="border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                  </div>
                  <div className="group" key="categories">
                    <AccordionItem
                      value="categories"
                      className="peer rounded-xl border-none shadow-none"
                    >
                      <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                        <Typography.Label variant="md" className="flex items-center gap-2 px-0">
                          Categories
                        </Typography.Label>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 space-y-2">
                          {allCategories.map((cat) => (
                            <div
                              key={cat}
                              className="flex cursor-pointer items-center justify-between gap-2"
                              onClick={() => toggleParamValue("categories", cat)}
                            >
                              <div className="flex items-center gap-2">
                                {getCategoryIconNode(cat)}
                                <span className="text-sm">{cat}</span>
                              </div>
                              <Checkbox
                                checked={selectedCategories.includes(cat)}
                                onCheckedChange={() => toggleParamValue("categories", cat)}
                              />
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                  </div>
                </Accordion>
              </div>
            </DrawerContent>
          </Drawer>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSearchParams(new URLSearchParams())}
          >
            Clear Filters
          </Button>
        </div>
        <div className="group grid w-full gap-4 md:grid-cols-12 md:items-stretch">
          <div className="col-span-3 hidden w-full md:flex">
            <div className="h-full w-full space-y-3 px-4">
              <div className="flex items-center justify-between">
                <Typography.Heading variant="md">Filters</Typography.Heading>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchParams(new URLSearchParams())}
                >
                  Clear Filters
                </Button>
              </div>
              <div className="space-y-4">
                <Accordion
                  defaultValue={["bank", "categories"]}
                  type="multiple"
                  className="space-y-2 border-none bg-transparent p-0 shadow-none"
                >
                  <div className="group" key="bank">
                    <AccordionItem value="bank" className="peer rounded-xl border-none shadow-none">
                      <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                        <Typography.Label variant="md" className="flex items-center gap-2 px-0">
                          Bank
                        </Typography.Label>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 space-y-2">
                          {BANKS.map((b) => (
                            <div
                              key={b.name}
                              className="flex cursor-pointer items-center justify-between gap-2"
                              onClick={() => toggleParamValue("bank", b.name)}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={b.icon}
                                  alt={b.name}
                                  className="aspect-square size-6 rounded object-contain"
                                />
                                <span className="text-sm">{b.name}</span>
                              </div>
                              <Checkbox
                                checked={selectedBanks.includes(b.name)}
                                onCheckedChange={() => toggleParamValue("bank", b.name)}
                              />
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <Separator className="border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                  </div>
                  <div className="group" key="categories">
                    <AccordionItem
                      value="categories"
                      className="peer rounded-xl border-none shadow-none"
                    >
                      <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                        <Typography.Label variant="md" className="flex items-center gap-2 px-0">
                          Categories
                        </Typography.Label>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 space-y-2">
                          {allCategories.map((cat) => (
                            <div
                              key={cat}
                              className="flex cursor-pointer items-center justify-between gap-2"
                              onClick={() => toggleParamValue("categories", cat)}
                            >
                              <div className="flex items-center gap-2">
                                {getCategoryIconNode(cat)}
                                <span className="text-sm">{cat}</span>
                              </div>
                              <Checkbox
                                checked={selectedCategories.includes(cat)}
                                onCheckedChange={() => toggleParamValue("categories", cat)}
                              />
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                  </div>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="col-span-12 flex w-full flex-col gap-4 md:col-span-9">
            <Typography.Heading variant="lg">
              {visibleCards.length} Qualifying Credit Cards
            </Typography.Heading>

            {visibleCards.length === 0 && (
              <BaseEmptyState
                icon={<Search className="text-muted-foreground h-8 w-8" />}
                title="No matching cards"
                description="Try adjusting your bank or category filters."
              />
            )}

            <Card className="h-full w-full border-none bg-transparent p-0">
              {visibleCards.map((creditCard) => (
                <SpecialCard key={creditCard.value} className="w-full">
                  <Disclosure key={creditCard.value} className="w-full">
                    <DisclosureTrigger className="col-span-12 w-full md:col-span-6">
                      <SpecialCardContent className="relative grid grid-cols-12 gap-4 p-1">
                        {creditCard.preApproved && (
                          <div className="absolute top-0 right-0 z-10">
                            <Badge variant="badgeSuccess" className="rounded-full">
                              <Check className="text-primary h-4 w-4" />
                              <span className="text-primary text-xs font-semibold">
                                Pre-Qualified
                              </span>
                            </Badge>
                          </div>
                        )}

                        <div className="col-span-12 flex flex-col items-start gap-2 md:col-span-3">
                          <div className="bg-muted/50 relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border md:aspect-auto md:h-32">
                            {creditCard.image ? (
                              <img
                                src={creditCard.image}
                                alt={creditCard.name}
                                className="max-h-full max-w-full object-contain object-center transition-transform duration-200 hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-1">
                                <img
                                  src="/icon.svg"
                                  alt="No image"
                                  className="h-8 w-8 opacity-60"
                                />
                                <span className="text-xs">No Image</span>
                              </div>
                            )}
                          </div>
                          {/* <label className="text-muted-foreground mt-1 flex cursor-pointer items-center gap-2 select-none">
                            <input
                              type="checkbox"
                              className="accent-primary"
                              // onChange={...compare logic}
                            />
                            <span className="text-sm">Compare</span>
                          </label> */}
                        </div>

                        <div className="col-span-12 flex flex-col justify-between gap-2 md:col-span-9">
                          <div className="flex flex-col gap-1">
                            <Typography.Heading variant="lg" className="text-primary">
                              {creditCard.name}
                            </Typography.Heading>
                            <div className="flex flex-wrap gap-2">
                              {(Array.isArray(creditCard.features.categories) &&
                              creditCard.features.categories.length > 0
                                ? creditCard.features.categories
                                : typeof creditCard.features.creditCardOneLinerDescription ===
                                    "string"
                                  ? creditCard.features.creditCardOneLinerDescription
                                      .split(",")
                                      .map((raw) => raw.trim())
                                      .filter(Boolean)
                                  : []
                              ).map((categoryRaw, idx) => {
                                // Use all-lowercase to match
                                const category =
                                  typeof categoryRaw === "string" ? categoryRaw.trim() : "";
                                const keyVal = category + idx;
                                // Colorful badge mapping per badge.tsx (see context)
                                const lowerCategory = category.toLowerCase();
                                const CATEGORY_VARIANT_MAP: Record<string, string> = {
                                  rewards: "emerald",
                                  reward: "emerald",
                                  cashback: "gold",
                                  shopping: "violetBright",
                                  "online shopping": "violetBright",
                                  dining: "apricot",
                                  travel: "blue",
                                  movies: "crimson",
                                  movie: "crimson",
                                  fuel: "amberVivid",
                                  utilities: "tealBright",
                                  "bill payments": "skyBright",
                                  "lounge access": "bluebell",
                                  "milestone bonus": "mango",
                                  "milestone bonuses": "mango",
                                  "welcome benefits": "mint",
                                  lifestyle: "blushPeach",
                                  golf: "jade",
                                  "golf benefits": "jade",
                                  hotel: "blueberry",
                                  hotels: "blueberry",
                                  flights: "cyan",
                                  flight: "cyan",
                                  premium: "blushRose",
                                  luxury: "crimson",
                                  grocery: "apricot",
                                  upi: "teal",
                                  "entry-level": "sky",
                                  basic: "neutral",
                                  "co-branded": "emerald",
                                  "statement credit redemption": "latte",
                                  "statement credit": "latte",
                                  "brand voucher": "gold",
                                  experience: "emerald",
                                  insurance: "pistachio",
                                  "forex benefit": "ocean",
                                  "zero forex fee": "ocean",
                                  "international use": "icy",
                                  "emi service": "jade",
                                  "emi conversion": "jade",
                                  "annual fee": "caramel",
                                  "women health benefits": "apricot",
                                  "women health": "apricot",
                                  "complimentary subscriptions": "mint",
                                  "utility rewards": "tealBright",
                                  "domestic lounge access": "bluebell",
                                  "low fee": "wheat",
                                  "lifetime free": "mint",
                                  "airport lounge": "bluebell",
                                  "weekend dining": "blushPeach",
                                  "international spending": "sapphire",
                                  "railway booking rewards": "twilight",
                                  "fastag cashback": "gold",
                                  "everyday spends": "mint",
                                  "category switchable": "teal",
                                  "low redemption value": "caramel",
                                  "hotel stays": "blueberry",
                                };
                                // Try matching synonyms/trimmed/cleaned
                                // Fallback to secondary (gray pill)
                                const variant = CATEGORY_VARIANT_MAP[lowerCategory] ?? "secondary";

                                // Render only if category string is not empty
                                return category ? (
                                  <Badge
                                    key={keyVal}
                                    variant={variant as any}
                                    className="rounded-full capitalize"
                                  >
                                    {category}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                          <div className="mt-2 flex w-full flex-col gap-2 md:flex-row md:items-center">
                            <div className="flex gap-4">
                              <span className="text-primary text-sm font-medium">
                                Joining Fee:{" "}
                                {creditCard.features.creditCardJoiningFeeDescription
                                  ? `${creditCard.features.creditCardJoiningFeeAmount}`
                                  : "—"}
                              </span>
                              <span className="text-primary text-sm font-medium">
                                Annual Fee:{" "}
                                {creditCard.features.creditCardAnnualFeeAmount
                                  ? `${creditCard.features.creditCardAnnualFeeAmount}`
                                  : "—"}
                              </span>
                            </div>
                            <div className="mt-2 flex gap-2 md:mt-0 md:ml-auto">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => {
                                  localStorage.setItem(
                                    "individualCreditCardData",
                                    JSON.stringify([creditCard]),
                                  );
                                  navigate(`/agent?id=${creditCard.id}`);
                                }}
                              >
                                <Chat />
                                Chat
                              </Button>

                              {creditCard.applyLink ? (
                                <Button size="sm" asChild>
                                  <Link
                                    to={creditCard.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Apply Now
                                  </Link>
                                </Button>
                              ) : (
                                <Button size="sm">Apply Now</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </SpecialCardContent>
                    </DisclosureTrigger>
                    <DisclosureContent>
                      <div className="space-y-6 py-4">
                        <div className="space-y-1">
                          <Typography.Heading variant="lg" className="text-primary">
                            Special Offer
                          </Typography.Heading>
                          <Typography.SubHeading className="text-muted-foreground">
                            {creditCard.features.creditCardSpecialOfferDetails || "—"}
                          </Typography.SubHeading>
                        </div>

                        {Array.isArray(creditCard.features.bestFeature) &&
                          creditCard.features.bestFeature.length > 0 && (
                            <div className="space-y-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                Highlights
                              </Typography.Heading>
                              <ul className="ml-4 flex list-disc flex-col gap-1">
                                {creditCard.features.bestFeature.map((bf, idx) => (
                                  <li key={idx}>
                                    <Typography.SubHeading>{bf}</Typography.SubHeading>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {Array.isArray(creditCard.features.cardBenefits) &&
                          creditCard.features.cardBenefits.length > 0 && (
                            <div className="space-y-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                Benefits
                              </Typography.Heading>
                              <ul className="ml-4 flex list-disc flex-col gap-1">
                                {creditCard.features.cardBenefits.map((cb, idx) => (
                                  <li key={idx}>
                                    <Typography.SubHeading>{cb}</Typography.SubHeading>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        <div className="space-y-1">
                          <Typography.Heading variant="lg" className="text-primary">
                            Fees &amp; Charges
                          </Typography.Heading>
                          <div className="max-w-md">
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell>
                                    <Typography.Label>Joining Fee</Typography.Label>
                                  </TableCell>
                                  <TableCell>
                                    <Typography.SubHeading>
                                      {creditCard.features.creditCardJoiningFeeAmount ? (
                                        <>
                                          ₹{creditCard.features.creditCardJoiningFeeAmount}
                                          {creditCard.features
                                            .creditCardJoiningFeeAdditionalText && (
                                            <span className="text-muted-foreground ml-1 text-xs">
                                              (
                                              {
                                                creditCard.features
                                                  .creditCardJoiningFeeAdditionalText
                                              }
                                              )
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        "—"
                                      )}
                                    </Typography.SubHeading>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <Typography.Label>Annual Fee</Typography.Label>
                                  </TableCell>
                                  <TableCell>
                                    <Typography.SubHeading>
                                      {creditCard.features.creditCardAnnualFeeAmount ? (
                                        <>
                                          ₹{creditCard.features.creditCardAnnualFeeAmount}
                                          {creditCard.features
                                            .creditCardAnnualFeeAdditionalText && (
                                            <span className="text-muted-foreground ml-1 text-xs">
                                              (
                                              {
                                                creditCard.features
                                                  .creditCardAnnualFeeAdditionalText
                                              }
                                              )
                                            </span>
                                          )}
                                        </>
                                      ) : (
                                        "—"
                                      )}
                                    </Typography.SubHeading>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          {(creditCard.features.creditCardJoiningFeeDescription ||
                            creditCard.features.creditCardAnnualFeeDescription) && (
                            <div className="mt-2 space-y-1">
                              {creditCard.features.creditCardJoiningFeeDescription && (
                                <Typography.SubHeading className="text-muted-foreground text-xs">
                                  {creditCard.features.creditCardJoiningFeeDescription}
                                </Typography.SubHeading>
                              )}
                              {creditCard.features.creditCardAnnualFeeDescription && (
                                <Typography.SubHeading className="text-muted-foreground text-xs">
                                  {creditCard.features.creditCardAnnualFeeDescription}
                                </Typography.SubHeading>
                              )}
                            </div>
                          )}
                        </div>

                        {creditCard.features.cardCategoryDescription && (
                          <div className="space-y-1">
                            <Typography.Heading variant="lg" className="text-primary">
                              Category Details
                            </Typography.Heading>
                            <div className="flex flex-col gap-2">
                              {Object.entries(creditCard.features.cardCategoryDescription).map(
                                ([cat, arr]) => (
                                  <div key={cat}>
                                    <Typography.SubHeading
                                      variant="md"
                                      className="font-bold capitalize"
                                    >
                                      {cat}
                                    </Typography.SubHeading>
                                    <ul className="ml-4 flex list-disc flex-col gap-1">
                                      {arr.map((desc, idx) => (
                                        <li key={idx}>
                                          <Typography.SubHeading
                                            variant="md"
                                            className="text-muted-foreground"
                                          >
                                            {desc}
                                          </Typography.SubHeading>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {creditCard.features.bestSuitedFor && (
                          <div className="space-y-1">
                            <Typography.Heading variant="lg" className="text-primary">
                              Best Suited For
                            </Typography.Heading>
                            <ul className="ml-4 flex list-disc flex-col gap-1">
                              {Object.entries(creditCard.features.bestSuitedFor).map(
                                ([cat, features], i) => (
                                  <li key={cat}>
                                    <Typography.SubHeading
                                      variant="md"
                                      className="font-bold capitalize"
                                    >
                                      <span className="font-semibold">{cat}:</span>{" "}
                                      {features.join(", ")}
                                    </Typography.SubHeading>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                        {creditCard.features.moreInfo && (
                          <div className="space-y-1">
                            <Typography.Heading variant="lg" className="text-primary">
                              More Info
                            </Typography.Heading>
                            <div className="space-y-2">
                              <Accordion type="multiple" className="w-full border-none shadow-none">
                                {Object.entries(creditCard.features.moreInfo).map(
                                  ([section, lines], index) => (
                                    <AccordionItem
                                      key={section}
                                      value={section}
                                      className="bg-card/70 mt-0 rounded-xl border-none p-0"
                                    >
                                      <AccordionTrigger className="cursor-pointer gap-2 px-2 py-3 text-base font-semibold capitalize hover:no-underline">
                                        <span className="text-primary">
                                          {index + 1}. {section}
                                        </span>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <ul className="ml-4 flex list-disc flex-col gap-1">
                                          {lines.map((line, idx) => (
                                            <li key={idx}>
                                              <Typography.SubHeading
                                                variant="md"
                                                className="text-muted-foreground"
                                              >
                                                {line}
                                              </Typography.SubHeading>
                                            </li>
                                          ))}
                                        </ul>
                                      </AccordionContent>
                                    </AccordionItem>
                                  ),
                                )}
                              </Accordion>
                            </div>
                          </div>
                        )}

                        {creditCard.features.trendingOffers &&
                          creditCard.features.trendingOffers.length > 0 && (
                            <div className="space-y-1">
                              <Typography.Heading variant="lg" className="text-primary">
                                Trending Offers
                              </Typography.Heading>
                              <ul className="flex flex-col gap-2">
                                {creditCard.features.trendingOffers.map((offer, idx) => (
                                  <li key={idx} className="bg-muted rounded-md p-3">
                                    <Typography.SubHeading>
                                      <span
                                        className="font-bold"
                                        style={{ color: offer.brandColour }}
                                      >
                                        {offer.brandName}:
                                      </span>{" "}
                                      {offer.shortDescription}
                                      {offer.detailedDescription && (
                                        <Typography.P className="text-muted-foreground block text-sm">
                                          {offer.detailedDescription}
                                        </Typography.P>
                                      )}
                                    </Typography.SubHeading>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {creditCard.rewardJson && (
                          <div className="max-w-80 space-y-1 overflow-x-auto md:max-w-none">
                            <Typography.Heading variant="lg" className="text-primary">
                              Rewards Snapshot
                            </Typography.Heading>
                            <div className="max-w-full overflow-x-auto">
                              <Table className="min-w-[440px] border text-xs">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>
                                      <Typography.SubHeading
                                        variant="md"
                                        className="text-muted-foreground"
                                      >
                                        Category
                                      </Typography.SubHeading>
                                    </TableHead>
                                    <TableHead>
                                      <Typography.SubHeading
                                        variant="md"
                                        className="text-muted-foreground"
                                      >
                                        Rewards %
                                      </Typography.SubHeading>
                                    </TableHead>
                                    <TableHead>
                                      <Typography.SubHeading
                                        variant="md"
                                        className="text-muted-foreground"
                                      >
                                        Details
                                      </Typography.SubHeading>
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {Object.entries(creditCard.rewardJson).map(([cat, value]) => {
                                    if (typeof value === "number") {
                                      return (
                                        <TableRow key={cat}>
                                          <TableCell>
                                            <Typography.SubHeading>{cat}</Typography.SubHeading>
                                          </TableCell>
                                          <TableCell>
                                            <Typography.SubHeading>{value}</Typography.SubHeading>
                                          </TableCell>
                                          <TableCell>—</TableCell>
                                        </TableRow>
                                      );
                                    }
                                    return (
                                      <TableRow key={cat} className="overflow-x-auto">
                                        <TableCell>
                                          <Typography.SubHeading>{cat}</Typography.SubHeading>
                                        </TableCell>
                                        <TableCell>
                                          <Typography.SubHeading>
                                            {value.rewardsPercent || "—"}
                                          </Typography.SubHeading>
                                        </TableCell>
                                        <TableCell>
                                          <Typography.SubHeading className="max-w-xs truncate break-words">
                                            {[
                                              value.nonSpendBased &&
                                                Object.values(value.nonSpendBased)
                                                  .map((item) => item.rewardDesc)
                                                  .join(", "),
                                              value.spendBased &&
                                                Object.values(value.spendBased)
                                                  .map((item) => item.rewardDesc)
                                                  .join(", "),
                                            ]
                                              .filter(Boolean)
                                              .join(", ") || "—"}
                                          </Typography.SubHeading>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}

                        {creditCard.features.creditCardTermCondition && (
                          <div>
                            <Link
                              to={creditCard.features.creditCardTermCondition}
                              className="text-primary text-sm underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Typography.Label>Terms & Conditions</Typography.Label>
                            </Link>
                          </div>
                        )}
                      </div>
                    </DisclosureContent>
                  </Disclosure>
                </SpecialCard>
              ))}
            </Card>
          </div>
        </div>
      </div>

      <CreditCardInfoAlertContent />
    </section>
  );
};

export default CreditCardPage;
