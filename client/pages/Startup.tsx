import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { WaveHero } from "@/components/WaveHero";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80";

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
