'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error); // eslint-disable-line no-console
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4"
    >
      <h1 className="font-display text-2xl text-brand-charcoal">Algo salió mal</h1>
      <p className="text-brand-gray">
        Por favor intenta de nuevo. Si el problema persiste, contáctanos.
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
