import { useState, useEffect } from 'react'
import {
  Users, MessageCircle, Send, Loader2,
  ChevronDown, ChevronUp, Plus, X
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const BRANCHES = ['CS', 'IT', 'Mech', 'Civil', 'Elec', 'ETC']
const SEMESTERS = [1, 2, 3, 4, 5, 6]

export default function Community() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    branch: 'CS',
    semester: 1,
    question_text: '',
  })

  const [expanded, setExpanded] = useState(null)
  const [answers, setAnswers] = useState({})
  const [answersLoading, setAnswersLoading] = useState({})

  const [answerForm, setAnswerForm] = useState({ name: '', answer_text: '' })
  const [answerSubmitting, setAnswerSubmitting] = useState(false)
  const [answerError, setAnswerError] = useState(null)

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setQuestions(data || [])
    }
    setLoading(false)
  }

  async function fetchAnswers(questionId) {
    if (answers[questionId]) return
    setAnswersLoading(prev => ({ ...prev, [questionId]: true }))
    try {
      const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', questionId)
        .order('created_at', { ascending: true })

      if (error) {
        setAnswers(prev => ({ ...prev, [questionId]: [] }))
      } else {
        setAnswers(prev => ({ ...prev, [questionId]: data || [] }))
      }
    } catch {
      setAnswers(prev => ({ ...prev, [questionId]: [] }))
    } finally {
      setAnswersLoading(prev => ({ ...prev, [questionId]: false }))
    }
  }

  function toggleExpand(questionId) {
    if (expanded === questionId) {
      setExpanded(null)
    } else {
      setExpanded(questionId)
      fetchAnswers(questionId)
      setAnswerForm({ name: '', answer_text: '' })
    }
  }

  async function handleSubmitQuestion(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.question_text.trim()) return

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          name: form.name.trim(),
          branch: form.branch,
          semester: form.semester,
          question_text: form.question_text.trim(),
        }])
        .select()

      if (!error && data) {
        setQuestions(prev => [data[0], ...prev])
        setForm({ name: '', branch: 'CS', semester: 1, question_text: '' })
        setShowForm(false)
      } else if (error) {
        setError('Failed to post your question. Please try again.')
      }
    } catch {
      setError('Failed to post your question. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSubmitAnswer(e, questionId) {
    e.preventDefault()
    if (!answerForm.name.trim() || !answerForm.answer_text.trim()) return

    setAnswerSubmitting(true)
    setAnswerError(null)
    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([{
          question_id: questionId,
          name: answerForm.name.trim(),
          answer_text: answerForm.answer_text.trim(),
        }])
        .select()

      if (!error && data) {
        setAnswers(prev => ({
          ...prev,
          [questionId]: [...(prev[questionId] || []), data[0]],
        }))
        setAnswerForm({ name: '', answer_text: '' })
      } else if (error) {
        setAnswerError('Failed to post your answer. Please try again.')
      }
    } catch {
      setAnswerError('Failed to post your answer. Please try again.')
    } finally {
      setAnswerSubmitting(false)
    }
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days}d ago`
    return new Date(dateStr).toLocaleDateString()
  }

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(3rem, 6vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          opacity: 0.4,
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
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
            Community
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: '0.6rem',
              maxWidth: '700px',
            }}>
              Ask seniors.{' '}
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--accent)',
              }}>
                Get answers.
              </span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}>
              Questions about subjects, projects, internships, or placements —
              ask here and get answers from students who've been through it.
            </p>
          </div>

          <button
            onClick={() => setShowForm(s => !s)}
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            {showForm ? <X size={15} /> : <Plus size={15} />}
            {showForm ? 'Cancel' : 'Ask a Question'}
          </button>
        </div>
      </section>

      {/* ── ASK FORM ───────────────────────────── */}
      {showForm && (
        <section style={{
          padding: '0 clamp(1.5rem, 6vw, 7rem) clamp(2rem, 4vw, 3rem)',
        }}>
          <form
            onSubmit={handleSubmitQuestion}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '1rem',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              maxWidth: '700px',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={labelStyle}>Your name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Priya S."
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: '0 0 110px' }}>
                <label style={labelStyle}>Branch</label>
                <select
                  value={form.branch}
                  onChange={e => setForm(f => ({ ...f, branch: e.target.value }))}
                  style={inputStyle}
                >
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div style={{ flex: '0 0 100px' }}>
                <label style={labelStyle}>Semester</label>
                <select
                  value={form.semester}
                  onChange={e => setForm(f => ({ ...f, semester: Number(e.target.value) }))}
                  style={inputStyle}
                >
                  {SEMESTERS.map(s => <option key={s} value={s}>Sem {s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Your question</label>
              <textarea
                value={form.question_text}
                onChange={e => setForm(f => ({ ...f, question_text: e.target.value }))}
                placeholder="Ask anything — about subjects, projects, internships, placements..."
                required
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              {submitting ? 'Posting...' : 'Post Question'}
            </button>
          </form>
        </section>
      )}

      {/* ── QUESTIONS LIST ─────────────────────── */}
      <section style={{
        padding: '0 clamp(1.5rem, 6vw, 7rem) clamp(4rem, 8vw, 6rem)',
      }}>

        {loading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            padding: '2rem 0',
          }}>
            <Loader2 size={16} className="animate-spin" />
            Loading questions...
          </div>
        )}

        {error && !loading && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
          }}>
            Couldn't load questions right now. Please try again later.
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: 'clamp(2.5rem, 6vw, 4rem)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <Users size={28} color="var(--accent)" strokeWidth={1.5} />
            <h3 style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--text)',
            }}>
              No questions yet
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              maxWidth: '360px',
              lineHeight: 1.7,
            }}>
              Be the first to ask something — your question might help someone else too.
            </p>
          </div>
        )}

        {!loading && !error && questions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {questions.map(q => (
              <div
                key={q.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleExpand(q.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={tagStyle}>{q.branch}</span>
                    <span style={tagStyle}>Sem {q.semester}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      marginLeft: 'auto',
                    }}>
                      {timeAgo(q.created_at)}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--text)',
                    lineHeight: 1.5,
                  }}>
                    {q.question_text}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                    }}>
                      Asked by {q.name}
                    </span>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                    }}>
                      <MessageCircle size={13} />
                      {expanded === q.id ? 'Hide answers' : 'View answers'}
                      {expanded === q.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </span>
                  </div>
                </button>

                {expanded === q.id && (
                  <div style={{
                    borderTop: '1px solid var(--border)',
                    padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}>
                    {answersLoading[q.id] && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                      }}>
                        <Loader2 size={14} className="animate-spin" />
                        Loading answers...
                      </div>
                    )}

                    {!answersLoading[q.id] && (answers[q.id] || []).length === 0 && (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                      }}>
                        No answers yet. Be the first to help out.
                      </p>
                    )}

                    {(answers[q.id] || []).map(a => (
                      <div
                        key={a.id}
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: '0.75rem',
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.4rem',
                        }}
                      >
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          color: 'var(--text)',
                          lineHeight: 1.6,
                        }}>
                          {a.answer_text}
                        </p>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                        }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--accent)',
                          }}>
                            {a.name}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)',
                          }}>
                            {timeAgo(a.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}

                    <form
                      onSubmit={e => handleSubmitAnswer(e, q.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <input
                          type="text"
                          value={answerForm.name}
                          onChange={e => setAnswerForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Your name"
                          required
                          style={{ ...inputStyle, flex: '0 0 160px' }}
                        />
                        <input
                          type="text"
                          value={answerForm.answer_text}
                          onChange={e => setAnswerForm(f => ({ ...f, answer_text: e.target.value }))}
                          placeholder="Write an answer..."
                          required
                          style={{ ...inputStyle, flex: '1 1 200px' }}
                        />
                      </div>
                      {answerError && (
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          color: 'var(--accent)',
                        }}>
                          {answerError}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={answerSubmitting}
                        className="btn-ghost"
                        style={{ alignSelf: 'flex-start', opacity: answerSubmitting ? 0.6 : 1 }}
                      >
                        {answerSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                        {answerSubmitting ? 'Posting...' : 'Post Answer'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem',
}

const inputStyle = {
  width: '100%',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '0.5rem',
  padding: '0.6rem 0.75rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  color: 'var(--text)',
  outline: 'none',
}

const tagStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  background: 'rgba(232, 69, 60, 0.1)',
  padding: '0.2rem 0.55rem',
  borderRadius: '0.3rem',
}