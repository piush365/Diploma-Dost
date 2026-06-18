import { Mail, ArrowRight, Lightbulb, Star, Sparkles } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const TEAM_MEMBERS = [
  {
    name: 'Piush',
    role: 'Lead Developer & Maintainer',
    github: 'piush365',
    avatar: 'https://aujimkqsmxjaeusspxtp.supabase.co/storage/v1/object/public/model/Piush.jpeg',
    advice: "Don't just study for exams — build projects. Practical experience is worth more than theoretical knowledge.",
  },
  {
    name: 'Sharayu',
    role: 'Frontend (React Components)',
    github: null,
    avatar: 'https://aujimkqsmxjaeusspxtp.supabase.co/storage/v1/object/public/model/Sharayu.jpeg',
    advice: "Understand the 'why' behind every concept, not just the 'how'. It makes debugging so much easier.",
  },
  {
    name: 'Yogesh',
    role: 'Frontend + YouTube Curation',
    github: null,
    avatar: 'https://aujimkqsmxjaeusspxtp.supabase.co/storage/v1/object/public/model/Yogesh.jpeg',
    advice: 'Curate your learning resources carefully. Five good playlists beat fifty bookmarked tabs.',
  },
  {
    name: 'Ravi',
    role: 'Frontend + Resource Collection',
    github: null,
    avatar: null,
    advice: 'Start contributing to open source, even tiny fixes. It teaches collaboration faster than any course.',
  },
  {
    name: 'Anjali',
    role: 'Backend (Supabase)',
    github: 'Anjali0424',
    avatar: 'https://aujimkqsmxjaeusspxtp.supabase.co/storage/v1/object/public/model/Anjali.jpeg',
    advice: "Master SQL fundamentals early. It's the backbone of almost every application you'll ever touch.",
  },
  {
    name: 'Anushkaa',
    role: 'ML Research + Career Content',
    github: null,
    avatar: 'https://aujimkqsmxjaeusspxtp.supabase.co/storage/v1/object/public/model/Anushkaa.jpeg',
    advice: 'Network with seniors and alumni early. Their insights and referrals open doors textbooks never will.',
  },
  {
    name: 'Shraddha',
    role: 'Python Scripts + Content',
    github: null,
    avatar: null,
    advice: 'Automate the boring stuff with Python early — it saves time and builds skills employers actually want.',
  },
  {
    name: 'Sanket',
    role: 'Advisor + UI/UX Designer',
    github: null,
    avatar: null,
    advice: "Grab the opportunity to work on this project — it's a great way to learn and grow.",
  },
];

const STORY_MILESTONES = [
  { label: 'Sem 1–4', text: 'Felt the gap firsthand — no senior to ask which subjects mattered or how to prep for exams.' },
  { label: 'Sem 5', text: 'Built the first version as an ITR (Industry Training Report) submission.' },
  { label: 'Sem 6 onward', text: 'Decided not to let it die in a folder — rebuilding it open source, for everyone.' },
  { label: 'Today', text: 'A growing platform maintained by a small team of diploma students, for diploma students.' },
];

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--accent)] mb-3 font-bold">
      {children}
    </p>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-ghost inline-flex items-center gap-2"
    >
      {icon}
      {label}
    </a>
  );
}

