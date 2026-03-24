import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Wallet,
  DollarSign,
  Layers,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useWallet } from "@/contexts/WalletContext";
import { listings, generateUserReleaseSchedule } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/utils/axiosInstance";

interface ApiSaft {
  id: number;
  slug: string;
  projectName: string;
  ticker: string;
  category: string;
  status: string;
  tokenPrice: number;
}

interface ApiPosition {
  id: number;
  safty_user_id: number;
  safty_saft_id: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
  safty_saft: ApiSaft;
}

function parseScheduleDate(dateStr: string): Date {
  return new Date(dateStr.replace(/\s*\(TGE\)/, ""));
}

function derivePositionRow(pos: ApiPosition) {
  const listing = listings.find((l) => l.id === String(pos.safty_saft_id));
  const ticker = pos.safty_saft.ticker;
  const tokenPrice = pos.safty_saft.tokenPrice;
  const tokensHeld = pos.balance;
  const estValue = Math.round(tokensHeld * tokenPrice);

  if (!listing) {
    return {
      listingId: String(pos.safty_saft_id),
      ticker,
      tokensHeld,
      stillLocked: tokensHeld,
      nextReleaseDate: "—",
      nextReleaseAmount: 0,
      estValue,
    };
  }

  const schedule = generateUserReleaseSchedule(listing, tokensHeld);
  const today = new Date();

  let alreadyReleased = 0;
  let nextReleaseDate = "—";
  let nextReleaseAmount = 0;

  for (const row of schedule) {
    const d = parseScheduleDate(row.date);
    if (d <= today) {
      alreadyReleased += row.tokensReleased;
    } else if (nextReleaseDate === "—" && row.tokensReleased > 0) {
      nextReleaseDate = row.date.replace(" (TGE)", "");
      nextReleaseAmount = row.tokensReleased;
    }
  }

  return {
    listingId: String(pos.safty_saft_id),
    ticker,
    tokensHeld,
    stillLocked: Math.max(0, tokensHeld - alreadyReleased),
    nextReleaseDate,
    nextReleaseAmount,
    estValue,
  };
}

function buildTimelineData(positions: ApiPosition[]) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const months: Record<string, Record<string, number>> = {};

  for (let y = 2025; y <= 2027; y++) {
    for (const m of monthNames) {
      months[`${m} ${y}`] = {};
    }
  }

  // Track running cumulative per ticker
  const cumulative: Record<string, number> = {};

  for (const pos of positions) {
    const listing = listings.find((l) => l.id === String(pos.safty_saft_id));
    if (!listing) continue;
    const key = pos.safty_saft.ticker.replace("$", "").toLowerCase();
    const schedule = generateUserReleaseSchedule(listing, pos.balance);

    for (const row of schedule) {
      const label = row.date.replace(" (TGE)", "");
      if (months[label] !== undefined) {
        const delta = Math.round(row.tokensReleased * pos.safty_saft.tokenPrice);
        cumulative[key] = (cumulative[key] ?? 0) + delta;
        months[label][key] = (months[label][key] ?? 0) + cumulative[key];
      }
    }
  }

  // Forward-fill months with no new releases so the line stays continuous
  const monthKeys = Object.keys(months);
  const tickerSet = new Set(Object.values(months).flatMap((v) => Object.keys(v)));
  const lastVal: Record<string, number> = {};
  for (const m of monthKeys) {
    for (const t of tickerSet) {
      if (months[m][t] !== undefined) {
        lastVal[t] = months[m][t];
      } else if (lastVal[t] !== undefined) {
        months[m][t] = lastVal[t];
      }
    }
  }

  return Object.entries(months).map(([month, vals]) => ({ month, ...vals }));
}

const CHART_COLORS = [
  "hsl(193,100%,50%)",
  "hsl(142,71%,45%)",
  "hsl(35,100%,55%)",
  "hsl(280,80%,60%)",
];

