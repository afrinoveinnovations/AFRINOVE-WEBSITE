import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logoutMock } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMock();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/partner', label: 'Partner Hub' },
    { path: '/consult', label: 'Advisory Booking' },
    { path: '/store', label: 'Store' },
    { path: '/knowledge', label: 'Knowledge' },
  ];

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(13, 13, 13, 0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 24px', height: '80px' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          <img src="/images/afrinove_icon_circle.png" alt="Logo" className="nav-logo-icon" style={{ height: '32px', width: '32px' }} />
          AFRINOVE
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                style={{ textDecoration: 'none', color: 'var(--mist)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Auth Info / Client Portal Access */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(201, 168, 76, 0.1)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} /> {user.displayName} ({user.role})
              </span>
              <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', color: 'var(--mist)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/portal" className="btn nav-cta" style={{ fontSize: '0.85rem', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none' }}>
              Client Portal
            </Link>
          )}

          {/* Hamburger button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="hamburger-btn" 
            style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isOpen && (
        <div style={{ position: 'fixed', top: '80px', left: 0, right: 0, bottom: 0, background: 'var(--ink)', zIndex: 999, display: 'flex', flexDirection: 'column', padding: '32px 24px', gap: '20px' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              style={{ fontSize: '1.2rem', color: 'var(--white)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              <div style={{ color: 'var(--gold)' }}>Logged in as {user.displayName} ({user.role})</div>
              <button onClick={handleLogout} className="btn" style={{ width: '100%' }}>Logout</button>
            </div>
          ) : (
            <Link to="/portal" onClick={() => setIsOpen(false)} className="btn nav-cta" style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
              Client Portal
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
