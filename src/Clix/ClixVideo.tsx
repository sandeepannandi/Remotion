import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
    Img,
    Sequence,
    staticFile
} from 'remotion';

// --- Sub-components ---

const YouTubeLogo = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" style={{ width: 120, height: 120, ...style }}>
        <path fill="white" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const JitterFreeDots: React.FC<{ frame: number; start: number; text: string; fontSize?: number }> = ({ frame, start, text, fontSize = 90 }) => {
    const dotRevealStart = start + 8;
    return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline', fontSize }}>
            <span>{text}</span>
            <span style={{ opacity: frame >= dotRevealStart ? 1 : 0 }}>.</span>
            <span style={{ opacity: frame >= dotRevealStart + 6 ? 1 : 0 }}>.</span>
            <span style={{ opacity: frame >= dotRevealStart + 12 ? 1 : 0 }}>.</span>
        </span>
    );
};

const MountainThumbnail = ({ style }: { style?: React.CSSProperties }) => (
    <div style={{ width: 220, height: 140, backgroundColor: 'white', borderRadius: 15, padding: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', ...style }}>
        <div style={{ flex: 1, position: 'relative', borderRadius: 10, overflow: 'hidden', backgroundColor: '#e0e0e0' }}>
            <svg viewBox="0 0 100 50" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <path d="M0 50 L30 15 L60 50 Z" fill="#4CAF50" />
                <path d="M40 50 L70 10 L100 50 Z" fill="#388E3C" />
                <path d="M20 50 L50 25 L80 50 Z" fill="#2E7D32" />
            </svg>
        </div>
        <div style={{ height: 15, marginTop: 8, display: 'flex', gap: 5 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#bdbdbd' }} />
            <div style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: '#bdbdbd', marginTop: 3 }} />
        </div>
    </div>
);

// --- Issue Graphics ---

const SquareIssue = () => (
    <div style={{ width: 600, height: 350, backgroundColor: '#333', borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '6px solid #555', boxShadow: '0 15px 40px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
        {/* 16:9 Container Background */}
        <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', justifyContent: 'center' }}>
            {/* Square Image Squeezed In */}
            <div style={{ width: 350, height: 350, backgroundColor: '#f28c3a', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <MountainThumbnail style={{ width: 150, height: 100, transform: 'scale(1.5)' }} />
                <div style={{ position: 'absolute', color: '#ff4444', fontSize: 180, fontWeight: 900, opacity: 0.8 }}>✕</div>
            </div>
            {/* White Gaps represented by empty space */}
            <div style={{ position: 'absolute', left: 0, width: 125, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', right: 0, width: 125, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 20, backgroundColor: '#ff4444', padding: '5px 15px', borderRadius: 5, color: 'white', fontSize: 24, fontWeight: 'bold' }}>SQUARE ERROR</div>
    </div>
);

const RatioIssue = () => (
    <div style={{ width: 600, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Smartphone Frame */}
        <div style={{ width: 500, height: 250, backgroundColor: '#111', borderRadius: 30, border: '8px solid #444', display: 'flex', padding: 5, position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: 1, backgroundColor: 'black', borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Horizontal video inside vertical space or vice versa */}
                <div style={{ height: 60, width: '100%', backgroundColor: '#222' }} /> {/* Black Bar */}
                <div style={{ flex: 1, backgroundColor: '#4CAF50', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: 60 }}>📺</div>
                </div>
                <div style={{ height: 60, width: '100%', backgroundColor: '#222' }} /> {/* Black Bar */}
            </div>
            {/* Home button notch */}
            <div style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', width: 6, height: 40, backgroundColor: '#333', borderRadius: 3 }} />
        </div>
        <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 50 }}>🎥❌</div>
    </div>
);

const ControlIssue = () => (
    <div style={{ width: 600, height: 350, backgroundColor: '#222', borderRadius: 20, border: '6px solid #444', padding: 40, display: 'flex', flexDirection: 'column', gap: 30, position: 'relative' }}>
        <div style={{ fontSize: 24, color: '#888', marginBottom: 10 }}>ADJUSTMENTS</div>
        {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 20, backgroundColor: '#333', borderRadius: 10, position: 'relative' }}>
                <div style={{ position: 'absolute', left: i === 2 ? '70%' : '30%', top: -10, width: 40, height: 40, backgroundColor: '#ff4444', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 15px rgba(255,68,68,0.5)' }} />
            </div>
        ))}
        {/* Cage/Lock Overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: 180, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}>🔒</div>
            {/* Chains represented by SVG grid */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }} viewBox="0 0 100 100">
                <path d="M0 20 L100 80 M0 80 L100 20 M20 0 L80 100 M80 0 L20 100" stroke="white" strokeWidth="2" fill="none" />
            </svg>
        </div>
    </div>
);

const GenericIssue = () => (
    <div style={{ width: 600, height: 350, backgroundColor: '#333', borderRadius: 20, border: '6px solid #444', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, padding: 20 }}>
        {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
                <div style={{ width: 140, height: 180, backgroundColor: '#444', borderRadius: 70, border: '4px solid #666', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 80, position: 'relative' }}>
                    👤
                    <div style={{ position: 'absolute', top: 50, left: 30, width: 10, height: 10, backgroundColor: 'rgba(0,255,255,0.5)', borderRadius: '50%', boxShadow: '0 0 10px cyan' }} />
                    <div style={{ position: 'absolute', top: 50, right: 30, width: 10, height: 10, backgroundColor: 'rgba(0,255,255,0.5)', borderRadius: '50%', boxShadow: '0 0 10px cyan' }} />
                </div>
                <div style={{ width: 100, height: 10, backgroundColor: '#444', borderRadius: 5 }} />
            </div>
        ))}
        <div style={{ position: 'absolute', top: 20, color: 'rgba(255,255,255,0.2)', fontSize: 30 }}>CLONED GENERATIONS</div>
    </div>
);

// --- Segment Wrapper with 3D Flip ---

const FlipSegment: React.FC<{
    children: React.ReactNode;
    fromPrev?: number;
    toNext?: number;
}> = ({ children, fromPrev = 1, toNext = 0 }) => {
    const rotation = interpolate(fromPrev, [0, 1], [90, 0]) - toNext * 90;
    const opacity = fromPrev * (1 - toNext);

    return (
        <div style={{
            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
            transform: `rotateX(${rotation}deg)`,
            opacity
        }}>
            {children}
        </div>
    );
};

// --- Main Composition ---

export const ClixVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const beats = {
        intro: 70,
        thumbnail: 52,
        mrBeast: 81,
        fact: 85,
        issues: 274, // Transition starts 0.8s after Generic Faces becomes active
        builtDifferent: 50, // 5 words * 6 frames + buffer
        brand: 120
    };

    const T1 = beats.intro;
    const T2 = T1 + beats.thumbnail;
    const T3 = T2 + beats.mrBeast;
    const T4 = T3 + beats.fact;
    const T5 = T4 + beats.issues;
    const T6 = T5 + beats.builtDifferent;

    const smoothSpring = { damping: 20, stiffness: 150 };
    const flip1 = spring({ frame: frame - T1, fps, config: smoothSpring });
    const flip2 = spring({ frame: frame - T2, fps, config: smoothSpring });
    const flip3 = spring({ frame: frame - T3, fps, config: smoothSpring });
    const flip4 = spring({ frame: frame - T4, fps, config: smoothSpring });
    const flip5 = spring({ frame: frame - T5, fps, config: smoothSpring });
    const flip6 = spring({ frame: frame - T6, fps, config: smoothSpring });

    return (
        <AbsoluteFill style={{
            backgroundColor: '#f28c3a',
            fontFamily: "'Archivo', sans-serif",
            color: 'white',
            fontWeight: 900,
            overflow: 'hidden',
            perspective: 1000
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900&display=swap');`}</style>

            <Sequence from={0} durationInFrames={T1 + 10}>
                <FlipSegment toNext={flip1}>
                    <ClixIntro frame={frame} fps={fps} />
                </FlipSegment>
            </Sequence>

            <Sequence from={T1} durationInFrames={beats.thumbnail + 10}>
                <FlipSegment fromPrev={flip1} toNext={flip2}>
                    <ClixThumbnail frame={frame - T1} fps={fps} />
                </FlipSegment>
            </Sequence>

            <Sequence from={T2} durationInFrames={beats.mrBeast + 10}>
                <FlipSegment fromPrev={flip2} toNext={flip3}>
                    <ClixMrBeast frame={frame - T2} fps={fps} />
                </FlipSegment>
            </Sequence>

            <Sequence from={T3} durationInFrames={beats.fact + 10}>
                <FlipSegment fromPrev={flip3} toNext={flip4}>
                    <ClixThumbnailsFact frame={frame - T3} fps={fps} />
                </FlipSegment>
            </Sequence>

            <Sequence from={T4} durationInFrames={beats.issues + 10}>
                <FlipSegment fromPrev={flip4} toNext={flip5}>
                    <ClixMakersIssues frame={frame - T4} fps={fps} />
                </FlipSegment>
            </Sequence>

            <Sequence from={T5} durationInFrames={beats.builtDifferent + 10}>
                <FlipSegment fromPrev={flip5} toNext={flip6}>
                    <ClixBuiltSomethingDifferent frame={frame - T5} fps={fps} />
                </FlipSegment>
            </Sequence>

            <Sequence from={T6} durationInFrames={beats.brand}>
                <FlipSegment fromPrev={flip6}>
                    <ClixBrandReveal frame={frame - T6} fps={fps} />
                </FlipSegment>
            </Sequence>
        </AbsoluteFill>
    );
};

const ClixIntro: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const logoStart = 12;
    const secondPartStart = 25;
    const smoothSpring = { damping: 20, stiffness: 150 };

    const introEntrance = spring({ frame, fps, config: smoothSpring });
    const logoEntrance = spring({ frame: frame - logoStart, fps, config: smoothSpring });
    const secondPartEntrance = spring({ frame: frame - secondPartStart, fps, config: smoothSpring });

    const totalFirstPartX = interpolate(logoEntrance, [0, 1], [0, -75]) + interpolate(secondPartEntrance, [0, 1], [0, -400]);
    const firstPartOpacity = interpolate(secondPartEntrance, [0.3, 0.7], [1, 0]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', transform: `translateX(${totalFirstPartX}px) scale(${interpolate(introEntrance, [0, 1], [0.5, 1])})`, opacity: introEntrance * firstPartOpacity, position: 'absolute' }}>
                <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>Your vide<span>o</span></h1>
                <YouTubeLogo style={{ transform: `translateX(${interpolate(logoEntrance, [0, 1], [-100, 0])}px) scale(${logoEntrance})`, opacity: logoEntrance, marginLeft: 35 }} />
            </div>
            {frame >= secondPartStart && (
                <div style={{ transform: `translateX(${interpolate(secondPartEntrance, [0, 1], [800, 0])}px)`, opacity: secondPartEntrance, position: 'absolute' }}>
                    <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>
                        <JitterFreeDots frame={frame} start={secondPartStart} text="isn't failing" fontSize={130} />
                    </h1>
                </div>
            )}
        </div>
    );
};

const ClixThumbnail: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const revealStart = 8;
    const entrance = spring({ frame: frame - revealStart, fps, config: { damping: 25, stiffness: 150 } });
    const currentAssetWidth = interpolate(entrance, [0, 1], [0, 320]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                <h1 style={{ fontSize: 100, margin: 0 }}>Your thumbnail</h1>
                <div style={{ width: currentAssetWidth, overflow: 'visible', display: 'flex', alignItems: 'center', opacity: entrance }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 40, transform: `translateX(${interpolate(entrance, [0, 1], [-100, 0])}px)` }}>
                        <MountainThumbnail style={{ transform: `scale(${entrance})` }} />
                        <h1 style={{ fontSize: 100, margin: 0, marginLeft: 30 }}>is</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClixMrBeast: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const imageStart = 12;
    const secondPartStart = 25;
    const smoothSpring = { damping: 20, stiffness: 150 };

    const firstEntrance = spring({ frame, fps, config: smoothSpring });
    const imageEntrance = spring({ frame: frame - imageStart, fps, config: smoothSpring });
    const secondPartEntrance = spring({ frame: frame - secondPartStart, fps, config: smoothSpring });

    const totalFirstPartX = interpolate(imageEntrance, [0, 1], [0, -75]) + interpolate(secondPartEntrance, [0, 1], [0, -600]);
    const firstPartOpacity = interpolate(secondPartEntrance, [0.3, 0.7], [1, 0]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', transform: `translateX(${totalFirstPartX}px) scale(${interpolate(firstEntrance, [0, 1], [0.5, 1])})`, opacity: firstEntrance * firstPartOpacity, position: 'absolute' }}>
                <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>MrBeast</h1>
                <Img
                    src="https://i.scdn.co/image/ab6761610000e5ebc151a5dd134c40493a3100ba"
                    style={{
                        width: 160, height: 160, borderRadius: '20%', rotate: '-10deg',
                        marginLeft: 35, transform: `translateX(${interpolate(imageEntrance, [0, 1], [-100, 0])}px) scale(${imageEntrance})`,
                        opacity: imageEntrance, border: '6px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}
                />
            </div>
            {frame >= secondPartStart && (
                <div style={{ transform: `translateX(${interpolate(secondPartEntrance, [0, 1], [1000, 0])}px)`, opacity: secondPartEntrance, position: 'absolute' }}>
                    <h1 style={{ fontSize: 80, margin: 0, whiteSpace: 'nowrap' }}>doesn’t get views because of luck</h1>
                </div>
            )}
        </div>
    );
};

const ClixThumbnailsFact: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const words = "He gets views because of thumbnails.".split(" ");

    // Zoom in final exit
    const exitSpring = spring({
        frame: frame - 80,
        fps,
        config: { damping: 15, stiffness: 120 }
    });

    const zoomScale = interpolate(exitSpring, [0, 1], [1, 5]);
    const zoomOpacity = interpolate(exitSpring, [0, 0.4], [1, 0]);

    return (
        <AbsoluteFill style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${zoomScale})`,
            opacity: zoomOpacity
        }}>
            <div style={{ width: '100%', textAlign: 'center', padding: '0 50px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {words.map((word, i) => {
                    const springVal = spring({ frame: frame - i * 6, fps, config: { damping: 15, stiffness: 120 } });
                    return (
                        <h1 key={i} style={{ fontSize: 100, margin: '15px 15px', opacity: springVal, transform: `translateY(${interpolate(springVal, [0, 1], [20, 0])}px)` }}>
                            {word}
                        </h1>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const ClixMakersIssues: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const introDuration = 60;
    const introSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });

    const scrollStartFrame = introDuration + 10;
    const pointsActive = frame >= scrollStartFrame;
    const headingOpacity = pointsActive ? 0 : introSpring;

    const points = [
        { label: "Square images.", graphic: <SquareIssue /> },
        { label: "Wrong ratios.", graphic: <RatioIssue /> },
        { label: "Low control.", graphic: <ControlIssue /> },
        { label: "Generic faces.", graphic: <GenericIssue /> }
    ];

    const pointStayFrames = 60; // 2 seconds
    const cycleDuration = pointStayFrames;

    const rawPointIndex = Math.floor((frame - scrollStartFrame) / cycleDuration);
    const pointIndex = Math.min(Math.max(0, rawPointIndex), points.length - 1);
    const progressInCycle = (frame - scrollStartFrame) % cycleDuration;

    // Snappy transition between points
    const transitionThreshold = 45; // Start moving later for a longer "stable" stay
    const scrollProgress = spring({
        frame: progressInCycle - transitionThreshold,
        fps,
        config: { damping: 30, stiffness: 200 } // Reduced bounciness (higher damping)
    });

    const isTransitioning = progressInCycle > transitionThreshold;
    const wheelPos = rawPointIndex + (isTransitioning ? scrollProgress : 0);

    // Switch illustration halfway through the transition
    const nextGraphicIndex = Math.min(pointIndex + 1, points.length - 1);
    const activeGraphicIndex = (isTransitioning && scrollProgress > 0.5) ? nextGraphicIndex : pointIndex;

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!pointsActive && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%)`,
                    opacity: headingOpacity,
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <h1>
                        <JitterFreeDots frame={frame} start={0} text="Most AI thumbnail makers give you" fontSize={90} />
                    </h1>
                </div>
            )}

            {pointsActive && (
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 80px'
                }}>
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        height: 800,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        perspective: '2000px'
                    }}>
                        {points.map((p, i) => {
                            const itemOffset = i - wheelPos;

                            const angle = itemOffset * 0.7;
                            const radius = 400;
                            const y = Math.sin(angle) * radius;
                            const z = (Math.cos(angle) - 1) * radius;
                            const rotationX = -angle * (180 / Math.PI) * 0.6;

                            const distance = Math.abs(itemOffset);
                            const isActive = distance < 0.3;

                            const opacity = interpolate(distance, [0, 0.8, 1.5], [1, 0.4, 0]);
                            const scale = interpolate(distance, [0, 1], [1.3, 0.7]);
                            const color = isActive ? 'white' : '#666';

                            return (
                                <h1 key={i} style={{
                                    position: 'absolute',
                                    fontSize: 100,
                                    margin: 0,
                                    top: '50%',
                                    left: 20,
                                    width: '100%',
                                    transform: `translateY(${y}px) translateZ(${z}px) rotateX(${rotationX}deg) scale(${scale})`,
                                    opacity,
                                    color,
                                    transformOrigin: 'left center',
                                    transition: 'color 0.2s ease'
                                }}>
                                    {p.label}
                                </h1>
                            );
                        })}
                    </div>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{
                            transform: `scale(${interpolate(scrollProgress, [0, 0.1, 0.9, 1], [1, 0.95, 0.95, 1])})`,
                            opacity: interpolate(scrollProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1])
                        }}>
                            {points[activeGraphicIndex].graphic}
                        </div>
                    </div>
                </div>
            )}
        </AbsoluteFill>
    );
};

