import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

export const inputClass =
  'w-full min-h-[50px] rounded-[10px] border border-brand-line/90 bg-white px-3.5 py-3 text-base text-brand-graphite outline-none transition placeholder:text-brand-slate/50 focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/20 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/25'

export const textareaClass = `${inputClass} min-h-[170px] resize-y`

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

type ChoiceLayout = 'fluid' | 'segments' | 'demand'

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
  /** fluid = Assunto; segments = grid; demand = content-width wrap */
  layout?: ChoiceLayout
}

/**
 * Content-width choice chips (radio-like). Prefer this over equal-width grids.
 * Also exported as `RadioChipGroup`.
 */
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
  layout = 'fluid',
}: ChoiceGroupProps) {
  const groupClass = [
    'choice-chip-group',
    layout === 'segments' ? 'choice-chip-group--segments' : '',
    layout === 'demand' ? 'choice-chip-group--demand' : '',
  ]
    .filter(Boolean)
    .join(' ')

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
      <div role="radiogroup" aria-label={legend} className={groupClass}>
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              name={name}
              className={['choice-chip', selected ? 'is-selected' : ''].filter(Boolean).join(' ')}
              onClick={() => {
                if (optional && selected) onChange('')
                else onChange(opt.value)
              }}
            >
              <span className="choice-chip__label">{opt.label}</span>
              {selected ? (
                <span className="choice-chip__check" aria-hidden>
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
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

/** Alias for ChoiceGroup — content-width radio chips. */
export const RadioChipGroup = ChoiceGroup
export const ChoiceChip = ChoiceGroup
