import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Effects';
import { Calendar, Clock, CreditCard, ChevronRight, CheckCircle, FileText } from 'lucide-react';

const Consult = () => {
  const { user, loginMock } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedService, setSelectedService] = useState('General Advisory');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [briefFile, setBriefFile] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Extract service from query parameter if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, [location]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time slot.');
      return;
    }
    setPaymentStep(true);
  };

  const handleCheckout = (gateway) => {
    setLoading(true);
    setTimeout(() => {
      // Create mock user session if not logged in to associate with booking
      if (!user) {
        loginMock('client_' + Math.random().toString(36).substr(2, 5) + '@afrinove.com', 'client');
      }
      setPaymentStep(false);
      setBookingSuccess(true);
      setLoading(false);
    }, 1500);
  };

  const timeSlots = [
    '09:00 AM - 10:00 AM EAT',
    '11:00 AM - 12:00 PM EAT',
    '02:00 PM - 03:00 PM EAT',
    '04:00 PM - 05:00 PM EAT'
  ];

  const dateSlots = [
    { label: 'Mon, Jul 13', value: '2026-07-13' },
    { label: 'Tue, Jul 14', value: '2026-07-14' },
    { label: 'Wed, Jul 15', value: '2026-07-15' },
    { label: 'Thu, Jul 16', value: '2026-07-16' },
    { label: 'Fri, Jul 17', value: '2026-07-17' },
  ];

  return (
    <div className="consult-page-wrapper" style={{ padding: '60px 24px', maxWidth: '850px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Advisory Scheduler</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Book an <em>Expert Consultation</em>
        </h1>
        <p style={{ color: 'var(--mist)', lineHeight: '1.7', marginBottom: '40px' }}>
          Schedule a direct virtual consultation session with one of Afrinove\'s senior strategic, infrastructure, or investment advisors to review project parameters or market entry proposals.
        </p>
      </Reveal>

      {bookingSuccess ? (
        <Reveal className="booking-success-card" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '40px', borderRadius: '4px', textAlign: 'center' }}>
          <CheckCircle size={56} style={{ color: 'var(--gold)', marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '12px' }}>Consultation Confirmed!</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '24px' }}>
            Your 60-minute diagnostic session on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been secured. An calendar invite with Google Meet coordinates and invoice receipts has been dispatched.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/portal')} className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
              Access Client Portal
            </button>
            <button onClick={() => { setBookingSuccess(false); setPaymentStep(false); }} className="btn-ghost" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer' }}>
              Book Another Session
            </button>
          </div>
        </Reveal>
      ) : paymentStep ? (
        <Reveal className="payment-step-card" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '40px', borderRadius: '4px' }}>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '20px' }}>
            Consultation Fee Checkout
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--mist)', marginBottom: '28px', lineHeight: '1.5' }}>
            A standard consultation fee of <strong>$150 USD</strong> (or local equivalent) applies for diagnostic and advisory project review sessions.
          </p>
          
          <div style={{ background: 'var(--ink)', padding: '24px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--mist)' }}>Service Category:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{selectedService}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--mist)' }}>Scheduled Time:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{selectedDate} @ {selectedTime.split(' ')[0]}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginTop: '16px' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Total Due:</span>
              <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1.1rem' }}>$150.00 USD</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => handleCheckout('flutterwave')}
              className="btn-primary" 
              style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', background: 'var(--gold)', color: 'var(--ink)' }}
              disabled={loading}
            >
              <CreditCard size={18} /> {loading ? 'Contacting Flutterwave Gateway...' : 'Pay with Mobile Money / Local Cards (Flutterwave)'}
            </button>
            
            <button 
              onClick={() => handleCheckout('stripe')}
              className="btn-secondary" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', color: 'var(--mist)' }}
              disabled={loading}
            >
              <CreditCard size={18} /> {loading ? 'Contacting Stripe API...' : 'Pay with International Cards (Stripe)'}
            </button>
            
            <button onClick={() => setPaymentStep(false)} style={{ background: 'none', border: 'none', color: 'var(--mist)', textDecoration: 'underline', cursor: 'pointer', marginTop: '10px', fontSize: '0.8rem' }}>
              Back to Details
            </button>
          </div>
        </Reveal>
      ) : (
        <Reveal className="booking-form-container" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '40px', borderRadius: '4px' }}>
          <form onSubmit={handleNextStep}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Select Service */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--mist)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Select Service Vertical</label>
                <select 
                  value={selectedService} 
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                >
                  <option value="General Advisory">General Advisory &amp; Ventures</option>
                  <option value="PPP Structuring">Public-Private Partnership Structuring</option>
                  <option value="Infrastructure Development">Infrastructure &amp; Aviation BOT</option>
                  <option value="Critical Minerals Trading">Minerals &amp; Mining Procurement</option>
                  <option value="Petroleum &amp; Energy">Petroleum &amp; Energy Advisory</option>
                </select>
              </div>

              {/* Select Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--mist)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. Choose Date</label>
                <div className="calendar-days-grid">
                  {dateSlots.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      style={{ 
                        padding: '12px 8px', 
                        background: selectedDate === d.value ? 'var(--gold)' : 'var(--ink)', 
                        border: `1px solid ${selectedDate === d.value ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, 
                        color: selectedDate === d.value ? 'var(--ink)' : '#fff',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: selectedDate === d.value ? 600 : 400,
                        transition: 'all 0.2s'
                      }}
                    >
                      {d.label.split(', ')[0]}<br />{d.label.split(', ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--mist)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. Select Time Slot (East Africa Time)</label>
                <div className="form-grid-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      style={{ 
                        padding: '12px', 
                        background: selectedTime === t ? 'var(--gold)' : 'var(--ink)', 
                        border: `1px solid ${selectedTime === t ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, 
                        color: selectedTime === t ? 'var(--ink)' : '#fff',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Clock size={14} />
                      {t.replace(' EAT', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Document / File */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--mist)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>4. Upload Project Brief / Agenda (Optional)</label>
                <div style={{ border: '1px dashed rgba(201,168,76,0.3)', padding: '24px', borderRadius: '4px', textAlign: 'center', background: 'var(--ink)' }}>
                  <FileText size={32} style={{ color: 'var(--gold)', opacity: 0.7, marginBottom: '8px' }} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--mist)', marginBottom: '12px' }}>Upload feasibility reports, RFP coordinates, or partnership briefs.</p>
                  <input 
                    type="file" 
                    onChange={(e) => setBriefFile(e.target.files[0])}
                    style={{ fontSize: '0.75rem', color: 'var(--mist)' }}
                  />
                  {briefFile && <p style={{ fontSize: '0.8rem', color: 'var(--gold)', marginTop: '8px' }}>File Attached: {briefFile.name}</p>}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px', fontSize: '0.85rem' }}
              >
                Proceed to Checkout
                <ChevronRight size={16} />
              </button>

            </div>
          </form>
        </Reveal>
      )}
    </div>
  );
};

export default Consult;
