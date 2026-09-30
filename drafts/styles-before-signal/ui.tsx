import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Smartphone, TrendingUp, Layers3, ChartNoAxesCombined, Rocket } from 'lucide-react';
import { projects, services } from '@/lib/content';

export function Button({href,children,secondary=false}:{href:string;children:React.ReactNode;secondary?:boolean}) { return <Link className={`button ${secondary?'secondary':''}`} href={href}><span className="button-label">{children}</span><ArrowRight className="button-icon" size={17} strokeWidth={2} aria-hidden="true"/></Link> }
export function Eyebrow({children}:{children:React.ReactNode}) {return <div className="eyebrow">{children}</div>}
export function SectionTitle({eyebrow,title,accent,href,label='Tout découvrir'}:{eyebrow:string;title:string;accent?:string;href?:string;label?:string}){return <div className="section-heading"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}{accent&&<><br/><span>{accent}</span></>}</h2>{href&&<Link className="text-link" href={href}>{label}<ArrowUpRight size={17}/></Link>}</div>}

/* En-tête de section : titre en deux tons (noir puis orange), action contextuelle optionnelle. */
export function SectionHead({eyebrow,title,accent,lead,href,cta,center=false}:{eyebrow:string;title:string;accent?:string;lead?:string;href?:string;cta?:string;center?:boolean}){
  return <div className={`sec-head${center?' is-center':''}`}>
    <div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}{accent&&<><br/><em>{accent}</em></>}</h2>{lead&&<p>{lead}</p>}</div>
    {href&&cta&&<Link className="ghost-link" href={href}>{cta}<ArrowRight size={16} strokeWidth={2}/></Link>}
  </div>;
}

const icons={code:Code2,phone:Smartphone,trend:TrendingUp,layers:Layers3,chart:ChartNoAxesCombined,rocket:Rocket};
export function ServiceCard({service}:{service:typeof services[number]}) {
  const Icon=icons[service.icon as keyof typeof icons];
  return <article className="service-card">
    <div className="service-top"><span className="icon-tile"><Icon size={20} strokeWidth={1.8}/></span><span className="tag">{service.number}</span></div>
    <h3>{service.name}</h3>
    <p>{service.short}</p>
  </article>;
}
export function ProjectVisual({project,large=false}:{project:typeof projects[number];large?:boolean}){return <div className={`media-placeholder ${large?'large':''}`}>{project.name}</div>}
export function ProjectCard({project}:{project:typeof projects[number]}){return <article className="project-card"><ProjectVisual project={project}/><h3>{project.title}</h3></article>}

export function CTA(){return <section className="contact-section container" id="contact"><div className="cta-band">
  <Eyebrow>ET SI ON CONSTRUISAIT LA SUITE ?</Eyebrow>
  <h2>Votre prochaine étape.<br/><em>Ça commence ici.</em></h2>
  <div className="cta-actions"><Button href="tel:+212661912916">Parlons de votre projet</Button><Link className="cta-phone" href="tel:+212661912916">+212 6 61 91 29 16</Link></div>
</div></section>}
export function Funnel({steps}:{steps:string[]}){return <ol className="funnel">{steps.map((s,i)=><li key={s}><span>{String(i+1).padStart(2,'0')}</span><strong>{s}</strong></li>)}</ol>}
