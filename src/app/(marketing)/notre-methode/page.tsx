import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BadgeCheck, Check, Clock, Droplets, FileImage, Leaf, Shield, Sparkles, SprayCan, Footprints } from 'lucide-react';
import { VideoSlider } from '@/components/home/VideoSlider';

const SITE_URL = 'https://www.moket.fr'; // TODO
const BRAND = 'MOKET';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

export const metadata: Metadata = {
  title: `Notre méthode d’injection-extraction | Nettoyage textile à domicile | ${BRAND}`,
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
    title: '1) Diagnostic',
    text: 'On identifie la matière, la tenue des couleurs, les zones à risque (auréoles, migration) et la nature des taches/odeurs. Si nécessaire : test discret.',
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: '2) Pré-traitement ciblé',
    text: 'On traite d’abord les zones problématiques (taches,_Row gasses, auréoles). Action manuelle adaptée, sans agresser la fibre.',
    icon: <SprayCan className="h-5 w-5" />,
  },
  {
    title: '3) Injection-extraction',
    text: 'On injecte (souvent à l’eau tiède/chaude selon textile) puis on extrait immédiatement l’eau chargée en saletés. C’est le cœur du résultat.',
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    title: '4) Finition & conseils',
    text: 'On homogénéise le rendu, on contrôle le séchage, et on vous donne les bons gestes (aération, chauffage léger, etc.).',
    icon: <Clock className="h-5 w-5" />,
  },
];

const PRINCIPES = [
  {
    icon: <Footprints className="h-5 w-5" />,
    title: 'Intervention propre',
    text: 'Couvre-chaussures, protection des zones, et nettoyage après intervention.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Matériel pro',
    text: 'Extraction puissante : on retire l’eau chargée en saletés (pas juste un “rafraîchissement”).',
  },
  {
    icon: <FileImage className="h-5 w-5" />,
    title: 'Contrôle du risque',
    text: 'On adapte le protocole aux tissus fragiles. Le but : net, sans mauvaise surprise.',
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: 'Hygiène & confort',
    text: 'Odeurs mieux traitées, textile plus sain au quotidien.',
  },
];

const FAQS = [
  {
    q: 'Quelle est la différence avec un shampoing canapé classique ?',
    a: 'Le shampoing travaille souvent en surface. L’injection-extraction décroche la saleté dans la fibre et l’extrait immédiatement. On limite l’eau résiduelle et on évite de “déplacer” la saleté.',
  },
  {
    q: 'En combien de temps mon textile sèche ?',
    a: 'Souvent en quelques heures. Ça varie selon la matière, l’aération et l’humidité. Grâce à l’extraction, on limite l’eau résiduelle, et on vous donne les bons gestes pour accélérer.',
  },
  {
    q: 'Est-ce que toutes les taches partent ?',
    a: 'On récupère la grande majorité des taches du quotidien, surtout quand elles sont récentes. Certaines traces anciennes (décoloration, brûlure, migration de teinture) peuvent rester partiellement visibles.',
  },
  {
    q: 'Vous intervenez sur des tissus fragiles ?',
    a: 'Oui, à condition d’adapter le protocole. Si nécessaire, on fait un test discret avant de traiter la zone complète.',
  },
];

export default function NotreMethodePage() {
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Nettoyage de textiles à domicile (injection-extraction)',
    provider: { '@type': 'Organization', name: BRAND, url: SITE_URL },
    areaServed: ['Île-de-France', 'Normandie'],
    serviceType: ['Nettoyage canapé tissu', 'Nettoyage matelas', 'Nettoyage tapis', 'Nettoyage moquette'],
    url: `${SITE_URL}/notre-methode`,
  };

  return (
    <main className="overflow-x-hidden">
      <Script
        id="ld-faq-notre-methode"
        type="application/ld+json">
        {JSON.stringify(jsonLdFaq)}
      </Script>
      <Script
        id="ld-service-notre-methode"
        type="application/ld+json">
        {JSON.stringify(jsonLdService)}
      </Script>

      {/* HERO */}
      <section className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-20 pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:space-x-8 lg:items-center">
          <div className="max-w-2xl">
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold -tracking-normal text-foreground">Notre méthode de nettoyage (simple et efficace)</h1>

            <p className="mt-4 text-muted-foreground">
              On ne se contente pas de “rafraîchir”. L’idée : <strong>retirer ce qui est dans la fibre</strong>, puis
              <strong> extraire immédiatement</strong>. On travaille proprement, avec un protocole adapté à chaque textile.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="rounded-full w-full sm:w-fit">
                <Link href="/devis">Demander un devis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full w-full sm:w-fit">
                <a href={`tel:${PHONE}`}>Appeler le {PHONE_DISPLAY}</a>
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Diagnostic + protocole adapté au textile
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Nettoyage en profondeur (pas juste la surface)
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Extraction puissante → séchage maîtrisé
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Finition + conseils concrets
              </li>
            </ul>
          </div>

          <VideoSlider
            videos={videos}
            autoPlayActive
            startAfterLcpMs={800}
          />
        </div>
      </section>

      {/* PRINCIPES */}
      <section className="bg-muted py-20 md:py-28 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Ce qui fait la différence, sur place</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Chez vous, la qualité se joue sur les détails : propreté, méthode, et respect du matériau. Notre protocole vise un résultat concret, sans prise de risque inutile.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPES.map((x) => (
              <Feature
                key={x.title}
                icon={x.icon}
                title={x.title}
                text={x.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 md:py-28 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Les 4 étapes de la méthode MOKET</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Un protocole simple, reproductible, et adapté à <strong>canapé</strong>, <strong>matelas</strong>, <strong>tapis</strong> et <strong>moquette</strong>.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <StepCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                text={s.text}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              variant="accent"
              className="rounded-full w-full sm:w-fit">
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full w-full sm:w-fit">
              <Link href="/tarifs">Voir les tarifs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-20 md:py-24 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">FAQ — Notre méthode</h2>
            <p className="mt-3 text-muted-foreground">Les questions qu’on nous pose le plus.</p>
          </div>

          <div className="mt-10 max-w-5xl">
            <Accordion
              type="single"
              collapsible
              className="w-full cursor-pointer">
              {FAQS.map((f, idx) => (
                <AccordionItem
                  key={idx}
                  value={`m-${idx}`}
                  className="border-b border-slate-200/70">
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-700">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              variant="accent"
              className="rounded-full">
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full">
              <a href={`tel:${PHONE}`}>Appeler le {PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-card p-6 border border-border">
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function StepCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-card p-6 border border-border">
      <div className="mb-3 text-primary">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
