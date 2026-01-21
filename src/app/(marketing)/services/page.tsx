import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
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
  Play,
  CreditCard,
  Clock,
  Droplets,
} from 'lucide-react';
import { SERVICES } from '@/lib/services';
import { ImageSlider } from '@/components/home/ImageSlider';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

const images = [
  { src: '/images/services/Canape.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de canapé professionnel' },
  { src: '/images/services/Matelas.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de matelas professionnel' },
  { src: '/images/services/Tapis.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de tapis professionnel' },
  { src: '/images/services/Canape2.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de canapé avant après' },
];

const SERVICE_ICONS = {
  matelas: BedDouble,
  'canape-tissu': Sofa,
  tapis: RectangleHorizontal,
  moquette: Grid3X3,
} as const;

const HUB = {
  useCases: [
    { text: 'Taches du quotidien (boissons, nourriture)', icon: Droplets },
    { text: 'Odeurs (animaux, tabac, transpiration)', icon: Shield },
    { text: "Auréoles / traces d'usage", icon: Sparkles },
    { text: 'Textiles ternis, encrassés (zones de passage)', icon: Clock },
  ],
  limits: ["Décolorations et brûlures (ce n'est pas une tache)", 'Certaines taches très anciennes "fixées"', 'Fibres endommagées par usure (on améliore, sans "réparer")'],
  priceHint: "Le tarif dépend du textile, des dimensions/surfaces et de l'état. Le plus efficace : envoyer 2–3 photos + dimensions approximatives pour un devis clair.",
};

const LOCAL_LINKS = [
  { label: 'Paris', zone: 'paris' },
  { label: 'Hauts-de-Seine', zone: 'hauts-de-seine' },
  { label: 'Val-de-Marne', zone: 'val-de-marne' },
];

const FAQS = [
  {
    q: 'Quels textiles nettoyez-vous à domicile ?',
    a: "Nous nettoyons les matelas, canapés en tissu, tapis et moquettes avec une méthode d'injection-extraction. Pour les autres textiles (canapés en cuir, fauteuils, rideaux, etc.), contactez-nous pour un devis personnalisé.",
  },
  {
    q: 'Comment prendre soin de mes textiles après le nettoyage ?',
    a: "Évitez l'exposition directe au soleil et l'humidité excessive. Aérez régulièrement la pièce et utilisez des housses de protection pour prolonger la propreté de vos textiles.",
  },
  {
    q: 'Combien de temps dure une intervention ?',
    a: 'En général : matelas ou canapé entre 45 min et 1h30. Tapis/moquette : selon surface et état. On vous donne une estimation réaliste au moment du devis.',
  },
  {
    q: 'Le textile est-il sec en partant ?',
    a: "Grâce à l'extraction, on limite fortement l'eau résiduelle. Le séchage complet prend souvent quelques heures selon aération et température.",
  },
];

export const metadata: Metadata = {
  title: 'Services de nettoyage textile à domicile | MOKET',
  description: 'Découvrez les services MOKET : nettoyage de matelas, canapé en tissu, tapis et moquette à domicile. Méthode injection-extraction, devis rapide.',
  alternates: { canonical: `${SITE_URL}/services` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Services de nettoyage textile à domicile | MOKET',
    description: 'Nettoyage de matelas, canapé en tissu, tapis et moquette à domicile. Méthode injection-extraction, devis rapide.',
    url: `${SITE_URL}/services`,
    type: 'website',
    siteName: 'MOKET',
    locale: 'fr_FR',
  },
};

const pageUrl = `${SITE_URL}/services`;

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'Services de nettoyage textile à domicile',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#localbusiness` },
      inLanguage: 'fr-FR',
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      mainEntity: { '@id': `${pageUrl}#faq` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: pageUrl },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#services`,
      name: 'Liste des services',
      itemListElement: SERVICES.map((s, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: s.title,
        url: `${SITE_URL}/services/${s.slug}`,
      })),
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

