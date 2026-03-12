import { SiteConfig } from '@/payload-types'

export function SiteFooter(config: SiteConfig) {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold text-primary">{config.brand.name}</span>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              שירות רכבי יוקרה מהמובילים בישראל. חוויה בלתי נשכחת לכל אירוע.
            </p>
          </div>

          {/* Nav Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-sm tracking-wide">ניווט מהיר</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {config.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-sm tracking-wide">צור קשר</h3>
            <div className="flex flex-col gap-2 text-muted-foreground text-sm">
              <a
                href={`tel:${config.contact.phone}`}
                className="hover:text-primary transition-colors"
              >
                {config.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                className="hover:text-primary transition-colors"
              >
                {config.contact.email}
              </a>
              <span>{config.contact.address}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            {config.footer.copyright} {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6">
            {config.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-xs"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
