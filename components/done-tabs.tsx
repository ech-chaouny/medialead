'use client';
import { useState } from 'react';
import { pillars, doneDev, doneContent, doneResults, doneTracked } from '@/lib/content';
import { MediaSlot } from '@/components/ui';
import CountUp from '@/components/count-up';

/* V5 §5.5 — ce que nous avons déjà fait, par domaine. */
const tabs = ['Développement', 'Création de contenu', 'Résultats'];
const builds = [['DROK', 'Application reconstruite'], ['WashRoc', 'Produit repris et adapté'], ['Privu', 'Marketplace vidéo']];
const creatives = [['DROK', 'Offres et relance de l’application'], ['WashRoc', 'Campagnes de lancement du service']];

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
      {tabs.map((label, i) => <button key={label} type="button" role="tab" id={`done-tab-${i}`} aria-selected={active === i} aria-controls="done-panel" tabIndex={active === i ? 0 : -1} className={active === i ? 'is-active' : undefined} onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}><span>0{i + 1}</span>{label}</button>)}
    </div>
    <div className="done-panel" role="tabpanel" id="done-panel" aria-labelledby={`done-tab-${active}`} key={active}>
      {active === 0 && <div className="done-grid">
        <div className="done-copy">
          <h3>{pillars[0].text}</h3>
          <ul className="done-chips">{doneDev.map(d => <li key={d}>{d}</li>)}</ul>
          <ul className="done-list">{builds.map(([name, what]) => <li key={name}><strong>{name}</strong><span>{what}</span></li>)}</ul>
        </div>
        <MediaSlot label="Écrans produit — DROK · WashRoc · Privu" className="slot-tall" />
      </div>}
      {active === 1 && <div className="done-grid">
        <div className="done-copy">
          <h3>Des créatives pensées pour la performance.</h3>
          <ul className="done-chips">{doneContent.map(d => <li key={d}>{d}</li>)}</ul>
          <ul className="done-list">{creatives.map(([name, what]) => <li key={name}><strong>{name}</strong><span>{what}</span></li>)}</ul>
        </div>
        <div className="done-slots"><MediaSlot label="Créative DROK" className="slot-portrait" /><MediaSlot label="Créative WashRoc" className="slot-portrait" /></div>
      </div>}
      {active === 2 && <div className="done-results">
        <h3>{pillars[2].text}</h3>
        <div className="result-cards">{doneResults.map(r => <article className="result-card" key={r.client}>
          <strong><CountUp value={r.value} /></strong><p>{r.label}</p><span>{r.client}</span>
        </article>)}</div>
        <div className="tracked"><span className="tracked-label">Suivi jusqu’à</span>{doneTracked.map(t => <span className="tracked-item" key={t.label}>{t.label}<em>{t.client}</em></span>)}</div>
      </div>}
    </div>
  </div>;
}
