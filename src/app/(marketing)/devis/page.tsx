import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Camera, Check, Clock, MapPin, MessageSquare, Phone, Shield } from 'lucide-react';
import { DevisForm } from '@/components/devis/DevisForm';

const SITE_URL = 'https://moket.fr';
const BRAND = 'MOKET';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

// WhatsApp
const WHATSAPP_NUMBER_INTL = '33635090095'; // sans +, sans espaces
const WHATSAPP_TEXT = 'Bonjour, je souhaite un devis.\n\n- Service : \n- Ville / CP : \n- Dimensions (si possible) : \n- Détails (taches/odeurs) : \n\nJe vous envoie les photos juste après.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const metadata: Metadata = {
  title: 'Demander un devis | Nettoyage canapé, matelas, tapis & moquette | MOKET',
  description: 'Demandez un devis rapide : envoyez 2–3 photos (vue d’ensemble + tache), choisissez votre service et votre zone. Intervention à domicile en Île-de-France et Normandie.',
  alternates: { canonical: `${SITE_URL}/devis` },
  openGraph: {
    title: 'Devis rapide nettoyage textile à domicile | MOKET',
    description: 'Devis sur photos pour canapé tissu, matelas, tapis, moquette. Intervention à domicile Île-de-France & Normandie.',
    url: `${SITE_URL}/devis`,
    type: 'website',
  },
};

const FAQS = [
  {
    q: 'Quelles photos faut-il envoyer ?',
    a: 'Idéalement 2 à 3 photos : (1) une vue d’ensemble, (2) un plan rapproché de la tache, (3) une photo de l’étiquette si elle est accessible (matière/entretien).',
  },
  {
    q: 'En combien de temps ai-je une réponse ?',
    a: 'En général, on répond rapidement après réception (selon affluence). Si c’est urgent, appelez-nous ou envoyez un message WhatsApp.',
  },
  {
    q: 'Vous intervenez où ?',
    a: 'Nous intervenons à domicile en Île-de-France et en Normandie. Indiquez votre ville/code postal dans le formulaire.',
  },
  {
    q: 'Est-ce que toutes les taches partent ?',
    a: 'On récupère la grande majorité des taches du quotidien, surtout si elles sont récentes. Certaines traces anciennes (décoloration, brûlure, migration de teinture) peuvent rester partiellement visibles.',
  },
];

