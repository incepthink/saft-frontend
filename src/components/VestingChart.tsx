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

export function VestingChart({ listing }: { listing: Listing }) {
  const data = generateReleaseSchedule(listing);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-display font-semibold text-lg mb-6">
        Token Release Schedule
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="vestingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(193, 100%, 50%)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(193, 100%, 50%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,16%)" />
            <XAxis
              dataKey="month"
              stroke="hsl(0,0%,55%)"
              fontSize={12}
              tickFormatter={(v) => `M${v}`}
            />
            <YAxis
              stroke="hsl(0,0%,55%)"
              fontSize={12}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0,0%,8.6%)",
                border: "1px solid hsl(0,0%,16%)",
                borderRadius: "8px",
                color: "hsl(0,0%,95%)",
              }}
              formatter={(v: number) => [`${v}%`, "Unlocked"]}
              labelFormatter={(l) => `Month ${l}`}
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
              dataKey="cumulative"
              stroke="hsl(193,100%,50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#vestingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
