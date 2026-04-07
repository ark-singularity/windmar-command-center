"use client";

import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Gauge,
  Users,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/* ─── Color tokens (Palantir Gotham dark) ─── */
const C = {
  bg: "#0F1923",
  surface: "#141F2B",
  elevated: "#1A2736",
  text: "#E8EDF3",
  secondary: "#8899AA",
  border: "#243447",
  accent: "#F89B24",
  primary: "#4A7AE5",
  success: "#22C55E",
  warning: "#FBBF24",
  danger: "#EF4444",
} as const;

/* ─── KPI card data ─── */
const kpiCards = [
  {
    label: "Pipeline Velocity",
    value: "87",
    unit: "days",
    target: "< 90 days",
    trend: "down" as const,
    trendValue: "-3.2%",
    status: "success" as const,
    icon: Clock,
    sparkline: [95, 93, 92, 91, 90, 89, 88, 87],
  },
  {
    label: "SLA Compliance",
    value: "82.4",
    unit: "%",
    target: "> 85%",
    trend: "up" as const,
    trendValue: "+1.8%",
    status: "warning" as const,
    icon: Target,
    sparkline: [78, 79, 80, 79, 81, 80, 82, 82.4],
  },
  {
    label: "Brigade Utilization",
    value: "91.2",
    unit: "%",
    target: "> 90%",
    trend: "up" as const,
    trendValue: "+2.1%",
    status: "success" as const,
    icon: Gauge,
    sparkline: [86, 87, 88, 89, 90, 90, 91, 91.2],
  },
  {
    label: "First-Time Completion",
    value: "76.8",
    unit: "%",
    target: "> 80%",
    trend: "down" as const,
    trendValue: "-1.4%",
    status: "danger" as const,
    icon: Zap,
    sparkline: [80, 79, 78, 79, 78, 77, 77, 76.8],
  },
];

const statusColor = {
  success: C.success,
  warning: C.warning,
  danger: C.danger,
};

/* ─── Stage Dwell Time data ─── */
const stageDwellData = [
  { stage: "VENTA", days: 2, sla: 3 },
  { stage: "DATA ENTRY", days: 5, sla: 3 },
  { stage: "FINANCIAMIENTO", days: 8, sla: 7 },
  { stage: "WELCOME CALL", days: 1, sla: 2 },
  { stage: "DISENO", days: 7, sla: 7 },
  { stage: "PERMISOS", days: 12, sla: 10 },
  { stage: "READY TO INSTALL", days: 3, sla: 5 },
  { stage: "AGENDA", days: 4, sla: 5 },
  { stage: "ALMACEN", days: 2, sla: 3 },
  { stage: "FLOTA", days: 1, sla: 2 },
  { stage: "INSTALACION", days: 3, sla: 4 },
  { stage: "POST INSTALL", days: 15, sla: 10 },
  { stage: "PERMISOS 2", days: 10, sla: 8 },
  { stage: "FINANCIERA PAGA", days: 14, sla: 12 },
];

/* ─── Pipeline Velocity Trend (30 days) ─── */
const velocityTrend = Array.from({ length: 30 }, (_, i) => {
  const base = 95 - (i * 8) / 29;
  const noise = Math.sin(i * 0.8) * 1.5 + Math.cos(i * 0.4) * 1;
  return {
    day: `Day ${i + 1}`,
    velocity: Math.round((base + noise) * 10) / 10,
  };
});

/* ─── Agent ROI data ─── */
const agentROI = [
  { agent: "Narrator", hoursSaved: 142, decisions: 1_840 },
  { agent: "Permit Tracker", hoursSaved: 96, decisions: 720 },
  { agent: "SLA Guardian", hoursSaved: 88, decisions: 1_260 },
  { agent: "Finance Closer", hoursSaved: 74, decisions: 540 },
  { agent: "Install Scheduler", hoursSaved: 110, decisions: 980 },
  { agent: "Data Validator", hoursSaved: 62, decisions: 2_100 },
  { agent: "Welcome Caller", hoursSaved: 54, decisions: 410 },
  { agent: "Design Router", hoursSaved: 48, decisions: 380 },
  { agent: "Post-Install QA", hoursSaved: 68, decisions: 620 },
];

