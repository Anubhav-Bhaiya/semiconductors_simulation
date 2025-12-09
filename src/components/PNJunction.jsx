import React, { useState, useEffect } from 'react';
/* 
  PN Junction Simulation
  - Visualizes P-type and N-type materials
  - P-type: Majority Holes (Empty circles), Minority Electrons (Filled dots)
  - N-type: Majority Electrons, Minority Holes
  - Depletion Region: Expands in Reverse Bias, Shrinks in Forward Bias
*/

const PNJunction = () => {
    const [voltage, setVoltage] = useState(0); // -5 to +2V
    const [depletionWidth, setDepletionWidth] = useState(50); // pixels
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Constants
    const BARRIER_VOLTAGE = 0.7; // Silicon
    const MAX_DEPLETION = 150;
    const MIN_DEPLETION = 10;

    useEffect(() => {
        // Calculate new physical state based on voltage
        if (voltage > 0) {
            // Forward Bias: Depletion shrinks
            const shrinkage = Math.min(40, voltage * 40);
            setDepletionWidth(Math.max(MIN_DEPLETION, 50 - shrinkage));

            // Current flows exponentially after barrier
            if (voltage > BARRIER_VOLTAGE) {
                setCurrent(Math.exp(voltage - BARRIER_VOLTAGE) * 2);
                setIsAnimating(true);
            } else {
                setCurrent(0);
                setIsAnimating(false);
            }
        } else {
            // Reverse Bias: Depletion widens
            const expansion = Math.min(100, Math.abs(voltage) * 20);
            setDepletionWidth(Math.min(MAX_DEPLETION, 50 + expansion));
            setCurrent(0.01); // Minimal leakage
            setIsAnimating(false);
        }
    }, [voltage]);

    return (
        <div style={{ padding: '20px', color: '#fff' }}>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h2 style={{ marginBottom: '10px' }}>PN Junction Visualization</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <label style={{ marginRight: '10px' }}>Applied Voltage (V): </label>
                        <input
                            type="range"
                            min="-5"
                            max="2"
                            step="0.1"
                            value={voltage}
                            onChange={(e) => setVoltage(parseFloat(e.target.value))}
                        />
                        <span style={{ marginLeft: '10px', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>
                            {voltage.toFixed(1)} V
                        </span>
                    </div>
                    <div>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            Current: <strong style={{ color: isAnimating ? 'lime' : 'inherit' }}>{current.toFixed(4)} mA</strong>
                        </span>
                    </div>
                </div>
            </div>

            {/* Simulation Viewport */}
            <div className="glass-panel" style={{
                position: 'relative',
                height: '300px',
                overflow: 'hidden',
                display: 'flex',
                border: '2px solid rgba(255,255,255,0.1)'
            }}>

                {/* P-Type Region */}
                <div style={{ flex: 1, background: '#4a148c33', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold', color: '#bd00ff' }}>P-Type (Holes)</div>
                    {/* Static Ions (Negative Acceptor Ions) */}
                    <div className="ions-grid">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={`p-ion-${i}`} className="ion acceptor">-</div>
                        ))}
                    </div>
                    {/* Mobile Carriers (Holes) */}
                    <div className={`carriers p-carriers ${isAnimating ? 'flowing-right' : ''}`}>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={`hole-${i}`} className="hole"></div>
                        ))}
                    </div>
                </div>

                {/* Depletion Region (Dynamic Width) */}
                <div style={{
                    width: `${depletionWidth}px`,
                    background: 'rgba(0,0,0,0.8)',
                    borderLeft: '1px dashed #ffffff33',
                    borderRight: '1px dashed #ffffff33',
                    transition: 'width 0.3s ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <span style={{ fontSize: '0.7rem', color: '#fff', textAlign: 'center' }}>
                        Depletion<br />Region<br />W = {depletionWidth.toFixed(0)}px
                    </span>
                </div>

                {/* N-Type Region */}
                <div style={{ flex: 1, background: '#00606433', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold', color: '#00f3ff' }}>N-Type (Electrons)</div>
                    {/* Static Ions (Positive Donor Ions) */}
                    <div className="ions-grid">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={`n-ion-${i}`} className="ion donor">+</div>
                        ))}
                    </div>
                    {/* Mobile Carriers (Electrons) */}
                    <div className={`carriers n-carriers ${isAnimating ? 'flowing-left' : ''}`}>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={`electron-${i}`} className="electron"></div>
                        ))}
                    </div>
                </div>

            </div>

            <style>{`
        .ions-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 10px;
          padding: 40px 10px;
          opacity: 0.3;
        }
        .ion {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid white;
          font-size: 12px;
        }
        .acceptor { border-color: #bd00ff; color: #bd00ff; }
        .donor { border-color: #00f3ff; color: #00f3ff; }

        .carriers {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
        }
        .hole {
          width: 8px;
          height: 8px;
          border: 2px solid #bd00ff;
          border-radius: 50%;
          position: absolute;
          background: transparent;
        }
        .electron {
          width: 8px;
          height: 8px;
          background: #00f3ff;
          border-radius: 50%;
          position: absolute;
        }

        /* Randomly position visualization particles for demo logic */
        /* In a real physics engine, we'd use canvas or coordinate state. Here we simulate with random css */
        ${Array.from({ length: 40 }).map((_, i) => `
          .hole:nth-child(${i + 1}) { top: ${Math.random() * 80 + 10}%; left: ${Math.random() * 80}%; }
          .electron:nth-child(${i + 1}) { top: ${Math.random() * 80 + 10}%; left: ${Math.random() * 80 + 10}%; }
        `).join('')}

        @keyframes flowRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        @keyframes flowLeft {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100px); opacity: 0; }
        }

        .flowing-right .hole {
          animation: flowRight 1s infinite linear;
        }
        .flowing-left .electron {
          animation: flowLeft 1s infinite linear;
        }
      `}</style>

            <div className="glass-panel" style={{ marginTop: '20px', padding: '20px' }}>
                <h3>Physics Explanation</h3>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    <strong>Depletion Region:</strong> The area around the junction where mobile charge carriers are swept away. It creates a potential barrier.
                    <br />
                    <strong>Forward Bias (+V):</strong> The external field opposes the internal field, pushing holes and electrons towards the junction, narrowing the depletion layer (W shrinks). Current flows easily once V {'>'} 0.7V.
                    <br />
                    <strong>Reverse Bias (-V):</strong> The external field aids the internal field, pulling carriers away from the junction, widening the depletion layer (W increases). Almost no current flows involved.
                </p>
            </div>
        </div>
    );
};

export default PNJunction;
