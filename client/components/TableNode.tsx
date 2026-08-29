import type { CSSProperties } from "react";
import { TableDef } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  available: { table: "bg-success", chair: "bg-success/60" },
  reserved: { table: "bg-muted-foreground/50", chair: "bg-muted-foreground/30" },
  selected: { table: "bg-primary", chair: "bg-primary/60" },
} as const;

function Chair({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <div className={cn("absolute rounded-full", className)} style={style} />;
}

export function TableNode({
  table,
  onClick,
  recommended = false,
}: {
  table: TableDef;
  onClick?: () => void;
  recommended?: boolean;
}) {
  const styles = STATUS_STYLES[table.status];
  const recommendation = recommended && table.status === "available";
  const disabled = table.status !== "available" && table.status !== "selected";

  if (table.shape === "seat") {
    return (
      <button
        onClick={onClick}
        disabled={table.status === "reserved"}
        className={cn(
          "flex h-14 w-full items-center justify-center rounded-lg text-xs font-bold text-white shadow-soft transition-transform active:scale-95",
          styles.table,
          recommendation && "ring-4 ring-warning ring-offset-2",
        )}
      >
        {table.id}
      </button>
    );
  }

  if (table.shape === "round") {
    const chairCount = 8;
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative aspect-square w-full p-3"
      >
        {Array.from({ length: chairCount }).map((_, i) => {
          const angle = (i / chairCount) * 2 * Math.PI - Math.PI / 2;
          const left = 50 + 46 * Math.cos(angle);
          const top = 50 + 46 * Math.sin(angle);
          return (
            <Chair
              key={i}
              className={cn("h-2.5 w-2.5", styles.chair)}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full text-sm font-bold text-white shadow-soft transition-transform active:scale-95",
            styles.table,
          recommendation && "ring-4 ring-warning ring-offset-2",
        )}
        >
          {table.id}
        </div>
      </button>
    );
  }

  if (table.shape === "rect") {
    const perSide = Math.max(1, Math.round(table.seats / 2));
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-full p-2.5"
        style={{ aspectRatio: table.colSpan && table.colSpan >= 3 ? "5/1" : "2.4/1" }}
      >
        <div className="absolute inset-x-3 -top-0.5 flex justify-between">
          {Array.from({ length: perSide }).map((_, i) => (
            <div key={i} className={cn("h-1.5 w-5 rounded-full", styles.chair)} />
          ))}
        </div>
        <div className="absolute inset-x-3 -bottom-0.5 flex justify-between">
          {Array.from({ length: perSide }).map((_, i) => (
            <div key={i} className={cn("h-1.5 w-5 rounded-full", styles.chair)} />
          ))}
        </div>
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-xl text-sm font-bold text-white shadow-soft transition-transform active:scale-95",
            styles.table,
          recommendation && "ring-4 ring-warning ring-offset-2",
        )}
        >
          {table.id}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative aspect-square w-full p-2.5"
    >
      <Chair className={cn("left-1/2 -top-0.5 h-1.5 w-5 -translate-x-1/2", styles.chair)} />
      <Chair className={cn("left-1/2 -bottom-0.5 h-1.5 w-5 -translate-x-1/2", styles.chair)} />
      <Chair className={cn("top-1/2 -left-0.5 h-5 w-1.5 -translate-y-1/2", styles.chair)} />
      <Chair className={cn("top-1/2 -right-0.5 h-5 w-1.5 -translate-y-1/2", styles.chair)} />
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-xl text-sm font-bold text-white shadow-soft transition-transform active:scale-95",
          styles.table,
          recommendation && "ring-4 ring-warning ring-offset-2",
        )}
      >
        {table.id}
      </div>
    </button>
  );
}