export default function DevisPage() {
  const pageUrl = `${SITE_URL}/devis`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Demander un devis',
        description: 'Demandez un devis rapide : envoyez 2–3 photos (vue d’ensemble + tache), choisissez votre service et votre zone. Intervention à domicile en Île-de-France et Normandie.',
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#faq` },
        potentialAction: [
          {
            '@type': 'CommunicateAction',
            name: 'Appeler pour un devis',
            target: `tel:${PHONE}`,
          },
          {
            '@type': 'CommunicateAction',
            name: 'Envoyer un message WhatsApp pour un devis',
            target: WHATSAPP_LINK,
          },
          {
            '@type': 'Action',
            name: 'Demander un devis via le formulaire',
            target: `${pageUrl}#form`,
          },
        ],
      },

      {
        '@type': 'ContactPage',
        '@id': `${pageUrl}#contactpage`,
        url: pageUrl,
        name: 'Demander un devis',
        isPartOf: { '@id': `${pageUrl}#webpage` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
      },

      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Devis', item: pageUrl },
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
    <main className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-16 md:pb-24">
      <Script
        id="jsonld-devis"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="md:grid gap-6 md:gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-5xl font-extrabold -tracking-normal">Demander un devis (rapide)</h1>

          <p className="text-muted-foreground max-w-3xl">
            Le plus simple : envoyez <strong>2–3 photos</strong> (vue d’ensemble + tache) et quelques infos. On vous répond avec un <strong>tarif clair</strong> et une{' '}
            <strong>proposition de créneau</strong>.
          </p>
        </div>

        <div className="lg:flex flex-col hidden items-center pt-4 pb-4 md:flex-row gap-3">
          <Button
            asChild
            size="lg"
            variant="accent"
            className="rounded-full w-58">
            <a href="#form">Remplir le formulaire</a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full w-58">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" /> Appeler le {PHONE_DISPLAY}
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full w-58">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2">
              WhatsApp
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
          <MiniCard
            icon={<Camera className="h-4 w-4" />}
            title="1) Photos"
            text="2–3 photos : vue d’ensemble + zone à traiter."
          />
          <MiniCard
            icon={<MessageSquare className="h-4 w-4" />}
            title="2) Infos"
            text="Service, dimensions, odeurs/taches, ville."
          />
          <MiniCard
            icon={<Clock className="h-4 w-4" />}
            title="3) Réponse"
            text="Prix clair + estimation de durée + créneau."
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="mt-10  md:mt-14 grid gap-8 lg:grid-cols-5 lg:items-start">
        {/* FORM */}
        <div
          id="form"
          className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-2xl font-bold">Ton devis en 2 minutes</h2>
            <p className="mt-2 text-sm text-muted-foreground">Plus les infos sont précises, plus le devis est fiable (matière, dimensions, taches).</p>

            <div className="mt-6">
              <DevisForm phone={PHONE} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Note :</strong> les brûlures, décolorations et migrations de teinture peuvent ne pas disparaître totalement. On vise le meilleur résultat possible sans prendre de risques
              inutiles pour le textile.
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg">Ce que tu reçois</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Une <strong>tarification</strong> avant intervention
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Une estimation du <strong>temps sur place</strong>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Une proposition de <strong>créneau</strong>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5" />
                Des conseils simples (préparation / séchage)
              </li>
            </ul>

            <div className="mt-6 flex flex-col justify-center mx-auto gap-3">
              <Button
                asChild
                variant="secondary"
                className="rounded-full w-fit">
                <Link href="/tarifs">Voir les tarifs</Link>
              </Button>
            </div>
          </div>

          {/* WhatsApp quick */}
          <div className="rounded-2xl border border-border bg-muted/40 p-6">
            <p className="font-semibold">Plus rapide ?</p>
            <p className="mt-1 text-sm text-muted-foreground">Envoie directement tes photos sur WhatsApp, et on te répond avec un prix clair.</p>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                asChild
                variant="accent"
                className="rounded-full w-full">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full w-full">
                <a href={`tel:${PHONE}`}>Appeler</a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold text-lg">On intervient où ?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>Île-de-France</strong> et <strong>Normandie</strong>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip
                href="/zones/paris"
                label="Paris"
              />
              <Chip
                href="/zones/hauts-de-seine"
                label="Hauts-de-Seine"
              />
              <Chip
                href="/zones/val-de-marne"
                label="Val-de-Marne"
              />
              <Chip
                href="/zones/yvelines"
                label="Yvelines"
              />
              <Chip
                href="/zones/seine-saint-denis"
                label="Seine-Saint-Denis"
              />
              <Chip
                href="/zones/seine-maritime"
                label="Seine-Maritime"
              />
              <Chip
                href="/zones/calvados"
                label="Calvados"
              />
              <Chip
                href="/zones"
                label="Toutes les zones"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/40 p-6">
            <div className="flex items-start gap-3">
              <div className="text-primary mt-0.5">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Intervention propre & protégée</p>
                <p className="mt-1 text-sm text-muted-foreground">Protection des zones, propreté, protocole adapté au textile.</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* FAQ */}
      <section className="mt-12 md:mt-16 px-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold">FAQ Devis</h2>
          <p className="mt-2 text-muted-foreground">Les questions qu’on te pose le plus avant de réserver.</p>
        </div>

        <div className="mt-8 max-w-4xl">
          <Accordion
            type="single"
            collapsible
            className="w-full">
            {FAQS.map((f, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-b border-slate-200/70">
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-slate-700">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-border bg-background/95 backdrop-blur p-3 shadow-sm grid grid-cols-3 gap-3">
            <Button
              asChild
              variant="accent"
              className="rounded-full w-full">
              <a href="#form">Devis</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full w-full">
              <a href={`tel:${PHONE}`}>Appeler</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full w-full">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function MiniCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border  p-4">
      <div className="flex items-start gap-3">
        <div className="text-primary mt-0.5">{icon}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Chip({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="secondary"
      className="rounded-full h-9 px-3">
      <Link
        href={href}
        className="inline-flex items-center gap-2">
        <MapPin className="h-4 w-4" /> {label}
      </Link>
    </Button>
  );
}
