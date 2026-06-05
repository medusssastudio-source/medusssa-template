const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Medusssa Template';

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row lg:px-10">
        <p className="font-display text-sm font-semibold text-brand-charcoal">{SITE_NAME}</p>
        <p className="text-xs text-brand-light">
          © {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
