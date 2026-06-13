import {
  ArrowRight, ExternalLink, Briefcase, TrendingUp, Users, BookOpen,
  CheckCircle, AlertCircle, Lightbulb, Zap, Target, Award,
  BarChart3, Code, MessageSquare, Clock, DollarSign
} from 'lucide-react'

export default function PlacementPage() {
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
            Your Next Chapter
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
          From diploma to dream job
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
          or further studies.{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent-lime)',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          }}>
            Your choice.
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
          Complete guide to placements: Job vs. Degree, target companies, interview prep, salary expectations, and career growth paths.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '5rem' }}>
          <a
            href="#job-vs-degree"
            className="btn-primary"
          >
            Job vs. Degree <ArrowRight size={15} />
          </a>
          <a
            href="#target-companies"
            className="btn-ghost"
          >
            Target Companies
          </a>
        </div>
      </section>

      {/* ── JOB VS DEGREE ──────────────────────── */}
      <section id="job-vs-degree" style={{
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
              The big decision
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
              Job or B.E./B.Tech degree?
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
            Both paths have merit. Here's what you need to know.
          </p>
        </div>

        {/* Job vs Degree Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {[
            {
              title: 'Taking a Job',
              emoji: '💼',
              pros: [
                'Immediate income (₹2-4 LPA to start)',
                'Real-world experience from day 1',
                'Build a professional network',
                'Faster career growth (2-3 years)',
                'Learn industry best practices',
                'Can pursue degree later (part-time)'
              ],
              cons: [
                'No formal degree credential',
                'Ceiling without degree (promotions limited)',
                'Limited to current company\'s growth',
                'Less time for learning new skills',
                'May need to take time off for degree later'
              ]
            },
            {
              title: 'Pursuing B.E./B.Tech',
              emoji: '🎓',
              pros: [
                'Formal engineering degree (highly valued)',
                'Higher salary ceiling (₹6-10+ LPA after)',
                'Access to better companies (Google, Microsoft)',
                'More career flexibility & options',
                'Can work part-time while studying',
                'Networking with peers & faculty'
              ],
              cons: [
                '3 years of study (opportunity cost)',
                'Tuition fees (₹3-8 LPA depending on college)',
                'No immediate income',
                'Competitive exams (CET, JEE, etc.)',
                'Still need internships & projects',
                'Degree alone won\'t guarantee placement'
              ]
            },
          ].map((option, idx) => (
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{option.emoji}</span>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {option.title}
                </h3>
              </div>

              <div>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--accent-lime)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Pros
                </h4>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  paddingLeft: '1.5rem',
                }}>
                  {option.pros.map((pro, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>✓ {pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Considerations
                </h4>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  paddingLeft: '1.5rem',
                }}>
                  {option.cons.map((con, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div style={{
          background: 'rgba(200, 240, 77, 0.05)',
          border: '1px solid rgba(200, 240, 77, 0.2)',
          borderRadius: '1rem',
          padding: '2rem',
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Lightbulb size={20} color="var(--accent-lime)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent-lime)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.01em',
              }}>
                Our Recommendation
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '0.75rem',
              }}>
                <strong style={{ color: 'var(--text)' }}>If you're from a tier-1 college or have strong academics:</strong> Pursue B.E./B.Tech. The degree opens doors at top companies and gives you a safety net.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                <strong style={{ color: 'var(--text)' }}>If you need income or are from a tier-2/3 college:</strong> Take the job. Gain 2-3 years of experience, build your portfolio, and then decide. You can always pursue a degree later (part-time or distance).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TARGET COMPANIES ───────────────────── */}
      <section id="target-companies" style={{
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
              Where to apply
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
              Top companies hiring diploma students
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
              category: 'IT Services & Consulting',
              companies: [
                { name: 'TCS', role: 'Junior Associate, Trainee' },
                { name: 'Infosys', role: 'Associate, Systems Engineer' },
                { name: 'Wipro', role: 'Project Engineer, Trainee' },
                { name: 'HCL Technologies', role: 'Associate Engineer' },
                { name: 'Tech Mahindra', role: 'Trainee Engineer' },
              ]
            },
            {
              category: 'Manufacturing & Engineering',
              companies: [
                { name: 'L&T (Larsen & Toubro)', role: 'Graduate Engineer Trainee' },
                { name: 'Tata Power', role: 'Junior Engineer' },
                { name: 'Siemens', role: 'Associate Engineer' },
                { name: 'ABB', role: 'Graduate Trainee' },
                { name: 'Bharat Petroleum', role: 'Graduate Engineer Trainee' },
              ]
            },
            {
              category: 'Startups & Tech Companies',
              companies: [
                { name: 'Flipkart', role: 'Associate, Trainee' },
                { name: 'Amazon', role: 'Associate, Operations' },
                { name: 'Swiggy', role: 'Associate Engineer' },
                { name: 'Unacademy', role: 'Associate, Product' },
                { name: 'PhonePe', role: 'Associate Engineer' },
              ]
            },
            {
              category: 'Automotive & Electronics',
              companies: [
                { name: 'Maruti Suzuki', role: 'Graduate Engineer Trainee' },
                { name: 'Hyundai', role: 'Associate Engineer' },
                { name: 'Bosch', role: 'Graduate Trainee' },
                { name: 'Bajaj Auto', role: 'Graduate Engineer Trainee' },
                { name: 'Hero MotoCorp', role: 'Associate Engineer' },
              ]
            },
          ].map((sector, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--accent)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}>
                {sector.category}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {sector.companies.map((company, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                    }}>
                      {company.name}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                    }}>
                      {company.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOB ROLES & SALARIES ───────────────── */}
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
              Career paths
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
              Common roles & salary expectations
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              role: 'Junior Software Engineer / Trainee',
              salary: '₹2-3.5 LPA',
              companies: 'TCS, Infosys, Wipro, HCL',
              skills: 'C++, Java, Python, SQL',
              growth: 'Senior Engineer (₹5-8 LPA) in 3-4 years'
            },
            {
              role: 'Associate Engineer (Manufacturing)',
              salary: '₹2.5-4 LPA',
              companies: 'L&T, Siemens, ABB, Tata Power',
              skills: 'CAD, AutoCAD, PLC, Electrical',
              growth: 'Senior Engineer (₹6-10 LPA) in 3-5 years'
            },
            {
              role: 'Graduate Engineer Trainee (GET)',
              salary: '₹2-3 LPA + Stipend',
              companies: 'Maruti, Hyundai, Bajaj, Hero',
              skills: 'Mechanical, Electrical, Production',
              growth: 'Senior GET (₹4-6 LPA) in 2-3 years'
            },
            {
              role: 'Associate, Operations / Support',
              salary: '₹2-3 LPA',
              companies: 'Amazon, Flipkart, Swiggy, Uber',
              skills: 'Problem-solving, Communication, Excel',
              growth: 'Senior Associate (₹4-5 LPA) in 2-3 years'
            },
          ].map((job, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--text)',
                marginBottom: '0.75rem',
                letterSpacing: '-0.01em',
              }}>
                {job.role}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  background: 'rgba(200, 240, 77, 0.1)',
                  border: '1px solid rgba(200, 240, 77, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--accent-lime)',
                    marginBottom: '0.25rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    Salary
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: 'var(--accent-lime)',
                  }}>
                    {job.salary}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.85rem',
              }}>
                <div>
                  <span style={{ color: 'var(--accent)', fontWeight: 800 }}>Companies:</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{job.companies}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--accent)', fontWeight: 800 }}>Key Skills:</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{job.skills}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--accent-lime)', fontWeight: 800 }}>Growth:</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{job.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Salary Progression */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem',
          marginTop: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Typical Salary Progression (IT Services)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { year: 'Year 0-1', role: 'Trainee', salary: '₹2-2.5 LPA' },
              { year: 'Year 1-2', role: 'Associate', salary: '₹2.5-3.5 LPA' },
              { year: 'Year 2-3', role: 'Senior Associate', salary: '₹3.5-5 LPA' },
              { year: 'Year 3-5', role: 'Engineer', salary: '₹5-7 LPA' },
              { year: 'Year 5+', role: 'Senior Engineer', salary: '₹7-12+ LPA' },
            ].map((prog, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {prog.year}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  marginBottom: '0.25rem',
                }}>
                  {prog.role}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--accent-lime)',
                }}>
                  {prog.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT INTERVIEW PREP ───────────── */}
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
              Interview stages
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
              The placement interview process
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            {
              stage: 'Round 1: Aptitude Test',
              duration: '60-90 minutes',
              topics: [
                'Quantitative Aptitude (30 min)',
                'Logical Reasoning (30 min)',
                'English/Verbal (30 min)'
              ],
              tips: 'Practice on IndiaBIX, HackerEarth, or company websites. Speed + accuracy is key.',
              cutoff: 'Top 20-30% move to next round'
            },
            {
              stage: 'Round 2: Technical Interview',
              duration: '30-45 minutes',
              topics: [
                'DSA (Arrays, Strings, Sorting)',
                'Your projects & internships',
                'Database queries (SQL)',
                'Basic system design'
              ],
              tips: 'Explain your approach before coding. Ask clarifying questions. Think out loud.',
              cutoff: 'Top 10-15% move to HR round'
            },
            {
              stage: 'Round 3: HR Interview',
              duration: '15-30 minutes',
              topics: [
                'Tell me about yourself',
                'Why our company?',
                'Your strengths & weaknesses',
                'Salary expectations',
                'Availability & relocation'
              ],
              tips: 'Be genuine, confident, and enthusiastic. Research the company. Ask smart questions.',
              cutoff: 'Final selection based on fit'
            },
          ].map((round, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
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
                }}>
                  {idx + 1}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {round.stage}
                </h3>
              </div>

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}>
                <strong style={{ color: 'var(--text)' }}>Duration:</strong> {round.duration}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Topics
                </h4>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  paddingLeft: '1.25rem',
                }}>
                  {round.topics.map((topic, i) => (
                    <li key={i}>• {topic}</li>
                  ))}
                </ul>
              </div>

              <div style={{
                background: 'rgba(232, 69, 60, 0.05)',
                border: '1px solid rgba(232, 69, 60, 0.2)',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                <strong style={{ color: 'var(--text)' }}>💡 Tip:</strong> {round.tips}
              </div>

              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--accent-lime)',
              }}>
                <strong>Cutoff:</strong> {round.cutoff}
              </div>
            </div>
          ))}
        </div>

        {/* Aptitude Test Resources */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            📊 Aptitude Test Practice Resources
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { name: 'IndiaBIX', link: 'https://www.indiabix.com', desc: 'Largest aptitude Q&A bank' },
              { name: 'HackerEarth', link: 'https://www.hackerearth.com', desc: 'Coding + aptitude tests' },
              { name: 'Quantitative Aptitude (RS Aggarwal)', link: '#', desc: 'Classic reference book' },
              { name: 'Logical Reasoning (Arun Sharma)', link: '#', desc: 'Best for CAT-style questions' },
              { name: 'Company-Specific Tests', link: 'https://www.cocubes.com', desc: 'HackerEarth, Cocubes' },
              { name: 'YouTube Channels', link: '#', desc: 'Unacademy, Vedantu, Khan Academy' },
            ].map((resource, idx) => (
              <a
                key={idx}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  marginBottom: '0.25rem',
                }}>
                  {resource.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  {resource.desc}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Common HR Questions */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            🎤 Common HR Questions & Answers
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                q: 'Tell me about yourself.',
                a: 'Share your background, education, internships, and why you\'re excited about this role. Keep it to 2 minutes.'
              },
              {
                q: 'Why do you want to join our company?',
                a: 'Research the company. Mention their products, culture, or values that align with you. Show genuine interest.'
              },
              {
                q: 'What are your strengths?',
                a: 'Pick 2-3 relevant strengths (e.g., "Quick learner", "Problem-solver"). Give examples.'
              },
              {
                q: 'What are your weaknesses?',
                a: 'Be honest but positive. "I used to struggle with public speaking, but I\'ve been working on it."'
              },
              {
                q: 'Where do you see yourself in 5 years?',
                a: 'Show ambition but realism. "I want to grow from Associate to Senior Engineer and lead projects."'
              },
              {
                q: 'What\'s your expected salary?',
                a: 'Research the market. Say a range: "Based on my skills and market, I expect ₹2.5-3.5 LPA."'
              },
            ].map((qa, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                }}
              >
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  Q: {qa.q}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}>
                  <strong style={{ color: 'var(--text)' }}>A:</strong> {qa.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT SUCCESS CHECKLIST ────────── */}
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
              Checklist
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
              Your placement success checklist
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
              phase: 'Before Placements Start',
              items: [
                'Update your resume (1 page)',
                'Build a GitHub profile with projects',
                'Practice DSA (50+ problems)',
                'Complete 2-3 internships/projects',
                'Research target companies',
                'Practice aptitude tests (IndiaBIX)',
              ]
            },
            {
              phase: 'During Aptitude Round',
              items: [
                'Arrive 15 min early',
                'Read questions carefully',
                'Manage time (don\'t get stuck)',
                'Attempt all sections',
                'Double-check answers if time permits',
              ]
            },
            {
              phase: 'During Technical Round',
              items: [
                'Explain your approach first',
                'Write clean, readable code',
                'Test with examples',
                'Ask clarifying questions',
                'Discuss time/space complexity',
              ]
            },
            {
              phase: 'During HR Round',
              items: [
                'Dress professionally',
                'Make eye contact',
                'Speak clearly & confidently',
                'Ask thoughtful questions',
                'Send thank-you email after',
              ]
            },
          ].map((phase, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--accent)',
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em',
              }}>
                {phase.phase}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {phase.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <CheckCircle size={16} color="var(--accent-lime)" strokeWidth={2} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
            Start your placement journey
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Whether you choose a job or further studies, you're making the right decision. Prepare well, stay consistent, and remember: the journey matters more than the destination.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="#target-companies"
              className="btn-primary"
            >
              <Briefcase size={14} /> Explore Companies
            </a>
            <a
              href="#job-vs-degree"
              className="btn-ghost"
            >
              Revisit Job vs. Degree
            </a>
          </div>
        </div>

        {/* Right side — key stats */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderLeft: '1px solid var(--border)',
          paddingLeft: '3rem',
        }}>
          {[
            { label: 'Average Starting Salary', value: '₹2-3 LPA' },
            { label: 'Salary After 3 Years', value: '₹4-6 LPA' },
            { label: 'Salary After 5 Years', value: '₹6-10 LPA' },
            { label: 'Job Satisfaction', value: '7-8/10' },
            { label: 'Career Growth Potential', value: 'Very High' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                marginBottom: '0.25rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'var(--text)',
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
