# Módulo de datos: Contenido digital

- **Estado**: ✅ listo (SQL revisado; pendiente ejecutar contra Supabase real)
- **Tipo**: datos (migración + tipos TS espejo)
- **Vive en**: `supabase/migrations/20260605000004_digital_products.sql` · tipos en `apps/web/src/types/db.ts`
- **Qué resuelve**: venta de cursos/guías/videos con **entrega simple post-pago** (email con links de acceso/descarga). Sin login ni área de miembros.

## Tablas

| Tabla              | Qué guarda                                                                      | Acceso (RLS)                                            |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `digital_products` | productos (cursos, guías, videos): título, descripción, precio, recurso         | catálogo público: solo lectura de activos               |
| `digital_orders`   | órdenes (1 orden = 1 producto); idempotencia del webhook por referencia de pago | solo `service_role` (checkout y entrega por API routes) |

## Receta de integración

1. Aplicar la migración (depende de `20260605000001_base.sql`).
2. Checkout con pasarela (módulo Checkout ⏳) → webhook **idempotente** por `payment_ref` crea la orden.
3. Entrega: al confirmar pago, email (Resend) con signed URLs de Supabase Storage (PDFs) y/o link Vimeo unlisted (videos).

## Reglas aplicadas

- Webhook de pago **idempotente** (una orden por `payment_ref`).
- Pasarela **agnóstica** en el esquema (`payment_provider` / `payment_ref`) → no bloquea Stripe vs MercadoPago.
- Entrega siempre por links firmados/temporales, nunca archivos públicos.
