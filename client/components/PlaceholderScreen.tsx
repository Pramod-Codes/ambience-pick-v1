import { LucideIcon, Sparkles } from "lucide-react";
import { Shell } from "./Shell";
import { BottomNav } from "./BottomNav";
import { PageHeader } from "./PageHeader";

export function PlaceholderScreen({
  title,
  message,
  icon: Icon = Sparkles,
}: {
  title: string;
  message?: string;
  icon?: LucideIcon;
}) {
  return (
    <Shell>
      <PageHeader title={title} />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <h2 className="font-heading text-lg font-semibold text-foreground">
          {title} coming soon
        </h2>
        <p className="text-sm text-muted-foreground">
          {message ??
            "This screen isn't part of the initial flow yet. Keep prompting to design it next."}
        </p>
      </div>
      <BottomNav />
    </Shell>
  );
}
