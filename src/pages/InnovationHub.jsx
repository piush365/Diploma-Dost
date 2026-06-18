import { useState } from "react";
import { Lightbulb, Code, Trophy, BookOpen, Zap, ArrowRight, Sparkles, Users, Target } from "lucide-react";

import { FaGithub } from 'react-icons/fa'

// ─── PROJECT DATA ────────────────────────────────────────────────────────────

const MICRO_PROJECTS = [
  {
    name: "Personal Portfolio Website",
    domain: "Web Development",
    tech: ["HTML", "CSS", "JS"],
    description: "Build a stunning portfolio to showcase your skills and projects.",
    difficulty: "Beginner",
    duration: "2-3 weeks",
    skills: ["HTML/CSS", "Responsive Design", "Git"],
  },
  {
    name: "Todo App with Local Storage",
    domain: "Web Development",
    tech: ["HTML", "CSS", "JS"],
    description: "Create a task management app with persistent storage.",
    difficulty: "Beginner",
    duration: "1-2 weeks",
    skills: ["DOM Manipulation", "Local Storage", "Event Handling"],
  },
  {
    name: "Weather App with API",
    domain: "Web Development",
    tech: ["HTML", "CSS", "JS", "API"],
    description: "Fetch real-time weather data and display it beautifully.",
    difficulty: "Intermediate",
    duration: "2-3 weeks",
    skills: ["REST APIs", "Fetch API", "JSON Parsing"],
  },
  {
    name: "Chat Application",
    domain: "Backend Development",
    tech: ["Python", "Flask", "Socket.io"],
    description: "Real-time messaging app using WebSockets.",
    difficulty: "Intermediate",
    duration: "3-4 weeks",
    skills: ["Backend Development", "WebSockets", "Database"],
  },
  {
    name: "Expense Tracker",
    domain: "Full Stack",
    tech: ["React", "Node.js", "MongoDB"],
    description: "Track and visualize your spending patterns.",
    difficulty: "Intermediate",
    duration: "3-4 weeks",
    skills: ["Full Stack", "Database Design", "Charts/Graphs"],
  },
  {
    name: "Image Gallery with Filters",
    domain: "Web Development",
    tech: ["HTML", "CSS", "JS"],
    description: "Create an interactive image gallery with filter options.",
    difficulty: "Beginner",
    duration: "2 weeks",
    skills: ["DOM Manipulation", "CSS Grid", "Event Listeners"],
  },
];

const ITR_PROJECTS = [
  {
    name: "E-Commerce Platform",
    domain: "Full Stack",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    description: "Complete online shopping system with payment integration.",
    difficulty: "Advanced",
    duration: "6-8 weeks",
    skills: ["Full Stack Development", "Payment Integration", "Authentication"],
  },
  {
    name: "Social Media Clone",
    domain: "Full Stack",
    tech: ["React", "Firebase", "Tailwind CSS"],
    description: "Build a social networking platform with real-time features.",
    difficulty: "Advanced",
    duration: "8-10 weeks",
    skills: ["Real-time Database", "Authentication", "File Upload"],
  },
  {
    name: "Learning Management System",
    domain: "Full Stack",
    tech: ["React", "Node.js", "PostgreSQL"],
    description: "Platform for course management, assignments, and grading.",
    difficulty: "Advanced",
    duration: "8-10 weeks",
    skills: ["Database Design", "Role-based Access", "File Management"],
  },
  {
    name: "AI Chatbot Integration",
    domain: "AI/ML",
    tech: ["Python", "Flask", "OpenAI API", "React"],
    description: "Intelligent chatbot using NLP and LLM APIs.",
    difficulty: "Advanced",
    duration: "6-8 weeks",
    skills: ["API Integration", "NLP Basics", "Prompt Engineering"],
  },
  {
    name: "Real Estate Portal",
    domain: "Full Stack",
    tech: ["React", "Node.js", "MongoDB", "Google Maps API"],
    description: "Property listing and search platform with map integration.",
    difficulty: "Advanced",
    duration: "7-9 weeks",
    skills: ["Geolocation", "Advanced Search", "Image Management"],
  },
];

