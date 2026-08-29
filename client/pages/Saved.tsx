import { Heart, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { BottomNav } from "@/components/BottomNav";
import { RestaurantCard } from "@/components/RestaurantCard";
import { RESTAURANTS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Italian", "French", "Mexican"];
export default function Saved() {
  const [filter, setFilter] = useState("All");
  const { favorites, toggleFavorite } = useApp();
  const saved = useMemo(() => RESTAURANTS.filter((r) => favorites.has(r.id) && (filter === "All" || r.cuisine === filter)), [favorites, filter]);
  return <Shell><div className="px-5 pb-4 pt-7"><h1 className="font-heading text-2xl font-bold">Saved</h1><p className="mt-1 text-sm text-muted-foreground">Places you want to experience.</p><div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar">{FILTERS.map((item) => <button key={item} onClick={() => setFilter(item)} className={cn("rounded-full px-4 py-2 text-xs font-semibold transition-colors", filter === item ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>{item}</button>)}</div></div><div className="flex flex-1 flex-col gap-3 px-5 pb-24">{saved.length ? saved.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} isFavorite={favorites.has(restaurant.id)} onToggleFavorite={() => toggleFavorite(restaurant.id)} />) : <div className="flex flex-1 flex-col items-center justify-center px-8 pb-12 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"><Heart className="h-7 w-7" /></div><h2 className="mt-4 font-heading text-lg font-semibold">{filter === "All" ? "Nothing saved yet" : `No saved ${filter.toLowerCase()} places`}</h2><p className="mt-1 text-sm text-muted-foreground">Save places from discovery and come back to them whenever you’re ready.</p><Link to="/home" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"><Search className="h-4 w-4" />Explore Places</Link></div>}</div><BottomNav /></Shell>;
}
