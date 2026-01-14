// frontend/src/lib/cities.ts

export type CitySegment =
  | 'Particuliers'
  | 'Familles'
  | 'Airbnb'
  | 'Hôtellerie'
  | 'Restauration'
  | 'Bureaux'
  | 'Commerces';

export type City = {
  zoneSlug: string; // ex: "hauts-de-seine"
  slug: string; // ex: "boulogne-billancourt"
  name: string; // ex: "Boulogne-Billancourt"

  display?: {
    postalCode?: string;
    departmentCode?: string; // "92", "76", etc.
    regionLabel?: 'Île-de-France' | 'Normandie';
  };

  // Coordonnées (utile pour JSON-LD et cohérence locale)
  geo?: { lat: number; lng: number };

  // Différenciation business locale
  market?: {
    segments?: CitySegment[];
    angle?: string; // 1 phrase courte “spécificité”
  };

  seo: {
    h1: string;
    title: string;
    description: string;
  };

  indexable?: boolean; // default true
  shortNote?: string; // info logistique locale (tournée/créneaux)

  seoBody?: {
    introLocal?: string; // paragraphe unique local
    travelHint?: string; // “accès / tournée / dispo”
    trustSignals?: string[];
    localUseCases?: string[]; // cas fréquents (bureaux/parents/animaux/etc.)
  };
};

