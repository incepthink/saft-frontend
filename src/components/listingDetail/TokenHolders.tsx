import type { Listing } from "@/lib/mock-data";
import { truncatePartyId, formatNumber } from "@/lib/mock-data";

interface TokenHoldersProps {
  listing: Listing;
}

export function TokenHolders({ listing }: TokenHoldersProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div>
        <h2 className="font-display font-semibold text-lg text-foreground">
          Token Holders — {listing.ticker} SAFT
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Wallets holding SAFTY tokens for this deal
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground py-2.5 pr-4 w-10">
                #
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground py-2.5 pr-4">
                Wallet
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground py-2.5">
                SAFTY Tokens
              </th>
            </tr>
          </thead>
          <tbody>
            {listing.holders.map((holder, index) => (
              <tr
                key={holder.wallet}
                className={`border-b border-border/30 transition-colors ${
                  holder.isYou
                    ? "bg-primary/5 ring-1 ring-inset ring-primary/20 rounded"
                    : "hover:bg-muted/30"
                }`}
              >
                <td className="py-3 pr-4 text-xs text-muted-foreground font-mono">
                  {index + 1}
                </td>
                <td className="py-3 pr-4">
                  <span className="font-mono text-sm text-foreground">
                    {truncatePartyId(holder.wallet)}
                  </span>
                  {holder.isYou && (
                    <span className="ml-2 text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      You
                    </span>
                  )}
                </td>
                <td className="py-3 text-right font-medium text-foreground font-display">
                  {formatNumber(holder.tokens)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
