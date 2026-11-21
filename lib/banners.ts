/* Bannières de projets qui défilent seules dans l'onglet Développement de « Déjà fait ».
   Pour ajouter une bannière : déposer l'image dans public/portfolio/ puis renseigner `src`.
   Une bannière par projet. Format unique : 1920 × 1080 (16:9), WebP < 300 Ko ; garder le texte important hors du bas de l'image (légende au survol).
   Sans `src`, un emplacement réservé aux couleurs du projet s'affiche. `project` reste interne : le site n'affiche que le secteur.
   `brandLogo` signale un logo tiers dans l'image : la bannière n'apparaît qu'avec l'autorisation (lib/sectors.ts). */
import { sectorLabels, marocTelecomAuthorized } from './sectors';

export type Sector = 'livraison' | 'lavage' | 'marketplace' | 'auto' | 'education' | 'telecom';

export type Banner = {
  id: string;
  project: string;
  sector: Sector;
  title: string;
  titleEn: string;
  format: 'wide' | 'tall';
  src?: string;
  brandLogo?: 'maroc-telecom';
};

export const sectors: { id: Sector; label: string }[] = [
  { id: 'livraison', label: sectorLabels.drok },
  { id: 'lavage', label: sectorLabels.washroc },
  { id: 'marketplace', label: sectorLabels.privu },
  { id: 'auto', label: sectorLabels.omak },
  { id: 'education', label: sectorLabels.fnm },
  { id: 'telecom', label: sectorLabels.telecom },
];

const allBanners: Banner[] = [
  { id: 'drok-1', project: 'DROK', sector: 'livraison', title: 'Campagne, application et back-office', titleEn: 'Campaign, app and back-office', format: 'wide', src: '/portfolio/drok-1.webp' },
  { id: 'washroc-1', project: 'WashRoc', sector: 'lavage', title: 'Application, back-office et lancement', titleEn: 'App, back-office and launch', format: 'wide', src: '/portfolio/washroc-1.webp' },
  { id: 'omak-1', project: 'OMAK Service', sector: 'auto', title: 'Application et campagne de lancement', titleEn: 'App and launch campaign', format: 'wide', src: '/portfolio/omak-1.webp' },
  { id: 'fnm-1', project: 'FNM', sector: 'education', title: 'Site, application et inscriptions', titleEn: 'Website, app and enrolments', format: 'wide', src: '/portfolio/fnm-1.webp' },
  { id: 'privu-1', project: 'Privu', sector: 'marketplace', title: 'Marketplace d’annonces vidéo', titleEn: 'Video listings marketplace', format: 'wide', src: '/portfolio/privu-1.webp' },
  { id: 'telecom-1', project: 'Réseau Telecom', sector: 'telecom', title: 'Campagne Fibre et lead generation', titleEn: 'Fibre campaign and lead generation', format: 'wide', src: '/portfolio/telecom-1.webp', brandLogo: 'maroc-telecom' },
];

export const banners = allBanners.filter(b => !b.brandLogo || marocTelecomAuthorized);
