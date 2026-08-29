import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Startup from "./pages/Startup";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import SelectTable from "./pages/SelectTable";
import BookingSummary from "./pages/BookingSummary";
import BookingStatus from "./pages/BookingStatus";
import Bookings from "./pages/Bookings";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Startup />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/restaurant/:id/select-table" element={<SelectTable />} />
            <Route path="/restaurant/:id/summary" element={<BookingSummary />} />
            <Route path="/restaurant/:id/confirmed/:bookingId" element={<BookingStatus />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/favorites" element={<Saved />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  });
}
