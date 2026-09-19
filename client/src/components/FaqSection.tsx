import { useLanguage } from "../contexts/LanguageContext";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs?: FaqItem[];
}

const FaqSection = ({ faqs = [] }: FaqSectionProps) => {
  const { t } = useLanguage();

  const defaultFaqs: FaqItem[] = [
    { question: t("faq.q1") as string, answer: t("faq.a1") as string },
    { question: t("faq.q2") as string, answer: t("faq.a2") as string },
    { question: t("faq.q3") as string, answer: t("faq.a3") as string },
    { question: t("faq.q4") as string, answer: t("faq.a4") as string },
    // Pricing FAQ hidden for now (kept for future):
    // { question: t("faq.q5") as string, answer: t("faq.a5") as string },
  ];

  const allFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  if (allFaqs.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="kicker shrink-0">{t("faq.kicker")}</h2>
        <span className="h-px flex-1 bg-rule" />
      </div>

      <div className="divide-y border-y border-rule">
        {allFaqs.map((faq, index) => (
          <details key={index} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-lg font-semibold tracking-tight-display text-ink transition-colors group-open:text-accent">
                {faq.question}
              </h3>
              <span className="font-display shrink-0 text-2xl leading-none text-faint transition-transform duration-200 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;