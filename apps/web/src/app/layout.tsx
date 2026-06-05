import type { Metadata } from 'next';
import { displayFont, bodyFont, scriptFont } from '@/lib/fonts';
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from '@/components/analytics/GoogleTagManager';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Medusssa Template';

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Sitio en construcción.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: SITE_NAME,
  },
  robots: { index: true, follow: true },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="es"
        className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}
      >
        <body className="bg-brand-cream text-brand-charcoal antialiased">
          {gtmId && <GoogleTagManagerScript gtmId={gtmId} />}
          {gtmId && <GoogleTagManagerNoscript gtmId={gtmId} />}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Ir al contenido principal
          </a>
          <SmoothScrollProvider>
            <Navbar />
            <main id="main-content" className="pt-[72px]">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
