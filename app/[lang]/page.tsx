import { ArrowRight, Code2, Megaphone, Layers3, Target, Users, Store, Download, UserPlus, UserCheck, ShoppingCart, CircleCheck, RefreshCw, Search, Wrench, ChartNoAxesCombined, TrendingUp, Smartphone, Rocket, Building2 } from 'lucide-react';
import { Button, SectionHead, CTA } from '@/components/ui';
import { contentFor } from '@/lib/content';
import Hero from '@/components/hero';
import ConnectedGrowth from '@/components/connected-growth';
import DoneTabs from '@/components/done-tabs';
import GrowthSteps from '@/components/growth-steps';
import AuditDiagnostic from '@/components/audit-diagnostic';
import CountUp from '@/components/count-up';
import Realisations from '@/components/realisations';
import { sectorLabels, marocTelecomAuthorized } from '@/lib/sectors';
import { localePath, type Lang } from '@/lib/i18n';

/* Homepage « Signal » — ordre du cahier des charges V5 §6. Textes en français et en anglais. */

/* Logos clients : seul endroit du site où apparaissent les noms. Fichiers détourés dans /images/logos, tailles équilibrées en CSS. */
const allClients = [
  { name: 'DROK', src: 'drok.webp', key: 'drok' },
  { name: 'WashRoc', src: 'washroc.webp', key: 'washroc' },
  { name: 'Privu', src: 'privu.webp', key: 'privu' },
  { name: 'OMAK Service', src: 'omak.webp', key: 'omak' },
  { name: 'FNM', src: 'fnm.webp', key: 'fnm' },
  { name: 'Maroc Telecom', src: 'telecom.webp', key: 'telecom' },
] as const;
const clients = allClients.filter(c => c.key !== 'telecom' || marocTelecomAuthorized);
const reasonIcons = [Layers3, Target, ChartNoAxesCombined, Users];
const pillarIcons = { dev: Code2, marketing: Megaphone, results: TrendingUp } as const;
const takeoverIcons = [Search, Wrench, ChartNoAxesCombined, TrendingUp];
const audienceIcons = [Smartphone, Rocket, Building2];
const team = [['Zakaria Mtioui Chkairi', 'Strategy & Growth', 'zakaria'], ['Ismail', 'Tech & Product', 'ismail'], ['Hanane', 'Growth & Project Management', 'hanane'], ['Hafsa', 'Video & Content Creator', 'hafsa'], ['Jihane', 'Content Creator', 'jihane']];
/* Une icône par étape du parcours app, dans l'ordre de appFunnel. */
const funnelIcons = [Megaphone, Store, Download, UserPlus, UserCheck, ShoppingCart, CircleCheck, RefreshCw];

