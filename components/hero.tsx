import { Button } from '@/components/ui';
import { localePath, type Lang } from '@/lib/i18n';

const copy = {
  fr: { sub: 'Du produit à une croissance mesurable.', body: 'Nous concevons, développons et faisons grandir des produits digitaux en combinant technologie, marketing et analyse de données pour générer des résultats business mesurables.', cta: 'Parlons de votre projet', work: 'Voir nos réalisations' },
  en: { sub: 'From product to measurable growth.', body: 'We design, build and grow digital products by combining technology, marketing and data analysis to deliver measurable business results.', cta: 'Let’s talk about your project', work: 'See our work' },
};

/* Hero clair : badge, titre centré en deux tons, deux actions. */
export default function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <section className="hero-clean" aria-labelledby="hero-title">
    <div className="hero-clean-glow" aria-hidden="true" />
    <div className="container hero-clean-inner">
      <span className="hero-badge">Product · Growth · Data</span>
      <h1 id="hero-title"><span>We build.</span> <span>We launch.</span> <em>We grow.</em></h1>
      <p className="hero-clean-sub">{t.sub}</p>
      <p className="hero-clean-body">{t.body}</p>
      <div className="hero-clean-actions">
        <Button href={localePath(lang, '/contact')}>{t.cta}</Button>
        <a className="button secondary" href="#realisations">{t.work}</a>
      </div>
    </div>
  </section>;
}
