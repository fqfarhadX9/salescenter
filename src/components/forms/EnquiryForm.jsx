import { lazy, Suspense, useId } from 'react'
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Mail, Target, User } from 'lucide-react'
import useLeadForm from '../../hooks/useLeadForm'
import Button from '../ui/Button'

const PhoneNumberInput = lazy(() => import('./PhoneNumberInput'))

function Field({ id, label, icon: IconCmp, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        {IconCmp && (
          <IconCmp
            aria-hidden="true"
            strokeWidth={1.6}
            className={`pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${
              error ? 'text-red-500' : 'text-navy-700/60'
            }`}
          />
        )}
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <CircleAlert aria-hidden="true" className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'h-12 w-full rounded-lg border bg-white pl-11 pr-4 text-[15px] text-ink placeholder:text-ink/45 transition-colors duration-200 focus:outline-none focus:ring-2'

const inputClass = (error) =>
  `${inputBase} ${
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
      : 'border-navy-900/15 hover:border-navy-900/30 focus:border-gold-400 focus:ring-gold-200'
  }`

/**
 * Lead enquiry form.
 * layout="stacked" — single column (hero card)
 * layout="grid"    — one field per row with roomier spacing (final CTA, pop-up)
 */
export default function EnquiryForm({ config, source, project, layout = 'stacked', className = '' }) {
  const uid = useId()
  const grid = layout === 'grid'
  const { values, errors, status, submitError, onChange, onBlur, onSubmit, reset } = useLeadForm({ source, project })
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    email: `${uid}-email`,
    purpose: `${uid}-purpose`,
  }
  const a11y = (key) => ({
    id: ids[key],
    name: key,
    'aria-invalid': errors[key] ? 'true' : 'false',
    'aria-describedby': errors[key] ? `${ids[key]}-error` : undefined,
    onChange,
    onBlur,
  })

  if (status === 'success') {
    return (
      <div className={`flex flex-col items-center justify-center py-8 text-center animate-fade-in ${className}`} role="status" aria-live="polite">
        <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-gold-50 text-gold-500">
          <CircleCheck className="h-9 w-9" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold text-navy-900">{config.successTitle}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/70">{config.successMessage}</p>
        <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline">
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className={className} aria-label="Enquiry form">
      <div className={grid ? 'grid gap-4' : 'space-y-3.5'}>
        <Field id={ids.name} label="Full name" icon={User} error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Full Name" value={values.name} className={inputClass(errors.name)} {...a11y('name')} />
        </Field>
        <Field id={ids.phone} label="Phone number" error={errors.phone}>
          <Suspense fallback={<div className={`${inputClass(errors.phone)} flex items-center !pl-4 text-ink/45`}>+971 Phone Number</div>}>
            <PhoneNumberInput
              id={ids.phone}
              value={values.phone}
              defaultCountry={values.phoneCountry || undefined}
              error={errors.phone}
              onChange={(value) => onChange({ target: { name: 'phone', value: value || '' } })}
              onCountryChange={(country) => onChange({ target: { name: 'phoneCountry', value: country || '' } })}
              onBlur={onBlur}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
            />
          </Suspense>
        </Field>
        <Field id={ids.email} label="Email address" icon={Mail} error={errors.email}>
          <input type="email" autoComplete="email" placeholder="Email Address" value={values.email} className={inputClass(errors.email)} {...a11y('email')} />
        </Field>
        <Field id={ids.purpose} label="Purpose" icon={Target} error={errors.purpose}>
          <select
            value={values.purpose}
            className={`${inputClass(errors.purpose)} cursor-pointer appearance-none pr-10 ${values.purpose ? '' : 'text-ink/45'}`}
            {...a11y('purpose')}
          >
            <option value="" disabled>
              Purpose
            </option>
            {(config.purposeOptions || ['For Investment', 'For Personal Use', 'Both']).map((t) => (
              <option key={t} value={t} className="text-ink">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/60" />
        </Field>
      </div>

      {status === 'error' && submitError && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none" />
          {submitError}
        </p>
      )}

      <Button type="submit" variant="gold" size="md" className="cta-anim mt-5 w-full !rounded-lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          config.submitLabel
        )}
      </Button>
      {config.consentText && <p className="mt-3 text-center text-[11px] leading-snug text-ink/50">{config.consentText}</p>}
    </form>
  )
}
