import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import HeroMockup from "./HeroMockup";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />

      {/* Radial cyan glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(193 100% 50% / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Faint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(193 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(193 100% 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary animate-fade-in">
            <Zap className="h-3 w-3" />
            Powered by Canton Chain
          </div>

          <div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="block animate-fade-up">Buy Tokens</span>
              <span className="block animate-fade-up-delay-1">Before They</span>
              <span className="block text-gradient-cyan animate-fade-up-delay-2">
                Launch.
              </span>
            </h1>
            <p className="text-muted-foreground mt-4 text-lg animate-fade-up-delay-3">
              Pre-TGE token deals. On-chain. Institutional-grade.
            </p>
          </div>

          {/* Stat pills */}
          <div className="flex gap-4 animate-fade-up-delay-3">
            <div className="flex flex-col rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 py-3">
              <span className="text-2xl font-heading font-bold text-gradient-cyan">
                $47.5M
              </span>
              <span className="text-xs text-muted-foreground">
                Total Raised
              </span>
            </div>
            <div className="flex flex-col rounded-xl border border-border bg-card/60 backdrop-blur-sm px-5 py-3">
              <span className="text-2xl font-heading font-bold text-gradient-cyan">
                24
              </span>
              <span className="text-xs text-muted-foreground">
                Active Deals
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 animate-fade-up-delay-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold cyan-glow hover:opacity-90 transition-opacity"
            >
              Explore Deals <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={scrollToHowItWorks}
              className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
            >
              How It Works
            </button>
          </div>
        </div>

        {/* Right: App Mockup */}
        <div className="hidden lg:block animate-fade-up-delay-2">
          <HeroMockup />
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
};

export default HeroSection;
