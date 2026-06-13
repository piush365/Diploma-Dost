import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import { Loader2 } from 'lucide-react'

const Home         = lazy(() => import('./pages/Home'))
const Resources    = lazy(() => import('./pages/Resources'))
const Roadmaps     = lazy(() => import('./pages/Roadmaps'))
const Predictor    = lazy(() => import('./pages/Predictor'))
const InnovationHub = lazy(() => import('./pages/InnovationHub'))
const DSA          = lazy(() => import('./pages/DSA'))
const YouTube      = lazy(() => import('./pages/YouTube'))
const Internships  = lazy(() => import('./pages/Internships'))
const Community    = lazy(() => import('./pages/Community'))
const MSBTE        = lazy(() => import('./pages/MSBTE'))
const Scholarships = lazy(() => import('./pages/Scholarships'))
const Placement    = lazy(() => import('./pages/Placement'))
const OpenSource   = lazy(() => import('./pages/OpenSource'))
const About        = lazy(() => import('./pages/About'))

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh' }}>
        <ScrollToTop />
        <Navbar />
        <main className="pt-20">
          <ErrorBoundary>
            <Suspense fallback={
            <div className="min-h-screen bg-[#0d0e0f] flex items-center justify-center">
              <Loader2 className="animate-spin text-[#e8453c]" size={40} />
            </div>
          }>
              <Routes>
                <Route path="/"              element={<Home />} />
                <Route path="/resources"     element={<Resources />} />
                <Route path="/roadmaps"      element={<Roadmaps />} />
                <Route path="/predictor"     element={<Predictor />} />
                <Route path="/innovation-hub" element={<InnovationHub />} />
                <Route path="/dsa"           element={<DSA />} />
                <Route path="/youtube"       element={<YouTube />} />
                <Route path="/internships"   element={<Internships />} />
                <Route path="/community"     element={<Community />} />
                <Route path="/msbte"         element={<MSBTE />} />
                <Route path="/scholarships"  element={<Scholarships />} />
                <Route path="/placement"     element={<Placement />} />
                <Route path="/opensource"    element={<OpenSource />} />
                <Route path="/about"         element={<About />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </HashRouter>
  )
}