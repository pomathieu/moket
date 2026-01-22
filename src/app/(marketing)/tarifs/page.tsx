import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  CircleDollarSign,
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
    title: 'Matelas',
    desc: 'Taches, odeurs, poussières — protocole adapté à la matière.',
    icon: BedDouble,
    gradient: 'from-teal-500 to-cyan-600',
    bgGradient: 'from-teal-50 to-cyan-50',
    shadowColor: 'shadow-teal-500/20',
    accentColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    items: [
      { label: '1 place', price: '90', unit: '€' },
      { label: '2 places', price: '120', unit: '€' },
    ],
    badges: [],
    href: '/services/matelas',
    popular: false,
  },
  {
    title: 'Canapé tissu',
    desc: "Traces d'usage, zones grasses, odeurs : nettoyage en profondeur.",
    icon: Sofa,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    shadowColor: 'shadow-emerald-500/25',
    accentColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    items: [
      { label: '2–3 places', price: '140', unit: '€' },
      { label: '4–5 places', price: '190', unit: '€' },
    ],
    badges: [],
    href: '/services/canape-tissu',
    popular: true,
  },
  {
    title: 'Tapis',
    desc: 'Nettoyage des fibres + finition uniforme.',
    icon: RectangleHorizontal,
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    shadowColor: 'shadow-cyan-500/20',
    accentColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
    items: [{ label: 'Prix au m²', price: '30', unit: '€/m²' }],
    badges: [
      { label: 'Min. IDF', value: '150 €' },
      { label: 'Min. Normandie', value: '120 €' },
    ],
    href: '/services/tapis',
    popular: false,
  },
  {
    title: 'Moquette',
    desc: 'Surfaces, pièces, bureaux — devis au m².',
    icon: Grid3X3,
    gradient: 'from-sky-500 to-indigo-600',
    bgGradient: 'from-sky-50 to-indigo-50',
    shadowColor: 'shadow-sky-500/20',
    accentColor: 'text-sky-600',
    borderColor: 'border-sky-200',
    items: [{ label: 'Prix au m²', price: '12', unit: '€/m²' }],
    badges: [
      { label: 'Min. IDF', value: '150 €' },
      { label: 'Min. Normandie', value: '150 €' },
    ],
    href: '/services/moquette',
    popular: false,
  },
] as const;

const FAQS = [
  {
    q: 'Les tarifs sont-ils vraiment fixes ?',
    a: `Oui pour les prestations standard listées (matelas, canapés, tapis, moquettes). ${PRICING_RULES.note} Dans tous les cas, on annonce un prix clair avant intervention.`,
    icon: CircleDollarSign,
  },
  {
    q: "Qu'est-ce qui influence le prix final ?",
    a: "Principalement : taille/surface, état (encrassement, tâches multiples), type de fibres, et temps d'intervention. Pour les moquettes/tapis, le chiffrage se fait au m². Le devis photo évite les mauvaises surprises.",
    icon: Info,
  },
  {
    q: 'Dois-je prévoir quelque chose avant votre arrivée ?',
    a: "Idéalement : dégager l'accès à la zone, aspirer rapidement si possible, et nous signaler les taches/odeurs spécifiques. On protège les lieux et on vous guide sur place.",
    icon: Check,
  },
  {
    q: 'Combien de temps dure une prestation ?',
    a: 'En général : matelas ou canapé 45 min à 1h30. Tapis/moquette : selon surface et état. On vous donne une estimation réaliste au moment du devis.',
    icon: Clock,
  },
  {
    q: 'Le textile est-il sec en partant ?',
    a: "Grâce à l'extraction, on limite fortement l'eau résiduelle. Le séchage complet prend souvent quelques heures selon aération/chauffage et humidité ambiante. On vous donne des conseils simples pour sécher vite et bien.",
    icon: Droplets,
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Nous acceptons généralement les paiements les plus courants (espèces ou virement, et/ou selon organisation). Si vous avez une contrainte spécifique, dites-le au moment du devis.',
    icon: CreditCard,
  },
];