const ClixBuiltSomethingDifferent: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const words = "So we built something different.".split(" ");
    const framesPerWord = 6; // 0.2 seconds
    const currentWordIndex = Math.min(Math.floor(frame / framesPerWord), words.length - 1);

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: 130, margin: 0, textAlign: 'center' }}>{words[currentWordIndex]}</h1>
        </AbsoluteFill>
    );
};

const ClixBrandReveal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const revealStart = 25;
    const smoothSpring = { damping: 20, stiffness: 150 };

    const firstEntrance = spring({ frame, fps, config: smoothSpring });
    const clixEntrance = spring({ frame: frame - revealStart, fps, config: smoothSpring });

    const totalFirstPartX = interpolate(clixEntrance, [0, 1], [0, -320]);
    const firstPartOpacity = 1;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                transform: `translateX(${totalFirstPartX}px) scale(${interpolate(firstEntrance, [0, 1], [0.5, 1])})`,
                opacity: firstEntrance * firstPartOpacity,
                position: 'absolute'
            }}>
                <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>Introducing</h1>
            </div>
            {frame >= revealStart && (
                <div style={{
                    transform: `translateX(${interpolate(clixEntrance, [0, 1], [1000, 310])}px)`,
                    opacity: clixEntrance,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Img
                        src={staticFile("clix.png")}
                        style={{
                            width: 180,
                            height: 180,
                            marginRight: 40,
                            transform: `scale(${clixEntrance}) rotate(${interpolate(clixEntrance, [0, 1], [-20, 0])}deg)`,
                            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0))'
                        }}
                    />
                    <h1 style={{ fontSize: 150, margin: 0, whiteSpace: 'nowrap', color: 'white' }}>Clix</h1>
                </div>
            )}
        </div>
    );
};
