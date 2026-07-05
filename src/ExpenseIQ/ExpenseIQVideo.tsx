import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
    Series,
    Img,
    Audio,
} from 'remotion';
import React from 'react';

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

export const ExpenseIQVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const bgColor = "#fff6e8ff";
    const textColor = "#000000";

    const ninthSceneStart = 0;
    const ninthSceneDuration = 60;
    const thirteenthSceneStart = ninthSceneStart + ninthSceneDuration;
    const thirteenthSceneDuration = 280;
    const fourteenthSceneStart = thirteenthSceneStart + thirteenthSceneDuration;
    const fourteenthSceneDuration = 108;
    const fifteenthSceneStart = fourteenthSceneStart + fourteenthSceneDuration;
    const fifteenthSceneDuration = 90;
    const sixteenthSceneStart = fifteenthSceneStart + fifteenthSceneDuration;
    const sixteenthSceneDuration = 200;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: bgColor,
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Archivo, sans-serif",
                color: textColor,
            }}
        >
            <Series>
                <Series.Sequence durationInFrames={233}>
                    <Audio src={staticFile("afro1.mp3")} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={233}>
                    <Audio src={staticFile("afro2.mp3")} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={233}>
                    <Audio src={staticFile("afro3.mp3")} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={233}>
                    <Audio src={staticFile("afro4.mp3")} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={233}>
                    <Audio src={staticFile("afro5.mp3")} />
                </Series.Sequence>
                <Series.Sequence durationInFrames={233}>
                    <Audio src={staticFile("afro6.mp3")} />
                </Series.Sequence>
            </Series>

            {/* Noise Overlay */}
            <AbsoluteFill
                style={{
                    backgroundImage: `url("${noiseUrl}")`,
                    pointerEvents: 'none',
                    opacity: 1,
                    zIndex: 1000,
                }}
            />

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
            
            {frame >= thirteenthSceneStart && frame < fourteenthSceneStart && (
                <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
                    {(() => {
                        const relFrame = frame - thirteenthSceneStart;
                        
                        // Phase 1: Image entrance + rotation (0-40)
                        const imgEntranceSpr = spring({
                            frame: relFrame,
                            fps,
                            config: { damping: 12, stiffness: 100 },
                        });
                        
                        // Phase 3: Text appearance (starts after image settles)
                        const textStart = 75;

                        // Phase 4: Transition to analytics (starts after text is finished)
                        const transitionStart = 150;
                        const transitionEnd = 175;
                        const swapFrame = 162; // Frame to swap image

                        // Image Animation Values
                        // Initial rotation (0-40)
                        const initialRotateY = interpolate(
                            relFrame,
                            [0, 40],
                            [0, 360],
                            { extrapolateRight: 'clamp' }
                        );
                        
                        // Transition flip rotation (150-175)
                        const transitionRotateY = interpolate(
                            relFrame,
                            [transitionStart, transitionEnd],
                            [0, 360],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                        const imgRotateY = initialRotateY + transitionRotateY;
                        
                        const imgTranslateY = interpolate(imgEntranceSpr, [0, 1], [800, 0]);
                        const imgOpacity = interpolate(imgEntranceSpr, [0, 0.5], [0, 1]);
                        
                        // X Position: Starts center (50%), moves to extreme left (20%)
                        // Then swap to analytics at swapFrame
                        const imgLeft = interpolate(
                            relFrame,
                            [0, 40, 60, transitionStart, transitionEnd],
                            [50, 50, 80, 80, 20],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );

                        const textOpacity = interpolate(relFrame, [transitionStart, transitionStart + 10], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        const textDisplayDelay = transitionEnd + 10;
                        const newTextOpacity = interpolate(relFrame, [textDisplayDelay, textDisplayDelay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
                                        src={relFrame >= swapFrame ? staticFile("analytics.png") : staticFile("mock1.png")}
                                        style={{ 
                                            height: '1000px', // Increased size
                                            width: 'auto', 
                                            // Mirror the image when it's rotated between 90 and 270 degrees during the transition
                                            transform: (transitionRotateY > 90 && transitionRotateY < 270) ? 'scaleX(-1)' : 'none'
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
                                    opacity: textOpacity,
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
                                                frame: relFrame - delay,
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
                                            frame: relFrame - subtitleDelay,
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 0.7]);
                                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                                        return (
                                            <div style={{
                                                fontSize: '50px',
                                                fontWeight: 600,
                                                marginTop: '50px',
                                                color: '#000000',
                                                opacity,
                                                transform: `translateY(${translateY}px)`,
                                            }}>
                                                Real answers based on your spending
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Text on the right */}
                                <div style={{
                                    position: 'absolute',
                                    right: '120px',
                                    top: '200px',
                                    width: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    zIndex: 1,
                                    opacity: newTextOpacity,
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        fontSize: '100px',
                                        fontWeight: 800,
                                        lineHeight: 1.1,
                                        color: '#000000',
                                    }}>
                                        {"See your personal inflation score & stability index.".split(" ").map((word, i) => {
                                            const delay = textDisplayDelay + (i * 4);
                                            const spr = spring({
                                                frame: relFrame - delay,
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
                                    {(() => {
                                        const mainText = "See your personal inflation score & stability index.".split(" ");
                                        const mainTextDuration = mainText.length * 4;
                                        const subtitleDelay = textDisplayDelay + mainTextDuration + 10;
                                        const spr = spring({
                                            frame: relFrame - subtitleDelay,
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                                        return (
                                            <div style={{
                                                fontSize: '50px',
                                                fontWeight: 600,
                                                marginTop: '50px',
                                                color: '#000000',
                                                opacity,
                                                transform: `translateY(${translateY}px)`,
                                            }}>
                                                Know where you stand before a crisis hits.
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        );
                    })()}
                </AbsoluteFill>
            )}

            {frame >= fourteenthSceneStart && frame < fifteenthSceneStart && (
                <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
                    {(() => {
                        const relFrame = frame - fourteenthSceneStart;
                        
                        // Text Timing
                        const textStart = 5;
                        const title = "Scan receipts & SMS instantly";
                        const subtitle = "Zero manual entry. Ever.";
                        
                        // Image Flip Timing
                        // 1st Flip: Analytics -> Receipt
                        const flip1Start = 0;
                        const flip1Half = 10;
                        const flip1End = 20;
                        
                        // 2nd Flip: Receipt -> SMS
                        const flip2Start = 40;
                        const flip2Half = 50;
                        const flip2End = 60;
                        
                        // 3rd Flip: SMS -> Quickadd
                        const flip3Start = 80;
                        const flip3Half = 90;
                        const flip3End = 100;

                        // Interpolate Rotation
                        let currentRotation = 0;
                        let currentImg = "analytics.png";

                        if (relFrame < flip1End) {
                            currentRotation = interpolate(relFrame, [flip1Start, flip1End], [0, 180]);
                            currentImg = relFrame < flip1Half ? "analytics.png" : "receipt.png";
                        } else if (relFrame < flip2Start) {
                            currentRotation = 180;
                            currentImg = "receipt.png";
                        } else if (relFrame < flip2End) {
                            currentRotation = interpolate(relFrame, [flip2Start, flip2End], [180, 360]);
                            currentImg = relFrame < flip2Half ? "receipt.png" : "sms.png";
                        } else if (relFrame < flip3Start) {
                            currentRotation = 360;
                            currentImg = "sms.png";
                        } else if (relFrame < flip3End) {
                            currentRotation = interpolate(relFrame, [flip3Start, flip3End], [360, 540]);
                            currentImg = relFrame < flip3Half ? "sms.png" : "quickadd.png";
                        } else {
                            currentRotation = 540;
                            currentImg = "quickadd.png";
                        }

                        // Text Animation logic
                        const words = title.split(" ");
                        const subtitleDelay = textStart + (words.length * 4) + 8;

                        return (
                            <>
                                {/* App screenshot with 3D Flip */}
                                <div style={{
                                    position: 'absolute',
                                    left: '20%',
                                    top: '50%',
                                    transform: `translate(-50%, -50%) rotateY(${currentRotation}deg)`,
                                    width: '45%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 2,
                                }}>
                                    <Img 
                                        src={staticFile(currentImg)}
                                        style={{ 
                                            height: '1000px',
                                            width: 'auto',
                                            // Handle mirrored image during flip
                                            transform: (Math.floor((currentRotation + 90) / 180) % 2 === 1) ? 'scaleX(-1)' : 'none'
                                        }} 
                                    />
                                </div>

                                {/* Text on the right */}
                                <div style={{
                                    position: 'absolute',
                                    right: '120px',
                                    top: '200px',
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
                                        fontSize: '100px',
                                        fontWeight: 800,
                                        lineHeight: 1.1,
                                        color: '#000000',
                                    }}>
                                        {words.map((word, i) => {
                                            const delay = textStart + (i * 4);
                                            const spr = spring({
                                                frame: relFrame - delay,
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
                                        const spr = spring({
                                            frame: relFrame - subtitleDelay,
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                                        return (
                                            <div style={{
                                                fontSize: '50px',
                                                fontWeight: 600,
                                                marginTop: '50px',
                                                color: '#000000',
                                                opacity,
                                                transform: `translateY(${translateY}px)`,
                                            }}>
                                                {subtitle}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        );
                    })()}
                </AbsoluteFill>
            )}

            {frame >= fifteenthSceneStart && frame < sixteenthSceneStart && (
                <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
                    {(() => {
                        const relFrame = frame - fifteenthSceneStart;
                        
                        const imgLeft = 20;
                        const imgTop = 50;
                        const imgScale = 1;
                        const imgOpacity = interpolate(relFrame, [0, 3], [1, 0], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        // Text Timing
                        const textStart = 15;
                        const title = "Compete on leaderboards";
                        const subtitle = "Build streaks. Share your wins.";
                        const wordsArr = title.split(" ");
                        const subtitleDelay = textStart + (wordsArr.length * 4) + 8;

                        return (
                            <>
                                {/* App screenshot moving from last position and exiting */}
                                <div style={{
                                    position: 'absolute',
                                    left: `${imgLeft}%`,
                                    top: `${imgTop}%`,
                                    transform: `translate(-50%, -50%) rotateY(540deg) scale(${imgScale})`,
                                    width: '45%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 2,
                                    opacity: imgOpacity,
                                }}>
                                    <Img 
                                        src={staticFile("quickadd.png")}
                                        style={{ 
                                            height: '1000px',
                                            width: 'auto',
                                            transform: 'scaleX(-1)', // Matches the final flip state from Scene 14
                                        }} 
                                    />
                                </div>

                                {/* Leaderboard images on sides */}
                                <div style={{
                                    position: 'absolute',
                                    left: '16%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 3,
                                }}>
                                    {(() => {
                                        const spr = spring({
                                            frame: relFrame - 0,
                                            fps,
                                            config: { damping: 14, stiffness: 100 },
                                        });
                                        const translateX = interpolate(spr, [0, 1], [-200, 0]);
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        return (
                                            <Img 
                                                src={staticFile("l1.png")}
                                                style={{
                                                    height: '900px',
                                                    width: 'auto',
                                                    transform: `translateX(${translateX}px)`,
                                                    opacity,
                                                }}
                                            />
                                        );
                                    })()}
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    right: '16%',
                                    top: '50%',
                                    transform: 'translate(50%, -50%)',
                                    zIndex: 3,
                                }}>
                                    {(() => {
                                        const spr = spring({
                                            frame: relFrame - 0,
                                            fps,
                                            config: { damping: 14, stiffness: 100 },
                                        });
                                        const translateX = interpolate(spr, [0, 1], [200, 0]);
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        return (
                                            <Img 
                                                src={staticFile("l2.png")}
                                                style={{
                                                    height: '900px',
                                                    width: 'auto',
                                                    transform: `translateX(${translateX}px)`,
                                                    opacity,
                                                }}
                                            />
                                        );
                                    })()}
                                </div>

                                {/* Text in Center */}
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 1,
                                    width: '40%', // Controlled width for center
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        fontSize: '100px',
                                        fontWeight: 800,
                                        lineHeight: 1.1,
                                        color: '#000000',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                    }}>
                                        {wordsArr.map((word, i) => {
                                            const delay = textStart + (i * 4);
                                            const spr = spring({
                                                frame: relFrame - delay,
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
                                        const spr = spring({
                                            frame: relFrame - subtitleDelay,
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                                        return (
                                            <div style={{
                                                fontSize: '45px',
                                                fontWeight: 600,
                                                marginTop: '40px',
                                                color: '#000000',
                                                opacity,
                                                transform: `translateY(${translateY}px)`,
                                                textAlign: 'center',
                                                width: '80%',
                                            }}>
                                                {subtitle}
                                            </div>
                                        );
                                    })()}
                                </div>
                            </>
                        );
                    })()}
                </AbsoluteFill>
            )}

            {frame >= sixteenthSceneStart && frame < sixteenthSceneStart + sixteenthSceneDuration && (
                <AbsoluteFill style={{ padding: '100px', backgroundColor: '#fff6e8ff' }}>
                    {(() => {
                        const relFrame = frame - sixteenthSceneStart;
                        
                        // Image Move Timing (linear/smooth instead of spring)
                        const moveDuration = 15;
                        const imgLeft = interpolate(relFrame, [0, moveDuration], [50, 80], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const imgTop = 53;
                        const imgRotate = interpolate(relFrame, [0, moveDuration], [10, -5], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });

                        // Brand Entrance (Logo + Text) - Starts 100ms (3 frames) after move completes
                        const brandStart = moveDuration + 3;
                        
                        // Play Store badge entrance (starts at brandStart + 16, takes ~30 frames to settle)
                        // Flash sequence starts instantly after it's shown
                        const flashStart = brandStart + 16 + 25;
                        const flash1 = flashStart + 4;
                        const flash2 = flash1 + 4;
                        const flash3 = flash2 + 4;
                        const flash4 = flash3 + 4;

                        let bgColor = '#fff6e8ff';
                        let textColor = '#000000';

                        if (relFrame >= flashStart && relFrame < flash1) {
                            bgColor = '#22c55e'; // Green
                            textColor = '#ffffff';
                        } else if (relFrame >= flash1 && relFrame < flash2) {
                            bgColor = '#eab308'; // Yellow
                            textColor = '#000000';
                        } else if (relFrame >= flash2 && relFrame < flash3) {
                            bgColor = '#ef4444'; // Red
                            textColor = '#ffffff';
                        } else if (relFrame >= flash3 && relFrame < flash4) {
                            bgColor = '#ec4899'; // Pink
                            textColor = '#000000';
                        } else if (relFrame >= flash4) {
                            bgColor = '#f97316'; // Orange
                            textColor = '#ffffff';
                        }

                        return (
                            <AbsoluteFill style={{ backgroundColor: bgColor }}>
                                {/* App Hero Shot on the right */}
                                <div style={{
                                    position: 'absolute',
                                    left: `${imgLeft}%`,
                                    top: `${imgTop}%`,
                                    transform: `translate(-50%, -50%) rotate(${imgRotate}deg)`,
                                    width: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 2,
                                }}>
                                    <Img 
                                        src={staticFile("epmock.png")}
                                        style={{ 
                                            height: '1120px',
                                            width: 'auto',
                                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                                        }} 
                                    />
                                </div>

                                {/* Logo and Brand on the left */}
                                <div style={{
                                    position: 'absolute',
                                    left: '160px',
                                    top: '50%',
                                    transform: `translateY(-50%)`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    zIndex: 1,
                                }}>
                                    {/* Logo + Name */}
                                    {(() => {
                                        const spr = spring({
                                            frame: relFrame - brandStart,
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        const translateY = interpolate(spr, [0, 1], [40, 0]);
                                        return (
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                marginBottom: '20px',
                                                opacity,
                                                transform: `translateY(${translateY}px)`
                                            }}>
                                                <img 
                                                    src={staticFile("eplogo.png")} 
                                                    style={{ width: '140px', height: '140px', marginRight: '30px' }} 
                                                />
                                                <div style={{ fontSize: '120px', fontWeight: 700, color: textColor, letterSpacing: '-2px' }}>
                                                    ExpensePal
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* Tagline */}
                                    {(() => {
                                        const spr = spring({
                                            frame: relFrame - (brandStart + 8),
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 0.8]);
                                        const translateY = interpolate(spr, [0, 1], [30, 0]);
                                        return (
                                            <div style={{ 
                                                fontSize: '55px', 
                                                fontWeight: 600, 
                                                color: textColor, 
                                                marginBottom: '60px',
                                                opacity,
                                                transform: `translateY(${translateY}px)`
                                            }}>
                                                The new money app.
                                            </div>
                                        );
                                    })()}

                                    {/* Play Store Badge */}
                                    {(() => {
                                        const spr = spring({
                                            frame: relFrame - (brandStart + 16),
                                            fps,
                                            config: { damping: 15, stiffness: 100 },
                                        });
                                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                                        const translateY = interpolate(spr, [0, 1], [20, 0]);
                                        return (
                                            <div style={{
                                                opacity,
                                                transform: `translateY(${translateY}px)`
                                            }}>
                                                <img 
                                                    src="https://freelogopng.com/images/all_img/1664287128google-play-store-logo-png.png"
                                                    style={{ height: '140px', width: 'auto' }}
                                                />
                                            </div>
                                        );
                                    })()}
                                </div>
                            </AbsoluteFill>
                        );
                    })()}
                </AbsoluteFill>
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
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
