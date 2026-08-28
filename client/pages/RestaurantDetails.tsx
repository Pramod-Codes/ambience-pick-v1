import { useState, type ElementType, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, ChevronDown, Clock, MapPin, Star, Users } from "lucide-react";
import { Shell } from "@/components/Shell";
import { DetailHero } from "@/components/DetailHero";
import { PillTabs } from "@/components/PillTabs";
import { getRestaurant, GUEST_OPTIONS, TIME_SLOTS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "Menu", "Gallery", "Reviews", "About"];

function ReservationField({
  icon: Icon,
  label,
  value,
  children,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null;
  children: React.ReactNode;
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
  const [guests, setGuests] = useState<number | null>(null);

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

        {tab === "Overview" ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              {restaurant.description}
            </p>
            <p className="text-sm italic text-muted-foreground">
              &ldquo;{restaurant.quote}&rdquo;
            </p>
          </div>
        ) : (
          <p className="py-4 text-sm text-muted-foreground">
            {tab} details for {restaurant.name} will appear here.
          </p>
        )}

        <div className="space-y-3 pb-2">
          <h2 className="font-heading text-base font-semibold text-foreground">
            Make a Reservation
          </h2>

          <ReservationField icon={CalendarDays} label="Select Date" value={dateLabel}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </ReservationField>

          <div className="flex gap-3">
            <ReservationField icon={Clock} label="Select Time Slot" value={time || null}>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              >
                <option value="" disabled>
                  Select Time Slot
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </ReservationField>

            <ReservationField
              icon={Users}
              label="Select Guests"
              value={guests ? `${guests} Guests` : null}
            >
              <select
                value={guests ?? ""}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              >
                <option value="" disabled>
                  Select Guests
                </option>
                {GUEST_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g} Guests
                  </option>
                ))}
              </select>
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
    </Shell>
  );
}
