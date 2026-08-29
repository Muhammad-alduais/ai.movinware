import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string | string[];
  isRTL: boolean;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.products': 'Solutions',
    'nav.features': 'Why Us',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.open': 'Open menu',

    'hero.chip': 'AI Solutions & Services',
    'hero.title': 'Intelligent AI Solutions\nfor Modern Business',
    'hero.subtitle': 'Transform your business with cutting-edge artificial intelligence. From custom AI development to intelligent automation, we build solutions that learn, adapt, and drive growth.',
    'hero.cta': 'Explore Our AI',
    'hero.cta_secondary': 'View Solutions',

    'services.section': 'Our Services',
    'services.title': 'AI Services Tailored\nfor Your Success',
    'services.subtitle': 'End-to-end AI consulting and development services designed to transform your business operations',
    'services.consulting.title': 'AI Consulting',
    'services.consulting.description': 'Strategic AI roadmap development, feasibility analysis, and technology selection tailored to your business goals.',
    'services.custom.title': 'Custom AI Development',
    'services.custom.description': 'Build bespoke AI models, NLP systems, computer vision solutions, and predictive analytics platforms from scratch.',
    'services.integration.title': 'AI Integration',
    'services.integration.description': 'Seamlessly integrate AI capabilities into your existing systems, workflows, and business processes.',
    'services.automation.title': 'Intelligent Automation',
    'services.automation.description': 'Automate repetitive tasks, decision-making processes, and complex workflows with AI-powered automation.',

    'products.section': 'AI Solutions',
    'products.title': 'Our Best AI Solutions',
    'products.subtitle': 'Production-ready AI systems built with modern architectures to solve real business problems',
    'products.agentic.title': 'Agentic AI Systems',
    'products.agentic.description': 'Autonomous AI agents that plan, reason, and execute multi-step tasks across your business tools with minimal human oversight.',
    'products.agentic.tags': ['Tool Use', 'Multi-Agent', 'Autonomous'],
    'products.rag.title': 'RAG Systems',
    'products.rag.description': 'Retrieval-Augmented Generation that grounds LLM responses in your private documents, knowledge bases, and enterprise data.',
    'products.rag.tags': ['Vector Search', 'Context Aware', 'Enterprise Data'],
    'products.chatbot.title': 'Intelligent Chatbots',
    'products.chatbot.description': 'Context-aware conversational AI for customer support, lead qualification, and internal helpdesks with human-like responses.',
    'products.chatbot.tags': ['24/7 Support', 'Multi-language', 'Lead Gen'],
    'products.analytics.title': 'Predictive Analytics',
    'products.analytics.description': 'ML-powered forecasting, anomaly detection, and trend analysis that turn your raw data into actionable business intelligence.',
    'products.analytics.tags': ['Forecasting', 'Anomaly Detection', 'BI'],
    'products.ocr.title': 'Smart Document Processing',
    'products.ocr.description': 'AI-driven OCR and document understanding that extracts, validates, and routes information from invoices, contracts, and forms.',
    'products.ocr.tags': ['Extraction', 'Validation', 'Automation'],
    'products.vision.title': 'Computer Vision',
    'products.vision.description': 'Deep learning models for image recognition, quality inspection, object detection, and visual monitoring across industries.',
    'products.vision.tags': ['Detection', 'Inspection', 'Monitoring'],

    'products.learn_more': 'Learn More',
    'products.built_with': 'Built with',

    'features.section': 'Why MovinWare AI',
    'features.title': 'Built Different.\nBuilt Better.',
    'features.subtitle': 'What sets our AI solutions apart from the competition',
    'features.expertise.title': 'Domain Expertise',
    'features.expertise.description': 'Deep knowledge across education, healthcare, retail, manufacturing, and logistics sectors.',
    'features.localization.title': 'MENA Localization',
    'features.localization.description': 'Full Arabic language support, RTL interfaces, and cultural adaptation for the MENA market.',
    'features.support.title': 'Ongoing Support',
    'features.support.description': 'Dedicated support team with 24/7 monitoring, regular updates, and continuous optimization.',
    'features.security.title': 'Enterprise Security',
    'features.security.description': 'SOC2-compliant infrastructure with end-to-end encryption and data protection standards.',

    'contact.section': 'Contact Us',
    'contact.title': 'Start Your AI Journey',
    'contact.subtitle': 'Connect with our AI experts to discuss your project requirements',
    'contact.form.title': 'Send a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone Number',
    'contact.form.service': 'Service Interest',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.sent': 'Message Sent!',
    'contact.form.message_placeholder': 'Tell us about your AI project...',
    'contact.form.error.name': 'Please enter your name',
    'contact.form.error.email': 'Please enter your email',
    'contact.form.error.email_invalid': 'Please enter a valid email',
    'contact.form.error.message': 'Please enter your message',
    'contact.form.toast_success': 'Message sent successfully!',
    'contact.form.toast_success_desc': 'We\'ll respond within 24 hours.',
    'contact.form.toast_error': 'Failed to send message',
    'contact.form.toast_error_desc': 'Please try again or email us at info@movinware.com',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.info.location_value': 'Online',
    'contact.inquiry.general': 'General Inquiry',
    'contact.inquiry.consulting': 'AI Consulting',
    'contact.inquiry.custom': 'Custom Development',
    'contact.inquiry.integration': 'AI Integration',
    'contact.inquiry.support': 'Support',
    'contact.inquiry.demo': 'Demo Request',

    'footer.description': 'AI-powered solutions designed to transform modern businesses.\nFrom intelligent automation to custom AI development, we build the future of your business.',
    'footer.quick_links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2026 MovinWare AI. All rights reserved.',
    'footer.built_by': 'Developed by MovinWare Team',

    'cta.title': 'Ready to Transform\nYour Business with AI?',
    'cta.subtitle': 'Let our AI experts help you build intelligent solutions that drive growth and efficiency.',
    'cta.button': 'Get Started Today',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.products': 'الحلول',
    'nav.features': 'لماذا نحن',
    'nav.contact': 'تواصل معنا',
    'nav.menu': 'القائمة',
    'nav.close': 'إغلاق القائمة',
    'nav.open': 'فتح القائمة',

    'hero.chip': 'حلول وخدمات الذكاء الاصطناعي',
    'hero.title': 'حلول ذكاء اصطناعي ذكية\nللأعمال الحديثة',
    'hero.subtitle': ' حوّل أعمالك بأحدث تقنيات الذكاء الاصطناعي. من تطوير حلول الذكاء الاصطناعي المخصصة إلى الأتمتة الذكية، نبني حلولًا تتعلم وتتكيف وتدفع النمو.',
    'hero.cta': 'استكشف حلولنا',
    'hero.cta_secondary': 'عرض الحلول',

    'services.section': 'خدماتنا',
    'services.title': 'خدمات ذكاء اصطناعي\nمصممة لنجاحك',
    'services.subtitle': 'خدمات استشارية وتطوير شاملة للذكاء الاصطناعي مصممة لتحويل عمليات أعمالك',
    'services.consulting.title': 'استشارات الذكاء الاصطناعي',
    'services.consulting.description': 'تطوير خارطة طريق الذكاء الاصطناعي الاستراتيجية وتحليل الجدوى واختيار التقنيات المخصص لأهداف عملك.',
    'services.custom.title': 'تطوير ذكاء اصطناعي مخصص',
    'services.custom.description': 'بناء نماذج ذكاء اصطناعي مخصصة وأنظمة معالجة اللغات الطبيعية وحلول الرؤية الحاسوبية من الصفر.',
    'services.integration.title': 'تكامل الذكاء الاصطناعي',
    'services.integration.description': 'دمج قدرات الذكاء الاصطناعي بسلاسة في أنظمتك وعمليات عملك الحالية.',
    'services.automation.title': 'أتمتة ذكية',
    'services.automation.description': 'أتمتة المهام المتكررة وعمليات اتخاذ القرارات وسير العمل المعقدة بأتمتة مدعومة بالذكاء الاصطناعي.',

    'products.section': 'حلولنا',
    'products.title': 'أفضل حلول الذكاء الاصطناعي',
    'products.subtitle': 'أنظمة ذكاء اصطناعي جاهزة للإنتاج مبنية ببنية حديثة لحل مشاكل الأعمال الحقيقية',
    'products.agentic.title': 'أنظمة الوكيل الذكي',
    'products.agentic.description': 'وكلاء ذكاء اصطناعي مستقلون يخططون ويبررون وينفذون مهام متعددة الخطوات عبر أدوات أعمالك ب最少 إشراف بشري.',
    'products.agentic.tags': ['استخدام الأدوات', 'وكيل متعدد', 'مستقل'],
    'products.rag.title': 'أنظمة RAG',
    'products.rag.description': 'توليد معزز بالاسترجاع يضمن ردود نماذج اللغة الكبيرة في مستنداتك الخاصة وقواعد معرفتك وبيانات مؤسستك.',
    'products.rag.tags': ['بحث المتجهات', 'وعي بالسياق', 'بيانات المؤسسات'],
    'products.chatbot.title': 'روبوتات محادثة ذكية',
    'products.chatbot.description': 'ذكاء اصطناعي محادث واعٍ بالسياق لدعم العملاء وتأهيل العملاء المحتملين وأطر المساعدة الداخلية.',
    'products.chatbot.tags': ['دعم 24/7', 'متعدد اللغات', 'توليد عملاء'],
    'products.analytics.title': 'التحليلات التنبؤية',
    'products.analytics.description': 'تنبؤات مدعومة بالتعلم الآلي واكتشاف الشذوذ وتحليل الاتجاهات التي تحول بياناتك الخام إلى ذكاء أعمال قابل للتنفيذ.',
    'products.analytics.tags': ['تنبؤ', 'اكتشاف الشذوذ', 'ذكاء أعمال'],
    'products.ocr.title': 'معالجة المستندات الذكية',
    'products.ocr.description': 'تعرّف ضوئي على الحروف مدعوم بالذكاء الاصطناعي وفهم المستندات يستخرج ويتحقق ويوجه المعلومات من الفواتير والعقود والنماذج.',
    'products.ocr.tags': ['استخراج', 'تحقق', 'أتمتة'],
    'products.vision.title': 'الرؤية الحاسوبية',
    'products.vision.description': 'نماذج تعلم عميق للتعرف على الصور وفحص الجودة واكتشاف الكائنات والمراقبة البصرية عبر الصناعات.',
    'products.vision.tags': ['اكتشاف', 'فحص', 'مراقبة'],

    'products.learn_more': 'اعرف المزيد',
    'products.built_with': 'مبنية بـ',

    'features.section': 'لماذا MovinWare AI',
    'features.title': 'مختلف.\nأفضل.',
    'features.subtitle': 'ما يميز حلول الذكاء الاصطناعي لدينا عن المنافسين',
    'features.expertise.title': 'خبرة في المجال',
    'features.expertise.description': 'معرفة عميقة عبر قطاعات التعليم والصحة والتجارة والتصنيع واللوجستيات.',
    'features.localization.title': 'توطين MENA',
    'features.localization.description': 'دعم كامل للغة العربية وواجهات من اليمين لليسار والتكيف الثقافي لسوق MENA.',
    'features.support.title': 'دعم مستمر',
    'features.support.description': 'فريق دعم مخصص مع مراقبة على مدار الساعة وتحديثات منتظمة وتحسين مستمر.',
    'features.security.title': 'أمان المؤسسات',
    'features.security.description': 'بنية تحتية متوافقة مع SOC2 مع تشفير شامل ومعايير حماية البيانات.',

    'contact.section': 'تواصل معنا',
    'contact.title': 'ابدأ رحلة الذكاء الاصطناعي',
    'contact.subtitle': 'تواصل مع خبراء الذكاء الاصطناعي لدينا لمناقشة متطلبات مشروعك',
    'contact.form.title': 'أرسل رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.company': 'الشركة',
    'contact.form.phone': 'رقم الهاتف',
    'contact.form.service': 'الخدمة المطلوبة',
    'contact.form.message': 'الرسالة',
    'contact.form.send': 'إرسال الرسالة',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.form.sent': 'تم الإرسال!',
    'contact.form.message_placeholder': 'أخبرنا عن مشروع الذكاء الاصطناعي الخاص بك...',
    'contact.form.error.name': 'يرجى إدخال اسمك',
    'contact.form.error.email': 'يرجى إدخال بريدك الإلكتروني',
    'contact.form.error.email_invalid': 'يرجى إدخال بريد إلكتروني صالح',
    'contact.form.error.message': 'يرجى إدخال رسالتك',
    'contact.form.toast_success': 'تم إرسال الرسالة بنجاح!',
    'contact.form.toast_success_desc': 'سنرد خلال 24 ساعة.',
    'contact.form.toast_error': 'فشل إرسال الرسالة',
    'contact.form.toast_error_desc': 'يرجى المحاولة مرة أخرى أو مراسلتنا على info@movinware.com',
    'contact.info.title': 'معلومات التواصل',
    'contact.info.email': 'البريد الإلكتروني',
    'contact.info.phone': 'الهاتف',
    'contact.info.location': 'الموقع',
    'contact.info.location_value': 'عبر الإنترنت',
    'contact.inquiry.general': 'استفسار عام',
    'contact.inquiry.consulting': 'استشارات الذكاء الاصطناعي',
    'contact.inquiry.custom': 'تطوير مخصص',
    'contact.inquiry.integration': 'تكامل الذكاء الاصطناعي',
    'contact.inquiry.support': 'الدعم',
    'contact.inquiry.demo': 'طلب عرض',

    'footer.description': 'حلول مدعومة بالذكاء الاصطناعي مصممة لتحويل الأعمال الحديثة.\nمن الأتمتة الذكية إلى تطوير الذكاء الاصطناعي المخصص، نبني مستقبل أعمالك.',
    'footer.quick_links': 'روابط سريعة',
    'footer.contact': 'التواصل',
    'footer.copyright': '© 2026 MovinWare AI. جميع الحقوق محفوظة.',
    'footer.built_by': 'تطوير فريق MovinWare',

    'cta.title': 'مستعد لتحويل\nأعمالك بالذكاء الاصطناعي؟',
    'cta.subtitle': 'دع خبراء الذكاء الاصطناعي لدينا يساعدونك في بناء حلول ذكية تدفع النمو والكفاءة.',
    'cta.button': 'ابدأ اليوم',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string | string[] => {
    const result = translations[language as keyof typeof translations]?.[key as keyof typeof translations.en];
    if (result === undefined) return key;
    return result;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
