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
const GPT_START = CLAUDE_START + BOX_DELAY + SCENE_DELAY + 3; // gpt: now 1.0s after claude's $100 box
const GEMINI_START = GPT_START + BOX_DELAY + SCENE_DELAY + 4; // gemini: now 1.3s after gpt's $100 box
const SCATTER_START = GEMINI_START + BOX_DELAY + SCENE_DELAY + 3; // scattered logos: 500ms after gemini's $20 box (+200ms gap at start)
// Scene 4: worried.mp4 plays to its very end, then moneythrow.mp4 plays fully
const WORRIED_START = IMPACT + 30; // worried.mp4 starts (frame 135)
const WORRIED_FRAMES = 338; // worried.mp4 = 11.262s @ 30fps
// moneythrow.mp4 = 6.005s @ 30fps = 181 frames -> composition ends at 654
const MONEY_START = WORRIED_START + WORRIED_FRAMES; // cut to moneythrow right as worried ends (frame 473)
// Audio: recently.wav (4.16s at 0.9x speed) plays first, then cursor.wav
// (11.92s) starts exactly when it ends and plays fully (~frame 497)
const CURSOR_AUDIO_START = Math.ceil((4.16 / 0.9) * 30); // = frame 139

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
      {/* cursor.wav starts the moment recently.wav ends; plays in full */}
      <Sequence layout="none" from={CURSOR_AUDIO_START}>
        <Audio src={staticFile("cursor.wav")} />
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
                  $100
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
    </>
  );
};
