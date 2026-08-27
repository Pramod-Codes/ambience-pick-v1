import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Shell({
  children,
  className,
  noPadBottom,
}: {
  children: ReactNode;
  className?: string;
  noPadBottom?: boolean;
}) {
  return (
    <div className="min-h-screen w-full bg-muted/40 md:flex md:items-center md:justify-center md:py-6">
      <div
        className={cn(
          "relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-background md:min-h-[860px] md:rounded-[2rem] md:shadow-2xl md:ring-1 md:ring-border/60",
          !noPadBottom && "pb-24",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
