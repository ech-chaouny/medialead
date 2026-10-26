'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Phone, Rocket, Wrench, TrendingUp, Target, Building2, Compass, type LucideIcon } from 'lucide-react';
import { needs, stages, budgets, timelines, DESCRIPTION_MAX } from '@/lib/qualification';
import { readAttribution } from '@/lib/attribution';

/* Formulaire de qualification en 4 étapes : besoin → situation → budget & timing → contact.
   Les réponses restent en mémoire d'une étape à l'autre ; rien n'est envoyé avant la dernière étape. */
const needIcons: Record<string, LucideIcon> = { launch: Rocket, takeover: Wrench, app_growth: TrendingUp, lead_gen: Target, digital: Building2, unknown: Compass };
const stepNames = ['Besoin principal', 'Situation actuelle', 'Budget & timing', 'Contact & contexte'];
const nextSteps = [
  ['Analyse', 'Nous examinons votre projet et vos réponses.'],
  ['Premier échange', 'Si le projet correspond à notre périmètre, nous vous contactons.'],
  ['Recommandation', 'Nous définissons l’approche la plus adaptée : Product, Growth, Digital Transformation ou Lead Generation.'],
];

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
const track = (event: string, params: Record<string, unknown> = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, form: 'project_qualification', ...params });
};

type Picks = { stage?: string; project_budget?: string; timeline?: string };
const MAX_NEEDS = 3;

