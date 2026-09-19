import { useEffect, useRef } from "react";
import { Globe, Shield, HeadphonesIcon, Award } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GridPattern } from "@/components/magicui/grid-pattern";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const { t, language } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !listRef.current) return;

    const items = listRef.current.querySelectorAll(".feature-item");
    if (items.length === 0) return;

    try {
      gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: listRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "expo.out",
          });
        },
      });
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === listRef.current) st.kill();
        });
      };
    } catch (e) {
      console.warn("Features animation error:", e);
    }
  }, []);

  const features = [
    { icon: Award, title: t("features.expertise.title"), description: t("features.expertise.description") },
    { icon: Globe, title: t("features.localization.title"), description: t("features.localization.description") },
    { icon: HeadphonesIcon, title: t("features.support.title"), description: t("features.support.description") },
    { icon: Shield, title: t("features.security.title"), description: t("features.security.description") },
  ];

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-paper-deep/60">
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
          <span className="section-idx">§ 03</span>
          <div className="flex-1 h-px bg-rule" />
        </div>
        <div className="mb-14">
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-ink leading-tight ${language === "ar" ? "font-arabic-heading" : ""}`}>
            {String(t("features.title")).split("\n").join(" ")}
          </h2>
          <p className={`mt-4 text-lg text-ink-soft max-w-2xl ${language === "ar" ? "font-arabic" : ""}`}>
            {t("features.subtitle")}
          </p>
        </div>

        {/* Divided feature list */}
        <div ref={listRef} className="border-t border-rule">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item flex items-start gap-6 sm:gap-8 py-7 sm:py-8 border-b border-rule group"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold text-ink mb-1.5 ${language === "ar" ? "font-arabic-heading" : ""}`}>
                  {feature.title}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed max-w-3xl">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;