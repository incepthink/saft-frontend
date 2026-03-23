import { useState } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import { listings } from "@/data/listings";
import { ListingCard } from "@/components/ListingCard";
import { Navbar } from "@/components/Navbar";

const categories = ["All", "DeFi", "GameFi", "Infra", "L1", "L2"] as const;
const sortOptions = ["Newest", "Raise Amount", "TGE Date"] as const;

export default function ExplorePage() {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Newest");

  const filtered = listings.filter(
    (l) => category === "All" || l.category === category,
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Raise Amount") return b.raiseTarget - a.raiseTarget;
    if (sort === "TGE Date") return a.tgeDate.localeCompare(b.tgeDate);
    return 0;
  });

  const totalRaise = listings.reduce((s, l) => s + l.raiseTarget, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container py-16 md:py-24 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          The SAFT Marketplace.{" "}
          <span className="text-gradient">Backed by Canton Chain.</span>
        </h1>
        <p
          className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Browse and invest in token deals with institutional-grade settlement.
        </p>
        <div
          className="flex justify-center gap-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4">
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
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4">
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
      </section>

      {/* Filters */}
      <section className="container pb-16">
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
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
          >
            {sortOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