export default function PortfolioPage() {
  const { isConnected, connect } = useWallet();
  const { data: apiPositions = [], isLoading: loading, isError } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/platform/user/position", {
        params: { safty_user_id: 1 },
      });
      return res.data.data.positions as ApiPosition[];
    },
    enabled: isConnected,
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-32 text-center">
          <Wallet className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-display text-2xl font-bold mb-3">
            Connect Your Wallet
          </h1>
          <p className="text-muted-foreground mb-8">
            Connect your Canton wallet to view your portfolio.
          </p>
          <Button
            onClick={connect}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            <Wallet className="h-4 w-4" /> Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  const derivedRows = apiPositions.map(derivePositionRow);

  const totalInvested = apiPositions.reduce(
    (sum, p) => sum + p.balance * p.safty_saft.tokenPrice,
    0,
  );
  const totalTokenValue = totalInvested;
  const activePositions = apiPositions.length;

  const allNextDates = derivedRows
    .map((r) => r.nextReleaseDate)
    .filter((d) => d !== "—")
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const nextRelease = allNextDates[0] ?? "—";

  const summaryCards = [
    {
      icon: DollarSign,
      label: "Total Invested",
      value: loading ? "—" : `$${Math.round(totalInvested).toLocaleString()}`,
    },
    {
      icon: Layers,
      label: "Active Positions",
      value: loading ? "—" : String(activePositions),
    },
    {
      icon: DollarSign,
      label: "Total Token Value",
      value: loading
        ? "—"
        : `$${Math.round(totalTokenValue).toLocaleString()}`,
    },
    {
      icon: Calendar,
      label: "Next Release",
      value: loading ? "—" : nextRelease,
    },
  ];

  const timelineData = buildTimelineData(apiPositions);
  const tickerKeys = [
    ...new Set(
      apiPositions.map((p) => p.safty_saft.ticker.replace("$", "").toLowerCase()),
    ),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Portfolio</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <c.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{c.label}</span>
              </div>
              <div className="font-display font-bold text-xl">{c.value}</div>
            </div>
          ))}
        </div>

        {/* Positions Table */}
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <h2 className="font-display font-semibold text-lg mb-4">
            My Positions
          </h2>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading positions…
            </div>
          ) : isError ? (
            <p className="text-destructive text-sm py-4">{isError}</p>
          ) : derivedRows.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">
              No positions found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-muted-foreground font-medium">
                      Project
                    </th>
                    <th className="pb-3 text-muted-foreground font-medium">
                      Tokens Held
                    </th>
                    <th className="pb-3 text-muted-foreground font-medium">
                      Still Locked
                    </th>
                    <th className="pb-3 text-muted-foreground font-medium">
                      Next Release
                    </th>
                    <th className="pb-3 text-muted-foreground font-medium">
                      Est. Value
                    </th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {derivedRows.map((row) => (
                    <tr
                      key={row.listingId}
                      className="border-b border-border/50"
                    >
                      <td className="py-3 font-medium text-foreground">
                        {row.ticker}
                      </td>
                      <td className="py-3 text-foreground">
                        {row.tokensHeld.toLocaleString()}
                      </td>
                      <td className="py-3 text-foreground">
                        {row.stillLocked.toLocaleString()}
                      </td>
                      <td className="py-3 text-foreground">
                        {row.nextReleaseDate}
                      </td>
                      <td className="py-3 text-foreground">
                        ${row.estValue.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <Link
                          to={`/listing/${row.listingId}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          View <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Combined Release Timeline */}
        {!loading && !isError && tickerKeys.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display font-semibold text-lg mb-6">
              Cumulative Token Value Unlocked
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timelineData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    {tickerKeys.map((key, i) => (
                      <linearGradient
                        key={key}
                        id={`grad-${key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={CHART_COLORS[i % CHART_COLORS.length]}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={CHART_COLORS[i % CHART_COLORS.length]}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(0,0%,16%)"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(0,0%,55%)"
                    fontSize={11}
                    interval={5}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="hsl(0,0%,55%)"
                    fontSize={12}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0,0%,8.6%)",
                      border: "1px solid hsl(0,0%,16%)",
                      borderRadius: "8px",
                      color: "hsl(0,0%,95%)",
                    }}
                    formatter={(v: number, name: string) => [
                      `$${v}`,
                      `$${name.toUpperCase()}`,
                    ]}
                  />
                  <Legend formatter={(v) => `$${v.toUpperCase()}`} />
                  {tickerKeys.map((key, i) => (
                    <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stackId="1"
                      stroke={CHART_COLORS[i % CHART_COLORS.length]}
                      fill={`url(#grad-${key})`}
                      strokeWidth={2}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
