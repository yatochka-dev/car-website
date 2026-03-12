import Image from 'next/image'
import { SiteConfig } from '@/payload-types'

export function HeroSection(content: SiteConfig['hero']) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt="Luxury vehicle"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          {/* Decorative line */}
          <div className="w-16 h-px bg-primary" />

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
            {content.headline}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed text-pretty">
            {content.subheadline}
          </p>

          <a
            href={content.ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-gold-light transition-all duration-300 hover:scale-105"
          >
            {content.cta}
          </a>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <svg
              className="w-6 h-6 text-primary/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
