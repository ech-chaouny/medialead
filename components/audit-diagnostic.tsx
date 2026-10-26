'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw, Check, Clock3, Phone, Rocket, TrendingUp, Wrench, Megaphone, Compass, type LucideIcon } from 'lucide-react';
import { readAttribution } from '@/lib/attribution';
import { questions, computeResult, isComplete, resultCopy, categoryLabels, axisLabels, type Answers, type Category } from '@/lib/growth-audit';

const categoryIcons: Record<Category, LucideIcon> = { product_launch: Rocket, app_growth: TrendingUp, product_takeover: Wrench, digital_transformation: Megaphone, audit_first: Compass };
const letters = ['A', 'B', 'C', 'D', 'E'];

/* Simulateur Growth Audit : intro → 4 questions → résultat → mini-formulaire → confirmation.
   À gauche, un rail suit les 4 étapes et rappelle chaque réponse ; à droite, les écrans glissent dans le sens de la navigation.
   Le résultat s'affiche avant toute demande de coordonnées. Aucune donnée personnelle dans l'analytics. */
type Phase = 'intro' | 'question' | 'result' | 'form' | 'sent';

declare global { interface Window { dataLayer?: Record<string, unknown>[] } }
const track = (event: string, params: Record<string, unknown> = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page: window.location.pathname, ...params });
};

