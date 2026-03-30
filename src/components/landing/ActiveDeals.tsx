import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const deals = [
  {
    emoji: "🎮",
    name: "Anime Chain",
    ticker: "$ANIME",
    saftyTicker: "$stANIME",
    category: "GameFi",
    status: "LIVE" as const,
    price: "$0.012",
    tge: "Jul 2025",
    min: "$1,000",
    progress: 62,
  },
  {
    emoji: "💎",
    name: "NovaDeFi",
    ticker: "$NOVA",
    saftyTicker: "$stNOVA",
    category: "DeFi",
    status: "UPCOMING" as const,
    price: "$0.05",
    tge: "Sep 2025",
    min: "$5,000",
    progress: null,
  },
  {
    emoji: "⚡",
    name: "QuantumLayer",
    ticker: "$QLYR",
    saftyTicker: "$stQLYR",
    category: "L2",
    status: "LIVE" as const,
    price: "$0.008",
    tge: "Aug 2025",
    min: "$2,500",
    progress: 38,
  },
];

const ActiveDeals = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Active Deals
          </h2>
          <p className="text-muted-foreground mt-3">
            Browse pre-TGE token offerings currently available on SAFTY.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {deals.map((deal) => (
            <div key={deal.name} className="glass-card-hover p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {deal.emoji}
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm">
                      {deal.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deal.ticker} → {deal.saftyTicker}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                    deal.status === "LIVE"
                      ? "bg-primary/15 text-primary border-primary/25"
                      : "bg-muted/50 text-muted-foreground border-border"
                  }`}
                >
                  {deal.status}
                </span>
              </div>

              {/* Category badge */}
              <span className="inline-block px-2.5 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                {deal.category}
              </span>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Token Price</p>
                  <p className="font-display font-semibold text-primary">
                    {deal.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">TGE Date</p>
                  <p className="font-display font-semibold text-foreground">
                    {deal.tge}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Min. Investment
                  </p>
                  <p className="font-display font-semibold text-foreground">
                    {deal.min}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              {deal.progress !== null && (
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">
                      Raise Progress
                    </span>
                    <span className="text-primary font-medium">
                      {deal.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${deal.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                to="/explore"
                className="flex items-center gap-1.5 text-primary text-sm font-medium hover:gap-2.5 transition-all pt-1"
              >
                View Deal <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="cyan-outline" size="lg" asChild>
            <Link to="/explore">
              View All Deals <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActiveDeals;
