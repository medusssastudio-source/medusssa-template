# Módulo de datos: Reservas

- **Estado**: ✅ listo (SQL revisado; pendiente ejecutar contra Supabase real)
- **Tipo**: datos (migración + tipos TS espejo)
- **Vive en**: `supabase/migrations/20260605000002_lodgings.sql` · tipos en `apps/web/src/types/db.ts`
- **Acompaña a**: el paquete [`@medusssa/ical-sync`](./ical-sync.md)

## Tablas

| Tabla                 | Qué guarda                                                                                | Acceso (RLS)                                  |
| --------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- |
| `lodgings`            | fichas de alojamientos (galería, amenidades, ubicación, precios por temporada)            | catálogo público: solo lectura de activos     |
| `lodging_ical_feeds`  | feeds iCal externos a importar (1 alojamiento → N feeds: Airbnb, Booking…)                | solo `service_role`                           |
| `lodging_busy_ranges` | rangos ocupados (`end_date` EXCLUSIVO); vienen del cron de sync o de reservas confirmadas | disponibilidad pública (sin datos personales) |
| `reservations`        | reservas directas hechas en el sitio                                                      | solo `service_role`                           |

## Receta de integración

1. Aplicar la migración (depende de `20260605000001_base.sql` por `set_updated_at` y `events`).
2. Conectar el cron de import + la API route de export → ver receta de [ical-sync](./ical-sync.md).
3. Checkout: validar disponibilidad con `isRangeAvailable` antes de cobrar; al confirmar pago, insertar en `reservations` + bloquear el rango.

## Reglas aplicadas

- Sync iCal **idempotente** por feed.
- Catálogos en solo-lectura pública; datos personales de reservas solo desde el servidor.
