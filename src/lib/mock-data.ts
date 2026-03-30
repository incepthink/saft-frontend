export interface VestingPoint {
  month: string;
  tokens: number;
}

export interface HolderEntry {
  wallet: string;
  isYou: boolean;
  tokens: number;
}

export interface UserPosition {
  tokensHeld: number;
  usdValue: number;
  nextRelease: {
    date: string;
    saftyAmount: string;
    tokenAmount: string;
  };
}

export interface Listing {
  // ProjectDetails fields
  emoji: string;
  projectName: string;
  description: string;
  website: string;
  category: string;
  tgeDate: string;
  // TokenDetails / shared fields
  ticker: string;
  saftyTicker: string;
  status: string;
  tokenPrice: string;
  ratio: string;
  totalAllocation: string;
  acceptedToken: string;
  acceptedTokenLogo: string;
  saleSold: number;
  saleTotal: number;
  salePercent: number;
  tgePercent: number;
  lockEndMonth?: string;
  vestingSchedule: VestingPoint[];
  holders: HolderEntry[];
  userPosition?: UserPosition;
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export { truncatePartyId } from "@/data/listings";
