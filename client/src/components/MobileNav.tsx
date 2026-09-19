import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const MobileNav = ({ open, onOpen, onClose }: MobileNavProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const scrollTo = (id: string) => {
    onClose();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  };

  const links = [
    { id: "top", label: t("nav.home") as string },
    { id: "services", label: t("nav.services") as string },
    { id: "products", label: t("nav.products") as string },
    { id: "features", label: t("nav.features") as string },
    { id: "contact", label: t("nav.contact") as string },
  ];

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex size-10 items-center justify-center rounded-full border border-rule text-ink-soft transition-colors hover:border-accent/40 hover:text-ink lg:hidden"
        aria-label={t("nav.open") as string}
      >
        <Menu className="size-4" strokeWidth={1.8} />
      </button>

      {createPortal(
        <div
          className={cn(
            "fixed inset-0 z-40 lg:hidden",
            open ? "visible" : "invisible pointer-events-none"
          )}
        >
          <div
            className={cn(
              "fixed inset-0 bg-paper/80 backdrop-blur-sm transition-opacity duration-200",
              open ? "opacity-100" : "opacity-0"
            )}
            onClick={onClose}
          />
          <div
            className={cn(
              "fixed left-0 top-16 z-40 w-full overflow-y-auto border-b border-rule bg-paper-card/95 shadow-lift backdrop-blur-xl transition-transform duration-200",
              open ? "translate-y-0" : "-translate-y-4"
            )}
          >
            <div className="flex items-center justify-between border-b border-rule px-6 py-4">
              <span className={`text-[0.7rem] text-faint ${language === "ar" ? "font-arabic-heading font-semibold" : "!font-mono uppercase tracking-[0.16em]"}`}>
                {t("nav.menu")}
              </span>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper-raise hover:text-ink"
                aria-label={t("nav.close") as string}
              >
                <X className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <nav>
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="block w-full border-b border-rule-soft px-6 py-4 text-left text-sm font-medium text-ink transition-colors hover:bg-paper-raise"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div>
              <button
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                className="flex w-full items-center justify-between px-6 py-4"
              >
                <span className="flex items-center gap-3">
                  <Languages className="size-4 text-muted" strokeWidth={1.8} />
                  <span className="text-[0.86rem] text-ink">Language</span>
                </span>
                <span className={`text-xs text-ink-soft ${language === "ar" ? "font-arabic-heading" : "font-mono uppercase tracking-widest"}`} dir="ltr">
                  {language === "en" ? "عربي" : "EN"}
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex w-full items-center justify-between border-t border-rule-soft px-6 py-4"
              >
                <span className="flex items-center gap-3">
                  {dark ? (
                    <Sun className="size-4 text-muted" strokeWidth={1.8} />
                  ) : (
                    <Moon className="size-4 text-muted" strokeWidth={1.8} />
                  )}
                  <span className="text-[0.86rem] text-ink">Theme</span>
                </span>
                <div className="relative h-6 w-11 rounded-full bg-paper-raise">
                  <div
                    className={cn(
                      "absolute top-1 size-4 rounded-full bg-accent transition-transform duration-200",
                      dark ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};