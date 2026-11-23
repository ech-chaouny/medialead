'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react';
import { groups, itemsOf, titleOf, contentLabels, type Realisation, type RealisationType } from '@/lib/realisations';
import { useLang } from '@/components/lang-provider';

const ui = {
  fr: { soon: 'Visuel à venir', reserved: 'Emplacement réservé', newTab: 'nouvel onglet', play: 'Lire la vidéo', prev: 'précédent', next: 'suivant', video: 'Vidéo', close: 'Fermer la vidéo' },
  en: { soon: 'Visual coming soon', reserved: 'Placeholder', newTab: 'new tab', play: 'Play the video', prev: 'previous', next: 'next', video: 'Video', close: 'Close the video' },
};

/* Réalisations : une rangée défilante par type (Applications, Systèmes, Sites web, Contenus).
   Flèches, swipe, trackpad et clavier ; accrochage sur chaque carte. Les reels jouent un extrait muet de 4 s quand ils sont
   visibles ; le MP4 complet ne se charge qu'à l'ouverture de la modale. */
const plural = (n: number, [one, many]: [string, string]) => `${n} ${n > 1 ? many : one}`;
// Fond clair ou sombre : décide de la couleur des motifs posés sur la carte.
const isLight = (hex = '') => {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return false;
  const [r, g, b] = m.slice(1).map(x => parseInt(x, 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
};
const domain = (url?: string) => url?.replace(/^https?:\/\//, '').replace(/\/.*$/, '') ?? '';

function EmptyShot({ item }: { item: Realisation }) {
  const t = ui[useLang()];
  return <div className="rz-empty" role="img" aria-label={`${t.reserved} : ${item.title} — ${item.sector}`}><span>{t.soon}</span></div>;
}

function Shot({ item, w, h }: { item: Realisation; w: number; h: number }) {
  return item.image
    ? <img src={item.image} alt={`${item.title} — ${item.sector}`} width={w} height={h} loading="lazy" decoding="async" draggable={false} />
    : <EmptyShot item={item} />;
}

// Extrait muet en boucle : chargé et lu seulement quand la carte est à l'écran, jamais en mouvement réduit.
function Preview({ item }: { item: Realisation }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={item.preview} poster={item.image} muted loop playsInline preload="none" aria-hidden="true" />;
}

const Meta = ({ item }: { item: Realisation }) => <div className="rz-meta"><strong>{item.title}</strong><span>{item.sector}</span></div>;

function Browser({ item }: { item: Realisation }) {
  return <div className="rz-browser">
    <div className="rz-bar" aria-hidden="true"><i /><i /><i /><span>{domain(item.url) || 'back-office'}</span></div>
    <div className="rz-screen"><Shot item={item} w={1120} h={700} /></div>
  </div>;
}

function Card({ item, onPlay }: { item: Realisation; onPlay: (r: Realisation) => void }) {
  const t = ui[useLang()];
  if (item.type === 'app') return <li className="rz-item is-app">
    <div className={`rz-app${isLight(item.bgColor) ? ' is-light' : ''}`} style={{ backgroundColor: item.bgColor }}>
      {item.mockup && item.image
        ? <img className="rz-mockup" src={item.image} alt={`${item.title} — ${item.sector}`} width={620} height={1051} loading="lazy" decoding="async" draggable={false} />
        : <div className="rz-phone"><Shot item={item} w={600} h={1300} /></div>}
    </div>
    <Meta item={item} />
  </li>;

  if (item.type === 'system') return <li className="rz-item is-wide"><Browser item={item} /><Meta item={item} /></li>;

  if (item.type === 'website') return <li className="rz-item is-wide">
    {item.url
      ? <a className="rz-link" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — ${item.sector} (${t.newTab})`}><Browser item={item} /><span className="rz-open" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span></a>
      : <Browser item={item} />}
    <Meta item={item} />
  </li>;

  const playable = item.contentType === 'video' && !!item.video;
  const body = <>
    {item.preview ? <Preview item={item} /> : <Shot item={item} w={500} h={888} />}
    {item.contentType && <span className="rz-badge">{contentLabels[item.contentType]}</span>}
    {item.contentType === 'video' && <span className="rz-play" aria-hidden="true"><Play size={22} strokeWidth={2} fill="currentColor" /></span>}
    <div className="rz-over"><strong>{item.title}</strong><span>{item.sector}</span></div>
  </>;
  return <li className={`rz-item is-content${item.contentType === 'post' ? ' is-post' : ''}`}>
    {playable
      ? <button type="button" className="rz-content" onClick={() => onPlay(item)} aria-label={`${t.play} : ${item.title} — ${item.sector}`}>{body}</button>
      : <div className="rz-content">{body}</div>}
  </li>;
}

function Row({ type, index, onPlay, grid = false }: { type: RealisationType; index: number; onPlay: (r: Realisation) => void; grid?: boolean }) {
  const group = groups.find(g => g.type === type)!;
  const lang = useLang();
  const t = ui[lang];
  const items = itemsOf(type).map(r => ({ ...r, title: titleOf(r, lang) }));
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  // Un pas = une carte et son espacement.
  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>('.rz-item');
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    el.scrollBy({ left: dir * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const id = `rz-${type}`;
  return <div className="rz-group" data-reveal>
    <div className="container rz-head">
      <div>
        <span className="rz-label">{String(index + 1).padStart(2, '0')} · {group.label[lang]}</span>
        <h3 id={id}>{group.title[lang]}</h3>
      </div>
      <div className="rz-controls">
        <span className="rz-count">{plural(items.length, group.unit[lang])}</span>
        {!grid && <>
        <button type="button" className="rz-arrow" onClick={() => go(-1)} disabled={edge.start} aria-label={`${group.label[lang]} : ${t.prev}`} aria-controls={`${id}-track`}><ArrowLeft size={18} strokeWidth={2} /></button>
        <button type="button" className="rz-arrow" onClick={() => go(1)} disabled={edge.end} aria-label={`${group.label[lang]} : ${t.next}`} aria-controls={`${id}-track`}><ArrowRight size={18} strokeWidth={2} /></button>
        </>}
      </div>
    </div>
    {grid
      ? <Masonry items={[...items].sort((a, b) => (a.gridOrder ?? a.order) - (b.gridOrder ?? b.order))} onPlay={onPlay} labelledBy={id} />
      : <ul className={`rz-track is-${type}`} id={`${id}-track`} ref={track} onScroll={update} tabIndex={0} aria-labelledby={id}>
          {items.map(item => <Card key={`${item.sector}-${item.title}`} item={item} onPlay={onPlay} />)}
        </ul>}
  </div>;
}

/* Grille de la page Réalisations : mosaïque sans trous. Les éléments sont distribués colonne par colonne
   dans l'ordre (1, 2, 3, 4 sur la première ligne, puis 5, 6…), le nombre de colonnes suit la largeur. */
function Masonry({ items, onPlay, labelledBy }: { items: Realisation[]; onPlay: (r: Realisation) => void; labelledBy: string }) {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const queries = [matchMedia('(max-width: 900px)'), matchMedia('(max-width: 1100px)')];
    const pick = () => setCols(queries[0].matches ? 2 : queries[1].matches ? 3 : 4);
    pick();
    queries.forEach(q => q.addEventListener('change', pick));
    return () => queries.forEach(q => q.removeEventListener('change', pick));
  }, []);
  const columns = Array.from({ length: cols }, (_, c) => items.filter((_, i) => i % cols === c));
  return <div className="rz-track is-grid" role="group" aria-labelledby={labelledBy} style={{ '--cols': cols } as React.CSSProperties}>
    {columns.map((col, c) => <ul className="rz-col" key={c}>{col.map(item => <Card key={`${item.sector}-${item.title}`} item={item} onPlay={onPlay} />)}</ul>)}
  </div>;
}

export default function Realisations({ gridTypes = [] }: { gridTypes?: RealisationType[] }) {
  const t = ui[useLang()];
  const [video, setVideo] = useState<Realisation | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (video && !d.open) d.showModal();
    if (!video && d.open) d.close();
  }, [video]);

  return <>
    {groups.map(g => g.type).filter(t => itemsOf(t).length > 0).map((t, i) => <Row key={t} type={t} index={i} onPlay={setVideo} grid={gridTypes.includes(t)} />)}

    <dialog className="rz-modal" ref={dialog} onClose={() => setVideo(null)} onClick={e => { if (e.target === e.currentTarget) setVideo(null); }} aria-label={video ? `${video.title} — ${video.sector}` : t.video}>
      {video?.video && <video src={video.video} poster={video.image || undefined} controls autoPlay playsInline />}
      <button type="button" className="rz-close" onClick={() => setVideo(null)} aria-label={t.close}><X size={20} strokeWidth={2} /></button>
    </dialog>
  </>;
}
