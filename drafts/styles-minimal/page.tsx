import { ArrowUpRight, Code2, TrendingUp, Smartphone, Building2, Rocket, RefreshCw, ChartNoAxesCombined, Plus, Megaphone, Store, BadgeCheck } from 'lucide-react';
import { Button, Eyebrow, SectionHead, CTA } from '@/components/ui';
import { insights, appFunnel, businessFunnel, kpiLevels, audiences, reasons, auditQuestions, faqs } from '@/lib/content';
import GrowthSystem from '@/components/growth-system';
import ConnectedGrowth from '@/components/connected-growth';
import Partnership from '@/components/partnership';
import HeroStage from '@/components/hero-stage';
import WorkRail from '@/components/work-rail';

const audienceIcons = [Smartphone, Rocket, Building2];
const insightIcons = [Smartphone, Code2, ChartNoAxesCombined];
const team = [['Zakaria', 'Strategy & Growth'], ['Ismail', 'Tech & Product'], ['Hanane', 'Growth & Project Management']];
const clients = [
  { name: 'DROK', sector: 'Livraison à la demande', image: 'drok-word-orange.png', style: 'drok' },
  { name: 'WashRoc', sector: 'Lavage automobile à domicile', image: 'washroc.png', style: 'washroc' },
  { name: 'OMAK Service', sector: 'Services automobiles', image: 'omak.jpeg', style: 'omak' },
  { name: 'FNM', sector: 'Formation en naturopathie', image: 'fnm.png', style: 'fnm' },
  { name: 'Privu', sector: 'Marketplace & petites annonces', image: 'pending-brand.webp', style: 'privu' },
  { name: 'Réseau commercial télécom', sector: 'Lead generation · Multi-agences', image: 'iam.gif', style: 'iam' },
];
const tracks = [
  { id: 'app-growth', Icon: Smartphone, eyebrow: 'APP MARKETING', title: 'L’installation n’est pas la ligne d’arrivée.', text: 'Attirez les bons utilisateurs et accompagnez-les jusqu’à leur première commande, puis leur prochain achat.', steps: appFunnel, proof: 'DROK · WashRoc', cta: 'Auditer la croissance de mon app' },
  { id: 'transformation', Icon: Store, eyebrow: 'DIGITAL TRANSFORMATION', title: 'Se digitaliser, ce n’est pas refaire un site.', text: 'Présentez votre offre, attirez des prospects qualifiés et suivez leur parcours jusqu’à la vente, l’inscription ou l’installation.', steps: businessFunnel, proof: 'FNM · OMAK Service', cta: 'Auditer mon acquisition' },
];

