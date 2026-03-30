import { Clock, Coins } from "lucide-react";
import type { Listing } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";

interface YourPositionProps {
  listing: Listing;
}

export function YourPosition({ listing }: YourPositionProps) {
  const pos = listing.userPosition;
  if (!pos) return null;

  return (
    <section className="rounded-xl border border-primary/20 bg-card overflow-hidden glow-primary">
      {/* Header with gradient accent */}
      <div className="bg-gradient-card-highlight px-6 pt-5 pb-4 border-b border-border">
        <h2 className="font-display font-semibold text-lg text-foreground">
          Your Position in{" "}
          <span className="text-primary">{listing.saftyTicker}</span>
        </h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Position cards — two big stat cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-muted/60 border border-border p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="h-3.5 w-3.5" />
              <span className="text-xs">Tokens Held</span>
            </div>
            <p className="font-display font-bold text-2xl text-foreground">
              {formatNumber(pos.tokensHeld)}
            </p>
            <p className="text-xs text-muted-foreground">
              {listing.saftyTicker}
            </p>
          </div>
          <div className="rounded-xl bg-muted/60 border border-border p-4 space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              {/* <span className="text-xs">💰</span> */}
              <span className="text-xs">USD Value</span>
            </div>
            <p className="font-display font-bold text-2xl text-foreground">
              ${formatNumber(pos.usdValue)}
            </p>
            <p className="text-xs text-muted-foreground">at current price</p>
          </div>
        </div>

        {/* Next unlock — prominent callout */}
        <div className="rounded-xl bg-accent/10 border border-primary/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">
              Next Token Release
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5">
                Date
              </span>
              <span className="text-sm font-medium text-foreground">
                {pos.nextRelease.date}
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5">
                {listing.saftyTicker}
              </span>
              <span className="text-sm font-medium text-primary">
                {pos.nextRelease.saftyAmount}
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-0.5">
                {listing.ticker} Released
              </span>
              <span className="text-sm font-medium text-foreground">
                {pos.nextRelease.tokenAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
