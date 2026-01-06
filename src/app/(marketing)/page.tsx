import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Shield, Droplets, Clock, Sparkles, BadgeCheck, Leaf, Footprints, SprayCan, Dot } from 'lucide-react';
import { VideoSlider } from '@/components/home/VideoSlider';

const FAQS = [
  {
    q: 'En combien de temps ça sèche ?',
    a: 'La plupart du temps, le textile est sec en quelques heures. Ça varie selon la matière, l’aération et l’humidité ambiante. Grâce à l’extraction, on limite l’eau résiduelle, et on vous donne les bons gestes pour accélérer le séchage (aérer, chauffer légèrement, etc.).',
  },
  {
    q: 'Est-ce que toutes les taches partent ?',
    a: 'On récupère la grande majorité des taches du quotidien, surtout quand elles sont récentes. En revanche, certaines traces très anciennes (décoloration, brûlure, migration de teinture, auréoles “fixées”) peuvent ne pas disparaître totalement. On vise le meilleur résultat possible, sans prendre le risque d’abîmer le textile.',
  },
  {
    q: 'Vous pouvez intervenir sur des tissus fragiles ?',
    a: 'Oui, à condition d’adapter le protocole. On tient compte de la matière, de la couleur et de la tenue du textile. Si nécessaire, on fait un test discret avant de traiter la zone complète. Le but est simple : un résultat net, sans mauvaise surprise.',
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
    a: 'Paris et Île-de-France. Vous pouvez vérifier votre zone sur la page dédiée, ou nous appeler directement.',
  },
];

