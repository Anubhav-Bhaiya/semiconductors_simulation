import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PNJunction from './components/PNJunction';
import DiodeCharacteristics from './components/DiodeCharacteristics';
import ZenerDiode from './components/ZenerDiode';
import LogicGates from './components/LogicGates';
import './index.css';

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header style={{ marginBottom: '20px', textAlign: 'center' }}>
      {!isHome && (
        <Link
          to="/"
          className="btn-primary"
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}
        >
          ← Back to Menu
        </Link>
      )}
      <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px', marginTop: '10px' }}>
        Semiconductor Physics
      </h1>
      <p style={{ color: 'var(--text-secondary)' }}>Interactive Learning Simulation</p>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container" style={{ padding: '20px', minHeight: '100vh' }}>
        <Navigation />
        <main style={{ maxWidth: '1200px', margin: '0 auto', flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pn-junction" element={<PNJunction />} />
            <Route path="/diode" element={<DiodeCharacteristics />} />
            <Route path="/zener" element={<ZenerDiode />} />
            <Route path="/logic-gates" element={<LogicGates />} />
          </Routes>
        </main>

        <footer style={{
          textAlign: 'center',
          padding: '20px',
          marginTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-secondary)'
        }}>
          <p>Made with ❤️ by <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>Anubhav Bhaiya</span></p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
