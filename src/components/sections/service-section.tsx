import { Crown, Shield, Clock, Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { SiteConfig } from '@/payload-types'

const iconMap = {
  crown: Crown,
  shield: Shield,
  clock: Clock,
  star: Star,
} as const

export function ServiceSection({ sectionTitle, sectionSubtitle, features }: SiteConfig['service']) {
  return (
    <section id="service" className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4">
        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <article
                key={feature.id}
                className="group flex flex-col items-center text-center gap-5 p-8 rounded-xl border border-border bg-card/50 hover:border-primary/30 hover:bg-surface-elevated transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
