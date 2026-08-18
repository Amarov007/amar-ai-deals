import { ArrowUpRight, BookOpen, Check, Copy, Minus, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { useI18n } from "@/lib/i18n";
import { PRICING_KEY, type Tool } from "@/lib/tools-data";
import { Countdown } from "./Countdown";

export function ToolDossier({ tool, onClose }: { tool: Tool | null; onClose: () => void }) {
  const { t, lang, dir } = useI18n();
  const [copied, setCopied] = useState(false);
  if (!tool) return null;
  const copy = tool.i18n[lang];

  return (
    <div className="fixed inset-0 z-[100] flex" dir={dir}>
      <button
        aria-label="close"
        onClick={onClose}
        className="flex-1 bg-[oklch(0.08_0.02_265/0.7)] backdrop-blur-sm"
      />
      <aside className="glass ms-auto h-full w-full max-w-xl overflow-y-auto border-s border-border p-6 shadow-[var(--shadow-glow)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-secondary/60">
              <img src={tool.logo} alt={`${tool.name} logo`} className="h-7 w-7" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{tool.name}</h2>
              <p className="text-xs text-muted-foreground">{copy.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-secondary/70 p-2 text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold">
          <span className="ring-brand rounded-full bg-secondary/60 px-3 py-1.5 text-foreground">
            {t("modal.pricing")}: {t(PRICING_KEY[tool.pricing])}
          </span>
          <span className="rounded-full bg-secondary/60 px-3 py-1.5 text-foreground">
            {tool.api ? t("modal.api.yes") : t("modal.api.no")}
          </span>
          <span className="rounded-full bg-secondary/60 px-3 py-1.5 text-foreground" dir="ltr">
            ★ {tool.rating.toFixed(1)}
          </span>
        </div>

        <Section title={t("modal.about")}>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
        </Section>

        <Section title={t("modal.features")}>
          <ul className="space-y-2">
            {copy.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-foreground/85">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={t("modal.usecases")}>
          <ul className="flex flex-wrap gap-2">
            {copy.useCases.map((u) => (
              <li key={u} className="rounded-lg bg-secondary/60 px-3 py-1.5 text-xs text-foreground/85">
                {u}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-[oklch(0.82_0.17_150)]">
              {t("modal.pros")}
            </h4>
            <ul className="mt-2 space-y-1.5">
              {copy.pros.map((p) => (
                <li key={p} className="flex gap-2 text-xs text-foreground/85">
                  <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-[oklch(0.75_0.2_355)]">
              {t("modal.cons")}
            </h4>
            <ul className="mt-2 space-y-1.5">
              {copy.cons.map((c) => (
                <li key={c} className="flex gap-2 text-xs text-foreground/85">
                  <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Section title={t("modal.notes")}>
          <p className="rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
            {tool.releaseNote}
          </p>
        </Section>

        {tool.coupon && (
          <Section title={t("modal.redeem")}>
            <div className="ring-brand rounded-xl bg-secondary/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <code dir="ltr" className="font-mono text-sm font-bold text-accent">
                  {tool.coupon.code}
                </code>
                <div className="flex items-center gap-2">
                  <Countdown hoursLeft={tool.coupon.hoursLeft} />
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(tool.coupon!.code);
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 2000);
                    }}
                    className="rounded-lg bg-secondary/70 p-2 text-foreground"
                    aria-label={t("deals.copy")}
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <ol className="mt-3 space-y-1.5">
                {(copy.redeem ?? []).map((step, i) => (
                  <li key={step} className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{i + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
          </Section>
        )}

        <div className="sticky bottom-0 mt-8 flex gap-3 bg-[oklch(0.14_0.025_265/0.85)] py-4 backdrop-blur-md">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[oklch(0.14_0.02_265)]"
          >
            {tool.coupon ? t("card.claim") : t("card.launch")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={tool.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            {t("modal.docs")}
          </a>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-2.5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}