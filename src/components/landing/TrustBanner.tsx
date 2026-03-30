import { Shield, Activity, CheckCircle } from "lucide-react";

const TrustBanner = () => {
  const stats = [
    { icon: Activity, label: "Total Raise Volume", value: "$47.5M+" },
    { icon: Shield, label: "Active Deals", value: "24" },
    { icon: CheckCircle, label: "On-Chain Settlement", value: "100%" },
  ];

  return (
    <section className="border-y border-border/50 bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm text-muted-foreground mb-6 font-display tracking-wide uppercase">
          Powered by Canton Network
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-2"
            >
              <stat.icon className="h-5 w-5 text-primary" />
              <p className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
