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
      angle: 'Habitat urbain + forte demande sur canapés tissu et matelas ; interventions groupées par secteurs.',
    },
    seo: {
      h1: 'Nettoyage textile à Boulogne-Billancourt',
      title: 'Nettoyage matelas, canapé, tapis & moquette à Boulogne-Billancourt | MOKET',
      description:
        'À Boulogne-Billancourt : intervention à domicile pour matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    shortNote: 'Créneaux selon tournée — envoie 2–3 photos pour une estimation claire.',
    seoBody: {
      introLocal:
        'À Boulogne-Billancourt, on intervient souvent sur canapés tissu et matelas en habitat urbain : pré-traitement ciblé puis injection-extraction pour un rendu homogène et un séchage maîtrisé.',
      travelHint: 'Accès rapide depuis Paris : créneaux regroupés par secteurs pour limiter l’attente.',
      trustSignals: ['Devis rapide sur photos', 'Injection-extraction', 'Conseils de séchage'],
      localUseCases: [
        'Canapé tissu (taches / zones grasses)',
        'Matelas (auréoles / odeurs)',
        'Tapis (raviver les fibres)',
        'Moquette (rendu uniforme)',
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
      angle: 'Recherche de finition “propre” et séchage maîtrisé sur textiles clairs.',
    },
    seo: {
      h1: 'Nettoyage textile à Neuilly-sur-Seine',
      title: 'Nettoyage canapé tissu, matelas, tapis & moquette à Neuilly-sur-Seine | MOKET',
      description:
        'À Neuilly-sur-Seine : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Méthode injection-extraction, devis rapide, résultat net.',
    },
    shortNote: 'Délais variables selon tournée — réponse rapide au devis.',
    seoBody: {
      introLocal:
        'À Neuilly-sur-Seine, on vise un rendu très propre sans sur-mouiller : diagnostic, pré-traitement puis extraction profonde pour limiter l’eau résiduelle et réduire les risques d’auréoles.',
      trustSignals: ['Pré-traitement ciblé', 'Extraction profonde', 'Intervention propre'],
      localUseCases: ['Canapé tissu clair', 'Tapis laine / synthétique', 'Matelas (assainissement)', 'Moquette (zones de passage)'],
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
        'À Levallois-Perret : intervention à domicile pour nettoyer matelas, canapé tissu, tapis et moquette. Devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Levallois-Perret, on intervient fréquemment sur textiles du quotidien (canapés tissu, matelas) avec un protocole rapide et efficace : pré-traitement + injection-extraction pour un résultat visible.',
      trustSignals: ['Résultat visible', 'Protocole adapté au textile', 'Conseils de séchage'],
      localUseCases: [
        'Canapé tissu (taches alimentaires)',
        'Matelas (transpiration / auréoles)',
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
      title: 'Nettoyage textile à Courbevoie : matelas, canapé, tapis, moquette | MOKET',
      description:
        'À Courbevoie : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Extraction profonde, devis rapide et créneaux flexibles.',
    },
    seoBody: {
      introLocal:
        'À Courbevoie, on traite les salissures incrustées et les odeurs (pré-traitement + extraction) avec une attention particulière aux textiles exposés à un usage intensif.',
      trustSignals: ['Traitement des odeurs', 'Extraction en profondeur', 'Devis rapide'],
      localUseCases: ['Moquette (zones de passage)', 'Tapis (raviver les fibres)', 'Canapé tissu (taches)', 'Matelas (assainissement)'],
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
        'À Nanterre : intervention à domicile pour nettoyage de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    seoBody: {
      introLocal:
        'À Nanterre, on adapte la puissance d’extraction à la matière pour un bon compromis : résultat net + séchage maîtrisé, sans agresser les fibres.',
      trustSignals: ['Diagnostic avant traitement', 'Extraction adaptée', 'Rendu homogène'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette'],
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
      title: 'Nettoyage textile à Vincennes : matelas, canapé, tapis, moquette | MOKET',
      description:
        'À Vincennes : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    seoBody: {
      introLocal:
        'À Vincennes, on intervient à domicile sur textiles du quotidien avec un protocole “propre” : pré-traitement ciblé, injection-extraction, puis conseils simples pour accélérer le séchage.',
      trustSignals: ['Devis rapide sur photos', 'Pré-traitement ciblé', 'Conseils de séchage'],
      localUseCases: ['Matelas (auréoles / odeurs)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
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
        'À Saint-Maur-des-Fossés : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Extraction profonde, devis rapide.',
    },
    seoBody: {
      introLocal:
        'À Saint-Maur-des-Fossés, on vise un rendu homogène sur canapés tissu et tapis : diagnostic, pré-traitement puis extraction pour retirer la saleté dans la fibre sans détremper.',
      trustSignals: ['Rendu homogène', 'Extraction profonde', 'Intervention à domicile'],
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
      title: 'Nettoyage textile à Créteil : matelas, canapé, tapis, moquette | MOKET',
      description:
        'À Créteil : intervention à domicile pour nettoyage de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Créteil, on traite les taches et odeurs en profondeur : pré-traitement + injection-extraction pour un résultat visible, avec une extraction puissante pour limiter l’eau résiduelle.',
      trustSignals: ['Résultat visible', 'Traitement des odeurs', 'Extraction puissante'],
      localUseCases: ['Matelas (assainissement)', 'Canapé tissu', 'Tapis', 'Moquette'],
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
        'À Nogent-sur-Marne : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, intervention propre.',
    },
    seoBody: {
      introLocal:
        'À Nogent-sur-Marne, on adapte le protocole à la matière et aux zones sensibles : pré-traitement ciblé puis extraction profonde pour un rendu uniforme et un séchage maîtrisé.',
      trustSignals: ['Protocole adapté', 'Extraction profonde', 'Conseils de séchage'],
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
        'À Versailles : intervention à domicile pour nettoyer matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    shortNote: 'Tournée par secteurs — photos utiles pour caler un créneau.',
    seoBody: {
      introLocal:
        'À Versailles, on intervient sur textiles du quotidien avec un protocole ajusté aux fibres : pré-traitement, injection-extraction, puis conseils simples pour optimiser le séchage selon l’aération.',
      trustSignals: ['Devis sur photos', 'Protocole adapté', 'Intervention propre'],
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
      title: 'Nettoyage textile à Saint-Germain-en-Laye : matelas, canapé, tapis, moquette | MOKET',
      description:
        'À Saint-Germain-en-Laye : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Devis rapide, extraction profonde.',
    },
    seoBody: {
      introLocal:
        'À Saint-Germain-en-Laye, on privilégie une extraction efficace pour limiter l’humidité résiduelle : objectif “résultat net + séchage rapide”, avec un pré-traitement ciblé sur les taches.',
      trustSignals: ['Pré-traitement ciblé', 'Extraction efficace', 'Conseils de séchage'],
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
        'À Montreuil : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Résultat visible, devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Montreuil, on traite les salissures incrustées et les odeurs en profondeur : pré-traitement + injection-extraction, pour un résultat visible tout en respectant la fibre.',
      trustSignals: ['Résultat visible', 'Traitement des odeurs', 'Extraction en profondeur'],
      localUseCases: ['Canapé tissu (taches)', 'Matelas (odeurs)', 'Tapis', 'Moquette'],
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
      title: 'Nettoyage textile à Pantin : matelas, canapé, tapis, moquette | MOKET',
      description:
        'À Pantin : intervention à domicile pour nettoyer matelas, canapé tissu, tapis et moquette. Devis rapide, extraction profonde.',
    },
    seoBody: {
      introLocal:
        'À Pantin, on vise un rendu uniforme sans sur-mouiller : diagnostic, pré-traitement ciblé puis extraction profonde pour retirer la saleté au cœur de la fibre.',
      trustSignals: ['Diagnostic avant traitement', 'Rendu homogène', 'Extraction profonde'],
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
      angle: 'Textiles très sollicités : taches + odeurs, conseils de séchage pour limiter odeurs résiduelles.',
    },
    seo: {
      h1: 'Nettoyage textile à Saint-Denis',
      title: 'Nettoyage textile à Saint-Denis : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'À Saint-Denis : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Traitement des taches et odeurs, devis rapide.',
    },
    seoBody: {
      introLocal:
        'À Saint-Denis, on intervient sur textiles très sollicités : pré-traitement des taches, injection-extraction puis conseils de séchage pour limiter les odeurs résiduelles.',
      trustSignals: ['Traitement des odeurs', 'Pré-traitement des taches', 'Extraction profonde'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette'],
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
      title: 'Nettoyage matelas, canapé, tapis & moquette à Rouen | MOKET',
      description:
        'À Rouen : intervention à domicile pour matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    shortNote: 'Interventions selon tournée — photos utiles pour une estimation claire.',
    seoBody: {
      introLocal:
        'À Rouen, on adapte le protocole à la matière et à l’état : pré-traitement ciblé puis injection-extraction pour retirer la saleté au cœur des fibres, avec une extraction puissante pour limiter l’eau résiduelle.',
      trustSignals: ['Protocole adapté', 'Extraction puissante', 'Conseils de séchage'],
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
        'Au Havre : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, intervention soignée.',
    },
    seoBody: {
      introLocal:
        'Au Havre, on privilégie une extraction efficace pour maîtriser le séchage : diagnostic, pré-traitement puis injection-extraction, avec une attention particulière aux textiles exposés à l’humidité ambiante.',
      trustSignals: ['Extraction efficace', 'Diagnostic avant traitement', 'Intervention soignée'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette'],
    },
    },
    {
    zoneSlug: 'seine-maritime',
    slug: 'elbeuf',
    name: 'Elbeuf',
    display: { postalCode: '76600', departmentCode: '76', regionLabel: 'Normandie' },
    geo: { lat: 49.2833, lng: 1.0346 },
    market: {
      segments: ['Particuliers', 'Commerces', 'Bureaux', 'Commerces'],
      angle: 'Textiles exposés à la fréquentation : extraction efficace + remise à neuf.',
    },
    seo: {
      h1: 'Nettoyage textile à Elbeuf',
      title: 'Nettoyage textile à Elbeuf : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'À Elbeuf : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, intervention soignée.',
    },
    seoBody: {
      introLocal:
        'À Elbeuf, on privilégie une extraction efficace pour maîtriser le séchage : diagnostic, pré-traitement puis injection-extraction, avec une attention particulière aux textiles exposés à l’humidité ambiante.',
      trustSignals: ['Extraction efficace', 'Diagnostic avant traitement', 'Intervention soignée'],
      localUseCases: ['Canapé tissu', 'Matelas', 'Tapis', 'Moquette'],
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
      angle: 'Remises en état ponctuelles et textiles assainis ; rendu homogène.',
    },
    seo: {
      h1: 'Nettoyage textile à Dieppe',
      title: 'Nettoyage textile à Dieppe : matelas, canapé tissu, tapis, moquette | MOKET',
      description:
        'À Dieppe : intervention à domicile pour nettoyer matelas, canapé tissu, tapis et moquette. Devis rapide sur photos.',
    },
    seoBody: {
      introLocal:
        'À Dieppe, on intervient à domicile avec un protocole ajusté aux fibres et aux couleurs : pré-traitement puis extraction profonde pour un rendu homogène et des textiles assainis.',
      trustSignals: ['Protocole adapté', 'Rendu homogène', 'Devis rapide'],
      localUseCases: ['Matelas', 'Canapé tissu', 'Tapis', 'Moquette'],
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
        'À Caen : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Diagnostic + pré-traitement, injection-extraction, devis rapide.',
    },
    shortNote: 'Créneaux selon tournée — réponse rapide au devis (photos utiles).',
    seoBody: {
      introLocal:
        'À Caen, on vise un assainissement en profondeur : diagnostic, pré-traitement puis injection-extraction pour retirer salissures et odeurs dans la fibre, avec un rendu net et uniforme.',
      trustSignals: ['Diagnostic + pré-traitement', 'Assainissement en profondeur', 'Conseils de séchage'],
      localUseCases: ['Matelas (odeurs / auréoles)', 'Canapé tissu', 'Tapis', 'Moquette (zones de passage)'],
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
        'À Deauville : intervention à domicile pour nettoyer matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    seoBody: {
      introLocal:
        'À Deauville, on met l’accent sur le rendu et la fraîcheur : pré-traitement des taches, injection-extraction, puis conseils de séchage pour retrouver des textiles propres et assainis.',
      trustSignals: ['Pré-traitement ciblé', 'Extraction profonde', 'Rendu net'],
      localUseCases: ['Locations saisonnières', 'Matelas', 'Canapé tissu', 'Moquette'],
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
      title: 'Nettoyage matelas, canapé, tapis & moquette à Honfleur | MOKET',
      description:
        'À Honfleur : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Idéal pour locations saisonnières : résultat net, devis rapide.',
    },
    shortNote: 'Créneaux selon tournée — idéal entre deux séjours (photos utiles).',
    seoBody: {
      introLocal:
        'À Honfleur, on intervient souvent pour des remises en état rapides (locations saisonnières, hôtellerie) : pré-traitement ciblé + injection-extraction pour retirer salissures et odeurs dans la fibre, avec un séchage maîtrisé.',
      trustSignals: ['Devis rapide sur photos', 'Traitement des odeurs', 'Extraction profonde'],
      localUseCases: ['Locations courte durée (Airbnb)', 'Hôtellerie', 'Tapis (salissures incrustées)', 'Moquette (zones de passage)'],
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
        'À Trouville-sur-Mer : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Devis rapide sur photos, extraction profonde.',
    },
    seoBody: {
      introLocal:
        'À Trouville-sur-Mer, on intervient souvent pour des remises en état entre séjours : pré-traitement des taches + injection-extraction pour un rendu net et des textiles assainis.',
      trustSignals: ['Pré-traitement ciblé', 'Extraction profonde', 'Conseils de séchage'],
      localUseCases: ['Locations saisonnières', 'Matelas', 'Canapé tissu', 'Moquette'],
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
        'À Cabourg : nettoyage à domicile (matelas, canapé tissu, tapis, moquette). Devis rapide sur photos, intervention soignée.',
    },
    seoBody: {
      introLocal:
        'À Cabourg, on intervient à domicile pour raviver et assainir : pré-traitement ciblé puis injection-extraction pour retirer les salissures dans la fibre, avec un séchage maîtrisé.',
      trustSignals: ['Devis rapide sur photos', 'Extraction profonde', 'Rendu homogène'],
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
        'À Lisieux : nettoyage à domicile de matelas, canapé tissu, tapis et moquette. Devis rapide, extraction profonde, résultat visible.',
    },
    seoBody: {
      introLocal:
        'À Lisieux, on adapte le protocole à l’état du textile : pré-traitement ciblé puis extraction profonde pour un résultat visible, sans agresser les fibres.',
      trustSignals: ['Résultat visible', 'Protocole adapté', 'Devis rapide'],
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
