import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Camera, Check, Clock, MessageSquare, Phone, Shield, Sparkles, ArrowRight, MapPin, Star, FileText, ChevronRight } from 'lucide-react';
import { DevisForm } from '@/components/devis/DevisForm';

const SITE_URL = 'https://moket.fr';
const PHONE = '+33635090095';
const PHONE_DISPLAY = '06 35 09 00 95';

const WHATSAPP_NUMBER_INTL = '33635090095';
const WHATSAPP_TEXT = 'Bonjour, je souhaite un devis.\n\n- Service : \n- Ville / CP : \n- Dimensions (si possible) : \n- Détails (taches/odeurs) : \n\nJe vous envoie les photos juste après.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const metadata: Metadata = {
  title: 'Demander un devis | Nettoyage canapé, matelas, tapis & moquette | MOKET',
  description: "Demandez un devis rapide : envoyez 2–3 photos (vue d'ensemble + tache), choisissez votre service et votre zone. Intervention à domicile en Île-de-France et Normandie.",
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
    a: "Idéalement 2 à 3 photos : (1) une vue d'ensemble, (2) un plan rapproché de la tache, (3) une photo de l'étiquette si elle est accessible (matière/entretien).",
  },
  {
    q: 'En combien de temps ai-je une réponse ?',
    a: "En général, on répond rapidement après réception (selon affluence). Si c'est urgent, appelez-nous ou envoyez un message WhatsApp.",
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

const STEPS = [
  {
    icon: Camera,
    title: 'Envoyez vos photos',
    desc: "2–3 photos : vue d'ensemble + zone à traiter",
  },
  {
    icon: MessageSquare,
    title: 'Décrivez votre besoin',
    desc: 'Service, dimensions, taches ou odeurs',
  },
  {
    icon: Clock,
    title: 'Recevez votre devis',
    desc: 'Prix clair + créneau sous 24h',
  },
];

const ZONES = [
  { name: 'Paris', href: '/zones/paris' },
  { name: 'Hauts-de-Seine', href: '/zones/hauts-de-seine' },
  { name: 'Val-de-Marne', href: '/zones/val-de-marne' },
  { name: 'Yvelines', href: '/zones/yvelines' },
  { name: 'Seine-Saint-Denis', href: '/zones/seine-saint-denis' },
  { name: 'Seine-Maritime', href: '/zones/seine-maritime' },
  { name: 'Calvados', href: '/zones/calvados' },
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
        description: "Demandez un devis rapide : envoyez 2–3 photos (vue d'ensemble + tache), choisissez votre service et votre zone. Intervention à domicile en Île-de-France et Normandie.",
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#localbusiness` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#faq` },
        potentialAction: [
          { '@type': 'CommunicateAction', name: 'Appeler pour un devis', target: `tel:${PHONE}` },
          { '@type': 'CommunicateAction', name: 'Envoyer un message WhatsApp pour un devis', target: WHATSAPP_LINK },
          { '@type': 'Action', name: 'Demander un devis via le formulaire', target: `${pageUrl}#form` },
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
    <>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl md:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            <Button
              asChild
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25">
              <a href="#form">
                <FileText className="h-4 w-4 mr-1" />
                Devis
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2">
              <a href={`tel:${PHONE}`}>
                <Phone className="h-4 w-4 mr-1" />
                Appeler
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2">
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

      <main className="overflow-x-hidden pb-24 md:pb-0">
        <Script
          id="jsonld-devis"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* HERO */}
        <section
          className="relative py-8 md:py-20 overflow-hidden"
          aria-labelledby="devis-title">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20" />
          <div className="absolute top-0 right-0 w-160 h-160 bg-gradient-to-bl from-emerald-100/40 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-120 h-120 bg-gradient-to-tr from-teal-100/30 via-transparent to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors">
                Accueil
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Devis</span>
            </nav>

            <div className="max-w-3xl">
              {/* Badge 
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-200/50 text-sm font-medium animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700">Réponse sous 24h</span>
              </div>*/}

              <h1
                id="devis-title"
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] animate-fade-in-up">
                Devis{' '}
                <span className="relative">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">en 2 min</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-emerald-200/60 z-0 rounded-full" />
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in-up">
                Envoyez <strong className="text-foreground">2–3 photos</strong> et quelques infos. On vous répond{' '}
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r font-bold from-emerald-600 to-teal-600">sous 24 heures {''}</span>
                avec un <strong className="text-foreground">tarif clair et fixe</strong> et un créneau d'intervention.
              </p>

              {/* CTA buttons - Desktop */}
              <div className="mt-8 hidden md:flex flex-wrap gap-4 animate-fade-in-up">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl shadow-emerald-600/30 transition-all hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">
                  <a href="#form">
                    Remplir le formulaire
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="rounded-full px-8 h-14 text-base font-semibold border-2 border-emerald-200 text-emerald-50 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <a href={`tel:${PHONE}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="rounded-full px-8 h-14 text-base  font-semibold border-2 border-emerald-200 text-emerald-50 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer">
                    WhatsApp
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Steps Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up">
              {STEPS.map((step, idx) => (
                <div
                  key={step.title}
                  className="group relative rounded-3xl bg-white/80 backdrop-blur-sm p-6 border border-slate-200/50 shadow-lg shadow-slate-200/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <step.icon className="h-4 w-4 text-emerald-600" />
                        <h3 className="font-bold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
              {/* FORM - Takes 2 columns */}
              <div
                id="form"
                className="lg:col-span-2 scroll-mt-8">
                <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-xl shadow-slate-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Devis gratuit</h2>
                      <p className="text-sm text-muted-foreground">Sans engagement • Réponse rapide</p>
                    </div>
                  </div>

                  <DevisForm />
                </div>

                {/* Note */}
                <div className="mt-6 rounded-2xl border border-amber-200/50 bg-amber-50/50 p-5">
                  <p className="text-sm text-amber-900">
                    <strong>À noter :</strong> les brûlures, décolorations et migrations de teinture peuvent ne pas disparaître totalement. On vise le meilleur résultat possible sans prendre de
                    risques pour le textile.
                  </p>
                </div>
              </div>

              {/* SIDEBAR */}
              <aside className="space-y-6">
                {/* What you get */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-slate-200/30">
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-600" />
                    Ce que vous recevez
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {['Une tarification claire avant intervention', 'Une estimation du temps sur place', 'Une proposition de créneau', 'Des conseils (préparation / séchage)'].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                          <Check className="h-3 w-3 text-emerald-700" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full w-full border-2">
                      <Link href="/tarifs">
                        Voir les tarifs indicatifs
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* WhatsApp shortcut */}
                <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white shadow-xl shadow-emerald-600/30">
                  <h3 className="font-bold text-lg">Plus rapide ?</h3>
                  <p className="mt-2 text-sm text-emerald-100">Envoyez directement vos photos sur WhatsApp et recevez un prix clair.</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Button
                      asChild
                      className="rounded-full w-full bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg">
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer">
                        WhatsApp
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full w-full border-2 border-white/30 text-white hover:bg-white/10">
                      <a href={`tel:${PHONE}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Zones */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-slate-200/30">
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    Zones d'intervention
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <strong className="text-foreground">Île-de-France</strong> et <strong className="text-foreground">Normandie</strong>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ZONES.map((zone) => (
                      <Button
                        key={zone.name}
                        asChild
                        variant="secondary"
                        className="rounded-full h-8 px-3 text-xs hover:bg-emerald-50 hover:text-emerald-700">
                        <Link href={zone.href}>{zone.name}</Link>
                      </Button>
                    ))}
                    <Button
                      asChild
                      className="rounded-full h-8 px-3 text-xs bg-slate-900 hover:bg-slate-800 text-white">
                      <Link href="/zones">Toutes</Link>
                    </Button>
                  </div>
                </div>

                {/* Trust */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-slate-200/30">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Intervention protégée</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Protection des zones, propreté, protocole adapté au textile.</p>
                    </div>
                  </div>

                  {/* Mini testimonial */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground italic">"Devis rapide, intervention impeccable !"</p>
                    <p className="text-xs text-muted-foreground mt-1">— Sophie, Boulogne</p>
                  </div>
                </div>
              </aside>
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
              <p className="mt-4 text-lg text-muted-foreground">Les réponses aux questions qu'on nous pose le plus avant de réserver.</p>
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
        <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Prêt à nous envoyer vos photos ?</h2>
            <p className="mt-6 text-xl text-emerald-100 max-w-2xl mx-auto">Formulaire, WhatsApp ou téléphone — choisissez ce qui vous arrange.</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 h-14 text-lg font-semibold bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-emerald-900/20">
                <a href="#form">
                  Remplir le formulaire
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
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
