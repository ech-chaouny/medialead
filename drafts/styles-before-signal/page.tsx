import { ArrowRight, Code2, Smartphone, Building2, Rocket, ChartNoAxesCombined, BadgeCheck, Check, ShoppingBag, RefreshCw, Download, MessageCircle, Search, Wrench, TrendingUp, Gauge, Users, Target, Layers3, Megaphone, RadioTower } from 'lucide-react';
import { Button, Eyebrow, SectionHead, CTA } from '@/components/ui';
import { appFunnel, businessFunnel, kpiLevels, audiences, reasons, auditQuestions, projectHighlights, pillars } from '@/lib/content';
import ConnectedGrowth from '@/components/connected-growth';
import DoneTabs from '@/components/done-tabs';
import GrowthSystem from '@/components/growth-system';
import WorkRail from '@/components/work-rail';

/* Homepage — ordre du cahier des charges V5 §6 (17 sections). */

const pillarIcons = { dev: Code2, marketing: Megaphone, results: TrendingUp } as const;
const audienceIcons = [Smartphone, Rocket, Building2];
const reasonIcons = [Layers3, Target, ChartNoAxesCombined, Users];
const takeover = [
  { Icon: Search, title: 'Audit technique et produit' },
  { Icon: Wrench, title: 'Reprise et stabilisation' },
  { Icon: ChartNoAxesCombined, title: 'Mesure et priorités' },
  { Icon: TrendingUp, title: 'Évolution continue' },
];
const team = [['Zakaria', 'Strategy & Growth'], ['Ismail', 'Tech & Product'], ['Hanane', 'Growth & Project Management']];
/* V5 §5.3 — preuve rapide, compacte. Le réseau télécom reste sans marque opérateur (V5 §14). */
const proofLogos = [
  { name: 'DROK', image: 'drok-word-orange.png', style: 'drok' },
  { name: 'WashRoc', image: 'washroc.png', style: 'washroc' },
  { name: 'Privu', image: 'pending-brand.webp', style: 'privu' },
  { name: 'OMAK Service', image: 'omak.jpeg', style: 'omak' },
  { name: 'FNM', image: 'fnm.png', style: 'fnm' },
];
const proofs = [
  { slug: 'omak', name: 'OMAK Service', logo: 'omak.jpeg' },
  { slug: 'telecom', name: 'Réseau Commercial Telecom', logo: '' },
  { slug: 'fnm', name: 'FNM', logo: 'fnm.png' },
].map(p => ({ ...p, ...projectHighlights[p.slug] }));

