import type { Config } from 'tailwindcss';

/**
 * 🎨 PALETA PLACEHOLDER — reemplazar con el branding de cada cliente.
 * Los componentes usan SOLO tokens semánticos (primary, brand-*, status-*),
 * así que el rebrandeo completo es editar este archivo + src/lib/fonts.ts.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // ← color de marca del cliente
          dark: '#4338CA', //    hover states
          light: '#A5B4FC', //   backgrounds suaves
          soft: '#EEF2FF', //    fondos de sección
        },
        brand: {
          charcoal: '#2D2D2D', // texto principal
          gray: '#6B7280', //     texto secundario
          light: '#A8A8A8', //    placeholders, terciario
          cream: '#FAFAF8', //    fondo global
          white: '#FFFFFF',
          border: '#E8E8E4', //   bordes suaves
        },
        status: {
          success: '#4CAF82',
          warning: '#F5A623',
          error: '#E05555',
          info: '#5B9BD5',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      boxShadow: {
        // Sombras teñidas con el color de marca (cambiar rgba junto con primary)
        sm: '0 2px 8px rgba(79,70,229,0.06)',
        DEFAULT: '0 4px 16px rgba(79,70,229,0.10)',
        md: '0 4px 16px rgba(79,70,229,0.10)',
        lg: '0 12px 32px rgba(79,70,229,0.14)',
        xl: '0 24px 48px rgba(79,70,229,0.18)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4F46E5 0%, #A5B4FC 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
