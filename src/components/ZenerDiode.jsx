import React, { useState } from 'react';

const ZenerDiode = () => {
    const [vin, setVin] = useState(0); // 0 to 15V
    const VZ = 5.0; // Zener Voltage 5V
    const RS = 100; // Series Resistor Ohms
    const RL = 500; // Load Resistor Ohms

    // Physics Calculations
    /*
      Case 1: Vin < Vz (Zener is OFF, acts as open circuit approx)
      Vout = Vin * (RL / (RS + RL))  (Voltage Divider)
      
      Case 2: Vin >= Vz_active (Zener is ON, clamps voltage)
      But technically it turns on when voltage across it hits Vz.
      The voltage across the parallel branch (without zener) would be V_divider = Vin * (RL / (RS+RL)).
      If V_divider > Vz, then Zener conducts and Vout = Vz.
      Else, Zener is off and Vout = V_divider.
    */

    const vDivider = vin * (RL / (RS + RL));
    const isZenerActive = vDivider > VZ;
    const vout = isZenerActive ? VZ : vDivider;

    // Currents
    const iTotal = (vin - vout) / RS; // Amps
    const iLoad = vout / RL;
    const iZener = isZenerActive ? iTotal - iLoad : 0;

    // Formatting to mA
    const toMA = (val) => (val * 1000).toFixed(2);

    return (
        <div style={{ padding: '20px', color: '#fff' }}>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h2>Zener Diode Initial Regulator</h2>
                <div style={{ display: 'flex', gap: '40px', marginTop: '20px', flexWrap: 'wrap' }}>

                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <label>Input Voltage (Vin): </label>
                            <input
                                type="range"
                                min="0"
                                max="15"
                                step="0.1"
                                value={vin}
                                onChange={(e) => setVin(parseFloat(e.target.value))}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                            <div style={{ fontSize: '1.2rem' }}>
                                Vin: <strong style={{ color: 'var(--accent-purple)' }}>{vin.toFixed(1)} V</strong>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: '15px', background: 'rgba(255,255,255,0.05)' }}>
                            <h3>Circuit Parameters</h3>
                            <p>Zener Voltage (Vz): <strong>{VZ} V</strong></p>
                            <p>Series Resistor (Rs): <strong>{RS} Ω</strong></p>
                            <p>Load Resistor (RL): <strong>{RL} Ω</strong></p>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <h3>Output Status</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div className="glass-panel" style={{ padding: '10px', textAlign: 'center', borderColor: isZenerActive ? 'var(--accent-cyan)' : 'transparent' }}>
                                    <div>Vout</div>
                                    <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{vout.toFixed(2)} V</div>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{isZenerActive ? 'REGULATING' : 'UNREGULATED'}</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '10px', textAlign: 'center' }}>
                                    <div>Zener Current</div>
                                    <div style={{ fontSize: '1.5rem', color: iZener > 0 ? '#ff5252' : '#aaa' }}>{toMA(iZener)} mA</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* SVG Circuit Diagram */}
                        <svg width="400" height="300" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#aaa" />
                                </marker>
                            </defs>

                            {/* Wires */}
                            <rect x="50" y="50" width="300" height="200" fill="none" stroke="#fff" strokeWidth="2" />

                            {/* Source Vin */}
                            <circle cx="50" cy="150" r="15" fill="#222" stroke="#fff" strokeWidth="2" />
                            <text x="50" y="155" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Vin</text>

                            {/* Series Resistor RS */}
                            <rect x="130" y="40" width="60" height="20" fill="#222" stroke="#fff" strokeWidth="2" />
                            <text x="160" y="30" textAnchor="middle" fill="#aaa" fontSize="12">Rs</text>

                            {/* Zener Position (Parallel) */}
                            <line x1="200" y1="50" x2="200" y2="250" stroke="#fff" strokeWidth="2" />
                            {/* Zener Symbol */}
                            <g transform="translate(200, 150)">
                                <path d="M-10,-10 L10,0 L-10,10 Z" fill="#222" stroke="#ff5252" strokeWidth="2" transform="rotate(-90)" />
                                <line x1="-15" y1="-10" x2="15" y2="-10" stroke="#ff5252" strokeWidth="2" />
                                <line x1="15" y1="-10" x2="15" y2="-5" stroke="#ff5252" strokeWidth="2" /> {/* Zener Crook */}
                                <line x1="-15" y1="-10" x2="-15" y2="-15" stroke="#ff5252" strokeWidth="2" /> {/* Zener Crook */}
                                <text x="20" y="5" fill="#ff5252" fontSize="12">Zener</text>
                                <text x="20" y="20" fill="#aaa" fontSize="10">{toMA(iZener)} mA</text>
                            </g>

                            {/* Load Resistor RL */}
                            <rect x="340" y="130" width="20" height="60" fill="#222" stroke="#fff" strokeWidth="2" />
                            <text x="380" y="150" textAnchor="middle" fill="#aaa" fontSize="12">RL</text>
                            <text x="380" y="170" textAnchor="middle" fill="var(--accent-cyan)" fontSize="12">{vout.toFixed(2)}V</text>

                        </svg>
                    </div>

                </div>
            </div>
            <div className="glass-panel" style={{ padding: '20px' }}>
                <h3>How it Works</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    The Zener diode is connected in reverse bias. When the voltage across it reaches the <strong>Zener Voltage (Vz = 5V)</strong>, it undergoes "breakdown" and allows current to flow freely, maintaining the voltage across itself at roughly 5V. This clamps the output voltage `Vout` to 5V even if `Vin` increases further (excess voltage is dropped across Rs).
                </p>
            </div>
        </div>
    );
};

export default ZenerDiode;
