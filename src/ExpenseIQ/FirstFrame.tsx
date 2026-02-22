import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';

const WordPairFlasher: React.FC<{ frame: number; start: number; text: string; speed?: number }> = ({ frame, start, text, speed = 18 }) => {
    const words = text.split(' ');
    const pairIndex = Math.floor((frame - start) / speed);

    // Safety check: if we're past the last possible pair, stay on the last one
    const safePairIndex = Math.min(pairIndex, Math.ceil(words.length / 2) - 1);
    const startWordIndex = safePairIndex * 2;
    const currentWords = words.slice(startWordIndex, startWordIndex + 2);

    const isLastSegment = startWordIndex + 2 >= words.length;

    return (
        <span style={{ position: 'relative' }}>
            {currentWords.map((word, i) => {
                const isAutomatic = word.toLowerCase().includes('automatic');
                if (isAutomatic) {
                    return (
                        <span
                            key={word}
                            style={{
                                display: 'inline-block',
                                background: '#fff',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundPosition: `${(frame * 2) % 200}% 0%`,
                                filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
                                marginLeft: i === 0 ? 0 : '15px'
                            }}
                        >
                            {word}
                        </span>
                    );
                }
                return (
                    <span key={word} style={{ marginLeft: i === 0 ? 0 : '15px' }}>
                        {word}
                    </span>
                );
            })}
        </span>
    );
};

export const FirstFrame: React.FC = () => {
    const frame = useCurrentFrame();

    const text = "What if tracking was automatic?";
    const startFrame = 0;
    const speed = 18;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#00bf63',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <h1
                    style={{
                        color: 'white',
                        fontSize: 120,
                        fontWeight: 800,
                        fontFamily: "'Geist', sans-serif",
                        textAlign: 'center',
                    }}
                >
                    <WordPairFlasher
                        frame={frame}
                        start={startFrame}
                        text={text}
                        speed={speed}
                    />
                </h1>
            </div>
        </AbsoluteFill>
    );
};
