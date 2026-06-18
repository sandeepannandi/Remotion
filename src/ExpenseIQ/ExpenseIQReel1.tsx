import { AbsoluteFill, useCurrentFrame, interpolate, staticFile, Img, Sequence, Audio, Video } from 'remotion';
import React from 'react';

const text = "This is my message to all expense trackers.";
const words = text.split(" ");

const FinalScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Media appears one by one
    const showMedia1 = frame >= 0;
    const showMedia2 = frame >= 10;
    const showMedia3 = frame >= 20;

    // Text appears one by one after all media
    const showText1 = frame >= 30;
    const showText2 = frame >= 40;
    const showText3 = frame >= 50;

    // Flickers for a bit after all text appears, then stops
    const flickerActive = frame >= 50 && frame < 80;
    const flicker = Math.floor(frame / 2) % 2 === 0;
    const currentTextOpacity = flickerActive ? (flicker ? 1 : 0.4) : 1;

    const textStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontWeight: 400,
        fontSize: '300px',
        color: 'red',
        textAlign: 'center',
        textTransform: 'uppercase',
        textShadow: '0 0 40px rgba(255, 0, 0, 0.8)',
        zIndex: 10,
        opacity: currentTextOpacity,
        whiteSpace: 'nowrap',
    };

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        flex: 1,
        overflow: 'hidden',
    };

    const mediaStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column' }}>
            {/* Section 1 */}
            <div style={{ ...containerStyle, opacity: showMedia1 ? 1 : 0 }}>
                <Img src={staticFile("over.png")} style={mediaStyle} />
                <div style={{ ...textStyle, opacity: showText1 ? currentTextOpacity : 0 }}>THIS</div>
            </div>

            {/* Section 2 */}
            <div style={{ ...containerStyle, opacity: showMedia2 ? 1 : 0 }}>
                <Video src={staticFile("money.mp4")} style={mediaStyle} muted loop />
                <div style={{ ...textStyle, opacity: showText2 ? currentTextOpacity : 0 }}>IS</div>
            </div>

            {/* Section 3 */}
            <div style={{ ...containerStyle, opacity: showMedia3 ? 1 : 0 }}>
                <Img src={staticFile("over2.png")} style={mediaStyle} />
                <div style={{ ...textStyle, opacity: showText3 ? currentTextOpacity : 0 }}>EXPENSEPAL</div>
            </div>
        </AbsoluteFill>
    );
};

const LinkInBioScene: React.FC = () => {
    const frame = useCurrentFrame();
    const show1 = frame >= 0;
    const show2 = frame >= 15;
    const show3 = frame >= 30;

    const textStyle: React.CSSProperties = {
        fontFamily: 'Playfair Display, serif',
        fontWeight: 400,
        fontSize: '300px',
        color: 'red',
        textAlign: 'center',
        textTransform: 'uppercase',
        textShadow: '0 0 40px rgba(255, 0, 0, 0.6)',
        lineHeight: 2,
    };

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ ...textStyle, opacity: show1 ? 1 : 0 }}>DOWNLOAD</div>
            <div style={{ ...textStyle, opacity: show2 ? 1 : 0 }}>LINK</div>
            <div style={{ ...textStyle, opacity: show3 ? 1 : 0 }}>IN BIO</div>
        </AbsoluteFill>
    );
};

const Scene: React.FC<{ src: string, showText?: boolean, noZoom?: boolean }> = ({ src, showText, noZoom }) => {
    const frame = useCurrentFrame();
    
    // Zoom only if not disabled
    const zoomScale = noZoom ? 1.0 : interpolate(
        frame,
        [0, 150], // Keep interpolation range consistent or adjust to scene length
        [1.2, 1.0],
        {
            extrapolateRight: 'clamp',
        }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <AbsoluteFill>
                <Img 
                    src={staticFile(src)} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${zoomScale})`,
                    }}
                />
            </AbsoluteFill>
            
            {showText && (
                <div style={{
                    position: 'absolute',
                    top: '65%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 40px',
                    lineHeight: 1,
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 800,
                    fontSize: '200px',
                    color: 'red',
                    textAlign: 'center',
                    zIndex: 2,
                    maxWidth: '2200px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}>
                    {words.map((word, i) => {
                        const delay = i * 6; // 80ms interval at 30fps
                        const opacity = frame >= delay ? 1 : 0;
                        
                        return (
                            <span 
                                key={i} 
                                style={{ 
                                    opacity, 
                                    marginRight: '0.25em',
                                    WebkitTextStroke: '18px black',
                                    paintOrder: 'stroke fill',
                                    textShadow: '0 0 40px rgba(255, 0, 0, 0.5)',
                                    display: 'inline-block',
                                } as any}
                            >
                                {word}
                            </span>
                        );
                    })}
                </div>
            )}
        </AbsoluteFill>
    );
};

const Scene3: React.FC<{ src: string, text: string, framesPerWord?: number }> = ({ src, text, framesPerWord = 12 }) => {
    const frame = useCurrentFrame();
    const words = text.split(" ");

    const wordIndex = Math.floor(frame / framesPerWord);
    const currentWord = words[Math.min(wordIndex, words.length - 1)];

    const zoomScale = interpolate(
        frame,
        [0, 150],
        [1.2, 1.0],
        {
            extrapolateRight: 'clamp',
        }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <AbsoluteFill>
                <Img 
                    src={staticFile(src)} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${zoomScale})`,
                    }}
                />
            </AbsoluteFill>

            <div style={{
                position: 'absolute',
                top: '15%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 400,
                fontSize: '320px',
                color: 'red',
                textAlign: 'center',
                zIndex: 2,
                transform: 'translateY(-50%)',
                textShadow: '0 0 60px rgba(255, 0, 0, 0.4)',
                textTransform: 'uppercase',
            }}>
                {currentWord}
            </div>
        </AbsoluteFill>
    );
};

