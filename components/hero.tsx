import { Button } from '@/components/ui';

/* Hero clair : badge, titre centré en deux tons, deux actions. */
export default function Hero() {
  return <section className="hero-clean" aria-labelledby="hero-title">
    <div className="hero-clean-glow" aria-hidden="true" />
    <div className="container hero-clean-inner">
      <span className="hero-badge">Product · Growth · Data</span>
      <h1 id="hero-title"><span>We build.</span> <span>We launch.</span> <em>We grow.</em></h1>
      <p className="hero-clean-sub">From product to measurable growth.</p>
      <p className="hero-clean-body">Nous concevons, développons et faisons grandir des produits digitaux en combinant technologie, marketing et analyse de données pour générer des résultats business mesurables.</p>
      <div className="hero-clean-actions">
        <Button href="/contact">Parlons de votre projet</Button>
        <a className="button secondary" href="#realisations">Voir nos réalisations</a>
      </div>
    </div>
  </section>;
}
