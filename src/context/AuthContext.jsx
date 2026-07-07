import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simple local storage mock user session for development/preview
  useEffect(() => {
    const savedUser = localStorage.getItem('afrinove_mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginMock = (email, role) => {
    const mockUser = {
      uid: 'mock_uid_' + Math.random().toString(36).substr(2, 9),
      email: email,
      role: role || 'client',
      displayName: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('afrinove_mock_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logoutMock = () => {
    setUser(null);
    localStorage.removeItem('afrinove_mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginMock, logoutMock }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
