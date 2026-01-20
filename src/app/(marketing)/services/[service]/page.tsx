export const dynamic = 'force-static';

import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getService, SERVICES } from '@/lib/services';
import { ZONES } from '@/lib/zones';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Phone,
  FileText,
  Sparkles,
  Shield,
  AlertTriangle,
  MapPin,
  BedDouble,
  Sofa,
  RectangleHorizontal,
  Grid3X3,
  Clock,
  Droplets,
  Eye,
  Zap,
  CreditCard,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

const SERVICE_ICONS = {
  matelas: BedDouble,
  'canape-tissu': Sofa,
  tapis: RectangleHorizontal,
  moquette: Grid3X3,
} as const;

const SERVICE_IMAGES = {
  matelas: '/images/services/Matelas.jpg',
  'canape-tissu': '/images/services/Canape.jpg',
  tapis: '/images/services/Tapis.jpg',
  moquette: '/images/services/Canape2.jpg',
} as const;

const PROCESS_STEPS = [
  { icon: Eye, title: 'Diagnostic', desc: 'Analyse de la matière, couleurs et zones à risque' },
  { icon: Zap, title: 'Pré-traitement', desc: 'Traitement ciblé des taches et zones problématiques' },
  { icon: Droplets, title: 'Injection-extraction', desc: 'Nettoyage en profondeur des fibres' },
  { icon: Sparkles, title: 'Finition', desc: 'Homogénéisation + conseils séchage/entretien' },
];

type PageProps = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getService(resolvedParams.service);
  if (!service) return {};

  const url = new URL(`/services/${service.slug}`, SITE_URL);

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
          url: new URL('/images/og-default.jpg', SITE_URL),
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
      images: [new URL('/images/og-default.jpg', SITE_URL)],
    },
  };
}

