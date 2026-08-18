import { ArrowUpRight, Clock, Star } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { PRICING_KEY, type Tool } from "@/lib/tools-data";
import { Countdown } from "./Countdown";

const pricingStyle: Record<string, string> = {
  free: "text-[oklch(0.82_0.17_150)] border-[oklch(0.82_0.17_150/0.35)] bg-[oklch(0.82_0.17_150/0.1)]",
  freemium: "text-accent border-accent/35 bg-accent/10",
  oss: "text-[oklch(0.78_0.14_85)] border-[oklch(0.78_0.14_85/0.35)] bg-[oklch(0.78_0.14_85/0.1)]",
  deal: "text-[oklch(0.75_0.2_355)] border-[oklch(0.75_0.2_355/0.4)] bg-[oklch(0.75_0.2_355/0.12)]",
};

export function ToolCard({ tool, onOpen }: { tool: Tool; onOpen: (tool: Tool) => void }) {
  const { t, lang } = useI18n();
  const copy = tool.i18n[lang];
  const updated =
    tool.updatedMinsAgo < 60
      ? `${tool.updatedMinsAgo} ${t("time.min")}`
      : `${Math.round(tool.updatedMinsAgo / 60)} ${t("time.hour")}`;

  return (
    <article
      onClick={() => onOpen(tool)}
      className="glass glass-hover group flex cursor-pointer flex-col gap-4 rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-secondary/60">
            <img src={tool.logo} alt={`${tool.name} logo`} className="h-6 w-6" loading="lazy" />
          </span>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">{tool.name}</h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-current text-[oklch(0.82_0.16_85)]" />
              {tool.rating.toFixed(1)}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${pricingStyle[tool.pricing]}`}
        >
          {t(PRICING_KEY[tool.pricing])}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{copy.tagline}</p>

      <ul className="flex flex-wrap gap-1.5">
        {copy.features.slice(0, 2).map((f) => (
          <li key={f} className="rounded-md bg-secondary/60 px-2 py-1 text-[11px] text-foreground/80">
            {f}
          </li>
        ))}
      </ul>

      {tool.coupon && (
        <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-3 py-2">
          <span className="text-[11px] font-medium text-muted-foreground">{t("deals.ends")}</span>
          <Countdown hoursLeft={tool.coupon.hoursLeft} />
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-1">
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {t("card.updated")} {updated}
        </span>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="ring-brand flex items-center gap-1.5 rounded-full bg-secondary/70 px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary"
        >
          {tool.coupon ? t("card.claim") : t("card.launch")}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}