const CAPSTONE_PROJECTS = [
  {
    name: "Smart City IoT Dashboard",
    domain: "IoT & Cloud",
    tech: ["React", "Node.js", "Arduino", "AWS", "MQTT"],
    description: "Real-time monitoring system for smart city infrastructure.",
    difficulty: "Expert",
    duration: "12-16 weeks",
    skills: ["IoT Programming", "Cloud Deployment", "Real-time Data", "System Design"],
  },
  {
    name: "AI-Powered Resume Analyzer",
    domain: "AI/ML",
    tech: ["Python", "TensorFlow", "Flask", "React"],
    description: "ML system to analyze resumes and match job requirements.",
    difficulty: "Expert",
    duration: "10-14 weeks",
    skills: ["Machine Learning", "NLP", "Full Stack", "Model Deployment"],
  },
  {
    name: "Healthcare Management System",
    domain: "Full Stack + Healthcare",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    description: "Complete HIPAA-compliant healthcare platform.",
    difficulty: "Expert",
    duration: "14-18 weeks",
    skills: ["Security", "Database Design", "Compliance", "System Architecture"],
  },
  {
    name: "Blockchain-based Voting System",
    domain: "Blockchain",
    tech: ["Solidity", "Web3.js", "React", "Ethereum"],
    description: "Secure, transparent voting system using blockchain.",
    difficulty: "Expert",
    duration: "12-16 weeks",
    skills: ["Blockchain", "Smart Contracts", "Cryptography", "Web3"],
  },
  {
    name: "Recommendation Engine for E-Learning",
    domain: "AI/ML",
    tech: ["Python", "Scikit-learn", "Flask", "React", "PostgreSQL"],
    description: "Personalized course recommendation using collaborative filtering.",
    difficulty: "Expert",
    duration: "12-14 weeks",
    skills: ["Machine Learning", "Data Science", "Algorithm Design", "Optimization"],
  },
];

const RESOURCES = [
  {
    category: "GitHub Repositories",
    items: [
      { name: "Awesome Project Ideas", url: "https://github.com/florinpop17/app-ideas", desc: "100+ project ideas with difficulty levels" },
      { name: "Build Your Own X", url: "https://github.com/codecrafters-io/build-your-own-x", desc: "Learn by building systems from scratch" },
      { name: "Project Based Learning", url: "https://github.com/practical-tutorials/project-based-learning", desc: "Curated project-based tutorials" },
      { name: "Open Source Projects", url: "https://github.com/topics/beginner-friendly", desc: "Beginner-friendly open source projects" },
    ],
  },
  {
    category: "Development Tools",
    items: [
      { name: "GitHub", url: "https://github.com", desc: "Version control and collaboration" },
      { name: "Vercel", url: "https://vercel.com", desc: "Deploy frontend projects instantly" },
      { name: "Render", url: "https://render.com", desc: "Deploy full-stack applications" },
      { name: "Figma", url: "https://figma.com", desc: "Design and prototype UI/UX" },
    ],
  },
  {
    category: "Learning Platforms",
    items: [
      { name: "Udemy", url: "https://udemy.com", desc: "Project-based courses" },
      { name: "Coursera", url: "https://coursera.org", desc: "University-level courses" },
      { name: "Scrimba", url: "https://scrimba.com", desc: "Interactive coding tutorials" },
      { name: "Dev.to", url: "https://dev.to", desc: "Technical articles and guides" },
    ],
  },
];

const HACKATHONS = [
  {
    name: "Smart India Hackathon (SIH)",
    focus: "Innovation for India",
    prize: "₹1L - ₹50L",
    when: "Bi-annual",
    website: "https://www.sih.gov.in",
  },
  {
    name: "Hacktoberfest",
    focus: "Open Source Contributions",
    prize: "T-shirts & Swag",
    when: "October",
    website: "https://hacktoberfest.com",
  },
  {
    name: "Google Summer of Code",
    focus: "Open Source Development",
    prize: "Stipend + Mentorship",
    when: "Summer",
    website: "https://summerofcode.withgoogle.com",
  },
  {
    name: "MLH Hackathons",
    focus: "Student Hackathons",
    prize: "Varies",
    when: "Year-round",
    website: "https://mlh.io",
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ProjectCard({ project }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)]/40 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <span className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-widest text-[#f0a843] bg-[#f0a84318] px-2 py-1 rounded-full font-bold">
            {project.domain}
          </span>
          <h3 className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[var(--text)] mt-2 group-hover:text-white transition-colors">
            {project.name}
          </h3>
        </div>
        <Code size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-1" strokeWidth={1.5} />
      </div>

      <p className="font-['General_Sans'] text-[0.9rem] text-[var(--text-muted)] mb-3">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map((t) => (
          <span key={t} className="font-['General_Sans'] text-[0.7rem] bg-[#e8453c18] text-[#e8453c] px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2 text-[0.8rem] text-[#888]">
        <span>⏱️ {project.duration}</span>
        <span>•</span>
        <span>📊 {project.difficulty}</span>
      </div>
    </div>
  );
}

function ResourceCard({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)]/40 hover:bg-[var(--surface2)] transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-['Cabinet_Grotesk'] text-[0.95rem] font-semibold text-[var(--text)] group-hover:text-white transition-colors flex-1">
          {item.name}
        </h4>
        <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-0.5" strokeWidth={1.5} />
      </div>
      <p className="font-['General_Sans'] text-[0.85rem] text-[#888]">{item.desc}</p>
    </a>
  );
}

