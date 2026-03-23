import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Listing } from "@/data/listings";
import { Badge } from "@/components/ui/badge";

function statusColor(s: string) {
  if (s === "LIVE") return "bg-success/20 text-success border-success/30";
  if (s === "UPCOMING") return "bg-primary/20 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
}

function categoryColor() {
  return "bg-secondary text-secondary-foreground border-border";
}

export function ListingCard({ listing }: { listing: Listing }) {
  const raised = listing.status === "LIVE" ? listing.raiseTarget * 0.62 : 0;
  const pct = listing.status === "LIVE" ? 62 : 0;

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
            {listing.logoEmoji}
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              {listing.name}
            </h3>
            <span className="text-sm text-muted-foreground">
              {listing.ticker}
            </span>
          </div>
        </div>
        <Badge variant="outline" className={statusColor(listing.status)}>
          {listing.status}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline" className={categoryColor()}>
          {listing.category}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {listing.ticker} — ${listing.tokenPrice}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Target Raise</span>
          <span className="font-medium text-foreground">
            ${listing.raiseTarget.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">TGE Date</span>
          <span className="font-medium text-foreground">{listing.tgeDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Release Info</span>
          <span className="font-medium text-foreground text-right">
            {listing.lockPeriodMonths}mo lock, {listing.releaseDurationMonths}mo
            release
          </span>
        </div>
      </div>

      {listing.status === "LIVE" && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Raised</span>
            <span className="text-primary">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <Link
        to={`/listing/${listing.id}`}
        className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20 group-hover:bg-primary group-hover:text-primary-foreground"
      >
        View Deal <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
