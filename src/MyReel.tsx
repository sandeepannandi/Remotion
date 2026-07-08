import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import React from "react";

// ── Constants ─────────────────────────────────────────────────
const WORD_STRIDE = 5;
const FONT_SIZE = 260;
const PAD_TOP = 200;
const PAD_LEFT = 180;

const CUT_TO_DEV = 220;         // view.mp4 → dev.mp4
const CUT_FREELANCER = 275;     // "Besides that..." replaces prev
const CUT_TALK = 320;           // "I love to talk..." starts
const CUT_TO_CODE = 395;        // dev.mp4 → code.mp4
const CUT_TO_ROCKET = 525;      // code.mp4 → rocket.mp4
const TOTAL_FRAMES = 562;       // last word at 550 + 400ms buffer (12 frames)

// ── Helper: which phase? ──────────────────────────────────────
type Phase = "view" | "dev" | "code" | "rocket";
const getPhase = (frame: number): Phase =>
  frame < CUT_TO_DEV
    ? "view"
    : frame < CUT_TO_CODE
      ? "dev"
      : frame < CUT_TO_ROCKET
        ? "code"
        : "rocket";

// ── Word entrance line ────────────────────────────────────────
const WordLine: React.FC<{
  words: string[];
  baseFrame: number;
  frame: number;
}> = ({ words, baseFrame, frame }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0.15em", pointerEvents: "none" }}>
    {words.map((w, i) => {
      const spr = spring({
        frame: frame - baseFrame - i * WORD_STRIDE,
        fps: 30,
        config: { damping: 14, stiffness: 120 },
      });
      return (
        <span
          key={i}
          style={{
            display: "inline-block",
            transform: `translateY(${interpolate(spr, [0, 1], [70, 0])}px)`,
            opacity: interpolate(spr, [0, 1], [0, 1]),
            whiteSpace: "nowrap",
          }}
        >
          {w}
        </span>
      );
    })}
  </div>
);

// ── Per-phase sections (one active at a time, instant replace) ─
const viewSections = [
  { words: ["Hi", "I'm", "Sandeepan."], start: 8, end: 50 },
  {
    words: ["I'm", "new", "here.", "Let", "me", "introduce", "myself."],
    start: 50,
    end: 100,
  },
  {
    words: ["I'm", "a", "software", "engineer", "currently", "at", "a", "US", "startup"],
    start: 100,
    end: 180,
  },
  { words: ["and", "I'm", "also", "building", "a", "product."], start: 180, end: CUT_TO_DEV },
];

const devSections = [
  { words: ["I'm", "a", "web", "and", "app", "developer."], start: CUT_TO_DEV, end: CUT_FREELANCER },
  { words: ["Besides", "that,", "I'm", "also", "a", "freelancer."], start: CUT_FREELANCER, end: CUT_TALK },
  { words: ["I", "love", "to", "talk", "about", "deep", "tech,"], start: CUT_TALK, end: 355 },
  { words: ["coding,", "open", "source", "and", "AI."], start: 356, end: CUT_TO_CODE },
];

const codeSections = [
  { words: ["On", "this", "page", "I'll", "show", "you:"], start: CUT_TO_CODE, end: 425 },
  { words: ["How", "I", "build", "products", "solo."], start: 425, end: 455 },
  { words: ["What", "works.", "What", "fails."], start: 455, end: 485 },
  { words: ["Behind", "the", "scenes", "of", "launching", "an", "app."], start: 485, end: CUT_TO_ROCKET },
];

const rocketSections = [
  { words: ["So", "stay", "along", "for", "the", "journey."], start: CUT_TO_ROCKET, end: Infinity },
];

export const MyReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const phase = getPhase(frame);

  const activeSection =
    phase === "view"
      ? viewSections.find((s) => frame >= s.start && frame < s.end)
      : phase === "dev"
        ? devSections.find((s) => frame >= s.start && frame < s.end)
        : phase === "code"
          ? codeSections.find((s) => frame >= s.start && frame < s.end)
          : rocketSections.find((s) => frame >= s.start && frame < s.end);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* ── Background videos — Sequence ensures each starts from beginning ── */}
      <Sequence from={0} durationInFrames={CUT_TO_DEV}>
        <Video
          src={staticFile("view.mp4")}
          volume={0}
          style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }}
        />
      </Sequence>

      <Sequence from={CUT_TO_DEV} durationInFrames={CUT_TO_CODE - CUT_TO_DEV}>
        <Video
          src={staticFile("dev.mp4")}
          volume={0}
          style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }}
        />
      </Sequence>

      <Sequence from={CUT_TO_CODE} durationInFrames={CUT_TO_ROCKET - CUT_TO_CODE}>
        <Video
          src={staticFile("code.mp4")}
          volume={0}
          style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }}
        />
      </Sequence>

      <Sequence from={CUT_TO_ROCKET} durationInFrames={TOTAL_FRAMES - CUT_TO_ROCKET}>
        <Video
          src={staticFile("rocket.mp4")}
          volume={0}
          style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }}
        />
      </Sequence>

      {/* Gradient — white-text phases need it */}
      {(phase === "view" || phase === "code") && (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Text overlay */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: `${PAD_TOP}px 120px 0 ${PAD_LEFT}px`,
          maxHeight: "50%",
          overflow: "hidden",
          fontFamily: "'Geist', 'Inter', sans-serif",
          fontWeight: 700,
          fontSize: FONT_SIZE,
          lineHeight: 1.2,
          color: phase === "dev" || phase === "rocket" ? "#000000" : "#ffffff",
        }}
      >
        {activeSection && (
          <WordLine
            words={activeSection.words}
            baseFrame={activeSection.start}
            frame={frame}
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
