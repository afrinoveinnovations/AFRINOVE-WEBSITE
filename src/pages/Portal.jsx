import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Effects';
import { 
  upcomingProjectsData, 
  marketReportsData, 
  investorPacksData 
} from '../data/portalData';
import { 
  Lock, Unlock, User, Mail, ShieldAlert, CheckCircle, 
  Upload, Folder, Plus, ArrowRight, MessageSquare, 
  FileDown, RefreshCw, CreditCard, Clock, Sun, Settings, 
  Download, Layers, Briefcase, FileText, AlertCircle, Phone, Building, Check 
} from 'lucide-react';

const Portal = () => {
  const { 
    user, 
    usersList, 
    clientFees, 
    paymentRecords, 
    uploadedFiles, 
    chatLogs, 
    dailySessions, 
    adminDayStarted, 
    loginUser, 
    registerUser, 
    logoutUser, 
    updateClientFee, 
    processPayment, 
    startAdminDay, 
    toggleClientSession, 
    uploadClientFile, 
    sendChatMessage 
  } = useAuth();

  // Auth form state
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('client');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Client Dashboard state
  const [activeTab, setActiveTab] = useState('files'); // 'files' | 'chat' | 'projects' | 'reports' | 'investor'
  const [newFileName, setNewFileName] = useState('');
  const [selectedUploadFile, setSelectedUploadFile] = useState(null);
  const [chatInput, setChatInput] = useState('');

  // Payment Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState('flutterwave');
  const [paymentPhone, setPaymentPhone] = useState('+256 770 123 456');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);

  // Admin state
  const [editingFeeEmail, setEditingFeeEmail] = useState('');
  const [customFeeInput, setCustomFeeInput] = useState('');
  const [selectedAdminClient, setSelectedAdminClient] = useState(null);

  const cleanUserEmail = user ? user.email.toLowerCase().trim() : '';
  const currentPayment = paymentRecords[cleanUserEmail] || { status: 'pending', amount: 150 };
  const currentFee = clientFees[cleanUserEmail] || 150;
  const isPaid = currentPayment.status === 'paid' || user?.paymentStatus === 'paid' || user?.role === 'admin';
  const currentSession = dailySessions[cleanUserEmail] || { secondsLeft: 3600, active: false, locked: false };
  const userFiles = uploadedFiles[cleanUserEmail] || [];
  const userChat = chatLogs[cleanUserEmail] || [];

  // Format countdown timer (MM:SS)
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Auth Submit Handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!email) return;

    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        await registerUser({
          email,
          password: password || 'client123',
          name: name || email.split('@')[0],
          phone: phone || '+256 700 000 000',
          company: company || 'N/A',
          role
        });
      } else {
        const res = loginUser(email, password, role);
        if (!res.success) {
          setAuthError('Authentication failed. Please verify email and password.');
        }
      }
    } catch (err) {
      setAuthError('System authorization error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo Logins
  const handleQuickLogin = (demoEmail, demoRole) => {
    loginUser(demoEmail, demoEmail.includes('admin') ? 'admin123' : 'client123', demoRole);
  };

  // Payment Execution Handler
  const handleExecutePayment = (e) => {
    e.preventDefault();
    setPaymentProcessing(true);

    setTimeout(() => {
      const res = processPayment(cleanUserEmail, selectedGateway, currentFee);
      setPaymentProcessing(false);
      setShowPaymentModal(false);
      setPaymentSuccessData(res);
    }, 2000);
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!selectedUploadFile && !newFileName) return;
    const fileToUpload = selectedUploadFile || newFileName;
    uploadClientFile(cleanUserEmail, fileToUpload);
    setNewFileName('');
    setSelectedUploadFile(null);
  };

  // Send Chat Handler
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(cleanUserEmail, chatInput.trim(), user?.role === 'admin' ? 'advisor' : 'client');
    setChatInput('');
  };

  // Admin Update Fee
  const handleAdminUpdateFee = (clientEmail) => {
    if (!customFeeInput) return;
    updateClientFee(clientEmail, customFeeInput);
    setEditingFeeEmail('');
    setCustomFeeInput('');
  };

  return (
    <div className="portal-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      
      {!user ? (
        /* ================= AUTHENTICATION / LOGIN / SIGNUP PANEL ================= */
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '65vh' }}>
          <Reveal className="login-card-wrapper" delay={100} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.2)', padding: '40px', borderRadius: '4px', width: '100%', maxWidth: '480px' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <Lock size={40} style={{ color: 'var(--gold)', marginBottom: '10px' }} />
              <h2 style={{ fontSize: '1.9rem', fontFamily: 'var(--ff-head)', color: '#fff' }}>Afrinove Client Portal</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginTop: '6px' }}>Secure login &amp; registration for clients, investors, and administrators.</p>

              {/* Mode Selector */}
              <div style={{ display: 'inline-flex', background: 'var(--ink)', padding: '4px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', marginTop: '16px' }}>
                <button 
                  type="button"
                  onClick={() => setAuthMode('login')} 
                  style={{ padding: '8px 20px', background: authMode === 'login' ? 'var(--gold)' : 'transparent', color: authMode === 'login' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  Log In
                </button>
                <button 
                  type="button"
                  onClick={() => setAuthMode('signup')} 
                  style={{ padding: '8px 20px', background: authMode === 'signup' ? 'var(--gold)' : 'transparent', color: authMode === 'signup' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  Create Account
                </button>
              </div>
            </div>

            {authError && (
              <div style={{ color: '#e05c5c', background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.2)', padding: '12px', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '16px', textAlign: 'center' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {authMode === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }} 
                      placeholder="Dr. Alice Smith"
                    />
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Authorized Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--mist)' }} />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 12px 12px 38px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }} 
                      placeholder="client@enterprise.com"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }} 
                    placeholder="Enter password"
                  />
                </div>

                {authMode === 'signup' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Phone Number</label>
                        <input 
                          type="text" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }} 
                          placeholder="+256 700 000 000"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Company</label>
                        <input 
                          type="text" 
                          value={company} 
                          onChange={(e) => setCompany(e.target.value)} 
                          style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }} 
                          placeholder="East Africa Ventures"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Account Role</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                  >
                    <option value="client">Corporate Client (Project Advisory)</option>
                    <option value="investor">Institutional Investor (VDR Access)</option>
                    <option value="admin">Afrinove Administrator (Center Stage)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px', background: 'var(--gold)', color: 'var(--ink)' }}
                disabled={isLoading}
              >
                {isLoading ? 'Decrypting Session...' : (authMode === 'signup' ? 'Create Account & Access Portal' : 'Authenticate Workspace')}
                <ArrowRight size={16} />
              </button>
            </form>
            
            {/* Quick Demo Credentials */}
            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--mist)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px', textAlign: 'center' }}>
                Quick Preset Logins for Testing
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button 
                  onClick={() => handleQuickLogin('client@afrinove.com', 'client')}
                  style={{ background: 'rgba(201, 168, 76, 0.1)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Client Portal Login
                </button>
                <button 
                  onClick={() => handleQuickLogin('admin@afrinove.com', 'admin')}
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Admin Center Stage
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      ) : user.role === 'admin' ? (
        /* ================= ADMIN CENTER STAGE CONTROL CENTER ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', paddingBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Settings size={16} /> Administrator Control Center (Center Stage)
              </span>
              <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--ff-head)', color: '#fff', marginTop: '4px' }}>
                System Master Oversight
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={startAdminDay} 
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--gold)', color: 'var(--ink)', padding: '10px 18px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                <Sun size={18} /> Start the Day (Unlock Daily 1hr Sessions)
              </button>
              <button onClick={logoutUser} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '0.8rem' }}>
                Exit Admin Panel
              </button>
            </div>
          </div>

          {/* Admin Status Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>Total Registered Clients</span>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginTop: '4px' }}>{usersList.filter(u => u.role !== 'admin').length}</h3>
            </div>
            <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.3)', padding: '20px', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>Daily Session Status</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--gold)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} /> {adminDayStarted ? 'Day Active (Unlocked)' : 'Day Locked'}
              </h3>
            </div>
            <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>Outlook Database Sync</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '4px' }}>afrinove@outlook.com</h3>
            </div>
          </div>

          {/* Master Client Roster & Fee Customizer Table */}
          <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.2)', padding: '28px', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '20px' }}>
              Master Visitor &amp; Client Account Roster
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--mist)', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    <th style={{ padding: '12px' }}>Client / Email</th>
                    <th style={{ padding: '12px' }}>Organization &amp; Phone</th>
                    <th style={{ padding: '12px' }}>Assigned Fee</th>
                    <th style={{ padding: '12px' }}>Payment Status</th>
                    <th style={{ padding: '12px' }}>Daily 1hr Session</th>
                    <th style={{ padding: '12px' }}>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.filter(u => u.role !== 'admin').map((client) => {
                    const cEmail = client.email.toLowerCase().trim();
                    const cPayment = paymentRecords[cEmail] || { status: 'pending' };
                    const cFee = clientFees[cEmail] || 150;
                    const cSession = dailySessions[cEmail] || { secondsLeft: 3600, locked: false };

                    return (
                      <tr key={client.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '16px 12px' }}>
                          <strong style={{ color: '#fff', display: 'block' }}>{client.displayName}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>{client.email}</span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <div style={{ color: '#fff' }}>{client.company || 'N/A'}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>{client.phone}</span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          {editingFeeEmail === cEmail ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <input 
                                type="number" 
                                value={customFeeInput} 
                                onChange={(e) => setCustomFeeInput(e.target.value)} 
                                style={{ width: '80px', background: 'var(--ink)', border: '1px solid var(--gold)', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}
                                placeholder="Fee $"
                              />
                              <button onClick={() => handleAdminUpdateFee(cEmail)} style={{ background: 'var(--gold)', border: 'none', color: 'var(--ink)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}>Save</button>
                            </div>
                          ) : (
                            <div>
                              <strong style={{ color: 'var(--gold)', fontSize: '1rem' }}>${cFee} USD</strong>
                              <button onClick={() => { setEditingFeeEmail(cEmail); setCustomFeeInput(cFee); }} style={{ background: 'none', border: 'none', color: 'var(--mist)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.7rem', display: 'block' }}>
                                Edit Custom Fee
                              </button>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          {cPayment.status === 'paid' ? (
                            <span style={{ background: 'rgba(201, 168, 76, 0.15)', color: 'var(--gold)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)', fontWeight: 600, fontSize: '0.75rem' }}>
                              ✓ PAID (${cPayment.amount} USD)
                            </span>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ background: 'rgba(224,92,92,0.15)', color: '#e05c5c', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(224,92,92,0.3)', fontWeight: 600, fontSize: '0.75rem', width: 'fit-content' }}>
                                PENDING (${cFee} USD)
                              </span>
                              <button onClick={() => processPayment(cEmail, 'manual_admin', cFee)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.7rem', textDecoration: 'underline', textAlign: 'left' }}>
                                Force Mark Paid
                              </button>
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <span style={{ color: cSession.locked ? '#e05c5c' : '#fff', fontWeight: 500 }}>
                            {formatTimer(cSession.secondsLeft)} remaining
                          </span>
                          <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--mist)' }}>
                            {cSession.locked ? 'Locked (Limit Hit)' : (cSession.active ? 'Session Active' : 'Session Ready')}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <button 
                            onClick={() => setSelectedAdminClient(client)}
                            style={{ background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                          >
                            Inspect Brief &amp; Chat
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Client File & Chat Supervision Modal / Panel */}
          {selectedAdminClient && (
            <div style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '24px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h4 style={{ color: 'var(--gold)', fontSize: '1.2rem', fontFamily: 'var(--ff-head)' }}>
                  Supervising Workspace: {selectedAdminClient.displayName} ({selectedAdminClient.email})
                </h4>
                <button onClick={() => setSelectedAdminClient(null)} style={{ background: 'none', border: 'none', color: 'var(--mist)', cursor: 'pointer' }}>Close Supervision</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Files */}
                <div>
                  <h5 style={{ color: '#fff', marginBottom: '12px' }}>Uploaded Documents</h5>
                  {(uploadedFiles[selectedAdminClient.email.toLowerCase()] || []).map((f, idx) => (
                    <div key={idx} style={{ background: 'var(--ink)', padding: '10px', borderRadius: '4px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#fff' }}>
                      {f.name} ({f.size}) - <span style={{ color: 'var(--gold)' }}>{f.status}</span>
                    </div>
                  ))}
                  {(uploadedFiles[selectedAdminClient.email.toLowerCase()] || []).length === 0 && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>No client files uploaded yet.</p>
                  )}
                </div>

                {/* Live Chat Direct Response */}
                <div>
                  <h5 style={{ color: '#fff', marginBottom: '12px' }}>Direct Expert Chat Log</h5>
                  <div style={{ height: '200px', overflowY: 'auto', background: 'var(--ink)', padding: '12px', borderRadius: '4px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {(chatLogs[selectedAdminClient.email.toLowerCase()] || []).map((msg, idx) => (
                      <div key={idx} style={{ marginBottom: '8px', fontSize: '0.8rem', color: msg.sender === 'advisor' ? 'var(--gold)' : '#fff' }}>
                        <strong>{msg.sender === 'advisor' ? 'Admin' : 'Client'}:</strong> {msg.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatInput.trim()) return;
                    sendChatMessage(selectedAdminClient.email, chatInput.trim(), 'advisor');
                    setChatInput('');
                  }} style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      value={chatInput} 
                      onChange={(e) => setChatInput(e.target.value)} 
                      placeholder="Type admin response..." 
                      style={{ flex: 1, background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '0.8rem' }}
                    />
                    <button type="submit" style={{ background: 'var(--gold)', color: 'var(--ink)', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>Send</button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* ================= CLIENT / INVESTOR DASHBOARD VIEW ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                {user.role === 'investor' ? 'Institutional Investor VDR Portal' : 'Corporate Client Advisory Workspace'}
              </span>
              <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--ff-head)', color: '#fff', marginTop: '4px' }}>
                Welcome back, {user.displayName}
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--mist)' }}>Account: <strong>{user.email}</strong></span>
              <button onClick={logoutUser} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>Logout</button>
            </div>
          </div>

          {/* PAYMENT REQUIRED BANNER (If status is UNPAID / PENDING) */}
          {!isPaid ? (
            <Reveal className="payment-required-card" delay={100} style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '36px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <AlertCircle size={28} style={{ color: 'var(--gold)' }} />
                    <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: '#fff' }}>Consultation Fee Payment Required</h3>
                  </div>
                  <p style={{ color: 'var(--mist)', lineHeight: '1.6', fontSize: '0.9rem', marginBottom: '20px' }}>
                    To unlock your interactive advisor chat, file exchange room, market reports, and investor packs, please complete the payment for your assigned advisory consultation fee.
                  </p>
                  
                  <div style={{ background: 'var(--ink)', padding: '20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--mist)' }}>Standard Fee Rate:</span>
                      <span style={{ color: '#fff' }}>$150.00 USD</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--mist)' }}>Admin Assigned Rate:</span>
                      <span style={{ color: 'var(--gold)', fontWeight: 600 }}>${currentFee}.00 USD</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '12px', fontWeight: 700, fontSize: '1.1rem' }}>
                      <span style={{ color: '#fff' }}>Total Amount Payable:</span>
                      <span style={{ color: 'var(--gold)' }}>${currentFee}.00 USD</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Trigger Button */}
                <div style={{ background: 'var(--ink)', padding: '28px', borderRadius: '4px', border: '1px solid rgba(201,168,76,0.3)', width: '100%', maxWidth: '360px', textAlign: 'center' }}>
                  <CreditCard size={40} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
                  <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>Proceed to Payment</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--mist)', marginBottom: '20px' }}>
                    Pay via Flutterwave (Mobile Money / Local Cards) or Stripe (International Credit Cards).
                  </p>
                  <button 
                    onClick={() => setShowPaymentModal(true)} 
                    className="btn-primary" 
                    style={{ width: '100%', border: 'none', cursor: 'pointer', padding: '14px', background: 'var(--gold)', color: 'var(--ink)', fontWeight: 700, fontSize: '0.9rem' }}
                  >
                    Pay ${currentFee}.00 USD Now
                  </button>
                </div>
              </div>
            </Reveal>
          ) : (
            /* PAYMENT SUCCESS CONFIRMATION RECEIPT */
            <div style={{ background: 'rgba(201, 168, 76, 0.08)', border: '1px solid rgba(201, 168, 76, 0.3)', padding: '16px 24px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={24} style={{ color: 'var(--gold)' }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>Advisory Consultation Unlocked &amp; Paid</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>
                    Txn ID: {currentPayment.txnId || 'AFR-FLW-892103'} | Gateway: {currentPayment.gateway ? currentPayment.gateway.toUpperCase() : 'FLUTTERWAVE'} | Amount: ${currentFee}.00 USD
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase' }}>
                ALL PANELS UNLOCKED
              </span>
            </div>
          )}

          {/* DASHBOARD NAVIGATION TABS */}
          <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', overflowX: 'auto' }}>
            <button 
              onClick={() => setActiveTab('files')}
              style={{ padding: '10px 20px', background: activeTab === 'files' ? 'var(--gold)' : 'var(--ink-2)', color: activeTab === 'files' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Folder size={16} /> 1. Upload &amp; Exchange Files
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              style={{ padding: '10px 20px', background: activeTab === 'chat' ? 'var(--gold)' : 'var(--ink-2)', color: activeTab === 'chat' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageSquare size={16} /> 2. Online Expert Chat (1hr Daily)
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              style={{ padding: '10px 20px', background: activeTab === 'projects' ? 'var(--gold)' : 'var(--ink-2)', color: activeTab === 'projects' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Briefcase size={16} /> 3. Upcoming Projects
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              style={{ padding: '10px 20px', background: activeTab === 'reports' ? 'var(--gold)' : 'var(--ink-2)', color: activeTab === 'reports' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FileText size={16} /> 4. Market Reports
            </button>
            <button 
              onClick={() => setActiveTab('investor')}
              style={{ padding: '10px 20px', background: activeTab === 'investor' ? 'var(--gold)' : 'var(--ink-2)', color: activeTab === 'investor' ? 'var(--ink)' : 'var(--mist)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Layers size={16} /> 5. Investor Packs &amp; VDR
            </button>
          </div>

          {/* TAB 1: UPLOAD MORE FILES */}
          {activeTab === 'files' && (
            <div style={{ opacity: isPaid ? 1 : 0.4, pointerEvents: isPaid ? 'auto' : 'none' }}>
              <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.15)', padding: '32px', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Folder size={22} /> Document Exchange &amp; Brief File Vault
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginBottom: '24px' }}>
                  Upload additional project specifications, financial audits, or legal framework briefs directly to Afrinove's senior advisory team.
                </p>

                <form onSubmit={handleFileUpload} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  <input 
                    type="file" 
                    onChange={(e) => setSelectedUploadFile(e.target.files[0])}
                    style={{ flex: 1, background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px', background: 'var(--gold)', color: 'var(--ink)' }}>
                    Upload File
                    <Upload size={16} />
                  </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {userFiles.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '4px' }}>
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '4px' }}>{file.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>Size: {file.size} | Uploaded: {file.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,168,76,0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(201,168,76,0.2)' }}>
                          {file.status}
                        </span>
                        <button onClick={() => alert(`Downloading ${file.name}`)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                          <FileDown size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {userFiles.length === 0 && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--mist)', textAlign: 'center', padding: '20px' }}>No files uploaded yet. Select a file above to upload.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ONLINE EXPERT CHAT (1-HOUR DAILY ALLOWANCE ENGINE) */}
          {activeTab === 'chat' && (
            <div style={{ opacity: isPaid ? 1 : 0.4, pointerEvents: isPaid ? 'auto' : 'none' }}>
              <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.15)', padding: '32px', borderRadius: '4px' }}>
                
                {/* 1-Hour Daily Session Timer Controls Header */}
                <div style={{ background: 'var(--ink)', padding: '20px', borderRadius: '4px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} /> Daily Interactive Session Allowance (1 Hour / Day)
                    </span>
                    <h3 style={{ fontSize: '1.6rem', color: '#fff', marginTop: '4px', fontFamily: 'monospace' }}>
                      {formatTimer(currentSession.secondsLeft)} remaining
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {currentSession.locked || !adminDayStarted ? (
                      <span style={{ background: 'rgba(224,92,92,0.15)', color: '#e05c5c', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(224,92,92,0.3)', fontSize: '0.8rem', fontWeight: 600 }}>
                        Session Locked (Resumes tomorrow morning when Admin opens the day)
                      </span>
                    ) : currentSession.active ? (
                      <button 
                        onClick={() => toggleClientSession(cleanUserEmail, false)} 
                        style={{ background: 'rgba(224,92,92,0.2)', border: '1px solid #e05c5c', color: '#e05c5c', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                      >
                        Pause Session Countdown
                      </button>
                    ) : (
                      <button 
                        onClick={() => toggleClientSession(cleanUserEmail, true)} 
                        style={{ background: 'var(--gold)', border: 'none', color: 'var(--ink)', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
                      >
                        Start / Resume Today's 1-Hour Session
                      </button>
                    )}
                  </div>
                </div>

                {/* Chat Log Window */}
                <div style={{ height: '350px', overflowY: 'auto', background: 'var(--ink)', padding: '20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {userChat.map((msg, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        alignSelf: msg.sender === 'client' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        background: msg.sender === 'client' ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                        color: msg.sender === 'client' ? 'var(--ink)' : '#fff',
                        padding: '12px 16px',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.7rem', opacity: 0.8, marginBottom: '4px' }}>
                        {msg.sender === 'client' ? 'You (Client)' : 'Afrinove Senior Advisor'}
                      </div>
                      <p>{msg.text}</p>
                      <div style={{ fontSize: '0.65rem', textAlign: 'right', opacity: 0.6, marginTop: '4px' }}>{msg.time}</div>
                    </div>
                  ))}
                  {userChat.length === 0 && (
                    <p style={{ color: 'var(--mist)', textAlign: 'center', margin: 'auto', fontSize: '0.85rem' }}>
                      No chat messages yet. Start your session and type a message to consult live with Afrinove experts.
                    </p>
                  )}
                </div>

                {/* Chat Message Input */}
                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    disabled={currentSession.locked || !adminDayStarted}
                    placeholder={currentSession.locked || !adminDayStarted ? "Session locked until Admin starts the day tomorrow morning..." : "Type message directly to senior advisors..."}
                    style={{ flex: 1, background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                  <button 
                    type="submit" 
                    disabled={currentSession.locked || !adminDayStarted}
                    className="btn-primary" 
                    style={{ border: 'none', cursor: (currentSession.locked || !adminDayStarted) ? 'not-allowed' : 'pointer', padding: '12px 24px', background: 'var(--gold)', color: 'var(--ink)', fontWeight: 700 }}
                  >
                    Send Message
                  </button>
                </form>

              </div>
            </div>
          )}

          {/* TAB 3: UPCOMING PROJECTS PIPELINE */}
          {activeTab === 'projects' && (
            <div style={{ opacity: isPaid ? 1 : 0.4, pointerEvents: isPaid ? 'auto' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {upcomingProjectsData.map((proj) => (
                  <div key={proj.id} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.15)', padding: '24px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{proj.sector}</span>
                      <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--ff-head)', marginTop: '6px', marginBottom: '12px' }}>{proj.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '16px' }}>{proj.summary}</p>
                      
                      <div style={{ background: 'var(--ink)', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '0.8rem' }}>
                        <div style={{ color: 'var(--mist)', marginBottom: '4px' }}>Location: <strong style={{ color: '#fff' }}>{proj.location}</strong></div>
                        <div style={{ color: 'var(--mist)', marginBottom: '4px' }}>Est. Value: <strong style={{ color: 'var(--gold)' }}>{proj.estimatedValue}</strong></div>
                        <div style={{ color: 'var(--mist)' }}>Phase: <strong style={{ color: '#fff' }}>{proj.phase}</strong></div>
                      </div>
                    </div>

                    <button onClick={() => alert(`Requesting VDR Access for ${proj.title}`)} className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem', padding: '10px' }}>
                      Request Co-Investment Brief
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MARKET & INDUSTRY REPORTS */}
          {activeTab === 'reports' && (
            <div style={{ opacity: isPaid ? 1 : 0.4, pointerEvents: isPaid ? 'auto' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {marketReportsData.map((rep) => (
                  <div key={rep.id} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.15)', padding: '24px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rep.category} • Published {rep.publishDate}</span>
                      <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--ff-head)', marginTop: '4px', marginBottom: '8px' }}>{rep.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginBottom: '12px' }}>{rep.summary}</p>
                      <ul style={{ paddingLeft: '18px', color: 'var(--mist)', fontSize: '0.8rem' }}>
                        {rep.keyInsights.map((ins, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{ins}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '8px' }}>{rep.fileSize} • {rep.pages} Pages</span>
                      <button onClick={() => alert(`Downloading ${rep.title}`)} className="btn-primary" style={{ border: 'none', cursor: 'pointer', padding: '10px 18px', background: 'var(--gold)', color: 'var(--ink)', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Download size={16} /> Download Full PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INVESTOR PACKS & VDR DECKS */}
          {activeTab === 'investor' && (
            <div style={{ opacity: isPaid ? 1 : 0.4, pointerEvents: isPaid ? 'auto' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                {investorPacksData.map((pack) => (
                  <div key={pack.id} style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '28px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{pack.type}</span>
                      <h4 style={{ color: '#fff', fontSize: '1.3rem', fontFamily: 'var(--ff-head)', marginTop: '6px', marginBottom: '10px' }}>{pack.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '16px' }}>{pack.description}</p>
                      
                      <div style={{ background: 'var(--ink)', padding: '14px', borderRadius: '4px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Included Artifacts:</span>
                        {pack.contents.map((item, idx) => (
                          <div key={idx} style={{ fontSize: '0.8rem', color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Check size={14} style={{ color: 'var(--gold)' }} /> {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => alert(`Accessing Virtual Data Room for ${pack.title}`)} className="btn-primary" style={{ width: '100%', border: 'none', cursor: 'pointer', padding: '12px', background: 'var(--gold)', color: 'var(--ink)', fontWeight: 700, fontSize: '0.85rem' }}>
                      Access Confidential VDR Package
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ================= PAYMENT GATEWAYS MODAL ================= */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '36px', borderRadius: '4px', width: '100%', maxWidth: '520px', position: 'relative' }}>
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '8px' }}>
              Afrinove Payment Gateway
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginBottom: '24px' }}>
              Select payment method to settle consultation fee of <strong>${currentFee}.00 USD</strong>.
            </p>

            <form onSubmit={handleExecutePayment}>
              {/* Gateway Switcher */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <button 
                  type="button" 
                  onClick={() => setSelectedGateway('flutterwave')}
                  style={{ 
                    padding: '14px', 
                    background: selectedGateway === 'flutterwave' ? 'rgba(201, 168, 76, 0.2)' : 'var(--ink)', 
                    border: `1px solid ${selectedGateway === 'flutterwave' ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, 
                    color: selectedGateway === 'flutterwave' ? 'var(--gold)' : '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Flutterwave<br />
                  <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.8 }}>Mobile Money &amp; Local Cards</span>
                </button>

                <button 
                  type="button" 
                  onClick={() => setSelectedGateway('stripe')}
                  style={{ 
                    padding: '14px', 
                    background: selectedGateway === 'stripe' ? 'rgba(201, 168, 76, 0.2)' : 'var(--ink)', 
                    border: `1px solid ${selectedGateway === 'stripe' ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`, 
                    color: selectedGateway === 'stripe' ? 'var(--gold)' : '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Stripe Checkout<br />
                  <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.8 }}>Visa, MasterCard, Amex</span>
                </button>
              </div>

              {selectedGateway === 'flutterwave' ? (
                <div style={{ background: 'var(--ink)', padding: '20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>
                    Mobile Money Phone Number (MTN / Airtel / M-Pesa)
                  </label>
                  <input 
                    type="text" 
                    value={paymentPhone} 
                    onChange={(e) => setPaymentPhone(e.target.value)} 
                    required 
                    style={{ width: '100%', background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }} 
                  />
                  <p style={{ fontSize: '0.7rem', color: 'var(--mist)', marginTop: '6px' }}>
                    A prompt will be pushed to your mobile money handset to authorize payment in local currency equivalent.
                  </p>
                </div>
              ) : (
                <div style={{ background: 'var(--ink)', padding: '20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>
                    Credit / Debit Card Number
                  </label>
                  <input 
                    type="text" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                    required 
                    style={{ width: '100%', background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }} 
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                    <input type="text" defaultValue="08 / 28" style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }} placeholder="MM/YY" />
                    <input type="text" defaultValue="•••" style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }} placeholder="CVC" />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={paymentProcessing}
                  style={{ flex: 1, border: 'none', cursor: paymentProcessing ? 'not-allowed' : 'pointer', padding: '14px', background: 'var(--gold)', color: 'var(--ink)', fontWeight: 700, fontSize: '0.9rem' }}
                >
                  {paymentProcessing ? 'Communicating with Gateway API...' : `Confirm & Pay $${currentFee}.00 USD`}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPaymentModal(false)} 
                  style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '14px 20px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portal;
