import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Listing } from "@/lib/mock-data";

interface ProjectDetailsProps {
  listing: Listing;
}

const statusVariant = (status: string) => {
  switch (status) {
    case "LIVE":
      return "live" as const;
    case "UPCOMING":
      return "upcoming" as const;
    default:
      return "ended" as const;
  }
};

export function ProjectDetails({ listing }: ProjectDetailsProps) {
  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Subtle gradient highlight at top */}
      <div className="bg-gradient-card-highlight p-6 pb-5">
        <div className="flex items-start gap-5">
          {/* Logo — larger, glowing border */}
          <div className="relative flex-shrink-0">
            <div className="h-[72px] w-[72px] rounded-2xl bg-secondary flex items-center justify-center text-4xl ring-1 ring-border shadow-lg">
              {listing.emoji}
            </div>
            {listing.status === "LIVE" && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success ring-2 ring-card animate-pulse-glow" />
            )}
          </div>

          {/* Title + badges + description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
                {listing.projectName}
              </h1>
              <Badge variant={statusVariant(listing.status)}>
                {listing.status}
              </Badge>
              <Badge variant="category">{listing.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {listing.description}
            </p>
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent-foreground transition-colors"
            >
              {listing.website}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Compact stat strip */}
      <div className="border-t border-border bg-muted/40 px-6 py-3 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Token</span>
          <span className="font-medium font-display text-foreground">
            {listing.ticker}
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">TGE</span>
          <span className="font-medium font-display text-foreground">
            {listing.tgeDate}
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Price</span>
          <span className="font-semibold font-display text-primary">
            {listing.tokenPrice}
          </span>
        </div>
      </div>
    </section>
  );
}
