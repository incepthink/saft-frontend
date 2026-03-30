import { ShieldCheck, Scale, Lock } from "lucide-react";

const trustPoints = [
  { icon: ShieldCheck, label: "Privacy-Preserving Transactions" },
  { icon: Scale, label: "Regulatory Compliant Architecture" },
  { icon: Lock, label: "Enterprise-Grade Security" },
];

const CantonSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <p className="text-primary text-sm font-medium tracking-wide uppercase mb-3 font-display">
          Infrastructure
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Backed & Built on Enterprise Infrastructure
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Canton Network is the blockchain of choice for Goldman Sachs, BNY
          Mellon, and major global financial institutions. SAFTY inherits this
          institutional-grade infrastructure for every deal.
        </p>

        {/* Canton badge */}
        <div className="inline-flex items-center gap-3 glass-card px-6 py-3 mb-10">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-display font-bold text-sm">
              C
            </span>
          </div>
          <span className="font-display font-semibold text-foreground">
            Canton Network
          </span>
        </div>

        {/* Trust points */}
        <div className="grid sm:grid-cols-3 gap-6">
          {trustPoints.map((tp) => (
            <div
              key={tp.label}
              className="flex flex-col items-center gap-3 p-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <tp.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-display font-medium text-foreground text-sm">
                {tp.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CantonSection;
