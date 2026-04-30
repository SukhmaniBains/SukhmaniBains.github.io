import Hero from '../components/Hero';
import ImpactStats from '../components/ImpactStats';
import About from '../components/About';
import Career from '../components/Career';
import Expertise from '../components/Expertise';
import TechnicalMastery from '../components/TechnicalMastery';
import AIInnovation from '../components/AIInnovation';
import Projects from '../components/Projects';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <ImpactStats />
      <About />
      <Career />
      <Expertise />
      <TechnicalMastery />
      <AIInnovation />
      <Projects />
      <BlogSection />
      <Contact />
    </main>
  );
};

export default HomePage;
