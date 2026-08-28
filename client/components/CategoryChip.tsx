import { cn } from "@/lib/utils";

export function CategoryChip({
  name,
  image,
  active,
  onClick,
}: {
  name: string;
  image: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 flex-col items-center gap-1.5"
    >
      <div
        className={cn(
          "relative h-16 w-16 overflow-hidden rounded-2xl ring-2 transition-all",
          active ? "ring-primary" : "ring-transparent",
        )}
      >
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <span className="absolute inset-x-0 bottom-1.5 text-center text-[11px] font-semibold text-white">
          {name}
        </span>
      </div>
    </button>
  );
}
