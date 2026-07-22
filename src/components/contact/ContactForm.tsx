import { useId, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ChoiceGroup, Field, inputClass, textareaClass } from '@/components/contact/FormControls'
import {
  emailErrorMessage,
  formatBrMobileDisplay,
  isCompleteBrMobile,
  PHONE_ERROR,
  phoneDigitsOnly,
  validateEmail,
} from '@/lib/formValidation'
import { submitContactForm } from '@/lib/submitContactForm'

const SUBJECT_OPTIONS = [
  { value: 'Dúvida geral', label: 'Dúvida geral' },
  { value: 'Comercial', label: 'Comercial' },
  { value: 'Fornecedor', label: 'Fornecedor' },
  { value: 'Parcerias', label: 'Parcerias' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'Outro', label: 'Outro' },
]

type FormState = {
  name: string
  email: string
  phoneDisplay: string
  phoneDigits: string
  subject: string
  message: string
}

const initial: FormState = {
  name: '',
  email: '',
  phoneDisplay: '',
  phoneDigits: '',
  subject: '',
  message: '',
}

type FieldErrors = {
  email?: string | null
  phone?: string | null
  subject?: string | null
  name?: string | null
  message?: string | null
}

/**
 * Institutional contact form.
 * Delivery: Cloudflare Pages Function + Resend (server-side RESEND_API_KEY).
 */
export function ContactForm() {
  const baseId = useId()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [statusKind, setStatusKind] = useState<'idle' | 'success' | 'error'>('idle')

  function setEmail(value: string) {
    setForm((prev) => ({ ...prev, email: value }))
    if (touched.email || errors.email) {
      const err = validateEmail(value)
      setErrors((prev) => ({ ...prev, email: emailErrorMessage(err) }))
    }
  }

  function setPhone(raw: string) {
    const digits = phoneDigitsOnly(raw)
    const display = formatBrMobileDisplay(digits)
    setForm((prev) => ({ ...prev, phoneDigits: digits, phoneDisplay: display }))
    if (touched.phone || errors.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: isCompleteBrMobile(digits) ? null : PHONE_ERROR,
      }))
    }
  }

  function validateAll(): FieldErrors {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = 'Informe seu nome.'
    const emailErr = validateEmail(form.email)
    next.email = emailErrorMessage(emailErr)
    next.phone = isCompleteBrMobile(form.phoneDigits) ? null : PHONE_ERROR
    if (!form.subject) next.subject = 'Selecione um assunto.'
    if (!form.message.trim()) next.message = 'Escreva sua mensagem.'
    return next
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return

    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    const next = validateAll()
    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      setStatus('')
      setStatusKind('idle')
      return
    }

    setLoading(true)
    setStatus('Enviando...')
    setStatusKind('idle')

    const result = await submitContactForm({
      form_type: 'contact',
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phoneDigits,
      subject: form.subject,
      message: form.message.trim(),
    })

    if (result.ok) {
      setForm(initial)
      setErrors({})
      setTouched({})
      setStatus('Mensagem enviada com sucesso. Em breve entraremos em contato.')
      setStatusKind('success')
    } else {
      setStatus(result.error)
      setStatusKind('error')
    }

    setLoading(false)
  }

  const emailErrorId = `${baseId}-email-error`
  const phoneErrorId = `${baseId}-phone-error`
  const subjectErrorId = `${baseId}-subject-error`

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input type="hidden" name="form_type" value="contact" />

      <Field
        label="Nome"
        htmlFor={`${baseId}-name`}
        required
        error={touched.name ? errors.name : null}
      >
        <input
          id={`${baseId}-name`}
          name="name"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          onBlur={() => {
            setTouched((t) => ({ ...t, name: true }))
            setErrors((prev) => ({
              ...prev,
              name: form.name.trim() ? null : 'Informe seu nome.',
            }))
          }}
          className={inputClass}
          aria-invalid={touched.name && errors.name ? true : undefined}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="E-mail"
          htmlFor={`${baseId}-email`}
          required
          error={touched.email ? errors.email : null}
          errorId={emailErrorId}
        >
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, email: true }))
              setErrors((prev) => ({
                ...prev,
                email: emailErrorMessage(validateEmail(form.email)),
              }))
            }}
            className={inputClass}
            aria-invalid={touched.email && errors.email ? true : undefined}
            aria-describedby={touched.email && errors.email ? emailErrorId : undefined}
          />
        </Field>

        <Field
          label="Telefone"
          htmlFor={`${baseId}-phone`}
          required
          error={touched.phone ? errors.phone : null}
          errorId={phoneErrorId}
        >
          <input
            id={`${baseId}-phone`}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            value={form.phoneDisplay}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => {
              setTouched((t) => ({ ...t, phone: true }))
              setErrors((prev) => ({
                ...prev,
                phone: isCompleteBrMobile(form.phoneDigits) ? null : PHONE_ERROR,
              }))
            }}
            className={inputClass}
            placeholder="(31) 99999-9999"
            aria-invalid={touched.phone && errors.phone ? true : undefined}
            aria-describedby={touched.phone && errors.phone ? phoneErrorId : undefined}
          />
          <input type="hidden" name="phone_digits" value={form.phoneDigits} />
        </Field>
      </div>

      <ChoiceGroup
        legend="Assunto"
        name="subject"
        layout="fluid"
        options={SUBJECT_OPTIONS}
        value={form.subject}
        required
        error={touched.subject ? errors.subject : null}
        errorId={subjectErrorId}
        onChange={(value) => {
          setForm((p) => ({ ...p, subject: value }))
          setTouched((t) => ({ ...t, subject: true }))
          setErrors((prev) => ({
            ...prev,
            subject: value ? null : 'Selecione um assunto.',
          }))
        }}
      />

      <Field
        label="Mensagem"
        htmlFor={`${baseId}-message`}
        required
        error={touched.message ? errors.message : null}
      >
        <textarea
          id={`${baseId}-message`}
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          onBlur={() => {
            setTouched((t) => ({ ...t, message: true }))
            setErrors((prev) => ({
              ...prev,
              message: form.message.trim() ? null : 'Escreva sua mensagem.',
            }))
          }}
          className={textareaClass}
          placeholder="Escreva sua dúvida ou informe como podemos ajudar."
          aria-invalid={touched.message && errors.message ? true : undefined}
        />
      </Field>

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          variant="secondary"
          className="form-submit form-submit--blue min-h-[54px] w-full font-bold sm:w-auto"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar mensagem'}
          {!loading ? <Send className="size-4" aria-hidden /> : null}
        </Button>
        <p
          className={
            status
              ? statusKind === 'error'
                ? 'mt-3 text-sm text-red-700'
                : 'mt-3 text-sm text-brand-navy'
              : 'sr-only'
          }
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
      </div>
    </form>
  )
}
