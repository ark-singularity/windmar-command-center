"use client";

import { useState } from "react";
import {
  Columns3,
  TriangleIcon,
  Clock,
  Flame,
  Filter,
  Home,
  Bot,
  ChevronRight,
} from "lucide-react";

/* ── 14-stage pipeline definition ── */
const STAGES = [
  "VENTA",
  "DATA ENTRY",
  "FINANCIAMIENTO",
  "WELCOME CALL",
  "DISEÑO",
  "PERMISOS",
  "READY TO INSTALL",
  "AGENDA",
  "ALMACEN",
  "FLOTA",
  "INSTALACION",
  "POST INSTALL",
  "PERMISOS(2)",
  "FINANCIERA PAGA",
] as const;

type Stage = (typeof STAGES)[number];

/* ── Mock data helpers ── */
const NAMES = [
  "María García",
  "José Rivera",
  "Carmen López",
  "Luis Rodríguez",
  "Ana Torres",
  "Carlos Méndez",
  "Rosa Díaz",
  "Pedro Ortiz",
  "Isabel Cruz",
  "Miguel Santos",
  "Elena Vega",
  "Jorge Ramos",
  "Sofía Colón",
  "David Morales",
  "Luz Hernández",
  "Fernando Reyes",
  "Marta Figueroa",
  "Andrés Nieves",
  "Patricia Soto",
  "Rafael Delgado",
  "Laura Marrero",
  "Ernesto Acosta",
  "Diana Burgos",
  "Oscar Padilla",
  "Yolanda Mercado",
  "Enrique Rosario",
  "Gloria Meléndez",
  "Ramón Serrano",
  "Silvia Vargas",
  "Héctor Castillo",
  "Natalia Peña",
  "Alberto Fuentes",
  "Cristina Navarro",
  "Pablo Estrada",
  "Ivonne Quintero",
  "Francisco Pagán",
  "Wanda Maldonado",
  "Julio Feliciano",
  "Teresa Román",
  "Nicolás Cortés",
  "Yasmín Batista",
  "Alejandro Miranda",
];

const MUNICIPIOS = [
  "Bayamón",
  "San Juan",
  "Carolina",
  "Ponce",
  "Caguas",
  "Guaynabo",
  "Mayagüez",
  "Toa Baja",
  "Trujillo Alto",
  "Arecibo",
  "Humacao",
  "Dorado",
  "Vega Baja",
  "Aguadilla",
  "Manatí",
];

const AGENTS = [
  "Monitor IA",
  "Permitting Bot",
  "Finance Agent",
  "Scheduler IA",
  "Design Agent",
  "Welcome Bot",
  "Logistics IA",
  "Inspector Bot",
];

