import React from 'react';
import { Link } from 'react-router-dom';
import { Counter, Reveal } from '../components/Effects';

const Home = () => {
  return (
    <div className="homepage-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grain"></div>
        <div className="hero-line"></div>
        
        <Reveal className="hero-left" delay={100}>
          <div className="hero-eyebrow">Afrinove Development Ltd</div>
          <h1>Elevating<br /><em>Enterprise</em><br />Across Africa</h1>
          <p className="hero-sub">
            We bridge the gap between ambitious goals and sustainable reality — providing bespoke,
            data-driven solutions calibrated to the unique dynamics of the African market.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary" style={{ textDecoration: 'none' }}>
              Explore Services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/about" className="btn-ghost" style={{ textDecoration: 'none' }}>
              Our Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <Reveal className="hero-right" delay={200}>
          <div className="hero-stat-card has-bg" style={{ backgroundImage: "url('/images/our-photos/zombo_sign.jpg')" }}>
            <div className="stat-num">
              <Counter target={5000} suffix="+" />
            </div>
            <div className="stat-label">Farmers directly impacted through Zombo Coffee Initiative</div>
          </div>
          
          <div className="hero-stat-row">
            <div className="hero-stat-card has-bg" style={{ backgroundImage: "url('/images/our-photos/warehouse_interior_1.jpg')" }}>
              <div className="stat-num">
                <Counter target={300} suffix="%" />
              </div>
              <div className="stat-label">Export growth in 18 months</div>
            </div>
            <div className="hero-stat-card has-bg" style={{ backgroundImage: "url('/images/our-photos/digital_transformation_ai.jpg')" }}>
              <div className="stat-num">
                <Counter target={100} suffix="k" />
              </div>
              <div className="stat-label">Digital wallet users acquired in Q1</div>
            </div>
          </div>
          
          <div className="hero-stat-card has-bg" style={{ backgroundImage: "url('/images/our-photos/community_team.jpg')" }}>
            <div className="stat-num">
              <Counter target={500} suffix="+" />
            </div>
            <div className="stat-label">Youth-led agricultural startups trained &amp; funded</div>
          </div>
        </Reveal>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[
            'Strategic Planning', 'Minerals & Mining', 'Digital Transformation', 'Import & Export',
            'Project Management', 'Escrow & Finance', 'Distributorship', 'Agricultural Development',
            'Business Consultancy', 'East Africa & Beyond'
          ].map((item, idx) => (
            <span key={idx} className="ticker-item"><span class="ticker-dot"></span>{item}</span>
          ))}
          {/* duplicate for seamless loop */}
          {[
            'Strategic Planning', 'Minerals & Mining', 'Digital Transformation', 'Import & Export',
            'Project Management', 'Escrow & Finance', 'Distributorship', 'Agricultural Development',
            'Business Consultancy', 'East Africa & Beyond'
          ].map((item, idx) => (
            <span key={`dup-${idx}`} className="ticker-item"><span class="ticker-dot"></span>{item}</span>
          ))}
        </div>
      </div>

      {/* ABOUT STRIP */}
      <section id="about-strip">
        <Reveal className="about-left" delay={100}>
          <div className="section-label">Who We Are</div>
          <h2 class="section-title">Forged in<br />Resilience</h2>
          <p className="section-body" style={{ marginBottom: '32px' }}>
            Afrinove Development Ltd was born from a singular conviction:
            that Africa's challenges are not roadblocks, but the very foundation for exponential growth.
          </p>
          <p className="section-body" style={{ marginBottom: '40px' }}>
            What started as a small advisory collective in Kampala has
            rapidly evolved into a leading consultancy, empowering ambitious leaders to solve complex problems and capture
            massive opportunities across the continent.
          </p>
          <Link to="/about" className="btn-ghost" style={{ color: 'var(--gold-dk)', textDecoration: 'none' }}>
            Read Our Full Story
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
        
        <Reveal className="about-right" delay={200}>
          <div className="value-item">
            <div className="value-title">Uncompromising Quality</div>
            <div className="value-desc">We hold ourselves to the highest global standards, delivering premium execution on every engagement regardless of scale.</div>
          </div>
          <div className="value-item">
            <div className="value-title">Local Nuance</div>
            <div className="value-desc">Africa is not a monolith. Our strategies are deeply rooted in granular, market-specific insights that generic consultancies simply do not possess.</div>
          </div>
          <div className="value-item">
            <div className="value-title">Bold Innovation</div>
            <div className="value-desc">We challenge the status quo, leveraging modern technology and creative thinking to leapfrog traditional barriers and compress timelines.</div>
          </div>
        </Reveal>
      </section>

      {/* AFRINOVE IN ACTION */}
      <section className="section" id="action-gallery">
        <Reveal delay={100}>
          <div className="section-label">Afrinove in Action</div>
          <h2 className="section-title">Field Operations &amp;<br />Community Impact</h2>
        </Reveal>
        
        <div className="gallery-grid">
          <Reveal className="gallery-item gi-1" delay={150}>
            <img src="/images/our-photos/mother_child_impact.jpg" alt="Social Impact &amp; Well-being" loading="lazy" />
            <div className="gallery-info">
              <h4>Social Impact &amp; Well-being</h4>
              <p>Empowering families and women-led initiatives in rural communities across our footprint.</p>
            </div>
          </Reveal>
          
          <Reveal className="gallery-item gi-2" delay={200}>
            <img src="/images/our-photos/water_borehole.jpg" alt="Community Water Development" loading="lazy" />
            <div className="gallery-info">
              <h4>Community Water Development</h4>
              <p>Clean water borehole installations supporting health and hygiene in agricultural zones.</p>
            </div>
          </Reveal>
          
          <Reveal className="gallery-item gi-3" delay={250}>
            <img src="/images/our-photos/coffee_beans.jpg" alt="Sustainable Agriculture" loading="lazy" />
            <div className="gallery-info">
              <h4>Sustainable Agriculture</h4>
              <p>Supporting farmers with modern processing and quality inspection standards.</p>
            </div>
          </Reveal>
          
          <Reveal className="gallery-item gi-4" delay={300}>
            <img src="/images/our-photos/classroom_children.jpg" alt="Youth &amp; Education Initiatives" loading="lazy" />
            <div className="gallery-info">
              <h4>Youth &amp; Education Empowerment</h4>
              <p>Investing in training and schooling to foster future-ready local leaders.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="section" id="services-teaser">
        <div className="services-teaser-header">
          <Reveal delay={100}>
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Thirteen Verticals.<br />One Partner.</h2>
          </Reveal>
          <Link to="/services" className="btn-ghost" style={{ textDecoration: 'none' }}>
            All Services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        
        <div className="services-mini-grid">
          {[
            { num: '01', name: 'Business Consultancy', desc: 'Strategy and operations advisory for enterprises navigating Africa\'s most complex markets.' },
            { num: '02', name: 'Minerals & Mining', desc: 'Principal trading and advisory in critical mineral concentrates — copper, cobalt, gold, coltan, lithium and more.' },
            { num: '03', name: 'Digital Transformation', desc: 'End-to-end digitisation of legacy operations, from core banking to cloud-native supply chains.' },
            { num: '04', name: 'Project Management', desc: 'Full-cycle PMO governance for complex multi-stakeholder initiatives — on time, on scope, on budget.' },
            { num: '05', name: 'Import & Export', desc: 'Trade facilitation across East Africa and global corridors — documentation, logistics, and customs compliance.' },
            { num: '06', name: 'Escrow & Finance', desc: 'Secure escrow facilitation for cross-border deals, M&A transactions, and high-value contracts.' },
          ].map((srv, idx) => (
            <Link key={idx} to={`/services#cat-${srv.num}`} className="service-mini-card reveal visible" style={{ textDecoration: 'none' }}>
              <div className="service-mini-num">{srv.num}</div>
              <div className="service-mini-name">{srv.name}</div>
              <div className="service-mini-desc">{srv.desc}</div>
            </Link>
          ))}
        </div>
        <Link to="/services" className="services-view-all" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '40px', color: 'var(--gold)', fontWeight: 500 }}>
          View All 13 Services →
        </Link>
      </section>

      {/* IMPACT STATS */}
      <section className="section" id="impact-strip">
        <Reveal delay={100}>
          <div className="section-label">Proven Impact</div>
          <h2 className="section-title">Results That Speak</h2>
        </Reveal>
        
        <div className="impact-grid">
          {[
            { target: 50, suffix: '+', label: 'Projects Delivered' },
            { target: 12, suffix: '', label: 'African Countries' },
            { target: 25, suffix: 'M+', label: 'Capital Advised (USD)' },
            { target: 95, suffix: '%', label: 'Client Retention Rate' }
          ].map((item, idx) => (
            <div key={idx} className="impact-card">
              <div className="impact-num">
                <Counter target={item.target} suffix={item.suffix} />
              </div>
              <div className="impact-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section" id="cases">
        <div className="cases-header">
          <Reveal delay={100}>
            <div className="section-label">Case Studies</div>
            <h2 className="section-title">Work That Matters</h2>
          </Reveal>
          <Link to="/projects" className="btn-ghost" style={{ textDecoration: 'none' }}>
            Opportunities Portal
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        
        <div className="cases-grid">
          <Reveal className="case-card" delay={150}>
            <div className="case-tag">Agriculture · Zombo Region</div>
            <h3 className="case-name">Coffee Export Initiative</h3>
            <p className="case-desc">Local farmers lacked direct access to premium international markets, relying on intermediaries that suppressed their margins. Afrinove architected a cooperative model with digital supply chain transparency and quality certification frameworks.</p>
            <div className="case-result">300% increase in direct-to-market exports within 18 months</div>
          </Reveal>
          
          <Reveal className="case-card" delay={200}>
            <div className="case-tag">FinTech · Regional Banking</div>
            <h3 className="case-name">Core Banking Overhaul</h3>
            <p className="case-desc">A legacy regional bank faced high transaction failure rates and rapid customer churn to agile digital competitors. We led a ground-up digital transformation with cloud-native microservices, disrupting nothing.</p>
            <div className="case-result">99.99% uptime — 100k new digital wallet users in Q1</div>
          </Reveal>
          
          <Reveal className="case-card" delay={250}>
            <div className="case-tag">Youth Empowerment · East Africa</div>
            <h3 className="case-name">Agricultural Youth Programme</h3>
            <p className="case-desc">High youth unemployment combined with ageing farming demographics threatened long-term food security. We partnered with NGOs to design a scalable agritech capacity-building programme for young agri-preneurs.</p>
            <div className="case-result">500+ youth-led startups trained — 2,000+ secondary jobs created</div>
          </Reveal>
          
          <Reveal className="case-card" delay={300} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '64px 48px' }}>
            <div className="section-label" style={{ marginBottom: '20px' }}>Your Project</div>
            <h3 className="case-name" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>What Will We Build<br />Together?</h3>
            <p className="case-desc" style={{ marginBottom: '32px', maxWidth: '280px' }}>Every great case study begins with a single conversation.</p>
            <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>Start a Project</Link>
          </Reveal>
        </div>
      </section>

      {/* MINERALS STRIP */}
      <section className="section" id="minerals-strip">
        <div className="minerals-inner">
          <Reveal delay={100}>
            <div className="section-label">Flagship Vertical</div>
            <h2 className="section-title">Minerals &amp;<br />Mining Trading</h2>
            <p className="section-body" style={{ marginBottom: '16px' }}>We operate as principal trader and advisory intermediary in Africa's critical minerals sector — connecting producers to verified global buyers at premium valuations.</p>
            <div className="minerals-commodities">
              {['Copper Concentrate', 'Cobalt Hydroxide', 'Gold Doré', 'Tantalum (Coltan)', 'Lithium Spodumene', 'Iron Ore', 'Manganese', 'Rare Earth Elements'].map((commodity, idx) => (
                <div key={idx} className="commodity-pill">{commodity}</div>
              ))}
            </div>
          </Reveal>
          
          <Reveal className="minerals-cta-side" delay={200}>
            <p className="minerals-quote">Africa holds <em>60% of the world's</em> critical mineral reserves. We help you access them responsibly.</p>
            <Link to="/services" className="btn-primary" style={{ textDecoration: 'none' }}>
              Minerals Trading Details
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '8px' }}>
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/contact" className="btn-ghost" style={{ textDecoration: 'none', marginTop: '16px' }}>Enquire About a Shipment →</Link>
          </Reveal>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners">
        <div className="partners-label">Trusted Across Sectors</div>
        <div className="partners-row">
          {['Finance', 'Agriculture', 'Mining', 'Government', 'NGOs', 'Technology', 'Logistics'].map((partner, idx) => (
            <div key={idx} className="partner-item">{partner}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Reveal className="cta-strip" delay={100}>
        <h2 className="cta-strip-title">Ready to Build Something <em>Significant?</em></h2>
        <div>
          <Link to="/contact" className="btn-dark" style={{ textDecoration: 'none' }}>
            Start a Conversation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default Home;
