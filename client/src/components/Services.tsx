import { useEffect, useRef } from "react";
import { Brain, Code, Plug, Zap } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { GridPattern } from "@/components/magicui/grid-pattern";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".bento-card");
    if (cards.length === 0) return;

    try {
      gsap.set(cards, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "expo.out",
          });
        },
      });
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === gridRef.current) st.kill();
        });
      };
    } catch (e) {
      console.warn("Services animation error:", e);
    }
  }, []);

  const services = [
    {
      icon: Brain,
      eyebrow: t("services.consulting.eyebrow") as string,
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
    },
    {
      icon: Code,
      eyebrow: t("services.custom.eyebrow") as string,
      title: t("services.custom.title"),
      description: t("services.custom.description"),
    },
    {
      icon: Plug,
      eyebrow: t("services.integration.eyebrow") as string,
      title: t("services.integration.title"),
      description: t("services.integration.description"),
    },
    {
      icon: Zap,
      eyebrow: t("services.automation.eyebrow") as string,
      title: t("services.automation.title"),
      description: t("services.automation.description"),
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="relative py-20 lg:py-28 bg-[rgb(var(--paper))]">
      {/* Dot grid pattern */}
      <GridPattern
        width={44}
        height={44}
        strokeDasharray="2 3"
        className="pointer-events-none absolute inset-0 stroke-rule/60 [mask-image:radial-gradient(50rem_circle_at_25%_-6rem,white,transparent)]"
      />

      <div className="relative section-container">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="section-idx">§ 01</span>
          <div className="flex-1 h-px bg-[rgb(var(--rule))]" />
        </div>
        <div className="mb-14">
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[rgb(var(--ink))] leading-tight ${language === "ar" ? "font-arabic-heading" : ""}`}>
            {String(t("services.title")).split("\n").join(" ")}
          </h2>
          <p className={`mt-4 text-lg text-[rgb(var(--ink-soft))] max-w-2xl ${language === "ar" ? "font-arabic" : ""}`}>
            {t("services.subtitle")}
          </p>
        </div>

        {/* Bento cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <BentoCard
              key={index}
              name={service.title as string}
              eyebrow={service.eyebrow}
              description={service.description as string}
              className="bento-card"
              background={
                <div className="w-12 h-12 rounded-xl bg-[rgb(var(--accent-muted))] text-[rgb(var(--accent))] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;