'use client';
import { useState } from 'react';
import { contentFor } from '@/lib/content';
import { useLang } from '@/components/lang-provider';
import { MediaSlot } from '@/components/ui';
import { sectorLabels } from '@/lib/sectors';
import BannerScroller from '@/components/banner-scroller';
import ResultsBento from '@/components/results-bento';
import { UtensilsCrossed, Droplets, Store, GraduationCap, type LucideIcon } from 'lucide-react';

/* V5 §5.5 — ce que nous avons déjà fait, par domaine. */
const copy = {
  fr: { tabs: ['Développement', 'Création de contenu', 'Résultats'], aria: 'Ce que nous avons déjà fait', builds: ['Application reconstruite', 'Produit repris et adapté', 'Marketplace vidéo'], creatives: ['Offres et relance de l’application', 'Campagnes de lancement du service', 'Campagnes d’inscription aux formations'], creativeTitle: 'Des créatives pensées pour la performance.', creative: 'Créative', soon: 'Visuel à venir' },
  en: { tabs: ['Development', 'Content creation', 'Results'], aria: 'What we have already done', builds: ['App rebuilt', 'Product taken over and adapted', 'Video marketplace'], creatives: ['App offers and re-engagement', 'Service launch campaigns', 'Course enrolment campaigns'], creativeTitle: 'Creatives built for performance.', creative: 'Creative', soon: 'Visual coming soon' },
};
const buildSectors: [string, LucideIcon][] = [[sectorLabels.drok, UtensilsCrossed], [sectorLabels.washroc, Droplets], [sectorLabels.privu, Store]];
const creativeSectors: [string, LucideIcon][] = [[sectorLabels.drok, UtensilsCrossed], [sectorLabels.washroc, Droplets], [sectorLabels.fnm, GraduationCap]];

/* Liste de secteurs : pastille icône, numéro, secteur et ce qui a été fait. */
const SectorList = ({ items }: { items: [string, string, LucideIcon][] }) => <ul className="done-list">{items.map(([name, what, Icon], i) => <li key={name}>
  <span className="done-ico" aria-hidden="true"><Icon size={19} strokeWidth={1.9} /></span>
  <div><strong>{name}</strong><span>{what}</span></div>
  <em aria-hidden="true">0{i + 1}</em>
</li>)}</ul>;

export default function DoneTabs() {
  const lang = useLang();
  const t = copy[lang];
  const { pillars, doneDev, doneContent } = contentFor(lang);
  const tabs = t.tabs;
  const builds = buildSectors.map(([s, Icon], i) => [s, t.builds[i], Icon] as [string, string, LucideIcon]);
  const creatives = creativeSectors.map(([s, Icon], i) => [s, t.creatives[i], Icon] as [string, string, LucideIcon]);
  const [active, setActive] = useState(0);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    setActive(n); document.getElementById(`done-tab-${n}`)?.focus();
  };
  return <div className="done">
    <div className="done-tabs" role="tablist" aria-label={t.aria} style={{ '--i': active } as React.CSSProperties}>
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
        <div className="done-stage is-scroller"><BannerScroller /></div>
      </div>}
      {active === 1 && <div className="done-grid">
        <div className="done-copy">
          <h3>{t.creativeTitle}</h3>
          <ul className="done-chips">{doneContent.map(d => <li key={d}>{d}</li>)}</ul>
          <SectorList items={creatives} />
        </div>
        <div className="done-stage"><div className="done-deck">{[1, 2, 3].map(n => <MediaSlot key={n} label={`${t.creative} ${n}`} sub={t.soon} className="slot-portrait" />)}</div></div>
      </div>}
      {active === 2 && <div className="done-results">
        <h3>{pillars[2].text}</h3>
        <ResultsBento />
      </div>}
    </div>
  </div>;
}
