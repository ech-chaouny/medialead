'use client';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { auditQuestions } from '@/lib/content';

/* Mini diagnostic (cahier des charges V5 §16.1) en quiz : une question à la fois, un anneau en quatre
   segments qui s'allume zone par zone, puis le résultat et l'appel à l'action. Rien n'est envoyé. */
const areas = ['Produit', 'Tracking', 'Économie d’acquisition', 'Capacité opérationnelle'];
const frictionWhen = [false, false, false, true]; // la réponse qui signale une friction
const R = 84;
const C = 2 * Math.PI * R;
const GAP = 10;
const SEG = C / 4 - GAP;

export default function AuditDiagnostic() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(auditQuestions.map(() => null));
  const [step, setStep] = useState(0);
  const done = step >= auditQuestions.length;
  const status = answers.map((a, i) => (a === null ? 'empty' : a === frictionWhen[i] ? 'friction' : 'ok'));
  const frictions = areas.filter((_, i) => status[i] === 'friction');
  const answered = answers.filter(a => a !== null).length;

  const answer = (v: boolean) => {
    setAnswers(prev => prev.map((a, i) => (i === step ? v : a)));
    setStep(s => s + 1);
  };
  const reset = () => { setAnswers(auditQuestions.map(() => null)); setStep(0); };

  return <div className="scan">
    <div className="scan-top">
      <div className="scan-ring">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          {areas.map((a, i) => <circle key={a} cx="100" cy="100" r={R}
            className={`scan-arc is-${status[i]}${!done && i === step ? ' is-current' : ''}`}
            strokeDasharray={`${SEG} ${C - SEG}`} strokeDashoffset={-(i * (C / 4) + GAP / 2)} />)}
        </svg>
        <div className="scan-center" aria-live="polite">
          {done
            ? <><strong>{frictions.length}</strong><span>{frictions.length > 1 ? 'zones à auditer' : frictions.length === 1 ? 'zone à auditer' : 'friction évidente'}</span></>
            : <><strong>{answered}<small>/4</small></strong><span>réponses</span></>}
        </div>
      </div>
      <ul className="scan-legend">{areas.map((a, i) => <li key={a} className={`is-${status[i]}`}><i />{a}</li>)}</ul>
    </div>

    {!done && <div className="scan-q" key={step}>
      <span className="scan-step">Question {step + 1} / {auditQuestions.length}</span>
      <p id="scan-question">{auditQuestions[step]}</p>
      <div className="scan-answers" role="group" aria-labelledby="scan-question">
        <button type="button" onClick={() => answer(true)}>Oui</button>
        <button type="button" onClick={() => answer(false)}>Non</button>
      </div>
      {step > 0 && <button type="button" className="scan-back" onClick={() => setStep(s => s - 1)}><ArrowLeft size={14} />Précédent</button>}
    </div>}

    {done && <div className="scan-q scan-result">
      <span className="scan-step">Votre diagnostic</span>
      <p>{frictions.length > 0 ? 'Voici où regarder en premier :' : 'Pas de friction évidente. L’audit servira à trouver votre prochain levier.'}</p>
      {frictions.length > 0 && <div className="scan-chips">{frictions.map(f => <span key={f}>{f}</span>)}</div>}
      <a className="button" href="#contact">Demander votre Growth Audit<ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true" /></a>
      <button type="button" className="scan-back" onClick={reset}><RotateCcw size={14} />Recommencer</button>
    </div>}
  </div>;
}
