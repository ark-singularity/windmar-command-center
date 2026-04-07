# PRD: WindMar Command Center

> **Codename:** Gotham Field Ops
> **Version:** 1.0
> **Date:** 2026-04-07
> **Author:** Ark / HomieAI
> **Client:** WindMar Home — Field Operations (Nelson, VP)
> **Status:** Draft

---

## 1. Vision

A **Palantir Gotham-inspired operational command center** for WindMar Home that replaces scattered spreadsheets, shadow systems, and Zoho tabs with a single, sleek, map-first interface. AI agents live on the map as first-class entities — deployable, observable, and traceable — turning WindMar's 14-stage solar installation pipeline into a real-time, self-healing operation.

**One sentence:** A dark-mode, map-first ops dashboard where AI agents monitor, route, and escalate WindMar's field operations across Puerto Rico in real time.

---

## 2. Background

### 2.1 Diagnostic (Ark Executive Briefing — 213 Embark Interviews)

- **25 operational blockers** identified across 14 pipeline stages
- **5 single points of failure (SPOFs):** scheduling, permitting, post-install, data entry, warehouse
- **Shadow systems everywhere:** WhatsApp groups, personal spreadsheets, verbal handoffs
- **Data gaps:** Zoho fields incomplete, no real-time visibility, no SLA enforcement
- **Proposed:** 4 agents + 4 interfaces + hybrid Zoho strategy

### 2.2 Client Vision (Transformacion Digital — Nelson's Team)

- **3 phases:** Platform (80% done) → AI Agents → Optimization Solver
- **Phase 1:** Agenda Combinada, Monitor IA, Mapa PR, Clima, Brigade App, KPIs
- **Phase 2:** 4 agents (Monitor, Reasignacion, Clima, Post-Trabajo)
- **Phase 3:** OR-Tools/Gurobi optimization solver
- **Missing 20%:** Zoho webhooks backend, SSO, Weather API, push notifications

### 2.3 Unified Architecture (This PRD)

This PRD merges both proposals into a single product that:
1. Delivers what the client asked for (their Phase 1-2)
2. Adds the 5 missing UIs identified through systems thinking
3. Wraps everything in a Palantir-grade interface that scales to all departments

---

## 3. Product Architecture

### 3.1 App Structure

```
/command-center
├── layout.tsx              ← Department selector + global nav
├── page.tsx                ← Redirect to /ops
├── /ops                    ← Tab 1: Ops Center (map)
├── /pipeline               ← Tab 2: Pipeline view
├── /agents                 ← Tab 3: Agent registry
└── /kpis                   ← Tab 4: KPI dashboards
```

### 3.2 Four Tabs

| Tab | Purpose | Palantir Analogy |
|-----|---------|-----------------|
| **Ops Center** | Full-screen map of PR with brigades, cases, agents, weather layers | Gotham Map View |
| **Pipeline** | 14-stage kanban/funnel with case cards, SLA timers, bottleneck heatmap | Gotham Object Explorer |
| **Agents** | Agent registry — cards, versions, performance, deploy/pause controls | Gotham Ontology Manager |
| **KPIs** | Real-time metrics, trends, SLA compliance, department scorecards | Gotham Dashboard |

### 3.3 Multi-Department Architecture

A **department dropdown** at the top-left changes:
- Map layers (different brigade types, coverage zones)
- Pipeline stages (each department has its own funnel)
- Visible agents (only agents assigned to that department)
- KPI panels (department-specific metrics)

**Launch department:** Field Operations (Nelson)
**Future departments:** Sales, Permitting, Warehouse, Finance, HR

---

## 4. Design System

### 4.1 Brand Colors — Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--wm-primary` | `#1D429B` | Headers, nav, primary buttons, trust/authority |
| `--wm-primary-dark` | `#21366B` | Hover states, active states, deeper accents |
| `--wm-primary-light` | `#A6C3E6` | Card borders, section dividers, light backgrounds |
| `--wm-accent` | `#F89B24` | CTAs, alerts, highlights, agent activity rings |
| `--wm-surface` | `#FFFFFF` | Card backgrounds, content areas |
| `--wm-surface-alt` | `#F5F7FA` | Page background, alternating rows |
| `--wm-text` | `#1A1A1A` | Primary text |
| `--wm-text-secondary` | `#666666` | Secondary text, labels, metadata |
| `--wm-border` | `#E2E8F0` | Card borders, dividers |
| `--wm-success` | `#16A34A` | Completed, on-track, healthy |
| `--wm-warning` | `#F89B24` | At risk, approaching SLA (shares accent) |
| `--wm-danger` | `#DC2626` | Overdue, failed, critical alerts |
| `--wm-info` | `#3B82F6` | Informational, in-progress |

