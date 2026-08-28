import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PageHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 px-5 pb-2 pt-6">
      <button
        onClick={onBack ?? (() => navigate(-1))}
        aria-label="Back"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition-transform active:scale-90"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h1 className="font-heading text-lg font-semibold text-foreground">
        {title}
      </h1>
    </div>
  );
}
