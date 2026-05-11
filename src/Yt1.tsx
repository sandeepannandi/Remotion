import { AbsoluteFill, Video, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { MoveRight } from "lucide-react";
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
  const laptopEnd = laptopStart + 18; 
  
  const thatStart = laptopEnd;
  const thatEnd = thatStart + 20; 
  
  const finalImageStart = thatEnd;
  const letmeexplainEnd = finalImageStart + 34; 
  const postStart = letmeexplainEnd;
  const thisPostJfifStart = postStart + 50; 
  const thisPostJfifEnd = thisPostJfifStart + 40;

  const someoneBuiltStart = thisPostJfifEnd;
  const someoneBuiltEnd = someoneBuiltStart + 18; 
  const slapmacwinStart = someoneBuiltEnd;
  const slapmacwinEnd = slapmacwinStart + 30;
  const slapitStart = slapmacwinEnd;
  const slapitEnd = slapitStart + 30;

  // Pivot Snap Sequence Timing
  const macStart = slapitEnd;
  const arrow1Start = macStart + 10;
  const accStart = arrow1Start + 10;
  
  const snapStart = accStart + 20; // When mac and arrow1 vanish, acc moves left
  const arrow2Start = snapStart + 10;
  const detectedStart = arrow2Start + 10;

  // Image Sizes
  const MAC_ACC_HEIGHT = 2800;
  const DETECTED_HEIGHT = 1800;
  const ARROW_SIZE = 1200;

  // Horizontal Positions (8K: 7680x4320)
  const LEFT_X = 1800;
  const CENTER_X = 3840;
  const RIGHT_X = 5880;
  const CENTER_Y = 2160;

  // Shift amount for initial stage
  const SHIFT_RIGHT = 220;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* 1. start.mp4 */}
      {frame < videoDuration && (
        <Video src={staticFile("start.mp4")} />
      )}

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
            <span style={{ opacity: frame >= laptopStart + 6 ? 1 : 0 }}>WINDOWS</span>
            <span style={{ opacity: frame >= laptopStart + 12 ? 1 : 0 }}>DOES</span>
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
      {frame >= finalImageStart && frame < letmeexplainEnd && (
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

      {/* 6. post.png (Background) */}
      {frame >= postStart && frame < thisPostJfifEnd && (
        <AbsoluteFill style={{ ...CONTAINER_STYLE, backgroundColor: "black" }}>
          <img
            src={staticFile("post.png")}
            style={{
              height: "100%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}
      {/* 7. thispost.jfif (Overlay) */}
      {frame >= thisPostJfifStart && frame < thisPostJfifEnd && (
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
      {frame >= macStart && (
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
    </AbsoluteFill>
  );
};
