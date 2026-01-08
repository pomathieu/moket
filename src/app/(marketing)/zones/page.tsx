import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ZONES } from '@/lib/zones';

export const metadata: Metadata = {
  title: 'Zones d’intervention | MOKET',
  description: 'Découvrez toutes les zones d’intervention MOKET : Île-de-France et Normandie. Consultez votre zone pour connaître les modalités et délais.',
  alternates: { canonical: 'https://moket.fr/zones' },
  robots: { index: true, follow: true },
};

export default function ZonesPage() {
  const idf = ZONES.filter((z) => z.regionLabel === 'Île-de-France');
  const normandie = ZONES.filter((z) => z.regionLabel === 'Normandie');

  const base = 'https://moket.fr';
  const pageUrl = `${base}/zones`;

  const zonesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Zones d’intervention',
        isPartOf: { '@id': `${base}/#website` },
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: pageUrl },
        ],
      },
      // ✅ Liste des zones (crawl + compréhension)
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#zones`,
        name: 'Liste des zones',
        itemListElement: ZONES.map((z, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: z.title,
          url: `${base}/zones/${z.slug}`,
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-zones"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zonesJsonLd) }}
      />

      <h1 className="text-3xl lg:text-5xl font-extrabold">Zones d’intervention</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">
        Intervention à domicile en <strong>Île-de-France</strong> et en <strong>Normandie</strong>. Consultez votre zone pour connaître les modalités et délais.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Île-de-France</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {idf.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {z.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Normandie</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {normandie.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {z.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold">Comment ça se passe ?</h2>
        <p className="mt-3 text-muted-foreground">
          Nous intervenons à domicile pour le nettoyage de matelas, canapés en tissu, tapis et moquettes avec une méthode d’extraction profonde. Les délais et créneaux varient selon la zone et la
          tournée.
        </p>
      </section>
    </main>
  );
}
