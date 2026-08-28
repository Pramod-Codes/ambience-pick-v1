import { cn } from "@/lib/utils";

export function PillTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "relative -mb-px whitespace-nowrap pb-2.5 text-sm font-medium transition-colors",
            active === tab
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab}
          {active === tab && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}

export function SegmentTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { value: string; label: string }[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-6 border-b border-border px-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "relative -mb-px whitespace-nowrap pb-3 text-sm font-semibold transition-colors",
            active === tab.value
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
          {active === tab.value && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
