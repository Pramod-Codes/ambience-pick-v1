import { CalendarDays, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ConfirmedBooking } from "@/lib/types";
import { cn } from "@/lib/utils";

function prettyDate(value: string) {
  return new Date(value + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function BookingCard({ booking, past = false }: { booking: ConfirmedBooking; past?: boolean }) {
  const zone = booking.zone === "dining" ? "Dining Area" : booking.zone === "bar" ? "Bar" : "Terrace";
  return (
    <Link to={`/restaurant/${booking.restaurantId}/confirmed/${booking.id}`} className={cn("block rounded-2xl bg-background p-3 shadow-card ring-1 ring-border/60 transition-transform active:scale-[0.98]", past && "opacity-80")}>
      <div className="flex gap-3">
        <img src={booking.restaurantImage} alt={booking.restaurantName} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2"><h3 className="font-heading text-[15px] font-semibold">{booking.restaurantName}</h3><span className={cn("rounded-full px-2 py-1 text-[10px] font-semibold", booking.status === "Confirmed" ? "bg-success/15 text-success" : booking.status === "Cancelled" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground")}>{booking.status}</span></div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{zone} • Table #{booking.tableId}</p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground"><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{prettyDate(booking.date)}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{booking.time}</span><span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{booking.guests}</span></div>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs"><span className="text-muted-foreground">Booking #{booking.id}</span><span className="font-semibold text-primary">View Booking</span></div>
    </Link>
  );
}
