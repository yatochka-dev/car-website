'use client'

import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { ContactSettingsData, SiteShellData } from '@/lib/site-globals'
import { cn } from '@/lib/utils'

type Props = {
  shell: SiteShellData
  contact: ContactSettingsData
}

export function SiteHeader({ shell, contact }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-transparent',
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => scrollToSection('#hero')} className="flex items-center gap-2 group">
            <Link
              href="/"
              className="text-2xl font-bold text-primary transition-colors group-hover:text-gold-light"
            >
              {shell.brand.name}
            </Link>
          </button>

          <nav className="hidden md:flex items-center gap-8" aria-label="ניווט ראשי">
            {shell.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/70 hover:text-primary transition-colors font-medium text-sm tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground/80 hover:border-primary hover:text-primary transition-all text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{contact.phoneDisplay}</span>
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-gold-light transition-all text-sm font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.143 1.534 5.88L.058 23.677a.5.5 0 00.612.612l5.797-1.476A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.876 0-3.67-.514-5.225-1.485l-.375-.224-3.443.878.878-3.443-.224-.375A9.783 9.783 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818S21.818 6.58 21.818 12s-4.398 9.818-9.818 9.818z" />
              </svg>
              <span>{contact.whatsappDisplay}</span>
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label={isMobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 bg-background/98 backdrop-blur-lg border-b border-border',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {shell.nav.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-foreground/80 hover:text-primary transition-colors py-3 text-right font-medium border-b border-border/50 last:border-b-0"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-3 pt-4">
            <a
              href={`tel:${contact.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-foreground/80 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{contact.phoneDisplay}</span>
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
            >
              <span>{contact.whatsappDisplay}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
