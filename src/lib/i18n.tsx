import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar" | "ru";

export const LANGS: { code: Lang; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
  { code: "ru", label: "Russian", native: "Русский", dir: "ltr" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "brand.tagline": "AI Discovery & Deals Intelligence",
  "nav.tools": "Tools Index",
  "nav.deals": "Live Deals",
  "nav.categories": "Categories",
  "nav.sync": "Sync Engine",
  "search.placeholder": "Search 1,200+ AI tools, models & coupons…",
  "search.empty": "No matches. Try another keyword.",
  "status.sync": "Server Auto-Sync: Active",
  "status.deals": "Live Deals Tracker",
  "lang.switch": "Language",
  "hero.eyebrow": "Hourly automated indexing",
  "hero.title1": "Every free AI model.",
  "hero.title2": "Every limited-time deal.",
  "hero.subtitle":
    "AMAR007AI continuously indexes zero-cost AI tools, open-source models and exclusive trial vouchers — verified, summarized and expiry-monitored in real time.",
  "hero.cta": "Explore the index",
  "hero.cta2": "Claim live deals",
  "metric.tools": "Indexed free tools",
  "metric.coupons": "Active promo coupons",
  "metric.updates": "Updates today",
  "cat.all": "All",
  "cat.llm": "LLMs",
  "cat.image": "Image & Design",
  "cat.video": "Video & Audio",
  "cat.code": "Code Intelligence",
  "cat.auto": "Automation & Productivity",
  "grid.title": "Tools Index",
  "grid.subtitle": "Filter, sort and open a full technical dossier for any tool.",
  "sort.newest": "Newest",
  "sort.rated": "Highest rated",
  "sort.ending": "Ending soon",
  "sort.label": "Sort by",
  "badge.free": "100% Free",
  "badge.freemium": "Freemium",
  "badge.oss": "Open Source",
  "badge.deal": "Limited Free Deal",
  "card.launch": "Launch Tool",
  "card.claim": "Claim Offer",
  "card.details": "Full dossier",
  "card.updated": "Updated",
  "time.min": "mins ago",
  "time.hour": "hours ago",
  "deals.title": "Limited-Time Deals Hub",
  "deals.subtitle":
    "Paid AI services currently offering 100% free trials, promo codes or free API credits.",
  "deals.copy": "Copy code",
  "deals.copied": "Coupon copied",
  "deals.ends": "Ends in",
  "deals.expired": "Expired",
  "modal.about": "Technical overview",
  "modal.features": "Key features",
  "modal.usecases": "Primary use-cases",
  "modal.pros": "Pros",
  "modal.cons": "Cons",
  "modal.api": "API availability",
  "modal.api.yes": "Public API available",
  "modal.api.no": "No public API",
  "modal.docs": "Official documentation",
  "modal.notes": "Release notes",
  "modal.redeem": "Coupon redemption steps",
  "modal.pricing": "Pricing status",
  "sync.title": "Automated Sync & Update Engine",
  "sync.subtitle":
    "Serverless cron jobs run hourly against developer APIs, RSS feeds and changelogs.",
  "sync.1.t": "Hourly crawlers",
  "sync.1.d": "Scheduled serverless jobs poll vendor APIs, RSS feeds and public changelogs.",
  "sync.2.t": "AI summarizer pipeline",
  "sync.2.d": "Generates structured descriptions, auto-categorizes tools and tags features.",
  "sync.3.t": "Expiration monitor",
  "sync.3.d": "Expires coupons and downgrades deal badges the moment a promo period ends.",
  "footer.rights": "All systems nominal. Independent index — no vendor sponsorship.",
  "results.count": "tools",
  "rating": "Rating",
};

const ar: Dict = {
  "brand.tagline": "استكشاف أدوات الذكاء الاصطناعي والعروض",
  "nav.tools": "فهرس الأدوات",
  "nav.deals": "العروض الحية",
  "nav.categories": "التصنيفات",
  "nav.sync": "محرك المزامنة",
  "search.placeholder": "ابحث في أكثر من ١٢٠٠ أداة ونموذج وقسيمة…",
  "search.empty": "لا نتائج مطابقة. جرّب كلمة أخرى.",
  "status.sync": "المزامنة التلقائية: نشطة",
  "status.deals": "متتبع العروض الحية",
  "lang.switch": "اللغة",
  "hero.eyebrow": "فهرسة تلقائية كل ساعة",
  "hero.title1": "كل نموذج ذكاء اصطناعي مجاني.",
  "hero.title2": "وكل عرض محدود المدة.",
  "hero.subtitle":
    "يفهرس AMAR007AI باستمرار أدوات الذكاء الاصطناعي المجانية والنماذج مفتوحة المصدر وقسائم التجربة الحصرية — موثّقة وملخّصة ومراقبة الانتهاء في الوقت الحقيقي.",
  "hero.cta": "استكشف الفهرس",
  "hero.cta2": "احصل على العروض",
  "metric.tools": "أدوات مجانية مفهرسة",
  "metric.coupons": "قسائم فعّالة",
  "metric.updates": "تحديثات اليوم",
  "cat.all": "الكل",
  "cat.llm": "النماذج اللغوية",
  "cat.image": "الصور والتصميم",
  "cat.video": "الفيديو والصوت",
  "cat.code": "ذكاء البرمجة",
  "cat.auto": "الأتمتة والإنتاجية",
  "grid.title": "فهرس الأدوات",
  "grid.subtitle": "صفِّ ورتِّب وافتح ملفاً تقنياً كاملاً لأي أداة.",
  "sort.newest": "الأحدث",
  "sort.rated": "الأعلى تقييماً",
  "sort.ending": "ينتهي قريباً",
  "sort.label": "الترتيب",
  "badge.free": "مجاني ١٠٠٪",
  "badge.freemium": "مجاني جزئياً",
  "badge.oss": "مفتوح المصدر",
  "badge.deal": "عرض مجاني محدود",
  "card.launch": "تشغيل الأداة",
  "card.claim": "احصل على العرض",
  "card.details": "الملف الكامل",
  "card.updated": "تحديث",
  "time.min": "منذ دقائق",
  "time.hour": "منذ ساعات",
  "deals.title": "مركز العروض محدودة المدة",
  "deals.subtitle":
    "خدمات ذكاء اصطناعي مدفوعة تقدّم حالياً تجارب مجانية بالكامل أو أكواد خصم أو أرصدة API مجانية.",
  "deals.copy": "نسخ الكود",
  "deals.copied": "تم نسخ القسيمة",
  "deals.ends": "ينتهي خلال",
  "deals.expired": "منتهي",
  "modal.about": "نظرة تقنية",
  "modal.features": "المزايا الرئيسية",
  "modal.usecases": "أهم الاستخدامات",
  "modal.pros": "الإيجابيات",
  "modal.cons": "السلبيات",
  "modal.api": "توفر الواجهة البرمجية",
  "modal.api.yes": "واجهة برمجية عامة متوفرة",
  "modal.api.no": "لا توجد واجهة برمجية عامة",
  "modal.docs": "الوثائق الرسمية",
  "modal.notes": "ملاحظات الإصدار",
  "modal.redeem": "خطوات استخدام القسيمة",
  "modal.pricing": "حالة التسعير",
  "sync.title": "محرك المزامنة والتحديث الآلي",
  "sync.subtitle": "مهام مجدولة بلا سيرفر تعمل كل ساعة على واجهات المطورين وتغذيات RSS وسجلات التغيير.",
  "sync.1.t": "زواحف كل ساعة",
  "sync.1.d": "مهام مجدولة تستعلم واجهات المزوّدين وتغذيات RSS وسجلات التغيير العامة.",
  "sync.2.t": "خط تلخيص بالذكاء الاصطناعي",
  "sync.2.d": "يولّد أوصافاً منظمة ويصنّف الأدوات ويضع وسوم المزايا تلقائياً.",
  "sync.3.t": "مراقب الانتهاء",
  "sync.3.d": "ينهي القسائم ويخفّض شارات العروض لحظة انتهاء فترة الترويج.",
  "footer.rights": "جميع الأنظمة تعمل بشكل طبيعي. فهرس مستقل بلا رعاية تجارية.",
  "results.count": "أداة",
  "rating": "التقييم",
};

const ru: Dict = {
  "brand.tagline": "Поиск ИИ-инструментов и выгодных предложений",
  "nav.tools": "Каталог",
  "nav.deals": "Акции",
  "nav.categories": "Категории",
  "nav.sync": "Движок синхронизации",
  "search.placeholder": "Поиск среди 1200+ ИИ-инструментов, моделей и купонов…",
  "search.empty": "Ничего не найдено. Попробуйте другое слово.",
  "status.sync": "Автосинхронизация: активна",
  "status.deals": "Трекер акций в реальном времени",
  "lang.switch": "Язык",
  "hero.eyebrow": "Автоматическая индексация каждый час",
  "hero.title1": "Все бесплатные ИИ-модели.",
  "hero.title2": "Все акции с ограниченным сроком.",
  "hero.subtitle":
    "AMAR007AI непрерывно индексирует бесплатные ИИ-инструменты, open-source модели и эксклюзивные пробные ваучеры — проверено, кратко описано и с контролем сроков в реальном времени.",
  "hero.cta": "Открыть каталог",
  "hero.cta2": "Забрать акции",
  "metric.tools": "Бесплатных инструментов",
  "metric.coupons": "Активных купонов",
  "metric.updates": "Обновлений сегодня",
  "cat.all": "Все",
  "cat.llm": "Языковые модели",
  "cat.image": "Изображения и дизайн",
  "cat.video": "Видео и аудио",
  "cat.code": "Кодовый интеллект",
  "cat.auto": "Автоматизация и продуктивность",
  "grid.title": "Каталог инструментов",
  "grid.subtitle": "Фильтруйте, сортируйте и открывайте полное техническое досье.",
  "sort.newest": "Новые",
  "sort.rated": "По рейтингу",
  "sort.ending": "Скоро закончатся",
  "sort.label": "Сортировка",
  "badge.free": "100% бесплатно",
  "badge.freemium": "Freemium",
  "badge.oss": "Открытый код",
  "badge.deal": "Ограниченная акция",
  "card.launch": "Открыть инструмент",
  "card.claim": "Получить оффер",
  "card.details": "Полное досье",
  "card.updated": "Обновлено",
  "time.min": "мин назад",
  "time.hour": "ч назад",
  "deals.title": "Хаб ограниченных предложений",
  "deals.subtitle":
    "Платные ИИ-сервисы, которые сейчас дают полностью бесплатный доступ, промокоды или API-кредиты.",
  "deals.copy": "Скопировать код",
  "deals.copied": "Купон скопирован",
  "deals.ends": "Осталось",
  "deals.expired": "Истекло",
  "modal.about": "Технический обзор",
  "modal.features": "Ключевые возможности",
  "modal.usecases": "Основные сценарии",
  "modal.pros": "Плюсы",
  "modal.cons": "Минусы",
  "modal.api": "Доступность API",
  "modal.api.yes": "Публичный API доступен",
  "modal.api.no": "Публичного API нет",
  "modal.docs": "Официальная документация",
  "modal.notes": "Что нового",
  "modal.redeem": "Как активировать купон",
  "modal.pricing": "Тарифный статус",
  "sync.title": "Движок автоматических обновлений",
  "sync.subtitle":
    "Бессерверные cron-задачи ежечасно опрашивают API разработчиков, RSS и чейнджлоги.",
  "sync.1.t": "Ежечасные краулеры",
  "sync.1.d": "Задачи по расписанию опрашивают API вендоров, RSS-каналы и публичные чейнджлоги.",
  "sync.2.t": "ИИ-суммаризатор",
  "sync.2.d": "Формирует структурированные описания, категоризирует инструменты и ставит теги.",
  "sync.3.t": "Монитор истечения",
  "sync.3.d": "Гасит купоны и понижает бейджи акций сразу после окончания промо-периода.",
  "footer.rights": "Все системы в норме. Независимый каталог без спонсорства.",
  "results.count": "инструментов",
  "rating": "Рейтинг",
};

const DICTS: Record<Lang, Dict> = { en, ar, ru };

type Ctx = { lang: Lang; dir: "ltr" | "rtl"; setLang: (l: Lang) => void; t: (k: string) => string };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("amar007ai.lang") as Lang | null;
    if (stored && stored in DICTS) setLangState(stored);
  }, []);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("amar007ai.lang", l);
  }, []);

  const t = useCallback((k: string) => DICTS[lang][k] ?? DICTS.en[k] ?? k, [lang]);

  const value = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}