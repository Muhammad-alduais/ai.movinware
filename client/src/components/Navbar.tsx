import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="inline-flex h-9 items-center rounded-full border border-rule bg-paper-card px-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-ink-soft transition-colors hover:border-accent/40 hover:text-ink"
      dir="ltr"
      aria-label="Switch language"
    >
      {language === "en" ? "عربي" : "EN"}
    </button>
  );
};

const Navbar = () => {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
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

  const navLink =
    "text-sm font-medium text-muted transition-colors hover:text-ink";

  const services = [
    {
      id: "services",
      title: t("services.consulting.title") as string,
      description: t("services.consulting.description") as string,
    },
    {
      id: "services",
      title: t("services.custom.title") as string,
      description: t("services.custom.description") as string,
    },
    {
      id: "services",
      title: t("services.integration.title") as string,
      description: t("services.integration.description") as string,
    },
    {
      id: "services",
      title: t("services.automation.title") as string,
      description: t("services.automation.description") as string,
    },
  ];

  const links = [
    { id: "products", label: t("nav.products") as string },
    { id: "features", label: t("nav.features") as string },
    { id: "contact", label: t("nav.contact") as string },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("top");
          }}
          className="group flex shrink-0 items-center gap-2"
          aria-label="MovinWare"
        >
          <BrandMark className="size-7 text-accent transition-colors lg:size-8" />
          <span className="flex items-center gap-1.5">
            <span className="font-display text-lg font-semibold tracking-tight-display text-ink">
              MovinWare
            </span>
            <span className="rounded bg-accent-muted px-1.5 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-widest text-accent">
              AI
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="z-30 hidden items-center gap-1 lg:flex">
          <button
            onClick={() => scrollTo("top")}
            className={cn(navLink, "rounded-full px-3.5 py-2")}
          >
            {t("nav.home")}
          </button>

          {/* Services dropdown */}
          <div className="group relative">
            <button
              onClick={() => scrollTo("services")}
              className={cn(navLink, "flex items-center gap-1 rounded-full px-3.5 py-2")}
            >
              {t("nav.services")}
              <ChevronDown
                className="size-3.5 text-faint transition-transform duration-200 group-hover:-rotate-180"
                strokeWidth={1.8}
              />
            </button>
            <div className="invisible absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-rule bg-paper-card/95 shadow-lift backdrop-blur-xl">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(service.id)}
                    className={cn(
                      "block w-full px-4 py-3.5 text-left transition-colors hover:bg-paper-raise",
                      index < services.length - 1 && "border-b border-rule-soft"
                    )}
                  >
                    <span className="block text-sm font-medium text-ink">
                      {service.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-xs text-faint">
                      {service.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(navLink, "rounded-full px-3.5 py-2")}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <div className="h-5 w-px bg-rule/70" aria-hidden="true" />
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile toggle */}
        <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} onOpen={() => setMenuOpen(true)} />
      </div>
    </header>
  );
};

export default Navbar;