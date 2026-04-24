'use client'

import { useActionState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Send } from 'lucide-react'

import { initialContactFormState, submitContactForm } from '@/app/actions/contact'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialContactFormState,
  )

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8"
    >
      <FormField label="שם מלא" id="name" name="name" type="text" required disabled={isPending} />
      <FormField
        label="טלפון"
        id="contact-phone"
        name="phone"
        type="tel"
        required
        disabled={isPending}
      />
      <FormField label="תאריך" id="date" name="date" type="date" disabled={isPending} />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
          הודעה
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          disabled={isPending}
          className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="ספרו לנו על האירוע שלכם..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary py-4 font-semibold text-primary-foreground transition-all duration-300 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="h-4 w-4" />
        <span>{isPending ? 'שולחים...' : 'שליחה'}</span>
      </button>

      <p className="text-muted-foreground">
        שליחת הטופס מהווה הסכמה ל־
        <Link href="/use" className="underline">
          תנאי השימוש
        </Link>{' '}
        ול־
        <Link href="/privacy" className="underline">
          מדיניות הפרטיות של האתר
        </Link>
        .
      </p>

      {state.status !== 'idle' && (
        <p
          aria-live="polite"
          className={
            state.status === 'success'
              ? 'text-center text-sm font-medium text-primary'
              : 'text-center text-sm font-medium text-destructive'
          }
        >
          {state.message}
        </p>
      )}
    </form>
  )
}

function FormField({
  disabled,
  label,
  id,
  name,
  type,
  required,
}: {
  disabled?: boolean
  label: string
  id: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground/80">
        {label}
        {required && <span className="mr-1 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-70"
      />
    </div>
  )
}
