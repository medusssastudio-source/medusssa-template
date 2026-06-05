import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Agregar aquí las rutas del proyecto. Las rutas dinámicas (catálogos, fichas)
 * se agregan consultando la base de datos, igual que hacía Mobbitrips con Hostex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: BASE, priority: 1.0, changeFrequency: 'weekly' }];
}
