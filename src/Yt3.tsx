import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  Video,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { Gif } from "@remotion/gif";
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

const VIDEO_START = 30; // mathvideo.mp4 starts (1s)
const HAMMER_START = VIDEO_START + 24; // hammer appears ~0.8s after the video (200ms earlier)
const IMPACT = HAMMER_START + 51; // hammer reaches center -> glass smash (swing ~1.7s)
// Scene 3 overlays: each box appears 9 frames after its image, and the next
// scene starts 500ms (15 frames at 30fps) after that box appears
const CURSOR_START = IMPACT + 30 + 3; // cursor appears 300ms into scene 3
const BOX_DELAY = 9; // box appears 9 frames after its image
const SCENE_DELAY = 27; // 900ms after the box -> next scene (was 500ms, +400ms)
const BOX20_START = CURSOR_START + BOX_DELAY; // $20 box
const CLAUDE_START = BOX20_START + SCENE_DELAY + 3; // claude: now 1.2s after $20 box
const GPT_START = CLAUDE_START + BOX_DELAY + SCENE_DELAY + 9; // gpt: now 1.2s after claude's $20 box (+200ms)
const GEMINI_START = GPT_START + BOX_DELAY + SCENE_DELAY + 10; // gemini: now 1.3s after gpt's $100 box (+200ms for cursor audio extension)
const SCATTER_START = GEMINI_START + BOX_DELAY + SCENE_DELAY + 35; // scattered logos: 1.95s after gemini's $20 box (+150ms extension)
// Scene 4: worried.mp4 plays to its very end, then moneythrow.mp4 plays fully
const WORRIED_START = IMPACT + 30; // worried.mp4 starts (frame 135)
const WORRIED_FRAMES = 338; // worried.mp4 = 11.262s @ 30fps
// moneythrow.mp4 = 6.005s @ 30fps = 181 frames -> composition ends at 654
const MONEY_START = WORRIED_START + WORRIED_FRAMES - 60; // cut to moneythrow 2s earlier (frame 413)
// Audio: recently.wav (4.16s at 0.9x speed) plays first, then cursor.wav
// (11.92s) starts exactly when it ends and plays fully (~frame 497)
const CURSOR_AUDIO_START = Math.ceil((4.16 / 0.9) * 30); // = frame 139
const GEMINI_AUDIO_END = GEMINI_START + Math.ceil(1.84 * 30); // gemini.wav ~55 frames
const NOTTOMENTION_FRAMES = Math.ceil(6.16 * 30); // nottomention.wav ~185 frames
// Scene 5: expensive.png full screen + "$90 PER MONTH" typed word by word,
// held for exactly as long as 90.wav lasts
const EXPENSIVE_START = GEMINI_AUDIO_END + NOTTOMENTION_FRAMES; // frame 509
const EXPENSIVE_FRAMES = Math.ceil(2.64 * 30); // 90.wav = 2.64s -> 80 frames
// The pill text waits 400ms after the scene starts, then reveals one word
// every 400ms (12 frames each, same cadence as the "I PAY $0" line)
const TEXT_START = EXPENSIVE_START + 12; // frame 521
const WORD_STEP = 12; // frames between words
// Scene 5b: nomen images scattered on black bg, appearing one by one
// with a fast fade-in transition, large size
const NOMEN_START = EXPENSIVE_START + EXPENSIVE_FRAMES; // frame 589
const NOMEN_FRAMES = Math.ceil(3.84 * 30); // nomore.wav = 3.84s -> 116 frames
// Scene 6: laugh.mp4 + zero.wav right after the nomen scene
const LAUGH_START = NOMEN_START + NOMEN_FRAMES; // frame 705
// zero.wav = 1.12s at 0.9x speed -> ~37 frames (its speech ends ~10 frames
// early, the rest is trailing silence), so the video stops with the last audio
const ZERO_FRAMES = Math.round((1.12 / 0.9) * 30); // = 37 frames
// Scene 7: rubpat.gif closes the video with sauce.wav as its audio, straight
// after the laugh scene with no gap. The gif is 3 frames x 80ms = 0.24s per
// cycle and loops forever (Netscape loop = 0), so it loops until the audio ends
const RUB_START = LAUGH_START + ZERO_FRAMES; // frame 742
const RUB_FRAMES = Math.ceil(2 * 30); // sauce.wav = 2s -> 60 frames
const BROKE_START = RUB_START + RUB_FRAMES; // broke.png starts after rubpat.gif
const BROKE_FRAMES = Math.ceil(1.36 * 30); // gobroke.wav = 1.36s -> 41 frames
const WORK_START = BROKE_START + BROKE_FRAMES; // new scene starts after broke
// work.wav = 4.32s, played at 0.9x -> 4.8s of audio -> 144 frames
const WORK_FRAMES = Math.ceil((4.32 / 0.9) * 30);
const SCATTER2_START = WORK_START + 33; // logos begin 1.1s in
const LOGO_STEP = 10; // frames between logos
const BUTWAIT_WORDS = ["SO", "I", "FOUND"];
const BUTWAIT_STEP = 9; // frames between the two words

