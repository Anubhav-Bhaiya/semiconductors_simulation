import React from 'react';
import { Link } from 'react-router-dom';

const modules = [
    {
        id: 'pn-junction',
        title: 'P-N Junction',
        description: 'Visualize depletion region logic, forward & reverse biasing, and carrier movement.',
        color: 'from-blue-500 to-cyan-500', // keeping logic for gradient, implementation via style
        path: '/pn-junction'
    },
    {
        id: 'diode',
        title: 'Diode Characteristics',
        description: 'Interactive IV Curve simulation with breakdown voltage and knee voltage analysis.',
        color: 'from-purple-500 to-pink-500',
        path: '/diode'
    },
    {
        id: 'zener',
        title: 'Zener Diode',
        description: 'Understand voltage regulation and Zener breakdown mechanics.',
        color: 'from-orange-500 to-red-500',
        path: '/zener'
    },
    {
        id: 'logic-gates',
        title: 'Logic Gates',
        description: 'Build circuits with AND, OR, NOT, NAND, NOR gates and verify truth tables.',
        color: 'from-green-500 to-emerald-500',
        path: '/logic-gates'
    }
];

const Dashboard = () => {
    return (
        <div className="dashboard-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '2rem 0'
        }}>
            {modules.map((mod) => (
                <Link
                    to={mod.path}
                    key={mod.id}
                    className="glass-panel module-card"
                    style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s ease' }}
                >
                    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                            backgroundImage: 'linear-gradient(45deg, #fff, #94a3b8)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {mod.title}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flexGrow: 1 }}>
                            {mod.description}
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', color: 'var(--accent-cyan)' }}>
                            <span>Launch Simulation</span>
                            <span style={{ marginLeft: '8px' }}>→</span>
                        </div>
                    </div>
                </Link>
            ))}
            <style>{`
        .module-card:hover {
          transform: translateY(-5px);
          background: var(--surface-hover);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
