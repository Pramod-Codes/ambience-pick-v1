import "./global.css";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
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

function AppRoutes() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        aria-hidden={!showSplash}
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          showSplash ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Startup />
      </div>
      <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/restaurant/:id/select-table" element={<SelectTable />} />
      <Route path="/restaurant/:id/summary" element={<BookingSummary />} />
      <Route
        path="/restaurant/:id/confirmed/:bookingId"
        element={<BookingStatus />}
      />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/favorites" element={<Saved />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => undefined);
  });
}
