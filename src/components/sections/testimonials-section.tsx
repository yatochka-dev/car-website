import { Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { SiteConfig } from '@/payload-types'

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? 'fill-primary text-primary' : 'text-border'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({ sectionTitle, items }: SiteConfig['testimonials']) {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeading title={sectionTitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex flex-col gap-4 p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-500"
            >
              <StarRating count={testimonial.rating} />
              <blockquote className="text-foreground/90 text-sm leading-relaxed flex-1">
                {`"${testimonial.text}"`}
              </blockquote>
              <footer className="text-primary font-semibold text-sm">{testimonial.name}</footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
