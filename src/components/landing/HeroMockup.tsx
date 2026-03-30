const HeroMockup = () => {
  // Simulate a vesting step-function chart
  const vestingSteps = [
    { x: 0, y: 100 },
    { x: 15, y: 100 },
    { x: 15, y: 80 },
    { x: 30, y: 80 },
    { x: 30, y: 55 },
    { x: 50, y: 55 },
    { x: 50, y: 30 },
    { x: 70, y: 30 },
    { x: 70, y: 10 },
    { x: 100, y: 10 },
  ];

  const pathD = vestingSteps
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * 2.8} ${p.y * 1.2}`)
    .join(" ");

  const areaD = pathD + " L 280 120 L 0 120 Z";

  return (
    <div className="glass-card p-6 max-w-md ml-auto animate-float">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
            🎌
          </div>
          <div>
            <div className="font-heading font-bold text-sm">Anime Chain</div>
            <span className="text-xs text-muted-foreground">$stANIME</span>
          </div>
        </div>
        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
          LIVE
        </span>
      </div>

      {/* Price row */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <div className="text-muted-foreground text-xs">Price</div>
          <div className="text-primary font-heading font-bold text-lg">
            $0.012
          </div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground text-xs">TGE</div>
          <div className="font-medium text-sm">Jul 2025</div>
        </div>
      </div>

      {/* Vesting Chart */}
      <div className="mb-4">
        <div className="text-xs text-muted-foreground mb-2">
          Vesting Schedule
        </div>
        <svg viewBox="0 0 280 130" className="w-full h-32">
          <defs>
            <linearGradient id="vestingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(193 100% 50%)"
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor="hsl(193 100% 50%)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#vestingGrad)" />
          <path
            d={pathD}
            fill="none"
            stroke="hsl(193 100% 50%)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>62% Filled</span>
          <span>Min $1,000</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: "62%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
