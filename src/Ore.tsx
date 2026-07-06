import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const imageFiles = [
  "test1.jpg",
  "test2.jpg",
  "test3.jpg",
  "test4.jpg",
  "test5.png",
  "test6.png",
  "test7.png",
  "test8.png",
];

const imagePositions = imageFiles.map((_, i) => ({
  left: Math.abs(Math.sin(i * 127.1 + 311.7)) * 40 + 30,
  top: Math.abs(Math.sin(i * 269.5 + 183.3)) * 40 + 30,
}));

const scene2Words = ["Create", "on", "brand", "images", "&", "videos"];

export const Ore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["Introducing", "Ore"];

  const textEndFrame = 32;
  const imageStartFrame = textEndFrame + 6; // 200ms gap
  const imageInterval = 15; // 500ms at 30fps
  const lastImageFrame = imageStartFrame + (imageFiles.length - 1) * imageInterval;
  const scene2Start = lastImageFrame + 15; // 500ms after last image

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile("bg2.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Intro text - hidden when scene 2 is visible */}
      {frame >= scene2Start ? null : (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
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
      )}

      {/* Test images appearing randomly - hidden when scene 2 is visible */}
      {frame >= scene2Start ? null : imageFiles.map((file, i) => {
        const showFrame = imageStartFrame + i * imageInterval;
        if (frame < showFrame) return null;
        return (
          <Img
            key={file}
            src={staticFile(file)}
            style={{
              position: "absolute",
              left: `${imagePositions[i].left}%`,
              top: `${imagePositions[i].top}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Scene 2: Create on brand images & videos */}
      {frame < scene2Start ? null : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            whiteSpace: "nowrap",
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: 200,
            fontWeight: 700,
            color: "#000000",
            gap: "0.25em",
            textAlign: "center",
            }}
          >
            {scene2Words.map((word, i) => {
              const delay = scene2Start + i * 6;
            const relFrame = frame - delay;
            const spr = spring({
              frame: relFrame,
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
      )}
    </AbsoluteFill>
  );
};
