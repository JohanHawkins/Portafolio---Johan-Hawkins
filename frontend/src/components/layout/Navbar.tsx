import { useState } from 'react'

const links = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#skills', label: 'Habilidades' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-100">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold text-slate-100 tracking-tight">
          Johan Hawkins
        </a>

        <ul className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="sm:hidden p-2 text-slate-400"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-surface-100 bg-surface">
          <ul className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
