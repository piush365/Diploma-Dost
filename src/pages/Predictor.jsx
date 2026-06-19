import { useState, useCallback, useEffect, useRef } from "react";
import { supabase } from '../lib/supabase';
import {
  Search, AlertTriangle, ChevronDown, X,
  BookmarkPlus, BookmarkCheck, Info, MapPin, Building2,
  Download, Share2, Trash2, Copy, Check
} from "lucide-react";

// ─── constants ──────────────────────────────────────────────────────────────

const BRANCH_PATTERNS = {
  CS: ["computer engineering", "computer science", "computer technology", "software engineering", "computer science and engineering", "computer science and technology", "computer science and design", "computer science and business systems"],
  IT: ["information technology"],
  AIDS: ["artificial intelligence and data science", "artificial intelligence (ai) and data science"],
  AIML: ["artificial intelligence and machine learning"],
  Cyber: ["cyber security"],
  IoT: ["internet of things", "iot"],
  Mech: ["mechanical engineering", "mechanical & automation", "mechanical and mechatronics", "mechatronics engineering"],
  Civil: ["civil engineering", "civil and environmental", "civil and infrastructure", "civil engineering and planning", "structural engineering"],
  Elec: ["electrical engineering", "electrical engg", "electrical and power", "electrical, electronics and power"],
  ETC: ["electronics and telecommunication", "electronics and communication", "electronics engineering", "electronics and computer engineering", "electronics and computer science", "vlsi"],
  Auto: ["automobile engineering", "automotive technology"],
  Bio: ["bio medical engineering", "bio technology", "biomedical engineering"],
  Chem: ["chemical engineering", "petro chemical", "plastic and polymer", "plastic engineering", "polymer engineering", "oil technology", "oil and paints"],
  Textile: ["textile", "fashion technology", "silk technology"],
  Production: ["production engineering", "manufacturing science", "industrial engineering"],
  Instru: ["instrumentation"],
  Others: ["aeronautical", "agricultural", "metallurgy", "mining", "5g", "printing", "food technology", "surface coating"]
};

const BRANCH_LABELS = {
  CS: "Computer Science/Engg",
  IT: "Information Technology",
  AIDS: "AI & Data Science",
  AIML: "AI & Machine Learning",
  Cyber: "Cyber Security",
  IoT: "Internet of Things",
  Mech: "Mechanical/Mechatronics",
  Civil: "Civil Engineering",
  Elec: "Electrical Engineering",
  ETC: "Electronics & TC",
  Auto: "Automobile/Automotive",
  Bio: "Bio Medical/Tech",
  Chem: "Chemical/Plastic/Oil",
  Textile: "Textile/Fashion",
  Production: "Production/Industrial",
  Instru: "Instrumentation",
  Others: "Others (Aero/Agri/etc)"
};

const BRANCHES = Object.keys(BRANCH_PATTERNS);

const CATEGORIES = [
  { value: "GOPEN",  label: "Open (General)" },
  { value: "LOPEN",  label: "Open (Ladies)" },
  { value: "GOBC",   label: "OBC (General)" },
  { value: "LOBC",   label: "OBC (Ladies)" },
  { value: "GSC",    label: "SC (General)" },
  { value: "LSC",    label: "SC (Ladies)" },
  { value: "GST",    label: "ST (General)" },
  { value: "LST",    label: "ST (Ladies)" },
  { value: "GNTA",   label: "VJ / NT-A (General)" },
  { value: "LNTA",   label: "VJ / NT-A (Ladies)" },
  { value: "GNTB",   label: "NT-B (General)" },
  { value: "LNTB",   label: "NT-B (Ladies)" },
  { value: "GNTC",   label: "NT-C (General)" },
  { value: "LNTC",   label: "NT-C (Ladies)" },
  { value: "GNTD",   label: "NT-D (General)" },
  { value: "LNTD",   label: "NT-D (Ladies)" },
  { value: "GSEBC",  label: "SEBC (General)" },
  { value: "LSEBC",  label: "SEBC (Ladies)" },
  { value: "EWS",    label: "EWS" },
];

// All distinct districts that can appear in the data
const DISTRICTS = [
  "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
  "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
  "Kolhapur","Latur","Mumbai","Mumbai Suburban","Nagpur","Nanded","Nandurbar",
  "Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri",
  "Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal",
];

const PCT_MARGIN = 1.5;

