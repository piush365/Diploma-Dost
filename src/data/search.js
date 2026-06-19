import { ROADMAPS } from './roadmaps'
import { supabase } from '../lib/supabase'

const groupOrder = [
  'Resources',
  'Internships',
  'YouTube',
  'Roadmaps',
  'DSA',
  'Innovation Hub',
  'Scholarships',
  'Placement',
  'Open Source',
  'Community',
]

const normalize = value =>
  String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const tokenize = value => normalize(value).split(' ').filter(Boolean)

const item = ({ id, title, description, category, keywords = [], route, sourceSection }) => ({
  id,
  title,
  description,
  category,
  keywords,
  route,
  sourceSection,
})

const roadmapItems = Object.entries(ROADMAPS).flatMap(([branch, branchData]) =>
  (branchData.tracks || []).flatMap(track =>
    (track.nodes || []).flatMap(node => {
      const baseKeywords = [
        branch,
        branchData.title,
        track.name,
        track.tag,
        node.phase,
        node.label,
        ...(node.resources || []).map(resource => resource.label),
      ]

      return [
        item({
          id: `roadmap-${node.id}`,
          title: node.label,
          description: node.description,
          category: 'Roadmap',
          keywords: baseKeywords,
          route: `/roadmaps#${node.id}`,
          sourceSection: 'Roadmaps',
        }),
        ...(node.resources || []).map((resource, index) =>
          item({
            id: `roadmap-${node.id}-resource-${index}`,
            title: resource.label,
            description: `Learning resource for ${node.label} in the ${track.name} roadmap.`,
            category: resource.type === 'yt' ? 'YouTube' : 'Resource',
            keywords: [...baseKeywords, resource.type, 'course', 'tutorial', 'practice'],
            route: `/roadmaps#${node.id}`,
            sourceSection: resource.type === 'yt' ? 'YouTube' : 'Roadmaps',
          })
        ),
      ]
    })
  )
)

