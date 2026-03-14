interface RichTextSectionProps {
  children: React.ReactNode
}

export default function RichTextSection({ children }: RichTextSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex pt-20 container justify-center items-center px-10 overflow-hidden"
    >
      {children}
    </section>
  )
}
