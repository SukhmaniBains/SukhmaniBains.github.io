import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Layout from './components/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-projects" element={<Home />} />
        <Route path="/dashboards" element={<Home />} />
        <Route path="/blog" element={<Home />} />
      </Routes>
    </Layout>
  )
}
