import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Eyebrow,CTA} from '@/components/ui';
import {insights} from '@/lib/content';
export const metadata={title:'Insights',description:'Notes et perspectives Medialead sur le produit, la croissance et la mesure.'};
export default function Insights(){return <><div className="page-hero container"><Eyebrow>NOTES & PERSPECTIVES</Eyebrow><h1>Penser plus loin.<br/><span>Décider plus clairement.</span></h1><p>Quelques repères pour comprendre les liens entre produit, acquisition et valeur business.</p></div><section className="section container" style={{paddingTop:0}}><div className="insights-grid">{insights.map((a,i)=><Link className="insight-card" key={a.slug} href={`/insights/${a.slug}`}><div className={`article-art art-${i}`}><span>{['INSTALL ≠ IMPACT','BUILD. REBUILD. EVOLVE.','CLICKS → CLIENTS'][i]}</span><ArrowUpRight size={25}/></div><span className="meta">{a.category}</span><h3>{a.title}</h3><p>{a.excerpt}</p></Link>)}</div></section><CTA/></>}
