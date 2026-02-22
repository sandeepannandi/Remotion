import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const ProsperityFlash: React.FC = () => {
    const frame = useCurrentFrame();
    // A quick punchy flash: 0 to 10 to 20 frames
    // Reaches full opacity at frame 10 (the exact point of cut)
    const opacity = interpolate(frame, [0, 10, 20], [0, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#00bf63',
                opacity,
                zIndex: 100, // Ensure it's on top of everything
            }}
        />
    );
};
