import { useState } from "react";
import { BarChart3, ChevronDown } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Listings */}
      <section className="container py-16 pt-24">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold">Active Deals</h2>
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">
            {listings.length} listings
          </span>
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
