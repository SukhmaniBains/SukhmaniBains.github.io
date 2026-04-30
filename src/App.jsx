import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SEO from './components/SEO';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AIDemoPage from './pages/AIDemoPage';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-bg-primary text-text-primary font-body">
        <SEO />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/ai-demo" element={<AIDemoPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
