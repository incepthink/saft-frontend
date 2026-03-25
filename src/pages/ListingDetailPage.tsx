import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Info } from "lucide-react";
import {
  listings,
  getHolders,
  truncatePartyId,
  generateUserReleaseSchedule,
} from "@/data/listings";
import { Navbar } from "@/components/Navbar";
import { SwapCard } from "@/components/SwapCard";
import { VestingChart } from "@/components/VestingChart";
import { PriceChart } from "@/components/PriceChart";
import { useWallet } from "@/contexts/WalletContext";
import { Badge } from "@/components/ui/badge";
import { axiosInstance } from "@/utils/axiosInstance";

function statusColor(s: string) {
  if (s === "LIVE") return "bg-success/20 text-success border-success/30";
  if (s === "UPCOMING") return "bg-primary/20 text-primary border-primary/30";
  return "bg-muted text-muted-foreground border-border";
}

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);
  const { isConnected, partyId } = useWallet();

  const { data: apiBalance = null } = useQuery({
    queryKey: ["position", Number(id)],
    queryFn: async () => {
      const res = await axiosInstance.get("/platform/user/position", {
        params: { safty_user_id: 1, safty_saft_id: Number(id) },
      });
      const positions = res.data.data.positions as { balance: number }[];
      return positions[0]?.balance ?? null;
    },
    enabled: isConnected && !!listing,
  });

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

  const tokensHeld = apiBalance;
  const releaseSchedule =
    tokensHeld !== null ? generateUserReleaseSchedule(listing, tokensHeld) : [];

  // Derive position summary from release schedule
  const today = new Date();
  let alreadyReleased = 0;
  let nextReleaseDate = "—";
  for (const row of releaseSchedule) {
    const d = new Date(row.date.replace(/\s*\(TGE\)/, ""));
    if (d <= today) {
      alreadyReleased += row.tokensReleased;
    } else if (nextReleaseDate === "—" && row.tokensReleased > 0) {
      nextReleaseDate = row.date.replace(" (TGE)", "");
    }
  }
  const stillLocked =
    tokensHeld !== null ? Math.max(0, tokensHeld - alreadyReleased) : 0;
  const estValue =
    tokensHeld !== null ? Math.round(tokensHeld * listing.tokenPrice) : 0;

  const holders = getHolders(listing.id);

  const saftyTokenPrice = listing.tokenPrice * 100;
  const totalSaftyTokens = Math.round(listing.raiseTarget / saftyTokenPrice);
  const totalUnderlyingTokens = Math.round(
    listing.raiseTarget / listing.tokenPrice,
  );
  const raisedSaftyTokens = Math.round(listing.amountRaised / saftyTokenPrice);

  const nextReleaseRow = releaseSchedule.find((row) => {
    const d = new Date(row.date.replace(/\s*\(TGE\)/, ""));
    return d > today && row.tokensReleased > 0;
  });

  const projectStats = [
    { label: "Token", value: listing.ticker },
    // { label: "FDV", value: `$${listing.fdv.toLocaleString()}` },
    // { label: "Total Supply", value: listing.totalSupply.toLocaleString() },
    { label: "TGE Date", value: listing.tgeDate },
  ];

  const tokenStats = [
    { label: "Token", value: listing.safty_ticker },
    { label: "Token Price", value: `$${listing.tokenPrice}` },
    { label: `1 ${listing.safty_ticker}`, value: `100 ${listing.ticker}` },
    {
      label: "Total Allocation",
      value: `${totalSaftyTokens.toLocaleString()} ${listing.safty_ticker}`, //$${listing.raiseTarget.toLocaleString()} /
    },
    { label: "Accepted", value: listing.acceptedCurrencies.join(", ") },
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
            {/* Section A — Project Details */}
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
                {projectStats.map((s) => (
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

            {/* Section B — Token Details */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-lg mb-4">
                Token Details
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {tokenStats.map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between rounded-lg bg-muted px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground">
                      {s.label}
                    </span>
                    {s.label === "Token" ? (
                      <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                        {s.value}
                        {/* <span className="relative group">
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          <span className="invisible group-hover:visible absolute right-0 bottom-full mb-1.5 w-max max-w-[200px] rounded-md bg-popover border border-border px-2.5 py-1.5 text-xs text-foreground shadow-md z-10 whitespace-nowrap">
                            1 {listing.safty_ticker} = 100 {listing.ticker}
                          </span>
                        </span> */}
                      </span>
                    ) : s.label === "Token Price" ? (
                      <span className="text-sm font-semibold text-primary">
                        {s.value}
                      </span>
                    ) : s.label === "Accepted" ? (
                      <span className="flex items-center gap-1">
                        <img
                          src="https://cdn.sushi.com/image/upload/f_auto,c_limit,w_32/d_unknown.png/tokens/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.jpg"
                          alt="USDC"
                          className="h-5 w-5 rounded-full"
                        />
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {s.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Sale Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Sale Progress</span>
                  <span className="font-medium text-foreground">
                    {raisedSaftyTokens.toLocaleString()} /{" "}
                    {totalSaftyTokens.toLocaleString()} {listing.safty_ticker}
                  </span>
                </div>
                <div className="relative h-3 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.round((listing.amountRaised / listing.raiseTarget) * 100))}%`,
                      background:
                        "linear-gradient(90deg, hsl(193,70%,35%) 0%, hsl(193,100%,55%) 100%)",
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {Math.min(
                    100,
                    Math.round(
                      (listing.amountRaised / listing.raiseTarget) * 100,
                    ),
                  )}
                  % Filled
                </p>
              </div>

              <VestingChart
                listing={listing}
                userTokensHeld={tokensHeld ?? undefined}
              />
            </div>

            {/* Section B2 — Token Price Chart */}
            {/* <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-lg mb-4">
                Token Price — {listing.ticker}
              </h3>
              <PriceChart listing={listing} />
            </div> */}

            {/* Section C — Your Position */}
            {isConnected && tokensHeld !== null && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display font-semibold text-lg mb-4">
                  Your Position in {listing.safty_ticker}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Tokens Held
                    </div>
                    <div className="font-display font-bold text-lg">
                      {tokensHeld.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      USD Value
                    </div>
                    <div className="font-display font-bold text-lg">
                      ${estValue.toLocaleString()}
                    </div>
                  </div>
                  {/* <div className="rounded-lg bg-muted p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Still Locked
                    </div>
                    <div className="font-display font-bold text-lg">
                      {stillLocked.toLocaleString()}
                    </div>
                  </div> */}
                </div>

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
                        <th className="pb-2 text-muted-foreground font-medium text-center">
                          {listing.safty_ticker}
                        </th>
                        <th className="pb-2 text-muted-foreground font-medium text-center">
                          {listing.ticker} Released
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {nextReleaseRow && (
                        <tr className="border-b border-border/50">
                          <td className="py-2 text-foreground">
                            {nextReleaseRow.date}
                          </td>
                          <td className="py-2 text-foreground text-center">
                            {nextReleaseRow.tokensReleased.toLocaleString()}
                          </td>
                          <td className="py-2 text-foreground text-center">
                            {Math.round(
                              (nextReleaseRow.tokensReleased / tokensHeld!) *
                                totalUnderlyingTokens,
                            ).toLocaleString()}
                          </td>
                        </tr>
                      )}
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
                      {/* <th className="pb-2 text-muted-foreground font-medium">
                        % of Total
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {holders.map((h, i) => {
                      const isCurrentUser = !!partyId && h.partyId === partyId;
                      return (
                        <tr
                          key={i}
                          className={`border-b border-border/50 ${isCurrentUser ? "bg-primary/10 ring-1 ring-inset ring-primary/30" : ""}`}
                        >
                          <td className="py-2 font-mono text-foreground">
                            {truncatePartyId(h.partyId)}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs font-medium text-primary not-italic">
                                (You)
                              </span>
                            )}
                          </td>
                          <td className="py-2 text-foreground">
                            {h.tokens.toLocaleString()}
                          </td>
                          {/* <td className="py-2 text-foreground">
                            {h.percentOfTotal}%
                          </td> */}
                        </tr>
                      );
                    })}
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
