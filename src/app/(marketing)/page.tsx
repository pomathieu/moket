import Link from 'next/link';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield, Droplets, Clock, Sparkles, BadgeCheck, Leaf, Footprints, SprayCan, PhoneCall, FileText, ArrowRight, Play, Star, ChevronRight } from 'lucide-react';
import { VideoSlider } from '@/components/home/VideoSlider';
import { ImageSlider } from '@/components/home/ImageSlider';
import { PriceCalculator } from '@/components/home/PriceCalculator';
import { cn } from '@/lib/utils';

const videos = [
  { src: '/videos/moket-hero.mp4', poster: '/images/posters/moket-hero.webp' },
  { src: '/videos/moket-hero-2.mp4', poster: '/images/posters/moket-hero-2.webp' },
];

const images = [
  { src: '/images/services/Canape.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de canapé professionnel à domicile' },
  { src: '/images/services/Matelas.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de matelas professionnel à domicile' },
  { src: '/images/services/Tapis.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de tapis professionnel à domicile' },
  { src: '/images/services/Canape2.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de canapé avant après' },
];

const FAQS = [
  {
    q: 'En combien de temps mon tissu sèche ?',
    a: "La plupart du temps, le textile est sec en quelques heures. Ça varie selon la matière, l'aération et l'humidité ambiante. Grâce à l'extraction, on limite l'eau résiduelle, et on vous donne les bons gestes pour accélérer le séchage (aérer, chauffer légèrement, etc.).",
  },
  {
    q: 'Est-ce que toutes les taches partent ?',
    a: 'On récupère la grande majorité des taches du quotidien, surtout quand elles sont récentes. En revanche, certaines traces très anciennes (décoloration, brûlure, migration de teinture, auréoles "fixées") peuvent ne pas disparaître totalement. On vise le meilleur résultat possible, sans prendre le risque d\'abîmer le textile.',
  },
  {
    q: 'Vous pouvez intervenir sur des tissus fragiles ?',
    a: "Oui, à condition d'adapter le protocole. Chez MOKET nous tenons compte de la matière, de la couleur et de la tenue du textile. Si nécessaire, on fait un test discret avant de traiter la zone complète. Le but est simple : un résultat net, sans mauvaise surprise.",
  },
  {
    q: 'Vous traitez les odeurs (tabac, animaux, transpiration) ?',
    a: "Oui, et c'est souvent là que l'injection-extraction fait la différence : on retire la saleté incrustée, pas seulement l'odeur en surface. Selon l'origine (urine ancienne, humidité, moisissures), on vous dira clairement ce qu'on peut améliorer, et ce qui restera limité.",
  },
  {
    q: 'Combien de temps dure une intervention ?',
    a: "Ça dépend de la taille et de l'état. En général : matelas ou canapé entre 45 minutes et 1h30. Pour un tapis ou une moquette, c'est variable. Au moment du devis, on vous donne une estimation réaliste.",
  },
  {
    q: 'Vous vous déplacez où ?',
    a: 'Nous intervenons en Île-de-France et en Normandie. Vous pouvez vérifier votre zone sur la page dédiée, ou nous appeler directement.',
  },
  {
    q: 'Comment obtenir un devis ?',
    a: "Le plus simple : vous envoyez 2–3 photos (vue d'ensemble + tache) et on vous répond rapidement avec un devis clair. On confirme sur place si besoin.",
  },
  {
    q: 'Intervenez-vous le week-end ?',
    a: 'Oui, selon disponibilités. Dites-nous votre zone (Île-de-France ou Normandie) et vos créneaux, on vous propose une date.',
  },
  {
    q: 'Est-ce que ça aide pour les allergies / acariens ?',
    a: "Le nettoyage par injection-extraction retire une partie des poussières et salissures incrustées. Cela peut améliorer le confort au quotidien et aider à réduire une partie des allergènes/acariens selon l'état du textile.",
  },
  {
    q: 'Proposez-vous une "désinfection" ?',
    a: 'On réalise un nettoyage en profondeur et un assainissement du textile. Pour une désinfection au sens strict, cela dépend du protocole et des produits utilisés : on vous indique clairement ce qui est fait et ce qui ne peut pas être garanti.',
  },
];

