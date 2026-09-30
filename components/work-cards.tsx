'use client';
import { useState } from 'react';

export type WorkItem = { slug: string; name: string; group: string; sector: string; flow: string; metric?: string; label: string; logo: string };

/* Réalisations en cartes, filtrables par terrain de jeu. */
const filters = ['Tous', 'Product & App Growth', 'Transformation & Lead Gen'];

export default function WorkCards({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);
  const shown = active === 0 ? items : items.filter(i => i.group === filters[active]);
  return <div className="work-cards-wrap">
    <div className="work-filters" role="group" aria-label="Filtrer les réalisations">
      {filters.map((label, i) => <button type="button" key={label} aria-pressed={active === i} className={active === i ? 'is-active' : undefined} onClick={() => setActive(i)}>
        {label}<span>{i === 0 ? items.length : items.filter(x => x.group === label).length}</span>
      </button>)}
    </div>
    <div className="work-cards">{shown.map(it => <article className="wcard" key={it.slug}>
      <div className="wcard-visual">
        <span className="wcard-tag">{it.group}</span>
        <img src={`/images/logos/${it.logo}`} alt={`Logo ${it.name}`} loading="lazy" className={`wcard-logo wcard-logo-${it.slug}`} />
      </div>
      <div className="wcard-body">
        <h3>{it.name}</h3>
        <p className="wcard-sector">{it.sector}</p>
        <p className="wcard-flow">{it.flow}</p>
        <div className="wcard-foot">{it.metric
          ? <><strong>{it.metric}</strong><span>{it.label}</span></>
          : <span className="wcard-status">{it.label}</span>}</div>
      </div>
    </article>)}</div>
  </div>;
}
