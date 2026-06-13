import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { ExternalLink, FileText, BookOpen, Loader2, ChevronDown, Download } from "lucide-react";


const BRANCHES = ["CS", "IT", "Mech", "Civil", "Elec", "ETC"];
const BRANCH_LABELS = {
  CS:    "Computer Science",
  IT:    "Information Technology",
  Mech:  "Mechanical",
  Civil: "Civil",
  Elec:  "Electrical",
  ETC:   "Electronics & TC",
};

const SEMESTERS = [1, 2, 3, 4, 5, 6];
const SEM_LABELS = {
  1: "First", 2: "Second", 3: "Third",
  4: "Fourth", 5: "Fifth", 6: "Sixth",
};

const TYPES = ["All", "PYQ", "Model Answer", "Notes"];

const TYPE_CONFIG = {
  PYQ:            { color: "#e8453c", label: "PYQ", icon: FileText },
  "Model Answer": { color: "#c8f04d", label: "Answer", icon: BookOpen },
  Notes:          { color: "#4d9ef0", label: "Notes", icon: BookOpen },
};

// ── session pill ───────────────────────────────────────────────────────────────

function SessionPill({ session, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                 border border-[#2a2a2a] bg-[#141414]
                 text-[#f0ede6] text-xs font-['General_Sans'] font-medium
                 hover:border-[#e8453c] hover:text-[#e8453c] hover:bg-[#e8453c]/5
                 transition-all duration-150 whitespace-nowrap"
    >
      <Download size={11} strokeWidth={2} />
      {session}
      <ExternalLink size={10} strokeWidth={2} />
    </a>
  );
}

// ── subject card ───────────────────────────────────────────────────────────────

function SubjectCard({ subjectName, courseCode, entries }) {
  // group entries by type
  const byType = entries.reduce((acc, e) => {
    if (!acc[e.type]) acc[e.type] = [];
    acc[e.type].push(e);
    return acc;
  }, {});

  return (
    <div className="border border-[#2a2a2a] rounded-lg bg-[#141414] p-5 hover:border-[#e8453c]/30 transition-colors duration-150">
      {/* subject name + code */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-[1rem] leading-snug mb-1">
            {subjectName}
          </h3>
          <span className="font-['JetBrains_Mono'] text-[0.7rem] text-[#888] tracking-wider">
            {courseCode}
          </span>
        </div>
        <span className="shrink-0 font-['JetBrains_Mono'] text-[0.65rem] text-[#888] bg-[#1a1a1a] px-2 py-1 rounded">
          {Object.values(byType).reduce((sum, items) => sum + items.length, 0)} items
        </span>
      </div>

      {/* type groups */}
      <div className="flex flex-col gap-3 pt-3 border-t border-[#2a2a2a]">
        {Object.entries(byType).map(([type, items]) => {
          const config = TYPE_CONFIG[type] || TYPE_CONFIG.Notes;
          return (
            <div key={type} className="flex items-center gap-3 flex-wrap">
              {/* type badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[0.7rem] font-['JetBrains_Mono'] tracking-wide shrink-0"
                style={{
                  background: `${config.color}15`,
                  color: config.color,
                  borderColor: `${config.color}30`,
                }}>
                {config.icon === FileText && <FileText size={11} strokeWidth={2} />}
                {config.icon === BookOpen && <BookOpen size={11} strokeWidth={2} />}
                {config.label}
              </span>

              {/* session pills */}
              <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
                {items.map((item) => (
                  <SessionPill
                    key={item.id}
                    session={item.session}
                    link={item.drive_link}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── dropdown ───────────────────────────────────────────────────────────────────

function Dropdown({ value, onChange, options, labelMap, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5
                   border border-[#2a2a2a] rounded-lg bg-[#141414]
                   font-['General_Sans'] text-sm text-[#f0ede6]
                   hover:border-[#888] focus:border-[#e8453c] focus:outline-none
                   transition-colors duration-150
                   min-w-[160px] justify-between"
      >
        <span>{labelMap ? labelMap[value] || value : value}</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`text-[#888] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20
                          border border-[#2a2a2a] rounded-lg bg-[#141414]
                          shadow-xl min-w-full overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5
                            font-['General_Sans'] text-sm
                            hover:bg-[#1a1a1a] transition-colors duration-100
                            ${value === opt ? "text-[#e8453c] bg-[#e8453c]/5" : "text-[#f0ede6]"}`}
              >
                {labelMap ? labelMap[opt] || opt : opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── main page ──────────────────────────────────────────────────────────────────

export default function Resources() {
  const [branch, setBranch]     = useState("CS");
  const [semester, setSemester] = useState(1);
  const [typeFilter, setType]   = useState("All");
  const [data, setData]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData([]);

    let query = supabase
      .from("resources")
      .select("id, subject_name, course_code, semester, branch, type, session, drive_link")
      .eq("branch", branch)
      .eq("semester", semester)
      .order("subject_name", { ascending: true })
      .order("session",      { ascending: true });

    if (typeFilter !== "All") {
      query = query.eq("type", typeFilter);
    }

    query.then(({ data: rows, error: err }) => {
      if (cancelled) return;
      if (err) { setError(err.message); setLoading(false); return; }
      setData(rows || []);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [branch, semester, typeFilter]);

  // group rows by subject
  const bySubject = data.reduce((acc, row) => {
    const key = row.course_code;
    if (!acc[key]) acc[key] = { subjectName: row.subject_name, courseCode: row.course_code, entries: [] };
    acc[key].entries.push(row);
    return acc;
  }, {});

  const subjects = Object.values(bySubject);

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-20 pb-32">

      {/* ── header ── */}
      <div className="mb-12">
        <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#e8453c] mb-3 font-bold">
          Study Material
        </p>
        <h1 className="font-['Clash_Display'] font-semibold text-[#f0ede6] leading-[1.08]
                       text-[clamp(2rem,5vw,3.25rem)] mb-3 letter-spacing-tight">
          Resources
        </h1>
        <p className="font-['General_Sans'] text-[#888] text-base max-w-[560px] leading-relaxed">
          PYQs, model answers, and notes for every subject — download directly from Google Drive.
        </p>
      </div>

      {/* ── filters ── */}
      <div className="mb-10 pb-6 border-b border-[#2a2a2a]">
        
        {/* branch tabs */}
        <div className="mb-4">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#888] mb-3 font-bold">
            Branch
          </p>
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((b) => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                className={`flex flex-col items-start gap-0.5 px-4 py-2.5 rounded-lg
                            border transition-all duration-150
                            ${branch === b
                              ? "border-[#e8453c] bg-[#e8453c]/5"
                              : "border-[#2a2a2a] bg-transparent hover:border-[#888] hover:bg-[#141414]"
                            }`}
              >
                <span className={`font-['JetBrains_Mono'] text-[0.78rem] font-bold tracking-wider
                                  ${branch === b ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
                  {b}
                </span>
                <span className="font-['General_Sans'] text-[0.68rem] text-[#888] whitespace-nowrap
                                 hidden sm:block">
                  {BRANCH_LABELS[b]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* semester + type dropdowns */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#888] font-bold">
              Semester
            </label>
            <Dropdown
              value={semester}
              onChange={setSemester}
              options={SEMESTERS}
              labelMap={Object.fromEntries(SEMESTERS.map((s) => [s, `Semester ${s}`]))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#888] font-bold">
              Type
            </label>
            <Dropdown
              value={typeFilter}
              onChange={setType}
              options={TYPES}
            />
          </div>
        </div>

      </div>

      {/* ── results ── */}
      <div>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-24
                          font-['General_Sans'] text-[#888] text-sm">
            <Loader2 size={28} className="text-[#e8453c] animate-spin" />
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]">Loading resources…</p>
            <p className="text-[0.85rem]">Fetching study materials for {BRANCH_LABELS[branch]} Semester {semester}</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 py-24
                          font-['General_Sans'] text-[#e8453c] text-sm text-center">
            <p className="font-['Cabinet_Grotesk'] font-semibold">Could not load resources</p>
            <p>Check your connection and try again.</p>
            <code className="font-['JetBrains_Mono'] text-[0.7rem] opacity-55 mt-2 bg-[#1a1a1a] px-2 py-1 rounded">{error}</code>
          </div>
        )}

        {!loading && !error && subjects.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24
                          font-['General_Sans'] text-[#888] text-sm text-center">
            <FileText size={40} strokeWidth={1.2} />
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]">No resources yet</p>
            <p className="text-[0.85rem] max-w-[300px]">No resources found for {BRANCH_LABELS[branch]} — Semester {semester}. More content being added soon.</p>
          </div>
        )}

        {!loading && !error && subjects.length > 0 && (
          <div>
            {/* result count */}
            <p className="font-['JetBrains_Mono'] text-[0.7rem] text-[#888]
                          tracking-wider uppercase mb-4 font-bold">
              {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
              {typeFilter !== "All" ? ` · ${typeFilter}` : ""}
            </p>

            {/* subject grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((s) => (
                <SubjectCard
                  key={s.courseCode}
                  subjectName={s.subjectName}
                  courseCode={s.courseCode}
                  entries={s.entries}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
