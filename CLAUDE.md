# Diploma Dost — Claude Code Instructions

## Stack
React + Vite + Tailwind CSS + Supabase (PostgreSQL + Auth) + Vercel + PWA

## Project Structure
- src/pages/ → one file per route
- src/components/ → Navbar, Footer, HeroScene, SpaceMesh, ErrorBoundary
- src/data/ → roadmaps.js (static JSON)
- src/lib/ → supabase.js (Supabase client)
- src/index.css → CSS variables, dark theme, .glass class
- tests/ → Playwright e2e tests

## Design System
- Dark theme: --bg #0d0e0f, --surface #141414, --accent #e8453c, --accent-lime #c8f04d
- Fonts: ClashDisplay (headings), CabinetGrotesk (UI), GeneralSans (body)
- Mobile-first always
- Use .glass for cards

## Supabase Tables
- questions, answers → Community
- resources → Resources
- cutoffs → Predictor
- playlists → YouTube

## Rules
- Follow existing patterns and CSS variables
- Mobile-first
- Be direct, make decisions
- Call out mistakes