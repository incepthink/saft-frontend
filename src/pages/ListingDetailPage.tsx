import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  listings,
  getHolders,
  userPositions,
  truncatePartyId,
  generateUserReleaseSchedule,
} from "@/data/listings";
import { Navbar } from "@/components/Navbar";
import { SwapCard } from "@/components/SwapCard";
import { VestingChart } from "@/components/VestingChart";
import { useWallet } from "@/contexts/WalletContext";
import { Badge } from "@/components/ui/badge";

function statusColor(s: string) {
  if (s === "LIVE") return "bg-success/20 text-success border-success/30";
  if (s === "UPCOMING") return "bg-primary/20 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
}

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);
  const { isConnected } = useWallet();

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">
            Listing not found
          </h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const holders = getHolders(listing.id);
  const position = userPositions.find((p) => p.listingId === listing.id);
  const releaseSchedule = position
    ? generateUserReleaseSchedule(listing, position.tokensHeld)
    : [];

  const stats = [
    { label: "Token", value: listing.ticker },
    { label: "Token Price", value: `$${listing.tokenPrice}` },
    { label: "FDV", value: `$${listing.fdv.toLocaleString()}` },
    { label: "Total Supply", value: listing.totalSupply.toLocaleString() },
    {
      label: "Target Raise",
      value: `$${listing.raiseTarget.toLocaleString()}`,
    },
    { label: "TGE Unlock", value: `${listing.tgeUnlockPercent}%` },
    { label: "Lock Period", value: `${listing.lockPeriodMonths} months` },
    {
      label: "Release Duration",
      value: `${listing.releaseDurationMonths} months`,
    },
    { label: "Accepted", value: listing.acceptedCurrencies.join(", ") },
    {
      label: "Min Investment",
      value: `$${listing.minInvestment.toLocaleString()}`,
    },
    {
      label: "Max Investment",
      value: `$${listing.maxInvestment.toLocaleString()}`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 space-y-8 min-w-0">
            {/* Section A — Project Info */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-3xl">
                  {listing.logoEmoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display text-2xl font-bold">
                      {listing.name}
                    </h1>
                    <Badge
                      variant="outline"
                      className={statusColor(listing.status)}
                    >
                      {listing.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-secondary text-secondary-foreground border-border"
                    >
                      {listing.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {listing.description}
                  </p>
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    {listing.website} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between rounded-lg bg-muted px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground">
                      {s.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B — Vesting Chart */}
            <VestingChart listing={listing} />

            {/* Section C — Your Position */}
            {isConnected && position && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display font-semibold text-lg mb-4">
                  Your Position in {listing.ticker} SAFT
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Tokens Held
                    </div>
                    <div className="font-display font-bold text-lg">
                      {position.tokensHeld.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      USD Value
                    </div>
                    <div className="font-display font-bold text-lg">
                      ${position.estValue.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Still Locked
                    </div>
                    <div className="font-display font-bold text-lg">
                      {position.stillLocked.toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Next Release: {position.nextReleaseDate} —{" "}
                  {position.nextReleaseAmount.toLocaleString()} tokens
                </p>

                <h4 className="font-semibold text-sm mb-3">
                  Your Release Schedule
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 text-muted-foreground font-medium">
                          Date
                        </th>
                        <th className="pb-2 text-muted-foreground font-medium">
                          Tokens Released
                        </th>
                        <th className="pb-2 text-muted-foreground font-medium">
                          Cumulative %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {releaseSchedule.slice(0, 10).map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-2 text-foreground">{row.date}</td>
                          <td className="py-2 text-foreground">
                            {row.tokensReleased.toLocaleString()}
                          </td>
                          <td className="py-2 text-foreground">
                            {row.cumulativePercent}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Section D — Holders */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-lg mb-1">
                Token Holders — {listing.ticker} SAFT
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Wallets holding SAFTY tokens for this deal
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 text-muted-foreground font-medium">
                        Wallet
                      </th>
                      <th className="pb-2 text-muted-foreground font-medium">
                        SAFTY Tokens
                      </th>
                      <th className="pb-2 text-muted-foreground font-medium">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {holders.map((h, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 font-mono text-foreground">
                          {truncatePartyId(h.partyId)}
                        </td>
                        <td className="py-2 text-foreground">
                          {h.tokens.toLocaleString()}
                        </td>
                        <td className="py-2 text-foreground">
                          {h.percentOfTotal}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column — sticky swap card */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="sticky top-24">
              <SwapCard listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
