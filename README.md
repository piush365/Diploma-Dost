<div align="center">

<br />

<img src="https://aujimkqsmxjaeusspxtp.supabase.co/storage/v1/object/public/model/dd-logo.png" alt="Diploma Dost" width="88" />

<br /><br />

# Diploma Dost

### The all-in-one academic platform for MSBTE K-Scheme diploma students.

*Built by diploma students. Maintained by diploma students. Free for every diploma student.*

<br />

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit%20Now-e8453c?style=for-the-badge&logoColor=white)](https://diploma-dost.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-c8f04d?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-4d9ef0?style=for-the-badge)](https://github.com/piush365/Diploma-Dost/pulls)
[![E2E Tests](https://img.shields.io/github/actions/workflow/status/piush365/Diploma-Dost/playwright.yml?style=for-the-badge&label=E2E%20Tests&color=c8f04d)](https://github.com/piush365/Diploma-Dost/actions)

<br />

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps)
![n8n](https://img.shields.io/badge/n8n-FFA500)
<br />

</div>

---

## Why This Exists

Every Maharashtra diploma student knows the feeling — Semester 1, no senior to ask, no idea which subjects actually matter, resources scattered across random Telegram groups, admission cutoffs hidden behind paywalls, career paths nobody explains.

We built the platform we wished existed when we started.

**Diploma Dost covers everything across your 3 years** — PYQs, notes, roadmaps, college predictor, DSA tracks, YouTube playlists, internship guides, scholarship info, placement prep, and a community to ask questions in. All free. No login required to browse.

---

## Features

<table>
<tr>
<td width="50%" valign="top">

#### 📚 Resources
PYQs, model answers, and notes for every subject — organized by branch, semester, and type. Browse without logging in. Upload your own to help juniors.

</td>
<td width="50%" valign="top">

#### 🗺️ Roadmaps
Step-by-step career paths for CS, IT, Mechanical, Civil, Electrical, and ETC. Full-Stack, AI/ML, Android, Core CS — with curated resources and honest time estimates.

</td>
</tr>
<tr>
<td width="50%" valign="top">

#### 🎯 College Predictor
Input your MSBTE percentile, get realistic college predictions based on real DTE/CAP cutoff data. No guesswork.

</td>
<td width="50%" valign="top">

#### 💡 Innovation Hub
ITR and capstone project ideas, micro-innovation prompts, and research pointers — because "do a project" is useless without direction.

</td>
</tr>
<tr>
<td width="50%" valign="top">

#### 🏆 DSA & CP
Structured tracks from zero to contest-ready — LeetCode, Codeforces, Striver's sheet, GFG — all organised by topic and difficulty.

</td>
<td width="50%" valign="top">

#### 📺 YouTube Hub
The best playlist for every subject in Semesters 1–6, hand-curated. No more searching — open and study.

</td>
</tr>
<tr>
<td width="50%" valign="top">

#### 🔍 Internship Guide
Where to look, how to apply, what to say — a practical guide built from real experience getting internships as a diploma student.

</td>
<td width="50%" valign="top">

#### 👥 Community
Ask questions, share answers, help the next batch. A public Q&A board where seniors actually respond.

</td>
</tr>
<tr>
<td width="50%" valign="top">

#### 📅 MSBTE Calendar
Exam schedules, result dates, rechecking deadlines — updated every cycle.

</td>
<td width="50%" valign="top">

#### 🎓 Scholarships
EBC, SC/ST, OBC, Minority — every scholarship you're eligible for, with eligibility criteria and application guides.

</td>
</tr>
<tr>
<td width="50%" valign="top">

#### 💼 Placement Prep
Resume templates, mock interview Q&A, and placement drive timelines for diploma students entering campus recruitment.

</td>
<td width="50%" valign="top">

#### 🌐 Open Source
Beginner-friendly open source projects to contribute to — because your first PR matters more than your GPA.

</td>
</tr>
</table>

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **UI** | React 19 | Component model, concurrent rendering |
| **Build** | Vite 8 | Sub-second HMR, optimised production output |
| **Styling** | Tailwind CSS v3 + CSS custom properties | Utility-first with a strict design system |
| **Database / Auth** | Supabase (PostgreSQL + RLS) | Real-time DB, auth, and file storage |
| **3D Background** | Three.js | SpaceMesh animated canvas |
| **Routing** | React Router v7 (HashRouter) | Static-site compatible client routing |
| **Icons** | Lucide React + React Icons | Lightweight, tree-shakeable |
| **Testing** | Playwright | End-to-end tests on every push and PR |
| **Deployment** | Vercel / GitHub Pages | Zero-config CI/CD |

---

## Design System

One dark theme. One palette. No hardcoded hex values in components — everything references CSS custom properties.

```css
/* Core palette — src/index.css */
--bg:            #0d0e0f    /* Page background      */
--surface:       #141414    /* Cards, modals        */
--surface2:      #1a1a1a    /* Nested surfaces      */
--border:        #2a2a2a    /* All borders          */
--text:          #f0ede6    /* Primary text         */
--text-muted:    #888888    /* Secondary / labels   */
--accent:        #e8453c    /* Red — primary/errors */
--accent-lime:   #c8f04d    /* Lime — success       */
--accent-blue:   #4d9ef0    /* Blue — info          */
--accent-purple: #b87aff    /* Purple — decorative  */
```

**Fonts:** `ClashDisplay` (headings) · `CabinetGrotesk` (UI) · `GeneralSans` (body) · `JetBrains Mono` (code/labels)

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project ([free tier](https://supabase.com) is enough to run everything)

### Setup

```bash
# 1. Clone
git clone https://github.com/piush365/Diploma-Dost.git
cd Diploma-Dost

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
```

Open `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

```bash
# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other scripts

```bash
npm run build     # Production build — must pass before any PR
npm run preview   # Preview the production build locally
npm run lint      # ESLint
npx playwright test  # End-to-end tests
```

---

## Project Structure

```
Diploma-Dost/
├── src/
│   ├── pages/                  # One file per route
│   │   ├── Home.jsx
│   │   ├── Resources.jsx       # PYQs, notes, community uploads
│   │   ├── Roadmaps.jsx        # Career path explorer
│   │   ├── Predictor.jsx       # College admission predictor
│   │   ├── Community.jsx       # Q&A board
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ResetPassword.jsx
│   │   └── ...
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SpaceMesh.jsx       # Three.js animated background
│   │   └── ErrorBoundary.jsx
│   ├── data/
│   │   └── roadmaps.js         # Static roadmap content (edit to contribute)
│   ├── lib/
│   │   └── supabase.js         # Supabase client
│   └── index.css               # CSS variables + global utilities
├── tests/                      # Playwright e2e tests
├── .github/
│   ├── workflows/
│   │   └── playwright.yml      # CI — runs on every push and PR
│   └── PULL_REQUEST_TEMPLATE.md
└── public/                     # Static assets, PWA manifest
```

---

## Contributing

Contributions are welcome from everyone — diploma students, developers, designers, and people who just want to fix a typo.

<details>
<summary><strong>First time? Here's how.</strong></summary>

<br />

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Diploma-Dost.git

# 2. Create a branch — never commit to main directly
git checkout -b feature/your-feature-name

# 3. Make your changes, then verify the build passes
npm run build

# 4. Push and open a Pull Request on GitHub
git push origin feature/your-feature-name
```

GitHub will pre-fill the PR description with a checklist. Fill it out honestly.

</details>

<details>
<summary><strong>What can I contribute?</strong></summary>

<br />

| Contribution | How |
|---|---|
| **Study resources** | Upload PYQs, notes, or model answers via the Resources page — no code needed |
| **Roadmap content** | Edit or add nodes in `src/data/roadmaps.js` |
| **Bug fixes** | Check the [open issues](https://github.com/piush365/Diploma-Dost/issues) |
| **New features** | Open an issue first — discuss scope before writing code |
| **Scholarship / internship info** | Update the relevant page data |
| **Community answers** | Answer questions on the platform itself |

</details>

<details>
<summary><strong>Code conventions</strong></summary>

<br />

- **One file per route** in `src/pages/` — keep pages self-contained
- **Mobile-first always** — design at 375px first, scale up
- **CSS variables only** — never write a hex value in a component; use `var(--accent)`, `var(--surface)`, etc.
- **No new dependencies** without opening an issue first
- **`btn-primary` / `btn-ghost`** for buttons; **`.glass`** for cards
- Error/destructive states → `var(--accent)` · Success states → `var(--accent-lime)`
- Run `npm run build` locally before pushing — the PR template will ask you to confirm this

</details>

---

## The Story

This started as an ITR submission in Semester 5 — a simple site to collect resources we'd scraped together over four semesters of figuring things out without a guide.

```
Sem 1–4  →  Felt the gap firsthand. No senior to ask. No organised resources.
Sem 5    →  Built the first version as an ITR project.
Sem 6    →  Decided not to let it die in a folder. Rebuilt it open source.
Today    →  A growing platform by diploma students, for diploma students.
```

Every feature on this platform exists because someone on the team felt the same gap you probably felt.


<div align="center">

### Numbers

| `6` | `13+` | `100%` | `∞` |
|:---:|:---:|:---:|:---:|
| Branches supported | Features | Free, forever | Resources |

</div>

---

## License

[MIT](LICENSE) — use it, fork it, build on it. Just don't claim it as your own.

---

<div align="center">

**If Diploma Dost helped you, give it a ⭐** — it helps other students find it.

<br />

*Made with stubbornness by diploma students who got tired of figuring it out alone.*

</div>
