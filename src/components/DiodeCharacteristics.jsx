import React, { useState } from 'react';

const DiodeCharacteristics = () => {
    const [voltage, setVoltage] = useState(0); // -10 to +2 V

    // Shockley Diode Equation approximation for visualization
    // I = Is * (e^(V/nVt) - 1)
    // For Si: Knee ~ 0.7V, Breakdown ~ -5V (simulated)

    const calculateCurrent = (v) => {
        const Vt = 0.026; // Thermal voltage
        const Is = 1e-12; // Saturation current
        const n = 1.5; // Ideality factor

        if (v > 0) {
            // Forward Bias: Exponential growth
            // Visual scaling
            if (v < 0.5) return 0;
            return Math.pow((v - 0.5), 3) * 100; // Fake exponential for chart readability
        } else {
            // Reverse Bias
            // Breakdown region simulation
            const breakdownVoltage = -6;
            if (v < breakdownVoltage) {
                return -Math.pow((Math.abs(v) - Math.abs(breakdownVoltage)), 3) * 50;
            }
            return -0.01; // Leakage
        }
    };

    const current = calculateCurrent(voltage);

    // Graph plotting
    const width = 600;
    const height = 400;
    const originX = width / 2;
    const originY = height / 2;
    const scaleX = 40; // pixels per Volt
    const scaleY = 4; // pixels per mA (approx)

    // Generate path points
    const points = [];
    for (let v = -8; v <= 1.5; v += 0.1) {
        const i = calculateCurrent(v);
        const x = originX + v * scaleX;
        const y = originY - i * scaleY; // Y is inverted in SVG
        points.push(`${x},${y}`);
    }

    const currentX = originX + voltage * scaleX;
    const currentY = originY - current * scaleY;

    return (
        <div style={{ padding: '20px', color: '#fff' }}>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h2>Diode I-V Characteristics</h2>
                <div style={{ marginTop: '20px', display: 'flex', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <label>Applied Voltage (V_f): </label>
                        <input
                            type="range"
                            min="-8"
                            max="1.5"
                            step="0.05"
                            value={voltage}
                            onChange={(e) => setVoltage(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <span>Voltage: <strong style={{ color: 'var(--accent-cyan)' }}>{voltage.toFixed(2)} V</strong></span>
                            <span>Current: <strong style={{ color: 'var(--accent-purple)' }}>{current.toFixed(4)} mA</strong></span>
                        </div>
                        <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <p>• <strong>Forward Bias ({'>'}0V):</strong> Current is negligible until knee voltage (~0.7V for Si), then rises exponentially.</p>
                            <p>• <strong>Reverse Bias ({'<'}0V):</strong> Minimal leakage current flows until Breakdown Voltage (-6V in this sim), where current surges negatively (Avalanche/Zener effect).</p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.4)', padding: '10px' }}>
                        <svg width={width} height={height} style={{ overflow: 'visible' }}>
                            {/* Grid Lines */}
                            <line x1={0} y1={originY} x2={width} y2={originY} stroke="#ffffff33" strokeWidth="1" />
                            <line x1={originX} y1={0} x2={originX} y2={height} stroke="#ffffff33" strokeWidth="1" />

                            {/* Curve */}
                            <polyline
                                points={points.join(' ')}
                                fill="none"
                                stroke="var(--accent-purple)"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />

                            {/* Active Point */}
                            <circle
                                cx={currentX}
                                cy={currentY}
                                r="6"
                                fill="var(--accent-cyan)"
                                style={{
                                    filter: 'drop-shadow(0 0 5px var(--accent-cyan))',
                                    transition: 'all 0.1s linear'
                                }}
                            />

                            {/* Labels */}
                            <text x={width - 20} y={originY - 10} fill="#fff" fontSize="12">V</text>
                            <text x={originX + 10} y={20} fill="#fff" fontSize="12">I</text>
                            <text x={originX + (0.7 * scaleX)} y={originY + 20} fill="#aaa" fontSize="10">0.7V (Knee)</text>
                            <text x={originX + (-6 * scaleX)} y={originY + 20} fill="#aaa" fontSize="10">-6V (Breakdown)</text>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiodeCharacteristics;
