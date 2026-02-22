import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring
} from 'remotion';

const DotAnimation: React.FC<{ frame: number; start: number; text: string }> = ({ frame, start, text }) => {
    // 1.7s total duration = 51 frames. Dots appear faster: 15, 25, 35 frames in.
    const dot1 = frame >= start + 15 ? "." : "";
    const dot2 = frame >= start + 25 ? "." : "";
    const dot3 = frame >= start + 35 ? "." : "";

    return (
        <span>
            {text}{dot1}{dot2}{dot3}
        </span>
    );
};

const WordPairFlasher: React.FC<{ frame: number; start: number; text: string; speed?: number }> = ({ frame, start, text, speed = 12 }) => {
    const words = text.split(' ');
    const framePerPair = speed;
    const pairIndex = Math.floor((frame - start) / framePerPair);
    const startIndex = Math.min(pairIndex * 2, words.length - 2);

    return (
        <span>
            {words.slice(startIndex, startIndex + 2).join(' ')}
        </span>
    );
};

export const VideoOverlay: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Mapping segments with specific durations
    const segments = [
        { start: 0, end: 51, baseText: "Bills everywhere", type: 'flip' },
        { start: 53, end: 104, baseText: "Subscriptions you forgot about", type: 'flip' },
        { start: 106, end: 157, baseText: "Expenses you think you remember", type: 'flip' },
        { start: 159, end: 210, baseText: "And somehow", type: 'special' },
        { start: 210, end: 261, baseText: "money just disappears", type: 'fade-only' },
        { start: 263, end: 314, baseText: "You work hard.", type: 'flip' },
        { start: 316, end: 367, baseText: "But you don’t know where your money goes.", type: 'reveal', speed: 12 },
        { start: 369, end: 414, baseText: "Tracking manually?", type: 'scroll' },
        { start: 416, end: 461, baseText: "Spreadsheets?", type: 'scroll' },
        { start: 463, end: 508, baseText: "Notes app?", type: 'scroll' },
        { start: 510, end: 558, baseText: "That’s a pain in the ass.", type: 'reveal', speed: 9 }, // Reduced to 48 frames and faster flasher
    ];

    const activeSegmentIndex = segments.findIndex(s => frame >= s.start && frame <= s.end);
    const activeSegment = segments[activeSegmentIndex];

    let opacity = 0;
    let rotateX = 0;
    let scale = 1;
    let transform = 'none';

    if (activeSegment) {
        const relativeFrame = frame - activeSegment.start;
        const segDuration = activeSegment.end - activeSegment.start;

        const entrance = spring({
            frame: relativeFrame,
            fps,
            config: { damping: 25, stiffness: 300 },
        });

        const exit = spring({
            frame: relativeFrame - (segDuration - 6),
            fps,
            config: { damping: 25, stiffness: 300 },
        });

        if (activeSegment.type === 'flip' || activeSegment.type === 'reveal' || (activeSegment.type === 'fade-only' && activeSegmentIndex > 4)) {
            rotateX = interpolate(entrance, [0, 1], [90, 0]) + interpolate(exit, [0, 1], [0, -90]);
            opacity = interpolate(entrance, [0, 0.4], [0, 1]) * interpolate(exit, [0.6, 1], [1, 0]);
            scale = interpolate(entrance, [0, 1], [0.95, 1]);
        } else if (activeSegment.type === 'scroll') {
            const scrollEntranceY = interpolate(entrance, [0, 1], [100, 0]);
            const scrollExitY = interpolate(exit, [0, 1], [0, -100]);
            transform = `translateY(${scrollEntranceY + scrollExitY}px)`;
            opacity = interpolate(entrance, [0, 0.4], [0, 1]) * interpolate(exit, [0.6, 1], [1, 0]);
        } else if (activeSegment.type === 'special') {
            opacity = entrance;
        }
    }

    const moneySequenceStart = 210;
    const finalShiftProgress = spring({
        frame: frame - moneySequenceStart,
        fps,
        config: { damping: 25, stiffness: 300 },
    });

    const andSomehowX = interpolate(finalShiftProgress, [0, 1], [0, -200]);
    const andSomehowFinalOpacity = interpolate(finalShiftProgress, [0.3, 0.7], [1, 0]);
    const moneyOpacity = interpolate(finalShiftProgress, [0.2, 0.6], [0, 1]);
    const moneyX = interpolate(finalShiftProgress, [0, 1], [250, 0]);

    // Update total intro disappearance
    const totalIntroOpacity = interpolate(frame, [558, 567], [1, 0]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AbsoluteFill style={{ backgroundColor: 'rgba(255, 255, 255, 0.35)', opacity: totalIntroOpacity }} />

            {/* segments 0, 1, 2 */}
            {activeSegmentIndex !== -1 && activeSegmentIndex < 3 && (
                <div style={{ transform: `rotateX(${rotateX}deg) scale(${scale})`, opacity: opacity * totalIntroOpacity, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                    <h1 style={{ color: 'black', fontSize: 85, fontWeight: 800, textAlign: 'center', fontFamily: "'Geist', sans-serif", margin: 0 }}>
                        <DotAnimation frame={frame} start={activeSegment.start} text={activeSegment.baseText} />
                    </h1>
                </div>
            )}

            {/* "And somehow... money just disappears." */}
            {frame >= 159 && frame < 263 && (
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: totalIntroOpacity }}>
                    <div style={{ opacity: (frame < moneySequenceStart ? 1 : andSomehowFinalOpacity) * (frame < 159 ? 0 : 1), transform: `translateX(${andSomehowX}px)`, color: 'black', fontSize: 85, fontWeight: 800, fontFamily: "'Geist', sans-serif", position: 'absolute' }}>
                        <DotAnimation frame={frame} start={159} text="And somehow" />
                    </div>
                    {frame >= moneySequenceStart && (
                        <div style={{ opacity: moneyOpacity, transform: `translateX(${moneyX}px)`, color: 'black', fontSize: 85, fontWeight: 800, fontFamily: "'Geist', sans-serif", position: 'absolute', textAlign: 'center', width: '100%' }}>
                            money just disappears.
                        </div>
                    )}
                </AbsoluteFill>
            )}

            {/* reveal/flip segments after money sequence */}
            {activeSegmentIndex >= 5 && (activeSegment.type === 'flip' || activeSegment.type === 'reveal') && (
                <div style={{ transform: `rotateX(${rotateX}deg) scale(${scale})`, opacity: opacity * totalIntroOpacity, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                    <h1 style={{ color: 'black', fontSize: 85, fontWeight: 800, textAlign: 'center', fontFamily: "'Geist', sans-serif", margin: 0 }}>
                        {activeSegment.type === 'reveal' ? (
                            <WordPairFlasher frame={frame} start={activeSegment.start} text={activeSegment.baseText} speed={activeSegment.speed} />
                        ) : (
                            activeSegment.baseText
                        )}
                    </h1>
                </div>
            )}

            {/* scrolling segments */}
            {activeSegmentIndex >= 7 && activeSegment.type === 'scroll' && (
                <div style={{ transform, opacity: opacity * totalIntroOpacity, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, position: 'absolute' }}>
                    <h1 style={{ color: 'black', fontSize: 85, fontWeight: 800, textAlign: 'center', fontFamily: "'Geist', sans-serif", margin: 0 }}>
                        {activeSegment.baseText}
                    </h1>
                </div>
            )}
        </AbsoluteFill>
    );
};
