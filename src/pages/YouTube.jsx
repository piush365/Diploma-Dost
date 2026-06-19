import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { ExternalLink, PlayCircle, BookOpen, ChevronDown, Loader2, Play } from "lucide-react";
import "./YouTube.css";

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
            <PlayCircle size={40} strokeWidth={1.2} />
          </div>
        )}
        <div className="yt-card__overlay">
          <div className="yt-card__play-btn">
            <Play size={24} color="#fff" fill="#fff" strokeWidth={0} />
          </div>
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
          Watch <ExternalLink size={10} strokeWidth={2.5} />
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
        <div className="yt-sem__label">
          <span className="yt-sem__number">SEM {sem}</span>
          <span className="yt-sem__count">{playlists.length} {playlists.length === 1 ? 'subject' : 'subjects'}</span>
        </div>
        <ChevronDown
          size={18}
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
  const totalPlaylists = data.length;

  return (
    <section className="yt-page">

      {/* header */}
      <div className="yt-header">
        <div className="yt-header__top">
          <p className="yt-eyebrow">Free Resources</p>
          <h1 className="yt-title">YouTube Playlists</h1>
        </div>
        <p className="yt-subtitle">
          Hand-picked playlists for every subject, every semester — 
          curated by experienced educators for MSBTE K-scheme students.
        </p>
        {hasSemesters && (
          <div className="yt-header__stats">
            <span className="yt-stat">
              <span className="yt-stat__value">{totalPlaylists}</span>
              <span className="yt-stat__label">Playlists</span>
            </span>
            <span className="yt-stat">
              <span className="yt-stat__value">{Object.keys(bySemester).length}</span>
              <span className="yt-stat__label">Semesters</span>
            </span>
          </div>
        )}
      </div>

      {/* branch tabs */}
      <div className="yt-branch-selector">
        <p className="yt-branch-label">Select your branch</p>
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
      </div>

      {/* content */}
      <div className="yt-content">

        {loading && (
          <div className="yt-state">
            <Loader2 size={28} className="yt-spinner" />
            <p className="yt-state__title">Loading playlists…</p>
            <p className="yt-state__sub">Fetching the best content for {BRANCH_LABELS[activeBranch]}</p>
          </div>
        )}

        {!loading && error && (
          <div className="yt-state yt-state--error">
            <p className="yt-state__title">Oops! Something went wrong</p>
            <p className="yt-state__sub">Could not load playlists. Check your connection and try again.</p>
          </div>
        )}

        {!loading && !error && !hasSemesters && (
          <div className="yt-state">
            <PlayCircle size={40} strokeWidth={1.2} />
            <p className="yt-state__title">No playlists yet</p>
            <p className="yt-state__sub">Playlists for {BRANCH_LABELS[activeBranch]} are being curated. Check back soon!</p>
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

      {/* footer hint */}
      {hasSemesters && (
        <div className="yt-footer">
          <p>💡 <strong>Tip:</strong> Start with Semester 1 fundamentals, then progress through each semester. Each playlist builds on the previous knowledge.</p>
        </div>
      )}

    </section>
  );
}
