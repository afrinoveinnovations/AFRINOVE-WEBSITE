import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Effects';
import { ShieldCheck, FileDown, Lock, PenTool, CheckCircle, HelpCircle } from 'lucide-react';

const Opportunities = () => {
  const { user, loginMock } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNda, setShowNda] = useState(false);
  const [ndaSigned, setNdaSigned] = useState(false);
  const [investorName, setInvestorName] = useState('');
  const [investorCompany, setInvestorCompany] = useState('');
  const [ndaLoading, setNdaLoading] = useState(false);

  const projects = [
    {
      id: 'proj-1',
      title: 'Arua Airport Development',
      sector: 'Aviation Infrastructure',
      location: 'Arua, West Nile Region, Uganda',
      fundingTarget: '$45,000,000',
      description: 'Strategic expansion of the runway, taxiways, and cargo terminals to establish Arua as the primary logistics hub connecting Uganda, Democratic Republic of Congo (DRC), and South Sudan.',
      teaserMetrics: 'Projected IRR: 18.4% | Concession Period: 25-Year BOT',
      hasDocuments: true,
    },
    {
      id: 'proj-2',
      title: 'Pakuba Airport Expansion',
      sector: 'Tourism Infrastructure',
      location: 'Murchison Falls National Park, Uganda',
      fundingTarget: '$18,500,000',
      description: 'Runway asphalt upgrading, navigation aid installations, and luxury charter lounges to enable direct regional flights for high-end international tourists visiting Murchison Falls.',
      teaserMetrics: 'Projected IRR: 16.2% | Growth in Charter Bookings: +34% YoY',
      hasDocuments: true,
    },
    {
      id: 'proj-3',
      title: 'Jinja Airfield Upgrades',
      sector: 'Industrial Infrastructure',
      location: 'Jinja, Eastern Region, Uganda',
      fundingTarget: '$12,000,000',
      description: 'Rehabilitation of the runway and integration with Lake Victoria marine and railway freight corridors to streamline cargo export routes for Jinja\'s manufacturing zones.',
      teaserMetrics: 'Projected IRR: 15.8% | Carbon Offset Index: Class B',
      hasDocuments: true,
    },
    {
      id: 'proj-4',
      title: 'Moroto Airport Strategic Runway',
      sector: 'Logistics & Minerals',
      location: 'Moroto, Karamoja Sub-region, Uganda',
      fundingTarget: '$22,000,000',
      description: 'Paving and reinforcement of the runway to support heavy aircraft for mineral exploration, agricultural trade, and security infrastructure connecting the Karamoja corridor.',
      teaserMetrics: 'Projected IRR: 14.5% | Trade Flow Increase: +48%',
      hasDocuments: true,
    },
    {
      id: 'proj-5',
      title: 'Zombo Commercial Forestry Initiative',
      sector: 'Agriculture & Forestry',
      location: 'Zombo District, West Nile, Uganda',
      fundingTarget: '$8,500,000',
      description: 'Establishing sustainable commercial timber and eucalyptus plantations coupled with modern wood processing facilities and high-margin carbon credit monetization.',
      teaserMetrics: 'Projected IRR: 21.1% | Forest Coverage: 4,000 Hectares',
      hasDocuments: true,
    },
    {
      id: 'proj-6',
      title: 'Northern Uganda Distributed Solar Micro-Grids',
      sector: 'Renewable Energy',
      location: 'Gulu, Lira & Kitgum, Uganda',
      fundingTarget: '$30,000,000',
      description: 'Rollout of 45 solar-hybrid micro-grids providing reliable, productive-use electricity to rural agricultural cooperatives, agro-processors, and off-grid trading centers.',
      teaserMetrics: 'Projected IRR: 17.5% | Household Connections: 50,000+',
      hasDocuments: true,
    }
  ];

  const handleAccessDocuments = (proj) => {
    setSelectedProject(proj);
    if (ndaSigned) {
      // already signed, view directly
      return;
    }
    setShowNda(true);
  };

  const handleSignNda = (e) => {
    e.preventDefault();
    if (!investorName || !investorCompany) {
      alert('Please fill in all signature fields.');
      return;
    }
    setNdaLoading(true);
    setTimeout(() => {
      // If not logged in, log in as mock investor role
      if (!user) {
        loginMock(investorName.toLowerCase().replace(/\s+/g, '') + '@investor.com', 'investor');
      }
      setNdaSigned(true);
      setShowNda(false);
      setNdaLoading(false);
    }, 1200);
  };

  return (
    <div className="opportunities-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Opportunities Portal</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Strategic <em>Investment Opportunities</em>
        </h1>
        <p style={{ color: 'var(--mist)', maxWidth: '700px', lineHeight: '1.7', marginBottom: '48px' }}>
          Afrinove Development Ltd coordinates development, financing, and delivery of major infrastructure and commercial projects across Uganda. Browse opportunities and sign the investor NDA to access our secure Virtual Data Room (VDR).
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '60px' }}>
        {projects.map((proj) => (
          <Reveal key={proj.id} className="project-teaser-card" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '32px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>{proj.sector}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>{proj.location.split(',')[0]}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '12px' }}>{proj.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '20px' }}>{proj.description}</p>
            </div>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>Funding Target:</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--white)', fontWeight: 600 }}>{proj.fundingTarget}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '20px', background: 'rgba(201,168,76,0.05)', padding: '8px 12px', borderLeft: '2px solid var(--gold)' }}>
                {proj.teaserMetrics}
              </div>
              
              <button 
                onClick={() => handleAccessDocuments(proj)}
                className="btn-primary" 
                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '0.8rem' }}
              >
                {ndaSigned ? 'Access VDR Documents' : 'Lock Documents (Sign NDA)'}
                {ndaSigned ? <FileDown size={14} /> : <Lock size={14} />}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* NDA MODAL FLOW */}
      {showNda && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
          <div style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', width: '100%', maxWidth: '650px', padding: '40px', borderRadius: '4px', position: 'relative' }}>
            <button onClick={() => setShowNda(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--mist)', fontSize: '1.25rem', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={28} /> Mutual Confidentiality Agreement (NDA)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginBottom: '20px', lineHeight: '1.5' }}>
              To review detailed feasibility studies, economic models, and company profiles for the <strong>{selectedProject?.title}</strong> opportunity, you must sign our Mutual Non-Disclosure Agreement.
            </p>
            
            <div style={{ background: 'var(--ink)', padding: '20px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', height: '180px', overflowY: 'scroll', fontSize: '0.75rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '24px', textAlign: 'justify' }}>
              <h4>1. CONFIDENTIAL INFORMATION</h4>
              <p>The Disclosing Party proposes to disclose certain proprietary or confidential business details regarding the project proposal. Confidential Information includes, without limitation, financial models, feasibility coordinates, partner logs, and technical plans.</p>
              <h4>2. RESTRICTIONS ON USE AND DISCLOSURE</h4>
              <p>The Receiving Party shall maintain all Confidential Information in strict confidence and shall not disclose it to any third parties without prior written consent from Afrinove Development Ltd.</p>
              <h4>3. TERM</h4>
              <p>This agreement shall remain in effect for a period of three (3) years from the date of electronic signature.</p>
            </div>

            <form onSubmit={handleSignNda}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Investor / Full Name</label>
                  <input 
                    type="text" 
                    value={investorName} 
                    onChange={(e) => setInvestorName(e.target.value)} 
                    required 
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                    placeholder="E.g., John Doe"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Company / Institution</label>
                  <input 
                    type="text" 
                    value={investorCompany} 
                    onChange={(e) => setInvestorCompany(e.target.value)} 
                    required 
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                    placeholder="E.g., Global Capital Partners"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}
                disabled={ndaLoading}
              >
                {ndaLoading ? 'Processing Digital Signature...' : 'Accept terms & Digitally Sign (PenTool)'}
                <PenTool size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SECURE DATA ROOM SECTION (VISIBLE ONCE NDA IS SIGNED) */}
      {ndaSigned && (
        <Reveal className="data-room-section" delay={100} style={{ background: 'rgba(201,168,76,0.03)', border: '1px dashed var(--gold)', borderRadius: '4px', padding: '40px', marginTop: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <CheckCircle size={32} style={{ color: 'var(--gold)' }} />
            <div>
              <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: '#fff' }}>Secure Virtual Data Room (VDR)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>Authorized Access Active for: {user?.displayName} ({user?.email})</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '6px' }}>Afrinove Development Ltd – Corporate Profile &amp; PPP Project Portfolio</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>Format: PDF | Size: 3.02 MB | Version: July 2026</p>
              </div>
              <a 
                href="/documents/afrinove_company_documents.pdf" 
                download="Afrinove_Corporate_Profile_and_Portfolio.pdf"
                className="btn-primary" 
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '0.75rem' }}
              >
                Download PDF
                <FileDown size={14} />
              </a>
            </div>
            
            <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '6px' }}>Arua Airport Extension Feasibility &amp; Traffic Volume Models</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>Format: XLSX / PDF | Gated behind Executive Review</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '6px 12px' }}>Request Access</span>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default Opportunities;
