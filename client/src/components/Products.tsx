import { useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useLanguage } from "../contexts/LanguageContext";
import { GridPattern } from "@/components/magicui/grid-pattern";

const Products = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="products" ref={sectionRef} className="relative py-20 lg:py-28 bg-paper-deep/60">
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
          <span className="section-idx">§ 02</span>
          <div className="flex-1 h-px bg-rule" />
        </div>
        <div className="mb-14">
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-ink leading-tight ${language === "ar" ? "font-arabic-heading" : ""}`}>
            {String(t("products.title")).split("\n").join(" ")}
          </h2>
          <p className={`mt-4 text-lg text-ink-soft max-w-2xl ${language === "ar" ? "font-arabic" : ""}`}>
            {t("products.subtitle")}
          </p>
          <p className={`mt-3 text-base font-mono text-faint tracking-wider ${language === "ar" ? "font-arabic" : ""}`}>
            {t("products.tagline")}
          </p>
        </div>

        {/* Product grid — 3-across cards */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => {
            const content = product[language as keyof typeof product.en] || product.en;
            const num = (index + 1).toString().padStart(2, "0");
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative flex flex-col rounded-2xl border border-rule bg-paper-card p-6 transition-all duration-300 hover:border-accent/40 hover:bg-paper-raise/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-shrink-0">
                    <product.icon className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-mono text-xs font-medium text-faint transition-colors group-hover:text-accent shrink-0">
                    {num}
                  </span>
                </div>
                <div className="flex-1 min-w-0 mt-5">
                  <h3 className={`font-display text-xl font-semibold tracking-tight-display text-ink transition-colors group-hover:text-accent ${language === "ar" ? "font-arabic-heading" : ""}`}>
                    {content.title}
                  </h3>
                  <p className={`mt-1.5 text-sm leading-relaxed text-muted ${language === "ar" ? "font-arabic" : ""}`}>
                    {content.subtitle}
                  </p>
                </div>
                <div className="mt-auto pt-5 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors group-hover:text-accent ${language === "ar" ? "font-arabic" : ""}`}>
                    {t("products.know_more")}
                    <span aria-hidden className="[dir='rtl']:rotate-180">→</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.7rem] text-faint/70"
                  >
                    {num}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-right">
          <Link
            to="/products"
            className="text-sm font-medium text-accent-soft transition-colors hover:text-accent"
          >
            {t("products.view_all")} <span aria-hidden className="[dir='rtl']:rotate-180">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;