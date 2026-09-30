'use client';
import { useState } from 'react';
import { Code2, Clapperboard, TrendingUp, Check } from 'lucide-react';
import { pillars, doneDev, doneContent, doneResults, doneTracked } from '@/lib/content';

/* V5 §5.5 — ce que nous avons déjà fait, par domaine. */
const tabs = [
  { label: 'Développement', Icon: Code2 },
  { label: 'Création de contenu', Icon: Clapperboard },
  { label: 'Résultats', Icon: TrendingUp },
];
const builds = [['DROK', 'Application reconstruite'], ['WashRoc', 'Produit repris et adapté'], ['Privu', 'Marketplace vidéo']];

export default function DoneTabs() {
  const [active, setActive] = useState(0);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setActive(n); document.getElementById(`done-tab-${n}`)?.focus();
  };
  return <div className="done">
    <div className="done-tabs" role="tablist" aria-label="Ce que nous avons déjà fait">
      {tabs.map(({ label, Icon }, i) => <button key={label} type="button" role="tab" id={`done-tab-${i}`} aria-selected={active === i} aria-controls="done-panel" tabIndex={active === i ? 0 : -1} className={active === i ? 'is-active' : undefined} onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}><Icon size={18} strokeWidth={1.8} />{label}</button>)}
    </div>
    <div className="done-panel" role="tabpanel" id="done-panel" aria-labelledby={`done-tab-${active}`} key={active}>
      {active === 0 && <div className="done-grid">
        <div className="done-copy">
          <h3>{pillars[0].text}</h3>
          <div className="chip-row">{doneDev.map(d => <span className="chip" key={d}><Check size={14} strokeWidth={2.5} />{d}</span>)}</div>
          <ul className="done-list">{builds.map(([name, what]) => <li key={name}><strong>{name}</strong><span>{what}</span></li>)}</ul>
        </div>
        <div className="done-visual done-visual-dev"><div className="visual-phone"><img src="/images/hero/drok-app.webp" width="600" height="1298" alt="Écran d’accueil de l’application DROK" /></div></div>
      </div>}
      {active === 1 && <div className="done-grid">
        <div className="done-copy">
          <h3>Des créatives pensées pour la performance.</h3>
          <div className="chip-row">{doneContent.map(d => <span className="chip" key={d}><Check size={14} strokeWidth={2.5} />{d}</span>)}</div>
          <ul className="done-list"><li><strong>DROK</strong><span>Offres et relance de l’application</span></li><li><strong>WashRoc</strong><span>Campagnes de lancement du service</span></li></ul>
        </div>
        <div className="done-visual done-visual-content">
          <img src="/images/hero/drok-creative.webp" width="600" height="1066" alt="Créative DROK" />
          <img src="/images/hero/washroc-creative.webp" width="640" height="1384" alt="Créative WashRoc" />
        </div>
      </div>}
      {active === 2 && <div className="done-results">
        <h3>{pillars[2].text}</h3>
        <div className="result-cards">{doneResults.map(r => <article className="result-card" key={r.client}><strong>{r.value}</strong><p>{r.label}</p><span>{r.client}</span></article>)}</div>
        <div className="tracked"><span className="tracked-label">Suivi jusqu’à</span>{doneTracked.map(t => <span className="chip" key={t.label}><Check size={14} strokeWidth={2.5} />{t.label}<em>{t.client}</em></span>)}</div>
      </div>}
    </div>
  </div>;
}
