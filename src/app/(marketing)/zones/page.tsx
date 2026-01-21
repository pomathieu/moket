import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ZONES } from '@/lib/zones';
import { MapPin, ChevronRight, ArrowRight, PhoneCall, FileText, Check, Clock, Truck, Calendar, Shield, Sparkles, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

export const metadata: Metadata = {
  title: "Zones d'intervention | MOKET",
  description: "Découvrez toutes les zones d'intervention MOKET : Île-de-France et Normandie. Consultez votre zone pour connaître les modalités et délais.",
  alternates: { canonical: `${SITE_URL}/zones` },
  robots: { index: true, follow: true },
};

const PROCESS_STEPS = [
  {
    icon: FileText,
    title: 'Demande de devis',
    desc: 'Envoyez vos photos, on vous répond sous 24h avec un devis clair.',
  },
  {
    icon: Calendar,
    title: 'Prise de RDV',
    desc: 'On cale un créneau selon votre zone et nos disponibilités.',
  },
  {
    icon: Truck,
    title: 'Intervention',
    desc: 'On vient chez vous avec tout le matériel nécessaire.',
  },
  {
    icon: Sparkles,
    title: 'Résultat',
    desc: 'Textile nettoyé en profondeur, séchage rapide garanti.',
  },
];

export default function ZonesPage() {
  const idf = ZONES.filter((z) => z.regionLabel === 'Île-de-France');
  const normandie = ZONES.filter((z) => z.regionLabel === 'Normandie');

  const pageUrl = `${SITE_URL}/zones`;

  const zonesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Zones d'intervention",
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Zones', item: pageUrl },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#zones`,
        name: 'Liste des zones',
        itemListElement: ZONES.map((z, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: z.title,
          url: `${SITE_URL}/zones/${z.slug}`,
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

      <main
        className="overflow-x-hidden pb-24 md:pb-0"
        aria-label="Zones d'intervention MOKET">
        <Script
          id="jsonld-zones"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(zonesJsonLd) }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative py-8 md:py-20 overflow-hidden"
          aria-labelledby="zones-title">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[37.5rem] h-[37.5rem] bg-gradient-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
                <Link
                  href="/"
                  className="hover:text-emerald-600 transition-colors">
                  Accueil
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">Zones d&#39;intervention</span>
              </nav>

              {/* Badge 
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700">2 régions couvertes</span>
              </div>
*/}
              <h1
                id="zones-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                Zones{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">d&#39;intervention</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in-up">
                Intervention à domicile en <strong className="text-foreground">Île-de-France</strong> et en <strong className="text-foreground">Normandie</strong>. Consultez votre zone pour connaître
                les modalités et délais.
              </p>

              {/* Stats rapides */}
              <div className="mt-8 flex flex-wrap gap-6 animate-fade-in-up">
                {[
                  { icon: MapPin, label: '2 régions', desc: 'IDF & Normandie' },
                  { icon: Clock, label: 'Sous 24-48h', desc: 'Réponse rapide' },
                  { icon: Shield, label: 'Devis gratuit', desc: 'Sans engagement' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100">
                      <item.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
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
                  <a href={`tel:${PHONE}`}>
                    <PhoneCall className="h-5 w-5 mr-2" />
                    <span itemProp="telephone">{PHONE_DISPLAY}</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ZONES ILE-DE-FRANCE */}
        <section
          className="py-16 md:py-24 bg-card border-y border-border/80"
          aria-labelledby="idf-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h2
                  id="idf-title"
                  className="text-2xl md:text-3xl font-black text-foreground">
                  Île-de-France
                </h2>
                <p className="text-muted-foreground">{idf.length} départements couverts</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in-up">
              {idf.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/zones/${zone.slug}`}
                  className={cn(
                    'group relative block rounded-2xl bg-background p-4',
                    'border border-border/80 overflow-hidden',
                    'transition-all duration-300',
                    'hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1',
                  )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground bg-slate-100 px-2 py-1 rounded-md">{zone.postalCode}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">{zone.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ZONES NORMANDIE */}
        <section
          className="py-16 md:py-24 bg-muted"
          aria-labelledby="normandie-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h2
                  id="normandie-title"
                  className="text-2xl md:text-3xl font-black text-foreground">
                  Normandie
                </h2>
                <p className="text-muted-foreground">{normandie.length} départements couverts</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in-up">
              {normandie.map((zone) => (
                <Link
                  key={zone.slug}
                  href={`/zones/${zone.slug}`}
                  className={cn(
                    'group relative block rounded-2xl bg-card p-4',
                    'border border-border/80 overflow-hidden',
                    'transition-all duration-300',
                    'hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-200 hover:-translate-y-1',
                  )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground bg-slate-100 px-2 py-1 rounded-md">{zone.postalCode}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-emerald-700 transition-colors">{zone.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COMMENT CA SE PASSE */}
        <section
          className="py-20 md:py-32 bg-card"
          aria-labelledby="process-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Clock className="h-4 w-4 mr-2" />
                Le processus
              </Badge>
              <h2
                id="process-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Comment ça se passe ?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">De la demande de devis à l&#39;intervention, tout est simple et transparent.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step, idx) => (
                <Card
                  key={step.title}
                  className="animate-fade-in-up border-border/80 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                          <step.icon className="h-6 w-6" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center">{idx + 1}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* INFOS PRATIQUES */}
        <section
          className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden"
          aria-labelledby="infos-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  Infos pratiques
                </Badge>
                <h2
                  id="infos-title"
                  className="text-3xl md:text-4xl font-black tracking-tight">
                  Intervention à domicile dans votre zone
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  Nous intervenons à domicile pour le nettoyage de matelas, canapés en tissu, tapis et moquettes avec une méthode d&#39;extraction profonde.
                </p>

                <ul className="mt-8 space-y-4">
                  {['Délais variables selon la zone et la tournée', 'Créneaux matin, après-midi ou soirée', 'Matériel professionnel apporté sur place', 'Paiement après intervention uniquement'].map(
                    (item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ),
                  )}
                </ul>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
                    <a href={`tel:${PHONE}`}>
                      <PhoneCall className="h-5 w-5 mr-2" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Carte stylisée */}
              <div className="relative animate-fade-in-up">
                <div className="relative bg-slate-800/50 rounded-3xl p-8 border border-slate-700">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl p-6 border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <span className="font-semibold text-white">Île-de-France</span>
                      </div>
                      <p className="text-3xl font-black text-blue-400">{idf.length}</p>
                      <p className="text-sm text-slate-400">départements</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl p-6 border border-emerald-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                        <span className="font-semibold text-white">Normandie</span>
                      </div>
                      <p className="text-3xl font-black text-emerald-400">{normandie.length}</p>
                      <p className="text-sm text-slate-400">départements</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-slate-700/50 border border-slate-600">
                    <p className="text-sm text-slate-300 flex items-start gap-2">
                      <Clock className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Réponse sous 24h</strong> — Envoyez vos photos et recevez un devis clair rapidement.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          className="py-20 md:py-32 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden"
          aria-labelledby="final-cta-title">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2
              id="final-cta-title"
              className="text-3xl md:text-5xl font-black tracking-tight animate-fade-in-up">
              Votre zone est couverte ?
            </h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up">Envoyez-nous quelques photos et recevez un devis clair en moins de 24h. Sans engagement.</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
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
                  <PhoneCall className="h-5 w-5 mr-2" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>

            <p className="mt-8 text-emerald-200 text-sm animate-fade-in-up">Réponse sous 24h • Devis sans engagement • Paiement après intervention</p>
          </div>
        </section>
      </main>
    </>
  );
}
