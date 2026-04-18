import type { ContactSettingsData, SiteShellData } from '@/lib/site-globals'

type Props = {
  shell: SiteShellData
  contact: ContactSettingsData
}

export function SiteFooter({ shell, contact }: Props) {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold text-primary">{shell.brand.name}</span>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              שירות רכבי יוקרה מהמובילים בישראל. חוויה בלתי נשכחת לכל אירוע.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-sm tracking-wide">ניווט מהיר</h3>
            <nav className="flex flex-col gap-2" aria-label="ניווט תחתון">
              {shell.nav.map((item) => (
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

          <div className="flex flex-col gap-4">
            <h3 className="text-foreground font-semibold text-sm tracking-wide">צור קשר</h3>
            <div className="flex flex-col gap-2 text-muted-foreground text-sm">
              <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                {contact.email}
              </a>
              <span>{contact.address}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            {shell.footer.copyright} {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6">
            {shell.footer.links.map((link) => (
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
