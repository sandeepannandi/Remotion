import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';

export const FirstFrame: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation 1: Initial "What" entrance (zoom-out)
    // Starts at frame 0, ends at frame 15
    const whatEntrance = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 200 },
    });

    // Animation 2: The shift (happens fast)
    // Starts at frame 20, ends at frame 32 (12 frames = 0.4s)
    const shiftProgress = spring({
        frame: frame - 20,
        fps,
        config: { damping: 20, stiffness: 200 },
    });

    // Interpolations for "What"
    // Zoom out entrance: start big, settle to normal
    const initialZoom = interpolate(whatEntrance, [0, 1], [3, 1]);
    const entranceOpacity = interpolate(whatEntrance, [0, 0.5], [0, 1]);

    // Shift transitions
    const shiftScale = interpolate(shiftProgress, [0, 1], [1, 0.7]);
    const whatX = interpolate(shiftProgress, [0, 1], [0, -160]);

    // Final What scale combines entrance zoom and shift reduction
    const finalWhatScale = initialZoom * shiftScale;

    // Interpolations for "if"
    // "if" should be smaller than "what" (e.g., 0.6 scale relative to what's final size)
    const ifOpacity = interpolate(shiftProgress, [0, 0.5], [0, 1]);
    const ifX = interpolate(shiftProgress, [0, 1], [400, 160]); // 178px gap from center
    const ifScale = interpolate(shiftProgress, [0, 1], [0.3, 0.6]);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#00bf63',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Garet', sans-serif",
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
                {/* "What" text */}
                <div
                    style={{
                        color: 'white',
                        fontSize: 200,
                        fontWeight: '600', // Semibold
                        opacity: entranceOpacity,
                        transform: `translateX(${whatX}px) scale(${finalWhatScale})`,
                        position: 'absolute',
                        textShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    }}
                >
                    What
                </div>

                {/* "if" text */}
                <div
                    style={{
                        color: 'white',
                        fontSize: 210,
                        fontWeight: '600', // Semibold
                        opacity: ifOpacity,
                        transform: `translateX(${ifX}px) scale(${ifScale})`,
                        position: 'absolute',
                        textShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    }}
                >
                    if
                </div>
            </div>
        </AbsoluteFill>
    );
};
