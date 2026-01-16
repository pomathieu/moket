import Link from 'next/link';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Shield, Droplets, Clock, Sparkles, BadgeCheck, Leaf, Footprints, SprayCan, Dot, PhoneCall, FileText, List } from 'lucide-react';
import { VideoSlider } from '@/components/home/VideoSlider';
import { ImageSlider } from '@/components/home/ImageSlider';
import { PriceCalculator } from '@/components/home/PriceCalculator';

const videos = [
  { src: '/videos/moket-hero.mp4', poster: '/images/posters/moket-hero.webp' },
  { src: '/videos/moket-hero-2.mp4', poster: '/images/posters/moket-hero-2.webp' },
];

const images = [
  { src: '/images/services/Canape.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de canapé' },
  { src: '/images/services/Matelas.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de matelas' },
  { src: '/images/services/Tapis.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de tapis' },
  { src: '/images/services/Canape2.jpg', width: 1200, height: 630, alt: 'MOKET — Nettoyage de canapé' },
];

const FAQS = [
  {
    q: 'En combien de temps mon tissu sèche ?',
    a: 'La plupart du temps, le textile est sec en quelques heures. Ça varie selon la matière, l’aération et l’humidité ambiante. Grâce à l’extraction, on limite l’eau résiduelle, et on vous donne les bons gestes pour accélérer le séchage (aérer, chauffer légèrement, etc.).',
  },
  {
    q: 'Est-ce que toutes les taches partent ?',
    a: 'On récupère la grande majorité des taches du quotidien, surtout quand elles sont récentes. En revanche, certaines traces très anciennes (décoloration, brûlure, migration de teinture, auréoles “fixées”) peuvent ne pas disparaître totalement. On vise le meilleur résultat possible, sans prendre le risque d’abîmer le textile.',
  },
  {
    q: 'Vous pouvez intervenir sur des tissus fragiles ?',
    a: 'Oui, à condition d’adapter le protocole. Chez MOKET nous tenons compte de la matière, de la couleur et de la tenue du textile. Si nécessaire, on fait un test discret avant de traiter la zone complète. Le but est simple : un résultat net, sans mauvaise surprise.',
  },
  {
    q: 'Vous traitez les odeurs (tabac, animaux, transpiration) ?',
    a: 'Oui, et c’est souvent là que l’injection-extraction fait la différence : on retire la saleté incrustée, pas seulement l’odeur en surface. Selon l’origine (urine ancienne, humidité, moisissures), on vous dira clairement ce qu’on peut améliorer, et ce qui restera limité.',
  },
  {
    q: 'Combien de temps dure une intervention ?',
    a: 'Ça dépend de la taille et de l’état. En général : matelas ou canapé entre 45 minutes et 1h30. Pour un tapis ou une moquette, c’est variable. Au moment du devis, on vous donne une estimation réaliste.',
  },
  {
    q: 'Vous vous déplacez où ?',
    a: 'Nous intervenons en Île-de-France et en Normandie. Vous pouvez vérifier votre zone sur la page dédiée, ou nous appeler directement.',
  },
  {
    q: 'Comment obtenir un devis ?',
    a: 'Le plus simple : vous envoyez 2–3 photos (vue d’ensemble + tache) et on vous répond rapidement avec un devis clair. On confirme sur place si besoin.',
  },
  {
    q: 'Intervenez-vous le week-end ?',
    a: 'Oui, selon disponibilités. Dites-nous votre zone (Île-de-France ou Normandie) et vos créneaux, on vous propose une date.',
  },
  {
    q: 'Est-ce que ça aide pour les allergies / acariens ?',
    a: 'Le nettoyage par injection-extraction retire une partie des poussières et salissures incrustées. Cela peut améliorer le confort au quotidien et aider à réduire une partie des allergènes/acariens selon l’état du textile.',
  },
  {
    q: 'Proposez-vous une “désinfection” ?',
    a: 'On réalise un nettoyage en profondeur et un assainissement du textile. Pour une désinfection au sens strict, cela dépend du protocole et des produits utilisés : on vous indique clairement ce qui est fait et ce qui ne peut pas être garanti.',
  },
];

