import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useLanguage } from "../contexts/LanguageContext";
import TextReveal from "./TextReveal";

const Products = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-gray-50 border-y border-gray-200/60">
      <div className="section-container">
        <div className="text-center mb-14">
          <TextReveal
            as="h2"
            className={`section-title ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {String(t("products.title")).split("\n").join(" ")}
          </TextReveal>
          <p className="section-subtitle mx-auto">{t("products.subtitle")}</p>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const content =
              product[language as keyof typeof product.en] || product.en;
            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-gray-200/60 hover:border-pulse-200 overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Gradient top bar */}
                <div
                  className={`h-[3px] bg-gradient-to-r ${product.gradient}`}
                />

                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <product.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3
                    className={`text-lg font-semibold text-gray-900 mb-1 ${language === "ar" ? "font-arabic-heading" : ""}`}
                  >
                    {content.title}
                  </h3>
                  <p
                    className={`text-sm font-medium text-pulse-600 mb-3 ${language === "ar" ? "font-arabic" : ""}`}
                  >
                    {content.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {content.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {content.techHighlights.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-pulse-600 text-sm font-medium hover:text-pulse-700 transition-colors group/btn"
                  >
                    {t("products.learn_more")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 [dir='rtl']:rotate-180 [dir='rtl']:group-hover/btn:-translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
