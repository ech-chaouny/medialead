/* Bannières de projets qui défilent seules dans l'onglet Développement de « Déjà fait ».
   Pour ajouter une bannière : déposer l'image dans public/portfolio/ puis renseigner `src`.
   Une bannière par projet. Format unique : 1920 × 1080 (16:9), WebP < 300 Ko ; garder le texte important hors du bas de l'image (légende au survol).
   Sans `src`, un emplacement réservé aux couleurs du projet s'affiche. */

export type Sector = 'livraison' | 'lavage' | 'marketplace' | 'auto' | 'education' | 'telecom';

export type Banner = {
  id: string;
  project: string;
  sector: Sector;
  title: string;
  format: 'wide' | 'tall';
  src?: string;
};

export const sectors: { id: Sector; label: string }[] = [
  { id: 'livraison', label: 'Livraison de repas' },
  { id: 'lavage', label: 'Lavage à domicile' },
  { id: 'marketplace', label: 'Online marketplace' },
  { id: 'auto', label: 'Services auto' },
  { id: 'education', label: 'Éducation' },
  { id: 'telecom', label: 'Télécom' },
];

export const banners: Banner[] = [
  { id: 'drok-1', project: 'DROK', sector: 'livraison', title: 'Campagne, application et back-office', format: 'wide', src: '/portfolio/drok-1.webp' },
  { id: 'washroc-1', project: 'WashRoc', sector: 'lavage', title: 'Application, back-office et lancement', format: 'wide', src: '/portfolio/washroc-1.webp' },
  { id: 'omak-1', project: 'OMAK Service', sector: 'auto', title: 'Application et campagne de lancement', format: 'wide', src: '/portfolio/omak-1.webp' },
  { id: 'fnm-1', project: 'FNM', sector: 'education', title: 'Site, application et inscriptions', format: 'wide', src: '/portfolio/fnm-1.webp' },
  { id: 'privu-1', project: 'Privu', sector: 'marketplace', title: 'Marketplace d’annonces vidéo', format: 'wide', src: '/portfolio/privu-1.webp' },
  { id: 'telecom-1', project: 'Réseau Telecom', sector: 'telecom', title: 'Campagne Fibre et lead generation', format: 'wide', src: '/portfolio/telecom-1.webp' },
];
