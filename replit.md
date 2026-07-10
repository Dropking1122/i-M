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
- `artifacts/revd-store/src/pages/Home.tsx` — page shell: mounts `CinematicBackground` (Aurora + fade overlay), Navbar, Hero, Projects, Products, Contact, Footer, BackToTop
- `artifacts/revd-store/src/sections/` — Hero, Projects, Products, Contact sections (edit content/copy here)
- `artifacts/revd-store/src/components/` — reusable UI + effects:
  - `Aurora.tsx` — real reactbits Aurora background (WebGL2 shader via `ogl`), props `colorStops`/`amplitude`/`blend`/`speed`; gracefully no-ops (static CSS gradient fallback) if WebGL2 isn't available or shader link fails
  - `TiltedCard.tsx` — reactbits-style 3D mouse-tilt + glare wrapper (framer-motion), wraps the Hero avatar
  - `BlurText.tsx` — per-word blur/opacity reveal (framer-motion), used for Hero description
  - `RotatingText.tsx` — cycles words in a pill/badge with cyan bg+border+glow (slide/blur transition), used for "I am a ___"
  - `SpotlightCard.tsx`, `MagneticButton.tsx`, `Navbar.tsx`, `Footer.tsx`, `BackToTop.tsx`, `ScrollProgressBar.tsx`, `TargetCursor.tsx`
- `artifacts/revd-store/src/index.css` — CSS vars (`--accent-cyan`/`--accent-blue`/`--accent-purple`), glass-card, gradient-text utilities, `.hero-name-shine` (animated shine+glow on the "Revaldi" name), `.shiny-text`

## Architecture decisions

- Presentation-first app — no backend, all data is static in React components (edit arrays like `TITLES`, `CONTACTS`, `PROJECTS`, `PRODUCTS` directly in the section files)
- Uses Framer Motion for all animations (scroll-triggered reveals, staggered cards, tilt/glare, rotating text)
- Dark mode is default; base color is `#050810`/`#0a0e1a` (deep navy), CSS var `--bg-primary`
- Icons from `react-icons` (FaInstagram, FaWhatsapp, etc.) — no Font Awesome CDN needed
- `framer-motion` `type: "spring" as const` required for TypeScript compatibility in variant objects
- No `.animated-grid` / `.noise-overlay` — removed per user request; don't re-add without asking

## Product

Single-page portfolio/storefront for Revaldi: Hero (avatar, rotating titles, CTAs), Projects showcase (POS, WA bot, QR attendance, telegram bot, router bot, free assets, REVDMAIL tempmail/gmail generator), Products grid (premium subscription reselling — CapCut, Canva, VIU, etc. — all WhatsApp checkout via `wa.me/6288214672165`), Contact cards (Instagram/WhatsApp/Telegram).

## User preferences

- Never change existing copy, logo, or images unless explicitly asked — only visual/effect/layout changes.
- Footer copyright format: two lines — "Made with ❤ by Revaldi" then "© {year} REVD STORE. All rights reserved".

## Gotchas

- `wa.me` links must be `wa.me/<countrycode+number>` with NO extra characters before the digits (a stray `r` prefix like `wa.me/r6288...` silently breaks the link — WhatsApp just fails to open).
- Aurora's shader is GLSL ES 3.00 (WebGL2-only) — code checks `renderer.isWebgl2` and try/catches `Program` creation; never remove this gating or it can crash on older GPUs/drivers.
- Do NOT gate the Aurora animation loop on `prefers-reduced-motion` — in this project's preview/embed environment that media query evaluates to reduced-motion=true even when it shouldn't, which froze the animation after one frame. If reduced-motion support is wanted again, throttle/soften the animation instead of canceling the RAF loop.
- Screenshot tool's headless browser reports "unable to create webgl context" — this is a sandbox limitation, not a real bug; Aurora's fallback path handles it. Don't chase this error further, verify Aurora behavior via code + a real browser instead.
- Always run `pnpm --filter @workspace/revd-store run typecheck` after touching frontend files, and restart the `artifacts/revd-store: web` workflow after installing new deps (e.g. `ogl`).
- VPS deploy command (git-based): `cd ~/i-M && git pull && pnpm install && PORT=22341 BASE_PATH=/ pnpm --filter @workspace/revd-store run build && sudo cp -r ~/i-M/artifacts/revd-store/dist/public/. /var/www/revd.dev/main/ && sudo chown -R www-data:www-data /var/www/revd.dev/main`

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
