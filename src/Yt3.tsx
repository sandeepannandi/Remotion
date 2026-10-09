import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
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

const VIDEO_START = 30; // mathvideo.mp4 starts (1s)
const HAMMER_START = VIDEO_START + 24; // hammer appears ~0.8s after the video (200ms earlier)
const IMPACT = HAMMER_START + 51; // hammer reaches center -> glass smash (swing ~1.7s)
// Scene 3 overlays: each box appears 9 frames after its image, and the next
// scene starts 500ms (15 frames at 30fps) after that box appears
const CURSOR_START = IMPACT + 30 + 3; // cursor appears 300ms into scene 3
const BOX_DELAY = 9; // box appears 9 frames after its image
const SCENE_DELAY = 15; // 500ms after the box -> next scene
const BOX20_START = CURSOR_START + BOX_DELAY; // $20 box
const CLAUDE_START = BOX20_START + SCENE_DELAY; // claude scene: 500ms after $20 box
const GPT_START = CLAUDE_START + BOX_DELAY + SCENE_DELAY; // gpt scene: 500ms after claude's $100 box
const GEMINI_START = GPT_START + BOX_DELAY + SCENE_DELAY; // gemini scene: 500ms after gpt's $100 box
const SCATTER_START = GEMINI_START + BOX_DELAY + SCENE_DELAY; // scattered logos: 500ms after gemini's $20 box

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

  return (
    <>
      <Audio src={staticFile("recently.wav")} playbackRate={0.9} />
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

      {/* Scene 3: worried.mp4 after first scene ends */}
      {frame >= IMPACT + 30 && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
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

          {/* Overlay: claude.webp + $100 box (replaces cursor scene) */}
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
              {frame >= CLAUDE_START + BOX_DELAY && (
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
              {frame >= GPT_START + BOX_DELAY && (
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
              {frame >= GEMINI_START + BOX_DELAY && (
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
                frame >= SCATTER_START + i * BOX_DELAY ? (
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
    </>
  );
};
