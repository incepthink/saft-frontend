import { FileCheck, Eye, DollarSign, Coins } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "On-Chain SAFT Agreements",
    description:
      "Every deal is a legally-structured SAFT enforced by smart contracts on Canton Network. No counterparty risk.",
  },
  {
    icon: Eye,
    title: "Transparent Vesting",
    description:
      "Full visibility into cliff periods, release schedules, and TGE unlock percentages. Know exactly when tokens vest.",
  },
  {
    icon: DollarSign,
    title: "USDC Settlement",
    description:
      "All deals settle in USDC. No native token required. Real-time stablecoin settlement with zero escrow.",
  },
  {
    icon: Coins,
    title: "SAFTY Token Wrapping",
    description:
      "Your SAFT position is represented as a SAFTY token (e.g. $stANIME). Track, transfer, and eventually trade your locked position.",
  },
];

const VestingChart = () => {
  const points = [
    { x: 0, y: 0 },
    { x: 10, y: 0 }, // cliff
    { x: 10, y: 10 }, // TGE unlock
    { x: 20, y: 10 },
    { x: 20, y: 20 },
    { x: 35, y: 20 },
    { x: 35, y: 35 },
    { x: 50, y: 35 },
    { x: 50, y: 50 },
    { x: 65, y: 50 },
    { x: 65, y: 70 },
    { x: 80, y: 70 },
    { x: 80, y: 85 },
    { x: 100, y: 85 },
    { x: 100, y: 100 },
  ];

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * 3.2} ${160 - p.y * 1.5}`)
    .join(" ");
  const areaD = pathD + ` L 320 160 L 0 160 Z`;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-display font-bold text-foreground">
            Vesting Schedule
          </p>
          <p className="text-xs text-muted-foreground">
            $stANIME • 24 month linear vest
          </p>
        </div>
        <span className="text-primary font-display font-bold text-sm">
          100%
        </span>
      </div>
      <svg viewBox="0 0 320 170" className="w-full">
        <defs>
          <linearGradient id="vestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="hsl(193, 100%, 50%)"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="hsl(193, 100%, 50%)"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((v) => (
          <line
            key={v}
            x1="0"
            y1={160 - v * 1.5}
            x2="320"
            y2={160 - v * 1.5}
            stroke="hsl(0, 0%, 16%)"
            strokeWidth="0.5"
          />
        ))}
        <path d={areaD} fill="url(#vestGrad)" />
        <path
          d={pathD}
          fill="none"
          stroke="hsl(193, 100%, 50%)"
          strokeWidth="2"
        />
        {/* Labels */}
        <text
          x="0"
          y="175"
          fill="hsl(0,0%,55%)"
          fontSize="9"
          fontFamily="Inter"
        >
          TGE
        </text>
        <text
          x="140"
          y="175"
          fill="hsl(0,0%,55%)"
          fontSize="9"
          fontFamily="Inter"
          textAnchor="middle"
        >
          12m
        </text>
        <text
          x="300"
          y="175"
          fill="hsl(0,0%,55%)"
          fontSize="9"
          fontFamily="Inter"
          textAnchor="end"
        >
          24m
        </text>
      </svg>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-3 font-display">
            Why SAFTY?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Institutional Infrastructure. DeFi Speed.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          <VestingChart />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
