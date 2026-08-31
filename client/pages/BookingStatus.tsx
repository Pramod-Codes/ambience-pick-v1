import { Check, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { getRestaurant } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BookingStatus() {
  const { id, bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBookingStatus } = useApp();
  const [cancelOpen, setCancelOpen] = useState(false);
  const booking = bookings.find((b) => b.id === bookingId);
  const restaurant = booking ? getRestaurant(booking.restaurantId) : id ? getRestaurant(id) : undefined;

  if (!booking || !restaurant) {
    return <Shell><PageHeader title="Booking Status" /><div className="flex flex-1 items-center justify-center text-muted-foreground">Booking not found.</div></Shell>;
  }

  const zoneName = booking.zone === "dining" ? "Dining Area" : booking.zone === "bar" ? "Bar" : "Terrace";
  return (
    <Shell noPadBottom>
      <PageHeader title="Booking Status" />
      <div className="flex flex-1 flex-col px-5 pb-7 pt-5">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success ring-8 ring-success/10"><Check className="h-8 w-8" strokeWidth={2.5} /></div>
          <h1 className="mt-5 font-heading text-lg font-semibold">{booking.status === "Confirmed" ? "Booking Confirmed!" : booking.status === "Cancelled" ? "Booking Cancelled" : "Booking Completed"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{booking.status === "Confirmed" ? "Your table has been successfully reserved." : "This booking is in your booking history."}</p>
        </div>
        <img src={restaurant.image} alt={restaurant.name} className="mt-7 h-32 w-full rounded-xl object-cover" />
        <h2 className="mt-4 font-heading text-lg font-semibold">{restaurant.name}</h2>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{restaurant.address}</p>
        <p className="mt-4 font-heading text-base font-semibold text-primary">{zoneName} • Table #{booking.tableId}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground"><span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{formatDate(booking.date)}</span><span className="flex items-center gap-1"><Clock className="h-4 w-4" />{booking.time}</span><span className="flex items-center gap-1"><Users className="h-4 w-4" />{booking.guests} Guests</span></div>
        <h2 className="mt-7 font-heading text-base font-semibold">Booking Details</h2>
        <div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>Booking ID</span><strong>#{booking.id}</strong></div><div className="flex justify-between"><span>Status</span><strong className="text-success">{booking.status}</strong></div><div className="flex justify-between"><span>Amount Paid</span><strong>${booking.amountPaid.toFixed(2)}</strong></div></div>
        <div className="mt-7 flex items-center gap-4 rounded-2xl border border-border bg-background p-3 shadow-soft"><div className="rounded-xl bg-white p-2"><QRCodeSVG value={`Ambience Pick | ${restaurant.name} | ${zoneName} Table ${booking.tableId} | ${booking.date} ${booking.time} | ${booking.guests} guests | ${booking.id}`} size={96} bgColor="#ffffff" fgColor="#16213b" includeMargin /></div><div className="min-w-0"><p className="font-heading text-sm font-semibold">Ready for entry</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Show this QR code at the restaurant when you arrive.</p><p className="mt-2 text-xs font-semibold text-primary">Scan booking #{booking.id}</p></div></div>
        <div className="mt-4 rounded-xl bg-primary/15 px-4 py-3 text-center text-sm font-medium text-primary">Reservation Charges will be adjusted in your final bill payment at the restaurant</div>
        <div className="flex-1" />
        {booking.status === "Confirmed" && <div className="mt-7 grid grid-cols-2 gap-3"><button onClick={() => setCancelOpen(true)} className="rounded-full border border-destructive py-3 text-sm font-semibold text-destructive">Cancel Booking</button><button onClick={() => navigate("/profile")} className="rounded-full border border-border py-3 text-sm font-semibold">Get Help</button></div>}
        <button onClick={() => navigate("/home")} className="mt-3 w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]">Back To Home</button>
      </div>
      {cancelOpen && <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end bg-black/60"><div className="w-full rounded-t-[2rem] bg-background px-5 pb-8 pt-5"><div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-foreground" /><h2 className="font-heading text-xl font-semibold">Cancel this booking?</h2><p className="mt-2 text-sm text-muted-foreground">Your reservation charge will be handled according to the restaurant&apos;s cancellation policy.</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => setCancelOpen(false)} className="rounded-full border border-border py-3 font-semibold">Keep Booking</button><button onClick={() => { updateBookingStatus(booking.id, "Cancelled"); setCancelOpen(false); }} className="rounded-full bg-destructive py-3 font-semibold text-white">Cancel Booking</button></div></div></div>}
    </Shell>
  );
}