/* ─── Bottleneck Index ─── */
const bottlenecks = [
  { stage: "POST INSTALL", dwellDays: 15, slaDays: 10, breaches: 34 },
  { stage: "FINANCIERA PAGA", dwellDays: 14, slaDays: 12, breaches: 28 },
  { stage: "PERMISOS", dwellDays: 12, slaDays: 10, breaches: 22 },
];

/* ─── Mini sparkline ─── */
function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 28;
  const w = 64;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Custom tooltip ─── */
function DarkTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{
        background: C.elevated,
        border: `1px solid ${C.border}`,
        color: C.text,
      }}
    >
      <p className="font-medium">{label}</p>
      <p style={{ color: C.primary }} className="tabular-nums">
        {payload[0].value} {typeof payload[0].value === "number" && payload[0].value < 100 ? "days" : ""}
      </p>
    </div>
  );
}

/* ─── Panel wrapper ─── */
function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={{
        background: C.elevated,
        border: `1px solid ${C.border}`,
      }}
    >
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{ color: C.secondary, fontFamily: "var(--font-inter)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ═════════════════════════════════════════════════════
   KPIs Page
   ═════════════════════════════════════════════════════ */
export default function KPIsPage() {
  return (
    <div
      className="p-5 space-y-5 min-h-full"
      style={{ background: C.bg, fontFamily: "var(--font-inter)" }}
    >
      {/* ── KPI cards row ── */}
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const color = statusColor[kpi.status];
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div
              key={kpi.label}
              className="rounded-xl p-5 flex flex-col gap-3"
              style={{
                background: C.elevated,
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: C.secondary }}
                  >
                    {kpi.label}
                  </span>
                </div>
                <MiniSparkline data={kpi.sparkline} color={color} />
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-3xl font-bold tabular-nums"
                  style={{ color: C.text, fontFamily: "var(--font-outfit)" }}
                >
                  {kpi.value}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: C.secondary }}
                >
                  {kpi.unit}
                </span>
              </div>

              {/* Footer: trend + target */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <TrendIcon size={12} style={{ color }} />
                  <span
                    className="text-xs font-medium tabular-nums"
                    style={{ color }}
                  >
                    {kpi.trendValue}
                  </span>
                </div>
                <span className="text-xs" style={{ color: C.secondary }}>
                  Target: {kpi.target}
                </span>
              </div>

              {/* Status bar */}
              <div
                className="h-1 rounded-full"
                style={{ background: `${color}25` }}
              >
                <div
                  className="h-1 rounded-full"
                  style={{
                    background: color,
                    width:
                      kpi.status === "success"
                        ? "100%"
                        : kpi.status === "warning"
                          ? "75%"
                          : "50%",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main 2-column grid ── */}
      <div className="grid grid-cols-2 gap-5">
        {/* Stage Dwell Time */}
        <Panel title="Stage Dwell Time" className="col-span-1">
          <div style={{ height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stageDwellData}
                layout="vertical"
                margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
                barCategoryGap="20%"
              >
                <CartesianGrid
                  horizontal={false}
                  stroke={C.border}
                  strokeDasharray="3 3"
                />
                <XAxis
                  type="number"
                  tick={{ fill: C.secondary, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, "auto"]}
                  unit="d"
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={110}
                  tick={{ fill: C.secondary, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={<DarkTooltip />}
                  cursor={{ fill: `${C.primary}10` }}
                />
                <Bar dataKey="days" radius={[0, 4, 4, 0]} maxBarSize={18}>
                  {stageDwellData.map((entry) => (
                    <Cell
                      key={entry.stage}
                      fill={
                        entry.days <= entry.sla
                          ? C.success
                          : entry.days <= entry.sla * 1.2
                            ? C.warning
                            : C.danger
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Pipeline Velocity Trend */}
        <Panel title="Pipeline Velocity Trend (30-day rolling avg)">
          <div style={{ height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={velocityTrend}
                margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient
                    id="velocityGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={C.primary}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor={C.primary}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke={C.border}
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: C.secondary, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fill: C.secondary, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={["auto", "auto"]}
                  unit="d"
                />
                <Tooltip
                  content={<DarkTooltip />}
                  cursor={{ stroke: C.accent, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="velocity"
                  stroke={C.primary}
                  strokeWidth={2}
                  fill="url(#velocityGrad)"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: C.primary,
                    stroke: C.elevated,
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Agent ROI */}
        <Panel title="Agent ROI This Month">
          <div className="overflow-auto" style={{ maxHeight: 340 }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: C.secondary }}>
                  <th className="text-left pb-3 font-medium">Agent</th>
                  <th className="text-right pb-3 font-medium">Hours Saved</th>
                  <th className="text-right pb-3 font-medium">Decisions</th>
                </tr>
              </thead>
              <tbody>
                {agentROI.map((row) => (
                  <tr
                    key={row.agent}
                    className="border-t"
                    style={{ borderColor: C.border }}
                  >
                    <td className="py-2.5 flex items-center gap-2">
                      <Users size={13} style={{ color: C.primary }} />
                      <span style={{ color: C.text }}>{row.agent}</span>
                    </td>
                    <td
                      className="text-right tabular-nums py-2.5 font-medium"
                      style={{ color: C.success }}
                    >
                      {row.hoursSaved}h
                    </td>
                    <td
                      className="text-right tabular-nums py-2.5"
                      style={{ color: C.secondary }}
                    >
                      {row.decisions.toLocaleString()}
                    </td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr
                  className="border-t-2"
                  style={{ borderColor: C.border }}
                >
                  <td
                    className="py-2.5 font-semibold"
                    style={{ color: C.text }}
                  >
                    Total
                  </td>
                  <td
                    className="text-right tabular-nums py-2.5 font-bold"
                    style={{ color: C.success }}
                  >
                    {agentROI.reduce((s, r) => s + r.hoursSaved, 0)}h
                  </td>
                  <td
                    className="text-right tabular-nums py-2.5 font-medium"
                    style={{ color: C.text }}
                  >
                    {agentROI
                      .reduce((s, r) => s + r.decisions, 0)
                      .toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Bottleneck Index */}
        <Panel title="Bottleneck Index">
          <div className="space-y-4">
            {bottlenecks.map((b, i) => {
              const pct = Math.round(
                ((b.dwellDays - b.slaDays) / b.slaDays) * 100
              );
              return (
                <div
                  key={b.stage}
                  className="rounded-lg p-4"
                  style={{
                    background: `${C.danger}08`,
                    border: `1px solid ${C.danger}20`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: `${C.danger}20`,
                          color: C.danger,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: C.text }}
                      >
                        {b.stage}
                      </span>
                    </div>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: `${C.danger}20`,
                        color: C.danger,
                      }}
                    >
                      {b.breaches} SLA breaches
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span style={{ color: C.secondary }}>Avg Dwell: </span>
                      <span
                        className="font-semibold tabular-nums"
                        style={{ color: C.danger }}
                      >
                        {b.dwellDays}d
                      </span>
                    </div>
                    <div>
                      <span style={{ color: C.secondary }}>SLA Target: </span>
                      <span
                        className="font-medium tabular-nums"
                        style={{ color: C.text }}
                      >
                        {b.slaDays}d
                      </span>
                    </div>
                    <div>
                      <span style={{ color: C.secondary }}>Over by: </span>
                      <span
                        className="font-semibold tabular-nums"
                        style={{ color: C.danger }}
                      >
                        +{pct}%
                      </span>
                    </div>
                  </div>

                  {/* SLA breach bar */}
                  <div
                    className="mt-3 h-1.5 rounded-full"
                    style={{ background: `${C.danger}15` }}
                  >
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        background: C.danger,
                        width: `${Math.min((b.dwellDays / 20) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
