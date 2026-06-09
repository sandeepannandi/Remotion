import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
    Video,
    Sequence,
} from 'remotion';
import React from 'react';

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

export const ExpenseIQVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const bgColor = "#fff6e8ff";
    const textColor = "#000000";

    const text = "What if your biggest financial enemy is invisible?";
    const words = text.split(" ");

    const firstSceneEnd = 60;
    const secondSceneEnd = 90;
    const thirdSceneEnd = 120;
    const fourthSceneEnd = 200;
    const fifthSceneStart = 280;
    const fifthSceneDuration = 150; // 5 seconds at 30fps

    const pexelsImages = [
        "pexels-arturoaez225-14969604.jpg",
        "pexels-introspectivedsgn-6110830.jpg",
        "pexels-lange-x-2151365597-37989224.jpg",
        "pexels-quang-vuong-724225078-29442930.jpg",
        "pexels-thirdman-7653461.jpg",
        "pexels-alexander-cavaluzzo-2150148636-31202247.jpg",
        "pexels-mak_-jp-107017486-9585550.jpg"
    ];

    const stealingImages = [
        "pexels-liliana-drew-8554409.jpg",
        "pexels-mart-production-7230217.jpg",
        "pexels-ron-lach-8705783.jpg",
        "pexels-tima-miroshnichenko-6266305.jpg",
        "pexels-tima-miroshnichenko-6266668.jpg",
        "pexels-tima-miroshnichenko-6266697.jpg",
        "pexels-vika-glitter-392079-7916845.jpg"
    ];

    // Seeded random-like positions for consistency - 7 images now
    const imageConfigs = [
        { left: '10%', top: '-5%', rotate: -5 },
        { left: '25%', top: '15%', rotate: 8 },
        { left: '8%', top: '25%', rotate: -12 },
        { left: '20%', top: '50%', rotate: 4 },
        { left: '8%', top: '60%', rotate: -3 },
        { left: '5%', top: '20%', rotate: -7 },
        { left: '28%', top: '50%', rotate: 10 },
    ];

    return (
        <AbsoluteFill
            style={{
                backgroundColor: bgColor,
                backgroundImage: `url("${noiseUrl}")`,
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Geist', sans-serif",
                color: textColor,
            }}
        >
            {frame < firstSceneEnd && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '80px',
                    fontWeight: 700,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 100px',
                    lineHeight: 1.2,
                }}>
                    {words.map((word, i) => {
                        const delay = i * 4;
                        const spr = spring({
                            frame: frame - delay,
                            fps,
                            config: { damping: 12, stiffness: 100 },
                        });

                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        const translateY = interpolate(spr, [0, 1], [20, 0]);

                        return (
                            <span key={i} style={{ opacity, transform: `translateY(${translateY}px)`, marginRight: '0.3em', display: 'inline-block' }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
            )}

            {frame >= firstSceneEnd && frame < secondSceneEnd && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '120px',
                    fontWeight: 800,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 100px',
                    lineHeight: 1.2,
                }}>
                    {"It's not your rent".split(" ").map((word, i) => {
                        const delay = firstSceneEnd + (i * 4);
                        const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
            )}

            {frame >= secondSceneEnd && frame < thirdSceneEnd && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '120px',
                    fontWeight: 800,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 100px',
                    lineHeight: 1.2,
                }}>
                    {"Not your EMIs".split(" ").map((word, i) => {
                        const delay = secondSceneEnd + (i * 4);
                        const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        return (
                            <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
            )}

            {frame >= thirdSceneEnd && frame < fifthSceneStart && (
                <>
                    {/* Shuffled images on the left side */}
                    {(frame < fourthSceneEnd ? pexelsImages : stealingImages).map((src, i) => {
                        const startFrame = frame < fourthSceneEnd ? thirdSceneEnd : fourthSceneEnd;
                        const delay = startFrame + (i * 10);
                        if (frame < delay) return null;

                        const config = imageConfigs[i];
                        return (
                            <img
                                key={src}
                                src={staticFile(src)}
                                style={{
                                    position: 'absolute',
                                    left: config.left,
                                    top: config.top,
                                    width: '450px',
                                    height: 'auto',
                                    transform: `rotate(${config.rotate}deg)`,
                                    zIndex: i,
                                }}
                            />
                        );
                    })}

                    <div style={{
                        position: 'absolute',
                        right: '-100px',
                        width: '45%',
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '100px',
                        fontWeight: 800,
                        textAlign: 'left',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        lineHeight: 1.1,
                    }}>
                        {frame < fourthSceneEnd ? (
                            "It works 24 hours a day.".split(" ").map((word, i) => {
                                const delay = thirdSceneEnd + (i * 4);
                                const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                });

                                return (
                                    <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                        {word}
                                    </span>
                                );
                            })
                        ) : (
                            "Stealing your money while you sleep".split(" ").map((word, i) => {
                                const delay = fourthSceneEnd + (i * 4);
                                const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp',
                                });

                                return (
                                    <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                        {word}
                                    </span>
                                );
                            })
                        )}
                    </div>
                </>
            )}

            <Sequence from={fifthSceneStart} durationInFrames={fifthSceneDuration}>
                <AbsoluteFill>
                    <Video 
                        src={staticFile("inflation.mp4")}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
