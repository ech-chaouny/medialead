import fs from 'node:fs';
import path from 'node:path';

/* Fond du hero (V5 §5.2) : vidéo limitée à la zone hero, overlay sombre pour la lisibilité.
   Déposer public/videos/hero.mp4 suffit à l'activer ; en attendant, des colonnes de vraies
   réalisations défilent lentement derrière l'overlay. */
const reel = [
  ['drok-creative', 'washroc-creative', 'drok-app'],
  ['drok-app', 'drok-creative', 'washroc-creative'],
  ['washroc-creative', 'drok-app', 'drok-creative'],
  ['drok-creative', 'drok-app', 'washroc-creative'],
  ['washroc-creative', 'drok-creative', 'drok-app'],
];

export default function HeroMedia() {
  const hasVideo = fs.existsSync(path.join(process.cwd(), 'public', 'videos', 'hero.mp4'));
  return <div className="hero-media" aria-hidden="true">
    {hasVideo
      ? <video className="hero-video" autoPlay muted loop playsInline preload="metadata"><source src="/videos/hero.mp4" type="video/mp4" /></video>
      : <div className="hero-reel">{reel.map((col, i) => <div className={`reel-col reel-col-${i}`} key={i}>
          <div className="reel-track">{[...col, ...col].map((name, j) => <img key={j} src={`/images/hero/${name}.webp`} alt="" width="600" height="1300" loading={j < 3 ? 'eager' : 'lazy'} />)}</div>
        </div>)}</div>}
    <div className="hero-overlay" />
  </div>;
}
