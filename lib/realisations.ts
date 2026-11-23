import data from './realisations.json';
import { marocTelecomAuthorized } from './sectors';

/* Réalisations : toutes les données viennent de realisations.json.
   Pour ajouter un projet : ajouter une ligne dans le JSON, déposer l'image (WebP) dans public/ et renseigner son chemin.
   - app     : capture mobile + bgColor (fond de la carte)      → image conseillée 600 × 1300
               mockup: true si l'image contient déjà le téléphone (PNG/WebP détouré) : affichée sans cadre
   - system  : capture desktop d'un back-office               → image conseillée 1120 × 700 (16:10)
   - website : capture desktop + url (ouvre le site réel)     → image conseillée 1120 × 700 (16:10)
   - content : visuel 9:16 + contentType ; vidéo = chemin MP4  → image conseillée 500 × 888
               vidéo : image = couverture, preview = extrait muet de 4 s (joué dans la carte), video = MP4 complet (modale)
               post = format 4:5 (même hauteur que les stories)       → image conseillée 520 × 650
   `order` trie les éléments d'une même sous-section. Image vide : un emplacement réservé s'affiche.
   Une sous-section sans élément n'est pas affichée. */

export type RealisationType = 'app' | 'system' | 'website' | 'content';
export type ContentType = 'video' | 'post' | 'story' | 'ads';

export type Realisation = {
  type: RealisationType;
  order: number;
  title: string;
  titleEn?: string;
  client: string;
  sector: string;
  image?: string;
  bgColor?: string;
  mockup?: boolean;
  url?: string;
  contentType?: ContentType;
  preview?: string;
  video?: string;
  brandLogo?: 'maroc-telecom';
  /* Ordre propre à la grille de la page Réalisations (sinon `order`). */
  gridOrder?: number;
};

export const groups: { type: RealisationType; label: Record<'fr' | 'en', string>; title: Record<'fr' | 'en', string>; unit: Record<'fr' | 'en', [string, string]> }[] = [
  { type: 'app', label: { fr: 'Applications', en: 'Apps' }, title: { fr: 'Des apps pensées pour l’usage.', en: 'Apps designed for real use.' }, unit: { fr: ['écran', 'écrans'], en: ['screen', 'screens'] } },
  { type: 'system', label: { fr: 'Systèmes', en: 'Systems' }, title: { fr: 'Des back-offices pour piloter.', en: 'Back-offices to run the business.' }, unit: { fr: ['système', 'systèmes'], en: ['system', 'systems'] } },
  { type: 'website', label: { fr: 'Sites web', en: 'Websites' }, title: { fr: 'Des sites pour être trouvé.', en: 'Websites built to be found.' }, unit: { fr: ['site', 'sites'], en: ['site', 'sites'] } },
  { type: 'content', label: { fr: 'Contenus', en: 'Content' }, title: { fr: 'Vidéos, stories et posts.', en: 'Videos, stories and posts.' }, unit: { fr: ['contenu', 'contenus'], en: ['piece', 'pieces'] } },
];

/* Titre d'une réalisation dans la langue de la page. */
export const titleOf = (r: Realisation, lang: 'fr' | 'en') => (lang === 'en' && r.titleEn) || r.title;

export const contentLabels: Record<ContentType, string> = { video: 'Reel', post: 'Post', story: 'Story', ads: 'Ads' };

const all = data as Realisation[];
// `client` reste interne (jamais affiché) ; un visuel avec un logo tiers n'apparaît qu'avec l'autorisation.
export const itemsOf = (type: RealisationType) => all.filter(r => r.type === type && (!r.brandLogo || marocTelecomAuthorized)).sort((a, b) => a.order - b.order);

/* Nombre total de réalisations d'un type (y compris celles masquées faute d'autorisation de logo). */
export const countOf = (type: RealisationType) => all.filter(r => r.type === type).length;