const INCLUDED = [
  { icon: Eye, text: 'Diagnostic complet', desc: 'Matière, couleurs, zones à risque' },
  { icon: Zap, text: 'Pré-traitement ciblé', desc: 'Taches, zones grasses, odeurs' },
  { icon: Droplets, text: 'Injection-extraction', desc: 'Nettoyage en profondeur' },
  { icon: Sparkles, text: 'Finition soignée', desc: 'Homogénéisation du rendu' },
  { icon: Shield, text: 'Protection des lieux', desc: 'Intervention propre' },
  { icon: Clock, text: 'Conseils personnalisés', desc: 'Séchage et entretien' },
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
          const numericPrices = p.items.map((it) => Number(it.price));
          const isPerSqm = p.items[0]?.unit?.includes('m²');
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
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/30" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-200/30 via-teal-100/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100/40 via-transparent to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors">
                Accueil
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Tarifs</span>
            </nav>

            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg shadow-emerald-100/50 text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-700">Prix transparents • Sans surprise</span>
              </div>

              <h1
                id="tarifs-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                Nos{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">tarifs</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none">
                    <path
                      d="M0 8 Q25 0 50 8 T100 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Des prix <strong className="text-foreground font-semibold">annoncés avant intervention</strong>. Nettoyage professionnel de vos textiles en{' '}
                <strong className="text-foreground font-semibold">Île-de-France</strong> et <strong className="text-foreground font-semibold">Normandie</strong>.
              </p>

              {/* CTA buttons - Desktop */}
              <div className="mt-10 hidden md:flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 hover:scale-[1.02]">
                  <Link href="/devis">
                    Demander un devis gratuit
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 text-base font-semibold border-2 border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300">
                  <a href={`tel:${PHONE}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                {[
                  { icon: Check, text: 'Prix annoncé avant' },
                  { icon: Eye, text: 'Résultat visible' },
                  { icon: Shield, text: 'Sans engagement' },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                      <Icon className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                    <span className="font-medium">{text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING GRID */}
        <section
          className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/80"
          aria-labelledby="pricing-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Section header */}
            <div className="max-w-2xl mb-12 md:mb-16">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200/50 mb-4 px-4 py-1.5">
                <CreditCard className="h-4 w-4 mr-2" />
                Grille tarifaire
              </Badge>
              <h2
                id="pricing-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Choisissez votre prestation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Pour un chiffrage précis, envoyez 2–3 photos : <span className="text-foreground font-medium">vue d'ensemble + zone(s) concernée(s)</span>.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {PRICES.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={cn(
                      'group relative rounded-3xl bg-white p-6 md:p-8',
                      'border-2 transition-all duration-500',
                      'hover:shadow-2xl hover:-translate-y-1',
                      p.popular ? `border-emerald-300 ${p.shadowColor} shadow-xl` : 'border-slate-200/80 hover:border-slate-300 shadow-lg shadow-slate-200/50',
                    )}>
                    {/* Popular badge */}
                    {p.popular && (
                      <div className="absolute -top-3 left-6">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/30">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          Le plus demandé
                        </span>
                      </div>
                    )}

                    {/* Background gradient on hover */}
                    <div className={cn('absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500', p.bgGradient)} />

                    <div className="relative z-10">
                      {/* Header with icon */}
                      <div className="flex items-start gap-5 mb-6">
                        <div
                          className={cn(
                            'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
                            p.gradient,
                            p.shadowColor,
                          )}>
                          <Icon
                            className="h-8 w-8"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="pt-1">
                          <h3 className="text-2xl font-bold text-foreground">{p.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                        </div>
                      </div>

                      {/* Price items */}
                      <div className="space-y-3 mb-6">
                        {p.items.map((item) => (
                          <div
                            key={`${p.title}-${item.label}`}
                            className={cn(
                              'flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300',
                              'bg-slate-50/80 border-slate-200/80',
                              'group-hover:bg-white group-hover:border-slate-300 group-hover:shadow-sm',
                            )}>
                            <span className="text-muted-foreground font-medium">{item.label}</span>
                            <div className="flex items-baseline gap-1">
                              <span className={cn('text-3xl font-black', p.accentColor)}>{item.price}</span>
                              <span className="text-base font-semibold text-muted-foreground">{item.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Badges (minimums) */}
                      {p.badges?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {p.badges.map((b) => (
                            <span
                              key={b.label}
                              className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200/80 px-3 py-1.5 text-xs">
                              <Info className="h-3.5 w-3.5 text-amber-600" />
                              <span className="text-amber-700 font-medium">
                                {b.label} : <span className="font-bold">{b.value}</span>
                              </span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          asChild
                          className={cn(
                            'flex-1 rounded-full h-12 text-base font-semibold text-white shadow-lg transition-all duration-300',
                            'bg-gradient-to-r hover:shadow-xl hover:-translate-y-0.5',
                            p.gradient,
                            p.shadowColor,
                          )}>
                          <Link href="/devis">
                            Devis gratuit
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className={cn('rounded-full h-12 px-5 border-2 font-semibold transition-all duration-300', `hover:${p.borderColor} hover:bg-slate-50`)}>
                          <Link href={p.href}>Détails</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Surcharges info */}
            <div className="mt-12 rounded-3xl border-2 border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/50 p-6 md:p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30">
                  <Info className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-xl">Ajustements possibles</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{PRICING_RULES.note}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {PRICING_RULES.surcharges.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-2xl bg-white/80 border border-amber-200/50 px-5 py-4 shadow-sm">
                    <div>
                      <span className="font-semibold text-foreground">{s.label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                    <span className="font-black text-amber-600 text-xl">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED + WHY PHOTO */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* What's included */}
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 p-8 md:p-10 text-white shadow-2xl shadow-emerald-600/30 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/20 mb-4">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Tout compris
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-black">Ce qui est inclus</h2>
                  <p className="mt-2 text-emerald-100">Une prestation professionnelle complète.</p>

                  <div className="mt-8 grid gap-4">
                    {INCLUDED.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-semibold">{item.text}</span>
                            <p className="text-sm text-emerald-100 mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full w-full h-14 bg-white text-emerald-700 hover:bg-emerald-50 font-bold shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <Link href="/notre-methode">
                        Découvrir notre méthode
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Why photo quote */}
              <div className="rounded-3xl border-2 border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/50">
                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 mb-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Devis précis
                </Badge>
                <h2 className="text-2xl md:text-3xl font-black text-foreground">Pourquoi un devis photo ?</h2>
                <p className="mt-2 text-muted-foreground">Pour vous annoncer le bon prix, sans surprise.</p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: Eye,
                      title: 'État réel du textile',
                      desc: 'Encrassement, taches multiples, auréoles : ça change le temps de travail.',
                      color: 'emerald',
                    },
                    {
                      icon: Shield,
                      title: 'Matière & fragilité',
                      desc: 'Certaines fibres demandent un protocole plus doux et plus long.',
                      color: 'teal',
                    },
                    {
                      icon: Clock,
                      title: "Temps d'intervention",
                      desc: 'Le prix suit la réalité : temps + méthode + finition.',
                      color: 'cyan',
                    },
                    {
                      icon: CreditCard,
                      title: 'Prix validé ensemble',
                      desc: 'On vous dit le prix avant, vous décidez. Point.',
                      color: 'sky',
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    const colorClasses = {
                      emerald: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200',
                      teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-200',
                      cyan: 'bg-cyan-100 text-cyan-600 group-hover:bg-cyan-200',
                      sky: 'bg-sky-100 text-sky-600 group-hover:bg-sky-200',
                    };
                    return (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/50 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-slate-300 hover:-translate-y-0.5">
                        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors', colorClasses[item.color as keyof typeof colorClasses])}>
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
                    className="rounded-full w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5">
                    <Link href="/devis">
                      Envoyer mes photos
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Important note */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200">
                <Info className="h-5 w-5 text-slate-600" />
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                <strong className="text-foreground">À noter :</strong> les décolorations, brûlures ou migrations de teinture peuvent ne pas disparaître totalement. En revanche, l'encrassement et la
                majorité des taches du quotidien sont généralement éliminés avec un protocole adapté.
              </p>
            </div>
          </div>
        </section>

        {/* ZONES */}
        <section
          className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white"
          aria-labelledby="zones-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-10">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200/50 mb-4">
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
                  className="rounded-full border-2 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300">
                  <Link href={`/zones/${z.slug}`}>{z.title}</Link>
                </Button>
              ))}
              <Button
                asChild
                className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20">
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
          className="py-16 md:py-24 bg-white"
          aria-labelledby="faq-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200/50 mb-4">FAQ</Badge>
              <h2
                id="faq-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Questions fréquentes
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Les réponses aux questions qu'on nous pose le plus souvent.</p>
            </div>

            <div className="max-w-3xl">
              <Accordion
                type="single"
                collapsible
                className="space-y-4">
                {FAQS.map((f, idx) => {
                  const Icon = f.icon;
                  return (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                      className="group bg-slate-50/80 rounded-2xl border-2 border-slate-200/80 px-6 overflow-hidden data-[state=open]:bg-white data-[state=open]:shadow-xl data-[state=open]:shadow-slate-200/50 data-[state=open]:border-emerald-200 transition-all duration-300">
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-200/80 text-slate-600 group-data-[state=open]:bg-emerald-100 group-data-[state=open]:text-emerald-600 transition-colors">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span>{f.q}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 pl-14 leading-relaxed">{f.a}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl translate-x-1/2" />
          </div>

          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Réponse sous 24h
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Prêt à obtenir votre devis ?</h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto">Envoyez-nous quelques photos et recevez un tarif clair en moins de 24h. Sans engagement.</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 text-lg font-bold bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
                <Link href="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-10 h-14 text-lg font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300">
                <a href={`tel:${PHONE}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-emerald-200">
              {['Devis sans engagement', 'Résultat garanti', 'Paiement après intervention'].map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
