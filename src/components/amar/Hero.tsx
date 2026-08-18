import { CATEGORIES, type Category } from "@/lib/tools-data";
import { useI18n } from "@/lib/i18n";

export function Hero({
  category,
  onCategory,
  metrics,
}: {
  category: Category | "all";
  onCategory: (c: Category | "all") => void;
  metrics: { tools: number; coupons: number; updates: number };
}) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-14 sm:pt-24">
      <div
        aria-hidden
        className="mesh-pulse pointer-events-none absolute start-1/2 top-[-8rem] h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand opacity-30 blur-[120px]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="glass ring-brand inline-flex items-center rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80">
          {t("hero.eyebrow")}
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-foreground sm:text-6xl">
          {t("hero.title1")}
          <br />
          <span className="text-brand">{t("hero.title2")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("hero.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#tools"
            className="bg-brand rounded-full px-6 py-3 text-sm font-semibold text-[oklch(0.14_0.02_265)] shadow-[var(--shadow-glow)] transition hover:brightness-110"
          >
            {t("hero.cta")}
          </a>
          <a
            href="#deals"
            className="glass glass-hover rounded-full px-6 py-3 text-sm font-semibold text-foreground"
          >
            {t("hero.cta2")}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => onCategory(c.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === c.key
                  ? "bg-brand text-[oklch(0.14_0.02_265)]"
                  : "glass glass-hover text-foreground/85"
              }`}
            >
              {t(c.i18nKey)}
            </button>
          ))}
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { v: metrics.tools, k: "metric.tools" },
            { v: metrics.coupons, k: "metric.coupons" },
            { v: metrics.updates, k: "metric.updates" },
          ].map((m) => (
            <div key={m.k} className="glass ring-brand rounded-2xl px-5 py-6">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t(m.k)}
              </dt>
              <dd className="mt-2 font-display text-3xl font-bold text-brand" dir="ltr">
                {m.v.toLocaleString("en-US")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}