export default function AuditDiagnostic() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [answers, setAnswers] = useState<Answers>({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const advance = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const result = isComplete(answers) ? computeResult(answers) : null;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { track('growth_audit_view'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(advance.current); };
  }, []);

  const q = questions[step];
  const choose = (id: string) => {
    if (!Object.keys(answers).length) track('growth_audit_start');
    track('growth_audit_step', { step: step + 1, answer_id: id });
    const next = { ...answers, [q.id]: id };
    setAnswers(next);
    clearTimeout(advance.current);
    advance.current = setTimeout(() => {
      setDir('fwd');
      if (step < questions.length - 1) { setStep(step + 1); return; }
      if (isComplete(next)) {
        const r = computeResult(next);
        track('growth_audit_complete', { primary_result: r.primary, secondary_result: r.secondary ?? '', confidence: r.confidence });
      }
      setPhase('result');
    }, 320);
  };
  const back = () => {
    clearTimeout(advance.current);
    setDir('back');
    if (phase === 'question' && step === 0) { setPhase('intro'); return; }
    track('growth_audit_back', { step: phase === 'question' ? step + 1 : 5 });
    if (phase === 'question') setStep(step - 1); else { setPhase('question'); setStep(questions.length - 1); }
  };
  const restart = () => { clearTimeout(advance.current); setDir('back'); setAnswers({}); setStep(0); setError(''); setPhase('intro'); };
  const goTo = (i: number) => { clearTimeout(advance.current); setDir(i < step || phase !== 'question' ? 'back' : 'fwd'); setStep(i); setPhase('question'); };

  // Raccourcis clavier pendant les questions : A–E ou 1–5.
  useEffect(() => {
    if (phase !== 'question') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || (e.target as HTMLElement).closest('input, textarea')) return;
      const k = e.key.toUpperCase();
      const i = letters.indexOf(k) >= 0 ? letters.indexOf(k) : Number(k) - 1;
      const o = questions[step].options[i];
      if (o && root.current?.contains(document.activeElement) !== false) choose(o.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!result) return;
    setSending(true); setError('');
    const f = new FormData(e.currentTarget);
    const body = {
      contact: Object.fromEntries(['name', 'company', 'email', 'phone', 'url', 'message', 'website_hp', 'consent'].map(k => [k, String(f.get(k) ?? '')])),
      answers,
      attribution: readAttribution(),
    };
    try {
      const res = await fetch('/api/growth-audit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(String(res.status));
      track('growth_audit_lead_submit', { primary_result: result.primary, lead_quality: result.confidence });
      setPhase('sent');
    } catch {
      setError('L’envoi n’a pas abouti. Réessayez, ou appelez-nous directement.');
    } finally { setSending(false); }
  };

  const copy = result && resultCopy[result.primary];

  const anim = `ga-screen is-${dir}`;
  const Icon = result ? categoryIcons[result.primary] : Compass;

  return <div className={`ga is-${phase}`} ref={root}>
    <aside className="ga-rail" aria-label="Progression du diagnostic">
      <span className="ga-rail-head">Growth Audit</span>
      <ol>
        {questions.map((x, i) => {
          const opt = x.options.find(o => o.id === answers[x.id]);
          const current = phase === 'question' && i === step;
          return <li key={x.id} className={current ? 'is-current' : opt ? 'is-done' : undefined}>
            <button type="button" disabled={!opt && !current} onClick={() => goTo(i)} aria-current={current ? 'step' : undefined}>
              <span className="ga-dot">{opt && !current ? <Check size={13} strokeWidth={3} aria-hidden="true" /> : i + 1}</span>
              <span className="ga-rail-txt"><strong>{x.step}</strong>{opt && <em>{opt.label}</em>}</span>
            </button>
          </li>;
        })}
        <li className={phase === 'result' || phase === 'form' || phase === 'sent' ? 'is-current is-goal' : undefined}>
          <button type="button" disabled={!result} onClick={() => { setDir('fwd'); setPhase('result'); }}>
            <span className="ga-dot"><Icon size={13} strokeWidth={2.4} aria-hidden="true" /></span>
            <span className="ga-rail-txt"><strong>Votre priorité</strong>{result && phase !== 'question' && <em>{categoryLabels[result.primary]}</em>}</span>
          </button>
        </li>
      </ol>
    </aside>
    <div className="ga-main">
    {phase === 'intro' && <div className={`${anim} ga-intro`}>
      <span className="ga-kicker"><Clock3 size={14} strokeWidth={2} aria-hidden="true" />Moins d’une minute</span>
      <p className="ga-title">4 questions.<br /><em>Une priorité claire.</em></p>
      <p className="ga-text">Répondez selon votre situation actuelle. Le résultat s’affiche tout de suite, sans coordonnées.</p>
      <p className="ga-hint">Astuce : utilisez les touches A à E pour répondre.</p>
      <button type="button" className="button ga-cta" onClick={() => { setDir('fwd'); setPhase('question'); setStep(0); }}>Commencer l’audit<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>
    </div>}

    {phase === 'question' && <div className={anim} key={`q${step}`}>
      <div className="ga-progress" aria-hidden="true">{questions.map((x, i) => <i key={x.id} className={i < step ? 'is-done' : i === step ? 'is-current' : undefined} />)}</div>
      <div className="ga-meta"><span>Question {step + 1} / {questions.length}</span><span>{q.step}</span></div>
      <p className="ga-title" id="ga-question">{q.title}</p>
      {q.help && <p className="ga-help">{q.help}</p>}
      <div className="ga-options" role="radiogroup" aria-labelledby="ga-question">
        {q.options.map((o, i) => { const on = answers[q.id] === o.id; return <button type="button" role="radio" aria-checked={on} key={o.id} className={`ga-option${on ? ' is-on' : ''}`} style={{ '--d': `${i * 50}ms` } as React.CSSProperties} onClick={() => choose(o.id)}>
          <kbd className="ga-key" aria-hidden="true">{on ? <Check size={14} strokeWidth={3} /> : letters[i]}</kbd><span>{o.label}</span><ArrowRight className="ga-go" size={16} strokeWidth={2} aria-hidden="true" />
        </button>; })}
      </div>
      <button type="button" className="ga-back" onClick={back}><ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />Retour</button>
    </div>}

    {phase === 'result' && result && copy && <div className={`${anim} ga-result`} aria-live="polite">
      <div className="ga-result-head"><span className="ga-badge" aria-hidden="true"><Icon size={24} strokeWidth={2} /></span><span className="ga-kicker">Votre diagnostic</span></div>
      <p className="ga-title">{copy.title}</p>
      <p className="ga-text">{copy.diagnostic}</p>
      <div className="ga-tags">
        {result.axes[0] && <span>Zone secondaire à renforcer : <strong>{axisLabels[result.axes[0]]}</strong></span>}
        {result.secondary && <span>À explorer aussi : <strong>{categoryLabels[result.secondary]}</strong></span>}
        {result.leads.length > 0 && <span>Pistes à explorer : <strong>{result.leads.map(c => categoryLabels[c]).join(' · ')}</strong></span>}
      </div>
      <ol className="ga-priorities">{copy.priorities.map((p, i) => <li key={p}><span>{i + 1}</span>{p}</li>)}</ol>
      <p className="ga-service">Service recommandé <strong>{copy.service}</strong></p>
      <div className="ga-actions">
        <button type="button" className="button ga-cta" onClick={() => { track('growth_audit_book_call', { primary_result: result.primary }); setPhase('form'); }}>{copy.cta}<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>
        <a className="ga-link" href="#realisations">{copy.secondaryCta}<ArrowRight size={15} strokeWidth={2} aria-hidden="true" /></a>
      </div>
      <div className="ga-foot"><button type="button" className="ga-back" onClick={back}><ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />Modifier mes réponses</button><button type="button" className="ga-back" onClick={restart}><RotateCcw size={14} strokeWidth={2} aria-hidden="true" />Recommencer</button></div>
    </div>}

    {phase === 'form' && result && <form className={`${anim} ga-form`} onSubmit={submit}>
      <span className="ga-kicker">{categoryLabels[result.primary]}</span>
      <p className="ga-title">Recevez votre diagnostic et préparons l’échange.</p>
      <div className="ga-fields">
        <label><span>Nom complet *</span><input name="name" required autoComplete="name" maxLength={120} /></label>
        <label><span>Société *</span><input name="company" required autoComplete="organization" maxLength={120} /></label>
        <label><span>Email professionnel *</span><input name="email" type="email" required autoComplete="email" maxLength={160} /></label>
        <label><span>Téléphone / WhatsApp *</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+212 6…" pattern="[+0-9 ().-]{8,20}" /></label>
        <label className="is-wide"><span>Site web / App URL</span><input name="url" type="url" inputMode="url" placeholder="https://" maxLength={300} /></label>
        <label className="is-wide"><span>Message complémentaire</span><textarea name="message" rows={2} maxLength={1000} /></label>
        <label className="ga-hp" aria-hidden="true">Site web<input name="website_hp" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="ga-consent"><input type="checkbox" name="consent" value="yes" required /><span>J’accepte que Medialead utilise ces informations pour me recontacter au sujet de ce diagnostic.</span></label>
      {error && <p className="ga-error" role="alert">{error} <a href="tel:+212661912916"><Phone size={13} strokeWidth={2} aria-hidden="true" />+212 6 61 91 29 16</a></p>}
      <button type="submit" className="button ga-cta" disabled={sending}>{sending ? 'Envoi…' : 'Envoyer mon diagnostic'}<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></button>
      <button type="button" className="ga-back" onClick={() => setPhase('result')}><ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />Revenir au résultat</button>
    </form>}

    {phase === 'sent' && <div className={`${anim} ga-sent`} aria-live="polite">
      <span className="ga-done" aria-hidden="true"><Check size={26} strokeWidth={2.6} /></span>
      <p className="ga-title">Merci, nous avons reçu votre diagnostic.</p>
      <p className="ga-text">L’équipe Medialead vous contacte pour préparer l’échange.</p>
      <button type="button" className="ga-back" onClick={restart}><RotateCcw size={14} strokeWidth={2} aria-hidden="true" />Refaire le diagnostic</button>
    </div>}
    </div>
  </div>;
}
