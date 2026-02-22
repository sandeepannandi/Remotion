import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring
} from 'remotion';

const DotAnimation: React.FC<{ frame: number; start: number; text: string }> = ({ frame, start, text }) => {
    // 2.5s total duration = 75 frames. Dots appear at 20, 35, 50 frames into the segment.
    const dot1 = frame >= start + 20 ? "." : "";
    const dot2 = frame >= start + 35 ? "." : "";
    const dot3 = frame >= start + 50 ? "." : "";

    return (
        <span>
            {text}{dot1}{dot2}{dot3}
        </span>
    );
};

export const VideoOverlay: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Segment duration: 75 frames (2.5s at 30fps)
    const segments = [
        { start: 0, end: 75, baseText: "Bills everywhere" },
        { start: 77, end: 152, baseText: "Subscriptions you forgot about" },
        { start: 154, end: 229, baseText: "Expenses you think you remember" },
        { start: 231, end: 320, baseText: "And somehow" }, // Extended end to allow for transition
    ];

    const activeSegmentIndex = segments.findIndex(s => frame >= s.start && frame <= s.end);
    const activeSegment = segments[activeSegmentIndex];

    let opacity = 0;
    let rotateX = 0;
    let scale = 1;

    if (activeSegment) {
        const relativeFrame = frame - activeSegment.start;
        const segDuration = activeSegment.end - activeSegment.start;

        // Entrance
        const entrance = spring({
            frame: relativeFrame,
            fps,
            config: { damping: 25, stiffness: 300 },
        });

        // Exit (for standard segments)
        const exit = spring({
            frame: relativeFrame - (segDuration - 6),
            fps,
            config: { damping: 25, stiffness: 300 },
        });

        if (activeSegmentIndex === 3) {
            rotateX = 0;
            // "And somehow" entrance stays, disappearance handled by moneySequence logic
            opacity = entrance;
        } else {
            rotateX = interpolate(entrance, [0, 1], [90, 0]) + interpolate(exit, [0, 1], [0, -90]);
            opacity = interpolate(entrance, [0, 0.4], [0, 1]) * interpolate(exit, [0.6, 1], [1, 0]);
        }
        scale = interpolate(entrance, [0, 1], [0.95, 1]);
    }

    // Final Transition (And somehow... money just disappears.)
    // Start transition earlier to make it feel snappier
    const moneySequenceStart = 310;
    const finalShiftProgress = spring({
        frame: frame - moneySequenceStart,
        fps,
        config: { damping: 25, stiffness: 300 },
    });

    // Animate "And somehow..." moving left AND fading out
    const andSomehowX = interpolate(finalShiftProgress, [0, 1], [0, -200]);
    const andSomehowFinalOpacity = interpolate(finalShiftProgress, [0.3, 0.7], [1, 0]);

    // Animate "money just disappears." moving into center from right
    // We use a separate AbsoluteFill for the final state to ensure perfect centering
    const moneyOpacity = interpolate(finalShiftProgress, [0.2, 0.6], [0, 1]);
    const moneyX = interpolate(finalShiftProgress, [0, 1], [300, 0]);

    // Overall disappearance of the intro text at the very end of 18s (540 frames)
    const totalIntroOpacity = interpolate(frame, [510, 540], [1, 0]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* Light white overlay */}
            <AbsoluteFill style={{ backgroundColor: 'rgba(255, 255, 255, 0.35)', opacity: totalIntroOpacity }} />

            {/* Standard Flipping Segments (0, 1, 2) */}
            {activeSegmentIndex !== -1 && activeSegmentIndex < 3 && (
                <div
                    style={{
                        transform: `rotateX(${rotateX}deg) scale(${scale})`,
                        opacity: opacity * totalIntroOpacity,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <h1 style={{
                        color: 'black',
                        fontSize: 85,
                        fontWeight: 800,
                        textAlign: 'center',
                        fontFamily: "'Geist', sans-serif",
                        margin: 0,
                    }}>
                        <DotAnimation frame={frame} start={activeSegment.start} text={activeSegment.baseText} />
                    </h1>
                </div>
            )}

            {/* Final Sequence Transition Logic */}
            {frame >= 231 && frame < 540 && (
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: totalIntroOpacity }}>
                    {/* "And somehow..." - shifts and disappears */}
                    <div style={{
                        opacity: (frame < moneySequenceStart ? opacity : andSomehowFinalOpacity),
                        transform: `translateX(${andSomehowX}px)`,
                        color: 'black',
                        fontSize: 85,
                        fontWeight: 800,
                        fontFamily: "'Geist', sans-serif",
                        position: 'absolute'
                    }}>
                        <DotAnimation frame={frame} start={231} text="And somehow" />
                    </div>

                    {/* "money just disappears." - arrives and stays centered */}
                    {frame >= moneySequenceStart && (
                        <div style={{
                            opacity: moneyOpacity,
                            transform: `translateX(${moneyX}px)`,
                            color: 'black',
                            fontSize: 85,
                            fontWeight: 800,
                            fontFamily: "'Geist', sans-serif",
                            position: 'absolute',
                            textAlign: 'center',
                            width: '100%'
                        }}>
                            money just disappears.
                        </div>
                    )}
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
