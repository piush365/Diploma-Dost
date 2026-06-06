import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'
import ddLogo from '../../assets/dd-logo.jpg'

const navLinks = [
  { label: 'Resources',   path: '/resources' },
  { label: 'Roadmaps',    path: '/roadmaps' },
  { label: 'Predictor',   path: '/predictor' },
  { label: 'Projects',    path: '/projects' },
  { label: 'DSA & CP',    path: '/dsa' },
  { label: 'YouTube',     path: '/youtube' },
  { label: 'Internships', path: '/internships' },
  { label: 'Community',   path: '/community' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
         className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
               style={{ background: 'var(--accent)' }}>
            <img src={ddLogo} alt="Diploma Dost" className="w-8 h-8 rounded-lg" />
          </div>
          <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>
            Diploma <span style={{ color: 'var(--accent)' }}>Dost</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                color: pathname === link.path ? 'var(--accent)' : 'var(--text-muted)',
                background: pathname === link.path ? 'rgba(240,173,52,0.1)' : 'transparent',
              }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}
                onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1"
             style={{ borderTop: '1px solid var(--border)' }}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              className="px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                color: pathname === link.path ? 'var(--accent)' : 'var(--text-muted)',
                background: pathname === link.path ? 'rgba(240,173,52,0.1)' : 'transparent',
              }}
              onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
