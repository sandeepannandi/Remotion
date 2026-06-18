import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, staticFile, Img, Sequence } from 'remotion';
import React from 'react';

const text = "This is a message to all expense trackers.";
const words = text.split(" ");

const Scene: React.FC<{ src: string, showText?: boolean, noZoom?: boolean }> = ({ src, showText, noZoom }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    
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
                        const delay = i * 5;
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

export const ExpenseIQReel1: React.FC = () => {
    // 8 words * 5 frames = 35 is when the last word appears. 
    // We'll give it until frame 60 (2 seconds) so it's readable before cutting.
    const scene1Duration = 60; 
    // 500ms = 15 frames at 30fps
    const scene2Duration = 15;

    return (
        <AbsoluteFill>
            <Sequence durationInFrames={scene1Duration}>
                <Scene src="scene1.png" showText />
            </Sequence>
            <Sequence from={scene1Duration} durationInFrames={scene2Duration}>
                <Scene src="scen2.png" noZoom />
            </Sequence>
        </AbsoluteFill>
    );
};