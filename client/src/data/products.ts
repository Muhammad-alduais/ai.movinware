import { Bot, FileText, Eye, Brain, BarChart3, MessageSquareMore } from "lucide-react";

export interface Product {
  id: string;
  icon: any;
  gradient: string;
  en: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    useCases: string[];
    benefits: string[];
    techHighlights: string[];
  };
  ar: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    useCases: string[];
    benefits: string[];
    techHighlights: string[];
  };
}

export const products: Product[] = [
  {
    id: "movinchat",
    icon: MessageSquareMore,
    gradient: "from-blue-500 to-cyan-500",
    en: {
      title: "MovinChat",
      subtitle: "AI-Powered Conversational Platform",
      description: "An intelligent chatbot platform that handles customer support, lead qualification, and internal helpdesk queries with human-like conversational abilities. MovinChat understands context, remembers conversation history, and learns from interactions to deliver increasingly accurate responses.",
      features: [
        "Multi-turn conversation with context retention",
        "Human handoff with smart escalation rules",
        "Custom training on your company knowledge base",
        "Real-time analytics dashboard",
        "WhatsApp, Web, and API integrations",
        "Multi-language support including Arabic",
      ],
      useCases: [
        "Customer support automation for e-commerce",
        "Lead qualification and appointment booking",
        "Internal IT helpdesk and HR assistant",
        "Restaurant order taking and reservations",
        "Educational institution student inquiries",
      ],
      benefits: [
        "Reduces support ticket volume by 60-80%",
        "24/7 availability with instant response times",
        "Consistent brand voice across all channels",
        "Handles thousands of conversations simultaneously",
      ],
      techHighlights: ["Fine-tuned LLMs", "RAG Pipeline", "WebSocket Real-time", "Multi-channel SDK"],
    },
    ar: {
      title: "MovinChat",
      subtitle: "منصة محادثة مدعومة بالذكاء الاصطناعي",
      description: "منصة روبوت محادث ذكية تتعامل مع دعم العملاء وتأهيل العملاء المحتملين واستفسارات مكتب المساعدة الداخلية بقدرات محادثة شبيهة بالبشر. يفهم MovinChat السياق وتاريخ المحادثة ويتعلم من التفاعلات لتقديم ردود دقيقة بشكل متزايد.",
      features: [
        "محادثة متعددة الدورات مع الاحتفاظ بالسياق",
        "تحويل ذكي للبشر مع قواعد تصعيد مخصصة",
        "تدريب مخصص على قاعدة معرفة شركتك",
        "لوحة تحليلات في الوقت الفعلي",
        "تكاملات واتساب وويب وواجهة برمجة التطبيقات",
        "دعم متعدد اللغات بما في ذلك العربية",
      ],
      useCases: [
        "أتمتة دعم العملاء للتجارة الإلكترونية",
        "تأهيل العملاء المحتملين وحجز المواعيد",
        "مساعد مكتب المساعدة التقنية والموارد البشرية الداخلية",
        "استلام طلبات المطاعم والحجوزات",
        "استفسارات الطلاب في المؤسسات التعليمية",
      ],
      benefits: [
        "يقلل حجم تذاكر الدعم بنسبة 60-80%",
        "توفر على مدار الساعة مع أوقات استجابة فورية",
        "صوت علامة تجارية متسق عبر جميع القنوات",
        "يعالج آلاف المحادثات في وقت واحد",
      ],
      techHighlights: ["نماذج لغة مصغرة", "خط أنابيب RAG", "ويب سوكيت في الوقت الفعلي", "SDK متعدد القنوات"],
    },
  },
  {
    id: "movindoc",
    icon: FileText,
    gradient: "from-amber-500 to-orange-500",
    en: {
      title: "MovinDoc",
      subtitle: "Intelligent Document Processing",
      description: "AI-driven document understanding system that extracts, validates, and processes information from invoices, contracts, IDs, and business forms. MovinDoc combines OCR with deep learning to achieve high accuracy even on damaged or low-quality documents.",
      features: [
        "Automatic document classification and routing",
        "Field-level extraction with confidence scores",
        "Validation rules engine for data quality",
        "Batch processing for high-volume scanning",
        "Arabic and English document support",
        "Integration with ERP and accounting systems",
      ],
      useCases: [
        "Automated invoice processing and accounts payable",
        "Contract analysis and clause extraction",
        "Employee onboarding document verification",
        "Bank KYC and identity verification",
        "Medical records digitization",
      ],
      benefits: [
        "Processes documents 10x faster than manual entry",
        "99%+ accuracy on structured documents",
        "Eliminates human data entry errors",
        "Scales from 100 to 100,000+ documents daily",
      ],
      techHighlights: ["LayoutLM v3", "Custom OCR Engine", "Validation Rules API", "Batch Queue"],
    },
    ar: {
      title: "MovinDoc",
      subtitle: "معالجة المستندات الذكية",
      description: "نظام فهم مستندات مدعوم بالذكاء الاصطناعي يستخرج ويتحقق ويعالج المعلومات من الفواتير والعقود والهويات ونماذج الأعمال. يجمع MovinDoc بين التعرف الضوئي على الحروف والتعلم العميق لتحقيق دقة عالية حتى على المستندات التالفة أو منخفضة الجودة.",
      features: [
        "تصنيف وتوجيه تلقائي للمستندات",
        "استخراج على مستوى الحقول مع درجات ثقة",
        "محرك قواعد التحقق لجودة البيانات",
        "معالجة الدفعات للفحص بحجم عالي",
        "دعم المستندات العربية والإنجليزية",
        "تكامل مع أنظمة تخطيط موارد المؤسسات والمحاسبة",
      ],
      useCases: [
        "معالجة الفواتير الآلية وحسابات الدفع",
        "تحليل العقود واستخراج البنود",
        "التحقق من مستندات توظيف الموظفين",
        "التحقق من هوية KYC للمصارف",
        "رقمنة السجلات الطبية",
      ],
      benefits: [
        "تعالج المستندات أسرع 10 مرات من الإدخال اليدوي",
        "دقة 99%+ على المستندات المنظمة",
        "يقضي تماماً على أخطاء إدخال البيانات البشرية",
        "تمتد من 100 إلى أكثر من 100,000 مستند يومياً",
      ],
      techHighlights: ["LayoutLM v3", "محرك OCR مخصص", "واجهة برمجة قواعد التحقق", "طابور الدفعات"],
    },
  },
  {
    id: "movinvision",
    icon: Eye,
    gradient: "from-rose-500 to-pink-500",
    en: {
      title: "MovinVision",
      subtitle: "Computer Vision & Visual Intelligence",
      description: "Deep learning-powered visual inspection and monitoring system for manufacturing quality control, retail analytics, and security surveillance. MovinVision detects defects, tracks objects, and provides real-time visual intelligence across your operations.",
      features: [
        "Real-time defect detection with sub-second latency",
        "Custom model training on your specific use case",
        "Edge deployment for on-premise processing",
        "Multi-camera feed aggregation",
        "Alert system with configurable thresholds",
        "Historical analytics and trend reporting",
      ],
      useCases: [
        "Manufacturing quality inspection on production lines",
        "Retail shelf monitoring and planogram compliance",
        "Warehouse inventory counting via drones/cameras",
        "Workplace safety compliance monitoring",
        "Vehicle and traffic monitoring systems",
      ],
      benefits: [
        "Catches defects invisible to the human eye",
        "Reduces quality control costs by 50%+",
        "Operates 24/7 without fatigue or inconsistency",
        "Provides audit trail with timestamped evidence",
      ],
      techHighlights: ["YOLOv8", "Custom CNNs", "TensorRT Optimization", "Edge Inference"],
    },
    ar: {
      title: "MovinVision",
      subtitle: "الرؤية الحاسوبية والذكاء البصري",
      description: "نظام فحص ومراقبة بصري مدعوم بالتعلم العميق لرقابة جودة التصنيع وتحليلات التجزئة والمراقبة الأمنية. يكتشف MovinVision العيوب وتتبع الكائنات ويوفر ذكاءً بصرياً في الوقت الفعلي عبر عملياتك.",
      features: [
        "اكتشاف العيوب في الوقت الفعلي مع تأخير أقل من ثانية",
        "تدريب نموذج مخصص على حالة الاستخدام الخاصة بك",
        "نشر الحواف للمعالجة المحلية",
        "تجميع تغذية الكاميرات المتعددة",
        "نظام تنبيهات مع عتبات قابلة للتكوين",
        "تحليلات تاريخية وتقارير اتجاهات",
      ],
      useCases: [
        "فحص جودة التصنيع على خطوط الإنتاج",
        "مراقبة رفوف التجزئة والامتثال للمخططات",
        "عد مخزون المستودعات عبر الدرون/الكاميرات",
        "مراقبة الامتثال لسلامة مكان العمل",
        "أنظمة مراقبة المركبات والمرور",
      ],
      benefits: [
        "يكتشف العيوب غير المرئية للعين البشرية",
        "يقلل تكاليف مراقبة الجودة بنسبة 50%+",
        "يعمل على مدار الساعة بدون إرهاق أو تناقض",
        "يوفر مسار تدقيق مع أدلة مختومة بالوقت",
      ],
      techHighlights: ["YOLOv8", "شبكات عصبية مخصصة", "تحسين TensorRT", "استدلال الحواف"],
    },
  },
  {
    id: "movinagent",
    icon: Bot,
    gradient: "from-pulse-500 to-indigo-600",
    en: {
      title: "MovinAgent",
      subtitle: "Autonomous Agentic AI System",
      description: "A multi-agent orchestration platform where AI agents collaborate to plan, reason, and execute complex business workflows autonomously. MovinAgent connects to your tools, breaks down tasks, and coordinates specialized agents to complete work with minimal human oversight.",
      features: [
        "Multi-agent collaboration with role specialization",
        "Tool integration: APIs, databases, file systems, web",
        "Task decomposition and dynamic planning",
        "Memory and context across sessions",
        "Human-in-the-loop approval workflows",
        "Full execution logging and audit trail",
      ],
      useCases: [
        "Automated research and report generation",
        "Customer onboarding workflow automation",
        "IT operations: monitoring, alerts, and auto-remediation",
        "Sales pipeline management and follow-ups",
        "Content creation and social media scheduling",
      ],
      benefits: [
        "Handles multi-step workflows that traditional AI cannot",
        "Reduces manual process orchestration by 70%+",
        "Learns and improves from each execution",
        "Transparent reasoning with step-by-step traceability",
      ],
      techHighlights: ["LangGraph", "Tool Calling", "ReAct Pattern", "Memory Store"],
    },
    ar: {
      title: "MovinAgent",
      subtitle: "نظام الوكيل الذكي المستقل",
      description: "منصة تنسيق وكلاء متعددين حيث يتعاون وكلاء الذكاء الاصطناعي للتخطيط والبرمجة وتنفيذ سير عمل الأعمال المعقدة بشكل مستقل. يتصل MovinAgent بأدواتك ويوزع المهام وينسق وكلاء متخصصين لإتمام العمل ب最少 إشراف بشري.",
      features: [
        "تعاون الوكلاء المتعددين مع تخصص الأدوار",
        "تكامل الأدوات: واجهات برمجة التطبيقات وقواعد البيانات وأنظمة الملفات والويب",
        "تحليل المهام والتخطيط الديناميكي",
        "الذاكرة والسياق عبر الجلسات",
        "سير عمل الموافقات مع إشراف البشر",
        "تسجيل تنفيذ كامل ومسار تدقيق",
      ],
      useCases: [
        "إنشاء التقارير والأبحاث الآلية",
        "أتمتة سير عمل تأهيل العملاء",
        "عمليات تكنولوجيا المعلومات: المراقبة والتنبيهات والإصلاح التلقائي",
        "إدارة قناة المبيعات والمتابعة",
        "إنشاء المحتوى وجدولة وسائل التواصل الاجتماعي",
      ],
      benefits: [
        "يعالج سير العمل متعدد الخطوات التي لا يمكن للذكاء الاصطناعي التقليدي التعامل معها",
        "يقلل التنسيق اليدوي للعمليات بنسبة 70%+",
        "يتعلم ويتحسن من كل تنفيذ",
        "برمجة شفافة مع قابلية التتبع خطوة بخطوة",
      ],
      techHighlights: ["LangGraph", "استدعاء الأدوات", "نمط ReAct", "مخزن الذاكرة"],
    },
  },
  {
    id: "movinpredict",
    icon: BarChart3,
    gradient: "from-violet-500 to-purple-600",
    en: {
      title: "MovinPredict",
      subtitle: "Predictive Analytics & Business Intelligence",
      description: "ML-powered forecasting and analytics platform that transforms raw business data into actionable predictions. MovinPredict detects anomalies, forecasts trends, and provides decision-ready insights for revenue, operations, and customer behavior.",
      features: [
        "Time-series forecasting with confidence intervals",
        "Anomaly detection across multiple data streams",
        "Automated insight generation from raw data",
        "Interactive dashboards with drill-down capability",
        "API access for embedding predictions in apps",
        "Scheduled reports with email/Slack delivery",
      ],
      useCases: [
        "Sales revenue forecasting and pipeline prediction",
        "Demand forecasting for inventory optimization",
        "Customer churn prediction and retention strategy",
        "Fraud detection in financial transactions",
        "Operational capacity planning and resource allocation",
      ],
      benefits: [
        "Improves forecast accuracy by 30-50% over traditional methods",
        "Identifies revenue opportunities hidden in data",
        "Reduces stockouts and overstock by 25%+",
        "Enables proactive decision-making instead of reactive",
      ],
      techHighlights: ["Prophet", "XGBoost", "Streamlit Dashboards", "REST API"],
    },
    ar: {
      title: "MovinPredict",
      subtitle: "التحليلات التنبؤية وذكاء الأعمال",
      description: "منصة تنبؤ وتحليلات مدعومة بالتعلم الآلي تحول بيانات الأعمال الخام إلى تنبؤات قابلة للتنفيذ. يكتشف MovinPredict الشذوذ ويتنبأ بالاتجاهات ويوفر رؤى جاهزة لاتخاذ القرارات للإيرادات والعمليات وسلوك العملاء.",
      features: [
        "تنبؤ سلسلة زمنية مع فترات ثقة",
        "اكتشاف الشذوذ عبر تدفقات البيانات المتعددة",
        "إنشاء رؤى تلقائية من البيانات الخام",
        "لوحات تفاعلية مع إمكانية التعمق",
        "وصول واجهة برمجة التطبيقات لدمج التنبؤات في التطبيقات",
        "تقارير مجدولة مع توصيل عبر البريد الإلكتروني/سلاك",
      ],
      useCases: [
        "تنبؤ إيرادات المبيعات والتنبؤ بأنبوب المبيعات",
        "تنبؤ الطلب لتحسين المخزون",
        "تنبؤ رحيل العملاء واستراتيجية الاحتفاظ",
        "اكتشاف الاحتيال في المعاملات المالية",
        "تخطيط القدرة التشغيلية وتوزيع الموارد",
      ],
      benefits: [
        "يحسّن دقة التنبؤات بنسبة 30-50% مقارنة بالطرق التقليدية",
        "يحدد فرص الإيرادات المخفية في البيانات",
        "يقلل نفاد المخزون والمخزون الزائد بنسبة 25%+",
        "يمكّن اتخاذ قرارات استباقية بدلاً من تفاعلية",
      ],
      techHighlights: ["Prophet", "XGBoost", "لوحات Streamlit", "واجهة برمجة REST"],
    },
  },
  {
    id: "movinsearch",
    icon: Brain,
    gradient: "from-emerald-500 to-teal-600",
    en: {
      title: "MovinSearch",
      subtitle: "RAG-Powered Knowledge System",
      description: "A Retrieval-Augmented Generation system that makes your private documents, policies, and knowledge bases searchable and conversational. MovinSearch combines vector search with LLM reasoning to deliver accurate, cited answers grounded in your enterprise data.",
      features: [
        "Automatic document chunking and embedding",
        "Hybrid search: semantic + keyword + metadata",
        "Source citations with page/section references",
        "Role-based access control for sensitive data",
        "Continuous learning from user feedback",
        "Supports PDF, Word, Excel, web pages, and databases",
      ],
      useCases: [
        "Company policy and procedure knowledge base",
        "Legal document search and contract analysis",
        "Technical documentation assistant",
        "HR policy Q&A and employee self-service",
        "Medical/pharmaceutical research document search",
      ],
      benefits: [
        "Employees find information 5x faster than manual search",
        "Eliminates repeated questions to subject matter experts",
        "Always up-to-date as documents are automatically re-indexed",
        "Reduces onboarding time for new employees by 40%+",
      ],
      techHighlights: ["Vector DB", "Semantic Search", "Citation Engine", "Access Control"],
    },
    ar: {
      title: "MovinSearch",
      subtitle: "نظام المعرفة المدعوم بـ RAG",
      description: "نظام توليد معزز بالاسترجاع يجعل مستنداتك وسياساتك وقواعد معرفتك الخاصة قابلة للبحث والمحادثة. يجمع MovinSearch بين البحث المتجه وبرمجة نماذج اللغة الكبيرة لتقديم إجابات دقيقة وموثوقة تستند إلى بيانات مؤسستك.",
      features: [
        "تقسيم وتضمين تلقائي للمستندات",
        "بحث هجين: دلالي + كلمات مفتاحية + بيانات وصفية",
        "إشارات مصدرية مع مراجع الصفحة/القسم",
        "ضبط الوصول بناءً على الدور للبيانات الحساسة",
        "تعلم مستمر من ملاحظات المستخدمين",
        "يدعم PDF وWord وExcel وصفحات الويب وقواعد البيانات",
      ],
      useCases: [
        "قاعدة معرفة سياسات وإجراءات الشركة",
        "بحث المستندات القانونية وتحليل العقود",
        "مساعد التوثيق التقني",
        "الإجابة على سياسات الموارد البشرية والخدمة الذاتية للموظفين",
        "بحث مستندات الأبحاث الطبية/الصيدلانية",
      ],
      benefits: [
        "يجد الموظفون المعلومات أسرع 5 مرات من البحث اليدوي",
        "يقضي على الأسئلة المتكررة لخبراء الموضوع",
        "محدّث دائماً حيث يتم إعادة فهرسة المستندات تلقائياً",
        "يقلل وقت التأهيل للموظفين الجدد بنسبة 40%+",
      ],
      techHighlights: ["قاعدة بيانات متجهة", "بحث دلالي", "محرك الإشارات", "تحكم بالوصول"],
    },
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
