import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GridPattern } from "@/components/magicui/grid-pattern";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    try {
      const ctx = gsap.context(() => {
        if (formRef.current) {
          gsap.from(formRef.current, {
            opacity: 0, x: -40, duration: 0.8, ease: "expo.out",
            scrollTrigger: { trigger: formRef.current, start: "top 80%", once: true },
          });
        }
        if (infoRef.current) {
          const cards = infoRef.current.querySelectorAll(".info-card");
          gsap.set(cards, { opacity: 0, x: 40 });
          ScrollTrigger.create({
            trigger: infoRef.current, start: "top 80%", once: true,
            onEnter: () => {
              gsap.to(cards, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "expo.out" });
            },
          });
        }
      });
      return () => ctx.revert();
    } catch (e) {
      console.warn("Contact animation error:", e);
    }
  }, []);

  const contactInfo = [
    { icon: Mail, title: t("contact.info.email"), value: "info@movinware.com", link: "mailto:info@movinware.com" },
    { icon: Phone, title: t("contact.info.phone"), value: "+966 561820949", link: "tel:+966561820949" },
    { icon: MapPin, title: t("contact.info.location"), value: t("contact.info.location_value"), link: "#" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 lg:py-28 bg-[rgb(var(--paper))]">
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
          <span className="section-idx">§ 04</span>
          <div className="flex-1 h-px bg-[rgb(var(--rule))]" />
        </div>
        <div className="mb-14">
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[rgb(var(--ink))] leading-tight ${language === "ar" ? "font-arabic-heading" : ""}`}>
            {t("contact.title") as string}
          </h2>
          <p className={`mt-4 text-lg text-[rgb(var(--ink-soft))] max-w-2xl ${language === "ar" ? "font-arabic" : ""}`}>
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CTA Card (mailto) */}
          <div ref={formRef} className="bg-paper-card/60 border border-rule rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-xl font-semibold text-ink mb-4">
              {t("contact.cta.title")}
            </h3>
            <p className="text-ink-soft mb-8 max-w-xl mx-auto">
              {t("contact.cta.description")}
            </p>
            <a
              href="mailto:info@movinware.com"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
              style={{
                background: "rgb(var(--accent))",
                boxShadow: "0 10px 30px -8px rgba(73, 66, 228, 0.7)",
              }}
            >
              {t("contact.cta.button")}
              <Send className="w-4 h-4 [dir='rtl']:rotate-180" />
            </a>
            <p className="mt-4 text-sm text-faint">
              {t("contact.cta.note")}
            </p>
          </div>

          {/* Info cards */}
          <div ref={infoRef} className="space-y-4">
            <h3 className="text-xl font-semibold text-ink mb-6">
              {t("contact.info.title")}
            </h3>
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="info-card flex items-center gap-4 p-4 border border-rule bg-paper-card/60 rounded-2xl hover:border-accent/40 hover:bg-paper-raise/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[rgb(var(--accent-muted))]">
                  <info.icon className="w-5 h-5 text-[rgb(var(--accent))]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{info.title}</p>
                  <p className="text-sm text-ink-soft" dir={info.value.includes("+966") ? "ltr" : undefined}>
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;