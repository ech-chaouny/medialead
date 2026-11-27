import { site } from './site';

/* Livraison d'un lead : email à l'équipe via Resend (RESEND_API_KEY), et/ou webhook CRM (Make, Zapier, Sheets…).
   La demande est acceptée si au moins un canal a fonctionné. Un accusé de réception est envoyé au prospect
   (sans bloquer la réponse s'il échoue). Sans aucun canal configuré : 503, le formulaire n'affiche pas de confirmation.

   Variables Vercel :
   - RESEND_API_KEY  clé API Resend (domaine medialead.ma vérifié dans Resend)
   - LEADS_TO        destinataires, séparés par des virgules (défaut : contact@medialead.ma)
   - LEADS_FROM      expéditeur (défaut : Medialead <contact@medialead.ma>) */

type Lang = 'fr' | 'en';
export type Row = [string, string | number | undefined];

const esc = (v: unknown) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const FROM = () => process.env.LEADS_FROM || `Medialead <${site.email}>`;
const TO = () => (process.env.LEADS_TO || site.email).split(',').map(s => s.trim()).filter(Boolean);

async function resend(payload: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM(), ...payload }),
    });
    return res.ok;
  } catch { return false; }
}

async function webhook(url: string | undefined, data: Record<string, unknown>) {
  if (!url) return false;
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    return res.ok;
  } catch { return false; }
}

/* Gabarit commun : carte blanche, bandeau noir au logo texte, accent orange Medialead. */
function layout(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f2ee;font-family:Helvetica,Arial,sans-serif;color:#16120e">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2ee;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #efe8e1">
<tr><td style="background:#16120e;padding:22px 28px;font-size:20px;font-weight:700;color:#ffffff">Media<span style="color:#FF8B00">Lead</span></td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 18px;font-size:21px;line-height:1.3;color:#16120e">${esc(title)}</h1>
${inner}
</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #efe8e1;font-size:12px;color:#9a918a">Medialead · ${esc(site.address)} · ${esc(site.phone)}</td></tr>
</table></td></tr></table></body></html>`;
}

const table = (rows: Row[]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${rows
  .filter(([, v]) => v !== undefined && v !== '')
  .map(([k, v]) => `<tr><td style="padding:9px 12px 9px 0;border-bottom:1px solid #f3ede6;color:#8a8178;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:9px 0;border-bottom:1px solid #f3ede6;color:#16120e;white-space:pre-wrap">${esc(v)}</td></tr>`)
  .join('')}</table>`;

const ack = {
  fr: {
    subject: 'Nous avons bien reçu votre demande · Medialead',
    title: (n: string) => `Merci ${n}, votre demande est bien reçue.`,
    body: 'Notre équipe l’étudie et revient vers vous sous 24 h ouvrées pour en discuter. Si c’est urgent, écrivez-nous sur WhatsApp ou appelez-nous.',
    sign: 'L’équipe Medialead',
  },
  en: {
    subject: 'We have received your request · Medialead',
    title: (n: string) => `Thank you ${n}, we have received your request.`,
    body: 'Our team is reviewing it and will get back to you within 24 business hours. If it is urgent, message us on WhatsApp or give us a call.',
    sign: 'The Medialead team',
  },
};

export async function deliverLead(opts: {
  subject: string; title: string; rows: Row[]; data: Record<string, unknown>;
  webhookUrl?: string; contact: { name: string; email: string }; lang?: unknown;
}) {
  const lang: Lang = opts.lang === 'en' ? 'en' : 'fr';
  const hasMail = !!process.env.RESEND_API_KEY;
  if (!hasMail && !opts.webhookUrl) return Response.json({ error: 'crm_not_configured' }, { status: 503 });

  const [mailed, hooked] = await Promise.all([
    hasMail ? resend({ to: TO(), reply_to: opts.contact.email, subject: opts.subject, html: layout(opts.title, table(opts.rows)) }) : false,
    webhook(opts.webhookUrl, opts.data),
  ]);
  if (!mailed && !hooked) return Response.json({ error: 'crm_error' }, { status: 502 });

  // Accusé de réception au prospect : ne bloque pas la confirmation s'il échoue.
  if (hasMail && opts.contact.email) {
    const t = ack[lang];
    const first = opts.contact.name.split(' ')[0];
    await resend({
      to: [opts.contact.email], reply_to: site.email, subject: t.subject,
      html: layout(t.title(first), `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#4a443e">${esc(t.body)}</p>
<p style="margin:0 0 22px;font-size:15px;color:#4a443e">${esc(t.sign)}</p>
<a href="https://www.medialead.ma${lang === 'en' ? '/en' : ''}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:#FF8B00;color:#16120e;font-weight:700;font-size:14px;text-decoration:none">medialead.ma</a>`),
    });
  }
  return Response.json({ ok: true });
}
