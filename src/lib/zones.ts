export type Zone = {
  slug: string;
  title: string;
  seo: {
    h1: string;
    title: string;
    description: string;
  };
  regionLabel: 'Île-de-France' | 'Normandie';
  shortNote?: string;
  cities?: string[];

  seoBody?: {
    introLocal?: string;
    travelHint?: string;
    trustSignals?: string[];
  };
};

export const ZONES: Zone[] = [
  {
    slug: 'paris',
    title: 'Paris',
    regionLabel: 'Île-de-France',
    seo: {
      h1: 'Nettoyage textile à Paris',
      title: 'Nettoyage matelas, canapé, tapis & moquette à Paris | MOKET',
      description:
        'Intervention à domicile à Paris : nettoyage matelas, canapé, tapis et moquette. Devis rapide, créneaux flexibles.',
    },
    // (tu peux garder "Paris 1er" etc. si tu préfères — l’important est d’être cohérent partout)
    cities: [
      'Paris 1er',
      'Paris 2e',
      'Paris 3e',
      'Paris 4e',
      'Paris 5e',
      'Paris 6e',
      'Paris 7e',
      'Paris 8e',
      'Paris 9e',
      'Paris 10e',
      'Paris 11e',
      'Paris 12e',
      'Paris 13e',
      'Paris 14e',
      'Paris 15e',
      'Paris 16e',
      'Paris 17e',
      'Paris 18e',
      'Paris 19e',
      'Paris 20e',
    ],
    seoBody: {
      introLocal:
        "Intervention à domicile à Paris : on adapte le protocole selon la matière et l’état (pré-traitement + injection-extraction) pour un rendu homogène et un séchage maîtrisé.",
      trustSignals: ['Devis rapide sur photos', 'Injection-extraction', 'Conseils de séchage'],
    },
  },

  {
    slug: 'hauts-de-seine',
    title: 'Hauts-de-Seine',
    regionLabel: 'Île-de-France',
    seo: {
      h1: 'Nettoyage textile dans les Hauts-de-Seine',
      title: 'Nettoyage textile Hauts-de-Seine (92) | MOKET',
      description:
        'Nettoyage à domicile dans le 92 : matelas, canapé, tapis, moquette. Intervention rapide, résultat net.',
    },
    shortNote: 'Délais variables selon tournée (devis rapide sur photos).',
    cities: ['Boulogne-Billancourt', 'Nanterre', 'Courbevoie', 'Neuilly-sur-Seine', 'Levallois-Perret'],
    seoBody: {
      introLocal:
        "Dans les Hauts-de-Seine, on intervient à domicile avec un protocole ajusté au textile (taches, zones grasses, odeurs) et une extraction profonde pour limiter l’eau résiduelle.",
      trustSignals: ['Intervention à domicile', 'Pré-traitement ciblé', 'Extraction profonde'],
    },
  },

  {
    slug: 'val-de-marne',
    title: 'Val-de-Marne',
    regionLabel: 'Île-de-France',
    seo: {
      h1: 'Nettoyage textile dans le Val-de-Marne',
      title: 'Nettoyage textile Val-de-Marne (94) | MOKET',
      description:
        'Nettoyage à domicile dans le 94 : matelas, canapé, tapis et moquette. Devis rapide et intervention à domicile.',
    },
    shortNote: 'Créneaux selon tournée — réponse rapide au devis.',
    cities: ['Vincennes', 'Saint-Maur-des-Fossés', 'Créteil', 'Nogent-sur-Marne'],
    seoBody: {
      introLocal:
        "Dans le Val-de-Marne, on vise un résultat net et homogène : diagnostic, pré-traitement puis injection-extraction adaptée à la matière et aux zones sensibles.",
      trustSignals: ['Diagnostic avant traitement', 'Rendu homogène', 'Conseils simples de séchage'],
    },
  },

  {
    slug: 'yvelines',
    title: 'Yvelines',
    regionLabel: 'Île-de-France',
    seo: {
      h1: 'Nettoyage textile dans les Yvelines',
      title: 'Nettoyage textile Yvelines (78) | MOKET',
      description:
        'Nettoyage à domicile dans le 78 : matelas, canapé, tapis, moquette. Créneaux flexibles et devis rapide.',
    },
    shortNote: 'Tournée selon secteurs — envoie 2–3 photos pour caler un créneau.',
    seoBody: {
      introLocal:
        "Dans les Yvelines, on intervient à domicile sur textiles du quotidien (matelas, canapés tissu, tapis, moquettes) avec une extraction profonde et un protocole adapté aux fibres.",
      trustSignals: ['Devis sur photos', 'Protocole adapté au textile', 'Intervention propre'],
    },
  },

  {
    slug: 'seine-saint-denis',
    title: 'Seine-Saint-Denis',
    regionLabel: 'Île-de-France',
    seo: {
      h1: 'Nettoyage textile en Seine-Saint-Denis',
      title: 'Nettoyage textile Seine-Saint-Denis (93) | MOKET',
      description:
        'Nettoyage à domicile dans le 93 : matelas, canapé, tapis, moquette. Résultat visible, devis rapide.',
    },
    shortNote: 'Disponibilités selon tournée — devis rapide pour estimation + créneau.',
    seoBody: {
      introLocal:
        "En Seine-Saint-Denis, on traite les salissures incrustées et les odeurs en profondeur (pré-traitement + injection-extraction) pour un résultat visible sans agresser le textile.",
      trustSignals: ['Résultat visible', 'Traitement des odeurs', 'Extraction en profondeur'],
    },
  },

  {
    slug: 'seine-maritime',
    title: 'Seine-Maritime',
    regionLabel: 'Normandie',
    seo: {
      h1: 'Nettoyage textile en Seine-Maritime',
      title: 'Nettoyage textile Seine-Maritime (76) | MOKET',
      description:
        'Intervention à domicile en Seine-Maritime : matelas, canapé, tapis, moquette. Devis rapide.',
    },
    shortNote: 'Interventions selon tournée — envoie des photos pour une estimation claire.',
    seoBody: {
      introLocal:
        "En Seine-Maritime, on intervient à domicile avec un protocole ajusté (matière/couleurs) et une extraction puissante pour limiter l’eau résiduelle et faciliter le séchage.",
      trustSignals: ['Protocole adapté', 'Extraction puissante', 'Devis rapide'],
    },
  },

  {
    slug: 'calvados',
    title: 'Calvados',
    regionLabel: 'Normandie',
    seo: {
      h1: 'Nettoyage textile dans le Calvados',
      title: 'Nettoyage textile Calvados (14) | MOKET',
      description:
        'Intervention à domicile dans le Calvados : nettoyage matelas, canapé, tapis, moquette. Devis rapide.',
    },
    shortNote: 'Créneaux selon tournée — réponse rapide au devis (photos utiles).',
    seoBody: {
      introLocal:
        "Dans le Calvados, on intervient à domicile pour assainir et raviver les textiles : diagnostic, pré-traitement, puis injection-extraction pour retirer la saleté dans la fibre.",
      trustSignals: ['Diagnostic + pré-traitement', 'Assainissement en profondeur', 'Conseils de séchage'],
    },
  },
];

export function getZone(slug: string) {
  return ZONES.find((z) => z.slug === slug);
}
