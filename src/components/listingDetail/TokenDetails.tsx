import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { Listing } from "@/lib/mock-data";
import { formatNumber } from "@/lib/mock-data";

interface TokenDetailsProps {
  listing: Listing;
}

function formatYAxis(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return String(value);
}

export function TokenDetails({ listing }: TokenDetailsProps) {
  const salePercent = listing.salePercent;

  return (
    <section className="rounded-xl border border-border bg-card p-6 space-y-6">
      <h2 className="font-display font-semibold text-lg text-foreground">
        Token Details
      </h2>

      {/* Stats grid — refined */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatPill label="Token" value={listing.saftyTicker} />
        <StatPill label="Token Price" value={listing.tokenPrice} highlight />
        <StatPill label="Ratio" value={listing.ratio} />
        <StatPill
          label="Total Allocation"
          value={`${listing.totalAllocation} ${listing.saftyTicker}`}
        />
        <StatPill
          label="Accepted"
          value={
            <span className="flex items-center gap-2">
              <img
                src={listing.acceptedTokenLogo}
                alt={listing.acceptedToken}
                className="h-5 w-5 rounded-full"
              />
              {listing.acceptedToken}
            </span>
          }
        />
      </div>

      {/* Sale Progress — prominent */}
      <div className="rounded-lg bg-muted/60 border border-border p-4 space-y-3">
        <div className="flex items-end justify-between">
          <span className="text-sm font-medium text-foreground">
            Sale Progress
          </span>
          <span className="text-sm font-display font-semibold text-foreground">
            {formatNumber(listing.saleSold)}
            <span className="text-muted-foreground font-normal">
              {" "}
              / {formatNumber(listing.saleTotal)} {listing.saftyTicker}
            </span>
          </span>
        </div>
        <div className="relative h-4 rounded-full bg-muted border border-border overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-sale transition-all duration-700"
            style={{ width: `${salePercent}%` }}
          />
          {/* Shimmer effect on active sale */}
          {listing.status === "LIVE" && salePercent < 100 && (
            <div
              className="absolute inset-y-0 left-0 rounded-full opacity-30 animate-shimmer"
              style={{
                width: `${salePercent}%`,
                backgroundImage:
                  "linear-gradient(90deg, transparent, hsl(193 100% 80% / 0.4), transparent)",
                backgroundSize: "200% 100%",
              }}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {salePercent}% Filled
          </span>
          <span className="text-xs text-muted-foreground">
            {formatNumber(listing.saleTotal - listing.saleSold)} remaining
          </span>
        </div>
      </div>

      {/* Vesting Chart */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-0.5">
            Vesting Schedule
          </h3>
          <p className="text-xs text-muted-foreground">
            Tokens unlock gradually after TGE ({listing.tgePercent}% at launch).
            Full vesting completes by{" "}
            {listing.vestingSchedule[listing.vestingSchedule.length - 1]?.month}
            .
          </p>
        </div>
        <div className="rounded-lg bg-muted/40 border border-border p-4">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={listing.vestingSchedule}
              margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="vestingFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(142, 71%, 45%)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(142, 71%, 45%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 15%, 18%)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                axisLine={{ stroke: "hsl(220, 15%, 18%)" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 18%, 10%)",
                  border: "1px solid hsl(220, 15%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "hsl(210, 20%, 92%)" }}
                itemStyle={{ color: "hsl(142, 71%, 45%)" }}
                formatter={(value: number) => [
                  formatNumber(value) + " tokens",
                  "Released",
                ]}
              />
              <ReferenceLine
                x={listing.vestingSchedule[0]?.month}
                stroke="hsl(193, 85%, 45%)"
                strokeDasharray="4 4"
                label={{
                  value: `TGE ${listing.tgePercent}%`,
                  fill: "hsl(193, 85%, 45%)",
                  fontSize: 10,
                  position: "top",
                }}
              />
              {listing.lockEndMonth && (
                <ReferenceLine
                  x={listing.lockEndMonth}
                  stroke="hsl(38, 92%, 50%)"
                  strokeDasharray="4 4"
                  label={{
                    value: "Lock End",
                    fill: "hsl(38, 92%, 50%)",
                    fontSize: 10,
                    position: "top",
                  }}
                />
              )}
              <Area
                type="stepAfter"
                dataKey="tokens"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth={2}
                fill="url(#vestingFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function StatPill({
  label,
  value,
  highlight,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg bg-muted/60 border border-border px-4 py-3 flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium ${highlight ? "text-primary font-semibold" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
