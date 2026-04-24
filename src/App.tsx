import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/ai-projects" element={<AIProjectsPlaceholder />} />
        <Route path="/dashboards" element={<DashboardsPlaceholder />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

function AIProjectsPlaceholder() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080C14', paddingTop: '120px' }}>
      <div style={{ textAlign: 'center' }}>
        <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>AI PROJECTS</p>
        <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC', marginBottom: '16px' }}>Coming Soon</h2>
        <p className="text-body" style={{ color: '#94A3B8' }}>AI/LLM projects showcase is under development.</p>
      </div>
    </div>
  );
}

function DashboardsPlaceholder() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080C14', paddingTop: '120px' }}>
      <div style={{ textAlign: 'center' }}>
        <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>DASHBOARDS</p>
        <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC', marginBottom: '16px' }}>Coming Soon</h2>
        <p className="text-body" style={{ color: '#94A3B8' }}>Interactive dashboard gallery is under development.</p>
      </div>
    </div>
  );
}