function QuickAnswers() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-sm">
      <p className="font-semibold">Réponses rapides</p>
      <ul className="mt-2 space-y-1 text-muted-foreground">
        <li>
          <strong>Tarifs :</strong> Matelas dès 90€, canapé tissu dès 120€, tapis 30€/m², moquette 9€/m².
        </li>
        <li>
          <strong>Durée :</strong> généralement 45–90 min (selon taille/état).
        </li>
        <li>
          <strong>Séchage :</strong> souvent quelques heures (aération + chauffage léger).
        </li>
        <li>
          <strong>Zones :</strong> Île-de-France et Normandie.
        </li>
        <li>
          <strong>Méthode :</strong> injection-extraction + pré-traitement ciblé.
        </li>
      </ul>
    </div>
  );
}

function StickyMobileCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70 md:hidden">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            asChild
            variant="accent"
            className="rounded-full w-full">
            <Link href="/devis">
              <span className="inline-flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                Devis
              </span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full w-full">
            <a href="tel:+33635090095">
              <span className="inline-flex items-center justify-center gap-2">
                <PhoneCall className="h-4 w-4" />
                Appeler
              </span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const base = 'https://moket.fr';
  const pageUrl = `${base}/`;

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'MOKET - Nettoyage textile à domicile',
        isPartOf: { '@id': `${base}/#website` },
        inLanguage: 'fr-FR',
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#faq` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: pageUrl }],
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
      <StickyMobileCta />

      <main className="overflow-x-hidden pb-24 md:pb-0">
        <Script
          id="jsonld-home"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
        />

        {/* HERO */}
        <section className="mx-auto max-w-7xl p-4 lg:px-8 lg:pt-12 pb-12 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:space-x- s8 lg:items-center">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">Île-de-France • Normandie • Intervention à domicile</p>

              <h1 className="mt-3 text-4xl md:text-5xl font-extrabold -tracking-normal text-foreground">Nettoyage de canapés, matelas et moquettes à domicile</h1>

              <p className="mt-3 text-sm text-muted-foreground">
                <strong>Tarifs :</strong> Matelas dès <strong>90€</strong> • Canapé tissu dès <strong>120€</strong> • Tapis <strong>30€/m²</strong> • Moquette <strong>9€/m²</strong>
              </p>

              <p className="mt-8 lg:mt-4 text-sm text-muted-foreground">
                Nettoyage par <strong>injecteur-extracteur professionnel</strong>. Idéal pour les odeurs, les acariens et les allergènes sur canapé, matelas, tapis, moquette.
              </p>

              <div className="mt-8 rounded-2xl border shadow-xl border-border p-4 text-sm">
                <p className="font-semibold">Devis rapide</p>
                <p className="mt-1 text-muted-foreground">
                  Envoyez <strong>2–3 photos</strong> (vue d’ensemble + tache). Réponse avec un devis clair, sans surprise.
                </p>
              </div>

              <div className="mt-8 justify-center flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="rounded-full w-full sm:w-auto">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full w-full sm:w-auto">
                  <a href="tel:+33635090095">Appeler le 06 35 09 00 95</a>
                </Button>
              </div>

              <ul className="mt-6  grid justify-center lg:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Résultat visible fin d’intervention
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Protocole adapté au textile
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Séchage maîtrisé (conseils inclus)
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" /> Devis clair & sans surprise
                </li>
                <li className="flex items-center gap-2">
                  <List className="h-4 w-4" /> Produits sélectionnés selon la nature du textile
                </li>
                <li className="flex items-center gap-2">
                  <Footprints className="h-4 w-4" /> Intervention propre & protégée
                </li>
              </ul>
            </div>

            {/* HERO MEDIA */}
            <VideoSlider
              videos={videos}
              autoPlayActive
              startAfterLcpMs={1200}
            />
          </div>

          <div className="mt-8 max-w-4xl justify-center lg:grid-cols-2 grid  gap-6 mx-auto">
            <div className="rounded-2xl border border-border bg-card p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Ce que vous obtiendrez à la fin de l'intervention</p>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Des tissus ravivés et débarrassés des taches courantes
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Neutralisation des odeurs + protection contre les salissures futures
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Aide à réduire acariens, poussières et allergènes (selon l’état du textile)
                </li>
              </ul>
            </div>

            {/* Move QuickAnswers lower: detail after action */}
            <QuickAnswers />
          </div>
        </section>

        {/* METHOD FEATURES */}
        <section className="bg-muted py-16 md:py-28 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold">Une méthode professionnelle pour le nettoyage de vos textiles à domicile</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              À domicile, la différence se joue sur les détails : propreté, méthode et respect des matériaux. Chez MOKET, chaque prestation de <strong>nettoyage de textiles</strong> repose sur un
              protocole clair, adapté aux <strong>canapés, matelas, tapis et moquettes</strong>, pour un résultat concret <strong>sans prendre de risques inutiles</strong>.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Feature
                icon={<Footprints className="h-5 w-5" />}
                title="Protection & propreté"
                text="Couvre-chaussures, protection des zones, et nettoyage après intervention."
              />
              <Feature
                icon={<Shield className="h-5 w-5" />}
                title="Matériel pro"
                text="Matériel professionnel pour une extraction efficace et un rendu net."
              />
              <Feature
                icon={<SprayCan className="h-5 w-5" />}
                title="Produits adaptés"
                text="Produits professionnels choisis selon textile et type de salissures."
              />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Feature
                icon={<Droplets className="h-5 w-5" />}
                title="Injection-extraction"
                text="Nettoyage en profondeur des fibres, idéal canapé, matelas, moquette."
              />
              <Feature
                icon={<Clock className="h-5 w-5" />}
                title="Séchage maîtrisé"
                text="Extraction puissante pour limiter l’eau résiduelle + conseils pratiques."
              />
              <Feature
                icon={<Leaf className="h-5 w-5" />}
                title="Hygiène & assainissement"
                text="On retire la saleté incrustée : poussières et odeurs sont mieux traitées."
              />
            </div>

            <div className="mt-12 flex flex-col w-full sm:w-fit mx-auto gap-3">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="rounded-full w-full">
                <Link href="/notre-methode">Découvrir notre méthode</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full w-full">
                <Link href="/devis">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16 md:py-28 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold">Nos Services de nettoyage canapé, matelas, tapis et moquette</h2>
            <h3 className="mt-1 text-xl font-semibold text-foreground">Des services destinés à des particuliers et professionnels</h3>
            <p className="mt-3 text-muted-foreground max-w-3xl">Chocolat sur le tapis ? Accident sur la moquette ? Jean qui déteint sur le canapé ? On adapte le protocole selon la situation.</p>

            <div className="grid gap-10 mt-10 lg:grid-cols-2 lg:items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ServiceCard
                  title="Nettoyage de matelas"
                  href="/services/matelas"
                  desc="Taches, odeurs, poussières — protocole adapté."
                />
                <ServiceCard
                  title="Nettoyage de canapé en tissu"
                  href="/services/canape-tissu"
                  desc="Traces d’usage, zones grasses, odeurs : nettoyage en profondeur."
                />
                <ServiceCard
                  title="Nettoyage de tapis"
                  href="/services/tapis"
                  desc="Nettoyage des fibres + finition uniforme."
                />
                <ServiceCard
                  title="Nettoyage de moquette"
                  href="/services/moquette"
                  desc="Surfaces, pièces, bureaux — devis au m²."
                />
              </div>

              <ImageSlider
                images={images}
                autoPlayActive
                intervalMs={3200}
                heightClass="h-[360px] md:h-[520px] lg:h-[560px]"
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="rounded-full"
                variant="outline">
                <Link href="/services">Voir tous les services</Link>
              </Button>
              <Button
                asChild
                className="rounded-full"
                variant="accent">
                <Link href="/devis">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 bg-muted md:py-28 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold pb-4">Calculateur de prestation en ligne</h2>
            <PriceCalculator phone="+33635090095" />
          </div>
        </section>
        {/* METHOD (steps) */}
        <section
          className="
         py-16 md:py-28 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="lg:grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold">Notre méthode d’injection-extraction (simple et efficace)</h2>
                <p className="mt-3 text-muted-foreground">On retire ce qui est dans la fibre, puis on extrait immédiatement : c’est ce qui fait la différence.</p>

                <ol className="mt-8 space-y-4 text-sm">
                  <Step
                    title="1) Diagnostic"
                    text="On regarde la matière, les couleurs et les zones à risque."
                  />
                  <Step
                    title="2) Pré-traitement"
                    text="On traite d’abord les zones problématiques avec une action adaptée."
                  />
                  <Step
                    title="3) Injection-extraction"
                    text="Eau chaude + extraction immédiate de l’eau chargée en saletés."
                  />
                  <Step
                    title="4) Séchage vapeur"
                    text="Vapeur pour aider le séchage et assainir le textile."
                  />
                  <Step
                    title="5) Finition"
                    text="Rendu homogène + conseils simples pour la suite."
                  />
                </ol>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full w-full sm:w-auto">
                    <Link href="/notre-methode">Découvrir en détail</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="accent"
                    className="rounded-full w-full sm:w-auto">
                    <Link href="/devis">Demander un devis</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TARIFS */}
        <section className="py-16 bg-muted md:py-24 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold">Tarifs indicatifs</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">Tarifs fixes. Pour un chiffrage précis, envoyez 2–3 photos : on répond rapidement avec un devis clair.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="font-semibold text-slate-900">Tarifs fixes</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>• Matelas : 90 € (1 place) / 120 € (2 places)</li>
                  <li>• Canapé tissu : 120 € (2–3 places) / 160 € (4–5 places)</li>
                  <li>• Tapis : 30 € / m²</li>
                  <li>• Moquette : 9 € / m²</li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Brûlures et décolorations ne disparaissent pas complètement. En revanche, l’encrassement et les taches courantes sont généralement éliminés.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="font-semibold text-slate-900">Ce qui est inclus</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" /> Pré-traitement ciblé
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" /> Injection-extraction en profondeur
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" /> Finition + conseils de séchage
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" /> Intervention propre & protégée
                  </li>
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    variant="accent"
                    className="rounded-full w-full sm:w-auto">
                    <Link href="/devis">Recevoir un devis</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full w-full sm:w-auto">
                    <Link href="/tarifs">Voir la page Tarifs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ZONES */}
        <section className="py-16 md:py-24 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold">Zones d’intervention</h2>
            <p className="mt-3 text-muted-foreground max-w-3xl">
              Intervention à domicile en <strong>Île-de-France</strong> et en <strong>Normandie</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/paris">Paris</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/hauts-de-seine">Hauts-de-Seine</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/val-de-marne">Val-de-Marne</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/yvelines">Yvelines</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/seine-saint-denis">Seine-Saint-Denis</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/seine-maritime">Seine-Maritime</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones/calvados">Calvados</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full">
                <Link href="/zones">Toutes les zones</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted not-even:py-16 md:py-24 p-4 lg:px-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold">FAQ</h2>
              <p className="mt-3 text-muted-foreground">Les questions qu’on nous pose le plus — et nos réponses, simplement.</p>
            </div>

            <div className="mt-10 max-w-6xl">
              <Accordion
                type="single"
                collapsible
                className="w-full cursor-pointer">
                {FAQS.map((f, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
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
                className="rounded-full w-full sm:w-auto">
                <Link href="/devis">Demander un devis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full w-full sm:w-auto">
                <a href="tel:+33635090095">Appeler le 06 35 09 00 95</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
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

function ServiceCard({ title, href, desc }: { title: string; href: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-card p-6 border border-border group hover:shadow-sm transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      <p className="mt-3 text-sm text-slate-700 group-hover:underline underline-offset-4">Voir le service</p>
    </Link>
  );
}

function Step({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-card p-6 border border-border">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
