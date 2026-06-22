import { AbsoluteFill, Img, staticFile, useCurrentFrame, AnimatedImage, interpolate, Video, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
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

      {/* Scene 5: Sad images scattered one by one at 400ms intervals */}
      {frame >= 280 && frame < 339 && (
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
              }}
            />
          )}
          {frame >= 292 && (
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
          {frame >= 304 && (
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
          {frame >= 316 && (
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
      <Sequence from={339}>
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
          {frame >= 414 && (
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
      {frame >= 450 && frame < 468 && (
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
      {frame >= 468 && frame < 528 && (
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
          {frame >= 483 && (
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
      <Sequence from={528} durationInFrames={110}>
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

      {/* Scene 10: thinkmemoji.png on left, then excalidraw.png on right after 500ms */}
      {frame >= 638 && (
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
          {frame >= 653 && (
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

      {/* Scene 11: data.mp4 playing 800ms after excalidraw appears */}
      <Sequence from={677}>
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

      {/* Scene 12: full.mp4 playing after data.mp4 ends */}
      <Sequence from={860}>
        <AbsoluteFill
          style={{
            backgroundColor: "black",
          }}
        >
          <Video
            src={staticFile("full.mp4")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 13: itseasy.png showing instantly after full.mp4 ends */}
      {frame >= 1140 && frame < 1200 && (
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

      {/* Scene 14: scraping.mp4 playing after itseasy.png */}
      <Sequence from={1200}>
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
      {frame >= 1308 && frame < 1353 && (
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
      <Sequence from={1353}>
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
      {frame >= 1643 && frame < 1733 && (
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
              opacity: interpolate(frame, [1643, 1653], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 1667 && (
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
                opacity: interpolate(frame, [1667, 1677], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 18: poster.webp on left, then cup.webp on right after 800ms */}
      {frame >= 1733 && frame < 1827 && (
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
              opacity: interpolate(frame, [1733, 1743], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 1757 && (
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
                opacity: interpolate(frame, [1757, 1767], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Scene 19: ownelo.jpg on white bg with OWN ELO SYSTEM text word by word */}
      {frame >= 1827 && frame < 1900 && (
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
              <span style={{ opacity: frame >= 1831 ? 1 : 0 }}>ELO</span>
              <span style={{ opacity: frame >= 1835 ? 1 : 0 }}>SYSTEM</span>

            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 20: db.png centered below on black bg, text fades in 400ms later */}
      {frame >= 1900 && frame < 2000 && (
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
              opacity: interpolate(frame, [1912, 1922], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            Data from 1872 to 2026
          </div>
        </AbsoluteFill>
      )}

      {/* Scene 21: table.png on left, stats on right in JetBrains Mono */}
      {frame >= 2000 && frame < 2120 && (
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
      <Sequence from={2120}>
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
      <Sequence from={2398}>
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
              opacity: interpolate(frame, [2398, 2403], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
              opacity: interpolate(frame, [2413, 2418], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
              opacity: interpolate(frame, [2428, 2433], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          />
          {frame >= 2451 && frame < 2496 && (
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
      <Sequence from={2496}>
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
          {frame >= 2514 && frame < 2544 && (
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
    </AbsoluteFill>
  );
};
