'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { readConsent, saveConsent, CONSENT_EVENT, OPEN_EVENT, type Consent } from '@/lib/consent';
import { applyConsent, track, trackPageView } from '@/lib/analytics';
import { localePath } from '@/lib/i18n';
import { useLang } from '@/components/lang-provider';

const copy = {
  fr: { title: 'Nous respectons votre vie privée', text: 'Nous utilisons des cookies pour mesurer l’audience du site et l’efficacité de nos publicités. Vous pouvez accepter, refuser ou choisir.', more: 'En savoir plus', needed: ['Nécessaires', 'Fonctionnement du site et mémorisation de vos choix. Toujours actifs.'], audience: ['Mesure d’audience', 'Google Analytics 4 : statistiques de visite anonymisées.'], ads: ['Publicité', 'Meta Pixel et Google Ads : mesurer l’efficacité de nos publicités.'], accept: 'Tout accepter', refuse: 'Tout refuser', custom: 'Personnaliser', save: 'Enregistrer mes choix' },
  en: { title: 'We respect your privacy', text: 'We use cookies to measure site traffic and the effectiveness of our ads. You can accept, refuse or choose.', more: 'Learn more', needed: ['Necessary', 'Site operation and remembering your choices. Always on.'], audience: ['Audience measurement', 'Google Analytics 4: anonymised visit statistics.'], ads: ['Advertising', 'Meta Pixel and Google Ads: measure the effectiveness of our ads.'], accept: 'Accept all', refuse: 'Refuse all', custom: 'Customise', save: 'Save my choices' },
};

/* Bannière cookies (Tout accepter / Tout refuser / Personnaliser, même poids visuel) et chargement des outils
   autorisés. Suit aussi les clics sur les liens téléphone, email et WhatsApp, partout sur le site. */
export default function ConsentManager() {
  const lang = useLang();
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [choice, setChoice] = useState({ analytics: false, ads: false });
  const pathname = usePathname();

  useEffect(() => {
    const c = readConsent();
    if (c) applyConsent(c); else setOpen(true);
    const onSaved = (e: Event) => applyConsent((e as CustomEvent<Consent>).detail);
    const onOpen = () => { const cur = readConsent(); setChoice({ analytics: !!cur?.analytics, ads: !!cur?.ads }); setCustom(true); setOpen(true); };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a');
      const href = a?.getAttribute('href') ?? '';
      // Boutons marqués data-track (cta_audit, devis_click) ; liens téléphone, email et WhatsApp détectés par leur adresse.
      if (a?.dataset.track) track(a.dataset.track, a.dataset.offer ? { offer: a.dataset.offer } : {});
      if (href.startsWith('tel:')) track('phone_click');
      else if (href.startsWith('mailto:')) track('email_click');
      else if (href.includes('wa.me/')) track('whatsapp_click');
    };
    window.addEventListener(CONSENT_EVENT, onSaved);
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener(CONSENT_EVENT, onSaved); window.removeEventListener(OPEN_EVENT, onOpen); document.removeEventListener('click', onClick); };
  }, []);

  useEffect(() => { trackPageView(); }, [pathname]);

  const decide = (c: { analytics: boolean; ads: boolean }) => { saveConsent(c); setOpen(false); setCustom(false); };

  if (!open) return null;
  return <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
    <div className="consent-copy">
      <p className="consent-title" id="consent-title">{t.title}</p>
      <p className="consent-text">{t.text} <Link href={localePath(lang, '/cookies')}>{t.more}</Link></p>
    </div>
    {custom && <div className="consent-options">
      <label className="consent-opt is-locked"><input type="checkbox" checked disabled /><span><strong>{t.needed[0]}</strong>{t.needed[1]}</span></label>
      <label className="consent-opt"><input type="checkbox" checked={choice.analytics} onChange={e => setChoice(c => ({ ...c, analytics: e.target.checked }))} /><span><strong>{t.audience[0]}</strong>{t.audience[1]}</span></label>
      <label className="consent-opt"><input type="checkbox" checked={choice.ads} onChange={e => setChoice(c => ({ ...c, ads: e.target.checked }))} /><span><strong>{t.ads[0]}</strong>{t.ads[1]}</span></label>
    </div>}
    <div className="consent-actions">
      <button type="button" className="consent-btn" onClick={() => decide({ analytics: true, ads: true })}>{t.accept}</button>
      <button type="button" className="consent-btn" onClick={() => decide({ analytics: false, ads: false })}>{t.refuse}</button>
      {custom
        ? <button type="button" className="consent-btn is-ghost" onClick={() => decide(choice)}>{t.save}</button>
        : <button type="button" className="consent-btn is-ghost" onClick={() => setCustom(true)}>{t.custom}</button>}
    </div>
  </div>;
}