// ─── tiny helpers ────────────────────────────────────────────────────────────

function SearchableDropdown({ value, onChange, options, placeholder, typeLabel }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const selected = options.find((o) => o.value === value);
  
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opt.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setError("");

    if (val === "") return;

    // Check if any option starts with or contains this search term
    const hasMatch = options.some(opt => 
      opt.label.toLowerCase().includes(val.toLowerCase()) ||
      opt.value.toLowerCase().includes(val.toLowerCase())
    );

    if (!hasMatch) {
      setError(`Invalid ${typeLabel}`);
      // Remove the last character that caused the mismatch
      setTimeout(() => {
        setSearchTerm(prev => prev.slice(0, -1));
        setError("");
      }, 800);
    }
  };

  return (
    <div className="relative">
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          placeholder={selected ? selected.label : placeholder}
          value={open ? searchTerm : (selected ? selected.label : "")}
          onChange={handleInputChange}
          onFocus={() => { setOpen(true); setSearchTerm(""); }}
          className={`w-full px-4 py-3 rounded-lg border bg-[#141414] font-['General_Sans'] text-sm
                      transition-colors duration-150 outline-none
                      ${error ? "border-[#e8453c]" : "border-[#2a2a2a]"}
                      ${value && !open ? "text-[#f0ede6]" : "text-[#888]"}
                      hover:border-[#888] focus:border-[#e8453c]`}
        />
        <ChevronDown size={14} strokeWidth={2}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#888] transition-transform duration-150 pointer-events-none ${open ? "rotate-180" : ""}`} />
        
        {error && (
          <p className="absolute -bottom-5 left-0 font-['General_Sans'] text-[0.65rem] text-[#e8453c] animate-pulse">
            {error}
          </p>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => { setOpen(false); setSearchTerm(""); }} />
          <div className="absolute top-full left-0 mt-1 z-20 w-full border border-[#2a2a2a]
                          rounded-lg bg-[#141414] shadow-2xl overflow-hidden max-h-56 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button key={opt.value} 
                  onClick={() => { 
                    onChange(opt.value); 
                    setOpen(false); 
                    setSearchTerm(""); 
                  }}
                  className={`w-full text-left px-4 py-2.5 font-['General_Sans'] text-sm
                              hover:bg-[#1a1a1a] transition-colors duration-100
                              ${value === opt.value ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
                  {opt.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center font-['General_Sans'] text-[0.75rem] text-[#888]">
                No matches found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Multi-select searchable dropdown for districts
function MultiSelectSearchableDropdown({ values, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setError("");

    if (val === "") return;

    const hasMatch = options.some(opt => 
      opt.label.toLowerCase().includes(val.toLowerCase())
    );

    if (!hasMatch) {
      setError("Invalid district");
      setTimeout(() => {
        setSearchTerm(prev => prev.slice(0, -1));
        setError("");
      }, 800);
    }
  };

  return (
    <div className="relative">
      <div className="relative group">
        <input
          type="text"
          placeholder={values.length > 0 ? `${values.length} districts selected` : placeholder}
          value={open ? searchTerm : ""}
          onChange={handleInputChange}
          onFocus={() => { setOpen(true); setSearchTerm(""); }}
          className={`w-full px-4 py-3 rounded-lg border bg-[#141414] font-['General_Sans'] text-sm
                      transition-colors duration-150 outline-none
                      ${error ? "border-[#e8453c]" : "border-[#2a2a2a]"}
                      ${values.length > 0 && !open ? "text-[#f0ede6]" : "text-[#888]"}
                      hover:border-[#888] focus:border-[#e8453c]`}
        />
        <ChevronDown size={14} strokeWidth={2}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#888] transition-transform duration-150 pointer-events-none ${open ? "rotate-180" : ""}`} />
        
        {error && (
          <p className="absolute -bottom-5 left-0 font-['General_Sans'] text-[0.65rem] text-[#e8453c] animate-pulse">
            {error}
          </p>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => { setOpen(false); setSearchTerm(""); }} />
          <div className="absolute top-full left-0 mt-1 z-20 w-full border border-[#2a2a2a]
                          rounded-lg bg-[#141414] shadow-2xl overflow-hidden max-h-56 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button key={opt.value}
                  onClick={() => {
                    onChange(values.includes(opt.value)
                      ? values.filter(v => v !== opt.value)
                      : [...values, opt.value]
                    );
                  }}
                  className={`w-full text-left px-4 py-2.5 font-['General_Sans'] text-sm
                              hover:bg-[#1a1a1a] transition-colors duration-100
                              ${values.includes(opt.value) ? "text-[#e8453c] bg-[#e8453c]/5" : "text-[#f0ede6]"}`}>
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={values.includes(opt.value)} readOnly
                      className="w-4 h-4 rounded border-[#2a2a2a] bg-[#0d0e0f]" />
                    {opt.label}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center font-['General_Sans'] text-[0.75rem] text-[#888]">
                No matches found
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function BranchSelect({ selected, onChange }) {
  const toggle = (b) => onChange(
    selected.includes(b) ? selected.filter((x) => x !== b) : [...selected, b]
  );
  return (
    <div className="flex flex-wrap gap-2">
      {BRANCHES.map((b) => (
        <button key={b} onClick={() => toggle(b)}
          className={`flex flex-col items-start gap-0.5 px-3 py-2 rounded-lg border
                      transition-colors duration-150
                      ${selected.includes(b)
                        ? "border-[#e8453c] bg-[#e8453c]/5"
                        : "border-[#2a2a2a] bg-transparent hover:border-[#888] hover:bg-[#141414]"}`}>
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

function ChanceBadge({ chance }) {
  const styles = {
    high:  "border-[#e8453c]/40 text-[#e8453c] bg-[#e8453c]/10",
    good:  "border-[#e8453c]/25 text-[#e8453c] bg-[#e8453c]/5",
    reach: "border-[#2a2a2a] text-[#888] bg-[#1a1a1a]",
  };
  const labels = { high: "High Chance", good: "Good Chance", reach: "Reach" };
  return (
    <span className={`font-['JetBrains_Mono'] text-[0.63rem] uppercase tracking-wider
                       border px-2 py-0.5 rounded ${styles[chance]}`}>
      {labels[chance]}
    </span>
  );
}

// ─── college search autocomplete ─────────────────────────────────────────────

function CollegeSearch({ value, onChange, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (value.length < 2) { setSuggestions([]); setOpen(false); return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cutoffs")
        .select("college_code, college_name, district")
        .ilike("college_name", `%${value}%`)
        .eq("year", 2025)
        .order("college_name")
        .limit(8);
      if (!error) {
        // deduplicate by college_code
        const seen = new Set();
        const unique = (data || []).filter((r) => {
          if (seen.has(r.college_code)) return false;
          seen.add(r.college_code); return true;
        });
        setSuggestions(unique);
        setOpen(unique.length > 0);
      }
      setLoading(false);
    }, 300);
  }, [value]);

  return (
    <div className="relative">
      <div className="relative">
        <Building2 size={14} strokeWidth={2}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
        <input
          type="text"
          placeholder="Search college name…"
          value={value}
          onChange={(e) => { onChange(e.target.value); if (!e.target.value) onSelect(null); }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          className="w-full pl-9 pr-10 py-3 rounded-lg border border-[#2a2a2a] bg-[#141414]
                     font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                     hover:border-[#888] focus:border-[#e8453c] focus:outline-none
                     transition-colors duration-150"
        />
        {loading && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2
                          w-3.5 h-3.5 border-2 border-[#e8453c] border-t-transparent
                          rounded-full animate-spin" />
        )}
        {value && !loading && (
          <button onClick={() => { onChange(""); onSelect(null); setSuggestions([]); setOpen(false); }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#f0ede6]">
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 w-full border border-[#2a2a2a]
                          rounded-lg bg-[#141414] shadow-2xl overflow-hidden">
            {suggestions.map((s) => (
              <button key={s.college_code}
                onClick={() => { onChange(s.college_name); onSelect(s); setOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-[#1a1a1a] transition-colors duration-100
                           border-b border-[#1a1a1a] last:border-0">
                <p className="font-['General_Sans'] text-sm text-[#f0ede6] leading-snug">{s.college_name}</p>
                <p className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888] mt-0.5 flex items-center gap-1">
                  <MapPin size={9} strokeWidth={2} />{s.district} · {s.college_code}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── result card ─────────────────────────────────────────────────────────────

function ResultCard({ college, isShortlisted, onToggle }) {
  return (
    <div className={`rounded-lg border bg-[#141414] p-5 transition-colors duration-150
                     ${isShortlisted ? "border-[#e8453c]/50" : "border-[#2a2a2a] hover:border-[#e8453c]/30"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] text-[#888] tracking-wider uppercase mb-1">
            {college.college_code} · {college.district}
          </p>
          <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-[0.92rem] leading-snug">
            {college.college_name}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-['JetBrains_Mono'] text-[1.35rem] font-bold text-[#e8453c] leading-none">
            {college.cutoff_percent.toFixed(2)}
            <span className="text-[0.65rem] text-[#888] font-normal ml-0.5">%</span>
          </p>
          <p className="font-['General_Sans'] text-[0.63rem] text-[#888] mt-0.5">
            2025 CAP {college.cap_round} cutoff
          </p>
        </div>
      </div>

      <p className="font-['General_Sans'] text-[0.78rem] text-[#888] mb-3 leading-snug">
        {college.course_name}
        {college.cutoff_open != null && (
          <span className="text-[#888]/70"> · merit rank ~{college.cutoff_open.toLocaleString("en-IN")}</span>
        )}
      </p>

      <div className="flex items-center justify-between gap-3 mb-3">
        {college.chance && <ChanceBadge chance={college.chance} />}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#2a2a2a]">
        <div className="flex flex-wrap gap-1.5">
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            {college.category}
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.63rem] text-[#888]
                           bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded">
            CAP {college.cap_round}
          </span>
        </div>
        <button onClick={() => onToggle(college)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md
                      font-['General_Sans'] text-[0.75rem] font-medium border
                      transition-colors duration-150
                      ${isShortlisted
                        ? "border-[#e8453c]/40 text-[#e8453c] bg-[#e8453c]/5 hover:bg-[#e8453c]/10"
                        : "border-[#2a2a2a] text-[#888] hover:border-[#888] hover:text-[#f0ede6]"}`}>
          {isShortlisted
            ? <><BookmarkCheck size={13} strokeWidth={2} /> Shortlisted</>
            : <><BookmarkPlus size={13} strokeWidth={2} /> Shortlist</>}
        </button>
      </div>
    </div>
  );
}

// ─── college search results (all branches for one college) ───────────────────

function CollegeAllBranches({ college, category, onClose }) {
  const [rows, setRows]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("cutoffs")
        .select("course_name, category, cap_round, cutoff_open, cutoff_percent")
        .eq("college_code", college.college_code)
        .eq("year", 2025)
        .eq("category", category)
        .order("cutoff_percent", { ascending: false });
      if (!error) setRows(data || []);
      setLoading(false);
    }
    load();
  }, [college.college_code, category]);

  return (
    <div className="rounded-xl border border-[#e8453c]/30 bg-[#141414] overflow-hidden">
      {/* header */}
      <div className="flex items-start justify-between gap-4 p-5 border-b border-[#2a2a2a]">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.65rem] text-[#888] tracking-wider uppercase mb-1">
            {college.college_code} · {college.district} · 2025 cutoffs · {category}
          </p>
          <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base leading-snug">
            {college.college_name}
          </p>
        </div>
        <button onClick={onClose} className="shrink-0 text-[#888] hover:text-[#f0ede6] mt-0.5">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-10">
          <div className="w-4 h-4 border-2 border-[#e8453c] border-t-transparent rounded-full animate-spin" />
          <span className="font-['General_Sans'] text-[#888] text-sm">Loading…</span>
        </div>
      )}

      {!loading && rows.length === 0 && (
        <div className="py-10 text-center">
          <p className="font-['General_Sans'] text-[#888] text-sm">
            No 2025 data for {category} in this college.
          </p>
        </div>
      )}

      {!loading && rows.length > 0 && (
        <div className="divide-y divide-[#1a1a1a]">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-5 py-3.5
                                    hover:bg-[#1a1a1a] transition-colors duration-100">
              <div className="min-w-0">
                <p className="font-['General_Sans'] text-sm text-[#f0ede6] leading-snug truncate">
                  {r.course_name}
                </p>
                <p className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888] mt-0.5">
                  CAP {r.cap_round}
                  {r.cutoff_open != null && ` · rank ~${r.cutoff_open.toLocaleString("en-IN")}`}
                </p>
              </div>
              <span className="shrink-0 font-['JetBrains_Mono'] text-lg font-bold text-[#e8453c] leading-none">
                {r.cutoff_percent.toFixed(2)}
                <span className="text-[0.6rem] text-[#888] font-normal">%</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── enhanced shortlist drawer panel ──────────────────────────────────────────

function ShortlistDrawer({ shortlist, onRemove, onClear, onClose }) {
  const [copied, setCopied] = useState(false);

  const exportAsText = () => {
    const text = shortlist
      .map((c, i) => `${i + 1}. ${c.college_name} (${c.college_code}) - ${c.course_name} - ${c.cutoff_percent.toFixed(2)}% - ${c.district}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (shortlist.length === 0) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-[600px] bg-[#141414] border-l border-[#2a2a2a] z-50 overflow-y-auto">
        {/* sticky header */}
        <div className="sticky top-0 bg-[#141414] border-b border-[#2a2a2a] px-6 py-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-['JetBrains_Mono'] text-[0.65rem] text-[#e8453c] tracking-widest uppercase mb-2 font-bold">
              My Shortlist
            </p>
            <h2 className="font-['Clash_Display'] text-[1.5rem] font-semibold text-[#f0ede6] leading-tight">
              {shortlist.length} College{shortlist.length !== 1 ? 's' : ''}
            </h2>
          </div>
          <button onClick={onClose} className="mt-1 text-[#888] hover:text-[#f0ede6] transition-colors flex-shrink-0">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* content */}
        <div className="px-6 py-6 space-y-4">
          {/* action buttons */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={exportAsText}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]
                         font-['General_Sans'] text-[0.75rem] text-[#888] hover:text-[#f0ede6] hover:border-[#888]
                         transition-colors duration-150">
              {copied ? <Check size={13} strokeWidth={2} /> : <Copy size={13} strokeWidth={2} />}
              {copied ? 'Copied!' : 'Copy List'}
            </button>
            <button onClick={onClear}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]
                         font-['General_Sans'] text-[0.75rem] text-[#888] hover:text-[#e8453c] hover:border-[#e8453c]
                         transition-colors duration-150">
              <Trash2 size={13} strokeWidth={2} />
              Clear All
            </button>
          </div>

          {/* info box */}
          <div className="rounded-lg border border-[#e8453c]/20 bg-[#e8453c]/5 px-4 py-3">
            <p className="font-['General_Sans'] text-[0.78rem] text-[#888] leading-relaxed">
              Use this order when filling your DTE option form. Colleges are ranked by cutoff percentage (highest to lowest).
            </p>
          </div>

          {/* shortlist items */}
          <div className="space-y-3">
            {shortlist.map((c, i) => (
              <div key={c.college_code + c.course_name + i}
                className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 hover:border-[#e8453c]/30 transition-colors duration-150">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono'] text-[0.85rem] font-bold text-[#e8453c] bg-[#e8453c]/10 px-2.5 py-1 rounded">
                      #{i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-[0.9rem] leading-snug">
                        {c.college_name}
                      </p>
                      <p className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888] mt-0.5">
                        {c.college_code} · {c.district}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => onRemove(c)} className="shrink-0 text-[#888] hover:text-[#e8453c] transition-colors duration-150 mt-0.5">
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-['General_Sans'] text-[0.78rem] text-[#888] leading-snug truncate">
                    {c.course_name}
                  </p>
                  <span className="shrink-0 font-['JetBrains_Mono'] text-[1.1rem] font-bold text-[#e8453c] leading-none">
                    {c.cutoff_percent.toFixed(2)}%
                  </span>
                </div>

                {c.cutoff_open != null && (
                  <p className="font-['General_Sans'] text-[0.7rem] text-[#888]">
                    Merit rank: ~{c.cutoff_open.toLocaleString("en-IN")}
                  </p>
                )}

                <div className="flex gap-1.5 mt-3 pt-3 border-t border-[#2a2a2a]">
                  <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888]
                                   bg-[#0d0e0f] border border-[#2a2a2a] px-2 py-0.5 rounded">
                    {c.category}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[0.6rem] text-[#888]
                                   bg-[#0d0e0f] border border-[#2a2a2a] px-2 py-0.5 rounded">
                    CAP {c.cap_round}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── active filter pill ───────────────────────────────────────────────────────

function FilterPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                     border border-[#e8453c]/30 bg-[#e8453c]/5
                     font-['General_Sans'] text-[0.72rem] text-[#e8453c]">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors duration-100">
        <X size={11} strokeWidth={2.5} />
      </button>
    </span>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function Predictor() {
  // — predictor mode inputs
  const [percentage, setPercentage] = useState("");
  const [meritRank, setMeritRank] = useState("");
  const [branches, setBranches]     = useState([]);
  const [category, setCategory]     = useState("");

  // — shared filters
  const [districtFilters, setDistrictFilters] = useState([]);

  // — college search mode
  const [collegeSearchText, setCollegeSearchText] = useState("");
  const [selectedCollege, setSelectedCollege]     = useState(null);

  // — mode: "predictor" | "college"
  const [mode, setMode] = useState("predictor");

  // — results state
  const [searched, setSearched]   = useState(false);
  const [results, setResults]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [shortlist, setShortlist] = useState([]);
  const [showShortlist, setShowShortlist] = useState(false);

  const percentageNum = parseFloat(percentage);
  const isValidPct = percentage !== "" && !isNaN(percentageNum) && percentageNum >= 0 && percentageNum <= 100;
  const canSearch = mode === "predictor"
    ? (isValidPct && branches.length > 0 && category)
    : (selectedCollege !== null && category);

  // ── shortlist handlers ──
  const isShortlisted = useCallback(
    (c) => shortlist.some((s) => s.college_code === c.college_code && s.course_name === c.course_name),
    [shortlist]
  );
  const toggleShortlist = useCallback((c) => {
    setShortlist((prev) =>
      prev.some((s) => s.college_code === c.college_code && s.course_name === c.course_name)
        ? prev.filter((s) => !(s.college_code === c.college_code && s.course_name === c.course_name))
        : [...prev, c]
    );
  }, []);

  // ── predictor search ──
  async function handleSearch() {
    if (!canSearch) return;
    setSearched(true);
    setLoading(true);
    setError(null);
    setResults([]);

    if (mode === "college") {
      // CollegeAllBranches handles its own fetch — just mark as searched
      setLoading(false);
      return;
    }

    const patterns  = branches.flatMap((b) => BRANCH_PATTERNS[b]);
    const orFilter  = patterns.map((p) => `course_name.ilike.%${p}%`).join(",");
    const maxCutoff = percentageNum + PCT_MARGIN;

    let query = supabase
      .from("cutoffs")
      .select("college_code, college_name, district, course_name, category, cap_round, year, cutoff_open, cutoff_percent")
      .eq("category", category)
      .or(orFilter)
      .eq("year", 2025)
      .lte("cutoff_percent", maxCutoff)
      .order("cutoff_percent", { ascending: false });

    // Apply multiple district filters (OR logic)
    if (districtFilters.length > 0) {
      const districtFilter = districtFilters.map((d) => `district.eq.${d}`).join(",");
      query = query.or(districtFilter);
    }

    const { data, error: err } = await query;
    if (err) { setError("Could not fetch cutoff data. Please try again."); setLoading(false); return; }

    // Deduplicate: per college+course keep the highest cap_round (Round II > Round I)
    const groups = new Map();
    for (const row of data || []) {
      const key = `${row.college_code}__${row.course_name}`;
      const existing = groups.get(key);
      if (!existing || row.cap_round > existing.cap_round) groups.set(key, row);
    }

    const transformed = [];
    for (const row of groups.values()) {
      let chance;
      if (percentageNum >= row.cutoff_percent + 2)  chance = "high";
      else if (percentageNum >= row.cutoff_percent)  chance = "good";
      else                                           chance = "reach";

      transformed.push({ ...row, chance });
    }

    transformed.sort((a, b) => b.cutoff_percent - a.cutoff_percent);
    setResults(transformed);
    setLoading(false);
  }

  // when mode switches, reset results
  function switchMode(m) {
    setMode(m);
    setSearched(false);
    setResults([]);
    setError(null);
  }

  const activeFilters = [];
  if (districtFilters.length > 0) {
    activeFilters.push({
      label: `${districtFilters.length} district${districtFilters.length !== 1 ? 's' : ''}`,
      clear: () => setDistrictFilters([])
    });
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-20 pb-32">

      {/* header */}
      <div className="mb-10">
        <p className="font-['JetBrains_Mono'] text-[0.7rem] uppercase tracking-[0.12em] text-[#e8453c] mb-3">
          DTE Maharashtra · 2025-26
        </p>
        <h1 className="font-['Clash_Display'] font-semibold text-[#f0ede6]
                       leading-[1.08] text-[clamp(2rem,5vw,3.25rem)] mb-3">
          College Predictor
        </h1>
        <p className="font-['General_Sans'] text-[#888] text-base max-w-[520px] leading-relaxed">
          Enter your diploma percentage and category to find colleges where you'd
          have cleared the 2025 CAP cutoff — or search a specific college to see
          all its branch cutoffs. Filter by multiple districts and check merit ranks.
        </p>
      </div>

      {/* disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-[#e8453c]/20 bg-[#e8453c]/5 mb-8">
        <AlertTriangle size={15} strokeWidth={2} className="text-[#e8453c] shrink-0 mt-0.5" />
        <p className="font-['General_Sans'] text-[0.8rem] text-[#888] leading-relaxed">
          Based on actual 2025-26 DTE DSE CAP cutoff percentages — not a live prediction or a guarantee.
          Cutoffs shift every year. Confirm everything on the official DTE Maharashtra CAP portal before
          filling your option form.
        </p>
      </div>

      {/* mode tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-[#141414] border border-[#2a2a2a] w-fit mb-8">
        {[
          { id: "predictor", icon: Search,    label: "Predictor" },
          { id: "college",   icon: Building2, label: "Search College" },
        ].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => switchMode(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-['General_Sans'] text-sm
                        font-medium transition-all duration-150
                        ${mode === id
                          ? "bg-[#e8453c] text-white"
                          : "text-[#888] hover:text-[#f0ede6]"}`}>
            <Icon size={14} strokeWidth={2} />
            {label}
          </button>
        ))}
      </div>

      {/* ── PREDICTOR MODE form ── */}
      {mode === "predictor" && (
        <div className="flex flex-col gap-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* percentage */}
            <div className="flex flex-col gap-2">
              <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
                Your Diploma Percentage
              </label>
              <input
                type="number" min="0" max="100" step="0.01" placeholder="e.g. 78.50"
                value={percentage} onChange={(e) => setPercentage(e.target.value)}
                className="px-4 py-3 rounded-lg border border-[#2a2a2a] bg-[#141414]
                           font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                           hover:border-[#888] focus:border-[#e8453c] focus:outline-none
                           transition-colors duration-150
                           [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                           [&::-webkit-inner-spin-button]:appearance-none"
              />
              {percentage && !isValidPct && (
                <p className="font-['General_Sans'] text-[0.72rem] text-[#e8453c]">Enter a value between 0 and 100</p>
              )}
            </div>

            {/* category */}
            <div className="flex flex-col gap-2">
              <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
                Category
              </label>
              <SearchableDropdown 
                value={category} 
                onChange={setCategory}
                placeholder="Select your category" 
                options={CATEGORIES}
                typeLabel="category"
              />
            </div>
          </div>

          {/* merit rank (optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
                Merit Rank <span className="opacity-50 normal-case font-['General_Sans'] tracking-normal">— optional</span>
              </label>
              <input
                type="number" min="0" placeholder="e.g. 5000"
                value={meritRank} onChange={(e) => setMeritRank(e.target.value)}
                className="px-4 py-3 rounded-lg border border-[#2a2a2a] bg-[#141414]
                           font-['General_Sans'] text-sm text-[#f0ede6] placeholder:text-[#888]
                           hover:border-[#888] focus:border-[#e8453c] focus:outline-none
                           transition-colors duration-150
                           [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                           [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="font-['General_Sans'] text-[0.7rem] text-[#888] opacity-60">
                Filter colleges by merit rank for additional insights
              </p>
            </div>
          </div>

          {/* branch multi-select */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
                Preferred Branches
              </label>
              <span className="font-['General_Sans'] text-[0.68rem] text-[#888] opacity-60">— pick one or more</span>
            </div>
            <BranchSelect selected={branches} onChange={setBranches} />
            {branches.length === 0 && (
              <p className="font-['General_Sans'] text-[0.72rem] text-[#888] opacity-60">Select at least one branch</p>
            )}
          </div>

          {/* multi-district filter */}
          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
              Filter by Districts <span className="opacity-50 normal-case font-['General_Sans'] tracking-normal">— optional, select multiple</span>
            </label>
            <div className="w-full">
              <MultiSelectSearchableDropdown
                values={districtFilters}
                onChange={setDistrictFilters}
                placeholder="All districts"
                options={DISTRICTS.map((d) => ({ value: d, label: d }))}
              />
            </div>
            {districtFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {districtFilters.map((d) => (
                  <FilterPill key={d} label={d} onRemove={() => setDistrictFilters(districtFilters.filter(x => x !== d))} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── COLLEGE SEARCH MODE form ── */}
      {mode === "college" && (
        <div className="flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
                College Name
              </label>
              <CollegeSearch
                value={collegeSearchText}
                onChange={setCollegeSearchText}
                onSelect={(c) => { setSelectedCollege(c); setSearched(false); setResults([]); }}
              />
              {selectedCollege && (
                <p className="font-['General_Sans'] text-[0.72rem] text-[#e8453c] flex items-center gap-1">
                  <MapPin size={10} strokeWidth={2} /> {selectedCollege.district}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-wider text-[#888]">
                Your Category
              </label>
              <SearchableDropdown 
                value={category} 
                onChange={setCategory}
                placeholder="Select your category" 
                options={CATEGORIES}
                typeLabel="category"
              />
            </div>
          </div>
        </div>
      )}

      {/* active filter pills */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((f) => (
            <FilterPill key={f.label} label={f.label} onRemove={f.clear} />
          ))}
        </div>
      )}

      {/* search button */}
      <button
        onClick={handleSearch}
        disabled={!canSearch}
        className={`flex items-center gap-2 px-8 py-3 rounded-lg font-['Cabinet_Grotesk']
                    font-semibold text-sm transition-all duration-150 mb-12
                    ${canSearch
                      ? "bg-[#e8453c] text-white hover:bg-[#d03d35] cursor-pointer"
                      : "bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] cursor-not-allowed"}`}>
        <Search size={15} strokeWidth={2} />
        {mode === "predictor" ? "Find Colleges" : "Show All Branches"}
      </button>

      {/* ── results ── */}
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

        {/* college search result — show CollegeAllBranches inline */}
        {mode === "college" && searched && !loading && selectedCollege && category && (
          <CollegeAllBranches
            college={selectedCollege}
            category={category}
            onClose={() => { setSearched(false); setResults([]); }}
          />
        )}

        {/* predictor empty state */}
        {!searched && !loading && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
              <Search size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">
              {mode === "predictor" ? "Ready when you are" : "Search for a college above"}
            </p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[320px] leading-relaxed">
              {mode === "predictor"
                ? "Fill in your percentage, category, and branches — then shortlist colleges to plan your option form."
                : "Type a college name, pick your category, and see all branch cutoffs for 2025."}
            </p>
          </div>
        )}

        {/* predictor no results */}
        {mode === "predictor" && searched && !loading && !error && results.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center mb-2">
              <Info size={20} strokeWidth={1.5} className="text-[#888]" />
            </div>
            <p className="font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6] text-base">No colleges found</p>
            <p className="font-['General_Sans'] text-[#888] text-sm max-w-[320px] leading-relaxed">
              No 2025 cutoffs near {percentage}% for your selected branches and category
              {districtFilters.length > 0 ? ` in ${districtFilters.join(', ')}` : ""}. Try more branches, a different category
              {districtFilters.length > 0 ? ", or remove the district filters" : ""}.
            </p>
          </div>
        )}

        {/* predictor results grid */}
        {mode === "predictor" && searched && !loading && !error && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <p className="font-['JetBrains_Mono'] text-[0.7rem] text-[#888] tracking-wider uppercase">
                  {results.length} college{results.length !== 1 ? "s" : ""} found
                </p>
                <p className="font-['General_Sans'] text-[0.75rem] text-[#888] mt-1">
                  {percentage}% · {category}
                  {districtFilters.length > 0 ? ` · ${districtFilters.join(', ')}` : ""}
                </p>
              </div>
              {shortlist.length > 0 && (
                <button onClick={() => setShowShortlist(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e8453c]/40 bg-[#e8453c]/5
                             font-['General_Sans'] text-[0.75rem] text-[#e8453c] hover:bg-[#e8453c]/10
                             transition-colors duration-150">
                  <BookmarkCheck size={14} strokeWidth={2} />
                  {shortlist.length} Shortlisted
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((c, i) => (
                <ResultCard key={c.college_code + c.course_name + i}
                  college={c} isShortlisted={isShortlisted(c)} onToggle={toggleShortlist} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced shortlist drawer */}
      {showShortlist && (
        <ShortlistDrawer
          shortlist={shortlist}
          onRemove={toggleShortlist}
          onClear={() => setShortlist([])}
          onClose={() => setShowShortlist(false)}
        />
      )}
    </section>
  );
}