const curatedItems = [
  item({
    id: 'resources-k-scheme-notes',
    title: 'K-Scheme Notes',
    description: 'MSBTE K-Scheme study notes for diploma subjects.',
    category: 'Notes',
    keywords: ['k scheme', 'kscheme', 'notes', 'msbte', 'subjects', 'study material'],
    route: '/resources',
    sourceSection: 'Resources',
  }),
  item({
    id: 'resources-k-scheme-pyqs',
    title: 'K-Scheme PYQs',
    description: 'Previous year question papers and model answers for K-Scheme subjects.',
    category: 'PYQ',
    keywords: ['k scheme', 'kscheme', 'pyq', 'pyqs', 'previous year questions', 'model answer', 'msbte'],
    route: '/resources',
    sourceSection: 'Resources',
  }),
  item({
    id: 'resources-k-scheme-subjects',
    title: 'K-Scheme Subjects',
    description: 'Branch and semester-wise subjects with notes, PYQs, and answers.',
    category: 'Subject',
    keywords: ['k scheme', 'subjects', 'semester', 'branch', 'cs', 'it', 'mechanical', 'civil'],
    route: '/resources',
    sourceSection: 'Resources',
  }),
  item({
    id: 'resources-java-notes',
    title: 'Java Notes',
    description: 'Java programming notes and resources for diploma students.',
    category: 'Notes',
    keywords: ['java', 'notes', 'programming', 'oop', 'collections'],
    route: '/resources',
    sourceSection: 'Resources',
  }),
  item({
    id: 'internship-unstop-platform',
    title: 'Unstop Internship Platform',
    description: 'Find internships, student opportunities, and career challenges on Unstop.',
    category: 'Internship',
    keywords: ['unstop', 'internship', 'internships', 'jobs', 'opportunities'],
    route: '/internships#platforms',
    sourceSection: 'Internships',
  }),
  item({
    id: 'internship-unstop-hackathon',
    title: 'Unstop Hackathons',
    description: 'Discover hackathons and competitions through Unstop.',
    category: 'Internship',
    keywords: ['unstop', 'hackathon', 'hackathons', 'competition', 'competitions'],
    route: '/internships#platforms',
    sourceSection: 'Internships',
  }),
  item({
    id: 'internship-unstop-opportunity',
    title: 'Unstop Student Opportunities',
    description: 'Explore competitions, coding challenges, internships, and student programs.',
    category: 'Opportunity',
    keywords: ['unstop', 'opportunity', 'opportunities', 'coding challenge', 'career'],
    route: '/internships#platforms',
    sourceSection: 'Internships',
  }),
  item({
    id: 'internship-msbte',
    title: 'MSBTE K-Scheme Mandatory Internship',
    description: 'Six-week mandatory internship requirement for MSBTE diploma students.',
    category: 'Internship',
    keywords: ['msbte', 'k scheme', 'internship', 'mandatory', 'summer break', 'credits'],
    route: '/internships#msbte-internship',
    sourceSection: 'Internships',
  }),
  item({
    id: 'youtube-java-playlist',
    title: 'Java Playlist',
    description: 'Curated YouTube playlists for learning Java and programming subjects.',
    category: 'YouTube',
    keywords: ['java', 'youtube', 'playlist', 'video', 'course'],
    route: '/youtube',
    sourceSection: 'YouTube',
  }),
  item({
    id: 'youtube-dsa-playlist',
    title: 'DSA Playlist',
    description: 'Curated DSA and competitive programming video playlists.',
    category: 'YouTube',
    keywords: ['dsa', 'data structures', 'algorithms', 'youtube', 'playlist', 'striver'],
    route: '/youtube',
    sourceSection: 'YouTube',
  }),
  item({
    id: 'dsa-sheet',
    title: "Striver's DSA Sheet",
    description: 'A structured DSA problem sheet and roadmap for interview preparation.',
    category: 'DSA',
    keywords: ['dsa', 'sheet', 'striver', 'sde sheet', 'problems', 'interview'],
    route: '/dsa#strivers-sheet',
    sourceSection: 'DSA',
  }),
  item({
    id: 'dsa-java-resources',
    title: 'Java for DSA',
    description: 'Java language resources for data structures and algorithms.',
    category: 'DSA',
    keywords: ['java', 'dsa', 'collections', 'algorithms', 'interview questions'],
    route: '/dsa#language-choice',
    sourceSection: 'DSA',
  }),
  item({
    id: 'dsa-notes',
    title: 'DSA Notes',
    description: 'MSBTE DSA topics, interview topics, and practice guidance.',
    category: 'DSA',
    keywords: ['dsa', 'notes', 'arrays', 'strings', 'trees', 'graphs', 'dynamic programming'],
    route: '/dsa',
    sourceSection: 'DSA',
  }),
  item({
    id: 'innovation-projects',
    title: 'Innovation Hub Projects',
    description: 'Micro-project, ITR, and capstone project ideas for diploma students.',
    category: 'Project',
    keywords: ['innovation', 'projects', 'micro project', 'itr', 'capstone', 'portfolio'],
    route: '/innovation-hub',
    sourceSection: 'Innovation Hub',
  }),
  item({
    id: 'innovation-hackathons',
    title: 'Hackathons & Competitions',
    description: 'Smart India Hackathon, Hacktoberfest, GSoC, MLH, and competition guidance.',
    category: 'Hackathon',
    keywords: ['hackathon', 'hackathons', 'competition', 'sih', 'gsoc', 'hacktoberfest', 'mlh'],
    route: '/innovation-hub',
    sourceSection: 'Innovation Hub',
  }),
  item({
    id: 'scholarships-mahadbt',
    title: 'MahaDBT Scholarship Guide',
    description: 'Scholarship eligibility, documents, and application steps for diploma students.',
    category: 'Scholarship',
    keywords: ['scholarship', 'scholarships', 'mahadbt', 'sc', 'st', 'obc', 'ebc', 'minority'],
    route: '/scholarships',
    sourceSection: 'Scholarships',
  }),
  item({
    id: 'placement-java-interview',
    title: 'Java Interview Questions',
    description: 'Placement preparation for Java, projects, aptitude, and technical interviews.',
    category: 'Placement',
    keywords: ['java', 'interview questions', 'placement', 'placements', 'technical round'],
    route: '/placement',
    sourceSection: 'Placement',
  }),
  item({
    id: 'placement-dsa-prep',
    title: 'Placement DSA Preparation',
    description: 'DSA, aptitude, resume, and interview checklist for placements.',
    category: 'Placement',
    keywords: ['placement', 'dsa', 'aptitude', 'resume', 'interview', 'jobs'],
    route: '/placement',
    sourceSection: 'Placement',
  }),
  item({
    id: 'open-source-gsoc',
    title: 'Google Summer of Code',
    description: 'Open source paid internship opportunity through GSoC.',
    category: 'Open Source',
    keywords: ['open source', 'gsoc', 'google summer of code', 'internship', 'github'],
    route: '/opensource',
    sourceSection: 'Open Source',
  }),
  item({
    id: 'open-source-github',
    title: 'GitHub Contribution Guide',
    description: 'Learn Git, GitHub, pull requests, and open source contribution workflow.',
    category: 'Open Source',
    keywords: ['open source', 'github', 'git', 'pull request', 'contribution', 'portfolio'],
    route: '/opensource',
    sourceSection: 'Open Source',
  }),
]

export const searchIndex = [...curatedItems, ...roadmapItems]

