import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQsFour() {
  const faqItems = [
    {
      id: "item-1",
      question: "How does the Smart Credit Card Matching work?",
      answer:
        "Our AI analyzes your spending patterns, credit score, and financial goals to recommend the best credit cards for your needs. We consider factors like rewards categories, interest rates, and your spending habits to find the perfect match.",
    },
    {
      id: "item-2",
      question: "What trading platforms can I connect with?",
      answer:
        "You can seamlessly integrate with popular trading platforms like Zerodha, Upstox, Angel One, and many others. This allows you to get advanced stock analysis and portfolio insights directly in our platform.",
    },
    {
      id: "item-3",
      question: "What financial calculators are available?",
      answer:
        "We offer 12+ comprehensive financial calculators including EMI calculator, SIP calculator, retirement planner, tax calculator, debt payoff calculator, emergency fund calculator, and more to help you make informed financial decisions.",
    },
    {
      id: "item-4",
      question: "How does the AI Financial Advisor work?",
      answer:
        "Our AI Financial Advisor provides 24/7 personalized financial guidance, analyzes your spending patterns, offers investment advice, and helps you make smarter money decisions based on your financial data and goals.",
    },
    {
      id: "item-5",
      question: "Is my financial data secure?",
      answer:
        "Yes, we use bank-level encryption and security protocols to protect your financial data. We never share your personal information with third parties without your explicit consent, and all data is stored securely in compliance with financial regulations.",
    },
    {
      id: "item-6",
      question: "How does the expense tracking feature work?",
      answer:
        "Our intelligent expense management system automatically categorizes your transactions, tracks spending patterns, and provides insights into your financial habits. You can upload bank statements or connect your accounts for seamless tracking.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about our platform,
            services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
