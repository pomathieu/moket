import type { MetadataRoute } from 'next';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';
import { CITIES } from '@/lib/cities';


export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://moket.fr';
const lastModified = new Date('2026-01-11');

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
      lastModified: lastModified,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const zoneRoutes = ZONES.map((z) => ({
    url: `${base}/zones/${z.slug}`,
      lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

    const zoneCityRoutes = CITIES
    .filter((c) => (c.indexable ?? true) === true)
    .map((c) => ({
      url: `${base}/zones/${c.zoneSlug}/ville/${c.slug}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));


  const servicesRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
      lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const zoneServiceRoutes = ZONES.flatMap((z) =>
  SERVICES.map((s) => ({
    url: `${base}/zones/${z.slug}/${s.slug}`,
      lastModified: lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))
  );
  
  return [
    ...staticRoutes,
    ...zoneRoutes,
    ...servicesRoutes,
    ...zoneServiceRoutes,
    ...zoneCityRoutes,
  ];
}
