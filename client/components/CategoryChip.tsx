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
          "relative h-[78px] w-[78px] overflow-hidden rounded-full border-4 border-background bg-muted shadow-card ring-2 transition-all",
          active ? "ring-primary" : "ring-transparent",
        )}
      >
        <img src={image} alt={`${name} dish served on a plate`} className="h-full w-full object-cover" />
      </div>
      <span className={cn("text-xs font-semibold", active ? "text-primary" : "text-foreground")}>
        {name}
      </span>
    </button>
  );
}
