export type ContactSubmitPayload = {
  form_type: 'contact'
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type QuoteSubmitPayload = {
  form_type: 'quote_request'
  name: string
  company: string
  email: string
  phone: string
  segment: string
  demandType: string
  message: string
}

export type FormSubmitPayload = ContactSubmitPayload | QuoteSubmitPayload

type SubmitResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Client-side helper — posts form data to the Cloudflare Pages Function.
 * Never reads or embeds RESEND_API_KEY (server-only via env.RESEND_API_KEY).
 */
export async function submitContactForm(
  payload: FormSubmitPayload,
): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let data: { ok?: boolean; error?: string } | null = null
    try {
      data = (await response.json()) as { ok?: boolean; error?: string }
    } catch {
      data = null
    }

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error:
          data?.error ||
          'Não foi possível enviar sua mensagem. Tente novamente em instantes.',
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      error:
        'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
    }
  }
}
