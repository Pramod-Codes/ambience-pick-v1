import { useState, type ElementType, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, ChevronDown, ChevronLeft, Clock, MapPin, Star, Users, X } from "lucide-react";
import { Shell } from "@/components/Shell";
import { DetailHero } from "@/components/DetailHero";
import { PillTabs } from "@/components/PillTabs";
import { getRestaurant } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Menu", "Gallery", "Reviews", "About"];
const MEAL_SLOTS = {
  Breakfast: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM"],
  Lunch: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"],
  Dinner: ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"],
} as const;
type Meal = keyof typeof MEAL_SLOTS;
type Sheet = "date" | "time" | "guests" | null;

function BottomSheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end bg-black/70"><div className="w-full rounded-t-[2rem] bg-background px-5 pb-7 pt-4 shadow-2xl"><div className="mx-auto mb-7 h-1.5 w-12 rounded-full bg-foreground" /><div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-xl font-semibold">{title}</h2><button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button></div>{children}</div></div>;
}

function ReservationField({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: ElementType;
  label: string;
  value: string | null;
  children: ReactNode;
}) {
  return (
    <div className="relative flex items-center gap-2 rounded-xl bg-muted px-3.5 py-3.5">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span
        className={cn(
          "flex-1 truncate text-sm",
          value ? "font-medium text-foreground" : "text-muted-foreground",
        )}
      >
        {value ?? label}
      </span>
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      {children}
    </div>
  );
}

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = id ? getRestaurant(id) : undefined;
  const { favorites, toggleFavorite, setDraftRestaurant, setDraftDetails, draft } =
    useApp();
  const [tab, setTab] = useState("Overview");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [meal, setMeal] = useState<Meal>("Dinner");
  const [guests, setGuests] = useState<number | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [month, setMonth] = useState(new Date(2026, 5, 1));

  if (!restaurant) {
    return (
      <Shell>
        <div className="flex flex-1 items-center justify-center px-6 text-center text-muted-foreground">
          Restaurant not found.
        </div>
      </Shell>
    );
  }

  const dateLabel = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const canSelectTable = !!date && !!time && !!guests;

  function handleSelectTable() {
    if (!canSelectTable || !restaurant) return;
    setDraftRestaurant(restaurant.id);
    setDraftDetails(date, time, guests!);
    navigate(`/restaurant/${restaurant.id}/select-table`);
  }

  return (
    <Shell>
      <DetailHero
        images={restaurant.gallery}
        isFavorite={favorites.has(restaurant.id)}
        onToggleFavorite={() => toggleFavorite(restaurant.id)}
        onBack={() => navigate(-1)}
        onMore={() => setTab("Gallery")}
      />

      <div className="flex flex-col gap-4 px-5 pt-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-heading text-xl font-bold text-foreground">
              {restaurant.name}
            </h1>
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-foreground">
              <Star className="h-4 w-4 fill-warning text-warning" />
              {restaurant.rating}{" "}
              <span className="font-normal text-muted-foreground">
                ({restaurant.reviews} Reviews)
              </span>
            </span>
          </div>
          {restaurant.michelinStars > 0 && (
            <div className="mt-1 flex items-center gap-1 text-xs text-warning">
              {Array.from({ length: restaurant.michelinStars }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
              <span className="text-muted-foreground">Michelin Rated</span>
            </div>
          )}
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {restaurant.address}
          </div>
        </div>

        <PillTabs tabs={TABS} active={tab} onChange={setTab} />

        {tab === "Overview" && <div className="space-y-2"><p className="text-sm font-medium text-foreground">{restaurant.description}</p><p className="text-sm italic text-muted-foreground">&ldquo;{restaurant.quote}&rdquo;</p></div>}
        {tab === "Menu" && <div className="space-y-3"><p className="text-sm text-muted-foreground">A seasonal menu crafted around local ingredients and familiar favorites.</p>{["Truffle Burrata", "Wild Mushroom Risotto", "Citrus Olive Oil Cake"].map((item, i) => <div key={item} className="flex justify-between rounded-xl bg-muted px-4 py-3 text-sm"><span className="font-medium">{item}</span><span className="text-muted-foreground">${[18, 28, 12][i]}</span></div>)}</div>}
        {tab === "Gallery" && <div className="grid grid-cols-3 gap-2">{restaurant.gallery.map((img) => <img key={img} src={img} alt="Restaurant interior" className="aspect-square rounded-xl object-cover" />)}</div>}
        {tab === "Reviews" && <div className="space-y-3"><div className="flex items-center gap-2"><Star className="h-5 w-5 fill-warning text-warning" /><strong>{restaurant.rating} out of 5</strong><span className="text-sm text-muted-foreground">from {restaurant.reviews} guests</span></div><p className="rounded-xl bg-muted p-4 text-sm italic text-muted-foreground">“A beautiful setting, thoughtful service, and an unforgettable evening.”</p></div>}
        {tab === "About" && <p className="text-sm leading-6 text-muted-foreground">{restaurant.name} brings a warm, thoughtful dining experience to New York City. The space is designed for intimate dinners, celebrations, and memorable nights out.</p>}

        <div className="space-y-3 pb-2">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Make a Reservation
          </h2>

          <ReservationField icon={CalendarDays} label="Select Date" value={dateLabel}>
            <button type="button" onClick={() => setSheet("date")} className="absolute inset-0" aria-label="Select date" />
          </ReservationField>

          <div className="flex gap-3">
            <ReservationField icon={Clock} label="Select Time Slot" value={time || null}>
              <button type="button" onClick={() => setSheet("time")} className="absolute inset-0" aria-label="Select time" />
            </ReservationField>

            <ReservationField
              icon={Users}
              label="Select Guests"
              value={guests ? `${guests} Guests` : null}
            >
              <button type="button" onClick={() => setSheet("guests")} className="absolute inset-0" aria-label="Select guests" />
            </ReservationField>
          </div>

          <button
            onClick={handleSelectTable}
            disabled={!canSelectTable}
            className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98] disabled:opacity-40"
          >
            Select Table
          </button>
        </div>
      </div>
      {sheet === "date" && <BottomSheet title="Select Date" onClose={() => setSheet(null)}><div className="rounded-2xl bg-background shadow-card ring-1 ring-border/50"><div className="flex items-center justify-between border-b border-border px-4 py-4"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-lg border p-2"><ChevronLeft className="h-5 w-5" /></button><strong className="font-heading text-lg">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</strong><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-lg border p-2"><ChevronDown className="h-5 w-5 rotate-[-90deg]" /></button></div><div className="grid grid-cols-7 gap-y-4 p-4 text-center text-sm"><div className="col-span-7 grid grid-cols-7 text-muted-foreground">{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <span key={d} className="font-medium">{d}</span>)}</div>{Array.from({ length: new Date(month.getFullYear(), month.getMonth(), 1).getDay() === 0 ? 6 : new Date(month.getFullYear(), month.getMonth(), 1).getDay() - 1 }).map((_, i) => <span key={`blank-${i}`} />)}{Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map((day) => { const value = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; return <button key={value} onClick={() => { setDate(value); setSheet(null); }} className={cn("mx-auto flex h-9 w-9 items-center justify-center rounded-full", date === value ? "bg-primary text-white" : "hover:bg-muted")}>{day}</button>; })}</div></div><button onClick={() => setSheet(null)} className="mt-6 w-full rounded-full bg-primary py-4 font-semibold text-white">Confirm Date</button></BottomSheet>}
      {sheet === "time" && <BottomSheet title="Select Time Slot" onClose={() => setSheet(null)}><div className="mb-6 flex gap-3 overflow-x-auto">{(Object.keys(MEAL_SLOTS) as Meal[]).map((period) => <button key={period} type="button" onClick={() => { setMeal(period); setTime(""); }} className={cn("rounded-full px-5 py-2 text-sm font-medium transition-colors", meal === period ? "bg-primary text-white shadow-soft" : "bg-muted text-foreground")}>{period}</button>)}</div><div className="grid grid-cols-3 gap-3">{MEAL_SLOTS[meal].map((slot) => <button key={slot} type="button" onClick={() => { setTime(slot); setSheet(null); }} className={cn("rounded-lg border py-3 text-sm transition-colors", time === slot ? "border-primary bg-primary text-white" : "bg-muted/30")}>{slot}</button>)}</div><button type="button" onClick={() => setSheet(null)} className="mt-8 w-full rounded-full bg-primary py-4 font-semibold text-white">Confirm Time Slot</button></BottomSheet>}
      {sheet === "guests" && <BottomSheet title="Select Number of Guests" onClose={() => setSheet(null)}><div className="flex gap-3 overflow-x-auto pb-2">{Array.from({ length: 10 }, (_, i) => i + 1).map((g) => <button key={g} onClick={() => { setGuests(g); setSheet(null); }} className={cn("min-w-[72px] rounded-lg border py-4 text-lg", guests === g ? "border-primary bg-primary text-white" : "bg-muted/30")}>{g}</button>)}</div><button onClick={() => setSheet(null)} className="mt-16 w-full rounded-full bg-primary py-4 font-semibold text-white">Confirm Number of Guests</button></BottomSheet>}
    </Shell>
  );
}
