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
        <button className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          New York City, USA
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
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
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
    </Shell>
  );
}
