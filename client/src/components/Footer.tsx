import { useEffect, useRef } from "react";
import { Linkedin, Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t, language } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !footerRef.current) return;

    const el = footerRef.current;
    const children = el.querySelectorAll(".footer-reveal");
    if (children.length === 0) return;

    try {
      gsap.set(children, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out",
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    } catch (e) {
      console.warn("Footer animation error:", e);
    }
  }, []);

  const safeT = (key: string, fallback: string = key) => {
    const result = t(key);
    return typeof result === "string" ? result : fallback;
  };

  const quickLinks = [
    { name: safeT("nav.services", "Services"), href: "#services" },
    { name: safeT("nav.products", "Products"), href: "#products" },
    { name: safeT("nav.features", "Why Us"), href: "#features" },
    { name: safeT("nav.contact", "Contact"), href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-pulse-500/5 rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div
              className={`lg:col-span-2 footer-reveal ${language === "ar" ? "text-right" : "text-left"}`}
            >
              <div
                className={`flex items-start gap-4 mb-6 ${language === "ar" ? "flex-row-reverse justify-end" : ""}`}
                dir="ltr"
              >
                <div className="flex items-baseline gap-2">
                  <div className="w-8 h-8 text-white flex-shrink-0 flex items-end">
                    <svg
                      viewBox="0 0 494.95 492.9"
                      fill="currentColor"
                      className="w-full h-full"
                    >
                      <g>
                        <polygon points="297.32 0 67.34 482.87 0 341.74 162.63 0 297.32 0" />
                        <polygon points="494.95 178.76 343.02 476.88 332.83 480.38 294.08 387.79 304.42 386.86 408.85 174.5 494.95 178.76" />
                        <polygon points="402.47 102.46 213.4 488.21 200.41 492.9 148.94 374.77 162.18 373.37 291.99 98.66 402.47 102.46" />
                      </g>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold font-glacial text-white leading-none">
                    MovinWare
                  </span>
                  <span className="text-xs font-medium text-pulse-400 bg-pulse-900/50 px-1.5 py-0.5 rounded-full">
                    AI
                  </span>
                </div>
              </div>
              <p
                className={`text-gray-300 leading-relaxed mb-8 max-w-md ${language === "ar" ? "font-arabic" : "font-inter"}`}
              >
                {safeT(
                  "footer.description",
                  "AI-powered solutions designed to transform modern businesses."
                )}
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 border border-gray-700/60 rounded-full flex items-center justify-center hover:bg-pulse-500 hover:border-pulse-400 transition-all duration-300 hover:scale-105"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-reveal">
              <h3 className="text-lg font-semibold mb-6">
                {safeT("footer.quick_links", "Quick Links")}
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-reveal">
              <h3 className="text-lg font-semibold mb-6">
                {safeT("footer.contact", "Contact")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 ms-3 text-pulse-500 flex-shrink-0" />
                  <span className="text-sm">info@movinware.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 ms-3 text-pulse-500 flex-shrink-0" />
                  <span className="text-sm" dir="ltr">
                    +966 561820949
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 ms-3 text-pulse-500 flex-shrink-0" />
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400" dir="ltr">
              {safeT(
                "footer.copyright",
                "© 2026 MovinWare AI. All rights reserved."
              )}
            </div>
            <div className="text-sm text-gray-400">
              {safeT("footer.built_by", "Developed by MovinWare Team")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
