/* En-tête des pages intérieures (Expertises, Réalisations) : badge, titre H1 en deux tons, une phrase. */
export default function PageHero({ badge, title, accent, lead }: { badge: string; title: string; accent: string; lead: string }) {
  return <section className="page-hero"><div className="container page-hero-inner">
    <span className="hero-badge">{badge}</span>
    <h1>{title} <em>{accent}</em></h1>
    <p>{lead}</p>
  </div></section>;
}
