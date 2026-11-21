'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Phone, Rocket, Wrench, TrendingUp, Target, Building2, Compass, type LucideIcon } from 'lucide-react';
import { needs as needsFr, stages as stagesFr, budgets as budgetsFr, timelines as timelinesFr, localize, DESCRIPTION_MAX } from '@/lib/qualification';
import { useLang } from '@/components/lang-provider';
import { readAttribution } from '@/lib/attribution';
import { track as send } from '@/lib/analytics';
import { site } from '@/lib/site';
import { FormLegal, SentMessage } from '@/components/form-legal';

/* Formulaire de qualification en 4 étapes : besoin → situation → budget & timing → contact.
   Les réponses restent en mémoire d'une étape à l'autre ; rien n'est envoyé avant la dernière étape. */
const needIcons: Record<string, LucideIcon> = { launch: Rocket, takeover: Wrench, app_growth: TrendingUp, lead_gen: Target, digital: Building2, unknown: Compass };
const ui = {
  fr: { steps: ['Besoin principal', 'Situation actuelle', 'Budget & timing', 'Contact & contexte'], next: [['Analyse', 'Nous examinons votre projet et vos réponses.'], ['Premier échange', 'Si le projet correspond à notre périmètre, nous vous contactons.'], ['Recommandation', 'Nous définissons l’approche la plus adaptée : Product, Growth, Digital Transformation ou Lead Generation.']], error: 'L’envoi n’a pas abouti. Réessayez dans un instant, ou appelez-nous directement.', thanks: 'Merci, votre demande est bien reçue.', step: 'Étape', qNeed: 'Quel est votre besoin principal ?', max: '3 choix maximum : retirez-en un pour en changer.', upTo: 'Jusqu’à 3 choix', qStage: 'Où en êtes-vous aujourd’hui ?', qBudget: 'Quel budget envisagez-vous pour ce projet ?', qStart: 'Quand souhaitez-vous démarrer ?', qContact: 'Parlez-nous brièvement de votre projet', name: 'Nom & prénom *', company: 'Société / projet *', email: 'Email *', phone: 'Téléphone / WhatsApp *', url: 'Site web / lien app', desc: 'Description courte du besoin *', descPh: 'En quelques mots : votre produit, votre objectif, ce qui bloque.', back: 'Retour', cont: 'Continuer', sending: 'Envoi…', send: 'Envoyer ma demande' },
  en: { steps: ['Main need', 'Current situation', 'Budget & timing', 'Contact & context'], next: [['Review', 'We look at your project and your answers.'], ['First call', 'If the project fits our scope, we get in touch.'], ['Recommendation', 'We define the best approach: Product, Growth, Digital Transformation or Lead Generation.']], error: 'Sending failed. Please try again in a moment, or call us directly.', thanks: 'Thank you, your request has been received.', step: 'Step', qNeed: 'What is your main need?', max: '3 choices maximum: remove one to change.', upTo: 'Up to 3 choices', qStage: 'Where are you today?', qBudget: 'What budget do you have in mind for this project?', qStart: 'When would you like to start?', qContact: 'Tell us briefly about your project', name: 'Full name *', company: 'Company / project *', email: 'Email *', phone: 'Phone / WhatsApp *', url: 'Website / app link', desc: 'Short description of your need *', descPh: 'In a few words: your product, your goal, what’s blocking.', back: 'Back', cont: 'Continue', sending: 'Sending…', send: 'Send my request' },
};

const track = (event: string, params: Record<string, unknown> = {}) => send(event, { form: 'project_qualification', ...params });

type Picks = { stage?: string; project_budget?: string; timeline?: string };
const MAX_NEEDS = 3;

