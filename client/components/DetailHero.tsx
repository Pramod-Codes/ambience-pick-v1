import { Heart, Play, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DetailHero({
  images,
  isFavorite,
  onToggleFavorite,
  onBack,
}: {
  images: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
}) {
  const [active, setActive] = useState(0);
  const extra = images.length - 5;

  return (
    <div className="relative">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={images[active]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <button
          onClick={onBack}
          aria-label="Back"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-foreground shadow-soft transition-transform active:scale-90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onToggleFavorite}
          aria-label="Save"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform active:scale-90"
        >
          <Heart
            className={cn("h-4.5 w-4.5", isFavorite && "fill-current")}
          />
        </button>
        <button
          aria-label="Play video"
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white ring-1 ring-white/70 backdrop-blur-sm transition-transform active:scale-90"
        >
          <Play className="h-6 w-6 fill-current" />
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 pt-3 no-scrollbar">
        {images.slice(0, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 transition-all",
              active === i ? "ring-primary" : "ring-transparent",
            )}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
        {extra > 0 && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-sm font-semibold text-muted-foreground">
            +{extra}
          </div>
        )}
      </div>
    </div>
  );
}
