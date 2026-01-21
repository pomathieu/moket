import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BadgeCheck,
  Check,
  Clock,
  Droplets,
  FileImage,
  Leaf,
  Shield,
  SprayCan,
  Footprints,
  ArrowRight,
  PhoneCall,
  FileText,
  Play,
  Sparkles,
  ChevronRight,
  Zap,
  ThermometerSun,
  Eye,
  HandHelping,
  Phone,
} from 'lucide-react';
import { VideoSlider } from '@/components/home/VideoSlider';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const BRAND = 'MOKET';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

export const metadata: Metadata = {
  title: `Notre méthode d'injection-extraction | Nettoyage textile à domicile | ${BRAND}`,
  description: 'Découvrez la méthode MOKET : diagnostic, pré-traitement, injection-extraction, finition. Canapés, matelas, tapis, moquettes. Intervention à domicile en Île-de-France et Normandie.',
  alternates: { canonical: `${SITE_URL}/notre-methode` },
  openGraph: {
    title: `Notre méthode de nettoyage textile | ${BRAND}`,
    description: 'Protocole clair : diagnostic, pré-traitement, injection-extraction, finition. Résultat net, séchage maîtrisé. IDF & Normandie.',
    url: `${SITE_URL}/notre-methode`,
    type: 'website',
  },
};

const videos = [
  { src: '/videos/moket-hero.mp4', poster: '/images/posters/moket-hero.webp' },
  { src: '/videos/moket-hero-2.mp4', poster: '/images/posters/moket-hero-2.webp' },
];

const STEPS = [
  {
    number: '1',
    title: 'Diagnostic',
    text: 'On identifie la matière, la tenue des couleurs, les zones à risque (auréoles, migration) et la nature des taches/odeurs. Si nécessaire : test discret.',
    icon: Eye,
  },
  {
    number: '2',
    title: 'Pré-traitement ciblé',
    text: "On traite d'abord les zones problématiques (taches, zones grasses, auréoles). Action manuelle adaptée, sans agresser la fibre.",
    icon: SprayCan,
  },
  {
    number: '3',
    title: 'Injection-extraction',
    text: "On injecte (souvent à l'eau tiède/chaude selon textile) puis on extrait immédiatement l'eau chargée en saletés. C'est le cœur du résultat.",
    icon: Droplets,
  },
  {
    number: '4',
    title: 'Séchage au Souffleur',
    text: 'On utilise des souffleurs à air chaud pour accélérer le séchage et assainir le textile en profondeur.',
    icon: ThermometerSun,
  },
  {
    number: '5',
    title: 'Finition & conseils',
    text: 'On homogénéise le rendu, on contrôle le séchage, et on vous donne les bons gestes (aération, chauffage léger, etc.).',
    icon: HandHelping,
  },
];

const PRINCIPES = [
  {
    icon: Footprints,
    title: 'Intervention propre',
    text: 'Couvre-chaussures, protection des zones, et nettoyage après intervention. On respecte votre intérieur.',
  },
  {
    icon: Shield,
    title: 'Matériel professionnel',
    text: 'Extraction puissante : on retire l\'eau chargée en saletés (pas juste un "rafraîchissement").',
  },
  {
    icon: FileImage,
    title: 'Contrôle du risque',
    text: 'On adapte le protocole aux tissus fragiles. Le but : net, sans mauvaise surprise.',
  },
  {
    icon: Leaf,
    title: 'Hygiène & confort',
    text: 'Odeurs mieux traitées, textile plus sain au quotidien. Résultat visible immédiatement.',
  },
];

const COMPARAISON = [
  {
    method: 'Shampoing classique',
    points: [
      { text: 'Travaille en surface', negative: true },
      { text: 'Déplace la saleté', negative: true },
      { text: 'Séchage long', negative: true },
      { text: "Risque d'auréoles", negative: true },
    ],
  },
  {
    method: 'Injection-extraction MOKET',
    points: [
      { text: 'Nettoie en profondeur', negative: false },
      { text: 'Extrait la saleté', negative: false },
      { text: 'Séchage maîtrisé', negative: false },
      { text: 'Rendu homogène', negative: false },
    ],
  },
];