function Avatar({ src, name, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'w-24 h-24 md:w-28 md:h-28' : 'w-16 h-16';
  const textClasses = size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <div
      className={`flex-shrink-0 ${sizeClasses} bg-[var(--surface2)] border border-[var(--border)] rounded-full flex items-center justify-center overflow-hidden`}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className={`text-[var(--accent-lime)] ${textClasses} font-display font-bold`}>
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default function AboutPage() {
  const founder = TEAM_MEMBERS[0];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <section className="max-w-4xl mx-auto px-6 py-20 pb-32">

        {/* Hero */}
        <div className="mb-20">
          <SectionLabel>About Us</SectionLabel>
          <h1 className="font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] mb-5">
            Built by someone who needed
            <br />
            this two years ago.
          </h1>
          <p className="font-body text-[1.05rem] text-[var(--text-muted)] max-w-[600px] leading-relaxed">
            Diploma Dost is your buddy for all three years of diploma — free, open
            source, and built by diploma students for diploma students.
          </p>
        </div>

        {/* The Problem */}
        <div className="mb-20">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-4">
            No senior in your corner?
          </h2>
          <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed max-w-2xl">
            Most diploma students don't have anyone to tell them which subjects
            actually matter, how to write exam answers that score, what projects
            are worth building, or how to plan life after diploma. Diploma Dost
            exists to be that senior — the one you wish you had.
          </p>
        </div>

        {/* The Story — timeline style */}
        <div className="mb-20">
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-4">
            From a college submission to a community platform
          </h2>
          <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
            This project started as an ITR — an Industry Training Report, the
            kind of thing most students submit once and forget. Instead, it
            became something real.
          </p>
          <div className="space-y-5 max-w-2xl">
            {STORY_MILESTONES.map((step, i) => (
              <div key={i} className="flex gap-5 items-start">
                <span className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--accent-lime)] font-bold w-24 flex-shrink-0 pt-1">
                  {step.label}
                </span>
                <p className="font-body text-[0.9rem] text-[var(--text)] leading-relaxed border-l border-[var(--border)] pl-5 pb-1">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Creator */}
        <div className="mb-20">
          <SectionLabel>The Founder</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-8">
            Meet the creator — Piush
          </h2>
          <div className="glass p-8 rounded-xl flex flex-col md:flex-row items-start gap-8">
            <div className="mx-auto md:mx-0">
              <Avatar src={founder.avatar} name={founder.name} size="lg" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
                Hi, I'm Piush.
              </h3>
              <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed mb-4">
                I built Diploma Dost during my own diploma years, after running
                into the exact confusion this platform is meant to solve — not
                knowing which subjects mattered, scrambling for PYQs and notes,
                and figuring out the college admission process with zero
                guidance.
              </p>
              <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed mb-4">
                I've since graduated from diploma and am now continuing my
                engineering journey — but I didn't want to leave this project
                behind. Diploma Dost is my way of giving back what I wished
                someone had given me: a clear starting point.
              </p>
              <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed mb-6">
                If you're a diploma student, I hope this helps you the way I
                needed it to. And if you're a developer, I'd love your help
                making it better.
              </p>

              <div className="flex gap-3 flex-wrap mb-5">
                <SocialLink href="https://github.com/piush365" icon={<FaGithub size={18} />} label="GitHub" />
                <SocialLink href="https://www.linkedin.com/in/piush-gogi-90a44737b/" icon={<FaLinkedin size={18} />} label="LinkedIn" />
                <SocialLink href="https://www.instagram.com/piush_without_a_y/" icon={<FaInstagram size={18} />} label="Instagram" />
                <SocialLink href="mailto:piushusepurpose@gmail.com" icon={<Mail size={18} />} label="Email" />
              </div>

              <p className="font-body text-[0.85rem] text-[var(--text-muted)] leading-relaxed flex items-start gap-2">
                <Star size={16} className="text-[var(--accent-lime)] flex-shrink-0 mt-0.5" />
                <span>
                  If this project helped you, a star on the{' '}
                  <a
                    href="https://github.com/piush365/diploma-dost"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline"
                  >
                    GitHub repo
                  </a>{' '}
                  means a lot — it helps more students find it too.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* What's Inside */}
        <div className="mb-20">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-4">
            Everything your 3 years need, in one place
          </h2>
          <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed max-w-2xl mb-6">
            Academic resources, notes, a college admission predictor, career
            roadmaps, DSA &amp; competitive programming guides, YouTube
            playlists, internship guidance, the MSBTE exam calendar,
            scholarship info, placement prep, and a community to connect with
            seniors.
          </p>
          <a href="/" className="btn-primary inline-flex items-center gap-2">
            Explore features <ArrowRight size={15} />
          </a>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <SectionLabel>Our Team</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-8">
            The people behind the project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  <Avatar src={member.avatar} name={member.name} size="md" />
                </div>
                <h3 className="font-ui text-base font-bold text-[var(--text)] mb-1">
                  {member.name}
                </h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  {member.role}
                </p>
                {member.github ? (
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline inline-flex items-center gap-2 text-sm"
                  >
                    <FaGithub size={14} /> {member.github}
                  </a>
                ) : (
                  <span className="text-[var(--text-muted)] text-sm">Contributor</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Senior Advice */}
        <div className="mb-20">
          <SectionLabel>Guidance</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-3">
            Advice from your seniors
          </h2>
          <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
            A few words from the people who built this — for the juniors coming
            up behind them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="glass p-6 rounded-xl flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar src={member.avatar} name={member.name} size="md" />
                  <div>
                    <h3 className="font-ui text-base font-bold text-[var(--text)]">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--text-muted)]">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lightbulb size={18} className="text-[var(--accent-lime)] flex-shrink-0 mt-1" />
                  <p className="font-body text-[0.9rem] text-[var(--text-muted)] italic leading-relaxed">
                    "{member.advice}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Involved */}
        <div className="border-t border-[var(--border)] pt-16">
          <SectionLabel>Join Us</SectionLabel>
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold leading-tight mb-4">
            Help build the senior every junior deserves
          </h2>
          <p className="font-body text-[0.95rem] text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
            Diploma Dost is open source — anyone can contribute code, content,
            design, or resource links, regardless of skill level. Check out{' '}
            <a
              href="https://github.com/piush365/diploma-dost/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              CONTRIBUTING.md
            </a>{' '}
            to get started.
          </p>
          <a
            href="https://github.com/piush365/diploma-dost"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contribute on GitHub <FaGithub size={15} />
          </a>
          <p className="font-body text-[0.9rem] text-[var(--text-muted)] leading-relaxed mt-10 flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--accent-lime)]" />
            Built with care by diploma students, for diploma students.
          </p>
        </div>

      </section>
    </div>
  );
}