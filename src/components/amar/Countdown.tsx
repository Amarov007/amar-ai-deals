import { useEffect, useState } from "react";

import { useI18n } from "@/lib/i18n";

export function Countdown({ hoursLeft }: { hoursLeft: number }) {
  const { t } = useI18n();
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const end = Date.now() + hoursLeft * 3600_000;
    setDeadline(end);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [hoursLeft]);

  if (deadline === null) {
    return <span className="font-mono text-sm text-muted-foreground">--:--:--</span>;
  }

  const diff = Math.max(0, deadline - now);
  if (diff === 0) {
    return <span className="text-sm font-semibold text-destructive">{t("deals.expired")}</span>;
  }

  const total = Math.floor(diff / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="font-mono text-sm font-semibold text-brand" dir="ltr">
      {d > 0 ? `${d}d ` : ""}
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}