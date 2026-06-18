import { useState } from "react";
import { ChevronDown, Calendar, AlertCircle, CheckCircle, Clock, ExternalLink, FileText } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ACADEMIC_YEAR = "2025–26";

const TERM_SCHEDULE = [
  { label: "Odd Semester Start", date: "1 Jul 2025", status: "done" },
  { label: "1st Year (New Admission) Start", date: "17 Jul 2025", status: "done" },
  { label: "Odd Sem Class Test 1", date: "11–13 Aug 2025", status: "done" },
  { label: "Odd Sem Class Test 2", date: "13–15 Oct 2025", status: "done" },
  { label: "Odd Semester End", date: "17 Oct 2025", status: "done" },
  { label: "Winter 2025 Practicals", date: "28 Oct – 6 Nov 2025", status: "done" },
  { label: "Winter 2025 Theory Exams", date: "11 Nov – 3 Dec 2025", status: "done" },
  { label: "Even Semester Start", date: "15 Dec 2025", status: "done" },
  { label: "Even Sem Class Test 1", date: "27–29 Jan 2026", status: "done" },
  { label: "Even Sem Class Test 2", date: "30 Mar – 2 Apr 2026", status: "done" },
  { label: "Even Semester End", date: "4 Apr 2026", status: "done" },
  { label: "Summer 2026 Exam Form (Normal)", date: "2–12 Feb 2026", status: "done" },
  { label: "Summer 2026 Exam Form (Late ₹1500)", date: "17–19 Feb 2026", status: "done" },
  { label: "Summer 2026 Practicals", date: "8 Apr – 18 Apr 2026", status: "done" },
  { label: "Summer 2026 Theory Exams", date: "23 Apr – 16 May 2026", status: "current" },
  { label: "Summer 2026 Results (Expected)", date: "Late Jun 2026", status: "upcoming" },
  { label: "Photocopy / Rechecking Window", date: "~Late Jun 2026", status: "upcoming" },
  { label: "Winter 2026 Exam Form", date: "~Sep 2026", status: "upcoming" },
  { label: "Winter 2026 Theory Exams", date: "~Nov 2026", status: "upcoming" },
];

const QUICK_LINKS = [
  { label: "MSBTE Official Website", url: "https://msbte.ac.in/", icon: "globe", color: "#4d9ef0" },
  { label: "Student Login (Exam Forms)", url: "https://online.msbte.co.in/", icon: "user", color: "#c8f04d" },
  { label: "Summer 2026 Timetable", url: "https://online.msbte.co.in/timetable/", icon: "calendar", color: "#e8453c" },
  { label: "Check Results", url: "https://msbte.ac.in/", icon: "award", color: "#b87aff" },
  { label: "Hall Ticket Download", url: "https://online.msbte.co.in/", icon: "id-card", color: "#f0a843" },
  { label: "Academic Calendar PDF", url: "https://aissmspoly.org.in/wp-content/uploads/2025/06/Academic_Calendar-2025-26.pdf", icon: "download", color: "#4d9ef0" },
];

