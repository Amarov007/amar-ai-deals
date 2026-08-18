import { Bot, RefreshCw, TimerReset } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export function SyncEngine() {
  const { t } = useI18n();
  const items = [
    { icon: RefreshCw, t: "sync.1.t", d: "sync.1.d" },
    { icon: Bot, t: "sync.2.t", d: "sync.2.d" },
    { icon: TimerReset, t: "sync.3.t", d: "sync.3.d" },
  ];

  return (
    <section id="sync" className="scroll-mt-28 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t("sync.title")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("sync.subtitle")}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.t} className="glass glass-hover rounded-2xl p-6">
              <span className="bg-brand grid h-10 w-10 place-items-center rounded-xl text-[oklch(0.14_0.02_265)]">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{t(item.t)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}