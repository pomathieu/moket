// frontend/src/app/%28marketing%29/services/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { SERVICES } from '@/lib/services';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Services de nettoyage textile à domicile | MOKET',
  description: 'Découvrez les services MOKET : nettoyage de matelas, canapé en tissu, tapis et moquette à domicile. Méthode injection-extraction, devis rapide.',
  alternates: { canonical: 'https://moket.fr/services' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Services de nettoyage textile à domicile | MOKET',
    description: 'Nettoyage de matelas, canapé en tissu, tapis et moquette à domicile. Méthode injection-extraction, devis rapide.',
    url: 'https://moket.fr/services',
    type: 'website',
    siteName: 'MOKET',
    locale: 'fr_FR',
  },
};

const HUB = {
  useCases: ['Taches du quotidien (boissons, nourriture)', 'Odeurs (animaux, tabac, transpiration)', 'Auréoles / traces d’usage', 'Textiles ternis, encrassés (zones de passage)'],
  limits: ['Décolorations et brûlures (ce n’est pas une tache)', 'Certaines taches très anciennes “fixées”', 'Fibres endommagées par usure (on améliore, sans “réparer”)'],
  priceHint: 'Le tarif dépend du textile, des dimensions/surfaces et de l’état. Le plus efficace : envoyer 2–3 photos + dimensions approximatives pour un devis clair.',
};

const LOCAL_LINKS = [
  { label: 'Paris', zone: 'paris' },
  { label: 'Hauts-de-Seine', zone: 'hauts-de-seine' },
  { label: 'Val-de-Marne', zone: 'val-de-marne' },
];

const base = 'https://moket.fr';
const pageUrl = `${base}/services`;

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'Services de nettoyage textile à domicile',
      isPartOf: { '@id': `${base}/#website` },
      inLanguage: 'fr-FR',
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: pageUrl },
      ],
    },
    // ✅ Liste des services
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#services`,
      name: 'Liste des services',
      itemListElement: SERVICES.map((s, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: s.title,
        url: `${base}/services/${s.slug}`,
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <h1 className="text-3xl lg:text-5xl font-extrabold">Services de nettoyage textile à domicile</h1>

      <p className="mt-3 text-muted-foreground max-w-3xl">
        Nettoyage textile à domicile par <strong>injection-extraction</strong>. On adapte le protocole selon la matière, la couleur et le type de salissures pour un résultat net.
      </p>

      {/* SEO hub (global, pas par service) */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Cas fréquents</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            {HUB.useCases.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Résultat réaliste</h2>
          <ul className="mt-3 list-disc pl-5 text-muted-foreground">
            {HUB.limits.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-semibold">Tarif indicatif</h2>
        <p className="mt-2 text-muted-foreground">{HUB.priceHint}</p>
      </section>

      {/* Services grid */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Choisir un service</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              className="rounded-2xl border bg-white p-6 transition hover:shadow-sm">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>

              <div className="mt-4">
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-slate-700 underline underline-offset-4">
                  Voir le service
                </Link>
              </div>

              {/* ✅ Maillage vers pages locales (crawl + SEO local) */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-700">Exemples par zone</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {LOCAL_LINKS.map((z) => (
                    <Link
                      key={`${z.zone}-${s.slug}`}
                      href={`/zones/${z.zone}/${s.slug}`}
                      className="rounded-full border bg-white px-3 py-1 text-xs text-slate-700 hover:bg-muted">
                      {z.label}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border bg-white p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Obtenir un devis</h2>
          <p className="mt-1 text-muted-foreground">Envoie 2–3 photos (vue d’ensemble + zone) : réponse rapide.</p>
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

      {/* Micro-FAQ hub */}
      <section className="mt-12 pb-12 max-w-3xl">
        <h2 className="text-xl font-semibold">Questions fréquentes</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold">Quels textiles nettoyez-vous à domicile ?</h3>
            <p className="mt-2 text-muted-foreground">
              Nous nettoyons les matelas, canapés en tissu, tapis et moquettes avec une méthode d’injection-extraction. Pour les autres textiles (canapés en cuir, fauteuils, rideaux, etc.),
              contactez-nous pour un devis personnalisé.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Comment prendre soin de mes textiles après le nettoyage ?</h3>
            <p className="mt-2 text-muted-foreground">
              Évitez l’exposition directe au soleil et l’humidité excessive. Aérez régulièrement la pièce et utilisez des housses de protection pour prolonger la propreté de vos textiles.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
