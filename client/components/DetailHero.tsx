import { Heart, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DetailHero({
  images,
  isFavorite,
  onToggleFavorite,
  onBack,
  onMore,
}: {
  images: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
  onMore?: () => void;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <div className="relative h-64 w-full overflow-hidden">
        {active === 0 ? (
          <video
            src="https://videos.pexels.com/video-files/18284447/18284447-sd_360_640_30fps.mp4"
            poster={images[0]}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img src={images[active]} alt="" className="h-full w-full object-cover" />
        )}
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
            className={cn("h-4 w-4", isFavorite && "fill-current")}
          />
        </button>
        <div className="absolute inset-x-4 bottom-4 z-10 flex gap-2 overflow-x-auto rounded-2xl bg-black/25 p-2 backdrop-blur-sm no-scrollbar">
        <button
          onClick={() => setActive(0)}
          aria-label="Restaurant ambience video"
          className={cn(
            "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 transition-all",
            active === 0 ? "ring-primary" : "ring-transparent",
          )}
        >
          <img src={images[0]} alt="Restaurant ambience video" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-[10px]">▶</span>
          </span>
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i + 1)}
            className={cn(
              "h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 transition-all",
              active === i + 1 ? "ring-primary" : "ring-transparent",
            )}
          >
            <img src={img} alt="Restaurant gallery" className="h-full w-full object-cover" />
          </button>
        ))}
        <button
          onClick={onMore}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black/55 text-sm font-semibold text-white"
        >
          +6
        </button>
        </div>
      </div>
    </div>
  );
}