const SERVICES = [
  {
    title: 'Nettoyage de matelas',
    href: '/services/matelas',
    desc: 'Éliminez taches, odeurs et acariens. Retrouvez un matelas frais et sain pour un sommeil réparateur.',
    price: 'Dès 90€',
    priceValue: 90,
    icon: Sparkles,
  },
  {
    title: 'Nettoyage de canapé',
    href: '/services/canape-tissu',
    desc: "Traces d'usage, zones grasses, taches : redonnez vie à votre canapé avec un nettoyage en profondeur.",
    price: 'Dès 140€',
    priceValue: 140,
    icon: Shield,
  },
  {
    title: 'Nettoyage de tapis',
    href: '/services/tapis',
    desc: 'Ravivez les couleurs et éliminez les salissures incrustées. Rendu uniforme garanti.',
    price: '30€/m²',
    priceValue: 30,
    icon: Leaf,
  },
  {
    title: 'Nettoyage de moquette',
    href: '/services/moquette',
    desc: 'Surfaces complètes, bureaux ou appartements. Devis personnalisé selon vos besoins.',
    price: '12€/m²',
    priceValue: 12,
    icon: Droplets,
  },
];

const ZONES = [
  { name: 'Paris', href: '/zones/paris', postalCode: '75' },
  { name: 'Hauts-de-Seine', href: '/zones/hauts-de-seine', postalCode: '92' },
  { name: 'Val-de-Marne', href: '/zones/val-de-marne', postalCode: '94' },
  { name: 'Yvelines', href: '/zones/yvelines', postalCode: '78' },
  { name: 'Seine-Saint-Denis', href: '/zones/seine-saint-denis', postalCode: '93' },
  { name: 'Seine-Maritime', href: '/zones/seine-maritime', postalCode: '76' },
  { name: 'Calvados', href: '/zones/calvados', postalCode: '14' },
];

const PRICING = [
  { item: 'Matelas 1 place', price: '90€' },
  { item: 'Matelas 2 places', price: '120€' },
  { item: 'Canapé 2-3 places', price: '140€' },
  { item: 'Canapé 4-5 places', price: '190€' },
  { item: 'Tapis', price: '30€/m²' },
  { item: 'Moquette', price: '12€/m²' },
];

// Composants SSR avec Tailwind
function ServiceCard({
  title,
  href,
  desc,
  price,
  icon: Icon,
  className,
}: {
  title: string;
  href: string;
  desc: string;
  price: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block rounded-3xl bg-card p-6 md:p-8',
        'border border-border/80 overflow-hidden',
        'transition-all duration-500',
        'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-border hover:-translate-y-1',
        'animate-fade-in-up',
        className,
      )}
      aria-label={`${title} - ${price}`}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="p-3 rounded-2xl bg-emerald-100/80 text-emerald-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
            <Icon className="h-6 w-6" />
          </div>
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            {price}
          </Badge>
        </div>
        <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-emerald-700 font-semibold transition-transform duration-200 group-hover:translate-x-1">
          Découvrir
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function Feature({ icon: Icon, title, text, className }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; className?: string }) {
  return (
    <article
      className={cn(
        'group relative rounded-3xl bg-card p-6',
        'border border-border/80',
        'transition-all duration-300',
        'hover:shadow-xl hover:shadow-slate-200/30 hover:-translate-y-1',
        'animate-fade-in-up',
        className,
      )}>
      <div className="mb-4 inline-flex p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-bold text-foreground text-lg">{title}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
    </article>
  );
}

