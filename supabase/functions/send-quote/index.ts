// Supabase Edge Function: send-quote
// Envía por correo la cotización (precio) de una asesoría al cliente.
// Despliegue:
//   supabase functions deploy send-quote
//   supabase secrets set RESEND_API_KEY=xxx QUOTE_FROM_EMAIL="Teneduría García <no-reply@tudominio.com>"
//
// Requiere una cuenta en https://resend.com (u otro proveedor SMTP/API).

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('QUOTE_FROM_EMAIL') ?? 'Teneduría García <onboarding@resend.dev>'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface QuotePayload {
  to: string
  name: string
  service: string
  price: number
  currency: string
  lawyer?: string | null
}

function buildHtml(p: QuotePayload): string {
  const formattedPrice = `${new Intl.NumberFormat('es-ES').format(p.price)} ${p.currency}`
  return `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
    <div style="background:#0f2347; padding:28px 32px; border-radius:14px 14px 0 0; text-align:center;">
      <h1 style="color:#fff; font-size:20px; margin:0;">Teneduría García SURL</h1>
      <p style="color:#c9a24b; font-size:12px; letter-spacing:2px; margin:6px 0 0; text-transform:uppercase;">Soluciones Jurídicas y Contables</p>
    </div>
    <div style="border:1px solid #e2e8f0; border-top:0; border-radius:0 0 14px 14px; padding:32px;">
      <p style="font-size:15px;">Estimado/a <strong>${p.name}</strong>,</p>
      <p style="font-size:15px; line-height:1.6;">
        Gracias por contactar con nosotros. Hemos revisado su solicitud de
        <strong>${p.service}</strong> y le compartimos la cotización correspondiente:
      </p>
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; text-align:center; margin:24px 0;">
        <p style="margin:0; color:#64748b; font-size:13px;">Costo de la consulta</p>
        <p style="margin:8px 0 0; color:#0f2347; font-size:30px; font-weight:700;">${formattedPrice}</p>
      </div>
      ${p.lawyer ? `<p style="font-size:14px;">Abogado asignado: <strong>${p.lawyer}</strong></p>` : ''}
      <p style="font-size:14px; line-height:1.6; color:#475569;">
        Para continuar con el proceso o resolver cualquier duda, responda a este correo o
        contáctenos por WhatsApp Business. El pago puede realizarse mediante PayPal.
      </p>
      <p style="font-size:14px; margin-top:24px;">Atentamente,<br/><strong>Equipo de Teneduría García SURL</strong></p>
      <p style="font-size:12px; color:#94a3b8; border-top:1px solid #e2e8f0; padding-top:16px; margin-top:24px; font-style:italic;">
        "Tu derecho, nuestro compromiso."
      </p>
    </div>
  </div>`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('Falta configurar RESEND_API_KEY en los secretos de la función.')
    }

    const payload = (await req.json()) as QuotePayload
    if (!payload.to || !payload.name || payload.price == null) {
      return new Response(JSON.stringify({ error: 'Datos incompletos.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [payload.to],
        subject: `Cotización de su consulta — ${payload.service}`,
        html: buildHtml(payload),
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      throw new Error(`Error del proveedor de correo: ${detail}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
