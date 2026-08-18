import type { Lang } from "./i18n";

export type Category = "llm" | "image" | "video" | "code" | "auto";
export type Pricing = "free" | "freemium" | "oss" | "deal";

export type Localized = {
  tagline: string;
  description: string;
  features: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  redeem?: string[];
};

export type Tool = {
  id: string;
  name: string;
  logo: string;
  url: string;
  docs: string;
  category: Category;
  pricing: Pricing;
  rating: number;
  api: boolean;
  addedDaysAgo: number;
  updatedMinsAgo: number;
  releaseNote: string;
  coupon?: { code: string; hoursLeft: number };
  i18n: Record<Lang, Localized>;
};

const icon = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;
const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const TOOLS: Tool[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    logo: icon("googlegemini", "8B5CF6"),
    url: "https://gemini.google.com",
    docs: "https://ai.google.dev/docs",
    category: "llm",
    pricing: "freemium",
    rating: 4.8,
    api: true,
    addedDaysAgo: 2,
    updatedMinsAgo: 10,
    releaseNote: "Gemini 2.5 Flash: 1M-token context, native tool calling.",
    i18n: {
      en: {
        tagline: "Multimodal reasoning with a free generous tier",
        description:
          "Google's flagship multimodal model family, reachable through a free web app and a free-tier developer API. Handles text, images, audio and video in one context window, with grounded search and structured JSON output.",
        features: ["Free API tier with daily quota", "1M-token context window", "Native image & audio input", "Grounding with Google Search"],
        useCases: ["Long-document analysis", "Multimodal research assistants", "Structured data extraction"],
        pros: ["Very large free quota", "Excellent multimodal accuracy"],
        cons: ["Rate limits on free tier", "Regional availability gaps"],
      },
      ar: {
        tagline: "استدلال متعدد الوسائط بباقة مجانية سخية",
        description:
          "عائلة نماذج جوجل متعددة الوسائط، متاحة عبر تطبيق ويب مجاني وواجهة برمجية بباقة مجانية. تتعامل مع النص والصورة والصوت والفيديو في سياق واحد مع إخراج JSON منظم.",
        features: ["باقة API مجانية بحصة يومية", "نافذة سياق مليون رمز", "إدخال صور وصوت أصلي", "ربط بنتائج بحث جوجل"],
        useCases: ["تحليل المستندات الطويلة", "مساعدو بحث متعددو الوسائط", "استخراج بيانات منظمة"],
        pros: ["حصة مجانية كبيرة جداً", "دقة ممتازة متعددة الوسائط"],
        cons: ["حدود معدل في الباقة المجانية", "توفر جغرافي محدود أحياناً"],
      },
      ru: {
        tagline: "Мультимодальные рассуждения со щедрым бесплатным тарифом",
        description:
          "Флагманское семейство мультимодальных моделей Google: бесплатное веб-приложение и бесплатный тариф API. Работает с текстом, изображениями, аудио и видео в одном контексте, выдаёт структурированный JSON.",
        features: ["Бесплатный тариф API", "Контекст до 1M токенов", "Нативный ввод изображений и аудио", "Заземление через поиск Google"],
        useCases: ["Анализ длинных документов", "Мультимодальные ассистенты", "Извлечение структурированных данных"],
        pros: ["Очень большая бесплатная квота", "Отличная мультимодальность"],
        cons: ["Лимиты запросов", "Доступно не во всех регионах"],
      },
    },
  },
  {
    id: "mistral",
    name: "Mistral AI",
    logo: icon("mistralai", "38BDF8"),
    url: "https://chat.mistral.ai",
    docs: "https://docs.mistral.ai",
    category: "llm",
    pricing: "oss",
    rating: 4.6,
    api: true,
    addedDaysAgo: 5,
    updatedMinsAgo: 42,
    releaseNote: "New Apache-2.0 small model weights published on Hugging Face.",
    i18n: {
      en: {
        tagline: "European open-weight models with a free API tier",
        description:
          "Fast, efficient open-weight LLMs released under permissive licences, plus a hosted console with a free experiment tier. Strong at multilingual generation and function calling at low latency.",
        features: ["Apache-2.0 open weights", "Free experiment API tier", "Function calling & JSON mode", "Self-hostable on consumer GPUs"],
        useCases: ["Private on-prem assistants", "Low-latency chat backends", "Multilingual content"],
        pros: ["Truly open weights", "Great price/performance"],
        cons: ["Smaller ecosystem", "Weaker at very long context"],
      },
      ar: {
        tagline: "نماذج أوروبية مفتوحة الأوزان مع باقة API مجانية",
        description:
          "نماذج لغوية مفتوحة الأوزان وسريعة برخص متساهلة، مع لوحة استضافة تتضمن باقة تجريبية مجانية. قوية في التوليد متعدد اللغات واستدعاء الدوال بزمن استجابة منخفض.",
        features: ["أوزان مفتوحة برخصة Apache-2.0", "باقة API تجريبية مجانية", "استدعاء دوال ووضع JSON", "قابلة للتشغيل الذاتي"],
        useCases: ["مساعدون داخليون خاصون", "خلفيات دردشة سريعة", "محتوى متعدد اللغات"],
        pros: ["أوزان مفتوحة فعلاً", "أداء ممتاز مقابل التكلفة"],
        cons: ["منظومة أصغر", "أضعف في السياقات الطويلة جداً"],
      },
      ru: {
        tagline: "Европейские open-weight модели с бесплатным API",
        description:
          "Быстрые открытые LLM под пермиссивными лицензиями плюс хостинг-консоль с бесплатным экспериментальным тарифом. Сильны в многоязычной генерации и вызове функций.",
        features: ["Открытые веса Apache-2.0", "Бесплатный экспериментальный API", "Function calling и JSON-режим", "Запуск на своём железе"],
        useCases: ["Приватные ассистенты", "Быстрые чат-бэкенды", "Многоязычный контент"],
        pros: ["Действительно открытые веса", "Отличная цена/качество"],
        cons: ["Меньше экосистема", "Слабее на длинном контексте"],
      },
    },
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    logo: icon("huggingface", "F59E0B"),
    url: "https://huggingface.co",
    docs: "https://huggingface.co/docs",
    category: "llm",
    pricing: "free",
    rating: 4.9,
    api: true,
    addedDaysAgo: 9,
    updatedMinsAgo: 6,
    releaseNote: "Inference providers routing added to the free serverless endpoint.",
    i18n: {
      en: {
        tagline: "The open model hub — hundreds of thousands of free checkpoints",
        description:
          "Central registry for open-source models, datasets and demo Spaces. Free serverless inference, free GPU-backed community Spaces and first-class Python/JS clients make it the default starting point for zero-cost AI.",
        features: ["500k+ open models", "Free serverless inference API", "Hosted demo Spaces", "Datasets & evaluation leaderboards"],
        useCases: ["Model discovery & benchmarking", "Prototyping without infrastructure", "Fine-tuning pipelines"],
        pros: ["Unmatched breadth", "Strong community documentation"],
        cons: ["Free inference can queue", "Quality varies by model"],
      },
      ar: {
        tagline: "مركز النماذج المفتوحة — مئات آلاف النقاط المجانية",
        description:
          "سجل مركزي للنماذج مفتوحة المصدر ومجموعات البيانات والعروض التفاعلية. استدلال مجاني بلا خوادم ومساحات مجتمعية بمعالجات رسومية مجانية ومكتبات رسمية للغتي بايثون وجافاسكربت.",
        features: ["أكثر من ٥٠٠ ألف نموذج مفتوح", "واجهة استدلال مجانية", "مساحات عرض مستضافة", "مجموعات بيانات ولوحات تقييم"],
        useCases: ["اكتشاف النماذج ومقارنتها", "النماذج الأولية دون بنية تحتية", "خطوط الضبط الدقيق"],
        pros: ["اتساع لا يُضاهى", "توثيق مجتمعي قوي"],
        cons: ["طوابير في الاستدلال المجاني", "جودة متفاوتة بين النماذج"],
      },
      ru: {
        tagline: "Хаб открытых моделей — сотни тысяч бесплатных чекпоинтов",
        description:
          "Центральный реестр open-source моделей, датасетов и демо-Spaces. Бесплатный serverless-инференс, бесплатные GPU-Spaces и удобные клиенты для Python/JS.",
        features: ["500k+ открытых моделей", "Бесплатный serverless API", "Демо-Spaces", "Датасеты и лидерборды"],
        useCases: ["Поиск и сравнение моделей", "Прототипы без инфраструктуры", "Пайплайны дообучения"],
        pros: ["Максимальный охват", "Сильная документация сообщества"],
        cons: ["Очереди на бесплатном инференсе", "Разное качество моделей"],
      },
    },
  },
  {
    id: "ollama",
    name: "Ollama",
    logo: icon("ollama", "E5E7EB"),
    url: "https://ollama.com",
    docs: "https://github.com/ollama/ollama/tree/main/docs",
    category: "code",
    pricing: "oss",
    rating: 4.7,
    api: true,
    addedDaysAgo: 14,
    updatedMinsAgo: 95,
    releaseNote: "OpenAI-compatible /v1 endpoint stabilized for local models.",
    i18n: {
      en: {
        tagline: "Run open LLMs locally with one command",
        description:
          "A local runtime that pulls quantized open models and serves them behind an OpenAI-compatible HTTP API on your own machine. Zero cost, zero data egress, works offline.",
        features: ["One-command model pulls", "OpenAI-compatible local API", "GPU & Apple Silicon acceleration", "Modelfile customization"],
        useCases: ["Offline private assistants", "Local RAG development", "Cost-free experimentation"],
        pros: ["Completely free & private", "Simple developer experience"],
        cons: ["Needs capable hardware", "Slower than hosted frontier models"],
      },
      ar: {
        tagline: "شغّل النماذج المفتوحة محلياً بأمر واحد",
        description:
          "بيئة تشغيل محلية تجلب النماذج المضغوطة وتخدمها عبر واجهة HTTP متوافقة مع OpenAI على جهازك. بلا تكلفة وبلا خروج للبيانات وتعمل دون إنترنت.",
        features: ["جلب النماذج بأمر واحد", "واجهة محلية متوافقة مع OpenAI", "تسريع بالمعالج الرسومي وأبل سيليكون", "تخصيص عبر Modelfile"],
        useCases: ["مساعدون خاصون دون اتصال", "تطوير RAG محلي", "تجارب بلا تكلفة"],
        pros: ["مجاني وخاص بالكامل", "تجربة مطوّر بسيطة"],
        cons: ["يتطلب عتاداً قوياً", "أبطأ من النماذج المستضافة"],
      },
      ru: {
        tagline: "Запускайте открытые LLM локально одной командой",
        description:
          "Локальный рантайм: скачивает квантованные открытые модели и отдаёт их через HTTP API, совместимый с OpenAI. Бесплатно, приватно, работает офлайн.",
        features: ["Загрузка модели одной командой", "Локальный OpenAI-совместимый API", "Ускорение GPU и Apple Silicon", "Настройка через Modelfile"],
        useCases: ["Офлайн-ассистенты", "Локальная разработка RAG", "Бесплатные эксперименты"],
        pros: ["Полностью бесплатно и приватно", "Простой DX"],
        cons: ["Нужно мощное железо", "Медленнее облачных моделей"],
      },
    },
  },
  {
    id: "perplexity",
    name: "Perplexity",
    logo: icon("perplexity", "22D3EE"),
    url: "https://www.perplexity.ai",
    docs: "https://docs.perplexity.ai",
    category: "llm",
    pricing: "deal",
    rating: 4.5,
    api: true,
    addedDaysAgo: 1,
    updatedMinsAgo: 18,
    releaseNote: "Pro trial promotion extended for new accounts.",
    coupon: { code: "AMAR007-PPLX30", hoursLeft: 26 },
    i18n: {
      en: {
        tagline: "Cited answer engine — Pro trial currently free",
        description:
          "A search-native assistant that answers with inline citations and live web sources. The free tier covers unlimited quick searches; the running promotion unlocks Pro reasoning models at no cost for a limited period.",
        features: ["Inline source citations", "Focus modes (academic, web, video)", "File & PDF question answering", "Sonar developer API"],
        useCases: ["Research with verifiable sources", "Market & competitor scans", "Fast fact-checking"],
        pros: ["Transparent citations", "Fresh, live web data"],
        cons: ["Pro model limits after trial", "Occasional shallow sourcing"],
        redeem: ["Create a free account", "Open Settings → Subscription", "Paste the coupon into the promo field", "Confirm to activate the trial"],
      },
      ar: {
        tagline: "محرك إجابات موثّق — تجربة Pro مجانية حالياً",
        description:
          "مساعد قائم على البحث يجيب مع استشهادات مباشرة ومصادر ويب حيّة. الباقة المجانية تشمل بحثاً سريعاً غير محدود، والعرض الحالي يفتح نماذج Pro مجاناً لفترة محدودة.",
        features: ["استشهادات مصدرية مباشرة", "أوضاع تركيز متعددة", "أسئلة على الملفات وPDF", "واجهة Sonar للمطورين"],
        useCases: ["بحث بمصادر قابلة للتحقق", "مسح السوق والمنافسين", "تدقيق سريع للحقائق"],
        pros: ["استشهادات شفافة", "بيانات ويب محدّثة"],
        cons: ["حدود على نماذج Pro بعد التجربة", "مصادر سطحية أحياناً"],
        redeem: ["أنشئ حساباً مجانياً", "افتح الإعدادات ← الاشتراك", "الصق القسيمة في حقل العرض", "أكّد لتفعيل التجربة"],
      },
      ru: {
        tagline: "Поисковый движок ответов — Pro-триал сейчас бесплатно",
        description:
          "Ассистент на базе поиска: отвечает со встроенными ссылками на живые веб-источники. Бесплатный тариф даёт безлимитные быстрые запросы, акция открывает Pro-модели без оплаты.",
        features: ["Ссылки на источники", "Режимы фокуса", "Вопросы к файлам и PDF", "API Sonar"],
        useCases: ["Исследования с источниками", "Анализ рынка", "Быстрый фактчекинг"],
        pros: ["Прозрачные цитаты", "Свежие данные из веба"],
        cons: ["Лимиты Pro после триала", "Иногда поверхностные источники"],
        redeem: ["Создайте бесплатный аккаунт", "Настройки → Подписка", "Вставьте промокод", "Подтвердите активацию"],
      },
    },
  },
  {
    id: "stability",
    name: "Stable Diffusion",
    logo: favicon("stability.ai"),
    url: "https://stability.ai",
    docs: "https://platform.stability.ai/docs",
    category: "image",
    pricing: "oss",
    rating: 4.4,
    api: true,
    addedDaysAgo: 21,
    updatedMinsAgo: 130,
    releaseNote: "Community fine-tunes updated for the latest base checkpoint.",
    i18n: {
      en: {
        tagline: "Open-weight image generation you can self-host",
        description:
          "The reference open image-generation family. Weights are downloadable, community tooling is vast, and local generation costs nothing beyond your own GPU time.",
        features: ["Downloadable model weights", "ControlNet & LoRA ecosystem", "Inpainting and img2img", "Hosted REST API option"],
        useCases: ["Brand asset generation", "Concept art pipelines", "Batch product imagery"],
        pros: ["Zero marginal cost locally", "Huge fine-tune ecosystem"],
        cons: ["Steeper learning curve", "Prompt sensitivity"],
      },
      ar: {
        tagline: "توليد صور مفتوح الأوزان قابل للاستضافة الذاتية",
        description:
          "العائلة المرجعية لتوليد الصور المفتوح. الأوزان قابلة للتنزيل والأدوات المجتمعية واسعة، والتوليد المحلي لا يكلف سوى وقت معالجك الرسومي.",
        features: ["أوزان قابلة للتنزيل", "منظومة ControlNet وLoRA", "تعديل داخلي وصورة إلى صورة", "واجهة REST مستضافة اختيارية"],
        useCases: ["توليد أصول العلامة التجارية", "فن المفاهيم", "صور منتجات بالجملة"],
        pros: ["تكلفة حدية صفرية محلياً", "منظومة ضبط ضخمة"],
        cons: ["منحنى تعلم أصعب", "حساسية للأوامر"],
      },
      ru: {
        tagline: "Открытая генерация изображений с self-hosting",
        description:
          "Эталонное открытое семейство генерации изображений. Веса доступны для скачивания, огромная экосистема инструментов, локальная генерация бесплатна.",
        features: ["Скачиваемые веса", "Экосистема ControlNet и LoRA", "Inpainting и img2img", "Опциональный REST API"],
        useCases: ["Брендовые ассеты", "Концепт-арт", "Пакетная съёмка товаров"],
        pros: ["Нулевая стоимость локально", "Огромная экосистема"],
        cons: ["Порог входа выше", "Чувствительность к промптам"],
      },
    },
  },
  {
    id: "canva",
    name: "Canva Magic Studio",
    logo: favicon("canva.com"),
    url: "https://www.canva.com/magic-studio/",
    docs: "https://www.canva.dev/docs/apps/",
    category: "image",
    pricing: "freemium",
    rating: 4.3,
    api: true,
    addedDaysAgo: 7,
    updatedMinsAgo: 55,
    releaseNote: "Magic Media credits refreshed monthly on the free plan.",
    i18n: {
      en: {
        tagline: "AI design suite inside a free editor",
        description:
          "Generative design tools bundled into a browser editor: text-to-image, magic resize, background removal and brand-aware copywriting, all usable on a permanently free plan with monthly AI credits.",
        features: ["Monthly free AI credits", "Text-to-image & magic edit", "One-click brand resizing", "Apps platform & developer SDK"],
        useCases: ["Social campaign assets", "Pitch decks", "Non-designer marketing teams"],
        pros: ["Extremely approachable", "Complete asset pipeline"],
        cons: ["AI credits capped monthly", "Best output behind Pro"],
      },
      ar: {
        tagline: "حزمة تصميم بالذكاء الاصطناعي داخل محرر مجاني",
        description:
          "أدوات تصميم توليدية داخل محرر متصفح: نص إلى صورة وتغيير حجم ذكي وإزالة خلفية وكتابة إعلانية متوافقة مع العلامة، مع خطة مجانية دائمة وأرصدة شهرية.",
        features: ["أرصدة ذكاء اصطناعي مجانية شهرياً", "نص إلى صورة وتعديل سحري", "تغيير حجم بنقرة واحدة", "منصة تطبيقات وSDK"],
        useCases: ["أصول حملات التواصل", "عروض تقديمية", "فرق تسويق بلا مصممين"],
        pros: ["سهل جداً", "خط إنتاج متكامل"],
        cons: ["سقف شهري للأرصدة", "أفضل النتائج في Pro"],
      },
      ru: {
        tagline: "ИИ-дизайн внутри бесплатного редактора",
        description:
          "Генеративные инструменты в браузерном редакторе: текст-в-картинку, magic resize, удаление фона и копирайтинг с учётом бренда. Бесплатный план с ежемесячными ИИ-кредитами.",
        features: ["Бесплатные ИИ-кредиты ежемесячно", "Текст-в-изображение", "Ресайз в один клик", "Платформа приложений и SDK"],
        useCases: ["Ассеты для соцсетей", "Презентации", "Маркетинг без дизайнеров"],
        pros: ["Очень доступно", "Полный пайплайн ассетов"],
        cons: ["Лимит кредитов", "Лучшее — в Pro"],
      },
    },
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    logo: icon("elevenlabs", "A78BFA"),
    url: "https://elevenlabs.io",
    docs: "https://elevenlabs.io/docs",
    category: "video",
    pricing: "deal",
    rating: 4.7,
    api: true,
    addedDaysAgo: 3,
    updatedMinsAgo: 27,
    releaseNote: "Extra character credits granted on new free accounts this cycle.",
    coupon: { code: "AMAR007-VOICE", hoursLeft: 9 },
    i18n: {
      en: {
        tagline: "Studio-grade voice synthesis with free monthly characters",
        description:
          "High-fidelity text-to-speech, dubbing and voice cloning across 30+ languages. The free tier includes monthly characters; the active promotion adds bonus credits for new accounts.",
        features: ["Free monthly character quota", "30+ language dubbing", "Voice cloning & voice library", "Streaming low-latency API"],
        useCases: ["Video narration", "Localized audio dubbing", "Accessible content"],
        pros: ["Best-in-class naturalness", "Simple streaming API"],
        cons: ["Character quota burns fast", "Cloning needs consent proof"],
        redeem: ["Sign up for the free plan", "Go to Subscription → Redeem", "Enter the coupon code", "Credits appear instantly"],
      },
      ar: {
        tagline: "تركيب صوتي احترافي مع حروف مجانية شهرياً",
        description:
          "تحويل نص إلى كلام عالي الدقة ودبلجة واستنساخ صوتي بأكثر من ٣٠ لغة. الباقة المجانية تتضمن حروفاً شهرية، والعرض الحالي يضيف أرصدة إضافية للحسابات الجديدة.",
        features: ["حصة حروف مجانية شهرياً", "دبلجة بأكثر من ٣٠ لغة", "استنساخ صوتي ومكتبة أصوات", "واجهة بث منخفضة الكمون"],
        useCases: ["تعليق صوتي للفيديو", "دبلجة محلية", "محتوى ميسّر للوصول"],
        pros: ["طبيعية صوت رائدة", "واجهة بث بسيطة"],
        cons: ["الحصة تنفد بسرعة", "الاستنساخ يتطلب إثبات موافقة"],
        redeem: ["سجّل في الخطة المجانية", "اذهب إلى الاشتراك ← استبدال", "أدخل كود القسيمة", "تظهر الأرصدة فوراً"],
      },
      ru: {
        tagline: "Студийный синтез речи с бесплатными символами",
        description:
          "Высококачественный TTS, дубляж и клонирование голоса на 30+ языках. Бесплатный тариф даёт месячную квоту символов, акция добавляет бонусные кредиты.",
        features: ["Бесплатная месячная квота", "Дубляж на 30+ языков", "Клонирование голоса", "Стриминговый API"],
        useCases: ["Озвучка видео", "Локализация аудио", "Доступный контент"],
        pros: ["Лучшая естественность", "Простой стриминг-API"],
        cons: ["Квота быстро тратится", "Клонирование требует согласия"],
        redeem: ["Зарегистрируйтесь бесплатно", "Подписка → Активировать", "Введите промокод", "Кредиты начислятся сразу"],
      },
    },
  },
  {
    id: "suno",
    name: "Suno",
    logo: icon("suno", "F472B6"),
    url: "https://suno.com",
    docs: "https://suno.com/faq",
    category: "video",
    pricing: "freemium",
    rating: 4.2,
    api: false,
    addedDaysAgo: 11,
    updatedMinsAgo: 74,
    releaseNote: "Daily free generation credits reset improved.",
    i18n: {
      en: {
        tagline: "Text-to-music generation with daily free credits",
        description:
          "Generates full songs — vocals, lyrics and instrumentation — from a short prompt. Free accounts receive daily credits with non-commercial usage rights.",
        features: ["Daily free song credits", "Lyric + vocal generation", "Style and genre steering", "Stem-friendly exports"],
        useCases: ["Short-form video soundtracks", "Jingles and idents", "Songwriting ideation"],
        pros: ["Impressive musical coherence", "Fast iteration"],
        cons: ["Free output is non-commercial", "No public API"],
      },
      ar: {
        tagline: "توليد موسيقى من نص مع أرصدة يومية مجانية",
        description:
          "يولّد أغاني كاملة — غناء وكلمات وتوزيع — من أمر نصي قصير. الحسابات المجانية تحصل على أرصدة يومية بحقوق استخدام غير تجاري.",
        features: ["أرصدة أغاني يومية مجانية", "توليد كلمات وغناء", "توجيه النمط والنوع", "تصدير مناسب للمقاطع"],
        useCases: ["موسيقى فيديوهات قصيرة", "جينغلز وهويات صوتية", "أفكار تأليف موسيقي"],
        pros: ["تماسك موسيقي مبهر", "تكرار سريع"],
        cons: ["الإخراج المجاني غير تجاري", "لا واجهة برمجية عامة"],
      },
      ru: {
        tagline: "Генерация музыки из текста с бесплатными кредитами",
        description:
          "Создаёт целые песни — вокал, текст и аранжировку — по короткому промпту. Бесплатные аккаунты получают ежедневные кредиты для некоммерческого использования.",
        features: ["Ежедневные бесплатные кредиты", "Генерация текста и вокала", "Управление жанром и стилем", "Экспорт для монтажа"],
        useCases: ["Саундтреки для коротких видео", "Джинглы", "Идеи для песен"],
        pros: ["Впечатляющая музыкальность", "Быстрые итерации"],
        cons: ["Бесплатно — только некоммерчески", "Нет публичного API"],
      },
    },
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    logo: icon("githubcopilot", "E5E7EB"),
    url: "https://github.com/features/copilot",
    docs: "https://docs.github.com/copilot",
    category: "code",
    pricing: "deal",
    rating: 4.6,
    api: true,
    addedDaysAgo: 4,
    updatedMinsAgo: 12,
    releaseNote: "Free plan quota for completions and chat requests increased.",
    coupon: { code: "AMAR007-DEVFREE", hoursLeft: 52 },
    i18n: {
      en: {
        tagline: "Inline code intelligence — free tier for individuals",
        description:
          "Context-aware completions, chat and agent workflows across major editors. A permanently free individual plan covers a monthly quota of completions and chat requests; students and OSS maintainers get full access.",
        features: ["Free monthly completions quota", "Editor chat and inline fixes", "Multi-file agent edits", "Free for verified students & OSS"],
        useCases: ["Daily coding acceleration", "Test generation", "Legacy code explanation"],
        pros: ["Deep editor integration", "Strong repository context"],
        cons: ["Free quota resets monthly", "Suggestions need review"],
        redeem: ["Sign in with GitHub", "Open Settings → Copilot", "Apply the offer code", "Restart your editor to sync"],
      },
      ar: {
        tagline: "ذكاء برمجي داخل المحرر — باقة مجانية للأفراد",
        description:
          "إكمالات واعية بالسياق ودردشة وسير عمل وكيل داخل المحررات الرئيسية. خطة فردية مجانية دائمة بحصة شهرية، ووصول كامل للطلاب ومشرفي المصادر المفتوحة.",
        features: ["حصة إكمالات مجانية شهرياً", "دردشة وإصلاحات داخل المحرر", "تعديلات وكيل متعددة الملفات", "مجاني للطلاب والمصادر المفتوحة"],
        useCases: ["تسريع البرمجة اليومية", "توليد الاختبارات", "شرح الشيفرة القديمة"],
        pros: ["تكامل عميق مع المحرر", "سياق قوي للمستودع"],
        cons: ["الحصة المجانية شهرية", "تحتاج الاقتراحات مراجعة"],
        redeem: ["سجّل الدخول عبر GitHub", "افتح الإعدادات ← Copilot", "طبّق كود العرض", "أعد تشغيل المحرر للمزامنة"],
      },
      ru: {
        tagline: "Кодовый ассистент — бесплатный тариф для частных лиц",
        description:
          "Контекстные автодополнения, чат и агентные сценарии в основных редакторах. Бессрочный бесплатный тариф с месячной квотой; студентам и OSS-мейнтейнерам — полный доступ.",
        features: ["Бесплатная месячная квота", "Чат и правки в редакторе", "Агентные правки по файлам", "Бесплатно студентам и OSS"],
        useCases: ["Ускорение разработки", "Генерация тестов", "Объяснение легаси-кода"],
        pros: ["Глубокая интеграция", "Хороший контекст репозитория"],
        cons: ["Квота обнуляется ежемесячно", "Нужна ревизия подсказок"],
        redeem: ["Войдите через GitHub", "Настройки → Copilot", "Примените код оффера", "Перезапустите редактор"],
      },
    },
  },
  {
    id: "n8n",
    name: "n8n",
    logo: icon("n8n", "F97316"),
    url: "https://n8n.io",
    docs: "https://docs.n8n.io",
    category: "auto",
    pricing: "oss",
    rating: 4.6,
    api: true,
    addedDaysAgo: 16,
    updatedMinsAgo: 38,
    releaseNote: "New AI agent nodes shipped with tool-calling support.",
    i18n: {
      en: {
        tagline: "Self-hostable AI workflow automation",
        description:
          "A fair-code workflow engine with 400+ integrations and native LLM agent nodes. Self-hosting is free and unlimited, making it the standard backbone for AI automations.",
        features: ["Free unlimited self-hosting", "400+ app integrations", "LLM agent & vector store nodes", "Code nodes in JS/Python"],
        useCases: ["Automated content pipelines", "Internal AI agents", "Data sync between SaaS tools"],
        pros: ["No execution limits self-hosted", "Visual + code hybrid"],
        cons: ["Requires ops knowledge", "Cloud plan is paid"],
      },
      ar: {
        tagline: "أتمتة سير عمل الذكاء الاصطناعي قابلة للاستضافة الذاتية",
        description:
          "محرك سير عمل بأكثر من ٤٠٠ تكامل وعُقد وكلاء نماذج لغوية أصلية. الاستضافة الذاتية مجانية وغير محدودة مما يجعله العمود الفقري لأتمتة الذكاء الاصطناعي.",
        features: ["استضافة ذاتية مجانية غير محدودة", "أكثر من ٤٠٠ تكامل", "عُقد وكلاء ومخازن متجهات", "عُقد شيفرة بجافاسكربت وبايثون"],
        useCases: ["خطوط محتوى آلية", "وكلاء داخليون", "مزامنة بيانات بين الخدمات"],
        pros: ["بلا حدود تنفيذ ذاتياً", "مزيج مرئي وبرمجي"],
        cons: ["يتطلب خبرة تشغيل", "الخطة السحابية مدفوعة"],
      },
      ru: {
        tagline: "Self-hosted автоматизация ИИ-воркфлоу",
        description:
          "Fair-code движок с 400+ интеграциями и нативными узлами LLM-агентов. Self-hosting бесплатен и безлимитен — базис для ИИ-автоматизаций.",
        features: ["Бесплатный безлимитный self-host", "400+ интеграций", "Узлы агентов и векторных БД", "Code-узлы на JS/Python"],
        useCases: ["Контент-пайплайны", "Внутренние ИИ-агенты", "Синхронизация SaaS-данных"],
        pros: ["Без лимитов на своём сервере", "Визуально + код"],
        cons: ["Нужны навыки DevOps", "Облако платное"],
      },
    },
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    logo: icon("notion", "E5E7EB"),
    url: "https://www.notion.com/product/ai",
    docs: "https://developers.notion.com",
    category: "auto",
    pricing: "freemium",
    rating: 4.1,
    api: true,
    addedDaysAgo: 19,
    updatedMinsAgo: 160,
    releaseNote: "AI meeting notes rolled out to more workspace tiers.",
    i18n: {
      en: {
        tagline: "AI writing and search inside your workspace",
        description:
          "Embedded assistant that drafts, summarizes and searches across your workspace knowledge base, with a free trial allowance of AI responses on personal plans.",
        features: ["Trial AI responses on free plans", "Workspace-wide semantic search", "Meeting notes & summaries", "Public developer API"],
        useCases: ["Team knowledge bases", "Meeting documentation", "Content drafting"],
        pros: ["Zero context switching", "Good summarization quality"],
        cons: ["Full AI needs a paid add-on", "Limited model choice"],
      },
      ar: {
        tagline: "كتابة وبحث بالذكاء الاصطناعي داخل مساحة عملك",
        description:
          "مساعد مدمج يصيغ ويلخّص ويبحث في قاعدة معرفة مساحة عملك، مع حصة تجريبية مجانية من ردود الذكاء الاصطناعي في الخطط الشخصية.",
        features: ["ردود تجريبية مجانية", "بحث دلالي شامل", "ملاحظات وملخصات الاجتماعات", "واجهة برمجية عامة"],
        useCases: ["قواعد معرفة الفرق", "توثيق الاجتماعات", "صياغة المحتوى"],
        pros: ["دون تنقل بين الأدوات", "جودة تلخيص جيدة"],
        cons: ["الذكاء الكامل إضافة مدفوعة", "خيارات نماذج محدودة"],
      },
      ru: {
        tagline: "ИИ-письмо и поиск внутри рабочего пространства",
        description:
          "Встроенный ассистент: пишет, суммирует и ищет по базе знаний рабочего пространства. На личных планах есть бесплатная пробная квота ответов.",
        features: ["Пробные ИИ-ответы бесплатно", "Семантический поиск", "Заметки и итоги встреч", "Публичный API"],
        useCases: ["Базы знаний команд", "Документирование встреч", "Черновики контента"],
        pros: ["Без переключения контекста", "Хорошее качество саммари"],
        cons: ["Полный ИИ — платный аддон", "Мало выбора моделей"],
      },
    },
  },
  {
    id: "runway",
    name: "Runway",
    logo: favicon("runwayml.com"),
    url: "https://runwayml.com",
    docs: "https://docs.dev.runwayml.com",
    category: "video",
    pricing: "deal",
    rating: 4.4,
    api: true,
    addedDaysAgo: 6,
    updatedMinsAgo: 21,
    releaseNote: "Promotional generation credits for first-time creators.",
    coupon: { code: "AMAR007-GEN125", hoursLeft: 4 },
    i18n: {
      en: {
        tagline: "Generative video studio with bonus free credits",
        description:
          "Text-to-video, image-to-video and advanced editing tools such as motion brush and frame interpolation. New accounts receive one-time free credits, boosted by the active promotion.",
        features: ["One-time free generation credits", "Text & image to video", "Motion brush and camera control", "Developer video API"],
        useCases: ["Ad creative prototyping", "Storyboard animation", "Social video content"],
        pros: ["Strong motion quality", "Rich editing controls"],
        cons: ["Credits deplete quickly", "Renders can be slow at peak"],
        redeem: ["Register a free workspace", "Open Billing → Promotions", "Redeem the coupon code", "Credits post within a minute"],
      },
      ar: {
        tagline: "استوديو فيديو توليدي مع أرصدة مجانية إضافية",
        description:
          "تحويل نص وصورة إلى فيديو وأدوات تحرير متقدمة مثل فرشاة الحركة والاستيفاء بين الإطارات. الحسابات الجديدة تحصل على أرصدة مجانية يزيدها العرض الحالي.",
        features: ["أرصدة توليد مجانية لمرة واحدة", "نص وصورة إلى فيديو", "فرشاة حركة وتحكم بالكاميرا", "واجهة فيديو للمطورين"],
        useCases: ["نماذج إعلانات أولية", "تحريك القصص المصورة", "محتوى فيديو اجتماعي"],
        pros: ["جودة حركة قوية", "أدوات تحرير غنية"],
        cons: ["الأرصدة تنفد بسرعة", "بطء في أوقات الذروة"],
        redeem: ["أنشئ مساحة عمل مجانية", "افتح الفوترة ← العروض", "استبدل كود القسيمة", "تُضاف الأرصدة خلال دقيقة"],
      },
      ru: {
        tagline: "Студия генеративного видео с бонусными кредитами",
        description:
          "Text-to-video, image-to-video и продвинутый монтаж: motion brush, интерполяция кадров. Новым аккаунтам — разовые бесплатные кредиты плюс бонус по акции.",
        features: ["Разовые бесплатные кредиты", "Текст и изображение в видео", "Motion brush и управление камерой", "Видео-API"],
        useCases: ["Прототипы рекламы", "Анимация раскадровок", "Видео для соцсетей"],
        pros: ["Качественное движение", "Богатый монтаж"],
        cons: ["Кредиты быстро тратятся", "Медленно в пиковые часы"],
        redeem: ["Создайте бесплатный воркспейс", "Биллинг → Промоакции", "Активируйте промокод", "Кредиты придут за минуту"],
      },
    },
  },
];

export const CATEGORIES: { key: Category | "all"; i18nKey: string }[] = [
  { key: "all", i18nKey: "cat.all" },
  { key: "llm", i18nKey: "cat.llm" },
  { key: "image", i18nKey: "cat.image" },
  { key: "video", i18nKey: "cat.video" },
  { key: "code", i18nKey: "cat.code" },
  { key: "auto", i18nKey: "cat.auto" },
];

export const PRICING_KEY: Record<Pricing, string> = {
  free: "badge.free",
  freemium: "badge.freemium",
  oss: "badge.oss",
  deal: "badge.deal",
};

export const DEALS = TOOLS.filter((tool) => tool.coupon);