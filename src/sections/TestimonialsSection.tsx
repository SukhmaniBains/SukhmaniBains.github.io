import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "When I started at Aptean as VP of Product Marketing, Sukhmani helped me ramp my knowledge. He was instrumental in translating my vision for connecting leading and lagging indicators into clear, actionable dashboards that I used to understand the business and influence decisions. He listens deeply, asks smart clarifying questions, and then executes quickly, which made collaboration with him both efficient and enjoyable. His ability to communicate across cultures and languages was a real asset in engaging global resources and ensuring alignment across regions. I recommend Sukhmani highly for any role that requires thoughtful analytics, strong execution, and cross-functional collaboration.",
    author: "Celestine Hall", title: "VP of Product Marketing", company: "Aptean", date: "March 2026", context: "Senior leader at Aptean",
  },
  {
    quote: "Sukh is an extremely talented, proactive, and pragmatic colleague who excels at balancing his leadership and technical skills to drive results. I had the pleasure of working with Sukh at Fortna for over a year on a variety of pertinent BI projects that touched multiple departments across our organization, including Sales, Marketing and our Leadership team. I was always extremely impressed by Sukh's ability to quickly deduce business requirements from even the toughest stakeholders and be a leader and SME on our BI projects. His vast technical knowledge and attention to detail allowed him to turn even the vaguest project requirements into successful visualizations and reporting. Most importantly, people enjoy working with Sukh because you can trust him to get things done and to do it with an affable, positive attitude! Sukhmani Bains earns my highest recommendation.",
    author: "Christina Catchpole", title: "RevOps Director", company: "Nasdaq (formerly FORTNA)", date: "March 2021", context: "Cross-functional partner at FORTNA",
  },
  {
    quote: "Throughout my time working with Sukh, I have not met an individual as knowledgeable and skilled as he is in business intelligence and SQL. As my mentor and senior developer, Sukh introduced me to new technologies and helped me understand the significance of communication and teamwork in producing high quality reports for stakeholders. I was particularly impressed by Sukh's ability to work well with others and be a leader especially at busy and stressful times. Sukh was a great mentor who taught me not only how to be a skilled developer, but also how to communicate with others both inside and outside of the team to get things done. I highly recommend him as an asset to any team and company.",
    author: "Kyle Lu", title: "Lead Software Engineer", company: "BNY Mellon", date: "June 2019", context: "Former colleague",
  },
  {
    quote: "It didn't take long for Sukh to demonstrate his keen eye for Business Intelligence Visualizations. While at JH he was able to take both old and new reports and scorecards and provide style and functionality templates that would simplify the construction of new reports, while improving the end users' ability to understand them. In addition to being an excellent designer, he was a warm and welcome presence on the team and will be missed.",
    author: "Bill Burghardt", title: "Senior BI Developer", company: "Jackson Hewitt", date: "July 2018", context: "Same-team colleague",
  },
  {
    quote: "I have had the pleasure of working with Sukhmani Bains on the BI team, he is a quick learner and shows an eagerness to get things done the right way, the first time. He has created reporting templates and standards that are crucial to our efforts to standardize and build consistent reporting solutions across the enterprise.",
    author: "Rashawn Sanchez, ITIL", title: "Senior Software Engineer - ETL / MSSQL", company: "Product Development", date: "May 2018", context: "Same-team colleague",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-header', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.testimonials-header', start: 'top 85%' } });
      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} style={{ background: '#080C14', padding: 'var(--space-2xl) 0' }}>
      <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 var(--container-pad)' }}>
        <div className="testimonials-header text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <p className="text-label" style={{ color: '#38BDF8', marginBottom: '16px' }}>TESTIMONIALS</p>
          <h2 className="text-h2 font-heading" style={{ color: '#F8FAFC' }}>What Leaders Say</h2>
          <p className="text-body-lg" style={{ color: '#94A3B8', marginTop: '16px' }}>Recommendations from executives and colleagues across my career</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '24px' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card transition-all duration-300 flex flex-col"
              style={{ background: 'linear-gradient(135deg, rgba(13,18,32,0.95) 0%, rgba(17,24,39,0.9) 100%)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', position: 'relative' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(56,189,248,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ position: 'absolute', top: '20px', right: '24px', opacity: 0.15 }}><Quote size={40} style={{ color: '#38BDF8' }} /></div>
              <div className="inline-flex items-center self-start" style={{ gap: '6px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px' }}>
                <Linkedin size={14} style={{ color: '#38BDF8' }} />
                <span className="text-label" style={{ color: '#38BDF8', fontSize: '11px' }}>{t.context}</span>
              </div>
              <p className="text-body-sm flex-grow" style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: '24px', fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <p className="text-body-sm font-medium" style={{ color: '#F8FAFC' }}>{t.author}</p>
                <p className="text-body-sm" style={{ color: '#475569' }}>{t.title} - {t.company}</p>
                <p className="text-label" style={{ color: '#475569', marginTop: '4px' }}>{t.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