### 4.2 Brand Colors — Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--wm-primary` | `#4A7AE5` | Lighter blue for readability on dark backgrounds |
| `--wm-primary-dark` | `#1D429B` | Accent borders, deep elements |
| `--wm-primary-light` | `#1E3A5F` | Subtle card highlights |
| `--wm-accent` | `#F89B24` | Same orange — pops on dark (unchanged) |
| `--wm-surface` | `#0F1923` | Card backgrounds (Gotham dark) |
| `--wm-surface-alt` | `#141F2B` | Page background |
| `--wm-surface-elevated` | `#1A2736` | Elevated cards, modals, popovers |
| `--wm-text` | `#E8EDF3` | Primary text |
| `--wm-text-secondary` | `#8899AA` | Secondary text, labels |
| `--wm-border` | `#243447` | Card borders, dividers |
| `--wm-success` | `#22C55E` | Brighter green for dark mode |
| `--wm-warning` | `#FBBF24` | Slightly lighter amber |
| `--wm-danger` | `#EF4444` | Brighter red for dark mode |
| `--wm-info` | `#60A5FA` | Brighter blue for dark mode |
| `--wm-glow` | `rgba(74,122,229,0.15)` | Sonar/pulse glow around active agents |

### 4.3 Typography

Already installed in the project:

| Role | Font | Weight | Variable |
|------|------|--------|----------|
| Headings | **Outfit** | 600-700 | `--font-outfit` |
| Body | **Inter** | 300-500 | `--font-inter` |
| Data/KPIs | **Inter Tabular** | 500 | `font-variant-numeric: tabular-nums` |
| Monospace (codes, IDs) | `SF Mono, Menlo, monospace` | 400 | — |

### 4.4 Component Tokens

```css
/* Cards */
--card-radius: 12px;
--card-padding: 24px;
--card-shadow-light: 0 2px 8px rgba(0,0,0,0.08);
--card-shadow-dark: 0 2px 12px rgba(0,0,0,0.3);

/* Buttons */
--btn-radius: 8px;
--btn-radius-pill: 24px;  /* for primary CTAs */

/* Map overlay panels */
--panel-backdrop: blur(12px);
--panel-bg-dark: rgba(15,25,35,0.85);
--panel-bg-light: rgba(255,255,255,0.92);

/* Agent rings (sonar effect on map) */
--ring-active: var(--wm-accent);
--ring-idle: var(--wm-primary-light);
--ring-error: var(--wm-danger);
```

### 4.5 Palantir-Inspired UI Patterns

| Pattern | Implementation |
|---------|---------------|
| **Split-panel layout** | Map on right (70%), detail panel slides in from left (30%) |
| **Agent cards** | Dark glass cards with status ring, version badge, uptime, tools list |
| **Deploy & Task** | Right-click brigade on map → context menu → "Assign Agent Task" |
| **Sonar rings** | Pulsing circles around active brigades showing transit isochrones |
| **Tasking orders** | Geolocalized checklists that agents auto-populate per case |
| **Status ribbons** | Thin top-bar showing global health: cases on track / at risk / overdue |
| **Floating KPIs** | Semi-transparent metric chips overlaying the map corners |

---

## 5. Tab Specifications

### 5.1 Ops Center (Map)

**Full-screen Mapbox GL map** centered on Puerto Rico with the following layers:

| Layer | Source | Visual |
|-------|--------|--------|
| **Brigades** | GeoTap API (real-time GPS) | Truck icons with status color + sonar ring |
| **Cases** | Zoho CRM → Supabase sync | Dots colored by pipeline stage |
| **Agents** | Internal agent registry | Floating badges near their assigned zones |
| **Weather** | Weather API overlay | Rain/wind risk zones with opacity |
| **Zones** | Static GeoJSON | Municipality boundaries, franchise areas |

