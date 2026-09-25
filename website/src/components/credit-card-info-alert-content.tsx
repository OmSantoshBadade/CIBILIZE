import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "./ui/item";
import { SpecialCard, SpecialCardContent } from "./ui/special-card";
import Typography from "./ui/typography";

const CreditCardInfoContent = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-12 py-12">
      <section className="space-y-4">
        <h2 className="mb-6 text-2xl font-bold">5 Benefits of Using a Credit Card</h2>
        <p className="text-muted-foreground mb-6">
          From earning reward points to building your credit score, credit cards offer a range of
          benefits that can enhance your financial life.
        </p>

        <Tabs defaultValue="convenience" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="convenience">Convenience</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="credit">Credit Score</TabsTrigger>
            <TabsTrigger value="protection">Protection</TabsTrigger>
            <TabsTrigger value="flexibility">Flexibility</TabsTrigger>
          </TabsList>

          <TabsContent value="convenience" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Convenience and Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Credit cards offer a convenient and secure way to make purchases both online and
                  offline. You don't need to carry cash, and your transactions are protected against
                  fraud.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>No need to carry large amounts of cash</li>
                  <li>Enhanced security features and fraud protection</li>
                  <li>Easy tracking of expenses through statements</li>
                  <li>Widely accepted at merchants worldwide</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Rewards and Cashback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Earn reward points or cashback on every purchase. These can be redeemed for
                  discounts, vouchers, or travel benefits.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Earn points on every transaction</li>
                  <li>Redeem for travel, shopping, or dining experiences</li>
                  <li>Cashback on specific spending categories</li>
                  <li>Exclusive deals and discounts for cardholders</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Responsible credit card usage can help build and improve your credit score, which
                  is important for future loans and credit facilities.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Payment history is key to building credit</li>
                  <li>Demonstrates creditworthiness to lenders</li>
                  <li>Helps qualify for better interest rates</li>
                  <li>Impacts future loan approvals</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="protection" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Credit cards offer various protections for your purchases, including buyer
                  protection and chargeback rights.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Buyer protection on purchases</li>
                  <li>Chargeback rights for disputes</li>
                  <li>Extended warranty on eligible items</li>
                  <li>Travel insurance and benefits</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flexibility" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Flexibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Get an interest-free period on your purchases and flexible payment options to
                  manage your finances better.
                </p>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                  <li>Interest-free period of up to 50 days</li>
                  <li>Convert large purchases into EMIs</li>
                  <li>Flexible payment schedules</li>
                  <li>Avoid overspending with a set credit limit</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-950">
          <div className="flex gap-4">
            <Lightbulb className="h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="mb-4 text-lg font-semibold">Directly from Expert</h3>
              <div className="space-y-4 text-sm">
                <ItemGroup className="space-y-6">
                  {[
                    {
                      title: "Pay your full balance to avoid interest",
                      description:
                        "The most important rule of credit card usage is to pay your balance in full before the due date to avoid interest and protect your credit score. If you cannot make the full payment, try to pay more than the minimum, which can reduce the interest charges.",
                      srOnly: "Pay your full balance to avoid interest",
                    },
                    {
                      title: "Convert large purchases into EMIs",
                      description:
                        "If you make a large purchase, consider converting it to EMIs, which usually comes with a lower interest rate than the standard credit card rate. This way, you can manage the entire expense in smaller and more manageable payments over time.",
                      srOnly: null,
                    },
                    {
                      title: "Avoid cash withdrawals with your credit card",
                      description:
                        "Cash advances do not offer an interest-free period; instead, interest is levied as soon as you withdraw cash. These charges can quickly accumulate debt, so use cash withdrawals only as a last resort.",
                      srOnly: "Avoid cash withdrawals with your credit card",
                    },
                    {
                      title: "Keep track of your spending",
                      description:
                        "Monitor your spending to stay within your credit limit and avoid building up a difficult-to-manage balance. Check all SMS alerts and your bank statements carefully about credit card transactions. Besides this, you should also check your credit report at regular intervals to notice and rectify any errors.",
                      srOnly: "Keep track of your spending",
                    },
                    {
                      title: "Do not apply for multiple credit cards at a time",
                      description:
                        "Applying for too many cards at once can make you look credit-hungry and lower your credit score due to multiple hard inquiries. While a single inquiry may not have significant consequences, multiple inquiries within a short period can negatively impact your credit score. Hence, apply only for cards that truly meet your needs and spending habits.",
                      srOnly: "Do not apply for multiple credit cards at a time",
                    },
                  ].map((tip) => (
                    <Item
                      key={tip.title}
                      variant="muted"
                      size="sm"
                      className="!bg-transparent p-0 hover:bg-transparent"
                    >
                      <ItemContent>
                        <ItemTitle>{tip.title}</ItemTitle>
                        <ItemDescription>{tip.description}</ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </ItemGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Typography.Heading variant="2xl">Do's and Don'ts for Credit Cards</Typography.Heading>
            <Badge variant="outline" className="ml-2">
              Best Practices
            </Badge>
          </div>
          <Typography.SubHeading className="text-muted-foreground">
            Follow these guidelines to use your credit card wisely, avoid trouble, and make the most
            of its benefits.
          </Typography.SubHeading>
        </div>
        <SpecialCard>
          <SpecialCardContent className="px-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-md border border-green-100 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
                  <Typography.Label className="mb-2 flex items-center gap-2">Do's</Typography.Label>
                  {[
                    "Choose a card matching your lifestyle",
                    "Review your monthly credit card statement",
                    "Pay your credit card bill in full & on time",
                    "Spend within your means to avoid debt",
                    "Utilize the benefit of interest-free period",
                    "Keep a check on reward points expiration",
                  ].map((item, index) => (
                    <div key={item} className="mb-0 flex items-center gap-3 px-3 py-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <Typography.Label className="text-primary text-sm font-normal">
                        {item}
                      </Typography.Label>
                    </div>
                  ))}
                </div>
                <div className="rounded-md border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                  <Typography.Label className="mb-2 flex items-center gap-2">
                    Don'ts
                  </Typography.Label>
                  {[
                    "Pay only the minimum amount each month",
                    "Exceed your credit card limit frequently",
                    "Miss or delay a credit card bill payment",
                    "Close your old credit card accounts",
                    "Apply for too many credit cards at once",
                    "Withdraw cash using your credit card",
                  ].map((item, index) => (
                    <div key={item} className="mb-0 flex items-center gap-3 px-3 py-2">
                      <XCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
                      <Typography.Label className="text-primary text-sm font-normal">
                        {item}
                      </Typography.Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpecialCardContent>
        </SpecialCard>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Typography.Heading variant="2xl">Latest Updates</Typography.Heading>
          </div>
          <Typography.SubHeading className="text-muted-foreground">
            Stay updated with the latest news and announcements in the credit card industry.
          </Typography.SubHeading>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "IndusInd Bank and CRED Come Together to Offer Two Co-branded Credit Cards",
              date: "16 September 2025",
              content:
                "IndusInd Bank and CRED have collaborated to bring forth two co-branded credit cards. These are CRED IndusInd Bank RuPay Credit Card which is an entry-level card and Sovereign Credit Card which is an invite-only offering. CRED RuPay targets those who prefer to make online transactions by providing a value-back of up to 5% as rewards on these spends, including UPI transactions. On the other hand, Sovereign card comes with premium benefits and is designed for high net-worth individuals.",
            },
            {
              title: "Swiggy HDFC Credit Card now offers discounts on Paytm Travel bookings",
              date: "29 August 2025",
              content:
                "Swiggy and HDFC Bank have upgraded their co-branded credit card by adding 6% discount on domestic and international flights and intercity bus bookings via Paytm Travel. This benefit is available for both existing and new cardholders.",
            },
            {
              title: "Flipkart and SBI Card Launch Co-Branded Credit Card with Up to 7.5% Cashback",
              date: "29 August 2025",
              content:
                "Flipkart, in partnership with SBI Card, has launched Flipkart SBI Card offering up to 7.5% cashback across leading brands. Cardholders can earn 5% cashback on Flipkart and Cleartrip, 7.5% on Myntra, 4% on select merchants like Zomato, PVR, Netmeds and Uber, and 1% on other eligible spends. The card comes with a joining fee of Rs. 500 and a welcome gift card worth Rs. 250, along with an additional limited-time offer of up to Rs. 1,000 gift vouchers.",
            },
            {
              title: "HSBC Bank Announces up to 12X Rewards on 'Travel with Points' Platform",
              date: "21 August 2025",
              content:
                "HSBC Bank has launched rewards marketplace similar to HDFC Bank's SmartBuy and ICICI Bank iShop. Cardholders can redeem their reward points to make travel bookings through the platform wherein they can earn up to 12X rewards on hotel booking, up to 6X rewards on flight booking and 2X rewards on car rental. The 12X and 6X reward rates are currently applicable only on the bank's premium offerings - HSBC Prive and HSBC Premier Credit Cards, whereas other eligible cards will earn 6X and 4X rewards on these categories, respectively.",
            },
            {
              title:
                "IDFC FIRST Bank and Indigo Airlines Collaborate to Launch Co-branded Credit Card",
              date: "4 Aug 2025",
              content:
                "After their co-branded card collaboration with HDFC Bank and Kotak Mahindra Bank, Indigo Airlines has now partnered with IDFC FIRST Bank to launch Indigo IDFC FIRST Dual Credit Card. Available at an annual fee of Rs. 4,999, the card offers value-back as Indigo BluChips, which are redeemable against Indigo flight ticket bookings. Cardholders will get two physical credit card – Mastercard and Rupay variant – sharing a common credit limit.",
            },
            {
              title: "PhonePe Launches Co-branded Credit Cards with SBI Card",
              date: "22 July 2025",
              content:
                "SBI Card has joined hands with PhonePe to launch two credit cards - PhonePe SBI Card PURPLE and PhonePe SBI Card SELECT BLACK, wherein the former is base variant and the latter is a premium variant. Cardholders earn the highest rewards on utilities, recharges, bill payments, etc. made via PhonePe platform. In addition to this, the cards also offer accelerated rewards on other online spends.",
            },
            {
              title: "SBI Card Announces Revision on MAD Calculation, Air Accident Cover and more",
              date: "15 July 2025",
              content:
                "SBI Card has announced some important changes on its credit cards, effective 15 July 2025 onwards. These include changes to Minimum Amount Due (MAD) calculation, Order of Payment Settlement, and discontinuation of Complimentary Air Accident Insurance Cover from all eligible cards.",
            },
            {
              title: "Kotak Mahindra Bank Launches New Premium Card – Kotak Solitaire",
              date: "12 May 2025",
              content:
                "Catering to the needs of frequent travellers, Kotak Mahindra Bank has launched Kotak Solitaire Credit Card, offering 10% value-back on flights and hotel bookings made via the Kotak Unbox Platform. Accumulated reward points can be transferred to 10+ airlines and hotel loyalty programs in 1:1 ratio. Kotak Solitaire does not charge any joining fee; however, an annual fee of Rs. 25,000 is applicable.",
            },
          ].map((update, index) => (
            <SpecialCard key={update.title}>
              <SpecialCardContent className="space-y-4 px-0">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <Typography.Label className="text-primary text-sm">
                    {update.date}
                  </Typography.Label>
                  <Badge className="ml-auto shrink-0" variant="secondary">
                    Update
                  </Badge>
                </div>
                <Typography.Heading variant="lg">{update.title}</Typography.Heading>
                <Typography.SubHeading className="text-muted-foreground text-sm">
                  {update.content}
                </Typography.SubHeading>
              </SpecialCardContent>
            </SpecialCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <Typography.Heading variant="2xl">Credit Card vs Debit Card</Typography.Heading>

        {/* <h2 className="mb-6 text-2xl font-bold">Credit Card vs Debit Card</h2> */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b-2">
                <th className="px-4 py-3 text-left font-semibold">Feature</th>
                <th className="px-4 py-3 text-left font-semibold">Credit Card</th>
                <th className="px-4 py-3 text-left font-semibold">Debit Card</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Function",
                  credit: "A short-term loan extended by the card issuer that requires repayment",
                  debit: "A means to spend money directly from your savings or current account",
                },
                {
                  feature: "Spending Limit",
                  credit: "Can spend within the pre-fixed credit limit",
                  debit: "Can spend only up to the balance available in the account",
                },
                {
                  feature: "Payment Method",
                  credit:
                    "Card issuer pays for your purchases, which you repay by the monthly due date",
                  debit: "Amount is deducted directly from your bank account",
                },
                {
                  feature: "Interest Charges",
                  credit: "Interest charges apply in case of late or partial payments",
                  debit: "No interest charges are applicable",
                },
                {
                  feature: "Rewards & Benefits",
                  credit: "Generally offers enhanced rewards, cashback, and other benefits",
                  debit: "Usually offers basic rewards, cashback, and limited benefits",
                },
                {
                  feature: "Credit Score Impact",
                  credit: "Directly impacts your credit score",
                  debit: "No direct impact on credit score",
                },
              ].map((row, index) => (
                <tr key={index} className="border-border hover:bg-muted/50 border-b">
                  <td className="px-4 py-3 font-medium">{row.feature}</td>
                  <td className="px-4 py-3">{row.credit}</td>
                  <td className="px-4 py-3">{row.debit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        {/* <h2 className="mb-6 text-2xl font-bold">Types of Credit Cards in India</h2>
        <p className="text-muted-foreground mb-6">
          Here are the different types of credit cards in India to match your lifestyle and spending
          pattern. Find the right one to maximize savings on your spends:
        </p> */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Typography.Heading variant="2xl">Types of Credit Cards in India</Typography.Heading>
          </div>
          <Typography.SubHeading className="text-muted-foreground">
            Here are the different types of credit cards in India to match your lifestyle and
            spending pattern. Find the right one to maximize savings on your spends:
          </Typography.SubHeading>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { name: "Lifetime-Free Cards", description: "Cards with no joining or annual fees" },
            {
              name: "Travel Cards",
              description: "Earn rewards on flights, hotels, and travel bookings",
            },
            { name: "Shopping Cards", description: "Get cashback and rewards on shopping spends" },
            { name: "Dining Cards", description: "Exclusive offers and rewards at restaurants" },
            { name: "Fuel Cards", description: "Earn rewards on fuel purchases" },
            {
              name: "Entry-Level Cards",
              description: "For new-to-credit individuals with basic benefits",
            },
          ].map((cardType, index) => (
            <SpecialCard key={index}>
              <SpecialCardContent className="space-y-4 px-0">
                <div className="flex items-center gap-2">
                  <Typography.Label className="text-base">{cardType.name}</Typography.Label>
                  <Badge variant="secondary" className="ml-2">
                    {index === 0 ? "No Fees" : "Category"}
                  </Badge>
                </div>
                <Typography.SubHeading className="text-muted-foreground">
                  {cardType.description}
                </Typography.SubHeading>
              </SpecialCardContent>
            </SpecialCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="mb-6 text-2xl font-bold">Eligibility Criteria and Documents Required</h2>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">General Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">Age</p>
                <p className="text-muted-foreground text-sm">Minimum 18 years</p>
              </div>
              <div>
                <p className="font-medium">Credit Score</p>
                <p className="text-muted-foreground text-sm">Preferably 700 and above</p>
              </div>
              <div>
                <p className="font-medium">Employment Type</p>
                <p className="text-muted-foreground text-sm">Salaried or Self-employed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents Required</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Identity & Signature Proof</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Address Proof</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Age Proof</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Income Proof</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4 text-xs">
                Common documents: PAN card, Aadhaar, Bank statement, Salary slips, Rent agreement,
                Utility bills
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>RuPay Credit Cards on UPI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              RuPay is a domestic card payment network and currently the only one offering credit
              card benefits on UPI transactions. In June 2022, RBI allowed the linking of RuPay
              credit cards to UPI apps, enabling quick payments while earning benefits on UPI
              spends.
            </p>
            <p>
              Initially, only a few credit cards were available on the RuPay network. However, most
              card issuers, including HDFC Bank, SBI Card, Axis Bank, ICICI Bank, and more, now
              offer RuPay variants of their existing cards or are launching new cards on the RuPay
              network.
            </p>
            <p>
              While some cards are designed for UPI transactions and offer accelerated rewards on
              UPI spends, other RuPay credit cards offer a base reward rate or cashback on UPI
              payments, making them versatile for everyday transactions.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Secured Credit Cards: A Smart Way to Build Credit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Most credit card issuers prefer applicants with a good credit score (preferably above
              750). While some issuers offer entry-level credit cards for new-to-credit individuals,
              getting approval can still be challenging. If you're struggling to get a credit card
              and want to start your credit journey, consider applying for a secured credit card.
            </p>
            <p>
              Secured credit cards are issued against collateral, such as a fixed deposit. These
              cards function just like regular credit cards but usually come with basic benefits.
              The credit limit is assigned as per the fixed deposit's value.
            </p>
            <p>
              Even students and unemployed individuals can apply for secured credit cards, making
              them a great option for building credit. By paying bills on time, they can help you
              build a strong credit profile. In case of any default payments, the outstanding amount
              is recovered from the fixed deposit.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Instant Virtual Credit Cards in India</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Virtual credit cards are digital versions of physical credit cards and work just like
              regular ones. With virtual cards, you can make online transactions and earn benefits
              such as rewards or cashback on your spends.
            </p>
            <p>
              A virtual credit card is issued electronically and all essential details—such as the
              card number, CVV, and validity—are accessible through your credit card issuer's mobile
              app or website. While physical credit cards are usually delivered within 2–4 working
              days after approval, virtual credit cards are typically issued instantly.
            </p>
            <p>
              They often come with relaxed eligibility criteria, making them a convenient option,
              especially for new-to-credit consumers who want to start making online purchases
              immediately.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="mb-6 text-2xl font-bold">How to Choose the Right Credit Card</h2>
        <div className="space-y-4">
          {[
            {
              title: "Identify Your Preferred Spending Category",
              description:
                "There are different types of credit cards, such as travel, shopping, dining, etc. To maximize the benefits of a credit card, you should analyze your shopping habits. The best credit card for you would be one that fulfills your core needs.",
            },
            {
              title: "Shortlist Cards Based on Your Eligibility",
              description:
                "Once you've identified your shopping pattern, start by shortlisting the cards based on eligibility. Understand your credit profile & find out the cards you may be eligible for. You can check your eligibility at platforms for pre-qualified card offers.",
            },
            {
              title: "Evaluate Features & Benefits",
              description:
                "After shortlisting the preferred credit cards, evaluate all the features and benefits of the respective card and choose the one that fits your needs and complements your budget.",
            },
            {
              title: "Read the Fine Print",
              description:
                "Once you've decided which card to apply for, review all the related fees & charges associated with the card. Analyze whether you will be able to pay the associated fees. Apart from the annual fee, also check for other related charges, like interest rates, late payment fees, etc.",
            },
          ].map((step, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="mb-6 text-2xl font-bold">Credit Card Charges & Interest Rates</h2>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Typical Charges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Annual Fee", value: "Varies from card to card" },
                { label: "Finance Charges", value: "9% p.a. to 52.86% p.a." },
                { label: "Interest-free Period", value: "Up to 50 days" },
                { label: "Cash Advance Charges", value: "0% to 3.5%" },
                { label: "Forex Markup Fee", value: "0% to 3.5%" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Understanding Interest Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Credit card issuers charge an interest rate, also known as finance charges, which is
                levied in case of late payments or defaults. While the interest rate varies from
                card to card, it <strong>typically ranges between 9% p.a. and 52.86% p.a.</strong>
              </p>
              <p>
                Unlike other card charges, such as joining or annual fees, the interest rate is
                usage-based and is applied to the outstanding amount whenever you fail to pay your
                credit card bill in full. Interest is also charged when you make only the minimum
                due payment.
              </p>
              <p className="text-muted-foreground text-xs">
                Tip: Always pay your full balance before the due date to avoid interest charges.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="mb-6 text-2xl font-bold">
          How a Credit Card Can Help Improve Your Credit Score
        </h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <p>
              Using a credit card responsibly can help you build and improve your credit score.
              Whether you're starting from scratch or looking to improve your existing score, here
              are some effective ways to strengthen your credit profile through credit cards:
            </p>
            <div>
              <h4 className="mb-2 font-semibold">Payment History Matters</h4>
              <p className="text-muted-foreground text-sm">
                When you use a credit card and pay your dues on time, it shows your ability to
                manage credit effectively. Late payments not only attract high interest charges but
                can also significantly damage your credit score. Since credit bureaus give maximum
                weightage to repayment history while calculating your credit score, making timely
                payments can have a positive impact on your score over time.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Maintain Low Credit Utilization Ratio</h4>
              <p className="text-muted-foreground text-sm">
                Another important factor is your credit utilization ratio (CUR)—the percentage of
                your available credit limit that you're using. While having a higher CUR and paying
                the entire bill may not affect your score drastically, maintaining a high CUR for a
                longer period of time can harm your credit score. Keeping this ratio low shows
                issuers that you're not overly dependent on credit and can manage your finances
                well.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CreditCardInfoContent;
