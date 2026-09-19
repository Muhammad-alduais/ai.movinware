import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Target, Lightbulb, Zap } from "lucide-react";
import { getProductById } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const product = getProductById(id || "");
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    try {
      const ctx = gsap.context(() => {
        if (heroRef.current) {
          gsap.from(heroRef.current.children, {
            opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "expo.out", delay: 0.1,
          });
        }
        if (featuresRef.current) {
          const cards = featuresRef.current.querySelectorAll(".reveal-card");
          gsap.set(cards, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: featuresRef.current, start: "top 80%", once: true,
            onEnter: () => {
              gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" });
            },
          });
        }
        if (useCasesRef.current) {
          const cards = useCasesRef.current.querySelectorAll(".reveal-card");
          gsap.set(cards, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: useCasesRef.current, start: "top 80%", once: true,
            onEnter: () => {
              gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" });
            },
          });
        }
        if (benefitsRef.current) {
          const cards = benefitsRef.current.querySelectorAll(".reveal-card");
          gsap.set(cards, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: benefitsRef.current, start: "top 80%", once: true,
            onEnter: () => {
              gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" });
            },
          });
        }
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            opacity: 0, scale: 0.95, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 80%", once: true },
          });
        }
      });
      return () => ctx.revert();
    } catch (e) {
      console.warn("ProductDetail animation error:", e);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[rgb(var(--paper))] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-[rgb(var(--ink))] mb-4">
            Product Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 shimmer-cta"
          >
            <ArrowLeft className="w-4 h-4 [dir='rtl']:rotate-180" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const content = product[language as keyof typeof product.en] || product.en;

  return (
    <div className="min-h-screen bg-[rgb(var(--paper))]">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[rgb(var(--paper))] pt-28 pb-16"
      >
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.10), transparent 70%)" }}
        />
        <div className="section-container relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[rgb(var(--ink-faint))] hover:text-[rgb(var(--accent))] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 [dir='rtl']:rotate-180 transition-transform" />
            {t("product.back_home")}
          </Link>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 mt-1">
              <product.icon className="w-12 h-12 sm:w-14 sm:h-14 text-accent" />
            </div>
            <div>
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[rgb(var(--ink))] font-display tracking-tight ${language === "ar" ? "font-arabic-heading" : ""}`}
              >
                {content.title}
              </h1>
              <p className={`text-lg sm:text-xl text-[rgb(var(--accent))] mt-2 font-mono font-medium tracking-wide ${language === "ar" ? "font-arabic" : ""}`}>
                {content.subtitle}
              </p>
            </div>
          </div>

          <p className={`mt-8 text-[rgb(var(--ink-muted))] text-lg leading-relaxed max-w-3xl ${language === "ar" ? "font-arabic" : ""}`}>
            {content.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[rgb(var(--paper-card))]">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[rgb(var(--accent-muted))] rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[rgb(var(--accent))]" />
            </div>
            <TextReveal
              as="h2"
              className={`text-2xl font-bold text-[rgb(var(--ink))] font-display tracking-tight ${language === "ar" ? "font-arabic-heading" : ""}`}
            >
              {t("product.features")}
            </TextReveal>
          </div>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className="reveal-card flex items-start gap-3 p-4 rounded-xl bg-[rgb(var(--paper))] hover:bg-[rgb(var(--paper-deep))] border border-[rgb(var(--rule))] transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-[rgb(var(--accent))] flex-shrink-0 mt-0.5" />
                <span className={`text-[rgb(var(--ink-muted))] ${language === "ar" ? "font-arabic" : ""}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-[rgb(var(--paper))]">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[rgb(var(--accent-muted))] rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-[rgb(var(--accent))]" />
            </div>
            <TextReveal
              as="h2"
              className={`text-2xl font-bold text-[rgb(var(--ink))] font-display tracking-tight ${language === "ar" ? "font-arabic-heading" : ""}`}
            >
              {t("product.use_cases")}
            </TextReveal>
          </div>
          <div ref={useCasesRef} className="grid grid-cols-1 gap-4">
            {content.useCases.map((useCase, i) => (
              <div
                key={i}
                className="reveal-card flex items-start gap-3 p-5 rounded-xl bg-[rgb(var(--paper-card))] border border-[rgb(var(--rule))] hover:border-[rgb(var(--accent))] hover:shadow-card-hover transition-all duration-300"
              >
                <Lightbulb className="w-5 h-5 text-[rgb(var(--accent))] flex-shrink-0 mt-0.5" />
                <span className={`text-[rgb(var(--ink-muted))] ${language === "ar" ? "font-arabic" : ""}`}>
                  {useCase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-[rgb(var(--paper-card))]">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[rgb(var(--accent-muted))] rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-[rgb(var(--accent))]" />
            </div>
            <TextReveal
              as="h2"
              className={`text-2xl font-bold text-[rgb(var(--ink))] font-display tracking-tight ${language === "ar" ? "font-arabic-heading" : ""}`}
            >
              {t("product.benefits")}
            </TextReveal>
          </div>
          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.benefits.map((benefit, i) => (
              <div
                key={i}
                className="reveal-card p-5 rounded-xl bg-[rgb(var(--paper))] border border-[rgb(var(--rule))] hover:shadow-card-hover transition-all duration-300"
              >
                <span className={`text-[rgb(var(--ink))] font-medium ${language === "ar" ? "font-arabic" : ""}`}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-16 bg-[rgb(var(--paper))]">
        <div className="section-container">
          <div className="glow-card relative overflow-hidden p-10 sm:p-14 text-center">
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.08), transparent 68%)" }}
            />
            <div className="relative z-10">
              <h2 className={`text-2xl sm:text-3xl font-bold text-[rgb(var(--ink))] mb-4 font-display tracking-tight ${language === "ar" ? "font-arabic-heading" : ""}`}>
                {t("product.cta_title_prefix")}
                {content.title}
                {t("product.cta_title_suffix")}
              </h2>
              <p className={`text-[rgb(var(--ink-muted))] mb-8 ${language === "ar" ? "font-arabic" : ""}`}>
                {t("product.cta_subtitle")}
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 shimmer-cta"
              >
                {t("product.cta_button")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
