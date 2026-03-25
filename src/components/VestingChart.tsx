import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { Listing } from "@/data/listings";
import { generateReleaseSchedule } from "@/data/listings";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function tgeToMonthLabel(listing: Listing, offset: number): string {
  const parts = listing.tgeDate.split(" ");
  const tgeMonthIdx = MONTH_NAMES.indexOf(parts[0]);
  const tgeYear = parseInt(parts[1]) || 2025;
  const totalMonths = tgeMonthIdx + offset;
  const m = totalMonths % 12;
  const y = tgeYear + Math.floor(totalMonths / 12);
  return `${MONTH_NAMES[m]} ${y}`;
}

function formatTokenCount(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return String(v);
}

interface VestingChartProps {
  listing: Listing;
  userTokensHeld?: number;
}

export function VestingChart({ listing, userTokensHeld }: VestingChartProps) {
  if (!userTokensHeld || userTokensHeld <= 0) return null;

  const schedule = generateReleaseSchedule(listing);

  const chartData = schedule.map((pt) => ({
    month: pt.month,
    userTokens: Math.round((pt.cumulative / 100) * userTokensHeld),
  }));

  return (
    <div className="rounded-xl p-0">
      <h3 className="font-display font-semibold text-lg mb-6">
        Token Release Schedule
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 36, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
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
              interval={2}
              angle={-45}
              textAnchor="end"
              height={60}
              tickFormatter={(v) => tgeToMonthLabel(listing, v)}
            />
            <YAxis
              stroke="hsl(142,71%,45%)"
              fontSize={12}
              tickFormatter={(v) => formatTokenCount(v)}
              domain={[0, userTokensHeld]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0,0%,8.6%)",
                border: "1px solid hsl(0,0%,16%)",
                borderRadius: "8px",
                color: "hsl(0,0%,95%)",
              }}
              formatter={(v: number) => [
                `${v.toLocaleString()} ${listing.ticker}`,
                "Your Released",
              ]}
              labelFormatter={(l) => tgeToMonthLabel(listing, Number(l))}
            />
            <ReferenceLine
              x={0}
              stroke="hsl(193,100%,50%)"
              strokeDasharray="5 5"
              label={{
                value: `TGE — ${listing.tgeUnlockPercent}% Released`,
                fill: "hsl(193,100%,50%)",
                fontSize: 11,
                position: "top",
              }}
            />
            <ReferenceLine
              x={listing.lockPeriodMonths}
              stroke="hsl(38,92%,50%)"
              strokeDasharray="5 5"
              label={{
                value: "Lock Period Ends",
                fill: "hsl(38,92%,50%)",
                fontSize: 11,
                position: "top",
              }}
            />
            <Area
              type="monotone"
              dataKey="userTokens"
              stroke="hsl(142,71%,45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#userGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
