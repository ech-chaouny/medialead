import { Button } from '@/components/ui';
import { highlights } from '@/lib/content';

/* Hero clair : badge, titre centré en deux tons, deux actions, bande de cinq capacités. */
export default function Hero() {
  return <section className="hero-clean" aria-labelledby="hero-title">
    <div className="hero-clean-glow" aria-hidden="true" />
    <div className="container hero-clean-inner">
      <span className="hero-badge">Product · Growth · Data</span>
      <h1 id="hero-title"><span>We build.</span> <span>We launch.</span> <em>We grow.</em></h1>
      <p className="hero-clean-sub">From product to measurable growth.</p>
      <p className="hero-clean-body">Nous construisons des produits digitaux et des systèmes de croissance qui relient la technologie, l’acquisition et la data à des résultats business réels.</p>
      <div className="hero-clean-actions">
        <Button href="#contact">Parlons de votre projet</Button>
        <a className="button secondary" href="#realisations">Voir nos réalisations</a>
      </div>
    </div>
    <div className="hero-strip">
      <ul className="container hero-strip-row">{highlights.map(h => <li key={h.title}><strong>{h.title}</strong><span>{h.text}</span></li>)}</ul>
    </div>
  </section>;
}
