import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Effects';
import { Search, BookOpen, FileText, Award, Calendar } from 'lucide-react';

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const publications = [
    {
      id: 'pub-0',
      title: 'Roll Bite: Reimagining the Rolex, One Roll at a Time',
      type: 'article',
      date: 'September 2026',
      author: 'Roll Bite & Afrinove Insights Desk',
      summary: 'The founding story of Roll Bite (Aug 2021), its mission for Ugandan youth livelihoods, signature menu options, and new home partnership at Beta Hub, Munyonyo with Urban Empire.',
      link: '/knowledge/roll-bite-story'
    },
    {
      id: 'pub-1',
      title: 'Structuring Infrastructure BOT Concessions in East Africa',
      type: 'policy-brief',
      date: 'July 2026',
      author: 'Faizal Maningi & Ssenyonga Ali',
      summary: 'Analysis of legal coordinates, risk allocation frameworks, and public sector partner responsibilities under the Ugandan PPP Act.'
    },
    {
      id: 'pub-2',
      title: 'Agricultural Value Add: Transforming Smallholder Yields in Zombo',
      type: 'case-study',
      date: 'June 2026',
      author: 'Kirya Laban Webbo',
      summary: 'A detailed methodology detailing the digital tracking and escrow structures applied to direct coffee exports for 5,000+ local farmers.'
    },
    {
      id: 'pub-3',
      title: 'East African Common Market: Trade Compliance & Customs Coordinates',
      type: 'research-paper',
      date: 'May 2026',
      author: 'Namukose Marion (Legal Advisor)',
      summary: 'Vetting checklist for cross-border freight compliance, tax exemptions, and certificate of origin documentation.'
    },
    {
      id: 'pub-4',
      title: 'Fintech Integration Framework for Regional Banking Overhauls',
      type: 'article',
      date: 'April 2026',
      author: 'Afrinove Digital Advisory Team',
      summary: 'Architecting modular microservice-based APIs to overhaul core retail banking databases without service disruption.'
    }
  ];

  const filteredPubs = publications.filter((pub) => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pub.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || pub.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="knowledge-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Knowledge Centre</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Thought Leadership &amp; <em>Advisory Insights</em>
        </h1>
        <p style={{ color: 'var(--mist)', maxWidth: '750px', lineHeight: '1.7', marginBottom: '48px' }}>
          Explore policy briefs, feasibility frameworks, industrial sector case studies, and venture spotlights designed to establish best practices and guide investment portfolios across African markets.
        </p>
      </Reveal>

      {/* Search & Filter Controls */}
      <Reveal className="search-filter-bar" delay={150} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px', background: 'var(--ink-2)', padding: '20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search publications, authors, keywords..."
            style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'policy-brief', 'case-study', 'research-paper', 'article'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              style={{
                background: selectedFilter === filter ? 'var(--gold)' : 'var(--ink)',
                color: selectedFilter === filter ? 'var(--ink)' : 'var(--mist)',
                border: `1px solid ${selectedFilter === filter ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Publications Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '60px' }}>
        {filteredPubs.length > 0 ? (
          filteredPubs.map((pub) => (
            <Reveal key={pub.id} className="pub-row" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.03)', padding: '32px', borderRadius: '4px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(201,168,76,0.1)', padding: '16px', borderRadius: '4px', color: 'var(--gold)', flexShrink: 0 }}>
                {pub.type === 'policy-brief' ? <Award size={28} /> : pub.type === 'research-paper' ? <BookOpen size={28} /> : <FileText size={28} />}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em', background: 'rgba(201,168,76,0.05)', padding: '4px 8px' }}>{pub.type.replace('-', ' ')}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--mist)', display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {pub.date}</span>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '8px' }}>{pub.title}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--mist)', display: 'block', marginBottom: '12px' }}>Author: {pub.author}</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--mist)', lineHeight: '1.6' }}>{pub.summary}</p>
                
                {pub.link ? (
                  <Link to={pub.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--gold)', textDecoration: 'none', marginTop: '16px', fontWeight: 600 }}>
                    Read Full Feature Story &rarr;
                  </Link>
                ) : (
                  <a href="/documents/afrinove_company_documents.pdf" download={`${pub.title.replace(/\s+/g, '_')}.pdf`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--gold)', textDecoration: 'none', marginTop: '16px', fontWeight: 500 }}>
                    Download Publication Package &rarr;
                  </a>
                )}
              </div>
            </Reveal>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--ink-2)', border: '1px dashed rgba(255,255,255,0.05)', color: 'var(--mist)' }}>
            No publications found matching your search query.
          </div>
        )}
      </div>
    </div>
  );
};

export default Knowledge;
