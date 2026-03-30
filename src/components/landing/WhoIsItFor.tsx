import { TrendingUp, Building2, BarChart3 } from "lucide-react";

const cards = [
  {
    icon: TrendingUp,
    title: "Investors",
    desc: "Get pre-TGE allocations at a discount.",
  },
  {
    icon: Building2,
    title: "Projects",
    desc: "Raise capital without selling circulating supply.",
  },
  {
    icon: BarChart3,
    title: "Funds & DAOs",
    desc: "Manage vesting positions in one dashboard.",
  },
];

const WhoIsItFor = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">
        Built for Everyone in the Deal
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="glass-card-hover p-8 flex flex-col items-center text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <c.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold">{c.title}</h3>
            <p className="text-muted-foreground text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoIsItFor;
