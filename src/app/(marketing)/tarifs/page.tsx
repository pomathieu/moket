import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Check,
  Clock,
  CreditCard,
  Phone,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BedDouble,
  Sofa,
  RectangleHorizontal,
  Grid3X3,
  Info,
  MapPin,
  FileText,
  Zap,
  Eye,
  Droplets,
  Star,
} from 'lucide-react';
import { ZONES } from '@/lib/zones';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

const PRICING_RULES = {
  minIntervention: {
    tapis: { idf: 150, normandie: 120 },
    moquette: { idf: 150, normandie: 150 },
  },
  surcharges: [
    { label: 'Traitement renforcé', desc: 'Poils, odeurs légères', value: '+20 €' },
    { label: 'Traitement intensif', desc: 'Encrassement important, taches multiples, odeurs fortes', value: '+40 €' },
  ],
  note: 'Tarifs valables pour un état standard. En cas de traitement renforcé ou intensif, un ajustement peut être proposé après évaluation, toujours annoncé et validé avant intervention.',
};

const PRICES = [
  {
    title: 'Nettoyage de matelas',
    desc: 'Taches, odeurs, poussières — protocole adapté à la matière.',
    icon: BedDouble,
    color: 'teal',
    items: [
      { label: '1 place', price: '90 €', priceNum: 90 },
      { label: '2 places', price: '120 €', priceNum: 120 },
    ],
    badges: [],
    href: '/services/matelas',
    seo: { pricingKind: 'fixed' as const },
  },
  {
    title: 'Nettoyage de canapé en tissu',
    desc: "Traces d'usage, zones grasses, odeurs : nettoyage en profondeur.",
    icon: Sofa,
    color: 'emerald',
    items: [
      { label: '2–3 places', price: '140 €', priceNum: 140 },
      { label: '4–5 places', price: '190 €', priceNum: 190 },
    ],
    badges: [],
    href: '/services/canape-tissu',
    seo: { pricingKind: 'fixed' as const },
  },
  {
    title: 'Nettoyage de tapis',
    desc: 'Nettoyage des fibres + finition uniforme.',
    icon: RectangleHorizontal,
    color: 'cyan',
    items: [{ label: 'Prix au m²', price: '30 €/m²', priceNum: 30 }],
    badges: [`Minimum IDF : ${PRICING_RULES.minIntervention.tapis.idf} €`, `Minimum Normandie : ${PRICING_RULES.minIntervention.tapis.normandie} €`],
    href: '/services/tapis',
    seo: { pricingKind: 'per_sqm' as const },
  },
  {
    title: 'Nettoyage de moquette',
    desc: 'Surfaces, pièces, bureaux — devis au m².',
    icon: Grid3X3,
    color: 'sky',
    items: [{ label: 'Prix au m²', price: '12 €/m²', priceNum: 12 }],
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
    q: "Qu'est-ce qui influence le prix final ?",
    a: "Principalement : taille/surface, état (encrassement, tâches multiples), type de fibres, et temps d'intervention. Pour les moquettes/tapis, le chiffrage se fait au m². Le devis photo évite les mauvaises surprises.",
  },
  {
    q: 'Dois-je prévoir quelque chose avant votre arrivée ?',
    a: "Idéalement : dégager l'accès à la zone, aspirer rapidement si possible, et nous signaler les taches/odeurs spécifiques. On protège les lieux et on vous guide sur place.",
  },
  {
    q: 'Combien de temps dure une prestation ?',
    a: 'En général : matelas ou canapé 45 min à 1h30. Tapis/moquette : selon surface et état. On vous donne une estimation réaliste au moment du devis.',
  },
  {
    q: 'Le textile est-il sec en partant ?',
    a: "Grâce à l'extraction, on limite fortement l'eau résiduelle. Le séchage complet prend souvent quelques heures selon aération/chauffage et humidité ambiante. On vous donne des conseils simples pour sécher vite et bien.",
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Nous acceptons généralement les paiements les plus courants (espèces ou virement, et/ou selon organisation). Si vous avez une contrainte spécifique, dites-le au moment du devis.',
  },
];