const LAST_ACTIONS = [
  "Verificó documentos del cliente",
  "Envió propuesta de financiamiento",
  "Completó revisión de diseño",
  "Programó llamada de bienvenida",
  "Solicitó permiso municipal",
  "Asignó brigada de instalación",
  "Verificó inventario de paneles",
  "Confirmó fecha de inspección",
  "Envió notificación al cliente",
  "Actualizó estado de permiso",
  "Revisó planos estructurales",
  "Coordinó entrega de materiales",
  "Validó crédito del cliente",
  "Generó orden de trabajo",
  "Confirmó pago financiero",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface CaseCard {
  id: string;
  name: string;
  municipio: string;
  daysInStage: number;
  sla: number;
  agent: string;
  agentActive: boolean;
  lastAction: string;
}

function generateMockData(): Record<Stage, CaseCard[]> {
  const rand = seededRandom(42);
  const data: Record<string, CaseCard[]> = {};
  let caseNum = 1001;

  for (const stage of STAGES) {
    const count = Math.floor(rand() * 3) + 2; // 2-4 cards per stage
    const cards: CaseCard[] = [];

    for (let i = 0; i < count; i++) {
      const sla = [3, 5, 7, 10, 14, 21][Math.floor(rand() * 6)];
      const daysInStage = Math.floor(rand() * (sla + 5)) + 1;

      cards.push({
        id: `WM-2024-${String(caseNum++).padStart(4, "0")}`,
        name: NAMES[Math.floor(rand() * NAMES.length)],
        municipio: MUNICIPIOS[Math.floor(rand() * MUNICIPIOS.length)],
        daysInStage,
        sla,
        agent: AGENTS[Math.floor(rand() * AGENTS.length)],
        agentActive: rand() > 0.25,
        lastAction: LAST_ACTIONS[Math.floor(rand() * LAST_ACTIONS.length)],
      });
    }

    data[stage] = cards;
  }

  return data as Record<Stage, CaseCard[]>;
}

const MOCK_DATA = generateMockData();

/* ── View mode type ── */
type ViewMode = "kanban" | "funnel" | "timeline" | "heatmap";

const VIEW_MODES: { key: ViewMode; label: string; icon: typeof Columns3 }[] = [
  { key: "kanban", label: "Kanban", icon: Columns3 },
  { key: "funnel", label: "Funnel", icon: TriangleIcon },
  { key: "timeline", label: "Timeline", icon: Clock },
  { key: "heatmap", label: "Heatmap", icon: Flame },
];

/* ── SLA color helpers ── */
function slaProgress(days: number, sla: number) {
  return Math.min((days / sla) * 100, 100);
}

function slaColor(pct: number): string {
  if (pct < 60) return "var(--color-dark-success)";
  if (pct < 80) return "var(--color-dark-warning)";
  return "var(--color-dark-danger)";
}

/* ── Components ── */

function PipelineCaseCard({ card }: { card: CaseCard }) {
  const pct = slaProgress(card.daysInStage, card.sla);
  const color = slaColor(pct);

  return (
    <div
      className="rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
      style={{
        background: "var(--color-dark-surface-elevated)",
        border: "1px solid var(--color-dark-border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Case ID */}
      <div className="flex items-center gap-2 mb-2">
        <Home
          size={13}
          style={{ color: "var(--accent)", flexShrink: 0 }}
        />
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: "var(--text)", fontFamily: "var(--font-inter)" }}
        >
          Case #{card.id}
        </span>
      </div>

      {/* Client + Municipio */}
      <div className="space-y-0.5 mb-3">
        <p
          className="text-[11px]"
          style={{ color: "var(--text-secondary)" }}
        >
          Cliente:{" "}
          <span style={{ color: "var(--text)" }}>{card.name}</span>
        </p>
        <p
          className="text-[11px]"
          style={{ color: "var(--text-secondary)" }}
        >
          Municipio:{" "}
          <span style={{ color: "var(--text)" }}>{card.municipio}</span>
        </p>
      </div>

      {/* Separator */}
      <div
        className="h-px mb-3"
        style={{ background: "var(--color-dark-border)" }}
      />

      {/* SLA Progress */}
      <div className="mb-1.5">
        <div
          className="flex items-center justify-between text-[10px] mb-1.5"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>
            Days in stage:{" "}
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {card.daysInStage}
            </span>{" "}
            / SLA:{" "}
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {card.sla}
            </span>
          </span>
          <span className="font-semibold" style={{ color }}>
            {Math.round(pct)}%
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(pct, 100)}%`,
              background: color,
              boxShadow: `0 0 6px ${color}`,
            }}
          />
        </div>
      </div>

      {/* Separator */}
      <div
        className="h-px my-3"
        style={{ background: "var(--color-dark-border)" }}
      />

      {/* Agent */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <Bot size={11} style={{ color: "var(--text-secondary)" }} />
        <span
          className="text-[10px] font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Agent:{" "}
          <span style={{ color: "var(--text)" }}>{card.agent}</span>
        </span>
        <span
          className="inline-block w-1.5 h-1.5 rounded-full ml-auto"
          style={{
            background: card.agentActive
              ? "var(--color-dark-success)"
              : "var(--text-secondary)",
          }}
        />
        <span
          className="text-[9px]"
          style={{
            color: card.agentActive
              ? "var(--color-dark-success)"
              : "var(--text-secondary)",
          }}
        >
          {card.agentActive ? "Active" : "Idle"}
        </span>
      </div>

      {/* Last action */}
      <p
        className="text-[10px] italic leading-snug line-clamp-2"
        style={{ color: "var(--text-secondary)" }}
      >
        Last action: &ldquo;{card.lastAction}&rdquo;
      </p>
    </div>
  );
}

function StageColumn({ stage, cards }: { stage: Stage; cards: CaseCard[] }) {
  const overdue = cards.filter(
    (c) => slaProgress(c.daysInStage, c.sla) >= 80
  ).length;

  return (
    <div
      className="flex flex-col shrink-0 rounded-xl overflow-hidden"
      style={{
        width: 260,
        background: "var(--surface)",
        border: "1px solid var(--color-dark-border)",
      }}
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 shrink-0"
        style={{ borderBottom: "1px solid var(--color-dark-border)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ChevronRight size={12} style={{ color: "var(--accent)" }} />
          <span
            className="text-[11px] font-bold tracking-wider truncate"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            {stage}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(248,155,36,0.15)",
              color: "var(--accent)",
            }}
          >
            {cards.length}
          </span>
          {overdue > 0 && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{
                background: "rgba(239,68,68,0.15)",
                color: "var(--color-dark-danger)",
              }}
            >
              {overdue}!
            </span>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5 p-2.5 overflow-y-auto flex-1">
        {cards.map((card) => (
          <PipelineCaseCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function PipelinePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");

  const totalCases = Object.values(MOCK_DATA).reduce(
    (sum, cards) => sum + cards.length,
    0
  );

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header: view toggles + filters */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--color-dark-border)" }}
      >
        {/* Left: view toggles */}
        <div className="flex items-center gap-2">
          {VIEW_MODES.map((vm) => {
            const isActive = vm.key === viewMode;
            const Icon = vm.icon;
            return (
              <button
                key={vm.key}
                onClick={() => setViewMode(vm.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-150 cursor-pointer"
                style={{
                  background: isActive
                    ? "rgba(248,155,36,0.15)"
                    : "transparent",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  border: isActive
                    ? "1px solid rgba(248,155,36,0.3)"
                    : "1px solid transparent",
                  fontFamily: "var(--font-inter)",
                }}
              >
                <Icon size={13} />
                {vm.label}
              </button>
            );
          })}

          {/* Separator */}
          <div
            className="w-px h-5 mx-2"
            style={{ background: "var(--color-dark-border)" }}
          />

          {/* Total */}
          <span
            className="text-[11px] tabular-nums"
            style={{ color: "var(--text-secondary)" }}
          >
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {totalCases}
            </span>{" "}
            cases across {STAGES.length} stages
          </span>
        </div>

        {/* Right: filter pills */}
        <div className="flex items-center gap-2">
          {["All Municipalities", "All Brigades", "SLA: All"].map((pill) => (
            <button
              key={pill}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium cursor-pointer transition-colors"
              style={{
                background: "var(--color-dark-surface-elevated)",
                color: "var(--text-secondary)",
                border: "1px solid var(--color-dark-border)",
                fontFamily: "var(--font-inter)",
              }}
            >
              <Filter size={10} />
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Main kanban area */}
      {viewMode === "kanban" ? (
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex gap-3 h-full">
            {STAGES.map((stage) => (
              <StageColumn
                key={stage}
                stage={stage}
                cards={MOCK_DATA[stage]}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Placeholder for other views */
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background: "var(--color-dark-surface-elevated)",
                border: "1px solid var(--color-dark-border)",
              }}
            >
              {(() => {
                const Icon =
                  VIEW_MODES.find((v) => v.key === viewMode)?.icon || Columns3;
                return (
                  <Icon size={28} style={{ color: "var(--text-secondary)" }} />
                );
              })()}
            </div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "var(--text)" }}
            >
              {VIEW_MODES.find((v) => v.key === viewMode)?.label} View
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Coming soon — currently showing Kanban
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
