import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import type { SiteConfig } from '@/payload-types'
import { submitContactForm } from '@/app/actions/contact'

type ContactSectionProps = {
  contact: SiteConfig['contact']
  submitted?: boolean
}

export function ContactSection({ contact, submitted = false }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-surface py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="צור קשר"
          subtitle="מעוניינים לשמוע עוד? השאירו פרטים ונחזור אליכם בהקדם."
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <ContactInfoItem
                icon={<Phone className="h-5 w-5" />}
                label="טלפון"
                value={contact.phone}
                href={`tel:${contact.phone}`}
              />
              <ContactInfoItem
                icon={<Mail className="h-5 w-5" />}
                label="אימייל"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
              <ContactInfoItem
                icon={<MapPin className="h-5 w-5" />}
                label="כתובת"
                value={contact.address}
              />
            </div>

            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-primary py-4 font-semibold text-primary-foreground transition-all duration-300 hover:bg-gold-light"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.143 1.534 5.88L.058 23.677a.5.5 0 00.612.612l5.797-1.476A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.876 0-3.67-.514-5.225-1.485l-.375-.224-3.443.878.878-3.443-.224-.375A9.783 9.783 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818S21.818 6.58 21.818 12s-4.398 9.818-9.818 9.818z" />
              </svg>
              <span>שלחו הודעה בוואטסאפ</span>
            </a>
          </div>

          <form
            action={submitContactForm}
            className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8"
          >
            <FormField label="שם מלא" id="name" name="name" type="text" required />
            <FormField label="טלפון" id="contact-phone" name="phone" type="tel" required />
            <div className="flex gap-2">
              <FormField label="האירוע מ" id="date" name="dateFrom" type="date" />
              <FormField label="האירוע עד" id="date" name="dateTo" type="date" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                הודעה
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="ספרו לנו על האירוע שלכם..."
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-4 font-semibold text-primary-foreground transition-all duration-300 hover:bg-gold-light"
            >
              <Send className="h-4 w-4" />
              <span>שליחה</span>
            </button>

            {submitted && (
              <p className="text-center text-sm font-medium text-primary">
                ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function ContactInfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="group flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground transition-colors group-hover:text-primary">
          {value}
        </p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}

function FormField({
  label,
  id,
  name,
  type,
  required,
}: {
  label: string
  id: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-sm font-medium text-foreground/80">
        {label}
        {required && <span className="mr-1 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  )
}
