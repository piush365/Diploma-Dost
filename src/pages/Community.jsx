import { useState, useEffect } from 'react'
import {
  Users, MessageCircle, Send, Loader2,
  ChevronDown, ChevronUp, Plus, X, ArrowBigUp, ThumbsUp
} from 'lucide-react'
import { supabase, isMockMode } from '../lib/supabase'

const BRANCHES = ['CS', 'IT', 'AIDS', 'AIML', 'DS', 'ENTC', 'Electrical', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'Automobile', 'Instrumentation', 'Production', 'Robotics', 'Textile']
const SEMESTERS = [1, 2, 3, 4, 5, 6]
const TOPIC_CHIPS = ['DSA', 'Placements', 'Internship', 'Web Dev', 'App Dev', 'DBMS', 'OS', 'CN', 'Java', 'Python', 'C++', 'React', 'AI', 'ML', 'Data Science', 'Projects', 'Resume', 'Interview', 'LeetCode', 'Cyber Security', 'Cloud']
const ORGANIZED_TAGS = {
  branches: ['CS', 'IT', 'AIDS', 'AIML', 'DS', 'ENTC', 'Electrical', 'Mechanical', 'Civil'],
  semesters: ['SEM1', 'SEM2', 'SEM3', 'SEM4', 'SEM5', 'SEM6'],
  topics: ['DSA', 'Placements', 'Internship', 'Web Dev', 'DBMS', 'OS', 'CN', 'Java', 'Python', 'React', 'AI', 'ML', 'Projects', 'Resume', 'Interview', 'LeetCode']
}

