import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ExternalLink, PlayCircle, BookOpen, ChevronDown, Loader2 } from "lucide-react";
import "./YouTube.css";

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

// ── playlist card ──────────────────────────────────────────────────────────────

function PlaylistCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const thumb = item.thumbnail_url || null;

  return (
    <a
      href={item.playlist_url}
      target="_blank"
      rel="noopener noreferrer"
      className="yt-card"
      aria-label={`Open ${item.subject} playlist on YouTube`}
    >
      <div className="yt-card__thumb">
        {thumb && !imgError ? (
          <img
            src={thumb}
            alt={item.subject}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="yt-card__thumb-fallback">
            <PlayCircle size={32} strokeWidth={1.5} />
          </div>
        )}
        <div className="yt-card__overlay">
          <PlayCircle size={26} color="#fff" strokeWidth={1.5} />
        </div>
      </div>

      <div className="yt-card__body">
        <p className="yt-card__subject">{item.subject}</p>
        {item.channel_name && (
          <span className="yt-card__channel">
            <BookOpen size={11} strokeWidth={2} />
            {item.channel_name}
          </span>
        )}
        <span className="yt-card__cta">
          Watch playlist <ExternalLink size={11} strokeWidth={2} />
        </span>
      </div>
    </a>
  );
}

// ── semester accordion block ───────────────────────────────────────────────────

function SemesterBlock({ sem, playlists }) {
  const [open, setOpen] = useState(sem === 1);

  return (
    <div className="yt-sem">
      <button
        className={`yt-sem__header${open ? " yt-sem__header--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="yt-sem__label">
          <span className="yt-sem__number">SEM {sem}</span>
          <span className="yt-sem__count">{playlists.length} subjects</span>
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`yt-sem__chevron${open ? " yt-sem__chevron--open" : ""}`}
        />
      </button>

      {open && (
        <div className="yt-grid">
          {playlists.map((item) => (
            <PlaylistCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── main page ──────────────────────────────────────────────────────────────────

export default function YouTube() {
  const [activeBranch, setActiveBranch] = useState("CS");
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData([]);

    supabase
      .from("playlists")
      .select("id, branch, semester, subject, channel_name, playlist_url, thumbnail_url")
      .eq("branch", activeBranch)
      .order("semester", { ascending: true })
      .order("subject",  { ascending: true })
      .then(({ data: rows, error: err }) => {
        if (cancelled) return;
        if (err) { setError(err.message); setLoading(false); return; }
        setData(rows || []);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [activeBranch]);

  const bySemester = SEMESTERS.reduce((acc, s) => {
    const rows = data.filter((r) => r.semester === s);
    if (rows.length) acc[s] = rows;
    return acc;
  }, {});

  const hasSemesters = Object.keys(bySemester).length > 0;

  return (
    <section className="yt-page">

      {/* header */}
      <div className="yt-header">
        <p className="yt-eyebrow">Free Resources</p>
        <h1 className="yt-title">YouTube Playlists</h1>
        <p className="yt-subtitle">
          Hand-picked playlists for every subject, every semester —
          curated for MSBTE K-scheme.
        </p>
      </div>

      {/* branch tabs */}
      <div className="yt-tabs" role="tablist" aria-label="Select branch">
        {BRANCHES.map((b) => (
          <button
            key={b}
            role="tab"
            aria-selected={activeBranch === b}
            className={`yt-tab${activeBranch === b ? " yt-tab--active" : ""}`}
            onClick={() => setActiveBranch(b)}
          >
            <span className="yt-tab__code">{b}</span>
            <span className="yt-tab__full">{BRANCH_LABELS[b]}</span>
          </button>
        ))}
      </div>

      {/* content */}
      <div className="yt-content">

        {loading && (
          <div className="yt-state">
            <Loader2 size={22} className="yt-spinner" />
            <p>Loading playlists…</p>
          </div>
        )}

        {!loading && error && (
          <div className="yt-state yt-state--error">
            <p>Could not load playlists. Check your connection and try again.</p>
            <code className="yt-state__code">{error}</code>
          </div>
        )}

        {!loading && !error && !hasSemesters && (
          <div className="yt-state">
            <PlayCircle size={32} strokeWidth={1.2} />
            <p>No playlists yet for {BRANCH_LABELS[activeBranch]}.</p>
            <p className="yt-state__sub">Yogesh is adding them — check back soon.</p>
          </div>
        )}

        {!loading && !error && hasSemesters &&
          Object.entries(bySemester).map(([sem, playlists]) => (
            <SemesterBlock
              key={sem}
              sem={Number(sem)}
              playlists={playlists}
            />
          ))
        }

      </div>
    </section>
  );
}