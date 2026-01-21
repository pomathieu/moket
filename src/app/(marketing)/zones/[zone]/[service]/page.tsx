export const dynamic = 'force-static';

import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getZone, ZONES } from '@/lib/zones';
import { getService, SERVICES } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, ChevronRight, ArrowRight, PhoneCall, FileText, Check, Clock, Sparkles, Shield, Droplets, Calendar, Home, Zap, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE_NUMBER = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

type PageProps = { params: Promise<{ zone: string; service: string }> };

export function generateStaticParams() {
  return ZONES.flatMap((z) => SERVICES.map((s) => ({ zone: z.slug, service: s.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const zone = getZone(resolvedParams.zone);
  const service = getService(resolvedParams.service);
  if (!zone || !service) return {};

  const url = new URL(`/zones/${zone.slug}/${service.slug}`, SITE_URL);

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
          url: new URL('/images/og-default.jpg', SITE_URL),
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
      images: [new URL('/images/og-default.jpg', SITE_URL)],
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
      a: `Selon la taille et l'état du textile. En général, comptez entre 45 minutes et 1h30. On vous donne une estimation au devis.`,
    },
    {
      q: `En combien de temps ça sèche ?`,
      a: `Le séchage varie selon la matière, l'aération et l'humidité. Grâce à l'extraction, l'eau résiduelle est limitée et on vous conseille pour accélérer.`,
    },
    {
      q: `Quel est le prix pour ${serviceTitle.toLowerCase()} à ${zoneTitle} ?`,
      a: `Le prix dépend de la taille et de l'état. Envoyez-nous des photos pour un devis précis et sans engagement.`,
    },
  ];
}

function jsonLd(zoneTitle: string, zoneSlug: string, serviceTitle: string, serviceSlug: string, zoneShortNote?: string) {
  const pageUrl = `${SITE_URL}/zones/${zoneSlug}/${serviceSlug}`;
  const faq = buildLocalFaq(zoneTitle, serviceTitle);

  const offerBySlug: Record<string, object | null> = {
    matelas: {
      '@type': 'Offer',
      name: `Nettoyage de matelas à domicile à ${zoneTitle}`,
      priceCurrency: 'EUR',
      price: 90,
      url: pageUrl,
      seller: { '@id': `${SITE_URL}/#localbusiness` },
    },
    'canape-tissu': {
      '@type': 'Offer',
      name: `Nettoyage de canapé en tissu à domicile à ${zoneTitle}`,
      priceCurrency: 'EUR',
      price: 120,
      url: pageUrl,
      seller: { '@id': `${SITE_URL}/#localbusiness` },
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
      seller: { '@id': `${SITE_URL}/#localbusiness` },
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
      seller: { '@id': `${SITE_URL}/#localbusiness` },
    },
  };

  const offer = offerBySlug[serviceSlug] ?? null;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${serviceTitle} à ${zoneTitle}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'fr-FR',
        mainEntity: { '@id': `${pageUrl}#service` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${SITE_URL}/zones` },
          { '@type': 'ListItem', position: 3, name: zoneTitle, item: `${SITE_URL}/zones/${zoneSlug}` },
          { '@type': 'ListItem', position: 4, name: serviceTitle, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${serviceTitle} à ${zoneTitle}`,
        serviceType: serviceTitle,
        areaServed: { '@type': 'AdministrativeArea', name: zoneTitle },
        provider: { '@id': `${SITE_URL}/#localbusiness` },
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        ...(offer ? { offers: offer } : {}),
        ...(zoneShortNote ? { slogan: zoneShortNote } : {}),
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

// Prix par service
const PRICES: Record<string, string> = {
  matelas: 'Dès 90€',
  'canape-tissu': 'Dès 140€',
  tapis: '30€/m²',
  moquette: '12€/m²',
};

// Avantages par service
const BENEFITS: Record<string, string[]> = {
  matelas: ['Élimination des acariens et allergènes', 'Traitement des odeurs (transpiration, urine)', 'Nettoyage des auréoles et taches', 'Séchage rapide (2-4h)'],
  'canape-tissu': ['Nettoyage en profondeur des fibres', 'Élimination des taches et zones grasses', 'Ravivage des couleurs', 'Traitement des odeurs incrustées'],
  tapis: ['Ravivage des couleurs et motifs', 'Élimination des salissures incrustées', 'Nettoyage respectueux des fibres', 'Rendu homogène garanti'],
  moquette: ['Nettoyage de grandes surfaces', 'Élimination des taches de passage', 'Assainissement en profondeur', 'Rendu uniforme sur toute la surface'],
};

export default async function ZoneServicePage({ params }: PageProps) {
  const resolvedParams = await params;
  const zone = getZone(resolvedParams.zone);
  const service = getService(resolvedParams.service);
  if (!zone || !service) notFound();

  const faq = buildLocalFaq(zone.title, service.title);
  const price = PRICES[service.slug] || 'Sur devis';
  const benefits = BENEFITS[service.slug] || [];

  // Autres services dans cette zone
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl md:hidden animate-[slideUp_0.5s_ease-out_1s_both]">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              className="rounded-full w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25">
              <Link href="/devis">
                <FileText className="h-4 w-4 mr-2" />
                Devis gratuit
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full w-full border-2">
              <a href={`tel:${PHONE_NUMBER}`}>
                <PhoneCall className="h-4 w-4 mr-2" />
                Appeler
              </a>
            </Button>
          </div>
        </div>
      </div>

      <main
        className="overflow-x-hidden pb-24 md:pb-0"
        aria-label={`${service.title} à ${zone.title}`}>
        <Script
          id="jsonld-zone-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd(zone.title, zone.slug, service.title, service.slug, zone.shortNote)),
          }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative min-h-[50vh] md:min-h-[45vh] flex items-center overflow-hidden"
          aria-labelledby="hero-title">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-linear-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[37.5rem] h-[37.5rem] bg-linear-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in flex-wrap">
                <Link
                  href="/"
                  className="hover:text-emerald-600 transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href="/zones"
                  className="hover:text-emerald-600 transition-colors">
                  Zones
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={`/zones/${zone.slug}`}
                  className="hover:text-emerald-600 transition-colors">
                  {zone.title}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{service.title}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">{zone.title}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                  <Sparkles className="h-4 w-4" />
                  <span>{price}</span>
                </div>
              </div>

              <h1
                id="hero-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                {service.title}{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">à {zone.title}</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in-up">
                {zone.seoBody?.introLocal || `À ${zone.title}, on adapte le protocole (pré-traitement + extraction) à la matière et aux zones sensibles pour un résultat net et homogène.`}
              </p>

              {/* Zone short note */}
              {zone.shortNote && (
                <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 animate-fade-in-up">
                  <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800">Info zone</p>
                    <p className="text-sm text-amber-700">{zone.shortNote}</p>
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
                  <Link href="/devis">
                    Demander un devis gratuit
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 text-base font-semibold border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all">
                  <a href={`tel:${PHONE_NUMBER}`}>
                    <PhoneCall className="h-5 w-5 mr-2" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CE QUE VOUS OBTENEZ + DELAIS */}
        <section
          className="py-16 md:py-24 bg-card border-y border-border/80"
          aria-labelledby="benefits-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ce que vous obtenez */}
              <Card className="animate-fade-in-up border-border/80 shadow-xl shadow-slate-200/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                      <ThumbsUp className="h-6 w-6" />
                    </div>
                    <h2
                      id="benefits-title"
                      className="text-xl font-bold text-foreground">
                      Ce que vous obtenez
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Délais & créneaux */}
              <Card className="animate-fade-in-up border-border/80 shadow-xl shadow-slate-200/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Délais & créneaux à {zone.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {zone.shortNote || 'Les disponibilités varient selon la tournée. Demandez un devis : on vous propose un créneau adapté.'}
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: Zap, text: 'Réponse sous 24h' },
                      { icon: Clock, text: 'Créneaux matin, après-midi ou soirée' },
                      { icon: Shield, text: 'Paiement après intervention' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-100">
                          <item.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* VILLES COUVERTES */}
        {zone.cities && zone.cities.length > 0 && (
          <section
            className="py-16 md:py-24 bg-muted"
            aria-labelledby="cities-title">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <h2
                    id="cities-title"
                    className="text-2xl font-black text-foreground">
                    Villes couvertes
                  </h2>
                  <p className="text-muted-foreground">Exemples de secteurs dans {zone.title}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 animate-fade-in-up">
                {zone.cities.map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 rounded-full bg-card border border-border/80 text-sm font-medium text-slate-700">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION */}
        <section
          className="py-16 md:py-20 bg-linear-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden"
          aria-labelledby="cta-title">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="animate-fade-in-up">
                <h2
                  id="cta-title"
                  className="text-2xl md:text-3xl font-black">
                  Demander un devis pour {service.title.toLowerCase()}
                </h2>
                <p className="mt-2 text-emerald-100">Réponse rapide pour {zone.title}. Sans engagement.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg">
                  <Link href="/devis">
                    Demander un devis
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-2 border-white/30 text-white hover:bg-white/10">
                  <a href={`tel:${PHONE_NUMBER}`}>
                    <PhoneCall className="h-5 w-5 mr-2" />
                    Appeler
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-16 md:py-24 bg-card"
          aria-labelledby="faq-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl mb-10 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">FAQ</Badge>
              <h2
                id="faq-title"
                className="text-2xl md:text-3xl font-black text-foreground">
                Questions fréquentes
              </h2>
            </div>

            <div className="max-w-3xl animate-fade-in-up">
              <Accordion
                type="single"
                collapsible
                className="space-y-4">
                {faq.map((f, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="bg-background rounded-2xl border border-border px-6 overflow-hidden data-[state=open]:shadow-lg data-[state=open]:shadow-slate-200/50 transition-all">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* EN SAVOIR PLUS */}
        <section
          className="py-16 md:py-24 bg-muted"
          aria-labelledby="links-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <div className="p-3 rounded-2xl bg-linear-to-br from-slate-700 to-slate-900 text-white shadow-lg">
                <Droplets className="h-6 w-6" />
              </div>
              <h2
                id="links-title"
                className="text-2xl font-black text-foreground">
                En savoir plus
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl animate-fade-in-up">
              <Link
                href={`/services/${service.slug}`}
                className={cn(
                  'group relative block rounded-3xl bg-card p-6',
                  'border border-border/80 overflow-hidden',
                  'transition-all duration-300',
                  'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                )}>
                <div className="absolute inset-0 bg-linear-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="font-bold text-foreground group-hover:text-emerald-700 transition-colors">Page {service.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">En savoir plus sur ce service</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm transition-transform duration-200 group-hover:translate-x-1">
                    Découvrir
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              <Link
                href={`/zones/${zone.slug}`}
                className={cn(
                  'group relative block rounded-3xl bg-card p-6',
                  'border border-border/80 overflow-hidden',
                  'transition-all duration-300',
                  'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                )}>
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h3 className="font-bold text-foreground group-hover:text-blue-700 transition-colors">Zone {zone.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Tous les services dans cette zone</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-blue-700 font-semibold text-sm transition-transform duration-200 group-hover:translate-x-1">
                    Voir la zone
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Autres services */}
            <div className="mt-12 animate-fade-in-up">
              <h3 className="text-lg font-bold text-foreground mb-4">Autres services à {zone.title}</h3>
              <div className="flex flex-wrap gap-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/zones/${zone.slug}/${s.slug}`}
                    className={cn(
                      'px-5 py-3 rounded-2xl bg-card border border-border/80',
                      'text-sm font-medium text-slate-700',
                      'transition-all duration-300',
                      'hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700',
                    )}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
