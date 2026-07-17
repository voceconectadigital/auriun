import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT, hasValue, mailHref, whatsappUrl } from '@/data/site'

type FormState = {
  name: string
  company: string
  email: string
  phone: string
  segment: string
  message: string
}

const initial: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  segment: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const body = [
      `Nome: ${form.name}`,
      `Empresa: ${form.company}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.phone}`,
      `Segmento: ${form.segment || 'Não informado'}`,
      '',
      form.message,
    ].join('\n')

    const wa = whatsappUrl(
      `Solicitação de orçamento — Auriun\n\n${body}`,
    )
    const mail = mailHref()

    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer')
    } else if (mail) {
      const subject = encodeURIComponent(`Orçamento — ${form.company || form.name}`)
      window.location.href = `${mail}?subject=${subject}&body=${encodeURIComponent(body)}`
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-brand-green/30 bg-brand-green/5 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-brand-green" aria-hidden />
        <h3 className="mt-4 font-display text-xl font-semibold text-brand-graphite">
          Solicitação preparada
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-slate">
          {hasValue(CONTACT.whatsapp) || hasValue(CONTACT.email)
            ? 'Abrimos o canal de contato com os dados do formulário. Se preferir, envie novamente ou aguarde nosso retorno.'
            : 'Os canais de contato ainda estão sendo configurados. Guarde sua mensagem e retorne em breve, ou utilize o e-mail corporativo assim que for publicado.'}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setSubmitted(false)
            setForm(initial)
          }}
        >
          Enviar outra solicitação
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome" htmlFor="name" required>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Empresa" htmlFor="company" required>
          <input
            id="company"
            name="company"
            required
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="E-mail" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Telefone" htmlFor="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Segmento / área" htmlFor="segment">
        <select
          id="segment"
          name="segment"
          value={form.segment}
          onChange={(e) => update('segment', e.target.value)}
          className={inputClass}
        >
          <option value="">Selecione (opcional)</option>
          <option value="Mineração">Mineração</option>
          <option value="Óleo e gás">Óleo e gás</option>
          <option value="Papel e celulose">Papel e celulose</option>
          <option value="Siderurgia">Siderurgia</option>
          <option value="Energia">Energia</option>
          <option value="Saneamento">Saneamento</option>
          <option value="Infraestrutura">Infraestrutura</option>
          <option value="Manufatura">Manufatura</option>
          <option value="Outro">Outro</option>
        </select>
      </Field>

      <Field label="Descreva sua necessidade" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Produtos, serviços, prazo desejado ou contexto do projeto."
        />
      </Field>

      <Button type="submit" size="lg" className="min-h-13 w-full sm:w-auto">
        <Send className="size-4" aria-hidden />
        Solicitar orçamento
      </Button>

      {!hasValue(CONTACT.whatsapp) && !hasValue(CONTACT.email) ? (
        <p className="text-xs text-brand-slate/80">
          PLACEHOLDER: configure WhatsApp ou e-mail em{' '}
          <code className="rounded bg-brand-mist px-1 py-0.5 text-[11px]">
            src/data/site.ts
          </code>{' '}
          para envio automático do formulário.
        </p>
      ) : null}
    </form>
  )
}

const inputClass =
  'w-full min-h-12 rounded-sm border border-brand-line bg-white px-3.5 py-3 text-base text-brand-graphite outline-none transition placeholder:text-brand-slate/50 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20'

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-brand-graphite">
        {label}
        {required ? <span className="text-brand-orange"> *</span> : null}
      </span>
      {children}
    </label>
  )
}
