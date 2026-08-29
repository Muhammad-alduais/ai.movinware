import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    try {
      const ctx = gsap.context(() => {
        if (formRef.current) {
          gsap.from(formRef.current, {
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              once: true,
            },
          });
        }

        if (infoRef.current) {
          const cards = infoRef.current.querySelectorAll(".info-card");
          gsap.set(cards, { opacity: 0, x: 40 });
          ScrollTrigger.create({
            trigger: infoRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "expo.out",
              });
            },
          });
        }
      });

      return () => ctx.revert();
    } catch (e) {
      console.warn("Contact animation error:", e);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert(t("contact.form.error.name"));
      return;
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      alert(t("contact.form.error.email_invalid"));
      return;
    }
    if (!formData.message.trim()) {
      alert(t("contact.form.error.message"));
      return;
    }

    setIsSubmitting(true);
    const subject = `${formData.service} - AI Contact Form`;
    const body = `Name: ${formData.fullName}\nEmail: ${formData.email}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:info@movinware.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        service: "General Inquiry",
        message: "",
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.info.email"),
      value: "info@movinware.com",
      link: "mailto:info@movinware.com",
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      value: "+966 561820949",
      link: "tel:+966561820949",
    },
    {
      icon: MapPin,
      title: t("contact.info.location"),
      value: t("contact.info.location_value"),
      link: "#",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="pulse-chip mx-auto mb-4">
            <span>{t("contact.section")}</span>
          </div>
          <TextReveal
            as="h2"
            className={`section-title ${language === "ar" ? "font-arabic-heading" : "font-brockmann"}`}
          >
            {t("contact.title") as string}
          </TextReveal>
          <p className="section-subtitle mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={formRef}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("contact.form.title")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.name")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.email")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.company")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("contact.form.service")}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all"
                >
                  <option value="General Inquiry">
                    {t("contact.inquiry.general")}
                  </option>
                  <option value="AI Consulting">
                    {t("contact.inquiry.consulting")}
                  </option>
                  <option value="Custom Development">
                    {t("contact.inquiry.custom")}
                  </option>
                  <option value="AI Integration">
                    {t("contact.inquiry.integration")}
                  </option>
                  <option value="Support">
                    {t("contact.inquiry.support")}
                  </option>
                  <option value="Demo Request">
                    {t("contact.inquiry.demo")}
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("contact.form.message")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pulse-500 focus:border-transparent transition-all resize-none"
                  placeholder={t("contact.form.message_placeholder")}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : submitStatus === "success"
                      ? "bg-green-500"
                      : "bg-pulse-500 hover:bg-pulse-600"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {t("contact.form.sending")}
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t("contact.form.sent")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t("contact.form.send")}
                  </>
                )}
              </button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("contact.info.title")}
            </h3>
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="info-card flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-11 h-11 bg-pulse-100 rounded-lg mr-4">
                  <info.icon className="w-5 h-5 text-pulse-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{info.title}</p>
                  <p
                    className="text-gray-600 text-sm"
                    dir={
                      info.value.includes("+966") ? "ltr" : undefined
                    }
                  >
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
