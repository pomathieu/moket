// frontend/src/app/%28marketing%29/zones/%5Bzone%5D/%5Bservice%5D/page.tsx
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getZone, ZONES } from '@/lib/zones';
import { getService, SERVICES } from '@/lib/services';

type PageProps = { params: Promise<{ zone: string; service: string }> };

export function generateStaticParams() {
  return ZONES.flatMap((z) => SERVICES.map((s) => ({ zone: z.slug, service: s.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const zone = getZone(resolvedParams.zone);
  const service = getService(resolvedParams.service);
  if (!zone || !service) return {};

  const base = 'https://moket.fr';
  const url = new URL(`/zones/${zone.slug}/${service.slug}`, base);

  const title = `${service.title} à ${zone.title} | MOKET`;
  const description = `Intervention à domicile à ${zone.title} : ${service.title.toLowerCase()}. Méthode injection-extraction, devis rapide, créneaux flexibles.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { 'fr-FR': url.toString() },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'MOKET',
      locale: 'fr_FR',
      images: [
        {
          url: new URL('/images/og-default.jpg', base),
          width: 1200,
          height: 630,
          alt: `MOKET - ${service.title} - ${zone.title}`,
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

function buildLocalFaq(zoneTitle: string, serviceTitle: string) {
  return [
    {
      q: `Intervenez-vous à domicile pour ${serviceTitle.toLowerCase()} à ${zoneTitle} ?`,
      a: `Oui, nous intervenons à domicile à ${zoneTitle}. Les créneaux dépendent du planning de tournée : demandez un devis pour une proposition rapide.`,
    },
    {
      q: `Combien de temps dure une intervention ?`,
      a: `Selon la taille et l’état du textile. En général, comptez entre 45 minutes et 1h30. On vous donne une estimation au devis.`,
    },
    {
      q: `En combien de temps ça sèche ?`,
      a: `Le séchage varie selon la matière, l’aération et l’humidité. Grâce à l’extraction, l’eau résiduelle est limitée et on vous conseille pour accélérer.`,
    },
  ];
}

function jsonLd(zoneTitle: string, zoneSlug: string, serviceTitle: string, serviceSlug: string, zoneShortNote?: string) {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/zones/${zoneSlug}/${serviceSlug}`;
  const faq = buildLocalFaq(zoneTitle, serviceTitle);

  // ✅ Offer (prix) selon le service (adapte tes slugs si besoin)
  const offerBySlug: Record<string, any | null> = {
    matelas: {
      '@type': 'Offer',
      name: `Nettoyage de matelas à domicile à ${zoneTitle}`,
      priceCurrency: 'EUR',
      price: 90,
      url: pageUrl,
      seller: { '@id': `${base}/#localbusiness` },
    },
    'canape-tissu': {
      '@type': 'Offer',
      name: `Nettoyage de canapé en tissu à domicile à ${zoneTitle}`,
      priceCurrency: 'EUR',
      price: 120,
      url: pageUrl,
      seller: { '@id': `${base}/#localbusiness` },
    },
    tapis: {
      '@type': 'Offer',
      name: `Nettoyage de tapis à domicile à ${zoneTitle}`,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 30,
        priceCurrency: 'EUR',
        unitText: 'm²',
      },
      url: pageUrl,
      seller: { '@id': `${base}/#localbusiness` },
    },
    moquette: {
      '@type': 'Offer',
      name: `Nettoyage de moquette à domicile à ${zoneTitle}`,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 9,
        priceCurrency: 'EUR',
        unitText: 'm²',
      },
      url: pageUrl,
      seller: { '@id': `${base}/#localbusiness` },
    },
  };

  const offer = offerBySlug[serviceSlug] ?? null;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage (page locale)
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${serviceTitle} à ${zoneTitle}`,
        isPartOf: { '@id': `${base}/#website` },
        inLanguage: 'fr-FR',
        mainEntity: { '@id': `${pageUrl}#service` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` }, // ✅ optionnel mais propre
      },

      // ✅ Breadcrumbs (avec Accueil)
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${base}/zones` },
          { '@type': 'ListItem', position: 3, name: zoneTitle, item: `${base}/zones/${zoneSlug}` },
          { '@type': 'ListItem', position: 4, name: serviceTitle, item: pageUrl },
        ],
      },

      // ✅ Service localisé (référence LocalBusiness via @id uniquement)
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${serviceTitle} à ${zoneTitle}`,
        serviceType: serviceTitle,
        areaServed: { '@type': 'AdministrativeArea', name: zoneTitle },
        provider: { '@id': `${base}/#localbusiness` }, // ✅ reference only
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        ...(offer ? { offers: offer } : {}), // ✅ Offer = prix
        ...(zoneShortNote ? { slogan: zoneShortNote } : {}),
      },

      // FAQ locale (lié à la page)
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

export default async function ZoneServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const zone = getZone(resolvedParams.zone);
  const service = getService(resolvedParams.service);
  if (!zone || !service) notFound();

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-zone-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(zone.title, zone.slug, service.title, service.slug, zone.shortNote)) }}
      />

      <nav className="text-sm text-muted-foreground">
        <Link
          href="/zones"
          className="hover:underline">
          Zones
        </Link>{' '}
        {' / '}
        <Link
          href={`/zones/${zone.slug}`}
          className="hover:underline">
          {zone.title}
        </Link>{' '}
        {' / '}
        <span>{service.title}</span>
      </nav>

      <h1 className="mt-4 text-3xl lg:text-5xl font-extrabold">
        {service.title} dans {zone.title}
      </h1>

      {zone.shortNote ? (
        <p className="mt-2 text-sm text-slate-700">
          <strong>Info zone :</strong> {zone.shortNote}
        </p>
      ) : null}
      <p className="mt-2 text-muted-foreground max-w-3xl">
        À {zone.title}, on adapte le protocole (pré-traitement + extraction) à la matière et aux zones sensibles.
        {zone.shortNote ? ` ${zone.shortNote}` : ''}
      </p>

      {zone.cities?.length ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Villes couvertes (exemples)</h2>
          <p className="mt-2 text-muted-foreground">Exemples de secteurs dans {zone.title} :</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {zone.cities.map((c) => (
              <span
                key={c}
                className="rounded-full border bg-white px-3 py-1 text-sm text-slate-700">
                {c}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {zone.seoBody?.introLocal ? (
        <p className="mt-2 text-muted-foreground max-w-3xl">{zone.seoBody.introLocal}</p>
      ) : (
        <p className="mt-2 text-muted-foreground max-w-3xl">
          À {zone.title}, on adapte le protocole (pré-traitement + extraction) à la matière et aux zones sensibles pour éviter les auréoles et garder un rendu homogène.
        </p>
      )}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Ce que vous obtenez</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            <li>Nettoyage en profondeur des fibres</li>
            <li>Réduction des odeurs et salissures incrustées</li>
            <li>Rendu homogène + conseils de séchage</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Délais & créneaux à {zone.title}</h2>
          <p className="mt-3 text-muted-foreground">{zone.shortNote ? zone.shortNote : 'Les disponibilités varient selon la tournée. Demandez un devis : on vous propose un créneau adapté.'}</p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Demander un devis</h2>
          <p className="mt-1 text-muted-foreground">Réponse rapide pour {zone.title}.</p>
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

      <section className="mt-12">
        <h2 className="text-xl font-semibold">En savoir plus</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/services/${service.slug}`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Voir la page {service.title.toLowerCase()}
          </Link>
          <Link
            href={`/zones/${zone.slug}`}
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Voir la zone {zone.title}
          </Link>
        </div>
      </section>
    </main>
  );
}
