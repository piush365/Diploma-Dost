import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpen, Map, Target, Lightbulb,
  Trophy, PlaySquare, Search, Users, Calendar,
  GraduationCap, Briefcase, GitBranchIcon, Zap,
  CheckCircle, Sparkles, TrendingUp, Code
} from 'lucide-react'

import { FaGithub } from 'react-icons/fa'

const features = [
  { icon: BookOpen,      label: 'Resources',    desc: 'PYQs, Notes, Syllabus',        path: '/resources'    },
  { icon: Map,           label: 'Roadmaps',     desc: 'Career paths for CS/IT',        path: '/roadmaps'     },
  { icon: Target,        label: 'Predictor',    desc: 'College admission prediction',  path: '/predictor'    },
  { icon: Lightbulb,     label: 'Innovation Hub',     desc: 'ITR, Capstone & micro ideas',   path: '/innovation-hub'     },
  { icon: Trophy,        label: 'DSA & CP',     desc: 'LeetCode, Striver, GFG',        path: '/dsa'          },
  { icon: PlaySquare,    label: 'YouTube Hub',  desc: 'Best playlists Sem 1–6',        path: '/youtube'      },
  { icon: Search,        label: 'Internships',  desc: 'Find & apply guide',            path: '/internships'  },
  { icon: Users,         label: 'Community',    desc: 'Ask seniors, get answers',      path: '/community'    },
  { icon: Calendar,      label: 'MSBTE Dates',  desc: 'Exam & deadline calendar',      path: '/msbte'        },
  { icon: GraduationCap, label: 'Scholarships', desc: 'EBC, SC/ST, OBC guides',        path: '/scholarships' },
  { icon: Briefcase,     label: 'Placement',    desc: 'Resume & interview prep',       path: '/placement'    },
  { icon: FaGithub,        label: 'Open Source',  desc: 'Contribute to real projects',   path: '/opensource'   },
]

const stats = [
  { value: '6',    label: 'Branches' },
  { value: '13+',  label: 'Features' },
  { value: '100%', label: 'Free' },
  { value: '∞',    label: 'Resources' },
]

const highlights = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for slow connections. Works offline.' },
  { icon: Code, title: 'Open Source', desc: 'Contribute code, content, or ideas on GitHub.' },
  { icon: TrendingUp, title: 'Career Focused', desc: 'From college to campus placement — we cover it all.' },
  { icon: CheckCircle, title: 'Trusted by us', desc: 'Built by students who completed their Diploma. Experienced Seniors.' },
]

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>



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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 mb-20">
          <Link to="/resources" className="btn-primary w-full sm:w-auto text-center justify-center">
            Explore Resources <ArrowRight size={15} />
          </Link>
          <Link to="/predictor" className="btn-ghost w-full sm:w-auto text-center justify-center">
            College Predictor
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-t border-[var(--border)] py-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="font-[var(--font-display)] font-bold text-2xl sm:text-3xl text-[var(--text)] leading-tight">
                6
              </span>
              <span className="font-[var(--font-mono)] text-[0.6rem] tracking-[0.1em] uppercase text-[var(--text-muted)] mt-2">
                BRANCHES
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-[var(--font-display)] font-bold text-2xl sm:text-3xl text-[var(--text)] leading-tight">
                100%
              </span>
              <span className="font-[var(--font-mono)] text-[0.6rem] tracking-[0.1em] uppercase text-[var(--text-muted)] mt-2">
                FREE
              </span>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="font-[var(--font-display)] font-bold text-2xl sm:text-3xl text-[var(--text)] leading-tight">
                13+
              </span>
              <span className="font-[var(--font-mono)] text-[0.6rem] tracking-[0.1em] uppercase text-[var(--text-muted)] mt-2">
                FEATURES
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-[var(--font-display)] font-bold text-2xl sm:text-3xl text-[var(--text)] leading-tight">
                ∞
              </span>
              <span className="font-[var(--font-mono)] text-[0.6rem] tracking-[0.1em] uppercase text-[var(--text-muted)] mt-2">
                RESOURCES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY DIPLOMA DOST ───────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

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
              Why us
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              Built by students who got placed
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
            We know the struggle. We've been there. That's why every resource here is battle-tested.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
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
              maxWidth: '600px',
            }}>
              13+ tools to ace your diploma
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
            Everything curated for MSBTE K-scheme across all 6 branches. No fluff.
          </p>
        </div>

        {/* Features grid — 4 cols desktop, 3 tablet, 2 mobile; 12 items = clean 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] border border-[var(--border)] rounded-[1.5rem] overflow-hidden bg-[var(--border)]">
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

      {/* ── JOURNEY SECTION ────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

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
              Your journey
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              From semester 1 to your first job
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              phase: 'Semester 1–4',
              title: 'Master the Fundamentals',
              items: [
                'Access PYQs and model answers',
                'Watch curated YouTube playlists',
                'Build foundational projects',
                'Learn DSA & competitive programming',
              ],
              cta: 'Resources',
              path: '/resources'
            },
            {
              phase: 'Semester 5–6',
              title: 'Prepare for the Real World',
              items: [
                'Predict your college placement',
                'Apply for internships',
                'Prepare for technical interviews',
                'Build your portfolio',
              ],
              cta: 'Internships',
              path: '/internships'
            },
            {
              phase: 'Post-Diploma',
              title: 'Land Your Dream Job',
              items: [
                'Master placement interview rounds',
                'Negotiate salary & offers',
                'Explore further studies (B.E./B.Tech)',
                'Contribute to open source',
              ],
              cta: 'Placement Guide',
              path: '/placement'
            },
          ].map((journey, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                }}>
                  {journey.phase}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {journey.title}
                </h3>
              </div>

              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {journey.items.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}>
                    <CheckCircle size={16} color="var(--accent-lime)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to={journey.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  marginTop: 'auto',
                  transition: 'gap 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '0.75rem'}
                onMouseLeave={e => e.currentTarget.style.gap = '0.5rem'}
              >
                {journey.cta} <ArrowRight size={14} />
              </Link>
            </div>
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
            Diploma Dost is built by students, for students. Share it with your classmates, contribute code, or help improve content on GitHub.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/piush365/Diploma-Dost"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaGithub size={14} /> View on GitHub
            </a>
            <Link to="/opensource" className="btn-ghost">
              How to contribute
            </Link>
          </div>
        </div>

        {/* Right side — subtle stat block */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          borderLeft: '1px solid var(--border)',
          paddingLeft: '3rem',
        }}>
          {[
            { value: 'EST. 2024', label: 'Founded' },
            { value: '6',        label: 'Branches' },
            { value: '1000+',    label: 'Students helped' },
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
