import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold text-gradient-cyan">
                SAFTY
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              The SAFT Marketplace.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/explore"
              className="hover:text-foreground transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/portfolio"
              className="hover:text-foreground transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="/submit"
              className="hover:text-foreground transition-colors"
            >
              Submit Listing
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Docs
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Blog
            </a>
          </div>

          {/* Canton badge */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-[10px]">
                C
              </span>
            </div>
            Powered by Canton Network
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SAFTY. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
