import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WalletProvider } from "@/contexts/WalletContext";
import ExplorePage from "./pages/ExplorePage";
import ListingDetailPage from "./pages/ListingDetailPage";
import PortfolioPage from "./pages/PortfolioPage";
import SubmitPage from "./pages/SubmitPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
