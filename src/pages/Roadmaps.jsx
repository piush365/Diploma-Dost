import { useState, useEffect } from "react";
import { ROADMAPS } from "../data/roadmaps";
import { ChevronRight, X, BookOpen, Play, Code, CheckCircle, GitBranch, Flag } from "lucide-react";

const BRANCHES = ["CS", "IT", "Mech", "Civil", "Elec", "ETC"];

const PHASE_STYLES = {
  Foundation: { dot: "bg-[#e8453c]", text: "text-[#e8453c]", border: "border-[#e8453c]/30", bg: "bg-[#e8453c]/5" },
  Core:       { dot: "bg-[#c8f04d]", text: "text-[#c8f04d]", border: "border-[#c8f04d]/30", bg: "bg-[#c8f04d]/5" },
  Advanced:   { dot: "bg-[#4d9ef0]", text: "text-[#4d9ef0]", border: "border-[#4d9ef0]/30", bg: "bg-[#4d9ef0]/5" },
  Career:     { dot: "bg-[#b87aff]", text: "text-[#b87aff]", border: "border-[#b87aff]/30", bg: "bg-[#b87aff]/5" },
};

const NODE_STYLES = {
  core:      "border-[#2a2a2a] hover:border-[#e8453c]/40",
  branch:    "border-[#2a2a2a] border-dashed hover:border-[#3a3a3a]",
  optional:  "border-[#2a2a2a] border-dashed opacity-75 hover:border-[#3a3a3a]",
  milestone: "border-[#e8453c]/40 hover:border-[#e8453c]/70 ring-1 ring-[#e8453c]/20",
};

const RESOURCE_ICONS = {
  yt:       { label: "YouTube", color: "text-[#e8453c]", bg: "bg-[#e8453c]/10", icon: Play },
  doc:      { label: "Docs",    color: "text-[#4d9ef0]", bg: "bg-[#4d9ef0]/10", icon: BookOpen },
  practice: { label: "Practice", color: "text-[#c8f04d]", bg: "bg-[#c8f04d]/10", icon: Code },
};

function ResourceIcon({ type }) {
  const config = RESOURCE_ICONS[type];
  const Icon = config?.icon;
  if (!Icon) return null;
  return <Icon size={14} strokeWidth={2} />;
}

