import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ChoiceGroup, Field, inputClass, textareaClass } from '@/components/contact/FormControls'
import { CONTACT, hasValue, isPublicContact, mailHref, whatsappUrl } from '@/data/site'
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

const SCOPE_HINTS = [
  'Produto, serviço ou aplicação',
  'Quantidade ou dimensão',
  'Especificação técnica disponível',
  'Prazo ou criticidade',
  'Local de entrega ou operação',
  'Marcas de referência (se houver)',
]

const WIZARD_STEPS = [
  {
    id: 1 as const,
    label: 'Identificação',
    title: 'Seus dados de contato',
    text: 'Informe quem devemos procurar para dar continuidade à solicitação.',
  },
  {
    id: 2 as const,
    label: 'Operação',
    title: 'Sobre a sua operação',
    text: 'Selecione o segmento que melhor representa a sua empresa ou área de atuação.',
  },
  {
    id: 3 as const,
    label: 'Demanda',
    title: 'Detalhes da solicitação',
    text: 'Conte o que precisa ser cotado e compartilhe as informações disponíveis.',
  },
  {
    id: 4 as const,
    label: 'Revisão',
    title: 'Revise sua solicitação',
    text: 'Confira os dados antes de encaminhar a demanda para análise comercial.',
  },
]

type StepId = (typeof WIZARD_STEPS)[number]['id']

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

type FieldKey = keyof FieldErrors

const STEP_FIELDS: Record<StepId, FieldKey[]> = {
  1: ['name', 'company', 'email', 'phone'],
  2: [],
  3: ['demandType', 'message'],
  4: ['name', 'company', 'email', 'phone', 'demandType', 'message'],
}

const FIELD_FOCUS_IDS: Record<FieldKey, string> = {
  name: 'name',
  company: 'company',
  email: 'email',
  phone: 'phone',
  demandType: 'demand',
  message: 'message',
}

const CONFIG_MESSAGE =
  'O canal de envio ainda precisa ser configurado. Sua solicitação não foi enviada. Entre em contato pelos canais oficiais quando estiverem disponíveis.'

function stepStateFor(
  id: StepId,
  current: StepId,
  highestReached: StepId,
): 'current' | 'completed' | 'future' {
  if (id === current) return 'current'
  if (id <= highestReached) return 'completed'
  return 'future'
}

/**
 * Commercial quote-request wizard (4 steps).
 * Delivery: opens WhatsApp or mailto when public contacts are configured — no false "sent" success.
 */
