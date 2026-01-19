import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Clock, CreditCard, Dot, Phone, Shield, Sparkles } from 'lucide-react';
import { ZONES } from '@/lib/zones';

const SITE_URL = 'https://moket.fr';
const BRAND = 'MOKET';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

// Cadre tarifaire (IDF + Normandie) : protège ta marge et évite les cas "hors standard" au même prix.
const PRICING_RULES = {
  minIntervention: {
    tapis: { idf: 150, normandie: 120 },
    moquette: { idf: 150, normandie: 150 },
  },
  surcharges: [
    { label: 'Poils d’animaux (important)', value: '+20 €' },
    { label: 'Odeurs fortes (tabac/urine/humidité)', value: '+20 €' },
    { label: 'Encrassement important / taches multiples', value: '+20 à +40 €' },
  ],
  note: 'Tarifs valables pour un état “standard”. En cas d’encrassement important, poils d’animaux, taches multiples, odeurs fortes, textile très fragile, très grand format ou accès difficile, un ajustement peut être proposé — toujours annoncé avant intervention.',
};

const PRICES = [
  {
    title: 'Nettoyage de matelas',
    desc: 'Taches, odeurs, poussières — protocole adapté à la matière.',
    items: [
      { label: '1 place', price: '90 €' },
      { label: '2 places', price: '120 €' },
    ],
    badges: [],
    href: '/services/matelas',
    seo: { pricingKind: 'fixed' as const },
  },
  {
    title: 'Nettoyage de canapé en tissu',
    desc: 'Traces d’usage, zones grasses, odeurs : nettoyage en profondeur.',
    items: [
      { label: '2–3 places', price: '140 €' },
      { label: '4–5 places', price: '190 €' },
    ],
    badges: [],
    href: '/services/canape-tissu',
    seo: { pricingKind: 'fixed' as const },
  },
  {
    title: 'Nettoyage de tapis',
    desc: 'Nettoyage des fibres + finition uniforme.',
    items: [{ label: 'Prix au m²', price: '35 €/m²' }],
    badges: [`Minimum IDF : ${PRICING_RULES.minIntervention.tapis.idf} €`, `Minimum Normandie : ${PRICING_RULES.minIntervention.tapis.normandie} €`],
    href: '/services/tapis',
    seo: { pricingKind: 'per_sqm' as const },
  },
  {
    title: 'Nettoyage de moquette',
    desc: 'Surfaces, pièces, bureaux — devis au m².',
    items: [{ label: 'Prix au m²', price: '12 €/m²' }],
    badges: [`Minimum IDF : ${PRICING_RULES.minIntervention.moquette.idf} €`, `Minimum Normandie : ${PRICING_RULES.minIntervention.moquette.normandie} €`],
    href: '/services/moquette',
    seo: { pricingKind: 'per_sqm' as const },
  },
] as const;

const FAQS = [
  {
    q: 'Les tarifs sont-ils vraiment fixes ?',
    a: `Oui pour les prestations standard listées (matelas, canapés, tapis, moquettes). ${PRICING_RULES.note} Dans tous les cas, on annonce un prix clair avant intervention.`,
  },
  {
    q: 'Qu’est-ce qui influence le prix final ?',
    a: 'Principalement : taille/surface, état (encrassement, tâches multiples), type de fibres, et temps d’intervention. Pour les moquettes/tapis, le chiffrage se fait au m². Le devis photo évite les mauvaises surprises.',
  },
  {
    q: 'Dois-je prévoir quelque chose avant votre arrivée ?',
    a: 'Idéalement : dégager l’accès à la zone, aspirer rapidement si possible, et nous signaler les taches/odeurs spécifiques. On protège les lieux et on vous guide sur place.',
  },
  {
    q: 'Combien de temps dure une prestation ?',
    a: 'En général : matelas ou canapé 45 min à 1h30. Tapis/moquette : selon surface et état. On vous donne une estimation réaliste au moment du devis.',
  },
  {
    q: 'Le textile est-il sec en partant ?',
    a: 'Grâce à l’extraction, on limite fortement l’eau résiduelle. Le séchage complet prend souvent quelques heures selon aération/chauffage et humidité ambiante. On vous donne des conseils simples pour sécher vite et bien.',
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Nous acceptons généralement les paiements les plus courants (espèces ou virement, et/ou selon organisation). Si vous avez une contrainte spécifique, dites-le au moment du devis.',
  },
];

