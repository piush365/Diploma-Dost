import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ddLogo from '../../assets/dd-logo.png'

const navLinks = [
  { label: 'Resources', path: '/resources' },
  { label: 'Roadmaps', path: '/roadmaps' },
  { label: 'Predictor', path: '/predictor' },
  { label: 'Innovation Hub', path: '/innovation-hub' },
  { label: 'DSA & CP', path: '/dsa' },
  { label: 'YouTube', path: '/youtube' },
  { label: 'Internships', path: '/internships' },
  { label: 'Community', path: '/community' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav
      style={{
        background: 'rgba(13, 14, 15, 0.85)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        {/* ── Logo ── */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
          style={{ textDecoration: 'none' }}
        >
          <img
            src={ddLogo}
            alt="Diploma Dost"
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '10px',
              objectFit: 'contain',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
             fontSize: '1.15rem',
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}>
              Diploma <span style={{ color: 'var(--accent)' }}>Dost</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}>
              MSBTE K-Scheme
            </span>
          </div>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.98rem',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(232, 69, 60, 0.08)' : 'transparent',
                  padding: '0.55rem 1rem',
                  borderRadius: '0.5rem',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.2s ease, background 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.background = 'rgba(128, 128, 128, 0.08)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* ── Desktop right: CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/predictor"
            className="btn-primary"
           style={{ fontSize: '0.95rem', padding: '0.7rem 1.4rem' }}
          >
            College Predictor
          </Link>
        </div>

        {/* ── Mobile right: hamburger ── */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-lg"
            style={{
              color: 'var(--text-muted)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {navLinks.map(link => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '1rem',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(232, 69, 60, 0.08)' : 'transparent',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.6rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            )
          })}

          {/* Mobile CTA */}
          <div style={{
            marginTop: '0.5rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border)',
          }}>
            <Link
              to="/predictor"
              className="btn-primary"
              onClick={() => setOpen(false)}
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem' }}
            >
              College Predictor
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}