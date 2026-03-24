import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  ColorType,
} from "lightweight-charts";
import type { Listing } from "@/data/listings";
import { CANDLESTICK_DATA } from "@/data/listings";

interface PriceChartProps {
  listing: Listing;
}

export function PriceChart({ listing }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 288,
      layout: {
        background: { type: ColorType.Solid, color: "hsl(0,0%,8.6%)" },
        textColor: "hsl(0,0%,55%)",
      },
      grid: {
        vertLines: { color: "hsl(0,0%,16%)" },
        horzLines: { color: "hsl(0,0%,16%)" },
      },
      timeScale: {
        borderColor: "hsl(0,0%,16%)",
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: "hsl(0,0%,16%)",
      },
      crosshair: {
        vertLine: { color: "hsl(0,0%,40%)" },
        horzLine: { color: "hsl(0,0%,40%)" },
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "hsl(142,71%,45%)",
      downColor: "hsl(0,72%,51%)",
      borderUpColor: "hsl(142,71%,45%)",
      borderDownColor: "hsl(0,72%,51%)",
      wickUpColor: "hsl(142,71%,45%)",
      wickDownColor: "hsl(0,72%,51%)",
      priceFormat: { type: "price", precision: 4, minMove: 0.0001 },
    });

    const data = CANDLESTICK_DATA[listing.id] ?? [];
    series.setData(data);
    chart.timeScale().fitContent();

    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) chart.applyOptions({ width });
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, [listing.id]);

  return <div ref={containerRef} className="h-72 w-full" />;
}
