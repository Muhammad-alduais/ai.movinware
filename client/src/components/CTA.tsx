import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GridPattern } from "@/components/magicui/grid-pattern";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    try {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === sectionRef.current) st.kill();
        });
      };
    } catch (e) {
      console.warn("CTA animation error:", e);
    }
  }, []);

  const tiers = [
    {
      name: t("pricing.tiers.starter.name") as string,
      eyebrow: t("pricing.tiers.starter.eyebrow") as string,
      price: t("pricing.tiers.starter.price") as string,
      period: t("pricing.tiers.starter.period") as string,
      blurb: t("pricing.tiers.starter.blurb") as string,
      detail: t("pricing.tiers.starter.detail") as string,
      cta: t("pricing.tiers.starter.cta") as string,
      featured: false,
    },
    {
      name: t("pricing.tiers.growth.name") as string,
      eyebrow: t("pricing.tiers.growth.eyebrow") as string,
      price: t("pricing.tiers.growth.price") as string,
      period: t("pricing.tiers.growth.period") as string,
      blurb: t("pricing.tiers.growth.blurb") as string,
      detail: t("pricing.tiers.growth.detail") as string,
      cta: t("pricing.tiers.growth.cta") as string,
      featured: true,
    },
    {
      name: t("pricing.tiers.scale.name") as string,
      eyebrow: t("pricing.tiers.scale.eyebrow") as string,
      price: t("pricing.tiers.scale.price") as string,
      period: t("pricing.tiers.scale.period") as string,
      blurb: t("pricing.tiers.scale.blurb") as string,
      detail: t("pricing.tiers.scale.detail") as string,
      cta: t("pricing.tiers.scale.cta") as string,
      featured: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 border-y border-rule bg-paper-deep/60"
    >
      {/* Dot grid pattern */}
      <GridPattern
        width={44}
        height={44}
        strokeDasharray="2 3"
        className="pointer-events-none absolute inset-0 stroke-rule/60 [mask-image:radial-gradient(30rem_circle_at_50%_0%,white,transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        {/* Section header */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <span className="kicker">{t("pricing.kicker")}</span>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight-display text-ink sm:text-4xl">
              {String(t("pricing.title")).split("\n").join(" ")}
            </h2>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-sm font-medium text-accent-soft transition-colors hover:text-accent"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {t("pricing.see_full")} <span aria-hidden className="[dir='rtl']:rotate-180">→</span>
          </a>
        </div>

        {/* Tier cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative flex flex-col rounded-2xl border border-rule bg-paper-card/60 p-7"
            >
              {tier.featured && (
                <div
                  className="absolute inset-0 rounded-2xl border border-accent/40"
                  style={{ boxShadow: "0 0 0 1px rgba(73,66,228,0.22), 0 20px 60px -20px rgba(73,66,228,0.3)" }}
                />
              )}
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-soft">
                {tier.eyebrow}
              </span>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold text-ink">
                  {tier.price}
                </span>
                <span className="text-sm text-muted">{tier.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{tier.blurb}</p>
              <p className="mt-4 flex-1 text-sm text-ink-soft">{tier.detail}</p>
              <a
                href="#contact"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tier.featured
                    ? "bg-accent text-white shadow-[0_10px_30px_-8px_rgba(73,66,228,0.7)] hover:bg-accent-deep"
                    : "border border-rule text-ink-soft hover:border-accent/40 hover:text-ink"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 [dir='rtl']:rotate-180" />
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted text-center">
          {t("pricing.trial_note")}
        </p>
      </div>
    </section>
  );
};

export default CTA;