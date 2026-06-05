'use client';

import { useState } from 'react';
import { Link } from 'next-view-transitions';
import { Menu, X } from 'lucide-react';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Medusssa Template';

/** Rutas de navegación — personalizar por cliente */
const NAV_LINKS: { href: string; label: string }[] = [
  { href: '/', label: 'Inicio' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-brand-border bg-brand-cream/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-10"
        aria-label="Navegación principal"
      >
        <Link href="/" className="font-display text-xl font-bold text-brand-charcoal">
          {SITE_NAME}
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-brand-gray transition-colors hover:text-brand-charcoal"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="border-t border-brand-border bg-brand-cream px-5 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-3 text-sm font-medium text-brand-gray"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
