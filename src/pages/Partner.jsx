import React, { useState } from 'react';
import { Reveal } from '../components/Effects';
import { Handshake, Target, Globe, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const partners = [
  { name: 'RollBite', img: '/images/Trusted-partners-Logos/RollBite.jpg' },
  { name: 'BetaHub', img: '/images/Trusted-partners-Logos/BetaHub.png' },
  { name: 'Soozinatt Vector Control', img: '/images/Trusted-partners-Logos/SOOZINATT VECTOR CONTROL LTD.png' },
  { name: 'Strada Import & Export', img: '/images/Trusted-partners-Logos/STRADA IMPORT AND EXPORT.jpeg' },
  { name: 'Stack Carbon', img: '/images/Trusted-partners-Logos/Stack Carbon.jpeg' },
  { name: 'Trans Global Link', img: '/images/Trusted-partners-Logos/TRANS GLOBAL LINK.jpeg' },
  { name: 'Eva Graphics', img: '/images/Trusted-partners-Logos/eva-graphicis.jpg' },
  { name: 'Kazi Masters', img: '/images/Trusted-partners-Logos/kazi masters.png' },
  { name: 'Rose Partners', img: '/images/Trusted-partners-Logos/rose partners.png' },
  { name: 'Terra Bonum Safari', img: '/images/Trusted-partners-Logos/terra-bonum-safari.jpg' },
  { name: 'Thorington Capital', img: '/images/Trusted-partners-Logos/thorington captial.jpg' }
];

const Partner = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: 'private',
    contactPerson: '',
    email: '',
    phone: '',
    collaborationArea: 'infrastructure',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    const target = import.meta.env.VITE_FORMSPREE_TARGET || '';
    if (!target || target === 'afrinove@outlook.com') {
      // If Form ID isn't provided yet in .env, prompt clear setup guidance
    }

    const endpoint = (target.startsWith('http') || target.includes('/'))
      ? target
      : `https://formspree.io/f/${target}`;

    const data = new FormData();
    data.append('_subject', `New Expression of Interest: ${formData.orgName}`);
    data.append('_replyto', formData.email);
    data.append('Organization Name', formData.orgName);
    data.append('Organization Type', formData.orgType);
    data.append('Primary Contact Person', formData.contactPerson);
    data.append('Email Address', formData.email);
    data.append('Phone Number', formData.phone);
    data.append('Desired Partnership Area', formData.collaborationArea);
    data.append('Detailed Proposal / Scope Summary', formData.message);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          orgName: '',
          orgType: 'private',
          contactPerson: '',
          email: '',
          phone: '',
          collaborationArea: 'infrastructure',
          message: ''
        });
      } else {
        const resData = await response.json().catch(() => ({}));
        if (resData.errors && resData.errors.length > 0) {
          setErrorMessage(resData.errors.map(err => err.message).join(', '));
        } else {
          setErrorMessage('Please enter your Formspree Form ID in the .env file.');
        }
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your internet connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="partner-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Partnerships Hub</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Strategic <em>Partnerships &amp; Collaboration</em>
        </h1>
        <p style={{ color: 'var(--mist)', maxWidth: '700px', lineHeight: '1.7', marginBottom: '48px' }}>
          We collaborate with development finance institutions, governments, private investors, and regional cooperatives to deliver transformative infrastructure and ventures. Submit an Expression of Interest (EOI) to partner with us.
        </p>
      </Reveal>

      <div className="partner-grid">
        {/* Left Side: Information & Value Prop */}
        <div>
          <Reveal className="partnership-column" delay={150}>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '24px' }}>Why Partner with Afrinove?</h3>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(201,168,76,0.1)', padding: '12px', borderRadius: '4px', height: 'fit-content', color: 'var(--gold)' }}>
                <Globe size={24} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Deep Local Integration</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--mist)', lineHeight: '1.6' }}>We possess deep local roots in East Africa with extensive connections across ministries, regional authorities, and rural agricultural cooperatives.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(201,168,76,0.1)', padding: '12px', borderRadius: '4px', height: 'fit-content', color: 'var(--gold)' }}>
                <Target size={24} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Rigorous Risk Mitigation</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--mist)', lineHeight: '1.6' }}>Our financial structuring, contractor vetting systems, and independent PMO frameworks isolate and eliminate development risks.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(201,168,76,0.1)', padding: '12px', borderRadius: '4px', height: 'fit-content', color: 'var(--gold)' }}>
                <Shield size={24} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Global Executive Compliance</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--mist)', lineHeight: '1.6' }}>All transactions operate under audited corporate governance structures, conforming with OECD guidelines and banking readiness standards.</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: EOI Form */}
        <div>
          <Reveal className="eoi-form-container" delay={200} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '40px', borderRadius: '4px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={48} style={{ color: 'var(--gold)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '12px' }}>Expression of Interest Received</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Thank you for initiating collaboration. Our Strategic Advisory and Partnerships desk will review your submission and contact you within 48 business hours with detailed project parameters.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer', padding: '10px 20px' }}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Handshake size={24} /> Expression of Interest Form
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Organization Name</label>
                    <input 
                      type="text" 
                      name="orgName" 
                      value={formData.orgName} 
                      onChange={handleChange} 
                      required 
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                      placeholder="E.g., European Development Bank"
                    />
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Organization Type</label>
                      <select 
                        name="orgType" 
                        value={formData.orgType} 
                        onChange={handleChange}
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }}
                      >
                        <option value="private">Private Equity / VC</option>
                        <option value="government">Government / Public Body</option>
                        <option value="dfi">Development Finance (DFI)</option>
                        <option value="ngo">NGO / Foundation</option>
                        <option value="cooperative">Agricultural Cooperative</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Primary Contact Person</label>
                      <input 
                        type="text" 
                        name="contactPerson" 
                        value={formData.contactPerson} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                        placeholder="E.g., Dr. Alice Smith"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                        placeholder="E.g., smith@edb.org"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Phone Number</label>
                      <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                        placeholder="E.g., +44 20 7946 0958"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Desired Partnership Area</label>
                    <select 
                      name="collaborationArea" 
                      value={formData.collaborationArea} 
                      onChange={handleChange}
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }}
                    >
                      <option value="infrastructure">Infrastructure &amp; Aviation BOT</option>
                      <option value="agriculture">Agricultural Sourcing &amp; Value Chains</option>
                      <option value="minerals">Critical Mineral Sourcing Agreements</option>
                      <option value="energy">Distributed Solar Micro-Grids</option>
                      <option value="carbon">Forestry &amp; Carbon Offsetting</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Detailed Proposal / Scope Summary</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows="4" 
                      required
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', resize: 'none' }} 
                      placeholder="Outline collaboration scope, financing models, or requested representation terms..."
                    />
                  </div>
                  
                  {errorMessage && (
                    <div style={{ color: '#e05c5c', background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.2)', padding: '12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={submitting}
                    style={{ width: '100%', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px', fontSize: '0.85rem', opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? 'Transmitting Proposal...' : 'Submit Strategic Proposal'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      {/* Trusted Partners Section */}
      <Reveal className="partners-marquee-section" delay={250}>
        <div className="partners-marquee-title-wrap">
          <div className="section-label">Our Trusted Partners</div>
          <h2>Collaborating with <em>Industry Leaders</em></h2>
        </div>

        <div className="partners-ticker-wrap">
          <div className="partners-ticker-track">
            {partners.map((partner, idx) => (
              <div key={idx} className="partner-logo-item">
                <img src={partner.img} alt={partner.name} />
                <span className="partner-logo-name">{partner.name}</span>
              </div>
            ))}
            {/* Duplicate for seamless looping */}
            {partners.map((partner, idx) => (
              <div key={`dup-${idx}`} className="partner-logo-item">
                <img src={partner.img} alt={partner.name} />
                <span className="partner-logo-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Partner;