export const ExpenseIQReel1: React.FC = () => {
    // 8 words * 5 frames = 35 is when the last word appears. 
    // We'll give it until frame 60 (2 seconds) so it's readable before cutting.
    const scene1Duration = 85; 
    // 1.5 seconds = 45 frames at 30fps
    const scene2Duration = 30;
    // 4 words * 12 frames = 48 frames, plus a little buffer
    const scene3Duration = 60;
    // 1 second = 30 frames
    const scene4Duration = 30;

    const scene5Text = "AND I'M GONNA RETIRE ALL EXPENSE TRACKERS BY BECOMING THE BEST IN THE WORLD.";
    const scene5Duration = 138; // Matches best.mp3 duration (4.57s * 30fps)
    const scene5FramesPerWord = 9;

    const scene6Duration = 25; // 0.5 seconds at 30fps
    const finalSceneDuration = 102; // 126 - 24 (800ms)
    const linkInBioDuration = 60;

    return (
        <AbsoluteFill>
            <Sequence durationInFrames={scene1Duration}>
                <Scene src="scene1.png" showText />
                <Audio src={staticFile("message.mp3")} startFrom={0} endAt={scene1Duration} />
            </Sequence>
            <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
                <Scene src="scene2.png" />
                <Audio src={staticFile("honorable.mp3")} startFrom={2.2 * 30} endAt={3.2 * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration} durationInFrames={scene3Duration}>
                <Scene3 src="scene1.png" text="MY NAME IS EXPENSEPAL" />
                <Audio src={staticFile("myname.mp3")} startFrom={0} endAt={scene3Duration} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration} durationInFrames={scene4Duration}>
                <Scene src="scene3.png" />
                <Audio src={staticFile("honorable.mp3")} startFrom={2.2 * 30} endAt={3.2 * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration} durationInFrames={scene5Duration}>
                <Scene3 src="scene4.png" text={scene5Text} framesPerWord={scene5FramesPerWord} />
                <Audio src={staticFile("best.mp3")} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration} durationInFrames={scene6Duration}>
                <Scene src="h1.png" />
                <Audio src={staticFile("honorable.mp3")} startFrom={11.9 * 30} endAt={12.8 * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration + scene6Duration} durationInFrames={scene6Duration}>
                <Scene src="h2.png" />
                <Audio src={staticFile("honorable.mp3")} startFrom={12.76 * 30} endAt={13.6 * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration + scene6Duration * 2} durationInFrames={finalSceneDuration}>
                <FinalScene />
                <Audio src={staticFile("honorable.mp3")} startFrom={13.7 * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration + scene6Duration * 2 + finalSceneDuration} durationInFrames={30}>
                <Scene src="scene2.png" />
                <Audio src={staticFile("honorable.mp3")} startFrom={(13.7 + finalSceneDuration/30) * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration + scene6Duration * 2 + finalSceneDuration + 30} durationInFrames={30}>
                <Scene src="scene3.png" />
                <Audio src={staticFile("honorable.mp3")} startFrom={(13.7 + finalSceneDuration/30 + 1) * 30} />
            </Sequence>
            <Sequence from={scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration + scene6Duration * 2 + finalSceneDuration + 60} durationInFrames={linkInBioDuration}>
                <LinkInBioScene />
            </Sequence>
        </AbsoluteFill>
    );
};