import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/split-text";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !titleRef.current) return;

    try {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(chipRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "expo.out",
        });

        if (titleRef.current) {
          try {
            const split = splitText(titleRef.current, "chars,words");
            tl.from(
              split.chars,
              {
                opacity: 0,
                y: 20,
                rotationX: -30,
                duration: 0.5,
                stagger: 0.015,
                ease: "back.out(1.4)",
              },
              "-=0.2"
            );
          } catch (e) {
            console.warn("splitText failed, using fallback:", e);
            tl.from(titleRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "expo.out" }, "-=0.2");
          }
        }

        tl.from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "expo.out" }, "-=0.3")
          .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "expo.out" }, "-=0.3");
      }, containerRef);

      return () => ctx.revert();
    } catch (e) {
      console.error("Hero animation error:", e);
    }
  }, [language]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[max(100svh,600px)] max-h-[900px] overflow-hidden"
    >
      {/* 3D Scene Background — shifted to hide Spline watermark */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute" style={{ top: "-4%", left: "-4%", width: "108%", height: "112%" }}>
          <iframe
            src="https://my.spline.design/loopingstaircaseportal-MKTfKxnVxkA7iUfY58vIdl4n/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full"
            loading="eager"
            title="3D Scene"
          />
        </div>
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[42rem] max-w-full h-52 bg-pulse-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-12 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={chipRef}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/20 backdrop-blur-md mb-6">
              <span>{t("hero.chip")}</span>
            </div>
          </div>

          <h1
            key={language}
            ref={titleRef}
            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-lg ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {String(t("hero.title"))
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && (
                    <>
                      {" "}
                      <br />
                    </>
                  )}
                </span>
              ))}
          </h1>

          <p
            ref={subtitleRef}
            className={`mt-6 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed drop-shadow ${language === "ar" ? "font-arabic" : "font-inter"}`}
          >
            {t("hero.subtitle")}
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton
              className="inline-flex items-center justify-center gap-2 bg-pulse-500 hover:bg-pulse-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {t("hero.cta")}
              <ArrowRight className="w-4 h-4 [dir='rtl']:rotate-180" />
            </MagneticButton>
            <MagneticButton
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium py-3 px-6 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {t("hero.cta_secondary")}
              <ArrowRight className="w-4 h-4 [dir='rtl']:rotate-180" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce motion-reduce:animate-none">
        <span className="text-white/60 text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
