'use client';
import { useEffect, useRef, useState } from 'react';
import { Code2, ChartNoAxesCombined, Target, MousePointerClick, ShoppingBag, RefreshCw, TrendingUp, ArrowRight } from 'lucide-react';
import { stages, stageDetails } from '@/lib/content';

/* Growth System sur deux lignes de quatre : une ligne relie les étapes et fait un retour à la ligne
   entre la 4e et la 5e, comme un texte qu'on lit. Le tracé est calculé sur la position réelle des points. */
const icons = [Code2, ChartNoAxesCombined, Target, MousePointerClick, ShoppingBag, RefreshCw, TrendingUp];
const PER_ROW = 4;
const R = 22;

export default function GrowthSteps() {
  const list = useRef<HTMLOListElement>(null);
  const [path, setPath] = useState('');
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => {
      const box = ol.getBoundingClientRect();
      const dots = [...ol.querySelectorAll<HTMLElement>('.step-dot')].map(d => {
        const r = d.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      const items = ol.querySelectorAll<HTMLElement>(':scope > li');
      if (dots.length <= PER_ROW || dots[PER_ROW].y === dots[0].y) { setPath(''); return; }
      const a = dots[0], start2 = dots[PER_ROW], last = dots[dots.length - 1];
      const row1Bottom = items[PER_ROW - 1].getBoundingClientRect().bottom - box.top;
      const row2Top = items[PER_ROW].getBoundingClientRect().top - box.top;
      const mid = (row1Bottom + row2Top) / 2;
      const xR = box.width, xL = 0;
      setPath([
        `M ${a.x} ${a.y} H ${xR - R} Q ${xR} ${a.y} ${xR} ${a.y + R}`,
        `V ${mid - R} Q ${xR} ${mid} ${xR - R} ${mid}`,
        `H ${xL + R} Q ${xL} ${mid} ${xL} ${mid + R}`,
        `V ${start2.y - R} Q ${xL} ${start2.y} ${xL + R} ${start2.y} H ${last.x}`,
      ].join(' '));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(ol);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  return <ol className={`steps${drawn ? ' is-drawn' : ''}`} ref={list}>
    {path && <svg className="steps-line" aria-hidden="true">
      <defs><linearGradient id="steps-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgb(255 255 255 / 22%)" /><stop offset="1" stopColor="#ff8b00" /></linearGradient></defs>
      <path d={path} pathLength={1} stroke="url(#steps-grad)" />
    </svg>}
    {stages.map(([name, title], i) => {
      const Icon = icons[i];
      return <li key={name} className={i === stages.length - 1 ? 'is-last' : undefined}>
        <span className="step-dot" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
        <div className="step-body">
          <span className="step-name">{String(i + 1).padStart(2, '0')} · {name}</span>
          <h3>{title}</h3>
          <p>{stageDetails[i]}</p>
        </div>
      </li>;
    })}
    <li className="steps-next">
      <span className="step-name">Par où commencer ?</span>
      <p>Un Growth Audit pour savoir quelle étape débloquer en premier.</p>
      <a href="#audit">Faire le diagnostic<ArrowRight size={15} strokeWidth={2} aria-hidden="true" /></a>
    </li>
  </ol>;
}
