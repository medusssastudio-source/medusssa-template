# 🗂️ Catálogo Medusssa Studio

> **El mapa navegable de la fábrica.** Aquí vive todo lo reutilizable: componentes base, secciones de diseño, módulos de integración y plantillas por tipo de página.
>
> Cotizar = armar un menú con estas piezas. Construir = ensamblarlas.

---

## 🧱 Los 3 niveles

```
NIVEL 3 — PLANTILLAS POR TIPO DE PÁGINA      → catalogo/plantillas/
  recetas completas: "Hospedaje", "Tienda digital", "Inmobiliaria", "Landing"
  (MASTER + BITACORA + SPRINT pre-llenados por tipo)
─────────────────────────────────────────────────────────
NIVEL 2 — CATÁLOGO DE PIEZAS                  → catalogo/secciones/ + catalogo/modulos/
  secciones visuales (navbars, heros, footers…) + módulos (reservas, checkout, agenda)
─────────────────────────────────────────────────────────
NIVEL 1 — MOTOR (la base del template)        → packages/ + apps/web/
  tooling + @medusssa/ui + @medusssa/ical-sync + branding tokenizado + metodología
```

## 📐 Convención de ficha (toda pieza se registra igual)

Cada pieza del catálogo se documenta con: **qué es · dónde vive · API/props · tokens que usa · receta de uso · estado**. Así cualquiera (tú o yo) puede pedir "arma una de hospedaje con el hero 3 y fondo de blobs" y ensamblo sin adivinar.

Estados: `✅ listo` (genérico y verificado) · `🟡 base` (existe pero específico/por genericizar) · `⏳ planeado` (aún no construido).

---

## 1. 🎨 Componentes base — `@medusssa/ui`

Primitivas del sistema de diseño. Importar desde `@medusssa/ui`. **Solo usan tokens semánticos** (`primary`, `brand-*`, `status-*`, `font-*`) → rebrandear = editar los 3 archivos de branding, los componentes no se tocan.

| Pieza             | Estado   | API principal                                                                                        | Notas                                                                                                                    |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Button`          | ✅ listo | `variant` (primary/secondary/outline/ghost) · `size` (sm/md/lg) · `loading` · `leftIcon`/`rightIcon` | `font-sans`, spinner `Loader2`, focus ring accesible                                                                     |
| `Badge`           | ✅ listo | `variant` (default/coral/success/warning)                                                            | pill con borde tonal                                                                                                     |
| `Input`           | ✅ listo | `label` · `helperText` · `error` · `leftIcon`                                                        | id auto desde label, `aria-invalid`/`aria-describedby`, estado error                                                     |
| `Skeleton`        | ✅ listo | `rounded` (sm…full)                                                                                  | shimmer vía `skeleton-shimmer` keyframe                                                                                  |
| `StarRating`      | ✅ listo | `value` · `max` · `size`                                                                             | soporta medias estrellas, `role="img"`                                                                                   |
| `AnimatedSection` | ✅ listo | `direction` (up/down/left/right) · `delay` · `duration` · `as`                                       | **scroll-reveal canónico** (IntersectionObserver + CSS). Respeta `prefers-reduced-motion`. NUNCA Framer Motion para esto |
| `cn`              | ✅ listo | `cn(...classes)`                                                                                     | merge de clases (clsx + tailwind-merge)                                                                                  |

## 2. 🧩 Secciones — `catalogo/secciones/`

Bloques visuales compuestos (navbars, heros, fondos, footers, galerías) que produce Claude Design y se genericizan con tokens. → ver [`secciones/README.md`](./secciones/README.md)

| Sección                              | Estado      | Origen                                      | Ficha                                      |
| ------------------------------------ | ----------- | ------------------------------------------- | ------------------------------------------ |
| Navbar base (sticky + mobile toggle) | 🟡 base     | template (`apps/web/.../layout/Navbar.tsx`) | [\_existentes](./secciones/_existentes.md) |
| Footer base (copyright)              | 🟡 base     | template (`apps/web/.../layout/Footer.tsx`) | [\_existentes](./secciones/_existentes.md) |
| Hero                                 | ⏳ planeado | —                                           | —                                          |
| Galería / grid de fichas             | ⏳ planeado | —                                           | —                                          |
| Fondos / efectos (blobs, gradientes) | ⏳ planeado | —                                           | —                                          |

> 💡 Cada cliente que firma alimenta esta tabla: una sección que diseñamos para él → la genericizamos (tokens en vez de colores) → entra aquí.

## 3. ⚙️ Módulos — `catalogo/modulos/`

Recetas de integración: el "cómo conectar" una capacidad de negocio. → ver [`modulos/README.md`](./modulos/README.md)

| Módulo                       | Estado      | Qué resuelve                                        | Receta                                                          |
| ---------------------------- | ----------- | --------------------------------------------------- | --------------------------------------------------------------- |
| Sincronización iCal          | ✅ listo    | importar/exportar fechas ocupadas (Airbnb/Booking)  | [ical-sync](./modulos/ical-sync.md)                             |
| Datos — Reservas             | ✅ listo    | alojamientos + feeds + rangos + reservas (Supabase) | [datos-reservas](./modulos/datos-reservas.md)                   |
| Datos — Inmobiliaria         | ✅ listo    | inmuebles + leads (Supabase)                        | [datos-inmobiliaria](./modulos/datos-inmobiliaria.md)           |
| Datos — Contenido digital    | ✅ listo    | productos + órdenes + entrega post-pago             | [datos-contenido-digital](./modulos/datos-contenido-digital.md) |
| Checkout (pasarela)          | ⏳ planeado | cobro Stripe/MercadoPago (agnóstico en el esquema)  | —                                                               |
| Agenda (videollamadas)       | ⏳ planeado | embed Cal.com / Calendly                            | —                                                               |
| Email transaccional (Resend) | 🟡 base     | `apps/web/src/lib/email.ts` (branding por env)      | —                                                               |
| Captura de leads             | 🟡 base     | incluida en módulo Inmobiliaria                     | [datos-inmobiliaria](./modulos/datos-inmobiliaria.md)           |

## 4. 📋 Plantillas — `catalogo/plantillas/`

Recetas completas por tipo de página: combinan secciones + módulos + docs pre-llenados. → ver [`plantillas/README.md`](./plantillas/README.md)

| Plantilla                                     | Estado          | Combina                                                  |
| --------------------------------------------- | --------------- | -------------------------------------------------------- |
| [Hospedaje](./plantillas/hospedaje/RECETA.md) | ✅ receta lista | Navbar + Hero + Galería + módulos Reservas/iCal/Checkout |
| Tienda digital                                | ⏳ planeado     | módulos Contenido digital + Checkout                     |
| Inmobiliaria                                  | ⏳ planeado     | módulo Inmobiliaria + Leads                              |
| Landing / Portafolio                          | ⏳ planeado     | secciones visuales, sin módulos de pago                  |

---

**Creado**: 2026-06-08 · Mantener actualizado al cerrar cada cliente (genericizar piezas nuevas → registrarlas aquí).
