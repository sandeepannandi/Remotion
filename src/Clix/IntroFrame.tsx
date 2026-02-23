import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring
} from 'remotion';

const YouTubeLogo = ({ style }: { style?: React.CSSProperties }) => (
    <svg
        viewBox="0 0 24 24"
        style={{ width: 120, height: 120, ...style }}
    >
        <path
            fill="white"
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
    </svg>
);

const JitterFreeDots: React.FC<{ frame: number; start: number; text: string }> = ({ frame, start, text }) => {
    // Dots appear every 10 frames, with a 24-frame initial delay after the text appears (0.8s)
    const dotRevealStart = start + 24;
    const dot1Visible = frame >= dotRevealStart;
    const dot2Visible = frame >= dotRevealStart + 10;
    const dot3Visible = frame >= dotRevealStart + 20;

    return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <span>{text}</span>
            <span style={{ opacity: dot1Visible ? 1 : 0 }}>.</span>
            <span style={{ opacity: dot2Visible ? 1 : 0 }}>.</span>
            <span style={{ opacity: dot3Visible ? 1 : 0 }}>.</span>
        </span>
    );
};

export const IntroFrame: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timing
    const logoStart = 25;
    const secondPartStart = 45;

    // "Your video" entrance (from back)
    const introEntrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 80 },
    });

    // Logo entrance (comes from the 'o')
    const logoEntrance = spring({
        frame: frame - logoStart,
        fps,
        config: { damping: 18, stiffness: 100 },
    });

    // "isn't failing..." entrance
    const secondPartEntrance = spring({
        frame: frame - secondPartStart,
        fps,
        config: { damping: 20, stiffness: 100 },
    });

    // 1. Text shift when logo appears
    const logoShift = interpolate(logoEntrance, [0, 1], [0, -75]);

    // 2. Total shift and vanish
    const finalShift = interpolate(secondPartEntrance, [0, 1], [0, -400]);
    const totalFirstPartX = logoShift + finalShift;
    const firstPartOpacity = interpolate(secondPartEntrance, [0.3, 0.7], [1, 0]);

    // Logo specific movement (Emerging from the 'o')
    // We start scaled down and overlapping the 'o' slightly
    const logoX = interpolate(logoEntrance, [0, 1], [-100, 0]);
    const logoOpacity = interpolate(logoEntrance, [0, 0.4], [0, 1]);
    const logoScale = interpolate(logoEntrance, [0, 1], [0, 1]);

    // Second part movement
    const secondPartX = interpolate(secondPartEntrance, [0, 1], [800, 0]);
    const secondPartOpacity = interpolate(secondPartEntrance, [0, 0.5], [0, 1]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#f28c3a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Archivo', sans-serif",
                color: 'white',
                fontWeight: 900,
                overflow: 'hidden'
            }}
        >
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&display=swap');`}
            </style>

            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* Part 1: Your video + YouTube Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        transform: `translateX(${totalFirstPartX}px) scale(${interpolate(introEntrance, [0, 1], [0.5, 1])})`,
                        opacity: introEntrance * firstPartOpacity,
                        position: 'absolute'
                    }}
                >
                    <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>
                        Your vide<span>o</span>
                    </h1>
                    <YouTubeLogo
                        style={{
                            transform: `translateX(${logoX}px) scale(${logoScale})`,
                            opacity: logoOpacity,
                            marginLeft: 35
                        }}
                    />
                </div>

                {/* Part 2: isn't failing... */}
                {frame >= secondPartStart && (
                    <div
                        style={{
                            transform: `translateX(${secondPartX}px)`,
                            opacity: secondPartOpacity,
                            position: 'absolute'
                        }}
                    >
                        <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>
                            <JitterFreeDots frame={frame} start={secondPartStart} text="isn't failing" />
                        </h1>
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
