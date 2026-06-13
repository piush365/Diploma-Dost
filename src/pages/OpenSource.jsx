import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Users,
  Zap,
  Award,
  Code,
  FileText,
  Bug,
  Palette,
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Star,
  GitCommit,
  GitPullRequest
} from 'lucide-react'

import { FaGithub } from 'react-icons/fa'

export default function OpenSourcePage() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        minHeight: '80vh',
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
            Learn, Contribute, Grow
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: '0.15em',
          maxWidth: '900px',
        }}>
          Open source is for everyone.
        </h1>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
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
          Even you.{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent-lime)',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          }}>
            Especially you.
          </span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: '500px',
          marginTop: '2rem',
          marginBottom: '2.5rem',
        }}>
          Start your open-source journey with Diploma Dost. Learn Git, make your first PR, build your portfolio, and join a community of student developers.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '5rem' }}>
          <a
            href="https://github.com/piush365/Diploma-Dost"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            View on GitHub <ArrowRight size={15} />
          </a>
          <a
            href="#getting-started"
            className="btn-ghost"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* ── WHY OPEN SOURCE? ───────────────────── */}
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
              Why it matters
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
              Perks of contributing to open source
            </h2>
          </div>
        </div>

        {/* Perks grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            {
              icon: Star,
              title: 'Build Your Portfolio',
              desc: 'Real projects on GitHub. Employers see your code. Internships & jobs follow.'
            },
            {
              icon: Users,
              title: 'Network with Developers',
              desc: 'Connect with peers, seniors, and mentors. Learn from code reviews.'
            },
            {
              icon: Zap,
              title: 'Learn by Doing',
              desc: 'Git, GitHub, testing, documentation. Real-world skills, not tutorials.'
            },
            {
              icon: Award,
              title: 'Stand Out',
              desc: 'GSoC, hackathons, scholarships. Open-source experience opens doors.'
            },
            {
              icon: Code,
              title: 'Improve Your Coding',
              desc: 'Get feedback on your code. See how experienced devs write software.'
            },
            {
              icon: BookOpen,
              title: 'Give Back',
              desc: 'Help thousands of students. The same way Diploma Dost helped you.'
            },
          ].map((perk, idx) => {
            const Icon = perk.icon
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {perk.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}>
                  {perk.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── GIT & GITHUB BASICS ────────────────── */}
      <section id="getting-started" style={{
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
              The basics
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
              Git & GitHub for beginners
            </h2>
          </div>
        </div>

        {/* Git vs GitHub */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '2rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--text)',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              What is Git?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              Git is a <strong style={{ color: 'var(--text)' }}>version control system</strong>. It tracks changes to your code over time. Think of it like Google Docs' "Version History" — but for code.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}>
              It runs on your computer. You use it via the terminal with commands like <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>git commit</code>.
            </p>
          </div>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '2rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--text)',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>
              What is GitHub?
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              GitHub is a <strong style={{ color: 'var(--text)' }}>platform</strong> that hosts Git repositories online. It's where your code lives in the cloud.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}>
              You can share projects, collaborate with others, and contribute to open source. It has a web interface + Git under the hood.
            </p>
          </div>
        </div>

        {/* Step-by-step workflow */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Your first contribution workflow
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                step: '1',
                title: 'Fork the repository',
                desc: 'Click "Fork" on GitHub. This creates a copy under your account.'
              },
              {
                step: '2',
                title: 'Clone to your computer',
                desc: 'Run: git clone https://github.com/YOUR_USERNAME/Diploma-Dost.git'
              },
              {
                step: '3',
                title: 'Create a branch',
                desc: 'Run: git checkout -b feature/your-name-task-name'
              },
              {
                step: '4',
                title: 'Make changes',
                desc: 'Edit files, add code, write docs. Your changes are tracked by Git.'
              },
              {
                step: '5',
                title: 'Commit your changes',
                desc: 'Run: git add . && git commit -m "feat: add something cool"'
              },
              {
                step: '6',
                title: 'Push to GitHub',
                desc: 'Run: git push origin feature/your-name-task-name'
              },
              {
                step: '7',
                title: 'Open a Pull Request',
                desc: 'Go to GitHub, click "Compare & pull request". Describe what you did.'
              },
              {
                step: '8',
                title: 'Get reviewed & merge',
                desc: 'Maintainer reviews your code. If good, they merge it to main.'
              },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: 'var(--text)',
                    marginBottom: '0.25rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TYPES OF CONTRIBUTIONS ─────────────── */}
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
              Ways to contribute
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
              You don't have to be a coder
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
            Every contribution counts. Pick what fits your skills.
          </p>
        </div>

        {/* Contribution types */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          overflow: 'hidden',
          background: 'var(--border)',
        }}>
          {[
            {
              icon: Code,
              title: 'Frontend (React)',
              desc: 'Build pages, fix bugs, improve mobile layout'
            },
            {
              icon: FaGithub,
              title: 'Backend (Supabase)',
              desc: 'Create tables, set up RLS policies, write queries'
            },
            {
              icon: FileText,
              title: 'Content',
              desc: 'Write guides, collect PYQ links, curate playlists'
            },
            {
              icon: Bug,
              title: 'Bug Reports',
              desc: 'Found something broken? Open an issue.'
            },
            {
              icon: Palette,
              title: 'Design',
              desc: 'Suggest UI improvements, fix spacing & typography'
            },
            {
              icon: MessageSquare,
              title: 'Documentation',
              desc: 'Improve README, add comments, fix typos'
            },
          ].map((contrib, idx) => {
            const Icon = contrib.icon
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--bg)',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'background 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--surface)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg)'
                }}
              >
                <Icon size={22} color="var(--accent)" strokeWidth={1.5} />
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {contrib.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}>
                  {contrib.desc}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── GSOC & EVENTS ──────────────────────── */}
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
              Next level
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
              Google Summer of Code & beyond
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {[
            {
              title: 'Google Summer of Code (GSoC)',
              desc: 'Paid internship (May–Aug). Contribute to open-source projects. $3000–6000 stipend.',
              timeline: 'Applications: Jan–Feb. Coding: May–Aug.',
              link: 'https://summerofcode.withgoogle.com/'
            },
            {
              title: 'Outreachy',
              desc: 'Paid internship for underrepresented groups. 3 months, $7000 stipend.',
              timeline: 'Applications: Sep–Oct & Mar–Apr.',
              link: 'https://www.outreachy.org/'
            },
            {
              title: 'Hacktoberfest',
              desc: 'October event. Make 4 PRs to any open-source repo. Win free swag & t-shirt.',
              timeline: 'October every year.',
              link: 'https://hacktoberfest.com/'
            },
            {
              title: 'LFX Mentorship',
              desc: 'Linux Foundation mentorship program. Work with experienced mentors.',
              timeline: 'Applications: Jan & Jun.',
              link: 'https://lfx.linuxfoundation.org/tools/mentorship/'
            },
          ].map((event, idx) => (
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
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text)',
                letterSpacing: '-0.01em',
              }}>
                {event.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                {event.desc}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--accent-lime)',
                lineHeight: 1.6,
              }}>
                <strong>Timeline:</strong> {event.timeline}
              </p>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  marginTop: 'auto',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Learn more <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO CONTRIBUTE TO DIPLOMA DOST ─── */}
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
              Start here
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
              Your first PR to Diploma Dost
            </h2>
          </div>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2.5rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Before you start */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                Before you start
              </h3>
              <ol style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                paddingLeft: '1.5rem',
              }}>
                <li style={{ marginBottom: '0.75rem' }}>Read the <a href="https://github.com/piush365/Diploma-Dost#readme" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>README</a> to understand the project.</li>
                <li style={{ marginBottom: '0.75rem' }}>Check the <a href="https://github.com/piush365/Diploma-Dost/issues" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Issues tab</a> — pick something unassigned.</li>
                <li style={{ marginBottom: '0.75rem' }}>Comment on the issue: "I'd like to work on this." Wait for assignment.</li>
                <li>Then fork, branch, code, and raise a PR.</li>
              </ol>
            </div>

            {/* Tech stack */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                Tech stack
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
              }}>
                {[
                  { label: 'Frontend', value: 'React + Vite' },
                  { label: 'Styling', value: 'Tailwind CSS' },
                  { label: 'Database', value: 'Supabase' },
                  { label: 'Deployment', value: 'Vercel' },
                ].map((tech, idx) => (
                  <div key={idx} style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '0.5rem',
                    }}>
                      {tech.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                    }}>
                      {tech.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch naming */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                Branch naming convention
              </h3>
              <div style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '0.75rem',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-lime)',
                lineHeight: 1.8,
              }}>
                <div>feature/your-name-short-description</div>
                <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Example: feature/ravi-git-guide-page</div>
              </div>
            </div>

            {/* Commit message format */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                Commit message format
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}>
                {[
                  { prefix: 'feat:', use: 'Adding something new' },
                  { prefix: 'fix:', use: 'Fixing a bug' },
                  { prefix: 'content:', use: 'Adding or editing content' },
                  { prefix: 'style:', use: 'CSS or UI changes' },
                  { prefix: 'docs:', use: 'README or documentation' },
                  { prefix: 'refactor:', use: 'Code cleanup' },
                ].map((commit, idx) => (
                  <div key={idx} style={{
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--accent-lime)',
                      marginBottom: '0.5rem',
                    }}>
                      {commit.prefix}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}>
                      {commit.use}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code style */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--text)',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                Code style guidelines
              </h3>
              <ul style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                paddingLeft: '1.5rem',
              }}>
                <li style={{ marginBottom: '0.5rem' }}>Use functional React components only (no class components)</li>
                <li style={{ marginBottom: '0.5rem' }}>Use Tailwind for styling — no inline styles unless necessary</li>
                <li style={{ marginBottom: '0.5rem' }}>One component per file</li>
                <li style={{ marginBottom: '0.5rem' }}>No console.log in production code</li>
                <li>Add routes in <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--border)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.85rem' }}>src/App.jsx</code></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── RESOURCES & COMMUNITY ──────────────── */}
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
              Resources
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
              Learn more & get help
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
              icon: FaGithub,
              title: 'GitHub Repository',
              desc: 'View the code, open issues, and submit PRs.',
              link: 'https://github.com/piush365/Diploma-Dost',
              linkText: 'Visit GitHub'
            },
            {
              icon: FileText,
              title: 'CONTRIBUTING.md',
              desc: 'Detailed contribution guidelines and best practices.',
              link: 'https://github.com/piush365/Diploma-Dost/blob/main/CONTRIBUTING.md',
              linkText: 'Read Guide'
            },
            {
              icon: BookOpen,
              title: 'Git & GitHub Docs',
              desc: 'Official documentation from GitHub to learn Git deeply.',
              link: 'https://docs.github.com/en/get-started',
              linkText: 'Read Docs'
            },
            {
              icon: Users,
              title: 'Community',
              desc: 'Connect with other contributors. Ask questions, share ideas.',
              link: '#',
              linkText: 'Join Discord'
            },
          ].map((resource, idx) => {
            const Icon = resource.icon
            return (
              <a
                key={idx}
                href={resource.link}
                target={resource.link.startsWith('http') ? '_blank' : '_self'}
                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : ''}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: 'var(--text)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {resource.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}>
                    {resource.desc}
                  </p>
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginTop: 'auto',
                }}>
                  {resource.linkText} <ExternalLink size={14} />
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────── */}
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
            Ready?
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
            Make your first contribution
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Pick an issue, fork the repo, and submit your first PR. Your journey in open source starts now.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/piush365/Diploma-Dost/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GitBranch size={14} /> Browse Issues
            </a>
            <a
              href="https://github.com/piush365/Diploma-Dost"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Star on GitHub
            </a>
          </div>
        </div>

        {/* Right side — checklist */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          borderLeft: '1px solid var(--border)',
          paddingLeft: '3rem',
        }}>
          {[
            'Understand Git & GitHub',
            'Read CONTRIBUTING.md',
            'Pick an issue',
            'Make your first PR',
            'Get code reviewed',
            'Celebrate! 🎉',
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={18} color="var(--accent-lime)" strokeWidth={1.5} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text)',
                lineHeight: 1.5,
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
