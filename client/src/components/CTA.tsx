import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !sectionRef.current) return;

    const el = sectionRef.current;

    try {
      gsap.from(el, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    } catch (e) {
      console.warn("CTA animation error:", e);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-pulse-600 via-pulse-500 to-purple-600 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div>
          <TextReveal
            as="h2"
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {String(t("cta.title")).split("\n").join(" ")}
          </TextReveal>
          <p
            className={`text-lg text-white/90 mb-8 max-w-2xl mx-auto ${language === "ar" ? "font-arabic" : ""}`}
          >
            {t("cta.subtitle")}
          </p>
          <MagneticButton
            className="inline-flex items-center gap-2 bg-white text-pulse-600 font-semibold py-3.5 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            strength={0.2}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("cta.button")}
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default CTA;
