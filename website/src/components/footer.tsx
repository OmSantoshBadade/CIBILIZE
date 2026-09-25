import { Link } from "react-router-dom";
import Logo from "./logo";
// import { Logo } from '@/components/logo'

const appLinks = [
  { href: "/app/credit-cards", label: "Credit Cards" },
  { href: "/app/expense-tracker", label: "Expense Tracker" },
  { href: "/app/cibil-score-tracker", label: "CIBIL Score" },
  { href: "/app/calculator", label: "Calculators" },
];

const calculatorLinks = [
  { href: "/app/calculator/emi-calculator", label: "EMI Calculator" },
  { href: "/app/calculator/sip-calculator", label: "SIP Calculator" },
  { href: "/app/calculator/tax-calculator", label: "Tax Calculator" },
  { href: "/app/calculator/retirement-calculator", label: "Retirement Calculator" },
  { href: "/app/calculator/emergency-calculator", label: "Emergency Fund" },
  { href: "/app/calculator/networth-calculator", label: "Net Worth" },
  { href: "/app/calculator/cc-payoff-calculator", label: "Credit Card Payoff" },
  { href: "/app/calculator/debt-calculator", label: "Debt Calculator" },
];

const communityLinks = [
  { href: "#", label: "GitHub" },
  { href: "#", label: "Discord" },
  { href: "#", label: "Slack" },
  { href: "#", label: "X / Twitter" },
];

const footerLinks = [
  {
    name: "App Features",
    links: appLinks,
  },
  {
    name: "Calculators",
    links: calculatorLinks,
  },
];

export default function Footer() {
  return (
    <footer className="m-1 rounded-3xl border">
      <div className="mx-auto max-w-5xl space-y-16 px-5 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
          <Link to="/" aria-label="go home">
            <Logo />
          </Link>
           
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {footerLinks.map((linksGroup, index) => (
            <div key={index}>
              <span className="font-medium">{linksGroup.name}</span>
              <ul className="mt-4 list-inside space-y-4">
                {linksGroup.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="hover:text-primary text-muted-foreground text-sm duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span className="text-sm font-medium">Community</span>
            <ul className="mt-4 list-inside space-y-4">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-primary text-muted-foreground text-sm duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-muted mt-16 flex items-center justify-between rounded-md p-4 px-6 py-3">
          <span>&copy; Cibilize {new Date().getFullYear()}</span>
          <Link to="#" className="text-muted-foreground hover:text-primary text-sm">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
