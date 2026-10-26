import { questions, isComplete, computeResult, axisLabels, categoryLabels, type Answers, type Category } from '@/lib/growth-audit';

/* Réception d'un lead du simulateur Growth Audit.
   Les champs sont validés ici et le résultat est recalculé à partir des réponses : les scores envoyés par
   le navigateur ne sont jamais utilisés. Le lead est transmis au CRM via GROWTH_AUDIT_WEBHOOK_URL
   (Make, Zapier, HubSpot…) ; tant que cette variable n'est pas définie, la route répond 503 et le
   formulaire n'affiche pas de confirmation. */

const owners: Record<Category, string> = {
  product_launch: 'Zakaria + Ismail',
  app_growth: 'Zakaria + Hanane (+ Ismail si besoin produit)',
  product_takeover: 'Ismail + Zakaria',
  digital_transformation: 'Zakaria + Hanane',
  audit_first: 'Zakaria',
};

// Limite simple par IP (mémoire de l'instance : un garde-fou, pas une protection complète).
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

  let body: { contact?: Record<string, unknown>; answers?: Record<string, unknown>; attribution?: Record<string, unknown> };
  try { body = await request.json(); } catch { return Response.json({ error: 'invalid_json' }, { status: 400 }); }

  const c = body.contact ?? {};
  // Champ piège : rempli uniquement par les robots. On répond comme un succès sans rien transmettre.
  if (clean(c.website_hp, 200)) return Response.json({ ok: true });

  const contact = {
    name: clean(c.name, 120), company: clean(c.company, 120), email: clean(c.email, 160).toLowerCase(),
    phone: clean(c.phone, 20), url: clean(c.url, 300), message: clean(c.message, 1000),
  };
  const errors = [
    !contact.name && 'name', !contact.company && 'company',
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email) && 'email',
    !/^[+0-9 ().-]{8,20}$/.test(contact.phone) && 'phone',
    contact.url && !/^https?:\/\/\S+$/i.test(contact.url) && 'url',
    c.consent !== 'yes' && 'consent',
  ].filter(Boolean);

  const answers: Answers = {};
  for (const q of questions) {
    const id = body.answers?.[q.id];
    if (typeof id === 'string' && q.options.some(o => o.id === id)) answers[q.id] = id;
  }
  if (!isComplete(answers)) errors.push('answers');
  if (errors.length || !isComplete(answers)) return Response.json({ error: 'invalid_fields', fields: errors }, { status: 400 });

  const result = computeResult(answers);
  const a = body.attribution ?? {};
  const label = (qi: number) => questions[qi].options.find(o => o.id === answers[questions[qi].id])?.label ?? '';
  const lead = {
    ...contact,
    simulator_primary_result: result.primary,
    simulator_primary_label: categoryLabels[result.primary],
    simulator_secondary_result: result.secondary ?? '',
    simulator_confidence: result.confidence,
    simulator_q1: label(0), simulator_q2: label(1), simulator_q3: label(2), simulator_q4: label(3),
    score_product_launch: result.scores.product_launch,
    score_app_growth: result.scores.app_growth,
    score_product_takeover: result.scores.product_takeover,
    score_digital_transformation: result.scores.digital_transformation,
    score_audit_first: result.scores.audit_first,
    diagnostic_axes: result.axes.map(x => axisLabels[x]).join(', '),
    owner: owners[result.primary],
    ...Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'landing_page', 'referrer', 'timestamp'].map(k => [k, clean(a[k], 500)])),
    received_at: new Date().toISOString(),
  };

  const webhook = process.env.GROWTH_AUDIT_WEBHOOK_URL;
  if (!webhook) return Response.json({ error: 'crm_not_configured' }, { status: 503 });
  try {
    const res = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    if (!res.ok) return Response.json({ error: 'crm_error' }, { status: 502 });
  } catch {
    return Response.json({ error: 'crm_unreachable' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
