import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home         from './pages/Home'
import Resources    from './pages/Resources'
import Roadmaps     from './pages/Roadmaps'
import Predictor    from './pages/Predictor'
import Projects     from './pages/Projects'
import DSA          from './pages/DSA'
import YouTube      from './pages/YouTube'
import Internships  from './pages/Internships'
import Community    from './pages/Community'
import MSBTE        from './pages/MSBTE'
import Scholarships from './pages/Scholarships'
import Placement    from './pages/Placement'
import OpenSource   from './pages/OpenSource'
import About        from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      {/*
        bg is set on body via CSS var(--bg) in index.css.
        This div just needs minHeight — no hardcoded color.
      */}
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/resources"    element={<Resources />} />
            <Route path="/roadmaps"     element={<Roadmaps />} />
            <Route path="/predictor"    element={<Predictor />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/dsa"          element={<DSA />} />
            <Route path="/youtube"      element={<YouTube />} />
            <Route path="/internships"  element={<Internships />} />
            <Route path="/community"    element={<Community />} />
            <Route path="/msbte"        element={<MSBTE />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/placement"    element={<Placement />} />
            <Route path="/opensource"   element={<OpenSource />} />
            <Route path="/about"        element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}