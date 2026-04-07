"use client";

import { useState } from "react";
import {
  MapPin,
  Truck,
  FileText,
  Cloud,
  Map as MapIcon,
  X,
  Activity,
  AlertTriangle,
  Radio,
  ChevronRight,
  Clock,
  Shield,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Sample data — replace with real API calls                         */
/* ------------------------------------------------------------------ */

const SAMPLE_BRIGADE = {
  driver: "Carlos Rivera",
  truckId: "WM-T-042",
  status: "en-route" as const,
  tasksToday: 6,
  nextStop: "Bayamón — Case #WM-2024-1847",
  eta: "11:24 AM",
};

const LAYER_TOGGLES = [
  { key: "brigades", label: "Brigades", icon: Truck },
  { key: "cases", label: "Cases", icon: FileText },
  { key: "weather", label: "Weather", icon: Cloud },
  { key: "zones", label: "Zones", icon: MapIcon },
] as const;

const KPI_CHIPS = [
  { label: "23 Brigades Active", color: "var(--color-dark-success)" },
  { label: "384 Cases Today", color: "var(--color-dark-info)" },
  { label: "2 Weather Alerts", color: "var(--color-dark-warning)" },
];

const FEED_ENTRIES = [
  {
    time: "10:42 AM",
    agent: "Monitor IA",
    text: "Flagged delay on Case #WM-2024-1847 — brigade ETA slipped +18 min",
  },
  {
    time: "10:38 AM",
    agent: "Dispatch IA",
    text: "Re-routed Brigade T-019 around PR-22 closure (Dorado)",
  },
  {
    time: "10:31 AM",
    agent: "Weather IA",
    text: "Tropical wave advisory issued for south coast — 3 brigades notified",
  },
];

/* ------------------------------------------------------------------ */
/*  Status badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "en-route": "bg-[var(--color-dark-info)]/20 text-[var(--color-dark-info)]",
    active: "bg-[var(--color-dark-success)]/20 text-[var(--color-dark-success)]",
    idle: "bg-[var(--color-dark-text-secondary)]/20 text-[var(--color-dark-text-secondary)]",
    alert: "bg-[var(--color-dark-danger)]/20 text-[var(--color-dark-danger)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${colors[status] ?? colors.idle}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function OpsCenterPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(["brigades"])
  );

  const toggleLayer = (key: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="relative flex flex-1 overflow-hidden bg-[var(--color-dark-bg)]">
      {/* ============================================================ */}
      {/*  LEFT PANEL — Brigade Details (slides in on marker click)     */}
      {/* ============================================================ */}
      <aside
        className={`
          absolute inset-y-0 left-0 z-30 flex w-[30%] min-w-[320px] max-w-[420px] flex-col
          border-r border-[var(--color-dark-border)]
          transition-transform duration-300 ease-in-out
          ${panelOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "rgba(15, 25, 35, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-[var(--color-dark-border)] px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-dark-text)]">
            <Shield className="h-4 w-4 text-[var(--color-dark-primary)]" />
            Brigade Details
          </h2>
          <button
            onClick={() => setPanelOpen(false)}
            className="rounded-md p-1 text-[var(--color-dark-text-secondary)] transition-colors hover:bg-[var(--color-dark-surface-elevated)] hover:text-[var(--color-dark-text)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Brigade card */}
        <div className="flex-1 overflow-y-auto p-5">
          <div
            className="rounded-xl border border-[var(--color-dark-border)] p-4"
            style={{ background: "var(--color-dark-surface)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-dark-text-secondary)]">
                Truck {SAMPLE_BRIGADE.truckId}
              </span>
              <StatusBadge status={SAMPLE_BRIGADE.status} />
            </div>

            <h3 className="mb-1 text-lg font-semibold text-[var(--color-dark-text)]">
              {SAMPLE_BRIGADE.driver}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-[var(--color-dark-text-secondary)]">
              <div className="flex items-center justify-between">
                <span>Tasks today</span>
                <span className="font-medium text-[var(--color-dark-text)]">
                  {SAMPLE_BRIGADE.tasksToday}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Next stop</span>
                <span className="max-w-[180px] truncate font-medium text-[var(--color-dark-text)]">
                  {SAMPLE_BRIGADE.nextStop}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>ETA</span>
                <span className="font-medium text-[var(--color-dark-info)]">
                  {SAMPLE_BRIGADE.eta}
                </span>
              </div>
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--color-dark-primary)]/15 py-2 text-xs font-medium text-[var(--color-dark-primary)] transition-colors hover:bg-[var(--color-dark-primary)]/25">
              View Full Profile
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/*  MAP AREA                                                     */}
      {/* ============================================================ */}
      <div className="relative flex flex-1 flex-col">
        {/* Map placeholder */}
        <div
          className="flex flex-1 flex-col items-center justify-center gap-4"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-dark-surface-elevated) 0%, var(--color-dark-bg) 70%)",
          }}
        >
          {/* Subtle grid overlay for Gotham effect */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-dark-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-dark-text) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <MapPin className="h-16 w-16 text-[var(--color-dark-primary)] opacity-40" />
          <div className="text-center">
            <p className="text-xl font-semibold text-[var(--color-dark-text)]">
              Map View — Puerto Rico
            </p>
            <p className="mt-1 text-sm text-[var(--color-dark-text-secondary)]">
              Mapbox GL integration pending{" "}
              <code className="rounded bg-[var(--color-dark-surface-elevated)] px-1.5 py-0.5 text-xs text-[var(--color-dark-accent)]">
                NEXT_PUBLIC_MAPBOX_TOKEN
              </code>
            </p>
          </div>

          {/* Demo button to toggle panel */}
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="mt-4 rounded-lg border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] px-4 py-2 text-xs font-medium text-[var(--color-dark-text-secondary)] transition-colors hover:bg-[var(--color-dark-surface-elevated)] hover:text-[var(--color-dark-text)]"
          >
            {panelOpen ? "Close" : "Open"} Brigade Panel (demo)
          </button>
        </div>

        {/* ----- Floating KPI chips (top-left) ----- */}
        <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
          {KPI_CHIPS.map((kpi) => (
            <div
              key={kpi.label}
              className="flex items-center gap-2 rounded-lg border border-[var(--color-dark-border)] px-3 py-1.5 text-xs font-medium"
              style={{
                background: "rgba(15, 25, 35, 0.80)",
                backdropFilter: "blur(8px)",
                color: kpi.color,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: kpi.color }}
              />
              {kpi.label}
            </div>
          ))}
        </div>

        {/* ----- Layer toggle buttons (top-right) ----- */}
        <div className="absolute right-4 top-4 z-20 flex gap-1.5">
          {LAYER_TOGGLES.map(({ key, label, icon: Icon }) => {
            const isActive = activeLayers.has(key);
            return (
              <button
                key={key}
                onClick={() => toggleLayer(key)}
                title={label}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "border-[var(--color-dark-primary)] bg-[var(--color-dark-primary)]/15 text-[var(--color-dark-primary)]"
                    : "border-[var(--color-dark-border)] bg-[var(--color-dark-surface)]/80 text-[var(--color-dark-text-secondary)] hover:text-[var(--color-dark-text)]"
                }`}
                style={{
                  backdropFilter: "blur(8px)",
                }}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>

        {/* ----- Agent Activity Feed (bottom tray) ----- */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 border-t border-[var(--color-dark-border)]"
          style={{
            background: "rgba(15, 25, 35, 0.90)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-dark-border)]/50 px-4 py-2">
            <Activity className="h-3.5 w-3.5 text-[var(--color-dark-accent)]" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-dark-text-secondary)]">
              Agent Activity Feed
            </span>
            <Radio className="ml-auto h-3 w-3 animate-pulse text-[var(--color-dark-success)]" />
            <span className="text-[10px] text-[var(--color-dark-success)]">
              LIVE
            </span>
          </div>
          <div className="flex flex-col divide-y divide-[var(--color-dark-border)]/30">
            {FEED_ENTRIES.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-2 text-xs"
              >
                <span className="flex shrink-0 items-center gap-1 text-[var(--color-dark-text-secondary)]">
                  <Clock className="h-3 w-3" />
                  {entry.time}
                </span>
                <span className="shrink-0 rounded bg-[var(--color-dark-accent)]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-dark-accent)]">
                  {entry.agent}
                </span>
                <span className="text-[var(--color-dark-text)]">
                  {entry.text}
                </span>
                {i === 0 && (
                  <AlertTriangle className="ml-auto h-3.5 w-3.5 shrink-0 text-[var(--color-dark-warning)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
