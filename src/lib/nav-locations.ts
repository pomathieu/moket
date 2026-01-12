import { CITIES } from '@/lib/cities';

export function getCitiesMenuByZone(zoneSlug: string, limit = 8) {
  return CITIES
    .filter((c) => c.zoneSlug === zoneSlug && c.indexable !== false)
    .slice(0, limit)
    .map((c) => ({
      label: c.name,
      href: `/zones/${c.zoneSlug}/${c.slug}`,
    }));
}