export default function Home() {
  return <>
    {/* 01 — Hero vidéo partiel */}
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-simple-decoration" aria-hidden="true"><i/><i/><i/></div>
      <div className="container hero-content">
        <Eyebrow>PRODUCT · GROWTH · DATA</Eyebrow>
        <h1 id="hero-title">We build. We launch.<br /><em>We grow.</em></h1>
        <p className="hero-sub">From product to measurable growth.</p>
        <p className="hero-body">Nous construisons des produits digitaux et des systèmes de croissance qui relient la technologie, l’acquisition et la data à des résultats business réels.</p>
        <div className="hero-actions"><Button href="#contact">Parlons de votre projet</Button><a className="button secondary" href="#realisations">Voir nos réalisations<ArrowRight size={16} strokeWidth={2} /></a></div>
      </div>
    </section>

    {/* 02 — Proof bar */}
    <section className="proofbar" aria-label="Clients et projets">
      <div className="container proofbar-inner">
        <p>Des produits et des entreprises que nous avons aidés à construire et à grandir.</p>
        <div className="proofbar-logos">
          {proofLogos.map(l => <span className={`proof-logo proof-logo-${l.style}`} key={l.name}><img src={`/images/clients/${l.image}`} alt={l.name} loading="lazy" /></span>)}
          <span className="proof-logo proof-logo-text"><RadioTower size={18} strokeWidth={1.8} aria-hidden="true" />Réseau Telecom</span>
        </div>
      </div>
    </section>

    {/* 03 — Le problème */}
    <section className="section container" id="probleme">
      <SectionHead eyebrow="LE VRAI SUJET" title="Le problème est rarement" accent="le marketing seul." lead="Le produit, l’acquisition et la data doivent servir le même objectif." />
      <ConnectedGrowth />
    </section>

    {/* 04 — Les 3 piliers */}
    <section className="section container" id="expertises">
      <SectionHead eyebrow="NOS 3 PILIERS" title="Plus qu’une agence." accent="Un partenaire jusqu’au résultat." lead="Développement, digital marketing et pilotage des résultats : une seule équipe, du produit au chiffre d’affaires." />
      <div className="pillars">{pillars.map((p, i) => { const Icon = pillarIcons[p.key as keyof typeof pillarIcons]; return <article className={`pillar pillar-${p.key}`} key={p.key}>
        <div className="pillar-top"><span className="icon-tile lg"><Icon size={24} strokeWidth={1.8} /></span><span className="pillar-num">0{i + 1}</span></div>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
        <div className="pillar-proofs"><span>Preuves</span><div>{p.proofs.map(x => <span className="tag" key={x}>{x}</span>)}</div></div>
      </article>; })}</div>
    </section>

    {/* 05 — Ce que nous avons déjà fait */}
    <section className="band" id="deja-fait"><div className="container">
      <SectionHead eyebrow="DU CONCRET" title="Ce que nous avons" accent="déjà fait." lead="Des produits, des créatives et des résultats — par domaine." href="#realisations" cta="Voir les réalisations" />
      <DoneTabs />
    </div></section>

    {/* 06 — Growth System */}
    <section className="section container" id="methode">
      <SectionHead center eyebrow="LE MEDIALEAD GROWTH SYSTEM" title="Une méthode" accent="pour avancer." lead="Une équipe. Sept étapes. Un même objectif." />
      <GrowthSystem />
    </section>

    {/* 07 — App Growth */}
    <section className="band band-soft" id="app-growth"><div className="container split">
      <div className="split-copy">
        <Eyebrow>APP GROWTH</Eyebrow>
        <h2>L’installation n’est pas<br /><em>la ligne d’arrivée.</em></h2>
        <p className="split-lead">Attirez les bons utilisateurs et accompagnez-les jusqu’à leur première commande, puis leur prochain achat.</p>
        <ol className="step-list">{appFunnel.map((s, i) => <li key={s} className={i === appFunnel.length - 1 ? 'is-goal' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
        <div className="split-foot"><Button href="#audit">Auditer la croissance de mon app</Button><a className="ghost-link" href="#realisations">Voir le cas DROK<ArrowRight size={16} strokeWidth={2} /></a></div>
      </div>
      <div className="visual visual-app" aria-label="Application DROK et étapes suivies : installation, première commande, réachat">
        <div className="visual-phone"><img src="/images/hero/drok-app.webp" width="600" height="1298" alt="Écran d’accueil de l’application DROK" /></div>
        <div className="float-card fc-1"><span className="icon-tile sm"><Download size={16} /></span><div><strong>Installation</strong><small>Étape 03</small></div></div>
        <div className="float-card fc-2"><span className="icon-tile sm is-solid"><ShoppingBag size={16} /></span><div><strong>Première commande</strong><small>Étape 06</small></div><Check className="fc-check" size={16} /></div>
        <div className="float-card fc-3"><span className="icon-tile sm"><RefreshCw size={16} /></span><div><strong>Réachat</strong><small>Étape 08</small></div></div>
      </div>
    </div></section>

    {/* 08 — Digital Transformation & Lead Generation */}
    <section className="section container split is-reversed" id="transformation">
      <div className="split-copy">
        <Eyebrow>DIGITAL TRANSFORMATION & LEAD GENERATION</Eyebrow>
        <h2>Se digitaliser, ce n’est pas<br /><em>refaire un site.</em></h2>
        <p className="split-lead">Présentez votre offre, attirez des prospects qualifiés et suivez leur parcours jusqu’à la vente, l’inscription ou l’installation.</p>
        <div className="proof-cards">{proofs.map(p => <article className={`proof-card proof-${p.slug}`} key={p.slug}>
          {p.logo ? <img src={`/images/clients/${p.logo}`} alt={`Logo ${p.name}`} loading="lazy" /> : <span className="icon-tile sm"><RadioTower size={16} /></span>}
          <strong>{p.metric}</strong><p>{p.metricLabel}</p><span>{p.name}</span>
        </article>)}</div>
        <div className="split-foot"><Button href="#audit">Auditer mon acquisition</Button><a className="ghost-link" href="#realisations">Voir les cas FNM · OMAK · Telecom<ArrowRight size={16} strokeWidth={2} /></a></div>
      </div>
      <div className="visual visual-pipeline" aria-label="Parcours d’un prospect, de l’offre au chiffre d’affaires">
        <div className="pipeline-card">
          <div className="pipeline-head"><span>Parcours d’un prospect</span><span className="pipeline-live"><i />Suivi</span></div>
          <ol>{businessFunnel.map((s, i) => <li key={s} className={i === businessFunnel.length - 1 ? 'is-goal' : undefined}><span className="pipeline-dot"><Check size={12} strokeWidth={3} /></span>{s}</li>)}</ol>
        </div>
        <div className="float-card fc-4"><span className="icon-tile sm is-solid"><MessageCircle size={16} /></span><div><strong>Qualification</strong><small>WhatsApp</small></div></div>
      </div>
    </section>

    {/* 09 — Selected Work */}
    <section className="section work-section" id="realisations">
      <div className="container"><SectionHead eyebrow="SELECTED WORK" title="Des transformations," accent="pas des livraisons." lead="Product & App Growth · Digital Transformation & Lead Generation." href="#contact" cta="Parlons de votre projet" /></div>
      <div className="container"><WorkRail /></div>
    </section>

    {/* 10 — Measurement & Data */}
    <section className="section container" id="mesure">
      <SectionHead eyebrow="MEASUREMENT & DATA" title="Un lead pas cher" accent="n’est pas toujours rentable." lead="Quatre niveaux de lecture. Une seule question finale : quelle valeur a été créée ?" href="#audit" cta="Faire le point sur ma mesure" />
      <div className="kpi-grid">{kpiLevels.map((k, i) => <article className={i === kpiLevels.length - 1 ? 'kpi-card is-business' : 'kpi-card'} key={k.level}>
        <div className="kpi-top"><span className="kpi-level">{k.level}</span><span className="tag">0{i + 1}</span></div>
        <ul>{k.kpis.map(v => <li key={v}>{v}</li>)}</ul>
        <p>{k.question}</p>
      </article>)}</div>
    </section>

    {/* 11 — Product Takeover */}
    <section className="band band-soft" id="takeover"><div className="container">
      <SectionHead center eyebrow="PRODUCT TAKEOVER" title="Un produit devenu difficile" accent="à faire évoluer ?" lead="Nous auditons, reprenons, stabilisons et faisons évoluer un produit construit par une autre équipe." />
      <ol className="timeline">{takeover.map(({ Icon, title }, i) => <li key={title}>
        <span className="timeline-dot"><Icon size={20} strokeWidth={1.8} /></span>
        <span className="timeline-num">0{i + 1}</span>
        <strong>{title}</strong>
      </li>)}</ol>
      <p className="takeover-proof"><BadgeCheck size={18} />Preuve principale : <strong>WashRoc</strong> — produit repris et adapté à un nouveau modèle opérationnel.</p>
      <div className="center-cta"><Button href="#contact">Faire auditer votre produit</Button></div>
    </div></section>

    {/* 12 — Pour qui */}
    <section className="section container" id="pour-qui">
      <SectionHead eyebrow="POUR QUI" title="Un accompagnement" accent="adapté à votre projet." />
      <div className="card-grid three">{audiences.map((a, i) => { const Icon = audienceIcons[i]; return <article className="card audience-card" key={a.title}>
        <span className="icon-tile"><Icon size={20} strokeWidth={1.8} /></span>
        <h3>{a.title}</h3>
        <p className="muted-line">{a.situation}</p>
        <p>{a.need}</p>
        <span className="tag tag-soft">{a.answer}</span>
      </article>; })}</div>
    </section>

    {/* 13 — Pourquoi Medialead */}
    <section className="section container" id="pourquoi">
      <SectionHead eyebrow="POURQUOI MEDIALEAD" title="Ce qui change," accent="concrètement." />
      <div className="card-grid four">{reasons.map((r, i) => { const Icon = reasonIcons[i]; return <article className="card reason-card" key={r.title}>
        <span className="icon-tile"><Icon size={20} strokeWidth={1.8} /></span>
        <h3>{r.title}</h3><p>{r.text}</p>
      </article>; })}</div>
    </section>

    {/* 14 — Core Team */}
    <section className="section container" id="agence">
      <SectionHead eyebrow="CORE TEAM" title="Rencontrez" accent="notre core team." lead="La stratégie, la technologie et la création, ensemble." />
      <div className="card-grid three">{team.map(([name, role]) => <article className="card person" key={name}>
        <span className="person-avatar" aria-hidden="true">{name[0]}</span>
        <div><h3>{name}</h3><p>{role}</p></div>
      </article>)}</div>
    </section>

    {/* 15 — Growth Audit */}
    <section className="section container" id="audit">
      <SectionHead center eyebrow="GROWTH AUDIT" title="Où votre croissance" accent="bloque-t-elle vraiment ?" />
      <div className="audit-card">
        <div className="audit-card-head">
          <span className="icon-tile lg"><Gauge size={24} strokeWidth={1.8} /></span>
          <div><h3>Growth Audit</h3><div className="tag-row">{['Produit', 'Tracking', 'Acquisition', 'Conversion', 'Business model'].map(t => <span className="tag tag-soft" key={t}>{t}</span>)}</div></div>
        </div>
        <ul className="audit-checks">{auditQuestions.map(q => <li key={q}><span className="check"><Check size={13} strokeWidth={3} /></span>{q}</li>)}</ul>
        <div className="audit-foot"><Button href="#contact">Demander votre Growth Audit</Button></div>
      </div>
    </section>

    {/* 17 — Final CTA */}
    <CTA />
  </>;
}
