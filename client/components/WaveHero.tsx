import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function WaveHero({
  image,
  height = "h-[46vh]",
  children,
}: {
  image: string;
  height?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden", height)}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {children}
      <svg
        className="absolute bottom-0 left-0 w-full text-background"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        style={{ height: 70 }}
      >
        <path
          d="M0,45 C90,110 160,-10 260,35 C320,60 370,15 400,30 L400,100 L0,100 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
