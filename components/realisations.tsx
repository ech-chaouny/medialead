'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react';
import { groups, itemsOf, contentLabels, type Realisation, type RealisationType } from '@/lib/realisations';

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

function Shot({ item, w, h }: { item: Realisation; w: number; h: number }) {
  return item.image
    ? <img src={item.image} alt={`${item.title} — ${item.client}`} width={w} height={h} loading="lazy" decoding="async" draggable={false} />
    : <div className="rz-empty" role="img" aria-label={`Emplacement réservé : ${item.title} — ${item.client}`}><span>Visuel à venir</span></div>;
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

const Meta = ({ item }: { item: Realisation }) => <div className="rz-meta"><strong>{item.title}</strong><span>{item.client} · {item.sector}</span></div>;

function Browser({ item }: { item: Realisation }) {
  return <div className="rz-browser">
    <div className="rz-bar" aria-hidden="true"><i /><i /><i /><span>{domain(item.url) || item.client.toLowerCase().replace(/\s+/g, '')}</span></div>
    <div className="rz-screen"><Shot item={item} w={1120} h={700} /></div>
  </div>;
}

function Card({ item, onPlay }: { item: Realisation; onPlay: (r: Realisation) => void }) {
  if (item.type === 'app') return <li className="rz-item is-app">
    <div className={`rz-app${isLight(item.bgColor) ? ' is-light' : ''}`} style={{ backgroundColor: item.bgColor }}>
      {item.mockup && item.image
        ? <img className="rz-mockup" src={item.image} alt={`${item.title} — ${item.client}`} width={620} height={1051} loading="lazy" decoding="async" draggable={false} />
        : <div className="rz-phone"><Shot item={item} w={600} h={1300} /></div>}
    </div>
    <Meta item={item} />
  </li>;

  if (item.type === 'system') return <li className="rz-item is-wide"><Browser item={item} /><Meta item={item} /></li>;

  if (item.type === 'website') return <li className="rz-item is-wide">
    {item.url
      ? <a className="rz-link" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — ${item.client} (nouvel onglet)`}><Browser item={item} /><span className="rz-open" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span></a>
      : <Browser item={item} />}
    <Meta item={item} />
  </li>;

  const playable = item.contentType === 'video' && !!item.video;
  const body = <>
    {item.preview ? <Preview item={item} /> : <Shot item={item} w={500} h={888} />}
    {item.contentType && <span className="rz-badge">{contentLabels[item.contentType]}</span>}
    {item.contentType === 'video' && <span className="rz-play" aria-hidden="true"><Play size={22} strokeWidth={2} fill="currentColor" /></span>}
    <div className="rz-over"><strong>{item.title}</strong><span>{item.client}</span></div>
  </>;
  return <li className={`rz-item is-content${item.contentType === 'post' ? ' is-post' : ''}`}>
    {playable
      ? <button type="button" className="rz-content" onClick={() => onPlay(item)} aria-label={`Lire la vidéo : ${item.title} — ${item.client}`}>{body}</button>
      : <div className="rz-content">{body}</div>}
  </li>;
}

function Row({ type, index, onPlay }: { type: RealisationType; index: number; onPlay: (r: Realisation) => void }) {
  const group = groups.find(g => g.type === type)!;
  const items = itemsOf(type);
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
        <span className="rz-label">{String(index + 1).padStart(2, '0')} · {group.label}</span>
        <h3 id={id}>{group.title}</h3>
      </div>
      <div className="rz-controls">
        <span className="rz-count">{plural(items.length, group.unit)}</span>
        <button type="button" className="rz-arrow" onClick={() => go(-1)} disabled={edge.start} aria-label={`${group.label} : précédent`} aria-controls={`${id}-track`}><ArrowLeft size={18} strokeWidth={2} /></button>
        <button type="button" className="rz-arrow" onClick={() => go(1)} disabled={edge.end} aria-label={`${group.label} : suivant`} aria-controls={`${id}-track`}><ArrowRight size={18} strokeWidth={2} /></button>
      </div>
    </div>
    <ul className={`rz-track is-${type}`} id={`${id}-track`} ref={track} onScroll={update} tabIndex={0} aria-labelledby={id}>
      {items.map(item => <Card key={`${item.client}-${item.title}`} item={item} onPlay={onPlay} />)}
    </ul>
  </div>;
}

export default function Realisations() {
  const [video, setVideo] = useState<Realisation | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (video && !d.open) d.showModal();
    if (!video && d.open) d.close();
  }, [video]);

  return <>
    {groups.map(g => g.type).filter(t => itemsOf(t).length > 0).map((t, i) => <Row key={t} type={t} index={i} onPlay={setVideo} />)}

    <dialog className="rz-modal" ref={dialog} onClose={() => setVideo(null)} onClick={e => { if (e.target === e.currentTarget) setVideo(null); }} aria-label={video ? `${video.title} — ${video.client}` : 'Vidéo'}>
      {video?.video && <video src={video.video} poster={video.image || undefined} controls autoPlay playsInline />}
      <button type="button" className="rz-close" onClick={() => setVideo(null)} aria-label="Fermer la vidéo"><X size={20} strokeWidth={2} /></button>
    </dialog>
  </>;
}
