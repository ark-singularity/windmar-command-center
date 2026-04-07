"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, GitBranch, Bot, BarChart3 } from "lucide-react";

const tabs = [
  { label: "Ops Center", href: "/command-center/ops", icon: Map },
  { label: "Pipeline", href: "/command-center/pipeline", icon: GitBranch },
  { label: "Agents", href: "/command-center/agents", icon: Bot },
  { label: "KPIs", href: "/command-center/kpis", icon: BarChart3 },
];

const departments = [
  "Field Operations",
  "Sales",
  "Permitting",
  "Warehouse",
  "Finance",
  "HR",
];

export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-5 h-14 shrink-0"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left: Logo + Department selector + Tabs */}
        <div className="flex items-center gap-6 h-full">
          {/* Logo */}
          <div
            className="flex items-center gap-0.5 select-none"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span
              className="text-lg font-bold tracking-wider"
              style={{ color: "var(--text)" }}
            >
              WINDMAR
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--accent)" }}
            >
              .
            </span>
          </div>

          {/* Separator */}
          <div
            className="w-px h-6"
            style={{ background: "var(--border)" }}
          />

          {/* Department selector */}
          <select
            defaultValue="Field Operations"
            className="text-xs font-medium px-2.5 py-1.5 rounded cursor-pointer appearance-none pr-6 outline-none"
            style={{
              background: "var(--bg)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-inter)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%238899AA' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 6px center",
            }}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Separator */}
          <div
            className="w-px h-6"
            style={{ background: "var(--border)" }}
          />

          {/* Tab navigation */}
          <nav className="flex items-center gap-1 h-full">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.href);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="relative flex items-center gap-1.5 px-3 h-full text-xs font-medium transition-colors"
                  style={{
                    color: isActive
                      ? "var(--text)"
                      : "var(--text-secondary)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  <Icon
                    size={14}
                    style={{
                      color: isActive
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    }}
                  />
                  {tab.label}
                  {/* Active bottom border */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-t"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Status ribbon */}
        <div
          className="flex items-center gap-4 text-xs tabular-nums"
          style={{
            fontFamily: "var(--font-inter)",
            color: "var(--text-secondary)",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "var(--color-dark-success)" }}
            />
            <span className="font-medium" style={{ color: "var(--text)" }}>
              142
            </span>{" "}
            on track
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "var(--color-dark-warning)" }}
            />
            <span className="font-medium" style={{ color: "var(--text)" }}>
              23
            </span>{" "}
            at risk
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "var(--color-dark-danger)" }}
            />
            <span className="font-medium" style={{ color: "var(--text)" }}>
              8
            </span>{" "}
            overdue
          </span>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
