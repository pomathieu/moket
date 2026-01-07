import type { MetadataRoute } from 'next';
import { ZONES } from '@/lib/zones';
import { SERVICES } from '@/lib/services';


export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://moket.fr';

  const staticRoutes = [
    '',
    '/devis',
    '/tarifs',
    '/notre-methode',
    '/services',
    '/zones',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const zoneRoutes = ZONES.map((z) => ({
    url: `${base}/zones/${z.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));


  const zoneServiceRoutes = ZONES.flatMap((z) =>
  SERVICES.map((s) => ({
    url: `https://moket.fr/zones/${z.slug}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))
  );
  
  return [...staticRoutes, ...zoneRoutes, ...zoneServiceRoutes];
}
