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
  Shield,
  Sparkles,
  Clock,
  Leaf,
  Phone,
  ArrowRight,
  PhoneCall,
  FileText,
  ChevronRight,
  X,
  Heart,
  Eye,
  MessageSquare,
  Handshake,
  Award,
  Users,
  Star,
  ThumbsUp,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://moket.fr';
const BRAND = 'MOKET';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

export const metadata: Metadata = {
  title: `Pourquoi MOKET ? | Notre approche & engagements | ${BRAND}`,
  description: 'Pourquoi choisir MOKET : intervention propre, protocole clair, matériel pro, produits adaptés, devis transparent, respect du textile. Île-de-France & Normandie.',
  alternates: { canonical: `${SITE_URL}/pourquoi-moket` },
  openGraph: {
    title: `Pourquoi choisir ${BRAND} ?`,
    description: 'Approche MOKET : résultat concret, transparence, respect du textile, intervention propre. IDF & Normandie.',
    url: `${SITE_URL}/pourquoi-moket`,
    type: 'website',
  },
};

const PITCH = [
  {
    title: 'Transparence totale',
    points: ['Devis clair sur photos', 'On annonce ce qui est faisable (et ce qui restera limité)', 'Pas de surprise sur le prix'],
    icon: Eye,
    color: 'from-blue-500 to-indigo-600',
    shadowColor: 'shadow-blue-500/30',
  },
  {
    title: 'Qualité du rendu',
    points: ['Nettoyage en profondeur', 'Rendu homogène et soigné', 'Odeurs mieux traitées'],
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600',
    shadowColor: 'shadow-amber-500/30',
  },
  {
    title: 'Respect du textile',
    points: ['Protocole adapté à chaque matière', 'Test discret si besoin', 'Aucune prise de risque inutile'],
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
    shadowColor: 'shadow-emerald-500/30',
  },
  {
    title: 'Efficacité à domicile',
    points: ['Intervention propre et protégée', 'Séchage maîtrisé (2-4h)', 'Conseils simples après passage'],
    icon: Clock,
    color: 'from-violet-500 to-purple-600',
    shadowColor: 'shadow-violet-500/30',
  },
  {
    title: 'Hygiène & confort',
    points: ['On retire ce qui est dans la fibre', 'Odeurs traitées (animaux, tabac)', 'Aide à réduire allergènes et acariens'],
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    shadowColor: 'shadow-green-500/30',
  },
  {
    title: 'Service humain',
    points: ['Réponse rapide sous 24h', 'Échange direct par téléphone', 'Suivi personnalisé'],
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-500/30',
  },
];

const PROMESSES = {
  on: ['Un protocole adapté au textile', 'Un rendu net et homogène', 'Transparence sur le résultat attendu', 'Intervention propre et respectueuse', "Conseils d'entretien personnalisés"],
  off: ['Le "zéro défaut" sur brûlures ou décolorations', 'Disparition de migrations de teinture anciennes', 'Résultats miracles sur traces très anciennes'],
};

const FAQS = [
  {
    q: 'Pourquoi vous demandez des photos ?',
    a: "Parce que la matière, l'état et la nature des taches changent le protocole (et parfois la durée). Les photos permettent un devis fiable et un résultat plus maîtrisé.",
  },
  {
    q: 'Est-ce que vous garantissez "zéro tache" ?',
    a: 'On vise le meilleur résultat possible, sans abîmer le textile. Certaines traces anciennes (décoloration, brûlure, migration) peuvent ne pas disparaître totalement.',
  },
  {
    q: 'Intervenez-vous le week-end ?',
    a: 'Oui, selon disponibilités. Indiquez vos créneaux dans le formulaire de devis ou appelez-nous.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "Le paiement se fait après l'intervention, une fois que vous avez constaté le résultat. On accepte les espèces, carte bancaire et virement.",
  },
  {
    q: "Combien de temps à l'avance faut-il réserver ?",
    a: 'En général, on peut intervenir sous 48h à 1 semaine selon la zone et nos disponibilités. Pour les urgences, appelez-nous directement.',
  },
];

const VALEURS = [
  { icon: Handshake, label: 'Confiance', desc: 'Relation transparente' },
  { icon: Award, label: 'Qualité', desc: 'Résultat garanti' },
  { icon: Users, label: 'Proximité', desc: 'Service humain' },
  { icon: Zap, label: 'Réactivité', desc: 'Réponse sous 24h' },
];

// Composants réutilisables

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