export default function ProjectForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [picks, setPicks] = useState<Picks>({});
  const [needSel, setNeedSel] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', url: '', description: '', consent: false });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const started = useRef(false);
  const state = useRef({ step, sent });
  state.current = { step, sent };

  // Abandon : le visiteur quitte la page après avoir commencé, sans envoyer.
  useEffect(() => {
    const onHide = () => { if (started.current && !state.current.sent) { track('form_abandon', { step: state.current.step + 1 }); started.current = false; } };
    window.addEventListener('pagehide', onHide);
    return () => window.removeEventListener('pagehide', onHide);
  }, []);

  const start = () => { if (!started.current) { started.current = true; track('form_start'); } };
  const pick = (key: keyof Picks, id: string) => { start(); setPicks(p => ({ ...p, [key]: id })); };
  // Besoins : jusqu'à 3 choix ; « Je ne sais pas encore » exclut les autres.
  const toggleNeed = (id: string) => {
    start();
    setNeedSel(sel => {
      if (sel.includes(id)) return sel.filter(x => x !== id);
      if (id === 'unknown') return ['unknown'];
      const rest = sel.filter(x => x !== 'unknown');
      return rest.length >= MAX_NEEDS ? rest : [...rest, id];
    });
  };
  const canContinue = [needSel.length > 0, !!picks.stage, !!picks.project_budget && !!picks.timeline][step] ?? true;
  const next = () => { if (!canContinue) return; track(`form_step_${step + 1}_complete`); setDir('fwd'); setStep(step + 1); };
  const prev = () => { setDir('back'); setStep(step - 1); };
  const set = (k: keyof typeof contact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact(c => ({ ...c, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true); setError('');
    const hp = new FormData(e.currentTarget).get('website_hp');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...picks, need_type: needSel, ...contact, consent: contact.consent ? 'yes' : '', website_hp: hp ?? '', attribution: readAttribution() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('generate_lead', { need_type: needSel.join(','), stage: picks.stage, project_budget: picks.project_budget, timeline: picks.timeline });
      setSent(true);
    } catch {
      setError('L’envoi n’a pas abouti. Réessayez dans un instant, ou appelez-nous directement.');
    } finally { setSending(false); }
  };

  // Fonction de rendu (pas un composant) : les cartes ne sont pas remontées à chaque clic.
  const options = (list: { id: string; label: string }[], k: keyof Picks, icons?: Record<string, LucideIcon>) =>
    <div className={`pf-options${icons ? ' has-icons' : ''}`} role="radiogroup">
      {list.map((o, i) => { const on = picks[k] === o.id; const Icon = icons?.[o.id]; return <button type="button" role="radio" aria-checked={on} key={o.id} className={`pf-option${on ? ' is-on' : ''}`} style={{ '--d': `${i * 40}ms` } as React.CSSProperties} onClick={() => pick(k, o.id)}>
        {Icon ? <span className="pf-ico" aria-hidden="true"><Icon size={19} strokeWidth={1.9} /></span> : <span className="pf-radio" aria-hidden="true" />}
        <span className="pf-label">{o.label}</span>
        {on && <Check className="pf-check" size={16} strokeWidth={3} aria-hidden="true" />}
      </button>; })}
    </div>;

  if (sent) return <div className="pf pf-sent" aria-live="polite">
    <span className="pf-done" aria-hidden="true"><Check size={28} strokeWidth={2.6} /></span>
    <h2>Votre demande est bien reçue.</h2>
    <p className="pf-lead">Nous allons examiner votre contexte, vos priorités et votre budget avant de vous recontacter.</p>
    <ol className="pf-next">{nextSteps.map(([t, d], i) => <li key={t}><span>0{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>)}</ol>
  </div>;

  return <form className="pf" onSubmit={submit}>
    <div className="pf-top">
      <span className="pf-count">Étape {step + 1}/4</span>
      <span className="pf-name">{stepNames[step]}</span>
    </div>
    <div className="pf-bar" aria-hidden="true"><i style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>

    <div className={`pf-screen is-${dir}`} key={step}>
      {step === 0 && <fieldset>
        <legend className="pf-q">Quel est votre besoin principal ?</legend>
        <p className="pf-hint" aria-live="polite">{needSel.length >= MAX_NEEDS ? '3 choix maximum : retirez-en un pour en changer.' : `Jusqu’à 3 choix · ${needSel.length}/${MAX_NEEDS}`}</p>
        <div className="pf-options has-icons" role="group">
          {needs.map((o, i) => { const on = needSel.includes(o.id); const full = !on && needSel.length >= MAX_NEEDS && o.id !== 'unknown'; const Icon = needIcons[o.id]; return <button type="button" role="checkbox" aria-checked={on} aria-disabled={full || undefined} key={o.id} className={`pf-option${on ? ' is-on' : ''}${full ? ' is-full' : ''}`} style={{ '--d': `${i * 40}ms` } as React.CSSProperties} onClick={() => toggleNeed(o.id)}>
            <span className="pf-ico" aria-hidden="true"><Icon size={19} strokeWidth={1.9} /></span>
            <span className="pf-label">{o.label}</span>
            {on && <span className="pf-rank" aria-hidden="true">{needSel.indexOf(o.id) + 1}</span>}
          </button>; })}
        </div>
      </fieldset>}
      {step === 1 && <fieldset><legend className="pf-q">Où en êtes-vous aujourd’hui ?</legend>{options(stages, 'stage')}</fieldset>}
      {step === 2 && <>
        <fieldset><legend className="pf-q">Quel budget envisagez-vous pour ce projet ?</legend>{options(budgets, 'project_budget')}</fieldset>
        <fieldset className="pf-second"><legend className="pf-q is-small">Quand souhaitez-vous démarrer ?</legend>{options(timelines, 'timeline')}</fieldset>
      </>}
      {step === 3 && <div>
        <p className="pf-q">Parlez-nous brièvement de votre projet</p>
        <div className="pf-fields">
          <label><span>Nom & prénom *</span><input required autoComplete="name" maxLength={120} value={contact.name} onChange={set('name')} /></label>
          <label><span>Société / projet *</span><input required autoComplete="organization" maxLength={120} value={contact.company} onChange={set('company')} /></label>
          <label><span>Email *</span><input type="email" required autoComplete="email" maxLength={160} value={contact.email} onChange={set('email')} /></label>
          <label><span>Téléphone / WhatsApp *</span><input type="tel" required autoComplete="tel" placeholder="+212 6…" pattern="[+0-9 ().-]{8,20}" value={contact.phone} onChange={set('phone')} /></label>
          <label className="is-wide"><span>Site web / lien app</span><input type="url" inputMode="url" placeholder="https://" maxLength={300} value={contact.url} onChange={set('url')} /></label>
          <label className="is-wide"><span>Description courte du besoin *</span>
            <textarea required rows={3} maxLength={DESCRIPTION_MAX} value={contact.description} onChange={set('description')} placeholder="En quelques mots : votre produit, votre objectif, ce qui bloque." />
            <small className="pf-counter">{contact.description.length} / {DESCRIPTION_MAX}</small>
          </label>
          <label className="pf-hp" aria-hidden="true">Site<input name="website_hp" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label className="pf-consent"><input type="checkbox" required checked={contact.consent} onChange={set('consent')} /><span>J’accepte d’être contacté par Medialead au sujet de mon projet.</span></label>
        {error && <p className="pf-error" role="alert">{error} <a href="tel:+212661912916"><Phone size={13} strokeWidth={2} aria-hidden="true" />+212 6 61 91 29 16</a></p>}
      </div>}
    </div>

    <div className="pf-nav">
      {step > 0 ? <button type="button" className="pf-back" onClick={prev}><ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />Retour</button> : <span />}
      {step < 3
        ? <button type="button" className="button pf-next-btn" disabled={!canContinue} onClick={next}>Continuer<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>
        : <button type="submit" className="button pf-next-btn" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer mon projet'}<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>}
    </div>
  </form>;
}
