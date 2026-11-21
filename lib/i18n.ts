/* Langues du site : le français à la racine (/contact), l'anglais sous /en (/en/contact).
   Le proxy (proxy.ts) choisit la langue : choix mémorisé (cookie ml_lang), sinon langue du navigateur. */
export const langs = ['fr', 'en'] as const;
export type Lang = (typeof langs)[number];
export const LANG_COOKIE = 'ml_lang';

export const isLang = (v: unknown): v is Lang => langs.includes(v as Lang);

/* Chemin d'une page dans une langue : « / », « /contact », « /#audit » → « /en », « /en/contact », « /en#audit ». */
export function localePath(lang: Lang, path: string) {
  if (lang === 'fr') return path;
  if (path === '/') return '/en';
  if (path.startsWith('/#')) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/* Chemin sans préfixe de langue, pour construire le lien vers l'autre langue. */
export const stripLang = (pathname: string) => pathname.replace(/^\/(en|fr)(?=\/|$)/, '') || '/';

/* Choix d'un texte selon la langue. */
export const tr = <T,>(lang: Lang, v: { fr: T; en: T }) => v[lang];
