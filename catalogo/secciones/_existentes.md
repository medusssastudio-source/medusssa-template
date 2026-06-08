# Secciones base del template

Las que ya vienen en el motor (`apps/web/src/components/layout/`). Son **🟡 base**: funcionan y están tokenizadas, pero son mínimas — pensadas para personalizarse por cliente, no como secciones "de catálogo" terminadas.

---

### Navbar base

- **Estado**: 🟡 base
- **Vive en**: `apps/web/src/components/layout/Navbar.tsx`
- **Qué hace**: header fijo (`fixed top-0`), translúcido con `backdrop-blur`, logo de texto + links desktop + toggle hamburguesa en mobile.
- **Tokens**: `brand-cream`, `brand-border`, `brand-charcoal`, `brand-gray`, `font-display`.
- **Personalizar**: editar `NAV_LINKS` (array de `{ href, label }`) y el nombre vía `NEXT_PUBLIC_SITE_NAME`.
- **Notas**: `'use client'` (estado del menú móvil). Usa `next-view-transitions` para los `Link` y `lucide-react` (`Menu`/`X`). Accesible (`aria-expanded`, `aria-label`).
- **Por hacer al genericizar**: variante animada (scroll-aware), soporte submenús, CTA en navbar.

---

### Footer base

- **Estado**: 🟡 base
- **Vive en**: `apps/web/src/components/layout/Footer.tsx`
- **Qué hace**: franja simple con nombre del sitio + copyright con año automático.
- **Tokens**: `brand-cream`, `brand-border`, `brand-charcoal`, `brand-light`, `font-display`.
- **Personalizar**: nombre vía `NEXT_PUBLIC_SITE_NAME`.
- **Server Component** (sin `'use client'`).
- **Por hacer al genericizar**: columnas de links, redes sociales, newsletter, datos de contacto.

---

### Providers de apoyo (no son secciones, pero viven en el layout)

- **SmoothScrollProvider** (`components/providers/`) — wrapper de Lenis para scroll suave.
- **GoogleTagManager** (`components/analytics/`) — GTM por env var.
