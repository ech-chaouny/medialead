import Link from 'next/link';
import {notFound} from 'next/navigation';
import {insights} from '@/lib/content';
import {Eyebrow,CTA} from '@/components/ui';
export function generateStaticParams(){return insights.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=insights.find(x=>x.slug===slug);return {title:a?.title??'Insight',description:a?.excerpt}}
export default async function Article({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=insights.find(x=>x.slug===slug);if(!a)notFound();return <><div className="page-hero container"><div className="breadcrumb"><Link href="/insights">Insights</Link><span>/</span><span>{a.category}</span></div><Eyebrow>{a.category}</Eyebrow><h1>{a.title}</h1><p>{a.excerpt}</p></div><article className="article-body container">{a.body.map(p=><p key={p}>{p}</p>)}<Link className="text-link" href="/insights">← Tous les insights</Link></article><CTA/></>}
