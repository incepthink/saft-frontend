export type ListingStatus = "LIVE" | "UPCOMING" | "CLOSED";
export type Category = "DeFi" | "GameFi" | "Infra" | "L1" | "L2";

export interface Listing {
  id: string;
  name: string;
  ticker: string;
  category: Category;
  status: ListingStatus;
  tokenPrice: number;
  fdv: number;
  totalSupply: number;
  raiseTarget: number;
  minInvestment: number;
  maxInvestment: number;
  acceptedCurrencies: string[];
  tgeDate: string;
  tgeUnlockPercent: number;
  lockPeriodMonths: number;
  releaseDurationMonths: number;
  description: string;
  website: string;
  logoEmoji: string;
}

export interface Position {
  listingId: string;
  tokensHeld: number;
  stillLocked: number;
  nextReleaseDate: string;
  nextReleaseAmount: number;
  estValue: number;
}

export interface Holder {
  partyId: string;
  tokens: number;
  percentOfTotal: number;
}

export const listings: Listing[] = [
  {
    id: "1",
    name: "Anime Chain",
    ticker: "$ANIME",
    category: "GameFi",
    status: "LIVE",
    tokenPrice: 0.012,
    fdv: 120_000_000,
    totalSupply: 10_000_000_000,
    raiseTarget: 5_000_000,
    minInvestment: 500,
    maxInvestment: 50_000,
    acceptedCurrencies: ["USDC"],
    tgeDate: "Jul 2025",
    tgeUnlockPercent: 10,
    lockPeriodMonths: 6,
    releaseDurationMonths: 24,
    description:
      "Anime Chain powers the next generation of anime-based GameFi economies on Canton.",
    website: "https://animechain.io",
    logoEmoji: "🎌",
  },
  {
    id: "2",
    name: "NovaDeFi",
    ticker: "$NOVA",
    category: "DeFi",
    status: "UPCOMING",
    tokenPrice: 0.05,
    fdv: 50_000_000,
    totalSupply: 1_000_000_000,
    raiseTarget: 2_000_000,
    minInvestment: 250,
    maxInvestment: 25_000,
    acceptedCurrencies: ["USDC"],
    tgeDate: "Oct 2025",
    tgeUnlockPercent: 15,
    lockPeriodMonths: 3,
    releaseDurationMonths: 18,
    description:
      "NovaDeFi is a decentralized lending protocol built for institutional-grade liquidity.",
    website: "https://novadefi.xyz",
    logoEmoji: "🌟",
  },
];

export const userPositions: Position[] = [
  {
    listingId: "anime-chain",
    tokensHeld: 500_000,
    stillLocked: 450_000,
    nextReleaseDate: "Mar 2026",
    nextReleaseAmount: 18_750,
    estValue: 6_000,
  },
  {
    listingId: "novadefi",
    tokensHeld: 100_000,
    stillLocked: 85_000,
    nextReleaseDate: "Jan 2026",
    nextReleaseAmount: 4_722,
    estValue: 5_000,
  },
];

export const animeHolders: Holder[] = [
  { partyId: "alice::1234567890abcdef", tokens: 500_000, percentOfTotal: 10.0 },
  { partyId: "bob::abcdef0123456789", tokens: 1_200_000, percentOfTotal: 24.0 },
  { partyId: "carol::ef0123456789abcd", tokens: 750_000, percentOfTotal: 15.0 },
  { partyId: "dave::23456789abcdef01", tokens: 300_000, percentOfTotal: 6.0 },
  { partyId: "eve::6789abcdef012345", tokens: 180_000, percentOfTotal: 3.6 },
  { partyId: "frank::cdef0123456789ab", tokens: 920_000, percentOfTotal: 18.4 },
];

export const novaHolders: Holder[] = [
  { partyId: "alice::1234567890abcdef", tokens: 100_000, percentOfTotal: 5.0 },
  { partyId: "greg::89abcdef01234567", tokens: 400_000, percentOfTotal: 20.0 },
  { partyId: "helen::456789abcdef0123", tokens: 250_000, percentOfTotal: 12.5 },
];

export function getHolders(listingId: string): Holder[] {
  return listingId === "anime-chain" ? animeHolders : novaHolders;
}

export interface PriceCandle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const animePriceData: PriceCandle[] = [
  { date: "Aug 2024", open: 0.0055, high: 0.0068, low: 0.0050, close: 0.0063 },
  { date: "Sep 2024", open: 0.0063, high: 0.0075, low: 0.0058, close: 0.0070 },
  { date: "Oct 2024", open: 0.0070, high: 0.0082, low: 0.0064, close: 0.0078 },
  { date: "Nov 2024", open: 0.0078, high: 0.0095, low: 0.0072, close: 0.0088 },
  { date: "Dec 2024", open: 0.0088, high: 0.0110, low: 0.0081, close: 0.0102 },
  { date: "Jan 2025", open: 0.0102, high: 0.0130, low: 0.0094, close: 0.0115 },
  { date: "Feb 2025", open: 0.0115, high: 0.0125, low: 0.0090, close: 0.0095 },
  { date: "Mar 2025", open: 0.0095, high: 0.0112, low: 0.0085, close: 0.0108 },
  { date: "Apr 2025", open: 0.0108, high: 0.0140, low: 0.0100, close: 0.0135 },
  { date: "May 2025", open: 0.0135, high: 0.0155, low: 0.0118, close: 0.0120 },
  { date: "Jun 2025", open: 0.0120, high: 0.0138, low: 0.0105, close: 0.0130 },
  { date: "Jul 2025", open: 0.0130, high: 0.0148, low: 0.0115, close: 0.0120 },
];

