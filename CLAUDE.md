# 🟣 {{NOMBRE_PROYECTO}} — Contexto para Claude Code

> **TEMPLATE BASE de Medusssa Studio.** Al iniciar un proyecto de cliente:
> 1. Reemplazar `{{NOMBRE_PROYECTO}}` y `{{CLIENTE}}` en este archivo
> 2. Personalizar branding: `apps/web/tailwind.config.ts` + `apps/web/src/lib/fonts.ts` + `globals.css` (tokens)
> 3. Llenar `docs/MASTER.md` con el alcance acordado
> 4. Configurar `.env` desde `apps/web/.env.example`

---

## 🔒 REGLAS INMUTABLES (leer ANTES de cualquier otra cosa)

1. **Visualizador canónico ÚNICO** en cualquier máquina:

   ```bash
   pnpm dev          # desde la raíz → abrir http://localhost:3000
   ```

   **NUNCA** abrir `design/exports/*.html` con `file:///` como visualizador.
   **NUNCA** usar Live Server, http-server, serve, o cualquier otro preview.

2. **Preflight obligatorio** al iniciar sesión:

   ```bash
   git fetch --all && git status && git pull --rebase origin main && git log --oneline -5
   ```

3. **Push obligatorio** al cerrar sesión (aunque sea WIP).

4. **Nunca editar `main` directo.** Siempre rama: `design/*`, `content/*`, `fix/*`.

5. **División de herramientas:** Claude Design genera secciones → Claude Code pule detalles. No al revés.

6. **Exports versionados:** `design/exports/<seccion>-v<n>.html`, nunca sobreescribir.

7. **Scroll-reveal SIEMPRE con `<AnimatedSection>` de `@medusssa/ui`** (IntersectionObserver + CSS). NUNCA Framer Motion para scroll-reveal (solo micro-interacciones hover).

8. **NUNCA `overflow: clip` en globals.css** — el autoprefixer no lo reconoce y rompe toda la compilación CSS. Usar `overflow: hidden` + padding.

---

## 📌 Protocolo de sesión

### Al iniciar

1. Preflight de git (regla 2).
2. Lee este archivo, `docs/MASTER.md`, `docs/BITACORA.md` y `docs/SPRINT_ACTUAL.md`.
3. Saluda con resumen en 3 líneas: último avance, próximo paso, bloqueos.

### Durante

1. Una task a la vez. Propón plan antes de escribir código; espera OK.
2. Al terminar: `pnpm lint` y `pnpm type-check`.
3. Commits atómicos: `feat(scope): ...` · `fix(scope): ...` · `chore: ...`.

### Al cerrar

Actualiza `docs/BITACORA.md` (entrada nueva arriba): fecha, tasks cerradas, commits, decisiones, bloqueos, próximo paso. Commit + push.

---

## 🧱 Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 14 (App Router, Server Components) |
| Lenguaje | TypeScript estricto |
| Estilos | Tailwind CSS — SOLO tokens semánticos (`primary`, `brand-*`, `font-display`/`font-sans`) |
| Animación | `<AnimatedSection>` (IntersectionObserver+CSS) · Framer Motion solo hover |
| Smooth scroll | Lenis |
| Forms | React Hook Form + Zod (validación doble capa: cliente Y servidor) |
| DB | Supabase (Postgres + Auth + Storage), RLS activo siempre |
| Email | Resend (`src/lib/email.ts` — branding por env vars) |
| Deploy | Vercel |
| Monorepo | Turborepo + pnpm workspaces |

## 🎨 Sistema de branding

El branding vive en **3 archivos** — los componentes solo usan tokens semánticos:

1. `apps/web/tailwind.config.ts` → paleta (`primary`, `brand`, sombras)
2. `apps/web/src/lib/fonts.ts` → fuentes (`--font-display`, `--font-body`, `--font-script`)
3. `apps/web/src/app/globals.css` → tokens CSS para exports de Claude Design (`--accent-*`, `--gray-*`)

Rebrandear un cliente = editar esos 3 archivos. NUNCA hardcodear colores/fuentes en componentes.

---

## 🔐 Reglas de oro (no negociables)

1. Secretos solo en `process.env.*`.
2. Nunca tocar datos de tarjeta — siempre checkout hospedado/Elements de la pasarela.
3. Idempotencia en todo webhook.
4. Server Components por defecto; `'use client'` solo con interactividad real.
5. Zod en cliente Y servidor, mismo schema.
6. Rate limiting (`src/lib/ratelimit.ts`) en todo endpoint público.
7. RLS activo en todas las tablas Supabase.
8. APIs externas solo desde API Routes, nunca del cliente.
9. Accesibilidad WCAG AA: keyboard nav, focus ring, aria-labels, `alt` descriptivos.
10. No commits monstruosos; no `console.log` a main; no inventar endpoints.

---

## 📂 Estructura

```
{{proyecto}}/
├── CLAUDE.md                ← este archivo
├── docs/                    ← MASTER, BITACORA, SPRINT_ACTUAL, decisiones/, sprints/
├── design/exports/          ← HTML versionados de Claude Design
├── apps/web/                ← Next.js
│   └── src/
│       ├── app/             ← rutas App Router
│       ├── components/
│       │   ├── layout/      ← Navbar, Footer
│       │   ├── sections/    ← ⭐ secciones de Claude Design
│       │   ├── providers/   ← SmoothScroll
│       │   └── analytics/   ← GTM
│       └── lib/             ← fonts, supabase, email, ratelimit
├── packages/ui/             ← @medusssa/ui: Button, Badge, Input, Skeleton, StarRating, AnimatedSection
└── supabase/migrations/
```

---

**Template versión**: 1.0 (junio 2026) · Derivado de mobbitrips-web-v2
