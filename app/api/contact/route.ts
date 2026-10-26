import { needs, stages, budgets, timelines, labelOf, DESCRIPTION_MAX } from '@/lib/qualification';

/* Réception d'une demande « Parlons de votre projet ».
   Validation serveur de chaque champ, piège à robots, limite par IP, puis envoi au CRM via
   CONTACT_WEBHOOK_URL (Make, Zapier, HubSpot, email…). Sans cette variable : 503, et le
   formulaire n'affiche pas de confirmation. */

const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f<>]/g, ' ').trim().slice(0, max) : '');

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (limited(ip)) return Response.json({ error: 'too_many_requests' }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid_json' }, { status: 400 }); }
  if (clean(body.website_hp, 200)) return Response.json({ ok: true });

  // need_type : 1 à 3 besoins distincts.
  const needIds = Array.isArray(body.need_type) ? [...new Set(body.need_type.filter((x): x is string => typeof x === 'string'))] : [];
  const needList = needIds.map(id => labelOf(needs, id)).filter((n): n is NonNullable<typeof n> => !!n);
  const need = needList.length >= 1 && needList.length <= 3 && needList.length === needIds.length && !(needIds.includes('unknown') && needIds.length > 1) ? needList : null;
  const stage = labelOf(stages, body.stage);
  const budget = labelOf(budgets, body.project_budget);
  const timeline = labelOf(timelines, body.timeline);
  const lead = {
    name: clean(body.name, 120), company: clean(body.company, 120), email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 20), url: clean(body.url, 300), description: clean(body.description, DESCRIPTION_MAX),
  };

  const fields = [
    !need && 'need_type', !stage && 'stage', !budget && 'project_budget', !timeline && 'timeline',
    !lead.name && 'name', !lead.company && 'company',
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email) && 'email',
    !/^[+0-9 ().-]{8,20}$/.test(lead.phone) && 'phone',
    lead.url && !/^https?:\/\/\S+$/i.test(lead.url) && 'url',
    !lead.description && 'description',
    body.consent !== 'yes' && 'consent',
  ].filter(Boolean);
  if (fields.length || !need || !stage || !budget || !timeline) return Response.json({ error: 'invalid_fields', fields }, { status: 400 });

  const a = (body.attribution ?? {}) as Record<string, unknown>;
  const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'landing_page', 'referrer', 'timestamp'].map(k => [k, clean(a[k], 500)]));
  const payload = {
    ...lead,
    need_type: need.map(n => n.internal).join(', '), need_label: need.map(n => n.label).join(' ; '),
    stage: stage.label, project_budget: budget.label, timeline: timeline.label,
    ...attribution,
    // Fiche lisible pour le suivi commercial : « App Growth | Produit déjà lancé | 50 000 - 100 000 MAD | Dans 1 mois | linkedin / campagne ».
    summary: [need.map(n => n.internal).join(' + '), stage.label, budget.label, timeline.label, [attribution.utm_source, attribution.utm_campaign].filter(Boolean).join(' / ') || 'direct'].join(' | '),
    received_at: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return Response.json({ error: 'crm_not_configured' }, { status: 503 });
  try {
    const res = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) return Response.json({ error: 'crm_error' }, { status: 502 });
  } catch {
    return Response.json({ error: 'crm_unreachable' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