export const novaPriceData: PriceCandle[] = [
  { date: "Nov 2024", open: 0.022, high: 0.028, low: 0.019, close: 0.026 },
  { date: "Dec 2024", open: 0.026, high: 0.035, low: 0.023, close: 0.032 },
  { date: "Jan 2025", open: 0.032, high: 0.042, low: 0.028, close: 0.038 },
  { date: "Feb 2025", open: 0.038, high: 0.048, low: 0.034, close: 0.044 },
  { date: "Mar 2025", open: 0.044, high: 0.052, low: 0.036, close: 0.040 },
  { date: "Apr 2025", open: 0.040, high: 0.055, low: 0.037, close: 0.051 },
  { date: "May 2025", open: 0.051, high: 0.060, low: 0.044, close: 0.048 },
  { date: "Jun 2025", open: 0.048, high: 0.058, low: 0.040, close: 0.054 },
  { date: "Jul 2025", open: 0.054, high: 0.065, low: 0.049, close: 0.062 },
  { date: "Aug 2025", open: 0.062, high: 0.072, low: 0.054, close: 0.058 },
  { date: "Sep 2025", open: 0.058, high: 0.068, low: 0.050, close: 0.064 },
  { date: "Oct 2025", open: 0.064, high: 0.075, low: 0.058, close: 0.050 },
];

export function getPriceData(listingId: string): PriceCandle[] {
  return listingId === "1" ? animePriceData : novaPriceData;
}

function generateCandlesticks(
  basePrice: number,
  days: number,
): { time: string; open: number; high: number; low: number; close: number }[] {
  const data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[] = [];
  let price = basePrice * 0.85;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const volatility = basePrice * 0.03;
    const drift = (basePrice - price) * 0.02;
    const open = price;
    const change1 = (Math.random() - 0.45) * volatility + drift;
    const close = open + change1;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    price = close;
    data.push({
      time: dateStr,
      open: +open.toFixed(6),
      high: +high.toFixed(6),
      low: +low.toFixed(6),
      close: +close.toFixed(6),
    });
  }
  return data;
}

export const CANDLESTICK_DATA: Record<
  string,
  { time: string; open: number; high: number; low: number; close: number }[]
> = Object.fromEntries(
  listings.map((l) => [l.id, generateCandlesticks(l.tokenPrice, 90)]),
);

export function truncatePartyId(partyId: string): string {
  const [hint, fingerprint] = partyId.split("::");
  if (!fingerprint) return partyId;
  return `${hint}::${fingerprint.slice(0, 4)}...${fingerprint.slice(-4)}`;
}

export function generateReleaseSchedule(listing: Listing) {
  const points: { month: number; cumulative: number }[] = [];
  const tgePercent = listing.tgeUnlockPercent;
  const lockEnd = listing.lockPeriodMonths;
  const releaseEnd = lockEnd + listing.releaseDurationMonths;
  const remainingPercent = 100 - tgePercent;
  const monthlyRelease = remainingPercent / listing.releaseDurationMonths;

  for (let m = 0; m <= releaseEnd + 2; m++) {
    if (m === 0) {
      points.push({ month: m, cumulative: tgePercent });
    } else if (m <= lockEnd) {
      points.push({ month: m, cumulative: tgePercent });
    } else {
      const monthsReleasing = m - lockEnd;
      const released = Math.min(
        tgePercent + monthlyRelease * monthsReleasing,
        100,
      );
      points.push({ month: m, cumulative: parseFloat(released.toFixed(2)) });
    }
  }
  return points;
}

export function generateUserReleaseSchedule(
  listing: Listing,
  totalTokens: number,
) {
  const rows: {
    date: string;
    tokensReleased: number;
    cumulativePercent: number;
  }[] = [];
  const tgeTokens = Math.round((totalTokens * listing.tgeUnlockPercent) / 100);
  const remaining = totalTokens - tgeTokens;
  const monthlyTokens = Math.round(remaining / listing.releaseDurationMonths);

  const tgeMonthNames: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const tgeParts = listing.tgeDate.split(" ");
  const tgeMonthIdx = tgeMonthNames[tgeParts[0]] ?? 6;
  const tgeYear = parseInt(tgeParts[1]) || 2025;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let cumTokens = 0;

  // TGE
  cumTokens += tgeTokens;
  rows.push({
    date: `${monthNames[tgeMonthIdx]} ${tgeYear} (TGE)`,
    tokensReleased: tgeTokens,
    cumulativePercent: parseFloat(((cumTokens / totalTokens) * 100).toFixed(2)),
  });

  // Lock period
  for (let i = 1; i <= listing.lockPeriodMonths; i++) {
    const mIdx = (tgeMonthIdx + i) % 12;
    const yr = tgeYear + Math.floor((tgeMonthIdx + i) / 12);
    rows.push({
      date: `${monthNames[mIdx]} ${yr}`,
      tokensReleased: 0,
      cumulativePercent: parseFloat(
        ((cumTokens / totalTokens) * 100).toFixed(2),
      ),
    });
  }

  // Release period
  for (let i = 1; i <= listing.releaseDurationMonths; i++) {
    const offset = listing.lockPeriodMonths + i;
    const mIdx = (tgeMonthIdx + offset) % 12;
    const yr = tgeYear + Math.floor((tgeMonthIdx + offset) / 12);
    const tokens =
      i === listing.releaseDurationMonths
        ? totalTokens - cumTokens
        : monthlyTokens;
    cumTokens += tokens;
    rows.push({
      date: `${monthNames[mIdx]} ${yr}`,
      tokensReleased: tokens,
      cumulativePercent: parseFloat(
        ((cumTokens / totalTokens) * 100).toFixed(2),
      ),
    });
  }

  return rows;
}
