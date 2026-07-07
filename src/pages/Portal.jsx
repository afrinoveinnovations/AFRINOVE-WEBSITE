import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Effects';
import { 
  Lock, User, Mail, ShieldAlert, CheckCircle, 
  Upload, Folder, Plus, ArrowRight, MessageSquare, 
  FileDown, RefreshCw 
} from 'lucide-react';

const Portal = () => {
  const { user, loginMock, logoutMock } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('client');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Arua_Airport_Environmental_Impact_2026.pdf', size: '2.4 MB', date: '2026-06-25', status: 'Reviewed' },
    { name: 'Afrinove_Coffee_SupplyChain_Audit_v2.xlsx', size: '1.8 MB', date: '2026-06-28', status: 'Pending' }
  ]);
  const [newFileName, setNewFileName] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'advisor', text: 'Hello! I have uploaded the draft Environmental Audit report for Arua Airport. Please review and provide coordinates.', time: '09:30 AM' },
    { sender: 'client', text: 'Thanks, checking it now. We should have feedback by tomorrow afternoon.', time: '10:15 AM' }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      loginMock(email, role);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!newFileName) return;
    setUploadedFiles([
      ...uploadedFiles,
      { name: newFileName, size: '840 KB', date: new Date().toISOString().split('T')[0], status: 'Pending' }
    ]);
    setNewFileName('');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage) return;
    setChatLog([
      ...chatLog,
      { sender: 'client', text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setChatMessage('');
    
    // Simulate auto advisor reply after delay
    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        { sender: 'advisor', text: 'Understood. We are reviewing this input and will update the task tracker accordingly.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1500);
  };

  // Mock milestones based on role
  const clientMilestones = [
    { title: 'Project Initiation & Scope Sign-off', status: 'completed', date: 'Jun 10, 2026' },
    { title: 'Draft Environmental Impact Audit', status: 'active', date: 'In Progress' },
    { title: 'Local Stakeholder Consultations', status: 'pending', date: 'Jul 20, 2026' },
    { title: 'Final Feasibility Coordinates Filing', status: 'pending', date: 'Aug 15, 2026' }
  ];

  const investorMilestones = [
    { title: 'Mutual NDA Signed', status: 'completed', date: 'Today' },
    { title: 'VDR Feasibility Access Sourced', status: 'active', date: 'Active' },
    { title: 'Consolidated Term-Sheet Review', status: 'pending', date: 'Jul 15, 2026' },
    { title: 'Strategic Project Capitalization', status: 'pending', date: 'Aug 01, 2026' }
  ];

  const milestones = user?.role === 'investor' ? investorMilestones : clientMilestones;

  return (
    <div className="portal-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {!user ? (
        /* LOGIN PORTAL CONTAINER */
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Reveal className="login-card-wrapper" delay={100} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '40px', borderRadius: '4px', width: '100%', maxWidth: '450px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Lock size={36} style={{ color: 'var(--gold)', marginBottom: '12px' }} />
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: '#fff' }}>Secure Portal Access</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--mist)', marginTop: '6px' }}>Clients &amp; Investors login securely below.</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
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
                      placeholder="E.g., partner@capital.com"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--mist)', marginBottom: '6px' }}>Select Account Role</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: '100%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '0.9rem' }}
                  >
                    <option value="client">Corporate Client (Project Tracker)</option>
                    <option value="investor">Institutional Investor (VDR Access)</option>
                    <option value="admin">Afrinove Administrator</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}
                disabled={isLoading}
              >
                {isLoading ? 'Decrypting Workspace...' : 'Authenticate Workspace'}
                <ArrowRight size={16} />
              </button>
            </form>
            
            <div style={{ marginTop: '24px', background: 'rgba(201, 168, 76, 0.05)', border: '1px solid rgba(201, 168, 76, 0.15)', padding: '12px 16px', borderRadius: '4px', display: 'flex', gap: '10px' }}>
              <ShieldAlert size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--mist)', lineHeight: '1.4' }}>
                <strong>Demo/Sandbox Mode:</strong> Enter any email and choose a role to simulate authentication and access local project sandboxes.
              </p>
            </div>
          </Reveal>
        </div>
      ) : (
        /* PORTAL CLIENT CONTENT */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Client &amp; Investor Workspace</span>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--ff-head)', color: '#fff', marginTop: '4px' }}>Welcome back, {user.displayName}</h2>
            </div>
            <button onClick={logoutMock} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>Logout Workspace</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            {/* Left Column: Progress Tracker & File Share */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Project Progress/Milestones */}
              <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '32px', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '24px' }}>Project Milestones Tracker</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {milestones.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{ marginTop: '4px' }}>
                        {m.status === 'completed' ? (
                          <CheckCircle size={20} style={{ color: 'var(--gold)' }} />
                        ) : m.status === 'active' ? (
                          <RefreshCw size={20} className="spin" style={{ color: 'var(--gold)' }} />
                        ) : (
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: m.status === 'pending' ? 'var(--mist)' : '#fff', fontSize: '0.95rem', fontWeight: 500 }}>{m.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: m.status === 'completed' ? 'var(--gold)' : 'var(--mist)' }}>{m.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Document Exchange */}
              <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '32px', borderRadius: '4px' }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Folder size={22} /> Document Exchange Room
                </h3>
                
                <form onSubmit={handleFileUpload} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <input 
                    type="text" 
                    value={newFileName} 
                    onChange={(e) => setNewFileName(e.target.value)} 
                    placeholder="Attach new document (e.g. Project_Brief.pdf)..."
                    style={{ flex: 1, background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', fontSize: '0.75rem' }}>
                    Upload File
                    <Upload size={14} />
                  </button>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '4px' }}>
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '4px' }}>{file.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>Size: {file.size} | Uploaded: {file.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: file.status === 'Reviewed' ? 'var(--gold)' : 'var(--mist)', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', border: '1px solid rgba(255,255,255,0.05)' }}>{file.status}</span>
                        <a href="/documents/afrinove_company_documents.pdf" download={file.name} title="Download Copy" style={{ color: 'var(--gold)' }}><FileDown size={16} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Chat Room with Advisors */}
            <div>
              <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '32px', borderRadius: '4px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessageSquare size={22} /> Advisor Chat Room
                </h3>
                
                {/* Chat Log */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: '350px', overflowY: 'auto', background: 'var(--ink)', padding: '16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
                  {chatLog.map((chat, idx) => (
                    <div key={idx} style={{ 
                      alignSelf: chat.sender === 'client' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      background: chat.sender === 'client' ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                      color: chat.sender === 'client' ? 'var(--ink)' : '#fff',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      lineHeight: '1.4'
                    }}>
                      <div style={{ fontWeight: 600, fontSize: '0.7rem', opacity: 0.8, marginBottom: '4px' }}>
                        {chat.sender === 'client' ? 'You' : 'Afrinove Advisor'}
                      </div>
                      <p>{chat.text}</p>
                      <div style={{ fontSize: '0.65rem', textAlign: 'right', opacity: 0.6, marginTop: '4px' }}>{chat.time}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={chatMessage} 
                    onChange={(e) => setChatMessage(e.target.value)} 
                    placeholder="Type message directly to advisors..."
                    style={{ flex: 1, background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', color: '#fff', borderRadius: '4px', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', padding: '10px 14px' }}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portal;
