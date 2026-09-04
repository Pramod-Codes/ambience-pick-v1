import { Link } from "react-router-dom";
import { Clock, Heart, Star } from "lucide-react";
import { Restaurant } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="flex min-h-[150px] gap-4 rounded-2xl bg-background p-4 shadow-card ring-1 ring-border/60 transition-transform active:scale-[0.98]"
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="h-[118px] w-[118px] shrink-0 rounded-xl object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-heading text-[17px] font-semibold leading-tight text-foreground">
            {restaurant.name}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
              restaurant.isOpen
                ? "bg-success/15 text-success"
                : "bg-muted text-muted-foreground",
            )}
          >
            {restaurant.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {restaurant.michelinStars > 0 && (
          <div className="flex items-center gap-1 text-xs text-warning">
            {Array.from({ length: restaurant.michelinStars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
            <span className="text-muted-foreground">Michelin Rated</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-0.5 font-semibold text-foreground">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {restaurant.rating}
            </span>
            <span>({restaurant.reviews} Reviews)</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            aria-label="Save restaurant"
            className="text-muted-foreground transition-colors hover:text-accent"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavorite && "fill-accent text-accent",
              )}
            />
          </button>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {restaurant.hours}
        </div>
      </div>
    </Link>
  );
}
