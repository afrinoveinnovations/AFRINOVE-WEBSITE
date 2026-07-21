import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const INITIAL_USERS = [
  {
    id: 'user_admin_01',
    email: 'admin@afrinove.com',
    password: 'admin123',
    displayName: 'Afrinove Administrator',
    role: 'admin',
    phone: '+256 759 758 401',
    company: 'Afrinove Development Ltd',
    signupDate: '2026-01-01'
  },
  {
    id: 'user_client_01',
    email: 'client@afrinove.com',
    password: 'client123',
    displayName: 'Dr. Alice Smith',
    role: 'client',
    phone: '+256 700 123 456',
    company: 'East Africa Ventures Ltd',
    signupDate: '2026-07-10',
    briefName: 'Arua_Airport_Feasibility_Brief.pdf'
  }
];

const INITIAL_FEES = {
  'client@afrinove.com': 150
};

const INITIAL_PAYMENTS = {
  'client@afrinove.com': {
    status: 'pending',
    amount: 150,
    gateway: null,
    txnId: null,
    date: null
  }
};

const INITIAL_FILES = {
  'client@afrinove.com': [
    { id: 'f1', name: 'Arua_Airport_Environmental_Impact_2026.pdf', size: '2.4 MB', date: '2026-07-12', status: 'Reviewed' },
    { id: 'f2', name: 'Afrinove_Coffee_SupplyChain_Audit_v2.xlsx', size: '1.8 MB', date: '2026-07-14', status: 'Pending Review' }
  ]
};

const INITIAL_CHAT = {
  'client@afrinove.com': [
    { sender: 'advisor', text: 'Welcome to your Afrinove Client Portal. Our lead advisor has received your advisory brief.', time: '09:00 AM' },
    { sender: 'client', text: 'Thank you! Excited to align on our PPP project timeline.', time: '09:15 AM' }
  ]
};

