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
    const whatX = interpolate(shiftProgress, [0, 1], [0, -145]); // Slightly adjusted for better visual centering

    // Final What scale combines entrance zoom and shift reduction
    const finalWhatScale = initialZoom * shiftScale;

    // Interpolations for "if"
    // Speed up "if" appearance: starts at the beginning of the shift and finishes quickly
    const ifOpacity = interpolate(frame, [20, 26], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const ifX = interpolate(shiftProgress, [0, 1], [400, 145]);
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
                    position: 'relative',
                }}
            >
                {/* "What" text */}
                <div
                    style={{
                        color: 'white',
                        fontSize: 200,
                        fontWeight: 600, // Semibold
                        opacity: entranceOpacity,
                        transform: `translateX(${whatX}px) scale(${finalWhatScale})`,
                        position: 'absolute',
                        // No shadows
                    }}
                >
                    What
                </div>

                {/* "if" text */}
                <div
                    style={{
                        color: 'white',
                        fontSize: 210, // Matching user's previous manual edit
                        fontWeight: 600, // Semibold
                        opacity: ifOpacity,
                        transform: `translateX(${ifX}px) scale(${ifScale})`,
                        position: 'absolute',
                        // Fixed vertical alignment (font baseline might differ, but absolute position in flex center should keep them aligned)
                        // No shadows
                    }}
                >
                    if
                </div>
            </div>
        </AbsoluteFill>
    );
};
