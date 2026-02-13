import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    spring,
    Easing,
} from "remotion";
import React from "react";
import { MousePointer2 } from "lucide-react";

const Theme = {
    primary: "#ff8c00", // Orange
    background: "#050505", // Deep Black
    text: "#f8fafc",
    purple: "#a855f7",
};

export const ClixVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Timings (Faster pacing)
    const T1 = 15;  // Everything scale in
    const T2 = 30;  // Everything shift + Sentence entrance
    const T3 = 60;  // Pointer entrance
    const T4 = 90; // Pointer path start
    const T5 = 120; // Impact / Click
    const T6 = 130; // Spark reveal

    // 1. "Everything" entrance (0-T1)
    const everythingEntrance = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 150 },
    });

    // 2. Everything shifts left while others arrive (T2+)
    const everythingShift = spring({
        frame: frame - T2,
        fps,
        config: { damping: 15, stiffness: 120 },
    });

    // 3. "starts with a" + "box" entrance (T2+)
    const sentenceEntrance = spring({
        frame: frame - T2,
        fps,
        config: { damping: 15, stiffness: 120 },
    });

    // 4. Pointer logic
    const pointerEntrance = spring({
        frame: frame - T3,
        fps,
        config: { damping: 12 },
    });

    // Pointer trajectory (Direct but slightly curved path)
    const pointerPath = spring({
        frame: frame - T4,
        fps,
        config: { stiffness: 80, damping: 15 },
    });

    // Positions (Fitted to frame)
    const baseFontSize = 85;
    const finalEverythingX = -450;
    const finalStartsX = -80;
    const finalBoxX = 300;

    const pointerStartX = -width / 2.5;
    const pointerStartY = -height / 2.5;
    const pointerTargetX = finalBoxX + 20;
    const pointerTargetY = 30;

    const pointerX = interpolate(pointerPath, [0, 1], [pointerStartX, pointerTargetX]);
    const pointerY = interpolate(pointerPath, [0, 1], [pointerStartY, pointerTargetY]);

    // Pointer Click Effect (Quick dip at T5)
    const clickAnim = spring({
        frame: frame - T5,
        fps,
        config: { stiffness: 400, damping: 10 },
    });
    const pointerScale = 1 - clickAnim * 0.2;

    // 5. Box / Spark logic
    const boxGlow = spring({
        frame: frame - T5,
        fps,
        config: { stiffness: 200, damping: 10 },
    });

    const sparkReveal = spring({
        frame: frame - T6,
        fps,
        config: { damping: 12 },
    });

    // Moving gradient background for the box
    const bgPhase = frame * 2;
    const gradientPos = `${interpolate(bgPhase % 200, [0, 200], [0, 100])}%`;

    // Background water-like motion (Subtle)
    const t = frame / fps;
    const move1X = interpolate(Math.sin(t * 1.5), [-1, 1], [30, 70]);
    const move1Y = interpolate(Math.cos(t * 1.0), [-1, 1], [20, 80]);
    const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

    return (
        <AbsoluteFill style={{
            backgroundColor: Theme.background,
            color: Theme.text,
            fontFamily: "'Archivo', sans-serif",
            overflow: "hidden",
        }}>
            {/* Background */}
            <div style={{
                position: "absolute",
                inset: -200,
                background: `radial-gradient(circle at ${move1X}% ${move1Y}%, rgba(255, 140, 0, 0.12) 0%, transparent 60%)`,
                filter: "blur(60px)",
            }} />
            <AbsoluteFill style={{ backgroundImage: `url("${noiseUrl}")`, opacity: 0.4, pointerEvents: "none" }} />

            {/* Main Stage */}
            <div style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: `${baseFontSize}px`,
                fontWeight: 800,
                letterSpacing: "-1.5px",
                flexDirection: "row",
                gap: "25px", // Tightened spacing
            }}>
                {/* Word: Everything (Starts Centered) */}
                <div style={{
                    opacity: everythingEntrance,
                    transform: `translateX(${interpolate(everythingShift, [0, 1], [0, finalEverythingX])}px) scale(${everythingEntrance})`,
                    whiteSpace: "nowrap",
                }}>
                    Everything
                </div>

                {/* Word: starts with a */}
                <div style={{
                    opacity: sentenceEntrance,
                    transform: `translateX(${interpolate(sentenceEntrance, [0, 1], [width / 2, finalStartsX])}px)`,
                    whiteSpace: "nowrap",
                }}>
                    starts with a
                </div>

                {/* THE BOX (Gradient reveal) */}
                <div style={{
                    width: "240px",
                    height: "120px",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    background: `linear-gradient(45deg, #ffffff, ${Theme.purple}, #ffffff)`,
                    backgroundSize: "200% 200%",
                    backgroundPosition: `${gradientPos} center`,
                    opacity: sentenceEntrance,
                    transform: `translateX(${interpolate(sentenceEntrance, [0, 1], [width / 2, finalBoxX])}px) scale(${1 + boxGlow * 0.1})`,
                    boxShadow: boxGlow > 0 ? `0 0 ${boxGlow * 120}px rgba(168, 85, 247, 0.7)` : "none",
                    overflow: "hidden",
                }}>
                    {/* Inner Content: Spark */}
                    <div style={{
                        color: Theme.background,
                        fontSize: "56px",
                        opacity: sparkReveal,
                        transform: `translateY(${interpolate(sparkReveal, [0, 1], [20, 0])}px)`,
                        fontWeight: 900,
                    }}>
                        spark
                    </div>
                </div>
            </div>

            {/* MOUSE POINTER */}
            <div style={{
                position: "absolute",
                left: `calc(50% + ${pointerX}px)`,
                top: `calc(50% + ${pointerY}px)`,
                opacity: pointerEntrance,
                transform: `translate(-50%, -50%) scale(${pointerScale})`,
                color: Theme.text, // White cursor for contrast
            }}>
                <MousePointer2
                    size={64}
                    fill={Theme.text}
                    strokeWidth={2}
                    style={{
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
