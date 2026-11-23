import { ArrowRight, Megaphone, Layers3, Target, Users, Store, Download, UserPlus, UserCheck, ShoppingCart, CircleCheck, RefreshCw, Search, Wrench, ChartNoAxesCombined, TrendingUp, Smartphone, Rocket, Building2 } from 'lucide-react';
import { Button, SectionHead } from '@/components/ui';
import { contentFor } from '@/lib/content';
import CountUp from '@/components/count-up';
import { sectorLabels } from '@/lib/sectors';
import { localePath, type Lang } from '@/lib/i18n';

/* Sections détaillées des expertises, déplacées telles quelles de l'accueil vers la page /expertises :
   Digital Transformation & Lead Generation, Measurement & Data, Product Takeover, Pour qui, Pourquoi Medialead.
   App Growth (AppGrowthSection) est affichée à la fois sur l'accueil et en tête de la page /expertises. */

const reasonIcons = [Layers3, Target, ChartNoAxesCombined, Users];
const takeoverIcons = [Search, Wrench, ChartNoAxesCombined, TrendingUp];
const audienceIcons = [Smartphone, Rocket, Building2];
/* Une icône par étape du parcours app, dans l'ordre de appFunnel. */
const funnelIcons = [Megaphone, Store, Download, UserPlus, UserCheck, ShoppingCart, CircleCheck, RefreshCw];

const copy = {
  fr: {
    app: { title: <>L’installation n’est pas <em>la ligne d’arrivée.</em></>, lead: 'Attirez les bons utilisateurs et accompagnez-les jusqu’à leur première commande, puis leur prochain achat.', cta: 'Auditer la croissance de mon app', alt: 'Deux applications mobiles, lavage auto à domicile et livraison, avec les événements suivis de l’installation au réachat : app_install, sign_up, add_to_cart, first_order, repeat_order.' },
    transfo: { title: <>Se digitaliser, ce n’est pas <em>refaire un site.</em></>, lead: 'Présentez votre offre, attirez des prospects qualifiés et suivez leur parcours jusqu’à la vente, l’inscription ou l’installation.', results: 'Résultats', cta: 'Auditer mon acquisition', journey: 'Parcours d’un prospect', live: 'Suivi', aria: 'Parcours d’un prospect, de l’offre au chiffre d’affaires' },
    measure: { title: 'Un lead pas cher', accent: 'n’est pas toujours rentable.', lead: 'Quatre niveaux de lecture. Une seule question finale : quelle valeur a été créée ?', cta: 'Faire le point sur ma mesure' },
    takeover: { title: 'Un produit devenu difficile', accent: 'à faire évoluer ?', lead: 'Nous auditons, reprenons, stabilisons et faisons évoluer un produit construit par une autre équipe.', steps: ['Audit technique et produit', 'Reprise et stabilisation', 'Mesure et priorités', 'Évolution continue'], cta: 'Faire auditer votre produit' },
    forWho: { eyebrow: 'POUR QUI', title: 'Un accompagnement', accent: 'adapté à votre projet.' },
    why: { eyebrow: 'POURQUOI MEDIALEAD', title: 'Ce qui change,', accent: 'concrètement.' },
  },
  en: {
    app: { title: <>Installation is not <em>the finish line.</em></>, lead: 'Attract the right users and guide them to their first order, then their next purchase.', cta: 'Audit my app growth', alt: 'Two mobile apps, at-home car wash and delivery, with the events tracked from install to repeat purchase: app_install, sign_up, add_to_cart, first_order, repeat_order.' },
    transfo: { title: <>Going digital is not <em>just a new website.</em></>, lead: 'Present your offer, attract qualified prospects and follow their journey through to the sale, the enrolment or the installation.', results: 'Results', cta: 'Audit my acquisition', journey: 'A prospect’s journey', live: 'Tracked', aria: 'A prospect’s journey, from offer to revenue' },
    measure: { title: 'A cheap lead', accent: 'isn’t always profitable.', lead: 'Four levels of reading. One final question: what value was created?', cta: 'Review my measurement' },
    takeover: { title: 'A product that has become', accent: 'hard to evolve?', lead: 'We audit, take over, stabilise and evolve products built by another team.', steps: ['Technical and product audit', 'Takeover and stabilisation', 'Measurement and priorities', 'Continuous improvement'], cta: 'Get my product audited' },
    forWho: { eyebrow: 'WHO IT’S FOR', title: 'Support', accent: 'tailored to your project.' },
    why: { eyebrow: 'WHY MEDIALEAD', title: 'What actually', accent: 'changes.' },
  },
};

