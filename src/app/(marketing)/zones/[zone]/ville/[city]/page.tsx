export const dynamic = 'force-static';

import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getZone } from '@/lib/zones';
import { CITIES, getCity } from '@/lib/cities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, ChevronRight, ArrowRight, PhoneCall, FileText, Check, Clock, Sparkles, Droplets, Home, BedDouble, Sofa, Layers, Grid3X3, Users, Target, Shield, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE_NUMBER = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

type PageProps = { params: Promise<{ zone: string; city: string }> };

export function generateStaticParams() {
  return CITIES.map((c) => ({ zone: c.zoneSlug, city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zone, city } = await params;
  const zoneData = getZone(zone);
  const cityData = getCity(zone, city);

  if (!zoneData || !cityData) return {};

  const url = new URL(`/zones/${zoneData.slug}/ville/${cityData.slug}`, SITE_URL);
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
          url: new URL('/images/og-default.jpg', SITE_URL),
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
      images: [new URL('/images/og-default.jpg', SITE_URL)],
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
    {
      q: `Quels sont les délais d'intervention à ${cityName} ?`,
      a: `Les délais varient selon notre planning de tournée. En général, nous pouvons intervenir sous 48h à 1 semaine.`,
    },
  ];
}

function buildJsonLd(args: { zoneTitle: string; zoneSlug: string; cityName: string; citySlug: string; cityGeo?: { lat: number; lng: number }; citySegments?: string[]; cityAngle?: string }) {
  const pageUrl = `${SITE_URL}/zones/${args.zoneSlug}/ville/${args.citySlug}`;
  const faq = buildCityFaq(args.cityName, args.zoneTitle);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Nettoyage textile à ${args.cityName}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#service` },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${SITE_URL}/zones` },
          { '@type': 'ListItem', position: 3, name: args.zoneTitle, item: `${SITE_URL}/zones/${args.zoneSlug}` },
          { '@type': 'ListItem', position: 4, name: args.cityName, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `Nettoyage textile à domicile à ${args.cityName}`,
        description: args.cityAngle || `Intervention à domicile à ${args.cityName} : pré-traitement + injection-extraction, devis rapide sur photos.`,
        provider: { '@id': `${SITE_URL}/#localbusiness` },
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

const SERVICES_LINKS = [
  { title: 'Matelas', slug: 'matelas', icon: BedDouble },
  { title: 'Canapé tissu', slug: 'canape-tissu', icon: Sofa },
  { title: 'Tapis', slug: 'tapis', icon: Layers },
  { title: 'Moquette', slug: 'moquette', icon: Grid3X3 },
];

const WHAT_WE_CLEAN = [
  { icon: BedDouble, text: 'Matelas (odeurs, acariens, auréoles)' },
  { icon: Sofa, text: 'Canapés en tissu (taches, salissures incrustées)' },
  { icon: Layers, text: 'Tapis (ravive les fibres, enlève les salissures)' },
  { icon: Grid3X3, text: 'Moquette (nettoyage en profondeur, rendu uniforme)' },
];

const PROCESS_STEPS = [
  { num: '1', title: 'Demande de devis', desc: 'Photos + dimensions si possible' },
  { num: '2', title: 'Validation', desc: 'Proposition de créneau' },
  { num: '3', title: 'Intervention', desc: 'Pré-traitement + extraction profonde' },
  { num: '4', title: 'Conseils', desc: 'Séchage selon textile / ventilation' },
];

export default async function CityPage({ params }: PageProps) {
  const { zone, city } = await params;

  const zoneData = getZone(zone);
  const cityData = getCity(zone, city);

  if (!zoneData || !cityData) notFound();

  const faq = buildCityFaq(cityData.name, zoneData.title);

  // Autres villes dans la même zone
  const otherCities = CITIES.filter((c) => c.zoneSlug === zoneData.slug && c.slug !== cityData.slug).slice(0, 12);

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
        aria-label={`Nettoyage textile à ${cityData.name}`}>
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
              }),
            ),
          }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative min-h-[50vh] md:min-h-[45vh] flex items-center overflow-hidden"
          aria-labelledby="hero-title">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[37.5rem] h-[37.5rem] bg-gradient-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

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
                  href={`/zones/${zoneData.slug}`}
                  className="hover:text-emerald-600 transition-colors">
                  {zoneData.title}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{cityData.name}</span>
              </nav>

              {/* Badge 
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700">{cityData.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{zoneData.title}</span>
              </div>
*/}
              <h1
                id="hero-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                {cityData.seo.h1.includes(cityData.name) ? (
                  <>
                    {cityData.seo.h1.split(cityData.name)[0]}
                    <span className="relative">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{cityData.name}</span>
                      <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                    </span>
                    {cityData.seo.h1.split(cityData.name)[1]}
                  </>
                ) : (
                  cityData.seo.h1
                )}
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in-up">{cityData.seo.description}</p>

              {/* Short note */}
              {cityData.shortNote && (
                <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 animate-fade-in-up">
                  <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800">Info</p>
                    <p className="text-sm text-amber-700">{cityData.shortNote}</p>
                  </div>
                </div>
              )}

              {/* Trust signals */}
              {cityData.seoBody?.trustSignals && cityData.seoBody.trustSignals.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3 animate-fade-in-up">
                  {cityData.seoBody.trustSignals.map((signal) => (
                    <span
                      key={signal}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200/50 text-sm">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">{signal}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
                  <Link href="/devis">
                    Devis à {cityData.name}
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

        {/* SEGMENTS / SPECIFICITES */}
        {cityData.market?.segments && cityData.market.segments.length > 0 && (
          <section
            className="py-16 md:py-24 bg-card border-y border-border/80"
            aria-labelledby="segments-title">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h2
                    id="segments-title"
                    className="text-2xl font-black text-foreground">
                    Interventions adaptées à {cityData.name}
                  </h2>
                  <p className="text-muted-foreground">{cityData.market.angle || 'On adapte le protocole aux usages locaux'}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 animate-fade-in-up">
                {cityData.market.segments.map((segment) => (
                  <span
                    key={segment}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/80 text-sm font-medium">
                    <Users className="h-4 w-4 text-violet-600" />
                    <span className="text-slate-700">{segment}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CE QUE NOUS NETTOYONS + DEROULE */}
        <section
          className="py-16 md:py-24 bg-muted"
          aria-labelledby="services-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ce que nous nettoyons */}
              <Card className="animate-fade-in-up border-border/80 shadow-xl shadow-slate-200/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                      <Droplets className="h-6 w-6" />
                    </div>
                    <h2
                      id="services-title"
                      className="text-xl font-bold text-foreground">
                      Ce que nous nettoyons à {cityData.name}
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {WHAT_WE_CLEAN.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-xl bg-emerald-100">
                          <item.icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-muted-foreground">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Déroulé */}
              <Card className="animate-fade-in-up border-border/80 shadow-xl shadow-slate-200/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Déroulé d&#39;intervention</h2>
                  </div>
                  <ol className="space-y-4">
                    {PROCESS_STEPS.map((step) => (
                      <li
                        key={step.num}
                        className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold flex items-center justify-center">{step.num}</div>
                        <div>
                          <p className="font-semibold text-foreground">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SPECIFICITES LOCALES */}
        <section
          className="py-16 md:py-24 bg-card"
          aria-labelledby="local-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2
                  id="local-title"
                  className="text-2xl font-black text-foreground">
                  Spécificités à {cityData.name}
                </h2>
              </div>

              <div className="space-y-4 animate-fade-in-up">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {cityData.seoBody?.introLocal ||
                    `À ${cityData.name}, on adapte le protocole (pré-traitement + injection-extraction) à la matière et aux zones sensibles pour éviter les auréoles et garder un rendu homogène.`}
                </p>
                {cityData.seoBody?.travelHint && <p className="text-muted-foreground leading-relaxed">{cityData.seoBody.travelHint}</p>}
              </div>

              {/* Cas d'usage locaux */}
              {cityData.seoBody?.localUseCases && cityData.seoBody.localUseCases.length > 0 && (
                <div className="mt-8 animate-fade-in-up">
                  <h3 className="text-lg font-bold text-foreground mb-4">Cas fréquents à {cityData.name}</h3>
                  <ul className="space-y-3">
                    {cityData.seoBody.localUseCases.map((useCase, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-muted-foreground">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          className="py-16 md:py-20 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden"
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
                  Obtenir un devis à {cityData.name}
                </h2>
                <p className="mt-2 text-emerald-100">Réponse rapide. Intervention à domicile. Sans engagement.</p>
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
          className="py-16 md:py-24 bg-muted"
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
                    className="bg-card rounded-2xl border border-border px-6 overflow-hidden data-[state=open]:shadow-lg data-[state=open]:shadow-slate-200/50 transition-all">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* EXPLORER LA ZONE */}
        <section
          className="py-16 md:py-24 bg-card"
          aria-labelledby="explore-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2
                id="explore-title"
                className="text-2xl font-black text-foreground">
                Explorer la zone {zoneData.title}
              </h2>
            </div>

            {/* Page zone */}
            <div className="mb-8 animate-fade-in-up">
              <Link
                href={`/zones/${zoneData.slug}`}
                className={cn(
                  'group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-background border border-border/80',
                  'transition-all duration-300',
                  'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                )}>
                <MapPin className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">Page {zoneData.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
              </Link>
            </div>

            {/* Services */}
            <h3 className="text-lg font-bold text-foreground mb-4 animate-fade-in-up">Services disponibles</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
              {SERVICES_LINKS.map((service) => (
                <Link
                  key={service.slug}
                  href={`/zones/${zoneData.slug}/${service.slug}`}
                  className={cn(
                    'group relative block rounded-2xl bg-background p-5',
                    'border border-border/80 overflow-hidden',
                    'transition-all duration-300',
                    'hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1',
                  )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">{service.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* AUTRES VILLES */}
        {otherCities.length > 0 && (
          <section
            className="py-16 md:py-24 bg-muted border-t border-border/80"
            aria-labelledby="other-cities-title">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30">
                  <Home className="h-6 w-6" />
                </div>
                <h2
                  id="other-cities-title"
                  className="text-2xl font-black text-foreground">
                  Autres villes couvertes dans {zoneData.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-3 animate-fade-in-up">
                {otherCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/zones/${zoneData.slug}/ville/${c.slug}`}
                    className={cn(
                      'px-5 py-3 rounded-2xl bg-card border border-border/80',
                      'text-sm font-medium text-slate-700',
                      'transition-all duration-300',
                      'hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 hover:shadow-lg',
                    )}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
