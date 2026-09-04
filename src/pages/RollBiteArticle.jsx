import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Effects';
import { ArrowLeft, Calendar, User, MapPin, Sparkles, HeartHandshake, Utensils, Award, ExternalLink, Share2 } from 'lucide-react';

const menuItems = [
  {
    name: 'Nyanks',
    tagline: 'The Classic Kampala Foundation',
    description: 'A rich double-egg omelette packed with finely sliced red onions, ripe tomatoes, and fresh crisp cabbage, rolled tightly in a toasted handmade chapati.',
    badge: 'Popular Original'
  },
  {
    name: 'Bubu',
    tagline: 'Hearty & Comforting',
    description: 'Extra thick fluffy eggs blended with melted local cheese, bell peppers, and savoury herbs for a rich, warm, and satisfying experience.',
    badge: 'Cheese Infused'
  },
  {
    name: 'Legilegba',
    tagline: 'Smoky & Savoury Power Roll',
    description: 'Grilled spiced meats and caramelized onions layered with egg and fresh cilantro inside a crisp golden chapati.',
    badge: 'Meat Lover Choice'
  },
  {
    name: 'Soggi',
    tagline: 'Fresh & Vibrant Garden Blend',
    description: 'Avocado slices, fresh garden greens, tomatoes, and lightly seasoned egg roll tailored for a crisp, nutritious bite.',
    badge: 'Fresh & Light'
  },
  {
    name: 'Urban Special',
    tagline: 'The Deluxe House Signature',
    description: 'The ultimate Roll Bite creation: loaded with layered spiced meats, melted cheese, double egg, avocado, and signature house sauce.',
    badge: 'House Specialty'
  }
];

