// frontend/src/app/%28marketing%29/services/%5Bservice%5D/page.tsx
export const dynamic = 'force-static';

import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getService, SERVICES } from '@/lib/services';
import { ZONES } from '@/lib/zones';

type PageProps = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getService(resolvedParams.service);
  if (!service) return {};

  const base = 'https://moket.fr';
  const url = new URL(`/services/${service.slug}`, base);

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url,
      type: 'article',
      siteName: 'MOKET',
      locale: 'fr_FR',
      images: [
        {
          url: new URL('/images/og-default.jpg', base),
          width: 1200,
          height: 630,
          alt: `MOKET - ${service.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo.title,
      description: service.seo.description,
      images: [new URL('/images/og-default.jpg', base)],
    },
  };
}

function buildJsonLd(service: { title: string; slug: string; seo: { title: string; description: string }; faq: { q: string; a: string }[] }) {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/services/${service.slug}`;

  // Mapping prix "dès" (à adapter à tes slugs exacts)
  const offerBySlug: Record<string, any | null> = {
    matelas: {
      '@type': 'Offer',
      name: 'Nettoyage de matelas à domicile',
      priceCurrency: 'EUR',
      price: 90,
      url: pageUrl,
      seller: { '@id': `${base}/#localbusiness` },
    },
    'canape-tissu': {
      '@type': 'Offer',
      name: 'Nettoyage de canapé en tissu à domicile',
      priceCurrency: 'EUR',
      price: 120,
      url: pageUrl,
      seller: { '@id': `${base}/#localbusiness` },
    },
    tapis: {
      '@type': 'Offer',
      name: 'Nettoyage de tapis à domicile',
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
      name: 'Nettoyage de moquette à domicile',
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

  const offer = offerBySlug[service.slug] ?? null;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base,
        name: 'MOKET',
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.seo.title,
        description: service.seo.description,
        isPartOf: { '@id': `${base}/#website` },
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${base}/services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: pageUrl },
        ],
      },

      // ✅ On NE redéclare PAS LocalBusiness ici. On référence juste l'@id du RootLayout.
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.seo.description,
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        provider: { '@id': `${base}/#localbusiness` },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Île-de-France' },
          { '@type': 'AdministrativeArea', name: 'Normandie' },
        ],
        ...(offer ? { offers: offer } : {}),
      },

      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: { '@id': `${pageUrl}#webpage` },
        mainEntity: service.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default async function ServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = getService(resolvedParams.service);

  if (!service) notFound();

  const seoBody = service.seoBody ?? { intro2: undefined, useCases: [], limits: [], priceHint: '' };

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(service)) }}
      />

      <nav className="text-sm text-muted-foreground">
        <Link
          href="/services"
          className="hover:underline">
          Services
        </Link>{' '}
        <span aria-hidden="true">/</span> <span>{service.title}</span>
      </nav>

      <h1 className="mt-4 text-3xl lg:text-5xl font-extrabold">{service.seo.h1}</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">{service.seo.description}</p>

      {seoBody.intro2 ? <p className="mt-2 text-muted-foreground max-w-3xl">{seoBody.intro2}</p> : null}

      {seoBody.useCases.length ? (
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Cas fréquents</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground">
              {seoBody.useCases.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Résultat réaliste</h2>
            <ul className="mt-3 list-disc pl-5 text-muted-foreground">
              {seoBody.limits.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {seoBody.priceHint ? (
        <section className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Tarif indicatif</h2>
          <p className="mt-2 text-muted-foreground">{seoBody.priceHint}</p>
        </section>
      ) : null}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Ce que vous obtenez</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            {service.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Déroulé d’intervention</h2>
          <ol className="mt-3 list-decimal pl-5 text-muted-foreground">
            <li>Diagnostic (matière, couleurs, zones à risque)</li>
            <li>Pré-traitement ciblé</li>
            <li>Injection-extraction en profondeur</li>
            <li>Finition + conseils simples (séchage/entretien)</li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Obtenir un devis</h2>
          <p className="mt-1 text-muted-foreground">Réponse rapide. Photos utiles pour estimer précisément.</p>
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

      {/* ZONES -> pages locales */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Zones couvertes pour {service.title.toLowerCase()}</h2>
        <p className="mt-2 text-muted-foreground">Choisissez votre zone pour voir les modalités et créneaux (pages locales).</p>

        <div className="mt-4 flex flex-wrap gap-3">
          {ZONES.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}/${service.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {z.title}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-4">
          {service.faq.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border bg-white p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Maillage interne */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Voir aussi</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {s.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
