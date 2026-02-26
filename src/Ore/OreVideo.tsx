import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import React from "react";

const containerStyle: React.CSSProperties = {
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "Geist, Inter, system-ui, sans-serif",
    fontSize: "80px",
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

    // Timing:
    // 0.0s - 1.5s: First text shown (45 frames)
    // 1.5s: Transition starts
    // 1.5s - 2.0s: Transition duration (15 frames)
    // 2.0s - 3.5s: Second text stays

    const transitionStart = 1.5 * fps;
    const transitionDuration = 0.5 * fps;

    // First text animation (up and vanish)
    const firstTextProgress = spring({
        frame: frame - transitionStart,
        fps,
        config: {
            damping: 20,
            stiffness: 200,
        },
        durationInFrames: transitionDuration,
    });

    const firstTextOpacity = interpolate(firstTextProgress, [0, 0.5], [1, 0], {
        extrapolateRight: "clamp",
    });
    const firstTextY = interpolate(firstTextProgress, [0, 1], [0, -height / 4], {
        extrapolateRight: "clamp",
    });

    // Second text animation (appear from bottom)
    const secondTextProgress = spring({
        frame: frame - transitionStart,
        fps,
        config: {
            damping: 20,
            stiffness: 200,
        },
        durationInFrames: transitionDuration,
    });

    const secondTextOpacity = interpolate(secondTextProgress, [0, 0.8], [0, 1], {
        extrapolateRight: "clamp",
    });
    const secondTextY = interpolate(secondTextProgress, [0, 1], [height / 4, 0], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill style={containerStyle}>
            <div
                style={{
                    ...textStyle,
                    opacity: firstTextOpacity,
                    transform: `translateY(${firstTextY}px)`,
                }}
            >
                Most brands don’t fail <br /> because of bad products.
            </div>
            <div
                style={{
                    ...textStyle,
                    opacity: secondTextOpacity,
                    transform: `translateY(${secondTextY}px)`,
                }}
            >
                They fail because of <br /> weak branding.
            </div>
        </AbsoluteFill>
    );
};
