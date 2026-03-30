import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FooterCTA = () => (
  <section className="py-24 relative">
    <div className="absolute inset-0 hero-glow" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
        Ready to invest early?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/explore"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold cyan-glow hover:opacity-90 transition-opacity"
        >
          Explore Deals <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
        >
          Submit a Deal
        </Link>
      </div>
    </div>
  </section>
);

export default FooterCTA;
