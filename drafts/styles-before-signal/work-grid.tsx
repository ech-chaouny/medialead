'use client';
import {useState} from 'react';
import {projects} from '@/lib/content';
import {ProjectCard} from './ui';
export default function WorkGrid(){const [filter,setFilter]=useState('Tous');return <><div className="filter-bar" aria-label="Filtrer les projets">{['Tous','Product & App Growth','Digital Transformation','Product Development'].map(f=><button key={f} aria-pressed={filter===f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="projects-grid">{projects.filter(p=>filter==='Tous'||p.category===filter).map(p=><ProjectCard key={p.slug} project={p}/>)}</div></>}
