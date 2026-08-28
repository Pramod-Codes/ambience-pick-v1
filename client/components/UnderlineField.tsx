import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface UnderlineFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  isPassword?: boolean;
  labelClassName?: string;
}

export function UnderlineField({
  label,
  icon: Icon,
  isPassword,
  className,
  labelClassName,
  ...props
}: UnderlineFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          "text-sm font-medium text-foreground/80",
          labelClassName,
        )}
      >
        {label}
      </label>
      <div className="flex items-center gap-2 border-b-2 border-accent/70 pb-2 focus-within:border-accent">
        {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
        <input
          type={isPassword ? (visible ? "text" : "password") : props.type}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-muted-foreground"
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
