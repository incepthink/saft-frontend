import { useState } from "react";
import { ArrowDown, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/contexts/WalletContext";
import type { Listing } from "@/data/listings";
import { Button } from "@/components/ui/button";

export function SwapCard({ listing }: { listing: Listing }) {
  const { isConnected, connect } = useWallet();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(listing.acceptedCurrencies[0]);

  const tokensReceived = amount ? parseFloat(amount) / listing.tokenPrice : 0;

  const handleSwap = () => {
    const val = parseFloat(amount);
    if (!val || val < listing.minInvestment || val > listing.maxInvestment) {
      toast.error(
        `Amount must be between $${listing.minInvestment.toLocaleString()} and $${listing.maxInvestment.toLocaleString()}`,
      );
      return;
    }
    toast.success("Transaction submitted!");
    setAmount("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 glow-primary">
      <h3 className="font-display font-semibold text-lg mb-6">
        Invest in {listing.ticker}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            You Pay
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 rounded-lg border border-border bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-3 text-foreground focus:border-primary focus:outline-none"
            >
              {listing.acceptedCurrencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="rounded-full border border-border bg-muted p-2">
            <ArrowDown className="h-4 w-4 text-primary" />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            You Receive
          </label>
          <div className="rounded-lg border border-border bg-muted px-4 py-3 text-foreground">
            {tokensReceived
              ? tokensReceived.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })
              : "0"}{" "}
            <span className="text-muted-foreground">{listing.ticker}</span>
          </div>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            Rate: 1 {listing.ticker} = ${listing.tokenPrice} {currency}
          </div>
          <div>
            Min: ${listing.minInvestment.toLocaleString()} · Max: $
            {listing.maxInvestment.toLocaleString()}
          </div>
        </div>

        {isConnected ? (
          <Button
            onClick={handleSwap}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
          >
            Swap
          </Button>
        ) : (
          <Button
            onClick={connect}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold gap-2"
          >
            <Wallet className="h-4 w-4" /> Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
}
