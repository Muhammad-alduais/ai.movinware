import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import FaqSection from "@/components/FaqSection";
import { useLanguage } from "@/contexts/LanguageContext";

const marqueeItems = [
  "AI Consulting",
  "Custom Development",
  "Automation",
  "Machine Learning",
  "Generative AI",
  "Chatbots",
  "Computer Vision",
  "NLP",
  "RAG",
  "AI Agents",
];

const Index = () => {
  const { t } = useLanguage();

  const localizedMarqueeItems = [
    t("marquee.consulting"),
    t("marquee.custom"),
    t("marquee.automation"),
    t("marquee.ml"),
    t("marquee.genai"),
    t("marquee.chatbots"),
    t("marquee.vision"),
    t("marquee.nlp"),
    t("marquee.rag"),
    t("marquee.agents"),
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <Hero />
      <Services />
      <Marquee items={localizedMarqueeItems} speed={35} className="py-10 bg-paper-card/60 border-y border-rule" />
      <Products />
      <Features />
      <CTA />
      <FaqSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;