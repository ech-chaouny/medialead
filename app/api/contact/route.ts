import { needs, stages, budgets, timelines, labelOf, DESCRIPTION_MAX } from '@/lib/qualification';
import { deliverLead, type Row } from '@/lib/lead-mail';

/* Réception d'une demande « Parlons de votre projet », ou d'un formulaire court (accueil, /services-terrain).
   Validation serveur de chaque champ, piège à robots, limite par IP, puis envoi par email (Resend)
   et/ou au CRM via CONTACT_WEBHOOK_URL (voir lib/lead-mail.ts). Sans aucun canal : 503, et le
   formulaire n'affiche pas de confirmation. Pas de case à cocher : l'envoi vaut acceptation. */

const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f<>]/g, ' ').trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+0-9 ().-]{8,20}$/;
const CONSENT = 'acceptation à l’envoi (politique de confidentialité)';
const ATTRIBUTION = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'landing_page', 'referrer', 'timestamp'];

const attributionOf = (body: Record<string, unknown>): Record<string, string> => {
  const a = (body.attribution ?? {}) as Record<string, unknown>;
  return Object.fromEntries(ATTRIBUTION.map(k => [k, clean(a[k], 500)]));
};
const source = (a: Record<string, string>) => [a.utm_source, a.utm_campaign].filter(Boolean).join(' / ') || 'direct';

/* Email à l'équipe (+ accusé de réception au prospect) et/ou webhook CRM. */
function forward(payload: Record<string, unknown>, lang: unknown) {
  const p = payload as Record<string, string>;
  const rows: Row[] = [
    ['Nom', p.name], ['Entreprise', p.company], ['Email', p.email], ['Téléphone', p.phone], ['Site / app', p.url],
    ['Besoin', p.need_label], ['Stade', p.stage], ['Budget', p.project_budget], ['Délai', p.timeline],
    ['Secteur', p.sector], ['Ville', p.city], ['Description', p.description],
    ['Source', [p.utm_source, p.utm_medium, p.utm_campaign].filter(Boolean).join(' / ') || 'direct'],
    ['Page d’arrivée', p.landing_page], ['Référent', p.referrer], ['Reçu le', p.received_at],
  ];
  return deliverLead({
    subject: `Nouveau lead · ${p.company || p.name} · ${p.need_label || p.form}`,
    title: `Nouvelle demande de ${p.name} (${p.company})`,
    rows, data: payload, webhookUrl: process.env.CONTACT_WEBHOOK_URL,
    contact: { name: p.name, email: p.email }, lang,
  });
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (limited(ip)) return Response.json({ error: 'too_many_requests' }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid_json' }, { status: 400 }); }
  if (clean(body.website_hp, 200)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name, 120), company: clean(body.company, 120), email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 20), url: clean(body.url, 300), description: clean(body.description, DESCRIPTION_MAX),
  };
  const attribution = attributionOf(body);

  // Formulaires courts : coordonnées et contexte minimal (email facultatif ; secteur et ville sur la landing terrain).
  if (body.form === 'quick' || body.form === 'terrain') {
    const terrain = body.form === 'terrain';
    const sector = clean(body.sector, 80), city = clean(body.city, 80);
    const missing = [
      !lead.name && 'name', !lead.company && 'company', !PHONE.test(lead.phone) && 'phone',
      lead.email && !EMAIL.test(lead.email) && 'email',
      terrain && !sector && 'sector', terrain && !city && 'city',
    ].filter(Boolean);
    if (missing.length) return Response.json({ error: 'invalid_fields', fields: missing }, { status: 400 });
    const form = terrain ? 'services_terrain' : 'contact_court';
    return forward({
      ...lead, sector, city, form, consent: CONSENT, ...attribution,
      summary: [form, sector, city, source(attribution)].filter(Boolean).join(' | '),
      received_at: new Date().toISOString(),
    }, body.lang);
  }

  // need_type : 1 à 3 besoins distincts.
  const needIds = Array.isArray(body.need_type) ? [...new Set(body.need_type.filter((x): x is string => typeof x === 'string'))] : [];
  const needList = needIds.map(id => labelOf(needs, id)).filter((n): n is NonNullable<typeof n> => !!n);
  const need = needList.length >= 1 && needList.length <= 3 && needList.length === needIds.length && !(needIds.includes('unknown') && needIds.length > 1) ? needList : null;
  const stage = labelOf(stages, body.stage);
  const budget = labelOf(budgets, body.project_budget);
  const timeline = labelOf(timelines, body.timeline);

  const fields = [
    !need && 'need_type', !stage && 'stage', !budget && 'project_budget', !timeline && 'timeline',
    !lead.name && 'name', !lead.company && 'company',
    !EMAIL.test(lead.email) && 'email',
    !PHONE.test(lead.phone) && 'phone',
    lead.url && !/^https?:\/\/\S+$/i.test(lead.url) && 'url',
    !lead.description && 'description',
  ].filter(Boolean);
  if (fields.length || !need || !stage || !budget || !timeline) return Response.json({ error: 'invalid_fields', fields }, { status: 400 });

  return forward({
    ...lead,
    form: 'qualification',
    need_type: need.map(n => n.internal).join(', '), need_label: need.map(n => n.label).join(' ; '),
    stage: stage.label, project_budget: budget.label, timeline: timeline.label,
    consent: CONSENT,
    ...attribution,
    // Fiche lisible pour le suivi commercial : « App Growth | Produit déjà lancé | 50 000 - 100 000 MAD | Dans 1 mois | linkedin / campagne ».
    summary: [need.map(n => n.internal).join(' + '), stage.label, budget.label, timeline.label, source(attribution)].join(' | '),
    received_at: new Date().toISOString(),
  }, body.lang);
}
