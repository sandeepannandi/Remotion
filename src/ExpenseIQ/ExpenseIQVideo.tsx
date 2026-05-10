import React from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    staticFile,
} from 'remotion';

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

const SITUATION_ASSETS = [
    { src: "bills.jpg", label: "Bills" },
    { src: "debt.jpg", label: "Debt" },
    { src: "inflation.jpg", label: "Inflation" },
    { src: "loan.jpg", label: "Loan" },
    { src: "marketcrash.jpg", label: "Market Crash" },
    { src: "mortage.jpg", label: "Mortgage" },
];

export const ExpenseIQVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const bgColor = "#fff6e8ff";
    const textColor = "#FF6A00";

    // Timing Constants
    const introEnd = 20;
    const palEnd = 46;
    const wordDuration = 8;

    // Stage 1: "Introducing"
    const introOpacity = interpolate(frame, [0, 6, 14, 20], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const introY = interpolate(frame, [14, 20], [0, -400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Stage 2: "ExpensePal" + Logo
    const palOpacity = interpolate(frame, [20, 26, 40, 46], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const palY = interpolate(frame, [20, 26], [400, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const palX = interpolate(frame, [40, 46], [0, -600], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Stage 3: The / Only 
    const theStart = 46;
    const onlyStart = 54;
    
    // Stage 4: "expense tracker" + Mockup
    const trackerStart = 62;
    const trackerEnd = 100;
    const trackerOpacity = interpolate(frame, [trackerStart, trackerStart + 5, trackerEnd - 5, trackerEnd], [0, 1, 1, 0], { extrapolateLeft: 'clamp' });
    const mockupX = interpolate(frame, [trackerStart, trackerStart + 10], [1000, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Stage 5: Middle words
    const sentencePart2Start = 100;
    const sentencePart2Words = ["you'll", "ever", "need", "in", "any"];
    
    // Stage 6: "situation" + Card Stream
    const situationStart = 140;
    // Word "situation" just fades
    const situationOpacity = interpolate(frame, [situationStart, situationStart + 5, situationStart + 25, situationStart + 35], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: bgColor,
                backgroundImage: `url("${noiseUrl}")`,
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Geist', sans-serif",
                color: textColor,
                overflow: 'hidden'
            }}
        >
            {/* Stage 1: Introducing */}
            {frame < introEnd && (
                <div style={{ position: 'absolute', opacity: introOpacity, transform: `translateY(${introY}px)` }}>
                    <h1 style={{ fontSize: "160px", fontWeight: 900, margin: 0 }}>Introducing</h1>
                </div>
            )}

            {/* Stage 2: ExpensePal + Logo */}
            {frame >= 20 && frame < palEnd && (
                <div style={{ position: 'absolute', opacity: palOpacity, transform: `translateY(${palY}px) translateX(${palX}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={staticFile("eplogo.png")} style={{ width: "200px", height: "auto", marginBottom: "20px" }} />
                    <h1 style={{ fontSize: "200px", fontWeight: 800, margin: 0 }}>ExpensePal</h1>
                </div>
            )}

            {/* Stage 3: "the" and "only" */}
            {frame >= theStart && frame < trackerStart && (
                <div style={{ position: 'absolute' }}>
                    {frame < onlyStart ? (
                        <h1 style={{ fontSize: "180px", fontWeight: 900, opacity: interpolate(frame - theStart, [0, 3], [0, 1], {extrapolateRight: 'clamp'}) }}>the</h1>
                    ) : (
                        <h1 style={{ fontSize: "180px", fontWeight: 900, opacity: interpolate(frame - onlyStart, [0, 3], [0, 1], {extrapolateRight: 'clamp'}) }}>only</h1>
                    )}
                </div>
            )}

            {/* Stage 4: "expense tracker" + Mockup */}
            {frame >= trackerStart && frame < trackerEnd && (
                <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', opacity: trackerOpacity, width: '100%', justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: "150px", fontWeight: 900, marginLeft: '200px' }}>Expense Tracker</h1>
                    <img 
                        src={staticFile("epmock.png")} 
                        style={{ 
                            width: "750px", 
                            height: "auto", 
                            transform: `translateX(${mockupX}px)`,
                            marginRight: '0px'
                        }} 
                    />
                </div>
            )}

            {/* Stage 5: Middle words */}
            {frame >= sentencePart2Start && frame < situationStart && (
                <div style={{ position: 'absolute' }}>
                    {(() => {
                        const wordIdx = Math.floor((frame - sentencePart2Start) / wordDuration);
                        const relFrame = (frame - sentencePart2Start) % wordDuration;
                        return (
                            <h1 style={{ 
                                fontSize: "180px", 
                                fontWeight: 900, 
                                opacity: interpolate(relFrame, [0, 3], [0, 1], {extrapolateRight: 'clamp'}) 
                            }}>
                                {sentencePart2Words[wordIdx]}
                            </h1>
                        );
                    })()}
                </div>
            )}

            {/* Stage 6: "situation" + Card Stream */}
            {frame >= situationStart && (
                <>
                    {/* "situation" text fades in/out, cards go OVER it */}
                    <div style={{ 
                        position: 'absolute', 
                        opacity: situationOpacity, 
                        zIndex: 0 
                    }}>
                        <h1 style={{ fontSize: "180px", fontWeight: 900 }}>situation</h1>
                    </div>

                    {/* Image Cards Stream */}
                    {SITUATION_ASSETS.map((asset, i) => {
                        const cardStart = situationStart + 5 + (i * 11); // Closer together
                        if (frame < cardStart) return null;
                        
                        // Card moves from right to left
                        const x = interpolate(frame, [cardStart, cardStart + 50], [1920, -1200]);
                        
                        return (
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    transform: `translate(${x}px, -50%) rotate(4deg)`,
                                    width: '600px', // Bigger size
                                    height: '800px', // Bigger size
                                    borderRadius: '60px', // Increased roundness
                                    overflow: 'hidden',
                                    boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
                                    border: '8px solid #FF6A00', // Orange border
                                    zIndex: i + 1,
                                    backgroundColor: '#FF6A00',
                                }}
                            >
                                <img src={staticFile(asset.src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {/* Caption at bottom */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    backgroundColor: 'rgba(255, 106, 0, 1)',
                                    padding: '20px 0',
                                    textAlign: 'center',
                                    color: 'white',
                                    fontSize: '40px',
                                    fontWeight: 600,
                                    fontFamily: "'Geist', sans-serif"
                                }}>
                                    {asset.label}
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </AbsoluteFill>
    );
};
