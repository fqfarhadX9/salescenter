import { useEffect, useState } from 'react'
import { getExampleNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'
import countryNames from 'react-phone-number-input/locale/en'
import { submitLead } from '../services/leadService'

const INITIAL = { name: '', phone: '', phoneCountry: 'AE', email: '', purpose: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateLead(values) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  const phoneError = validatePhone(values.phone, values.phoneCountry)
  if (phoneError) errors.phone = phoneError
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.purpose) errors.purpose = 'Please choose your purpose.'
  return errors
}

function validatePhone(phone, country) {
  if (!phone || phone.replace(/\D/g, '').length === 0) return 'Please enter your phone number.'
  if (isValidPhoneNumber(phone)) return ''
  const name = countryNames[country] || ''
  const example = country ? getExampleNumber(country, examples)?.formatNational() : ''
  const hint = example ? ` e.g. ${example}` : ''
  const length = validatePhoneNumberLength(phone, country)
  if (length === 'TOO_SHORT') return `Number is too short.${hint}`
  if (length === 'TOO_LONG') return `Number is too long.${hint}`
  return `Enter a valid ${name ? `${name} ` : ''}number.${hint}`
}

/** Form state, validation and submit lifecycle: idle → submitting → success | error. */
export default function useLeadForm({ source, project }) {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (Object.keys(touched).length) setErrors(validateLead(values))
  }, [values, touched])

  const onBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateLead(values))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateLead(values)
    setErrors(found)
    setTouched({ name: true, phone: true, email: true, purpose: true })
    if (Object.keys(found).length) {
      const first = e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)
      first?.focus()
      return
    }
    setStatus('submitting')
    setSubmitError('')
    try {
      await submitLead(
        {
          name: values.name.trim(),
          phone: values.phone,
          phoneCountry: values.phoneCountry,
          email: values.email.trim(),
          purpose: values.purpose,
        },
        { source, project },
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setSubmitError('Something went wrong. Please try again or call us directly.')
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(INITIAL)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  const visibleErrors = Object.fromEntries(Object.entries(errors).filter(([k]) => touched[k]))

  return { values, errors: visibleErrors, status, submitError, onChange, onBlur, onSubmit, reset }
}
