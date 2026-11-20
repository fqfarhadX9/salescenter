import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Search } from 'lucide-react'
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

export const DEFAULT_COUNTRY = 'AE'
const PRIORITY = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'IN', 'PK', 'GB', 'US', '|', '...']
const POPOVER_HEIGHT = 340

function Flag({ country }) {
  const Svg = flags[country]
  return (
    <span aria-hidden="true" className="inline-flex h-[14px] w-5 flex-none overflow-hidden rounded-[2px] ring-1 ring-black/10 [&>svg]:h-full [&>svg]:w-full">
      {Svg && <Svg />}
    </span>
  )
}

function CountrySelect({ value, onChange, options, onFocus, onBlur, disabled, readOnly, onUserSelect }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(null)
  const buttonRef = useRef(null)
  const popRef = useRef(null)
  const listRef = useRef(null)
  const searchRef = useRef(null)

  const countries = useMemo(
    () => options.filter((o) => o.value).map((o) => ({ ...o, code: getCountryCallingCode(o.value) })),
    [options],
  )
  const dividerAt = useMemo(() => {
    const i = options.findIndex((o) => o.divider)
    return i > 0 ? options.slice(0, i).filter((o) => o.value).length : -1
  }, [options])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '')
    if (!q) return countries
    const seen = new Set()
    return countries.filter((c) => {
      if (seen.has(c.value)) return false
      const hit = c.label.toLowerCase().includes(q) || c.value.toLowerCase() === q || c.code.startsWith(q)
      if (hit) seen.add(c.value)
      return hit
    })
  }, [countries, query])

  const place = useCallback(() => {
    const field = buttonRef.current?.closest('.PhoneInput') || buttonRef.current
    if (!field) return
    const r = field.getBoundingClientRect()
    const vw = window.innerWidth
    const width = Math.min(Math.max(r.width, 280), vw - 16)
    const left = Math.min(Math.max(8, r.left), vw - width - 8)
    const below = window.innerHeight - r.bottom
    const up = below < POPOVER_HEIGHT && r.top > below
    setPos(up ? { left, width, bottom: window.innerHeight - r.top + 6 } : { left, width, top: r.bottom + 6 })
  }, [])

  const close = useCallback((refocus = false) => {
    setOpen(false)
    setQuery('')
    if (refocus) buttonRef.current?.focus()
  }, [])

  const toggle = () => {
    if (disabled || readOnly) return
    if (open) return close()
    place()
    setActive(0)
    setOpen(true)
  }

  const select = (country) => {
    close()
    if (country === value) return
    onChange(country)
    onUserSelect?.()
  }

  useLayoutEffect(() => {
    if (!open) return
    searchRef.current?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!popRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) close()
    }
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, place, close])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[active]) select(results[active].value)
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
      }
      close(e.key === 'Escape')
    }
  }

  const current = countries.find((c) => c.value === value)
  const showDivider = !query.trim() && dividerAt > 0

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={current ? `Country: ${current.label} (+${current.code}). Change country` : 'Choose country'}
        className="flex flex-none items-center gap-1.5 rounded-l-lg border-r border-navy-900/10 pl-3.5 pr-2.5 text-[15px] text-ink transition-colors hover:bg-cream-50 focus:outline-none focus-visible:bg-cream-100"
      >
        {value && <Flag country={value} />}
        <span className="font-medium tabular-nums">+{value ? getCountryCallingCode(value) : ''}</span>
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 text-navy-700/60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open &&
        pos &&
        createPortal(
          <div
            ref={popRef}
            style={{ left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom }}
            className="fixed z-[200] overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-navy-900/10 animate-fade-in"
          >
            <div className="relative border-b border-navy-900/10">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-700/50" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onKeyDown}
                placeholder="Search country or code"
                aria-label="Search country or code"
                aria-controls="phone-country-list"
                autoComplete="off"
                className="h-11 w-full bg-transparent pl-10 pr-3 text-[15px] text-ink placeholder:text-ink/45 focus:outline-none"
              />
            </div>
            <ul ref={listRef} id="phone-country-list" role="listbox" aria-label="Countries" className="max-h-[284px] overflow-y-auto overscroll-contain py-1">
              {results.length === 0 && <li className="px-4 py-3 text-sm text-ink/55">No country found</li>}
              {results.map((c, i) => (
                <li
                  key={`${c.value}-${i}`}
                  data-index={i}
                  role="option"
                  aria-selected={c.value === value}
                  onPointerMove={() => setActive(i)}
                  onClick={() => select(c.value)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-[14px] ${i === active ? 'bg-cream-100' : ''} ${
                    c.value === value ? 'font-semibold text-navy-900' : 'text-ink'
                  } ${showDivider && i === dividerAt ? 'border-t border-navy-900/10' : ''}`}
                >
                  <Flag country={c.value} />
                  <span className="min-w-0 flex-1 truncate">{c.label}</span>
                  <span className="tabular-nums text-ink/55">+{c.code}</span>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </>
  )
}

export default function PhoneNumberInput({ id, value, onChange, onCountryChange, onBlur, error, defaultCountry = DEFAULT_COUNTRY, ...rest }) {
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  // A country picked by hand starts a fresh number, so digits typed for the old country are never sent with the new code
  const clearNumber = useCallback(() => setTimeout(() => onChangeRef.current(undefined), 0), [])

  return (
    <PhoneInput
      id={id}
      name="phone"
      value={value || undefined}
      onChange={onChange}
      onCountryChange={onCountryChange}
      onBlur={onBlur}
      defaultCountry={defaultCountry}
      limitMaxLength
      addInternationalOption={false}
      countryOptionsOrder={PRIORITY}
      countrySelectComponent={CountrySelect}
      countrySelectProps={{ onUserSelect: clearNumber }}
      inputMode="tel"
      autoComplete="tel"
      placeholder="Phone Number"
      className={`flex h-12 w-full items-stretch rounded-lg border bg-white transition-colors duration-200 focus-within:ring-2 ${
        error
          ? 'border-red-400 focus-within:border-red-400 focus-within:ring-red-200'
          : 'border-navy-900/15 hover:border-navy-900/30 focus-within:border-gold-400 focus-within:ring-gold-200'
      }`}
      numberInputProps={{
        className: 'min-w-0 flex-1 rounded-r-lg bg-transparent px-3 text-[15px] text-ink placeholder:text-ink/45 focus:outline-none',
      }}
      {...rest}
    />
  )
}