**Left Panel (slides in on click):**
- Brigade detail: driver, truck, current task, today's agenda, agent assignments
- Case detail: full pipeline history, documents, SLA countdown, agent actions taken
- Agent detail: version, last run, success rate, recent decisions, logs

**Top Bar:**
- Department selector dropdown
- Search bar (cases, employees, brigades by ID/name)
- Global status ribbon: `🟢 142 on track | 🟡 23 at risk | 🔴 8 overdue`

**Bottom Tray:**
- Weather alert banner (when active)
- Agent activity feed (last 10 actions across all agents)

### 5.2 Pipeline

**14-stage horizontal pipeline** for Field Operations:

```
VENTA → DATA ENTRY → FINANCIAMIENTO → WELCOME CALL → DISEÑO →
PERMISOS → READY TO INSTALL → AGENDA → ALMACEN → FLOTA →
INSTALACION → POST INSTALL → PERMISOS(2) → FINANCIERA PAGA
```

**Views:**
- **Kanban**: Cards per case, draggable, SLA color coding
- **Funnel**: Counts per stage with conversion rates
- **Timeline**: Gantt-style view of case lifecycle
- **Bottleneck Heatmap**: Which stages have the most overdue cases

**Case Card (Kanban):**
```
┌─────────────────────────────┐
│ 🏠 Case #WM-2024-1847       │
│ Cliente: García Rodríguez   │
│ Municipio: Bayamón          │
│ ──────────────────────────  │
│ Stage: AGENDA               │
│ Days in stage: 3 / SLA: 5  │
│ ██████████░░░  60%          │
│ ──────────────────────────  │
│ Agent: Monitor IA 🟢 Active │
│ Last action: "Rescheduled   │
│ due to weather forecast"    │
└─────────────────────────────┘
```

### 5.3 Agents

**Agent Registry** — grid of agent cards with:

| Field | Description |
|-------|-------------|
| Name | Agent display name |
| Group | Scheduling / Pipeline / Operations |
| Version | Semantic version (e.g., v1.2.0) |
| Status | Active / Paused / Error / Deploying |
| Uptime | Since last restart |
| Success Rate | Last 7d / 30d |
| Actions Today | Count of decisions made |
| Tools | List of integrations (Zoho, GeoTap, Weather, etc.) |
| Channel | Where it reports (Slack, dashboard, both) |
| Deploy Button | Start/stop/restart controls |

**9 Agents (3 Groups):**

#### Group 1: Scheduling (Nelson — Field Ops)

| Agent | Purpose | Tools | Trigger |
|-------|---------|-------|---------|
| **Monitor IA** | Watches today's agenda, flags delays, suggests re-routes | Zoho, GeoTap, Calendar | Every 15 min |
| **Reasignacion** | Reassigns brigades when delays cascade | Zoho, GeoTap, Brigade DB | On delay event |
| **Clima** | Checks weather forecasts, pre-cancels/reschedules outdoor work | Weather API, Zoho | 6am daily + before each job |
| **Post-Trabajo** | Verifies post-install checklist completion, flags gaps | Zoho, Document store | On job completion |

#### Group 2: Pipeline

| Agent | Purpose | Tools | Trigger |
|-------|---------|-------|---------|
| **Readiness Qualifier** | Validates a case has all requirements before advancing to next stage | Zoho, Document store, Rules engine | On stage transition |
| **Post-Install Tracker** | Tracks post-install permitting and interconnection to utility | Zoho, LUMA API (future), Calendar | Daily scan |

#### Group 3: Operations

| Agent | Purpose | Tools | Trigger |
|-------|---------|-------|---------|
| **Material Match** | Matches warehouse inventory to upcoming installation BOM | Zoho Inventory, Design specs | On READY TO INSTALL |
| **Escalation Hub** | Routes stuck cases to the right person based on blocker type | Zoho, Slack, Rules engine | On SLA breach |
| **Handoff Tracker** | Monitors stage-to-stage handoffs, flags incomplete transitions | Zoho, Pipeline rules | On stage change |

### 5.4 KPIs

**Department Scorecard** with the following panels:

| KPI | Metric | Target |
|-----|--------|--------|
| Pipeline Velocity | Avg days from VENTA → FINANCIERA PAGA | < 90 days |
| Stage Dwell Time | Avg days per stage (heatmap) | Per-stage SLA |
| SLA Compliance | % cases within SLA per stage | > 85% |
| Brigade Utilization | Jobs completed / jobs scheduled | > 90% |
| First-Time Completion | % installs completed on first visit | > 80% |
| Agent ROI | Hours saved by agent automation | Trending up |
| Bottleneck Index | Stage with highest avg dwell time | Decreasing |
| Rework Rate | % cases that return to a previous stage | < 5% |

**Chart Types:**
- Sparklines in the status ribbon
- Area charts for trends (30d rolling)
- Bar charts for stage comparisons
- Heatmap for municipality performance
- Gauge charts for SLA compliance

---

## 6. Data Architecture

### 6.1 Hybrid Zoho Strategy

```
┌──────────┐     webhook/poll     ┌──────────────┐     clean     ┌──────────┐
│  Zoho    │ ──────────────────→ │  Supabase    │ ──────────→  │  Agents  │
│  CRM     │                     │  (clean DB)  │              │  (AI)    │
│          │ ←────────────────── │              │ ←────────── │          │
└──────────┘     write-back API   └──────────────┘   decisions  └──────────┘
```

**Read Layer:** Zoho webhooks + scheduled polling → normalize into Supabase tables
**Agent Layer:** Agents read from clean Supabase data, never directly from Zoho
**Write Layer:** Agent decisions write back to Zoho via REST API

### 6.2 Key Supabase Tables (New)

```sql
-- Command center core
wm_cases              -- Normalized pipeline cases from Zoho
wm_case_stages        -- Stage transition log with timestamps
wm_brigades           -- Brigade info + current GPS from GeoTap
wm_brigade_assignments -- Brigade ↔ case assignments
wm_agent_registry     -- Agent definitions, versions, status
wm_agent_runs         -- Agent execution log (run_id, input, output, duration)
wm_agent_decisions    -- Decisions made by agents (human-reviewable)
wm_sla_definitions    -- SLA rules per stage
wm_escalations        -- Escalation events from agents
wm_weather_cache      -- Cached weather forecasts by municipality
```

### 6.3 External Integrations

| System | Protocol | Purpose | Priority |
|--------|----------|---------|----------|
| **Zoho CRM** | REST API + Webhooks | Case data, pipeline, contacts | P0 |
| **GeoTap** | REST API (polling) | Real-time brigade GPS | P0 |
| **Weather API** | REST (weather.gov or similar) | Forecasts for scheduling | P1 |
| **Mapbox** | SDK (already installed) | Map rendering, geocoding | P0 |
| **Supabase** | SDK (already installed) | Database, auth, real-time | P0 |
| **Slack** | Webhook / API | Agent notifications, escalations | P1 |
| **Zoho Inventory** | REST API | Material/BOM matching | P2 |
| **LUMA (utility)** | TBD (manual or API) | Interconnection status | P3 |

---

## 7. SDK & Dependencies

### 7.1 Already Installed (No Action)

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | App framework |
| `react` / `react-dom` | 19.2.4 | UI library |
| `tailwindcss` | 4.1.4 | Styling |
| `mapbox-gl` | 3.19.0 | Map rendering |
| `react-map-gl` | 8.1.0 | React wrapper for Mapbox |
| `@xyflow/react` | 12.10.2 | Flow diagrams (agent pipelines) |
| `@supabase/supabase-js` | 2.98.0 | Database client |
| `ai` | 6.0.137 | Vercel AI SDK |
| `lucide-react` | 0.575.0 | Icons |
| `date-fns` | 4.1.0 | Date utilities |
| `recharts` | 2.15.3 | Charts |
| `zod` | 3.25.11 | Schema validation |

### 7.2 New Dependencies to Install