function scoreItem(item, query) {
  const normalizedQuery = normalize(query)
  const queryTokens = tokenize(query)
  const title = normalize(item.title)
  const description = normalize(item.description)
  const keywords = item.keywords.map(normalize)

  if (!normalizedQuery) return 0

  let score = 0

  if (title === normalizedQuery) score += 100
  if (title.includes(normalizedQuery)) score += 60
  if (keywords.includes(normalizedQuery)) score += 45
  if (keywords.some(keyword => keyword.includes(normalizedQuery))) score += 30
  if (description.includes(normalizedQuery)) score += 15

  queryTokens.forEach(token => {
    if (title.split(' ').includes(token)) score += 12
    if (keywords.some(keyword => keyword.split(' ').includes(token))) score += 10
    if (title.includes(token)) score += 6
    if (description.includes(token)) score += 3
  })

  return score
}

// Get JS search results (existing functionality)
export function getJsSearchResults(query, limit = 18) {
  return searchIndex
    .map(searchItem => ({ ...searchItem, score: scoreItem(searchItem, query) }))
    .filter(searchItem => searchItem.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}

// Get Supabase search results
async function getSupabaseSearchResults(query) {
  const results = []
  const searchTerm = `%${query}%`

  // Search resources table
  try {
    const { data: resources } = await supabase
      .from('resources')
      .select('*')
      .or(`subject_name.ilike.${searchTerm},course_code.ilike.${searchTerm},type.ilike.${searchTerm},session.ilike.${searchTerm},branch.ilike.${searchTerm}`)
      .limit(10)

    if (resources) {
      resources.forEach((res, index) => {
        results.push(item({
          id: `resource-${res.id}`,
          title: res.subject_name,
          description: `${res.course_code} · ${res.type} · Sem ${res.semester} · ${res.branch} · ${res.session}`,
          category: res.type,
          keywords: [res.subject_name, res.course_code, res.type, res.session, res.branch, res.semester],
          route: '/resources',
          sourceSection: 'Resources'
        }))
      })
    }
  } catch (e) {
    console.error('Error searching resources:', e)
  }

  // Search playlists table
  try {
    const { data: playlists } = await supabase
      .from('playlists')
      .select('*')
      .or(`subject.ilike.${searchTerm},channel_name.ilike.${searchTerm},branch.ilike.${searchTerm}`)
      .limit(10)

    if (playlists) {
      playlists.forEach((pl, index) => {
        results.push(item({
          id: `playlist-${pl.id}`,
          title: pl.subject,
          description: `${pl.channel_name} · ${pl.branch} · Sem ${pl.semester}`,
          category: 'YouTube',
          keywords: [pl.subject, pl.channel_name, pl.branch, pl.semester],
          route: '/youtube',
          sourceSection: 'YouTube'
        }))
      })
    }
  } catch (e) {
    console.error('Error searching playlists:', e)
  }

  // Search cutoffs table
  try {
    const { data: cutoffs } = await supabase
      .from('cutoffs')
      .select('*')
      .or(`college_name.ilike.${searchTerm},course_name.ilike.${searchTerm},district.ilike.${searchTerm}`)
      .limit(10)

    if (cutoffs) {
      const seen = new Set()
      cutoffs.forEach((co, index) => {
        const key = `${co.college_code}-${co.course_name}`
        if (!seen.has(key)) {
          seen.add(key)
          results.push(item({
            id: `cutoff-${co.college_code}-${co.course_name}`,
            title: co.college_name,
            description: `${co.course_name} · ${co.district} · Cutoff: ${co.cutoff_percent?.toFixed(2)}%`,
            category: 'College',
            keywords: [co.college_name, co.course_name, co.district, co.college_code],
            route: '/predictor',
            sourceSection: 'Resources'
          }))
        }
      })
    }
  } catch (e) {
    console.error('Error searching cutoffs:', e)
  }

  return results
}

// Hybrid search: get both JS and Supabase results, merge, deduplicate, sort
export async function getHybridSearchResults(query, limit = 18) {
  if (!query.trim()) return []

  const [jsResults, supabaseResults] = await Promise.all([
    getJsSearchResults(query, limit),
    getSupabaseSearchResults(query)
  ])

  // Deduplicate by id
  const seen = new Set()
  const merged = []

  // Add Supabase results first (they're fresh from DB)
  for (const item of supabaseResults) {
    if (!seen.has(item.id)) {
      seen.add(item.id)
      merged.push({ ...item, score: 50 }) // Give Supabase results a base score
    }
  }

  // Add JS results
  for (const item of jsResults) {
    if (!seen.has(item.id)) {
      seen.add(item.id)
      merged.push(item)
    }
  }

  // Sort by score descending, then title ascending
  merged.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))

  return merged.slice(0, limit)
}

export function groupSearchResults(results) {
  return groupOrder
    .map(group => ({
      group,
      items: results.filter(result => result.sourceSection === group),
    }))
    .filter(section => section.items.length > 0)
}
