import { AbsoluteFill, Img, staticFile, useCurrentFrame, AnimatedImage, interpolate, Video, Sequence, Audio } from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { MoveUpLeft } from "lucide-react";
import React from "react";

const { fontFamily } = loadFont();
const { fontFamily: monoFont } = loadJetBrainsMono();

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
      {/* Play fifa1.wav audio from the start of the video */}
      <Audio src={staticFile("fifa1.wav")} />

      {/* Scene 1: ronaldo with cat gif (extended 500ms to cover gap) */}
      {frame < 116 && (
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

      {/* Scene 2: image.png at frame 116 (extended to cover gap before dr.jpeg) */}
      {frame >= 116 && frame < 187 && (
        <Img
          src={staticFile("image.png")}
          style={{
            width: "95%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}

      {/* Scene 3: dr.jpeg extended 1s */}
      {frame >= 187 && frame < 277 && (
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

      {/* Scene 4: Since 1974. word by word (1s later) */}
      {frame >= 262 && frame < 342 && (
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
            <span style={{ opacity: frame >= 274 ? 1 : 0 }}>1974.</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 5: Sad images scattered one by one at 400ms intervals */}
      {frame >= 313 && frame < 465 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          {frame >= 313 && (
            <Img
              src={staticFile("sad1.png")}
              style={{
                position: "absolute",
                width: "40%",
                left: "10%",
                top: "12%",
                transform: "rotate(-10deg)",
              }}
            />
          )}
          {frame >= 325 && (
            <Img
              src={staticFile("sad2.png")}
              style={{
                position: "absolute",
                width: "35%",
                right: "8%",
                top: "5%",
                transform: "rotate(6deg)",
              }}
            />
          )}
          {frame >= 337 && (
            <Img
              src={staticFile("sad3.png")}
              style={{
                position: "absolute",
                width: "40%",
                left: "10%",
                bottom: "15%",
                transform: "rotate(-14deg)",
              }}
            />
          )}
          {frame >= 349 && (
            <Img
              src={staticFile("sad4.png")}
              style={{
                position: "absolute",
                width: "50%",
                right: "5%",
                bottom: "35%",
                transform: "rotate(15deg)",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 6: crashout.mp4 playing from 1.5s, delayed by 500ms */}
      <Sequence from={408}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("crashout.mp4")}
            startFrom={48}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {frame >= 444 && (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimatedImage
                src={staticFile("cry.gif")}
                width={800}
                height={800}
                fit="contain"
              />
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: idea.png centered on black screen */}
      {frame >= 519 && frame < 588 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("idea.png")}
            style={{
              width: "85%",
              height: "85%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 8: cup.webp on left, then predict.png on right after 500ms */}
      {frame >= 582 && frame < 708 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("cup.webp")}
            style={{
              position: "absolute",
              left: "20%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 621 && (
            <Img
              src={staticFile("predict.png")}
              style={{
                position: "absolute",
                left: "68%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 9: ide.mp4 after 1.5 seconds */}
      <Sequence from={702} durationInFrames={110}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Video
            src={staticFile("ide.mp4")}
            endAt={110}
            style={{
              width: "100%",
              height: "95%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Play fifa2.wav after ide.mp4 ends */}
      <Sequence from={812}>
        <Audio src={staticFile("fifa2.wav")} />
      </Sequence>

      {/* Scene 10: thinkmemoji.png on left, then excalidraw.png on right after 700ms */}
      {frame >= 812 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("thinkmemoji.png")}
            style={{
              position: "absolute",
              left: "25%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "36%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 833 && (
            <Img
              src={staticFile("excalidraw.png")}
              style={{
                position: "absolute",
                left: "75%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "32%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 11: data.mp4 playing after excalidraw appears */}
      <Sequence from={877}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("data.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 12: full.mp4 playing at 0.8 speed (needs 350 frames = 280/0.8) */}
      <Sequence from={1060}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("full.mp4")}
            playbackRate={0.8}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 13: itseasy.png showing after full.mp4 ends (shifted +70 for 0.8 speed) */}
      {frame >= 1400 && frame < 1428 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("itseasy.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Play fifa3.wav after fifa2.wav ends */}
      <Sequence from={1428}>
        <Audio src={staticFile("fifa31.m4a")} />
      </Sequence>

      {/* Scene 14: scraping.mp4 playing after itseasy.png */}
      <Sequence from={1428}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("scraping.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 15: kagmeme.png showing instantly after scraping.mp4 ends */}
      {frame >= 1617 && frame < 1668 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("kagmeme.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 16: dataset.mp4 playing after kagmeme */}
      <Sequence from={1668}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("dataset.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 17: elo1.png on left, then elo2.webp on right after 800ms */}
      {frame >= 1958 && frame < 2048 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("elo1.png")}
            style={{
              position: "absolute",
              left: "34%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "56%",
              height: "auto",
              objectFit: "contain",
              opacity: interpolate(frame, [1958, 1968], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 1982 && (
            <Img
              src={staticFile("elo2.webp")}
              style={{
                position: "absolute",
                left: "80%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "28%",
                height: "auto",
                objectFit: "contain",
                opacity: interpolate(frame, [1982, 1992], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 18: poster.webp on left, then cup.webp on right after 800ms */}
      {frame >= 2048 && frame < 2142 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("poster.webp")}
            style={{
              position: "absolute",
              left: "34%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "36%",
              height: "auto",
              objectFit: "contain",
              opacity: interpolate(frame, [2048, 2058], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 2072 && (
            <Img
              src={staticFile("cup.webp")}
              style={{
                position: "absolute",
                left: "80%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "38%",
                height: "auto",
                objectFit: "contain",
                opacity: interpolate(frame, [2072, 2082], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 19: ownelo.jpg on white bg with OWN ELO SYSTEM text word by word (200ms earlier) */}
      {frame >= 2128 && frame < 2189 && (
        <AbsoluteFill
          style={{
            backgroundColor: "white",
          }}
        >
          <Img
            src={staticFile("ownelo.jpg")}
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              width: "56%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "14%",
              left: "14%",
              fontFamily,
              color: "black",
              fontSize: 350,
              textAlign: "left",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "50px" }}>
              <span style={{ opacity: 1 }}>OWN</span>
              <span style={{ opacity: frame >= 2132 ? 1 : 0 }}>ELO</span>
              <span style={{ opacity: frame >= 2136 ? 1 : 0 }}>SYSTEM</span>

            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Play fifa4.m4a when Data from 1872 scene starts */}
      <Sequence from={2189}>
        <Audio src={staticFile("fifa4.m4a")} />
      </Sequence>

      {/* Play fifa5.m4a after fifa4.m4a ends */}
      <Sequence from={2940}>
        <Audio src={staticFile("fifa5.m4a")} />
      </Sequence>

      {/* Scene 20: db.png centered below on black bg, text fades in 400ms later */}
      {frame >= 2189 && frame < 2303 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("db.png")}
            style={{
              position: "absolute",
              left: "50%",
              top: "60%",
              transform: "translate(-50%, -50%)",
              width: "46%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily,
              color: "white",
              fontSize: 250,
              textAlign: "center",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              opacity: interpolate(frame, [2215, 2225], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            Data from 1872 to 2026
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 21: table.png on left, stats on right in JetBrains Mono */}
      {frame >= 2303 && frame < 2577 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("table.png")}
            style={{
              position: "absolute",
              left: "50%",
              top: "68%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "20%",
              transform: "translate(-50%, -50%)",
              fontFamily: monoFont,
              fontWeight: "bold",
              color: "white",
              fontSize: 115,
              lineHeight: 1.8,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            <div>win rate, last 5 games form, goals scored</div>
            <div>ELO difference, pre-match expectation, 
            <div style={{paddingLeft: "100px"}}>goals conceded</div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 22: showing.mp4 playing after Scene 21 (same pattern as crashout.mp4) */}
      <Sequence from={2577} durationInFrames={244}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("showing.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 23: nleague, arabl, goldcup side by side fading in at 500ms intervals */}
      <Sequence from={2821} durationInFrames={140}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("nleague.png")}
            style={{
              position: "absolute",
              left: "16.67%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "auto",
              objectFit: "contain",
              opacity: interpolate(frame, [2822, 2827], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          <Img
            src={staticFile("arabl.png")}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "auto",
              objectFit: "contain",
              opacity: interpolate(frame, [2846, 2851], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          <Img
            src={staticFile("goldcup.png")}
            style={{
              position: "absolute",
              left: "83.33%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "22%",
              height: "auto",
              objectFit: "contain",
              opacity: interpolate(frame, [2870, 2875], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 2911 && frame < 2961 && (
            <Img
              src={staticFile("downvote.png")}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "auto",
                height: "80%",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 24: asiancup centered, play.png below, upvote flashing over them */}
      <Sequence from={2961} durationInFrames={204}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("asiancup.png")}
            style={{
              position: "absolute",
              left: "50%",
              top: "46%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Img
            src={staticFile("play.png")}
            style={{
              position: "absolute",
              left: "50%",
              top: "76%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 3043 && frame < 3178 && (
            <Img
              src={staticFile("upvote.png")}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "auto",
                height: "60%",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      </Sequence>

      {/* Scene 25: runml.png centered on black screen for 2 seconds */}
      {frame >= 3153 && frame < 3260 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("runml.png")}
            style={{
              width: "45%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 26: models.mp4 playing after runml.png (same pattern as crashout.mp4) */}
      <Sequence from={3260} durationInFrames={195}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("models.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 27: random.mp4 playing after models.mp4 ends */}
      <Sequence from={3433} durationInFrames={335}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("random.mp4")}
            playbackRate={0.6}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 28: 68% and accuracy over black screen */}
      {frame >= 3634 && frame < 3724 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontFamily,
                color: "#F5F2E3",
                fontSize: 1000,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              68%
            </span>
            <span
              style={{
                fontFamily,
                color: "#F5F2E3",
                fontSize: 350,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              accuracy
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 29: accurate.mp4 playing after accuracy text */}
      <Sequence from={3694} durationInFrames={264}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("accurate.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 30: claude.mp4 full screen after accurate.mp4 ends */}
      <Sequence from={3988} durationInFrames={432}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Video
              src={staticFile("claude.mp4")}
              volume={0}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 31: whowins.png centered, '100 simulations' text below after 600ms */}
      {frame >= 4078 && frame < 4168 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("whowins.png")}
            style={{
              width: "40%",
              position: "relative",
              bottom:"8%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4096 && (
            <span
              style={{
                position: "absolute",
                bottom: "6%",
                fontFamily,
                color: "#F5F2E3",
                fontSize: 250,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              10,000 simulations
            </span>
          )}
        </AbsoluteFill>
      )}

      {/* Scene 32: groupa.png centered on black screen, then tick.png on center right after 600ms */}
      {frame >= 4168 && frame < 4216 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupa.png")}
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4186 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "35%",
                transform: "translateY(-50%)",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 33: groupb.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4216 && frame < 4264 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupb.png")}
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4234 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                bottom: "4%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 34: groupc.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4264 && frame < 4312 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupc.png")}
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4282 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "25%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 35: groupd.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4312 && frame < 4360 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupd.png")}
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4330 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 36: groupe.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4360 && frame < 4408 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupe.png")}
            style={{
              width: "65%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4378 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 37: groupf.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4408 && frame < 4456 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupf.png")}
            style={{
              width: "63%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4426 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 38: groupg.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4456 && frame < 4504 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupg.png")}
            style={{
              width: "63%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4474 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 39: grouph.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4504 && frame < 4552 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("grouph.png")}
            style={{
              width: "65%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4522 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "24%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 40: groupi.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4552 && frame < 4600 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupi.png")}
            style={{
              width: "63%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4570 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 41: groupj.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4600 && frame < 4648 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupj.png")}
            style={{
              width: "63%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4618 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 42: groupk.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4648 && frame < 4696 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupk.png")}
            style={{
              width: "60%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4666 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "25%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 43: groupl.png centered on black screen, then tick.png on bottom right after 600ms */}
      {frame >= 4696 && frame < 4744 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("groupl.png")}
            style={{
              width: "65%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          {frame >= 4714 && (
            <Img
              src={staticFile("tick.png")}
              style={{
                position: "absolute",
                right: "20%",
                top: "23%",
                width: "12%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 44: smirk.gif on black background after all groups end, fades in */}
      {frame >= 4744 && frame < 4804 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedImage
            src={staticFile("smirk.gif")}
            width={1800}
            height={1800}
            fit="cover"
            style={{
              opacity: interpolate(frame, [4744, 4764], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 45: according to text, word by word like SINCE 1974 */}
      {frame >= 4804 && frame < 4854 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={TEXT_STYLE}>
            <span style={{ opacity: 1 }}>ACCORDING</span>
            <span style={{ opacity: frame >= 4812 ? 1 : 0 }}>TO</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 46: rf.png centered on black screen */}
      {frame >= 4854 && frame < 4894 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("rf.png")}
            style={{
              width: "60%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 47a: winners.png on left with spain.png on right */}
      {frame >= 4894 && frame < 4924 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("winners.png")}
            style={{
              position: "absolute",
              left: "30%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Img
            src={staticFile("spain.png")}
            style={{
              position: "absolute",
              left: "77%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 47b: 2010.png centered for 1 sec */}
      {frame >= 4924 && frame < 4954 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("2010.png")}
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 47c: winners.png on left with argentina.png on right */}
      {frame >= 4954 && frame < 4984 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("winners.png")}
            style={{
              position: "absolute",
              left: "30%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Img
            src={staticFile("argentina.png")}
            style={{
              position: "absolute",
              left: "77%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 47d: winners.png on left with france.png on right */}
      {frame >= 4984 && frame < 5014 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("winners.png")}
            style={{
              position: "absolute",
              left: "30%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Img
            src={staticFile("france.png")}
            style={{
              position: "absolute",
              left: "77%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 48: portugal.png centered */}
      {frame >= 5014 && frame < 5044 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("portugal.png")}
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 49: winners.png centered with north-west arrow pointing to center-left */}
      {frame >= 5044 && frame < 5134 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("winners.png")}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: "80%",
              height: "auto",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "30%",
              top: "52%",
              color: "#F5F2E3",
            }}
          >
            <MoveUpLeft size={600} strokeWidth={3} />
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 50: ronaldo.png full screen for 5 sec, wccup.png on left after 1 sec */}
      {frame >= 5134 && frame < 5284 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("ronaldo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {frame >= 5164 && (
            <Img
              src={staticFile("wccup.png")}
              style={{
                position: "absolute",
                left: "20%",
                top: "45%",
                transform: "translate(-50%, -50%)",
                width: "15%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 51: Top 5 to win text on top, flags in a grid one by one */}
      {frame >= 5284 && frame < 5464 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          {/* Top 5 to win text */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily,
              color: "#F5F2E3",
              fontSize: 320,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            TOP 5 TO WIN
          </div>

          {/* Top row: spain (left), argentina (center), france (right) */}
          {frame >= 5324 && (
            <Img
              src={staticFile("spain.png")}
              style={{
                position: "absolute",
                left: "20%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
          {frame >= 5344 && (
            <Img
              src={staticFile("argentina.png")}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
          {frame >= 5364 && (
            <Img
              src={staticFile("france.png")}
              style={{
                position: "absolute",
                left: "80%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}

          {/* Bottom row: brazil (left), portugal (right) */}
          {frame >= 5384 && (
            <Img
              src={staticFile("brazil.png")}
              style={{
                position: "absolute",
                left: "33%",
                top: "78%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
          {frame >= 5404 && (
            <Img
              src={staticFile("portugal.png")}
              style={{
                position: "absolute",
                left: "67%",
                top: "78%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 52: Disappointing teams text on top, flags in a row one by one */}
      {frame >= 5449 && frame < 5579 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          {/* DISSAPOINTING TEAMS text */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily,
              color: "#F5F2E3",
              fontSize: 320,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            DISSAPOINTING TEAMS
          </div>

          {/* Flags in a row: columbia (left), netherlands (center), japan (right) */}
          {frame >= 5479 && (
            <Img
              src={staticFile("columbia.png")}
              style={{
                position: "absolute",
                left: "20%",
                top: "60%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
          {frame >= 5499 && (
            <Img
              src={staticFile("netherlands.png")}
              style={{
                position: "absolute",
                left: "50%",
                top: "60%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
          {frame >= 5519 && (
            <Img
              src={staticFile("japan.png")}
              style={{
                position: "absolute",
                left: "80%",
                top: "60%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 53: heatmap.png centered on black bg */}
      {frame >= 5579 && frame < 5699 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("heatmap.png")}
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 54: AND THAT'S IT. word by word */}
      {frame >= 5699 && frame < 5779 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={TEXT_STYLE}>
            <span style={{ opacity: 1 }}>AND</span>
            <span style={{ opacity: frame >= 5707 ? 1 : 0 }}>THAT&apos;S</span>
            <span style={{ opacity: frame >= 5715 ? 1 : 0 }}>IT.</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 55: licap.png on black screen */}
      {frame >= 5779 && frame < 5899 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("licap.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 56: fifagit.png with LINK IN BIO text */}
      {frame >= 5899 && frame < 5959 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Img
            src={staticFile("fifagit.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          {frame >= 5923 && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily,
                color: "black",
                fontSize: 500,
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1,
                display: "flex",
                gap: "50px",
              }}
            >
              <span style={{ opacity: 1 }}>LINK</span>
              <span style={{ opacity: frame >= 5931 ? 1 : 0 }}>IN</span>
              <span style={{ opacity: frame >= 5939 ? 1 : 0 }}>BIO</span>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* Scene 57: sleep.png on black screen */}
      {frame >= 5959 && frame < 5979 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("sleep.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Scene 58: seeu.png on black screen */}
      {frame >= 5979 && (
        <AbsoluteFill
          style={{
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("seeu.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