```bash
# Map & Geo
npm install @turf/turf                  # Geospatial analysis (isochrones, buffers, distance)
npm install @mapbox/mapbox-gl-geocoder  # Search-on-map (find cases/brigades by address)

# Real-time & Data
npm install @supabase/realtime-js       # Real-time subscriptions for live map updates

# Animation & Interaction
npm install framer-motion               # Panel transitions, agent ring pulses, card animations
npm install @dnd-kit/core @dnd-kit/sortable  # Drag-and-drop for pipeline kanban

# Agent Infrastructure
npm install @anthropic-ai/sdk           # Claude API for agent reasoning
npm install inngest                     # Durable agent execution (cron, retries, fan-out)

# Data Visualization
npm install @nivo/heatmap @nivo/waffle  # Heatmaps (bottleneck view), waffle charts (utilization)

# Utilities
npm install ky                          # HTTP client for external API calls (Zoho, GeoTap, Weather)
npm install cron-parser                 # Parse agent cron schedules for display
```

### 7.3 Dev Dependencies

```bash
npm install -D @types/mapbox-gl         # Already may exist — verify
```

### 7.4 Environment Variables (New)

```env
# Zoho CRM Integration
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_REFRESH_TOKEN=
ZOHO_API_DOMAIN=https://www.zohoapis.com

# GeoTap
GEOTAP_API_KEY=
GEOTAP_API_URL=

# Weather
WEATHER_API_KEY=
WEATHER_API_URL=

# Mapbox (may already exist)
NEXT_PUBLIC_MAPBOX_TOKEN=

# Inngest (agent execution)
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Anthropic (agent reasoning)
ANTHROPIC_API_KEY=
```

---

## 8. CSS Implementation

### 8.1 Update `globals.css`

Replace the current green-based palette with WindMar tokens:

```css
@theme inline {
  /* WindMar Light Mode */
  --color-wm-primary: #1D429B;
  --color-wm-primary-dark: #21366B;
  --color-wm-primary-light: #A6C3E6;
  --color-wm-accent: #F89B24;
  --color-wm-surface: #FFFFFF;
  --color-wm-surface-alt: #F5F7FA;
  --color-wm-text: #1A1A1A;
  --color-wm-text-secondary: #666666;
  --color-wm-border: #E2E8F0;
  --color-wm-success: #16A34A;
  --color-wm-warning: #F89B24;
  --color-wm-danger: #DC2626;
  --color-wm-info: #3B82F6;

  /* Dark mode overrides */
  --color-dark-bg: #0F1923;
  --color-dark-surface: #141F2B;
  --color-dark-surface-elevated: #1A2736;
  --color-dark-text: #E8EDF3;
  --color-dark-text-secondary: #8899AA;
  --color-dark-border: #243447;
  --color-dark-glow: rgba(74,122,229,0.15);
}
```

---

## 9. Interaction Patterns

### 9.1 Map Interactions

| Action | Result |
|--------|--------|
| Click brigade marker | Left panel slides in with brigade detail |
| Click case dot | Left panel shows case detail with pipeline history |
| Right-click brigade | Context menu: "Assign Task", "View Route", "Contact Driver" |
| Hover agent badge | Tooltip: name, status, last action, success rate |
| Scroll zoom | Cluster → individual markers at zoom level 12+ |
| Toggle layer buttons | Show/hide: brigades, cases, weather, zones |

### 9.2 Agent Interactions

| Action | Result |
|--------|--------|
| Click agent card | Expand to full detail: config, logs, decisions history |
| "Deploy" button | Starts agent cron/listener — status ring turns green |
| "Pause" button | Suspends agent — ring turns gray |
| "View Decisions" | Table of recent decisions with reasoning, timestamps, outcomes |
| Filter by group | Show only Scheduling / Pipeline / Operations agents |

### 9.3 Pipeline Interactions

| Action | Result |
|--------|--------|
| Drag case card | Move to next stage (with validation — Readiness Qualifier checks) |
| Click stage header | Expand stage detail: avg dwell time, SLA, count, bottleneck score |
| Click case card | Slide-in panel with full case history |
| Filter bar | By municipality, brigade, SLA status, date range |
| Toggle view | Switch between Kanban / Funnel / Timeline / Heatmap |

---

## 10. Implementation Phases

### Phase 1: Foundation (Weeks 1-3)

