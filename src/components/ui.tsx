import Link from "next/link";

export function AppShell({
  children,
  title,
  backHref,
}: {
  children: React.ReactNode;
  title?: string;
  backHref?: string;
}) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          {backHref ? (
            <Link href={backHref} className="back-link" aria-label="Back">
              ← Back
            </Link>
          ) : (
            <span className="brand-mark">EMT Drill</span>
          )}
          {title ? <h1 className="screen-title">{title}</h1> : <span />}
          <span className="header-spacer" />
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="progress-track" aria-label={`Step ${current} of ${total}`}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
      <span className="progress-label">
        {current}/{total}
      </span>
    </div>
  );
}

export function SourceBadge({
  scope,
  label,
  note,
}: {
  scope: "national" | "local";
  label: string;
  note?: string;
}) {
  return (
    <div className={`source-badge scope-${scope}`}>
      <span className="source-scope">{scope === "national" ? "National curriculum" : "Local protocol"}</span>
      <span className="source-label">{label}</span>
      {note ? <span className="source-note">{note}</span> : null}
    </div>
  );
}

export function VitalsStrip({
  vitals,
}: {
  vitals?: {
    hr?: number | string;
    rr?: number | string;
    spo2?: number | string;
    bp?: string;
    temp?: string;
    glucose?: string;
    gcs?: string;
    etco2?: string;
    skin?: string;
  };
}) {
  if (!vitals) return null;
  const items: { k: string; v: string }[] = [];
  if (vitals.hr != null) items.push({ k: "HR", v: String(vitals.hr) });
  if (vitals.rr != null) items.push({ k: "RR", v: String(vitals.rr) });
  if (vitals.spo2 != null) items.push({ k: "SpO₂", v: `${vitals.spo2}%` });
  if (vitals.bp) items.push({ k: "BP", v: vitals.bp });
  if (vitals.glucose) items.push({ k: "Glu", v: vitals.glucose });
  if (vitals.gcs) items.push({ k: "GCS", v: vitals.gcs });
  if (vitals.temp) items.push({ k: "Temp", v: vitals.temp });
  if (vitals.etco2) items.push({ k: "EtCO₂", v: vitals.etco2 });
  if (vitals.skin) items.push({ k: "Skin", v: vitals.skin });
  if (items.length === 0) return null;
  return (
    <dl className="vitals-strip">
      {items.map((i) => (
        <div key={i.k} className="vital-item">
          <dt>{i.k}</dt>
          <dd>{i.v}</dd>
        </div>
      ))}
    </dl>
  );
}
