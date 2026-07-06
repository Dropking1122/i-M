# REVD STORE

A premium portfolio and digital product storefront for Revaldi — showcasing custom software projects and selling digital products like Canva Pro, CapCut, VPN, and more.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/revd-store/` — React + Vite frontend (the main storefront)
- `artifacts/revd-store/src/sections/` — Hero, Projects, Products, Contact sections
- `artifacts/revd-store/src/components/` — Navbar, Footer, BottomNav, BackToTop
- `artifacts/revd-store/src/index.css` — global CSS variables, glass-card, gradient-text utilities

## Architecture decisions

- Presentation-first app — no backend, all data is static in React components
- Uses Framer Motion for all animations (scroll-triggered reveals, staggered cards, orb blobs, spin ring)
- Dark mode is default; base color is `#0a0e1a` (deep navy), defined as CSS var `--bg-primary`
- Icons from `react-icons` (FaInstagram, FaWhatsapp, etc.) — no Font Awesome CDN needed
- `framer-motion` `type: "spring" as const` required for TypeScript compatibility in variant objects

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
