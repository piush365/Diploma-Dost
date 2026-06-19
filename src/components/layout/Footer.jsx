import { ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';


import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link
                to="/"
                className="flex items-center gap-2"
              >
                <span className="font-[var(--font-display)] text-2xl font-bold text-[var(--text)]">
                  Diploma <span className="text-[var(--accent)]">Dost</span>
                </span>
              </Link>
            </div>
            <p className="font-[var(--font-body)] text-[var(--text-muted)] leading-relaxed mb-6 max-w-xs">
              Your buddy for all 3 years of diploma — free, open source, built by diploma students for diploma students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[var(--font-ui)] font-bold text-[var(--text)] mb-6 tracking-tight">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Resources', path: '/resources' },
                { label: 'Roadmaps', path: '/roadmaps' },
                { label: 'CAP Updates', path: '/admission-progress' },
                { label: 'Predictor', path: '/predictor' },
                { label: 'DSA & CP', path: '/dsa' },
                { label: 'Internships', path: '/internships' },
                { label: 'Community', path: '/community' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-[var(--font-body)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-[var(--font-ui)] font-bold text-[var(--text)] mb-6 tracking-tight">
              Resources
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'YouTube Hub', path: '/youtube' },
                { label: 'MSBTE Calendar', path: '/msbte' },
                { label: 'Scholarships', path: '/scholarships' },
                { label: 'Placement Prep', path: '/placement' },
                { label: 'Open Source Guide', path: '/opensource' },
                { label: 'About', path: '/about' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-[var(--font-body)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                >
                  <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-[var(--font-ui)] font-bold text-[var(--text)] mb-6 tracking-tight">
              Connect
            </h4>
            <div className="flex flex-col gap-6">
              {/* Links */}
              <div className="flex flex-col gap-3">
                <a
                  href="https://github.com/piush365/diploma-dost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[var(--font-body)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                >
                  <FaGithub size={16} />  
                  GitHub Repo
                </a>
                <Link
                  to="/opensource"
                  className="font-[var(--font-body)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
                >
                  Contributing Guide
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/piush365/diploma-dost"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/piush-gogi-90a44737b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/piush_without_a_y/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile"
                  className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.1em] uppercase text-[var(--text-muted)]">
            © 2026 Diploma Dost. MIT Licensed.
          </p>
          <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)]">
            Built with ❤️ by diploma students, for diploma students.
          </p>
        </div>
      </div>
    </footer>
  );
}