const videos = [
  { src: '/videos/moket-hero.mp4', poster: '' },
  { src: '/videos/moket-hero-2.mp4', poster: '' },
];

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="overflow-x-hidden ">
      {/* FAQ schema for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="mx-auto max-w-7xl flex p-4  lg:px-8 pt-8 lg:pt-20 pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:space-x-8 lg:items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold -tracking-normal text-foreground">Nettoyage en profondeur de textile à domicile</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Matelas, canapés, tapis, moquettes — nettoyage par <strong>injecteur-extracteur professionnel</strong>. Intervention à domicile sur<strong>Paris & Île-de-France</strong>.
            </p>

            <div className="mt-8 flex flex-col mx-auto w-52 sm:w-full sm:flex-row sm:justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="rounded-full w-48">
                <Link href="/devis">Demander un devis</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full w-48">
                <a href="tel:+33635090095">Appeler</a>
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <Dot className="h-8 w-8 " />
                Résultat visible dès la fin de l’intervention
              </li>
              <li className="flex items-center gap-2">
                <Dot className="h-8 w-8 " />
                Produits selectionnés selon la nature du textile
              </li>
              <li className="flex items-center gap-2">
                <Dot className="h-8 w-8 " />
                Calfeutrage & protections des environnements
              </li>
              <li className="flex items-center gap-2">
                <Dot className="h-8 w-8 " />
                Intervention propre & respectueuse des matériaux
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-border  p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Ce que vous obtiendrez à la fin de l'intervention</p>
              <ul className="mt-3 space-y-2">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Des tissus ravivés de leur couleur et débarrassés des taches courantes
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Une neutralisation des odeurs et une protection contre les salissures futures
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Diminution drastique des accariens et allergènes pour un confort au quotidien
                </li>
              </ul>
            </div>
          </div>

          {/* HERO MEDIA */}
          <VideoSlider videos={videos} />
        </div>
      </section>

      {/* PREMIUM STANDARD */}
      <section className="bg-muted py-20 md:py-48 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl ">
          <h2 className="text-3xl font-bold">Service premium, matériel professionnel, produits de qualité</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            À domicile, la différence se joue sur les détails : propreté, méthode, respect des matériaux. Chez MOKET, on travaille avec un protocole clair, et on cherche un résultat concret
            {''}
            <strong>sans prendre de risques inutiles sur le textile</strong>.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              icon={<Footprints className="h-5 w-5" />}
              title="Protection & propreté"
              text="Nous rentrons chez vous avec des couvres-chaussures, nous protégeons les zones concernées, et nous nettoyons après intervention."
            />
            <Feature
              icon={<Shield className="h-5 w-5" />}
              title="Matériel de qualité professionnelle"
              text="Nous utilisons des matériels réservés aux professionnels qui garantissent efficacité et performance."
            />
            <Feature
              icon={<SprayCan className="h-5 w-5" />}
              title="Produits de qualité et adaptés"
              text="Nous appliquons des produits professionnels, selectionnés selon la nature du textile et le type de salissures à traiter."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              icon={<Droplets className="h-5 w-5" />}
              title="Injection-extraction professionnelle"
              text="On nettoie au cœur des fibres puis on extrait immédiatement. C’est ce qui fait la différence par rapport à un simple nettoyage de surface."
            />
            <Feature
              icon={<Clock className="h-5 w-5" />}
              title="Séchage maîtrisé"
              text="Extraction puissante pour limiter l’eau résiduelle. On vous explique comment sécher vite et bien."
            />
            <Feature
              icon={<Leaf className="h-5 w-5" />}
              title="Hygiène & qualité"
              text="On vise un résultat net : salissures retirées, rendu homogène, et un textile plus sain au quotidien."
            />
          </div>

          <div className="mt-12 flex flex-col w-52 md:w-full md:justify-center mx-auto sm:flex-row  gap-3">
            <Button
              asChild
              size="lg"
              variant="accent"
              className="rounded-full">
              <Link href="/notre-methode">Voir la méthode en détail</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full">
              <Link href="/devis">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className=" py-20 md:py-48 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">Nos services de nettoyage textile</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Votre enfant a renversé un tasse de chocolat sur le tapis ? Votre chien a fait ses besoins sur la moquette ? Votre jeans a délavé le canapé ? Nous avons la solution adaptée à chaque
            situation.
          </p>
          <div className="grid gap-10 mt-10 lg:grid-cols-2 lg:items-center">
            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ServiceCard
                title="Nettoyage de matelas"
                href="/services/matelas"
                desc="Taches, odeurs, poussières — protocole adapté à la matière."
              />
              <ServiceCard
                title="Canapé en tissu"
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
            <VideoSlider videos={videos} />
          </div>

          <div className="mt-8">
            <Button
              asChild
              className="rounded-full"
              variant="outline">
              <Link href="/services">Voir tous les services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* METHOD + VIDEO */}
      <section className="bg-muted py-20 md:py-48 p-4 lg:px-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Notre méthode (simple et efficace)</h2>
              <p className="mt-3 text-muted-foreground">
                On ne se contente pas de “rafraîchir”. L’idée est de retirer ce qui est dans la fibre, puis d’extraire immédiatement. C’est ce qui fait la différence.
              </p>

              <ol className="mt-8 space-y-4 text-sm">
                <Step
                  title="1) Diagnostic"
                  text="On regarde la matière, les couleurs et les zones à risque (tache, auréole, humidité)."
                />
                <Step
                  title="2) Pré-traitement"
                  text="On traite d’abord les zones problématiques. On effectue une action manuelle adaptée et soignée"
                />
                <Step
                  title="3) Injection-extraction"
                  text="On nettoie en profondeur avec de l'eau chaude puis on extrait l’eau chargée en saletés."
                />
                <Step
                  title="4) Finition"
                  text="On homogénéise le rendu, on soigne le textile si besoin, et on vous fournit des conseils simples."
                />
              </ol>

              <div className="mt-8 flex gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full w-48">
                  <Link href="/notre-methode">Découvrir en détail</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="rounded-full w-48">
                  <Link href="/devis">Demander un devis</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">Tarifs indicatifs</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Le tarif dépend de la taille, de l’état et du textile. Le plus efficace : <strong>vous envoyez 2–3 photos</strong> et on vous répond avec un devis clair, sans surprise.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold text-slate-900">Exemples (à adapter)</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Matelas : à partir de XX €</li>
                <li>• Canapé en tissu : à partir de XX €</li>
                <li>• Tapis : à partir de XX €</li>
                <li>• Moquette : sur devis (m² / état)</li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                On préfère annoncer un résultat réaliste : une décoloration ou une brûlure ne “partira” pas. En revanche, l’encrassement et les taches courantes, oui, très souvent.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-semibold text-slate-900">Ce qui est inclus</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Pré-traitement ciblé
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Injection-extraction en profondeur
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Finition + conseils de séchage
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5" />
                  Intervention propre & protégée
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <Button
                  asChild
                  variant="accent">
                  <Link href="/devis">Recevoir un devis</Link>
                </Button>
                <Button
                  asChild
                  variant="outline">
                  <Link href="/tarifs">Voir la page Tarifs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONES */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">Zones d’intervention</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">Intervention à domicile à Paris et en Île-de-France. Pour le SEO local, chaque zone a sa page dédiée.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              variant="outline">
              <Link href="/zones/paris">Paris</Link>
            </Button>
            <Button
              asChild
              variant="outline">
              <Link href="/zones/hauts-de-seine">Hauts-de-Seine</Link>
            </Button>
            <Button
              asChild
              variant="outline">
              <Link href="/zones/val-de-marne">Val-de-Marne</Link>
            </Button>
            <Button
              asChild
              variant="outline">
              <Link href="/zones/yvelines">Yvelines</Link>
            </Button>
            <Button
              asChild
              variant="outline">
              <Link href="/zones">Toutes les zones</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
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
              className="rounded-full">
              <Link href="/devis">Demander un devis</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full">
              <a href="tel:+33635090095">Appeler</a>
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
