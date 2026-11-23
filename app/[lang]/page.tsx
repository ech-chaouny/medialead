import { Code2, Megaphone, TrendingUp } from 'lucide-react';
import { Button, SectionHead, CTA } from '@/components/ui';
import { contentFor } from '@/lib/content';
import Hero from '@/components/hero';
import ConnectedGrowth from '@/components/connected-growth';
import DoneTabs from '@/components/done-tabs';
import GrowthSteps from '@/components/growth-steps';
import AuditDiagnostic from '@/components/audit-diagnostic';
import RealisationsSection from '@/components/realisations-section';
import { AppGrowthSection } from '@/components/expertise-sections';
import { marocTelecomAuthorized } from '@/lib/sectors';
import { localePath, type Lang } from '@/lib/i18n';

/* Accueil : l'essentiel. Les expertises détaillées sont sur /expertises ; les réalisations sont ici et sur /realisations. */

/* Logos clients : seul endroit du site où apparaissent les noms (logos seuls, sans libellé de secteur). Fichiers détourés dans /images/logos, tailles équilibrées en CSS. */
const allClients = [
  { name: 'DROK', src: 'drok.webp', key: 'drok' },
  { name: 'WashRoc', src: 'washroc.webp', key: 'washroc' },
  { name: 'Privu', src: 'privu.webp', key: 'privu' },
  { name: 'OMAK Service', src: 'omak.webp', key: 'omak' },
  { name: 'FNM', src: 'fnm.webp', key: 'fnm' },
  { name: 'Maroc Telecom', src: 'telecom.webp', key: 'telecom' },
] as const;
const clients = allClients.filter(c => c.key !== 'telecom' || marocTelecomAuthorized);
const pillarIcons = { dev: Code2, marketing: Megaphone, results: TrendingUp } as const;
const team = [['Zakaria Mtioui Chkairi', 'Strategy & Growth', 'zakaria'], ['Ismail', 'Tech & Product', 'ismail'], ['Hanane', 'Growth & Project Management', 'hanane'], ['Hafsa', 'Video & Content Creator', 'hafsa'], ['Jihane', 'Content Creator', 'jihane']];

const copy = {
  fr: {
    problem: { eyebrow: 'LE VRAI SUJET', title: 'Le problème est rarement', accent: 'le marketing seul.', lead: 'Le produit, l’acquisition et la data doivent servir le même objectif.' },
    pillars: { eyebrow: 'NOS 3 PILIERS', title: 'Plus qu’une agence.', accent: 'Un partenaire jusqu’au résultat.', lead: 'Développement, digital marketing et pilotage des résultats : une seule équipe, du produit au chiffre d’affaires.', cta: 'Découvrir nos expertises' },
    done: { eyebrow: 'DU CONCRET', title: 'Ce que nous avons', accent: 'déjà fait.', lead: 'Des produits, des créatives et des résultats — par domaine.', cta: 'Voir les réalisations' },
    method: { eyebrow: 'LE MEDIALEAD GROWTH SYSTEM', title: 'Une méthode', accent: 'pour avancer.', lead: 'Une équipe. Sept étapes. Un même objectif.', next: 'Un Growth Audit pour savoir quelle étape débloquer en premier.', nextCta: 'Par où commencer ?' },
    team: { title: 'Rencontrez', accent: 'notre core team.', lead: 'La stratégie, la technologie, le contenu et la création, ensemble.' },
    logos: { badge: 'Nos clients', label: 'Ils nous ont confié leur produit, leur acquisition et leur croissance.', alt: 'Logo client' },
    audit: { title: <>Où votre croissance <span style={{ whiteSpace: 'nowrap' }}>bloque-t-elle</span> vraiment&nbsp;?</>, lead: '4 questions pour identifier votre priorité : lancement produit, croissance, transformation digitale ou acquisition.', note: 'Une orientation pour préparer l’échange, pas un audit complet : notre équipe affine ensuite avec vous.' },
  },
  en: {
    problem: { eyebrow: 'THE REAL ISSUE', title: 'The problem is rarely', accent: 'marketing alone.', lead: 'Product, acquisition and data must serve the same goal.' },
    pillars: { eyebrow: 'OUR 3 PILLARS', title: 'More than an agency.', accent: 'A partner all the way to results.', lead: 'Development, digital marketing and results management: one team, from product to revenue.', cta: 'Explore our expertise' },
    done: { eyebrow: 'PROOF', title: 'What we have', accent: 'already done.', lead: 'Products, creatives and results — by area.', cta: 'See our work' },
    method: { eyebrow: 'THE MEDIALEAD GROWTH SYSTEM', title: 'A method', accent: 'to move forward.', lead: 'One team. Seven steps. One goal.', next: 'A Growth Audit to find out which step to unlock first.', nextCta: 'Where to start?' },
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
      <SectionHead center eyebrow={t.pillars.eyebrow} title={t.pillars.title} accent={t.pillars.accent} lead={t.pillars.lead} href={to('/expertises')} cta={t.pillars.cta} />
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
    <AppGrowthSection lang={lang} />

    {/* 09 — Réalisations : aussi sur la page /realisations */}
    <RealisationsSection lang={lang} linkToPage />

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
