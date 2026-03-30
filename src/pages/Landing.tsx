import HeroSection from "@/components/landing/HeroSection";
import TrustBanner from "@/components/landing/TrustBanner";
import WhoIsItFor from "@/components/landing/WhoIsItFor";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ActiveDeals from "@/components/landing/ActiveDeals";
import CantonSection from "@/components/landing/CantonSection";
import FooterCTA from "@/components/landing/FooterCTA";
import Footer from "@/components/landing/Footer";
import CantonNetwork from "@/components/landing/CantonNetwork";
import { Navbar } from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <WhoIsItFor />
      {/* <FeaturesSection /> */}
      <HowItWorks />
      <CantonNetwork />
      <ActiveDeals />
      {/* <CantonSection /> */}
      <FooterCTA />
      <Footer />
    </div>
  );
};

export default Landing;
