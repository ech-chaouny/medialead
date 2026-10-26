/* Attribution conservée pendant la session : les UTM de la page d'arrivée ne doivent pas se perdre
   quand le visiteur navigue ensuite vers /contact ou remplit le Growth Audit. */
const KEY = 'ml_attribution';
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export type Attribution = Record<string, string>;

/* À appeler à chaque page vue : mémorise la première arrivée, ou la nouvelle si elle porte des UTM. */
export function rememberAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM.some(k => params.get(k));
    if (sessionStorage.getItem(KEY) && !hasUtm) return;
    const data: Attribution = Object.fromEntries(UTM.map(k => [k, params.get(k) ?? '']));
    data.landing_page = window.location.href;
    data.referrer = document.referrer;
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch { /* stockage indisponible : on se rabat sur l'URL courante à l'envoi */ }
}

export function readAttribution(): Attribution {
  let stored: Attribution = {};
  try { stored = JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { /* ignoré */ }
  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(UTM.map(k => [k, params.get(k) ?? '']));
  return {
    ...current, landing_page: window.location.href, referrer: document.referrer,
    ...Object.fromEntries(Object.entries(stored).filter(([, v]) => v)),
    timestamp: new Date().toISOString(),
  };
}