// Scene 10: one segment per tool, each on its own black screen: the tool
// name on top (same Bebas Neue text style and timing as "GO BROKE") with the
// tool logo underneath it. Add another entry to TOOL_SEGMENTS to extend it.
const TOOL_START = WORK_START + WORK_FRAMES;
const TOOL_TITLE_DELAY = 0; // the marker and title are up on the first frame
const TOOL_WORD_STEP = 12; // frames between title words
const TOOL_SEGMENTS = [
  {
    title: "OMNIROUTE",
    src: "omniroute.png",
    audio: "omni.wav",
    // omni.wav = 2.24s, the segment lasts exactly as long as the audio
    frames: Math.ceil(2.24 * 30),
  },
];

const TOOL_TIMELINE = TOOL_SEGMENTS.map((seg, i) => ({
  ...seg,
  index: i + 1,
  start:
    TOOL_START +
    TOOL_SEGMENTS.slice(0, i).reduce((acc, s) => acc + s.frames, 0),
}));

// Scene 11: OmniRoute hub diagram - "50+ AI" on the left, the omniroute hub
// in the centre, and the tool logos stacked on the right, each one wired to
// the hub with a line that draws itself in.
const HUB_START =
  TOOL_START + TOOL_SEGMENTS.reduce((acc, s) => acc + s.frames, 0);
const HUB_FRAMES = 180;
const HUB_LEFT_CHARS = ["5", "0", "+", "A", "I"];
const HUB_LEFT_START = 6; // frames before the first character shows
const HUB_LEFT_STEP = 8; // frames between characters
const HUB_HUB_DELAY = 10; // frames before "omniroute" shows
const HUB_LOGO_W = 560;
const HUB_COLUMN_X = 2900;
const HUB_NODE_Y = 1080;
const HUB_LINE_START_X = 2290;
const HUB_LINE_DRAW = 14; // frames a line takes to draw itself
const HUB_ROWS = [
  { src: "claude.webp", h: 560, y: 320, delay: 50 },
  { src: "codex.png", h: 274, y: 780, delay: 70 },
  { src: "kilo.png", h: 292, y: 1240, delay: 90 },
  { src: "opencode.png", h: 315, y: 1700, delay: 110 },
];

export const TOTAL_DURATION =
  TOOL_START +
  TOOL_SEGMENTS.reduce((acc, s) => acc + s.frames, 0) +
  HUB_FRAMES;

// Free-alt tools scattered in a circular cloud around the centre of the
// frame. Slots are spread around an ellipse (a circle would push the top and
// bottom tiles off the 16:9 frame), then every slot is jittered in angle and
// radius so the layout reads as a random scatter rather than a neat ring.
// The pop-in order is shuffled too, so the tiles never reveal themselves
// clockwise from one side.
const TILE_WIDTH = 880;
const TILE_AR: Record<string, number> = {
  "omniroute.png": 255 / 82,
  "opencode.png": 1280 / 721,
  "kilo.png": 213 / 111,
  "groq.png": 214 / 109,
  "codex.png": 399 / 195,
  "mistral.png": 177 / 75,
  "freebuff.png": 222 / 106,
};
const FREE_TOOL_ORDER = [
  "omniroute.png",
  "opencode.png",
  "kilo.png",
  "groq.png",
  "codex.png",
  "mistral.png",
  "freebuff.png",
];
const RING_CENTER_X = 1920;
const RING_CENTER_Y = 1080;
const RING_RX = 1380;
const RING_RY = 800;

