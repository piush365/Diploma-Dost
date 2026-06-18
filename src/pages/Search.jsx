import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { getSearchResults, groupSearchResults } from '../data/search'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = getSearchResults(query, 60)
  const groupedResults = groupSearchResults(results)

  return (
    <section className="min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SearchIcon size={22} className="text-[var(--accent)]" />
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent)] mb-2 font-bold">
              Search
            </p>
            <h1 className="text-3xl md:text-4xl font-bold">
              Results for "{query}"
            </h1>
          </div>
        </div>

        {groupedResults.length > 0 ? (
          <div className="grid gap-8">
            {groupedResults.map(section => (
              <div key={section.group}>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
                  {section.group}
                </h2>
                <div className="grid gap-3">
                  {section.items.map(result => (
                    <Link
                      key={result.id}
                      to={result.route}
                      className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4 hover:border-[var(--accent)]/40 hover:bg-[var(--surface2)] transition-colors duration-150"
                    >
                      <span className="block font-ui text-base font-semibold text-[var(--text)]">
                        {result.title}
                      </span>
                      <span className="mt-1 block font-body text-sm leading-relaxed text-[var(--text-muted)]">
                        {result.description}
                      </span>
                      <span className="mt-3 inline-flex font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--accent)]">
                        {result.category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
            <p className="font-body text-[var(--text-muted)]">
              No matching content found. Try searching for notes, PYQs, DSA, Java, Unstop, scholarships, placement, or open source.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
