import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { getHybridSearchResults, groupSearchResults } from '../data/search'

const placeholder = 'Search resources, roadmaps, PYQs...'

export default function SearchBar({ mobile = false, onNavigate }) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [resultsOpen, setResultsOpen] = useState(false)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Debounced search
useEffect(() => {
  let cancelled = false

  const timeoutId = window.setTimeout(async () => {
    const term = query.trim()

    if (!term) {
      setLoading(false)
      setResults([])
      return
    }

    setLoading(true)
    try {
      const searchResults = await getHybridSearchResults(term, 12)
      if (!cancelled) {
        setResults(searchResults)
      }
    } finally {
      if (!cancelled) {
        setLoading(false)
      }
    }
  }, 300)

  return () => {
    cancelled = true
    window.clearTimeout(timeoutId)
  }
}, [query])

  const groupedResults = groupSearchResults(results)
  const showResults = resultsOpen && query.trim().length > 0 && (!mobile || expanded)

  const handleExpand = () => {
    setExpanded(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setResultsOpen(false)
    inputRef.current?.focus()
  }

  const handleResultClick = route => {
    navigate(route)
    setQuery('')
    setResults([])
    setResultsOpen(false)
    setExpanded(false)
    onNavigate?.()
  }

  const handleSubmit = event => {
    event.preventDefault()

    const term = query.trim()

    if (!term) {
      return
    }

    navigate(`/search?q=${encodeURIComponent(term)}`)
    setResultsOpen(false)
    setExpanded(false)
    onNavigate?.()
  }

  const wrapperClass = mobile
    ? 'relative md:hidden'
    : 'relative hidden md:block w-56 lg:w-64'

  return (
    <div className={wrapperClass}>
      {mobile && !expanded ? (
        <button
          type="button"
          aria-label="Open search"
          onClick={handleExpand}
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors duration-200 outline-none"
          onFocus={e => {
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)'
          }}
          onBlur={e => {
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Search size={20} />
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={mobile ? 'absolute right-0 top-11 z-50 w-[min(82vw,22rem)]' : ''}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors duration-200 focus-within:border-[var(--accent)]"
          >
            <Search size={16} className="shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                setResultsOpen(true)
              }}
              onFocus={() => setResultsOpen(true)}
              onBlur={() => {
                window.setTimeout(() => {
                  setResultsOpen(false)
                  if (mobile && !query.trim()) {
                    setExpanded(false)
                  }
                }, 120)
              }}
              placeholder={placeholder}
              className="w-full min-w-0 bg-transparent font-ui text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
            />
            {loading && (
              <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            )}
            {query && !loading && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClear}
                className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-150 outline-none"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {showResults && (
            <div className="absolute left-0 top-12 z-50 max-h-[70vh] w-full overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
              {loading ? (
                <div className="px-3 py-3 font-body text-sm text-[var(--text-muted)] flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                  Searching...
                </div>
              ) : groupedResults.length > 0 ? (
                groupedResults.map(section => (
                  <div key={section.group} className="border-b border-[var(--border)] last:border-b-0">
                    <div className="px-3 pt-3 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--accent)]">
                      {section.group}
                    </div>
                    {section.items.map(result => (
                      <button
                        key={result.id}
                        type="button"
                        onMouseDown={event => event.preventDefault()}
                        onClick={() => handleResultClick(result.route)}
                        className="w-full px-3 py-2.5 text-left hover:bg-[var(--surface2)] transition-colors duration-150"
                      >
                        <span className="block font-ui text-sm font-semibold text-[var(--text)]">
                          {result.title}
                        </span>
                        <span className="block font-body text-xs leading-relaxed text-[var(--text-muted)]">
                          {result.description}
                        </span>
                      </button>
                    ))}
                  </div>
                ))
              ) : (
                <div className="px-3 py-3 font-body text-sm text-[var(--text-muted)]">
                  No matching content found.
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  )
}