const RECHECKING_STEPS = [
  {
    step: "01",
    title: "Check your result first",
    desc: "Go to msbte.ac.in → Results. Enter your enrollment number. Download/screenshot your marksheet — you'll need it.",
    note: null,
  },
  {
    step: "02",
    title: "Decide: Photocopy or Re-evaluation?",
    desc: "Photocopy = you get a scanned copy of your answer sheet to review. Re-evaluation = your paper gets re-checked by an examiner. You must get a photocopy before applying for re-evaluation.",
    note: "Note: Online exam subjects (MCQ-based) have NO photocopy or rechecking option.",
  },
  {
    step: "03",
    title: "Apply via Student Login",
    desc: "Login at online.msbte.co.in with your enrollment number. Go to 'Photocopy/Rechecking' section. Select the subject(s) and pay the fee online.",
    note: null,
  },
  {
    step: "04",
    title: "Get institute confirmation",
    desc: "After you apply, your institute needs to confirm your application via their portal. Go to your exam department/office and tell them. They must confirm within the given window (usually 1–2 days after student login closes).",
    note: null,
  },
  {
    step: "05",
    title: "Submit original marksheet",
    desc: "For re-evaluation, submit your original MSBTE marksheet (not a printout) to your institute. They'll send it to the regional RBTE office in a sealed envelope. Without this, your re-evaluation won't be confirmed.",
    note: "Critical: This step is missed by most students. Don't skip it.",
  },
  {
    step: "06",
    title: "Wait for result",
    desc: "Photocopy is distributed by the institute within ~14 days. Re-evaluation result is announced via your institute and on msbte.ac.in. If marks change, a revised marksheet is issued.",
    note: null,
  },
];

const FEES = [
  { item: "Photocopy (per subject)", amount: "₹200 – ₹300" },
  { item: "Re-evaluation (per subject)", amount: "₹800 – ₹1000" },
  { item: "Exam form late fee (first window)", amount: "₹200" },
  { item: "Exam form late fee (second window)", amount: "₹1,500" },
  { item: "Special provision (forgot to fill form)", amount: "₹5,000 per subject" },
];

const NOTICES = [
  {
    tag: "Live Now",
    color: "#e8453c",
    title: "Summer 2026 Theory Exams Running",
    desc: "Theory exams are ongoing from Apr 23 – May 16, 2026. Check your timetable at the link below.",
    link: "https://online.msbte.co.in/timetable/",
    linkLabel: "View Timetable →",
  },
  {
    tag: "Upcoming",
    color: "#c8f04d",
    title: "Results Expected Late June 2026",
    desc: "Based on past patterns, Summer 2026 results will be published by end of June 2026.",
    link: "https://msbte.ac.in/",
    linkLabel: "Check Results Portal →",
  },
  {
    tag: "Important",
    color: "#b87aff",
    title: "Online Exam Subjects — No Rechecking",
    desc: "MCQ-based online subjects have no photocopy or rechecking option per MSBTE's latest circular.",
    link: null,
    linkLabel: null,
  },
  {
    tag: "Info",
    color: "#4d9ef0",
    title: "K-Scheme Equivalent Subject Provision",
    desc: "MSBTE has issued a provision for I-Scheme students to appear via equivalent K-Scheme subjects. Check official circular for your branch.",
    link: "https://msbte.ac.in/",
    linkLabel: "Official Circular →",
  },
];

// ─── SECTION HEADER ──────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent)] mb-2 font-bold">
        {eyebrow}
      </p>
      <h2 className="font-['Clash_Display'] text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-[var(--text)] leading-tight mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="font-['General_Sans'] text-[0.95rem] text-[var(--text-muted)] max-w-[560px] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── TIMELINE SECTION ────────────────────────────────────────────────────────

function TimelineSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? TERM_SCHEDULE : TERM_SCHEDULE.slice(0, 10);

  const statusConfig = {
    done:     { dot: "bg-[var(--border)]", text: "text-[var(--text-muted)]", dateTxt: "text-[var(--text-muted)]", icon: CheckCircle },
    current:  { dot: "bg-[var(--accent)] ring-4 ring-[var(--accent)]/20", text: "text-[var(--text)] font-semibold", dateTxt: "text-[var(--accent)]", icon: Clock },
    upcoming: { dot: "bg-[var(--border)] border-2 border-[#4d9ef0]", text: "text-[var(--text-muted)]", dateTxt: "text-[var(--text-muted)]", icon: Calendar },
  };

  return (
    <div className="mb-12">
      <SectionHeader eyebrow={`Academic Year ${ACADEMIC_YEAR}`} title="Important Dates" subtitle="Key milestones and exam schedules for your diploma journey." />
      
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[15px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-[var(--border)]" />
        
        <div className="space-y-4">
          {visible.map((item, i) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;
            return (
              <div key={i} className="flex gap-6 relative">
                <div className="flex-shrink-0 mt-1 relative z-10">
                  <div className={`w-8 h-8 rounded-full ${config.dot} flex items-center justify-center`}>
                    <Icon size={14} color={item.status === 'done' ? '#555' : item.status === 'current' ? '#fff' : '#4d9ef0'} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1 flex items-start justify-between gap-4 min-w-0 pb-4 border-b border-[#1a1a1a] last:border-0">
                  <span className={`font-['General_Sans'] text-[0.95rem] leading-snug ${config.text}`}>
                    {item.label}
                  </span>
                  <span className={`font-['JetBrains_Mono'] text-[0.8rem] flex-shrink-0 ${config.dateTxt}`}>
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {!expanded && TERM_SCHEDULE.length > visible.length && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-6 inline-flex items-center gap-2 font-['General_Sans'] text-[0.9rem] text-[var(--accent)] hover:text-[#f0a843] transition-colors"
        >
          <ChevronDown size={16} strokeWidth={2} />
          Show all {TERM_SCHEDULE.length} dates
        </button>
      )}
      
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-6 inline-flex items-center gap-2 font-['General_Sans'] text-[0.9rem] text-[#888] hover:text-[#f0ede6] transition-colors"
        >
          <ChevronDown size={16} strokeWidth={2} className="rotate-180" />
          Show less
        </button>
      )}
    </div>
  );
}

// ─── NOTICES SECTION ─────────────────────────────────────────────────────────

function NoticesSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="Live Updates" title="Important Notices" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NOTICES.map((n, i) => (
          <div
            key={i}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)]/30 transition-colors duration-150"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span
                className="font-['JetBrains_Mono'] text-[0.65rem] tracking-widest uppercase px-2.5 py-1 rounded-full font-bold"
                style={{ color: n.color, background: `${n.color}18`, border: `1px solid ${n.color}40` }}
              >
                {n.tag}
              </span>
            </div>
            <h3 className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[var(--text)] mb-2">
              {n.title}
            </h3>
            <p className="font-['General_Sans'] text-[0.9rem] text-[var(--text-muted)] leading-relaxed mb-3">
              {n.desc}
            </p>
            {n.link && (
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-['General_Sans'] text-[0.85rem] font-medium transition-colors"
                style={{ color: n.color }}
              >
                {n.linkLabel}
                <ExternalLink size={12} strokeWidth={2} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── QUICK LINKS SECTION ─────────────────────────────────────────────────────

function QuickLinksSection() {
  return (
    <div className="mb-12">
      <SectionHeader eyebrow="MSBTE Portals" title="Quick Links" subtitle="Direct access to official MSBTE portals and resources." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUICK_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)]/40 hover:bg-[var(--surface2)] transition-all duration-150"
          >
            <span
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ background: `${link.color}18`, color: link.color }}
            >
              {link.icon === 'globe' && <ExternalLink size={18} strokeWidth={1.5} />}
              {link.icon === 'user' && <FileText size={18} strokeWidth={1.5} />}
              {link.icon === 'calendar' && <Calendar size={18} strokeWidth={1.5} />}
              {link.icon === 'award' && <CheckCircle size={18} strokeWidth={1.5} />}
              {link.icon === 'id-card' && <FileText size={18} strokeWidth={1.5} />}
              {link.icon === 'download' && <ExternalLink size={18} strokeWidth={1.5} />}
            </span>
            <span className="font-['Cabinet_Grotesk'] text-[0.95rem] font-semibold text-[var(--text)] flex-1 leading-snug">
              {link.label}
            </span>
            <ExternalLink size={14} strokeWidth={1.5} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── RECHECKING SECTION ──────────────────────────────────────────────────────

function RecheckingSection() {
  const [openStep, setOpenStep] = useState(null);

  return (
    <div className="mb-12">
      <SectionHeader 
        eyebrow="After Results" 
        title="Photocopy & Rechecking Guide" 
        subtitle="Step-by-step process to request photocopy or re-evaluation of your answer sheets."
      />

      <div className="bg-[var(--surface2)] border border-[var(--accent-lime)]/20 rounded-lg px-5 py-4 mb-6 flex gap-3">
        <AlertCircle size={18} className="text-[var(--accent-lime)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="font-['General_Sans'] text-[0.9rem] text-[var(--text-muted)] leading-relaxed">
          The rechecking window opens roughly 1–2 days after results are published and stays open for only 2–3 days. Watch msbte.ac.in and your college notice board closely right after results.
        </p>
      </div>

      <div className="space-y-2 mb-8">
        {RECHECKING_STEPS.map((s, i) => {
          const isOpen = openStep === i;
          return (
            <div
              key={i}
              className={`border rounded-lg overflow-hidden transition-all ${isOpen ? "border-[var(--accent)]/40 bg-[var(--surface)]" : "border-[var(--border)] bg-[var(--surface2)] hover:border-[var(--border)]"}`}
            >
              <button
                onClick={() => setOpenStep(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[var(--surface2)] transition-colors"
              >
                <span className="font-['Clash_Display'] text-[1.2rem] font-bold text-[var(--accent)] flex-shrink-0 w-8">
                  {s.step}
                </span>
                <span className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[var(--text)] flex-1">
                  {s.title}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={`text-[var(--text-muted)] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-20 space-y-3 border-t border-[var(--border)]">
                  <p className="font-['General_Sans'] text-[0.95rem] text-[var(--text-muted)] leading-relaxed">
                    {s.desc}
                  </p>
                  {s.note && (
                    <div className="bg-[var(--accent)]/8 border border-[var(--accent)]/20 rounded-lg px-4 py-3">
                      <p className="font-['General_Sans'] text-[0.9rem] text-[var(--accent)] leading-relaxed">
                        <strong>⚠️ {s.note.split(':')[0]}:</strong> {s.note.split(':')[1]}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fees Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[var(--text-muted)] font-bold">
            Fee Reference
          </p>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {FEES.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--surface2)] transition-colors">
              <span className="font-['General_Sans'] text-[0.95rem] text-[var(--text-muted)]">
                {f.item}
              </span>
              <span className="font-['JetBrains_Mono'] text-[0.9rem] font-bold text-[var(--accent-lime)]">
                {f.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5">
        <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#888] mb-3 font-bold">
          Apply when window opens
        </p>
        <a
          href="https://online.msbte.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[#4d9ef0] hover:text-[#6db4ff] transition-colors"
        >
          online.msbte.co.in — Student Login
          <ExternalLink size={16} strokeWidth={1.5} />
        </a>
        <p className="font-['General_Sans'] text-[0.85rem] text-[#555] mt-2">
          Login with your enrollment number and password (same as exam form login)
        </p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function MSBTE() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-20 pb-32">

      {/* ── header ── */}
      <div className="mb-16">
        <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#e8453c] mb-3 font-bold">
          MSBTE K-Scheme
        </p>
        <h1 className="font-['Clash_Display'] text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#f0ede6] leading-tight mb-4">
          Important Dates & Deadlines
        </h1>
        <p className="font-['General_Sans'] text-[1rem] text-[#888] max-w-[600px] leading-relaxed">
          Stay on top of exam schedules, form submission deadlines, and important MSBTE announcements. Never miss a critical date again.
        </p>
      </div>

      {/* ── timeline ── */}
      <TimelineSection />

      {/* ── notices ── */}
      <NoticesSection />

      {/* ── quick links ── */}
      <QuickLinksSection />

      {/* ── rechecking ── */}
      <RecheckingSection />

    </section>
  );
}
