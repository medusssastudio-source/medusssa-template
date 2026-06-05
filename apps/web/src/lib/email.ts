import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? 'hola@example.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Mi Sitio';
const BRAND_COLOR = process.env.NEXT_PUBLIC_BRAND_COLOR ?? '#4F46E5';

interface SendEmailOptions {
  to: string;
  subject: string;
  /** Título grande del header del email */
  heading: string;
  /** Subtítulo bajo el heading */
  subheading?: string;
  /** Cuerpo HTML (va dentro del card blanco) */
  bodyHtml: string;
  /** Texto pequeño al pie (folio, legal, etc.) */
  footerText?: string;
}

/**
 * Envía un email transaccional con el layout de marca.
 * El branding sale de env vars (SITE_NAME, BRAND_COLOR) — un solo template para todos los clientes.
 */
export async function sendEmail({
  to,
  subject,
  heading,
  subheading,
  bodyHtml,
  footerText,
}: SendEmailOptions) {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Inter,sans-serif;background:#FAFAF8;margin:0;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08)">
    <div style="background:${BRAND_COLOR};padding:32px 24px;text-align:center">
      <h1 style="color:#fff;font-size:24px;margin:0">${heading}</h1>
      ${subheading ? `<p style="color:rgba(255,255,255,.85);margin:8px 0 0;font-size:14px">${subheading}</p>` : ''}
    </div>
    <div style="padding:32px 24px">
      ${bodyHtml}
      ${footerText ? `<p style="color:#A8A8A8;font-size:13px;text-align:center;margin:24px 0 0">${footerText} · ${SITE_NAME}</p>` : ''}
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({ from: FROM, to, subject, html });
}
