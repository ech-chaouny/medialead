import type { Consent } from './consent';

/* Mesure : GA4, Meta Pixel et Google Ads, chargés seulement après consentement (voir lib/consent.ts).
   Identifiants dans les variables d'environnement Vercel ; sans identifiant, l'outil n'est pas chargé.
   Les événements partent toujours dans window.dataLayer (sans donnée personnelle), et vers GA4, Meta et
   Google Ads uniquement si l'outil a été autorisé et chargé. */

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // AW-XXXXXXXXX
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL; // libellé de la conversion « lead »

type Fn = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Fn; fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn }; _fbq?: unknown }
}

const loaded = { gtag: false, ga4: false, ads: false, pixel: false };

const addScript = (src: string) => {
  const s = document.createElement('script');
  s.async = true; s.src = src;
  document.head.appendChild(s);
};

function ensureGtag(id: string) {
  if (loaded.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date());
  addScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
  loaded.gtag = true;
}

function ensurePixel(id: string) {
  if (loaded.pixel) return;
  const f = function (...args: unknown[]) { f.callMethod ? f.callMethod(...args) : f.queue!.push(args); } as NonNullable<Window['fbq']>;
  f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
  window.fbq = f; window._fbq = f;
  addScript('https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', id);
  window.fbq('track', 'PageView');
  loaded.pixel = true;
}

/* Applique un choix de consentement : charge ce qui est autorisé (un retrait prend effet au prochain chargement). */
export function applyConsent(c: Consent) {
  if (c.analytics && GA4 && !loaded.ga4) {
    ensureGtag(GA4);
    window.gtag!('config', GA4);
    loaded.ga4 = true;
  }
  if (c.ads && ADS && !loaded.ads) {
    ensureGtag(ADS);
    window.gtag!('config', ADS);
    loaded.ads = true;
  }
  if (c.ads && PIXEL) ensurePixel(PIXEL);
}

/* Page vue lors d'une navigation interne (GA4 suit déjà l'historique ; Meta non). */
export function trackPageView() {
  if (loaded.pixel) window.fbq!('track', 'PageView');
}

const pixelEvents: Record<string, string> = { form_submit: 'Lead', whatsapp_click: 'Contact', phone_click: 'Contact', email_click: 'Contact' };

/* Événement de suivi. Pas de nom, email ni téléphone dans les paramètres. */
export function track(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page: window.location.pathname, ...params });
  if (loaded.ga4) window.gtag!('event', event, params);
  if (loaded.pixel) {
    if (pixelEvents[event]) window.fbq!('track', pixelEvents[event], params);
    else if (event === 'audit_complete') window.fbq!('trackCustom', 'AuditComplete', params);
  }
  if (loaded.ads && event === 'form_submit' && ADS_LEAD_LABEL) window.gtag!('event', 'conversion', { send_to: `${ADS}/${ADS_LEAD_LABEL}` });
}