const FAQS = [
  {
    q: 'Quelle est la différence avec un shampoing canapé classique ?',
    a: "Le shampoing travaille souvent en surface. L'injection-extraction décroche la saleté dans la fibre et l'extrait immédiatement. On limite l'eau résiduelle et on évite de \"déplacer\" la saleté.",
  },
  {
    q: 'En combien de temps mon textile sèche ?',
    a: "Souvent en quelques heures. Ça varie selon la matière, l'aération et l'humidité. Grâce à l'extraction, on limite l'eau résiduelle, et on vous donne les bons gestes pour accélérer.",
  },
  {
    q: 'Est-ce que toutes les taches partent ?',
    a: 'On récupère la grande majorité des taches du quotidien, surtout quand elles sont récentes. Certaines traces anciennes (décoloration, brûlure, migration de teinture) peuvent rester partiellement visibles.',
  },
  {
    q: 'Vous intervenez sur des tissus fragiles ?',
    a: "Oui, à condition d'adapter le protocole. Si nécessaire, on fait un test discret avant de traiter la zone complète.",
  },
  {
    q: 'Combien de temps dure une intervention ?',
    a: "Ça dépend de la taille et de l'état. En général : matelas ou canapé entre 45 minutes et 1h30. Pour un tapis ou une moquette, c'est variable selon la surface.",
  },
  {
    q: 'Y a-t-il des textiles que vous ne pouvez pas traiter ?',
    a: 'Certains tissus très délicats (soie naturelle, certains velours) nécessitent une attention particulière. On vous le dit clairement au moment du diagnostic.',
  },
];

// Composants réutilisables avec le même style que la homepage

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

