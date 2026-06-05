# 🟣 Medusssa Template

Template base de **Medusssa Studio** para proyectos web de clientes. Monorepo Next.js 14 + Tailwind + Supabase con design system tokenizado, metodología de trabajo (bitácora + sprints + flujo Claude Design ↔ Claude Code) y tooling completo.

Derivado de `mobbitrips-web-v2` — branding extraído a tokens para rebrandear por cliente en 3 archivos.

## Arrancar un proyecto nuevo

```bash
# 1. Clonar/copiar este template con el nombre del proyecto
# 2. Instalar
pnpm install

# 3. Configurar entorno
cp apps/web/.env.example apps/web/.env.local

# 4. Personalizar branding del cliente:
#    - apps/web/tailwind.config.ts   (paleta)
#    - apps/web/src/lib/fonts.ts     (fuentes)
#    - apps/web/src/app/globals.css  (tokens CSS para Claude Design)
#    - CLAUDE.md                     (reemplazar {{NOMBRE_PROYECTO}})

# 5. Desarrollo
pnpm dev          # → http://localhost:3000
```

## Comandos

```bash
pnpm dev          # desarrollo (todos los apps)
pnpm lint         # ESLint
pnpm type-check   # TypeScript
pnpm build        # build de producción
pnpm format       # Prettier
```

## Qué incluye

- **`packages/ui`** — `@medusssa/ui`: Button, Badge, Input, Skeleton, StarRating, AnimatedSection (scroll-reveal con IntersectionObserver)
- **`apps/web`** — esqueleto Next.js 14: layout con Navbar/Footer/skip-link, fuentes vía `next/font`, GTM opcional, smooth scroll (Lenis), view transitions, error/404, robots/sitemap, libs (Supabase admin, Resend con branding por env, rate limiting)
- **Tooling** — pnpm workspaces, Turborepo, ESLint, Prettier, Husky + commitlint (conventional commits), lint-staged
- **Metodología** — `CLAUDE.md` con reglas inmutables y protocolo de sesión, `docs/` con plantillas de MASTER/bitácora/sprint

## Reglas clave

Ver `CLAUDE.md`. Las inmutables: visualizador único `pnpm dev` → localhost:3000 · `<AnimatedSection>` para scroll-reveal (nunca Framer Motion) · nunca `overflow: clip` en globals.css · pull al iniciar + push al cerrar sesión.
