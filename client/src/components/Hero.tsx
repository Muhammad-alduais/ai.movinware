import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/split-text";
import MagneticButton from "./MagneticButton";
import { ShimmerCta } from "./ShimmerCta";
import { GridPattern } from "@/components/magicui/grid-pattern";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !titleRef.current) return;

    try {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(kickerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "expo.out",
        });

        if (titleRef.current) {
          try {
            // Split by words only (Arabic-safe, per split-text.ts)
            const split = splitText(titleRef.current, "words");
            tl.from(
              split.words,
              {
                opacity: 0,
                y: 25,
                duration: 0.5,
                stagger: 0.025,
                ease: "back.out(1.3)",
              },
              "-=0.25"
            );
          } catch (e) {
            console.warn("splitText failed, using fallback:", e);
            tl.from(titleRef.current, { opacity: 0, y: 25, duration: 0.5, ease: "expo.out" }, "-=0.25");
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
      className="relative w-full min-h-[max(100svh,600px)] max-h-[900px] overflow-hidden bg-[rgb(var(--paper))]"
    >
      {/* Dot grid pattern */}
      <GridPattern
        width={44}
        height={44}
        strokeDasharray="2 3"
        className="pointer-events-none absolute inset-0 stroke-rule/60 [mask-image:radial-gradient(50rem_circle_at_25%_-6rem,white,transparent)]"
      />

      {/* Subtle aurora glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.12), transparent 70%)" }}
      />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.08), transparent 70%)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-5 sm:px-8">
          {/* Mono kicker */}
          <div ref={kickerRef} className="mb-6">
            <span className="kicker">
              {t("hero.chip")}
            </span>
          </div>

          {/* Serif headline with wonk accent */}
          <h1
            key={language}
            ref={titleRef}
            className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold tracking-tight-display leading-[1.05] text-ink ${language === "ar" ? "font-arabic-heading" : ""}`}
          >
            {String(t("hero.title"))
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {i === 1 ? <em className="wonk not-italic text-accent">{line}</em> : line}
                  {i === 0 && (
                    <>
                      {" "}
                      <br />
                    </>
                  )}
                </span>
              ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className={`mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed ${language === "ar" ? "font-arabic" : ""}`}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <ShimmerCta
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className={language === "ar" ? "font-arabic-heading" : ""}>
                {t("hero.cta")}
              </span>
              <ArrowRight className="w-4 h-4 [dir='rtl']:rotate-180" />
            </ShimmerCta>
            <MagneticButton
              className="inline-flex items-center justify-center gap-2 font-medium py-3 px-6 rounded-xl border border-rule text-ink bg-paper-card hover:bg-paper-deep transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" })
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
        <span className={`text-xs text-faint ${language === "ar" ? "font-arabic" : "font-mono tracking-widest uppercase"}`}>{t("hero.scroll")}</span>
        <div className="w-5 h-8 rounded-full border-2 border-rule flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;