const INCLUDED = [
  { icon: Eye, text: 'Diagnostic (matière, couleurs, zones à risque)' },
  { icon: Zap, text: 'Pré-traitement ciblé (taches, zones grasses, odeurs)' },
  { icon: Droplets, text: 'Injection-extraction (nettoyage en profondeur)' },
  { icon: Sparkles, text: 'Finition + homogénéisation du rendu' },
  { icon: Shield, text: 'Protection des lieux + intervention propre' },
  { icon: Clock, text: 'Conseils de séchage personnalisés' },
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
        description: 'Tarifs clairs et prestations de nettoyage textile à domicile (canapé tissu, matelas, tapis, moquette) par injection-extraction. Intervention en Île-de-France et Normandie.',
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
      {
        '@type': 'OfferCatalog',
        '@id': `${pageUrl}#offercatalog`,
        name: 'Tarifs MOKET',
        url: pageUrl,
        itemListElement: PRICES.map((p, idx) => {
          const numericPrices = p.items.map((it) => it.priceNum);
          const isPerSqm = p.seo?.pricingKind === 'per_sqm';
          return {
            '@type': 'Offer',
            position: idx + 1,
            url: `${SITE_URL}${p.href}`,
            priceCurrency: 'EUR',
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
    <>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl md:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25">
              <Link href="/devis">
                <FileText className="h-4 w-4 mr-2" />
                Devis gratuit
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2">
              <a href={`tel:${PHONE}`}>
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </a>
            </Button>
          </div>
        </div>
      </div>

      <main className="overflow-x-hidden pb-24 md:pb-0">
        <Script
          id="jsonld-tarifs"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* HERO */}
        <section
          className="relative py-8 md:py-20 overflow-hidden"
          aria-labelledby="tarifs-title">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-160 h-160 bg-linear-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-120 h-120 bg-linear-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors">
                Accueil
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Tarifs</span>
            </nav>
            <div className="max-w-3xl">
              {/* Badge 
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700">Prix transparents</span>
              </div>
*/}
              <h1
                id="tarifs-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                Tarifs{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">clairs et fixes</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full" />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                Des prix <strong className="text-foreground">annoncés avant intervention</strong>. Nettoyage professionnel de{' '}
                <strong className="text-foreground">canapés, matelas, tapis et moquettes</strong> en Île-de-France et Normandie.
              </p>

              {/* CTA buttons - Desktop */}
              <div className="mt-8 hidden md:flex flex-wrap gap-4 animate-fade-in-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
                  <Link href="/devis">
                    Demander un devis
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 text-base font-semibold border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all">
                  <a href={`tel:${PHONE}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in-up">
                {['Prix annoncé avant', 'Résultat visible', 'Sans surprise'].map((text) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-600" />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING GRID */}
        <section
          className="py-16 md:py-24 bg-muted/30"
          aria-labelledby="pricing-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <CreditCard className="h-4 w-4 mr-2" />
                Grille tarifaire
              </Badge>
              <h2
                id="pricing-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Nos tarifs par prestation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Pour un chiffrage précis, envoyez 2–3 photos : vue d'ensemble + zone(s) concernée(s).</p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRICES.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={cn(
                      'group relative rounded-3xl bg-card p-6 md:p-8',
                      'border border-border/80 overflow-hidden',
                      'transition-all duration-500',
                      'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-border hover:-translate-y-1',
                    )}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price items */}
                      <div className="space-y-3 mb-6">
                        {p.items.map((item) => (
                          <div
                            key={`${p.title}-${item.label}`}
                            className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200/80 px-5 py-4 transition-colors group-hover:bg-white">
                            <span className="text-muted-foreground font-medium">{item.label}</span>
                            <span className="text-2xl font-black text-emerald-600">{item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Badges (minimums) */}
                      {p.badges?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.badges.map((b) => (
                            <span
                              key={b}
                              className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1.5 text-xs text-amber-700">
                              <Info className="h-3 w-3" />
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          asChild
                          className="flex-1 rounded-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                          <Link href="/devis">
                            Devis gratuit
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="rounded-full border-2">
                          <Link href={p.href}>Détails</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Surcharges info */}
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Ajustements possibles</h3>
                  <p className="text-sm text-muted-foreground mt-1">{PRICING_RULES.note}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {PRICING_RULES.surcharges.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-200/80 px-5 py-4">
                    <div>
                      <span className="font-semibold text-foreground">{s.label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                    <span className="font-bold text-amber-600 text-lg">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED + WHY PHOTO */}
        <section className="py-16 md:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* What's included */}
              <div className="rounded-3xl border border-border bg-linear-to-br from-emerald-600 to-teal-600 p-8 text-white shadow-xl shadow-emerald-600/20">
                <h2 className="text-2xl md:text-3xl font-black">Ce qui est inclus</h2>
                <p className="mt-2 text-emerald-100">Une prestation professionnelle complète, de A à Z.</p>

                <ul className="mt-8 space-y-4">
                  {INCLUDED.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="pt-2">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full w-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg">
                    <Link href="/notre-methode">
                      Voir notre méthode
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Why photo quote */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-lg shadow-slate-200/30">
                <h2 className="text-2xl md:text-3xl font-black text-foreground">Pourquoi un devis photo ?</h2>
                <p className="mt-2 text-muted-foreground">Pour annoncer le bon prix, on a besoin d'éléments concrets.</p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: Eye,
                      title: 'État réel du textile',
                      desc: 'Encrassement, taches multiples, auréoles : ça change le temps de travail.',
                    },
                    {
                      icon: Shield,
                      title: 'Matière & fragilité',
                      desc: 'Certaines fibres demandent un protocole plus doux et plus long.',
                    },
                    {
                      icon: Clock,
                      title: "Temps d'intervention",
                      desc: 'Le prix suit la réalité : temps + méthode + finition.',
                    },
                    {
                      icon: CreditCard,
                      title: 'Prix clair',
                      desc: 'On vous dit le prix avant, vous décidez. Point.',
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 p-4 rounded-2xl border border-border bg-slate-50 transition-all hover:bg-white hover:shadow-md hover:-translate-y-0.5">
                        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 transition-transform group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                    <Link href="/devis">
                      Envoyer mes photos
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Important note */}
            <div className="mt-8 rounded-2xl border border-amber-200/50 bg-amber-50/50 p-6">
              <p className="text-sm text-amber-900">
                <strong>À noter :</strong> les décolorations, brûlures ou migrations de teinture peuvent ne pas disparaître totalement. En revanche, l'encrassement et la majorité des taches du
                quotidien sont généralement éliminés avec un protocole adapté.
              </p>
            </div>
          </div>
        </section>

        {/* ZONES */}
        <section
          className="py-16 md:py-24 bg-muted/30"
          aria-labelledby="zones-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-8">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                Zones d'intervention
              </Badge>
              <h2
                id="zones-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                On intervient près de chez vous
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Intervention à domicile en <strong className="text-foreground">Île-de-France</strong> et en <strong className="text-foreground">Normandie</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {ZONES.map((z) => (
                <Button
                  key={z.slug}
                  asChild
                  variant="outline"
                  className="rounded-full border-2 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all">
                  <Link href={`/zones/${z.slug}`}>{z.title}</Link>
                </Button>
              ))}
              <Button
                asChild
                className="rounded-full bg-slate-900 hover:bg-slate-800 text-white">
                <Link href="/zones">
                  Toutes les zones
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-16 md:py-24 bg-card"
          aria-labelledby="faq-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">FAQ</Badge>
              <h2
                id="faq-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Questions sur les tarifs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Les réponses aux questions qu'on nous pose le plus souvent.</p>
            </div>

            <div className="max-w-3xl">
              <Accordion
                type="single"
                collapsible
                className="space-y-4">
                {FAQS.map((f, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="bg-muted/50 rounded-2xl border border-border px-6 overflow-hidden data-[state=open]:shadow-lg data-[state=open]:shadow-slate-200/50 transition-all">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-linear-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Prêt à obtenir votre devis ?</h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto">Envoyez-nous quelques photos et recevez un tarif clair en moins de 24h. Sans engagement.</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 text-lg font-semibold bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-emerald-900/20">
                <Link href="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 h-14 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10">
                <a href={`tel:${PHONE}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>

            <p className="mt-8 text-emerald-200 text-sm">Réponse sous 24h • Devis sans engagement • Paiement après intervention</p>
          </div>
        </section>
      </main>
    </>
  );
}
