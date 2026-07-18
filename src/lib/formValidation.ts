/** Brazilian mobile: DDD + 9 + 8 digits. Strips +55 on paste. */

export function phoneDigitsOnly(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length > 11) {
    digits = digits.slice(2)
  }
  return digits.slice(0, 11)
}

/** Progressive mask: (31) 99999-9999 */
export function formatBrMobileDisplay(raw: string): string {
  const d = phoneDigitsOnly(raw)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function isCompleteBrMobile(digits: string): boolean {
  return /^\d{11}$/.test(digits) && digits[2] === '9'
}

export const PHONE_ERROR = 'Informe um celular com DDD e 9 dígitos.'

export type EmailError = 'empty' | 'invalid' | null

export function validateEmail(raw: string): EmailError {
  const value = raw.trim()
  if (!value) return 'empty'
  if (/\s/.test(value)) return 'invalid'
  // Practical format check — not overly restrictive
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)) return 'invalid'
  return null
}

export function emailErrorMessage(error: EmailError): string | null {
  if (error === 'empty') return 'Informe seu e-mail.'
  if (error === 'invalid') {
    return 'Digite um e-mail válido, como nome@empresa.com.br.'
  }
  return null
}
