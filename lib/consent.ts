/* Consentement cookies : choix mémorisé 6 mois dans le navigateur (cookie « nécessaire », sans donnée personnelle).
   Aucun outil de mesure ou de publicité n'est chargé avant un choix explicite (bannière ou « Gérer mes cookies »). */

export type Consent = { analytics: boolean; ads: boolean; at: string };

const KEY = 'ml_consent';
const MAX_AGE = 1000 * 60 * 60 * 24 * 182; // ≈ 6 mois
export const CONSENT_EVENT = 'ml-consent';
export const OPEN_EVENT = 'ml-consent-open';

export function readConsent(): Consent | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Consent | null;
    if (!c || typeof c.analytics !== 'boolean' || typeof c.ads !== 'boolean') return null;
    return Date.now() - new Date(c.at).getTime() < MAX_AGE ? c : null;
  } catch { return null; }
}

export function saveConsent(choice: Omit<Consent, 'at'>) {
  const c: Consent = { ...choice, at: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}

/* Ouvre le panneau de choix (lien « Gérer mes cookies »). */
export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT));
