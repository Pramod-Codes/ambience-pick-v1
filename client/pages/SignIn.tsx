import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Shell } from "@/components/Shell";
import { WaveHero } from "@/components/WaveHero";
import { UnderlineField } from "@/components/UnderlineField";
import { useApp } from "@/context/AppContext";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80";
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/27809817/12229839_640_360_25fps.mp4";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useApp();
  const [email, setEmail] = useState("williamgiorgino@gmail.com");
  const [password, setPassword] = useState("password123");
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signIn(email);
    navigate("/home");
  }

  return (
    <Shell noPadBottom>
      <WaveHero image={HERO_IMAGE} video={HERO_VIDEO} height="h-[38vh]" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-6 px-7 pb-8 pt-1"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Sign In
          </h1>
          <div className="mt-2 h-1 w-10 rounded-full bg-accent" />
        </div>

        <div className="flex flex-col gap-5">
          <UnderlineField
            label="Email"
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <UnderlineField
            label="Password"
            icon={Lock}
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRemember((r) => !r)}
            className="flex items-center gap-2"
          >
            <span
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-2 ${
                remember ? "border-accent bg-accent" : "border-muted-foreground/40"
              }`}
            >
              {remember && (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white">
                  <path
                    d="M2 6l2.5 2.5L10 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="text-sm text-foreground">Remember Me</span>
          </button>
          <button
            type="button"
            className="text-sm font-medium text-accent"
          >
            Forgot Password?
          </button>
        </div>

        <div className="flex-1" />

        <button
          type="submit"
          className="w-full rounded-full bg-primary py-4 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.98]"
        >
          Login
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an Account ?{" "}
          <span className="font-semibold text-accent">Sign up</span>
        </p>
      </form>
    </Shell>
  );
}
