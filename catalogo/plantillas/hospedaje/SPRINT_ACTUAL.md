# 🎯 Sprint — Semana 0 (Hospedaje)

**Etapa**: Pre-arranque · **Objetivo**: dejar todo listo para que F0 corra sin bloqueos.

## Tasks

- [ ] Cerrar las 7 decisiones de [`decisiones.md`](./decisiones.md) con el cliente
- [ ] Pedir contenido con **fecha límite**:
  - [ ] Por alojamiento: fotos en alta, título, descripción, amenidades, ubicación, precios por temporada
  - [ ] **URL del calendario iCal/.ics** de cada propiedad en Airbnb/Booking
  - [ ] Identidad: logo, colores, textos del inicio, redes/WhatsApp
- [ ] Cuentas a abrir ya (tardan en verificar):
  - [ ] Pasarela de pago ({{Stripe/MercadoPago}})
  - [ ] Dominio
- [ ] (Opcional pro-venta) Mockup del home con Claude Design
- [ ] Repo del cliente listo desde `medusssa-template`:
  - [ ] Clonar template → renombrar
  - [ ] Personalizar branding (3 archivos) + `NEXT_PUBLIC_SITE_NAME`
  - [ ] Copiar `MASTER.md` y `decisiones.md` de esta plantilla a `docs/`
  - [ ] `.env` desde `.env.example`

## Notas

- No escribir código de producto hasta cerrar el trato (si aún en cotización).
- La migración de Reservas ya existe en el template; ejecutarla contra el Supabase real al arrancar F1/F2.
- Si el cliente pide ver algo para decidirse → mockup del home (esfuerzo bajo, alto impacto de venta).
