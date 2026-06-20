import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import React from "react";

const { fontFamily } = loadFont();

const CONTAINER_STYLE: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  backgroundColor: "black",
};



// Color palette for the video
const COLORS = {
  primary: "#F5F2E3",
  accent1: "#FF6B35",
  accent2: "#00D4AA",
  accent3: "#FFD166",
  accent4: "#7B2CBF",
  accent5: "#EF476F",
};

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E`;

const AnimatedText: React.FC<{
  text: string;
  startFrame: number;
  color?: string;
  fontSize?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
}> = ({ text, startFrame, color = COLORS.primary, fontSize = 500, staggerDelay = 4, direction = "up" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  const getTransform = (progress: number, index: number) => {
    switch (direction) {
      case "up": return `translateY(${interpolate(progress, [0, 1], [80, 0])}px)`;
      case "down": return `translateY(${interpolate(progress, [0, 1], [-80, 0])}px)`;
      case "left": return `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`;
      case "right": return `translateX(${interpolate(progress, [0, 1], [-100, 0])}px)`;
      case "scale": return `scale(${interpolate(progress, [0, 1], [0.3, 1])})`;
      default: return `translateY(${interpolate(progress, [0, 1], [80, 0])}px)`;
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
      {words.map((word, i) => {
        const delay = startFrame + i * staggerDelay;
        const spr = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14, stiffness: 100 },
        });
        const opacity = interpolate(spr, [0, 1], [0, 1]);
        const transform = getTransform(spr, i);

        return (
          <span
            key={i}
            style={{
              opacity,
              transform,
              display: "inline-block",
              color,
              fontSize,
              fontWeight: 900,
              fontFamily,
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Scene: Split screen with two colors
const SplitScreenScene: React.FC<{
  leftText: string;
  rightText: string;
  leftColor: string;
  rightColor: string;
  startFrame: number;
}> = ({ leftText, rightText, leftColor, rightColor, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const leftSpr = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const rightSpr = spring({
    frame: localFrame - 10,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const leftScale = interpolate(leftSpr, [0, 1], [0.5, 1]);
  const rightScale = interpolate(rightSpr, [0, 1], [0.5, 1]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      <AbsoluteFill
        style={{
          width: "50%",
          backgroundColor: leftColor,
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${leftScale})`,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#FFFFFF",
            fontSize: 400,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "center",
            padding: "40px",
          }}
        >
          {leftText}
        </span>
      </AbsoluteFill>
      <div style={{ width: "50%" }} />
      <AbsoluteFill
        style={{
          width: "50%",
          left: "50%",
          backgroundColor: rightColor,
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${rightScale})`,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#FFFFFF",
            fontSize: 400,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 1,
            textAlign: "center",
            padding: "40px",
          }}
        >
          {rightText}
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Scene: Pulsing text with color transitions
const PulseTextScene: React.FC<{
  texts: string[];
  colors: string[];
  startFrame: number;
  durationPerText: number;
}> = ({ texts, colors, startFrame, durationPerText }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const textIndex = Math.min(
    Math.floor(localFrame / durationPerText),
    texts.length - 1
  );
  const nextTextProgress = (localFrame - durationPerText * textIndex) / durationPerText;

  const pulse = interpolate(
    Math.sin(nextTextProgress * Math.PI * 2 * 2),
    [-1, 1],
    [0.9, 1.1]
  );

  const opacity = interpolate(
    nextTextProgress,
    [0, 0.1, 0.8, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors[textIndex],
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.3s ease",
      }}
    >
      <span
        style={{
          fontFamily,
          color: "#FFFFFF",
          fontSize: 500,
          fontWeight: 900,
          textTransform: "uppercase",
          lineHeight: 1,
          textAlign: "center",
          transform: `scale(${pulse})`,
          opacity,
          padding: "40px",
        }}
      >
        {texts[textIndex]}
      </span>
    </AbsoluteFill>
  );
};

// Scene: Zooming text carousel
const ZoomCarousel: React.FC<{
  items: { text: string; color: string }[];
  startFrame: number;
  durationPerItem: number;
}> = ({ items, startFrame, durationPerItem }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {items.map((item, i) => {
        const itemStart = i * durationPerItem;
        const itemEnd = itemStart + durationPerItem;
        if (localFrame < itemStart || localFrame >= itemEnd) return null;

        const scale = interpolate(
          localFrame,
          [itemStart, itemStart + 10, itemEnd - 10, itemEnd],
          [2, 1, 1, 0.3],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const opacity = interpolate(
          localFrame,
          [itemStart, itemStart + 5, itemEnd - 10, itemEnd],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <AbsoluteFill
            key={i}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: item.color,
              transform: `scale(${scale})`,
              opacity,
            }}
          >
            <span
              style={{
                fontFamily,
                color: "#FFFFFF",
                fontSize: 500,
                fontWeight: 900,
                textTransform: "uppercase",
                lineHeight: 1,
                textAlign: "center",
                padding: "40px",
              }}
            >
              {item.text}
            </span>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

export const Yt2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing constants
  const introEnd = 2 * fps; // 2s - Fade in first text
  const punch1End = introEnd + 1 * fps; // 1s - "MINDSET"
  const punch2End = punch1End + 1 * fps; // 1s - "DISCIPLINE"
  const punch3End = punch2End + 1 * fps; // 1s - "CONSISTENCY"

  // Split screen section
  const splitStart = punch3End + 0.5 * fps;
  const splitEnd = splitStart + 2.5 * fps;

  // Pulse text section
  const pulseStart = splitEnd;
  const pulseEnd = pulseStart + 4 * fps;

  // Zoom carousel
  const zoomStart = pulseEnd + 0.5 * fps;
  const zoomEnd = zoomStart + 4 * fps;

  // Final reveal
  const finalStart = zoomEnd + 0.5 * fps;
  const finalEnd = finalStart + 3 * fps;

  // Word by word section
  const wbwStart = finalEnd;
  const wbwEnd = wbwStart + 3 * fps;

  // Outro
  const outroStart = wbwEnd + 0.5 * fps;
  const outroEnd = outroStart + 2.5 * fps;

  const punch1Opacity = interpolate(frame, [introEnd, introEnd + 10, punch1End - 5, punch1End], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const punch2Opacity = interpolate(frame, [punch1End, punch1End + 10, punch2End - 5, punch2End], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const punch3Opacity = interpolate(frame, [punch2End, punch2End + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final scene animations
  const finalScale = spring({
    frame: frame - finalStart,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const outroOpacity = interpolate(
    frame,
    [outroStart, outroStart + 15, outroEnd - 10, outroEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Noise overlay for texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `url("${noiseUrl}")`,
          pointerEvents: "none",
          opacity: 0.5,
          zIndex: 1000,
        }}
      />

      {/* INTRO: Word by word fade in */}
      <Sequence durationInFrames={introEnd}>
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: "#0a0a0a",
          }}
        >
          <AnimatedText
            text="THE FUTURE IS"
            startFrame={0}
            color={COLORS.primary}
            fontSize={500}
            staggerDelay={5}
            direction="scale"
          />
        </AbsoluteFill>
      </Sequence>

      {/* PUNCH 1: Big bold word */}
      {frame >= introEnd && frame < punch1End && (
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: COLORS.accent5,
          }}
        >
          <span
            style={{
              fontFamily,
              color: "#FFFFFF",
              fontSize: 600,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: punch1Opacity,
              transform: `scale(${interpolate(
                Math.min(1, (frame - introEnd) / 10),
                [0, 1],
                [0.5, 1]
              )})`,
            }}
          >
            NOW
          </span>
        </AbsoluteFill>
      )}

      {/* PUNCH 2 */}
      {frame >= punch1End && frame < punch2End && (
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: COLORS.accent2,
          }}
        >
          <span
            style={{
              fontFamily,
              color: "#FFFFFF",
              fontSize: 600,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: punch2Opacity,
            }}
          >
            NOT LATER
          </span>
        </AbsoluteFill>
      )}

      {/* PUNCH 3 */}
      {frame >= punch2End && frame < punch3End && (
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: COLORS.accent1,
          }}
        >
          <span
            style={{
              fontFamily,
              color: "#FFFFFF",
              fontSize: 600,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              opacity: punch3Opacity,
            }}
          >
            START TODAY
          </span>
        </AbsoluteFill>
      )}

      {/* SPLIT SCREEN: Two contrasting ideas */}
      <Sequence from={splitStart} durationInFrames={splitEnd - splitStart}>
        <SplitScreenScene
          leftText="DOUBT"
          rightText="ACTION"
          leftColor={COLORS.accent4}
          rightColor={COLORS.accent2}
          startFrame={0}
        />
      </Sequence>

      {/* PULSE TEXT SECTION: Rotating colored text */}
      <Sequence from={pulseStart} durationInFrames={pulseEnd - pulseStart}>
        <PulseTextScene
          texts={["CREATE", "SHIP", "ITERATE", "GROW"]}
          colors={[COLORS.accent1, COLORS.accent4, COLORS.accent2, COLORS.accent3]}
          startFrame={0}
          durationPerText={Math.round(1 * fps)}
        />
      </Sequence>

      {/* ZOOM CAROUSEL: Rapid zooming words */}
      <Sequence from={zoomStart} durationInFrames={zoomEnd - zoomStart}>
        <ZoomCarousel
          items={[
            { text: "BUILD", color: COLORS.accent5 },
            { text: "LEARN", color: COLORS.accent4 },
            { text: "REPEAT", color: COLORS.accent2 },
          ]}
          startFrame={0}
          durationPerItem={Math.round(1.3 * fps)}
        />
      </Sequence>

      {/* FINAL REVEAL */}
      {frame >= finalStart && frame < finalEnd && (
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: "#000000",
          }}
        >
          <span
            style={{
              fontFamily,
              color: COLORS.accent3,
              fontSize: 600,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              lineHeight: 1,
              textAlign: "center",
              transform: `scale(${finalScale})`,
              opacity: interpolate(
                frame - finalStart,
                [0, 10],
                [0, 1]
              ),
              textShadow: `0 0 40px ${COLORS.accent3}40, 0 0 80px ${COLORS.accent3}20`,
            }}
          >
            NO EXCUSES
          </span>
        </AbsoluteFill>
      )}

      {/* WORD BY WORD: Build up phrase */}
      <Sequence from={wbwStart} durationInFrames={wbwEnd - wbwStart}>
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: "#0a0a0a",
          }}
        >
          <AnimatedText
            text="JUST EXECUTE"
            startFrame={0}
            color={COLORS.primary}
            fontSize={500}
            staggerDelay={6}
            direction="left"
          />
        </AbsoluteFill>
      </Sequence>

      {/* OUTRO: Final message */}
      {frame >= outroStart && frame < outroEnd && (
        <AbsoluteFill
          style={{
            ...CONTAINER_STYLE,
            backgroundColor: COLORS.accent1,
            opacity: outroOpacity,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <span
              style={{
                fontFamily,
                color: "#FFFFFF",
                fontSize: 700,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              GO BUILD
            </span>
            <span
              style={{
                fontFamily,
                color: "rgba(255,255,255,0.6)",
                fontSize: 250,
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              Your move.
            </span>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
