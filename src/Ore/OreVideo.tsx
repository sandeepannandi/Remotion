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
    const { fps, height } = useVideoConfig();

    const scene1Duration = 1.5 * fps;
    const transitionDuration = 0.5 * fps;
    const scene2Start = scene1Duration + transitionDuration;

    // Scene 1 animation (up and vanish)
    const scene1ExitProgress = spring({
        frame: frame - scene1Duration,
        fps,
        config: { damping: 20, stiffness: 200 },
        durationInFrames: transitionDuration,
    });

    const scene1Opacity = interpolate(scene1ExitProgress, [0, 0.5], [1, 0], {
        extrapolateRight: "clamp",
    });
    const scene1Y = interpolate(scene1ExitProgress, [0, 1], [0, -height / 4], {
        extrapolateRight: "clamp",
    });

    // Scene 2 phrases
    const phrases = ["A logo.", "Colors.", "A vision."];

    return (
        <AbsoluteFill style={containerStyle}>
            {/* Noise Overlay */}
            <AbsoluteFill
                style={{
                    backgroundImage: `url("${noiseUrl}")`,
                    pointerEvents: 'none',
                    opacity: 1,
                    zIndex: 1000,
                }}
            />

            {/* Scene 1 */}
            {frame < scene2Start + 10 && (
                <div
                    style={{
                        ...textStyle,
                        opacity: scene1Opacity,
                        transform: `translateY(${scene1Y}px)`,
                        fontSize: "160px",
                        fontWeight: 800,
                    }}
                >
                    You have a brand
                </div>
            )}

            {/* Scene 2 */}
            {frame >= scene2Start && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        paddingLeft: "200px",
                        gap: "20px",
                    }}
                >
                    {phrases.map((phrase, i) => {
                        const delay = scene2Start + (i * 20);
                        const spr = spring({
                            frame: frame - delay,
                            fps,
                            config: { damping: 15, stiffness: 100 },
                        });

                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        const translateX = interpolate(spr, [0, 1], [-300, 0]);

                        return (
                            <div
                                key={i}
                                style={{
                                    opacity,
                                    transform: `translateX(${translateX}px)`,
                                    fontSize: "140px",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                }}
                            >
                                {phrase}
                            </div>
                        );
                    })}
                </div>
            )}
        </AbsoluteFill>
    );
};
