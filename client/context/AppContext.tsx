import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BookingDraft, ConfirmedBooking, DiningZone } from "@/lib/types";

interface AppContextValue {
  isAuthenticated: boolean;
  userEmail: string;
  signIn: (email: string) => void;
  signOut: () => void;

  favorites: Set<string>;
  toggleFavorite: (restaurantId: string) => void;

  draft: BookingDraft;
  setDraftRestaurant: (restaurantId: string) => void;
  setDraftDetails: (date: string, time: string, guests: number) => void;
  setDraftTable: (zone: DiningZone, tableId: number) => void;
  resetDraft: () => void;

  bookings: ConfirmedBooking[];
  addBooking: (booking: ConfirmedBooking) => void;
  updateBookingStatus: (bookingId: string, status: ConfirmedBooking["status"]) => void;
}

const emptyDraft: BookingDraft = {
  restaurantId: "",
  date: null,
  time: null,
  guests: 2,
  zone: null,
  tableId: null,
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = window.localStorage.getItem("ambience-pick-favorites");
      return new Set(saved ? (JSON.parse(saved) as string[]) : []);
    } catch {
      return new Set();
    }
  });
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);

  useEffect(() => {
    window.localStorage.setItem("ambience-pick-favorites", JSON.stringify([...favorites]));
  }, [favorites]);
  const [bookings, setBookings] = useState<ConfirmedBooking[]>([]);

  const value = useMemo<AppContextValue>(
    () => ({
      isAuthenticated,
      userEmail,
      signIn: (email: string) => {
        setUserEmail(email);
        setIsAuthenticated(true);
      },
      signOut: () => {
        setIsAuthenticated(false);
        setUserEmail("");
      },
      favorites,
      toggleFavorite: (restaurantId: string) => {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (next.has(restaurantId)) next.delete(restaurantId);
          else next.add(restaurantId);
          return next;
        });
      },
      draft,
      setDraftRestaurant: (restaurantId: string) =>
        setDraft((prev) => ({ ...emptyDraft, restaurantId })),
      setDraftDetails: (date: string, time: string, guests: number) =>
        setDraft((prev) => ({ ...prev, date, time, guests })),
      setDraftTable: (zone: DiningZone, tableId: number) =>
        setDraft((prev) => ({ ...prev, zone, tableId })),
      resetDraft: () => setDraft(emptyDraft),
      bookings,
      addBooking: (booking: ConfirmedBooking) =>
        setBookings((prev) => [booking, ...prev]),
      updateBookingStatus: (bookingId, status) =>
        setBookings((prev) => prev.map((booking) => booking.id === bookingId ? { ...booking, status } : booking)),
    }),
    [isAuthenticated, userEmail, favorites, draft, bookings],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