export default function Home() {
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-halo" aria-hidden="true" />
      <div className="hero-content container">
        <Eyebrow>PRODUCT. GROWTH. DATA.</Eyebrow>
        <h1 id="hero-title">We build.<br />We launch.<br className="mobile-break" /> We grow<span>.</span></h1>
        <p>Applications, sites et plateformes. Acquisition, contenus et campagnes.<br className="mobile-break" /> Nous connectons le tout à votre croissance.</p>
        <div className="hero-actions"><Button href="#contact">Parlons de votre projet</Button><Button href="#realisations" secondary>Nos réalisations</Button></div>
      </div>
      <div className="container"><HeroStage /></div>
    </section>

    <section className="client-gallery container" aria-label="Nos clients et leurs secteurs">
      <div className="client-gallery-heading"><Eyebrow>ILS NOUS FONT CONFIANCE</Eyebrow><h2>Des univers différents.<br/><span>Une même ambition.</span></h2></div>
      <div className="client-cards">
        {clients.map(client => <article className={`client-glass client-glass-${client.style}`} key={client.name}>
          <div className="client-logo-stage"><img src={`/images/clients/${client.image}`} alt={`Logo ${client.name}`} loading="lazy" /></div>
          <div className="client-card-caption"><h3>{client.name}</h3><p>{client.sector}</p></div>
        </article>)}
      </div>
    </section>

    <section className="section container" id="probleme">
      <SectionHead eyebrow="LE VRAI SUJET" title="Connectez votre produit à votre croissance." lead="Le produit, l’acquisition et la data au service d’un même objectif." />
      <ConnectedGrowth />
    </section>

    <section className="section container" id="expertises">
      <SectionHead eyebrow="NOS EXPERTISES" title="Du développement aux résultats." lead="Du développement au marketing digital, une équipe qui suit votre projet jusqu’au résultat business." href="#realisations" cta="Voir nos réalisations" />
      <Partnership />
    </section>

    <section className="method-band" id="methode"><div className="container">
      <div className="statement" aria-label="Du produit à la croissance mesurable">
        <p className="statement-line">Du produit <span className="statement-chip chip-product" aria-hidden="true"><Code2 /></span> à la croissance <span className="statement-chip chip-growth" aria-hidden="true"><TrendingUp /></span> mesurable.</p>
      </div>
      <SectionHead eyebrow="LE MEDIALEAD GROWTH SYSTEM" title="Une méthode pour avancer." lead="Une équipe. Sept étapes. Un même objectif." />
      <GrowthSystem />
    </div></section>

    <section className="section container" aria-label="App Marketing et Digital Transformation">
      <div className="duo">{tracks.map(({ id, Icon, eyebrow, title, text, steps, proof, cta }) => <article className="duo-card" id={id} key={id}>
        <div className="duo-top"><span className="duo-icon"><Icon size={20} strokeWidth={1.6} /></span><Eyebrow>{eyebrow}</Eyebrow></div>
        <h3>{title}</h3>
        <p>{text}</p>
        <ol className="duo-steps">{steps.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}</ol>
        <div className="duo-foot"><span className="duo-proof"><BadgeCheck size={16} />Preuve : {proof}</span><a className="pill-link" href="#audit">{cta}<ArrowUpRight size={16} /></a></div>
      </article>)}</div>
    </section>

    <section className="section work-section" id="realisations">
      <div className="container"><SectionHead eyebrow="QUELQUES PROJETS" title="Découvrez nos réalisations." lead="Chaque projet raconte une transformation, pas une livraison." href="#contact" cta="Parlons de votre projet" /></div>
      <div className="container work-rail-container"><WorkRail /></div>
    </section>

    <section className="section container" id="mesure">
      <SectionHead eyebrow="MEASUREMENT & DATA" title="Mesurez ce qui compte vraiment." lead="Quatre niveaux de lecture. Une seule question finale : quelle valeur a été créée ?" href="#audit" cta="Faire le point sur ma mesure" />
      <div className="kpi-panel">{kpiLevels.map((k, i) => <div className={i === kpiLevels.length - 1 ? 'kpi-card is-business' : 'kpi-card'} key={k.level}>
        <span className="kpi-step">0{i + 1}</span>
        <span className="kpi-level">{k.level}</span>
        <ul>{k.kpis.map(v => <li key={v}>{v}</li>)}</ul>
        <p>{k.question}</p>
      </div>)}</div>
    </section>

    <section className="focus-section"><div className="container focus-grid">
      <div className="focus-copy"><Eyebrow>PRODUCT TAKEOVER</Eyebrow><h2>Un produit devenu<br />difficile <span>à faire évoluer ?</span></h2><p>Nous reprenons votre produit, corrigeons les blocages et préparons ses prochaines évolutions.</p><a className="text-link" href="#contact">Faire auditer votre produit <ArrowUpRight size={16} /></a></div>
      <div className="takeover-steps"><RefreshCw size={22} strokeWidth={1.4} />{['Audit technique et produit', 'Reprise et stabilisation', 'Mesure et priorités', 'Évolution continue'].map((s, i) => <div key={s}><span>0{i + 1}</span>{s}</div>)}</div>
    </div></section>

    <section className="section container" id="pour-qui">
      <SectionHead eyebrow="POUR QUI" title="Un accompagnement adapté à votre projet." />
      <div className="audience-grid">{audiences.map((a, i) => { const Icon = audienceIcons[i]; return <article className="audience-card" key={a.title}>
        <Icon size={21} strokeWidth={1.4} />
        <h3>{a.title}</h3>
        <p className="audience-situation">{a.situation}</p>
        <p>{a.need}</p>
        <span className="audience-answer">{a.answer}</span>
      </article>; })}</div>
    </section>

    <section className="section container" id="pourquoi">
      <SectionHead eyebrow="POURQUOI MEDIALEAD" title="Ce qui change, concrètement." />
      <div className="reasons-grid">{reasons.map((r, i) => <div className="reason" key={r.title}><span>0{i + 1}</span><h3>{r.title}</h3><p>{r.text}</p></div>)}</div>
    </section>

    <section className="section container" id="agence">
      <SectionHead eyebrow="L’ÉQUIPE MEDIALEAD" title="Rencontrez notre équipe." lead="La stratégie, la technologie et la création, ensemble." />
      <div className="people">{team.map(([name, role], i) => <article className={`person person-${i}`} key={name}>
        <span className="person-avatar" aria-hidden="true">{name[0]}</span>
        <div><h3>{name}</h3><p>{role}</p></div>
      </article>)}</div>
    </section>

    <section className="section container audit-section" id="audit"><div className="audit-panel">
      <Eyebrow>GROWTH AUDIT</Eyebrow>
      <h2>Où votre croissance <span>bloque-t-elle vraiment ?</span></h2>
      <ul className="audit-list">{auditQuestions.map(q => <li key={q}>{q}</li>)}</ul>
      <Button href="#contact">Demander votre Growth Audit</Button>
    </div></section>

    <section className="section container faq-section" id="faq">
      <div className="faq-head"><Eyebrow>QUESTIONS FRÉQUENTES</Eyebrow><h2>Ce que l’on nous demande souvent.</h2><a className="pill-link" href="#contact">Poser une autre question<ArrowUpRight size={16} /></a></div>
      <div className="faq-list">{faqs.map(f => <details className="faq-item" key={f.q}>
        <summary><span>{f.q}</span><Plus size={20} aria-hidden="true" /></summary>
        <p>{f.a}</p>
      </details>)}</div>
    </section>

    <section className="section container insights-section" id="insights">
      <SectionHead eyebrow="NOTES & PERSPECTIVES" title="Nos idées pour faire avancer les vôtres." />
      <div className="notes">{insights.map((a, i) => { const Icon = insightIcons[i] ?? Megaphone; return <article className={`note note-${i}`} key={a.slug}>
        <div className="note-cover" aria-hidden="true"><Icon size={34} strokeWidth={1.3} /></div>
        <span className="meta">{a.category}</span>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
      </article>; })}</div>
    </section>
    <CTA />
  </>;
}
