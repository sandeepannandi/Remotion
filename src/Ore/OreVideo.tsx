import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import React from "react";

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

const containerStyle: React.CSSProperties = {
    backgroundColor: "#fff6e8ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontFamily: "Archivo, sans-serif",
    fontSize: "120px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "0 100px",
    lineHeight: "1.2",
};

const textStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    left: 0,
};

export const OreVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timings
    const scene1Duration = 0.5 * fps; 
    const transitionDuration = 0.2 * fps; 
    const scene2Start = scene1Duration + transitionDuration;
    
    // Scene 2 Timings
    const phraseDuration = 0.9 * fps; 
    const flipDuration = 0.4 * fps; 
    
    const logoEnd = scene2Start + phraseDuration;
    const colorsStart = logoEnd;
    const colorsEnd = colorsStart + phraseDuration;
    const visionStart = colorsEnd;
    const visionEnd = visionStart + phraseDuration;
    
    // Scene 3 Timings
    const scene3Start = visionEnd + 0.2 * fps;
    const s3Text = "But every time you need an asset";
    const s3Words = s3Text.split(" ");

    // Scene 1 animation (Fast Fade Out)
    const scene1ExitSpr = spring({
        frame: frame - scene1Duration,
        fps,
        config: { damping: 20, stiffness: 200 },
        durationInFrames: transitionDuration,
    });
    const scene1Opacity = interpolate(scene1ExitSpr, [0, 1], [1, 0], { extrapolateRight: "clamp" });

    // Scene 2 Exit (Fade)
    const scene2ExitSpr = spring({
        frame: frame - visionEnd,
        fps,
        config: { damping: 20, stiffness: 200 },
        durationInFrames: transitionDuration,
    });
    const scene2ExitOpacity = interpolate(scene2ExitSpr, [0, 1], [1, 0], { extrapolateRight: "clamp" });

    // Vertical Flip Logic for Scene 2
    let currentPhrase = "";
    let rotationX = 0;
    let scene2Opacity = 0;

    if (frame >= scene2Start && frame < scene3Start) {
        scene2Opacity = interpolate(frame, [scene2Start, scene2Start + 5], [0, 1], { extrapolateRight: "clamp" }) * scene2ExitOpacity;
        
        if (frame < logoEnd) {
            currentPhrase = "A logo.";
            rotationX = 0;
        } else if (frame < colorsEnd) {
            rotationX = interpolate(frame, [colorsStart, colorsStart + flipDuration], [0, 180], { extrapolateRight: "clamp" });
            currentPhrase = frame < colorsStart + (flipDuration / 2) ? "A logo." : "Colors.";
        } else {
            rotationX = interpolate(frame, [visionStart, visionStart + flipDuration], [180, 360], { extrapolateRight: "clamp" });
            currentPhrase = frame < visionStart + (flipDuration / 2) ? "Colors." : "A vision.";
        }
    }

    return (
        <AbsoluteFill style={{ ...containerStyle, perspective: "1200px" }}>
            <AbsoluteFill
                style={{
                    backgroundImage: `url("${noiseUrl}")`,
                    pointerEvents: 'none',
                    opacity: 1,
                    zIndex: 1000,
                }}
            />

            {/* Scene 1 */}
            {frame < scene2Start && (
                <div
                    style={{
                        ...textStyle,
                        opacity: scene1Opacity,
                        fontSize: "160px",
                        fontWeight: 800,
                    }}
                >
                    You have a brand
                </div>
            )}

            {/* Scene 2 - Vertical Flips */}
            {frame >= scene2Start && frame < scene3Start && (
                <div
                    style={{
                        opacity: scene2Opacity,
                        transform: `rotateX(${rotationX}deg)`,
                        fontSize: "160px",
                        fontWeight: 800,
                        textAlign: "center",
                    }}
                >
                    <div style={{
                        transform: (Math.floor((rotationX + 90) / 180) % 2 === 1) ? 'scaleY(-1)' : 'none'
                    }}>
                        {currentPhrase}
                    </div>
                </div>
            )}

            {/* Scene 3 - Word by Word */}
            {frame >= scene3Start && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    fontSize: "120px",
                    fontWeight: 800,
                    maxWidth: '1500px',
                }}>
                    {s3Words.map((word, i) => {
                        const delay = i * 4;
                        const spr = spring({
                            frame: frame - (scene3Start + delay),
                            fps,
                            config: { damping: 15, stiffness: 100 },
                        });
                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        const translateY = interpolate(spr, [0, 1], [20, 0]);

                        return (
                            <span 
                                key={i} 
                                style={{ 
                                    opacity, 
                                    transform: `translateY(${translateY}px)`,
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
        </AbsoluteFill>
    );
};