const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const FREE_TOOLS = (() => {
  const rng = mulberry32(20261019);
  const slots = [...FREE_TOOL_ORDER];

  // shuffle which tool sits in which slot
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  // shuffle the pop-in order so tiles appear in a random sequence
  const popOrder = [...slots];
  for (let i = popOrder.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [popOrder[i], popOrder[j]] = [popOrder[j], popOrder[i]];
  }
  const popIndex: Record<string, number> = {};
  popOrder.forEach((src, i) => {
    popIndex[src] = i;
  });

  const step = (Math.PI * 2) / slots.length;
  let layout: { src: string; left: number; top: number; rot: number }[] = [];

  // jitter the ring, tightening the jitter on every retry until nothing
  // overlaps
  for (let attempt = 0; attempt < 60; attempt++) {
    const shrink = 1 - attempt / 60;
    const angleJitter = 0.22 * shrink;
    const radiusJitter = 90 * shrink;
    const candidate = slots.map((src, i) => {
      const angle = -Math.PI / 2 + i * step + (rng() - 0.5) * angleJitter;
      const rx = RING_RX + (rng() - 0.5) * radiusJitter;
      const ry = RING_RY + (rng() - 0.5) * radiusJitter;
      const tileH = Math.round(TILE_WIDTH / TILE_AR[src]);
      const cx = RING_CENTER_X + rx * Math.cos(angle);
      const cy = RING_CENTER_Y + ry * Math.sin(angle);
      return {
        src,
        left: Math.round(cx - TILE_WIDTH / 2),
        top: Math.round(cy - tileH / 2),
        rot: (rng() - 0.5) * 4,
      };
    });

    const clash = candidate.some((a, i) =>
      candidate.some((b, j) => {
        if (j <= i) {
          return false;
        }
        const ah = Math.round(TILE_WIDTH / TILE_AR[a.src]);
        const bh = Math.round(TILE_WIDTH / TILE_AR[b.src]);
        return (
          a.left < b.left + TILE_WIDTH &&
          a.left + TILE_WIDTH > b.left &&
          a.top < b.top + bh &&
          a.top + ah > b.top
        );
      }),
    );

    if (!clash) {
      layout = candidate;
      break;
    }
  }

  return layout.map((tile) => ({ ...tile, popIndex: popIndex[tile.src] }));
})();
// The "$0" badge lands in the middle of the ring once the last tile is up
const BADGE_START = SCATTER2_START + (FREE_TOOL_ORDER.length - 1) * LOGO_STEP + 10;

// Scattered scene: same-size logos scattered randomly across the frame
// (top-left positions sized against each asset's measured aspect ratio so
// nothing overlaps: heights at width 1150 are 452/647/420/647/648)
const SPREAD_SIZE = 1150;
const SPREAD_LOGOS = [
  { src: "grok.png", left: 90, top: 110 },
  { src: "deepseek.png", left: 1350, top: 440 },
  { src: "kimi.png", left: 2560, top: 800 },
  { src: "elevenlans.png", left: 330, top: 1310 },
  { src: "opencode.png", left: 1750, top: 1350 },
];

