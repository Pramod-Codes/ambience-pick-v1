import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
import { Shell } from "@/components/Shell";
import { BottomNav } from "@/components/BottomNav";
import { SearchBar } from "@/components/SearchBar";
import { CategoryChip } from "@/components/CategoryChip";
import { RestaurantCard } from "@/components/RestaurantCard";
import { CATEGORIES, RESTAURANTS } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState("New York City, USA");
  const [locationOpen, setLocationOpen] = useState(false);
  const { favorites, toggleFavorite } = useApp();

  const restaurants = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      const matchesSearch = r.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !category || r.cuisine.toLowerCase() === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <Shell>
      <div className="flex flex-col gap-5 px-5 pb-4 pt-6">
        <button onClick={() => setLocationOpen(true)} className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {location}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        <SearchBar value={search} onChange={setSearch} />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Categories
            </h2>
            <button
              onClick={() => setCategory(null)}
              className="text-sm font-medium text-primary"
            >
              View all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-1 py-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                name={cat.name}
                image={cat.image}
                active={category === cat.id}
                onClick={() =>
                  setCategory((prev) => (prev === cat.id ? null : cat.id))
                }
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-semibold text-foreground">
              Popular Restaurants
            </h2>
            <Link to="#" className="text-sm font-medium text-primary">
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {restaurants.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No restaurants match your search.
              </p>
            )}
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFavorite={favorites.has(restaurant.id)}
                onToggleFavorite={() => toggleFavorite(restaurant.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
      {locationOpen && <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end bg-black/60"><div className="w-full rounded-t-[2rem] bg-background px-5 pb-8 pt-4"><div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-foreground" /><h2 className="font-heading text-xl font-semibold">Choose your location</h2><p className="mt-1 text-sm text-muted-foreground">Find ambience picks near you.</p><div className="mt-5 space-y-2">{["New York City, USA", "Brooklyn, NY", "Manhattan, NY", "Queens, NY"].map((item) => <button key={item} onClick={() => { setLocation(item); setLocationOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${location === item ? "bg-primary/10 font-semibold text-primary" : "bg-muted/50"}`}><MapPin className="h-4 w-4" />{item}</button>)}</div></div></div>}
    </Shell>
  );
}
