import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    spring,
} from "remotion";
import React from "react";

const Theme = {
    primary: "#6366f1",
    secondary: "#ec4899",
    background: "#0f172a",
    text: "#f8fafc",
    accent: "#00d2ff",
};

const Logo: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            transform: `scale(${progress})`,
            opacity: progress,
        }}>
            <div style={{
                width: "80px",
                height: "80px",
                background: `linear-gradient(135deg, ${Theme.primary}, ${Theme.secondary})`,
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
            }}>
                <div style={{
                    width: "40px",
                    height: "40px",
                    border: "6px solid white",
                    borderRadius: "10px",
                    transform: "rotate(45deg)",
                }} />
            </div>
            <span style={{
                fontSize: "72px",
                fontWeight: 900,
                color: Theme.text,
                letterSpacing: "-2px",
            }}>Clix</span>
        </div>
    );
};

export const ClixVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const introSpring = spring({
        frame,
        fps,
        config: { damping: 12 },
    });

    const feature1Spring = spring({
        frame: frame - 90,
        fps,
        config: { damping: 12 },
    });

    const feature2Spring = spring({
        frame: frame - 210,
        fps,
        config: { damping: 12 },
    });

    const ctaSpring = spring({
        frame: frame - 330,
        fps,
        config: { damping: 12 },
    });

    // Background animation
    const bgPos = interpolate(frame, [0, 450], [0, 100]);

    return (
        <AbsoluteFill style={{
            backgroundColor: Theme.background,
            color: Theme.text,
            fontFamily: "Inter, system-ui, sans-serif",
            overflow: "hidden",
        }}>
            {/* Dynamic Background Gradient */}
            <div style={{
                position: "absolute",
                inset: -200,
                background: `radial-gradient(circle at ${bgPos}% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at ${100 - bgPos}% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
                filter: "blur(80px)",
            }} />

            {/* Intro Sequence */}
            <Sequence from={0} durationInFrames={120}>
                <div style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `translateY(${interpolate(introSpring, [0, 1], [50, 0])}px)`,
                }}>
                    <Logo progress={introSpring} />
                </div>
            </Sequence>

            {/* Feature 1: The Problem */}
            <Sequence from={90} durationInFrames={150}>
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: feature1Spring,
                    transform: `scale(${interpolate(feature1Spring, [0, 1], [0.9, 1])})`,
                }}>
                    <h2 style={{
                        fontSize: "64px",
                        fontWeight: 800,
                        textAlign: "center",
                        maxWidth: "800px",
                        lineHeight: 1.1,
                        marginBottom: "40px",
                    }}>
                        Tired of <span style={{ color: Theme.secondary }}>low CTR</span> thumbnails?
                    </h2>
                    <div style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "40px",
                    }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                width: "300px",
                                height: "170px",
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                position: "relative",
                                overflow: "hidden",
                            }}>
                                <div style={{
                                    height: "70%",
                                    background: `linear-gradient(45deg, #334155, #1e293b)`,
                                }} />
                                <div style={{ padding: "12px" }}>
                                    <div style={{ height: "8px", width: "60%", background: "rgba(255,255,255,0.2)", borderRadius: "4px" }} />
                                </div>
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(236, 72, 153, 0.2)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    opacity: interpolate(feature1Spring, [0.5, 1], [0, 1]),
                                }}>
                                    <div style={{
                                        padding: "8px 16px",
                                        background: Theme.secondary,
                                        borderRadius: "20px",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                    }}>BAD CTR</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Sequence>

            {/* Feature 2: The Solution */}
            <Sequence from={210} durationInFrames={150}>
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: feature2Spring,
                    transform: `translateY(${interpolate(feature2Spring, [0, 1], [50, 0])}px)`,
                }}>
                    <h2 style={{
                        fontSize: "80px",
                        fontWeight: 900,
                        textAlign: "center",
                        background: `linear-gradient(to right, ${Theme.accent}, ${Theme.primary})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        AI-Powered Results
                    </h2>
                    <p style={{ fontSize: "32px", color: "rgba(255,255,255,0.6)", marginTop: "20px" }}>
                        Generate high-converting thumbnails in seconds
                    </p>

                    {/* Visual representation of growth */}
                    <div style={{
                        marginTop: "60px",
                        width: "800px",
                        height: "300px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "24px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "40px",
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "20px",
                    }}>
                        {[0.2, 0.4, 0.3, 0.8, 0.6, 0.9, 1].map((h, i) => (
                            <div key={i} style={{
                                flex: 1,
                                height: `${h * 100 * feature2Spring}%`,
                                background: i === 6 ? `linear-gradient(to top, ${Theme.primary}, ${Theme.accent})` : "rgba(255,255,255,0.1)",
                                borderRadius: "8px 8px 0 0",
                                position: "relative",
                            }}>
                                {i === 6 && (
                                    <div style={{
                                        position: "absolute",
                                        top: "-40px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        color: Theme.accent,
                                        fontWeight: 800,
                                        fontSize: "24px",
                                    }}>+240%</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Sequence>

            {/* CTA Sequence */}
            <Sequence from={330} durationInFrames={120}>
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: ctaSpring,
                }}>
                    <Logo progress={ctaSpring} />
                    <h2 style={{
                        fontSize: "48px",
                        fontWeight: 700,
                        marginTop: "40px",
                        marginBottom: "40px",
                    }}>
                        Ready to dominate YouTube?
                    </h2>
                    <div style={{
                        padding: "24px 60px",
                        background: `linear-gradient(to right, ${Theme.primary}, ${Theme.secondary})`,
                        borderRadius: "50px",
                        fontSize: "32px",
                        fontWeight: 800,
                        boxShadow: "0 20px 50px rgba(99, 102, 241, 0.3)",
                        cursor: "pointer",
                        transform: `scale(${interpolate(ctaSpring, [0.8, 1], [0.8, 1])})`,
                    }}>
                        Start Free with Clix
                    </div>
                    <p style={{ marginTop: "30px", color: "rgba(255,255,255,0.4)" }}>
                        No credit card required
                    </p>
                </div>
            </Sequence>
        </AbsoluteFill>
    );
};
