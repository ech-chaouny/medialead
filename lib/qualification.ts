/* Formulaire de qualification « Parlons de votre projet » (brief développeur, version simple).
   Module pur : partagé par le formulaire et par la route API qui revalide chaque valeur. */

type Choice = { id: string; label: string; internal?: string };

export const needs: Choice[] = [
  { id: 'launch', label: 'Lancer un produit digital', internal: 'Product Launch' },
  { id: 'takeover', label: 'Faire évoluer / reprendre un produit existant', internal: 'Product Takeover' },
  { id: 'app_growth', label: 'Faire grandir une app / plateforme', internal: 'App Growth' },
  { id: 'lead_gen', label: 'Générer plus de leads / ventes', internal: 'Lead Generation' },
  { id: 'digital', label: 'Digitaliser mon entreprise', internal: 'Digital Transformation' },
  { id: 'unknown', label: 'Je ne sais pas encore', internal: 'Audit / Strategy First' },
];

export const stages: Choice[] = [
  { id: 'idea', label: 'Idée / projet défini' },
  { id: 'mvp', label: 'MVP en développement' },
  { id: 'launched', label: 'Produit déjà lancé' },
  { id: 'revenue', label: 'Produit avec des clients / revenus' },
  { id: 'business', label: 'Entreprise existante à digitaliser' },
];

export const budgets: Choice[] = [
  { id: 'lt20', label: 'Moins de 20 000 MAD' },
  { id: '20_50', label: '20 000 - 50 000 MAD' },
  { id: '50_100', label: '50 000 - 100 000 MAD' },
  { id: '100_250', label: '100 000 - 250 000 MAD' },
  { id: 'gt250', label: '250 000 MAD et +' },
  { id: 'tbd', label: 'À définir avec Medialead' },
];

export const timelines: Choice[] = [
  { id: 'asap', label: 'Dès que possible' },
  { id: '1m', label: 'Dans 1 mois' },
  { id: '1_3m', label: 'Dans 1 à 3 mois' },
  { id: 'later', label: 'Plus tard / en exploration' },
];

export const DESCRIPTION_MAX = 300;

export const labelOf = (list: Choice[], id: unknown) => list.find(c => c.id === id);
