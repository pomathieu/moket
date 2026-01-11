// frontend/src/app/(marketing)/zones/[zone]/ville/page.tsx
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getZone, ZONES } from '@/lib/zones';
import { getCitiesByZone } from '@/lib/cities';

type PageProps = { params: Promise<{ zone: string }> };

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  // Une page /ville par zone existante
  return ZONES.map((z) => ({ zone: z.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zone } = await params;
  const zoneData = getZone(zone);
  if (!zoneData) return {};

  const base = 'https://moket.fr';
  const canonical = new URL(`/zones/${zoneData.slug}/ville`, base);

  const title = `Villes couvertes – ${zoneData.title} | MOKET`;
  const description = `Liste des principales villes couvertes par MOKET dans la zone ${zoneData.title}. Intervention à domicile sur matelas, canapés, tapis et moquettes.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MOKET',
      locale: 'fr_FR',
      images: [
        {
          url: new URL('/images/og-default.jpg', base),
          width: 1200,
          height: 630,
          alt: `MOKET - ${zoneData.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [new URL('/images/og-default.jpg', base)],
    },
  };
}

function buildJsonLd(zoneTitle: string, zoneSlug: string) {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/zones/${zoneSlug}/ville`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Villes couvertes – ${zoneTitle}`,
        isPartOf: { '@id': `${base}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${base}/zones` },
          { '@type': 'ListItem', position: 3, name: zoneTitle, item: `${base}/zones/${zoneSlug}` },
          { '@type': 'ListItem', position: 4, name: 'Villes', item: pageUrl },
        ],
      },
    ],
  };
}

export default async function ZoneCitiesPage({ params }: PageProps) {
  const { zone } = await params;
  const zoneData = getZone(zone);
  if (!zoneData) notFound();

  // Pages locales “réelles” (avec slug)
  const cityPages = getCitiesByZone(zoneData.slug).filter((c) => (c.indexable ?? true) === true);

  // Fallback texte (ex: Paris 1er…20e)
  const fallbackCities = zoneData.cities ?? [];

  const hasCityPages = cityPages.length > 0;
  const hasFallback = fallbackCities.length > 0;

  // Si rien à afficher : soit notFound, soit un message. Je préfère notFound pour éviter une page vide indexée.
  if (!hasCityPages && !hasFallback) notFound();

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-zone-cities"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(zoneData.title, zoneData.slug)) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link
          href="/zones"
          className="hover:underline">
          Zones
        </Link>{' '}
        /{' '}
        <Link
          href={`/zones/${zoneData.slug}`}
          className="hover:underline">
          {zoneData.title}
        </Link>{' '}
        / <span>Villes</span>
      </nav>

      {/* Hero */}
      <h1 className="mt-4 text-3xl lg:text-5xl font-extrabold">Villes couvertes dans {zoneData.title}</h1>

      <p className="mt-3 text-muted-foreground max-w-3xl">Nous intervenons à domicile dans {zoneData.title} pour le nettoyage de matelas, canapés en tissu, tapis et moquettes.</p>

      {/* Cas 1 : il y a des pages ville (CITIES) -> liens */}
      {hasCityPages ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Pages locales disponibles</h2>
          <p className="mt-2 text-muted-foreground">Sélection de villes avec page dédiée (devis rapide, intervention à domicile).</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cityPages.map((c) => (
              <Link
                key={c.slug}
                href={`/zones/${zoneData.slug}/ville/${c.slug}`}
                className="rounded-2xl border bg-white p-4 hover:bg-slate-50 transition">
                <h3 className="font-semibold">{c.name}</h3>
                {c.market?.angle ? <p className="mt-1 text-sm text-muted-foreground">{c.market.angle}</p> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Cas 2 : fallback (pas de pages, mais une liste texte) */}
      {!hasCityPages && hasFallback ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Secteurs couverts</h2>
          <p className="mt-2 text-muted-foreground">Nous couvrons aussi les secteurs suivants dans {zoneData.title} :</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {fallbackCities.map((name) => (
              <span
                key={name}
                className="rounded-full border bg-white px-3 py-1 text-sm text-slate-700">
                {name}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Vous ne voyez pas votre secteur ?{' '}
            <Link
              href="/devis"
              className="underline underline-offset-4">
              Demandez un devis
            </Link>
            , on vous répond rapidement.
          </p>
        </section>
      ) : null}

      {/* CTA */}
      <section className="mt-12 rounded-2xl border bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Vous êtes dans une autre ville ?</h2>
          <p className="mt-1 text-muted-foreground">Nous couvrons toute la zone {zoneData.title}. Demandez un devis.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/devis"
            className="rounded-xl bg-primary px-5 py-2 text-sm text-white">
            Demander un devis
          </Link>
          <a
            href="tel:+33635090095"
            className="rounded-xl border px-5 py-2 text-sm">
            Appeler
          </a>
        </div>
      </section>

      {/* Maillage interne simple */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Explorer {zoneData.title}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/zones/${zoneData.slug}`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Page {zoneData.title}
          </Link>
          <Link
            href={`/zones/${zoneData.slug}/matelas`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Matelas
          </Link>
          <Link
            href={`/zones/${zoneData.slug}/canape-tissu`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Canapé tissu
          </Link>
          <Link
            href={`/zones/${zoneData.slug}/tapis`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Tapis
          </Link>
          <Link
            href={`/zones/${zoneData.slug}/moquette`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Moquette
          </Link>
        </div>
      </section>
    </main>
  );
}
