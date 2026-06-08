# 🏨 Receta: Hospedaje

> Sitio para un negocio de alojamientos: catálogo de propiedades + motor de reserva con calendario sincronizado vía iCal + checkout + emails de confirmación. Es el tipo con **más piezas ya listas** en el catálogo.

## Piezas que combina

### Secciones (Nivel 2)

| Sección                  | Estado       | Para qué                                      |
| ------------------------ | ------------ | --------------------------------------------- |
| Navbar                   | 🟡 base      | navegación + CTA "Reservar"                   |
| Hero                     | ⏳ por crear | portada con buscador de fechas/destino        |
| Galería / grid de fichas | ⏳ por crear | listado de alojamientos                       |
| Ficha de alojamiento     | ⏳ por crear | galería, amenidades, mapa, calendario, precio |
| Footer                   | 🟡 base      | contacto + redes                              |

### Módulos (Nivel 2)

| Módulo                                              | Estado       | Rol                                                 |
| --------------------------------------------------- | ------------ | --------------------------------------------------- |
| [`@medusssa/ical-sync`](../../modulos/ical-sync.md) | ✅ listo     | import/export de fechas ocupadas (Airbnb/Booking)   |
| [Datos — Reservas](../../modulos/datos-reservas.md) | ✅ listo     | alojamientos + feeds + rangos + reservas            |
| Checkout (pasarela)                                 | ⏳ por crear | cobro de la reserva (Stripe/MercadoPago, agnóstico) |
| Email transaccional (Resend)                        | 🟡 base      | confirmación de reserva                             |

### Componentes base (`@medusssa/ui`)

`Button`, `Badge` (estatus/amenidades), `Input` (fechas, huéspedes), `StarRating` (reseñas), `Skeleton` (carga de catálogo), `AnimatedSection` (scroll-reveal).

## Orden de ensamblaje

1. **Setup + branding** — clonar template, personalizar los 3 archivos de branding, llenar `MASTER.md`.
2. **Diseño** — Navbar + Hero + home con Claude Design → genericizar secciones nuevas al catálogo.
3. **Datos** — aplicar migraciones de [Reservas](../../modulos/datos-reservas.md) (depende de `base.sql`).
4. **Catálogo** — grid + ficha de alojamiento (lectura pública de `lodgings` activos).
5. **Disponibilidad** — cron de import iCal + API route de export → ver [receta iCal](../../modulos/ical-sync.md).
6. **Reserva + pago** — selector de fechas → `isRangeAvailable` → checkout → webhook idempotente → `reservations` + bloqueo de rango.
7. **Emails** — confirmación con Resend.
8. **Pulido** — SEO, analítica, accesibilidad, QA, go-live.

## Riesgo principal

La sincronización iCal (la pieza técnica más delicada) **ya está resuelta y testeada** (`@medusssa/ical-sync`, 26/26). El cuello de botella suele ser externo: feeds iCal de las OTAs, verificación de la pasarela y contenido del cliente.

## Archivos de esta plantilla

- `MASTER.md` — fuente de verdad pre-llenada para hospedaje (rellenar `{{...}}`).
- `decisiones.md` — checklist de las preguntas de siempre para este tipo.
- `SPRINT_ACTUAL.md` — sprint de Semana 0 pre-llenado.
- `BITACORA.md` — estructura lista, arranca vacía.
