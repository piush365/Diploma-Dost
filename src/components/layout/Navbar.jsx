import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ddLogo from '../../assets/dd-logo.png'

const navLinks = [
  { label: 'Resources',   path: '/resources' },
  { label: 'Roadmaps',    path: '/roadmaps' },
  { label: 'Predictor',   path: '/predictor' },
  { label: 'Innovations', path: '/innovation-hub' },
  { label: 'DSA & CP',    path: '/dsa' },
  { label: 'YouTube',     path: '/youtube' },
  { label: 'Internships', path: '/internships' },
  { label: 'Community',   path: '/community' },
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
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

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
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}>
              Diploma <span style={{ color: 'var(--accent)' }}>Dost</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
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
          className={`font-ui text-sm px-3 py-2 rounded-lg transition-colors duration-200 outline-none ${isActive ? 'text-[#e8453c] bg-[#e8453c]/10' : 'text-[#888] hover:text-[#f0ede6] hover:bg-[#1a1a1a]'}`}
          onFocus={e => {
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)'
          }}
          onBlur={e => {
            e.currentTarget.style.boxShadow = 'none'
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
            className="btn-primary text-sm px-4 py-2 outline-none"
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)'
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            College Predictor
          </Link>
        </div>

        {/* ── Mobile right: hamburger ── */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-lg text-[#888] hover:text-[#f0ede6] transition-colors duration-200 outline-none"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onFocus={e => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
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
                className={`font-ui text-base px-4 py-3 rounded-lg transition-colors duration-200 outline-none ${isActive ? 'text-[#e8453c] bg-[#e8453c]/10' : 'text-[#888] hover:text-[#f0ede6] hover:bg-[#1a1a1a]'}`}
                onFocus={e => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)'
                }}
                onBlur={e => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}