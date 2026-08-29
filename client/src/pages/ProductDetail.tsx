import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Target,
  Lightbulb,
  Zap,
} from "lucide-react";
import { getProductById } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";

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
        // Hero entrance
        if (heroRef.current) {
          gsap.from(heroRef.current.children, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.15,
            ease: "expo.out",
            delay: 0.1,
          });
        }

        // Features stagger
        if (featuresRef.current) {
          const cards = featuresRef.current.querySelectorAll(".reveal-card");
          gsap.set(cards, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: featuresRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "expo.out",
              });
            },
          });
        }

        // Use cases stagger
        if (useCasesRef.current) {
          const cards = useCasesRef.current.querySelectorAll(".reveal-card");
          gsap.set(cards, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: useCasesRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "expo.out",
              });
            },
          });
        }

        // Benefits stagger
        if (benefitsRef.current) {
          const cards = benefitsRef.current.querySelectorAll(".reveal-card");
          gsap.set(cards, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: benefitsRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "expo.out",
              });
            },
          });
        }

        // CTA scale
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              once: true,
            },
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link
            to="/"
            className="button-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const content =
    product[language as keyof typeof product.en] || product.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-pulse-50/30 pt-24 pb-16"
      >
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-pulse-500/5 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pulse-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 [dir='rtl']:rotate-180 transition-transform" />
            {t("product.back_home")}
          </Link>

          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
            >
              <product.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div>
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
              >
                {content.title}
              </h1>
              <p
                className={`text-lg sm:text-xl text-pulse-600 mt-2 font-medium ${language === "ar" ? "font-arabic" : ""}`}
              >
                {content.subtitle}
              </p>
            </div>
          </div>

          <p
            className={`mt-8 text-gray-600 text-lg leading-relaxed max-w-3xl ${language === "ar" ? "font-arabic" : ""}`}
          >
            {content.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pulse-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-pulse-600" />
            </div>
            <TextReveal
              as="h2"
              className={`text-2xl font-bold text-gray-900 ${language === "ar" ? "font-arabic-heading" : ""}`}
            >
              {t("product.features")}
            </TextReveal>
          </div>
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className="reveal-card flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-pulse-50/50 border border-gray-100 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                <span className={`text-gray-700 ${language === "ar" ? "font-arabic" : ""}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pulse-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-pulse-600" />
            </div>
            <TextReveal
              as="h2"
              className={`text-2xl font-bold text-gray-900 ${language === "ar" ? "font-arabic-heading" : ""}`}
            >
              {t("product.use_cases")}
            </TextReveal>
          </div>
          <div ref={useCasesRef} className="grid grid-cols-1 gap-4">
            {content.useCases.map((useCase, i) => (
              <div
                key={i}
                className="reveal-card flex items-start gap-3 p-5 rounded-xl bg-white border border-gray-100 hover:border-pulse-200 hover:shadow-md transition-all duration-300"
              >
                <Lightbulb className="w-5 h-5 text-pulse-500 flex-shrink-0 mt-0.5" />
                <span className={`text-gray-700 ${language === "ar" ? "font-arabic" : ""}`}>
                  {useCase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pulse-100 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-pulse-600" />
            </div>
            <TextReveal
              as="h2"
              className={`text-2xl font-bold text-gray-900 ${language === "ar" ? "font-arabic-heading" : ""}`}
            >
              {t("product.benefits")}
            </TextReveal>
          </div>
          <div ref={benefitsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.benefits.map((benefit, i) => (
              <div
                key={i}
                className="reveal-card p-5 rounded-xl bg-gradient-to-br from-pulse-50/50 to-white border border-pulse-100 hover:shadow-md transition-all duration-300"
              >
                <span className={`text-gray-700 font-medium ${language === "ar" ? "font-arabic" : ""}`}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="py-16 bg-gradient-to-br from-pulse-600 via-pulse-500 to-purple-600"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-white mb-4 ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {t("product.cta_title_prefix")}
            {content.title}
            {t("product.cta_title_suffix")}
          </h2>
          <p className="text-white/90 mb-8">
            {t("product.cta_subtitle")}
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-white text-pulse-600 font-semibold py-3.5 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t("product.cta_button")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
