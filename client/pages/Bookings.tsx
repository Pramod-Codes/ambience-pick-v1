import { CalendarDays, Compass, History } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { BottomNav } from "@/components/BottomNav";
import { BookingCard } from "@/components/BookingCard";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export default function Bookings() {
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const { bookings } = useApp();
  const upcoming = bookings.filter((booking) => booking.status === "Confirmed");
  const past = bookings.filter((booking) => booking.status !== "Confirmed");
  const visible = tab === "Upcoming" ? upcoming : past;

  return <Shell><div className="px-5 pb-4 pt-7"><h1 className="font-heading text-2xl font-bold">Bookings</h1><p className="mt-1 text-sm text-muted-foreground">Keep track of your dining plans.</p><div className="mt-6 flex gap-6 border-b border-border">{(["Upcoming", "Past"] as const).map((item) => <button key={item} onClick={() => setTab(item)} className={cn("relative -mb-px pb-3 text-sm font-semibold", tab === item ? "text-primary" : "text-muted-foreground")}>{item}{tab === item && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}</button>)}</div></div><div className="flex flex-1 flex-col gap-3 px-5 pb-24">{visible.length ? visible.map((booking) => <BookingCard key={booking.id} booking={booking} past={tab === "Past"} />) : <div className="flex flex-1 flex-col items-center justify-center px-8 pb-12 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">{tab === "Upcoming" ? <CalendarDays className="h-7 w-7" /> : <History className="h-7 w-7" />}</div><h2 className="mt-4 font-heading text-lg font-semibold">No {tab.toLowerCase()} bookings</h2><p className="mt-1 text-sm text-muted-foreground">{tab === "Upcoming" ? "Your next dining experience will appear here." : "Completed and cancelled bookings will appear here."}</p>{tab === "Upcoming" && <Link to="/home" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"><Compass className="h-4 w-4" />Explore Restaurants</Link>}</div>}</div><BottomNav /></Shell>;
}
