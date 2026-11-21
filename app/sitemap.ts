import type { MetadataRoute } from 'next';

const base = 'https://medialead.ma';
const pages = ['', '/contact', '/mentions-legales', '/confidentialite', '/cookies'];

/* Chaque page existe en français (racine) et en anglais (/en), déclarées l'une pour l'autre. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(p => {
    const fr = `${base}${p || '/'}`, en = `${base}/en${p}`;
    const alternates = { languages: { fr, en } };
    const priority = p ? (p === '/contact' ? 0.8 : 0.3) : 1;
    const changeFrequency = p ? 'yearly' as const : 'monthly' as const;
    return [{ url: fr, alternates, priority, changeFrequency }, { url: en, alternates, priority, changeFrequency }];
  });
}
