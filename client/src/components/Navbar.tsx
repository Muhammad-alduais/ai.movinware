import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageSwitcher = ({ scrolled }: { scrolled: boolean }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className={cn(
        "px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-300",
        scrolled
          ? "border-gray-200 hover:border-pulse-400 hover:bg-pulse-50 text-gray-700"
          : "border-white/30 hover:border-white/60 hover:bg-white/10 text-white"
      )}
      dir="ltr"
    >
      {language === 'en' ? 'عربي' : 'EN'}
    </button>
  );
};

const Navbar = () => {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth < 768 ? 100 : 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.services') as string, id: 'services' },
    { label: t('nav.products') as string, id: 'products' },
    { label: t('nav.features') as string, id: 'features' },
    { label: t('nav.contact') as string, id: 'contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          <a href="#" className="flex items-baseline gap-2 hover:opacity-80 transition-all duration-300 flex-shrink-0" onClick={(e) => { e.preventDefault(); scrollToTop(); }} dir="ltr">
            <div className={cn(
              "w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0 flex items-end",
              isScrolled ? "text-pulse-500" : "text-white"
            )}>
              <svg viewBox="0 0 494.95 492.9" fill="currentColor" className="w-full h-full">
                <g>
                  <polygon points="297.32 0 67.34 482.87 0 341.74 162.63 0 297.32 0" />
                  <polygon points="494.95 178.76 343.02 476.88 332.83 480.38 294.08 387.79 304.42 386.86 408.85 174.5 494.95 178.76" />
                  <polygon points="402.47 102.46 213.4 488.21 200.41 492.9 148.94 374.77 162.18 373.37 291.99 98.66 402.47 102.46" />
                </g>
              </svg>
            </div>
            <span className={cn(
              "text-xl lg:text-2xl font-bold font-glacial leading-none",
              isScrolled ? "text-gray-900" : "text-white"
            )}>MovinWare</span>
            <span className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded-full",
              isScrolled ? "text-pulse-500 bg-pulse-50" : "text-white bg-white/15"
            )}>AI</span>
          </a>

          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            <button onClick={scrollToTop} className={cn("modern-nav-link", isScrolled ? "" : "!text-white hover:!bg-white/10")}>{t('nav.home')}</button>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className={cn("modern-nav-link", isScrolled ? "" : "!text-white hover:!bg-white/10")}>{link.label}</button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <LanguageSwitcher scrolled={isScrolled} />
          </div>

          <div className="flex items-center space-x-3 lg:hidden">
            <LanguageSwitcher scrolled={isScrolled} />
            <button
              className={cn(
                "relative z-[10001] p-2.5 rounded-xl backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300",
                isScrolled
                  ? "bg-white/80 border border-gray-200/50"
                  : "bg-white/15 border border-white/30"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Menu size={20} className={isScrolled ? "text-gray-700" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-[9999] lg:hidden transition-all duration-500",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
        <div className={cn(
          "fixed top-0 h-screen w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl z-[10000] transition-all duration-500",
          language === 'ar' ? 'left-0' : 'right-0',
          isMenuOpen ? "translate-x-0 opacity-100" : (language === 'ar' ? "-translate-x-full" : "translate-x-full") + " opacity-0"
        )}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
            <h2 className={`text-lg font-bold text-gray-900 ${language === 'ar' ? 'font-arabic' : 'font-brockmann'}`}>{t('nav.menu')}</h2>
            <button onClick={() => setIsMenuOpen(false)} className="p-2.5 rounded-xl bg-white/80 shadow-sm border border-gray-200/50">
              <X size={18} className="text-gray-700" />
            </button>
          </div>
          <nav className="p-6 space-y-3">
            <button onClick={scrollToTop} className="block w-full text-left py-4 px-4 text-gray-700 hover:text-pulse-600 font-medium rounded-xl bg-white/60 border border-gray-100/50 shadow-sm hover:shadow-md transition-all">{t('nav.home')}</button>
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="block w-full text-left py-4 px-4 text-gray-700 hover:text-pulse-600 font-medium rounded-xl bg-white/60 border border-gray-100/50 shadow-sm hover:shadow-md transition-all">{link.label}</button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
