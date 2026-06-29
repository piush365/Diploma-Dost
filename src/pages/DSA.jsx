import {
  ArrowRight, ExternalLink, BookOpen, Code, Trophy, Zap, Users, Target, Lightbulb, CheckCircle, Star,
  TrendingUp, Layers, MessageSquare
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'

const LANGUAGES = [
  {
    name: 'C++',
    emoji: '⚡',
    pros: [
      'Fastest execution (competitive programming gold standard)',
      'Built-in STL (vectors, maps, sets, queues)',
      'Memory control — understand how things work',
      'Used in MSBTE curriculum',
      'Top choice for FAANG interviews'
    ],
    cons: [
      'Steeper learning curve',
      'Manual memory management',
      'Syntax can be complex'
    ],
    recommended: true
  },
  {
    name: 'Java',
    emoji: '☕',
    pros: [
      'Cleaner syntax than C++',
      'Strong OOP principles',
      'Garbage collection (less memory headaches)',
      'Widely used in industry',
      'Great for building scalable systems'
    ],
    cons: [
      'Slightly slower than C++',
      'More verbose',
      'Larger memory footprint'
    ],
    recommended: true
  },
]

const MSBTE_TOPICS = [
  {
    title: 'Arrays & Strings',
    problems: [
      {
        name: 'Two Sum',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/two-sum/',
      },
      {
        name: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      },
      {
        name: 'Contains Duplicate',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/contains-duplicate/',
      },
      {
        name: 'Valid Anagram',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/valid-anagram/',
      },
      {
        name: 'Product of Array Except Self',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/product-of-array-except-self/',
      },
      {
        name: 'Maximum Subarray',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/maximum-subarray/',
      },
      {
        name: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      },
      {
        name: '3Sum',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/3sum/',
      },
    ],
  },

  {
    title: 'Linked Lists',
    problems: [
      {
        name: 'Reverse Linked List',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/reverse-linked-list/',
      },
      {
        name: 'Merge Two Sorted Lists',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      },
      {
        name: 'Middle of the Linked List',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/middle-of-the-linked-list/',
      },
      {
        name: 'Linked List Cycle',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/linked-list-cycle/',
      },
      {
        name: 'Remove Nth Node From End',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
      },
      {
        name: 'Add Two Numbers',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/add-two-numbers/',
      },
      {
        name: 'Reorder List',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/reorder-list/',
      },
      {
        name: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      },
    ],
  },

  {
    title: 'Stacks & Queues',
    problems: [
      {
        name: 'Valid Parentheses',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/valid-parentheses/',
      },
      {
        name: 'Implement Queue using Stacks',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/implement-queue-using-stacks/',
      },
      {
        name: 'Implement Stack using Queues',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/implement-stack-using-queues/',
      },
      {
        name: 'Min Stack',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/min-stack/',
      },
      {
        name: 'Daily Temperatures',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/daily-temperatures/',
      },
      {
        name: 'Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
      },
      {
        name: 'Sliding Window Maximum',
        difficulty: 'Hard',
        link: 'https://leetcode.com/problems/sliding-window-maximum/',
      },
    ],
  },

  {
    title: 'Trees & Graphs',
    problems: [
      {
        name: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      },
      {
        name: 'Invert Binary Tree',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/invert-binary-tree/',
      },
      {
        name: 'Same Tree',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/same-tree/',
      },
      {
        name: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      },
      {
        name: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      },
      {
        name: 'Number of Islands',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/number-of-islands/',
      },
      {
        name: 'Clone Graph',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/clone-graph/',
      },
      {
        name: 'Lowest Common Ancestor of BST',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
      },
    ],
  },

  {
    title: 'Sorting Algorithms',
    problems: [
      {
        name: 'Sort Colors',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/sort-colors/',
      },
      {
        name: 'Merge Intervals',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/merge-intervals/',
      },
      {
        name: 'Merge Sorted Array',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/merge-sorted-array/',
      },
      {
        name: 'Largest Number',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/largest-number/',
      },
    ],
  },

  {
    title: 'Searching Algorithms',
    problems: [
      {
        name: 'Binary Search',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/binary-search/',
      },
      {
        name: 'Search Insert Position',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/search-insert-position/',
      },
      {
        name: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      },
      {
        name: 'Find Peak Element',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/find-peak-element/',
      },
    ],
  },

  {
    title: 'Recursion & Backtracking',
    problems: [
      {
        name: 'Subsets',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/subsets/',
      },
      {
        name: 'Permutations',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/permutations/',
      },
      {
        name: 'Combination Sum',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/combination-sum/',
      },
      {
        name: 'Generate Parentheses',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/generate-parentheses/',
      },
      {
        name: 'Word Search',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/word-search/',
      },
      {
        name: 'N-Queens',
        difficulty: 'Hard',
        link: 'https://leetcode.com/problems/n-queens/',
      },
    ],
  },

  {
    title: 'Dynamic Programming (Intro)',
    problems: [
      {
        name: 'Climbing Stairs',
        difficulty: 'Easy',
        link: 'https://leetcode.com/problems/climbing-stairs/',
      },
      {
        name: 'House Robber',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/house-robber/',
      },
      {
        name: 'Coin Change',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/coin-change/',
      },
      {
        name: 'Longest Increasing Subsequence',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      },
      {
        name: 'Longest Common Subsequence',
        difficulty: 'Medium',
        link: 'https://leetcode.com/problems/longest-common-subsequence/',
      },
      {
        name: 'Edit Distance',
        difficulty: 'Hard',
        link: 'https://leetcode.com/problems/edit-distance/',
      },
    ],
  },
];

const BEYOND_TOPICS = [
  'Advanced DP',
  'Greedy Algorithms',
  'Bit Manipulation',
  'Segment Trees',
  'Fenwick Trees',
  'Graph Algorithms (DFS, BFS, Dijkstra)',
  'Hash Maps & Sets',
  'Heaps & Priority Queues',
  'Sliding Window',
  'Two Pointers',
  'Binary Search',
  'Trie & Suffix Arrays',
]

const ROADMAPS = [
  {
    title: "Striver's SDE Sheet",
    desc: 'The most popular DSA roadmap. 180+ problems curated for interviews. Start here.',
    link: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2',
    icon: TrendingUp,
    highlight: true
  },
  {
    title: 'Love Babbar 450 DSA',
    desc: '450 must-do problems for interview prep. Comprehensive and well-organized.',
    link: 'https://codolio.com/question-tracker/sheet/love-babbar-sheet',
    icon: BookOpen,
    highlight: false
  },
  {
    title: 'GFG DSA Self-Paced',
    desc: 'GeeksforGeeks structured DSA course with videos and practice problems.',
    link: 'https://www.geeksforgeeks.org/courses/dsa-self-paced',
    icon: Layers,
    highlight: false
  },
  {
    title: 'NeetCode 150',
    desc: 'Curated 150 problems for FAANG interviews. Organized by topic.',
    link: 'https://neetcode.io/practice',
    icon: Target,
    highlight: false
  },
]

const PLATFORMS = [
  {
    name: 'LeetCode',
    emoji: '💻',
    desc: 'Premium platform for FAANG interview prep. 2500+ problems, discuss forums, mock interviews.',
    pros: ['Best for interviews', 'Excellent explanations', 'Mock interview feature'],
    link: 'https://leetcode.com'
  },
  {
    name: 'CodeChef',
    emoji: '🍳',
    desc: 'Indian competitive programming platform. Monthly contests, beginner-friendly.',
    pros: ['Great for CP', 'Monthly contests', 'Indian community'],
    link: 'https://www.codechef.com'
  },
  {
    name: 'GeeksforGeeks (GFG)',
    emoji: '🧠',
    desc: 'Comprehensive DSA tutorials + problems. Excellent explanations and articles.',
    pros: ['Best tutorials', 'Free content', 'Well-organized'],
    link: 'https://www.geeksforgeeks.org'
  },
  {
    name: 'Codeforces',
    emoji: '⚔️',
    desc: 'Hardcore competitive programming. Contests, problem sets, rating system.',
    pros: ['Challenging problems', 'Real contests', 'Strong community'],
    link: 'https://codeforces.com'
  },
  {
    name: 'HackerRank',
    emoji: '🎯',
    desc: 'Interactive learning platform. Tutorials + problems in one place.',
    pros: ['Beginner-friendly', 'Tutorials included', 'Certificates'],
    link: 'https://www.hackerrank.com'
  },
  {
    name: 'AtCoder',
    emoji: '🏆',
    desc: 'Japanese competitive programming platform. High-quality contests and problems.',
    pros: ['Quality problems', 'Educational', 'Regular contests'],
    link: 'https://atcoder.jp'
  },
]

const PROBLEM_CATEGORIES = [
  {
    level: 'Beginner',
    color: 'var(--accent-lime)',
    problems: [
      'Two Sum',
      'Reverse String',
      'Valid Parentheses',
      'Merge Sorted Array',
      'Remove Duplicates from Sorted Array',
      'Best Time to Buy and Sell Stock',
      'Contains Duplicate',
      'Valid Anagram'
    ]
  },
  {
    level: 'Intermediate',
    color: 'var(--accent)',
    problems: [
      'Longest Substring Without Repeating Characters',
      'Median of Two Sorted Arrays',
      'Longest Palindromic Substring',
      'Zigzag Conversion',
      'Reverse Integer',
      'String to Integer (atoi)',
      'Palindrome Number',
      'Container With Most Water'
    ]
  },
  {
    level: 'Advanced',
    color: 'var(--accent)',
    problems: [
      'Regular Expression Matching',
      'Merge k Sorted Lists',
      'Trapping Rain Water',
      'Wildcard Matching',
      'Maximal Rectangle',
      'Word Ladder II',
      'Minimum Window Substring',
      'Serialize and Deserialize Binary Tree'
    ]
  },
]

const LANG_GUIDES = [
  {
    lang: 'C++',
    resources: [
      { title: 'GeeksforGeeks C++ Tutorial', link: 'https://www.geeksforgeeks.org/c-plus-plus/' },
      { title: 'Striver C++ Series (YouTube)', link: 'https://www.youtube.com/watch?v=z9bsSdjUGo0&list=PLgUwDviBIf0oF6sPw6sBbSqkKLJQJXSld' },
      { title: 'cppreference.com (Documentation)', link: 'https://en.cppreference.com/' },
      { title: "Competitive Programmer's Handbook", link: 'https://cses.fi/book/' },
    ]
  },
  {
    lang: 'Java',
    resources: [
      { title: 'GeeksforGeeks Java Tutorial', link: 'https://www.geeksforgeeks.org/java/' },
      { title: 'Striver Java Series (YouTube)', link: 'https://www.youtube.com/watch?v=Ej4pz0uRYMA&list=PLgUwDviBIf0q_7t5nycigCMGVUG74Dc-d' },
      { title: 'Oracle Java Documentation', link: 'https://docs.oracle.com/javase/tutorial/' },
      { title: 'Java Collections Framework Guide', link: 'https://www.geeksforgeeks.org/collections-in-java-2/' },
    ]
  },
]

const GITHUB_REPOS = [
  {
    name: 'TheAlgorithms/C-Plus-Plus',
    desc: 'Collection of algorithms implemented in C++. Great for understanding different approaches.',
    link: 'https://github.com/TheAlgorithms/C-Plus-Plus',
    stars: '30k+'
  },
  {
    name: 'TheAlgorithms/Java',
    desc: 'Same collection but for Java. Comprehensive and well-documented.',
    link: 'https://github.com/TheAlgorithms/Java',
    stars: '55k+'
  },
  {
    name: 'striver79/striver-sheet-solutions',
    desc: "Solutions to Striver's SDE Sheet. Learn from the creator himself.",
    link: 'https://github.com/striver79/striver-sheet-solutions',
    stars: '10k+'
  },
  {
    name: 'williamfiset/Algorithms',
    desc: 'High-quality algorithm implementations with detailed explanations.',
    link: 'https://github.com/williamfiset/Algorithms',
    stars: '15k+'
  },
  {
    name: 'twowaits/leetcode-solutions',
    desc: 'LeetCode problem solutions in C++ and Java with explanations.',
    link: 'https://github.com/twowaits/leetcode-solutions',
    stars: '5k+'
  },
  {
    name: 'kamyu104/LeetCode-Solutions',
    desc: 'Comprehensive LeetCode solutions with detailed comments.',
    link: 'https://github.com/kamyu104/LeetCode-Solutions',
    stars: '12k+'
  },
]

const STUDY_TIPS = [
  { title: "1. Understand, Don't Memorize", desc: 'Learn the "why" behind each algorithm. Understand the logic, not just the code.' },
  { title: '2. Start with Basics', desc: 'Master arrays, strings, and linked lists before jumping to advanced topics.' },
  { title: '3. Code by Hand First', desc: 'Write pseudocode and trace through examples on paper before coding.' },
  { title: '4. Practice Consistently', desc: 'Solve 1-2 problems daily. Consistency beats marathon cramming sessions.' },
  { title: '5. Analyze Time & Space', desc: 'For every solution, calculate Big O complexity. This is crucial for interviews.' },
  { title: '6. Solve Multiple Approaches', desc: 'For each problem, try to find 2-3 different solutions. Compare their complexities.' },
  { title: '7. Join Communities', desc: 'Discuss solutions on Discord, Reddit, or LeetCode. Learn from others.' },
  { title: '8. Mock Interviews', desc: 'Practice explaining your solution out loud. This is how interviews work.' },
]

const CHECKLIST_ITEMS = [
  'Choose C++ or Java',
  'Learn language basics',
  "Start with Striver's Sheet",
  'Solve 1-2 problems daily',
  'Understand time/space complexity',
  'Mock interviews & placements 🎉',
]

export default function DSAPage() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ───────────────────────────────── */}
      <section style={{
        minHeight: 'calc(80vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(1.5rem, 6vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>



        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          width: 'fit-content',
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
            boxShadow: '0 0 6px var(--accent)',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Master Problem Solving
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: '0.15em',
          maxWidth: '900px',
        }}>
          DSA & Competitive Programming
        </h1>

        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: '0.15em',
          maxWidth: '900px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3em',
          flexWrap: 'wrap',
        }}>
          Your path to{' '}
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent-lime)',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
          }}>
            top placements.
          </span>
        </span>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          maxWidth: '500px',
          marginTop: '2rem',
          marginBottom: '2.5rem',
        }}>
          From MSBTE fundamentals to competitive programming mastery. Striver's Sheet, LeetCode, CodeChef, GFG — everything you need to crack interviews and build problem-solving skills.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 mb-20">
          <button
            onClick={() => document.getElementById('strivers-sheet')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary w-full sm:w-auto text-center justify-center"
          >
            Start with Striver's Sheet <ArrowRight size={15} />
          </button>
          <button
            onClick={() => document.getElementById('language-choice')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost w-full sm:w-auto text-center justify-center"
          >
            Choose Your Language
          </button>
        </div>
      </section>

      {/* ── LANGUAGE CHOICE ────────────────────── */}
      <section id="language-choice" style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Foundation
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              Choose your DSA language
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            maxWidth: '280px',
            lineHeight: 1.7,
            textAlign: 'right',
          }}>
            C++ and Java are industry standards. Pick one and master it.
          </p>
        </div>

        {/* Language comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {LANGUAGES.map((lang) => (
            <div
              key={lang.name}
              style={{
                background: 'var(--surface)',
                border: lang.recommended ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
              }}
            >
              {lang.recommended && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.5rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Recommended
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{lang.emoji}</span>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {lang.name}
                </h3>
              </div>

              <div>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--accent-lime)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Pros
                </h4>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  paddingLeft: '1.5rem',
                }}>
                  {lang.pros.map((pro) => (
                    <li key={pro} style={{ marginBottom: '0.5rem' }}>✓ {pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Considerations
                </h4>
                <ul style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  paddingLeft: '1.5rem',
                }}>
                  {lang.cons.map((con) => (
                    <li key={con} style={{ marginBottom: '0.5rem' }}>• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation box */}
        <div style={{
          background: 'rgba(200, 240, 77, 0.05)',
          border: '1px solid rgba(200, 240, 77, 0.2)',
          borderRadius: '1rem',
          padding: '1.75rem',
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Lightbulb size={20} color="var(--accent-lime)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent-lime)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}>
                Our Recommendation
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                <strong style={{ color: 'var(--text)' }}>Start with C++</strong> if you're comfortable with lower-level concepts. It's what MSBTE teaches and what competitive programming judges expect. <strong style={{ color: 'var(--text)' }}>Switch to Java</strong> if you find C++ overwhelming — both are equally respected in interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MSBTE vs THE WORLD ─────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Curriculum mapping
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              MSBTE DSA topics & beyond
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            maxWidth: '280px',
            lineHeight: 1.7,
            textAlign: 'right',
          }}>
            What you learn in MSBTE is the foundation. Here's what else you need.
          </p>
        </div>

        {/* MSBTE topics */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            MSBTE K-Scheme Topics (Sem 3–4)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {MSBTE_TOPICS.map((topic) => (
 <div
  key={topic.title}
  onClick={() => setSelectedTopic(topic)}
  style={{
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '0.75rem',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all .2s ease',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-2px)'
    e.currentTarget.style.borderColor = 'var(--accent)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.borderColor = 'var(--border)'
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '.75rem'
    }}
  >
    <CheckCircle
      size={18}
      color="var(--accent-lime)"
    />

    <h4
      style={{
        margin: 0,
        color: 'var(--text)',
        fontWeight: 700,
      }}
    >
      {topic.title}
    </h4>
  </div>
</div>
))}
 
          </div>
          {selectedTopic && (
  <div
    onClick={() => setSelectedTopic(null)}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,.45)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 'min(700px, 90vw)',
        maxHeight: '75vh',
        overflowY: 'auto',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        padding: '2rem',
      }}
    >
     <>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    }}
  >
    <h2
      style={{
        margin: 0,
        color: 'var(--text)',
      }}
    >
      {selectedTopic.title}
    </h2>

    <button
      onClick={() => setSelectedTopic(null)}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'var(--text)',
        fontSize: '1.5rem',
        cursor: 'pointer',
      }}
    >
      ×
    </button>
  </div>

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    {selectedTopic.problems.map((problem) => (
      <a
        key={problem.name}
        href={problem.link}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          textDecoration: 'none',
          background: 'var(--surface2)',
          transition: '.2s',
        }}
      >
        <div>
          <div
            style={{
              color: 'var(--text)',
              fontWeight: 600,
              marginBottom: '.4rem',
            }}
          >
            {problem.name}
          </div>

          <span
            style={{
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '.75rem',
              background:
                problem.difficulty === 'Easy'
                  ? '#1f7a3d'
                  : problem.difficulty === 'Medium'
                  ? '#b7791f'
                  : '#b83232',
              color: '#fff',
            }}
          >
            {problem.difficulty}
          </span>
        </div>

        <ExternalLink
          size={18}
          color="var(--accent)"
        />
      </a>
    ))}
  </div>
