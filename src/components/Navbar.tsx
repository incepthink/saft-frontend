import { Link, useLocation } from "react-router-dom";
import { WalletButton } from "@/components/WalletButton";
import { Zap } from "lucide-react";

const navLinks = [
  { to: "/explore", label: "Explore" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/submit", label: "Submit Listing" },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed  w-full top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-bold"
          >
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-gradient">SAFTY</span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  (l.to === "/explore" ? pathname === "/explore" || pathname.startsWith("/listing/") : pathname === l.to)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <WalletButton />
      </div>
    </nav>
  );
}
