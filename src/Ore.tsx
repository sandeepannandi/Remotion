import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig, Audio } from "remotion";
import { Video } from "@remotion/media";
import React from "react";

const imageFiles = [
  "test1.jpg",
  "test2.jpg",
  "test3.jpg",
  "test4.jpg",
  "test5.png",
  "test6.png",
  "test7.png",
  "test8.png",
];

const topImages = [
  "website1.png",
  "website2.png",
  "website3.jpg",
  "website4.png",
  "website5.png",
  "website6.png",
  "website7.png",
];

const doubleTopImages = [...topImages, ...topImages];

const bottomImages = [
  "website8.png",
  "website9.png",
  "website10.png",
  "website11.png",
  "website12.png",
  "website13.png",
  "website14.png",
];

const doubleBottomImages = [...bottomImages, ...bottomImages];

const imagePositions = imageFiles.map((_, i) => ({
  left: Math.abs(Math.sin(i * 127.1 + 311.7)) * 40 + 30,
  top: Math.abs(Math.sin(i * 269.5 + 183.3)) * 40 + 30,
}));

const scene2Words = ["Create", "on", "brand", "images", "&", "videos"];

const LaunchVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Fast slide-in from the right — spring settles in ~5 frames so the motion is visible
  const slideSpr = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 300 },
  });
  const translateX = interpolate(slideSpr, [0, 1], [width, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translateX(${translateX}px)`,
      }}
    >
      <Video
        src={staticFile("launch.mp4")}
        style={{
          width: "85%",
          height: "85%",
          objectFit: "cover",
          borderRadius: 40,
        }}
      />
    </div>
  );
};

export const Ore: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const words = ["Introducing", "Ore"];

  const textEndFrame = 32;
  const imageStartFrame = textEndFrame + 6; // 200ms gap
  const imageInterval = 9; // 300ms at 30fps
  const lastImageFrame = imageStartFrame + (imageFiles.length - 1) * imageInterval;
  const scene2Start = lastImageFrame + 15; // 500ms after last image
  const springSettleFrames = 20;
  const videoStartFrame = scene2Start + (scene2Words.length - 1) * 6 + springSettleFrames + 9; // 300ms after last word settles

  const videoDuration = 112; // 3.73 seconds at 30 fps
  const finalSceneStart = videoStartFrame + videoDuration;
  const zoomStartFrame = finalSceneStart + 45; // 30 frames for slide settling + 15 frames delay (500ms)

  const slideSpr = spring({
    frame: frame - finalSceneStart,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const translateX = interpolate(slideSpr, [0, 1], [width, 0]);

  const hideStartFrame = zoomStartFrame + 20; // Image zooms out over 20 frames (faster zoom out) and then hides

  const zoomSpr = spring({
    frame: frame - zoomStartFrame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const scale = interpolate(zoomSpr, [0, 1], [0.85, 0.55]);

  const nextSceneStart = hideStartFrame + 120; // carousel plays for 120 frames (4 seconds)

  const carouselFrame = frame - hideStartFrame;
  const speed = 8; // speed of the carousel
  const cardWidth = 1425; // bigger carousel card width
  const gap = 45; // reduced distance of the images
  const step = cardWidth + gap; // 1470
  const loopWidth = 7 * step; // 10290 pixels total width for 7 images
  const scrollOffset = (carouselFrame * speed) % loopWidth;
  const translateX1 = -scrollOffset;
  const translateX2 = -loopWidth + scrollOffset;

  // Next Scene Variables
  const activeIndex = frame < 574 ? 0 : frame < 649 ? 1 : 2;

  // Final text scene: "Create on brand videos that scale"
  const adsEndFrame = 724; // ads.png shows for ~75 frames (matching pattern)
  const finalTextStart = adsEndFrame + 15; // 500ms after ads scene ends
  const finalTextWords1 = ["Create", "on", "brand"]; // line 1
  const finalTextWords2 = ["videos", "that", "scale"]; // line 2

  // Zoom-in + hide transition, then video2 and launch
  const textZoomStart = 780; // text fully settled, start fast zoom
  const textZoomEnd = 788; // 8 frames of fast zoom
  const video2Start = textZoomEnd; // video2 plays instantly after zoom
  const video2Duration = 72; // 2.4s at 30fps
  const launchStart = video2Start + video2Duration; // launch.mp4 right after video2
  const launchDuration = 150; // 5 seconds at 30fps

  // After launch video — flipping words scene
  const afterLaunchStart = launchStart + launchDuration;
  const flipInterval = 36; // ~1.2 seconds per word at 30fps
  const afterLaunchWords = ["Product Shots", "Brand Identity", "Ads", "Social Posts", "Brand Videos", "Website Content"];
  const wordCount = afterLaunchWords.length;
  const manyMoreStart = afterLaunchStart + wordCount * flipInterval + 36;

  // "Just enter your website" flip — after "and many more..." settles
  const justEnterStart = manyMoreStart + 36;

  const justEnterSpr = spring({
    frame: frame - justEnterStart,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Active word index for dynamic placeholder sizing
  const activeFlipIdx = Math.min(
    Math.floor((frame - afterLaunchStart) / flipInterval),
    afterLaunchWords.length - 1
  );

  // "Create" entrance
  const afterCreateSpr = spring({
    frame: frame - afterLaunchStart,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const afterCreateY = interpolate(afterCreateSpr, [0, 1], [40, 0]);
  const afterCreateOpacity = interpolate(afterCreateSpr, [0, 1], [0, 1]);

  // Flip transition springs (5 transitions for 6 words)
  const afterFlipSpr1 = spring({
    frame: frame - (afterLaunchStart + flipInterval * 1),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const afterFlipSpr2 = spring({
    frame: frame - (afterLaunchStart + flipInterval * 2),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const afterFlipSpr3 = spring({
    frame: frame - (afterLaunchStart + flipInterval * 3),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const afterFlipSpr4 = spring({
    frame: frame - (afterLaunchStart + flipInterval * 4),
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const afterFlipSpr5 = spring({
    frame: frame - (afterLaunchStart + flipInterval * 5),
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Word 0: Product Shots — enters with afterCreateSpr, exits with afterFlipSpr1
  const word0AfterY = frame < afterLaunchStart + flipInterval
    ? interpolate(afterCreateSpr, [0, 1], [100, 0])
    : interpolate(afterFlipSpr1, [0, 1], [0, -100]);
  const word0AfterOpacity = frame < afterLaunchStart + flipInterval
    ? interpolate(afterCreateSpr, [0, 1], [0, 1])
    : interpolate(afterFlipSpr1, [0, 1], [1, 0]);

  // Word 1: Brand Identity — enters with afterFlipSpr1, exits with afterFlipSpr2
  const word1AfterY = frame < afterLaunchStart + flipInterval * 2
    ? interpolate(afterFlipSpr1, [0, 1], [100, 0])
    : interpolate(afterFlipSpr2, [0, 1], [0, -100]);
  const word1AfterOpacity = frame < afterLaunchStart + flipInterval * 2
    ? interpolate(afterFlipSpr1, [0, 1], [0, 1])
    : interpolate(afterFlipSpr2, [0, 1], [1, 0]);

  // Word 2: Ads — enters with afterFlipSpr2, exits with afterFlipSpr3
  const word2AfterY = frame < afterLaunchStart + flipInterval * 3
    ? interpolate(afterFlipSpr2, [0, 1], [100, 0])
    : interpolate(afterFlipSpr3, [0, 1], [0, -100]);
  const word2AfterOpacity = frame < afterLaunchStart + flipInterval * 3
    ? interpolate(afterFlipSpr2, [0, 1], [0, 1])
    : interpolate(afterFlipSpr3, [0, 1], [1, 0]);

  // Word 3: Social Posts — enters with afterFlipSpr3, exits with afterFlipSpr4
  const word3AfterY = frame < afterLaunchStart + flipInterval * 4
    ? interpolate(afterFlipSpr3, [0, 1], [100, 0])
    : interpolate(afterFlipSpr4, [0, 1], [0, -100]);
  const word3AfterOpacity = frame < afterLaunchStart + flipInterval * 4
    ? interpolate(afterFlipSpr3, [0, 1], [0, 1])
    : interpolate(afterFlipSpr4, [0, 1], [1, 0]);

  // Word 4: Brand Videos — enters with afterFlipSpr4, exits with afterFlipSpr5
  const word4AfterY = frame < afterLaunchStart + flipInterval * 5
    ? interpolate(afterFlipSpr4, [0, 1], [100, 0])
    : interpolate(afterFlipSpr5, [0, 1], [0, -100]);
  const word4AfterOpacity = frame < afterLaunchStart + flipInterval * 5
    ? interpolate(afterFlipSpr4, [0, 1], [0, 1])
    : interpolate(afterFlipSpr5, [0, 1], [1, 0]);

  // Word 5: Website Content — enters with afterFlipSpr5, stays
  const word5AfterY = interpolate(afterFlipSpr5, [0, 1], [100, 0]);
  const word5AfterOpacity = interpolate(afterFlipSpr5, [0, 1], [0, 1]);

  // "and many more..." entrance
  const manyMoreAfterSpr = spring({
    frame: frame - manyMoreStart,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const manyMoreAfterY = interpolate(manyMoreAfterSpr, [0, 1], [40, 0]);
  const manyMoreAfterOpacity = interpolate(manyMoreAfterSpr, [0, 1], [0, 1]);

  // "and many more..." → "Just enter your website" flip
  const manyMoreWordY = frame < justEnterStart
    ? 0
    : interpolate(justEnterSpr, [0, 1], [0, -100]);
  const manyMoreWordOpacity = frame < justEnterStart
    ? 1
    : interpolate(justEnterSpr, [0, 1], [1, 0]);

  // "Just enter your website" → "Try at itsore.com" flip
  const tryAtStart = justEnterStart + 36;

  const tryAtSpr = spring({
    frame: frame - tryAtStart,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const justEnterWordY = frame < tryAtStart
    ? interpolate(justEnterSpr, [0, 1], [100, 0])
    : interpolate(tryAtSpr, [0, 1], [0, -100]);
  const justEnterWordOpacity = frame < tryAtStart
    ? interpolate(justEnterSpr, [0, 1], [0, 1])
    : interpolate(tryAtSpr, [0, 1], [1, 0]);

  const tryAtWordY = interpolate(tryAtSpr, [0, 1], [100, 0]);
  const tryAtWordOpacity = interpolate(tryAtSpr, [0, 1], [0, 1]);

  // Zoom spring for text (fast)
  const textZoomSpr = spring({
    frame: frame - textZoomStart,
    fps,
    config: { damping: 8, stiffness: 200 },
  });
  const textZoomScale = interpolate(textZoomSpr, [0, 1], [1, 8]);
  const textZoomOpacity = interpolate(textZoomSpr, [0, 1], [1, 0]);

  // Staggered text entrance animations
  const createSpr = spring({
    frame: frame - nextSceneStart,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const createY = interpolate(createSpr, [0, 1], [40, 0]);
  const createOpacity = interpolate(createSpr, [0, 1], [0, 1]);

  const fromSpr = spring({
    frame: frame - (nextSceneStart + 8),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const fromY = interpolate(fromSpr, [0, 1], [40, 0]);
  const fromOpacity = interpolate(fromSpr, [0, 1], [0, 1]);

  const wordEntranceSpr = spring({
    frame: frame - (nextSceneStart + 16),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const wordEntranceY = interpolate(wordEntranceSpr, [0, 1], [40, 0]);
  const wordEntranceOpacity = interpolate(wordEntranceSpr, [0, 1], [0, 1]);

  // Flipping transitions
  const flip1Spr = spring({
    frame: frame - 574,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const flip2Spr = spring({
    frame: frame - 649,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const word0Y = interpolate(flip1Spr, [0, 1], [0, -100]);
  const word0Opacity = interpolate(flip1Spr, [0, 1], [1, 0]);

  const word1Y = frame < 649
    ? interpolate(flip1Spr, [0, 1], [100, 0])
    : interpolate(flip2Spr, [0, 1], [0, -100]);
  const word1Opacity = frame < 649
    ? interpolate(flip1Spr, [0, 1], [0, 1])
    : interpolate(flip2Spr, [0, 1], [1, 0]);

  const word2Y = interpolate(flip2Spr, [0, 1], [100, 0]);
  const word2Opacity = interpolate(flip2Spr, [0, 1], [0, 1]);

  const widthSpr1 = spring({
    frame: frame - 574,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const widthSpr2 = spring({
    frame: frame - 649,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const textContainerWidth = frame < 574
    ? 450
    : frame < 649
      ? interpolate(widthSpr1, [0, 1], [450, 830])
      : interpolate(widthSpr2, [0, 1], [830, 900]);

  // Image delayed appearance spring (500ms / 15 frames delay)
  const imageEntranceSpr = spring({
    frame: frame - (nextSceneStart + 15),
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const imageOpacity = frame < 574
    ? interpolate(imageEntranceSpr, [0, 1], [0, 1])
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${staticFile("bg2.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background audio — afro1 through afro6 sequenced end-to-end */}
      <Sequence from={0} durationInFrames={233}>
        <Audio src={staticFile("afro1.mp3")} />
      </Sequence>
      <Sequence from={233} durationInFrames={233}>
        <Audio src={staticFile("afro2.mp3")} />
      </Sequence>
      <Sequence from={466} durationInFrames={233}>
        <Audio src={staticFile("afro3.mp3")} />
      </Sequence>
      <Sequence from={699} durationInFrames={233}>
        <Audio src={staticFile("afro4.mp3")} />
      </Sequence>
      <Sequence from={932} durationInFrames={233}>
        <Audio src={staticFile("afro5.mp3")} />
      </Sequence>
      <Sequence from={1165} durationInFrames={236}>
        <Audio src={staticFile("afro6.mp3")} />
      </Sequence>

      {/* Intro text - hidden when scene 2 is visible */}
      {frame >= scene2Start ? null : (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "row",
          fontFamily: "'Geist', 'Inter', sans-serif",
          fontSize: 280,
          fontWeight: 700,
          color: "#000000",
          gap: "0.25em",
        }}
      >
        {words.map((word, i) => {
          const delay = i * 12;
          const spr = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const translateY = interpolate(spr, [0, 1], [60, 0]);
          const opacity = interpolate(spr, [0, 1], [0, 1]);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                transform: `translateY(${translateY}px)`,
                opacity,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      )}

      {/* Test images appearing randomly - hidden when scene 2 is visible */}
      {frame >= scene2Start ? null : imageFiles.map((file, i) => {
        const showFrame = imageStartFrame + i * imageInterval;
        if (frame < showFrame) return null;
        return (
          <Img
            key={file}
            src={staticFile(file)}
            style={{
              position: "absolute",
              left: `${imagePositions[i].left}%`,
              top: `${imagePositions[i].top}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Scene 2: Create on brand images & videos */}
      {frame < scene2Start || frame >= videoStartFrame ? null : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            whiteSpace: "nowrap",
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: 200,
            fontWeight: 700,
            color: "#000000",
            gap: "0.25em",
            textAlign: "center",
            }}
          >
            {scene2Words.map((word, i) => {
              const delay = scene2Start + i * 6;
            const relFrame = frame - delay;
            const spr = spring({
              frame: relFrame,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            const translateY = interpolate(spr, [0, 1], [60, 0]);
            const opacity = interpolate(spr, [0, 1], [0, 1]);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  transform: `translateY(${translateY}px)`,
                  opacity,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      )}

      {/* Video full screen - 300ms after scene 2 text ends */}
      <Sequence from={videoStartFrame} durationInFrames={videoDuration}>
        <Video
          src={staticFile("video.mp4")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Background Carousels */}
      {frame >= hideStartFrame && frame < nextSceneStart && (
        <>
          {/* Carousel 1 (Top, moving left) */}
          <div
            style={{
              position: "absolute",
              top: 80,
              left: 0,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 45,
                transform: `translateX(${translateX1}px)`,
                width: loopWidth * 2,
              }}
            >
              {doubleTopImages.map((file, i) => (
                <Img
                  key={`c1-${i}`}
                  src={staticFile(file)}
                  style={{
                    width: 1425,
                    height: 950,
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Carousel 2 (Bottom, moving right) */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 45,
                transform: `translateX(${translateX2}px)`,
                width: loopWidth * 2,
              }}
            >
              {doubleBottomImages.map((file, i) => (
                <Img
                  key={`c2-${i}`}
                  src={staticFile(file)}
                  style={{
                    width: 1425,
                    height: 950,
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Final scene: test6.png sliding from the right */}
      {frame >= finalSceneStart && frame < hideStartFrame && (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile("test6.png")}
            style={{
              height: "85%",
              borderRadius: 30,
              transform: `translateX(${translateX}px) scale(${scale})`,
            }}
          />
        </AbsoluteFill>
      )}

      {/* Next scene: create from ideas/aesthetics/ads library */}
      {frame >= nextSceneStart && frame < finalTextStart && (
        <AbsoluteFill>
          <div
            style={{
              position: "absolute",
              top: 80,
              left: 220,
              width: 3400,
              display: "flex",
              flexDirection: "column",
              gap: 80, // more space bw the text and the img
            }}
          >
            {/* The Text Header aligned to left-top of the block with staggered entrance */}
            <div
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 160, // increased font size more
                fontWeight: 700,
                color: "#000000",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 35,
                height: 210,
              }}
            >
              <span style={{ display: "inline-block", transform: `translateY(${createY}px)`, opacity: createOpacity }}>Create </span>
              <span style={{ display: "inline-block", transform: `translateY(${fromY}px)`, opacity: fromOpacity }}>from </span>
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  height: "100%",
                  width: textContainerWidth,
                  overflow: "hidden",
                  transform: `translateY(${wordEntranceY}px)`,
                  opacity: wordEntranceOpacity,
                }}
              >
                <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${word0Y}%)`, opacity: word0Opacity, whiteSpace: "nowrap" }}>ideas</span>
                <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${word1Y}%)`, opacity: word1Opacity, whiteSpace: "nowrap" }}>aesthetics</span>
                <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${word2Y}%)`, opacity: word2Opacity, whiteSpace: "nowrap" }}>ads library</span>
              </div>
            </div>

            {/* The Image below changing instantly - increased size and delayed appearance */}
            <Img
              src={staticFile(activeIndex === 0 ? "ideas.png" : activeIndex === 1 ? "aesthetics.png" : "ads.png")}
              style={{
                width: "80%", // increased image width
                height: "80%", // increased image height
                objectFit: "contain",
                borderRadius: 40,
                opacity: imageOpacity,
              }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* Final text scene: Create on brand videos that scale */}
      {frame >= finalTextStart && frame < textZoomEnd && (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
              transform: `scale(${textZoomScale})`,
              opacity: textZoomOpacity,
            }}
          >
            {/* Line 1: Create on brand */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.3em",
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 280,
                fontWeight: 700,
                color: "#000000",
              }}
            >
              {finalTextWords1.map((word, i) => {
                const delay = finalTextStart + i * 5;
                const spr = spring({
                  frame: frame - delay,
                  fps,
                  config: { damping: 12, stiffness: 100 },
                });
                const y = interpolate(spr, [0, 1], [60, 0]);
                const o = interpolate(spr, [0, 1], [0, 1]);
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      transform: `translateY(${y}px)`,
                      opacity: o,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
            {/* Line 2: videos that scale */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.3em",
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 280,
                fontWeight: 700,
                color: "#000000",
              }}
            >
              {finalTextWords2.map((word, i) => {
                const delay = finalTextStart + (finalTextWords1.length + i) * 5;
                const spr = spring({
                  frame: frame - delay,
                  fps,
                  config: { damping: 12, stiffness: 100 },
                });
                const y = interpolate(spr, [0, 1], [60, 0]);
                const o = interpolate(spr, [0, 1], [0, 1]);
                return (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      transform: `translateY(${y}px)`,
                      opacity: o,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Video2 - plays instantly after text zoom */}
      <Sequence from={video2Start} durationInFrames={video2Duration}>
        <Video
          src={staticFile("video2.mp4")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>

      {/* Launch video - slides in from right instantly after video2 */}
      <Sequence from={launchStart} durationInFrames={launchDuration}>
        <LaunchVideo />
      </Sequence>

      {/* After launch — Create [flipping word] then "and many more..." → "Just enter your website" */}
      {frame >= afterLaunchStart && (
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {frame < manyMoreStart ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.25em",
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 260,
                fontWeight: 700,
                color: "#000000",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${afterCreateY}px)`,
                  opacity: afterCreateOpacity,
                }}
              >
                Create
              </span>{" "}
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  height: "1.4em",
                  overflow: "hidden",
                }}
              >
                {/* Invisible placeholder using current word so container sizes dynamically */}
                <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{afterLaunchWords[activeFlipIdx]}</span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${word0AfterY}%)`,
                    opacity: word0AfterOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Product Shots
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${word1AfterY}%)`,
                    opacity: word1AfterOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Brand Identity
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${word2AfterY}%)`,
                    opacity: word2AfterOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Ads
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${word3AfterY}%)`,
                    opacity: word3AfterOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Social Posts
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${word4AfterY}%)`,
                    opacity: word4AfterOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Brand Videos
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${word5AfterY}%)`,
                    opacity: word5AfterOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Website Content
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 260,
                fontWeight: 700,
                color: "#000000",
                transform: `translateY(${manyMoreAfterY}px)`,
                opacity: manyMoreAfterOpacity,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  height: "1.4em",
                  overflow: "hidden",
                }}
              >
                {/* Invisible placeholder using current active text */}
                <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>{frame < justEnterStart ? "and many more..." : frame < tryAtStart ? "Just enter your website" : "Try at itsore.com"}</span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${manyMoreWordY}%)`,
                    opacity: manyMoreWordOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  and many more...
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${justEnterWordY}%)`,
                    opacity: justEnterWordOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Just enter your website
                </span>
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translateX(-50%) translateY(-50%) translateY(${tryAtWordY}%)`,
                    opacity: tryAtWordOpacity,
                    whiteSpace: "nowrap",
                  }}
                >
                  Try at itsore.com
                </span>
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
