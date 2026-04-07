"use client";

import { useState } from "react";
import {
  Bot,
  Play,
  Pause,
  RotateCcw,
  Circle,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = "Active" | "Paused" | "Deploying" | "Error";
type Group = "Scheduling" | "Pipeline" | "Operations";

interface Agent {
  id: number;
  name: string;
  group: Group;
  description: string;
  trigger: string;
  status: Status;
  version: string;
  uptime: string;
  successRate: string;
  actionsToday: number;
  tools: string[];
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const agents: Agent[] = [
  {
    id: 1,
    name: "Monitor IA",
    group: "Scheduling",
    description:
      "Watches today's agenda, flags delays, suggests re-routes",
    trigger: "Every 15 min",
    status: "Active",
    version: "v2.1.0",
    uptime: "4d 12h",
    successRate: "97.8%",
    actionsToday: 84,
    tools: ["Zoho", "GeoTap", "Calendar", "Slack"],
  },
  {
    id: 2,
    name: "Reasignacion",
    group: "Scheduling",
    description: "Reassigns brigades when delays cascade",
    trigger: "On delay event",
    status: "Active",
    version: "v1.4.2",
    uptime: "4d 12h",
    successRate: "91.3%",
    actionsToday: 12,
    tools: ["Zoho", "Calendar", "Slack"],
  },
  {
    id: 3,
    name: "Clima",
    group: "Scheduling",
    description:
      "Checks weather forecasts, pre-cancels/reschedules outdoor work",
    trigger: "6am daily",
    status: "Active",
    version: "v1.2.0",
    uptime: "12d 3h",
    successRate: "99.1%",
    actionsToday: 6,
    tools: ["Weather API", "Zoho", "Slack"],
  },
  {
    id: 4,
    name: "Post-Trabajo",
    group: "Scheduling",
    description: "Verifies post-install checklist completion",
    trigger: "On job completion",
    status: "Paused",
    version: "v0.9.1",
    uptime: "—",
    successRate: "88.4%",
    actionsToday: 0,
    tools: ["Zoho", "GeoTap", "Camera"],
  },
  {
    id: 5,
    name: "Readiness Qualifier",
    group: "Pipeline",
    description:
      "Validates case requirements before stage advance",
    trigger: "On stage transition",
    status: "Active",
    version: "v1.7.0",
    uptime: "8d 1h",
    successRate: "94.2%",
    actionsToday: 47,
    tools: ["Zoho", "DocuSign", "Slack"],
  },
  {
    id: 6,
    name: "Post-Install Tracker",
    group: "Pipeline",
    description:
      "Tracks post-install permitting and interconnection",
    trigger: "Daily scan",
    status: "Deploying",
    version: "v0.3.0",
    uptime: "—",
    successRate: "—",
    actionsToday: 0,
    tools: ["Zoho", "Luma", "Email"],
  },
  {
    id: 7,
    name: "Material Match",
    group: "Operations",
    description:
      "Matches inventory to upcoming installation BOM",
    trigger: "On READY TO INSTALL",
    status: "Active",
    version: "v1.1.3",
    uptime: "6d 9h",
    successRate: "96.0%",
    actionsToday: 31,
    tools: ["Zoho", "Warehouse DB", "Slack"],
  },
  {
    id: 8,
    name: "Escalation Hub",
    group: "Operations",
    description: "Routes stuck cases to right person",
    trigger: "On SLA breach",
    status: "Active",
    version: "v1.5.1",
    uptime: "4d 12h",
    successRate: "93.7%",
    actionsToday: 19,
    tools: ["Zoho", "Slack", "PagerDuty"],
  },
  {
    id: 9,
    name: "Handoff Tracker",
    group: "Operations",
    description: "Monitors stage-to-stage handoffs",
    trigger: "On stage change",
    status: "Error",
    version: "v0.8.2",
    uptime: "0h 14m",
    successRate: "62.1%",
    actionsToday: 3,
    tools: ["Zoho", "Slack"],
  },
];

const groups: (Group | "All")[] = [
  "All",
  "Scheduling",
  "Pipeline",
  "Operations",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const statusColor: Record<Status, string> = {
  Active: "#22C55E",
  Paused: "#8899AA",
  Deploying: "#60A5FA",
  Error: "#EF4444",
};

const statusBg: Record<Status, string> = {
  Active: "rgba(34,197,94,0.12)",
  Paused: "rgba(136,153,170,0.12)",
  Deploying: "rgba(96,165,250,0.12)",
  Error: "rgba(239,68,68,0.12)",
};

const groupColor: Record<Group, string> = {
  Scheduling: "#F89B24",
  Pipeline: "#4A7AE5",
  Operations: "#22C55E",
};

const groupBg: Record<Group, string> = {
  Scheduling: "rgba(248,155,36,0.12)",
  Pipeline: "rgba(74,122,229,0.12)",
  Operations: "rgba(34,197,94,0.12)",
};

function StatusIcon({ status }: { status: Status }) {
  switch (status) {
    case "Active":
      return <CheckCircle size={12} />;
    case "Paused":
      return <Pause size={12} />;
    case "Deploying":
      return <Zap size={12} />;
    case "Error":
      return <AlertTriangle size={12} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AgentsPage() {
  const [activeGroup, setActiveGroup] = useState<Group | "All">("All");

  const filtered =
    activeGroup === "All"
      ? agents
      : agents.filter((a) => a.group === activeGroup);

  const counts = {
    All: agents.length,
    Scheduling: agents.filter((a) => a.group === "Scheduling").length,
    Pipeline: agents.filter((a) => a.group === "Pipeline").length,
    Operations: agents.filter((a) => a.group === "Operations").length,
  };

  return (
    <div
      className="min-h-full p-6"
      style={{ background: "var(--bg)", fontFamily: "var(--font-inter)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ background: "rgba(74,122,229,0.15)" }}
          >
            <Bot size={18} style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Agent Registry
            </h1>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {agents.filter((a) => a.status === "Active").length} active
              &middot; {agents.length} total &middot; Last sync 2m ago
            </p>
          </div>
        </div>
      </div>

      {/* Group filter tabs */}
      <div
        className="flex items-center gap-1 p-1 rounded-lg mb-6 w-fit"
        style={{ background: "var(--surface)" }}
      >
        {groups.map((g) => {
          const isActive = activeGroup === g;
          return (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
              style={{
                background: isActive ? "var(--bg)" : "transparent",
                color: isActive ? "var(--text)" : "var(--text-secondary)",
                boxShadow: isActive ? "var(--card-shadow)" : "none",
              }}
            >
              {g}
              <span
                className="text-[10px] tabular-nums px-1.5 py-0.5 rounded-full font-semibold"
                style={{
                  background: isActive
                    ? "rgba(74,122,229,0.15)"
                    : "rgba(136,153,170,0.08)",
                  color: isActive
                    ? "var(--primary)"
                    : "var(--text-secondary)",
                }}
              >
                {counts[g]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Agent Card                                                         */
/* ------------------------------------------------------------------ */

function AgentCard({ agent }: { agent: Agent }) {
  const color = statusColor[agent.status];
  const isActive = agent.status === "Active";

  return (
    <div
      className="rounded-xl p-5 transition-all duration-200 hover:translate-y-[-2px]"
      style={{
        background: "var(--color-dark-surface-elevated)",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Top row: status LED + name + group badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Status LED with sonar pulse */}
          <div className="relative flex items-center justify-center w-5 h-5">
            <Circle
              size={8}
              fill={color}
              stroke="none"
              className="relative z-10"
            />
            {isActive && (
              <span
                className="absolute inset-0 rounded-full sonar-ring"
                style={{
                  background: color,
                  opacity: 0.4,
                  width: 8,
                  height: 8,
                  top: "50%",
                  left: "50%",
                  marginTop: -4,
                  marginLeft: -4,
                }}
              />
            )}
          </div>
          <div>
            <h3
              className="text-sm font-bold leading-tight"
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              {agent.name}
            </h3>
            <span
              className="text-[10px] tabular-nums"
              style={{ color: "var(--text-secondary)" }}
            >
              {agent.version}
            </span>
          </div>
        </div>

        {/* Group badge */}
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: groupBg[agent.group],
            color: groupColor[agent.group],
          }}
        >
          {agent.group}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed mb-3"
        style={{ color: "var(--text-secondary)" }}
      >
        {agent.description}
      </p>

      {/* Status badge */}
      <div className="flex items-center gap-4 mb-4">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: statusBg[agent.status],
            color: statusColor[agent.status],
          }}
        >
          <StatusIcon status={agent.status} />
          {agent.status}
        </span>

        {/* Trigger */}
        <span
          className="inline-flex items-center gap-1 text-[10px]"
          style={{ color: "var(--text-secondary)" }}
        >
          <Clock size={10} />
          {agent.trigger}
        </span>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-2 p-2.5 rounded-lg mb-4"
        style={{ background: "rgba(15,25,35,0.5)" }}
      >
        <Stat label="Uptime" value={agent.uptime} />
        <Stat label="Success" value={agent.successRate} />
        <Stat label="Today" value={String(agent.actionsToday)} />
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {agent.tools.map((tool) => (
          <span
            key={tool}
            className="text-[10px] px-2 py-0.5 rounded-md font-medium"
            style={{
              background: "rgba(136,153,170,0.08)",
              color: "var(--text-secondary)",
              border: "1px solid rgba(36,52,71,0.6)",
            }}
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div
        className="flex items-center gap-2 pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {agent.status === "Active" ? (
          <ActionButton
            icon={<Pause size={12} />}
            label="Pause"
            color="var(--text-secondary)"
          />
        ) : (
          <ActionButton
            icon={<Play size={12} />}
            label="Deploy"
            color="var(--primary)"
          />
        )}
        <ActionButton
          icon={<RotateCcw size={12} />}
          label="Restart"
          color="var(--text-secondary)"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className="text-xs font-bold tabular-nums"
        style={{ color: "var(--text)" }}
      >
        {value}
      </div>
      <div
        className="text-[10px] mt-0.5"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <button
      className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-md transition-colors duration-150 cursor-pointer"
      style={{
        color,
        background: "rgba(136,153,170,0.06)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(136,153,170,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(136,153,170,0.06)";
      }}
    >
      {icon}
      {label}
    </button>
  );
}
