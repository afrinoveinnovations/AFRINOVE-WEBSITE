import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Reveal, Counter } from '../components/Effects';
import { 
  Building2, Lightbulb, Monitor, BrainCircuit, Search, 
  Coins, GraduationCap, Leaf, Megaphone, Home as HouseIcon, 
  Gem, Fuel, Compass, Calendar, ArrowRight, ShieldCheck 
} from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cat-1');

  const categories = [
    { id: 'cat-1', label: 'Business Dev', icon: <Building2 size={16} />, title: 'Business Development & Investment Advisory', desc: 'Strategy, capital sourcing, and partnership facilitation.' },
    { id: 'cat-2', label: 'Innovation', icon: <Lightbulb size={16} />, title: 'Innovation & Venture Building', desc: 'Accelerating ideas into commercially viable corporations.' },
    { id: 'cat-3', label: 'Digital', icon: <Monitor size={16} />, title: 'Digital Transformation Services', desc: 'End-to-end digitisation of enterprise and supply stacks.' },
    { id: 'cat-4', label: 'AI & Tech', icon: <BrainCircuit size={16} />, title: 'AI & Emerging Technologies', desc: 'Context-specific AI strategies and machine learning agents.' },
    { id: 'cat-5', label: 'Research', icon: <Search size={16} />, title: 'Research, Policy & Development', desc: 'Evidence-based project designs, policy briefs, and M&E.' },
    { id: 'cat-6', label: 'Financing', icon: <Coins size={16} />, title: 'Financing & Capital Solutions', desc: 'Structuring DFI funding, carbon credits, and grants.' },
    { id: 'cat-7', label: 'Capacity', icon: <GraduationCap size={16} />, title: 'Capacity Building & Talent', desc: 'Leadership, AI literacy, and vocational agritech cohorts.' },
    { id: 'cat-8', label: 'Sustainability', icon: <Leaf size={16} />, title: 'Sustainability & Green Growth', desc: 'ESG frameworks, climate finance, and renewable transitions.' },
    { id: 'cat-9', label: 'Marketing', icon: <Megaphone size={16} />, title: 'Branding, Marketing & Growth', desc: 'Pitch decks, brand positioning, and digital campaigns.' },
    { id: 'cat-10', label: 'Real Estate', icon: <HouseIcon size={16} />, title: 'Real Estate Advisory', desc: 'Infrastructure financing and smart city feasibility planning.' },
    { id: 'cat-11', label: 'Minerals', icon: <Gem size={16} />, title: 'Minerals & Mining Trading', desc: 'OECD-compliant critical mineral trading & logistics.' },
    { id: 'cat-12', label: 'Petroleum', icon: <Fuel size={16} />, title: 'Petroleum & Energy Trading', desc: 'Escrow-backed regional supply & trade facilitation.' },
    { id: 'cat-13', label: 'Tourism', icon: <Compass size={16} />, title: 'Tourism & Hospitality Dev', desc: 'Eco-lodge feasibility studies and conservation structures.' },
  ];

  const handleBook = (categoryTitle) => {
    navigate(`/consult?service=${encodeURIComponent(categoryTitle)}`);
  };

  const handleScrollTo = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 150; // offset for navbar + cat-nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Simple intersection observer to highlight active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const cat of categories) {
        const el = document.getElementById(cat.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(cat.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="services-page-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grain"></div>
        <div className="hero-line"></div>
        <Reveal className="hero-content" delay={100}>
          <div className="hero-eyebrow">Our Services</div>
          <h1>Africa's Full-Spectrum<br /><em>Innovation Partner</em></h1>
          <p className="hero-sub">From advisory and project structuring to minerals trading, energy, and digital transformation — 13 integrated categories serving Uganda and the global African market.</p>
          <a href="#services-nav" className="hero-scroll" onClick={(e) => { e.preventDefault(); handleScrollTo('cat-1'); }}>
            Explore All Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stats-bar-item">
          <div className="stat-big"><Counter target={13} /></div>
          <div className="stat-small">Service Categories</div>
        </div>
        <div className="stats-bar-item">
          <div className="stat-big"><Counter target={90} suffix="+" /></div>
          <div className="stat-small">Service Offerings</div>
        </div>
        <div className="stats-bar-item">
          <div className="stat-big"><Counter target={12} suffix="+" /></div>
          <div className="stat-small">Countries Reached</div>
        </div>
        <div className="stats-bar-item">
          <div className="stat-big"><Counter target={100} suffix="k+" /></div>
          <div className="stat-small">Lives Impacted</div>
        </div>
      </div>

      {/* STICKY CATEGORY NAV */}
      <div className="cat-nav" id="services-nav">
        <div className="cat-nav-inner">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className={`cat-nav-item ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleScrollTo(cat.id)}
            >
              <span className="cat-icon" style={{ marginRight: '6px' }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 13 SERVICE CATEGORIES LIST */}
      <div className="services-list-container">
        {categories.map((cat, idx) => {
          // Provide some items for the sub-grid based on index
          const itemsMap = {
            'cat-1': ['Business Strategy Development', 'Market Entry & Expansion', 'Investment Readiness Plans', 'Fundraising & Capital Mobilization', 'Investor Matchmaking', 'PPP Feasibility Structuring', 'SME Growth Acceleration', 'Corporate Restructuring'],
            'cat-2': ['Startup Incubation Cohorts', 'Acceleration Program Design', 'Venture Studio Interventions', 'Prototype & MVP Validation', 'Corporate Innovation Labs', 'Business Model Sandboxing', 'Ecosystem Mapping'],
            'cat-3': ['Web Application Engineering', 'Mobile App Development', 'ERP & CRM Migrations', 'Digital Workflow Automation', 'Legacy Code Modernisation', 'Cloud Architecture Audit'],
            'cat-4': ['AI Strategy Consultations', 'Custom NLP & Chatbots', 'Business Intelligence Analytics', 'Machine Learning Models', 'Predictive Analysis Tools', 'Smart Logistics Automation'],
            'cat-5': ['Feasibility Studies Coordination', 'Market Opportunity Assessment', 'Socio-Economic Surveys', 'Policy Analysis Briefs', 'Detailed M&E Reports', 'Strategic Framework Alignment'],
            'cat-6': ['Project Finance Advisory', 'Development Finance Sourcing', 'Grant Proposal Packaging', 'Equity/Debt Structuring', 'Joint Venture Facilitation', 'Financial Risk Audits'],
            'cat-7': ['Executive Leadership Seminars', 'Vocational Agritech Cohorts', 'Digital Literacy Seminars', 'Agile Product Training', 'Corporate Strategy Alignments', 'Youth Startup Funding Support'],
            'cat-8': ['Corporate ESG Policy Design', 'Climate Mitigation Planning', 'Carbon Credits Consulting', 'Renewable Integration Audits', 'Circular Economy Audits', 'Sustainable Agriculture Models'],
            'cat-9': ['Strategic Narrative Positioning', 'Investor Pitch Deck Optimization', 'Search Engine Optimization', 'Global Trade Show Support', 'B2B Growth Funnel Building', 'Corporate Image Audits'],
            'cat-10': ['Infrastructure Feasibility', 'PPP Real Estate Sourcing', 'Land Rights Due Diligence', 'Industrial Park Feasibility', 'Mixed-Use Development Studies', 'Smart City Integration Plan'],
            'cat-11': ['OECD Due Diligence Compliance', 'Quality Assay Coordination', 'Trade Escrow Facilitation', 'Global Refinery Matchmaking', 'Consolidated Logistics Plans', 'Shipment Risk Audits'],
            'cat-12': ['Trade Finance Structuring', 'Fuel Quality Assurance', 'Petroleum Escrow Services', 'Bunkering Operations Advisory', 'Pipeline Feasibility Audits', 'Off-take Agreements Advisory'],
            'cat-13': ['Eco-Lodge Feasibility Studies', 'Conservation Trust Models', 'Tourism Destination Marketing', 'Hotel Asset Audits', 'Community Forestry Integration', 'Nature Trail Master Planning']
          };
          const items = itemsMap[cat.id] || [];

          return (
            <section key={cat.id} className="cat-section" id={cat.id}>
              <Reveal className="cat-header" delay={50}>
                <div className="cat-number">{idx < 9 ? `0${idx + 1}` : idx + 1}</div>
                <div className="cat-header-text">
                  <div className="cat-label">{cat.title}</div>
                  <h2 className="cat-title">Advisory in <em>{cat.label}</em></h2>
                  <p className="cat-desc">{cat.desc}</p>
                  
                  <button 
                    onClick={() => handleBook(cat.title)} 
                    className="btn-primary" 
                    style={{ marginTop: '24px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    Book Diagnostic Session
                    <Calendar size={14} />
                  </button>
                </div>
              </Reveal>

              <div className="sub-grid" style={{ marginTop: '48px' }}>
                {items.map((item, subIdx) => (
                  <div 
                    key={subIdx} 
                    className="sub-card" 
                    onClick={() => handleBook(`${cat.title} - ${item}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="sub-arrow">↗</span>
                    <div className="sub-icon" style={{ color: 'var(--gold)' }}>{cat.icon}</div>
                    <div className="sub-name">{item}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--mist)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={12} style={{ color: 'var(--gold)' }} /> Instant Booking
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="cta-section" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '48px', padding: '120px 48px' }}>
        <h2 className="cta-title">Ready to launch a <em>Strategic Venture?</em></h2>
        <div className="cta-actions">
          <Link to="/consult" className="btn-primary" style={{ textDecoration: 'none' }}>Book Consultation</Link>
          <Link to="/contact" className="btn-secondary" style={{ textDecoration: 'none', marginTop: '12px' }}>Send Project EOI</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
