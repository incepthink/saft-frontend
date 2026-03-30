import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import {
  listings,
  getHolders,
  generateUserReleaseSchedule,
  generateReleaseSchedule,
} from "@/data/listings";
import { Navbar } from "@/components/Navbar";
import { SwapCard } from "@/components/SwapCard";
import { useWallet } from "@/contexts/WalletContext";
import { axiosInstance } from "@/utils/axiosInstance";
import { ProjectDetails } from "@/components/listingDetail/ProjectDetails";
import { TokenDetails } from "@/components/listingDetail/TokenDetails";
import { TokenHolders } from "@/components/listingDetail/TokenHolders";
import { YourPosition } from "@/components/listingDetail/YourPosition";
import type { Listing as ComponentListing } from "@/lib/mock-data";

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

  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const tgeParts = listing.tgeDate.split(" ");
  const tgeMonthIdx = MONTH_NAMES.indexOf(tgeParts[0]);
  const tgeYear = parseInt(tgeParts[1]);

  const vestingSchedule = generateReleaseSchedule(listing).map((p) => {
    const absMonth = tgeMonthIdx + p.month;
    return {
      month: `${MONTH_NAMES[absMonth % 12]} ${tgeYear + Math.floor(absMonth / 12)}`,
      tokens: Math.round(totalUnderlyingTokens * p.cumulative / 100),
    };
  });

  const lockEndLabel = (() => {
    const absMonth = tgeMonthIdx + listing.lockPeriodMonths;
    return `${MONTH_NAMES[absMonth % 12]} ${tgeYear + Math.floor(absMonth / 12)}`;
  })();

  const componentListing: ComponentListing = {
    emoji: listing.logoEmoji,
    projectName: listing.name,
    description: listing.description,
    website: listing.website,
    category: listing.category,
    tgeDate: listing.tgeDate,
    ticker: listing.ticker,
    saftyTicker: listing.safty_ticker,
    status: listing.status,
    tokenPrice: `$${listing.tokenPrice}`,
    ratio: `1 ${listing.safty_ticker} = 100 ${listing.ticker}`,
    totalAllocation: totalSaftyTokens.toLocaleString(),
    acceptedToken: listing.acceptedCurrencies.join(", "),
    acceptedTokenLogo: "https://cdn.sushi.com/image/upload/f_auto,c_limit,w_32/d_unknown.png/tokens/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.jpg",
    saleSold: raisedSaftyTokens,
    saleTotal: totalSaftyTokens,
    salePercent: Math.min(100, Math.round((listing.amountRaised / listing.raiseTarget) * 100)),
    tgePercent: listing.tgeUnlockPercent,
    lockEndMonth: listing.lockPeriodMonths > 0 ? lockEndLabel : undefined,
    vestingSchedule,
    holders: holders.map((h) => ({
      wallet: h.partyId,
      isYou: !!partyId && h.partyId === partyId,
      tokens: h.tokens,
    })),
    userPosition: isConnected && tokensHeld !== null ? {
      tokensHeld,
      usdValue: estValue,
      nextRelease: {
        date: nextReleaseRow?.date ?? "—",
        saftyAmount: nextReleaseRow ? nextReleaseRow.tokensReleased.toLocaleString() : "—",
        tokenAmount: nextReleaseRow
          ? Math.round((nextReleaseRow.tokensReleased / tokensHeld) * totalUnderlyingTokens).toLocaleString()
          : "—",
      },
    } : undefined,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8 pt-24">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Explore
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 space-y-8 min-w-0">
            <ProjectDetails listing={componentListing} />
            <TokenDetails listing={componentListing} />
            <YourPosition listing={componentListing} />
            <TokenHolders listing={componentListing} />
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
