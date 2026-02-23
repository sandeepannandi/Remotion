import React from 'react';
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
    Img
} from 'remotion';

// --- Sub-components ---

const YouTubeLogo = ({ style }: { style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" style={{ width: 120, height: 120, ...style }}>
        <path fill="white" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const JitterFreeDots: React.FC<{ frame: number; start: number; text: string }> = ({ frame, start, text }) => {
    const dotRevealStart = start + 8;
    return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
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

// --- Main Composition ---

export const ClixVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline Configuration (Faster beats)
    const beats = {
        intro: 70,
        thumbnail: 70,
        mrBeast: 85,
        fact: 100
    };

    const flipPoint1 = beats.intro;
    const flipPoint2 = flipPoint1 + beats.thumbnail;
    const flipPoint3 = flipPoint2 + beats.mrBeast;

    const smoothSpring = { damping: 20, stiffness: 150 };

    // Flip Animations
    const flip1 = spring({ frame: frame - flipPoint1, fps, config: smoothSpring });
    const flip2 = spring({ frame: frame - flipPoint2, fps, config: smoothSpring });
    const flip3 = spring({ frame: frame - flipPoint3, fps, config: smoothSpring });

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

            {/* Part 1: Intro */}
            {frame < flipPoint1 + 10 && (
                <div style={{
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                    transform: `rotateX(${interpolate(flip1, [0, 1], [0, -90])}deg)`,
                    opacity: 1 - flip1
                }}>
                    <ClixIntro frame={frame} fps={fps} />
                </div>
            )}

            {/* Part 2: Thumbnail */}
            {frame >= flipPoint1 && frame < flipPoint2 + 10 && (
                <div style={{
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                    transform: `rotateX(${interpolate(flip1, [0, 1], [90, 0]) - flip2 * 90}deg)`,
                    opacity: flip1 > 0 ? flip1 * (1 - flip2) : 0
                }}>
                    <ClixThumbnail frame={frame - flipPoint1} fps={fps} />
                </div>
            )}

            {/* Part 3: MrBeast */}
            {frame >= flipPoint2 && frame < flipPoint3 + 10 && (
                <div style={{
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                    transform: `rotateX(${interpolate(flip2, [0, 1], [90, 0]) - flip3 * 90}deg)`,
                    opacity: flip2 > 0 ? flip2 * (1 - flip3) : 0
                }}>
                    <ClixMrBeast frame={frame - flipPoint2} fps={fps} />
                </div>
            )}

            {/* Part 4: Fact */}
            {frame >= flipPoint3 && (
                <div style={{
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                    transform: `rotateX(${interpolate(flip3, [0, 1], [90, 0])}deg)`,
                    opacity: flip3
                }}>
                    <ClixThumbnailsFact frame={frame - flipPoint3} fps={fps} />
                </div>
            )}
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

    const logoShift = interpolate(logoEntrance, [0, 1], [0, -75]);
    const finalShift = interpolate(secondPartEntrance, [0, 1], [0, -400]);
    const totalFirstPartX = logoShift + finalShift;
    const firstPartOpacity = interpolate(secondPartEntrance, [0.3, 0.7], [1, 0]);

    const logoX = interpolate(logoEntrance, [0, 1], [-100, 0]);
    const logoScale = interpolate(logoEntrance, [0, 1], [0, 1]);

    const secondPartX = interpolate(secondPartEntrance, [0, 1], [800, 0]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', transform: `translateX(${totalFirstPartX}px) scale(${interpolate(introEntrance, [0, 1], [0.5, 1])})`, opacity: introEntrance * firstPartOpacity, position: 'absolute' }}>
                <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>Your vide<span>o</span></h1>
                <YouTubeLogo style={{ transform: `translateX(${logoX}px) scale(${logoScale})`, opacity: logoEntrance, marginLeft: 35 }} />
            </div>
            {frame >= secondPartStart && (
                <div style={{ transform: `translateX(${secondPartX}px)`, opacity: secondPartEntrance, position: 'absolute' }}>
                    <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>
                        <JitterFreeDots frame={frame} start={secondPartStart} text="isn't failing" />
                    </h1>
                </div>
            )}
        </div>
    );
};

const ClixThumbnail: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const revealStart = 8;
    const smoothSpring = { damping: 25, stiffness: 150 };
    const entrance = spring({ frame: frame - revealStart, fps, config: smoothSpring });

    const finalAssetWidth = 320;
    const currentAssetWidth = interpolate(entrance, [0, 1], [0, finalAssetWidth]);
    const assetX = interpolate(entrance, [0, 1], [-100, 0]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                <h1 style={{ fontSize: 100, margin: 0 }}>Your thumbnail</h1>
                <div style={{ width: currentAssetWidth, overflow: 'visible', display: 'flex', alignItems: 'center', opacity: entrance }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 40, transform: `translateX(${assetX}px)` }}>
                        <MountainThumbnail style={{ transform: `scale(${entrance})` }} />
                        <h1 style={{ fontSize: 100, margin: 0, marginLeft: 30 }}>is</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClixMrBeast: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    // Exact same timing as ClixIntro
    const imageStart = 12;
    const secondPartStart = 25;
    const smoothSpring = { damping: 20, stiffness: 150 };

    const firstEntrance = spring({ frame, fps, config: smoothSpring });
    const imageEntrance = spring({ frame: frame - imageStart, fps, config: smoothSpring });
    const secondPartEntrance = spring({ frame: frame - secondPartStart, fps, config: smoothSpring });

    const imageShift = interpolate(imageEntrance, [0, 1], [0, -75]);
    const finalShift = interpolate(secondPartEntrance, [0, 1], [0, -600]); // Shift more for longer text
    const totalFirstPartX = imageShift + finalShift;
    const firstPartOpacity = interpolate(secondPartEntrance, [0.3, 0.7], [1, 0]);

    const imageX = interpolate(imageEntrance, [0, 1], [-100, 0]);
    const imageScale = interpolate(imageEntrance, [0, 1], [0, 1]);

    const secondPartX = interpolate(secondPartEntrance, [0, 1], [1000, 0]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Part A & B: MrBeast + Profile Image */}
            <div style={{
                display: 'flex', alignItems: 'center',
                transform: `translateX(${totalFirstPartX}px) scale(${interpolate(firstEntrance, [0, 1], [0.5, 1])})`,
                opacity: firstEntrance * firstPartOpacity,
                position: 'absolute'
            }}>
                <h1 style={{ fontSize: 130, margin: 0, whiteSpace: 'nowrap' }}>MrBeast</h1>
                <Img
                    src="https://i.scdn.co/image/ab6761610000e5ebc151a5dd134c40493a3100ba"
                    style={{
                        width: 160, height: 160, borderRadius: '20%', rotate: '-10deg',
                        marginLeft: 35, transform: `translateX(${imageX}px) scale(${imageScale})`,
                        opacity: imageEntrance,
                        border: '6px solid white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}
                />
            </div>

            {/* Part C: The Luck Claim (sliding from right) */}
            {frame >= secondPartStart && (
                <div style={{ transform: `translateX(${secondPartX}px)`, opacity: secondPartEntrance, position: 'absolute' }}>
                    <h1 style={{ fontSize: 80, margin: 0, whiteSpace: 'nowrap' }}>
                        doesn’t get views because of luck
                    </h1>
                </div>
            )}
        </div>
    );
};

const ClixThumbnailsFact: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
    const text = "He gets views because of thumbnails.";
    const words = text.split(" ");

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: '100%', textAlign: 'center', padding: '0 50px',
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
            }}>
                {words.map((word, i) => {
                    const delay = i * 6;
                    const springVal = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
                    const opacity = interpolate(springVal, [0, 1], [0, 1]);
                    const translateY = interpolate(springVal, [0, 1], [20, 0]);

                    return (
                        <h1 key={i} style={{
                            fontSize: 100, margin: '15px 15px',
                            opacity, transform: `translateY(${translateY}px)`
                        }}>
                            {word}
                        </h1>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