export function QuoteRequestForm() {
  const baseId = useId()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [step, setStep] = useState<StepId>(1)
  const [highestReached, setHighestReached] = useState<StepId>(1)
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [transitionKey, setTransitionKey] = useState(0)

  const current = WIZARD_STEPS[step - 1]
  const channelsReady = isPublicContact()

  useEffect(() => {
    const preferReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const focusTimer = window.setTimeout(
      () => {
        titleRef.current?.focus()
      },
      preferReduced ? 0 : 40,
    )

    return () => window.clearTimeout(focusTimer)
  }, [step])

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

  function validateFields(keys: FieldKey[]): FieldErrors {
    const next: FieldErrors = {}
    for (const key of keys) {
      if (key === 'name') next.name = form.name.trim() ? null : 'Informe seu nome.'
      if (key === 'company') next.company = form.company.trim() ? null : 'Informe a empresa.'
      if (key === 'email') next.email = emailErrorMessage(validateEmail(form.email))
      if (key === 'phone') {
        next.phone = isCompleteBrMobile(form.phoneDigits) ? null : PHONE_ERROR
      }
      if (key === 'demandType') {
        next.demandType = form.demandType ? null : 'Selecione o tipo de demanda.'
      }
      if (key === 'message') {
        next.message = form.message.trim() ? null : 'Descreva a necessidade.'
      }
    }
    return next
  }

  function focusFirstInvalid(next: FieldErrors, keys: FieldKey[]) {
    for (const key of keys) {
      if (!next[key]) continue
      const el = document.getElementById(`${baseId}-${FIELD_FOCUS_IDS[key]}`)
      if (el instanceof HTMLElement) {
        el.focus()
        return
      }
    }
  }

  function goToStep(nextStep: StepId) {
    setStep(nextStep)
    setHighestReached((prev) => (nextStep > prev ? nextStep : prev))
    setTransitionKey((k) => k + 1)
    setStatus('')
  }

  function handleContinue() {
    const keys = STEP_FIELDS[step]
    if (keys.length) {
      const touchUpdate: Record<string, boolean> = {}
      for (const key of keys) touchUpdate[key] = true
      setTouched((t) => ({ ...t, ...touchUpdate }))
      const next = validateFields(keys)
      setErrors((prev) => ({ ...prev, ...next }))
      if (Object.values(next).some(Boolean)) {
        focusFirstInvalid(next, keys)
        return
      }
    }
    if (step < 4) goToStep((step + 1) as StepId)
  }

  function handleBack() {
    if (step <= 1) return
    goToStep((step - 1) as StepId)
  }

  function handleSidebarSelect(target: StepId) {
    if (target === step) return
    if (target > highestReached) return
    goToStep(target)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return

    const keys = STEP_FIELDS[4]
    const touchUpdate: Record<string, boolean> = {}
    for (const key of keys) touchUpdate[key] = true
    setTouched((t) => ({ ...t, ...touchUpdate }))
    const next = validateFields(keys)
    setErrors(next)
    if (Object.values(next).some(Boolean)) {
      setStatus('')
      const firstInvalidStep = (
        ['name', 'company', 'email', 'phone'].some((k) => next[k as FieldKey])
          ? 1
          : ['demandType', 'message'].some((k) => next[k as FieldKey])
            ? 3
            : 4
      ) as StepId
      if (firstInvalidStep !== step) goToStep(firstInvalidStep)
      window.setTimeout(() => focusFirstInvalid(next, keys), 50)
      return
    }

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

    const wa = channelsReady ? whatsappUrl(`Solicitação de orçamento — Auriun\n\n${body}`) : null
    const mail = channelsReady ? mailHref() : null

    if (!wa && !(mail && hasValue(CONTACT.email))) {
      setStatus(CONFIG_MESSAGE)
      return
    }

    setLoading(true)
    setStatus('Abrindo canal de envio…')

    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
      setStatus('')
      setForm(initial)
      setErrors({})
      setTouched({})
      setStep(1)
      setHighestReached(1)
      setTransitionKey((k) => k + 1)
    } else if (mail && hasValue(CONTACT.email)) {
      const subject = encodeURIComponent(
        `Orçamento — ${form.company.trim() || form.name.trim()}`,
      )
      window.location.href = `${mail}?subject=${subject}&body=${encodeURIComponent(body)}`
      setStatus('')
    }

    setLoading(false)
  }

  const emailErrorId = `${baseId}-email-error`
  const phoneErrorId = `${baseId}-phone-error`
  const demandErrorId = `${baseId}-demand-error`
  const statusId = `${baseId}-status`

  return (
    <div className="quote-wizard">
      <aside className="quote-wizard__rail" aria-label="Etapas da solicitação">
        <nav className="quote-wizard__nav">
          <ol className="quote-wizard__steps">
            {WIZARD_STEPS.map((item, index) => {
              const stepState = stepStateFor(item.id, step, highestReached)
              const number = String(item.id).padStart(2, '0')
              const isLast = index === WIZARD_STEPS.length - 1
              const isCurrent = stepState === 'current'

              return (
                <li
                  key={item.id}
                  className={[
                    'quote-wizard__step',
                    `is-${stepState}`,
                    !isLast ? 'has-connector' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    type="button"
                    className="quote-wizard__step-btn"
                    aria-current={isCurrent ? 'step' : undefined}
                    disabled={stepState === 'future'}
                    onClick={() => handleSidebarSelect(item.id)}
                  >
                    <span className="quote-wizard__step-index" aria-hidden>
                      {stepState === 'completed' ? (
                        <Check className="size-3.5" strokeWidth={2.75} />
                      ) : (
                        number
                      )}
                    </span>
                    <span className="quote-wizard__step-label">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="quote-wizard__tips">
          <p className="quote-wizard__tips-eyebrow">Para uma análise mais precisa</p>
          <p className="quote-wizard__tips-title">Informações que ajudam na cotação</p>
          <ul className="quote-wizard__tips-list">
            {SCOPE_HINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="quote-wizard__card">
        <div className="quote-wizard__mobile-progress" aria-label="Progresso da solicitação">
          <p className="quote-wizard__mobile-meta">Etapa {step} de 4</p>
          <p className="quote-wizard__mobile-title" aria-current="step">
            {current.title}
          </p>
          <div
            className="quote-wizard__progress-track"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={step}
            aria-label={`Etapa ${step} de 4`}
          >
            <span
              className="quote-wizard__progress-fill"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="quote-wizard__form" noValidate>
          <input type="hidden" name="form_type" value="quote_request" />

          <div
            key={transitionKey}
            className="quote-wizard__panel"
            role="group"
            aria-labelledby={`${baseId}-step-title`}
          >
            <header className="quote-wizard__panel-head">
              <p className="quote-wizard__panel-eyebrow">
                Etapa {String(step).padStart(2, '0')} — {current.label}
              </p>
              <h2
                id={`${baseId}-step-title`}
                ref={titleRef}
                tabIndex={-1}
                className="quote-wizard__panel-title"
              >
                {current.title}
              </h2>
              <p className="quote-wizard__panel-text">{current.text}</p>
            </header>

            {step === 1 ? (
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
                    aria-describedby={
                      touched.email && errors.email ? emailErrorId : undefined
                    }
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
                    aria-describedby={
                      touched.phone && errors.phone ? phoneErrorId : undefined
                    }
                  />
                  <input type="hidden" name="phone_digits" value={form.phoneDigits} />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <ChoiceGroup
                legend="Segmento"
                name="segment"
                layout="segments"
                options={SEGMENT_OPTIONS}
                value={form.segment}
                optional
                onChange={(value) => setForm((p) => ({ ...p, segment: value }))}
              />
            ) : null}

            {step === 3 ? (
              <div className="space-y-5">
                <ChoiceGroup
                  legend="Tipo de demanda"
                  name="demandType"
                  layout="demand"
                  options={DEMAND_OPTIONS}
                  value={form.demandType}
                  required
                  groupId={`${baseId}-demand`}
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
                  label="Descreva sua necessidade"
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
                    className={textareaClass}
                    placeholder="Informe produto ou serviço, aplicação, quantidade, especificação, prazo desejado e demais detalhes disponíveis."
                    aria-invalid={touched.message && errors.message ? true : undefined}
                  />
                </Field>
              </div>
            ) : null}

            {step === 4 ? (
              <ReviewSummary form={form} onEdit={(target) => goToStep(target)} />
            ) : null}
          </div>

          <div className={`quote-wizard__footer${step === 4 ? ' is-final' : ''}`}>
            {step > 1 ? (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="quote-wizard__nav-btn quote-wizard__nav-btn--back min-h-12"
                onClick={handleBack}
              >
                <ChevronLeft className="size-4" aria-hidden />
                Voltar
              </Button>
            ) : (
              <span className="quote-wizard__nav-spacer" aria-hidden />
            )}

            {step < 4 ? (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="quote-wizard__nav-btn quote-wizard__nav-btn--continue min-h-12"
                onClick={handleContinue}
              >
                Continuar
                <ChevronRight className="size-4" aria-hidden />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                variant="primary"
                className="form-submit form-submit--orange quote-wizard__submit min-h-[52px] w-full font-bold"
                disabled={loading}
              >
                {loading ? 'Abrindo…' : 'Solicitar orçamento'}
                {!loading ? <Send className="size-4" aria-hidden /> : null}
              </Button>
            )}
          </div>

          {step === 4 ? (
            <p className="quote-wizard__privacy">
              Ao solicitar, você concorda com o uso dos dados informados para análise comercial
              da demanda. Não utilizamos essas informações para outros fins.
            </p>
          ) : null}

          <p
            id={statusId}
            className={status ? 'quote-wizard__status' : 'sr-only'}
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        </form>
      </div>
    </div>
  )
}

function ReviewSummary({
  form,
  onEdit,
}: {
  form: FormState
  onEdit: (step: StepId) => void
}) {
  return (
    <div className="quote-review">
      <ReviewGroup title="Contato" onEdit={() => onEdit(1)}>
        <dl className="quote-review__dl">
          <ReviewRow label="Nome" value={form.name} />
          <ReviewRow label="E-mail" value={form.email.trim()} />
          <ReviewRow label="Telefone / WhatsApp" value={form.phoneDisplay} />
        </dl>
      </ReviewGroup>

      <ReviewGroup title="Empresa e operação" onEdit={() => onEdit(2)}>
        <dl className="quote-review__dl">
          <ReviewRow label="Empresa" value={form.company} />
          <ReviewRow label="Segmento" value={form.segment || 'Não informado'} />
        </dl>
      </ReviewGroup>

      <ReviewGroup title="Tipo de demanda" onEdit={() => onEdit(3)}>
        <dl className="quote-review__dl">
          <ReviewRow label="Tipo" value={form.demandType} />
        </dl>
      </ReviewGroup>

      <ReviewGroup title="Descrição" onEdit={() => onEdit(3)}>
        <p className="quote-review__text">{form.message}</p>
      </ReviewGroup>
    </div>
  )
}

function ReviewGroup({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: ReactNode
}) {
  return (
    <section className="quote-review__group">
      <div className="quote-review__head">
        <h3 className="quote-review__title">{title}</h3>
        <button type="button" className="quote-review__edit" onClick={onEdit}>
          Editar
        </button>
      </div>
      <div className="quote-review__body">{children}</div>
    </section>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="quote-review__row">
      <dt className="quote-review__label">{label}</dt>
      <dd className="quote-review__value">{value}</dd>
    </div>
  )
}
