import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { UnderlineField } from "@/components/UnderlineField";
import { getRestaurant } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BookingSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = id ? getRestaurant(id) : undefined;
  const { draft, addBooking } = useApp();
  const [fullName, setFullName] = useState("Giorgino Williams");
  const [phone, setPhone] = useState("+1 646 456-7891");

  if (!restaurant || !draft.date || !draft.time || !draft.zone || !draft.tableId) {
    navigate(`/restaurant/${id ?? ""}`);
    return null;
  }

  const subtotal = draft.guests * 2;
  const taxes = Number((subtotal * 0.18).toFixed(2));
  const fee = 1;
  const total = subtotal + taxes + fee;
  const zoneName = draft.zone === "dining" ? "Dining Area" : draft.zone === "bar" ? "Bar" : "Terrace";

  function handlePay(e: FormEvent) {
    e.preventDefault();
    const bookingId = `RSV-${Math.floor(100000 + Math.random() * 899999)}`;
    addBooking({
      id: bookingId,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantImage: restaurant.image,
      address: restaurant.address,
      zone: draft.zone!,
      tableId: draft.tableId!,
      date: draft.date!,
      time: draft.time!,
      guests: draft.guests,
      amountPaid: total,
      fullName,
      phone,
      status: "Confirmed",
    });
    navigate(`/restaurant/${restaurant.id}/confirmed/${bookingId}`);
  }

  return (
    <Shell noPadBottom>
      <PageHeader title="Booking Summary" />
      <form onSubmit={handlePay} className="flex flex-1 flex-col gap-4 px-5 pb-7 pt-4">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-32 w-full rounded-xl object-cover"
        />

        <div>
          <h2 className="font-heading text-lg font-semibold">{restaurant.name}</h2>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {restaurant.address}
          </p>
        </div>

        <p className="font-heading text-base font-semibold text-primary">
          {zoneName} • Table #{draft.tableId}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{formatDate(draft.date)}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{draft.time}</span>
          <span className="flex items-center gap-1"><Users className="h-4 w-4" />{draft.guests} Guests</span>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-border bg-background p-3 shadow-soft">
          <div className="rounded-xl bg-white p-2"><QRCodeSVG value={`Ambience Pick | ${restaurant.name} | ${zoneName} Table ${draft.tableId} | ${draft.date} ${draft.time} | ${draft.guests} guests`} size={92} bgColor="#ffffff" fgColor="#16213b" includeMargin /></div>
          <div className="min-w-0"><p className="font-heading text-sm font-semibold">Scan for easy entry</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Show this QR code at {restaurant.name} when you arrive.</p><p className="mt-2 text-xs font-semibold text-primary">Table #{draft.tableId} · {draft.guests} guests</p></div>
        </div>

        <div className="space-y-2 pt-1 text-sm">
          <p className="font-medium">Table Reservation Charges – $2.00/person</p>
          <div className="flex justify-between"><span>$2.00 x {draft.guests} guests</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
        </div>

        <div className="space-y-5 pt-2">
          <UnderlineField label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required labelClassName="text-primary" />
          <UnderlineField label="Mobile Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required labelClassName="text-primary" />
        </div>

        <div className="flex-1" />
        <div className="space-y-2 border-b border-dashed border-border pb-3 text-sm">
          <div className="flex justify-between"><span>Sub total</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Taxes</span><span>${taxes.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Platform Fees</span><span>${fee.toFixed(2)}</span></div>
        </div>
        <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <button type="submit" className="mt-2 w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]">Pay &amp; Reserve Table</button>
      </form>
    </Shell>
  );
}
