import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Effects';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle, FileText, User, Mail, Lock, Phone, Building, ArrowRight } from 'lucide-react';

const Consult = () => {
  const { user, registerUser, loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Consultation state
  const [selectedService, setSelectedService] = useState('General Advisory');
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(6); // 0-indexed: 6 = July
  const [selectedDay, setSelectedDay] = useState(21);
  const [selectedTime, setSelectedTime] = useState('09:00 AM - 10:00 AM EAT');
  const [briefFile, setBriefFile] = useState(null);

  // User details & Auth modal step
  const [showAuthStep, setShowAuthStep] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'login'
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Extract service from query param if provided
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, [location]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setClientName(user.displayName || '');
      setClientEmail(user.email || '');
      setClientPhone(user.phone || '');
      setClientCompany(user.company || '');
    }
  }, [user]);

  // Months list
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get starting day of month (0 = Sun, 1 = Mon...)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formattedSelectedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const timeSlots = [
    '09:00 AM - 10:00 AM EAT',
    '11:00 AM - 12:00 PM EAT',
    '02:00 PM - 03:00 PM EAT',
    '04:00 PM - 05:00 PM EAT'
  ];

  const handleProceedToAccount = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedTime) {
      alert('Please choose a valid date and time slot for your appointment.');
      return;
    }
    setShowAuthStep(true);
  };

  const handleCompleteBooking = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!clientEmail) {
      setErrorMessage('Please enter your authorized email address.');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'signup') {
        if (!clientName || !clientPhone || !clientPassword) {
          setErrorMessage('Please complete all required signup fields.');
          setLoading(false);
          return;
        }

        await registerUser({
          name: clientName,
          email: clientEmail,
          password: clientPassword,
          phone: clientPhone,
          company: clientCompany,
          role: 'client',
          briefFile: briefFile,
          bookingDetails: {
            selectedService,
            selectedDate: formattedSelectedDate,
            selectedTime
          }
        });
      } else {
        const res = loginUser(clientEmail, clientPassword, 'client');
        if (!res.success) {
          setErrorMessage('Invalid credentials. Please check your email and password.');
          setLoading(false);
          return;
        }
      }

      // Redirect directly to Client Dashboard to pay assigned fee
      navigate('/portal');
    } catch (err) {
      setErrorMessage('Account registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render Calendar Grid Days
  const daysInCurrentMonth = getDaysInMonth(selectedYear, selectedMonth);
  const startDayOffset = getFirstDayOfMonth(selectedYear, selectedMonth);
  const calendarCells = [];

  // Blank offset cells
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(<div key={`blank-${i}`} style={{ height: '40px' }} />);
  }

  // Active day cells
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const isSelected = selectedDay === d;
    calendarCells.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => setSelectedDay(d)}
        style={{
          height: '40px',
          background: isSelected ? 'var(--gold)' : 'var(--ink)',
          border: `1px solid ${isSelected ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
          color: isSelected ? 'var(--ink)' : '#fff',
          fontWeight: isSelected ? 700 : 400,
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          transition: 'all 0.2s ease'
        }}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="consult-page-wrapper" style={{ padding: '60px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Advisory Scheduler</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Book an <em>Expert Consultation</em>
        </h1>
        <p style={{ color: 'var(--mist)', lineHeight: '1.7', marginBottom: '40px' }}>
          Schedule a direct virtual consultation session with one of Afrinove's senior strategic, infrastructure, or investment advisors to review project parameters or market entry proposals.
        </p>
      </Reveal>

      {!showAuthStep ? (
        /* STEP 1: DATE, MONTH, YEAR CALENDAR & TIME SELECTOR */
        <Reveal className="booking-form-container" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.15)', padding: '40px', borderRadius: '4px' }}>
          <form onSubmit={handleProceedToAccount}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Service Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  1. Select Service Vertical
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', color: '#fff', borderRadius: '4px', fontSize: '0.95rem' }}
                >
                  <option value="General Advisory">General Advisory &amp; Ventures</option>
                  <option value="PPP Structuring">Public-Private Partnership (PPP) Structuring</option>
                  <option value="Infrastructure Development">Infrastructure &amp; Aviation BOT Projects</option>
                  <option value="Critical Minerals Trading">Minerals &amp; Mining Procurement</option>
                  <option value="Petroleum & Energy">Petroleum &amp; Energy Advisory</option>
                </select>
              </div>

              {/* Exact Date (Year, Month, Day) Interactive Calendar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CalendarIcon size={16} /> 2. Choose Exact Appointment Date
                  </label>
                  <span style={{ fontSize: '0.85rem', color: 'var(--white)', background: 'rgba(201, 168, 76, 0.1)', padding: '4px 12px', borderRadius: '4px', border: '1px solid rgba(201,168,76,0.3)' }}>
                    Selected: <strong>{formattedSelectedDate}</strong>
                  </span>
                </div>

                {/* Month & Year Navigation Header */}
                <div style={{ background: 'var(--ink)', padding: '16px', borderRadius: '4px 4px 0 0', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button type="button" onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                    <ChevronLeft size={20} />
                  </button>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                      style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }}
                    >
                      {monthsList.map((m, idx) => (
                        <option key={m} value={idx}>{m}</option>
                      ))}
                    </select>

                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                      style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }}
                    >
                      <option value={2026}>2026</option>
                      <option value={2027}>2027</option>
                      <option value={2028}>2028</option>
                    </select>
                  </div>

                  <button type="button" onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Calendar Days Grid */}
                <div style={{ background: 'var(--ink)', padding: '16px', borderRadius: '0 0 4px 4px', border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--mist)', fontWeight: 600 }}>
                    <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                    {calendarCells}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  3. Select Preferred Time Slot (East Africa Time - EAT)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      style={{
                        padding: '14px',
                        background: selectedTime === t ? 'var(--gold)' : 'var(--ink)',
                        border: `1px solid ${selectedTime === t ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                        color: selectedTime === t ? 'var(--ink)' : '#fff',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: selectedTime === t ? 600 : 400,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Clock size={16} />
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Initial Project Brief */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  4. Upload Initial Project Brief / RFP Coordinates (Optional)
                </label>
                <div style={{ border: '1px dashed rgba(201,168,76,0.3)', padding: '28px', borderRadius: '4px', textAlign: 'center', background: 'var(--ink)' }}>
                  <FileText size={36} style={{ color: 'var(--gold)', opacity: 0.8, marginBottom: '10px' }} />
                  <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginBottom: '12px' }}>
                    Upload feasibility reports, corporate presentation decks, or project RFP terms. Admin will review this brief to assess custom fee discounts!
                  </p>
                  <input
                    type="file"
                    onChange={(e) => setBriefFile(e.target.files[0])}
                    style={{ fontSize: '0.8rem', color: 'var(--mist)' }}
                  />
                  {briefFile && <p style={{ fontSize: '0.85rem', color: 'var(--gold)', marginTop: '10px', fontWeight: 600 }}>File Attached: {briefFile.name}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px', fontSize: '0.95rem', background: 'var(--gold)', color: 'var(--ink)' }}
              >
                Proceed to Client Signup &amp; Portal
                <ArrowRight size={18} />
              </button>

            </div>
          </form>
        </Reveal>
      ) : (
        /* STEP 2: USER SIGNUP / LOGIN PANEL */
        <Reveal className="account-panel-container" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '40px', borderRadius: '4px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Required User Access</span>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--ff-head)', color: '#fff', marginTop: '6px' }}>
              {authMode === 'signup' ? 'Create Client Account' : 'Log In to Client Portal'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginTop: '8px' }}>
              To complete your advisory reservation date <strong>({formattedSelectedDate})</strong> and access your Client Dashboard to review assigned fees, please {authMode === 'signup' ? 'create your account' : 'log in'} below.
            </p>

            {/* Auth Mode Switcher */}
            <div style={{ display: 'inline-flex', background: 'var(--ink)', padding: '4px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                style={{ padding: '8px 20px', background: authMode === 'signup' ? 'var(--gold)' : 'transparent', color: authMode === 'signup' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              >
                New Client Sign Up
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                style={{ padding: '8px 20px', background: authMode === 'login' ? 'var(--gold)' : 'transparent', color: authMode === 'login' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              >
                Existing Client Login
              </button>
            </div>
          </div>

          {errorMessage && (
            <div style={{ color: '#e05c5c', background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.2)', padding: '14px', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleCompleteBooking}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {authMode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Full Name *</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                      placeholder="E.g., Dr. Alice Smith"
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                    placeholder="E.g., alice@enterprise.org"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Account Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
                  <input
                    type="password"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    required
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                    placeholder="Set your portal password"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Phone Number *</label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
                        <input
                          type="text"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          required
                          style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                          placeholder="+256 700 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Organization / Enterprise</label>
                      <div style={{ position: 'relative' }}>
                        <Building size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
                        <input
                          type="text"
                          value={clientCompany}
                          onChange={(e) => setClientCompany(e.target.value)}
                          style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                          placeholder="East Africa Ventures"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ width: '100%', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', padding: '14px', marginTop: '10px', fontSize: '0.9rem', background: 'var(--gold)', color: 'var(--ink)', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Creating Account & Syncing to Outlook DB...' : (authMode === 'signup' ? 'Complete Sign Up & Go to Dashboard' : 'Login to Dashboard')}
              </button>

              <button
                type="button"
                onClick={() => setShowAuthStep(false)}
                style={{ background: 'none', border: 'none', color: 'var(--mist)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'center', marginTop: '8px' }}
              >
                Back to Date &amp; Time Picker
              </button>

            </div>
          </form>
        </Reveal>
      )}
    </div>
  );
};

export default Consult;
