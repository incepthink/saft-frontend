import { createContext, useContext, ReactNode, useMemo, useState, useCallback } from "react";
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

const DEMO_PARTY_ID =
  "demo-user::12200e2e2b3f4a5d6c7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f::1220abcdef1234567890abcdef1234567890";

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    setIsConnected(true);
  }, []);

  const disconnect = useCallback(async () => {
    setIsConnected(false);
  }, []);

  const partyId = isConnected ? DEMO_PARTY_ID : undefined;
  const truncatedPartyId = partyId ? truncatePartyId(partyId) : undefined;

  const value = useMemo(
    () => ({ connect, disconnect, isConnected, partyId, truncatedPartyId }),
    [connect, disconnect, isConnected, partyId, truncatedPartyId],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
