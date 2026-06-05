import { Inter, Poppins, Caveat } from 'next/font/google';

/**
 * 🎨 FUENTES PLACEHOLDER — reemplazar con las del branding de cada cliente.
 * Mantener SIEMPRE las variables --font-display / --font-body / --font-script:
 * todo el sistema (Tailwind, globals.css, exports de Claude Design) depende de ellas.
 */

export const displayFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const scriptFont = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-script',
  display: 'swap',
});
