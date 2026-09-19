import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const base =
    "inline-flex size-9 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors hover:border-accent/40 hover:text-ink";

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
      }}
      className={cn(base, className)}
    >
      {dark ? <Sun className="size-4" strokeWidth={1.8} /> : <Moon className="size-4" strokeWidth={1.8} />}
    </button>
  );
}