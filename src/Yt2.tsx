import { AbsoluteFill, Img, staticFile, useCurrentFrame, AnimatedImage, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import React from "react";

const { fontFamily } = loadFont();

const TEXT_STYLE: React.CSSProperties = {
  fontFamily,
  color: "#F5F2E3",
  fontSize: 500,
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  lineHeight: 1,
  display: "flex",
  gap: "50px",
};

export const Yt2: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Scene 1: ronaldo with cat gif */}
      {frame < 101 && (
        <>
          <Img
            src={staticFile("ronaldo.avif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 30 && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <AnimatedImage
                src={staticFile("cateating.gif")}
                width={850}
                height={850}
                fit="cover"
              />
            </div>
          )}
        </>
      )}

      {/* Scene 2: image.png at frame 101 */}
      {frame >= 101 && frame < 170 && (
        <Img
          src={staticFile("image.png")}
          style={{
            width: "95%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}

      {/* Scene 3: dr.jpeg at frame 170 for 2s */}
      {frame >= 170 && frame < 230 && (
        <AbsoluteFill style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
          <Img
            src={staticFile("dr.jpeg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 0%"
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 4: Since 1974. word by word */}
      {frame >= 230 && frame < 280 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={TEXT_STYLE}>
            <span style={{ opacity: 1 }}>SINCE</span>
            <span style={{ opacity: frame >= 238 ? 1 : 0 }}>1974.</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 5: Sad images scattered one by one at 300ms intervals */}
      {frame >= 280 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          {frame >= 280 && (
            <Img
              src={staticFile("sad1.png")}
              style={{
                position: "absolute",
                width: "40%",
                left: "10%",
                top: "12%",
                transform: "rotate(-10deg)",
                opacity: Math.min(1, (frame - 280) / 3),
              }}
            />
          )}
          {frame >= 289 && (
            <Img
              src={staticFile("sad2.png")}
              style={{
                position: "absolute",
                width: "35%",
                right: "8%",
                top: "5%",
                transform: "rotate(6deg)",
                opacity: Math.min(1, (frame - 289) / 3),
              }}
            />
          )}
          {frame >= 298 && (
            <Img
              src={staticFile("sad3.png")}
              style={{
                position: "absolute",
                width: "40%",
                left: "10%",
                bottom: "15%",
                transform: "rotate(-14deg)",
                opacity: Math.min(1, (frame - 298) / 3),
              }}
            />
          )}
          {frame >= 307 && (
            <Img
              src={staticFile("sad4.png")}
              style={{
                position: "absolute",
                width: "50%",
                right: "5%",
                bottom: "35%",
                transform: "rotate(15deg)",
                opacity: Math.min(1, (frame - 307) / 3),
              }}
            />
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
