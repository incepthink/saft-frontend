import { createContext, useContext, ReactNode, useMemo } from "react";
import { useConnect } from "@/hooks/useConnect";
import { useAccounts } from "@/hooks/useAccounts";
import { truncatePartyId } from "@/data/listings";

interface WalletContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  isConnected: boolean;
  partyId?: string;
  truncatedPartyId?: string;
}

const WalletContext = createContext<WalletContextType>({
  connect: async () => {},
  disconnect: async () => {},
  isConnected: false,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const { connect, disconnect, connectResult } = useConnect();
  const accounts = useAccounts(connectResult);

  const isConnected = connectResult?.isConnected ?? false;
  const primaryAccount = accounts?.find((a) => a.primary) ?? accounts?.[0];
  const partyId = primaryAccount?.partyId;
  const truncatedId = partyId ? truncatePartyId(partyId) : undefined;

  const value = useMemo(
    () => ({
      connect,
      disconnect,
      isConnected,
      partyId,
      truncatedPartyId: truncatedId,
    }),
    [connect, disconnect, isConnected, partyId, truncatedId],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
