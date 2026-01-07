export type Service = {
  slug: string;
  title: string;
  short: string;
  seo: { h1: string; title: string; description: string };
  bullets: string[];
  faq: { q: string; a: string }[];

  seoBody: {
    intro2?: string;
    useCases: string[];
    limits: string[];
    priceHint: string;
  };
};

export const SERVICES: Service[] = [
  {
    slug: 'matelas',
    title: 'Nettoyage de matelas',
    short: 'Taches, odeurs, acariens, auréoles.',
    seo: {
      h1: 'Nettoyage de matelas à domicile',
      title: 'Nettoyage de matelas à domicile | MOKET',
      description:
        'Nettoyage de matelas à domicile par injection-extraction : taches, odeurs, auréoles, hygiène. Devis rapide, résultat net.',
    },
    bullets: [
      'Extraction profonde : on retire ce qui est dans la fibre',
      'Protocole adapté selon tissu / couleurs',
      'Conseils de séchage pour un résultat propre et durable',
    ],
    seoBody: {
      intro2: "On cible l’encrassement dans la fibre (pas un simple rafraîchissement en surface).",
      useCases: ['Auréoles récentes', 'Odeurs (transpiration, animaux)', 'Taches alimentaires', 'Allergènes / acariens'],
      limits: ['Décolorations', 'Brûlures', 'Migration de teinture ancienne', "Certaines auréoles très anciennes 'fixées'"],
      priceHint:
        "Le tarif dépend des dimensions, de l’état et du textile. Le plus simple : envoyer 2–3 photos pour un devis clair et réaliste.",
    },
    faq: [
      {
        q: 'Les auréoles partent-elles toujours ?',
        a: "Souvent oui, surtout si elles sont récentes. Certaines auréoles anciennes ou fixées peuvent s’atténuer sans disparaître totalement.",
      },
      {
        q: 'Le matelas est-il trempé après l’intervention ?',
        a: "Non : l’extraction limite l’eau résiduelle. Le séchage dépend ensuite de l’aération, de la température et de l’humidité.",
      },
      {
        q: 'Traitez-vous les odeurs (transpiration, animaux, tabac) ?',
        a: "Oui : l’injection-extraction retire la source de l’odeur en profondeur, pas seulement en surface.",
      },
    ],
  },

  {
    slug: 'canape-tissu',
    title: 'Nettoyage de canapé en tissu',
    short: "Traces d’usage, zones grasses, odeurs.",
    seo: {
      h1: 'Nettoyage de canapé en tissu à domicile',
      title: 'Nettoyage de canapé en tissu à domicile | MOKET',
      description:
        'Nettoyage de canapé en tissu à domicile : taches, traces d’usage, odeurs. Injection-extraction professionnelle, devis rapide.',
    },
    bullets: [
      'Pré-traitement ciblé sur taches et zones grasses',
      'Extraction profonde pour un rendu homogène',
      'Finition soignée + conseils simples pour préserver le tissu',
    ],
    seoBody: {
      intro2: 'On adapte le protocole au tissu et aux couleurs, avec un diagnostic et un pré-traitement ciblé.',
      useCases: ['Zones grasses (accoudoirs, têtières)', 'Taches alimentaires et boissons', 'Odeurs (animaux, tabac)', 'Traces d’usage et encrassement'],
      limits: ['Décolorations', 'Brûlures', 'Migration de teinture', 'Certaines taches anciennes “fixées”'],
      priceHint:
        "Le tarif dépend du nombre de places, de la matière et de l’état (salissures incrustées, taches). 2–3 photos suffisent pour un devis rapide.",
    },
    faq: [
      {
        q: 'Pouvez-vous intervenir sur tissus fragiles ?',
        a: "Oui, avec protocole adapté et test discret si nécessaire. Objectif : résultat net sans abîmer le textile.",
      },
      {
        q: 'Toutes les taches partent-elles ?',
        a: "La majorité des taches du quotidien oui. Certaines traces très anciennes (décoloration, brûlure, migration de teinture) peuvent rester visibles.",
      },
      {
        q: 'Combien de temps dure l’intervention ?',
        a: 'Souvent entre 45 min et 1h30 selon taille/état. On te donne une estimation au devis.',
      },
    ],
  },

  {
    slug: 'tapis',
    title: 'Nettoyage de tapis',
    short: 'Ravive les fibres, enlève les salissures.',
    seo: {
      h1: 'Nettoyage de tapis à domicile',
      title: 'Nettoyage de tapis à domicile | MOKET',
      description:
        'Nettoyage de tapis à domicile : salissures, taches, odeurs. Méthode injection-extraction, finition uniforme, devis rapide.',
    },
    bullets: [
      'Nettoyage en profondeur des fibres',
      'Rendu plus homogène et ravivé',
      'Conseils d’entretien et de séchage',
    ],
    seoBody: {
      intro2: 'Le but : retirer ce qui est incrusté dans la fibre, puis finir proprement pour un rendu uniforme.',
      useCases: ['Taches du quotidien (boissons, nourriture)', 'Odeurs (animaux, humidité)', 'Encrassement (zones de passage)', 'Poussières et allergènes'],
      limits: ['Décolorations', 'Brûlures', 'Certaines taches anciennes', 'Dégâts liés à l’humidité (selon cause)'],
      priceHint:
        "Le tarif dépend du format, de l’épaisseur et de l’état du tapis. Envoie une photo + dimensions pour une estimation rapide.",
    },
    faq: [
      { q: 'Pouvez-vous enlever les odeurs ?', a: "Oui, en retirant la saleté incrustée qui en est souvent la cause." },
      { q: 'Vous intervenez sur tous les tapis ?', a: 'La plupart oui. En cas de doute, on adapte le protocole ou on fait un test.' },
      { q: 'Combien de temps pour sécher ?', a: 'Variable selon épaisseur/matière/aération. On t’explique comment accélérer.' },
    ],
  },

  {
    slug: 'moquette',
    title: 'Nettoyage de moquette',
    short: 'Surfaces, pièces, bureaux — devis au m².',
    seo: {
      h1: 'Nettoyage de moquette à domicile',
      title: 'Nettoyage de moquette (domicile / bureaux) | MOKET',
      description:
        'Nettoyage de moquette : extraction profonde, rendu uniforme, devis au m². Intervention à domicile ou bureaux selon zone.',
    },
    bullets: [
      'Extraction profonde pour assainir et raviver',
      'Devis clair au m² selon état/surface',
      'Intervention propre (protection des lieux)',
    ],
    seoBody: {
      intro2: "Idéal pour les zones de passage : on retire l’encrassement dans la fibre et on homogénéise le rendu.",
      useCases: ['Traces de passage', 'Taches localisées', 'Moquette ternie / encrassée', 'Bureaux et pièces de vie'],
      limits: ['Décolorations', 'Brûlures', 'Certaines taches anciennes', 'Fibres endommagées (usure)'],
      priceHint:
        'Le tarif est généralement au m² et dépend de la surface, de l’état et de l’accessibilité. Une photo + surface approximative suffisent pour un devis.',
    },
    faq: [
      { q: 'Intervenez-vous sur grandes surfaces ?', a: 'Oui, sur devis. On adapte le protocole et le temps d’intervention.' },
      { q: 'Moquette très encrassée : ça marche ?', a: 'Oui, on récupère souvent beaucoup. On annonce un résultat réaliste au devis.' },
      { q: 'Séchage ?', a: 'Variable selon épaisseur/ventilation. Extraction puissante pour limiter l’eau résiduelle.' },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
