import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BadgeCheck, Check, Shield, Sparkles, Clock, Leaf, Dot, Phone } from 'lucide-react';

const SITE_URL = 'https://www.moket.fr'; // TODO
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
    title: 'Transparence',
    points: ['Devis clair sur photos', 'On annonce ce qui est faisable (et ce qui restera limité)', 'Pas de surprise'],
    icon: <BadgeCheck className="h-5 w-5" />,
  },
  {
    title: 'Qualité du rendu',
    points: ['Nettoyage en profondeur', 'Rendu homogène', 'Odeurs mieux traitées'],
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Respect du textile',
    points: ['Protocole adapté', 'Test discret si besoin', 'Aucune prise de risque inutile'],
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: 'Efficacité à domicile',
    points: ['Intervention propre', 'Séchage maîtrisé', 'Conseils simples après passage'],
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: 'Hygiène & confort',
    points: [
      'Nettoyage en profondeur : on retire ce qui est dans la fibre',
      'Odeurs mieux traitées (animaux, tabac, transpiration)',
      'Aide à réduire poussières, allergènes et acariens selon le textile',
    ],
    icon: <Leaf className="h-5 w-5" />,
  },
];

const FAQS = [
  {
    q: 'Pourquoi vous demandez des photos ?',
    a: 'Parce que la matière, l’état et la nature des taches changent le protocole (et parfois la durée). Les photos permettent un devis fiable et un résultat plus maîtrisé.',
  },
  {
    q: 'Est-ce que vous garantissez “zéro tache” ?',
    a: 'On vise le meilleur résultat possible, sans abîmer le textile. Certaines traces anciennes (décoloration, brûlure, migration) peuvent ne pas disparaître totalement.',
  },
  {
    q: 'Intervenez-vous le week-end ?',
    a: 'Oui, selon disponibilités. Indiquez vos créneaux dans le formulaire de devis ou appelez-nous.',
  },
];

export default function PourquoiMoketPage() {
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="overflow-x-hidden">
      <Script
        id="ld-faq-pourquoi"
        type="application/ld+json">
        {JSON.stringify(jsonLdFaq)}
      </Script>

      {/* HERO */}
      <section className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-20 pb-16 md:pb-24">
        <div className="max-w-5xl">
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold -tracking-normal text-foreground">Pourquoi choisir MOKET ?</h1>

          <p className="mt-4 text-muted-foreground">
            Chez vous, on privilégie une approche simple : <strong>un protocole clair</strong>, un résultat concret, et une transparence totale sur ce qu’on peut améliorer (et ce qui restera limité).
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
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" /> Appeler le {PHONE_DISPLAY}
              </a>
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Dot className="h-7 w-7" /> Intervention propre & protégée
            </li>
            <li className="flex items-center gap-2">
              <Dot className="h-7 w-7" /> Devis clair, sans surprise
            </li>
            <li className="flex items-center gap-2">
              <Dot className="h-7 w-7" /> Produits adaptés au textile
            </li>
            <li className="flex items-center gap-2">
              <Dot className="h-7 w-7" /> Résultat visible dès la fin
            </li>
          </ul>
        </div>
      </section>

      {/* PITCH */}
      <section className="bg-muted py-20 md:py-28 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Notre approche (en 4 points)</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">On peut résumer MOKET simplement : faire propre, faire juste, et faire clair.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PITCH.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-card p-6 border border-border">
                <div className="mb-3 text-primary">{b.icon}</div>
                <h3 className="font-semibold">{b.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {b.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
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
              <Link href="/notre-methode">Voir la méthode</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* RASSURANCE */}
      <section className="py-20 md:py-28 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Ce qu’on promet (et ce qu’on ne promet pas)</h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold text-slate-900">On promet</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Un protocole adapté au textile
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Un rendu net et homogène (au maximum du possible)
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Transparence sur le résultat attendu
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted/40 p-6">
              <p className="font-semibold text-slate-900">On ne promet pas</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Le “zéro défaut” sur des brûlures, décolorations, migrations de teinture ou traces très anciennes. On préfère être clair plutôt que vendre un miracle.
              </p>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-primary" />
                  Objectif : meilleur résultat possible, sans abîmer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-20 md:py-24 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold">FAQ — Pourquoi MOKET</h2>
            <p className="mt-3 text-muted-foreground">Les questions qu’on nous pose avant de réserver.</p>
          </div>

          <div className="mt-10 max-w-5xl">
            <Accordion
              type="single"
              collapsible
              className="w-full cursor-pointer">
              {FAQS.map((f, idx) => (
                <AccordionItem
                  key={idx}
                  value={`p-${idx}`}
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
