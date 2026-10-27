/* Galerie « Réalisations » : le travail livré, secteur par secteur.
   Pour ajouter un visuel : déposer le fichier dans public/portfolio/ puis renseigner `src`
   (et `poster` pour une vidéo : image affichée avant la lecture). Sans `src`, un emplacement réservé s'affiche.
   Formats conseillés : vidéo .mp4 (H.264, sans son, < 6 Mo), image .webp. */

export type Sector = 'livraison' | 'lavage' | 'marketplace' | 'auto' | 'education' | 'telecom';
export type Kind = 'Vidéo' | 'Créative' | 'Application' | 'Site web';

export type PortfolioItem = {
  id: string;
  sector: Sector;
  kind: Kind;
  title: string;
  ratio: '9/16' | '4/5' | '1/1' | '16/10' | '16/9';
  src?: string;
  poster?: string;
};

export const sectors: { id: Sector; label: string }[] = [
  { id: 'livraison', label: 'Livraison de repas' },
  { id: 'lavage', label: 'Lavage à domicile' },
  { id: 'marketplace', label: 'Online marketplace' },
  { id: 'auto', label: 'Services auto' },
  { id: 'education', label: 'Éducation' },
  { id: 'telecom', label: 'Télécom' },
];

export const portfolio: PortfolioItem[] = [
  { id: 'liv-app', sector: 'livraison', kind: 'Application', title: 'Parcours de commande', ratio: '9/16' },
  { id: 'liv-video', sector: 'livraison', kind: 'Vidéo', title: 'Vidéo de relance', ratio: '4/5' },
  { id: 'liv-crea', sector: 'livraison', kind: 'Créative', title: 'Offre du moment', ratio: '1/1' },
  { id: 'lav-app', sector: 'lavage', kind: 'Application', title: 'Réservation d’un lavage', ratio: '9/16' },
  { id: 'lav-video', sector: 'lavage', kind: 'Vidéo', title: 'Campagne de lancement', ratio: '16/9' },
  { id: 'lav-crea', sector: 'lavage', kind: 'Créative', title: 'Formules de lavage', ratio: '4/5' },
  { id: 'mkt-site', sector: 'marketplace', kind: 'Site web', title: 'Marketplace vidéo', ratio: '16/10' },
  { id: 'mkt-app', sector: 'marketplace', kind: 'Application', title: 'Fiche produit', ratio: '9/16' },
  { id: 'auto-video', sector: 'auto', kind: 'Vidéo', title: 'Débosselage et PPF', ratio: '9/16' },
  { id: 'auto-crea', sector: 'auto', kind: 'Créative', title: 'Offre services', ratio: '1/1' },
  { id: 'auto-site', sector: 'auto', kind: 'Site web', title: 'Présence digitale', ratio: '16/10' },
  { id: 'edu-video', sector: 'education', kind: 'Vidéo', title: 'Campagne d’inscription', ratio: '4/5' },
  { id: 'edu-crea', sector: 'education', kind: 'Créative', title: 'Formation en naturopathie', ratio: '1/1' },
  { id: 'tel-crea', sector: 'telecom', kind: 'Créative', title: 'Offres Fibre & ADSL', ratio: '4/5' },
  { id: 'tel-video', sector: 'telecom', kind: 'Vidéo', title: 'Lead generation multi-agences', ratio: '16/9' },
];
