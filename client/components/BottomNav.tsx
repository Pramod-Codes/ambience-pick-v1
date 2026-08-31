import { Link, useLocation } from "react-router-dom";
import { Calendar, Heart, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/favorites", label: "Saved", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white px-2 py-2 shadow-nav ring-1 ring-black/5">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-2.5 transition-all duration-200",
                active
                  ? "bg-primary text-primary-foreground pr-4 shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
              {active && (
                <span className="whitespace-nowrap text-sm font-semibold">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
