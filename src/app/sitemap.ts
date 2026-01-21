import type { MetadataRoute } from 'next';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';
import { CITIES } from '@/lib/cities';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://moket.fr';

  const STATIC_DATE = new Date('2026-01-21');
  const CITY_DATE = new Date('2026-01-21');

  /* =========================
     Pages statiques
  ========================= */
  const staticRoutes = [
    '',
    '/devis',
    '/tarifs',
    '/notre-methode',
    '/services',
    '/pourquoi-moket',
    '/zones',
    '/politique-confidentialite',
    '/mentions-legales',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  /* =========================
     Pages zones
  ========================= */
  const zoneRoutes = ZONES.map((z) => ({
    url: `${base}/zones/${z.slug}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /* =========================
     Hub villes par zone
     → seulement si :
       - pages villes existent
       - OU fallback zone.cities existe
  ========================= */
  const zoneCitiesIndexRoutes = ZONES.filter((z) => {
    const hasCityPages = CITIES.some(
      (c) => c.zoneSlug === z.slug && (c.indexable ?? true)
    );
    const hasFallback = (z.cities?.length ?? 0) > 0;
    return hasCityPages || hasFallback;
  }).map((z) => ({
    url: `${base}/zones/${z.slug}/ville`,
    lastModified: CITY_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }));

  /* =========================
     Pages villes réelles
  ========================= */
  const cityRoutes = CITIES
    .filter((c) => (c.indexable ?? true) === true)
    .map((c) => ({
      url: `${base}/zones/${c.zoneSlug}/ville/${c.slug}`,
      lastModified: CITY_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  /* =========================
     Pages services globales
  ========================= */
  const servicesRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: STATIC_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /* =========================
     Pages services par zone
  ========================= */
  const zoneServiceRoutes = ZONES.flatMap((z) =>
    SERVICES.map((s) => ({
      url: `${base}/zones/${z.slug}/${s.slug}`,
      lastModified: STATIC_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    }))
  );

  return [
    ...staticRoutes,
    ...zoneRoutes,
    ...zoneCitiesIndexRoutes,
    ...servicesRoutes,
    ...zoneServiceRoutes,
    ...cityRoutes,
  ];
}