function Step({
  number,
  title,
  text,
  icon: Icon,
  isLast = false,
  className,
}: {
  number: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('relative flex gap-6 animate-fade-in-up', className)}>
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xl shadow-lg shadow-emerald-500/30 transition-transform duration-300 hover:scale-110">
          {number}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-300 to-emerald-100 my-3" />}
      </div>
      {/* Content */}
      <div className="flex-1 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-5 w-5 text-emerald-600" />
          <h4 className="font-bold text-foreground text-xl">{title}</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
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

export default function NotreMethodePage() {
  const pageUrl = `${SITE_URL}/notre-methode`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Notre méthode d'injection-extraction",
        description:
          'Découvrez la méthode MOKET : diagnostic, pré-traitement, injection-extraction, finition. Canapés, matelas, tapis, moquettes. Intervention à domicile en Île-de-France et Normandie.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#faq` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Notre méthode', item: pageUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: 'Nettoyage de textiles à domicile (injection-extraction)',
        serviceType: 'Nettoyage textile à domicile',
        url: pageUrl,
        provider: { '@id': `${SITE_URL}/#localbusiness` },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Île-de-France' },
          { '@type': 'AdministrativeArea', name: 'Normandie' },
        ],
        category: ['Nettoyage canapé tissu', 'Nettoyage matelas', 'Nettoyage tapis', 'Nettoyage moquette'],
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
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

      <main
        className="overflow-x-hidden pb-24 md:pb-0"
        aria-label="Notre méthode de nettoyage">
        <Script
          id="jsonld-notre-methode"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative py-8 md:py-20 overflow-hidden"
          aria-labelledby="method-title">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-gradient-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-150 h-150 bg-gradient-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left content */}
              <div className="max-w-2xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
                  <Link
                    href="/"
                    className="hover:text-emerald-600 transition-colors">
                    Accueil
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium">Notre méthode</span>
                </nav>

                {/* Badge
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-700">Injection-extraction professionnelle</span>
                </div>
                 */}

                <h1
                  id="hero-title"
                  className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up delay-100">
                  Notre méthode de nettoyage{' '}
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">en profondeur</span>
                    <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                  </span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
                  On ne se contente pas de "rafraîchir". L'idée : <strong className="text-foreground">retirer ce qui est dans la fibre</strong>, puis{' '}
                  <strong className="text-foreground">extraire immédiatement</strong> les tâches, impuretés et allergènes. Un protocole adapté à chaque textile.
                </p>

                {/* Key points */}
                <div className="mt-8 grid grid-cols-2 gap-4 animate-fade-in-up delay-300">
                  {[
                    { icon: Eye, text: 'Diagnostic personnalisé' },
                    { icon: Droplets, text: 'Nettoyage en profondeur' },
                    { icon: Zap, text: 'Extraction puissante' },
                    { icon: Clock, text: 'Séchage maîtrisé' },
                  ].map((item, idx) => (
                    <span
                      key={item.text}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground animate-scale-in"
                      style={{ animationDelay: `${400 + idx * 100}ms` }}>
                      <item.icon className="h-5 w-5 text-emerald-600" />
                      {item.text}
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

              {/* Right - Video */}
              <div className="relative animate-[slideInRight_0.8s_ease-out_0.3s_both]">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/50">
                  <VideoSlider
                    videos={videos}
                    autoPlayActive
                    startAfterLcpMs={1200}
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 md:-left-12 bg-card rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 hidden md:block animate-[floatInLeft_0.6s_ease-out_1s_both]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100">
                      <BadgeCheck className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Méthode pro</p>
                      <p className="text-sm text-muted-foreground">Résultat garanti</p>
                    </div>
                  </div>
                </div>

                {/* Floating stat */}
                <div className="absolute -top-4 -right-4 md:-right-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-emerald-500/30 text-white hidden md:block animate-[floatInRight_0.6s_ease-out_1.2s_both]">
                  <div className="text-3xl font-black">5</div>
                  <div className="text-sm text-emerald-100">étapes clés</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section
          className="py-12 md:py-16 border-y border-border/80 bg-card"
          aria-label="Statistiques méthode">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <StatItem
                value="5"
                label="Étapes du protocole"
                className="delay-100"
              />
              <StatItem
                value="98"
                suffix="%"
                label="Taches retirées"
                className="delay-200"
              />
              <StatItem
                value="2-4"
                suffix="h"
                label="Temps de séchage"
                className="delay-300"
              />
              <StatItem
                value="100"
                suffix="%"
                label="Adapté au textile"
                className="delay-400"
              />
            </div>
          </div>
        </section>

        {/* PRINCIPES - Ce qui fait la différence */}
        <section
          className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50"
          aria-labelledby="principes-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Ce qui fait la différence
              </Badge>
              <h2
                id="principes-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Un protocole professionnel, pas un simple rafraîchissement
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Chez vous, la qualité se joue sur les détails : propreté, méthode, et respect du matériau. Notre protocole vise un résultat concret, sans prise de risque inutile.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRINCIPES.map((principe, idx) => (
                <Feature
                  key={principe.title}
                  {...principe}
                  className={`delay-${(idx + 1) * 100}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* COMPARAISON */}
        <section
          className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden"
          aria-labelledby="comparaison-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 mb-4">
                <Play className="h-4 w-4 mr-2" />
                Pourquoi l'injection-extraction ?
              </Badge>
              <h2
                id="comparaison-title"
                className="text-3xl md:text-4xl font-black tracking-tight">
                La différence avec un shampoing classique
              </h2>
              <p className="mt-4 text-lg text-slate-400">Le shampoing déplace la saleté. L'injection-extraction l'extrait vraiment.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {COMPARAISON.map((col, colIdx) => (
                <Card
                  key={col.method}
                  className={cn(
                    'animate-fade-in-up',
                    colIdx === 0 ? 'bg-slate-800/50 border-slate-700' : 'bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-500',
                    `delay-${(colIdx + 1) * 100}`,
                  )}>
                  <CardContent className="p-8">
                    <h3 className={cn('text-xl font-bold mb-6', colIdx === 0 ? 'text-slate-300' : 'text-white')}>{col.method}</h3>
                    <ul className="space-y-4">
                      {col.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3">
                          <div className={cn('flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center', point.negative ? 'bg-red-500/20' : 'bg-white/20')}>
                            {point.negative ? <span className="text-red-400 text-sm">✕</span> : <Check className="h-4 w-4 text-white" />}
                          </div>
                          <span className={colIdx === 0 ? 'text-slate-300' : 'text-white'}>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* LES 5 ÉTAPES */}
        <section
          className="py-20 md:py-32 bg-muted"
          aria-labelledby="steps-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="animate-fade-in-up">
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    Le protocole
                  </Badge>
                  <h2
                    id="steps-title"
                    className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    Les 5 étapes de la méthode MOKET
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground mb-10">
                    Un protocole simple, reproductible, et adapté à <strong className="text-foreground">canapé</strong>, <strong className="text-foreground">matelas</strong>,{' '}
                    <strong className="text-foreground">tapis</strong> et <strong className="text-foreground">moquette</strong>.
                  </p>
                </div>

                <div className="flex flex-col">
                  {STEPS.map((step, idx) => (
                    <Step
                      key={step.number}
                      {...step}
                      isLast={idx === STEPS.length - 1}
                      className={`delay-${(idx + 1) * 100}`}
                    />
                  ))}
                </div>
              </div>

              {/* Card visuelle */}
              <div className="lg:sticky lg:top-32 animate-fade-in-up delay-200">
                <Card className="overflow-hidden shadow-2xl shadow-slate-200/50">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Résultat garanti</h3>
                    <p className="text-emerald-100">Chaque étape est pensée pour un résultat optimal, sans risque pour vos textiles.</p>
                  </div>
                  <CardContent className="p-8">
                    <h4 className="font-bold text-foreground mb-4">Ce que vous obtenez :</h4>
                    <ul className="space-y-3">
                      {['Textile nettoyé en profondeur', 'Taches et odeurs traitées', 'Séchage rapide (2-4h)', "Conseils d'entretien personnalisés", 'Rendu homogène et soigné'].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 space-y-3">
                      <Button
                        asChild
                        size="lg"
                        className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25">
                        <Link href="/devis">
                          Demander un devis gratuit
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full rounded-full border-2">
                        <Link href="/tarifs">Voir les tarifs</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* TEXTILES TRAITÉS */}
        <section
          className="py-20 md:py-28 bg-card"
          aria-labelledby="textiles-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Leaf className="h-4 w-4 mr-2" />
                Textiles compatibles
              </Badge>
              <h2
                id="textiles-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Cette méthode s'adapte à tous vos textiles
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Canapé, matelas, tapis, moquette : le protocole est adapté à chaque type de fibre.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Canapés', desc: 'Tissu, microfibre, velours', icon: Shield, href: '/services/canape-tissu' },
                { name: 'Matelas', desc: 'Toutes tailles et épaisseurs', icon: Sparkles, href: '/services/matelas' },
                { name: 'Tapis', desc: 'Synthétiques et naturels', icon: Leaf, href: '/services/tapis' },
                { name: 'Moquettes', desc: 'Surfaces complètes', icon: Droplets, href: '/services/moquette' },
              ].map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group relative block rounded-3xl bg-card p-6',
                    'border border-border/80 overflow-hidden',
                    'transition-all duration-500',
                    'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-border hover:-translate-y-1',
                    'animate-fade-in-up',
                    `delay-${(idx + 1) * 100}`,
                  )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="p-3 rounded-2xl bg-emerald-100/80 text-emerald-700 w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm transition-transform duration-200 group-hover:translate-x-1">
                      En savoir plus
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-20 md:py-32 bg-muted"
          aria-labelledby="faq-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">FAQ</Badge>
              <h2
                id="faq-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Questions sur notre méthode
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Les réponses aux questions qu'on nous pose le plus souvent sur l'injection-extraction.</p>
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
              Prêt à tester notre méthode ?
            </h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Envoyez-nous quelques photos et recevez un devis clair en moins de 24h. On vous explique exactement ce qu'on peut faire.
            </p>

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
                <a href={`tel:${PHONE}`}>
                  <PhoneCall className="h-5 w-5 mr-2" />
                  {PHONE_DISPLAY}
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
