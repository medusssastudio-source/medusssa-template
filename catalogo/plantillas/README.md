# 📋 Plantillas por tipo de página

El **Nivel 3** de la fábrica: recetas completas que combinan [secciones](../secciones/README.md) + [módulos](../modulos/README.md) + **docs pre-llenados** para un tipo de negocio. Arrancar un cliente de ese tipo = clonar la receta y rellenar lo específico.

## Por qué existen

Cada tipo de página repite las mismas decisiones (¿pasarela? ¿dominio? ¿branding?) y las mismas piezas. Pre-escribirlas evita olvidos y acelera la Semana 0 de cada cliente.

## Estructura de una plantilla

```
plantillas/<tipo>/
├── RECETA.md          ← qué secciones + qué módulos + en qué orden
├── MASTER.md          ← fuente de verdad pre-llenada para ese tipo
├── BITACORA.md        ← arranca vacía, con la estructura lista
├── SPRINT_ACTUAL.md   ← sprint de Semana 0 pre-llenado (decisiones típicas)
└── decisiones.md      ← las preguntas de siempre para ese tipo (checklist)
```

## Tipos previstos

| Tipo                     | Estado      | Piezas que combina                                                                                                      |
| ------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Hospedaje**            | ⏳ planeado | Navbar + Hero + Galería · módulos [Reservas](../modulos/datos-reservas.md) + [iCal](../modulos/ical-sync.md) + Checkout |
| **Tienda digital**       | ⏳ planeado | módulos [Contenido digital](../modulos/datos-contenido-digital.md) + Checkout                                           |
| **Inmobiliaria**         | ⏳ planeado | módulo [Inmobiliaria + Leads](../modulos/datos-inmobiliaria.md)                                                         |
| **Landing / Portafolio** | ⏳ planeado | secciones visuales, sin módulos de pago                                                                                 |

> Siguiente paso natural: crear `plantillas/hospedaje/` reutilizando lo de Mobbitrips + KeyHandy (es el tipo con más piezas ya listas).
