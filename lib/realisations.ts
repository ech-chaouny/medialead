import data from './realisations.json';

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
  client: string;
  sector: string;
  image?: string;
  bgColor?: string;
  mockup?: boolean;
  url?: string;
  contentType?: ContentType;
  preview?: string;
  video?: string;
};

export const groups: { type: RealisationType; label: string; title: string; unit: [string, string] }[] = [
  { type: 'app', label: 'Applications', title: 'Des apps pensées pour l’usage.', unit: ['écran', 'écrans'] },
  { type: 'system', label: 'Systèmes', title: 'Des back-offices pour piloter.', unit: ['système', 'systèmes'] },
  { type: 'website', label: 'Sites web', title: 'Des sites pour être trouvé.', unit: ['site', 'sites'] },
  { type: 'content', label: 'Contenus', title: 'Vidéos, stories et posts.', unit: ['contenu', 'contenus'] },
];

export const contentLabels: Record<ContentType, string> = { video: 'Reel', post: 'Post', story: 'Story', ads: 'Ads' };

const all = data as Realisation[];
export const itemsOf = (type: RealisationType) => all.filter(r => r.type === type).sort((a, b) => a.order - b.order);
