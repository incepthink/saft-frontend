import { useState } from "react";
import {
  Wallet,
  Search,
  Gift,
  FileText,
  Megaphone,
  Zap,
  BarChart3,
  Calendar,
  PieChart,
} from "lucide-react";

type Tab = "investors" | "projects" | "funds";

const tabs: { key: Tab; label: string }[] = [
  { key: "investors", label: "Investors" },
  { key: "projects", label: "Projects" },
  { key: "funds", label: "Funds" },
];

const steps: Record<
  Tab,
  { icon: React.ElementType; title: string; description: string }[]
> = {
  investors: [
    {
      icon: Wallet,
      title: "Connect Your Canton Wallet",
      description: "Access verified pre-TGE listings on the SAFTY marketplace.",
    },
    {
      icon: Search,
      title: "Browse & Invest",
      description:
        "Filter by category (DeFi, GameFi, Infra, L1, L2), review tokenomics, vesting terms, and FDV.",
    },
    {
      icon: Gift,
      title: "Receive Your SAFTY Tokens",
      description:
        "Get $st[TOKEN] representing your locked SAFT. Tokens release automatically per the vesting schedule.",
    },
  ],
  projects: [
    {
      icon: FileText,
      title: "Submit Your Listing",
      description:
        "Provide token details, raise target, and vesting schedule for your SAFT offering.",
    },
    {
      icon: Megaphone,
      title: "Get Listed & Raise",
      description:
        "Investors discover and fund your SAFT through the SAFTY marketplace.",
    },
    {
      icon: Zap,
      title: "Tokens Distributed On-Chain",
      description:
        "Settlement happens automatically on Canton Network. No escrow needed.",
    },
  ],
  funds: [
    {
      icon: BarChart3,
      title: "Connect Wallet & View Portfolio",
      description:
        "See all your SAFTY positions in one place with real-time valuation.",
    },
    {
      icon: Calendar,
      title: "Monitor Vesting Schedules",
      description:
        "Track next unlock dates, amounts, and cumulative releases across positions.",
    },
    {
      icon: PieChart,
      title: "Manage Exposure",
      description:
        "View total USD value, locked vs. unlocked breakdown, and category allocation.",
    },
  ],
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<Tab>("investors");

  return (
    <section id="how-it-works" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-3 font-display">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Three Steps. Fully On-Chain.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-display font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,212,255,0.25)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps[activeTab].map((step, i) => (
            <div key={step.title} className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-display font-bold text-primary">
                  0{i + 1}
                </span>
                <h3 className="font-display font-bold text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