export default function ServicesPage() {
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
          id="jsonld-services"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />

        {/* HERO */}
        <section
          className="relative py-8 md:py-20 overflow-hidden"
          aria-labelledby="services-title">
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
              <span className="text-foreground font-medium">Services</span>
            </nav>
            <div className="max-w-3xl">
              {/* Badge 
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700">Intervention à domicile</span>
              </div>
*/}
              <h1
                id="services-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                Nettoyage textile{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">professionnel</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full" />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                Nettoyage à domicile par <strong className="text-foreground">injection-extraction</strong>. On adapte le protocole selon la matière, la couleur et le type de salissures pour un
                résultat net.
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
            </div>
          </div>
        </section>

        {/* USE CASES & LIMITS */}
        <section className="py-8 md:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Use Cases */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-lg shadow-slate-200/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Cas fréquents</h2>
                    <p className="text-sm text-muted-foreground">Ce qu'on traite régulièrement</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {HUB.useCases.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 transition-all hover:bg-emerald-50">
                        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-foreground font-medium">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Limits */}
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
                  {HUB.limits.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                        <span className="text-amber-700 text-xs font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Tarif :</strong> {HUB.priceHint}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section
          className="py-16 md:py-24 bg-card"
          aria-labelledby="choose-service">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-12">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Nos services
              </Badge>
              <h2
                id="choose-service"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Choisir un service
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Sélectionnez le textile à nettoyer pour en savoir plus sur notre méthode et nos tarifs.</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
              {/* Service Cards - 3 columns */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SERVICES.map((s) => {
                  const Icon = SERVICE_ICONS[s.slug as keyof typeof SERVICE_ICONS] || Sparkles;
                  return (
                    <article
                      key={s.slug}
                      className={cn(
                        'group relative rounded-3xl bg-white p-6',
                        'border border-border/80 overflow-hidden',
                        'transition-all duration-500',
                        'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-border hover:-translate-y-1',
                      )}>
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-linear-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>

                        <div className="mt-5">
                          <Button
                            asChild
                            className="rounded-full w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                            <Link href={`/services/${s.slug}`}>
                              Voir le service
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>

                        {/* Zone links */}
                        <div className="mt-5 pt-5 border-t border-border">
                          <p className="text-xs font-semibold text-muted-foreground mb-2">Par zone :</p>
                          <div className="flex flex-wrap gap-2">
                            {LOCAL_LINKS.map((z) => (
                              <Link
                                key={`${z.zone}-${s.slug}`}
                                href={`/zones/${z.zone}/${s.slug}`}
                                className="inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1 text-xs transition-colors">
                                <MapPin className="h-3 w-3" />
                                {z.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Image Slider - 2 columns, sticky */}
              <div className="lg:col-span-2 lg:sticky lg:top-24">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/50">
                  <ImageSlider
                    images={images}
                    autoPlayActive
                    intervalMs={3500}
                    heightClass="h-[360px] md:h-[480px]"
                  />
                </div>

                {/* Quick stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 p-4 text-white text-center">
                    <div className="text-3xl font-black">150+</div>
                    <div className="text-sm text-emerald-100">Interventions</div>
                  </div>
                  <div className="rounded-2xl bg-slate-900 p-4 text-white text-center">
                    <div className="text-3xl font-black">98%</div>
                    <div className="text-sm text-slate-400">Satisfaits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section
          className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden"
          aria-labelledby="gallery-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 mb-4">
                <Play className="h-4 w-4 mr-2" />
                Résultats visibles
              </Badge>
              <h2
                id="gallery-title"
                className="text-3xl md:text-4xl font-black tracking-tight">
                Transformations réelles
              </h2>
              <p className="mt-4 text-lg text-slate-400">Découvrez le résultat de nos interventions sur canapés, matelas et tapis.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <ImageSlider
                images={images}
                autoPlayActive
                intervalMs={4000}
                heightClass="h-[400px] md:h-[500px]"
              />
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-3xl bg-linear-to-br from-emerald-600 to-teal-600 p-8 md:p-12 text-white shadow-xl shadow-emerald-600/20">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black">Obtenir un devis gratuit</h2>
                  <p className="mt-4 text-emerald-100 text-lg">Envoyez 2–3 photos (vue d'ensemble + zone à traiter) et recevez un tarif clair sous 24h.</p>

                  <ul className="mt-6 space-y-3">
                    {['Réponse rapide', 'Prix annoncé avant', 'Sans engagement'].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full h-14 text-lg font-semibold bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg">
                    <Link href="/devis">
                      Demander un devis
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10">
                    <a href={`tel:${PHONE}`}>
                      <Phone className="h-5 w-5 mr-2" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10">
                    <Link href="/tarifs">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Voir les tarifs
                    </Link>
                  </Button>
                </div>
              </div>
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
                Questions fréquentes
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
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Prêt à redonner vie à vos textiles ?</h2>
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
