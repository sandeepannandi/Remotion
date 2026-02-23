import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';

export const FirstFrame: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Phase 1: "What if tracking was automatic?" ---
    // Timing: 0-18 ("What if"), 18-36 ("tracking was"), 36-81 ("automatic?")

    const autoFrame = frame - 36;
    let autoScale = 1;
    let autoOpacity = 1;

    if (autoFrame >= 0) {
        if (autoFrame < 10) {
            autoScale = 1.3; // Step 1 (Instant)
        } else if (autoFrame < 20) {
            autoScale = 1.6; // Step 2 (Instant)
        } else if (autoFrame < 30) {
            autoScale = 2.0; // Step 3 (Instant)
        } else if (autoFrame <= 35) {
            // Zoom in FAST (Instant feel) - reduced from 15 frames to 5 frames
            autoScale = interpolate(autoFrame, [30, 35], [2.0, 15], { extrapolateRight: 'clamp' });
            autoOpacity = interpolate(autoFrame, [33, 35], [1, 0]);
        } else {
            autoOpacity = 0;
        }
    }

    // --- Phase 2: Brand Reveal (starts after frame 71) ---
    const brandStart = 72;
    const brandEntrance = spring({
        frame: frame - brandStart,
        fps,
        config: { damping: 20, stiffness: 120 },
    });

    // Meet ExpenseIQ zooms OUT (shrinks from large to 1)
    const brandScale = interpolate(brandEntrance, [0, 1], [4, 1]);
    const brandOpacity = interpolate(brandEntrance, [0, 0.4], [0, 1]);

    // Subtext timing: appear 1.3s (39 frames) after brand title (0.4s + 0.9s)
    const subtextStart = brandStart + 40;
    const subtextEntrance = spring({
        frame: frame - subtextStart,
        fps,
        config: { damping: 15, stiffness: 180 }, // Faster/Smoother config
    });

    // Meet ExpenseIQ moves up as subtext arrives (Smoother and Faster)
    const titleY = interpolate(subtextEntrance, [0, 1], [0, -45]);
    const subtextY = interpolate(subtextEntrance, [0, 1], [70, 0]);
    const subtextOpacity = interpolate(subtextEntrance, [0, 0.7], [0, 1]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#00bf63',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    fontFamily: "'Geist', sans-serif",
                    color: 'white',
                    fontWeight: 800,
                }}
            >
                {/* What if / tracking was */}
                {frame < 36 && (
                    <h1 style={{ fontSize: 120, margin: 0 }}>
                        {frame < 18 ? "What if" : "tracking was"}
                    </h1>
                )}

                {/* automatic? (with instant growth steps and ultra-fast zoom in) */}
                {frame >= 36 && frame < brandStart && (
                    <h1 style={{
                        fontSize: 120,
                        margin: 0,
                        transform: `scale(${autoScale})`,
                        opacity: autoOpacity
                    }}>
                        automatic?
                    </h1>
                )}

                {/* Meet ExpenseIQ. */}
                {frame >= brandStart && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transform: `translateY(${titleY}px)`,
                        opacity: brandOpacity
                    }}>
                        <h1 style={{
                            fontSize: 140,
                            margin: 0,
                            transform: `scale(${brandScale})`
                        }}>
                            Meet ExpenseIQ.
                        </h1>

                        {/* Subtext */}
                        {frame >= subtextStart && (
                            <h2 style={{
                                fontSize: 60,
                                margin: 0,
                                fontWeight: 600,
                                opacity: subtextOpacity,
                                transform: `translateY(${subtextY}px)`,
                                marginTop: 20
                            }}>
                                The AI-powered expense tracker.
                            </h2>
                        )}
                    </div>
                )}
            </div>
        </AbsoluteFill>
    );
};
