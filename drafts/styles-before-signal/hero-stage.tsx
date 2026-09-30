/* Scène produit du hero : trois vraies réalisations, un site, une app, une campagne. */
export default function HeroStage() {
  return <figure className="hero-stage">
    <div className="stage-canvas">
      <div className="stage-browser">
        <div className="stage-browser-bar" aria-hidden="true"><i /><i /><i /><span>OMAK Rayonnage</span></div>
        <img src="/images/hero/omak-site.webp" width="1600" height="783" alt="Page d’accueil du site OMAK Rayonnage" fetchPriority="high" />
      </div>
      <div className="stage-phone"><img src="/images/hero/drok-app.webp" width="600" height="1298" alt="Écran d’accueil de l’application DROK" /></div>
      <div className="stage-creative"><img src="/images/hero/washroc-creative.webp" width="640" height="1384" alt="Créative de campagne WashRoc" /></div>
    </div>
    <figcaption className="stage-caption">
      <span><strong>Applications</strong> DROK</span>
      <span><strong>Sites web</strong> OMAK Rayonnage</span>
      <span><strong>Campagnes</strong> WashRoc</span>
    </figcaption>
  </figure>;
}