// ⚠️ Coordonnées indicatives (cohérentes). Si tu veux, tu peux les affiner plus tard.
export const CITIES: City[] = [
  // =========================
  // ÎLE-DE-FRANCE — 92 (Hauts-de-Seine)
  // =========================
  {
    zoneSlug: 'hauts-de-seine',
    slug: 'boulogne-billancourt',
    name: 'Boulogne-Billancourt',
    display: { postalCode: '92100', departmentCode: '92', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8397, lng: 2.2399 },
    market: {
      segments: ['Particuliers', 'Familles', 'Bureaux'],
      angle:
        'Habitat urbain + forte demande sur canapés tissu et matelas ; interventions groupées par secteurs pour optimiser les créneaux.',
    },
    seo: {
      h1: 'Nettoyage textile à Boulogne-Billancourt',
      title: 'Nettoyage matelas, canapé tissu, tapis & moquette à Boulogne-Billancourt | MOKET',
      description:
        'Boulogne-Billancourt (92100) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Injection-extraction, taches/odeurs/acariens, devis rapide sur photos.',
    },
    shortNote: 'Créneaux selon tournée — envoie 2–3 photos (ensemble + gros plan des taches) pour une estimation claire.',
    seoBody: {
      introLocal:
        'À Boulogne-Billancourt, on intervient surtout sur canapés tissu et matelas en habitat urbain : diagnostic rapide, pré-traitement ciblé puis injection-extraction pour décrasser la fibre, limiter les auréoles et obtenir un rendu homogène.',
      travelHint:
        'Accès rapide depuis Paris : créneaux regroupés par quartiers/secteurs. Envoie des photos + dimensions (ou nombre de places) pour un devis précis.',
      trustSignals: ['Devis rapide sur photos', 'Pré-traitement ciblé', 'Injection-extraction', 'Séchage maîtrisé', 'Intervention propre & protégée'],
      localUseCases: [
        'Canapé tissu (taches / zones grasses)',
        'Matelas (auréoles / odeurs / acariens)',
        'Tapis (raviver les fibres)',
        'Moquette (rendu uniforme sur zones de passage)',
      ],
    },
  },
  {
    zoneSlug: 'hauts-de-seine',
    slug: 'neuilly-sur-seine',
    name: 'Neuilly-sur-Seine',
    display: { postalCode: '92200', departmentCode: '92', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8847, lng: 2.2696 },
    market: {
      segments: ['Particuliers', 'Familles', 'Bureaux'],
      angle: 'Recherche de finition très “propre” et séchage maîtrisé, notamment sur textiles clairs.',
    },
    seo: {
      h1: 'Nettoyage textile à Neuilly-sur-Seine',
      title: 'Nettoyage canapé tissu, matelas, tapis & moquette à Neuilly-sur-Seine | MOKET',
      description:
        'Neuilly-sur-Seine (92200) : nettoyage à domicile de canapé tissu, matelas, tapis et moquette. Finition soignée, injection-extraction, devis rapide sur photos.',
    },
    shortNote: 'Délais variables selon tournée — réponse rapide au devis après réception des photos.',
    seoBody: {
      introLocal:
        'À Neuilly-sur-Seine, l’objectif est un rendu net et régulier, sans sur-mouiller : diagnostic, pré-traitement des taches puis extraction profonde pour limiter l’eau résiduelle et réduire le risque d’auréoles (textiles clairs).',
      travelHint:
        'Créneaux planifiés selon tournée. Pour accélérer : 2–3 photos + matière (si connue) + dimensions/places.',
      trustSignals: ['Diagnostic avant traitement', 'Pré-traitement anti-taches', 'Extraction profonde', 'Séchage maîtrisé', 'Conseils de séchage'],
      localUseCases: [
        'Canapé tissu clair (auréoles / taches)',
        'Tapis laine / synthétique (salissures incrustées)',
        'Matelas (assainissement / odeurs)',
        'Moquette (zones de passage)',
      ],
    },
  },
  {
    zoneSlug: 'hauts-de-seine',
    slug: 'levallois-perret',
    name: 'Levallois-Perret',
    display: { postalCode: '92300', departmentCode: '92', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8932, lng: 2.2876 },
    market: {
      segments: ['Particuliers', 'Familles', 'Bureaux'],
      angle: 'Textiles du quotidien très sollicités : taches alimentaires, zones grasses, odeurs.',
    },
    seo: {
      h1: 'Nettoyage textile à Levallois-Perret',
      title: 'Nettoyage matelas, canapé tissu, tapis & moquette à Levallois-Perret | MOKET',
      description:
        'Levallois-Perret (92300) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Traitement taches & odeurs, injection-extraction, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Levallois-Perret, on traite fréquemment les textiles “usage quotidien” : pré-traitement ciblé (taches/gras) puis injection-extraction pour un résultat visible, un toucher plus propre et un rendu homogène.',
      travelHint:
        'Créneaux selon tournée. Pour un chiffrage rapide : photo d’ensemble + photos des zones concernées + nombre de places/dimensions.',
      trustSignals: ['Résultat visible', 'Pré-traitement ciblé', 'Injection-extraction', 'Conseils de séchage', 'Intervention propre & protégée'],
      localUseCases: [
        'Canapé tissu (taches alimentaires / zones grasses)',
        'Matelas (transpiration / auréoles / odeurs)',
        'Tapis (salissures incrustées)',
        'Moquette (zones de passage)',
      ],
    },
  },
  {
    zoneSlug: 'hauts-de-seine',
    slug: 'courbevoie',
    name: 'Courbevoie',
    display: { postalCode: '92400', departmentCode: '92', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8966, lng: 2.2560 },
    market: {
      segments: ['Bureaux', 'Commerces', 'Particuliers'],
      angle: 'Forte demande “usage intensif” : moquettes / zones de passage, canapés d’accueil.',
    },
    seo: {
      h1: 'Nettoyage textile à Courbevoie',
      title: 'Nettoyage textile à Courbevoie : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Courbevoie (92400) : nettoyage à domicile pour particuliers, bureaux et commerces. Moquette, tapis, canapé tissu, matelas. Extraction profonde, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Courbevoie, on intervient souvent sur des textiles exposés à un usage intensif (accueil, bureaux, zones de passage) : pré-traitement puis extraction en profondeur pour retirer la saleté incrustée et rafraîchir les odeurs.',
      travelHint:
        'Interventions possibles en journée selon planning. Pour bureaux/commerces : indique la surface (m²) et les zones prioritaires + photos.',
      trustSignals: ['Traitement des odeurs', 'Extraction en profondeur', 'Devis rapide', 'Protocole adapté au textile', 'Conseils de séchage'],
      localUseCases: [
        'Moquette (zones de passage / bureaux)',
        'Canapé tissu (accueil / taches)',
        'Tapis (raviver les fibres)',
        'Matelas (assainissement)',
      ],
    },
  },
  {
    zoneSlug: 'hauts-de-seine',
    slug: 'nanterre',
    name: 'Nanterre',
    display: { postalCode: '92000', departmentCode: '92', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8924, lng: 2.2060 },
    market: {
      segments: ['Particuliers', 'Bureaux'],
      angle: 'Interventions “résultat net + séchage maîtrisé” sur canapés, matelas et moquettes de passage.',
    },
    seo: {
      h1: 'Nettoyage textile à Nanterre',
      title: 'Nettoyage matelas, canapé tissu, tapis & moquette à Nanterre | MOKET',
      description:
        'Nanterre (92000) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Diagnostic + injection-extraction, rendu homogène, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Nanterre, on adapte la puissance d’extraction à la matière et à l’état du textile : objectif résultat net + séchage maîtrisé, sans agresser les fibres (canapés, matelas, moquettes).',
      travelHint:
        'Créneaux selon tournée. Envoie 2–3 photos + dimensions/surface pour une estimation claire et rapide.',
      trustSignals: ['Diagnostic avant traitement', 'Extraction adaptée', 'Rendu homogène', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette (zones de passage)'],
    },
  },

  // =========================
  // ÎLE-DE-FRANCE — 94 (Val-de-Marne)
  // =========================
  {
    zoneSlug: 'val-de-marne',
    slug: 'vincennes',
    name: 'Vincennes',
    display: { postalCode: '94300', departmentCode: '94', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8486, lng: 2.4377 },
    market: {
      segments: ['Familles', 'Particuliers'],
      angle: 'Demande fréquente “matelas + canapés” (enfants, taches, odeurs) avec rendu homogène.',
    },
    seo: {
      h1: 'Nettoyage textile à Vincennes',
      title: 'Nettoyage textile à Vincennes : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Vincennes (94300) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Taches/odeurs/acariens, injection-extraction, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Vincennes, on intervient à domicile sur les textiles du quotidien (familles) : pré-traitement ciblé, injection-extraction puis conseils simples pour accélérer le séchage et limiter les auréoles.',
      travelHint:
        'Créneaux selon tournée. Pour un devis rapide : photos + nombre de places/dimensions + type de taches/odeurs.',
      trustSignals: ['Devis rapide sur photos', 'Pré-traitement ciblé', 'Injection-extraction', 'Séchage maîtrisé', 'Intervention propre'],
      localUseCases: ['Matelas (auréoles / odeurs / acariens)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'val-de-marne',
    slug: 'saint-maur-des-fosses',
    name: 'Saint-Maur-des-Fossés',
    display: { postalCode: '94100', departmentCode: '94', regionLabel: 'Île-de-France' },
    geo: { lat: 48.7930, lng: 2.4937 },
    market: {
      segments: ['Familles', 'Particuliers'],
      angle: 'Rendu homogène sur canapés tissu et tapis, intervention propre à domicile.',
    },
    seo: {
      h1: 'Nettoyage textile à Saint-Maur-des-Fossés',
      title: 'Nettoyage canapé tissu, matelas, tapis & moquette à Saint-Maur-des-Fossés | MOKET',
      description:
        'Saint-Maur-des-Fossés (94100) : nettoyage à domicile de canapé tissu, matelas, tapis et moquette. Injection-extraction, rendu homogène, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Saint-Maur-des-Fossés, on vise un rendu homogène sur canapés tissu et tapis : diagnostic, pré-traitement puis extraction profonde pour retirer la saleté dans la fibre sans détremper.',
      travelHint:
        'Créneaux selon tournée. Pour une estimation rapide : photos + matière (si connue) + dimensions/surface.',
      trustSignals: ['Rendu homogène', 'Extraction profonde', 'Pré-traitement ciblé', 'Intervention à domicile', 'Conseils de séchage'],
      localUseCases: ['Canapé tissu (taches)', 'Tapis', 'Matelas', 'Moquette'],
    },
  },
  {
    zoneSlug: 'val-de-marne',
    slug: 'creteil',
    name: 'Créteil',
    display: { postalCode: '94000', departmentCode: '94', regionLabel: 'Île-de-France' },
    geo: { lat: 48.7904, lng: 2.4556 },
    market: {
      segments: ['Particuliers', 'Familles', 'Commerces'],
      angle: 'Traitement taches + odeurs (pré-traitement) puis extraction profonde ; résultat visible.',
    },
    seo: {
      h1: 'Nettoyage textile à Créteil',
      title: 'Nettoyage textile à Créteil : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Créteil (94000) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Traitement taches & odeurs, extraction puissante, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Créteil, on traite taches et odeurs en profondeur : pré-traitement + injection-extraction, avec une extraction puissante pour limiter l’eau résiduelle et accélérer le séchage.',
      travelHint:
        'Créneaux selon tournée. Pour les commerces : précise la surface (m²) + photos des zones de passage.',
      trustSignals: ['Résultat visible', 'Traitement des odeurs', 'Extraction puissante', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Matelas (assainissement)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'val-de-marne',
    slug: 'nogent-sur-marne',
    name: 'Nogent-sur-Marne',
    display: { postalCode: '94130', departmentCode: '94', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8369, lng: 2.4826 },
    market: {
      segments: ['Familles', 'Particuliers'],
      angle: 'Séchage maîtrisé et rendu uniforme sur textiles sensibles (canapés tissu, tapis).',
    },
    seo: {
      h1: 'Nettoyage textile à Nogent-sur-Marne',
      title: 'Nettoyage canapé tissu, matelas, tapis & moquette à Nogent-sur-Marne | MOKET',
      description:
        'Nogent-sur-Marne (94130) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Protocole adapté, rendu uniforme, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Nogent-sur-Marne, on adapte le protocole à la matière et aux zones sensibles : pré-traitement ciblé puis extraction profonde pour un rendu uniforme, sans sur-mouiller.',
      travelHint:
        'Créneaux selon tournée. Envoie des photos + dimensions pour un devis clair et une planification simple.',
      trustSignals: ['Protocole adapté', 'Extraction profonde', 'Rendu uniforme', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Matelas', 'Canapé tissu', 'Tapis', 'Moquette'],
    },
  },

  // =========================
  // ÎLE-DE-FRANCE — 78 (Yvelines)
  // =========================
  {
    zoneSlug: 'yvelines',
    slug: 'versailles',
    name: 'Versailles',
    display: { postalCode: '78000', departmentCode: '78', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8049, lng: 2.1204 },
    market: {
      segments: ['Particuliers', 'Familles'],
      angle: 'Protocole ajusté aux fibres + conseils de séchage ; tournée par secteurs.',
    },
    seo: {
      h1: 'Nettoyage textile à Versailles',
      title: 'Nettoyage textile à Versailles : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Versailles (78000) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Injection-extraction, taches/odeurs/acariens, devis rapide sur photos.',
    },
    shortNote: 'Tournée par secteurs — photos utiles pour caler un créneau et confirmer la matière.',
    seoBody: {
      introLocal:
        'À Versailles, on intervient sur les textiles du quotidien avec un protocole ajusté aux fibres : pré-traitement, injection-extraction, puis conseils simples pour optimiser le séchage selon l’aération et la saison.',
      travelHint:
        'Versailles et alentours : créneaux regroupés par secteurs. Pour gagner du temps : photos + dimensions/places + type de taches.',
      trustSignals: ['Devis sur photos', 'Protocole adapté', 'Injection-extraction', 'Séchage maîtrisé', 'Intervention propre'],
      localUseCases: ['Matelas (auréoles)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'yvelines',
    slug: 'saint-germain-en-laye',
    name: 'Saint-Germain-en-Laye',
    display: { postalCode: '78100', departmentCode: '78', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8986, lng: 2.0937 },
    market: {
      segments: ['Particuliers', 'Familles'],
      angle: 'Objectif “résultat net + séchage rapide” grâce à une extraction efficace.',
    },
    seo: {
      h1: 'Nettoyage textile à Saint-Germain-en-Laye',
      title: 'Nettoyage textile à Saint-Germain-en-Laye : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Saint-Germain-en-Laye (78100) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Extraction efficace, séchage rapide, devis sur photos.',
    },
    seoBody: {
      introLocal:
        'À Saint-Germain-en-Laye, on privilégie une extraction efficace pour limiter l’humidité résiduelle : objectif “résultat net + séchage rapide”, avec un pré-traitement ciblé sur les taches.',
      travelHint:
        'Créneaux selon tournée dans les Yvelines. Envoie des photos + dimensions/surface pour un devis rapide.',
      trustSignals: ['Pré-traitement ciblé', 'Extraction efficace', 'Séchage maîtrisé', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette'],
    },
  },

  // =========================
  // ÎLE-DE-FRANCE — 93 (Seine-Saint-Denis)
  // =========================
  {
    zoneSlug: 'seine-saint-denis',
    slug: 'montreuil',
    name: 'Montreuil',
    display: { postalCode: '93100', departmentCode: '93', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8638, lng: 2.4485 },
    market: {
      segments: ['Particuliers', 'Familles', 'Commerces'],
      angle: 'Traitement salissures incrustées + odeurs ; protocole respectueux de la fibre.',
    },
    seo: {
      h1: 'Nettoyage textile à Montreuil',
      title: 'Nettoyage textile à Montreuil : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Montreuil (93100) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Traitement odeurs/taches, injection-extraction, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Montreuil, on traite les salissures incrustées et les odeurs : pré-traitement + injection-extraction pour un résultat visible tout en respectant la fibre et la couleur.',
      travelHint:
        'Créneaux selon tournée. Pour les commerces : surface (m²) + photos des zones à fort passage.',
      trustSignals: ['Résultat visible', 'Traitement des odeurs', 'Extraction en profondeur', 'Devis rapide', 'Protocole respectueux des fibres'],
      localUseCases: ['Canapé tissu (taches)', 'Matelas (odeurs)', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'seine-saint-denis',
    slug: 'pantin',
    name: 'Pantin',
    display: { postalCode: '93500', departmentCode: '93', regionLabel: 'Île-de-France' },
    geo: { lat: 48.8944, lng: 2.4090 },
    market: {
      segments: ['Particuliers', 'Commerces'],
      angle: 'Rendu uniforme sans sur-mouiller : extraction profonde + diagnostic avant traitement.',
    },
    seo: {
      h1: 'Nettoyage textile à Pantin',
      title: 'Nettoyage textile à Pantin : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Pantin (93500) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Rendu uniforme, injection-extraction, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Pantin, on vise un rendu uniforme sans sur-mouiller : diagnostic, pré-traitement ciblé puis extraction profonde pour retirer la saleté au cœur de la fibre (canapés, tapis, moquettes).',
      travelHint:
        'Créneaux selon tournée. Photos + dimensions/surface = devis plus rapide et plus fiable.',
      trustSignals: ['Diagnostic avant traitement', 'Rendu homogène', 'Extraction profonde', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Matelas', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'seine-saint-denis',
    slug: 'saint-denis',
    name: 'Saint-Denis',
    display: { postalCode: '93200', departmentCode: '93', regionLabel: 'Île-de-France' },
    geo: { lat: 48.9362, lng: 2.3574 },
    market: {
      segments: ['Particuliers', 'Commerces', 'Bureaux'],
      angle: 'Textiles très sollicités : taches + odeurs, séchage maîtrisé pour limiter les odeurs résiduelles.',
    },
    seo: {
      h1: 'Nettoyage textile à Saint-Denis',
      title: 'Nettoyage textile à Saint-Denis : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Saint-Denis (93200) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Traitement taches & odeurs, extraction profonde, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Saint-Denis, on intervient sur des textiles très sollicités : pré-traitement des taches, injection-extraction, puis conseils de séchage pour limiter l’humidité résiduelle et les odeurs.',
      travelHint:
        'Créneaux selon tournée. Pour bureaux/commerces : surface (m²) + zones prioritaires + photos.',
      trustSignals: ['Pré-traitement des taches', 'Traitement des odeurs', 'Extraction profonde', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette (zones de passage)'],
    },
  },

  // =========================
  // NORMANDIE — 76 (Seine-Maritime)
  // =========================
  {
    zoneSlug: 'seine-maritime',
    slug: 'rouen',
    name: 'Rouen',
    display: { postalCode: '76000', departmentCode: '76', regionLabel: 'Normandie' },
    geo: { lat: 49.4431, lng: 1.0993 },
    market: {
      segments: ['Particuliers', 'Bureaux', 'Commerces'],
      angle: 'Protocole ajusté aux matières/couleurs ; extraction puissante pour limiter l’eau résiduelle.',
    },
    seo: {
      h1: 'Nettoyage textile à Rouen',
      title: 'Nettoyage matelas, canapé tissu, tapis & moquette à Rouen | MOKET',
      description:
        'Rouen (76000) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Protocole adapté, extraction profonde, devis rapide sur photos.',
    },
    shortNote: 'Interventions selon tournée — photos utiles (ensemble + gros plans) pour une estimation claire.',
    seoBody: {
      introLocal:
        'À Rouen, on adapte le protocole à la matière et à l’état : pré-traitement ciblé puis injection-extraction pour retirer la saleté au cœur des fibres, avec une extraction puissante pour limiter l’eau résiduelle.',
      travelHint:
        'Créneaux selon tournée en Seine-Maritime. Pour un devis rapide : 2–3 photos + dimensions/surface + type de textile.',
      trustSignals: ['Protocole adapté', 'Extraction puissante', 'Devis rapide sur photos', 'Rendu homogène', 'Conseils de séchage'],
      localUseCases: ['Matelas (auréoles / odeurs)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'seine-maritime',
    slug: 'le-havre',
    name: 'Le Havre',
    display: { postalCode: '76600', departmentCode: '76', regionLabel: 'Normandie' },
    geo: { lat: 49.4944, lng: 0.1079 },
    market: {
      segments: ['Particuliers', 'Airbnb', 'Hôtellerie', 'Commerces'],
      angle: 'Textiles exposés à l’humidité : extraction efficace + conseils de séchage.',
    },
    seo: {
      h1: 'Nettoyage textile au Havre',
      title: 'Nettoyage textile au Havre : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Le Havre (76600) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Extraction efficace (séchage maîtrisé), devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'Au Havre, on privilégie une extraction efficace pour maîtriser le séchage : diagnostic, pré-traitement puis injection-extraction, avec une attention particulière aux textiles exposés à l’humidité ambiante.',
      travelHint:
        'Créneaux selon tournée. Idéal entre deux séjours (Airbnb/hôtel) : envoie photos + date souhaitée pour caler rapidement.',
      trustSignals: ['Extraction efficace', 'Séchage maîtrisé', 'Devis rapide', 'Intervention soignée', 'Conseils de séchage'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette', 'Remise en état entre séjours'],
    },
  },
  {
    zoneSlug: 'seine-maritime',
    slug: 'elbeuf',
    name: 'Elbeuf',
    // ✅ correction : Elbeuf = 76500
    display: { postalCode: '76500', departmentCode: '76', regionLabel: 'Normandie' },
    geo: { lat: 49.2833, lng: 1.0346 },
    market: {
      segments: ['Particuliers', 'Bureaux', 'Commerces'],
      angle: 'Textiles exposés à la fréquentation : décrassage en profondeur + rendu net.',
    },
    seo: {
      h1: 'Nettoyage textile à Elbeuf',
      title: 'Nettoyage textile à Elbeuf : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Elbeuf (76500) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Décrassage en profondeur, extraction efficace, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Elbeuf, on traite les textiles marqués par la fréquentation : diagnostic, pré-traitement ciblé puis injection-extraction pour retrouver un rendu plus propre, limiter les odeurs et homogénéiser les zones de passage.',
      travelHint:
        'Créneaux selon tournée. Pour bureaux/commerces : surface (m²) + photos des zones principales pour une estimation rapide.',
      trustSignals: ['Devis rapide', 'Extraction efficace', 'Pré-traitement ciblé', 'Rendu homogène', 'Conseils de séchage'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'seine-maritime',
    slug: 'dieppe',
    name: 'Dieppe',
    display: { postalCode: '76200', departmentCode: '76', regionLabel: 'Normandie' },
    geo: { lat: 49.9229, lng: 1.0775 },
    market: {
      segments: ['Particuliers', 'Airbnb', 'Hôtellerie'],
      angle: 'Remises en état ponctuelles : taches + odeurs, rendu homogène.',
    },
    seo: {
      h1: 'Nettoyage textile à Dieppe',
      title: 'Nettoyage textile à Dieppe : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Dieppe (76200) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Remise en état, taches/odeurs, injection-extraction, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Dieppe, on intervient souvent pour des remises en état : pré-traitement des taches, extraction profonde et protocole ajusté aux fibres/couleurs pour un rendu homogène et des textiles assainis.',
      travelHint:
        'Créneaux selon tournée. Pour locations : envoie photos + date d’entrée/sortie pour caler entre deux séjours.',
      trustSignals: ['Protocole adapté', 'Rendu homogène', 'Devis rapide', 'Extraction profonde', 'Conseils de séchage'],
      localUseCases: ['Matelas', 'Canapé tissu', 'Tapis', 'Moquette', 'Remise en état location'],
    },
  },

  // =========================
  // NORMANDIE — 14 (Calvados)
  // =========================
  {
    zoneSlug: 'calvados',
    slug: 'caen',
    name: 'Caen',
    display: { postalCode: '14000', departmentCode: '14', regionLabel: 'Normandie' },
    geo: { lat: 49.1829, lng: -0.3707 },
    market: {
      segments: ['Particuliers', 'Familles', 'Commerces', 'Bureaux'],
      angle: 'Assainissement en profondeur : diagnostic + pré-traitement + extraction ; rendu net et uniforme.',
    },
    seo: {
      h1: 'Nettoyage textile à Caen',
      title: 'Nettoyage textile à Caen : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Caen (14000) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Assainissement (taches/odeurs/acariens), injection-extraction, devis rapide sur photos.',
    },
    shortNote: 'Créneaux selon tournée — réponse rapide au devis (photos + dimensions utiles).',
    seoBody: {
      introLocal:
        'À Caen, on vise un assainissement en profondeur : diagnostic, pré-traitement puis injection-extraction pour retirer salissures et odeurs dans la fibre, avec une extraction efficace pour limiter l’eau résiduelle et obtenir un rendu net.',
      travelHint:
        'Créneaux selon tournée dans le Calvados. Pour un devis rapide : 2–3 photos + dimensions/surface + type de taches/odeurs.',
      trustSignals: ['Diagnostic + pré-traitement', 'Assainissement en profondeur', 'Injection-extraction', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Matelas (odeurs / auréoles / acariens)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'calvados',
    slug: 'deauville',
    name: 'Deauville',
    display: { postalCode: '14800', departmentCode: '14', regionLabel: 'Normandie' },
    geo: { lat: 49.3579, lng: 0.0710 },
    market: {
      segments: ['Airbnb', 'Hôtellerie', 'Particuliers'],
      angle: 'Turnover saisonnier : remise en état entre séjours, focus odeurs et rendu.',
    },
    seo: {
      h1: 'Nettoyage textile à Deauville',
      title: 'Nettoyage textile à Deauville : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Deauville (14800) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Idéal locations saisonnières : remise en état, taches/odeurs, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Deauville, on met l’accent sur le rendu et la fraîcheur entre deux séjours : pré-traitement des taches, injection-extraction puis conseils de séchage pour des textiles propres, assainis et visiblement ravivés.',
      travelHint:
        'Créneaux selon tournée. Pour locations : photos + date de rotation = planification plus simple.',
      trustSignals: ['Devis rapide sur photos', 'Remise en état entre séjours', 'Traitement des odeurs', 'Extraction profonde', 'Conseils de séchage'],
      localUseCases: ['Locations saisonnières (Airbnb)', 'Matelas', 'Canapé tissu', 'Tapis', 'Moquette'],
    },
  },
  {
    zoneSlug: 'calvados',
    slug: 'honfleur',
    name: 'Honfleur',
    display: { postalCode: '14600', departmentCode: '14', regionLabel: 'Normandie' },
    geo: { lat: 49.4192, lng: 0.2329 },
    market: {
      segments: ['Airbnb', 'Hôtellerie', 'Restauration', 'Particuliers'],
      angle: 'Turnover rapide : textiles à forte rotation (locations, hôtels, restaurants).',
    },
    seo: {
      h1: 'Nettoyage textile à Honfleur',
      title: 'Nettoyage matelas, canapé tissu, tapis & moquette à Honfleur | MOKET',
      description:
        'Honfleur (14600) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Remise en état rapide (Airbnb/hôtel/resto), taches/odeurs, devis sur photos.',
    },
    shortNote: 'Créneaux selon tournée — idéal entre deux séjours (photos + dates utiles).',
    seoBody: {
      introLocal:
        'À Honfleur, on intervient souvent pour des remises en état rapides (locations, hôtellerie, restauration) : pré-traitement ciblé + injection-extraction pour retirer salissures et odeurs dans la fibre, avec un séchage maîtrisé.',
      travelHint:
        'Créneaux selon tournée. Pour pro : indique le volume (nombre de chambres/surfaces) + photos pour un chiffrage rapide.',
      trustSignals: ['Devis rapide sur photos', 'Remise en état rapide', 'Traitement des odeurs', 'Injection-extraction', 'Intervention soignée'],
      localUseCases: ['Locations courte durée (Airbnb)', 'Hôtellerie', 'Restauration (banquettes)', 'Tapis', 'Moquette (zones de passage)'],
    },
  },
  {
    zoneSlug: 'calvados',
    slug: 'trouville-sur-mer',
    name: 'Trouville-sur-Mer',
    display: { postalCode: '14360', departmentCode: '14', regionLabel: 'Normandie' },
    geo: { lat: 49.3650, lng: 0.0826 },
    market: {
      segments: ['Airbnb', 'Hôtellerie', 'Particuliers'],
      angle: 'Remises en état fréquentes : odeurs, taches, textiles de passage.',
    },
    seo: {
      h1: 'Nettoyage textile à Trouville-sur-Mer',
      title: 'Nettoyage matelas, canapé tissu, tapis & moquette à Trouville-sur-Mer | MOKET',
      description:
        'Trouville-sur-Mer (14360) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Remise en état entre séjours, taches/odeurs, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Trouville-sur-Mer, on intervient souvent entre deux séjours : pré-traitement des taches + injection-extraction pour un rendu net, des textiles assainis et des odeurs réduites.',
      travelHint:
        'Créneaux selon tournée. Pour locations : photos + dates d’arrivée/départ pour caler au bon moment.',
      trustSignals: ['Pré-traitement ciblé', 'Extraction profonde', 'Devis rapide', 'Rendu net', 'Conseils de séchage'],
      localUseCases: ['Locations saisonnières', 'Matelas', 'Canapé tissu', 'Tapis', 'Moquette'],
    },
  },
  {
    zoneSlug: 'calvados',
    slug: 'cabourg',
    name: 'Cabourg',
    display: { postalCode: '14390', departmentCode: '14', regionLabel: 'Normandie' },
    geo: { lat: 49.2916, lng: -0.1131 },
    market: {
      segments: ['Airbnb', 'Particuliers', 'Hôtellerie'],
      angle: 'Saison : besoin de remise en état rapide, focus taches et odeurs.',
    },
    seo: {
      h1: 'Nettoyage textile à Cabourg',
      title: 'Nettoyage textile à Cabourg : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Cabourg (14390) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Remise en état saisonnière, injection-extraction, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Cabourg, on intervient pour raviver et assainir : pré-traitement ciblé puis injection-extraction pour retirer les salissures dans la fibre, réduire les odeurs et obtenir un rendu plus homogène.',
      travelHint:
        'Créneaux selon tournée. Photos + dimensions/surface recommandées pour estimer au plus juste.',
      trustSignals: ['Devis rapide sur photos', 'Extraction profonde', 'Rendu homogène', 'Traitement des odeurs', 'Conseils de séchage'],
      localUseCases: ['Locations saisonnières', 'Matelas', 'Canapé tissu', 'Tapis', 'Moquette'],
    },
  },
  {
    zoneSlug: 'calvados',
    slug: 'lisieux',
    name: 'Lisieux',
    display: { postalCode: '14100', departmentCode: '14', regionLabel: 'Normandie' },
    geo: { lat: 49.1466, lng: 0.2292 },
    market: {
      segments: ['Particuliers', 'Familles'],
      angle: 'Protocole adapté à l’état du textile : résultat visible sans agresser les fibres.',
    },
    seo: {
      h1: 'Nettoyage textile à Lisieux',
      title: 'Nettoyage textile à Lisieux : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'Lisieux (14100) : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Protocole adapté, résultat visible, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Lisieux, on adapte le protocole à l’état du textile : pré-traitement ciblé puis extraction en profondeur pour un résultat visible (taches/odeurs) tout en respectant les fibres.',
      travelHint:
        'Créneaux selon tournée. Envoie 2–3 photos + dimensions/surface pour une estimation rapide.',
      trustSignals: ['Résultat visible', 'Protocole adapté', 'Extraction profonde', 'Devis rapide', 'Conseils de séchage'],
      localUseCases: ['Matelas', 'Canapé tissu', 'Tapis', 'Moquette'],
    },
  },
];

export function getCity(zoneSlug: string, citySlug: string) {
  return CITIES.find((c) => c.zoneSlug === zoneSlug && c.slug === citySlug);
}

export function getCitiesByZone(zoneSlug: string) {
  return CITIES.filter((c) => c.zoneSlug === zoneSlug);
}

export function getCitySlugsByZone(zoneSlug: string) {
  return getCitiesByZone(zoneSlug).map((c) => c.slug);
}
