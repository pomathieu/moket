// frontend/src/app/(marketing)/zones/[zone]/ville/[city]/page.tsx
export const dynamic = 'force-static';

import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getZone } from '@/lib/zones';
import { CITIES, getCity } from '@/lib/cities';

type PageProps = { params: Promise<{ zone: string; city: string }> };

export function generateStaticParams() {
  // Couples {zone, city} réellement déclarés
  return CITIES.map((c) => ({ zone: c.zoneSlug, city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zone, city } = await params;
  const zoneData = getZone(zone);
  const cityData = getCity(zone, city);

  if (!zoneData || !cityData) return {};

  const base = 'https://moket.fr';
  const url = new URL(`/zones/${zoneData.slug}/ville/${cityData.slug}`, base);

  const indexable = cityData.indexable ?? true;

  return {
    title: cityData.seo.title,
    description: cityData.seo.description,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: cityData.seo.title,
      description: cityData.seo.description,
      url,
      type: 'website',
      siteName: 'MOKET',
      locale: 'fr_FR',
      images: [
        {
          url: new URL('/images/og-default.jpg', base),
          width: 1200,
          height: 630,
          alt: `MOKET - ${cityData.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cityData.seo.title,
      description: cityData.seo.description,
      images: [new URL('/images/og-default.jpg', base)],
    },
  };
}

function buildCityFaq(cityName: string, zoneTitle: string) {
  return [
    {
      q: `Intervenez-vous bien à domicile à ${cityName} ?`,
      a: `Oui, nous intervenons à domicile à ${cityName} (zone : ${zoneTitle}) selon les créneaux disponibles. Demandez un devis pour une proposition rapide.`,
    },
    {
      q: `Quels services proposez-vous à ${cityName} ?`,
      a: `Nettoyage matelas, canapé en tissu, tapis et moquette, avec pré-traitement puis injection-extraction (extraction profonde).`,
    },
    {
      q: `Comment obtenir un devis ?`,
      a: `Envoyez 2–3 photos (et dimensions si possible) : on vous répond rapidement avec une estimation et des créneaux.`,
    },
  ];
}

function buildJsonLd(args: { zoneTitle: string; zoneSlug: string; cityName: string; citySlug: string; cityGeo?: { lat: number; lng: number }; citySegments?: string[]; cityAngle?: string }) {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/zones/${args.zoneSlug}/ville/${args.citySlug}`;
  const faq = buildCityFaq(args.cityName, args.zoneTitle);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Nettoyage textile à ${args.cityName}`,
        isPartOf: { '@id': `${base}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#service` },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${base}/zones` },
          { '@type': 'ListItem', position: 3, name: args.zoneTitle, item: `${base}/zones/${args.zoneSlug}` },
          { '@type': 'ListItem', position: 4, name: args.cityName, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `Nettoyage textile à domicile à ${args.cityName}`,
        description: args.cityAngle || `Intervention à domicile à ${args.cityName} : pré-traitement + injection-extraction, devis rapide sur photos.`,
        provider: { '@id': `${base}/#localbusiness` },
        serviceType: ['Nettoyage matelas', 'Nettoyage canapé tissu', 'Nettoyage tapis', 'Nettoyage moquette'],
        areaServed: {
          '@type': 'City',
          name: args.cityName,
          ...(args.cityGeo
            ? {
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: args.cityGeo.lat,
                  longitude: args.cityGeo.lng,
                },
              }
            : {}),
          containedInPlace: { '@type': 'AdministrativeArea', name: args.zoneTitle },
        },
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        ...(args.citySegments?.length ? { audience: args.citySegments.join(', ') } : {}),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: { '@id': `${pageUrl}#webpage` },
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default async function CityPage({ params }: PageProps) {
  const { zone, city } = await params;

  const zoneData = getZone(zone);
  const cityData = getCity(zone, city);

  if (!zoneData || !cityData) notFound();

  const faq = buildCityFaq(cityData.name, zoneData.title);

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-city"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildJsonLd({
              zoneTitle: zoneData.title,
              zoneSlug: zoneData.slug,
              cityName: cityData.name,
              citySlug: cityData.slug,
              cityGeo: cityData.geo,
              citySegments: cityData.market?.segments,
              cityAngle: cityData.market?.angle,
            })
          ),
        }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link
          href="/zones"
          className="hover:underline">
          Zones
        </Link>{' '}
        {' / '}
        <Link
          href={`/zones/${zoneData.slug}`}
          className="hover:underline">
          {zoneData.title}
        </Link>{' '}
        {' / '}
        <span>{cityData.name}</span>
      </nav>

      {/* Hero */}
      <h1 className="mt-4 text-3xl lg:text-5xl font-extrabold">{cityData.seo.h1}</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">{cityData.seo.description}</p>

      {/* Note logistique locale */}
      {cityData.shortNote ? (
        <p className="mt-3 text-sm text-slate-700">
          <strong>Info :</strong> {cityData.shortNote}
        </p>
      ) : null}

      {/* Segments / spécificités business */}
      {cityData.market?.segments?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Interventions adaptées à {cityData.name}</h2>
          <p className="mt-2 text-muted-foreground max-w-3xl">{cityData.market.angle ?? 'On adapte le protocole aux usages locaux (rotation, passage, textile sensible).'}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {cityData.market.segments.map((s) => (
              <span
                key={s}
                className="rounded-full border bg-white px-3 py-1 text-sm text-slate-700">
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* Blocs SEO */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Ce que nous nettoyons à {cityData.name}</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>Matelas (odeurs, acariens, auréoles)</li>
            <li>Canapés en tissu (taches, salissures incrustées)</li>
            <li>Tapis (ravive les fibres, enlève les salissures)</li>
            <li>Moquette (nettoyage en profondeur, rendu uniforme)</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Déroulé d’intervention</h2>
          <ol className="mt-3 list-decimal pl-5 text-muted-foreground">
            <li>Demande de devis (photos + dimensions si possible)</li>
            <li>Validation + proposition de créneau</li>
            <li>Intervention à domicile (pré-traitement + extraction profonde)</li>
            <li>Conseils de séchage (selon textile / ventilation)</li>
          </ol>
        </div>
      </section>

      {/* Contenu local unique */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Spécificités à {cityData.name}</h2>
        <div className="mt-3 space-y-3 max-w-3xl text-muted-foreground">
          <p>
            {cityData.seoBody?.introLocal ??
              `À ${cityData.name}, on adapte le protocole (pré-traitement + injection-extraction) à la matière et aux zones sensibles pour éviter les auréoles et garder un rendu homogène.`}
          </p>
          {cityData.seoBody?.travelHint ? <p>{cityData.seoBody.travelHint}</p> : null}
        </div>

        {/* Signaux de confiance */}
        {cityData.seoBody?.trustSignals?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {cityData.seoBody.trustSignals.map((t) => (
              <span
                key={t}
                className="rounded-full border bg-white px-3 py-1 text-sm text-slate-700">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      {/* Cas d'usage locaux */}
      {cityData.seoBody?.localUseCases?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Cas fréquents à {cityData.name}</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground max-w-3xl">
            {cityData.seoBody.localUseCases.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* CTA */}
      <section className="mt-12 rounded-2xl border bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Obtenir un devis à {cityData.name}</h2>
          <p className="mt-1 text-muted-foreground">Réponse rapide. Intervention à domicile.</p>
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

      {/* Maillage interne */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Explorer la zone {zoneData.title}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/zones/${zoneData.slug}`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Voir la page {zoneData.title}
          </Link>

          {/* Liens vers services (routes existantes) */}
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

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border bg-white p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Autres villes (dans la même zone) */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Autres villes couvertes dans {zoneData.title}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {CITIES.filter((c) => c.zoneSlug === zoneData.slug && c.slug !== cityData.slug)
            .slice(0, 18)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/zones/${zoneData.slug}/ville/${c.slug}`}
                className="rounded-xl border bg-white px-4 py-2 text-sm">
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