export default function ProjectForm() {
  const lang = useLang();
  const t = ui[lang];
  const [needs, stages, budgets, timelines] = [needsFr, stagesFr, budgetsFr, timelinesFr].map(l => localize(l, lang));
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [picks, setPicks] = useState<Picks>({});
  const [needSel, setNeedSel] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', url: '', description: '' });
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
    setContact(c => ({ ...c, [k]: e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true); setError('');
    const hp = new FormData(e.currentTarget).get('website_hp');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...picks, need_type: needSel, ...contact, website_hp: hp ?? '', attribution: readAttribution() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('form_submit', { need_type: needSel.join(','), stage: picks.stage, project_budget: picks.project_budget, timeline: picks.timeline });
      setSent(true);
    } catch {
      setError(t.error);
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
    <h2>{t.thanks}</h2>
    <p className="pf-lead"><SentMessage /></p>
    <ol className="pf-next">{t.next.map(([title, d], i) => <li key={title}><span>0{i + 1}</span><div><strong>{title}</strong><p>{d}</p></div></li>)}</ol>
  </div>;

  return <form className="pf" onSubmit={submit}>
    <div className="pf-top">
      <span className="pf-count">{t.step} {step + 1}/4</span>
      <span className="pf-name">{t.steps[step]}</span>
    </div>
    <div className="pf-bar" aria-hidden="true"><i style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>

    <div className={`pf-screen is-${dir}`} key={step}>
      {step === 0 && <fieldset>
        <legend className="pf-q">{t.qNeed}</legend>
        <p className="pf-hint" aria-live="polite">{needSel.length >= MAX_NEEDS ? t.max : `${t.upTo} · ${needSel.length}/${MAX_NEEDS}`}</p>
        <div className="pf-options has-icons" role="group">
          {needs.map((o, i) => { const on = needSel.includes(o.id); const full = !on && needSel.length >= MAX_NEEDS && o.id !== 'unknown'; const Icon = needIcons[o.id]; return <button type="button" role="checkbox" aria-checked={on} aria-disabled={full || undefined} key={o.id} className={`pf-option${on ? ' is-on' : ''}${full ? ' is-full' : ''}`} style={{ '--d': `${i * 40}ms` } as React.CSSProperties} onClick={() => toggleNeed(o.id)}>
            <span className="pf-ico" aria-hidden="true"><Icon size={19} strokeWidth={1.9} /></span>
            <span className="pf-label">{o.label}</span>
            {on && <span className="pf-rank" aria-hidden="true">{needSel.indexOf(o.id) + 1}</span>}
          </button>; })}
        </div>
      </fieldset>}
      {step === 1 && <fieldset><legend className="pf-q">{t.qStage}</legend>{options(stages, 'stage')}</fieldset>}
      {step === 2 && <>
        <fieldset><legend className="pf-q">{t.qBudget}</legend>{options(budgets, 'project_budget')}</fieldset>
        <fieldset className="pf-second"><legend className="pf-q is-small">{t.qStart}</legend>{options(timelines, 'timeline')}</fieldset>
      </>}
      {step === 3 && <div>
        <p className="pf-q">{t.qContact}</p>
        <div className="pf-fields">
          <label><span>{t.name}</span><input required autoComplete="name" maxLength={120} value={contact.name} onChange={set('name')} /></label>
          <label><span>{t.company}</span><input required autoComplete="organization" maxLength={120} value={contact.company} onChange={set('company')} /></label>
          <label><span>{t.email}</span><input type="email" required autoComplete="email" maxLength={160} value={contact.email} onChange={set('email')} /></label>
          <label><span>{t.phone}</span><input type="tel" required autoComplete="tel" placeholder="+212 6…" pattern="[+0-9 ().-]{8,20}" value={contact.phone} onChange={set('phone')} /></label>
          <label className="is-wide"><span>{t.url}</span><input type="url" inputMode="url" placeholder="https://" maxLength={300} value={contact.url} onChange={set('url')} /></label>
          <label className="is-wide"><span>{t.desc}</span>
            <textarea required rows={3} maxLength={DESCRIPTION_MAX} value={contact.description} onChange={set('description')} placeholder={t.descPh} />
            <small className="pf-counter">{contact.description.length} / {DESCRIPTION_MAX}</small>
          </label>
          <label className="pf-hp" aria-hidden="true">Site<input name="website_hp" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {error && <p className="pf-error" role="alert">{error} <a href={site.phoneHref}><Phone size={13} strokeWidth={2} aria-hidden="true" />{site.phone}</a></p>}
      </div>}
    </div>

    <div className="pf-nav">
      {step > 0 ? <button type="button" className="pf-back" onClick={prev}><ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />{t.back}</button> : <span />}
      {step < 3
        ? <button type="button" className="button pf-next-btn" disabled={!canContinue} onClick={next}>{t.cont}<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>
        : <button type="submit" className="button pf-next-btn" disabled={sending}>{sending ? t.sending : t.send}<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>}
    </div>
    {step === 3 && <FormLegal />}
  </form>;
}
