import { useState, useRef } from "react";
import { TrendingUp, BarChart3, Zap, ChevronDown, ArrowRight } from "lucide-react";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/ListingCard";
import { Navbar } from "@/components/Navbar";

const categories = ["All", "DeFi", "GameFi", "Infra", "L1", "L2"] as const;
const sortOptions = ["Newest", "Raise Amount", "TGE Date"] as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80";

export default function ExplorePage() {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Newest");
  const listingsRef = useRef<HTMLElement>(null);

  const filtered = listings.filter(
    (l) => category === "All" || l.category === category,
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Raise Amount") return b.raiseTarget - a.raiseTarget;
    if (sort === "TGE Date") return a.tgeDate.localeCompare(b.tgeDate);
    return 0;
  });

  const totalRaise = listings.reduce((s, l) => s + l.raiseTarget, 0);

  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero — full screen */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/80" />

        {/* Radial cyan glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(193 100% 50% / 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Faint grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(193 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(193 100% 50%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container flex flex-col items-center text-center px-4">
          {/* Badge */}
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-8 animate-fade-in">
            <Zap className="h-3 w-3" />
            Powered by Canton Chain
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            The SAFT{" "}
            <span className="text-gradient">Marketplace.</span>
            <br />
            <span className="text-3xl md:text-5xl font-semibold text-muted-foreground">
              Institutional-grade token deals.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-muted-foreground text-lg mb-10 max-w-lg animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Browse and invest in pre-TGE token agreements with on-chain
            settlement backed by Canton Network.
          </p>

          {/* Stats */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-hover flex items-center gap-3 rounded-xl border border-border bg-card/60 backdrop-blur-sm px-6 py-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">
                  Total Raise Volume
                </div>
                <div className="font-display font-bold text-xl">
                  ${(totalRaise / 1e6).toFixed(1)}M
                </div>
              </div>
            </div>
            <div className="card-hover flex items-center gap-3 rounded-xl border border-border bg-card/60 backdrop-blur-sm px-6 py-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">
                  Active Listings
                </div>
                <div className="font-display font-bold text-xl">
                  {listings.length}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToListings}
            className="glow-primary flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Explore SAFTs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Scroll hint */}
        <button
          onClick={scrollToListings}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll to listings"
        >
          <ChevronDown className="h-6 w-6" />
        </button>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        />
      </section>

      {/* Listings */}
      <section ref={listingsRef} className="container py-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-2xl font-bold">Active Deals</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-secondary pl-4 pr-10 py-2 text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              {sortOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>
    </div>
  );
}
