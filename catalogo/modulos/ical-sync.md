# Módulo: Sincronización iCal — `@medusssa/ical-sync`

- **Estado**: ✅ listo (26/26 tests vitest)
- **Tipo**: paquete (`packages/ical-sync/`)
- **Qué resuelve**: importar las fechas ocupadas de calendarios externos (Airbnb/Booking) y exportar un feed propio para que las OTAs bloqueen lo reservado en el sitio. La pieza de mayor riesgo técnico de un proyecto de hospedaje, ya resuelta.

## API / contrato (exports de `@medusssa/ical-sync`)

| Export                          | Qué hace                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `parseIcs(text)`                | Parsea un feed `.ics` (folding RFC 5545, `VALUE=DATE`/`DATETIME`, escapes) → eventos |
| `generateIcs(options)`          | Genera un feed propio (CRLF + folding correctos)                                     |
| `rangesOverlap(a, b)`           | ¿dos rangos se traslapan? (checkout exclusivo)                                       |
| `mergeRanges(ranges)`           | fusiona rangos ocupados solapados                                                    |
| `isRangeAvailable(range, busy)` | ¿un rango pedido cabe sin chocar con los ocupados?                                   |
| `addDays(iso, n)`               | aritmética de fechas ISO                                                             |
| tipos                           | `DateRange`, `GenerateIcsOptions`, `IcalEvent`, `IcalEventInput`, `IsoDate`          |

> **Convención clave**: `end_date` es **EXCLUSIVO** (estándar iCal/checkout). Una reserva del 10 al 12 ocupa noches 10 y 11; el 12 queda libre para un check-in.

## Receta de integración

1. El módulo de datos [Reservas](./datos-reservas.md) ya tiene las tablas (`lodging_ical_feeds`, `lodging_busy_ranges`).
2. **Import** (cron Vercel cada ~30-60 min): por cada feed → `fetch` del `.ics` → `parseIcs` → upsert en `lodging_busy_ranges` (idempotente por feed).
3. **Export**: API route `/api/ical/[lodgingId].ics` → lee rangos ocupados → `generateIcs` → responde `text/calendar`.
4. Disponibilidad en checkout: `isRangeAvailable(fechasPedidas, mergeRanges(ocupados))` antes de cobrar.

## Gotchas

- La sync **no es instantánea** (ventana del cron) → riesgo bajo de doble reserva. Mitigar con margen de bloqueo o confirmación.
- iCal solo sincroniza **fechas**, no precios ni datos de huésped (esos viven en Supabase).
