# 🏨 {{NOMBRE_PROYECTO}} — Prompt Maestro (Hospedaje)

> **Fuente de verdad del proyecto.** Plantilla pre-llenada para sitios de hospedaje. Al arrancar un cliente: copiar a `docs/MASTER.md`, reemplazar `{{...}}` y ajustar con lo acordado.
> Estado: **{{COTIZACIÓN | DESARROLLO}}**

---

## 1. Visión

**{{NOMBRE_PROYECTO}}** es el sitio de {{CLIENTE}} para mostrar y reservar sus alojamientos, con calendario sincronizado con las OTAs (Airbnb/Booking) vía iCal.

| Módulo                          | Qué hace                                                                       | Pago  |
| ------------------------------- | ------------------------------------------------------------------------------ | ----- |
| **Catálogo**                    | fichas de alojamientos (galería, amenidades, ubicación, precios por temporada) | —     |
| **Reservas**                    | selector de fechas + disponibilidad sincronizada iCal + checkout               | ✅ Sí |
| **(Opcional) {{módulo extra}}** | {{contenido digital / inmobiliaria / agenda}}                                  | {{…}} |

## 2. Base técnica — `medusssa-template`

Monorepo del estudio. **Qué se reutiliza:** tooling completo, `@medusssa/ui`, `@medusssa/ical-sync`, migraciones de [Reservas](../../modulos/datos-reservas.md), patrón Supabase, email Resend, metodología y reglas inmutables (ver `CLAUDE.md`).

### Stack

| Capa      | Tecnología                                                                         |
| --------- | ---------------------------------------------------------------------------------- |
| Framework | Next.js 14 (App Router, Server Components)                                         |
| Lenguaje  | TypeScript estricto                                                                |
| Estilos   | Tailwind CSS (solo tokens semánticos)                                              |
| Animación | `<AnimatedSection>` (IntersectionObserver + CSS) — nunca Framer Motion para scroll |
| DB        | Supabase (Postgres + Auth + Storage), RLS siempre                                  |
| Reservas  | `@medusssa/ical-sync` + migración lodgings                                         |
| Pagos     | {{Stripe / MercadoPago}} (esquema agnóstico)                                       |
| Email     | Resend                                                                             |
| Deploy    | Vercel                                                                             |

## 3. Módulos en detalle

### 3.1 Catálogo + ficha de alojamiento

- Grid de alojamientos (lectura pública de `lodgings` activos).
- Ficha: galería, amenidades, ubicación con mapa, precios por temporada, calendario de disponibilidad.

### 3.2 Reservas (iCal)

- **Import**: cron Vercel (~30-60 min) trae fechas ocupadas de las OTAs → `lodging_busy_ranges`.
- **Export**: cada alojamiento expone su `.ics` para que las OTAs bloqueen lo reservado aquí.
- **⚠️ Limitación iCal (explicar al cliente)**: solo sincroniza fechas, no precios ni datos de huésped; no es instantáneo (ventana del cron) → riesgo bajo de doble reserva, mitigable con margen/confirmación.
- Checkout: `isRangeAvailable` antes de cobrar → al confirmar pago, `reservations` + bloqueo de rango.

## 4. Decisiones pendientes

Ver [`decisiones.md`](./decisiones.md) — 7 decisiones típicas de hospedaje. Cerrarlas en Semana 0.

## 5. Plan de fases

| Fase                          | Foco                                                                             | Esfuerzo |
| ----------------------------- | -------------------------------------------------------------------------------- | -------- |
| **Semana 0**                  | cerrar decisiones, pedir contenido (incl. URLs iCal), abrir cuentas, mockup home | S        |
| **F0 — Setup + Diseño**       | branding, sistema de diseño, home                                                | M        |
| **F1 — Catálogo**             | grid + ficha de alojamiento                                                      | M        |
| **F2 — Reservas + Pagos**     | sync iCal, selector de fechas, checkout, emails                                  | L        |
| **F3 — Pulido + Lanzamiento** | SEO, analítica, accesibilidad, QA, go-live                                       | M        |

> ⚠️ El calendario se sostiene si las dependencias externas llegan a tiempo (decisiones, contenido, cuentas verificadas). El riesgo no es la velocidad de desarrollo.

## 6. Reglas de oro

Heredadas de `CLAUDE.md` del template (secretos en env, checkout hospedado, idempotencia de webhooks, RLS, Server Components por defecto, Zod doble capa, WCAG AA, nunca `overflow: clip`, visualizador canónico `pnpm dev`, pull al iniciar + push al cerrar, nunca editar `main` directo).

---

**Plantilla**: Hospedaje · derivada de la metodología Mobbitrips / KeyHandy.
