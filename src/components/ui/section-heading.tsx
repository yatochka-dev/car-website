interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center flex flex-col items-center gap-4 mb-16">
      <div className="w-12 h-px bg-primary" />
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  )
}
