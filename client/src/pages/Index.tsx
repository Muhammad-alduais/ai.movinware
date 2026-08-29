import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const marqueeItems = [
    "AI Consulting",
    "Machine Learning",
    "Computer Vision",
    "Natural Language",
    "Predictive Analytics",
    "Smart Search",
    "Automation",
    "Deep Learning",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee items={marqueeItems} className="py-8 bg-gray-50/80 border-y border-gray-100" />
        <Services />
        <Products />
        <Features />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