function HackathonCard({ hackathon }) {
  return (
    <a
      href={hackathon.website}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-5 hover:border-[#4d9ef0]/40 hover:bg-[#1a1a1a] transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[#f0ede6] group-hover:text-white transition-colors">
            {hackathon.name}
          </h4>
          <p className="font-['General_Sans'] text-[0.85rem] text-[var(--text-muted)] mt-1">{hackathon.focus}</p>
        </div>
        <Trophy size={20} className="text-[#4d9ef0] flex-shrink-0" strokeWidth={1.5} />
      </div>

      <div className="space-y-1.5 text-[0.85rem] text-[var(--text-muted)]">
        <p>
          <strong className="text-[var(--text)]">Prize:</strong> {hackathon.prize}
        </p>
        <p>
          <strong className="text-[var(--text)]">When:</strong> {hackathon.when}
        </p>
      </div>
    </a>
  );
}

// ─── SKILL MATRIX ────────────────────────────────────────────────────────────

function SkillMatrix() {
  const skills = [
    { name: "Frontend (HTML/CSS/JS)", micro: "✓", itr: "✓", capstone: "✓" },
    { name: "Backend (Node/Python)", micro: "◐", itr: "✓", capstone: "✓" },
    { name: "Database Design", micro: "◐", itr: "✓", capstone: "✓" },
    { name: "APIs & Integration", micro: "◐", itr: "✓", capstone: "✓" },
    { name: "Authentication & Security", micro: "✗", itr: "✓", capstone: "✓" },
    { name: "DevOps & Deployment", micro: "✗", itr: "◐", capstone: "✓" },
    { name: "System Design", micro: "✗", itr: "◐", capstone: "✓" },
    { name: "AI/ML", micro: "✗", itr: "◐", capstone: "✓" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[0.9rem]">
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            <th className="text-left py-3 px-4 font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]">Skill</th>
            <th className="text-center py-3 px-4 font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]">Micro</th>
            <th className="text-center py-3 px-4 font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]">ITR</th>
            <th className="text-center py-3 px-4 font-['Cabinet_Grotesk'] font-semibold text-[#f0ede6]">Capstone</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, i) => (
          <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--surface)] transition-colors">
            <td className="py-3 px-4 font-['General_Sans'] text-[var(--text-muted)]">{skill.name}</td>
              <td className="text-center py-3 px-4 font-['General_Sans'] text-[#4d9ef0]">{skill.micro}</td>
              <td className="text-center py-3 px-4 font-['General_Sans'] text-[#f0a843]">{skill.itr}</td>
              <td className="text-center py-3 px-4 font-['General_Sans'] text-[#e8453c]">{skill.capstone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function InnovationHub() {
  const [activeTab, setActiveTab] = useState("micro");

  const projectsByType = {
    micro: MICRO_PROJECTS,
    itr: ITR_PROJECTS,
    capstone: CAPSTONE_PROJECTS,
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-6xl mx-auto px-6 py-20 pb-32">

        {/* Header */}
        <div className="mb-16">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#e8453c] mb-3 font-bold">
            Build. Learn. Innovate.
          </p>
          <h1 className="font-['Clash_Display'] text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#f0ede6] leading-tight mb-4">
            Innovation Hub
          </h1>
          <p className="font-['General_Sans'] text-[1rem] text-[#888] max-w-[700px] leading-relaxed">
            Your complete guide to project-based learning. From Micro-projects to Capstone, explore ideas, learn skills, and compete in hackathons. Everything you need to transform ideas into impact.
          </p>
        </div>

        {/* Project Types Tabs */}
        <div className="mb-12 flex gap-3 border-b border-[#2a2a2a] pb-6">
          {[
            { id: "micro", label: "Micro-Projects", icon: "💡" },
            { id: "itr", label: "ITR Projects", icon: "🚀" },
            { id: "capstone", label: "Capstone", icon: "🏆" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-['Cabinet_Grotesk'] text-[0.95rem] font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Project Description */}
        <div className="mb-10 bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Lightbulb size={24} className="text-[#e8453c] flex-shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <h3 className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[var(--text)] mb-2">
                {activeTab === "micro" && "Micro-Projects (Semester 1-4)"}
                {activeTab === "itr" && "ITR Projects (Semester 5)"}
                {activeTab === "capstone" && "Capstone Projects (Semester 6)"}
              </h3>
              <p className="font-['General_Sans'] text-[0.9rem] text-[var(--text-muted)]">
                {activeTab === "micro" && "Small, focused projects to build fundamentals. Perfect for beginners to practice core concepts and build confidence."}
                {activeTab === "itr" && "Intermediate-to-advanced projects. Combine multiple technologies and demonstrate industry-ready skills."}
                {activeTab === "capstone" && "Your magnum opus. Complex, full-featured systems that showcase mastery and innovation. Perfect for portfolios and interviews."}
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {projectsByType[activeTab].map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>

        {/* Hackathon Section */}
        <div className="mb-16">
          <div className="mb-8">
            <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#4d9ef0] mb-3 font-bold">
              Compete & Win
            </p>
            <h2 className="font-['Clash_Display'] text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-[#f0ede6] mb-4">
              Hackathons & Competitions
            </h2>
            <p className="font-['General_Sans'] text-[0.95rem] text-[#888] max-w-[600px]">
              Turn your projects into winning hackathon entries. Participate in competitions, win prizes, and build your professional network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {HACKATHONS.map((hackathon, i) => (
              <HackathonCard key={i} hackathon={hackathon} />
            ))}
          </div>

          {/* Hackathon Tips */}
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[#f0ede6] mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-[#4d9ef0]" strokeWidth={1.5} />
              How to Win Hackathons
            </h3>
            <ul className="space-y-3 font-['General_Sans'] text-[0.9rem] text-[#888]">
              <li>
                <strong className="text-[#f0ede6]">Pick the Right Problem:</strong> Choose challenges aligned with your skills and interests.
              </li>
              <li>
                <strong className="text-[#f0ede6]">Build MVP First:</strong> Focus on a working prototype, not perfection. Demo {">"} Polish.
              </li>
              <li>
                <strong className="text-[#f0ede6]">Tell Your Story:</strong> Great pitching matters. Explain the problem, solution, and impact.
              </li>
              <li>
                <strong className="text-[#f0ede6]">Use Your Micro/ITR Projects:</strong> Leverage existing code and ideas to save time.
              </li>
              <li>
                <strong className="text-[#f0ede6]">Collaborate & Network:</strong> Team up with diverse skills. Meet judges and mentors.
              </li>
            </ul>
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="mb-16">
          <div className="mb-8">
            <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#f0a843] mb-3 font-bold">
              Learning Path
            </p>
            <h2 className="font-['Clash_Display'] text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-[#f0ede6] mb-4">
              Skill Requirements by Project Type
            </h2>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 overflow-x-auto">
            <SkillMatrix />
            <p className="font-['General_Sans'] text-[0.8rem] text-[var(--text-muted)] mt-4">
              ✓ = Required | ◐ = Helpful | ✗ = Not needed
            </p>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <div className="mb-8">
            <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#c8f04d] mb-3 font-bold">
              Tools & References
            </p>
            <h2 className="font-['Clash_Display'] text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-[#f0ede6] mb-4">
              Helpful Resources & Repos
            </h2>
          </div>

          {RESOURCES.map((resourceGroup, i) => (
            <div key={i} className="mb-10">
              <h3 className="font-['Cabinet_Grotesk'] text-[1.1rem] font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                <FaGithub size={20} className="text-[#c8f04d]" strokeWidth={1.5} />
                {resourceGroup.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourceGroup.items.map((item, j) => (
                  <ResourceCard key={j} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#e8453c]/10 to-[#4d9ef0]/10 border border-[var(--border)] rounded-lg p-8 text-center">
          <h3 className="font-['Cabinet_Grotesk'] text-[1.3rem] font-semibold text-[var(--text)] mb-3">
            Ready to Build Something Amazing?
          </h3>
          <p className="font-['General_Sans'] text-[0.95rem] text-[var(--text-muted)] mb-6 max-w-[500px] mx-auto">
            Pick a project, start coding, and share your progress with the community. Every expert was once a beginner.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#e8453c] text-white font-['Cabinet_Grotesk'] font-semibold px-6 py-3 rounded-lg hover:bg-[#d63a2d] transition-colors"
          >
            Start on GitHub <ArrowRight size={18} strokeWidth={1.5} />
          </a>
        </div>

      </div>
    </div>
  );
}
