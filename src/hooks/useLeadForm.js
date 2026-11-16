import { useState } from 'react'
import { submitLead } from '../services/leadService'

const INITIAL = { name: '', phone: '', email: '', propertyType: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/

export function validateLead(values) {
  const errors = {}
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!PHONE_RE.test(values.phone.trim()) || digits.length < 7 || digits.length > 15)
    errors.phone = 'Please enter a valid phone number.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.propertyType) errors.propertyType = 'Please choose a property type.'
  return errors
}

/** Form state, validation and submit lifecycle: idle → submitting → success | error. */
export default function useLeadForm({ source }) {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validateLead(next))
  }

  const onBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validateLead(values))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateLead(values)
    setErrors(found)
    setTouched({ name: true, phone: true, email: true, propertyType: true })
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
          phone: values.phone.trim(),
          email: values.email.trim(),
          propertyType: values.propertyType,
        },
        { source },
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
