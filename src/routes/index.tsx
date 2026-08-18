import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { I18nProvider, useI18n } from "@/lib/i18n";
import { TOOLS, type Category, type Tool } from "@/lib/tools-data";
import { Header } from "@/components/amar/Header";
import { Hero } from "@/components/amar/Hero";
import { ToolCard } from "@/components/amar/ToolCard";
import { DealsHub } from "@/components/amar/DealsHub";
import { SyncEngine } from "@/components/amar/SyncEngine";
import { ToolDossier } from "@/components/amar/ToolDossier";
import { Logo } from "@/components/amar/Logo";

const TITLE = "AMAR007AI — Free AI Tools Index & Limited-Time AI Deals";
const DESC =
  "AMAR007AI indexes free and open-source AI tools plus limited-time trial vouchers and API credits, auto-synced hourly. Available in English, Arabic and Russian.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <I18nProvider>
      <Home />
    </I18nProvider>
  ),
});

type Sort = "newest" | "rated" | "ending";

function Home() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [active, setActive] = useState<Tool | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = TOOLS.filter((tool) => {
      const copy = tool.i18n[lang];
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        copy.tagline.toLowerCase().includes(q) ||
        copy.description.toLowerCase().includes(q) ||
        copy.features.some((f) => f.toLowerCase().includes(q));
      return matchesQuery && (category === "all" || tool.category === category);
    });

    return [...list].sort((a, b) => {
      if (sort === "rated") return b.rating - a.rating;
      if (sort === "ending") {
        const av = a.coupon?.hoursLeft ?? Number.MAX_SAFE_INTEGER;
        const bv = b.coupon?.hoursLeft ?? Number.MAX_SAFE_INTEGER;
        return av - bv;
      }
      return a.addedDaysAgo - b.addedDaysAgo;
    });
  }, [query, category, sort, lang]);

  const metrics = {
    tools: 1284,
    coupons: TOOLS.filter((tool) => tool.coupon).length + 37,
    updates: 96,
  };

  const sorts: { key: Sort; label: string }[] = [
    { key: "newest", label: t("sort.newest") },
    { key: "rated", label: t("sort.rated") },
    { key: "ending", label: t("sort.ending") },
  ];

  return (
    <div id="top" className="min-h-screen">
      <Header query={query} onQuery={setQuery} onSelectTool={setActive} />

      <main>
        <Hero category={category} onCategory={setCategory} metrics={metrics} />

        <section id="tools" className="scroll-mt-28 px-4 pb-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("grid.title")}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t("grid.subtitle")}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">{t("sort.label")}</span>
                {sorts.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSort(s.key)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      sort === s.key
                        ? "bg-brand text-[oklch(0.14_0.02_265)]"
                        : "glass glass-hover text-foreground/85"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              {filtered.length} {t("results.count")}
            </p>

            {filtered.length === 0 ? (
              <p className="glass mt-6 rounded-2xl p-10 text-center text-sm text-muted-foreground">
                {t("search.empty")}
              </p>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} onOpen={setActive} />
                ))}
              </div>
            )}
          </div>
        </section>

        <DealsHub onOpen={setActive} />
        <SyncEngine />
      </main>

      <footer className="border-t border-border/60 px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
          <Logo size="sm" />
          <p className="text-xs text-muted-foreground">{t("brand.tagline")}</p>
          <p className="text-xs text-muted-foreground/80">{t("footer.rights")}</p>
        </div>
      </footer>

      <ToolDossier tool={active} onClose={() => setActive(null)} />
    </div>
  );
}