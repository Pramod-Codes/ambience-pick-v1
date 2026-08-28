import { SlidersHorizontal, Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  onFiltersClick,
}: {
  value: string;
  onChange: (value: string) => void;
  onFiltersClick?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 shadow-soft">
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your place here"
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <div className="h-5 w-px shrink-0 bg-border" />
      <button
        onClick={onFiltersClick}
        className="flex shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground"
      >
        Filters
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