const INITIAL_SESSIONS = {
  'client@afrinove.com': {
    secondsLeft: 3600, // 1 hour daily (60 mins = 3600s)
    active: false,
    locked: false
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [clientFees, setClientFees] = useState({});
  const [paymentRecords, setPaymentRecords] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [chatLogs, setChatLogs] = useState({});
  const [dailySessions, setDailySessions] = useState({});
  const [adminDayStarted, setAdminDayStarted] = useState(true);

  // Initialize state from local storage or defaults
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('afrinove_current_user');
      const savedUsersList = localStorage.getItem('afrinove_users_db');
      const savedFees = localStorage.getItem('afrinove_client_fees');
      const savedPayments = localStorage.getItem('afrinove_payments_db');
      const savedFiles = localStorage.getItem('afrinove_files_db');
      const savedChat = localStorage.getItem('afrinove_chat_db');
      const savedSessions = localStorage.getItem('afrinove_sessions_db');
      const savedAdminDay = localStorage.getItem('afrinove_admin_day_started');

      if (savedUser) setUser(JSON.parse(savedUser));
      setUsersList(savedUsersList ? JSON.parse(savedUsersList) : INITIAL_USERS);
      setClientFees(savedFees ? JSON.parse(savedFees) : INITIAL_FEES);
      setPaymentRecords(savedPayments ? JSON.parse(savedPayments) : INITIAL_PAYMENTS);
      setUploadedFiles(savedFiles ? JSON.parse(savedFiles) : INITIAL_FILES);
      setChatLogs(savedChat ? JSON.parse(savedChat) : INITIAL_CHAT);
      setDailySessions(savedSessions ? JSON.parse(savedSessions) : INITIAL_SESSIONS);
      if (savedAdminDay !== null) setAdminDayStarted(JSON.parse(savedAdminDay));
    } catch (err) {
      console.error('Error loading Afrinove store state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync state changes to local storage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('afrinove_users_db', JSON.stringify(usersList));
      localStorage.setItem('afrinove_client_fees', JSON.stringify(clientFees));
      localStorage.setItem('afrinove_payments_db', JSON.stringify(paymentRecords));
      localStorage.setItem('afrinove_files_db', JSON.stringify(uploadedFiles));
      localStorage.setItem('afrinove_chat_db', JSON.stringify(chatLogs));
      localStorage.setItem('afrinove_sessions_db', JSON.stringify(dailySessions));
      localStorage.setItem('afrinove_admin_day_started', JSON.stringify(adminDayStarted));
      if (user) {
        localStorage.setItem('afrinove_current_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('afrinove_current_user');
      }
    }
  }, [usersList, clientFees, paymentRecords, uploadedFiles, chatLogs, dailySessions, adminDayStarted, user, loading]);

  // Session timer tick effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setDailySessions(prev => {
        let updated = false;
        const newSessions = { ...prev };
        
        Object.keys(newSessions).forEach(email => {
          const s = newSessions[email];
          if (s && s.active && !s.locked && adminDayStarted) {
            if (s.secondsLeft > 0) {
              newSessions[email] = {
                ...s,
                secondsLeft: s.secondsLeft - 1
              };
              updated = true;
            } else {
              newSessions[email] = {
                ...s,
                active: false,
                locked: true,
                secondsLeft: 0
              };
              updated = true;
            }
          }
        });

        return updated ? newSessions : prev;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [adminDayStarted]);

  // REGISTER NEW USER ACCOUNT & DISPATCH NOTIFICATION
  const registerUser = async (registrationData) => {
    const { email, password, name, phone, company, role, briefFile, bookingDetails } = registrationData;
    const cleanEmail = email.toLowerCase().trim();

    // Check existing
    const existing = usersList.find(u => u.email.toLowerCase() === cleanEmail);
    let newUserObj;
    
    if (existing) {
      newUserObj = { ...existing, displayName: name || existing.displayName, phone: phone || existing.phone, company: company || existing.company };
    } else {
      newUserObj = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: cleanEmail,
        password: password || 'client123',
        displayName: name || cleanEmail.split('@')[0],
        role: role || 'client',
        phone: phone || 'N/A',
        company: company || 'N/A',
        signupDate: new Date().toISOString().split('T')[0],
        briefName: briefFile ? briefFile.name : (bookingDetails?.briefName || 'None')
      };
      setUsersList(prev => [...prev, newUserObj]);
    }

    // Initialize default fee if not set
    setClientFees(prev => ({
      ...prev,
      [cleanEmail]: prev[cleanEmail] || 150
    }));

    // Initialize payment record if not set
    setPaymentRecords(prev => ({
      ...prev,
      [cleanEmail]: prev[cleanEmail] || {
        status: 'pending',
        amount: 150,
        gateway: null,
        txnId: null,
        date: null
      }
    }));

    // Initialize session timer
    setDailySessions(prev => ({
      ...prev,
      [cleanEmail]: prev[cleanEmail] || {
        secondsLeft: 3600,
        active: false,
        locked: false
      }
    }));

    // Dispatch Formspree notification to Outlook DB (afrinove@outlook.com)
    try {
      const target = import.meta.env.VITE_FORMSPREE_TARGET || 'xgogzwpb';
      const endpoint = (target.startsWith('http') || target.includes('/'))
        ? target
        : `https://formspree.io/f/${target}`;

      const data = new FormData();
      data.append('_subject', `New Client Account Registered: ${newUserObj.displayName} (${cleanEmail})`);
      data.append('_replyto', cleanEmail);
      data.append('User Full Name', newUserObj.displayName);
      data.append('User Email', cleanEmail);
      data.append('User Phone', newUserObj.phone);
      data.append('Company / Organization', newUserObj.company);
      data.append('User Account Role', newUserObj.role);
      data.append('Registration Date', newUserObj.signupDate);
      if (bookingDetails) {
        data.append('Scheduled Date', bookingDetails.selectedDate || 'N/A');
        data.append('Scheduled Time', bookingDetails.selectedTime || 'N/A');
        data.append('Service Vertical', bookingDetails.selectedService || 'N/A');
      }
      if (briefFile) {
        data.append('Attached Project Brief', briefFile.name);
      }

      fetch(endpoint, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } }).catch(() => {});
    } catch (e) {
      console.log('Outlook dispatch notice sent');
    }

    setUser(newUserObj);
    return newUserObj;
  };

  // LOGIN USER ACCOUNT
  const loginUser = (email, password, role) => {
    const cleanEmail = email.toLowerCase().trim();
    const found = usersList.find(u => u.email.toLowerCase() === cleanEmail);

    if (found) {
      setUser(found);
      return { success: true, user: found };
    }

    // Auto-create client/investor user if not in database yet
    const autoUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: cleanEmail,
      password: password || 'client123',
      displayName: cleanEmail.split('@')[0],
      role: role || (cleanEmail.includes('admin') ? 'admin' : 'client'),
      phone: 'N/A',
      company: 'N/A',
      signupDate: new Date().toISOString().split('T')[0]
    };

    setUsersList(prev => [...prev, autoUser]);
    setClientFees(prev => ({ ...prev, [cleanEmail]: prev[cleanEmail] || 150 }));
    setPaymentRecords(prev => ({
      ...prev,
      [cleanEmail]: prev[cleanEmail] || { status: 'pending', amount: 150, gateway: null, txnId: null, date: null }
    }));
    setDailySessions(prev => ({
      ...prev,
      [cleanEmail]: prev[cleanEmail] || { secondsLeft: 3600, active: false, locked: false }
    }));

    setUser(autoUser);
    return { success: true, user: autoUser };
  };

  const logoutUser = () => {
    setUser(null);
  };

  // ADMIN DYNAMIC FEE EDITOR
  const updateClientFee = (clientEmail, newFee) => {
    const emailKey = clientEmail.toLowerCase().trim();
    const feeNumber = parseFloat(newFee) || 0;
    setClientFees(prev => ({
      ...prev,
      [emailKey]: feeNumber
    }));

    // Update payment record total due
    setPaymentRecords(prev => {
      const currentRec = prev[emailKey] || { status: 'pending' };
      return {
        ...prev,
        [emailKey]: {
          ...currentRec,
          amount: feeNumber
        }
      };
    });
  };

  // PROCESS PAYMENT GATEWAY SUCCESS
  const processPayment = (clientEmail, gatewayName, paidAmount) => {
    const emailKey = clientEmail.toLowerCase().trim();
    const txnId = 'AFR-' + gatewayName.substring(0, 3).toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toISOString().split('T')[0];

    const paymentData = {
      status: 'paid',
      amount: paidAmount || clientFees[emailKey] || 150,
      gateway: gatewayName,
      txnId: txnId,
      date: currentDate
    };

    setPaymentRecords(prev => ({
      ...prev,
      [emailKey]: paymentData
    }));

    // Also update current logged in user payment status if applicable
    if (user && user.email.toLowerCase() === emailKey) {
      setUser(prev => ({ ...prev, paymentStatus: 'paid' }));
    }

    return paymentData;
  };

  // ADMIN MASTER CONTROL: START THE DAY & RESET 1-HOUR SESSIONS FOR ALL CLIENTS
  const startAdminDay = () => {
    setAdminDayStarted(true);
    setDailySessions(prev => {
      const resetMap = { ...prev };
      Object.keys(resetMap).forEach(email => {
        resetMap[email] = {
          secondsLeft: 3600, // Reset to 1 full hour
          active: false,
          locked: false
        };
      });
      return resetMap;
    });
  };

  // TOGGLE CLIENT SESSION COUNTDOWN
  const toggleClientSession = (clientEmail, isStarting) => {
    const emailKey = clientEmail.toLowerCase().trim();
    setDailySessions(prev => {
      const current = prev[emailKey] || { secondsLeft: 3600, active: false, locked: false };
      return {
        ...prev,
        [emailKey]: {
          ...current,
          active: isStarting && !current.locked && adminDayStarted
        }
      };
    });
  };

  // UPLOAD CLIENT DOCUMENT FILE
  const uploadClientFile = (clientEmail, fileObj) => {
    const emailKey = clientEmail.toLowerCase().trim();
    const newFileEntry = {
      id: 'file_' + Math.random().toString(36).substring(2, 9),
      name: typeof fileObj === 'string' ? fileObj : fileObj.name,
      size: typeof fileObj === 'string' ? '1.2 MB' : (Math.round(fileObj.size / 1024) + ' KB'),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };

    setUploadedFiles(prev => ({
      ...prev,
      [emailKey]: [newFileEntry, ...(prev[emailKey] || [])]
    }));

    return newFileEntry;
  };

  // SEND CHAT MESSAGE
  const sendChatMessage = (clientEmail, text, senderRole = 'client') => {
    const emailKey = clientEmail.toLowerCase().trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgObj = { sender: senderRole, text, time: timeStr };

    setChatLogs(prev => ({
      ...prev,
      [emailKey]: [...(prev[emailKey] || []), msgObj]
    }));

    // Auto advisor simulation if sent by client
    if (senderRole === 'client') {
      setTimeout(() => {
        setChatLogs(prevLogs => ({
          ...prevLogs,
          [emailKey]: [
            ...(prevLogs[emailKey] || []),
            {
              sender: 'advisor',
              text: 'Message received by Afrinove Senior Advisor. We are reviewing your document and project parameters.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }));
      }, 1500);
    }
  };

  // BACKWARD COMPATIBILITY
  const loginMock = (email, role) => loginUser(email, 'client123', role);
  const logoutMock = () => logoutUser();

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      usersList,
      clientFees,
      paymentRecords,
      uploadedFiles,
      chatLogs,
      dailySessions,
      adminDayStarted,
      registerUser,
      loginUser,
      logoutUser,
      updateClientFee,
      processPayment,
      startAdminDay,
      toggleClientSession,
      uploadClientFile,
      sendChatMessage,
      loginMock,
      logoutMock
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
