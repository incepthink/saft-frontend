import { Lock, Landmark, ShieldCheck } from "lucide-react";

const coins = [
  "$ANIME",
  "$NOVA",
  "$QLYR",
  "$WBTC",
  "$USDC",
  "$ETH",
  "$SOL",
  "$AVAX",
];

const trustPoints = [
  { icon: Lock, label: "Privacy-Preserving" },
  { icon: Landmark, label: "Used by Goldman Sachs & BNY Mellon" },
  { icon: ShieldCheck, label: "Regulatory Compliant" },
];

const CantonNetwork = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 hero-glow" />
    <div className="container mx-auto px-4 relative z-10">
      <p className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-3">
        Powered by Canton Network
      </p>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
        Enterprise Blockchain. DeFi Speed.
      </h2>

      {/* Orbit */}
      <div className="flex justify-center mb-16">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          {/* Orbit ring */}
          <div className="absolute inset-4 rounded-full border border-border/40" />
          <div className="absolute inset-12 rounded-full border border-border/20" />

          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center animate-pulse-glow">
              <span className="font-heading font-bold text-primary text-sm">
                CANTON
              </span>
            </div>
          </div>

          {/* Orbiting coins */}
          <div className="absolute inset-0 animate-orbit">
            {coins.map((coin, i) => {
              const angle = (i / coins.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const radius = 45;
              const x = 50 + radius * Math.cos(rad);
              const y = 50 + radius * Math.sin(rad);
              return (
                <div
                  key={coin}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="glass-card px-3 py-1.5 text-xs font-heading font-semibold text-primary whitespace-nowrap cyan-glow-sm"
                    style={{ animation: `orbit 30s linear infinite reverse` }}
                  >
                    {coin}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust points */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {trustPoints.map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <t.icon className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CantonNetwork;
