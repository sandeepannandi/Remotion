import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';

const WordPairFlasher: React.FC<{ frame: number; start: number; text: string; speed?: number }> = ({ frame, start, text, speed = 12 }) => {
    const words = text.split(' ');
    const framePerPair = speed;
    const pairIndex = Math.floor((frame - start) / framePerPair);
    const startIndex = Math.min(pairIndex * 2, words.length - (words.length % 2 === 0 ? 0 : -1));

    // Safety check for indices
    const currentPair = words.slice(pairIndex * 2, pairIndex * 2 + 2).join(' ');

    return (
        <span>
            {currentPair}
        </span>
    );
};

export const FirstFrame: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const text = "What if tracking was automatic?";
    // 5 words = 3 pairs ("What if", "tracking was", "automatic?")
    // 3 pairs * 15 frames each = 45 frames per total narrative
    // But we'll use the user's preferred 1.7s (51 frames) for the whole transition block if desired, 
    // or just follow the same speed as the intro segments.
    // Let's use 18 frames per pair to make it readable but fast.

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
                        fontWeight: 800, // Extra Bold
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
