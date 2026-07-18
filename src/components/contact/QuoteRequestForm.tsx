import { useId, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ChoiceGroup, Field, inputClass } from '@/components/contact/FormControls'
import { CONTACT, hasValue, mailHref, whatsappUrl } from '@/data/site'
import {
  emailErrorMessage,
  formatBrMobileDisplay,
  isCompleteBrMobile,
  PHONE_ERROR,
  phoneDigitsOnly,
  validateEmail,
} from '@/lib/formValidation'

const SEGMENT_OPTIONS = [
  { value: 'Mineração', label: 'Mineração' },
  { value: 'Óleo e Gás', label: 'Óleo e Gás' },
  { value: 'Papel e Celulose', label: 'Papel e Celulose' },
  { value: 'Siderurgia', label: 'Siderurgia' },
  { value: 'Energia', label: 'Energia' },
  { value: 'Saneamento', label: 'Saneamento' },
  { value: 'Infraestrutura', label: 'Infraestrutura' },
  { value: 'Construção Industrial', label: 'Construção Industrial' },
  { value: 'Manufatura', label: 'Manufatura' },
  { value: 'Agronegócio', label: 'Agronegócio' },
  { value: 'Química e Petroquímica', label: 'Química e Petroquímica' },
  { value: 'Outro', label: 'Outro' },
]

const DEMAND_OPTIONS = [
  { value: 'Produtos', label: 'Produtos' },
  { value: 'Serviços', label: 'Serviços' },
  { value: 'MRO', label: 'MRO' },
  { value: 'CAPEX', label: 'CAPEX' },
  { value: 'OPEX', label: 'OPEX' },
  { value: 'Material especial', label: 'Material especial' },
  { value: 'Não tenho certeza', label: 'Não tenho certeza' },
]

type FormState = {
  name: string
  company: string
  email: string
  phoneDisplay: string
  phoneDigits: string
  segment: string
  demandType: string
  message: string
}

const initial: FormState = {
  name: '',
  company: '',
  email: '',
  phoneDisplay: '',
  phoneDigits: '',
  segment: '',
  demandType: '',
  message: '',
}

type FieldErrors = {
  name?: string | null
  company?: string | null
  email?: string | null
  phone?: string | null
  demandType?: string | null
  message?: string | null
}

/**
 * Commercial quote-request form.
 * Delivery: opens WhatsApp or mailto when configured — no false "sent" success.
 * Pending: real backend/webhook not wired; see agent report.
 */
export function QuoteRequestForm() {
  const baseId = useId()
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  function setEmail(value: string) {
    setForm((prev) => ({ ...prev, email: value }))
    if (touched.email || errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: emailErrorMessage(validateEmail(value)),
      }))
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
    if (!form.company.trim()) next.company = 'Informe a empresa.'
    next.email = emailErrorMessage(validateEmail(form.email))
    next.phone = isCompleteBrMobile(form.phoneDigits) ? null : PHONE_ERROR
    if (!form.demandType) next.demandType = 'Selecione o tipo de demanda.'
    if (!form.message.trim()) next.message = 'Descreva a necessidade.'
    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return

    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      demandType: true,
      message: true,
    })
    const next = validateAll()
    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      setStatus('')
      return
    }

    setLoading(true)
    setStatus('Enviando...')

    const body = [
      `form_type: quote_request`,
      `Nome: ${form.name.trim()}`,
      `Empresa: ${form.company.trim()}`,
      `E-mail: ${form.email.trim()}`,
      `Telefone: ${form.phoneDigits}`,
      `Segmento: ${form.segment || 'Não informado'}`,
      `Tipo de demanda: ${form.demandType}`,
      '',
      form.message.trim(),
    ].join('\n')

    const wa = whatsappUrl(`Solicitação de orçamento — Auriun\n\n${body}`)
    const mail = mailHref()

    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
      setStatus('')
      setForm(initial)
      setErrors({})
      setTouched({})
    } else if (mail && hasValue(CONTACT.email)) {
      const subject = encodeURIComponent(
        `Orçamento — ${form.company.trim() || form.name.trim()}`,
      )
      window.location.href = `${mail}?subject=${subject}&body=${encodeURIComponent(body)}`
      setStatus('')
    } else {
      setStatus('')
    }

    setLoading(false)
  }

  const emailErrorId = `${baseId}-email-error`
  const phoneErrorId = `${baseId}-phone-error`
  const demandErrorId = `${baseId}-demand-error`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="hidden" name="form_type" value="quote_request" />

      <div className="grid gap-4 sm:grid-cols-2">
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

        <Field
          label="Empresa"
          htmlFor={`${baseId}-company`}
          required
          error={touched.company ? errors.company : null}
        >
          <input
            id={`${baseId}-company`}
            name="company"
            required
            autoComplete="organization"
            value={form.company}
            onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
            onBlur={() => {
              setTouched((t) => ({ ...t, company: true }))
              setErrors((prev) => ({
                ...prev,
                company: form.company.trim() ? null : 'Informe a empresa.',
              }))
            }}
            className={inputClass}
            aria-invalid={touched.company && errors.company ? true : undefined}
          />
        </Field>

        <Field
          label="E-mail corporativo"
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
          label="Telefone / WhatsApp"
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
        legend="Segmento / área"
        name="segment"
        options={SEGMENT_OPTIONS}
        value={form.segment}
        optional
        onChange={(value) => setForm((p) => ({ ...p, segment: value }))}
      />

      <ChoiceGroup
        legend="Tipo de demanda"
        name="demandType"
        options={DEMAND_OPTIONS}
        value={form.demandType}
        required
        error={touched.demandType ? errors.demandType : null}
        errorId={demandErrorId}
        onChange={(value) => {
          setForm((p) => ({ ...p, demandType: value }))
          setTouched((t) => ({ ...t, demandType: true }))
          setErrors((prev) => ({
            ...prev,
            demandType: value ? null : 'Selecione o tipo de demanda.',
          }))
        }}
      />

      <Field
        label="Descrição da necessidade"
        htmlFor={`${baseId}-message`}
        required
        error={touched.message ? errors.message : null}
      >
        <textarea
          id={`${baseId}-message`}
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          onBlur={() => {
            setTouched((t) => ({ ...t, message: true }))
            setErrors((prev) => ({
              ...prev,
              message: form.message.trim() ? null : 'Descreva a necessidade.',
            }))
          }}
          className={`${inputClass} resize-y`}
          placeholder="Produtos, serviços, prazo desejado, lista de materiais ou contexto do projeto."
          aria-invalid={touched.message && errors.message ? true : undefined}
        />
      </Field>

      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="form-submit form-submit--orange min-h-[54px] w-full font-bold sm:w-auto"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Solicitar orçamento'}
          {!loading ? <Send className="size-4" aria-hidden /> : null}
        </Button>
        <p className="sr-only" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  )
}
