import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const Ore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["Introducing", "Ore"];

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile("bg2.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontFamily: "'Geist', 'Inter', sans-serif",
          fontSize: 280,
          fontWeight: 700,
          color: "#000000",
          gap: "0.25em",
        }}
      >
        {words.map((word, i) => {
          const delay = i * 12;
          const spr = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const translateY = interpolate(spr, [0, 1], [60, 0]);
          const opacity = interpolate(spr, [0, 1], [0, 1]);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateY(${translateY}px)`,
                opacity,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