function buildJsonLd(service: { title: string; slug: string; seo: { title: string; description: string }; faq: { q: string; a: string }[] }) {
  const pageUrl = `${SITE_URL}/services/${service.slug}`;

  const offerBySlug: Record<string, any | null> = {
    matelas: {
      '@type': 'Offer',
      name: 'Nettoyage de matelas à domicile',
      priceCurrency: 'EUR',
      price: 90,
      url: pageUrl,
      seller: { '@id': `${SITE_URL}/#localbusiness` },
    },
    'canape-tissu': {
      '@type': 'Offer',
      name: 'Nettoyage de canapé en tissu à domicile',
      priceCurrency: 'EUR',
      price: 140,
      url: pageUrl,
      seller: { '@id': `${SITE_URL}/#localbusiness` },
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
      seller: { '@id': `${SITE_URL}/#localbusiness` },
    },
    moquette: {
      '@type': 'Offer',
      name: 'Nettoyage de moquette à domicile',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 12,
        priceCurrency: 'EUR',
        unitText: 'm²',
      },
      url: pageUrl,
      seller: { '@id': `${SITE_URL}/#localbusiness` },
    },
  };

  const offer = offerBySlug[service.slug] ?? null;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: service.seo.title,
        description: service.seo.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#service` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.seo.description,
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        provider: { '@id': `${SITE_URL}/#localbusiness` },
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
  const Icon = SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS] || Sparkles;
  const heroImage = SERVICE_IMAGES[service.slug as keyof typeof SERVICE_IMAGES];
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

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
          id="jsonld-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(service)) }}
        />

        {/* HERO */}
        <section
          className="relative py-16 md:py-24 overflow-hidden"
          aria-labelledby="service-title">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link
                href="/services"
                className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Services
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{service.title}</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left content */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-slate-700">Intervention à domicile</span>
                </div>

                <h1
                  id="service-title"
                  className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                  {service.seo.h1}
                </h1>

                <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-fade-in-up">{service.seo.description}</p>

                {seoBody.intro2 && <p className="mt-4 text-muted-foreground animate-fade-in-up">{seoBody.intro2}</p>}

                {/* CTA buttons */}
                <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
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
                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground animate-fade-in-up">
                  {['Résultat visible', 'Devis gratuit', 'Sans surprise'].map((text) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right - Image */}
              {heroImage && (
                <div className="relative animate-fade-in-up">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/50">
                    <img
                      src={heroImage}
                      alt={service.title}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -left-4 md:-left-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-emerald-500/30 text-white hidden md:block">
                    <div className="text-2xl font-black">150+</div>
                    <div className="text-sm text-emerald-100">interventions</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* USE CASES & LIMITS */}
        {(seoBody.useCases.length > 0 || seoBody.limits.length > 0) && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Use Cases */}
                {seoBody.useCases.length > 0 && (
                  <div className="rounded-3xl border border-border bg-card p-8 shadow-lg shadow-slate-200/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                        <Check className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">Cas fréquents</h2>
                        <p className="text-sm text-muted-foreground">Ce qu'on traite régulièrement</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {seoBody.useCases.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-emerald-700" />
                          </div>
                          <span className="text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Limits */}
                {seoBody.limits.length > 0 && (
                  <div className="rounded-3xl border border-border bg-card p-8 shadow-lg shadow-slate-200/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-2xl bg-amber-100 text-amber-700">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">Résultat réaliste</h2>
                        <p className="text-sm text-muted-foreground">Ce qui peut rester visible</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {seoBody.limits.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                            <span className="text-amber-700 text-xs font-bold">{idx + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price hint */}
              {seoBody.priceHint && (
                <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-lg shadow-slate-200/30">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Tarif indicatif</h3>
                      <p className="mt-1 text-muted-foreground">{seoBody.priceHint}</p>
                      <Button
                        asChild
                        variant="outline"
                        className="mt-4 rounded-full">
                        <Link href="/tarifs">
                          Voir tous les tarifs
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* WHAT YOU GET + PROCESS */}
        <section className="py-16 md:py-24 bg-card">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* What you get */}
              <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-white shadow-xl shadow-emerald-600/20">
                <h2 className="text-2xl font-black">Ce que vous obtenez</h2>
                <p className="mt-2 text-emerald-100">Notre engagement pour chaque intervention</p>

                <ul className="mt-8 space-y-4">
                  {service.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="pt-1">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full w-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg">
                    <Link href="/devis">
                      Demander un devis
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Process */}
              <div className="rounded-3xl border border-border bg-white p-8 shadow-lg shadow-slate-200/30">
                <h2 className="text-2xl font-black text-foreground">Déroulé d'intervention</h2>
                <p className="mt-2 text-muted-foreground">Notre protocole en 4 étapes</p>

                <div className="mt-8 space-y-6">
                  {PROCESS_STEPS.map((step, idx) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={idx}
                        className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/30">
                            {idx + 1}
                          </div>
                          {idx < PROCESS_STEPS.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-300 to-emerald-100 my-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2">
                            <StepIcon className="h-4 w-4 text-emerald-600" />
                            <h3 className="font-bold text-foreground">{step.title}</h3>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                Zones couvertes
              </Badge>
              <h2
                id="zones-title"
                className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                {service.title} près de chez vous
              </h2>
              <p className="mt-4 text-muted-foreground">Sélectionnez votre zone pour voir les modalités et créneaux disponibles.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {ZONES.map((z) => (
                <Button
                  key={z.slug}
                  asChild
                  variant="outline"
                  className="rounded-full border-2 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all">
                  <Link href={`/zones/${z.slug}/${service.slug}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    {z.title}
                  </Link>
                </Button>
              ))}
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
                className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                Questions fréquentes
              </h2>
              <p className="mt-4 text-muted-foreground">Les réponses aux questions sur {service.title.toLowerCase()}.</p>
            </div>

            <div className="max-w-3xl">
              <Accordion
                type="single"
                collapsible
                className="space-y-4">
                {service.faq.map((f, idx) => (
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

        {/* OTHER SERVICES */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-8">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Voir aussi
              </Badge>
              <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Nos autres services</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherServices.map((s) => {
                const OtherIcon = SERVICE_ICONS[s.slug as keyof typeof SERVICE_ICONS] || Sparkles;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className={cn(
                      'group relative rounded-2xl bg-card p-6',
                      'border border-border/80 overflow-hidden',
                      'transition-all duration-300',
                      'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                    )}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                        <OtherIcon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-bold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                        Découvrir
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Besoin d'un {service.title.toLowerCase()} ?</h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto">Envoyez-nous quelques photos et recevez un devis clair en moins de 24h. Sans engagement.</p>

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
