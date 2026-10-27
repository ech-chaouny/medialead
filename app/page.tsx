import { ArrowRight, RadioTower, Code2, Megaphone, Layers3, Target, Users, Store, Download, UserPlus, UserCheck, ShoppingCart, CircleCheck, RefreshCw, Search, Wrench, ChartNoAxesCombined, TrendingUp, Smartphone, Rocket, Building2 } from 'lucide-react';
import { Button, SectionHead, CTA } from '@/components/ui';
import { projects, doneResults, appFunnel, businessFunnel, kpiLevels, audiences, reasons, projectHighlights, pillars } from '@/lib/content';
import Hero from '@/components/hero';
import ConnectedGrowth from '@/components/connected-growth';
import DoneTabs from '@/components/done-tabs';
import GrowthSteps from '@/components/growth-steps';
import AuditDiagnostic from '@/components/audit-diagnostic';
import CountUp from '@/components/count-up';
import { type WorkItem } from '@/components/work-cards';
import PortfolioGallery from '@/components/portfolio-gallery';

/* Homepage « Signal » — ordre du cahier des charges V5 §6. Les emplacements d'images restent réservés. */

/* Logos clients : fichiers détourés dans /images/logos, tailles équilibrées en CSS. */
const clients = [
  { name: 'DROK', src: 'drok.png', key: 'drok', tag: 'Livraison' },
  { name: 'WashRoc', src: 'washroc.png', key: 'washroc', tag: 'Lavage auto' },
  { name: 'Privu', src: 'privu.png', key: 'privu', tag: 'Marketplace vidéo' },
  { name: 'OMAK Service', src: 'omak.png', key: 'omak', tag: 'Services auto' },
  { name: 'FNM', src: 'fnm.png', key: 'fnm', tag: 'Formation' },
  { name: 'Maroc Telecom', src: 'telecom.png', key: 'telecom', tag: 'Télécom' },
];
const sectors: Record<string, string> = {
  drok: 'Livraison à la demande · Mohammedia',
  washroc: 'Lavage automobile à domicile · Casablanca',
  privu: 'Marketplace vidéo',
  fnm: 'Formation en naturopathie',
  omak: 'Services automobiles',
  telecom: 'Réseau commercial multi-agences',
};
const workGroups = [
  { label: 'Product & App Growth', slugs: ['drok', 'washroc', 'privu'] },
  { label: 'Digital Transformation & Lead Generation', slugs: ['fnm', 'omak', 'telecom'] },
];
const workOrder = workGroups.flatMap(g => g.slugs);
const workItems: WorkItem[] = workGroups.flatMap(g => g.slugs.map(slug => ({
  slug, name: projects.find(p => p.slug === slug)!.name,
  group: g.label.startsWith('Product') ? 'Product & App Growth' : 'Transformation & Lead Gen',
  sector: sectors[slug], flow: projectHighlights[slug].transformation,
  metric: projectHighlights[slug].metric, label: projectHighlights[slug].metricLabel, logo: `${slug}.png`,
})));
/* Résultats affichés dans la section Transformation : mêmes chiffres validés que l'onglet Résultats. */
const proofs = doneResults.filter(r => !r.client.startsWith('WashRoc'));
const reasonIcons = [Layers3, Target, ChartNoAxesCombined, Users];
const pillarIcons = { dev: Code2, marketing: Megaphone, results: TrendingUp } as const;
const takeover = [
  { Icon: Search, title: 'Audit technique et produit' },
  { Icon: Wrench, title: 'Reprise et stabilisation' },
  { Icon: ChartNoAxesCombined, title: 'Mesure et priorités' },
  { Icon: TrendingUp, title: 'Évolution continue' },
];
const audienceIcons = [Smartphone, Rocket, Building2];
const team = [['Zakaria', 'Strategy & Growth', 'zakaria'], ['Ismail', 'Tech & Product', 'ismail'], ['Hanane', 'Growth & Project Management', 'hanane'], ['Hafsa', 'Video & Content Creator', 'hafsa'], ['Jihane', 'Content Creator', 'jihane']];
/* Une icône par étape du parcours app, dans l'ordre de appFunnel. */
const funnelIcons = [Megaphone, Store, Download, UserPlus, UserCheck, ShoppingCart, CircleCheck, RefreshCw];

