import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Effects';
import { Target, Shield, Compass, BookOpen, Users, Briefcase } from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Ssenyonga Ali Musanje', role: 'Founding Partner / Director of Strategy', avatar: 'AM', image: '/images/Directors/Ali.jpg' },
    { name: 'Faizal Maningi', role: 'Founding Partner / Executive Director', avatar: 'FM', image: '/images/Directors/Faisal.jpg' },
    { name: 'Kirya Laban Webbo', role: 'Founding Partner / Managing Director', avatar: 'LW', image: '/images/Directors/laban.jpeg' },
    { name: 'Fernando Mitshell', role: 'Executive Director', avatar: 'FM', image: '/images/Directors/fernandom.jpeg' },
    { name: 'Mujumba Eddie Damascus Elieza', role: 'Director of Operations', avatar: 'EE', image: '/images/Directors/eddie.jpg' },
    { name: 'Namukose Marion', role: 'Legal Advisor', avatar: 'MN', image: '/images/Directors/marion.jpg' }
  ];

  return (
    <div className="about-page-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grain"></div>
        <div className="hero-line"></div>
        
        <Reveal className="hero-content" delay={100}>
          <div className="hero-eyebrow">Corporate Profile</div>
          <h1>We Are<br /><em>Afrinove</em></h1>
          <p className="hero-sub font-body">
            Empowering enterprise growth, infrastructure delivery, and strategic development across East Africa. We combine deep local insights with global standards.
          </p>
          <a href="#story" className="hero-scroll" onClick={(e) => {
            e.preventDefault();
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Discover Our Story
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </Reveal>
      </section>

      {/* OUR STORY */}
      <section id="story" className="section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal delay={100}>
          <div className="section-label">Our Story</div>
          <h2 className="section-title">Forged in <em>Resilience</em></h2>
        </Reveal>
        
        <div className="story-grid">
          <Reveal delay={150}>
            <p className="section-body" style={{ marginBottom: '24px' }}>
              Afrinove Development Ltd was born from a singular conviction: that Africa's challenges are not roadblocks, but the very foundation for exponential growth.
            </p>
            <p className="section-body">
              What started as a small advisory collective in Kampala has rapidly evolved into a leading consultancy, empowering ambitious leaders to solve complex problems and capture massive opportunities across the continent. We don't just advise; we partner in the trenches to architect sustainable reality.
            </p>
          </Reveal>
          
          <Reveal className="image-box" delay={200} style={{ border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            <img src="/images/our-photos/zombo_sign.jpg" alt="Afrinove Founding Story" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </Reveal>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section id="vision" className="section" style={{ background: 'var(--ink-2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal delay={100}>
            <div className="section-label">Purpose</div>
            <h2 className="section-title">Catalyzing <em>the Future</em></h2>
          </Reveal>
          
          <div className="vm-grid">
            <Reveal className="vm-card" delay={150} style={{ background: 'var(--ink-3)', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', borderRadius: '4px' }}>
              <div style={{ color: 'var(--gold)', marginBottom: '16px' }}><Target size={32} /></div>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ color: 'var(--mist)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                To be the premier catalyst for transformative enterprise growth across Africa, redefining what is possible through innovation and strategic excellence.
              </p>
            </Reveal>
            
            <Reveal className="vm-card" delay={200} style={{ background: 'var(--ink-3)', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', borderRadius: '4px' }}>
              <div style={{ color: 'var(--gold)', marginBottom: '16px' }}><Compass size={32} /></div>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '16px' }}>Our Mission</h3>
              <p style={{ color: 'var(--mist)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                We bridge the gap between ambitious goals and sustainable reality. We provide bespoke, data-driven solutions tailored to the unique dynamics of the African market, ensuring our partners not only succeed, but lead.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="team" className="section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal delay={100}>
          <div className="section-label">Leadership</div>
          <h2 className="section-title">Our <em>Executive Board</em></h2>
          <p className="section-body" style={{ marginBottom: '40px' }}>
            Afrinove is powered by a diverse coalition of strategists, technologists, and industry veterans united by a shared passion for driving Africa's economic transformation.
          </p>
        </Reveal>

        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {team.map((member, idx) => (
            <Reveal key={idx} className="team-card" delay={150 + idx * 50} style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.03)', padding: '40px 32px', textAlign: 'center', borderRadius: '4px' }}>
              <div className="team-avatar" style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(201, 168, 76, 0.1)', border: '1px solid var(--gold)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', fontWeight: 600, overflow: 'hidden' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  member.avatar
                )}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '6px' }}>{member.name}</h3>
              <p className="role" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.08em' }}>{member.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section id="values" className="section" style={{ background: 'var(--ink-2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal delay={100}>
            <div className="section-label">Core Pillars</div>
            <h2 className="section-title">Values That <em>Guide Us</em></h2>
          </Reveal>
          
          <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
            {[
              { title: 'Uncompromising Quality', desc: 'We hold ourselves to the highest global standards, delivering premium execution on every project, regardless of scale.' },
              { title: 'Local Nuance', desc: 'Africa is not a monolith. Our strategies are deeply rooted in granular, market-specific insights that generic consultancies simply do not possess.' },
              { title: 'Bold Innovation', desc: 'We challenge the status quo, leveraging modern technology and creative thinking to leapfrog traditional barriers.' },
              { title: 'Integrity & Transparency', desc: 'Upholding ethical standards and ensuring clear, traceable financial processes and open stakeholder engagement.' },
              { title: 'Accountability', desc: 'Holding ourselves and our partners to the highest standards of responsible governance and measurable impact.' }
            ].map((val, idx) => (
              <Reveal key={idx} className="value-card" delay={150 + idx * 50} style={{ background: 'var(--ink-3)', padding: '32px', borderRadius: '4px', borderTop: '2px solid var(--gold)' }}>
                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mist)', lineHeight: '1.6' }}>{val.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">Connect with Our <em>Advisory Board</em></h2>
        <div className="cta-actions">
          <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>Start a Conversation</Link>
          <Link to="/services" className="btn-secondary" style={{ textDecoration: 'none', marginTop: '12px' }}>Browse Verticals</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
