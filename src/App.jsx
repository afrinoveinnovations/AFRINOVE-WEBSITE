import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Opportunities from './pages/Opportunities'
import Partner from './pages/Partner'
import Consult from './pages/Consult'
import Portal from './pages/Portal'
import Store from './pages/Store'
import Knowledge from './pages/Knowledge'
import RollBiteArticle from './pages/RollBiteArticle'
import Contact from './pages/Contact'

// Layout Components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Opportunities />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/consult" element={<Consult />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/store" element={<Store />} />
              <Route path="/knowledge" element={<Knowledge />} />
              <Route path="/knowledge/roll-bite-story" element={<RollBiteArticle />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