export default function Home() {
  return <>
    {/* 01 — Hero */}
    <Hero />

    {/* 03 — Le problème */}
    <section className="section" id="probleme"><div className="container">
      <SectionHead center eyebrow="LE VRAI SUJET" title="Le problème est rarement" accent="le marketing seul." lead="Le produit, l’acquisition et la data doivent servir le même objectif." />
      <div data-reveal><ConnectedGrowth /></div>
    </div></section>

    {/* 04 — Les 3 piliers */}
    <section className="section paper" id="expertises"><div className="container">
      <SectionHead center eyebrow="NOS 3 PILIERS" title="Plus qu’une agence." accent="Un partenaire jusqu’au résultat." lead="Développement, digital marketing et pilotage des résultats : une seule équipe, du produit au chiffre d’affaires." />
      <div className="pillars">{pillars.map((p, i) => { const Icon = pillarIcons[p.key as keyof typeof pillarIcons]; return <article className="pillar" key={p.key} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
        <div className="pillar-top"><span className="pillar-icon"><Icon size={28} strokeWidth={1.9} /></span><span className="pillar-num">0{i + 1}</span></div>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
      </article>; })}</div>
    </div></section>

    {/* 05 — Ce que nous avons déjà fait */}
    <section className="section" id="deja-fait"><div className="container">
      <SectionHead center eyebrow="DU CONCRET" title="Ce que nous avons" accent="déjà fait." lead="Des produits, des créatives et des résultats — par domaine." href="#realisations" cta="Voir les réalisations" />
      <div data-reveal><DoneTabs /></div>
    </div></section>

    {/* 06 — Growth System */}
    <section className="section alt" id="methode"><div className="container">
      <SectionHead center eyebrow="LE MEDIALEAD GROWTH SYSTEM" title="Une méthode" accent="pour avancer." lead="Une équipe. Sept étapes. Un même objectif." />
      <div data-reveal><GrowthSteps /></div>
    </div></section>

    {/* 07 — App Growth */}
    <section className="section" id="app-growth"><div className="container split">
      <div className="split-copy" data-reveal>
        <div className="eyebrow">APP GROWTH</div>
        <h2>L’installation n’est pas <em>la ligne d’arrivée.</em></h2>
        <p className="split-lead">Attirez les bons utilisateurs et accompagnez-les jusqu’à leur première commande, puis leur prochain achat.</p>
        <ol className="path">{appFunnel.map((s, i) => { const Icon = funnelIcons[i]; return <li key={s} className={i === appFunnel.length - 1 ? 'is-goal' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><Icon size={18} strokeWidth={1.8} aria-hidden="true" />{s}</li>; })}</ol>
        <div className="split-foot"><Button href="#audit">Auditer la croissance de mon app</Button></div>
      </div>
      <figure className="apps-visual" data-reveal>
        <img src="/images/app-growth/apps-tracking-v2.webp" width={1968} height={1554} alt="Applications WashRoc et DROK, avec les événements suivis de l’installation au réachat : app_install, sign_up, add_to_cart, first_order, repeat_order." />
      </figure>
    </div></section>

    {/* 08 — Digital Transformation & Lead Generation */}
    <section className="section paper" id="transformation"><div className="container split is-reversed">
      <div className="split-copy" data-reveal>
        <div className="eyebrow">DIGITAL TRANSFORMATION & LEAD GENERATION</div>
        <h2>Se digitaliser, ce n’est pas <em>refaire un site.</em></h2>
        <p className="split-lead">Présentez votre offre, attirez des prospects qualifiés et suivez leur parcours jusqu’à la vente, l’inscription ou l’installation.</p>
        <span className="proof-title">Résultats</span>
        <div className="proof-band">{proofs.map(p => <div className="proof-stat" key={p.client}>
          <span className="proof-client">{p.client}</span>
          <strong><CountUp value={p.value} /><small>{p.unit}</small></strong>
          <p>{p.label}</p>
        </div>)}</div>
        <div className="split-foot"><Button href="#audit">Auditer mon acquisition</Button></div>
      </div>
      <div className="pipeline" data-reveal aria-label="Parcours d’un prospect, de l’offre au chiffre d’affaires">
        <div className="pipeline-head"><span>Parcours d’un prospect</span><span className="pipeline-live"><i />Suivi</span></div>
        <ol>{businessFunnel.map((s, i) => <li key={s} className={i === businessFunnel.length - 1 ? 'is-goal' : undefined}><span className="pipeline-num">{String(i + 1).padStart(2, '0')}</span>{s}{i === 4 && <em>WhatsApp</em>}</li>)}</ol>
      </div>
    </div></section>

    {/* 09 — Selected Work */}
    <section className="section" id="realisations">
      <div className="container"><SectionHead center eyebrow="SELECTED WORK" title="Des transformations," accent="pas des livraisons." lead="Contenus, vidéos, applications et sites : un aperçu du travail livré, secteur par secteur." /></div>
      <div className="pg-wrap" data-reveal><PortfolioGallery /></div>
    </section>

    {/* 10 — Measurement & Data */}
    <section className="section alt" id="mesure"><div className="container">
      <SectionHead center eyebrow="MEASUREMENT & DATA" title="Un lead pas cher" accent="n’est pas toujours rentable." lead="Quatre niveaux de lecture. Une seule question finale : quelle valeur a été créée ?" href="#audit" cta="Faire le point sur ma mesure" />
      <div className="stairs" data-reveal>{kpiLevels.map((k, i) => <article className={i === kpiLevels.length - 1 ? 'stair is-business' : 'stair'} key={k.level} style={{ '--h': `${58 + i * 14}%` } as React.CSSProperties}>
        <span className="stair-n">0{i + 1}</span>
        <span className="stair-level">{k.level}</span>
        <ul>{k.kpis.map(v => <li key={v}>{v}</li>)}</ul>
        <p>{k.question}</p>
      </article>)}</div>
    </div></section>

    {/* 11 — Product Takeover */}
    <section className="section paper" id="takeover"><div className="container">
      <SectionHead center eyebrow="PRODUCT TAKEOVER" title="Un produit devenu difficile" accent="à faire évoluer ?" lead="Nous auditons, reprenons, stabilisons et faisons évoluer un produit construit par une autre équipe." />
      <ol className="timeline" data-reveal>{takeover.map(({ Icon, title }, i) => <li key={title}>
        <span className="timeline-dot"><Icon size={22} strokeWidth={1.8} /></span>
        <span className="timeline-n">0{i + 1}</span>
        <strong>{title}</strong>
      </li>)}</ol>
      <div className="center-cta"><Button href="#contact">Faire auditer votre produit</Button></div>
    </div></section>

    {/* 12 — Pour qui */}
    <section className="section" id="pour-qui"><div className="container">
      <SectionHead center eyebrow="POUR QUI" title="Un accompagnement" accent="adapté à votre projet." />
      <div className="audiences">{audiences.map((a, i) => { const Icon = audienceIcons[i]; return <article className="audience" key={a.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
        <div className="audience-top"><Icon size={22} strokeWidth={1.6} /><span>0{i + 1}</span></div>
        <h3>{a.title}</h3>
        <p className="audience-situation">{a.situation}</p>
        <p>{a.need}</p>
        <span className="audience-answer">{a.answer}<ArrowRight size={15} strokeWidth={2} /></span>
      </article>; })}</div>
    </div></section>

    {/* 13 — Pourquoi Medialead */}
    <section className="section alt" id="pourquoi"><div className="container">
      <SectionHead center eyebrow="POURQUOI MEDIALEAD" title="Ce qui change," accent="concrètement." />
      <div className="reasons">{reasons.map((r, i) => { const Icon = reasonIcons[i]; return <article className="reason" key={r.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
        <div className="reason-top"><span className="reason-icon"><Icon size={22} strokeWidth={1.8} /></span><span className="reason-num">0{i + 1}</span></div>
        <h3>{r.title}</h3><p>{r.text}</p>
      </article>; })}</div>
    </div></section>

    {/* 14 — Core Team */}
    <section className="section" id="agence"><div className="container">
      <SectionHead center eyebrow="CORE TEAM" title="Rencontrez" accent="notre core team." lead="La stratégie, la technologie, le contenu et la création, ensemble." />
      <div className="team-grid" data-reveal>{team.map(([name, role, photo]) => <article className="team-card" key={name} tabIndex={0}>
        <img src={`/images/team/${photo}.webp`} width={1086} height={1448} alt={`${name}, ${role}`} loading="lazy" />
        <div className="team-info"><h3>{name}</h3><span>{role}</span></div>
      </article>)}</div>
    </div></section>

    {/* 14 bis — Clients, sous la core team */}
    <section className="logos" id="clients" aria-labelledby="logos-title">
      <div className="container logos-head"><span className="logos-badge">Nos clients</span><p id="logos-title" className="logos-label">Ils nous ont confié leur produit, leur acquisition et leur croissance.</p></div>
      <div className="logo-loop" data-reveal>
        <div className="logo-loop-track">
          {[false, true].map(hidden => <ul key={String(hidden)} className="logo-wall" aria-hidden={hidden || undefined}>{clients.map(c => <li key={c.key} className={`logo-${c.key}`}>
            <img src={`/images/logos/${c.src}`} alt={hidden ? '' : c.name} loading="lazy" />
            <span>{c.tag}</span>
          </li>)}</ul>)}
        </div>
      </div>
    </section>

    {/* 15 — Growth Audit */}
    <section className="section audit" id="audit">
      <div className="audit-aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container audit-inner">
      <div className="audit-copy" data-reveal>
        <div className="eyebrow">GROWTH AUDIT</div>
        <h2>Où votre croissance <span style={{ whiteSpace: 'nowrap' }}>bloque-t-elle</span> vraiment&nbsp;?</h2>
        <p>4 questions pour identifier votre priorité : lancement produit, croissance, transformation digitale ou acquisition.</p>
        <ul className="audit-themes">{['Product Launch', 'App Growth', 'Product Takeover', 'Digital Transformation', 'Audit First'].map(t => <li key={t}>{t}</li>)}</ul>
        <p className="audit-note">Une orientation pour préparer l’échange, pas un audit complet : notre équipe affine ensuite avec vous.</p>
      </div>
      <div data-reveal><AuditDiagnostic /></div>
    </div></section>

    {/* 16 — CTA final */}
    <CTA />
  </>;
}
