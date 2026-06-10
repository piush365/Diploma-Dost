import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  MessageSquare, ChevronDown, Send, Plus,
  X, Loader2, User, Clock, ChevronRight
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
const SEMESTERS = [1, 2, 3, 4, 5, 6];

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── ask question modal ────────────────────────────────────────────────────────

function AskModal({ onClose, onSubmitted, defaultBranch, defaultSem }) {
  const [name, setName]       = useState("");
  const [branch, setBranch]   = useState(defaultBranch || "CS");
  const [sem, setSem]         = useState(defaultSem || 1);
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const textRef               = useRef(null);

  useEffect(() => { textRef.current?.focus(); }, []);

  async function handleSubmit() {
    if (!name.trim() || !text.trim()) return;
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.from("questions").insert({
      name:          name.trim(),
      branch,
      semester:      sem,
      question_text: text.trim(),
    });

    if (err) { setError("Could not post question. Try again."); setLoading(false); return; }
    setLoading(false);
    onSubmitted();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center
                    justify-center px-4 pb-4 sm:pb-0">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"
           onClick={onClose} />

      {/* modal */}
      <div className="relative w-full max-w-lg bg-[#141414] border border-[#2a2a2a]
                      rounded-xl overflow-hidden shadow-2xl">

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4
                        border-b border-[#2a2a2a]">
          <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
            Ask a question
          </p>
          <button onClick={onClose}
            className="text-[#888] hover:text-[#f0ede6] transition-colors">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* body */}
        <div className="p-5 flex flex-col gap-4">

          {/* name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-['JetBrains_Mono'] text-[0.65rem] uppercase
                              tracking-wider text-[#888]">
              Your name
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2a] bg-[#0d0e0f]
                         font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                         focus:border-[#e8453c] focus:outline-none transition-colors"
            />
          </div>

          {/* branch + sem */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-['JetBrains_Mono'] text-[0.65rem] uppercase
                                tracking-wider text-[#888]">
                Branch
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-[#2a2a2a] bg-[#0d0e0f]
                           font-['General_Sans'] text-sm text-[#f0ede6]
                           focus:border-[#e8453c] focus:outline-none transition-colors"
              >
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>{b} — {BRANCH_LABELS[b]}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-['JetBrains_Mono'] text-[0.65rem] uppercase
                                tracking-wider text-[#888]">
                Semester
              </label>
              <select
                value={sem}
                onChange={(e) => setSem(Number(e.target.value))}
                className="px-3 py-2.5 rounded-lg border border-[#2a2a2a] bg-[#0d0e0f]
                           font-['General_Sans'] text-sm text-[#f0ede6]
                           focus:border-[#e8453c] focus:outline-none transition-colors"
              >
                {SEMESTERS.map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* question */}
          <div className="flex flex-col gap-1.5">
            <label className="font-['JetBrains_Mono'] text-[0.65rem] uppercase
                              tracking-wider text-[#888]">
              Your question
            </label>
            <textarea
              ref={textRef}
              rows={4}
              placeholder="What's confusing you? Be specific — good questions get better answers."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2a] bg-[#0d0e0f]
                         font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                         focus:border-[#e8453c] focus:outline-none transition-colors
                         resize-none leading-relaxed"
            />
          </div>

          {error && (
            <p className="font-['General_Sans'] text-[0.75rem] text-[#e8453c]">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!name.trim() || !text.trim() || loading}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg
                        font-['Cabinet_Grotesk'] font-semibold text-sm
                        transition-all duration-150
                        ${name.trim() && text.trim() && !loading
                          ? "bg-[#e8453c] text-white hover:bg-[#d03d35]"
                          : "bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] cursor-not-allowed"
                        }`}
          >
            {loading
              ? <Loader2 size={15} className="animate-spin" />
              : <><Send size={14} strokeWidth={2} /> Post question</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── answer box ────────────────────────────────────────────────────────────────

function AnswerBox({ questionId, onAnswered }) {
  const [name, setName]       = useState("");
  const [text, setText]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  async function handleSubmit() {
    if (!name.trim() || !text.trim()) return;
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.from("answers").insert({
      question_id:  questionId,
      name:         name.trim(),
      answer_text:  text.trim(),
    });

    if (err) { setError("Could not post answer. Try again."); setLoading(false); return; }
    setName("");
    setText("");
    setLoading(false);
    onAnswered();
  }

  return (
    <div className="mt-3 pt-3 border-t border-[#1a1a1a]">
      <p className="font-['JetBrains_Mono'] text-[0.62rem] uppercase tracking-wider
                    text-[#888] mb-2">
        Write an answer
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded-md border border-[#2a2a2a] bg-[#0d0e0f]
                     font-['General_Sans'] text-xs text-[#f0ede6] placeholder:text-[#888]
                     focus:border-[#e8453c] focus:outline-none transition-colors"
        />
        <textarea
          rows={3}
          placeholder="Share what you know — even a partial answer helps."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-3 py-2 rounded-md border border-[#2a2a2a] bg-[#0d0e0f]
                     font-['General_Sans'] text-xs text-[#f0ede6] placeholder:text-[#888]
                     focus:border-[#e8453c] focus:outline-none transition-colors
                     resize-none leading-relaxed"
        />
        {error && (
          <p className="font-['General_Sans'] text-[0.7rem] text-[#e8453c]">{error}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || !text.trim() || loading}
          className={`self-end flex items-center gap-1.5 px-4 py-2 rounded-md
                      font-['General_Sans'] text-xs font-medium
                      transition-all duration-150
                      ${name.trim() && text.trim() && !loading
                        ? "bg-[#e8453c] text-white hover:bg-[#d03d35]"
                        : "bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] cursor-not-allowed"
                      }`}
        >
          {loading
            ? <Loader2 size={12} className="animate-spin" />
            : <><Send size={12} strokeWidth={2} /> Post answer</>
          }
        </button>
      </div>
    </div>
  );
}

// ─── question card ─────────────────────────────────────────────────────────────

function QuestionCard({ question }) {
  const [open, setOpen]         = useState(false);
  const [answers, setAnswers]   = useState([]);
  const [loadingA, setLoadingA] = useState(false);
  const [answerCount, setAnswerCount] = useState(question.answer_count || 0);

  async function loadAnswers() {
    if (!open) {
      setOpen(true);
      setLoadingA(true);
      const { data } = await supabase
        .from("answers")
        .select("id, name, answer_text, created_at")
        .eq("question_id", question.id)
        .order("created_at", { ascending: true });
      setAnswers(data || []);
      setLoadingA(false);
    } else {
      setOpen(false);
    }
  }

  async function refreshAnswers() {
    const { data } = await supabase
      .from("answers")
      .select("id, name, answer_text, created_at")
      .eq("question_id", question.id)
      .order("created_at", { ascending: true });
    setAnswers(data || []);
    setAnswerCount((data || []).length);
  }

  return (
    <div className={`border rounded-lg bg-[#141414] transition-colors duration-150
                     ${open ? "border-[#e8453c]/30" : "border-[#2a2a2a] hover:border-[#888]/40"}`}>

      {/* question header — clickable */}
      <button
        onClick={loadAnswers}
        className="w-full text-left p-4 sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* meta */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="flex items-center gap-1 font-['General_Sans'] text-[0.72rem] text-[#888]">
                <User size={11} strokeWidth={2} />
                {question.name}
              </span>
              <span className="text-[#2a2a2a]">·</span>
              <span className="font-['JetBrains_Mono'] text-[0.62rem] text-[#888]
                               bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
                {question.branch}
              </span>
              <span className="font-['JetBrains_Mono'] text-[0.62rem] text-[#888]
                               bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
                SEM {question.semester}
              </span>
              <span className="flex items-center gap-1 font-['General_Sans'] text-[0.68rem] text-[#888]">
                <Clock size={10} strokeWidth={2} />
                {timeAgo(question.created_at)}
              </span>
            </div>

            {/* question text */}
            <p className="font-['General_Sans'] text-[0.9rem] text-[#f0ede6] leading-relaxed">
              {question.question_text}
            </p>
          </div>

          {/* right — answer count + chevron */}
          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <div className={`flex items-center gap-1 font-['JetBrains_Mono'] text-[0.65rem]
                             px-2 py-1 rounded border
                             ${answerCount > 0
                               ? "text-[#c8f04d] bg-[#c8f04d]/5 border-[#c8f04d]/20"
                               : "text-[#888] bg-[#1a1a1a] border-[#2a2a2a]"
                             }`}>
              <MessageSquare size={10} strokeWidth={2} />
              {answerCount} {answerCount === 1 ? "answer" : "answers"}
            </div>
            <ChevronDown
              size={14} strokeWidth={2}
              className={`text-[#888] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* expanded — answers + answer box */}
      {open && (
        <div className="px-4 sm:px-5 pb-5">
          {loadingA && (
            <div className="flex items-center gap-2 py-4">
              <Loader2 size={14} className="animate-spin text-[#e8453c]" />
              <p className="font-['General_Sans'] text-[0.78rem] text-[#888]">
                Loading answers…
              </p>
            </div>
          )}

          {!loadingA && answers.length === 0 && (
            <p className="font-['General_Sans'] text-[0.78rem] text-[#888] py-2">
              No answers yet — be the first to help.
            </p>
          )}

          {!loadingA && answers.map((a) => (
            <div key={a.id}
              className="py-3 border-t border-[#1a1a1a] first:border-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-[#e8453c]/10 border border-[#e8453c]/20
                                flex items-center justify-center shrink-0">
                  <User size={10} strokeWidth={2} className="text-[#e8453c]" />
                </div>
                <span className="font-['General_Sans'] text-[0.75rem] font-medium text-[#f0ede6]">
                  {a.name}
                </span>
                <span className="font-['General_Sans'] text-[0.68rem] text-[#888]">
                  {timeAgo(a.created_at)}
                </span>
              </div>
              <p className="font-['General_Sans'] text-[0.85rem] text-[#f0ede6]/80
                            leading-relaxed pl-7">
                {a.answer_text}
              </p>
            </div>
          ))}

          <AnswerBox questionId={question.id} onAnswered={refreshAnswers} />
        </div>
      )}
    </div>
  );
}

// ─── main page ─────────────────────────────────────────────────────────────────

export default function Community() {
  const [activeBranch, setActiveBranch] = useState("CS");
  const [activeSem, setActiveSem]       = useState(null); // null = all sems
  const [questions, setQuestions]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [showAsk, setShowAsk]           = useState(false);

  async function fetchQuestions() {
    setLoading(true);
    setError(null);

    let query = supabase
      .from("questions")
      .select("id, name, branch, semester, question_text, created_at")
      .eq("branch", activeBranch)
      .order("created_at", { ascending: false });

    if (activeSem) query = query.eq("semester", activeSem);

    const { data, error: err } = await query;
    if (err) { setError(err.message); setLoading(false); return; }
    setQuestions(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchQuestions(); }, [activeBranch, activeSem]);

  return (
    <section className="max-w-[860px] mx-auto px-6 py-20 pb-32">

      {/* header */}
      <div className="flex items-start justify-between gap-4 mb-10">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.7rem] uppercase
                        tracking-[0.12em] text-[#e8453c] mb-3">
            Juniors ask · Seniors answer
          </p>
          <h1 className="font-['Clash_Display'] font-semibold text-[#f0ede6]
                         leading-[1.08] text-[clamp(2rem,5vw,3.25rem)] mb-3">
            Community
          </h1>
          <p className="font-['General_Sans'] text-[#888] text-base max-w-[440px] leading-relaxed">
            Stuck on a subject? Ask here. Know the answer? Help a junior out.
          </p>
        </div>

        <button
          onClick={() => setShowAsk(true)}
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-lg
                     bg-[#e8453c] text-white
                     font-['Cabinet_Grotesk'] font-semibold text-sm
                     hover:bg-[#d03d35] transition-colors duration-150"
        >
          <Plus size={15} strokeWidth={2.5} />
          Ask
        </button>
      </div>

      {/* branch tabs */}
      <div className="flex flex-wrap gap-2 pb-5 mb-5 border-b border-[#2a2a2a]">
        {BRANCHES.map((b) => (
          <button
            key={b}
            onClick={() => setActiveBranch(b)}
            className={`flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg
                        border transition-colors duration-150
                        ${activeBranch === b
                          ? "border-[#e8453c] bg-[#e8453c]/5"
                          : "border-[#2a2a2a] hover:border-[#888] hover:bg-[#141414]"
                        }`}
          >
            <span className={`font-['JetBrains_Mono'] text-[0.75rem] font-bold tracking-wider
                              ${activeBranch === b ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
              {b}
            </span>
            <span className="font-['General_Sans'] text-[0.63rem] text-[#888]
                             whitespace-nowrap hidden sm:block">
              {BRANCH_LABELS[b]}
            </span>
          </button>
        ))}
      </div>

      {/* semester filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveSem(null)}
          className={`px-3 py-1.5 rounded-md font-['JetBrains_Mono'] text-[0.68rem]
                      font-bold tracking-wider border transition-colors duration-150
                      ${activeSem === null
                        ? "border-[#e8453c] text-[#e8453c] bg-[#e8453c]/5"
                        : "border-[#2a2a2a] text-[#888] hover:border-[#888]"
                      }`}
        >
          ALL
        </button>
        {SEMESTERS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSem(s)}
            className={`px-3 py-1.5 rounded-md font-['JetBrains_Mono'] text-[0.68rem]
                        font-bold tracking-wider border transition-colors duration-150
                        ${activeSem === s
                          ? "border-[#e8453c] text-[#e8453c] bg-[#e8453c]/5"
                          : "border-[#2a2a2a] text-[#888] hover:border-[#888]"
                        }`}
          >
            SEM {s}
          </button>
        ))}
      </div>

      {/* questions list */}
      <div className="flex flex-col gap-3">
        {loading && (
          <div className="flex items-center gap-3 py-20 justify-center">
            <Loader2 size={20} className="animate-spin text-[#e8453c]" />
            <p className="font-['General_Sans'] text-[#888] text-sm">Loading questions…</p>
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center">
            <p className="font-['General_Sans'] text-[#e8453c] text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && questions.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a]
                            flex items-center justify-center mb-2">
              <MessageSquare size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
              No questions yet
            </p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[280px] leading-relaxed">
              Be the first to ask something for {BRANCH_LABELS[activeBranch]}
              {activeSem ? ` Semester ${activeSem}` : ""}.
            </p>
            <button
              onClick={() => setShowAsk(true)}
              className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-lg
                         border border-[#e8453c] text-[#e8453c]
                         font-['General_Sans'] text-sm
                         hover:bg-[#e8453c]/5 transition-colors duration-150"
            >
              <Plus size={14} strokeWidth={2.5} />
              Ask a question
            </button>
          </div>
        )}

        {!loading && !error && questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>

      {/* ask modal */}
      {showAsk && (
        <AskModal
          onClose={() => setShowAsk(false)}
          onSubmitted={fetchQuestions}
          defaultBranch={activeBranch}
          defaultSem={activeSem || 1}
        />
      )}

    </section>
  );
}