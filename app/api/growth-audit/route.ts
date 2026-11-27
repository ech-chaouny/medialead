import { deliverLead } from '@/lib/lead-mail';
import { questions, isComplete, computeResult, axisLabels, categoryLabels, type Answers, type Category } from '@/lib/growth-audit';

/* Réception d'un lead du simulateur Growth Audit.
   Les champs sont validés ici et le résultat est recalculé à partir des réponses : les scores envoyés par
   le navigateur ne sont jamais utilisés. Le lead part par email (Resend) et/ou au CRM via
   GROWTH_AUDIT_WEBHOOK_URL (voir lib/lead-mail.ts) ; sans aucun canal, la route répond 503 et le
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

  let body: { contact?: Record<string, unknown>; answers?: Record<string, unknown>; attribution?: Record<string, unknown>; lang?: unknown };
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
    consent: 'acceptation à l’envoi (politique de confidentialité)',
    ...Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'landing_page', 'referrer', 'timestamp'].map(k => [k, clean(a[k], 500)])),
    received_at: new Date().toISOString(),
  };

  const utm = lead as Record<string, unknown> as Record<string, string>;
  return deliverLead({
    subject: `Growth Audit · ${lead.company || lead.name} · ${lead.simulator_primary_label}`,
    title: `Growth Audit : ${lead.name} (${lead.company})`,
    rows: [
      ['Nom', lead.name], ['Entreprise', lead.company], ['Email', lead.email], ['Téléphone', lead.phone], ['Site / app', lead.url],
      ['Résultat', lead.simulator_primary_label], ['Confiance', lead.simulator_confidence], ['Axes', lead.diagnostic_axes],
      ['Q1', lead.simulator_q1], ['Q2', lead.simulator_q2], ['Q3', lead.simulator_q3], ['Q4', lead.simulator_q4],
      ['Message', lead.message], ['À suivre par', lead.owner],
      ['Source', [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(' / ') || 'direct'],
      ['Page d’arrivée', utm.landing_page], ['Reçu le', lead.received_at],
    ],
    data: lead, webhookUrl: process.env.GROWTH_AUDIT_WEBHOOK_URL,
    contact: { name: lead.name, email: lead.email }, lang: body.lang,
  });
}
