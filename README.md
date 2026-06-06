# 🎓 Diploma Dost

> Your buddy for all 3 years of diploma — free, open source, built by diploma students for diploma students.

[![Live Site](https://img.shields.io/badge/Live%20Site-diplomadost.vercel.app-6C47FF?style=flat-square)](https://diploma-dost.vercel.app/)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-0F6E56?style=flat-square)](#contributing)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## What is Diploma Dost?

Most diploma students don't have a senior to guide them — no one to tell them which subjects matter, how to write exam answers, what projects to build, or how to get into a good engineering college after diploma.

**Diploma Dost fills that gap.**

It's a free platform covering everything a diploma CS/IT student needs across their 3 years — from PYQs and notes to career roadmaps, internship guidance, college admission prediction, and more.

Originally built as an ITR project. Now being revived and rebuilt properly as an open-source platform.

---

## Features

| Section | What's inside |
|---|---|
| 📚 Academic Resources | PYQs, Model Answer Papers, Syllabus — CS, IT, Mech, Civil, Elec, E&TC |
| 📝 Notes | Curated CS/IT notes, community-submitted links |
| 🎯 College Predictor | Enter your % → get predicted engineering college + branch (DTE cutoff based) |
| 💡 Project Guidance | Ideas for ITR, Capstone, and micro projects + GitHub setup guide |
| 🛣️ Career Roadmaps | Web Dev, DSA, Cybersecurity, Data Science — skills + roadmap |
| 🏆 DSA & CP | Intro to LeetCode, Striver SDE Sheet, GFG, CodeChef |
| 📺 YouTube Hub | Curated playlists for every subject, Sem 1–6 |
| 🔍 Internship Guide | Where to search, how to apply, when to start |
| 📅 MSBTE Calendar | Exam dates, rechecking deadlines, form filling reminders |
| 🎓 Scholarship Guide | EBC, SC/ST, OBC, minority — eligibility + how to apply |
| 💼 Placement Prep | Resume guide, HR + technical interview prep for diploma students |
| 👥 Community | Connect with seniors, ask doubts, get answers |
| 🌐 Open Source Guide | How to contribute to this project and others |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Routing | React Router v6 |
| UI Components | shadcn/ui |
| Backend / DB | Supabase (Auth, PostgreSQL, Storage) |
| File Storage | Google Drive + Supabase metadata |
| Hosting | Vercel |
| Mobile | PWA (installable on phone home screen) |

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js v18+
- Git

### Steps

```bash
# 1. Fork this repo, then clone your fork
git clone https://github.com/YOUR_USERNAME/diploma-dost.git
cd diploma-dost

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Supabase URL and anon key in .env

# 4. Start dev server
npm run dev
```

The site will be running at `http://localhost:5173`

---

## Project Structure

```
diploma-dost/
├── public/              # Static assets, PWA manifest
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # One file per route/section
│   ├── data/            # Static JSON — playlists, roadmaps, cutoffs
│   ├── lib/             # Supabase client, utilities
│   └── App.jsx          # Root component + routes
├── .env.example
├── CONTRIBUTING.md
└── README.md
```

---

## Contributing

We welcome contributions of all kinds — code, content, design, bug reports, resource links. You don't need to be a great coder to contribute.

**Read [CONTRIBUTING.md](CONTRIBUTING.md) before you start.**

It covers everything: how to pick a task, branch naming, PR format, and code style.

---

## Team

| Name | Role |
|---|---|
| [Piush](https://github.com/piush365) | Lead Developer & Maintainer |
| Anjali | Backend (Supabase) |
| Anushka | ML Research + Career content |
| Ravi | Frontend pages + resource collection |
| Shraddha | Python scripts + content |
| Yogesh | Frontend pages + YouTube curation |
| Sharayu | Frontend (React components) |

---

## License

MIT — free to use, share, and build on. Just don't claim it as your own.

---

## Spread the Word

If this helped you, share it with your classmates. The more students who know about it, the better it gets.

> Built with ❤️ by diploma students, for diploma students.
