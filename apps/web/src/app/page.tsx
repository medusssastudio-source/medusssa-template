import { AnimatedSection, Button } from '@medusssa/ui';

/**
 * Home placeholder — verifica que el design system funciona end-to-end
 * (tokens, fuentes, @medusssa/ui, AnimatedSection). Reemplazar con las
 * secciones reales del cliente vía flujo Claude Design → Claude Code.
 */
export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <AnimatedSection direction="up">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Medusssa Studio
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-brand-charcoal sm:text-5xl">
          Template base listo
        </h1>
        <p className="mt-4 text-brand-gray">
          Monorepo Next.js 14 + Tailwind + Supabase con design tokens, animaciones y metodología
          incluidas. Personaliza <code>tailwind.config.ts</code> y <code>lib/fonts.ts</code> con el
          branding del cliente.
        </p>
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.15}>
        <div className="flex gap-3">
          <Button>Botón primario</Button>
          <Button variant="outline">Botón outline</Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