</>
    </div>
  </div>
)}
        </div>

        {/* Beyond MSBTE */}
        <div style={{
          background: 'rgba(232, 69, 60, 0.05)',
          border: '1px solid rgba(232, 69, 60, 0.2)',
          borderRadius: '1rem',
          padding: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: '1.05rem',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Beyond MSBTE — Interview & CP Topics
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {BEYOND_TOPICS.map((topic) => (
              <div
                key={topic}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Star size={18} color="var(--accent)" strokeWidth={1.5} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRIVER'S SHEET ────────────────────── */}
      <section id="strivers-sheet" style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              The roadmap
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              Striver's Sheet & Top Roadmaps
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {ROADMAPS.map((roadmap) => {
            const Icon = roadmap.icon
            return (
              <a
                key={roadmap.title}
                href={roadmap.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--surface)',
                  border: roadmap.highlight ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = roadmap.highlight ? 'var(--accent)' : 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {roadmap.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '20px',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    Start Here
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={22} color="var(--accent)" strokeWidth={1.5} />
                  <h3 style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}>
                    {roadmap.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}>
                  {roadmap.desc}
                </p>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginTop: 'auto',
                }}>
                  Start Learning <ExternalLink size={14} />
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* ── PRACTICE PLATFORMS ─────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Practice platforms
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              Where to solve problems
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{platform.emoji}</span>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {platform.name}
                </h3>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {platform.desc}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                {platform.pros.map((pro) => (
                  <div key={pro} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-lime)',
                  }}>
                    <CheckCircle size={14} strokeWidth={2} aria-hidden="true" />
                    {pro}
                  </div>
                ))}
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.85rem',
                marginTop: 'auto',
              }}>
                Visit <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── MUST-DO PROBLEMS ───────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Problem sets
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              Must-do problems by difficulty
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {PROBLEM_CATEGORIES.map((category) => (
            <div
              key={category.level}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: category.color,
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}>
                {category.level}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.75rem',
              }}>
                {category.problems.map((problem) => (
                  <div
                    key={problem}
                    style={{
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.85rem',
                      color: 'var(--text)',
                      lineHeight: 1.5,
                    }}
                  >
                    {problem}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro tip */}
        <div style={{
          background: 'rgba(200, 240, 77, 0.05)',
          border: '1px solid rgba(200, 240, 77, 0.2)',
          borderRadius: '1rem',
          padding: '1.75rem',
          marginTop: '2rem',
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Zap size={20} color="var(--accent-lime)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent-lime)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
              }}>
                Pro Tip
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                Don't just solve problems — <strong style={{ color: 'var(--text)' }}>understand the approach</strong>. Write down the logic, time/space complexity, and edge cases. Quality over quantity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LANGUAGE GUIDES ────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Language resources
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              Learn C++ & Java for DSA
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {LANG_GUIDES.map((langGuide) => (
            <div
              key={langGuide.lang}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: 'var(--text)',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
              }}>
                {langGuide.lang}
              </h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {langGuide.resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(232, 69, 60, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--surface2)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >
                    <ExternalLink size={14} color="var(--accent)" strokeWidth={1.5} />
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      flex: 1,
                    }}>
                      {resource.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GITHUB REPOS ───────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Code references
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              GitHub repos for learning & reference
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {GITHUB_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(232, 69, 60, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FaGithub size={20} color="var(--accent)" strokeWidth={1.5} />
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {repo.name}
                </h3>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {repo.desc}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-lime)',
                marginTop: 'auto',
              }}>
                <Star size={14} strokeWidth={1.5} aria-hidden="true" />
                {repo.stars} stars
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── STUDY TIPS ─────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div className="section-label" style={{ marginBottom: '0.75rem' }}>
              Success tips
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}>
              How to master DSA
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {STUDY_TIPS.map((tip) => (
            <div
              key={tip.title}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--accent)',
                letterSpacing: '-0.01em',
              }}>
                {tip.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 7rem)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '3rem',
      }}>

        <div style={{ maxWidth: '540px' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>
            Ready?
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}>
            Start your DSA journey today
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Pick a language (C++ or Java), choose a roadmap (Striver's Sheet), and start solving problems. Consistency is key.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Trophy size={14} /> Start Striver's Sheet
            </a>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Go to LeetCode
            </a>
          </div>
        </div>

        {/* Right side — checklist */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          borderLeft: '1px solid var(--border)',
          paddingLeft: '3rem',
        }}>
          {CHECKLIST_ITEMS.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={18} color="var(--accent-lime)" strokeWidth={1.5} aria-hidden="true" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text)',
                lineHeight: 1.5,
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