function NodeDrawer({ node, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!node) return null;
  const phase = PHASE_STYLES[node.phase] || PHASE_STYLES.Foundation;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full md:max-w-[500px] bg-[#141414] border-l border-[#2a2a2a] z-50 overflow-y-auto">
        <div className="sticky top-0 bg-[#141414] border-b border-[#2a2a2a] px-6 py-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className={`font-['JetBrains_Mono'] text-[0.65rem] tracking-widest uppercase mb-2 font-bold ${phase.text}`}>
              {node.phase} · {node.time}
            </div>
            <h2 className="font-['Clash_Display'] text-[1.5rem] font-semibold text-[#f0ede6] leading-tight break-words">
              {node.label}
            </h2>
          </div>
          <button onClick={onClose} className="mt-1 text-[#888] hover:text-[#f0ede6] transition-colors flex-shrink-0">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div>
            <div className="font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.12em] uppercase text-[#888] mb-2 font-bold">
              Overview
            </div>
            <p className="font-['General_Sans'] text-[0.95rem] text-[#f0ede6] leading-relaxed">
              {node.description}
            </p>
          </div>

          <div className={`rounded-lg border px-4 py-3 ${phase.border} ${phase.bg}`}>
            <div className={`font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.12em] uppercase mb-2 font-bold ${phase.text}`}>
              Why This Matters
            </div>
            <p className="font-['General_Sans'] text-[0.9rem] text-[#f0ede6] leading-relaxed">
              {node.why}
            </p>
          </div>

          <div>
            <div className="font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.12em] uppercase text-[#888] mb-3 font-bold">
              Learning Resources
            </div>
            <div className="space-y-2">
              {node.resources.map((r, i) => {
                const style = RESOURCE_ICONS[r.type] || RESOURCE_ICONS.doc;
                return (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e8453c]/40 hover:bg-[#1a1a1a] transition-all group"
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${style.bg} ${style.color}`}>
                      <ResourceIcon type={r.type} />
                    </span>
                    <span className="font-['General_Sans'] text-[0.9rem] font-medium text-[#f0ede6] flex-1 leading-snug">
                      {r.label}
                    </span>
                    <ChevronRight size={14} strokeWidth={2} className="text-[#555] group-hover:text-[#e8453c] transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {node.type === "branch" && (
            <div className="rounded-lg border border-[#2a2a2a] border-dashed px-4 py-3 bg-[#1a1a1a]">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch size={14} className="text-[#888]" strokeWidth={1.5} />
                <div className="font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.12em] uppercase text-[#888] font-bold">
                  Fork Point
                </div>
              </div>
              <p className="font-['General_Sans'] text-[0.85rem] text-[#888]">
                This is a branching point — you can take multiple paths from here. You don't have to choose just one.
              </p>
            </div>
          )}
          {node.type === "milestone" && (
            <div className="rounded-lg border border-[#e8453c]/30 bg-[#e8453c]/5 px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <Flag size={14} className="text-[#e8453c]" strokeWidth={1.5} />
                <div className="font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.12em] uppercase text-[#e8453c] font-bold">
                  Milestone
                </div>
              </div>
              <p className="font-['General_Sans'] text-[0.85rem] text-[#888]">
                This is a checkpoint — completing this signals you're ready for the next phase.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function RoadmapNode({ node, onClick, isLast }) {
  const phase = PHASE_STYLES[node.phase] || PHASE_STYLES.Foundation;
  const nodeStyle = NODE_STYLES[node.type] || NODE_STYLES.core;
  const isMilestone = node.type === "milestone";
  const isBranch = node.type === "branch";

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={() => onClick(node)}
        className={`w-full max-w-[440px] text-left rounded-lg border bg-[#141414] p-4 transition-all duration-150 group relative ${nodeStyle}`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`font-['JetBrains_Mono'] text-[0.7rem] tracking-[0.1em] uppercase font-bold ${phase.text}`}>
            {node.phase}
          </span>
          <span className="font-['JetBrains_Mono'] text-[0.7rem] text-[#555]">{node.time}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {isMilestone && (
            <Flag size={14} className="text-[#e8453c] flex-shrink-0" strokeWidth={2} />
          )}
          {isBranch && (
            <GitBranch size={14} className="text-[#888] flex-shrink-0" strokeWidth={1.5} />
          )}
          <span className="font-['Cabinet_Grotesk'] text-[1rem] font-semibold text-[#f0ede6] group-hover:text-white transition-colors">
            {node.label}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4">
          {["yt","doc","practice"].map(type => {
            const count = node.resources.filter(r => r.type === type).length;
            if (!count) return null;
            const s = RESOURCE_ICONS[type];
            return (
              <span key={type} className={`font-['General_Sans'] text-[0.75rem] font-medium ${s.color} opacity-70 flex items-center gap-1`}>
                <ResourceIcon type={type} />
                {count} {s.label}
              </span>
            );
          })}
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] group-hover:text-[#e8453c] transition-colors">
          <ChevronRight size={16} strokeWidth={2} />
        </div>
      </button>

      {!isLast && <div className="w-px h-8 bg-gradient-to-b from-[#2a2a2a] to-transparent" />}
    </div>
  );
}

export default function Roadmaps() {
  const [activeBranch, setActiveBranch] = useState("CS");
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);

  const branchData = ROADMAPS[activeBranch];
  const tracks = branchData?.tracks || [];
  const currentTrack = tracks[activeTrackIdx];
  const nodes = currentTrack?.nodes || [];

  const handleBranchChange = (b) => {
    setActiveBranch(b);
    setActiveTrackIdx(0);
    setSelectedNode(null);
  };

  return (
    <div className="min-h-screen bg-[#0d0e0f] text-[#f0ede6]">
      <div className="max-w-6xl mx-auto px-6 py-20 pb-32">

        {/* Header */}
        <div className="mb-16">
          <p className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#e8453c] mb-3 font-bold">
            Career Paths
          </p>
          <h1 className="font-['Clash_Display'] text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#f0ede6] leading-tight mb-4">
            Roadmaps
          </h1>
          <p className="font-['General_Sans'] text-[1rem] text-[#888] max-w-[600px] leading-relaxed">
            Click any block to see what to learn, why it matters, and exactly where to learn it. Choose your branch and career path to get started.
          </p>
        </div>

        {/* Branch Tabs */}
        <div className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide border-b border-[#2a2a2a] mb-10 pb-6">
          {BRANCHES.map((b) => (
            <button
              key={b}
              onClick={() => handleBranchChange(b)}
              className={`font-['Cabinet_Grotesk'] text-[0.9rem] font-semibold px-4 py-2.5 rounded-lg border transition-all duration-150
                ${activeBranch === b 
                  ? "border-[#e8453c] bg-[#e8453c]/5 text-[#f0ede6]" 
                  : "border-[#2a2a2a] bg-transparent text-[#888] hover:border-[#3a3a3a] hover:text-[#f0ede6]"}`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Coming Soon */}
        {branchData?.comingSoon ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.14em] text-[#555] font-bold">
              Coming Soon
            </div>
            <h2 className="font-['Clash_Display'] text-[2rem] font-semibold text-[#333]">
              {branchData.title} Roadmap
            </h2>
            <p className="font-['General_Sans'] text-[0.95rem] text-[#555] text-center max-w-[400px] leading-relaxed">
              We're building detailed roadmaps for all branches. CS and IT are live — others coming soon.
            </p>
          </div>
        ) : (
          <>
            <p className="font-['General_Sans'] text-[0.95rem] text-[#888] mb-8 max-w-[700px] leading-relaxed">
              {branchData.description}
            </p>

            {/* Track Selector */}
            <div className="flex gap-3 flex-wrap mb-12">
              {tracks.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveTrackIdx(i); setSelectedNode(null); }}
                  className={`flex flex-col items-start gap-1 px-4 py-3 rounded-lg border text-left transition-all
                    ${activeTrackIdx === i
                      ? "border-[#e8453c] bg-[#e8453c]/5"
                      : "border-[#2a2a2a] bg-[#141414] hover:border-[#3a3a3a]"}`}
                >
                  <span className={`font-['Cabinet_Grotesk'] text-[0.95rem] font-semibold ${activeTrackIdx === i ? "text-[#e8453c]" : "text-[#f0ede6]"}`}>
                    {t.name}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[0.65rem] tracking-widest uppercase text-[#555] font-bold">
                    {t.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Layout */}
            <div className="flex gap-12 items-start">

              {/* Roadmap column */}
              <div className="flex-1 min-w-0">
                {/* Phase legend */}
                <div className="flex items-center gap-6 mb-10 px-4 py-3 bg-[#141414] border border-[#2a2a2a] rounded-lg overflow-x-auto scrollbar-hide whitespace-nowrap">
                  {Object.entries(PHASE_STYLES).map(([phase, s], i) => (
                    <div key={phase} className="flex items-center gap-2 flex-shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                      <span className={`font-['JetBrains_Mono'] text-[0.7rem] tracking-wide font-bold ${s.text}`}>
                        {phase}
                      </span>
                      {i < 3 && <div className="w-6 h-px bg-[#2a2a2a] ml-2" />}
                    </div>
                  ))}
                </div>

                {/* Nodes */}
                <div className="flex flex-col items-center">
                  {nodes.map((node, i) => (
                    <RoadmapNode
                      key={node.id}
                      node={node}
                      onClick={setSelectedNode}
                      isLast={i === nodes.length - 1}
                    />
                  ))}
                  {/* End */}
                  <div className="w-px h-10 bg-gradient-to-b from-[#2a2a2a] to-transparent" />
                  <div className="w-4 h-4 rounded-full bg-[#b87aff] ring-4 ring-[#b87aff]/20" />
                  <div className="font-['JetBrains_Mono'] text-[0.7rem] tracking-widest uppercase text-[#888] mt-4 font-bold">
                    Job Ready 🚀
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-[200px] flex-shrink-0 sticky top-8 hidden lg:block">
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-lg p-4">
                  <div className="font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.12em] text-[#888] mb-3 font-bold">
                    Track Info
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="font-['General_Sans'] text-[0.75rem] text-[#555] mb-1">
                        Stages
                      </div>
                      <div className="font-['Clash_Display'] text-[1.5rem] font-bold text-[#f0ede6]">
                        {nodes.length}
                      </div>
                    </div>
                    <div className="border-t border-[#2a2a2a] pt-3">
                      <div className="font-['General_Sans'] text-[0.75rem] text-[#555] mb-1">
                        Est. Duration
                      </div>
                      <div className="font-['General_Sans'] text-[0.9rem] text-[#f0ede6]">
                        {currentTrack?.duration || "Self-paced"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Node Drawer */}
      <NodeDrawer node={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