- [ ] Create `/command-center` route group with layout + 4 tab pages
- [ ] Implement WindMar design tokens in `globals.css` (light + dark mode)
- [ ] Build map view with Mapbox GL (static layers: municipalities, zones)
- [ ] Set up Supabase tables for cases, brigades, agent registry
- [ ] Build department selector dropdown component
- [ ] Implement left slide-in panel component
- [ ] Build top status ribbon component

### Phase 2: Data Integration (Weeks 3-5)

- [ ] Zoho CRM webhook receiver → normalize into `wm_cases`
- [ ] GeoTap polling service → update `wm_brigades` GPS
- [ ] Weather API caching service → `wm_weather_cache`
- [ ] Real-time subscriptions for map markers (Supabase Realtime)
- [ ] Case search by ID, name, municipality

### Phase 3: Pipeline (Weeks 5-7)

- [ ] 14-stage pipeline kanban view
- [ ] Case cards with SLA timers
- [ ] Stage transition validation
- [ ] Funnel view with conversion rates
- [ ] Bottleneck heatmap

### Phase 4: Agents (Weeks 7-10)

- [ ] Inngest setup for durable agent execution
- [ ] Agent #1: Monitor IA (schedule watcher)
- [ ] Agent #2: Clima (weather pre-check)
- [ ] Agent #3: Readiness Qualifier (stage gate)
- [ ] Agent registry UI with deploy/pause
- [ ] Agent decision log viewer
- [ ] Remaining 6 agents

### Phase 5: KPIs & Polish (Weeks 10-12)

- [ ] KPI dashboard with Recharts + Nivo
- [ ] Pipeline velocity trends
- [ ] SLA compliance gauges
- [ ] Brigade utilization heatmap
- [ ] Agent ROI metrics
- [ ] Mobile responsive pass
- [ ] Performance optimization

---

## 11. Success Metrics

| Metric | Baseline (Current) | Target (6 months) |
|--------|--------------------|--------------------|
| Avg case cycle time (VENTA → PAGA) | ~120 days (estimated) | < 90 days |
| Cases stuck > SLA per stage | Unknown (no tracking) | < 15% |
| Brigade idle time | Unknown | < 20% of scheduled hours |
| Weather-related rework | ~15% of installs | < 5% |
| Manual scheduling interventions/day | ~30+ (estimated) | < 10 |
| Agent-automated decisions/day | 0 | 200+ |

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Zoho API rate limits | Data sync delays | Batch operations, webhook-first, cache aggressively |
| GeoTap GPS gaps | Stale map positions | Fallback to last-known, fade markers after 15 min |
| Agent false positives | Wrong reassignments | Human-in-the-loop: agents suggest, humans approve (Phase 4) |
| Weather API downtime | Missed weather alerts | Cache 48h forecasts, fallback to NWS public API |
| Zoho data quality | Agent reasoning on bad data | Clean/normalize layer in Supabase, validation rules |
| Multi-department scope creep | Delayed delivery | Ship Field Ops first, department abstraction built-in but not populated |

---

## 13. Out of Scope (v1)

- Optimization solver (OR-Tools/Gurobi) — Phase 3 of client roadmap
- Brigade mobile app (client's separate initiative)
- SSO integration (client's IT handles separately)
- Customer-facing portal
- Financial reporting beyond pipeline KPIs
- Inventory management (beyond BOM matching agent)

---

## 14. Appendix: Design References

**Palantir Gotham patterns to emulate:**
- Dark glass panels with backdrop blur over map
- Sonar rings = pulsing `border-radius: 50%` with `animation: pulse 2s infinite`
- Split-panel = `grid-template-columns: minmax(320px, 30%) 1fr`
- Status ribbons = fixed `top-0` bar with colored segments
- Agent cards = frosted glass (`backdrop-filter: blur(12px)`) with status LED
- Context menus = right-click with Radix UI or similar

**WindMar adaptations:**
- Ships → Brigades (truck icons with driver initials)
- Sonar coverage → Transit isochrones (how far can a brigade reach in 30 min)
- Tasking orders → Agent execution checklists per case
- Intelligence feeds → Agent decision logs with reasoning chains

---

*This PRD synthesizes the Ark Executive Briefing (213 Embark interviews), the WindMar Transformacion Digital proposal, and Palantir Gotham UI patterns into a unified product specification for the WindMar Command Center.*
