import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpen, Map, Target, Lightbulb,
  Trophy, PlaySquare, Search, Users, Calendar,
  GraduationCap, Briefcase, GitBranchIcon
} from 'lucide-react'

const features = [
  { icon: BookOpen,      label: 'Resources',    desc: 'PYQs, Notes, Syllabus',        path: '/resources'    },
  { icon: Map,           label: 'Roadmaps',     desc: 'Career paths for CS/IT',        path: '/roadmaps'     },
  { icon: Target,        label: 'Predictor',    desc: 'College admission prediction',  path: '/predictor'    },
  { icon: Lightbulb,     label: 'Projects',     desc: 'ITR, Capstone & micro ideas',   path: '/projects'     },
  { icon: Trophy,        label: 'DSA & CP',     desc: 'LeetCode, Striver, GFG',        path: '/dsa'          },
  { icon: PlaySquare,    label: 'YouTube Hub',  desc: 'Best playlists Sem 1–6',        path: '/youtube'      },
  { icon: Search,        label: 'Internships',  desc: 'Find & apply guide',            path: '/internships'  },
  { icon: Users,         label: 'Community',    desc: 'Ask seniors, get answers',      path: '/community'    },
  { icon: Calendar,      label: 'MSBTE Dates',  desc: 'Exam & deadline calendar',      path: '/msbte'        },
  { icon: GraduationCap, label: 'Scholarships', desc: 'EBC, SC/ST, OBC guides',        path: '/scholarships' },
  { icon: Briefcase,     label: 'Placement',    desc: 'Resume & interview prep',       path: '/placement'    },
  { icon: GitBranchIcon, label: 'Open Source',  desc: 'Contribute to real projects',   path: '/opensource'   },
]

const stats = [
  { value: '6',    label: 'Branches' },
  { value: '13+',  label: 'Features' },
  { value: '100%', label: 'Free' },
  { value: '∞',    label: 'Resources' },
]

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Top accent line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          opacity: 0.4,
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          width: 'fit-content',
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
            boxShadow: '0 0 6px var(--accent)',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Free & Open Source — MSBTE K-Scheme
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: '0.15em',
          maxWidth: '900px',
        }}>
          Built for diploma
        </h1>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: '0.15em',
          maxWidth: '900px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3em',
          flexWrap: 'wrap',
        }}>
          students.{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent)',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          }}>
            By them.
          </span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: '460px',
          marginTop: '2rem',
          marginBottom: '2.5rem',
        }}>
          PYQs, career guidance, college predictor, YouTube playlists —
          everything a diploma CS/IT student needs. One platform. Zero rupees.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '5rem' }}>
          <Link to="/resources" className="btn-primary">
            Explore Resources <ArrowRight size={15} />
          </Link>
          <Link to="/predictor" className="btn-ghost">
            College Predictor
          </Link>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
          flexWrap: 'wrap',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <div style={{ paddingRight: '2.5rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: 'var(--text)',
                  lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}>
                  {s.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div style={{
                  width: '1px',
                  height: '2rem',
                  background: 'var(--border)',
                  marginRight: '2.5rem',
                }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        {/* Section header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              What's inside
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '500px',
            }}>
              Everything you need,<br />nothing you don't.
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            maxWidth: '280px',
            lineHeight: 1.7,
            textAlign: 'right',
          }}>
            Curated specifically for MSBTE K-scheme students across 6 branches.
          </p>
        </div>

        {/* Features grid — 4 cols desktop, 3 tablet, 2 mobile; 12 items = clean 3 rows */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          overflow: 'hidden',
          background: 'var(--border)',
        }}
          className="features-grid"
        >
          {features.map(({ icon: Icon, label, desc, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                background: 'var(--bg)',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'background 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--surface)'
                const arrow = e.currentTarget.querySelector('.feature-arrow')
                const bar = e.currentTarget.querySelector('.feature-accent-bar')
                if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(0)' }
                if (bar) bar.style.transform = 'scaleY(1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg)'
                const arrow = e.currentTarget.querySelector('.feature-arrow')
                const bar = e.currentTarget.querySelector('.feature-accent-bar')
                if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(-6px)' }
                if (bar) bar.style.transform = 'scaleY(0)'
              }}
            >
              {/* Red left accent bar on hover */}
              <div
                className="feature-accent-bar"
                style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: '2px',
                  background: 'var(--accent)',
                  transform: 'scaleY(0)',
                  transition: 'transform 0.2s ease',
                }}
              />

              <Icon size={22} color="var(--text-muted)" strokeWidth={1.5} />

              <div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  marginBottom: '0.3rem',
                  letterSpacing: '-0.01em',
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}>
                  {desc}
                </div>
              </div>

              <div
                className="feature-arrow"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  opacity: 0,
                  transform: 'translateX(-6px)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  marginTop: 'auto',
                }}
              >
                Open <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '3rem',
      }}>

        <div style={{ maxWidth: '540px' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            Open Source
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}>
            If it helped you,<br />
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--accent)',
            }}>
              pay it forward.
            </span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Diploma Dost is built by students, for students. Share it with your
            classmates or contribute to it on GitHub.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/piush365/Diploma-Dost"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GitBranchIcon size={14} /> View on GitHub
            </a>
            <Link to="/about" className="btn-ghost">
              About the project
            </Link>
          </div>
        </div>

        {/* Right side — subtle stat block */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderLeft: '1px solid var(--border)',
          paddingLeft: '3rem',
        }}>
          {[
            { value: 'EST. 2024', label: 'Founded' },
            { value: '6',        label: 'Branches covered' },
            { value: 'WCE',      label: 'Origin — Sangli' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  )
}