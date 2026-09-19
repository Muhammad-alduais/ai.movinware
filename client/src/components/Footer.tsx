import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { BrandMark } from "./BrandMark";

const Footer = () => {
  const { t, language } = useLanguage();

  const safeT = (key: string, fallback: string = key) => {
    const result = t(key);
    return typeof result === "string" ? result : fallback;
  };

  const colHead =
    language === "ar"
      ? "font-arabic-heading text-[0.85rem] font-semibold text-faint"
      : "font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint";
  const colLink = "text-sm text-muted transition-colors hover:text-ink";

  const quickLinks = [
    { label: safeT("nav.home", "Home"), id: "top" },
    { label: safeT("nav.services", "Services"), id: "services" },
    { label: safeT("nav.products", "Solutions"), id: "products" },
    { label: safeT("nav.features", "Why Us"), id: "features" },
    { label: safeT("nav.contact", "Contact"), id: "contact" },
  ];

  const services = [
    safeT("services.consulting.title", "AI Consulting"),
    safeT("services.custom.title", "Custom AI Development"),
    safeT("services.integration.title", "AI Integration"),
    safeT("services.automation.title", "Intelligent Automation"),
  ];

  const solutions = [
    safeT("products.agentic.title", "Agentic AI Systems"),
    safeT("products.rag.title", "RAG Systems"),
    safeT("products.chatbot.title", "Intelligent Chatbots"),
    safeT("products.analytics.title", "Predictive Analytics"),
    safeT("products.ocr.title", "Smart Document Processing"),
    safeT("products.vision.title", "Computer Vision"),
  ];

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-32 border-t border-rule bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("top");
              }}
              className="group flex items-center gap-2.5"
              aria-label="MovinWare"
            >
              <BrandMark className="size-8 text-accent" />
              <span className="font-display text-3xl font-semibold tracking-tight-display text-ink">
                MovinWare
                <span className="text-accent">.</span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              {safeT("footer.description", "AI-powered solutions designed to transform modern businesses.")}
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className={`mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 ${language === "ar" ? "font-arabic-heading text-sm font-semibold" : "font-mono text-[0.72rem] uppercase tracking-[0.14em]"} text-paper transition-colors hover:bg-accent`}
            >
              {safeT("hero.cta", "Start Your Project")}
            </button>
          </div>

          {/* Quick links */}
          <div>
            <span className={`${colHead} mb-4 block`}>
              {safeT("footer.quick_links", "Quick Links")}
            </span>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button onClick={() => scrollTo(link.id)} className={colLink}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <span className={`${colHead} mb-4 block`}>
              {safeT("nav.services", "Services")}
            </span>
            <ul className="space-y-3">
              {services.map((label, index) => (
                <li key={index}>
                  <button onClick={() => scrollTo("services")} className={colLink}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <span className={`${colHead} mb-4 block`}>
              {safeT("nav.products", "Solutions")}
            </span>
            <ul className="space-y-3">
              {solutions.map((label, index) => (
                <li key={index}>
                  <button onClick={() => scrollTo("products")} className={colLink}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className={`${colHead} mb-4 block`}>
              {safeT("nav.contact", "Contact")}
            </span>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@movinware.com" className={`${colLink} flex items-center gap-2`} dir="ltr">
                  <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.8} />
                  info@movinware.com
                </a>
              </li>
              <li>
                <a href="tel:+966561820949" className={`${colLink} flex items-center gap-2`} dir="ltr">
                  <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.8} />
                  +966 561820949
                </a>
              </li>
              <li>
                <span className={`${colLink} flex items-center gap-2`}>
                  <MapPin className="size-4 shrink-0 text-accent" strokeWidth={1.8} />
                  {safeT("contact.info.location_value", "Online")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint" dir="ltr">
            {safeT("footer.copyright", "© 2026 MovinWare AI. All rights reserved.")}
          </div>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
            {safeT("footer.built_by", "Developed by MovinWare Team")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
