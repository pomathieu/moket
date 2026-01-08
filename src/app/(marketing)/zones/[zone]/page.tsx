// frontend/src/app/%28marketing%29/zones/%5Bzone%5D/page.tsx
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getZone, ZONES } from '@/lib/zones';

type PageProps = { params: Promise<{ zone: string }> };

export function generateStaticParams() {
  return ZONES.map((z) => ({ zone: z.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zone } = await params;
  const zoneData = getZone(zone);
  if (!zoneData) return {};

  const base = 'https://moket.fr';
  const url = new URL(`/zones/${zoneData.slug}`, base);

  return {
    title: zoneData.seo.title,
    description: zoneData.seo.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: zoneData.seo.title,
      description: zoneData.seo.description,
      url,
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
      title: zoneData.seo.title,
      description: zoneData.seo.description,
      images: [new URL('/images/og-default.jpg', base)],
    },
  };
}

function buildFaq(zoneTitle: string) {
  return [
    {
      q: `Intervenez-vous bien à domicile à ${zoneTitle} ?`,
      a: `Oui, nous intervenons à domicile à ${zoneTitle} selon les créneaux disponibles.`,
    },
    {
      q: `Quels services proposez-vous à ${zoneTitle} ?`,
      a: `Nettoyage matelas, canapé en tissu, tapis et moquette, avec extraction profonde.`,
    },
    {
      q: `Comment obtenir un devis ?`,
      a: `Vous pouvez demander un devis en ligne. Réponse rapide avec estimation et créneaux.`,
    },
  ];
}

function buildJsonLd(zoneTitle: string, zoneSlug: string) {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/zones/${zoneSlug}`;
  const faq = buildFaq(zoneTitle);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Zone d’intervention : ${zoneTitle}`,
        isPartOf: { '@id': `${base}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${base}/zones` },
          { '@type': 'ListItem', position: 3, name: zoneTitle, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `Nettoyage textile à domicile à ${zoneTitle}`,
        provider: { '@id': `${base}/#localbusiness` },
        areaServed: { '@type': 'AdministrativeArea', name: zoneTitle },
        serviceType: ['Nettoyage matelas', 'Nettoyage canapé tissu', 'Nettoyage tapis', 'Nettoyage moquette'],
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
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

export default async function ZonePage({ params }: PageProps) {
  const { zone } = await params;
  const zoneData = getZone(zone);
  if (!zoneData) notFound();

  const faq = buildFaq(zoneData.title);

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-zone"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(zoneData.title, zoneData.slug)) }}
      />

      <nav className="text-sm text-muted-foreground">
        <Link
          href="/zones"
          className="hover:underline">
          Zones
        </Link>{' '}
        <span aria-hidden="true">/</span> <span>{zoneData.title}</span>
      </nav>

      <h1 className="mt-4 text-3xl lg:text-5xl font-extrabold">{zoneData.seo.h1}</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">{zoneData.seo.description}</p>

      {/* Blocs SEO utiles */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Ce que nous nettoyons</h2>
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
            <li>Vous demandez un devis (photos + dimensions si possible)</li>
            <li>Validation + choix d’un créneau</li>
            <li>Intervention à domicile (extraction profonde)</li>
            <li>Séchage (variable selon textile / ventilation)</li>
          </ol>
        </div>
      </section>

      {/* Villes / couverture */}
      {zoneData.cities?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Villes couvertes</h2>
          <p className="mt-2 text-muted-foreground">Exemples de secteurs dans {zoneData.title} :</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {zoneData.cities.map((c) => (
              <span
                key={c}
                className="rounded-full border bg-white px-3 py-1 text-sm text-slate-700">
                {c}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA + liens internes */}
      <section className="mt-12 rounded-2xl border bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Obtenir un devis pour {zoneData.title}</h2>
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

      {/* FAQ SEO */}
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

      {/* Maillage vers autres zones */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Autres zones</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {ZONES.filter((z) => z.slug !== zoneData.slug)
            .slice(0, 6)
            .map((z) => (
              <Link
                key={z.slug}
                href={`/zones/${z.slug}`}
                className="rounded-xl border bg-white px-4 py-2 text-sm">
                {z.title}
              </Link>
            ))}
          <Link
            href="/zones"
            className="rounded-xl border bg-white px-4 py-2 text-sm">
            Toutes les zones
          </Link>
        </div>
      </section>

      {/* Services populaires */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Services à {zoneData.title}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
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

        {/* Bonus : liens génériques vers les pages "services" */}
        <p className="mt-3 text-sm text-muted-foreground">
          Vous pouvez aussi consulter les pages services générales :{' '}
          <Link
            className="underline underline-offset-4"
            href="/services">
            tous les services
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
