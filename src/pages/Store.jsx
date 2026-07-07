import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Effects';
import { FileText, Download, ShoppingBag, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';

const Store = () => {
  const { user, loginMock } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const products = [
    {
      id: 'prod-1',
      title: 'East Africa PPP Toolkit',
      category: 'Policy & Legal',
      price: '$49.00',
      description: 'Comprehensive guide and templates for structuring Public-Private Partnerships under East African and Ugandan legal frameworks.',
      features: ['Word & PDF templates', 'concession calculators', 'regulatory checklist']
    },
    {
      id: 'prod-2',
      title: 'Aviation Infrastructure Guide',
      category: 'Infrastructure',
      price: '$35.00',
      description: 'BOT (Build-Operate-Transfer) project templates, feasibility coordinates checklists, and concession agreement briefs.',
      features: ['BOT draft contract', 'risk matrix guide', 'financial model sample']
    },
    {
      id: 'prod-3',
      title: 'Agri-Cooperative Logistics Toolkit',
      category: 'Agriculture',
      price: '$19.00',
      description: 'Financial models and logistics tracking templates designed to optimize direct-to-market crop exports for farmer cohorts.',
      features: ['Excel logistics calculator', 'exporter documentation check', 'cooperative models']
    },
    {
      id: 'prod-4',
      title: 'Minerals Trading Compliance Framework',
      category: 'Compliance & Legal',
      price: '$75.00',
      description: 'Draft policy template aligning mineral concentrates trading operations with OECD Due Diligence frameworks.',
      features: ['Draft compliance policy', 'vetting questionnaire', 'audit checklist']
    }
  ];

  const handlePurchaseClick = (prod) => {
    setSelectedProduct(prod);
    setPaymentStep(true);
  };

  const handleCompletePayment = () => {
    setLoading(true);
    setTimeout(() => {
      if (!user) {
        loginMock('buyer_' + Math.random().toString(36).substr(2, 5) + '@gmail.com', 'client');
      }
      setPaymentStep(false);
      setCheckoutSuccess(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="store-page-wrapper" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal delay={100}>
        <div className="section-label">Digital Products Store</div>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--ff-head)', color: 'var(--white)', marginBottom: '16px' }}>
          Strategic <em>Resources &amp; Toolkits</em>
        </h1>
        <p style={{ color: 'var(--mist)', maxWidth: '750px', lineHeight: '1.7', marginBottom: '48px' }}>
          Acquire professional corporate templates, feasibility frameworks, and regulatory policy toolkits compiled by Afrinove\'s senior partners to accelerate your development ventures.
        </p>
      </Reveal>

      {checkoutSuccess ? (
        <Reveal className="checkout-success" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid var(--gold)', padding: '40px', borderRadius: '4px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <CheckCircle size={56} style={{ color: 'var(--gold)', marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '12px' }}>Order Completed Successfully!</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '28px' }}>
            Thank you for your purchase. An email with secure, expiring download tokens has been dispatched. You can also retrieve the file directly in the Client Portal document log.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a 
              href="/documents/afrinove_company_documents.pdf" 
              download={`${selectedProduct?.title.replace(/\s+/g, '_')}_Afrinove.pdf`}
              className="btn-primary" 
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Download PDF Package
              <Download size={14} />
            </a>
            <button onClick={() => setCheckoutSuccess(false)} className="btn-ghost" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', cursor: 'pointer' }}>
              Continue Shopping
            </button>
          </div>
        </Reveal>
      ) : paymentStep ? (
        <Reveal className="payment-checkout-container" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(201,168,76,0.1)', padding: '40px', borderRadius: '4px', maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={24} /> Review Order Checkout
          </h3>
          
          <div style={{ background: 'var(--ink)', padding: '24px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--mist)' }}>Product:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>{selectedProduct?.title}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: 'var(--mist)' }}>Delivery Method:</span>
              <span style={{ color: '#fff', fontWeight: 500 }}>Secure Instant Download Link</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginTop: '16px' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Total Price:</span>
              <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1.1rem' }}>{selectedProduct?.price} USD</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={handleCompletePayment}
              className="btn-primary" 
              style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
              disabled={loading}
            >
              <CreditCard size={18} /> {loading ? 'Contacting Payment Gateway...' : `Secure Checkout (${selectedProduct?.price})`}
            </button>
            <button onClick={() => setPaymentStep(false)} style={{ background: 'none', border: 'none', color: 'var(--mist)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}>
              Cancel and Return
            </button>
          </div>
        </Reveal>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {products.map((prod) => (
            <Reveal key={prod.id} className="store-card" delay={150} style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.04)', padding: '32px', borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>{prod.category}</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--white)', fontWeight: 600 }}>{prod.price}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '12px' }}>{prod.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--mist)', lineHeight: '1.6', marginBottom: '24px' }}>{prod.description}</p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {prod.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '0.75rem', color: 'var(--fog-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={12} style={{ color: 'var(--gold)' }} /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => handlePurchaseClick(prod)}
                className="btn-primary" 
                style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '12px' }}
              >
                Purchase Toolkit
                <ArrowRight size={14} />
              </button>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
