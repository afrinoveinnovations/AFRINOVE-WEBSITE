import React, { useState } from 'react';
import { Reveal } from '../components/Effects';
import { MessageSquare, Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectScope: 'general',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lead Captured (Sync to CRM):', formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Contact Desk</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Start a <em>Conversation</em>
        </h1>
        <p style={{ color: 'var(--mist)', maxWidth: '700px', lineHeight: '1.7', marginBottom: '48px' }}>
          Connect directly with Afrinove\'s strategic advisors. Submit a detailed inquiry, send project coordinates, or reach out directly via our WhatsApp Business lines.
        </p>
      </Reveal>

      <div className="contact-grid">
        {/* Left Column: Office Coordinates & Direct Links */}
        <div>
          <Reveal className="contact-info-column" delay={150}>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '24px' }}>Office Coordinates</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--gold)', marginTop: '4px' }}><MapPin size={20} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>Headquarters</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--mist)', lineHeight: '1.5' }}>
                    Kikoni Makerere, Sir Apollo Kagwa Road<br />
                    Kampala, Uganda<br />
                    P.O. Box 187837
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--gold)', marginTop: '4px' }}><Mail size={20} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>Electronic Mail</h4>
                  <a href="mailto:info@afrinove.com" style={{ fontSize: '0.875rem', color: 'var(--gold)', textDecoration: 'none' }}>info@afrinove.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: 'var(--gold)', marginTop: '4px' }}><Phone size={20} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>Telephone Contacts</h4>
                  <a href="tel:+256759738401" style={{ fontSize: '0.875rem', color: 'var(--mist)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>+256 759 738 401</a>
                  <a href="tel:+256703096911" style={{ fontSize: '0.875rem', color: 'var(--mist)', textDecoration: 'none', display: 'block' }}>+256 703 096 911</a>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)', padding: '24px', borderRadius: '4px' }}>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} style={{ color: 'var(--gold)' }} /> WhatsApp Business Desk
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--mist)', lineHeight: '1.5', marginBottom: '16px' }}>
                Need rapid advice on transaction structuring or mineral freight movements? Connect directly with operations desk via instant messaging.
              </p>
              <a 
                href="https://wa.me/256759738401" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', background: '#25D366', color: '#fff' }}
              >
                Launch Chat Session
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: CRM Lead capture form */}
        <div>
          <Reveal className="lead-form-container" delay={200} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '40px', borderRadius: '4px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={48} style={{ color: 'var(--gold)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '12px' }}>Inquiry Received Successfully</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Your proposal coordinates have been recorded in our client database. An advisory representative will follow up via email or scheduled call shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer', padding: '10px 20px' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '24px' }}>Project Inquiry Desk</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-grid-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Your Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                        placeholder="E.g., David Okello"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Organization / Company</label>
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                        placeholder="E.g., Nile Ventures Ltd"
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
                        placeholder="E.g., okello@nile.ug"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Telephone Number</label>
                      <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }} 
                        placeholder="E.g., +256 703 000 000"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Project Vertical</label>
                    <select 
                      name="projectScope" 
                      value={formData.projectScope} 
                      onChange={handleChange}
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px' }}
                    >
                      <option value="general">Strategic &amp; Corporate Advisory</option>
                      <option value="infrastructure">Infrastructure &amp; Aviation Development</option>
                      <option value="minerals">Minerals &amp; Mining Trading</option>
                      <option value="energy">Petroleum &amp; Alternative Energy</option>
                      <option value="digital">Digital Transformation Systems</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Scope Details / Collaboration Message</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows="4" 
                      required
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', resize: 'none' }} 
                      placeholder="Detail your request, project milestones, or specific consultation requirements..."
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}>
                    Submit Vetted Enquiry
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
