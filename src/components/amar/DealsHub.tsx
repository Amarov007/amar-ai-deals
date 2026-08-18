import { useState } from "react";
import { ArrowUpRight, Check, Copy, Ticket } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { DEALS, type Tool } from "@/lib/tools-data";
import { Countdown } from "./Countdown";

export function DealsHub({ onOpen }: { onOpen: (tool: Tool) => void }) {
  const { t, lang } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section id="deals" className="scroll-mt-28 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <Ticket className="h-5 w-5 text-[oklch(0.75_0.2_355)]" />
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("deals.title")}</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("deals.subtitle")}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DEALS.map((tool) => (
            <div
              key={tool.id}
              className="glass glass-hover ring-brand flex flex-col gap-4 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary/60">
                    <img src={tool.logo} alt={`${tool.name} logo`} className="h-6 w-6" loading="lazy" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool.i18n[lang].tagline}</p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {t("deals.ends")}
                  </p>
                  {tool.coupon && <Countdown hoursLeft={tool.coupon.hoursLeft} />}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <code
                  dir="ltr"
                  className="rounded-lg border border-dashed border-accent/50 bg-accent/10 px-3 py-2 font-mono text-sm font-semibold text-accent"
                >
                  {tool.coupon?.code}
                </code>
                <button
                  onClick={() => tool.coupon && copy(tool.coupon.code)}
                  className="flex items-center gap-1.5 rounded-lg bg-secondary/70 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
                >
                  {copied === tool.coupon?.code ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied === tool.coupon?.code ? t("deals.copied") : t("deals.copy")}
                </button>
                <button
                  onClick={() => onOpen(tool)}
                  className="rounded-lg px-2 py-2 text-xs font-semibold text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  {t("card.details")}
                </button>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand ms-auto flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-[oklch(0.14_0.02_265)]"
                >
                  {t("card.claim")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}