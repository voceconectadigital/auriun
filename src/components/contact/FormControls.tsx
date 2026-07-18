import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

export const inputClass =
  'w-full min-h-12 rounded-sm border border-brand-line bg-white px-3.5 py-3 text-base text-brand-graphite outline-none transition placeholder:text-brand-slate/50 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/25'

export function Field({
  label,
  htmlFor,
  required,
  error,
  errorId,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string | null
  errorId?: string
  children: ReactNode
}) {
  return (
    <div className="block">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-graphite">
        {label}
        {required ? <span className="text-brand-orange"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type ChoiceOption = { value: string; label: string }

type ChoiceGroupProps = {
  legend: string
  name: string
  options: ChoiceOption[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  /** When true, clicking the selected option clears it. */
  optional?: boolean
  error?: string | null
  errorId?: string
}

export function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  required,
  optional,
  error,
  errorId,
}: ChoiceGroupProps) {
  return (
    <fieldset
      className="block"
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="mb-2.5 text-sm font-medium text-brand-graphite">
        {legend}
        {required ? <span className="text-brand-orange"> *</span> : null}
        {optional && !required ? (
          <span className="ml-1 font-normal text-brand-slate/70">(opcional)</span>
        ) : null}
      </legend>
      <div
        role="radiogroup"
        aria-label={legend}
        className="form-choice-grid"
      >
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              name={name}
              className={['form-choice', selected ? 'is-selected' : ''].filter(Boolean).join(' ')}
              onClick={() => {
                if (optional && selected) onChange('')
                else onChange(opt.value)
              }}
            >
              <span className="form-choice__label">{opt.label}</span>
              {selected ? (
                <Check className="form-choice__check size-3.5 shrink-0" aria-hidden strokeWidth={2.5} />
              ) : null}
            </button>
          )
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}