export const metadata: Metadata = {
  title: 'Tarifs nettoyage canapé, matelas, tapis & moquette | MOKET',
  description:
    'Tarifs clairs et prestations de nettoyage textile à domicile (canapé tissu, matelas, tapis, moquette) par injection-extraction. Intervention en Île-de-France et Normandie. Devis rapide sur photos.',
  alternates: { canonical: `${SITE_URL}/tarifs` },
  openGraph: {
    title: 'Tarifs nettoyage textile à domicile | MOKET',
    description: 'Tarifs clairs (matelas, canapé tissu, tapis, moquette). Devis rapide sur photos. Intervention Île-de-France & Normandie.',
    url: `${SITE_URL}/tarifs`,
    type: 'website',
  },
};

export default function TarifsPage() {
  const pageUrl = `${SITE_URL}/tarifs`;

  // Helpers prix -> chiffres (utile pour Offer.price quand possible)
  const toNumber = (s: string) => {
    const n = Number(
      String(s)
        .replace(/[^\d,]/g, '')
        .replace(',', '.'),
    );
    return Number.isFinite(n) ? n : undefined;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Tarifs',
        description:
          'Tarifs clairs et prestations de nettoyage textile à domicile (canapé tissu, matelas, tapis, moquette) par injection-extraction. Intervention en Île-de-France et Normandie. Devis rapide sur photos.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: [{ '@id': `${pageUrl}#offercatalog` }, { '@id': `${pageUrl}#faq` }],
        potentialAction: [
          { '@type': 'Action', name: 'Demander un devis', target: `${SITE_URL}/devis` },
          { '@type': 'CommunicateAction', name: 'Appeler', target: `tel:${PHONE}` },
        ],
      },

      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tarifs', item: pageUrl },
        ],
      },

      // Catalogue d'offres (propre + exploitable par Google)
      {
        '@type': 'OfferCatalog',
        '@id': `${pageUrl}#offercatalog`,
        name: 'Tarifs MOKET',
        url: pageUrl,
        itemListElement: PRICES.map((p, idx) => {
          const numericPrices = p.items.map((it) => toNumber(it.price)).filter((x): x is number => typeof x === 'number');

          const isPerSqm = p.seo?.pricingKind === 'per_sqm';

          return {
            '@type': 'Offer',
            position: idx + 1,
            url: `${SITE_URL}${p.href}`,
            priceCurrency: 'EUR',
            // Pour les prix au m² : éviter de mettre un "price" trompeur.
            price: !isPerSqm && p.items.length === 1 ? numericPrices[0] : undefined,
            priceSpecification:
              !isPerSqm && numericPrices.length > 1
                ? {
                    '@type': 'PriceSpecification',
                    priceCurrency: 'EUR',
                    minPrice: Math.min(...numericPrices),
                    maxPrice: Math.max(...numericPrices),
                  }
                : undefined,
            itemOffered: {
              '@type': 'Service',
              name: p.title,
              description: p.desc,
              provider: { '@id': `${SITE_URL}/#localbusiness` },
              areaServed: ['Île-de-France', 'Normandie'],
              url: `${SITE_URL}${p.href}`,
              additionalProperty: [
                ...p.items.map((it) => ({
                  '@type': 'PropertyValue',
                  name: it.label,
                  value: it.price,
                })),
                ...(p.badges?.map((b) => ({
                  '@type': 'PropertyValue',
                  name: 'Conditions',
                  value: b,
                })) ?? []),
              ],
            },
          };
        }),
      },

      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: { '@id': `${pageUrl}#webpage` },
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      {/* JSON-LD unique */}
      <Script
        id="jsonld-tarifs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="grid gap-6 md:gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-5xl font-extrabold -tracking-normal">Tarifs nettoyage canapé, matelas, tapis & moquette</h1>
          <p className="text-muted-foreground max-w-3xl">
            Des prix <strong>clairs</strong> et des prestations <strong>professionnelles</strong> : pré-traitement, injection-extraction, finition et conseils de séchage. Intervention à domicile en{' '}
            <strong>Île-de-France</strong> et <strong>Normandie</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            variant="accent"
            className="rounded-full">
            <Link href="/devis">Demander un devis (avec photos)</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> Appeler le {PHONE_DISPLAY}
            </a>
          </Button>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Dot className="h-6 w-6" /> Prix annoncé avant intervention
          </li>
          <li className="flex items-center gap-2">
            <Dot className="h-6 w-6" /> Résultat visible dès la fin
          </li>
          <li className="flex items-center gap-2">
            <Dot className="h-6 w-6" /> Produits adaptés au textile
          </li>
          <li className="flex items-center gap-2">
            <Dot className="h-6 w-6" /> Intervention propre & protégée
          </li>
        </ul>
      </section>

      {/* PRICING GRID */}
      <section className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold">Grille tarifaire</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl">Pour un chiffrage précis (matière, surface, taches), envoie 2–3 photos : vue d’ensemble + zone(s) concernée(s).</p>

        <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-5">
          <p className="text-sm text-muted-foreground">
            <strong>Cadre :</strong> {PRICING_RULES.note}
          </p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {PRICING_RULES.surcharges.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-white px-4 py-3 text-sm flex items-center justify-between">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">* Les minimums d’intervention s’appliquent surtout aux tapis/moquettes (déplacement + mise en place + protection).</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRICES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>

                  {p.badges?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.badges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-full shrink-0">
                  <Link href={p.href}>Voir</Link>
                </Button>
              </div>

              <div className="mt-5 space-y-2">
                {p.items.map((it) => (
                  <div
                    key={`${p.title}-${it.label}`}
                    className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
                    <span className="text-sm text-muted-foreground">{it.label}</span>
                    <span className="font-semibold">{it.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col mx-auto justify-center sm:flex-row gap-3">
                <Button
                  asChild
                  variant="accent"
                  className="rounded-full w-fit">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-fit">
                  <a href={`tel:${PHONE}`}>Appeler</a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6">
          <p className="text-sm text-muted-foreground">
            <strong>Important :</strong> les décolorations, brûlures ou migrations de teinture peuvent ne pas disparaître totalement. En revanche, l’encrassement et la majorité des taches du quotidien
            sont généralement éliminés avec un protocole adapté.
          </p>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="mt-12 md:mt-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold">Ce qui est inclus</h2>
            <p className="mt-2 text-muted-foreground text-sm">Une prestation professionnelle : savoir-faire + méthode + protection + finition.</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Diagnostic (matière, couleurs, zones à risque)
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Pré-traitement ciblé (taches, zones grasses, odeurs)
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Injection-extraction (nettoyage en profondeur + extraction immédiate)
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Finition + homogénéisation du rendu
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Protection des lieux + intervention propre
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Conseils de séchage (aérer, chauffer légèrement, circulation d’air)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold">Pourquoi un devis photo ?</h2>
            <p className="mt-2 text-muted-foreground text-sm">Pour annoncer le bon prix, on a besoin d’éléments concrets. C’est rapide et ça évite les surprises.</p>

            <div className="mt-6 grid gap-3">
              <MiniCard
                icon={<Sparkles className="h-4 w-4" />}
                title="État réel du textile"
                text="Encrassement, taches multiples, auréoles, odeurs : ça change le temps de travail."
              />
              <MiniCard
                icon={<Shield className="h-4 w-4" />}
                title="Matière & fragilité"
                text="Certaines fibres demandent un protocole plus doux et plus long."
              />
              <MiniCard
                icon={<Clock className="h-4 w-4" />}
                title="Temps d’intervention"
                text="Le prix suit la réalité opérationnelle : temps + méthode + finition."
              />
              <MiniCard
                icon={<CreditCard className="h-4 w-4" />}
                title="Prix clair"
                text="On te dit le prix avant, tu décides. Point."
              />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                asChild
                variant="accent"
                className="rounded-full w-58">
                <Link href="/devis">Envoyer des photos</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full w-58">
                <Link href="/notre-methode">Voir la méthode</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold">Zones d’intervention</h2>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          Nous intervenons en <strong>Île-de-France</strong> et en <strong>Normandie</strong>. Consulte ta zone pour les modalités et délais.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {ZONES.map((z) => (
            <Link
              key={z.slug}
              href={`/zones/${z.slug}`}
              className="rounded-xl border bg-white px-4 py-2 text-sm">
              {z.title}
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Button
            asChild
            variant="outline"
            className="rounded-full">
            <Link href="/zones">Toutes les zones</Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 md:mt-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">FAQ Tarifs</h2>
          <p className="mt-2 text-muted-foreground">Les questions qu’on te pose le plus avant de réserver.</p>
        </div>

        <div className="mt-8 max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="w-full">
            {FAQS.map((f, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-b border-slate-200/70">
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-slate-700">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            variant="accent"
            className="rounded-full">
            <Link href="/devis">Demander un devis</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full">
            <a href={`tel:${PHONE}`}>Appeler le {PHONE_DISPLAY}</a>
          </Button>
        </div>
      </section>
    </main>
  );
}

function MiniCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-primary">{icon}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  );
}