function Step({ number, title, text, isLast = false, className }: { number: string; title: string; text: string; isLast?: boolean; className?: string }) {
  return (
    <div className={cn('relative flex gap-6 animate-fade-in-up', className)}>
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-transform duration-300 hover:scale-110">
          {number}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-300 to-emerald-100 my-2" />}
      </div>
      {/* Content */}
      <div className="flex-1 pb-8">
        <h4 className="font-bold text-foreground text-lg">{title}</h4>
        <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function StatItem({ value, label, suffix = '', className }: { value: string; label: string; suffix?: string; className?: string }) {
  return (
    <div className={cn('text-center animate-fade-in-up', className)}>
      <div className="text-4xl md:text-5xl font-black text-emerald-600">
        {value}
        <span className="text-teal-500">{suffix}</span>
      </div>
      <div className="mt-2 text-muted-foreground font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/`;

  // Schema.org complet pour SEO local et LLM GEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'MOKET - Nettoyage textile à domicile en Île-de-France et Normandie',
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': `${base}/#localbusiness` },
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#faq` },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${base}/og.jpg`,
        },
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: pageUrl }],
      },
      // FAQPage - Important pour les featured snippets et LLM
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
              <a href="tel:+33635090095">
                <PhoneCall className="h-4 w-4 mr-2" />
                Appeler
              </a>
            </Button>
          </div>
        </div>
      </div>

      <main
        className="overflow-x-hidden pb-24 md:pb-0"
        aria-label="Contenu principal">
        <Script
          id="jsonld-home"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative min-h-[90vh] md:min-h-[70vh] flex items-center overflow-hidden"
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
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left content */}
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-700">Île-de-France • Normandie</span>
                </div>

                <h1
                  id="hero-title"
                  className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up delay-100">
                  Nettoyage de textiles à domicile{' '}
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">comme neufs</span>
                    <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                  </span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
                  <strong className="text-foreground">Canapés, matelas, tapis et moquettes</strong> — intervention professionnelle en Île-de-France et Normandie. Résultat visible immédiatement.
                </p>

                {/* Price tags */}
                <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-300">
                  {[
                    { label: 'Matelas', price: '90€' },
                    { label: 'Canapé', price: '140€' },
                    { label: 'Tapis', price: '30€/m²' },
                    { label: 'Moquette', price: '12€/m²' },
                  ].map((item, idx) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm shadow-sm animate-scale-in"
                      style={{ animationDelay: `${400 + idx * 100}ms` }}>
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-bold text-emerald-700">dès {item.price}</span>
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
                    <Link href="/devis">
                      Devis gratuit en 2 min
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 h-14 text-base font-semibold border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all">
                    <a href="tel:+33635090095">
                      <PhoneCall className="h-5 w-5 mr-2" />
                      <span itemProp="telephone">06 35 09 00 95</span>
                    </a>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in-up delay-[600ms]">
                  {['Résultat garanti', 'Devis sans surprise', 'Séchage rapide'].map((text) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-2">
                      <Check className="h-5 w-5 text-emerald-600" />
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right - Video */}
              <div className="relative animate-[slideInRight_0.8s_ease-out_0.3s_both]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/50">
                  <VideoSlider
                    videos={videos}
                    autoPlayActive
                    startAfterLcpMs={1200}
                  />
                </div>

                {/* Floating testimonial */}
                <div className="absolute -bottom-6 -left-6 md:-left-12 bg-card rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 max-w-[240px] hidden md:block animate-[floatInLeft_0.6s_ease-out_1s_both]">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground font-medium">"Canapé comme neuf, je recommande !"</p>
                  <p className="text-xs text-muted-foreground mt-1">— Marie, Paris 15e</p>
                </div>

                {/* Floating stat */}
                <div className="absolute -top-4 -right-4 md:-right-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-emerald-500/30 text-white hidden md:block animate-[floatInRight_0.6s_ease-out_1.2s_both]">
                  <div className="text-3xl font-black">150+</div>
                  <div className="text-sm text-emerald-100">interventions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section
          className="py-12 md:py-16 border-y border-border/80 bg-card"
          aria-label="Statistiques">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatItem
                value="150"
                suffix="+"
                label="Interventions"
                className="delay-100"
              />
              <StatItem
                value="98"
                suffix="%"
                label="Clients satisfaits"
                className="delay-200"
              />
              <StatItem
                value="24"
                suffix="h"
                label="Réponse rapide"
                className="delay-300"
              />
              <StatItem
                value="2"
                label="Régions couvertes"
                className="delay-400"
              />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50"
          aria-labelledby="services-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Nos services
              </Badge>
              <h2
                id="services-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Quel textile souhaitez-vous nettoyer ?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Chocolat sur le tapis ? Accident sur le canapé ? On adapte notre méthode à chaque situation.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, idx) => (
                <ServiceCard
                  key={service.title}
                  {...service}
                  icon={service.icon}
                  className={`delay-${(idx + 1) * 100}`}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                <Link href="/devis">
                  Demander un devis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-2">
                <Link href="/services">Voir tous les services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* BEFORE/AFTER Gallery */}
        <section
          className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden"
          aria-labelledby="gallery-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 mb-4">
                <Play className="h-4 w-4 mr-2" />
                Résultats visibles
              </Badge>
              <h2
                id="gallery-title"
                className="text-3xl md:text-4xl font-black tracking-tight">
                Avant / Après : nos résultats en images{' '}
              </h2>
              <p className="mt-4 text-lg text-slate-400">Découvrez le résultat de nos interventions sur canapés, matelas et tapis.</p>
            </div>

            <div className="animate-scale-in delay-200">
              <ImageSlider
                images={images}
                autoPlayActive
                intervalMs={4000}
                heightClass="h-[400px] md:h-[500px] lg:h-[600px]"
              />
            </div>
          </div>
        </section>

        {/* METHOD FEATURES */}
        <section
          className="py-20 md:py-32 bg-muted"
          aria-labelledby="method-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <BadgeCheck className="h-4 w-4 mr-2" />
                Notre méthode
              </Badge>
              <h2
                id="method-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Un protocole professionnel, adapté à vos textiles
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Pas de méthode universelle chez MOKET. On adapte chaque intervention à la matière, aux taches et à vos besoins.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Droplets, title: 'Injection-extraction', text: "Nettoyage en profondeur des fibres. L'eau chaude pénètre, les saletés remontent et sont aspirées immédiatement." },
                { icon: SprayCan, title: 'Produits adaptés', text: 'Produits professionnels choisis selon le type de textile et la nature des taches. Jamais de traitement générique.' },
                { icon: Shield, title: 'Matériel pro', text: "Machines d'extraction puissantes pour un rendu net et un séchage rapide. Résultat visible immédiatement." },
                { icon: Clock, title: 'Séchage maîtrisé', text: "Extraction maximale de l'eau + conseils personnalisés. Vos textiles sont utilisables en quelques heures." },
                { icon: Footprints, title: 'Intervention propre', text: 'Couvre-chaussures, protection des zones, nettoyage après intervention. On respecte votre intérieur.' },
                { icon: Leaf, title: 'Hygiène & assainissement', text: 'On retire la saleté incrustée : poussières, acariens et odeurs sont traités à la source.' },
              ].map((feature, idx) => (
                <Feature
                  key={feature.title}
                  {...feature}
                  className={`delay-${(idx + 1) * 100}`}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center animate-fade-in-up delay-[700ms]">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                <Link href="/notre-methode">
                  Découvrir en détail
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section
          className="py-20 md:py-32 bg-card"
          aria-labelledby="process-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="animate-fade-in-up">
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    Le processus
                  </Badge>
                  <h2
                    id="process-title"
                    className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    Comment ça se passe ?
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground mb-10">Une intervention simple et efficace, de la prise de contact au résultat final.</p>
                </div>

                <div className="flex flex-col">
                  <Step
                    number="1"
                    title="Diagnostic"
                    text="On analyse la matière, les couleurs et identifie les zones à traiter avec précaution."
                    className="delay-100"
                  />
                  <Step
                    number="2"
                    title="Pré-traitement"
                    text="Les zones problématiques reçoivent un traitement spécifique avant le nettoyage général."
                    className="delay-200"
                  />
                  <Step
                    number="3"
                    title="Injection-extraction"
                    text="Eau chaude injectée dans les fibres + aspiration immédiate des saletés remontées."
                    className="delay-300"
                  />
                  <Step
                    number="4"
                    title="Finition Souffleur"
                    text="Utilisation de souffleur à air chaud pour accélérer le séchage et assainir le textile en profondeur."
                    className="delay-400"
                  />
                  <Step
                    number="5"
                    title="Conseils"
                    text="Rendu homogène + recommandations personnalisées pour l'entretien futur."
                    isLast
                    className="delay-500"
                  />
                </div>
              </div>

              {/* Calculator */}
              <Card className="animate-fade-in-up delay-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Estimez votre devis</h3>
                  <PriceCalculator phone="+33635090095" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          className="py-20 md:py-32 bg-gradient-to-b from-muted to-background"
          aria-labelledby="pricing-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">Tarifs transparents</Badge>
              <h2
                id="pricing-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Prix clairs, sans surprise
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Tarifs annoncés avant intervention. Envoyez vos photos pour un devis précis.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="animate-fade-in-up delay-100 shadow-xl shadow-slate-200/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">Tarifs indicatifs</h3>
                  <ul className="space-y-4">
                    {PRICING.map((row, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{row.item}</span>
                        <span className="font-bold text-emerald-700">{row.price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-muted-foreground">Tarifs pour état standard. Ajustement possible en cas d'encrassement important.</p>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white animate-fade-in-up delay-200">
                <h3 className="text-xl font-bold mb-6">Ce qui est inclus</h3>
                <ul className="space-y-4">
                  {[
                    'Pré-traitement ciblé des taches',
                    'Injection-extraction en profondeur',
                    'Finition vapeur & séchage optimisé',
                    "Conseils d'entretien personnalisés",
                    'Intervention propre & protégée',
                    'Devis gratuit sans engagement',
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg">
                    <Link href="/devis">
                      Demander un devis gratuit
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ZONES - Important pour SEO local */}
        <section
          className="py-20 md:py-28 bg-card"
          aria-labelledby="zones-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">Zones d'intervention</Badge>
              <h2
                id="zones-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Nettoyage textile à domicile près de chez vous{' '}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                Intervention à domicile en <strong className="text-foreground">Île-de-France</strong> et en <strong className="text-foreground">Normandie</strong>.
              </p>
            </div>

            <nav
              className="mt-10 flex flex-wrap gap-3 animate-fade-in-up delay-200"
              aria-label="Zones d'intervention">
              {ZONES.map((zone) => (
                <Button
                  key={zone.name}
                  asChild
                  variant="outline"
                  className="rounded-full border-2 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all">
                  <Link href={zone.href}>{zone.name}</Link>
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
            </nav>
          </div>
        </section>

        {/* FAQ - Important pour SEO */}
        <section
          className="py-20 md:py-32 bg-muted"
          aria-labelledby="faq-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">FAQ</Badge>
              <h2
                id="faq-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Vos questions fréquentes
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Les réponses aux questions qu'on nous pose le plus souvent.</p>
            </div>

            <div className="max-w-3xl mx-auto animate-fade-in-up delay-200">
              <Accordion
                type="single"
                collapsible
                className="space-y-4">
                {FAQS.map((f, idx) => (
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
              Prêt à redonner vie à vos textiles ?
            </h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up delay-100">Envoyez-nous quelques photos et recevez un devis clair en moins de 24h. Sans engagement.</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
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
                <a href="tel:+33635090095">
                  <PhoneCall className="h-5 w-5 mr-2" />
                  06 35 09 00 95
                </a>
              </Button>
            </div>

            <p className="mt-8 text-emerald-200 text-sm animate-fade-in-up delay-300">Réponse sous 24h • Devis sans engagement • Paiement après intervention</p>
          </div>
        </section>
      </main>
    </>
  );
}
