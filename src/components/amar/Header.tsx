import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Globe, Radio, Search, Zap } from "lucide-react";

import { useI18n, LANGS, type Lang } from "@/lib/i18n";
import { TOOLS, type Tool } from "@/lib/tools-data";
import { Logo } from "./Logo";

export function Header({
  query,
  onQuery,
  onSelectTool,
}: {
  query: string;
  onQuery: (v: string) => void;
  onSelectTool: (tool: Tool) => void;
}) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.i18n[lang].tagline.toLowerCase().includes(q) ||
        tool.id.includes(q),
    ).slice(0, 6);
  }, [query, lang]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[oklch(0.13_0.024_265/0.72)] backdrop-blur-xl">
      <div ref={wrapRef} className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-center justify-between gap-3">
          <a href="#top" aria-label="AMAR007AI">
            <Logo />
          </a>
          <div className="relative lg:hidden">
            <LangButton lang={lang} open={langOpen} setOpen={setLangOpen} setLang={setLang} label={t("lang.switch")} />
          </div>
        </div>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 -translate-y-1/2 start-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              onQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            className="glass h-11 w-full rounded-xl ps-10 pe-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-accent/60 focus:shadow-[0_0_0_3px_oklch(0.78_0.13_220/0.14)]"
          />
          {open && query.trim().length > 0 && (
            <div className="glass absolute inset-x-0 top-[3.25rem] z-50 overflow-hidden rounded-xl p-1.5">
              {suggestions.length === 0 && (
                <p className="px-3 py-3 text-sm text-muted-foreground">{t("search.empty")}</p>
              )}
              {suggestions.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start transition hover:bg-secondary/70"
                >
                  <img src={tool.logo} alt="" className="h-5 w-5" loading="lazy" />
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{tool.i18n[lang].tagline}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="glass ring-brand flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground">
            <Zap className="h-3.5 w-3.5 text-accent" />
            {t("status.sync")}
          </span>
          <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground">
            <Radio className="h-3.5 w-3.5 animate-pulse text-[oklch(0.68_0.22_355)]" />
            {t("status.deals")}
          </span>
          <div className="relative hidden lg:block">
            <LangButton lang={lang} open={langOpen} setOpen={setLangOpen} setLang={setLang} label={t("lang.switch")} />
          </div>
        </div>
      </div>
    </header>
  );
}

function LangButton({
  lang,
  open,
  setOpen,
  setLang,
  label,
}: {
  lang: Lang;
  open: boolean;
  setOpen: (v: boolean) => void;
  setLang: (l: Lang) => void;
  label: string;
}) {
  const current = LANGS.find((l) => l.code === lang)!;
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={label}
        className="glass glass-hover flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground"
      >
        <Globe className="h-4 w-4 text-accent" />
        {current.native}
      </button>
      {open && (
        <div className="glass absolute end-0 top-11 z-50 w-44 overflow-hidden rounded-xl p-1.5">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-secondary/70"
            >
              <span>{l.native}</span>
              {l.code === lang ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <span className="text-[10px] uppercase text-muted-foreground">{l.code}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}