const RollBiteArticle = () => {
  return (
    <div className="article-page-wrapper" style={{ padding: '40px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Back Link */}
      <Reveal delay={50}>
        <Link 
          to="/knowledge" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--gold)', 
            textDecoration: 'none', 
            fontSize: '0.9rem', 
            fontWeight: 500, 
            marginBottom: '32px' 
          }}
        >
          <ArrowLeft size={16} /> Back to Knowledge Centre
        </Link>
      </Reveal>

      {/* Article Header & Eyebrow */}
      <Reveal delay={100}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Venture Spotlight &bull; Food &amp; Hospitality
          </span>
          <span style={{ color: 'var(--mist)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} /> Founded Aug 30, 2021 | September 2026 Update
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontFamily: 'var(--ff-head)', color: 'var(--white)', lineHeight: '1.2', marginBottom: '20px' }}>
          Roll Bite: <em>Reimagining the Rolex</em>, One Roll at a Time
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--mist)', lineHeight: '1.7', marginBottom: '32px', maxWidth: '850px' }}>
          On the 30th of August 2021, Roll Bite was born out of a simple but bold idea: that Uganda's most beloved street food — the rolex — deserved a modern home. What began as a concept rooted in everyday Kampala life has grown into a brand built to serve Ugandans with the best of common fast food, prepared and presented in a fresh, modernised way.
        </p>
      </Reveal>

      {/* Hero Image Banner */}
      <Reveal delay={150} style={{ marginBottom: '48px' }}>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative' }}>
          <img 
            src="/images/rollbite/rollbite_hero.jpg" 
            alt="Roll Bite Gourmet Rolex at Beta Hub Munyonyo" 
            style={{ width: '100%', height: 'auto', maxHeight: '520px', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.95), transparent)', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} /> Official House of Roll Bite &bull; Beta Hub, Munyonyo
              </span>
              <p style={{ color: '#fff', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>Elevating Ugandan street food into a structured, scalable food service experience.</p>
            </div>
            <Link to="/partner" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem', textDecoration: 'none' }}>
              Partner With Us &rarr;
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Article Content Section 1 & 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginBottom: '60px' }}>
        
        {/* Reinvented & Livelihoods */}
        <Reveal delay={200}>
          <div style={{ background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.05)', padding: '36px', borderRadius: '8px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Utensils size={24} /> A Ugandan Classic, Reinvented
            </h2>
            <p style={{ color: 'var(--mist)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '24px' }}>
              The rolex has long been a symbol of Ugandan street culture — quick, affordable, and deeply familiar. Roll Bite set out not to replace that tradition, but to elevate it: taking the same spirit of the roadside rolex stand and rebuilding it into a structured, innovative food experience without losing the taste and identity that Ugandans grew up with.
            </p>

            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '36px' }}>
              <HeartHandshake size={24} /> Built on Purpose: Jobs and Livelihoods
            </h2>
            <p style={{ color: 'var(--mist)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              From the outset, Roll Bite's mission went beyond food. The brand was founded with a commitment to creating sustainable jobs through its operations, offering young Ugandans a dependable pathway into employment through food production, service, and hospitality. Every rolex sold is tied to a bigger goal — building livelihoods across Kampala and beyond.
            </p>
          </div>
        </Reveal>

        {/* The Signature Menu Showcase */}
        <Reveal delay={250}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-label">Signature Creations</span>
              <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--ff-head)', color: '#fff' }}>
                The <em>Roll Bite</em> Menu
              </h2>
              <p style={{ color: 'var(--mist)', maxWidth: '650px', margin: '12px auto 0', fontSize: '0.95rem' }}>
                Roll Bite's offering is intentionally focused: five signature products, each a distinct take on the rolex experience.
              </p>
            </div>

            {/* Menu Spread Image */}
            <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img 
                src="/images/rollbite/rollbite_menu_showcase.jpg" 
                alt="Roll Bite Five Signature Rolex Offerings" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Menu Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {menuItems.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    background: 'var(--ink-2)', 
                    border: '1px solid rgba(201,168,76,0.15)', 
                    padding: '24px', 
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    transition: 'transform 0.3s, border-color 0.3s'
                  }}
                  className="menu-card-item"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--ff-head)', color: '#fff' }}>{item.name}</h3>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.2)', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase' }}>
                        {item.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontStyle: 'italic', marginBottom: '10px' }}>{item.tagline}</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--mist)', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Beta Hub Partnership & Urban Empire Acknowledgement */}
        <Reveal delay={300}>
          <div style={{ background: 'linear-gradient(135deg, var(--ink-2) 0%, rgba(201,168,76,0.05) 100%)', border: '1px solid rgba(201,168,76,0.2)', padding: '40px', borderRadius: '8px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--ff-head)', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={26} style={{ color: 'var(--gold)' }} /> A New Home at Beta Hub, Munyonyo
            </h2>

            <p style={{ color: 'var(--mist)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '24px' }}>
              Roll Bite has now found its home at <strong>Beta Hub, Munyonyo</strong>, in a new partnership that establishes Beta Hub as the official <em>House of Roll Bite</em> in Uganda. This partnership brings the brand into a vibrant, established space where it can reach more people while staying true to its founding purpose.
            </p>

            <div style={{ borderRadius: '6px', overflow: 'hidden', margin: '24px 0', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img 
                src="/images/rollbite/betahub_house_of_rollbite.jpg" 
                alt="Beta Hub Munyonyo House of Roll Bite" 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div style={{ background: 'rgba(10,22,40,0.6)', borderLeft: '3px solid var(--gold)', padding: '20px 24px', borderRadius: '0 4px 4px 0', marginTop: '24px' }}>
              <h4 style={{ color: 'var(--gold)', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} /> Partner Acknowledgement: Urban Empire
              </h4>
              <p style={{ color: 'var(--mist)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                This chapter would not have been possible without <strong>Urban Empire</strong>, whose vision and support opened the door for Roll Bite to explore this new way of serving and reaching the livelihoods of Kampala's people. Their partnership represents more than shared space — it is a shared belief that food, innovation, and community upliftment can move together.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Looking Ahead Summary */}
        <Reveal delay={350}>
          <div style={{ textAlign: 'center', padding: '40px 24px', background: 'var(--ink-2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--ff-head)', color: 'var(--gold)', marginBottom: '16px' }}>Looking Ahead</h2>
            <p style={{ color: 'var(--white)', fontSize: '1.15rem', maxWidth: '800px', margin: '0 auto 24px', lineHeight: '1.7', fontStyle: 'italic' }}>
              &ldquo;Roll Bite's journey from a founding idea in 2021 to a home at Beta Hub is a story of staying rooted in what Ugandans love, while continuously innovating in how it is delivered. As the brand grows, its mission remains the same: modernised, accessible, community-driven fast food — one roll, one job, one livelihood at a time.&rdquo;
            </p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
              <Link to="/partner" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px' }}>
                Collaborate with Afrinove Ventures
              </Link>
              <Link to="/knowledge" className="btn-ghost" style={{ border: '1px solid var(--gold)', color: 'var(--gold)', textDecoration: 'none', padding: '12px 28px' }}>
                Explore More Knowledge &amp; Insights
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default RollBiteArticle;
