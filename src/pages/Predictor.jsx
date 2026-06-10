import { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Search, AlertTriangle, ChevronDown,
  BookmarkPlus, BookmarkCheck, Trash2, Info, X
} from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── constants ─────────────────────────────────────────────────────────────────

const BRANCHES = ["CS", "IT", "Mech", "Civil", "Elec", "ETC"];
const BRANCH_LABELS = {
  CS: "Computer Science", IT: "Information Technology",
  Mech: "Mechanical", Civil: "Civil",
  Elec: "Electrical", ETC: "Electronics & TC",
};

const CATEGORIES = [
  { value: "OPEN", label: "OPEN" },
  { value: "OBC",  label: "OBC"  },
  { value: "SC",   label: "SC"   },
  { value: "ST",   label: "ST"   },
  { value: "NT-B", label: "NT-B" },
  { value: "NT-C", label: "NT-C" },
  { value: "NT-D", label: "NT-D" },
  { value: "VJ",   label: "VJ"   },
  { value: "EWS",  label: "EWS"  },
  { value: "TFWS", label: "TFWS" },
];

// ─── dropdown ──────────────────────────────────────────────────────────────────

function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2
                    px-4 py-3 rounded-lg border bg-[#141414]
                    font-['General_Sans'] text-sm transition-colors duration-150
                    ${value ? "border-[#2a2a2a] text-[#f0ede6]" : "border-[#2a2a2a] text-[#888]"}
                    hover:border-[#888]`}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={14} strokeWidth={2}
          className={`text-[#888] transition-transform duration-150 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 w-full
                          border border-[#2a2a2a] rounded-lg bg-[#141414]
                          shadow-2xl overflow-hidden max-h-56 overflow-y-auto">
            {options.map((opt) => (
              <button key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 font-['General_Sans'] text-sm
                            hover:bg-[#1a1a1a] transition-colors duration-100
                            ${value === opt.value ? "text-[#e8453c]" : "text-[#f0ede6]"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── branch multi-select ────────────────────────────────────────────────────────

function BranchSelect({ selected, onChange }) {
  const toggle = (b) => {
    if (selected.includes(b)) {
      onChange(selected.filter((x) => x !== b));
    } else {
      onChange([...selected, b]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {BRANCHES.map((b) => (
        <button
          key={b}
          onClick={() => toggle(b)}
          className={`flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg
                      border transition-colors duration-150
                      ${selected.includes(b)
                        ? "border-[#e8453c] bg-[#e8453c]/5"
                        : "border-[#2a2a2a] bg-transparent hover:border-[#888] hover:bg-[#141414]"
                      }`}
        >
          <span className={`font-['JetBrains_Mono'] text-[0.75rem] font-bold tracking-wider
                            ${selected.includes(b) ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
            {b}
          </span>
          <span className="font-['General_Sans'] text-[0.63rem] text-[#888] whitespace-nowrap hidden sm:block">
            {BRANCH_LABELS[b]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── result card ───────────────────────────────────────────────────────────────

function ResultCard({ college, isShortlisted, onToggle }) {
  return (
    <div className={`rounded-lg border bg-[#141414] p-5
                     transition-colors duration-150
                     ${isShortlisted
                       ? "border-[#e8453c]/50"
                       : "border-[#2a2a2a] hover:border-[#e8453c]/30"
                     }`}>

      {/* top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] text-[#888]
                        tracking-wider uppercase mb-1">
            {college.college_code} · {college.district}
          </p>
          <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]
                        text-[0.92rem] leading-snug">
            {college.college_name}
          </p>
        </div>

        {/* cutoff */}
        <div className="shrink-0 text-right">
          <p className="font-['JetBrains_Mono'] text-[1.5rem] font-bold
                        text-[#e8453c] leading-none">
            {college.cutoff}
            <span className="text-[0.65rem] text-[#888] font-normal ml-0.5">%</span>
          </p>
          <p className="font-['General_Sans'] text-[0.63rem] text-[#888] mt-0.5">
            {college.year} cutoff
          </p>
        </div>
      </div>

      {/* tags + action */}
      <div className="flex items-center justify-between gap-3
                      pt-3 border-t border-[#2a2a2a]">
        <div className="flex flex-wrap gap-1.5">
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            {college.branch}
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            {college.category}
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            CAP {college.cap_round}
          </span>
        </div>

        <button
          onClick={() => onToggle(college)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md
                      font-['General_Sans'] text-[0.75rem] font-medium
                      border transition-colors duration-150
                      ${isShortlisted
                        ? "border-[#e8453c]/40 text-[#e8453c] bg-[#e8453c]/5 hover:bg-[#e8453c]/10"
                        : "border-[#2a2a2a] text-[#888] hover:border-[#888] hover:text-[#f0ede6]"
                      }`}
        >
          {isShortlisted
            ? <><BookmarkCheck size={13} strokeWidth={2} /> Shortlisted</>
            : <><BookmarkPlus size={13} strokeWidth={2} /> Shortlist</>
          }
        </button>
      </div>
    </div>
  );
}

// ─── shortlist panel ────────────────────────────────────────────────────────────

function ShortlistPanel({ shortlist, onRemove, onClear }) {
  if (shortlist.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 w-80
                    border border-[#e8453c]/30 rounded-xl bg-[#0d0e0f]
                    shadow-2xl overflow-hidden">

      {/* header */}
      <div className="flex items-center justify-between px-4 py-3
                      border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <BookmarkCheck size={14} strokeWidth={2} className="text-[#e8453c]" />
          <span className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-sm">
            My Shortlist
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.65rem] text-[#e8453c]
                           bg-[#e8453c]/10 px-1.5 py-0.5 rounded">
            {shortlist.length}
          </span>
        </div>
        <button
          onClick={onClear}
          className="font-['General_Sans'] text-[0.72rem] text-[#888]
                     hover:text-[#e8453c] transition-colors duration-150"
        >
          Clear all
        </button>
      </div>

      {/* list */}
      <div className="max-h-64 overflow-y-auto">
        {shortlist.map((c, i) => (
          <div key={c.college_code + c.branch + i}
            className="flex items-center justify-between gap-3
                       px-4 py-3 border-b border-[#1a1a1a] last:border-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888]">
                  #{i + 1}
                </span>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888]">
                  {c.college_code}
                </span>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#e8453c]">
                  {c.cutoff}%
                </span>
              </div>
              <p className="font-['General_Sans'] text-[0.78rem] text-[#f0ede6]
                            truncate leading-snug">
                {c.college_name}
              </p>
              <p className="font-['General_Sans'] text-[0.68rem] text-[#888]">
                {c.branch} · {c.district}
              </p>
            </div>
            <button
              onClick={() => onRemove(c)}
              className="shrink-0 text-[#888] hover:text-[#e8453c]
                         transition-colors duration-150"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>

      {/* footer hint */}
      <div className="px-4 py-2.5 border-t border-[#2a2a2a]">
        <p className="font-['General_Sans'] text-[0.68rem] text-[#888] leading-relaxed">
          Use this order when filling your DTE option form.
        </p>
      </div>
    </div>
  );
}

// ─── main page ─────────────────────────────────────────────────────────────────

export default function Predictor() {
  const [percentage, setpercentage] = useState("");
  const [branches, setBranches]     = useState([]);
  const [category, setCategory]     = useState("");
  const [searched, setSearched]     = useState(false);
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [shortlist, setShortlist]   = useState([]);

  const percentageNum   = parseFloat(percentage);
  const isValidPct      = percentage !== "" && !isNaN(percentageNum) && percentageNum >= 0 && percentageNum <= 100;
  const canSearch       = isValidPct && branches.length > 0 && category;

  // ── shortlist handlers ──
  const isShortlisted = useCallback(
    (c) => shortlist.some((s) => s.college_code === c.college_code && s.branch === c.branch),
    [shortlist]
  );

  const toggleShortlist = useCallback((c) => {
    setShortlist((prev) =>
      prev.some((s) => s.college_code === c.college_code && s.branch === c.branch)
        ? prev.filter((s) => !(s.college_code === c.college_code && s.branch === c.branch))
        : [...prev, c]
    );
  }, []);

  // ── search ──
  async function handleSearch() {
    if (!canSearch) return;
    setSearched(true);
    setLoading(true);
    setError(null);
    setResults([]);

    // TODO: wire real Supabase query once Shraddha's cutoffs table is confirmed
    // Expected columns: college_code, college_name, district, branch,
    //                   category, cutoff_percentage, cap_round, year
    //
    // let query = supabase
    //   .from("cutoffs")
    //   .select("college_code, college_name, district, branch, category, cutoff_percentage, cap_round, year")
    //   .in("branch", branches)
    //   .eq("category", category)
    //   .lte("cutoff_percentage", percentageNum)
    //   .order("cutoff_percentage", { ascending: false });
    //
    // const { data, error: err } = await query;
    // if (err) { setError(err.message); setLoading(false); return; }
    // setResults(data || []);
    // setLoading(false);

    setTimeout(() => { setResults([]); setLoading(false); }, 600);
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-20 pb-32">

      {/* header */}
      <div className="mb-10">
        <p className="font-['JetBrains_Mono'] text-[0.7rem] uppercase tracking-[0.12em] text-[#e8453c] mb-3">
          DTE Maharashtra
        </p>
        <h1 className="font-['Clash_Display'] font-semibold text-[#f0ede6]
                       leading-[1.08] text-[clamp(2rem,5vw,3.25rem)] mb-3">
          College Predictor
        </h1>
        <p className="font-['General_Sans'] text-[#888] text-base max-w-[520px] leading-relaxed">
          Enter your percentage, pick your preferred branches and category —
          we'll show you colleges you're likely to get, so you can plan your
          DTE option form.
        </p>
      </div>

      {/* disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg
                      border border-[#e8453c]/20 bg-[#e8453c]/5 mb-10">
        <AlertTriangle size={15} strokeWidth={2} className="text-[#e8453c] shrink-0 mt-0.5" />
        <p className="font-['General_Sans'] text-[0.8rem] text-[#888] leading-relaxed">
          Based on DTE cutoff data from 2022–2025. Actual 2026 cutoffs may vary
          by ±2–3%. Always verify on the official DTE Maharashtra portal.
        </p>
      </div>

      {/* form */}
      <div className="flex flex-col gap-6 mb-8">

        {/* percentage + category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Your Percentage
            </label>
            <input
              type="number" min="0" max="100" step="0.01"
              placeholder="e.g. 78.50"
              value={percentage}
              onChange={(e) => setpercentage(e.target.value)}
              className="px-4 py-3 rounded-lg border border-[#2a2a2a] bg-[#141414]
                         font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                         hover:border-[#888] focus:border-[#e8453c] focus:outline-none
                         transition-colors duration-150
                         [appearance:textfield]
                         [&::-webkit-outer-spin-button]:appearance-none
                         [&::-webkit-inner-spin-button]:appearance-none"
            />
            {percentage && !isValidPct && (
              <p className="font-['General_Sans'] text-[0.72rem] text-[#e8453c]">
                Enter a value between 0 and 100
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Category
            </label>
            <Dropdown
              value={category}
              onChange={setCategory}
              placeholder="Select your category"
              options={CATEGORIES}
            />
          </div>
        </div>

        {/* branch multi-select */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Preferred Branches
            </label>
            <span className="font-['General_Sans'] text-[0.68rem] text-[#888] opacity-60">
              — pick one or more
            </span>
          </div>
          <BranchSelect selected={branches} onChange={setBranches} />
          {branches.length === 0 && (
            <p className="font-['General_Sans'] text-[0.72rem] text-[#888] opacity-60">
              Select at least one branch
            </p>
          )}
        </div>

      </div>

      {/* search button */}
      <button
        onClick={handleSearch}
        disabled={!canSearch}
        className={`flex items-center gap-2 px-8 py-3 rounded-lg
                    font-['Cabinet_Grotesk'] font-semibold text-sm
                    transition-all duration-150 mb-12
                    ${canSearch
                      ? "bg-[#e8453c] text-white hover:bg-[#d03d35] cursor-pointer"
                      : "bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] cursor-not-allowed"
                    }`}
      >
        <Search size={15} strokeWidth={2} />
        Find Colleges
      </button>

      {/* results */}
      <div>
        {loading && (
          <div className="flex flex-col items-center gap-3 py-20">
            <div className="w-5 h-5 border-2 border-[#e8453c] border-t-transparent rounded-full animate-spin" />
            <p className="font-['General_Sans'] text-[#888] text-sm">Searching cutoff data…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <p className="font-['General_Sans'] text-[#e8453c] text-sm">{error}</p>
          </div>
        )}

        {!searched && !loading && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
              <Search size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
              Ready when you are
            </p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[320px] leading-relaxed">
              Fill in your percentage, category, and preferred branches — then
              shortlist colleges to plan your option form.
            </p>
          </div>
        )}

        {searched && !loading && !error && results.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
              <Info size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
              No colleges found
            </p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[320px] leading-relaxed">
              No colleges had a cutoff at or below {percentage}% for your
              selected branches and category. Try selecting more branches or
              a different category.
            </p>
          </div>
        )}

        {searched && !loading && !error && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-['JetBrains_Mono'] text-[0.7rem] text-[#888] tracking-wider uppercase">
                {results.length} college{results.length !== 1 ? "s" : ""} found
                · {percentage}% · {category}
              </p>
              {shortlist.length > 0 && (
                <p className="font-['General_Sans'] text-[0.75rem] text-[#e8453c]">
                  {shortlist.length} shortlisted
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((c, i) => (
                <ResultCard
                  key={c.college_code + c.branch + i}
                  college={c}
                  isShortlisted={isShortlisted(c)}
                  onToggle={toggleShortlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* floating shortlist panel */}
      <ShortlistPanel
        shortlist={shortlist}
        onRemove={toggleShortlist}
        onClear={() => setShortlist([])}
      />

    </section>
  );
}