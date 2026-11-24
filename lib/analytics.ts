import type { Consent } from './consent';

/* Mesure : Google Tag Manager, GA4, Meta Pixel et Google Ads, chargés seulement après consentement (voir lib/consent.ts).
   Identifiants dans les variables d'environnement Vercel (GTM et Pixel ont une valeur par défaut, ce sont des identifiants publics).
   GTM reçoit le mode de consentement Google (refusé par défaut, puis mis à jour selon le choix).
   Les événements partent toujours dans window.dataLayer (sans donnée personnelle), et vers GA4, Meta et
   Google Ads uniquement si l'outil a été autorisé et chargé. */

const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const GTM = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TG6RXNCB';
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1856678035547939';
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // AW-XXXXXXXXX
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL; // libellé de la conversion « lead »

type Fn = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Fn; fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn }; _fbq?: unknown }
}

const loaded = { gtag: false, ga4: false, ads: false, pixel: false, gtm: false };

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

/* Google Tag Manager avec le mode de consentement : refusé par défaut, puis accordé selon le choix du visiteur. */
function ensureGtm(id: string, c: Consent) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  const state = (ok: boolean) => ok ? 'granted' : 'denied';
  const choice = { analytics_storage: state(c.analytics), ad_storage: state(c.ads), ad_user_data: state(c.ads), ad_personalization: state(c.ads) };
  if (loaded.gtm) { window.gtag('consent', 'update', choice); return; }
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', choice);
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  addScript(`https://www.googletagmanager.com/gtm.js?id=${id}`);
  loaded.gtm = true;
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
  if ((c.analytics || c.ads) && GTM) ensureGtm(GTM, c);
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
