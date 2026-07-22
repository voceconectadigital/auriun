import { Resend } from 'resend'

interface Env {
  RESEND_API_KEY: string
}

type FormType = 'contact' | 'quote_request'

type ContactPayload = {
  form_type: 'contact'
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type QuotePayload = {
  form_type: 'quote_request'
  name: string
  company: string
  email: string
  phone: string
  segment: string
  demandType: string
  message: string
}

type FormPayload = ContactPayload | QuotePayload

const TO_EMAIL = 'auriun@auriun.com.br'
const FROM_EMAIL = 'Auriun <auriun@auriun.com.br>'
const MAX_MESSAGE_LENGTH = 5000
const MAX_FIELD_LENGTH = 200

function json(data: unknown, status = 200, origin?: string | null): Response {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
  })
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Vary', 'Origin')
  }
  return new Response(JSON.stringify(data), { status, headers })
}

function allowedOrigin(request: Request): string | null {
  const origin = request.headers.get('Origin')
  if (!origin) return null
  try {
    const url = new URL(origin)
    const host = url.hostname
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.endsWith('.pages.dev') ||
      host === 'auriun.com.br' ||
      host.endsWith('.auriun.com.br')
    ) {
      return origin
    }
  } catch {
    return null
  }
  return null
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function asTrimmedString(value: unknown, max = MAX_FIELD_LENGTH): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > max) return null
  return trimmed
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254
}

function isPhoneDigits(value: string): boolean {
  return /^[0-9]{10,13}$/.test(value)
}

function parsePayload(body: unknown): { ok: true; data: FormPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Corpo da requisição inválido.' }
  }

  const raw = body as Record<string, unknown>
  const formType = raw.form_type

  if (formType !== 'contact' && formType !== 'quote_request') {
    return { ok: false, error: 'Tipo de formulário inválido.' }
  }

  const name = asTrimmedString(raw.name)
  const email = asTrimmedString(raw.email, 254)
  const phone = asTrimmedString(raw.phone, 20)
  const message = asTrimmedString(raw.message, MAX_MESSAGE_LENGTH)

  if (!name) return { ok: false, error: 'Informe um nome válido.' }
  if (!email || !isEmail(email)) return { ok: false, error: 'Informe um e-mail válido.' }
  if (!phone || !isPhoneDigits(phone.replace(/\D/g, ''))) {
    return { ok: false, error: 'Informe um telefone válido.' }
  }
  if (!message) return { ok: false, error: 'Informe uma mensagem válida.' }

  const phoneDigits = phone.replace(/\D/g, '')

  if (formType === 'contact') {
    const subject = asTrimmedString(raw.subject)
    if (!subject) return { ok: false, error: 'Informe um assunto válido.' }
    return {
      ok: true,
      data: {
        form_type: 'contact',
        name,
        email,
        phone: phoneDigits,
        subject,
        message,
      },
    }
  }

  const company = asTrimmedString(raw.company)
  const demandType = asTrimmedString(raw.demandType)
  const segmentRaw = typeof raw.segment === 'string' ? raw.segment.trim() : ''
  const segment = segmentRaw.length > MAX_FIELD_LENGTH ? null : segmentRaw

  if (!company) return { ok: false, error: 'Informe uma empresa válida.' }
  if (!demandType) return { ok: false, error: 'Informe o tipo de demanda.' }
  if (segment === null) return { ok: false, error: 'Segmento inválido.' }

  return {
    ok: true,
    data: {
      form_type: 'quote_request',
      name,
      company,
      email,
      phone: phoneDigits,
      segment: segment || 'Não informado',
      demandType,
      message,
    },
  }
}

function buildEmail(data: FormPayload): { subject: string; html: string; text: string } {
  if (data.form_type === 'contact') {
    const subject = `Contato — ${data.subject} — ${data.name}`
    const rows: Array<[string, string]> = [
      ['Tipo', 'Contato'],
      ['Nome', data.name],
      ['E-mail', data.email],
      ['Telefone', data.phone],
      ['Assunto', data.subject],
      ['Mensagem', data.message],
    ]
    return {
      subject,
      html: renderHtml(subject, rows),
      text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    }
  }

  const subject = `Orçamento — ${data.company || data.name}`
  const rows: Array<[string, string]> = [
    ['Tipo', 'Solicitação de orçamento'],
    ['Nome', data.name],
    ['Empresa', data.company],
    ['E-mail', data.email],
    ['Telefone', data.phone],
    ['Segmento', data.segment],
    ['Tipo de demanda', data.demandType],
    ['Mensagem', data.message],
  ]
  return {
    subject,
    html: renderHtml(subject, rows),
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
  }
}

function renderHtml(title: string, rows: Array<[string, string]>): string {
  const body = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-weight:600;vertical-align:top;width:160px;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap;">
          ${escapeHtml(value)}
        </td>
      </tr>`,
    )
    .join('')

  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#111827;">
      <h1 style="font-size:18px;margin:0 0 16px;">${escapeHtml(title)}</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e7eb;">
        ${body}
      </table>
    </div>
  `
}

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  const origin = allowedOrigin(context.request)
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  })
  if (origin) headers.set('Access-Control-Allow-Origin', origin)
  return new Response(null, { status: 204, headers })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = allowedOrigin(context.request)

  if (!context.env.RESEND_API_KEY) {
    return json(
      { ok: false, error: 'Serviço de e-mail temporariamente indisponível.' },
      503,
      origin,
    )
  }

  let body: unknown
  try {
    body = await context.request.json()
  } catch {
    return json({ ok: false, error: 'JSON inválido.' }, 400, origin)
  }

  const parsed = parsePayload(body)
  if (!parsed.ok) {
    return json({ ok: false, error: parsed.error }, 400, origin)
  }

  const email = buildEmail(parsed.data)
  const resend = new Resend(context.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: parsed.data.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
  })

  if (error) {
    console.error('Resend error:', error.message)
    return json(
      { ok: false, error: 'Não foi possível enviar sua mensagem. Tente novamente em instantes.' },
      502,
      origin,
    )
  }

  return json({ ok: true }, 200, origin)
}