export const Yt3: React.FC = () => {
  const frame = useCurrentFrame();

  // Raw progress 0->1 over the whole swing
  const p = interpolate(frame, [HAMMER_START, IMPACT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Main travel: slow start, explosive acceleration into the impact
  const pe = interpolate(frame, [HAMMER_START, IMPACT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  // Anticipation: brief pull back out (wind-up) during the first 35% of the swing
  const ant = Math.sin(Math.min(p / 0.35, 1) * Math.PI);

  // Thrown arc: path bulges upward mid-flight
  const arcY = Math.sin(p * Math.PI) * -280;

  const hammerX = 2320 * (1 - pe) + ant * 320;
  // Ends 320px below center (a little down at impact)
  const hammerY = 1600 * (1 - pe) + ant * 200 + arcY + 320 * pe;
  // Ends tilted slightly left (-14deg) during the final part of the swing
  const rotation = 24 * (1 - pe) + ant * 14 - 14 * pe;

  // Scene 4: demo API key materializes out of old-TV static haze
  // (0 -> 1 over 1.5s, starting 0.4s into the money-throw scene)
  const keyT = interpolate(
    frame,
    [MONEY_START + 12, MONEY_START + 57],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const keySettle = 1 - keyT; // 1 = pure haze, 0 = fully resolved
  const keyFlick = random(`key-flicker-${frame}`); // per-frame static shimmer
  const keyOpacity =
    keyT === 0 ? 0 : Math.min(1, keyT * (1 + 0.45 * keySettle * keyFlick));
  const keyBlur = keySettle * 55; // heavy blur while hazy -> sharp
  const keyGlow = keySettle * 80; // white bloom that burns off as it resolves
  const keyBrightness = 100 + keySettle * 60; // over-bright while warming up
  const keyContrast = 100 - keySettle * 45; // washed out while hazy
  const keyJitterX = (random(`key-jx-${frame}`) - 0.5) * keySettle * 48;
  const keyJitterY = (random(`key-jy-${frame}`) - 0.5) * keySettle * 32;

  return (
    <>
      <Audio src={staticFile("recently.wav")} playbackRate={0.9} />
      {/* cursor.wav plays until gemini scene starts, then stops */}
      <Sequence layout="none" from={CURSOR_AUDIO_START} durationInFrames={GEMINI_START - CURSOR_AUDIO_START}>
        <Audio src={staticFile("cursor.wav")} />
      </Sequence>
      {/* gemini.wav plays at start of gemini scene */}
      <Sequence layout="none" from={GEMINI_START}>
        <Audio src={staticFile("gemini.wav")} />
      </Sequence>
      {/* nottomention.wav plays after gemini.wav ends */}
      <Sequence layout="none" from={GEMINI_AUDIO_END}>
        <Audio src={staticFile("nottomention.wav")} />
      </Sequence>
      {/* 90.wav narrates the expensive scene, which is cut when it ends */}
      <Sequence layout="none" from={EXPENSIVE_START} durationInFrames={EXPENSIVE_FRAMES}>
        <Audio src={staticFile("90.wav")} />
      </Sequence>
      {/* nomore.wav narrates the nomen scene, which plays until the audio ends */}
      <Sequence layout="none" from={NOMEN_START}>
        <Audio src={staticFile("nomore.wav")} />
      </Sequence>
      {/* sauce.wav scores the closing gif scene, which is cut when it ends */}
      <Sequence layout="none" from={RUB_START} durationInFrames={RUB_FRAMES}>
        <Audio src={staticFile("sauce.wav")} />
      </Sequence>
       {/* gobroke.wav plays during the broke scene */}
       <Sequence layout="none" from={BROKE_START}>
         <Audio src={staticFile("gobroke.wav")} />
       </Sequence>
       {/* work.wav plays during the new free-alts scene at 0.9x speed */}
       <Sequence layout="none" from={WORK_START} durationInFrames={WORK_FRAMES}>
         <Audio src={staticFile("work.wav")} playbackRate={0.9} />
       </Sequence>
      {/* Scene 1: RECENTLY... (first 1s) */}
      {frame < VIDEO_START && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={TEXT_STYLE}>
            <span style={{ opacity: frame >= 0 ? 1 : 0 }}>Recently...</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 2: mathvideo.mp4 full screen (instant cut at 1s) */}
      {frame >= VIDEO_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <Video
            src={staticFile("mathvideo.mp4")}
            startFrom={0}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Overlay: hammer flying from bottom right to center */}
          {frame >= HAMMER_START && frame < IMPACT && (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Img
                src={staticFile("hammer.png")}
                style={{
                  height: 1700,
                  transform: `translate(${hammerX}px, ${hammerY}px) rotate(${rotation}deg)`,
                  filter:
                    "drop-shadow(0 40px 60px rgba(0, 0, 0, 0.65)) drop-shadow(0 12px 18px rgba(0, 0, 0, 0.45))",
                }}
              />
            </AbsoluteFill>
          )}

          {/* Overlay: glass smash full screen from impact onward */}
          {frame >= IMPACT && frame < IMPACT + 30 && (
            <Img
              src={staticFile("glasssmash.png")}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 3: worried.mp4 after first scene ends (plays to its very end) */}
      {frame >= WORRIED_START && frame < MONEY_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          {/* Sequence resets the media timeline so worried.mp4 plays
              from its own 0:00 (otherwise it follows the composition
              clock and starts at its 4.5s mark) */}
          <Sequence from={WORRIED_START}>
            <Video
              src={staticFile("worried.mp4")}
              startFrom={0}
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>

          {/* Overlay: cursor logo on left + $20 green box (300ms later) */}
          {frame >= CURSOR_START && frame < CLAUDE_START && (
            <AbsoluteFill style={{ pointerEvents: "none" }}>
              <div
                style={{
                  position: "absolute",
                  left: 320,
                  top: "calc(50% - 260px)",
                  transform: "translateY(-50%)",
                }}
              >
                <Img
                  src={staticFile("cursor.png")}
                  style={{
                    width: 1000,
                    height: "auto",
                    borderRadius: 20,
                  }}
                />
              </div>              {frame >= BOX20_START && (
                <div
                  style={{
                    position: "absolute",
                    left: 820,
                    transform: "translateX(-50%)",
                    top: "calc(50% + 272px)",
                    backgroundColor: "#14532d",
                    color: "white",
                    fontFamily,
                    lineHeight: 1,
                    padding: "32px 68px",
                    borderRadius: 20,
                    fontSize: 320,
                    fontWeight: 900,
                  }}
                >
                  $20
                </div>
              )}
            </AbsoluteFill>
          )}

          {/* Overlay: claude.webp + $20 box (replaces cursor scene) */}
          {frame >= CLAUDE_START && frame < GPT_START && (
            <AbsoluteFill style={{ pointerEvents: "none" }}>
              <div
                style={{
                  position: "absolute",
                  left: 320,
                  top: "calc(50% - 260px)",
                  transform: "translateY(-50%)",
                }}
              >
                <Img
                  src={staticFile("claude.webp")}
                  style={{
                    width: 1000,
                    height: 1000,
                  }}
                />
              </div>
              {frame >= CLAUDE_START + BOX_DELAY + 6 && (
                <div
                  style={{
                    position: "absolute",
                    left: 820,
                    transform: "translateX(-50%)",
                    top: "calc(50% + 272px)",
                    backgroundColor: "#14532d",
                    color: "white",
                    fontFamily,
                    lineHeight: 1,
                    padding: "32px 68px",
                    borderRadius: 20,
                    fontSize: 320,
                    fontWeight: 900,
                  }}
                >
                  $100
                </div>
              )}
            </AbsoluteFill>
          )}

          {/* Overlay: gpt img + $100 box (replaces claude scene) */}
          {frame >= GPT_START && frame < GEMINI_START && (
            <AbsoluteFill style={{ pointerEvents: "none" }}>
              <div
                style={{
                  position: "absolute",
                  left: 320,
                  top: "calc(50% - 260px)",
                  transform: "translateY(-50%)",
                }}
              >
                <Img
                  src={staticFile("gpt.png")}
                  style={{
                    width: 1000,
                    height: 1000,
                  }}
                />
              </div>
              {frame >= GPT_START + BOX_DELAY + 9 && (
                <div
                  style={{
                    position: "absolute",
                    left: 820,
                    transform: "translateX(-50%)",
                    top: "calc(50% + 272px)",
                    backgroundColor: "#14532d",
                    color: "white",
                    fontFamily,
                    lineHeight: 1,
                    padding: "32px 68px",
                    borderRadius: 20,
                    fontSize: 320,
                    fontWeight: 900,
                  }}
                >
                  $100
                </div>
              )}
            </AbsoluteFill>
          )}

          {/* Overlay: gemini logo + $20 box (replaces gpt scene) */}
          {frame >= GEMINI_START && frame < SCATTER_START && (
            <AbsoluteFill style={{ pointerEvents: "none" }}>
              <div
                style={{
                  position: "absolute",
                  left: 320,
                  top: "calc(50% - 260px)",
                  transform: "translateY(-50%)",
                }}
              >
                <Img
                  src={staticFile("gemini.png")}
                  style={{
                    width: 1000,
                    height: 1000,
                  }}
                />
              </div>
              {frame >= GEMINI_START + BOX_DELAY + 15 && (
                <div
                  style={{
                    position: "absolute",
                    left: 820,
                    transform: "translateX(-50%)",
                    top: "calc(50% + 208px)",
                    backgroundColor: "#14532d",
                    color: "white",
                    fontFamily,
                    lineHeight: 1,
                    padding: "32px 68px",
                    borderRadius: 20,
                    fontSize: 320,
                    fontWeight: 900,
                  }}
                >
                  $20
                </div>
              )}
            </AbsoluteFill>
          )}

          {/* Overlay: scattered logos (grok, deepseek, kimi, elevenlans, opencode) */}
          {frame >= SCATTER_START && (
            <AbsoluteFill style={{ pointerEvents: "none" }}>
              {SPREAD_LOGOS.map((logo, i) =>
                frame >= SCATTER_START + i * (BOX_DELAY + 6) ? (
                  <Img
                    key={logo.src}
                    src={staticFile(logo.src)}
                    style={{
                      position: "absolute",
                      left: logo.left,
                      top: logo.top,
                      width: SPREAD_SIZE,
                      height: "auto",
                      borderRadius: 20,
                    }}
                  />
                ) : null,
              )}
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}

      {/* Scene 4: moneythrow.mp4 plays fully once worried.mp4 ends;
          a demo Claude API key appears out of old-TV static haze */}
      {frame >= MONEY_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          {/* Sequence makes moneythrow.mp4 play from its own 0:00 and
              run fully within this scene; OffthreadVideo extracts frames
              server-side so it renders reliably */}
          <Sequence from={MONEY_START}>
            <OffthreadVideo
              src={staticFile("moneythrow.mp4")}
              startFrom={0}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>

          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                color: "white",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 150,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textAlign: "center",
                whiteSpace: "nowrap",
                opacity: keyOpacity,
                textShadow: `0 0 ${keyGlow}px rgba(255, 255, 255, ${0.2 + 0.8 * keySettle}), 0 10px 40px rgba(0, 0, 0, 0.55)`,
                filter: `blur(${keyBlur}px) brightness(${keyBrightness}%) contrast(${keyContrast}%)`,
                transform: `translate(${keyJitterX}px, ${keyJitterY}px)`,
              }}
            >
              sk_ae805c74aa5f961b83014bef53c8e
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}
      {/* Scene 5b: nomen images scattered on black bg, appearing one by one
          with a 3D page-turn transition (perspective + rotateY + scale + opacity) */}
      {frame >= NOMEN_START && frame < LAUGH_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          {[
            { src: "nomen.png", left: "5%", top: "10%", width: "50%" },
            { src: "nomen2.png", left: "45%", top: "20%", width: "50%" },
            { src: "nomen3.png", left: "10%", top: "52%", width: "58%" },
          ].map((img, i) => {
            const appearFrame = NOMEN_START + i * 30;
            const p = interpolate(
              frame,
              [appearFrame, appearFrame + 24],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) },
            );
            return (
              <Img
                key={img.src}
                src={staticFile(img.src)}
                style={{
                  position: "absolute",
                  left: img.left,
                  top: img.top,
                  width: img.width,
                  height: "auto",
                  objectFit: "contain",
                  opacity: p,
                  transform: `perspective(1500px) rotateY(${-90 + 90 * p}deg) scale(${0.2 + 0.8 * p})`,
                  transformOrigin: "left center",
                  filter: `brightness(${0.4 + 0.6 * p}) drop-shadow(0 0 ${20 * p}px rgba(255,255,255,${0.3 * p}))`,
                }}
              />
            );
          })}
        </AbsoluteFill>
      )}
      {/* Scene 5: expensive.png full screen with the green "$90 PER MONTH"
          pill centered on top, revealed word by word like the "I PAY $0" line */}
      {frame >= EXPENSIVE_START && frame < NOMEN_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <Img
            src={staticFile("expensive.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            {/* Same green pill as the $20 / $100 boxes, words popped in one
                by one like the "I PAY $0" line - first word 400ms in */}
            {frame >= TEXT_START ? (
              <div
                style={{
                  backgroundColor: "#14532d",
                  color: "white",
                  fontFamily,
                  lineHeight: 1,
                  padding: "32px 68px",
                  borderRadius: 20,
                  fontSize: 320,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  display: "flex",
                  gap: "50px",
                }}
              >
                <span>$90</span>
                {frame >= TEXT_START + WORD_STEP ? <span>PER</span> : null}
                {frame >= TEXT_START + WORD_STEP * 2 ? <span>MONTH</span> : null}
              </div>
            ) : null}
          </AbsoluteFill>
        </AbsoluteFill>
      )}
      {/* Scene 6: laugh.mp4 with "I PAY 0" text overlay at bottom - the shot
          lasts exactly as long as zero.wav, then cuts to the closing gif */}
      {frame >= LAUGH_START && frame < RUB_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <Sequence from={LAUGH_START}>
            <OffthreadVideo
              src={staticFile("laugh.mp4")}
              startFrom={0}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>
          <Sequence from={LAUGH_START}>
            <Audio src={staticFile("zero.wav")} playbackRate={0.9} />
          </Sequence>
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              pointerEvents: "none",
              paddingBottom: 120,
            }}
          >
            <div style={TEXT_STYLE}>
              <span style={{ opacity: 1 }}>I</span>
              <span style={{ opacity: frame >= LAUGH_START + 12 ? 1 : 0 }}>PAY</span>
              <span style={{ opacity: frame >= LAUGH_START + 24 ? 1 : 0 }}>$0</span>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}
      {/* Scene 7: rubpat.gif full screen with sauce.wav, starts the frame
          after the laugh scene cuts (zero.wav ends) and runs to the end */}
      {frame >= RUB_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <Gif
            src={staticFile("rubpat.gif")}
            fit="contain"
            loopBehavior="loop"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </AbsoluteFill>
      )}
      {/* Scene 8: broke.png full screen with "GO BROKE" text overlay at bottom,
          revealed word by word like the "I PAY $0" line, starting 300ms in */}
      {frame >= BROKE_START && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <Img
            src={staticFile("broke.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <div style={TEXT_STYLE}>
              <span style={{ opacity: frame >= BROKE_START + 15 ? 1 : 0 }}>GO</span>
              <span style={{ opacity: frame >= BROKE_START + 27 ? 1 : 0 }}>BROKE</span>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}
       {/* Scene 9: "SO I FOUND" hits on the black frame, then the free-alt
           tool tiles appear instantly one by one around a ring, with a "$0"
           badge landing in the middle once the ring is complete */}
       {frame >= WORK_START && (
         <AbsoluteFill style={{ backgroundColor: "black" }}>
           {frame < SCATTER2_START && (
             <AbsoluteFill
               style={{
                 justifyContent: "center",
                 alignItems: "center",
                 pointerEvents: "none",
               }}
             >
               <div style={TEXT_STYLE}>
                 {BUTWAIT_WORDS.map((w, i) => (
                   <span
                     key={w}
                     style={{
                       opacity:
                         frame >= WORK_START + i * BUTWAIT_STEP
                           ? interpolate(
                               frame,
                               [SCATTER2_START, SCATTER2_START + 8],
                               [1, 0],
                               { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                             )
                           : 0,
                     }}
                   >
                     {w}
                   </span>
                 ))}
               </div>
             </AbsoluteFill>
           )}
           {frame >= SCATTER2_START && (
             <AbsoluteFill style={{ pointerEvents: "none" }}>
               {FREE_TOOLS.map((tool) =>
                 frame >= SCATTER2_START + tool.popIndex * LOGO_STEP ? (
                   <Img
                     key={tool.src}
                     src={staticFile(tool.src)}
                     style={{
                       position: "absolute",
                       left: tool.left,
                       top: tool.top,
                       width: TILE_WIDTH,
                       height: "auto",
                       borderRadius: 24,
                       border: "4px solid rgba(255, 255, 255, 0.14)",
                       transform: `rotate(${tool.rot}deg)`,
                       filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.65))",
                     }}
                   />
                 ) : null,
               )}
             </AbsoluteFill>
           )}
           {/* Centre badge: lands in the middle of the ring once every tool
               is on screen */}
           {frame >= BADGE_START && (
             <AbsoluteFill
               style={{
                 justifyContent: "center",
                 alignItems: "center",
                 pointerEvents: "none",
               }}
             >
               <div
                 style={{
                   backgroundColor: "#14532d",
                   color: "white",
                   fontFamily,
                   lineHeight: 1,
                   padding: "34px 78px",
                   borderRadius: 26,
                   fontSize: 380,
                   fontWeight: 900,
                 }}
               >
                 $0
               </div>
               <div
                 style={{
                   fontFamily,
                   color: "#F5F2E3",
                   fontSize: 96,
                   letterSpacing: "0.14em",
                   marginTop: 26,
                 }}
               >
                 PER MONTH
               </div>
             </AbsoluteFill>
           )}
          </AbsoluteFill>
        )}
       {/* Scene 10: per-tool showcase - tool name on top, logo underneath */}
       {TOOL_TIMELINE.map((seg) => (
         <React.Fragment key={seg.src}>
           {seg.audio ? (
             <Sequence
               layout="none"
               from={seg.start}
               durationInFrames={seg.frames}
             >
               <Audio src={staticFile(seg.audio)} />
             </Sequence>
           ) : null}
           {frame >= seg.start && frame < seg.start + seg.frames ? (
             <AbsoluteFill style={{ backgroundColor: "black" }}>
             {/* Numbered marker in the top left corner */}
             <div
               style={{
                 position: "absolute",
                 left: 120,
                 top: 120,
                 backgroundColor: "#DC2626",
                 color: "white",
                 fontFamily,
                 fontSize: 380,
                 fontWeight: 900,
                 lineHeight: 1,
                 letterSpacing: "0.02em",
                 padding: "34px 48px",
                 borderRadius: 12,
                 opacity: frame >= seg.start + TOOL_TITLE_DELAY ? 1 : 0,
                 pointerEvents: "none",
               }}
             >
               {seg.index}
             </div>
             {/* Tool name in the centre of the frame */}
             <AbsoluteFill
               style={{
                 justifyContent: "center",
                 alignItems: "center",
                 pointerEvents: "none",
               }}
             >
               <div style={TEXT_STYLE}>
                 {seg.title.split(" ").map((word, i) => (
                   <span
                     key={word}
                     style={{
                       opacity:
                         frame >= seg.start + TOOL_TITLE_DELAY + i * TOOL_WORD_STEP
                           ? 1
                           : 0,
                     }}
                   >
                     {word}
                   </span>
                 ))}
                </div>
              </AbsoluteFill>
            </AbsoluteFill>
          ) : null}
         </React.Fragment>
       ))}
       {/* Scene 11: OmniRoute hub diagram */}
       {frame >= HUB_START && (
         <AbsoluteFill style={{ backgroundColor: "black" }}>
           {/* Lines from the hub out to every tool, drawn on frame */}
           <svg
             width={3840}
             height={2160}
             style={{ position: "absolute", left: 0, top: 0 }}
           >
             {HUB_ROWS.map((row) => {
               const x1 = HUB_LINE_START_X;
               const y1 = HUB_NODE_Y;
               const x2 = HUB_COLUMN_X - 30;
               const y2 = row.y;
               const len = Math.hypot(x2 - x1, y2 - y1);
               const p = interpolate(
                 frame,
                 [HUB_START + row.delay, HUB_START + row.delay + HUB_LINE_DRAW],
                 [0, 1],
                 {
                   extrapolateLeft: "clamp",
                   extrapolateRight: "clamp",
                   easing: Easing.out(Easing.cubic),
                 },
               );
               return (
                 <line
                   key={row.src}
                   x1={x1}
                   y1={y1}
                   x2={x2}
                   y2={y2}
                   stroke="#22C55E"
                   strokeWidth={7}
                   strokeLinecap="round"
                   strokeDasharray={len}
                   strokeDashoffset={len * (1 - p)}
                 />
               );
             })}
           </svg>

           {/* "50+ AI" on the left, one character at a time */}
           <div
             style={{
               position: "absolute",
               left: 300,
               top: HUB_NODE_Y,
               transform: "translateY(-50%)",
               display: "flex",
               alignItems: "baseline",
               gap: 24,
               fontFamily,
               fontSize: 150,
               lineHeight: 1,
               letterSpacing: "0.04em",
               pointerEvents: "none",
             }}
           >
             {HUB_LEFT_CHARS.map((c, i) => (
               <span
                 key={`${c}-${i}`}
                 style={{
                   color: i >= 3 ? "#22C55E" : "#F5F2E3",
                   opacity:
                     frame >= HUB_START + HUB_LEFT_START + i * HUB_LEFT_STEP
                       ? 1
                       : 0,
                 }}
               >
                 {c}
               </span>
             ))}
           </div>

           {/* The omniroute hub in the centre of the frame */}
           <div
             style={{
               position: "absolute",
               left: 0,
               right: 0,
               top: HUB_NODE_Y,
               transform: "translateY(-50%)",
               textAlign: "center",
               fontFamily,
               fontSize: 150,
               lineHeight: 1,
               letterSpacing: "0.06em",
               textTransform: "uppercase",
               color: "#F5F2E3",
               opacity: frame >= HUB_START + HUB_HUB_DELAY ? 1 : 0,
               pointerEvents: "none",
             }}
           >
             omniroute
           </div>

           {/* The tool logos on the right, one by one */}
           {HUB_ROWS.map((row) =>
             frame >= HUB_START + row.delay + HUB_LINE_DRAW ? (
               <div
                 key={row.src}
                 style={{
                   position: "absolute",
                   left: HUB_COLUMN_X,
                   top: row.y - row.h / 2,
                   width: HUB_LOGO_W,
                   height: row.h,
                   borderRadius: 20,
                   border: "4px solid rgba(255, 255, 255, 0.16)",
                   overflow: "hidden",
                   filter: "drop-shadow(0 24px 48px rgba(0, 0, 0, 0.6))",
                 }}
               >
                 <Img
                   src={staticFile(row.src)}
                   style={{
                     width: "100%",
                     height: "100%",
                     objectFit: "cover",
                   }}
                 />
               </div>
             ) : null,
           )}
         </AbsoluteFill>
       )}
     </>
  );
};
