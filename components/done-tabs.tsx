'use client';
import { useState } from 'react';
import { pillars, doneDev, doneContent, doneResults, doneTracked } from '@/lib/content';
import { MediaSlot } from '@/components/ui';
import CountUp from '@/components/count-up';
import { UtensilsCrossed, Droplets, Store, GraduationCap, TrendingUp, RadioTower, createLucideIcon, type LucideIcon } from 'lucide-react';

/* V5 §5.5 — ce que nous avons déjà fait, par domaine. */
const tabs = ['Développement', 'Création de contenu', 'Résultats'];
const builds: [string, string, LucideIcon][] = [['Secteur de livraison de repas', 'Application reconstruite', UtensilsCrossed], ['Secteur lavage à domicile', 'Produit repris et adapté', Droplets], ['Secteur online marketplace', 'Marketplace vidéo', Store]];
const creatives: [string, string, LucideIcon][] = [['Secteur de livraison de repas', 'Offres et relance de l’application', UtensilsCrossed], ['Secteur lavage à domicile', 'Campagnes de lancement du service', Droplets], ['Secteur éducation', 'Campagnes d’inscription aux formations', GraduationCap]];

/* Une icône par résultat, dans l'ordre de doneResults : OMAK, Telecom, WashRoc (lavage), FNM. */
/* Lucide n'a pas d'icône de lavage auto : voiture de face (tracé car-front décalé vers le bas) sous trois gouttes. */
const CarWash = createLucideIcon('car-wash', [
  ['path', { d: 'm21 11-2 2-1.5-3.7A2 2 0 0 0 15.646 8H8.4a2 2 0 0 0-1.903 1.257L5 13 3 11', key: 'roof' }],
  ['rect', { width: '18', height: '7', x: '3', y: '13', rx: '2', key: 'body' }],
  ['path', { d: 'M7 16.5h.01', key: 'l1' }],
  ['path', { d: 'M17 16.5h.01', key: 'l2' }],
  ['path', { d: 'M5 20v2', key: 'w1' }],
  ['path', { d: 'M19 20v2', key: 'w2' }],
  ['path', { d: 'M8 2.2c-.7 1-1.1 1.6-1.1 2.1a1.1 1.1 0 0 0 2.2 0c0-.5-.4-1.1-1.1-2.1z', key: 'd1' }],
  ['path', { d: 'M12 1c-.7 1-1.1 1.6-1.1 2.1a1.1 1.1 0 0 0 2.2 0c0-.5-.4-1.1-1.1-2.1z', key: 'd2' }],
  ['path', { d: 'M16 2.2c-.7 1-1.1 1.6-1.1 2.1a1.1 1.1 0 0 0 2.2 0c0-.5-.4-1.1-1.1-2.1z', key: 'd3' }],
]);
const resultIcons = [TrendingUp, RadioTower, CarWash, GraduationCap];
/* Le halo de survol suit le curseur. */
const spot = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/* Liste de secteurs : pastille icône, numéro, secteur et ce qui a été fait. */
const SectorList = ({ items }: { items: [string, string, LucideIcon][] }) => <ul className="done-list">{items.map(([name, what, Icon], i) => <li key={name}>
  <span className="done-ico" aria-hidden="true"><Icon size={19} strokeWidth={1.9} /></span>
  <div><strong>{name}</strong><span>{what}</span></div>
  <em aria-hidden="true">0{i + 1}</em>
</li>)}</ul>;

export default function DoneTabs() {
  const [active, setActive] = useState(0);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setActive(n); document.getElementById(`done-tab-${n}`)?.focus();
  };
  return <div className="done">
    <div className="done-tabs" role="tablist" aria-label="Ce que nous avons déjà fait" style={{ '--i': active } as React.CSSProperties}>
      <span className="done-tabs-pill" aria-hidden="true" />
      {tabs.map((label, i) => <button key={label} type="button" role="tab" id={`done-tab-${i}`} aria-selected={active === i} aria-controls="done-panel" tabIndex={active === i ? 0 : -1} className={active === i ? 'is-active' : undefined} onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}><span>0{i + 1}</span>{label}</button>)}
    </div>
    <div className="done-panel" role="tabpanel" id="done-panel" aria-labelledby={`done-tab-${active}`} key={active}>
      {active === 0 && <div className="done-grid">
        <div className="done-copy">
          <h3>{pillars[0].text}</h3>
          <ul className="done-chips">{doneDev.map(d => <li key={d}>{d}</li>)}</ul>
          <SectorList items={builds} />
        </div>
        <div className="done-stage"><div className="done-screens">{[1, 2, 3, 4].map(n => <MediaSlot key={n} label={`Écran produit ${n}`} className="slot-shot" />)}</div></div>
      </div>}
      {active === 1 && <div className="done-grid">
        <div className="done-copy">
          <h3>Des créatives pensées pour la performance.</h3>
          <ul className="done-chips">{doneContent.map(d => <li key={d}>{d}</li>)}</ul>
          <SectorList items={creatives} />
        </div>
        <div className="done-stage"><div className="done-deck">{[1, 2, 3].map(n => <MediaSlot key={n} label={`Créative ${n}`} className="slot-portrait" />)}</div></div>
      </div>}
      {active === 2 && <div className="done-results">
        <h3>{pillars[2].text}</h3>
        <div className="result-bento">{doneResults.map((r, i) => { const Icon = resultIcons[i]; return <article className="rb-tile" key={r.client} onPointerMove={spot}>
          <Icon className="rb-ghost" size={150} strokeWidth={1.2} aria-hidden="true" />
          <div className="rb-top"><span className="rb-ico" aria-hidden="true"><Icon size={20} strokeWidth={1.9} /></span><span className="rb-client">{r.client}</span></div>
          <div className="rb-figure"><strong><CountUp value={r.value} /></strong><small>{r.unit}</small></div>
          <p>{r.label}</p>
        </article>; })}</div>
        <div className="tracked"><span className="tracked-label">Suivi jusqu’à</span>{doneTracked.map((t, i) => <span className="tracked-item" key={t.label}>{i > 0 && <i aria-hidden="true">→</i>}{t.label}<em>{t.client}</em></span>)}</div>
      </div>}
    </div>
  </div>;
}