export default function ExpertiseSections({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const c = contentFor(lang);
  const audit = localePath(lang, '/#audit');
  /* Résultats affichés dans la section Transformation : mêmes chiffres validés que l'onglet Résultats. */
  const proofs = c.doneResults.filter(r => r.id !== 'washroc');

  return <>
    {/* Digital Transformation & Lead Generation */}
    <section className="section paper" id="transformation"><div className="container split is-reversed">
      <div className="split-copy" data-reveal>
        <div className="eyebrow">DIGITAL TRANSFORMATION & LEAD GENERATION</div>
        <h2>{t.transfo.title}</h2>
        <p className="split-lead">{t.transfo.lead}</p>
        <span className="proof-title">{t.transfo.results}</span>
        <div className="proof-band">{proofs.map(p => <div className="proof-stat" key={p.id}>
          <span className="proof-client">{sectorLabels[p.id]}</span>
          <strong><CountUp value={p.value} /><small>{p.unit}</small></strong>
          <p>{p.label}</p>
        </div>)}</div>
        <div className="split-foot"><Button href={audit}>{t.transfo.cta}</Button></div>
      </div>
      <div className="pipeline" data-reveal aria-label={t.transfo.aria}>
        <div className="pipeline-head"><span>{t.transfo.journey}</span><span className="pipeline-live"><i />{t.transfo.live}</span></div>
        <ol>{c.businessFunnel.map((s, i) => <li key={s} className={i === c.businessFunnel.length - 1 ? 'is-goal' : undefined}><span className="pipeline-num">{String(i + 1).padStart(2, '0')}</span>{s}{i === 4 && <em>WhatsApp</em>}</li>)}</ol>
      </div>
    </div></section>

    {/* Measurement & Data */}
    <section className="section alt" id="mesure"><div className="container">
      <SectionHead center eyebrow="MEASUREMENT & DATA" title={t.measure.title} accent={t.measure.accent} lead={t.measure.lead} href={audit} cta={t.measure.cta} />
      <div className="stairs" data-reveal>{c.kpiLevels.map((k, i) => <article className={i === c.kpiLevels.length - 1 ? 'stair is-business' : 'stair'} key={k.level} style={{ '--h': `${58 + i * 14}%` } as React.CSSProperties}>
        <span className="stair-n">0{i + 1}</span>
        <span className="stair-level">{k.level}</span>
        <ul>{k.kpis.map(v => <li key={v}>{v}</li>)}</ul>
        <p>{k.question}</p>
      </article>)}</div>
    </div></section>

    {/* Product Takeover */}
    <section className="section paper" id="takeover"><div className="container">
      <SectionHead center eyebrow="PRODUCT TAKEOVER" title={t.takeover.title} accent={t.takeover.accent} lead={t.takeover.lead} />
      <ol className="timeline" data-reveal>{t.takeover.steps.map((title, i) => { const Icon = takeoverIcons[i]; return <li key={title}>
        <span className="timeline-dot"><Icon size={22} strokeWidth={1.8} /></span>
        <span className="timeline-n">0{i + 1}</span>
        <strong>{title}</strong>
      </li>; })}</ol>
      <div className="center-cta"><Button href={localePath(lang, '/contact')}>{t.takeover.cta}</Button></div>
    </div></section>

    {/* Pour qui */}
    <section className="section" id="pour-qui"><div className="container">
      <SectionHead center eyebrow={t.forWho.eyebrow} title={t.forWho.title} accent={t.forWho.accent} />
      <div className="audiences">{c.audiences.map((a, i) => { const Icon = audienceIcons[i]; return <article className="audience" key={a.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
        <div className="audience-top"><Icon size={22} strokeWidth={1.6} /><span>0{i + 1}</span></div>
        <h3>{a.title}</h3>
        <p className="audience-situation">{a.situation}</p>
        <p>{a.need}</p>
        <span className="audience-answer">{a.answer}<ArrowRight size={15} strokeWidth={2} /></span>
      </article>; })}</div>
    </div></section>

    {/* Pourquoi Medialead */}
    <section className="section alt" id="pourquoi"><div className="container">
      <SectionHead center eyebrow={t.why.eyebrow} title={t.why.title} accent={t.why.accent} />
      <div className="reasons">{c.reasons.map((r, i) => { const Icon = reasonIcons[i]; return <article className="reason" key={r.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
        <div className="reason-top"><span className="reason-icon"><Icon size={22} strokeWidth={1.8} /></span><span className="reason-num">0{i + 1}</span></div>
        <h3>{r.title}</h3><p>{r.text}</p>
      </article>; })}</div>
    </div></section>
  </>;
}

/* App Growth : section de l'accueil. */
export function AppGrowthSection({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const c = contentFor(lang);
  const audit = localePath(lang, '/#audit');
  return <>
    {/* App Growth */}
    <section className="section" id="app-growth"><div className="container split">
      <div className="split-copy" data-reveal>
        <div className="eyebrow">APP GROWTH</div>
        <h2>{t.app.title}</h2>
        <p className="split-lead">{t.app.lead}</p>
        <ol className="path">{c.appFunnel.map((s, i) => { const Icon = funnelIcons[i]; return <li key={s} className={i === c.appFunnel.length - 1 ? 'is-goal' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><Icon size={18} strokeWidth={1.8} aria-hidden="true" />{s}</li>; })}</ol>
        <div className="split-foot"><Button href={audit}>{t.app.cta}</Button></div>
      </div>
      <figure className="apps-visual" data-reveal>
        <img src="/images/app-growth/apps-tracking-v2.webp" width={1440} height={1137} loading="lazy" decoding="async" alt={t.app.alt} />
      </figure>
    </div></section>
  </>;
}
