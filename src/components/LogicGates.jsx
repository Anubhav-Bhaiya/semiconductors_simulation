import React, { useState } from 'react';

const LogicGates = () => {
    const [activeGate, setActiveGate] = useState('AND');
    const [inputA, setInputA] = useState(0);
    const [inputB, setInputB] = useState(0);

    const gates = {
        AND: {
            logic: (a, b) => a && b,
            symbol: (
                <path d="M10,10 V90 H50 A40,40 0 0,0 50,10 H10 Z" fill="none" stroke="currentColor" strokeWidth="3" />
            ),
            description: "Output is High (1) only if BOTH inputs are High."
        },
        OR: {
            logic: (a, b) => a || b,
            symbol: (
                <path d="M10,10 Q40,50 10,90 Q60,90 90,50 Q60,10 10,10 Z" fill="none" stroke="currentColor" strokeWidth="3" />
            ),
            description: "Output is High (1) if AT LEAST ONE input is High."
        },
        NOT: {
            logic: (a, b) => !a, // Ignores B
            symbol: (
                <g>
                    <path d="M10,10 L10,90 L80,50 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <circle cx="85" cy="50" r="5" stroke="currentColor" strokeWidth="3" fill="none" />
                </g>
            ),
            description: "Inverts the input. 0 becomes 1, 1 becomes 0. (Single Input)",
            singleInput: true
        },
        NAND: {
            logic: (a, b) => !(a && b),
            symbol: (
                <g>
                    <path d="M10,10 V90 H50 A40,40 0 0,0 50,10 H10 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <circle cx="95" cy="50" r="5" stroke="currentColor" strokeWidth="3" fill="none" />
                </g>
            ),
            description: "Output is Low (0) only if BOTH inputs are High. (NOT-AND)"
        },
        NOR: {
            logic: (a, b) => !(a || b),
            symbol: (
                <g>
                    <path d="M10,10 Q40,50 10,90 Q60,90 90,50 Q60,10 10,10 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <circle cx="95" cy="50" r="5" stroke="currentColor" strokeWidth="3" fill="none" />
                </g>
            ),
            description: "Output is Low (0) if ANY input is High. (NOT-OR)"
        }
    };

    const gate = gates[activeGate];
    const output = gate.logic(inputA, inputB) ? 1 : 0;

    // Truth Table Generator
    const truthTable = [];
    if (gate.singleInput) {
        truthTable.push({ a: 0, b: null, out: gate.logic(0, 0) ? 1 : 0 });
        truthTable.push({ a: 1, b: null, out: gate.logic(1, 0) ? 1 : 0 });
    } else {
        [0, 1].forEach(a => {
            [0, 1].forEach(b => {
                truthTable.push({ a, b, out: gate.logic(a, b) ? 1 : 0 });
            });
        });
    }

    return (
        <div style={{ padding: '20px', color: '#fff' }}>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h2>Logic Gates Lab</h2>

                {/* Gate Selector */}
                <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
                    {Object.keys(gates).map(g => (
                        <button
                            key={g}
                            onClick={() => setActiveGate(g)}
                            className="btn-primary"
                            style={{
                                background: activeGate === g ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                borderColor: activeGate === g ? 'var(--accent-cyan)' : 'transparent'
                            }}
                        >
                            {g}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                    {/* Simulation Area */}
                    <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--accent-cyan)' }}>{activeGate} Gate</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                            {/* Inputs */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <button
                                    onClick={() => setInputA(inputA ? 0 : 1)}
                                    style={{
                                        width: '60px', height: '60px', borderRadius: '50%',
                                        background: inputA ? 'var(--accent-cyan)' : '#333',
                                        color: '#fff', fontSize: '1.5rem', fontWeight: 'bold',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        boxShadow: inputA ? 'var(--accent-cyan-glow)' : 'none'
                                    }}
                                >
                                    {inputA}
                                </button>

                                {!gate.singleInput && (
                                    <button
                                        onClick={() => setInputB(inputB ? 0 : 1)}
                                        style={{
                                            width: '60px', height: '60px', borderRadius: '50%',
                                            background: inputB ? 'var(--accent-cyan)' : '#333',
                                            color: '#fff', fontSize: '1.5rem', fontWeight: 'bold',
                                            border: '2px solid rgba(255,255,255,0.2)',
                                            boxShadow: inputB ? 'var(--accent-cyan-glow)' : 'none'
                                        }}
                                    >
                                        {inputB}
                                    </button>
                                )}
                            </div>

                            {/* Symbol SVG */}
                            <div style={{ width: '150px', height: '100px', flexShrink: 0 }}>
                                <svg viewBox="0 0 120 100" style={{ width: '100%', height: '100%', color: '#fff' }}>
                                    {/* Input Lines */}
                                    {!gate.singleInput ? (
                                        <>
                                            <line x1="0" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="3" />
                                            <line x1="0" y1="70" x2="10" y2="70" stroke="currentColor" strokeWidth="3" />
                                        </>
                                    ) : (
                                        <line x1="0" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="3" />
                                    )}

                                    {/* The Gate */}
                                    {gate.symbol}

                                    {/* Output Line */}
                                    <line x1={activeGate.includes('N') ? 100 : 90} y1="50" x2={activeGate.includes('N') ? 120 : 110} y2="50" stroke="currentColor" strokeWidth="3" />
                                </svg>
                            </div>

                            {/* Output */}
                            <div>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    background: output ? 'var(--accent-purple)' : '#333',
                                    color: '#fff', fontSize: '1.5rem', fontWeight: 'bold',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    boxShadow: output ? 'var(--accent-purple-glow)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {output}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Truth Table */}
                    <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.3)' }}>
                        <h3>Truth Table</h3>
                        <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px' }}>{gate.description}</p>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #555' }}>
                                    <th style={{ padding: '10px', textAlign: 'center' }}>Input A</th>
                                    {!gate.singleInput && <th style={{ padding: '10px', textAlign: 'center' }}>Input B</th>}
                                    <th style={{ padding: '10px', textAlign: 'center' }}>Output</th>
                                </tr>
                            </thead>
                            <tbody>
                                {truthTable.map((row, idx) => {
                                    const isActive = row.a === inputA && (gate.singleInput || row.b === inputB);
                                    return (
                                        <tr
                                            key={idx}
                                            style={{
                                                background: isActive ? 'rgba(0, 243, 255, 0.1)' : 'transparent',
                                                fontWeight: isActive ? 'bold' : 'normal',
                                                color: isActive ? '#fff' : '#aaa'
                                            }}
                                        >
                                            <td style={{ padding: '10px', textAlign: 'center' }}>{row.a}</td>
                                            {!gate.singleInput && <td style={{ padding: '10px', textAlign: 'center' }}>{row.b}</td>}
                                            <td style={{ padding: '10px', textAlign: 'center', color: row.out ? 'var(--accent-purple)' : 'inherit' }}>{row.out}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LogicGates;
