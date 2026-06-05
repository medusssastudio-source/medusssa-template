import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center"
    >
      <p className="font-display text-8xl font-bold text-primary/20" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-brand-charcoal">
        Esta página no existe
      </h1>
      <p className="mt-2 max-w-sm text-brand-gray">
        La dirección que buscas no existe o fue movida.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Home size={18} aria-hidden="true" />
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
