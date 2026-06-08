# ✅ Decisiones típicas — Hospedaje

> Las preguntas que **siempre** hay que cerrar en la Semana 0 de un proyecto de hospedaje. Pre-escritas para no olvidar ninguna. Copiar a `docs/decisiones/` del proyecto y marcar conforme se resuelven.

| #   | Decisión                      | Opciones                                               | Recomendación por defecto                                     |
| --- | ----------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| 1   | **Pasarela de pago**          | Stripe / MercadoPago / ambas                           | Stripe (una integración cubre todo; esquema ya es agnóstico)  |
| 2   | **Branding**                  | ¿tiene logo y colores, o los diseñamos?                | Definir antes de la fase de diseño                            |
| 3   | **Dominio y correo**          | ¿ya tiene dominio propio?                              | Comprar ya (verificación tarda)                               |
| 4   | **# de alojamientos inicial** | —                                                      | Define el esfuerzo de carga de contenido                      |
| 5   | **Feeds iCal**                | ¿cada propiedad está en Airbnb/Booking con URL `.ics`? | Pedir las URLs `.ics` por propiedad en Semana 0               |
| 6   | **Política de reserva**       | ¿pago total o anticipo? ¿cancelación?                  | Total al reservar (más simple) salvo que el cliente pida otra |
| 7   | **Margen anti-doble-reserva** | ¿confirmación manual o automática?                     | Bloqueo automático + margen, dado el desfase del cron iCal    |

## Contenido a pedir (Semana 0)

- Por alojamiento: fotos en alta, título, descripción, amenidades, ubicación, **precios por temporada** y **URL del calendario iCal/.ics** de cada OTA.
- Identidad: logo, colores, textos del inicio, redes y WhatsApp de contacto.

## Cuentas a abrir temprano (tardan en verificar)

- Pasarela de pago (Stripe/MercadoPago).
- Dominio.
