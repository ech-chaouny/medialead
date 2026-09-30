import { ArrowUpRight, Globe, Smartphone, ScanLine, ArrowDown } from 'lucide-react';

export default function HeroShowcase() {
  return <div className="product-story">
    <div className="story-intro"><span>DU PRODUIT AU RÉSULTAT</span><p>Des expériences à utiliser.<br/><strong>Des actions à mesurer.</strong></p></div>
    <div className="story-grid">
      <article className="story-card story-web">
        <div className="story-card-heading"><Globe size={18}/><span>SITES WEB</span><span>01</span></div>
        <div className="story-web-frame"><div className="story-browser-bar"><i/><i/><i/><span>OMAK Rayonnage</span></div><div className="story-web-image"><img src="/images/hero/omak-desktop.png" width="2940" height="1912" alt="Page d’accueil du site OMAK Rayonnage" fetchPriority="high"/></div></div>
        <div className="story-copy"><h3>Présenter. Convaincre. Convertir.</h3><p>Un site qui transforme votre offre en une prochaine étape claire.</p><span>OMAK Rayonnage <ArrowUpRight size={14}/></span></div>
      </article>
      <article className="story-card story-app">
        <div className="story-card-heading"><Smartphone size={18}/><span>APPLICATIONS</span><span>02</span></div>
        <div className="story-app-stage"><div className="story-device"><img src="/images/hero/drok-app.png" width="1170" height="2532" alt="Écran d’accueil de DROK, application de livraison" fetchPriority="high"/></div></div>
        <div className="story-copy"><h3>Une idée. Un produit utilisable.</h3><p>Une expérience mobile pensée pour passer de l’envie à l’action.</p><span>DROK <ArrowUpRight size={14}/></span></div>
      </article>
      <article className="story-card story-results">
        <div className="story-card-heading"><ScanLine size={18}/><span>MESURE</span><span>03</span></div>
        <div className="story-flow"><div><span>ATTIRER</span><strong>Une visite qualifiée</strong></div><ArrowDown size={18}/><div><span>CONVERTIR</span><strong>Un devis ou une commande</strong></div><ArrowDown size={18}/><div><span>COMPRENDRE</span><strong>Ce qui génère des clients</strong></div></div>
        <div className="story-copy"><h3>Relier les actions au business.</h3><p>Identifier les canaux et les parcours qui contribuent à votre croissance.</p><span>Notre approche de mesure</span></div>
      </article>
    </div>
  </div>;
}
