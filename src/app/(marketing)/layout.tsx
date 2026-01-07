import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Script from 'next/script';

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
];

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MOKET',
    url: 'https://moket.fr',
    openingHours: ['Mo-Sa 09:00-19:00'],

    telephone: '+33635090095',
    areaServed: ['Île-de-France', 'Normandie'],
    serviceType: ['Nettoyage de canapé', 'Nettoyage de matelas', 'Nettoyage de tapis', 'Nettoyage de moquette'],
  };

  return (
    <>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="localbusiness-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar />
      <main
        id="main-content"
        className="flex-1 pt-(--nav-height)">
        {children}
      </main>
      <Footer />
    </>
  );
}
