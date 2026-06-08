# Módulo de datos: Inmobiliaria + Leads

- **Estado**: ✅ listo (SQL revisado; pendiente ejecutar contra Supabase real)
- **Tipo**: datos (migración + tipos TS espejo)
- **Vive en**: `supabase/migrations/20260605000003_real_estate.sql` · tipos en `apps/web/src/types/db.ts`
- **Qué resuelve**: catálogo de inmuebles en venta + captura de interesados. **Sin pagos en línea** — las ventas se cierran en persona.

## Tablas

| Tabla                    | Qué guarda                                                                                            | Acceso (RLS)                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `real_estate_properties` | inmuebles (galería, m², recámaras, servicios, ubicación, precio, estatus disponible/apartado/vendido) | catálogo público: solo lectura de activos          |
| `real_estate_leads`      | interesados (formulario por inmueble o general)                                                       | solo `service_role` (el INSERT pasa por API route) |

## Receta de integración

1. Aplicar la migración (depende de `20260605000001_base.sql`).
2. Catálogo + ficha = páginas públicas que leen `real_estate_properties` activos.
3. Formulario de contacto → API route con Zod (cliente + servidor) → insert en `real_estate_leads` → notificación a email/WhatsApp de la clienta (vía módulo Resend).

## Reglas aplicadas

- Leads nunca se insertan desde el cliente directo: siempre vía API route (`service_role`).
- Catálogo en solo-lectura pública.
