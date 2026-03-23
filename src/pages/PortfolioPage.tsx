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
import { Wallet, DollarSign, Layers, Calendar, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useWallet } from "@/contexts/WalletContext";
import { userPositions, listings } from "@/data/listings";
import { Button } from "@/components/ui/button";

function generateCombinedTimeline() {
  const months: { month: string; anime: number; nova: number }[] = [];
  const labels = [
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
  for (let y = 2025; y <= 2027; y++) {
    for (let m = 0; m < 12; m++) {
      const label = `${labels[m]} ${y}`;
      let anime = 0,
        nova = 0;
      // Simplified: anime releases start Feb 2026, nova starts Feb 2026
      const idx = (y - 2025) * 12 + m;
      if (idx >= 13 && idx <= 36) anime = Math.round((6000 * 0.9) / 24);
      if (idx >= 16 && idx <= 33) nova = Math.round((5000 * 0.85) / 18);
      months.push({ month: label, anime, nova });
    }
  }
  return months;
}

export default function PortfolioPage() {
  const { isConnected, connect } = useWallet();

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

  const timelineData = generateCombinedTimeline();

  const summaryCards = [
    { icon: DollarSign, label: "Total Invested", value: "$12,500" },
    { icon: Layers, label: "Active Positions", value: "2" },
    { icon: DollarSign, label: "Total Token Value", value: "$18,200" },
    { icon: Calendar, label: "Next Release", value: "15 Mar 2026" },
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
                {userPositions.map((pos) => {
                  const listing = listings.find((l) => l.id === pos.listingId);
                  return (
                    <tr
                      key={pos.listingId}
                      className="border-b border-border/50"
                    >
                      <td className="py-3 font-medium text-foreground">
                        {listing?.ticker}
                      </td>
                      <td className="py-3 text-foreground">
                        {pos.tokensHeld.toLocaleString()}
                      </td>
                      <td className="py-3 text-foreground">
                        {pos.stillLocked.toLocaleString()}
                      </td>
                      <td className="py-3 text-foreground">
                        {pos.nextReleaseDate}
                      </td>
                      <td className="py-3 text-foreground">
                        ${pos.estValue.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <Link
                          to={`/listing/${pos.listingId}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          View <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Combined Release Timeline */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display font-semibold text-lg mb-6">
            Combined Release Timeline
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timelineData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="animeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(193,100%,50%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(193,100%,50%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="novaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(142,71%,45%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(142,71%,45%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
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
                    name === "anime" ? "$ANIME" : "$NOVA",
                  ]}
                />
                <Legend
                  formatter={(v) => (v === "anime" ? "$ANIME" : "$NOVA")}
                />
                <Area
                  type="monotone"
                  dataKey="anime"
                  stackId="1"
                  stroke="hsl(193,100%,50%)"
                  fill="url(#animeGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="nova"
                  stackId="1"
                  stroke="hsl(142,71%,45%)"
                  fill="url(#novaGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
