import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
    Video,
    Sequence,
    Img,
} from 'remotion';
import React from 'react';

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

export const ExpenseIQVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const circleStart = 50;
    const circleEnd = 60;

    const text = "What if your biggest financial enemy is invisible?";
    const words = text.split(" ");

    const firstSceneEnd = 60;
    const secondSceneEnd = 90;
    const thirdSceneEnd = 120;

    const isBlackBgActive = frame >= circleEnd && frame < thirdSceneEnd;
    const bgColor = isBlackBgActive ? "#000000" : "#fff6e8ff";
    const textColor = (frame >= 60 && frame < thirdSceneEnd) ? "#ffffff" : "#000000";
    const fourthSceneMid = 200;
    const fourthSceneEnd = 280; // Extended from 200 to give second half equal time
    const fifthSceneStart = fourthSceneEnd + 10;
    const fifthWordInterval = 16;
    const wordsArr = "It's called inflation".split(" ");
    const allWordsDone = (wordsArr.length - 1) * fifthWordInterval;
    const waveStart = allWordsDone + 15;
    const waveStagger = 4;
    const waveEnd = waveStart + ((wordsArr.length - 1) * waveStagger) + 6; // +6 for flicker duration
    
    const fifthSceneDuration = waveEnd;
    const sixthSceneStart = fifthSceneStart + fifthSceneDuration;
    const sixthSceneDuration = 75; // 2.5 seconds at 30fps
    const seventhSceneStart = sixthSceneStart + sixthSceneDuration;
    const seventhSceneDuration = 60;
    const eighthSceneStart = seventhSceneStart + seventhSceneDuration;
    const eighthSceneDuration = 60; // Shortened to end sooner
    const tenthSceneStart = eighthSceneStart + eighthSceneDuration;
    const tenthSceneDuration = 15;
    const eleventhSceneStart = tenthSceneStart + tenthSceneDuration;
    const eleventhSceneDuration = 15;
    const twelfthSceneStart = eleventhSceneStart + eleventhSceneDuration;
    const twelfthSceneDuration = 15;
    const ninthSceneStart = twelfthSceneStart + twelfthSceneDuration;
    const ninthSceneDuration = 60; // Reduced to end exactly after exit animation
    const thirteenthSceneStart = ninthSceneStart + ninthSceneDuration;

    const PacMan: React.FC<{ 
        style?: React.CSSProperties, 
        direction?: 'right' | 'left' | 'up' | 'down',
        color?: string,
        size?: number
    }> = ({ style, direction = 'right', color = '#FF8C00', size = 40 }) => {
        const frame = useCurrentFrame();
        const rotate = {
            right: '0deg',
            left: '180deg',
            up: '270deg',
            down: '90deg'
        }[direction];

        // Drive the mouth rotation using Remotion's frame for 100% reliability
        // Math.sin creates a smooth open/close cycle
        const mouthRotation = interpolate(
            Math.sin(frame * 0.4), // Adjust speed here
            [-1, 1],
            [0, 35]
        );

        return (
            <div style={{
                width: size,
                height: size,
                position: 'absolute',
                transform: `rotate(${rotate})`,
                display: 'flex',
                flexDirection: 'column',
                ...style,
            }}>
                {/* Top Half */}
                <div style={{
                    width: '100%',
                    height: '50%',
                    backgroundColor: color,
                    borderTopLeftRadius: size,
                    borderTopRightRadius: size,
                    transformOrigin: 'bottom center',
                    transform: `rotate(-${mouthRotation}deg)`,
                }} />
                {/* Bottom Half */}
                <div style={{
                    width: '100%',
                    height: '50%',
                    backgroundColor: color,
                    borderBottomLeftRadius: size,
                    borderBottomRightRadius: size,
                    transformOrigin: 'top center',
                    transform: `rotate(${mouthRotation}deg)`,
                }} />
            </div>
        );
    };


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
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Geist', sans-serif",
                color: textColor,
            }}
        >
            {/* Black Circle Expansion */}
            {frame >= circleStart && frame < thirdSceneEnd && (
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '61%',
                    width: 0,
                    height: 0,
                    zIndex: 1,
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: interpolate(frame, [circleStart, circleEnd], [0, 4500], { extrapolateRight: 'clamp' }),
                        height: interpolate(frame, [circleStart, circleEnd], [0, 4500], { extrapolateRight: 'clamp' }),
                        backgroundColor: '#000000',
                        borderRadius: '50%',
                    }} />
                </div>
            )}

            {/* Noise Overlay */}
            <AbsoluteFill
                style={{
                    backgroundImage: `url("${noiseUrl}")`,
                    pointerEvents: 'none',
                    opacity: 1,
                    zIndex: 1000,
                }}
            />

            {frame < firstSceneEnd && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '100px',
                    fontWeight: 800,
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

                        let opacity = interpolate(spr, [0, 1], [0, 1]);
                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                        let blur = 0;

                        if (word.toLowerCase().includes("invisible")) {
                            // Start blurring/fading after it has fully appeared
                            const exitStart = 45;
                            const exitDuration = 15;
                            
                            const exitSpr = spring({
                                frame: frame - exitStart,
                                fps,
                                config: { damping: 20, stiffness: 60 },
                            });

                            const exitOpacity = interpolate(exitSpr, [0, 1], [1, 0]);
                            blur = interpolate(exitSpr, [0, 1], [0, 20]);
                            opacity = opacity * exitOpacity;
                        }

                        return (
                            <span 
                                key={i} 
                                style={{ 
                                    opacity, 
                                    transform: `translateY(${translateY}px)`, 
                                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                                    marginRight: '0.3em', 
                                    display: 'inline-block' 
                                }}
                            >
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
                    color: "white",
                    zIndex: 2,
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
                    color: "white",
                    zIndex: 2,
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
                    {(frame < fourthSceneMid ? pexelsImages : stealingImages).map((src, i) => {
                        const startFrame = frame < fourthSceneMid ? thirdSceneEnd : fourthSceneMid;
                        const delay = startFrame + (i * 10);
                        if (frame < delay) return null;

                        const config = imageConfigs[i];
                        return (
                            <Img
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
                        {frame < fourthSceneMid ? (
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
                                const delay = fourthSceneMid + (i * 4);
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

            {frame >= fifthSceneStart && frame < sixthSceneStart && (
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
                    {"It's called inflation".split(" ").map((word, i) => {
                        const wordsArr = "It's called inflation".split(" ");
                        const delay = fifthSceneStart + (i * fifthWordInterval);
                        const hasAppeared = frame >= delay;
                        
                        // Calculate when the wave hits this word
                        const allWordsDone = fifthSceneStart + ((wordsArr.length - 1) * fifthWordInterval);
                        const waveStart = allWordsDone + 15; // Pause slightly after phrase is complete
                        const waveStagger = 4; // Frames between each word's flicker
                        const myWaveFrame = waveStart + (i * waveStagger);
                        
                        // Word is in 'wave flicker' mode for 6 frames (0.2s at 30fps)
                        const isWaveFlickering = frame >= myWaveFrame && frame < myWaveFrame + 6;

                        return (
                            <span 
                                key={i} 
                                className={isWaveFlickering ? "flicker-pulse" : ""} 
                                style={{ 
                                    opacity: hasAppeared ? 1 : 0, 
                                    marginRight: '0.3em', 
                                    display: 'inline-block' 
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>
            )}

            <Sequence from={sixthSceneStart} durationInFrames={sixthSceneDuration}>
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

            {frame >= seventhSceneStart && frame < eighthSceneStart && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '120px',
                    fontWeight: 800,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 100px',
                    lineHeight: 1.1,
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline' }}>
                        {"And you have".split(" ").map((word, i) => {
                            const delay = i * 4;
                            const spr = spring({
                                frame: frame - (seventhSceneStart + delay),
                                fps,
                                config: { damping: 15, stiffness: 100 },
                            });
                            const scale = word === "And" ? interpolate(spr, [0, 1], [3, 1]) : interpolate(spr, [0, 1], [1.2, 1]);
                            const opacity = interpolate(spr, [0, 0.4], [0, 1]);
                            return (
                                <span key={i} style={{ transform: `scale(${scale})`, opacity, display: 'inline-block', marginRight: '0.3em' }}>
                                    {word}
                                </span>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {"no idea how bad it is".split(" ").map((word, i) => {
                            // Delay starts after first line words (3 words * 4 frames)
                            const delay = (3 * 4) + (i * 4);
                            const spr = spring({
                                frame: frame - (seventhSceneStart + delay),
                                fps,
                                config: { damping: 15, stiffness: 100 },
                            });
                            const scale = interpolate(spr, [0, 1], [1.2, 1]);
                            const opacity = interpolate(spr, [0, 0.4], [0, 1]);
                            return (
                                <span key={i} style={{ transform: `scale(${scale})`, opacity, display: 'inline-block', marginRight: '0.3em' }}>
                                    {word}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {frame >= eighthSceneStart && frame < tenthSceneStart && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '120px',
                    fontWeight: 800,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 100px',
                    lineHeight: 1.1,
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {"Inflation eats your".split(" ").map((word, i) => {
                            const delay = i * 4;
                            const opacity = interpolate(frame, [eighthSceneStart + delay, eighthSceneStart + delay + 1], [0, 1], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            });

                            return (
                                <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                    {word}
                                </span>
                            );
                        })}
                        {/* The word "money" with eating animation */}
                        {(() => {
                            const word = "money";
                            const delay = (3 * 4) + 4; // After "Inflation eats your"
                            const opacity = interpolate(frame, [eighthSceneStart + delay, eighthSceneStart + delay + 1], [0, 1], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            });
                            
                            // Eating timing: Large Pac-Man appears instantly with the word
                            const eatStart = eighthSceneStart + delay;
                            const eatProgress = interpolate(frame, [eatStart, eatStart + 40], [0, 0.85], {
                                extrapolateLeft: 'clamp',
                                extrapolateRight: 'clamp',
                            });

                            return (
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <span style={{ 
                                        opacity, 
                                        display: 'inline-block',
                                        clipPath: `inset(0 ${Math.min(eatProgress * 100, 100)}% 0 0)`, // Literally eats it away
                                    }}>
                                        {word}
                                    </span>
                                    {frame >= eatStart && (
                                        <PacMan 
                                            direction="left"
                                            color="#FF8C00"
                                            size={180}
                                            style={{
                                                left: `${(1 - eatProgress) * 100}%`,
                                                top: '50%',
                                                transform: `translate(-50%, -50%) rotate(180deg)`,
                                                zIndex: 10,
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })()}
                    </div>

                    {/* Exactly 4 background Pac-Men, one for each side */}
                    {[
                        { pos: { top: '100px', left: '100px' }, dir: 'right' },
                        { pos: { top: '100px', right: '100px' }, dir: 'down' },
                        { pos: { bottom: '100px', right: '100px' }, dir: 'left' },
                        { pos: { bottom: '100px', left: '100px' }, dir: 'up' },
                    ].map((config, idx) => {
                        const sceneFrame = frame - eighthSceneStart;
                        const move = interpolate(sceneFrame, [0, 100], [0, 500]);
                        const dots = [1, 2, 3, 4, 5, 6, 7];

                        return (
                            <div key={idx} style={{ position: 'absolute', ...config.pos }}>
                                {dots.map(d => {
                                    const dotPos = d * 70;
                                    const isEaten = move > dotPos;
                                    if (isEaten) return null;
                                    return (
                                        <div key={d} style={{
                                            position: 'absolute',
                                            width: '35px',
                                            height: '35px',
                                            backgroundColor: '#FF8C00',
                                            borderRadius: '50%',
                                            left: config.dir === 'right' ? dotPos : config.dir === 'left' ? -dotPos : 0,
                                            top: config.dir === 'up' ? -dotPos : config.dir === 'down' ? dotPos : 0,
                                        }} />
                                    );
                                })}
                                <PacMan 
                                    direction={config.dir as any}
                                    color="#FF8C00"
                                    size={100}
                                    style={{
                                        left: config.dir === 'right' ? move : config.dir === 'left' ? -move : 0,
                                        top: config.dir === 'up' ? -move : config.dir === 'down' ? move : 0,
                                        transform: `translate(-50%, -50%) rotate(${
                                            config.dir === 'right' ? 0 : 
                                            config.dir === 'left' ? 180 : 
                                            config.dir === 'up' ? 270 : 90
                                        }deg)`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {frame >= tenthSceneStart && frame < eleventhSceneStart && (
                <div style={{
                    fontSize: '280px',
                    fontWeight: 800,
                    textAlign: 'center',
                    width: '100%',
                    textTransform: 'uppercase',
                }}>
                    EVERY.
                </div>
            )}

            {frame >= eleventhSceneStart && frame < twelfthSceneStart && (
                <div style={{
                    fontSize: '280px',
                    fontWeight: 800,
                    textAlign: 'center',
                    width: '100%',
                    textTransform: 'uppercase',
                }}>
                    SINGLE.
                </div>
            )}

            {frame >= twelfthSceneStart && frame < ninthSceneStart && (
                <div style={{
                    fontSize: '280px',
                    fontWeight: 800,
                    textAlign: 'center',
                    width: '100%',
                    textTransform: 'uppercase',
                }}>
                    MONTH.
                </div>
            )}

            {frame >= ninthSceneStart && frame < thirteenthSceneStart && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '120px',
                    fontWeight: 800,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0 100px',
                    lineHeight: 1.2,
                }}>
                    {(() => {
                        const relFrame = frame - ninthSceneStart;
                        const logoDelay = 15;
                        
                        // Entrance spring
                        const logoSpr = spring({
                            frame: relFrame - logoDelay,
                            fps,
                            config: { damping: 12, stiffness: 100 },
                        });
                        let logoScale = interpolate(logoSpr, [0, 1], [0, 1]);
                        
                        // Click effect: intense expand then sudden shrink
                        const clickStart = 45;
                        const clickPeak = 55;
                        const clickEnd = 60;
                        if (relFrame >= clickStart) {
                            const clickProgress = interpolate(
                                relFrame,
                                [clickStart, clickPeak, clickEnd],
                                [1, 1.6, 1],
                                { extrapolateRight: 'clamp' }
                            );
                            logoScale *= clickProgress;
                        }

                        // Exit animation for text - starts right at the peak of expansion
                        const exitStart = 55;
                        const exitDuration = 10; // Faster
                        const exitProgress = interpolate(
                            relFrame,
                            [exitStart, exitStart + exitDuration],
                            [0, 1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                        const meetTranslateX = -exitProgress * 2000; // Further
                        const expensePalTranslateX = exitProgress * 2000; // Further
                        const meetOpacity = interpolate(exitProgress, [0, 0.3], [1, 0]);
                        const expensePalOpacity = interpolate(exitProgress, [0, 0.3], [1, 0]);

                        // Logo disappearance
                        const logoExitStart = 55;
                        const logoOpacity = interpolate(
                            relFrame,
                            [logoExitStart, logoExitStart + 3], // Matches the 0.3 * exitDuration = 3 frames
                            [1, 0],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                        // Spacer width for logo
                        const spacerWidth = interpolate(logoSpr, [0, 1], [30, 200]);

                        return (
                            <>
                                <span style={{ 
                                    opacity: meetOpacity * interpolate(relFrame, [0, 1], [0, 1], { extrapolateLeft: 'clamp' }),
                                    transform: `translateX(${meetTranslateX}px)`,
                                    display: 'inline-block' 
                                }}>
                                    Meet
                                </span>
                                
                                <div style={{
                                    width: spacerWidth,
                                    height: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'visible',
                                    opacity: logoOpacity,
                                }}>
                                    <div style={{ 
                                        transform: `scale(${logoScale})`, 
                                        width: '150px', 
                                        height: '150px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <img 
                                            src={staticFile("eplogo.png")} 
                                            style={{ width: '100%', height: 'auto' }} 
                                        />
                                    </div>
                                </div>

                                <span style={{ 
                                    opacity: expensePalOpacity * interpolate(relFrame, [6, 7], [0, 1], { extrapolateLeft: 'clamp' }),
                                    transform: `translateX(${expensePalTranslateX}px)`,
                                    display: 'inline-block' 
                                }}>
                                    ExpensePal
                                </span>
                            </>
                        );
                    })()}
                </div>
            )}
            
            {frame >= thirteenthSceneStart && (
                <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
                    {(() => {
                        const relFrame = frame - thirteenthSceneStart;
                        
                        // Phase 1: Image entrance + rotation (0-40)
                        const imgEntranceSpr = spring({
                            frame: relFrame,
                            fps,
                            config: { damping: 12, stiffness: 100 },
                        });
                        
                        // Phase 2: Move to right (50-70)
                        const imgMoveStart = 50;
                        const imgMoveSpr = spring({
                            frame: relFrame - imgMoveStart,
                            fps,
                            config: { damping: 20, stiffness: 80 },
                        });

                        // Phase 3: Text appearance (starts after image settles)
                        const textStart = 75;

                        // Image Animation Values
                        // Rotate 360 degrees while in center (frames 0-40)
                        const imgRotateY = interpolate(
                            relFrame,
                            [0, 40],
                            [0, 360],
                            { extrapolateRight: 'clamp' }
                        );
                        
                        const imgTranslateY = interpolate(imgEntranceSpr, [0, 1], [800, 0]);
                        const imgOpacity = interpolate(imgEntranceSpr, [0, 0.5], [0, 1]);
                        
                        // X Position: Starts center (50%), moves to right (75%)
                        // Hold at 50% during rotation (0-40), then move faster (40-60)
                        const imgLeft = interpolate(
                            relFrame,
                            [0, 40, 60], // Hold until 40, move until 60 (faster)
                            [50, 50, 80], 
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                        return (
                            <>
                                {/* App screenshot */}
                                <div style={{
                                    position: 'absolute',
                                    left: `${imgLeft}%`,
                                    top: '50%',
                                    transform: `translate(-50%, -50%) translateY(${imgTranslateY}px) rotateY(${imgRotateY}deg)`,
                                    width: '45%', // Slightly larger
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity: imgOpacity,
                                    zIndex: 2,
                                }}>
                                    <Img 
                                        src={staticFile("mock1.png")} 
                                        style={{ 
                                            height: '1000px', // Increased size
                                            width: 'auto', 
                                        }} 
                                    />
                                </div>

                                {/* Text on the left */}
                                <div style={{
                                    position: 'absolute',
                                    left: '120px',
                                    top: '160px',
                                    width: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    zIndex: 1,
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        fontSize: '120px',
                                        fontWeight: 800,
                                        lineHeight: 1.05,
                                        textAlign: 'left',
                                        color: '#000000',
                                    }}>
                                        {"Ask your AI finance expert anything.".split(" ").map((word, i) => {
                                            const delay = textStart + (i * 4);
                                            const spr = spring({
                                                frame: frame - (thirteenthSceneStart + delay),
                                                fps,
                                                config: { damping: 12, stiffness: 100 },
                                            });
                                            const translateY = interpolate(spr, [0, 1], [50, 0]);
                                            const opacity = interpolate(spr, [0, 1], [0, 1]);
                                            return (
                                                <span key={i} style={{ 
                                                    display: 'inline-block', 
                                                    marginRight: '0.3em',
                                                    transform: `translateY(${translateY}px)`,
                                                    opacity,
                                                }}>
                                                    {word}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Subtitle */}
                                    {(() => {
                                        const subtitleDelay = textStart + 40;
                                        const spr = spring({
                                            frame: frame - (thirteenthSceneStart + subtitleDelay),
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 0.7]);
                                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                                        return (
                                            <div style={{
                                                fontSize: '50px',
                                                fontWeight: 600,
                                                marginTop: '40px',
                                                color: '#000000',
                                                opacity,
                                                transform: `translateY(${translateY}px)`,
                                            }}>
                                                Real answers based on your spending
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        );
                    })()}
                </AbsoluteFill>
            )}
            <style>{`
                @keyframes pacman-top-move {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-35deg); }
                }
                @keyframes pacman-bottom-move {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(35deg); }
                }
            `}</style>
        </AbsoluteFill>
    );
};
