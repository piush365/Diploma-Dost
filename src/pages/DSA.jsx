import {
  ArrowRight, ExternalLink, BookOpen, Code, Trophy, Zap, Users, Target, Lightbulb, CheckCircle, Star,
  TrendingUp, Layers, MessageSquare
} from 'lucide-react'

import { FaGithub } from 'react-icons/fa'

export default function DSAPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        minHeight: 'calc(80vh - 64px)',
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
            Master Problem Solving
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
          DSA & Competitive Programming
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
          Your path to{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent-lime)',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          }}>
            top placements.
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
          From MSBTE fundamentals to competitive programming mastery. Striver's Sheet, LeetCode, CodeChef, GFG — everything you need to crack interviews and build problem-solving skills.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 mb-20">
          <a
            href="#strivers-sheet"
            className="btn-primary w-full sm:w-auto text-center justify-center"
          >
            Start with Striver's Sheet <ArrowRight size={15} />
          </a>
          <a
            href="#language-choice"
            className="btn-ghost w-full sm:w-auto text-center justify-center"
          >
            Choose Your Language
          </a>
        </div>
      </section>

      {/* ── LANGUAGE CHOICE ────────────────────── */}
      <section id="language-choice" style={{
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
              Foundation
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
              Choose your DSA language
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
            C++ and Java are industry standards. Pick one and master it.
          </p>
        </div>

        {/* Language comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {[
            {
              name: 'C++',
              emoji: '⚡',
              pros: [
                'Fastest execution (competitive programming gold standard)',
                'Built-in STL (vectors, maps, sets, queues)',
                'Memory control — understand how things work',
                'Used in MSBTE curriculum',
                'Top choice for FAANG interviews'
              ],
              cons: [
                'Steeper learning curve',
                'Manual memory management',
                'Syntax can be complex'
              ],
              recommended: true
            },
            {
              name: 'Java',
              emoji: '☕',
              pros: [
                'Cleaner syntax than C++',
                'Strong OOP principles',
                'Garbage collection (less memory headaches)',
                'Widely used in industry',
                'Great for building scalable systems'
              ],
              cons: [
                'Slightly slower than C++',
                'More verbose',
                'Larger memory footprint'
              ],
              recommended: true
            },
          ].map((lang, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: lang.recommended ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              {lang.recommended && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Recommended
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{lang.emoji}</span>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {lang.name}
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
                  {lang.pros.map((pro, i) => (
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
                  {lang.cons.map((con, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation box */}
        <div style={{
          background: 'rgba(200, 240, 77, 0.05)',
          border: '1px solid rgba(200, 240, 77, 0.2)',
          borderRadius: '1rem',
          padding: '1.75rem',
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Lightbulb size={20} color="var(--accent-lime)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent-lime)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}>
                Our Recommendation
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                <strong style={{ color: 'var(--text)' }}>Start with C++</strong> if you're comfortable with lower-level concepts. It's what MSBTE teaches and what competitive programming judges expect. <strong style={{ color: 'var(--text)' }}>Switch to Java</strong> if you find C++ overwhelming — both are equally respected in interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MSBTE vs THE WORLD ─────────────────── */}
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
              Curriculum mapping
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
              MSBTE DSA topics & beyond
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
            What you learn in MSBTE is the foundation. Here's what else you need.
          </p>
        </div>

        {/* MSBTE topics */}
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
            MSBTE K-Scheme Topics (Sem 3–4)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {[
              'Arrays & Strings',
              'Linked Lists',
              'Stacks & Queues',
              'Trees & Graphs',
              'Sorting Algorithms',
              'Searching Algorithms',
              'Recursion & Backtracking',
              'Dynamic Programming (Intro)',
            ].map((topic, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <CheckCircle size={18} color="var(--accent-lime)" strokeWidth={1.5} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond MSBTE */}
        <div style={{
          background: 'rgba(232, 69, 60, 0.05)',
          border: '1px solid rgba(232, 69, 60, 0.2)',
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
            Beyond MSBTE — Interview & CP Topics
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {[
              'Advanced DP',
              'Greedy Algorithms',
              'Bit Manipulation',
              'Segment Trees',
              'Fenwick Trees',
              'Graph Algorithms (DFS, BFS, Dijkstra)',
              'Hash Maps & Sets',
              'Heaps & Priority Queues',
              'Sliding Window',
              'Two Pointers',
              'Binary Search',
              'Trie & Suffix Arrays',
            ].map((topic, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Star size={18} color="var(--accent)" strokeWidth={1.5} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRIVER'S SHEET ────────────────────── */}
      <section id="strivers-sheet" style={{
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
              The roadmap
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
              Striver's Sheet & Top Roadmaps
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
              title: "Striver's SDE Sheet",
              desc: 'The most popular DSA roadmap. 180+ problems curated for interviews. Start here.',
              link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2',
              icon: TrendingUp,
              highlight: true
            },
            {
              title: 'Love Babbar 450 DSA',
              desc: '450 must-do problems for interview prep. Comprehensive and well-organized.',
              link: 'https://codolio.com/question-tracker/sheet/love-babbar-sheet',
              icon: BookOpen,
              highlight: false
            },
            {
              title: 'GFG DSA Self-Paced',
              desc: 'GeeksforGeeks structured DSA course with videos and practice problems.',
              link: 'https://www.geeksforgeeks.org/courses/dsa-self-paced',
              icon: Layers,
              highlight: false
            },
            {
              title: 'NeetCode 150',
              desc: 'Curated 150 problems for FAANG interviews. Organized by topic.',
              link: 'https://neetcode.io/practice',
              icon: Target,
              highlight: false
            },
          ].map((roadmap, idx) => {
            const Icon = roadmap.icon
            return (
              <a
                key={idx}
                href={roadmap.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--surface)',
                  border: roadmap.highlight ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = roadmap.highlight ? 'var(--accent)' : 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {roadmap.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    Start Here
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={22} color="var(--accent)" strokeWidth={1.5} />
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}>
                    {roadmap.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}>
                  {roadmap.desc}
                </p>

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
                  Start Learning <ExternalLink size={14} />
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── PRACTICE PLATFORMS ─────────────────── */}
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
              Practice platforms
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
              Where to solve problems
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
              name: 'LeetCode',
              emoji: '💻',
              desc: 'Premium platform for FAANG interview prep. 2500+ problems, discuss forums, mock interviews.',
              pros: ['Best for interviews', 'Excellent explanations', 'Mock interview feature'],
              link: 'https://leetcode.com'
            },
            {
              name: 'CodeChef',
              emoji: '🍳',
              desc: 'Indian competitive programming platform. Monthly contests, beginner-friendly.',
              pros: ['Great for CP', 'Monthly contests', 'Indian community'],
              link: 'https://www.codechef.com'
            },
            {
              name: 'GeeksforGeeks (GFG)',
              emoji: '🧠',
              desc: 'Comprehensive DSA tutorials + problems. Excellent explanations and articles.',
              pros: ['Best tutorials', 'Free content', 'Well-organized'],
              link: 'https://www.geeksforgeeks.org'
            },
            {
              name: 'Codeforces',
              emoji: '⚔️',
              desc: 'Hardcore competitive programming. Contests, problem sets, rating system.',
              pros: ['Challenging problems', 'Real contests', 'Strong community'],
              link: 'https://codeforces.com'
            },
            {
              name: 'HackerRank',
              emoji: '🎯',
              desc: 'Interactive learning platform. Tutorials + problems in one place.',
              pros: ['Beginner-friendly', 'Tutorials included', 'Certificates'],
              link: 'https://www.hackerrank.com'
            },
            {
              name: 'AtCoder',
              emoji: '🏆',
              desc: 'Japanese competitive programming platform. High-quality contests and problems.',
              pros: ['Quality problems', 'Educational', 'Regular contests'],
              link: 'https://atcoder.jp'
            },
          ].map((platform, idx) => (
            <a
              key={idx}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{platform.emoji}</span>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {platform.name}
                </h3>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {platform.desc}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                {platform.pros.map((pro, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-lime)',
                  }}>
                    <CheckCircle size={14} strokeWidth={2} />
                    {pro}
                  </div>
                ))}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.85rem',
                marginTop: 'auto',
              }}>
                Visit <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── MUST-DO PROBLEMS ───────────────────── */}
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
              Problem sets
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
              Must-do problems by difficulty
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
              level: 'Beginner',
              color: 'var(--accent-lime)',
              problems: [
                'Two Sum',
                'Reverse String',
                'Valid Parentheses',
                'Merge Sorted Array',
                'Remove Duplicates from Sorted Array',
                'Best Time to Buy and Sell Stock',
                'Contains Duplicate',
                'Valid Anagram'
              ]
            },
            {
              level: 'Intermediate',
              color: 'var(--accent)',
              problems: [
                'Longest Substring Without Repeating Characters',
                'Median of Two Sorted Arrays',
                'Longest Palindromic Substring',
                'Zigzag Conversion',
                'Reverse Integer',
                'String to Integer (atoi)',
                'Palindrome Number',
                'Container With Most Water'
              ]
            },
            {
              level: 'Advanced',
              color: 'var(--accent)',
              problems: [
                'Regular Expression Matching',
                'Merge k Sorted Lists',
                'Trapping Rain Water',
                'Wildcard Matching',
                'Maximal Rectangle',
                'Word Ladder II',
                'Minimum Window Substring',
                'Serialize and Deserialize Binary Tree'
              ]
            },
          ].map((category, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: category.color,
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}>
                {category.level}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.75rem',
              }}>
                {category.problems.map((problem, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text)',
                      lineHeight: 1.5,
                    }}
                  >
                    {problem}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro tip */}
        <div style={{
          background: 'rgba(200, 240, 77, 0.05)',
          border: '1px solid rgba(200, 240, 77, 0.2)',
          borderRadius: '1rem',
          padding: '1.75rem',
          marginTop: '2rem',
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Zap size={20} color="var(--accent-lime)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent-lime)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}>
                Pro Tip
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                Don't just solve problems — <strong style={{ color: 'var(--text)' }}>understand the approach</strong>. Write down the logic, time/space complexity, and edge cases. Quality over quantity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LANGUAGE GUIDES ────────────────────── */}
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
              Language resources
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
              Learn C++ & Java for DSA
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
              lang: 'C++',
              resources: [
                {
                  title: 'GeeksforGeeks C++ Tutorial',
                  link: 'https://www.geeksforgeeks.org/c-plus-plus/'
                },
                {
                  title: 'Striver C++ Series (YouTube)',
                  link: 'https://www.youtube.com/watch?v=z9bsSdjUGo0&list=PLgUwDviBIf0oF6sPw6sBbSqkKLJQJXSld'
                },
                {
                  title: 'cppreference.com (Documentation)',
                  link: 'https://en.cppreference.com/'
                },
                {
                  title: 'Competitive Programmer\'s Handbook',
                  link: 'https://cses.fi/book/'
                },
              ]
            },
            {
              lang: 'Java',
              resources: [
                {
                  title: 'GeeksforGeeks Java Tutorial',
                  link: 'https://www.geeksforgeeks.org/java/'
                },
                {
                  title: 'Striver Java Series (YouTube)',
                  link: 'https://www.youtube.com/watch?v=Ej4pz0uRYMA&list=PLgUwDviBIf0q_7t5nycigCMGVUG74Dc-d'
                },
                {
                  title: 'Oracle Java Documentation',
                  link: 'https://docs.oracle.com/javase/tutorial/'
                },
                {
                  title: 'Java Collections Framework Guide',
                  link: 'https://www.geeksforgeeks.org/collections-in-java-2/'
                },
              ]
            },
          ].map((langGuide, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'var(--text)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}>
                {langGuide.lang}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {langGuide.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(232, 69, 60, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--surface2)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <ExternalLink size={14} color="var(--accent)" strokeWidth={1.5} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      flex: 1,
                    }}>
                      {resource.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GITHUB REPOS ───────────────────────── */}
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
              Code references
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
              GitHub repos for learning & reference
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
              name: 'TheAlgorithms/C-Plus-Plus',
              desc: 'Collection of algorithms implemented in C++. Great for understanding different approaches.',
              link: 'https://github.com/TheAlgorithms/C-Plus-Plus',
              stars: '30k+'
            },
            {
              name: 'TheAlgorithms/Java',
              desc: 'Same collection but for Java. Comprehensive and well-documented.',
              link: 'https://github.com/TheAlgorithms/Java',
              stars: '55k+'
            },
            {
              name: 'striver79/striver-sheet-solutions',
              desc: 'Solutions to Striver\'s SDE Sheet. Learn from the creator himself.',
              link: 'https://github.com/striver79/striver-sheet-solutions',
              stars: '10k+'
            },
            {
              name: 'williamfiset/Algorithms',
              desc: 'High-quality algorithm implementations with detailed explanations.',
              link: 'https://github.com/williamfiset/Algorithms',
              stars: '15k+'
            },
            {
              name: 'twowaits/leetcode-solutions',
              desc: 'LeetCode problem solutions in C++ and Java with explanations.',
              link: 'https://github.com/twowaits/leetcode-solutions',
              stars: '5k+'
            },
            {
              name: 'kamyu104/LeetCode-Solutions',
              desc: 'Comprehensive LeetCode solutions with detailed comments.',
              link: 'https://github.com/kamyu104/LeetCode-Solutions',
              stars: '12k+'
            },
          ].map((repo, idx) => (
            <a
              key={idx}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaGithub size={20} color="var(--accent)" strokeWidth={1.5} />
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {repo.name}
                </h3>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {repo.desc}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-lime)',
                marginTop: 'auto',
              }}>
                <Star size={14} strokeWidth={1.5} />
                {repo.stars} stars
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── STUDY TIPS ─────────────────────────── */}
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
              Success tips
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
              How to master DSA
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
              title: '1. Understand, Don\'t Memorize',
              desc: 'Learn the "why" behind each algorithm. Understand the logic, not just the code.'
            },
            {
              title: '2. Start with Basics',
              desc: 'Master arrays, strings, and linked lists before jumping to advanced topics.'
            },
            {
              title: '3. Code by Hand First',
              desc: 'Write pseudocode and trace through examples on paper before coding.'
            },
            {
              title: '4. Practice Consistently',
              desc: 'Solve 1-2 problems daily. Consistency beats marathon cramming sessions.'
            },
            {
              title: '5. Analyze Time & Space',
              desc: 'For every solution, calculate Big O complexity. This is crucial for interviews.'
            },
            {
              title: '6. Solve Multiple Approaches',
              desc: 'For each problem, try to find 2-3 different solutions. Compare their complexities.'
            },
            {
              title: '7. Join Communities',
              desc: 'Discuss solutions on Discord, Reddit, or LeetCode. Learn from others.'
            },
            {
              title: '8. Mock Interviews',
              desc: 'Practice explaining your solution out loud. This is how interviews work.'
            },
          ].map((tip, idx) => (
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
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent)',
                letterSpacing: '-0.01em',
              }}>
                {tip.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {tip.desc}
              </p>
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
            Start your DSA journey today
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Pick a language (C++ or Java), choose a roadmap (Striver's Sheet), and start solving problems. Consistency is key.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Trophy size={14} /> Start Striver's Sheet
            </a>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Go to LeetCode
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
            'Choose C++ or Java',
            'Learn language basics',
            'Start with Striver\'s Sheet',
            'Solve 1-2 problems daily',
            'Understand time/space complexity',
            'Mock interviews & placements 🎉',
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
