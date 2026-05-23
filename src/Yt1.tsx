import { AbsoluteFill, Video, staticFile, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio } from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { MoveRight, MoveUpRight, MoveDownLeft, MoveLeft, MoveUpLeft, MoveDownRight } from "lucide-react";
import React from "react";

const { fontFamily } = loadFont();

const CONTAINER_STYLE: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  backgroundColor: "black",
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily,
  color: "#F5F2E3",
  fontSize: 1000,
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  lineHeight: 1,
  display: "flex",
  gap: "100px",
};

export const Yt1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const videoDuration = 89; // start.mp4 duration (~2.95s at 30fps)
  
  // Timing segments
  const yeahStart = videoDuration;
  const yeahEnd = yeahStart + 23; 
  
  const laptopStart = yeahEnd;
  const laptopEnd = laptopStart + 24; 
  
  const thatStart = laptopEnd;
  const thatEnd = thatStart + 20; 
  
  const finalImageStart = thatEnd;
  const letmeexplainEnd = finalImageStart + 46; 
  
  const scrollStart = letmeexplainEnd;
  const scrollDuration = 102; 
  
  const postStart = scrollStart + scrollDuration;
  const thisPostJfifStart = postStart; 
  const thisPostJfifEnd = thisPostJfifStart + 90;

  const someoneBuiltStart = thisPostJfifEnd;
  const someoneBuiltEnd = someoneBuiltStart + 18; 
  const slapmacwinStart = someoneBuiltEnd;
  const slapmacwinEnd = slapmacwinStart + 30;
  const slapitStart = slapmacwinEnd;
  const slapitEnd = slapitStart + 108; // Added 18 frames (600ms) to previous 90

  // Pivot Snap Sequence Timing
  const macStart = slapitEnd;
  const arrow1Start = macStart + 20; // Increased from 10
  const accStart = arrow1Start + 20; // Increased from 10
  
  const snapStart = accStart + 58; // Added 18 frames (600ms) to previous 40
  const arrow2Start = snapStart + 20; // Increased from 10
  const detectedStart = arrow2Start + 20; // Increased from 10
  const funStart = detectedStart + 71; // Increased to match full 12.16s audio (365 frames)
  const sourceStart = funStart + 76; // Increased by another 6 frames (200ms)
  const arrowInitialDelay = Math.round(2.0 * fps); // Increased to 2s (1s original + 1s more)
  const arrowStayDuration = Math.round(1.0 * fps); // Now 1s
  const arrowMoveDuration = 10;
  const newArrowDelay = Math.round(0.5 * fps); // 500ms delay
  const gigachadExtraDelay = Math.round(0.8 * fps); // 800ms extra delay
  const gigachadStart = sourceStart + arrowInitialDelay + arrowMoveDuration + arrowStayDuration + gigachadExtraDelay;

  // New Timing
  const builtStart = funStart + 250; // Third.m4a (8.02s ~ 241 frames) + 200ms (6 frames)
  const builtDuration = 94; // Increased by 6 frames (200ms) to show rub.gif more
  const easyStart = builtStart + builtDuration;
  const easyDuration = Math.round(1.42 * fps); // Increased by 600ms (0.8s original + 0.6s more)
  const itWasNotStart = easyStart + easyDuration;
  const itWasNotDuration = 30; // 1s stay
  const noaccStart = itWasNotStart + itWasNotDuration;
  const noaccDuration = 206; // ~6.86s at 30fps
  const howtoStart = noaccStart + noaccDuration;
  const howtoDuration = 80; // ~2.16s
  const thinkStart = howtoStart + howtoDuration;
  const thinkDuration = 52; // 1.5s at 30fps
  const knockStart = thinkStart + thinkDuration;
  const knockDuration = 194; // Extended by another 18 frames (600ms)
  const outroStart = knockStart + knockDuration;
  const outroDuration = 90; // Extended to sync with Fifth.m4a (19.9s ~ 598 frames) + 200ms buffer
  const simpleStart = outroStart + outroDuration;
  const simpleDuration = 60; // 2s at 30fps
  const listStart = simpleStart + simpleDuration;
  const listDuration = 150; // 5s at 30fps

  const wemakeStart = listStart + listDuration;
  const wemakeDuration = 30; // 1s at 30fps

  const pythonStart = wemakeStart + wemakeDuration;
  const pythonDuration = 60; // 2s at 30fps

  const librariesStart = pythonStart + pythonDuration;
  const librariesDuration = 190; // 2s + 1s extra at 30fps

  const mainloopStart = librariesStart + librariesDuration;
  const mainloopDuration = 566; // 18.865s * 30fps

  const elmoStart = mainloopStart + mainloopDuration;
  const elmoDuration = 60; // 2s at 30fps

  const whystopStart = elmoStart + elmoDuration;
  const whystopDuration = 60; // 2s at 30fps

  const fewMoreSoundsStart = whystopStart + whystopDuration;
  const fewMoreSoundsDuration = 30; // 1s at 30fps

  const moresoundsStart = fewMoreSoundsStart + fewMoreSoundsDuration;
  const moresoundsDuration = 90; // 3s at 30fps (1s each for sui, yk, kiscolor)

  const centeredMoresoundsStart = moresoundsStart + moresoundsDuration;
  const centeredMoresoundsDuration = 120; // 4s at 30fps

  const susStart = centeredMoresoundsStart + centeredMoresoundsDuration;
  const susDuration = 334; // ~11.11s at 30fps

  const onemoreStart = susStart + susDuration;
  const onemoreDuration = 30; // 1s at 30fps

  const usbmemeStart = onemoreStart + onemoreDuration;
  const usbmemeDuration = 30; // 1s at 30fps

  const usbStart = usbmemeStart + usbmemeDuration;
  const usbDuration = 706; // ~23.54s at 30fps

  const uiStart = usbStart + usbDuration;
  const uiDuration = 1145; // ~38.17s at 30fps

  const resultStart = uiStart + uiDuration;
  const resultDuration = (26 - 10) * 30; // 16s at 30fps

  const githubStart = resultStart + resultDuration;
  const githubDuration = 90; // 3s at 30fps

  const uploadStart = githubStart + githubDuration;
  const uploadDuration = 210; // 7s at 30fps

  const honestlyStart = uploadStart + uploadDuration;
  const honestlyDuration = 30; // 1s at 30fps

  const feelbadStart = honestlyStart + honestlyDuration;
  const feelbadDuration = 60; // 2s at 30fps

  const thudStart = feelbadStart + feelbadDuration;
  const thudDuration = 14; // ~0.44s at 30fps

  const moanStart = thudStart + thudDuration;
  const moanDuration = 33; // ~1.1s at 30fps

  const subscribeStart = moanStart + moanDuration;
  const subscribeDuration = 60; // 2s at 30fps

  const arrowAStart = centeredMoresoundsStart + 15;

  const arrowBStart = arrowAStart + 15;
  const arrowCStart = arrowBStart + 15;
  
  // Image Sizes
  const MAC_ACC_HEIGHT = 2800;
  const DETECTED_HEIGHT = 1800;
  const ARROW_SIZE = 1200;

  // Horizontal Positions (8K: 7680x4320)
  const LEFT_X = 1800;
  const CENTER_X = 3840;
  const RIGHT_X = 5880;
  const CENTER_Y = 2160;

  // Final positions for windows/gif to have proper gap
  const WINDOWS_FINAL_X = 2180;
  const GIF_X = 7750;

  // Shift amount for initial stage
  const SHIFT_RIGHT = 220;

  // Animations
  const arrowY = interpolate(
    frame - sourceStart,
    [arrowInitialDelay, arrowInitialDelay + arrowMoveDuration],
    [CENTER_Y + 800, CENTER_Y + 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const gigachadX = interpolate(
    frame - gigachadStart,
    [0, 10],
    [8000, 6300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* 1. start.mp4 */}
      {frame < videoDuration && (
        <Video src={staticFile("start.mp4")} />
      )}

      {/* Audio: first.m4a Part 1 */}
      <Sequence from={yeahStart} durationInFrames={letmeexplainEnd - yeahStart - 18}>
        <Audio src={staticFile("First.m4a")} />
      </Sequence>

      {/* Audio: first.m4a Part 2 */}
      <Sequence from={scrollStart} durationInFrames={275 - (letmeexplainEnd - yeahStart - 18)}>
        <Audio src={staticFile("First.m4a")} startFrom={letmeexplainEnd - yeahStart - 18} />
      </Sequence>

      {/* Audio: second.m4a */}
      <Sequence from={someoneBuiltStart} durationInFrames={funStart - someoneBuiltStart}>
        <Audio src={staticFile("Second.m4a")} startFrom={15} />
      </Sequence>

      {/* Audio: third.m4a */}
      <Sequence from={funStart} durationInFrames={builtStart - funStart}>
        <Audio src={staticFile("Third.m4a")} />
      </Sequence>

      {/* Audio: fourth.m4a */}
      <Sequence from={builtStart} durationInFrames={noaccStart - builtStart}>
        <Audio src={staticFile("Fourth.m4a")} />
      </Sequence>

      {/* Audio: Fifth.m4a - Continuous playback through the outro */}
      <Sequence from={noaccStart} durationInFrames={outroStart + outroDuration - noaccStart}>
        <Audio src={staticFile("Fifth.m4a")} />
      </Sequence>

      {/* 2. YEAH. */}
      {frame >= yeahStart && frame < yeahEnd && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>YEAH.</div>
        </AbsoluteFill>
      )}

      {/* 3. MY WINDOWS DOES (Word by word) */}
      {frame >= laptopStart && frame < laptopEnd && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>
            <span style={{ opacity: 1 }}>MY</span>
            <span style={{ opacity: frame >= laptopStart + 8 ? 1 : 0 }}>WINDOWS</span>
            <span style={{ opacity: frame >= laptopStart + 16 ? 1 : 0 }}>DOES</span>
          </div>
        </AbsoluteFill>
      )}

      {/* 4. THAT. */}
      {frame >= thatStart && frame < thatEnd && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>THAT.</div>
        </AbsoluteFill>
      )}

      {/* 5. letmeexplain.jpg */}
      {frame >= finalImageStart && frame < scrollStart && (
        <AbsoluteFill>
          <img
            src={staticFile("letmeexplain.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 6. scroll.mp4 */}
      <Sequence from={scrollStart} durationInFrames={scrollDuration}>
        <Video 
          src={staticFile("scroll.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* 7. post.png (Background) */}
      {frame >= postStart && frame < someoneBuiltStart && (
        <AbsoluteFill style={{ ...CONTAINER_STYLE, backgroundColor: "black" }}>
          <img
            src={staticFile("post.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: frame >= thisPostJfifStart + 54 ? "cover" : "contain",
              objectPosition: frame >= thisPostJfifStart + 54 ? "50% 100%" : "50% 50%",
            }}
          />
        </AbsoluteFill>
      )}
      {/* 7. thispost.jfif (Overlay) */}
      {frame >= thisPostJfifStart && frame < thisPostJfifStart + 54 && (
        <AbsoluteFill style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
          <img
            src={staticFile("thispost.jfif")}
            style={{
              width: "105%",
              height: "90%",
              objectFit: "fill",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 8. SOMEONE BUILT (Word by word) */}
      {frame >= someoneBuiltStart && frame < someoneBuiltEnd && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>
            <span style={{ opacity: 1 }}>SOMEONE</span>
            <span style={{ opacity: frame >= someoneBuiltStart + 9 ? 1 : 0 }}>BUILT</span>
          </div>
        </AbsoluteFill>
      )}

      {/* 9. slapmacwin.png */}
      {frame >= slapmacwinStart && frame < slapmacwinEnd && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <img
            src={staticFile("slapmacwin.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 10. slapit.png */}
      {frame >= slapitStart && frame < slapitEnd && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <img
            src={staticFile("slapit.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 11. Pivot Snap Sequence */}
      {frame >= macStart && frame < funStart && (
        <AbsoluteFill>
          {/* MAC: Visible only until the snap */}
          {frame < snapStart && (
            <div style={{
              position: "absolute",
              left: LEFT_X + SHIFT_RIGHT,
              top: CENTER_Y,
              transform: "translate(-50%, -50%)",
            }}>
              <img src={staticFile("mac.png")} style={{ height: `${MAC_ACC_HEIGHT}px`, width: "auto" }} />
            </div>
          )}

          {/* ARROW 1: Visible only until the snap */}
          {frame >= arrow1Start && frame < snapStart && (
            <div style={{
              position: "absolute",
              left: CENTER_X,
              top: CENTER_Y,
              transform: "translate(-50%, -50%)",
              color: "#F5F2E3",
            }}>
              <MoveRight size={ARROW_SIZE} strokeWidth={3} />
            </div>
          )}

          {/* ACCELEROMETER: Starts on right, snaps to left */}
          {frame >= accStart && (
            <div style={{
              position: "absolute",
              left: frame < snapStart ? RIGHT_X + SHIFT_RIGHT : LEFT_X,
              top: CENTER_Y,
              transform: "translate(-50%, -50%)",
            }}>
              <img src={staticFile("accelerometer.png")} style={{ height: `${MAC_ACC_HEIGHT}px`, width: "auto" }} />
            </div>
          )}

          {/* ARROW 2: Appears in center after the snap */}
          {frame >= arrow2Start && (
            <div style={{
              position: "absolute",
              left: CENTER_X,
              top: CENTER_Y,
              transform: "translate(-50%, -50%)",
              color: "#F5F2E3",
            }}>
              <MoveRight size={ARROW_SIZE} strokeWidth={3} />
            </div>
          )}

          {/* DETECTED: Appears on right after arrow 2 */}
          {frame >= detectedStart && (
            <div style={{
              position: "absolute",
              left: RIGHT_X,
              top: CENTER_Y,
              transform: "translate(-50%, -50%)",
            }}>
              <img src={staticFile("detected.png")} style={{ height: `${DETECTED_HEIGHT}px`, width: "auto" }} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* 12. fun.png */}
      {frame >= funStart && frame < sourceStart && (
        <AbsoluteFill>
          <img
            src={staticFile("fun.png")}
            style={{
              width: "112.6%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 13. source.png & gigachad.png sequence */}
      {frame >= sourceStart && frame < builtStart && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          {/* source.png: Centered, below top */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "54%",
            transform: "translate(-50%, -50%)",
          }}>
            <img 
              src={staticFile("source.png")} 
              style={{ height: "4000px", width: "auto" }} 
            />
          </div>

          {/* Arrow: Center left of the image, animated upwards */}
          <div style={{
            position: "absolute",
            left: "12%",
            top: arrowY,
            rotate: "-20deg",
            transform: "translate(-50%, -50%)",
            color: "#F5F2E3",
            overflow: "visible",
          }}>
            <MoveUpRight size={1000} strokeWidth={3} />
          </div>

          {/* New Arrow: Appears when main arrow finishes moving */}
          {frame >= sourceStart + arrowInitialDelay + arrowMoveDuration + newArrowDelay && (
            <div style={{
              position: "absolute",
              left: "48%",
              top: "41%",
              transform: "translate(-50%, -50%)",
              color: "#F5F2E3",
            }}>
              <MoveDownLeft size={1000} strokeWidth={3} />
            </div>
          )}

          {/* gigachad.png: Slide in from right */}
          {frame >= gigachadStart && (
            <div style={{
              position: "absolute",
              left: gigachadX,
              top: "33.1%",
              transform: "translate(-50%, -50%)",
            }}>
              <img 
                src={staticFile("gigachad.png")} 
                style={{ height: "5800px", width: "auto" }} 
              />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* 14. built.mp4 and Overlays */}
      <Sequence from={builtStart} durationInFrames={builtDuration}>
        <Video 
          src={staticFile("built.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* 15. windows.png Overlay & rub.gif */}
        <Sequence from={14}> {/* 600ms after video starts (200ms earlier than before) */}
          <FinalOverlay 
            CENTER_X={CENTER_X} 
            CENTER_Y={CENTER_Y} 
            WINDOWS_FINAL_X={WINDOWS_FINAL_X} 
            GIF_X={GIF_X} 
          />
        </Sequence>
      </Sequence>

      {/* 16. easy.gif full screen */}
      {frame >= easyStart && frame < itWasNotStart && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("easy.gif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 17. IT WAS NOT (Word by word) */}
      {frame >= itWasNotStart && frame < howtoStart && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={{ ...TEXT_STYLE, fontSize: 1200 }}>
            <span style={{ opacity: 1 }}>IT</span>
            <span style={{ opacity: frame >= itWasNotStart + 6 ? 1 : 0 }}>WAS</span>
            <span style={{ opacity: frame >= itWasNotStart + 12 ? 1 : 0 }}>NOT</span>
          </div>
        </AbsoluteFill>
      )}

      {/* 18. noacc.mp4 */}
      <Sequence from={noaccStart} durationInFrames={noaccDuration}>
        <Video 
          src={staticFile("noacc.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* 19. howto.mp4 */}
      <Sequence from={howtoStart} durationInFrames={howtoDuration}>
        <Video 
          src={staticFile("howto.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* 20. think.gif */}
      <Sequence from={thinkStart} durationInFrames={thinkDuration}>
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("think.gif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 21. knock.mp4 */}
      <Sequence from={knockStart} durationInFrames={knockDuration}>
        <Video 
          src={staticFile("knock.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* 21.1 laptop.png Overlay (Appears 3s after video starts) */}
        <Sequence from={75}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <img 
              src={staticFile("laptop.png")} 
              style={{ height: "4400px", width: "auto" }} 
            />
          </AbsoluteFill>
        </Sequence>
      </Sequence>

      {/* 22. Outro Overlay */}
      <Sequence from={outroStart} durationInFrames={outroDuration}>
        <OutroOverlay CENTER_X={CENTER_X} CENTER_Y={CENTER_Y} />
      </Sequence>

      {/* 23. simple.gif */}
      <Sequence from={simpleStart} durationInFrames={simpleDuration}>
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("simple.gif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 24. Steps List (Word by word, Line by line) */}
      <Sequence from={listStart} durationInFrames={listDuration}>
        <AbsoluteFill style={{ ...CONTAINER_STYLE, alignItems: "flex-start", justifyContent: "center", paddingLeft: "600px" }}>
          <div style={{ ...TEXT_STYLE, textAlign: "left", flexDirection: "column", alignItems: "flex-start", fontSize: 800, gap: "200px" }}>
            {/* Line 1 */}
            <div style={{ display: "flex", gap: "60px" }}>
              <span style={{ opacity: frame >= listStart + 0 ? 1 : 0 }}>1.</span>
              <span style={{ opacity: frame >= listStart + 6 ? 1 : 0 }}>LISTEN</span>
              <span style={{ opacity: frame >= listStart + 12 ? 1 : 0 }}>TO</span>
              <span style={{ opacity: frame >= listStart + 18 ? 1 : 0 }}>MIC</span>
            </div>
            {/* Line 2 */}
            <div style={{ display: "flex", gap: "60px" }}>
              <span style={{ opacity: frame >= listStart + 30 ? 1 : 0 }}>2.</span>
              <span style={{ opacity: frame >= listStart + 36 ? 1 : 0 }}>DETECT</span>
              <span style={{ opacity: frame >= listStart + 42 ? 1 : 0 }}>SPIKE</span>
              <span style={{ opacity: frame >= listStart + 48 ? 1 : 0 }}>IN</span>
              <span style={{ opacity: frame >= listStart + 54 ? 1 : 0 }}>VOLUME</span>
            </div>
            {/* Line 3 */}
            <div style={{ display: "flex", gap: "60px" }}>
              <span style={{ opacity: frame >= listStart + 66 ? 1 : 0 }}>3.</span>
              <span style={{ opacity: frame >= listStart + 72 ? 1 : 0 }}>PLAY</span>
              <span style={{ opacity: frame >= listStart + 78 ? 1 : 0 }}>THE</span>
              <span style={{ opacity: frame >= listStart + 84 ? 1 : 0 }}>MOAN</span>
              <span style={{ opacity: frame >= listStart + 90 ? 1 : 0 }}>SOUND</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 25. wemake.jpg full screen */}
      {frame >= wemakeStart && frame < wemakeStart + wemakeDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("wecan.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 26. python.png on black screen */}
      {frame >= pythonStart && frame < pythonStart + pythonDuration && (
        <AbsoluteFill style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
          <img
            src={staticFile("python.png")}
            style={{
              height: "2800px",
              width: "auto",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 27. libraries.png full screen */}
      {frame >= librariesStart && frame < librariesStart + librariesDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("libraries.png")}
            style={{
              width: "118%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {frame >= librariesStart + 18 && (
            <div style={{
              position: "absolute",
              left: (() => {
                if (frame >= librariesStart + 118) return "28%";
                if (frame >= librariesStart + 98) return "33%";
                if (frame >= librariesStart + 78) return "28%";
                if (frame >= librariesStart + 58) return "50%";
                if (frame >= librariesStart + 38) return "28%";
                return "32%";
              })(),
              top: (() => {
                if (frame >= librariesStart + 118) return "58%";
                if (frame >= librariesStart + 98) return "50%";
                if (frame >= librariesStart + 78) return "42%";
                if (frame >= librariesStart + 58) return "34%";
                if (frame >= librariesStart + 38) return "23%";
                return "15%";
              })(),
              display: "flex",
              alignItems: "flex-start",
              gap: "40px",
              color: "#F5F2E3",
            }}>
              <MoveDownLeft size={600} strokeWidth={3} />
              <div style={{ 
                ...TEXT_STYLE, 
                fontSize: 400, 
                textAlign: "left",
                paddingTop: "60px" 
              }}>
                {(() => {
                  if (frame >= librariesStart + 118) return "builds the UI";
                  if (frame >= librariesStart + 98) return "detects USB connections";
                  if (frame >= librariesStart + 78) return "controls audio volume";
                  if (frame >= librariesStart + 58) return "plays the sound";
                  if (frame >= librariesStart + 38) return "CALCULATES AUDIO LOUDNESS";
                  return "LISTENS TO YOUR MIC";
                })()}
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}
      {/* 28. mainloop.mp4 */}
      <Sequence from={mainloopStart} durationInFrames={mainloopDuration}>
        <Video 
          src={staticFile("mainloop.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>
      {/* 29. elmo.gif */}
      <Sequence from={elmoStart} durationInFrames={elmoDuration}>
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("elmo.gif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>
      {/* 30. whystop.jpg */}
      <Sequence from={whystopStart} durationInFrames={whystopDuration}>
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("whystop.jpg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>
      {/* 31. FEW MORE SOUNDS. (Word by word) */}
      {frame >= fewMoreSoundsStart && frame < fewMoreSoundsStart + fewMoreSoundsDuration && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>
            <span style={{ opacity: 1 }}>FEW</span>
            <span style={{ opacity: frame >= fewMoreSoundsStart + 6 ? 1 : 0 }}>MORE</span>
            <span style={{ opacity: frame >= fewMoreSoundsStart + 12 ? 1 : 0 }}>SOUNDS.</span>
          </div>
        </AbsoluteFill>
      )}
      {/* 32. moresounds.png + sui.webp + Arrow */}
      {frame >= moresoundsStart && frame < moresoundsStart + moresoundsDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          {/* moresounds.png on the left */}
          <img
            src={staticFile("moresounds.png")}
            style={{
              position: "absolute",
              left: "20%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "100%",
              width: "auto",
              objectFit: "contain",
            }}
          />
          
          {/* Arrow in the center pointing left */}
          <div style={{
            position: "absolute",
            left: "48%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "#F5F2E3",
          }}>
            <MoveLeft size={1000} strokeWidth={3} />
          </div>

          {/* sui.webp, yk.jpg, or kiscolor.webp on the right */}
          <img
            src={staticFile(
              frame - moresoundsStart < 30 
                ? "sui.webp" 
                : frame - moresoundsStart < 60 
                  ? "yk.jpg" 
                  : "kiscolor.webp"
            )}
            style={{
              position: "absolute",
              left: "75%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "80%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}
      {/* 33. moresounds.png Centered + 3 Arrows */}
      {frame >= centeredMoresoundsStart && frame < centeredMoresoundsStart + centeredMoresoundsDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("moresounds.png")}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "130%",
              width: "auto",
              objectFit: "contain",
            }}
          />

          {/* Arrow 1: MoveDownLeft (from Top-Right) */}
          {frame >= arrowAStart && (
            <div style={{
              position: "absolute",
              left: "52%",
              top: "23%",
              transform: "translate(-50%, -50%)",
              color: "#F5F2E3",
            }}>
              <MoveDownLeft size={800} strokeWidth={3} />
            </div>
          )}

          {/* Arrow 2: MoveUpLeft (from Bottom-Right) */}
          {frame >= arrowBStart && (
            <div style={{
              position: "absolute",
              left: "54%",
              top: "70%",
              transform: "translate(-50%, -50%)",
              color: "#F5F2E3",
            }}>
              <MoveLeft size={800} strokeWidth={3} />
            </div>
          )}

          {/* Arrow 3: MoveDownRight (from Top-Left) */}
          {frame >= arrowCStart && (
            <div style={{
              position: "absolute",
              left: "28%",
              top: "32%",
              transform: "translate(-50%, -50%)",
              color: "#F5F2E3",
            }}>
              <MoveDownRight size={800} strokeWidth={3} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* 34. sus.gif */}
      {frame >= susStart && frame < susStart + susDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("sus.gif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 35. onemore.jfif */}
      {frame >= onemoreStart && frame < onemoreStart + onemoreDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("onemore.jfif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 35.5 usbmeme.png */}
      {frame >= usbmemeStart && frame < usbmemeStart + usbmemeDuration && (
        <AbsoluteFill style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
          <img
            src={staticFile("usbmeme.png")}
            style={{
              height: "100%",
              width: "auto",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 36. usb.mp4 */}
      <Sequence from={usbStart} durationInFrames={usbDuration}>
        <Video 
          src={staticFile("usb.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* 37. ui.mp4 */}
      <Sequence from={uiStart} durationInFrames={uiDuration}>
        <Video 
          src={staticFile("ui.mp4")} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>
      
      {/* 38. result.mp4 */}
      <Sequence from={resultStart} durationInFrames={resultDuration}>
        <Video 
          src={staticFile("result.mp4")} 
          startFrom={10 * 30}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>
      
      {/* 39. github.png */}
      <Sequence from={githubStart} durationInFrames={githubDuration}>
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("github.png")}
            style={{
              width: "108%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {/* githubicon.png overlay after 1 sec */}
          <Sequence from={30}>
            <AbsoluteFill style={{ ...CONTAINER_STYLE, backgroundColor: "transparent", flexDirection: "column", gap: "150px" }}>
              <img 
                src={staticFile("githubicon.png")} 
                style={{ height: "1200px", width: "auto", borderRadius: "20%" }} 
              />
              <div style={{ ...TEXT_STYLE, color: "black", fontSize: 700 }}>
                LINK IN DESCRIPTION
              </div>
            </AbsoluteFill>
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* 39. upload.mp4 and moresounds.png */}
      <Sequence from={uploadStart} durationInFrames={uploadDuration}>
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <Video 
            src={staticFile("upload.mp4")} 
            style={{
              position: "absolute",
              left: "25%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "90%",
              width: "auto",
            }}
          />
          <img
            src={staticFile("moresounds.png")}
            style={{
              position: "absolute",
              left: "75%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "90%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 40. HONESTLY? */}
      {frame >= honestlyStart && frame < honestlyStart + honestlyDuration && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>HONESTLY?</div>
        </AbsoluteFill>
      )}

      {/* 41. feelbad.gif */}
      {frame >= feelbadStart && frame < feelbadStart + feelbadDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
          <img
            src={staticFile("feelbad.gif")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* 42. thud.mp3 & moan1.mp3 on Black Screen */}
      {frame >= thudStart && frame < moanStart + moanDuration && (
        <AbsoluteFill style={{ backgroundColor: "black" }} />
      )}
      <Sequence from={thudStart} durationInFrames={thudDuration}>
        <Audio src={staticFile("thud.mp3")} volume={1} />
      </Sequence>
      <Sequence from={moanStart} durationInFrames={moanDuration}>
        <Audio src={staticFile("moan1.mp3")} volume={0.4} />
      </Sequence>

      {/* 43. SUBSCRIBE */}
      {frame >= subscribeStart && frame < subscribeStart + subscribeDuration && (
        <AbsoluteFill style={CONTAINER_STYLE}>
          <div style={TEXT_STYLE}>SUBSCRIBE</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const OutroOverlay: React.FC<{
  CENTER_X: number;
  CENTER_Y: number;
}> = ({ CENTER_X, CENTER_Y }) => {
  const frame = useCurrentFrame();
  const micStart = 15; // 500ms delay
  const WINDOWS_X = CENTER_X - 1650;
  const MIC_X = CENTER_X + 1650;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <div style={{
        position: "absolute",
        left: WINDOWS_X,
        top: CENTER_Y,
        transform: "translate(-50%, -50%)",
      }}>
        <img src={staticFile("windows.png")} style={{ height: "2800px", width: "auto" }} />
      </div>

      {frame >= micStart && (
        <div style={{
          position: "absolute",
          left: MIC_X,
          top: CENTER_Y,
          transform: "translate(-50%, -50%)",
        }}>
          <span style={{ fontSize: "2500px", lineHeight: 1 }}>🎤</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const FinalOverlay: React.FC<{
  CENTER_X: number;
  CENTER_Y: number;
  WINDOWS_FINAL_X: number;
  GIF_X: number;
}> = ({ CENTER_X, CENTER_Y, WINDOWS_FINAL_X, GIF_X }) => {
  const frame = useCurrentFrame();
  const rubStart = 26; // Reduced for earlier appearance

  const windowsX = interpolate(
    frame - rubStart,
    [0, 10],
    [CENTER_X, WINDOWS_FINAL_X],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute",
        left: windowsX,
        top: CENTER_Y,
        transform: "translate(-50%, -50%)",
      }}>
        <img src={staticFile("windows.png")} style={{ height: "2800px", width: "auto" }} />
      </div>

      {frame >= rubStart && (
        <div style={{
          position: "absolute",
          left: GIF_X,
          top: CENTER_Y,
          transform: "translate(-50%, -50%)",
          clipPath: "inset(0 50% 0 0)",
        }}>
          <img 
            src={staticFile("rub.gif")} 
            style={{ height: "3800px", width: "auto" }} 
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
