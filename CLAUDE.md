# WindMar Command Center

A Palantir Gotham-inspired operational command center for WindMar Home field operations. Map-first, dark-mode-first interface where AI agents monitor, route, and escalate WindMar's 14-stage solar installation pipeline across Puerto Rico in real time.

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, dark mode first
- **Maps:** Mapbox GL + react-map-gl, @turf/turf for geospatial analysis
- **Database:** Supabase (supabase-js + realtime-js)
- **Charts:** Recharts, @nivo/heatmap, @nivo/waffle
- **Agents:** Inngest (durable execution), Anthropic SDK (reasoning)
- **Animation:** Framer Motion
- **Drag & Drop:** @dnd-kit/core + @dnd-kit/sortable
- **HTTP Client:** ky
- **Icons:** lucide-react
- **Validation:** Zod
- **Fonts:** Outfit (headings), Inter (body)

## Directory Structure

```
src/
  app/
    layout.tsx              -- Root layout (fonts, global providers)
    page.tsx                -- Landing redirect
    globals.css             -- Tailwind + WindMar design tokens
    command-center/
      layout.tsx            -- Department selector + global nav
      page.tsx              -- Redirect to /ops
      ops/                  -- Tab 1: Ops Center (full-screen map)
      pipeline/             -- Tab 2: 14-stage pipeline kanban/funnel
      agents/               -- Tab 3: Agent registry & controls
      kpis/                 -- Tab 4: KPI dashboards
docs/
  prd-windmar-command-center.md   -- Full product requirements
```

## Design System

### Brand Colors

WindMar uses a dual-mode color system. Dark mode is the primary/default experience.

**Dark mode (default):**
- Surface: `#0F1923` (cards), `#141F2B` (page bg), `#1A2736` (elevated)
- Primary: `#4A7AE5`, Accent: `#F89B24`
- Text: `#E8EDF3` (primary), `#8899AA` (secondary)
- Border: `#243447`

**Light mode:**
- Surface: `#FFFFFF` (cards), `#F5F7FA` (page bg)
- Primary: `#1D429B`, Accent: `#F89B24`
- Text: `#1A1A1A` (primary), `#666666` (secondary)
- Border: `#E2E8F0`

**Status colors:** success (green), warning (orange/amber), danger (red), info (blue)

### Typography

- **Headings:** Outfit, weight 600-700
- **Body:** Inter, weight 300-500
- **Data/KPIs:** Inter with `font-variant-numeric: tabular-nums`

### UI Patterns (Palantir-inspired)

- Split-panel layout: map 70% right, detail panel 30% left
- Frosted glass cards: `backdrop-filter: blur(12px)`
- Sonar rings: pulsing circles around active brigades
- Status ribbon: fixed top bar with global health metrics
- Floating KPIs: semi-transparent chips overlaying map corners

## Key Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
```

## External Integrations

- **Zoho CRM:** Case data, pipeline, contacts (REST API + webhooks)
- **GeoTap:** Real-time brigade GPS (REST polling)
- **Weather API:** Forecasts for scheduling decisions
- **Mapbox:** Map rendering and geocoding
- **Supabase:** Database, auth, real-time subscriptions
- **Inngest:** Durable agent execution (cron, retries, fan-out)
- **Anthropic:** Claude API for agent reasoning