const copy = {
  fr: {
    problem: { eyebrow: 'LE VRAI SUJET', title: 'Le problème est rarement', accent: 'le marketing seul.', lead: 'Le produit, l’acquisition et la data doivent servir le même objectif.' },
    pillars: { eyebrow: 'NOS 3 PILIERS', title: 'Plus qu’une agence.', accent: 'Un partenaire jusqu’au résultat.', lead: 'Développement, digital marketing et pilotage des résultats : une seule équipe, du produit au chiffre d’affaires.' },
    done: { eyebrow: 'DU CONCRET', title: 'Ce que nous avons', accent: 'déjà fait.', lead: 'Des produits, des créatives et des résultats — par domaine.', cta: 'Voir les réalisations' },
    method: { eyebrow: 'LE MEDIALEAD GROWTH SYSTEM', title: 'Une méthode', accent: 'pour avancer.', lead: 'Une équipe. Sept étapes. Un même objectif.', next: 'Un Growth Audit pour savoir quelle étape débloquer en premier.', nextCta: 'Par où commencer ?' },
    app: { title: <>L’installation n’est pas <em>la ligne d’arrivée.</em></>, lead: 'Attirez les bons utilisateurs et accompagnez-les jusqu’à leur première commande, puis leur prochain achat.', cta: 'Auditer la croissance de mon app', alt: 'Deux applications mobiles, lavage auto à domicile et livraison, avec les événements suivis de l’installation au réachat : app_install, sign_up, add_to_cart, first_order, repeat_order.' },
    transfo: { title: <>Se digitaliser, ce n’est pas <em>refaire un site.</em></>, lead: 'Présentez votre offre, attirez des prospects qualifiés et suivez leur parcours jusqu’à la vente, l’inscription ou l’installation.', results: 'Résultats', cta: 'Auditer mon acquisition', journey: 'Parcours d’un prospect', live: 'Suivi', aria: 'Parcours d’un prospect, de l’offre au chiffre d’affaires' },
    work: { title: 'Des transformations,', accent: 'pas des livraisons.', lead: 'Applications, systèmes et contenus : un aperçu du travail livré pour nos clients.', ctaTitle: 'Un projet en tête ?', cta: 'Parlons de votre projet' },
    measure: { title: 'Un lead pas cher', accent: 'n’est pas toujours rentable.', lead: 'Quatre niveaux de lecture. Une seule question finale : quelle valeur a été créée ?', cta: 'Faire le point sur ma mesure' },
    takeover: { title: 'Un produit devenu difficile', accent: 'à faire évoluer ?', lead: 'Nous auditons, reprenons, stabilisons et faisons évoluer un produit construit par une autre équipe.', steps: ['Audit technique et produit', 'Reprise et stabilisation', 'Mesure et priorités', 'Évolution continue'], cta: 'Faire auditer votre produit' },
    forWho: { eyebrow: 'POUR QUI', title: 'Un accompagnement', accent: 'adapté à votre projet.' },
    why: { eyebrow: 'POURQUOI MEDIALEAD', title: 'Ce qui change,', accent: 'concrètement.' },
    team: { title: 'Rencontrez', accent: 'notre core team.', lead: 'La stratégie, la technologie, le contenu et la création, ensemble.' },
    logos: { badge: 'Nos clients', label: 'Ils nous ont confié leur produit, leur acquisition et leur croissance.', alt: 'Logo client' },
    audit: { title: <>Où votre croissance <span style={{ whiteSpace: 'nowrap' }}>bloque-t-elle</span> vraiment&nbsp;?</>, lead: '4 questions pour identifier votre priorité : lancement produit, croissance, transformation digitale ou acquisition.', note: 'Une orientation pour préparer l’échange, pas un audit complet : notre équipe affine ensuite avec vous.' },
  },
  en: {
    problem: { eyebrow: 'THE REAL ISSUE', title: 'The problem is rarely', accent: 'marketing alone.', lead: 'Product, acquisition and data must serve the same goal.' },
    pillars: { eyebrow: 'OUR 3 PILLARS', title: 'More than an agency.', accent: 'A partner all the way to results.', lead: 'Development, digital marketing and results management: one team, from product to revenue.' },
    done: { eyebrow: 'PROOF', title: 'What we have', accent: 'already done.', lead: 'Products, creatives and results — by area.', cta: 'See our work' },
    method: { eyebrow: 'THE MEDIALEAD GROWTH SYSTEM', title: 'A method', accent: 'to move forward.', lead: 'One team. Seven steps. One goal.', next: 'A Growth Audit to find out which step to unlock first.', nextCta: 'Where to start?' },
    app: { title: <>Installation is not <em>the finish line.</em></>, lead: 'Attract the right users and guide them to their first order, then their next purchase.', cta: 'Audit my app growth', alt: 'Two mobile apps, at-home car wash and delivery, with the events tracked from install to repeat purchase: app_install, sign_up, add_to_cart, first_order, repeat_order.' },
    transfo: { title: <>Going digital is not <em>just a new website.</em></>, lead: 'Present your offer, attract qualified prospects and follow their journey through to the sale, the enrolment or the installation.', results: 'Results', cta: 'Audit my acquisition', journey: 'A prospect’s journey', live: 'Tracked', aria: 'A prospect’s journey, from offer to revenue' },
    work: { title: 'Transformations,', accent: 'not just deliveries.', lead: 'Apps, systems and content: a look at the work delivered for our clients.', ctaTitle: 'Have a project in mind?', cta: 'Let’s talk about your project' },
    measure: { title: 'A cheap lead', accent: 'isn’t always profitable.', lead: 'Four levels of reading. One final question: what value was created?', cta: 'Review my measurement' },
    takeover: { title: 'A product that has become', accent: 'hard to evolve?', lead: 'We audit, take over, stabilise and evolve products built by another team.', steps: ['Technical and product audit', 'Takeover and stabilisation', 'Measurement and priorities', 'Continuous improvement'], cta: 'Get my product audited' },
    forWho: { eyebrow: 'WHO IT’S FOR', title: 'Support', accent: 'tailored to your project.' },
    why: { eyebrow: 'WHY MEDIALEAD', title: 'What actually', accent: 'changes.' },
    team: { title: 'Meet', accent: 'our core team.', lead: 'Strategy, technology, content and creative, together.' },
    logos: { badge: 'Our clients', label: 'They trusted us with their product, their acquisition and their growth.', alt: 'Client logo' },
    audit: { title: <>Where is your growth <span style={{ whiteSpace: 'nowrap' }}>really stuck</span>?</>, lead: '4 questions to identify your priority: product launch, growth, digital transformation or acquisition.', note: 'A first orientation to prepare the conversation, not a full audit: our team refines it with you.' },
  },
};

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang: raw } = await params;
  const lang = raw as Lang;
  const t = copy[lang];
  const c = contentFor(lang);
  const to = (p: string) => localePath(lang, p);
  /* Résultats affichés dans la section Transformation : mêmes chiffres validés que l'onglet Résultats. */
  const proofs = c.doneResults.filter(r => r.id !== 'washroc');

  return <>
    {/* 01 — Hero */}
    <Hero lang={lang} />

    {/* 03 — Le problème */}
    <section className="section" id="probleme"><div className="container">
      <SectionHead center eyebrow={t.problem.eyebrow} title={t.problem.title} accent={t.problem.accent} lead={t.problem.lead} />
      <div data-reveal><ConnectedGrowth /></div>
    </div></section>

    {/* 04 — Les 3 piliers */}
    <section className="section paper" id="expertises"><div className="container">
      <SectionHead center eyebrow={t.pillars.eyebrow} title={t.pillars.title} accent={t.pillars.accent} lead={t.pillars.lead} />
      <div className="pillars">{c.pillars.map((p, i) => { const Icon = pillarIcons[p.key as keyof typeof pillarIcons]; return <article className="pillar" key={p.key} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
        <div className="pillar-top"><span className="pillar-icon"><Icon size={28} strokeWidth={1.9} /></span><span className="pillar-num">0{i + 1}</span></div>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
      </article>; })}</div>
    </div></section>

    {/* 05 — Ce que nous avons déjà fait */}
    <section className="section" id="deja-fait"><div className="container">
      <SectionHead center eyebrow={t.done.eyebrow} title={t.done.title} accent={t.done.accent} lead={t.done.lead} href="#realisations" cta={t.done.cta} />
      <div data-reveal><DoneTabs /></div>
    </div></section>

    {/* 06 — Growth System */}
    <section className="section alt" id="methode"><div className="container">
      <SectionHead center eyebrow={t.method.eyebrow} title={t.method.title} accent={t.method.accent} lead={t.method.lead} />
      <div data-reveal><GrowthSteps /></div>
      {/* « Par où commencer ? » sort de la liste : les 7 étapes annoncées restent 7. */}
      <div className="steps-cta" data-reveal>
        <p>{t.method.next}</p>
        <Button href="#audit">{t.method.nextCta}</Button>
      </div>
    </div></section>

    {/* 07 — App Growth */}
    <section className="section" id="app-growth"><div className="container split">
      <div className="split-copy" data-reveal>
        <div className="eyebrow">APP GROWTH</div>
        <h2>{t.app.title}</h2>
        <p className="split-lead">{t.app.lead}</p>
        <ol className="path">{c.appFunnel.map((s, i) => { const Icon = funnelIcons[i]; return <li key={s} className={i === c.appFunnel.length - 1 ? 'is-goal' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><Icon size={18} strokeWidth={1.8} aria-hidden="true" />{s}</li>; })}</ol>
        <div className="split-foot"><Button href="#audit">{t.app.cta}</Button></div>
      </div>
      <figure className="apps-visual" data-reveal>
        <img src="/images/app-growth/apps-tracking-v2.webp" width={1440} height={1137} loading="lazy" decoding="async" alt={t.app.alt} />
      </figure>
    </div></section>

    {/* 08 — Digital Transformation & Lead Generation */}
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
        <div className="split-foot"><Button href="#audit">{t.transfo.cta}</Button></div>
      </div>
      <div className="pipeline" data-reveal aria-label={t.transfo.aria}>
        <div className="pipeline-head"><span>{t.transfo.journey}</span><span className="pipeline-live"><i />{t.transfo.live}</span></div>
        <ol>{c.businessFunnel.map((s, i) => <li key={s} className={i === c.businessFunnel.length - 1 ? 'is-goal' : undefined}><span className="pipeline-num">{String(i + 1).padStart(2, '0')}</span>{s}{i === 4 && <em>WhatsApp</em>}</li>)}</ol>
      </div>
    </div></section>

    {/* 09 — Réalisations : rangées défilantes, données dans lib/realisations.json */}
    <section className="section" id="realisations">
      <div className="container"><SectionHead center eyebrow={lang === 'en' ? 'OUR WORK' : 'RÉALISATIONS'} title={t.work.title} accent={t.work.accent} lead={t.work.lead} /></div>
      <Realisations />
      <div className="container rz-cta" data-reveal>
        <h3>{t.work.ctaTitle}</h3>
        <Button href={to('/contact')}>{t.work.cta}</Button>
      </div>
    </section>

    {/* 10 — Measurement & Data */}
    <section className="section alt" id="mesure"><div className="container">
      <SectionHead center eyebrow="MEASUREMENT & DATA" title={t.measure.title} accent={t.measure.accent} lead={t.measure.lead} href="#audit" cta={t.measure.cta} />
      <div className="stairs" data-reveal>{c.kpiLevels.map((k, i) => <article className={i === c.kpiLevels.length - 1 ? 'stair is-business' : 'stair'} key={k.level} style={{ '--h': `${58 + i * 14}%` } as React.CSSProperties}>
        <span className="stair-n">0{i + 1}</span>
        <span className="stair-level">{k.level}</span>
        <ul>{k.kpis.map(v => <li key={v}>{v}</li>)}</ul>
        <p>{k.question}</p>
      </article>)}</div>
    </div></section>

    {/* 11 — Product Takeover */}
    <section className="section paper" id="takeover"><div className="container">
      <SectionHead center eyebrow="PRODUCT TAKEOVER" title={t.takeover.title} accent={t.takeover.accent} lead={t.takeover.lead} />
      <ol className="timeline" data-reveal>{t.takeover.steps.map((title, i) => { const Icon = takeoverIcons[i]; return <li key={title}>
        <span className="timeline-dot"><Icon size={22} strokeWidth={1.8} /></span>
        <span className="timeline-n">0{i + 1}</span>
        <strong>{title}</strong>
      </li>; })}</ol>
      <div className="center-cta"><Button href={to('/contact')}>{t.takeover.cta}</Button></div>
    </div></section>

    {/* 12 — Pour qui */}
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

    {/* 13 — Pourquoi Medialead */}
    <section className="section alt" id="pourquoi"><div className="container">
      <SectionHead center eyebrow={t.why.eyebrow} title={t.why.title} accent={t.why.accent} />
      <div className="reasons">{c.reasons.map((r, i) => { const Icon = reasonIcons[i]; return <article className="reason" key={r.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
        <div className="reason-top"><span className="reason-icon"><Icon size={22} strokeWidth={1.8} /></span><span className="reason-num">0{i + 1}</span></div>
        <h3>{r.title}</h3><p>{r.text}</p>
      </article>; })}</div>
    </div></section>

    {/* 14 — Core Team */}
    <section className="section" id="agence"><div className="container">
      <SectionHead center eyebrow="CORE TEAM" title={t.team.title} accent={t.team.accent} lead={t.team.lead} />
      <div className="team-grid" data-reveal>{team.map(([name, role, photo]) => <article className="team-card" key={name} tabIndex={0}>
        <img src={`/images/team/${photo}.webp`} width={760} height={1013} alt={`${name}, ${role}`} loading="lazy" decoding="async" />
        <div className="team-info"><h3>{name}</h3><span>{role}</span></div>
      </article>)}</div>
    </div></section>

    {/* 14 bis — Clients, sous la core team */}
    <section className="logos" id="clients" aria-labelledby="logos-title">
      <div className="container logos-head"><span className="logos-badge">{t.logos.badge}</span><p id="logos-title" className="logos-label">{t.logos.label}</p></div>
      <div className="logo-loop" data-reveal>
        <div className="logo-loop-track">
          {[false, true].map(hidden => <ul key={String(hidden)} className="logo-wall" aria-hidden={hidden || undefined}>{clients.map(cl => <li key={cl.key} className={`logo-${cl.key}`}>
            <img src={`/images/logos/${cl.src}`} alt={hidden ? '' : `${t.logos.alt} ${cl.name}`} loading="lazy" />
            <span>{sectorLabels[cl.key]}</span>
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
        <h2>{t.audit.title}</h2>
        <p>{t.audit.lead}</p>
        <ul className="audit-themes">{['Product Launch', 'App Growth', 'Product Takeover', 'Digital Transformation', 'Audit First'].map(th => <li key={th}>{th}</li>)}</ul>
        <p className="audit-note">{t.audit.note}</p>
      </div>
      <div data-reveal><AuditDiagnostic /></div>
    </div></section>

    {/* 16 — CTA final */}
    <CTA lang={lang} />
  </>;
}
