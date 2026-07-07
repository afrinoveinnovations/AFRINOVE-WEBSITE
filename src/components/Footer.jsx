import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <img src="/images/afrinove_logo_full_tight.png" alt="Afrinove Development Ltd" style={{ height: '52px', width: 'auto', display: 'block', marginBottom: '16px', mixBlendMode: 'screen' }} />
          <p style={{ color: '#A09E9A' }}>Innovating solutions for Africa's growth. Deep local insights combined with global standards.</p>
        </div>
        <div className="footer-col">
          <h4>Platform Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services Marketplace</Link></li>
            <li><Link to="/projects">Opportunities Portal</Link></li>
            <li><Link to="/partner">Partner Hub</Link></li>
            <li><Link to="/portal">Client Portal</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services#cat-1">Advisory Services</Link></li>
            <li><Link to="/services#cat-2">PPP Projects</Link></li>
            <li><Link to="/services#cat-3">Infrastructure Ventures</Link></li>
            <li><Link to="/services#cat-4">Investment Sourcing</Link></li>
            <li><Link to="/services#cat-8">Sustainability Advisory</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact & Info</h4>
          <ul>
            <li><a href="mailto:info@afrinove.com">info@afrinove.com</a></li>
            <li><a href="tel:+256759738401">+256 759 738 401</a></li>
            <li><a href="tel:+256703096911">+256 703 096 911</a></li>
            <li>Kikoni Makerere, Kampala, Uganda</li>
            <li style={{ fontSize: '.75rem', opacity: .5 }}>Reg No: 80034766722937</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Afrinove Development Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
