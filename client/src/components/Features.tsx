import { useEffect, useRef } from "react";
import { Globe, Shield, HeadphonesIcon, Award } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const { t, language } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".feature-card");
    if (cards.length === 0) return;

    try {
      gsap.set(cards, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
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
      console.warn("Features animation error:", e);
    }
  }, []);

  const features = [
    {
      icon: Award,
      title: t("features.expertise.title"),
      description: t("features.expertise.description"),
    },
    {
      icon: Globe,
      title: t("features.localization.title"),
      description: t("features.localization.description"),
    },
    {
      icon: HeadphonesIcon,
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4">
            <span>{t("features.section")}</span>
          </div>
          <TextReveal
            as="h2"
            className={`section-title ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {String(t("features.title")).split("\n").join(" ")}
          </TextReveal>
          <p className="section-subtitle mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div
          ref={gridRef}
          className="divide-y divide-gray-200/70 border-y border-gray-200/70"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card flex items-start gap-5 sm:gap-8 py-8 group"
            >
              <div className="w-14 h-14 flex-shrink-0 bg-pulse-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-pulse-600" />
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold text-gray-900 mb-1.5 ${language === "ar" ? "font-arabic-heading" : ""}`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-3xl">
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
