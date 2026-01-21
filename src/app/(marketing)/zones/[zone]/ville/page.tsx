import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getZone, ZONES } from '@/lib/zones';
import { getCitiesByZone } from '@/lib/cities';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronRight, ArrowRight, PhoneCall, FileText, Home, Building2, Sparkles, BedDouble, Sofa, Layers, Grid3X3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE_NUMBER = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

type PageProps = { params: Promise<{ zone: string }> };

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return ZONES.map((z) => ({ zone: z.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zone } = await params;
  const zoneData = getZone(zone);
  if (!zoneData) return {};

  const canonical = new URL(`/zones/${zoneData.slug}/ville`, SITE_URL);

  const title = `Villes couvertes – ${zoneData.title} | MOKET`;
  const description = `Liste des principales villes couvertes par MOKET dans la zone ${zoneData.title}. Intervention à domicile sur matelas, canapés, tapis et moquettes.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MOKET',
      locale: 'fr_FR',
      images: [
        {
          url: new URL('/images/og-default.jpg', SITE_URL),
          width: 1200,
          height: 630,
          alt: `MOKET - ${zoneData.title}`,
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

function buildJsonLd(zoneTitle: string, zoneSlug: string) {
  const pageUrl = `${SITE_URL}/zones/${zoneSlug}/ville`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Villes couvertes – ${zoneTitle}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: `${SITE_URL}/zones` },
          { '@type': 'ListItem', position: 3, name: zoneTitle, item: `${SITE_URL}/zones/${zoneSlug}` },
          { '@type': 'ListItem', position: 4, name: 'Villes', item: pageUrl },
        ],
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

export default async function ZoneCitiesPage({ params }: PageProps) {
  const { zone } = await params;
  const zoneData = getZone(zone);
  if (!zoneData) notFound();

  const cityPages = getCitiesByZone(zoneData.slug).filter((c) => (c.indexable ?? true) === true);
  const fallbackCities = zoneData.cities ?? [];

  const hasCityPages = cityPages.length > 0;
  const hasFallback = fallbackCities.length > 0;

  if (!hasCityPages && !hasFallback) notFound();

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
        aria-label={`Villes couvertes dans ${zoneData.title}`}>
        <Script
          id="jsonld-zone-cities"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(zoneData.title, zoneData.slug)) }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative min-h-[45vh] md:min-h-[40vh] flex items-center overflow-hidden"
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
                  href={`/zones/${zoneData.slug}`}
                  className="hover:text-emerald-600 transition-colors">
                  {zoneData.title}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">Villes</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <span className="text-slate-700">{hasCityPages ? cityPages.length : fallbackCities.length} villes</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{zoneData.title}</span>
              </div>

              <h1
                id="hero-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                Villes couvertes dans{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">{zoneData.title}</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in-up">
                Nous intervenons à domicile dans {zoneData.title} pour le nettoyage de <strong className="text-foreground">matelas</strong>,{' '}
                <strong className="text-foreground">canapés en tissu</strong>, <strong className="text-foreground">tapis</strong> et <strong className="text-foreground">moquettes</strong>.
              </p>

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

        {/* VILLES AVEC PAGES */}
        {hasCityPages && (
          <section
            className="py-16 md:py-24 bg-card border-y border-border/80"
            aria-labelledby="city-pages-title">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <h2
                    id="city-pages-title"
                    className="text-2xl font-black text-foreground">
                    Pages locales disponibles
                  </h2>
                  <p className="text-muted-foreground">Sélection de villes avec page dédiée</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in-up">
                {cityPages.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/zones/${zoneData.slug}/ville/${city.slug}`}
                    className={cn(
                      'group relative block rounded-3xl bg-background p-6',
                      'border border-border/80 overflow-hidden',
                      'transition-all duration-500',
                      'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1',
                    )}>
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        <h3 className="font-bold text-foreground group-hover:text-emerald-700 transition-colors">{city.name}</h3>
                      </div>
                      {city.market?.angle && <p className="text-sm text-muted-foreground line-clamp-2">{city.market.angle}</p>}
                      <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm transition-transform duration-200 group-hover:translate-x-1">
                        Voir la page
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTEURS FALLBACK */}
        {!hasCityPages && hasFallback && (
          <section
            className="py-16 md:py-24 bg-card border-y border-border/80"
            aria-labelledby="sectors-title">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
                <div className="p-3 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h2
                    id="sectors-title"
                    className="text-2xl font-black text-foreground">
                    Secteurs couverts
                  </h2>
                  <p className="text-muted-foreground">Nous couvrons ces secteurs dans {zoneData.title}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 animate-fade-in-up">
                {fallbackCities.map((name) => (
                  <span
                    key={name}
                    className="px-4 py-2 rounded-full bg-background border border-border/80 text-sm font-medium text-slate-700">
                    {name}
                  </span>
                ))}
              </div>

              <Card className="mt-8 animate-fade-in-up border-amber-200 bg-amber-50">
                <CardContent className="p-6">
                  <p className="text-amber-800">
                    Vous ne voyez pas votre secteur ?{' '}
                    <Link
                      href="/devis"
                      className="font-semibold underline underline-offset-4 hover:text-amber-900">
                      Demandez un devis
                    </Link>
                    , on vous répond rapidement.
                  </p>
                </CardContent>
              </Card>
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
                  Vous êtes dans une autre ville ?
                </h2>
                <p className="mt-2 text-emerald-100">Nous couvrons toute la zone {zoneData.title}. Demandez un devis.</p>
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

        {/* EXPLORER LA ZONE */}
        <section
          className="py-16 md:py-24 bg-muted"
          aria-labelledby="explore-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <div className="p-3 rounded-2xl bg-linear-to-br from-slate-700 to-slate-900 text-white shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2
                id="explore-title"
                className="text-2xl font-black text-foreground">
                Explorer {zoneData.title}
              </h2>
            </div>

            {/* Page zone */}
            <div className="mb-8 animate-fade-in-up">
              <Link
                href={`/zones/${zoneData.slug}`}
                className={cn(
                  'group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border/80',
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
                    'group relative block rounded-2xl bg-card p-5',
                    'border border-border/80 overflow-hidden',
                    'transition-all duration-300',
                    'hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1',
                  )}>
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
      </main>
    </>
  );
}
