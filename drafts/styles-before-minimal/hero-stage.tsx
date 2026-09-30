import { Globe, Smartphone, Megaphone } from 'lucide-react';

/* Scène produit du hero : trois vraies réalisations, un site, une app, une campagne. */
export default function HeroStage() {
  return <div className="hero-stage" aria-label="Exemples de réalisations Medialead : site web, application mobile et campagne">
    <div className="stage-browser">
      <div className="stage-browser-bar" aria-hidden="true"><i /><i /><i /><span>OMAK Rayonnage</span></div>
      <img src="/images/hero/omak-site.webp" width="1600" height="783" alt="Page d’accueil du site OMAK Rayonnage" fetchPriority="high" />
    </div>
    <figure className="stage-phone">
      <img src="/images/hero/drok-app.webp" width="600" height="1298" alt="Écran d’accueil de l’application DROK" />
    </figure>
    <figure className="stage-creative">
      <img src="/images/hero/washroc-creative.webp" width="640" height="1384" alt="Créative de campagne WashRoc" />
    </figure>
    <span className="stage-tag stage-tag-web"><Globe size={15} />Sites web</span>
    <span className="stage-tag stage-tag-app"><Smartphone size={15} />Applications</span>
    <span className="stage-tag stage-tag-ads"><Megaphone size={15} />Campagnes</span>
  </div>;
}
