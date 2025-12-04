import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TeluguChannels from "./pages/TeluguChannels";
import ChannelCategories from "./pages/ChannelCategories";
import Movies from "./pages/Movies";
import TrailerPlayer from "./pages/TrailerPlayer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/telugu-channels" element={<TeluguChannels />} />
          <Route path="/channel-categories" element={<ChannelCategories />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/trailer/:movieId/:title" element={<TrailerPlayer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
