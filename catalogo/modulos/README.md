# ⚙️ Módulos

Recetas de integración: el **"cómo conectar"** una capacidad de negocio (reservas, checkout, agenda, leads, datos). A diferencia de las [secciones](../secciones/README.md), un módulo es lógica + datos + contratos, no pixeles.

## Tipos de módulo

- **Paquete** — código reutilizable en `packages/` (ej. `@medusssa/ical-sync`).
- **Datos** — migraciones Supabase + tipos TS espejo (ej. reservas, inmobiliaria, contenido digital).
- **Integración externa** — receta para conectar un servicio (Stripe, Cal.com, Resend).

## Plantilla de ficha

```md
### <Nombre del módulo>

- **Estado**: ✅ listo / 🟡 base / ⏳ planeado
- **Tipo**: paquete / datos / integración
- **Vive en**: ruta(s)
- **API / contrato**: funciones exportadas o tablas + columnas clave
- **Receta**: pasos para integrarlo en un proyecto nuevo
- **Reglas de oro aplicables**: idempotencia, RLS, secretos en env, etc.
- **Pendientes / gotchas**
```

## Reglas de oro aplicables a módulos

- Idempotencia en todo webhook (pago, sync).
- RLS activo en todas las tablas; catálogos = solo lectura pública; datos sensibles = solo `service_role`.
- Secretos solo en `process.env.*`. APIs externas solo desde API Routes.
- Validación doble capa: Zod en cliente Y servidor.
