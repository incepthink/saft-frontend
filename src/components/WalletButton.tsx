import { useState, useRef, useEffect } from "react";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";

export function WalletButton() {
  const { connect, disconnect, isConnected, truncatedPartyId } = useWallet();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm transition-colors hover:bg-muted"
      >
        <span className="h-2 w-2 rounded-full bg-success" />
        <span className="font-mono text-foreground">{truncatedPartyId}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card p-1 shadow-xl z-50">
          <button
            onClick={() => {
              disconnect();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
