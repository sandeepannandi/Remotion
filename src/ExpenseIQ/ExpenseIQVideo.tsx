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
    const thirteenthSceneDuration = 203;
    const fourteenthSceneStart = thirteenthSceneStart + thirteenthSceneDuration;
    const fourteenthSceneDuration = 79;
    const fifteenthSceneStart = fourteenthSceneStart + fourteenthSceneDuration;
    const fifteenthSceneDuration = 90;
    const sixteenthSceneStart = fifteenthSceneStart + fifteenthSceneDuration;
    const sixteenthSceneDuration = 125;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: bgColor,
                backgroundImage: `url(${staticFile("bg.png")})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                    flexDirection: 'column',
                    fontSize: '150px',
                    fontWeight: 700,
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

                        const meetTranslateY = -exitProgress * 2000; // Goes up
                        const expensePalTranslateY = exitProgress * 2000; // Goes down
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

                        // Push effect: logo container height grows from 0 to 180px, pushing texts apart
                        const pushGap = interpolate(logoSpr, [0, 1], [0, 180]);

                        // Text entrance: appear first, then logo pushes them apart
                        const meetEntrance = interpolate(relFrame, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });
                        const palEntrance = interpolate(relFrame, [6, 7], [0, 1], { extrapolateLeft: 'clamp' });

                        return (
                            <>
                                <span style={{ 
                                    opacity: meetOpacity * meetEntrance,
                                    transform: `translateY(${meetTranslateY}px)`,
                                    display: 'inline-block' 
                                }}>
                                    Introducing
                                </span>
                                
                                <div style={{
                                    width: '150px',
                                    height: pushGap,
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
                                    opacity: expensePalOpacity * palEntrance,
                                    transform: `translateY(${expensePalTranslateY}px)`,
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
                        
                        // Image entrance from bottom (smooth, no spring)
                        const imgEntranceDuration = 15;
                        const imgEntranceProgress = interpolate(
                            relFrame,
                            [0, imgEntranceDuration],
                            [0, 1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );
                        
                        // Phase 3: Text appears 500ms (15 frames) after image is fully on frame
                        const textStart = imgEntranceDuration + 15;

                        // Phase 4: Transition starts 300ms (9 frames) after subtitle settles
                        const transitionStart = 104;
                        const swapFrame = transitionStart + 5; // Swap midway through mock1 exit
                        const analyticsEntranceDuration = 15;
                        
                        // mock1 entrance (0 to entrance end)
                        const mock1EntranceY = interpolate(imgEntranceProgress, [0, 1], [1500, 0]);
                        const mock1EntranceOpacity = interpolate(imgEntranceProgress, [0, 0.5], [0, 1]);
                        
                        // mock1 exit (transitionStart to swapFrame)
                        const mock1ExitProgress = interpolate(
                            relFrame,
                            [transitionStart, swapFrame],
                            [0, 1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );
                        const mock1ExitY = interpolate(mock1ExitProgress, [0, 1], [0, 1500]);
                        const mock1ExitOpacity = interpolate(mock1ExitProgress, [0, 0.5], [1, 0]);
                        
                        // Analytics entrance (swapFrame to end)
                        const analyticsEntranceProgress = interpolate(
                            relFrame,
                            [swapFrame, swapFrame + analyticsEntranceDuration],
                            [0, 1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );
                        const analyticsEntranceY = interpolate(analyticsEntranceProgress, [0, 1], [1500, 0]);
                        const analyticsEntranceOpacity = interpolate(analyticsEntranceProgress, [0, 0.3], [0, 1]);

                        // Left text fades out starting at transition
                        const textOpacity = interpolate(relFrame, [transitionStart, transitionStart + 10], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                        
                        // New text appears 500ms (15 frames) after transition starts
                        const newTextDelay = transitionStart + 15;
                        const newTextOpacity = interpolate(relFrame, [newTextDelay, newTextDelay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                        return (
                            <>
                                {/* mock1 image - on the right, exits by going down */}
                                {relFrame < swapFrame && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '80%',
                                        top: '50%',
                                        transform: `translate(-50%, -50%) translateY(${relFrame < transitionStart ? mock1EntranceY : mock1ExitY}px)`,
                                        width: '45%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: relFrame < transitionStart ? mock1EntranceOpacity : mock1ExitOpacity,
                                        zIndex: 2,
                                    }}>
                                        <Img 
                                            src={staticFile("mock1.png")}
                                            style={{ 
                                                height: '1000px',
                                                width: 'auto',
                                            }} 
                                        />
                                    </div>
                                )}

                                {/* analytics image - appears from bottom on the left */}
                                {relFrame >= swapFrame && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '20%',
                                        top: '50%',
                                        transform: `translate(-50%, -50%) translateY(${analyticsEntranceY}px)`,
                                        width: '45%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: analyticsEntranceOpacity,
                                        zIndex: 2,
                                    }}>
                                        <Img 
                                            src={staticFile("analytics.png")}
                                            style={{ 
                                                height: '1000px',
                                                width: 'auto',
                                            }} 
                                        />
                                    </div>
                                )}

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
                                        fontWeight: 600,
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
                                        fontWeight: 600,
                                        lineHeight: 1.1,
                                        color: '#000000',
                                    }}>
                                        {"See your personal inflation score & stability index.".split(" ").map((word, i) => {
                                            const delay = newTextDelay + (i * 4);
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
                                        const subtitleDelay = newTextDelay + mainTextDuration + 10;
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
                <AbsoluteFill style={{ padding: '80px' }}>
                    {(() => {
                        const relFrame = frame - fourteenthSceneStart;
                        
                        // Images appear immediately (scene starts 300ms after previous subtitle)
                        const imageStart = 0;
                        const imageDuration = 15;
                        
                        // Text appears 500ms (15 frames) after images start
                        const textStart = imageStart + 15;
                        const title = "Scan receipts & SMS instantly";
                        const subtitle = "Zero manual entry. Ever.";
                        const words = title.split(" ");
                        const subtitleDelay = textStart + (words.length * 4) + 8;
                        
                        // Common entrance for all three images
                        const entranceProgress = interpolate(
                            relFrame,
                            [imageStart, imageStart + imageDuration],
                            [0, 1],
                            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                        );
                        const imgTranslateY = interpolate(entranceProgress, [0, 1], [1500, 0]);
                        const imgOpacity = interpolate(entranceProgress, [0, 0.3], [0, 1]);

                        // Text fade in
                        const textOpacity = interpolate(relFrame, [textStart, textStart + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                        const images = [
                            { src: "receipt.png", left: 22 },
                            { src: "sms.png", left: 50 },
                            { src: "quickadd.png", left: 78 },
                        ];

                        return (
                            <>
                                {images.map((img, i) => (
                                    <div key={i} style={{
                                        position: 'absolute',
                                        left: `${img.left}%`,
                                        top: '38%',
                                        transform: `translate(-50%, -50%) translateY(${imgTranslateY}px)`,
                                        width: '30%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: imgOpacity,
                                        zIndex: 2,
                                    }}>
                                        <Img 
                                            src={staticFile(img.src)}
                                            style={{ height: '650px', width: 'auto' }} 
                                        />
                                    </div>
                                ))}

                                {/* Centered Text */}
                                <div style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '84%',
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 1,
                                    width: '80%',
                                    opacity: textOpacity,
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        fontSize: '100px',
                                        fontWeight: 600,
                                        lineHeight: 1.1,
                                        color: '#000000',
                                        justifyContent: 'center',
                                        textAlign: 'center',
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
                        const imgOpacity = 0;

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
                                }}>                                        <Img 
                                            src={staticFile("quickadd.png")}
                                            style={{ 
                                                height: '1000px',
                                                width: 'auto',
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
                                    width: '45%', // Controlled width for center
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        fontSize: '100px',
                                        fontWeight: 600,
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
                <AbsoluteFill style={{ padding: '100px' }}>
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
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                marginBottom: '20px',
                                                opacity,
                                                transform: `translateY(${translateY}px)`
                                            }}>
                                                <img 
                                                    src={staticFile("eplogo.png")} 
                                                    style={{ width: '100px', height: '100px', marginBottom: '12px' }} 
                                                />
                                                <div style={{ fontSize: '100px', fontWeight: 700, color: textColor, letterSpacing: '-2px' }}>
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
