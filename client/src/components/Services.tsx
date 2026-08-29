import { useEffect, useRef } from "react";
import { Brain, Code, Plug, Zap } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".service-card");
    if (cards.length === 0) return;

    try {
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.95 });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
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
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
      color: "bg-pulse-100 text-pulse-600",
    },
    {
      icon: Code,
      title: t("services.custom.title"),
      description: t("services.custom.description"),
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Plug,
      title: t("services.integration.title"),
      description: t("services.integration.description"),
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Zap,
      title: t("services.automation.title"),
      description: t("services.automation.description"),
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4">
            <span>{t("services.section")}</span>
          </div>
          <TextReveal
            as="h2"
            className={`section-title ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {String(t("services.title")).split("\n").join(" ")}
          </TextReveal>
          <p className="section-subtitle mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-8 rounded-2xl border border-gray-100 hover:border-pulse-200 bg-white hover:bg-pulse-50/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-6 h-6" />
              </div>
              <h3
                className={`text-xl font-semibold text-gray-900 mb-3 ${language === "ar" ? "font-arabic-heading" : ""}`}
              >
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
