import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ExternalLink, FileText, BookOpen, Loader2, ChevronDown } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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

const TYPE_COLORS = {
  PYQ:            "bg-[#e8453c]/10 text-[#e8453c] border-[#e8453c]/20",
  "Model Answer": "bg-[#c8f04d]/10 text-[#c8f04d] border-[#c8f04d]/20",
  Notes:          "bg-[#888]/10 text-[#888] border-[#888]/20",
};

// ── session pill ───────────────────────────────────────────────────────────────

function SessionPill({ session, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                 border border-[#2a2a2a] bg-[#1a1a1a]
                 text-[#f0ede6] text-xs font-mono
                 hover:border-[#e8453c] hover:text-[#e8453c]
                 transition-colors duration-150 whitespace-nowrap"
    >
      {session}
      <ExternalLink size={10} strokeWidth={2} />
    </a>
  );
}

// ── subject row ────────────────────────────────────────────────────────────────

function SubjectRow({ subjectName, courseCode, entries }) {
  // group entries by type
  const byType = entries.reduce((acc, e) => {
    if (!acc[e.type]) acc[e.type] = [];
    acc[e.type].push(e);
    return acc;
  }, {});

  return (
    <div className="border-t border-[#2a2a2a] py-5">
      {/* subject name + code */}
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-[0.95rem] leading-snug">
          {subjectName}
        </span>
        <span className="font-['JetBrains_Mono'] text-[0.68rem] text-[#888] tracking-wider">
          {courseCode}
        </span>
      </div>

      {/* type groups */}
      <div className="flex flex-col gap-2.5">
        {Object.entries(byType).map(([type, items]) => (
          <div key={type} className="flex items-center gap-3 flex-wrap">
            {/* type badge */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded
                              border text-[0.68rem] font-['JetBrains_Mono'] tracking-wide
                              shrink-0 ${TYPE_COLORS[type] || TYPE_COLORS["Notes"]}`}>
              {type === "PYQ" && <FileText size={10} strokeWidth={2} />}
              {type === "Model Answer" && <BookOpen size={10} strokeWidth={2} />}
              {type}
            </span>

            {/* session pills */}
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <SessionPill
                  key={item.id}
                  session={item.session}
                  link={item.drive_link}
                />
              ))}
            </div>
          </div>
        ))}
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
                   border border-[#2a2a2a] rounded-md bg-[#141414]
                   font-['General_Sans'] text-sm text-[#f0ede6]
                   hover:border-[#888] transition-colors duration-150
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
                          border border-[#2a2a2a] rounded-md bg-[#141414]
                          shadow-xl min-w-full overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5
                            font-['General_Sans'] text-sm
                            hover:bg-[#1a1a1a] transition-colors duration-100
                            ${value === opt ? "text-[#e8453c]" : "text-[#f0ede6]"}`}
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
        <p className="font-['JetBrains_Mono'] text-[0.7rem] uppercase tracking-[0.12em] text-[#e8453c] mb-3">
          Study Material
        </p>
        <h1 className="font-['Clash_Display'] font-semibold text-[#f0ede6] leading-[1.08]
                       text-[clamp(2rem,5vw,3.25rem)] mb-3">
          Resources
        </h1>
        <p className="font-['General_Sans'] text-[#888] text-base max-w-[520px] leading-relaxed">
          PYQs, model answers, and notes for every subject — all in one place.
        </p>
      </div>

      {/* ── filters ── */}
      <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-[#2a2a2a]">

        {/* branch tabs */}
        <div className="flex flex-wrap gap-2 w-full">
          {BRANCHES.map((b) => (
            <button
              key={b}
              onClick={() => setBranch(b)}
              className={`flex flex-col items-start gap-0.5 px-4 py-2.5 rounded-md
                          border transition-colors duration-150
                          ${branch === b
                            ? "border-[#e8453c] bg-[#141414]"
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

        {/* semester + type dropdowns */}
        <div className="flex flex-wrap gap-3 mt-1">
          <Dropdown
            value={semester}
            onChange={setSemester}
            options={SEMESTERS}
            labelMap={Object.fromEntries(SEMESTERS.map((s) => [s, `Semester ${s}`]))}
          />
          <Dropdown
            value={typeFilter}
            onChange={setType}
            options={TYPES}
          />
        </div>

      </div>

      {/* ── results ── */}
      <div>

        {loading && (
          <div className="flex flex-col items-center gap-3 py-24
                          font-['General_Sans'] text-[#888] text-sm">
            <Loader2 size={22} className="text-[#e8453c] animate-spin" />
            <p>Loading resources…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 py-24
                          font-['General_Sans'] text-[#e8453c] text-sm text-center">
            <p>Could not load resources. Check your connection and try again.</p>
            <code className="font-['JetBrains_Mono'] text-[0.72rem] opacity-55 mt-1">{error}</code>
          </div>
        )}

        {!loading && !error && subjects.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-24
                          font-['General_Sans'] text-[#888] text-sm text-center">
            <FileText size={32} strokeWidth={1.2} />
            <p>No resources yet for {BRANCH_LABELS[branch]} — Semester {semester}.</p>
            <p className="text-[0.82rem] opacity-70">More content being added soon.</p>
          </div>
        )}

        {!loading && !error && subjects.length > 0 && (
          <div>
            {/* result count */}
            <p className="font-['JetBrains_Mono'] text-[0.7rem] text-[#888]
                          tracking-wider uppercase mb-1">
              {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
              {typeFilter !== "All" ? ` · ${typeFilter}` : ""}
            </p>

            {/* subject rows */}
            {subjects.map((s) => (
              <SubjectRow
                key={s.courseCode}
                subjectName={s.subjectName}
                courseCode={s.courseCode}
                entries={s.entries}
              />
            ))}

            {/* last border */}
            <div className="border-t border-[#2a2a2a]" />
          </div>
        )}

      </div>
    </section>
  );
}