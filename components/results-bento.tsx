'use client';
import { TrendingUp, RadioTower, GraduationCap, createLucideIcon, type LucideIcon } from 'lucide-react';
import { contentFor } from '@/lib/content';
import { useLang } from '@/components/lang-provider';
import { sectorLabels } from '@/lib/sectors';
import CountUp from '@/components/count-up';

/* Résultats par secteur, sans nom de client : grande tuile pour le premier, halo qui suit le curseur. */
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
const icons: Record<string, LucideIcon> = { omak: TrendingUp, telecom: RadioTower, washroc: CarWash, fnm: GraduationCap };
const spot = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function ResultsBento() {
  const lang = useLang();
  const { doneResults, doneTracked } = contentFor(lang);
  return <>
    <div className="result-bento">{doneResults.map(r => { const Icon = icons[r.id]; return <article className="rb-tile" key={r.id} onPointerMove={spot}>
      <Icon className="rb-ghost" size={150} strokeWidth={1.2} aria-hidden="true" />
      <div className="rb-top"><span className="rb-ico" aria-hidden="true"><Icon size={20} strokeWidth={1.9} /></span><span className="rb-client">{sectorLabels[r.id]}</span></div>
      <div className="rb-figure"><strong><CountUp value={r.value} /></strong><small>{r.unit}</small></div>
      <p>{r.label}</p>
    </article>; })}</div>
    <div className="tracked"><span className="tracked-label">{lang === 'en' ? 'Tracked through to' : 'Suivi jusqu’à'}</span>{doneTracked.map((t, i) => <span className="tracked-item" key={t.label}>{i > 0 && <i aria-hidden="true">→</i>}{t.label}<em>{sectorLabels[t.id]}</em></span>)}</div>
  </>;
}