export default function Community() {
  const [allQuestions, setAllQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('newest')
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Track voted question IDs locally for duplicate prevention
  const [votedQuestionIds, setVotedQuestionIds] = useState(() => {
    try {
      const saved = localStorage.getItem('community-voted-questions')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    branch: 'CS',
    semester: 1,
    question_text: '',
    selectedTopics: [],
  })
  const [formErrors, setFormErrors] = useState({})

  const [expanded, setExpanded] = useState(null)
  const [answers, setAnswers] = useState({})
  const [answersLoading, setAnswersLoading] = useState({})

  const [answerForm, setAnswerForm] = useState({ name: '', answer_text: '' })
  const [answerSubmitting, setAnswerSubmitting] = useState(false)
  const [answerError, setAnswerError] = useState(null)

  // Save voted question IDs to localStorage
  useEffect(() => {
    localStorage.setItem('community-voted-questions', JSON.stringify(votedQuestionIds))
  }, [votedQuestionIds])

  // Apply filters and sorting whenever allQuestions, sortBy, selectedBranch, selectedSemester, selectedTopic, or searchQuery change
  useEffect(() => {
    if (allQuestions.length > 0) {
      let filtered = [...allQuestions]

      // Apply unanswered filter if sortBy is unanswered
      if (sortBy === 'unanswered') {
        filtered = filtered.filter(q => (q.answer_count || 0) === 0)
      }

      // Apply branch filter
      if (selectedBranch) {
        filtered = filtered.filter(q => q.branch === selectedBranch)
      }

      // Apply semester filter
      if (selectedSemester) {
        const semNumber = parseInt(selectedSemester.replace('SEM', ''))
        filtered = filtered.filter(q => q.semester === semNumber)
      }

      // Apply topic filter
      if (selectedTopic) {
        filtered = filtered.filter(q => (q.tags || []).includes(selectedTopic))
      }

      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        filtered = filtered.filter(q => {
          const searchInTags = (q.tags || []).some(tag => tag.toLowerCase().includes(query))
          const searchInTitle = q.question_text.toLowerCase().includes(query)
          const searchInAuthor = q.name.toLowerCase().includes(query)
          return searchInTags || searchInTitle || searchInAuthor
        })
      }

      // Apply sorting
      const sorted = sortQuestions(filtered, sortBy)
      setQuestions(sorted)
    }
  }, [allQuestions, sortBy, selectedBranch, selectedSemester, selectedTopic, searchQuery])

  useEffect(() => {
    fetchQuestions()
  }, [])

  function sortQuestions(questionsArray, sortType) {
    const sorted = [...questionsArray]
    if (sortType === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sortType === 'most_upvoted') {
      sorted.sort((a, b) => {
        const voteDiff = (b.upvote_count || 0) - (a.upvote_count || 0)
        if (voteDiff !== 0) return voteDiff
        return new Date(b.created_at) - new Date(a.created_at)
      })
    } else if (sortType === 'unanswered') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    return sorted
  }

  async function fetchQuestions() {
    let cancelled = false
    setLoading(true)
    setError(null)

    // Mock data for when Supabase isn't set up
    const mockQuestions = [
      {
        id: 1,
        name: "Priya S.",
        branch: "CS",
        semester: 5,
        question_text: "How to prepare for campus placements?",
        upvote_count: 12,
        tags: ["Placements", "DSA"],
        answer_count: 2,
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 2,
        name: "Rahul K.",
        branch: "IT",
        semester: 4,
        question_text: "Best resources for learning React?",
        upvote_count: 8,
        tags: ["React", "Web Dev"],
        answer_count: 0,
        created_at: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 3,
        name: "Ananya M.",
        branch: "Mechanical",
        semester: 6,
        question_text: "How to get an internship in core mechanical?",
        upvote_count: 5,
        tags: ["Internship", "Projects"],
        answer_count: 0,
        created_at: new Date(Date.now() - 259200000).toISOString()
      }
    ]

    if (isMockMode) {
      setAllQuestions(mockQuestions)
      setLoading(false)
      return () => { cancelled = true }
    }

    try {
      const { data, error } = await supabase.from('questions').select('*')

      if (!cancelled) {
        if (error) {
          setAllQuestions(mockQuestions)
          setError(null)
        } else {
          setAllQuestions(data || [])
        }
        setLoading(false)
      }
    } catch (e) {
      if (!cancelled) {
        setAllQuestions(mockQuestions)
        setLoading(false)
      }
    }
    return () => { cancelled = true }
  }

  async function upvoteQuestion(questionId) {
    const question = allQuestions.find(q => q.id === questionId)
    if (!question) return
    // Prevent duplicate votes
    if (votedQuestionIds.includes(questionId)) return

    const newCount = (question.upvote_count || 0) + 1
    // Update locally and re-sort
    setAllQuestions(prev => {
      const updated = prev.map(q => q.id === questionId ? { ...q, upvote_count: newCount } : q)
      return updated
    })
    setVotedQuestionIds(prev => [...prev, questionId])

    if (!isMockMode) {
      try {
        await supabase.from('questions').update({ upvote_count: newCount }).eq('id', questionId)
      } catch {
        // Revert if Supabase update fails
        setAllQuestions(prev => {
          const reverted = prev.map(q => q.id === questionId ? { ...q, upvote_count: question.upvote_count || 0 } : q)
          return reverted
        })
        setVotedQuestionIds(prev => prev.filter(id => id !== questionId))
      }
    }
  }

  // Mock answers for testing
  const mockAnswers = {
    1: [
      { id: 101, question_id: 1, name: "Vikram", answer_text: "Start with LeetCode easy problems!", created_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 102, question_id: 1, name: "Sneha", answer_text: "Practice daily for at least 3-4 hours!", created_at: new Date(Date.now() - 7200000).toISOString() }
    ]
  }

  async function fetchAnswers(questionId) {
    if (answers[questionId]) return
    setAnswersLoading(prev => ({ ...prev, [questionId]: true }))

    if (isMockMode) {
      setAnswers(prev => ({ ...prev, [questionId]: mockAnswers[questionId] || [] }))
      setAnswersLoading(prev => ({ ...prev, [questionId]: false }))
      return
    }

    try {
      const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('question_id', questionId)
        .order('created_at', { ascending: true })

      if (error) {
        setAnswers(prev => ({ ...prev, [questionId]: mockAnswers[questionId] || [] }))
      } else {
        setAnswers(prev => ({ ...prev, [questionId]: data || [] }))
      }
    } catch {
      setAnswers(prev => ({ ...prev, [questionId]: mockAnswers[questionId] || [] }))
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
      setAnswerError(null)
    }
  }

  async function handleSubmitQuestion(e) {
    e.preventDefault()
    
    // Validate
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.branch) errors.branch = 'Branch is required'
    if (!form.semester) errors.semester = 'Semester is required'
    if (!form.question_text.trim()) errors.question_text = 'Question is required'
    else if (form.question_text.trim().length < 10) errors.question_text = 'Question must be at least 10 characters'
    if (form.selectedTopics.length === 0) errors.selectedTopics = 'Please select at least one topic'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setFormErrors({})

    const tagsArray = form.selectedTopics

    setSubmitting(true)
    const newQuestion = {
      id: Date.now(),
      name: form.name.trim(),
      branch: form.branch,
      semester: form.semester,
      question_text: form.question_text.trim(),
      tags: tagsArray,
      upvote_count: 0,
      answer_count: 0,
      created_at: new Date().toISOString()
    }

    if (isMockMode) {
      setAllQuestions(prev => [newQuestion, ...prev])
      setForm({ name: '', branch: 'CS', semester: 1, question_text: '', selectedTopics: [] })
      setShowForm(false)
      setSubmitting(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([{
          name: form.name.trim(),
          branch: form.branch,
          semester: form.semester,
          question_text: form.question_text.trim(),
          tags: tagsArray,
          upvote_count: 0,
          answer_count: 0,
        }])
        .select()

      if (!error && data) {
        setAllQuestions(prev => [data[0], ...prev])
        setForm({ name: '', branch: 'CS', semester: 1, question_text: '', selectedTopics: [] })
        setShowForm(false)
      } else if (error) {
        setAllQuestions(prev => [newQuestion, ...prev])
        setForm({ name: '', branch: 'CS', semester: 1, question_text: '', selectedTopics: [] })
        setShowForm(false)
      }
    } catch {
      setAllQuestions(prev => [newQuestion, ...prev])
      setForm({ name: '', branch: 'CS', semester: 1, question_text: '', selectedTopics: [] })
      setShowForm(false)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSubmitAnswer(e, questionId) {
    e.preventDefault()
    if (!answerForm.name.trim() || !answerForm.answer_text.trim()) return

    setAnswerSubmitting(true)
    setAnswerError(null)
    const newAnswer = {
      id: Date.now(),
      question_id: questionId,
      name: answerForm.name.trim(),
      answer_text: answerForm.answer_text.trim(),
      created_at: new Date().toISOString()
    }

    // Increment answer_count locally
    setAllQuestions(prev => {
      return prev.map(q => q.id === questionId ? { ...q, answer_count: (q.answer_count || 0) + 1 } : q)
    })

    if (isMockMode) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: [...(prev[questionId] || []), newAnswer],
      }))
      setAnswerForm({ name: '', answer_text: '' })
      setAnswerSubmitting(false)
      return
    }

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
        setAnswers(prev => ({
          ...prev,
          [questionId]: [...(prev[questionId] || []), newAnswer],
        }))
        setAnswerForm({ name: '', answer_text: '' })
      }
    } catch {
      setAnswers(prev => ({
        ...prev,
        [questionId]: [...(prev[questionId] || []), newAnswer],
      }))
      setAnswerForm({ name: '', answer_text: '' })
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
                  style={inputStyle}
                />
                {formErrors.name && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.name}</p>}
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
                {formErrors.branch && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.branch}</p>}
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
                {formErrors.semester && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.semester}</p>}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Your question</label>
              <textarea
                value={form.question_text}
                onChange={e => setForm(f => ({ ...f, question_text: e.target.value }))}
                placeholder="Ask anything — about subjects, projects, internships, placements..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
              />
              {formErrors.question_text && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.question_text}</p>}
            </div>

            <div>
              <label style={labelStyle}>Select topics</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {TOPIC_CHIPS.map(topic => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      setForm(f => ({
                        ...f,
                        selectedTopics: f.selectedTopics.includes(topic) 
                          ? f.selectedTopics.filter(t => t !== topic) 
                          : [...f.selectedTopics, topic]
                      }))
                    }}
                    style={{
                      ...tagStyle,
                      cursor: 'pointer',
                      background: form.selectedTopics.includes(topic) 
                        ? 'rgba(232, 69, 60, 0.3)' 
                        : 'rgba(232, 69, 60, 0.1)'
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
              {formErrors.selectedTopics && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{formErrors.selectedTopics}</p>}
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

        {!loading && !error && questions.length > 0 && (
          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              style={inputStyle}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select
                value={selectedBranch || ''}
                onChange={e => setSelectedBranch(e.target.value || null)}
                style={{ ...inputStyle, width: 'auto', minWidth: '130px' }}
              >
                <option value="">All Branches</option>
                {['CS', 'IT', 'AIDS', 'AIML', 'DS', 'ENTC', 'Electrical', 'Electronics', 'Mechanical'].map(tag => <option key={tag} value={tag}>{tag}</option>)}
              </select>
              <select
                value={selectedSemester || ''}
                onChange={e => setSelectedSemester(e.target.value || null)}
                style={{ ...inputStyle, width: 'auto', minWidth: '130px' }}
              >
                <option value="">All Semesters</option>
                {['SEM1', 'SEM2', 'SEM3', 'SEM4', 'SEM5', 'SEM6'].map(tag => <option key={tag} value={tag}>{tag}</option>)}
              </select>
              <select
                value={selectedTopic || ''}
                onChange={e => setSelectedTopic(e.target.value || null)}
                style={{ ...inputStyle, width: 'auto', minWidth: '130px' }}
              >
                <option value="">All Topics</option>
                {TOPIC_CHIPS.map(tag => <option key={tag} value={tag}>{tag}</option>)}
              </select>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ ...inputStyle, width: 'auto', minWidth: '180px' }}
              >
                <option value="newest">Newest</option>
                <option value="most_upvoted">Most Upvoted</option>
                <option value="unanswered">Unanswered</option>
              </select>
            </div>
          </div>
        )}

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
                <div
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
                    <span
                      onClick={(e) => { e.stopPropagation(); setSelectedBranch(q.branch) }}
                      style={{ ...tagStyle, cursor: 'pointer' }}
                    >
                      {q.branch}
                    </span>
                    <span
                      onClick={(e) => { e.stopPropagation(); setSelectedSemester(`SEM${q.semester}`) }}
                      style={{ ...tagStyle, cursor: 'pointer' }}
                    >
                      SEM{q.semester}
                    </span>
                    {q.tags && q.tags.length > 0 && q.tags.map(tag => (
                      <span
                        key={tag}
                        onClick={(e) => { e.stopPropagation(); setSelectedTopic(tag) }}
                        style={{ ...tagStyle, cursor: 'pointer' }}
                      >
                        {tag}
                      </span>
                    ))}
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
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                      }}>
                        Asked by {q.name}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); upvoteQuestion(q.id); }}
                        disabled={votedQuestionIds.includes(q.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: votedQuestionIds.includes(q.id) ? 'rgba(232, 69, 60, 0.3)' : 'rgba(232, 69, 60, 0.1)',
                          border: '1px solid transparent',
                          borderRadius: '0.5rem',
                          padding: '0.35rem 0.7rem',
                          cursor: votedQuestionIds.includes(q.id) ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s ease',
                          opacity: votedQuestionIds.includes(q.id) ? 0.7 : 1,
                        }}
                      >
                        <ThumbsUp 
                          size={14} 
                          color="var(--accent)" 
                          fill={votedQuestionIds.includes(q.id) ? 'var(--accent)' : 'none'}
                        />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--accent)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}>
                          {q.upvote_count || 0} votes
                        </span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                      }}>
                        <MessageCircle size={13} />
                        {(q.answer_count || 0) === 0 ? 'No Answers' : `${q.answer_count || 0} Answers`}
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
                        {expanded === q.id ? 'Hide answers' : 'View answers'}
                        {expanded === q.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </span>
                    </div>
                  </div>
                </div>

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