function PitchCard({
  title,
  points,
  icon: Icon,
  color,
  shadowColor,
  className,
}: {
  title: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  shadowColor: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group relative rounded-3xl bg-card p-6 md:p-8',
        'border border-border/80 overflow-hidden',
        'transition-all duration-500',
        'hover:shadow-2xl hover:shadow-slate-200/50 hover:border-border hover:-translate-y-1',
        'animate-fade-in-up',
        className,
      )}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div
          className={cn(
            'mb-5 inline-flex p-3 rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]',
            `bg-gradient-to-br ${color} ${shadowColor}`,
          )}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <ul className="mt-4 space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-muted-foreground">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function PourquoiMoketPage() {
  const pageUrl = `${SITE_URL}/pourquoi-moket`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Pourquoi choisir ${BRAND} ?`,
        description: 'Pourquoi choisir MOKET : intervention propre, protocole clair, matériel pro, produits adaptés, devis transparent, respect du textile. Île-de-France & Normandie.',
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
          { '@type': 'ListItem', position: 2, name: 'Pourquoi MOKET', item: pageUrl },
        ],
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
        aria-label="Pourquoi choisir MOKET">
        <Script
          id="jsonld-pourquoi-moket"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />

        {/* HERO */}
        <section
          className="relative py-8 md:py-20 overflow-hidden"
          aria-labelledby="pourquoi-moket-title">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-200 h-[50rem] bg-gradient-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
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
                <span className="text-foreground font-medium">Pourquoi MOKET</span>
              </nav>

              {/* Badge 
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700">Notre philosophie</span>
              </div>
*/}
              <h1
                id="pourquoi-moket-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up delay-100">
                Pourquoi choisir{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">MOKET</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full animate-[scaleX_0.6s_ease-out_0.8s_both] origin-left" />
                </span>{' '}
                ?
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in-up delay-200">
                Une approche simple : <strong className="text-foreground">un protocole clair</strong>, un résultat concret, et une <strong className="text-foreground">transparence totale</strong> sur
                ce qu'on peut améliorer (et ce qui restera limité).
              </p>

              {/* Valeurs rapides */}
              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up delay-300">
                {VALEURS.map((valeur, idx) => (
                  <div
                    key={valeur.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm animate-scale-in"
                    style={{ animationDelay: `${400 + idx * 100}ms` }}>
                    <div className="p-2 rounded-xl bg-emerald-100">
                      <valeur.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{valeur.label}</p>
                      <p className="text-xs text-muted-foreground">{valeur.desc}</p>
                    </div>
                  </div>
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
                    <Phone className="h-5 w-5 mr-2" />
                    <span itemProp="telephone">{PHONE_DISPLAY}</span>
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in-up delay-[600ms]">
                {['Intervention propre', 'Devis sans surprise', 'Résultat visible'].map((text) => (
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

        {/* STATS BAR */}
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
                value="5"
                suffix="★"
                label="Note moyenne"
                className="delay-400"
              />
            </div>
          </div>
        </section>

        {/* NOTRE APPROCHE */}
        <section
          className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50"
          aria-labelledby="approche-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Notre approche
              </Badge>
              <h2
                id="approche-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Ce qui nous différencie
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">On peut résumer MOKET simplement : faire propre, faire juste, et faire clair. Voici ce que ça veut dire concrètement.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PITCH.map((item, idx) => (
                <PitchCard
                  key={item.title}
                  {...item}
                  className={`delay-${(idx + 1) * 100}`}
                />
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-[700ms]">
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
                <Link href="/notre-methode">Voir notre méthode</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CE QU'ON PROMET / CE QU'ON NE PROMET PAS */}
        <section
          className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden"
          aria-labelledby="promesses-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 mb-4">
                <MessageSquare className="h-4 w-4 mr-2" />
                Notre engagement
              </Badge>
              <h2
                id="promesses-title"
                className="text-3xl md:text-4xl font-black tracking-tight">
                Ce qu'on promet (et ce qu'on ne promet pas)
              </h2>
              <p className="mt-4 text-lg text-slate-400">On préfère être clair plutôt que vendre un miracle. Voici nos engagements réels.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Ce qu'on promet */}
              <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 border-emerald-500 animate-fade-in-up delay-100">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-white/20">
                      <ThumbsUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Ce qu'on promet</h3>
                  </div>
                  <ul className="space-y-4">
                    {PROMESSES.on.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Ce qu'on ne promet pas */}
              <Card className="bg-slate-800/50 border-slate-700 animate-fade-in-up delay-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-slate-700">
                      <X className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300">Ce qu'on ne promet pas</h3>
                  </div>
                  <ul className="space-y-4">
                    {PROMESSES.off.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center mt-0.5">
                          <X className="h-4 w-4 text-slate-500" />
                        </div>
                        <span className="text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 rounded-2xl bg-slate-700/50 border border-slate-600">
                    <p className="text-sm text-slate-300 flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Notre objectif :</strong> le meilleur résultat possible, sans abîmer votre textile.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGE / CONFIANCE */}
        <section
          className="py-20 md:py-28 bg-card"
          aria-labelledby="confiance-title">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">
                <Star className="h-4 w-4 mr-2" />
                Ils nous font confiance
              </Badge>
              <h2
                id="confiance-title"
                className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                Ce que disent nos clients
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  text: "Canapé comme neuf, je recommande ! L'équipe est professionnelle et le résultat est vraiment visible.",
                  author: 'Marie',
                  location: 'Paris 15e',
                  rating: 5,
                },
                {
                  text: "Très satisfait du nettoyage de mon matelas. L'odeur de transpiration a complètement disparu.",
                  author: 'Thomas',
                  location: 'Boulogne',
                  rating: 5,
                },
                {
                  text: 'Tapis persan nettoyé avec soin. Les couleurs sont ravivées et aucune mauvaise surprise.',
                  author: 'Sophie',
                  location: 'Rouen',
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <Card
                  key={idx}
                  className={cn('animate-fade-in-up border-border/80 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-300', `delay-${(idx + 1) * 100}`)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
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
                Questions fréquentes
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">Les questions qu'on nous pose avant de réserver.</p>
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
              Prêt à nous faire confiance ?
            </h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Envoyez-nous quelques photos et recevez un devis clair en moins de 24h. Sans engagement, sans surprise.
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
