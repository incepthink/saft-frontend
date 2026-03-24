import { useState } from "react";
import { ArrowDown, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useWallet } from "@/contexts/WalletContext";
import type { Listing } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/utils/axiosInstance";

const USDC_BALANCE = 1000;

export function SwapCard({ listing }: { listing: Listing }) {
  const { isConnected, connect } = useWallet();
  const [tab, setTab] = useState<"BUY" | "SELL">("BUY");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: tokenBalance = 0 } = useQuery({
    queryKey: ["position", Number(listing.id)],
    queryFn: async () => {
      const res = await axiosInstance.get("/platform/user/position", {
        params: { safty_user_id: 1, safty_saft_id: Number(listing.id) },
      });
      const positions = res.data?.data?.positions ?? [];
      return (positions[0]?.balance as number) ?? 0;
    },
    enabled: isConnected,
  });

  const handleTabChange = (next: "BUY" | "SELL") => {
    setTab(next);
    setAmount("");
  };

  const val = parseFloat(amount) || 0;

  const tokensReceived = tab === "BUY" ? val / listing.tokenPrice : 0;
  const usdcReceived = tab === "SELL" ? val * listing.tokenPrice : 0;

  const handleSwap = async () => {
    if (tab === "BUY") {
      if (!val || val < listing.minInvestment || val > listing.maxInvestment) {
        toast.error(
          `Amount must be between $${listing.minInvestment.toLocaleString()} and $${listing.maxInvestment.toLocaleString()}`,
        );
        return;
      }
    } else {
      if (!val || val <= 0 || val > tokenBalance) {
        toast.error(
          tokenBalance <= 0
            ? `You have no ${listing.ticker} to sell`
            : `Amount exceeds your balance of ${tokenBalance.toLocaleString()} ${listing.ticker}`,
        );
        return;
      }
    }

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/platform/user/transact", {
        safty_user_id: 1,
        safty_saft_id: Number(listing.id),
        type: tab,
        amount: tab === "BUY" ? tokensReceived : val,
      });
      toast.success(data.message);
      setAmount("");
      queryClient.invalidateQueries({ queryKey: ["position"] });
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Transaction failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 glow-primary">
      {/* BUY / SELL tabs */}
      <div className="flex rounded-lg bg-muted p-1 mb-6">
        {(["BUY", "SELL"] as const).map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "SELL" ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <p className="text-lg font-semibold">Coming Soon...</p>
        </div>
      ) : (
      <div className="space-y-4">
        {/* You Pay */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            You Pay
          </label>
          <div className="rounded-lg border border-border bg-muted px-4 py-3 flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <span className="text-sm font-medium text-foreground shrink-0">
              {tab === "BUY" ? "USDC" : listing.ticker}
            </span>
          </div>
          {isConnected && (
            <p className="text-xs text-muted-foreground mt-1.5">
              Balance:{" "}
              {tab === "BUY"
                ? `${USDC_BALANCE.toLocaleString()} USDC`
                : `${tokenBalance.toLocaleString()} ${listing.ticker}`}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <div className="rounded-full border border-border bg-muted p-2">
            <ArrowDown className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* You Receive */}
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            You Receive
          </label>
          <div className="rounded-lg border border-border bg-muted px-4 py-3 flex items-center justify-between">
            <span className="text-foreground">
              {tab === "BUY"
                ? tokensReceived
                  ? tokensReceived.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })
                  : "0"
                : usdcReceived
                  ? usdcReceived.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
                  : "0"}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {tab === "BUY" ? listing.ticker : "USDC"}
            </span>
          </div>
        </div>

        {/* Rate & limits */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            Rate: 1 {listing.ticker} = ${listing.tokenPrice} USDC
          </div>
          {tab === "BUY" && (
            <div>
              Min: ${listing.minInvestment.toLocaleString()} · Max: $
              {listing.maxInvestment.toLocaleString()}
            </div>
          )}
        </div>

        {isConnected ? (
          <Button
            onClick={handleSwap}
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
          >
            {isLoading
              ? "Processing…"
              : tab === "BUY"
                ? `Buy ${listing.ticker}`
                : `Sell ${listing.ticker}`}
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
      )}
    </div>
  );
}
