import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { WaveHero } from "@/components/WaveHero";

const HERO_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2F3308099169c54c16b8166ea80f823051%2Fe7d9896d3a0d4d09ad3cb18dc3c33f48?format=webp&width=800&height=1200";

export default function Startup() {
  const navigate = useNavigate();

  return (
    <Shell noPadBottom>
      <WaveHero image={HERO_IMAGE} height="h-[52vh]" />
      <div className="flex flex-1 flex-col justify-between px-7 pb-10 pt-2">
        <div className="space-y-3">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Ambience Pick
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Reserve the <span className="font-semibold text-accent">Mood</span>,
            <br />
            Not Just the{" "}
            <span className="font-semibold text-primary">Meal</span>.
          </p>
        </div>
        <button
          onClick={() => navigate("/sign-in")}
          className="flex items-center justify-end gap-3 self-end"
        >
          <span className="text-base font-medium text-foreground">
            Continue
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform active:scale-90">
            <ArrowRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </Shell>
  );
}
