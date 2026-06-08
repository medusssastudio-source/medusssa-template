# 🧩 Secciones

Bloques visuales compuestos que produce **Claude Design** y se genericizan para reusar. Aquí NO va lógica de negocio (eso son [módulos](../modulos/README.md)) ni primitivas (eso es `@medusssa/ui`).

## Cómo se agrega una sección al catálogo

1. Claude Design la genera para un cliente → export en `design/exports/<seccion>-v<n>.html`.
2. Se **genericiza**: colores → tokens (`--accent-*`, `brand-*`), copy → placeholders, imágenes → slots.
3. Se registra aquí con su ficha (abajo) y se añade la fila en [`CATALOGO.md`](../CATALOGO.md).

## Plantilla de ficha

```md
### <Nombre de la sección>

- **Estado**: ✅ listo / 🟡 base / ⏳ planeado
- **Preview**: design/exports/<archivo>.html (abrir SIEMPRE vía `pnpm dev`, NUNCA file:///)
- **Tokens que usa**: --accent-_, brand-_, font-display…
- **Props / slots**: título, subtítulo, CTA, imagen…
- **Receta**: dónde se monta (apps/web/src/components/sections/), qué importa, gotchas
- **Origen**: cliente/proyecto de donde salió
```

## Reglas heredadas (no negociables)

- Scroll-reveal **SIEMPRE** con `<AnimatedSection>` de `@medusssa/ui`. Nunca Framer Motion para scroll.
- Nunca `overflow: clip` en `globals.css` (rompe el build CSS) → usar `overflow: hidden` + padding.
- Solo tokens semánticos; nunca hardcodear color/fuente.
