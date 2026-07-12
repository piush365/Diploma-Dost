import { useEffect, useState } from "react";
import { supabase } from '../lib/supabase';

// ─── 2025-26 Historical Reference (hardcoded, never changes) ─────────────────
const LAST_YEAR = [
  // Pre-CAP
  { title: "Online Registration & Document Upload",            date: "04 Jul – 19 Jul 2025" },
  { title: "Document Verification & Application Confirmation", date: "05 Jul – 20 Jul 2025" },
  { title: "Provisional Merit List Display",                   date: "23 Jul 2025" },
  { title: "Merit List Grievances & Corrections",              date: "24 Jul – 26 Jul 2025" },
  { title: "Final Merit List Display",                         date: "29 Jul 2025" },
  // CAP Round I
  { title: "CAP Round I – Seat Matrix Display",                date: "31 Jul 2025" },
  { title: "CAP Round I – Option Form Submission",             date: "01 Aug – 03 Aug 2025" },
  { title: "CAP Round I – Provisional Allotment",               date: "05 Aug 2025" },
  { title: "CAP Round I – Seat Acceptance",                    date: "06 Aug – 08 Aug 2025" },
  { title: "CAP Round I – Admission Confirmation",             date: "06 Aug – 08 Aug 2025" },
  // CAP Round II
  { title: "CAP Round II – Vacant Seats Display",              date: "09 Aug 2025" },
  { title: "CAP Round II – Option Form Submission",            date: "10 Aug – 12 Aug 2025" },
  { title: "CAP Round II – Provisional Allotment",             date: "14 Aug 2025" },
  { title: "CAP Round II – Seat Acceptance",                   date: "16 Aug – 20 Aug 2025" },
  { title: "CAP Round II – Admission Confirmation",            date: "16 Aug – 20 Aug 2025" },
  // CAP Round III
  { title: "CAP Round III – Vacant Seats Display",             date: "21 Aug 2025" },
  { title: "CAP Round III – Option Form Submission",           date: "22 Aug – 24 Aug 2025" },
  { title: "CAP Round III – Provisional Allotment",            date: "26 Aug 2025" },
  { title: "CAP Round III – Seat Acceptance",                  date: "28 Aug – 30 Aug 2025" },
  { title: "CAP Round III – Admission Confirmation",           date: "28 Aug – 30 Aug 2025" },
  // CAP Round IV
  { title: "CAP Round IV – Vacant Seats Display",              date: "31 Aug 2025" },
  { title: "CAP Round IV – Option Form Submission",            date: "31 Aug – 02 Sep 2025" },
  { title: "CAP Round IV – Provisional Allotment",             date: "04 Sep 2025" },
  { title: "CAP Round IV – Seat Acceptance",                   date: "05 Sep – 08 Sep 2025" },
  { title: "CAP Round IV – Admission Confirmation",            date: "05 Sep – 08 Sep 2025" },
  // Institute Level
  { title: "Institute Level – Option Form Submission",         date: "31 Jul – 04 Sep 2025" },
  { title: "Institute Level – Candidate List Transfer",        date: "08 Sep 2025" },
  { title: "Institute Level – Vacant Seat Display",            date: "09 Sep – 15 Sep 2025" },
  // Closure
  { title: "Last Date for Seat Cancellation (Full Refund)",    date: "13 Sep 2025" },
  { title: "Admission Closed – Cut-off Date",                  date: "15 Sep 2025" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "completed")
    return (
      <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-wider text-[#e8453c] font-bold">
        Done
      </span>
    );
  if (status === "current")
    return (
      <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-wider text-[#c8f04d] font-bold">
        Now
      </span>
    );
  return (
    <span className="font-['General_Sans'] text-xs text-[var(--text-muted)]">
      TBA
    </span>
  );
}

// ─── Timeline Row ─────────────────────────────────────────────────────────────
function TimelineRow({ step, index }) {
  const isCompleted = step.status === "completed";
  const isCurrent   = step.status === "current";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-xl border transition-colors ${
        isCompleted
          ? "border-[#e8453c]/20 bg-[#e8453c]/5"
          : isCurrent
          ? "border-[#c8f04d]/30 bg-[#c8f04d]/10"
          : "border-[var(--border)] bg-[var(--surface2)]"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Step number */}
        <span
          className={`font-['JetBrains_Mono'] text-[0.6rem] w-5 text-right flex-shrink-0 ${
            isCompleted ? "text-[#e8453c]/50" : isCurrent ? "text-[#c8f04d]/70" : "text-[var(--text-muted)]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Dot */}
        <div
          className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
            isCompleted ? "bg-[#e8453c]" : isCurrent ? "bg-[#c8f04d] shadow-[0_0_8px_#c8f04d88]" : "bg-[var(--border)]"
          }`}
        />
        <div>
          <h3 className="font-['Cabinet_Grotesk'] font-medium text-[var(--text)] text-sm leading-snug">
            {step.title}
          </h3>
          {step.date ? (
            <p className="font-['JetBrains_Mono'] text-[0.6rem] text-[var(--text)] opacity-60 mt-0.5 tracking-wide">
              {step.date}
            </p>
          ) : (
            <p className="font-['JetBrains_Mono'] text-[0.6rem] text-[var(--text)] opacity-30 mt-0.5 tracking-wide italic">
              Date not announced
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 md:mt-0 md:flex-shrink-0 md:pl-4 flex items-center gap-3">
        {step.link && (
          <a
            href={step.link}
            target="_blank"
            rel="noreferrer"
            className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-wider text-[#c8f04d] border border-[#c8f04d]/30 px-2 py-1 rounded hover:bg-[#c8f04d]/10 transition-colors"
          >
            View →
          </a>
        )}
        <StatusBadge status={step.status} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdmissionProgress() {
  const [steps, setSteps]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showLastYear, setShowLastYear] = useState(false);

  const fetchData = () => {
    supabase
      .from('cap_dse_schedule')
      .select('activity, date_display, link, status, sort_order')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) { setError(error.message); setLoading(false); return; }
        setSteps(
          (data ?? []).map((row) => ({
            title: row.activity,
            date: row.date_display,
            link: row.link,
            status: row.status === 'tba' ? '' : row.status,
          }))
        );
        setLastUpdated(new Date());
        setLoading(false);
        setError(null);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(interval);
  }, []);

  const currentStep     = steps.find((s) => s.status === "current");
  const completedCount  = steps.filter((s) => s.status === "completed").length;
  const progress        = steps.length
    ? Math.round(((completedCount + (currentStep ? 1 : 0)) / steps.length) * 100)
    : 0;

  // ── Loading ──
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div role="status" aria-label="Loading admission schedule" className="inline-flex items-center gap-3 text-[var(--text-muted)] font-['General_Sans']">
          <span className="h-2 w-2 rounded-full bg-[#c8f04d] animate-pulse" aria-hidden="true" />
          Loading admission schedule…
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-[#e8453c]/10 border border-[#e8453c]/30 rounded-xl p-5 flex items-start gap-3">
          <span className="text-[#e8453c] mt-0.5">⚠</span>
          <div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#e8453c] mb-1">
              Could not load live schedule
            </p>
            <p className="font-['General_Sans'] text-sm text-[var(--text-muted)]">
              {error}. Try refreshing the page.
            </p>
            <button
              onClick={() => fetchData()}
              className="mt-3 font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-wider
                         border border-[#e8453c]/40 text-[#e8453c] px-3 py-1.5 rounded
                         hover:bg-[#e8453c]/10 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* ── Header ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.15em] text-[var(--text-muted)]">
            DSE · AY 2026–27
          </span>
          {lastUpdated && (
            <>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[var(--text-muted)]">
                updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <button
                onClick={() => fetchData()}
                title="Refresh"
                className="text-[var(--text-muted)] hover:text-[var(--text-muted)] transition-colors text-xs ml-1"
              >
                ↻
              </button>
            </>
          )}
        </div>
        <h1 className="font-['Clash_Display'] text-4xl md:text-5xl font-bold mb-3 text-[var(--text)]">
          Admission Progress
        </h1>
        <p className="font-['General_Sans'] text-base text-[var(--text-muted)] max-w-xl">
          Live tracker for Direct Second Year (Lateral Entry) Engineering admissions in Maharashtra.
          Dates updated as CET Cell announces them.
        </p>
      </div>

      {/* ── Current Update ── */}
      {currentStep ? (
        <div className="bg-[var(--surface)] border border-[#c8f04d]/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#c8f04d] animate-pulse flex-shrink-0" />
            <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.15em] text-[#c8f04d] font-bold">
              Currently Active
            </span>
          </div>
          <h2 className="font-['Clash_Display'] text-2xl font-bold text-[var(--text)] mb-1">
            {currentStep.title}
          </h2>
          {currentStep.date && (
            <p className="font-['JetBrains_Mono'] text-xs text-[#c8f04d] mb-2 tracking-wide">
              {currentStep.date}
            </p>
          )}
          {currentStep.link && (
            <a
              href={currentStep.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#c8f04d] text-[var(--bg)] hover:opacity-90 transition-opacity
                         px-5 py-2 rounded-lg font-['Cabinet_Grotesk'] font-semibold text-sm"
            >
              Open →
            </a>
          )}
        </div>
      ) : (
        /* No current step = waiting for CET Cell announcement */
        <div className="bg-[var(--surface)] border border-[#f0a843]/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f0a843] animate-pulse flex-shrink-0" />
            <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.15em] text-[#f0a843] font-bold">
              Awaiting Announcement
            </span>
          </div>
          <h2 className="font-['Clash_Display'] text-2xl font-bold text-[var(--text)] mb-1">
            Schedule Not Yet Released
          </h2>
          <p className="font-['General_Sans'] text-sm text-[var(--text-muted)]">
            CET Cell has not announced the 2026–27 CAP schedule yet. Check back here — this page
            updates automatically. You can also monitor{" "}
            <a
              href="https://mahacet.org"
              target="_blank"
              rel="noreferrer"
              className="text-[#c8f04d] underline underline-offset-2"
            >
              mahacet.org
            </a>{" "}
            directly.
          </p>
        </div>
      )}

      {/* ── Progress Bar ── */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 mb-6">
        <div className="flex justify-between items-baseline mb-3">
          <span className="font-['Cabinet_Grotesk'] font-semibold text-[var(--text)] text-sm">
            Admission Journey
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-['Clash_Display'] text-2xl font-bold text-[#c8f04d]">
              {progress}%
            </span>
            <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[var(--text-muted)] uppercase tracking-wide">
              complete
            </span>
          </div>
        </div>
        <div className="w-full h-2 bg-[var(--surface2)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c8f04d] transition-all duration-700 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-['JetBrains_Mono'] text-[0.55rem] text-[var(--text-muted)] uppercase tracking-wide">
            {completedCount} of {steps.length} steps done
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.55rem] text-[var(--text-muted)] uppercase tracking-wide">
            {steps.length - completedCount - (currentStep ? 1 : 0)} remaining
          </span>
        </div>
      </div>

      {/* ── 2026-27 Timeline ── */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Clash_Display'] text-2xl font-bold text-[var(--text)]">
            2026–27 Schedule
          </h2>
          <div className="flex items-center gap-4 text-[0.6rem] font-['JetBrains_Mono'] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-[#e8453c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8453c]" /> Done
            </span>
            <span className="flex items-center gap-1.5 text-[#c8f04d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8f04d]" /> Now
            </span>
            <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--border)]" /> TBA
            </span>
          </div>
        </div>

        {steps.length === 0 ? (
          <div>
            <div className="flex items-start gap-3 bg-[#f0a843]/10 border border-[#f0a843]/20 rounded-xl px-4 py-3 mb-4">
              <span className="text-[#f0a843] mt-0.5 flex-shrink-0">⏳</span>
              <p className="font-['General_Sans'] text-xs text-[#f0a843] leading-relaxed">
                Official 2026–27 dates not yet announced by CET Cell. Showing estimated dates based on last year's schedule — useful for planning ahead.
              </p>
            </div>
            <div className="space-y-2">
              {LAST_YEAR.map((step, i) => (
                <TimelineRow key={i} step={{ title: step.title, date: `~${step.date.replace(/\d{4}/g, "2026")}`, status: "" }} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {steps.some((s) => !s.date) && (
              <div className="flex items-start gap-3 bg-[#f0a843]/10 border border-[#f0a843]/20 rounded-xl px-4 py-3 mb-4">
                <span className="text-[#f0a843] mt-0.5 flex-shrink-0">⏳</span>
                <p className="font-['General_Sans'] text-xs text-[#f0a843] leading-relaxed">
                  Some 2026–27 dates are not yet announced. Steps marked <span className="font-semibold">~est.</span> show estimated dates based on last year's schedule.
                </p>
              </div>
            )}
            <div className="space-y-2">
              {steps.map((step, i) => {
                if (step.date) return <TimelineRow key={step.title} step={step} index={i} />;
                const est = LAST_YEAR.find((ly) =>
                  ly.title.toLowerCase().includes(step.title.toLowerCase().slice(0, 20)) ||
                  step.title.toLowerCase().includes(ly.title.toLowerCase().slice(0, 20))
                );
                return (
                  <TimelineRow
                    key={step.title}
                    step={{ ...step, date: est ? `~est. ${est.date.replace(/\d{4}/g, "2026")}` : "" }}
                    index={i}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── 2025-26 Reference (collapsible) ── */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowLastYear((v) => !v)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--surface2)] transition-colors"
        >
          <div>
            <h2 className="font-['Clash_Display'] text-xl font-bold text-[var(--text)]">
              2025–26 Reference Schedule
            </h2>
            <p className="font-['General_Sans'] text-xs text-[var(--text-muted)] mt-0.5">
              Last year's dates — useful for estimating when 2026–27 activities might fall
            </p>
          </div>
          <span
            className={`font-['JetBrains_Mono'] text-[var(--text-muted)] text-lg transition-transform duration-300 ${
              showLastYear ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button>

        {showLastYear && (
          <div className="px-6 pb-6 border-t border-[var(--border)]">
            <div className="mt-4 mb-4 bg-[#f0a843]/10 border border-[#f0a843]/20 rounded-xl px-4 py-3">
              <p className="font-['General_Sans'] text-xs text-[#f0a843]">
                ⚠ These are last year's dates. The 2026–27 schedule will differ — use these only as
                a rough reference for when to expect each activity.
              </p>
            </div>
            <div className="space-y-2">
              {LAST_YEAR.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                             py-3 px-4 rounded-xl border border-[var(--border)] bg-[var(--surface2)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-['JetBrains_Mono'] text-[0.55rem] text-[var(--text-muted)] w-4 text-right flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--border)] flex-shrink-0" />
                    <span className="font-['Cabinet_Grotesk'] text-sm text-[var(--text)]">
                      {step.title}
                    </span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[0.65rem] text-[#c8f04d] mt-1 sm:mt-0 sm:pl-4 flex-shrink-0 tracking-wide">
                    {step.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer note ── */}
      <p className="mt-6 text-center font-['General_Sans'] text-xs text-[var(--text-muted)]">
        Data sourced from{" "}
        <a href="https://mahacet.org" target="_blank" rel="noreferrer"
           className="underline underline-offset-2 hover:text-[var(--text-muted)] transition-colors">
          mahacet.org
        </a>{" "}
        · Updates every 10 minutes · Schedule subject to change by CET Cell
      </p>
    </div>
  );
}
