import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    staticFile,
    Video,
    Sequence,
    Img,
} from 'remotion';
import React from 'react';
import { z } from 'zod';

export const schema = {
    // Colors
    backgroundColor: "color",
    secondaryBackgroundColor: "color",
    textColor: "color",
    secondaryTextColor: "color",
    accentColor: "color",
    // Images
    invisibleEnemyImages: "image[]",
    stealingImages: "image[]",
    logo: "image",
    mockup1: "image",
    analyticsImage: "image",
    receiptImage: "image",
    smsImage: "image",
    quickAddImage: "image",
    leaderboard1: "image",
    leaderboard2: "image",
    finalMockup: "image",
    // Text
    introQuestion: "text",
    notRentText: "text",
    notEmiText: "text",
    works24hText: "text",
    stealingMoneyText: "text",
    calledInflationText: "text",
    badIdeaLine1: "text",
    badIdeaLine2: "text",
    eatsMoneyText: "text",
    eatsMoneyWord: "text",
    everyText: "text",
    singleText: "text",
    monthText: "text",
    meetText: "text",
    brandName: "text",
    aiExpertTitle: "text",
    aiExpertSub: "text",
    scoreTitle: "text",
    scoreSub: "text",
    scanTitle: "text",
    scanSub: "text",
    competeTitle: "text",
    competeSub: "text",
    finalTagline: "text",
    transitionVideo: "text",
};

export const appLaunchSchema = z.object({
    backgroundColor: z.string(),
    secondaryBackgroundColor: z.string(),
    textColor: z.string(),
    secondaryTextColor: z.string(),
    accentColor: z.string(),
    introQuestion: z.string(),
    notRentText: z.string(),
    notEmiText: z.string(),
    works24hText: z.string(),
    stealingMoneyText: z.string(),
    calledInflationText: z.string(),
    badIdeaLine1: z.string(),
    badIdeaLine2: z.string(),
    eatsMoneyText: z.string(),
    eatsMoneyWord: z.string(),
    everyText: z.string(),
    singleText: z.string(),
    monthText: z.string(),
    meetText: z.string(),
    brandName: z.string(),
    aiExpertTitle: z.string(),
    aiExpertSub: z.string(),
    scoreTitle: z.string(),
    scoreSub: z.string(),
    scanTitle: z.string(),
    scanSub: z.string(),
    competeTitle: z.string(),
    competeSub: z.string(),
    finalTagline: z.string(),
    invisibleEnemyImages: z.array(z.string()),
    stealingImages: z.array(z.string()),
    transitionVideo: z.string(),
    logo: z.string(),
    mockup1: z.string(),
    analyticsImage: z.string(),
    receiptImage: z.string(),
    smsImage: z.string(),
    quickAddImage: z.string(),
    leaderboard1: z.string(),
    leaderboard2: z.string(),
    finalMockup: z.string(),
});

export type AppLaunchProps = z.infer<typeof appLaunchSchema>;

export const defaultProps: AppLaunchProps = {
    backgroundColor: "#fff6e8ff",
    secondaryBackgroundColor: "#000000",
    textColor: "#000000",
    secondaryTextColor: "#ffffff",
    accentColor: "#FF8C00",
    introQuestion: "What if your biggest financial enemy is invisible?",
    notRentText: "It's not your rent",
    notEmiText: "Not your EMIs",
    works24hText: "It works 24 hours a day.",
    stealingMoneyText: "Stealing your money while you sleep",
    calledInflationText: "It's called inflation",
    badIdeaLine1: "And you have",
    badIdeaLine2: "no idea how bad it is",
    eatsMoneyText: "Inflation eats your",
    eatsMoneyWord: "money",
    everyText: "EVERY.",
    singleText: "SINGLE.",
    monthText: "MONTH.",
    meetText: "Meet",
    brandName: "ExpensePal",
    aiExpertTitle: "Ask your AI finance expert anything.",
    aiExpertSub: "Real answers based on your spending",
    scoreTitle: "See your personal inflation score & stability index.",
    scoreSub: "Know where you stand before a crisis hits.",
    scanTitle: "Scan receipts & SMS instantly",
    scanSub: "Zero manual entry. Ever.",
    competeTitle: "Compete on leaderboards",
    competeSub: "Build streaks. Share your wins.",
    finalTagline: "The new money app.",
    invisibleEnemyImages: [
        "https://images.pexels.com/photos/14969604/pexels-photo-14969604.jpeg",
        "https://images.pexels.com/photos/6110830/pexels-photo-6110830.jpeg",
        "https://images.pexels.com/photos/37989224/pexels-photo-37989224.jpeg",
        "https://images.pexels.com/photos/29442930/pexels-photo-29442930.jpeg",
        "https://images.pexels.com/photos/7653461/pexels-photo-7653461.jpeg",
        "https://images.pexels.com/photos/31202247/pexels-photo-31202247.jpeg",
        "https://images.pexels.com/photos/9585550/pexels-photo-9585550.jpeg"
    ],
    stealingImages: [
        "https://images.pexels.com/photos/8554409/pexels-photo-8554409.jpeg",
        "https://images.pexels.com/photos/7230217/pexels-photo-7230217.jpeg",
        "https://images.pexels.com/photos/8705783/pexels-photo-8705783.jpeg",
        "https://images.pexels.com/photos/6266305/pexels-photo-6266305.jpeg",
        "https://images.pexels.com/photos/6266668/pexels-photo-6266668.jpeg",
        "https://images.pexels.com/photos/6266697/pexels-photo-6266697.jpeg",
        "https://images.pexels.com/photos/7916845/pexels-photo-7916845.jpeg"
    ],
    transitionVideo: "https://d2j2uxe7jasn0r.cloudfront.net/watermarks/video/rMadI-Zz9l0vd44f0/videoblocks-inflation-text-news_sguwl9rgc__695cf4995fef584d5301c839326e633c__P360.mp4",
    logo: "https://i.postimg.cc/63HtgSPT/eplogo.png",
    mockup1: "https://i.postimg.cc/nrjb5LBJ/mock1.png",
    analyticsImage: "https://i.postimg.cc/g0z9ps8w/analytics.png",
    receiptImage: "https://i.postimg.cc/WpF1xpsY/receipt.png",
    smsImage: "https://i.postimg.cc/ry0w7yqh/sms.png",
    quickAddImage: "https://i.postimg.cc/QVGPyJj9/quickadd.png",
    leaderboard1: "https://i.postimg.cc/qMc4dzWf/l1.png",
    leaderboard2: "https://i.postimg.cc/DyQnK8Rv/l2.png",
    finalMockup: "https://i.postimg.cc/1RwZp8mf/epmock.png",
};

const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

const getSrc = (src: string) => src.startsWith('http') ? src : staticFile(src);

const PacMan: React.FC<{ 
    style?: React.CSSProperties, 
    direction?: 'right' | 'left' | 'up' | 'down',
    color?: string,
    size?: number
}> = ({ style, direction = 'right', color = '#FF8C00', size = 40 }) => {
    const frame = useCurrentFrame();
    const rotate = {
        right: '0deg',
        left: '180deg',
        up: '270deg',
        down: '90deg'
    }[direction];

    const mouthRotation = interpolate(
        Math.sin(frame * 0.4),
        [-1, 1],
        [0, 35]
    );

    return (
        <div style={{
            width: size,
            height: size,
            position: 'absolute',
            transform: `rotate(${rotate})`,
            display: 'flex',
            flexDirection: 'column',
            ...style,
        }}>
            <div style={{
                width: '100%',
                height: '50%',
                backgroundColor: color,
                borderTopLeftRadius: size,
                borderTopRightRadius: size,
                transformOrigin: 'bottom center',
                transform: `rotate(-${mouthRotation}deg)`,
            }} />
            <div style={{
                width: '100%',
                height: '50%',
                backgroundColor: color,
                borderBottomLeftRadius: size,
                borderBottomRightRadius: size,
                transformOrigin: 'top center',
                transform: `rotate(${mouthRotation}deg)`,
            }} />
        </div>
    );
};

// Sub-scenes
const IntroScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const words = props.introQuestion.split(" ");
    const circleStart = 50;
    const circleEnd = 60;

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            {frame >= circleStart && (
                <div style={{ position: 'absolute', left: '50%', top: '61%', width: 0, height: 0, zIndex: 1 }}>
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: interpolate(frame, [circleStart, circleEnd], [0, 4500], { extrapolateRight: 'clamp' }),
                        height: interpolate(frame, [circleStart, circleEnd], [0, 4500], { extrapolateRight: 'clamp' }),
                        backgroundColor: props.secondaryBackgroundColor,
                        borderRadius: '50%',
                    }} />
                </div>
            )}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '100px',
                fontWeight: 800,
                textAlign: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0 100px',
                lineHeight: 1.2,
                zIndex: 2,
                color: props.textColor,
            }}>
                {words.map((word, i) => {
                    const delay = i * 4;
                    const spr = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 12, stiffness: 100 },
                    });

                    let opacity = interpolate(spr, [0, 1], [0, 1]);
                    const translateY = interpolate(spr, [0, 1], [20, 0]);
                    let blur = 0;

                    if (word.toLowerCase().includes("invisible")) {
                        const exitStart = 45;
                        const exitDuration = 15;
                        const exitSpr = spring({
                            frame: frame - exitStart,
                            fps,
                            config: { damping: 20, stiffness: 60 },
                            durationInFrames: exitDuration,
                        });
                        const exitOpacity = interpolate(exitSpr, [0, 1], [1, 0]);
                        blur = interpolate(exitSpr, [0, 1], [0, 20]);
                        opacity = opacity * exitOpacity;
                    }

                    return (
                        <span 
                            key={i} 
                            style={{ 
                                opacity, 
                                transform: `translateY(${translateY}px)`, 
                                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                                marginRight: '0.3em', 
                                display: 'inline-block' 
                            }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const TextScene: React.FC<{ text: string, color: string, backgroundColor?: string }> = ({ text, color, backgroundColor }) => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ backgroundColor, justifyContent: "center", alignItems: "center" }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '120px',
                fontWeight: 800,
                textAlign: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0 100px',
                lineHeight: 1.2,
                color,
                zIndex: 2,
            }}>
                {text.split(" ").map((word, i) => {
                    const delay = (i * 4);
                    const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });
                    return (
                        <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                            {word}
                        </span>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const WorksStealingScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const fourthSceneMid = 80;
    const imageConfigs = [
        { left: '10%', top: '-5%', rotate: -5 },
        { left: '25%', top: '15%', rotate: 8 },
        { left: '8%', top: '25%', rotate: -12 },
        { left: '20%', top: '50%', rotate: 4 },
        { left: '8%', top: '60%', rotate: -3 },
        { left: '5%', top: '20%', rotate: -7 },
        { left: '28%', top: '50%', rotate: 10 },
    ];

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", color: props.textColor }}>
            {(frame < fourthSceneMid ? props.invisibleEnemyImages : props.stealingImages).map((src, i) => {
                const startFrame = frame < fourthSceneMid ? 0 : fourthSceneMid;
                const delay = startFrame + (i * 10);
                if (frame < delay) return null;
                const config = imageConfigs[i % imageConfigs.length];
                return (
                    <Img
                        key={src + i}
                        src={getSrc(src)}
                        style={{
                            position: 'absolute',
                            left: config.left,
                            top: config.top,
                            width: '450px',
                            height: 'auto',
                            transform: `rotate(${config.rotate}deg)`,
                            zIndex: i,
                        }}
                    />
                );
            })}

            <div style={{
                position: 'absolute',
                right: '-100px',
                width: '45%',
                display: 'flex',
                flexDirection: 'row',
                fontSize: '100px',
                fontWeight: 800,
                textAlign: 'left',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                lineHeight: 1.1,
            }}>
                {frame < fourthSceneMid ? (
                    props.works24hText.split(" ").map((word, i) => {
                        const delay = (i * 4);
                        const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        return (
                            <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                {word}
                            </span>
                        );
                    })
                ) : (
                    props.stealingMoneyText.split(" ").map((word, i) => {
                        const delay = fourthSceneMid + (i * 4);
                        const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        return (
                            <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                {word}
                            </span>
                        );
                    })
                )}
            </div>
        </AbsoluteFill>
    );
};

const InflationTextScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const inflationWords = props.calledInflationText.split(" ");
    const fifthWordInterval = 16;
    
    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", color: props.textColor }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '120px',
                fontWeight: 800,
                textAlign: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0 100px',
                lineHeight: 1.2,
            }}>
                {inflationWords.map((word, i) => {
                    const delay = (i * fifthWordInterval);
                    const hasAppeared = frame >= delay;
                    const allWordsDone = ((inflationWords.length - 1) * fifthWordInterval);
                    const waveStart = allWordsDone + 15;
                    const waveStagger = 4;
                    const myWaveFrame = waveStart + (i * waveStagger);
                    const isWaveFlickering = frame >= myWaveFrame && frame < myWaveFrame + 6;
                    return (
                        <span 
                            key={i} 
                            className={isWaveFlickering ? "flicker-pulse" : ""} 
                            style={{ 
                                opacity: hasAppeared ? 1 : 0, 
                                marginRight: '0.3em', 
                                display: 'inline-block',
                            }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const BadIdeaScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", color: props.textColor }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '120px',
                fontWeight: 800,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0 100px',
                lineHeight: 1.1,
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline' }}>
                    {props.badIdeaLine1.split(" ").map((word, i) => {
                        const delay = i * 4;
                        const spr = spring({
                            frame: frame - delay,
                            fps,
                            config: { damping: 15, stiffness: 100 },
                        });
                        const scale = i === 0 ? interpolate(spr, [0, 1], [3, 1]) : interpolate(spr, [0, 1], [1.2, 1]);
                        const opacity = interpolate(spr, [0, 0.4], [0, 1]);
                        return (
                            <span key={i} style={{ transform: `scale(${scale})`, opacity, display: 'inline-block', marginRight: '0.3em' }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {props.badIdeaLine2.split(" ").map((word, i) => {
                        const delay = (3 * 4) + (i * 4);
                        const spr = spring({
                            frame: frame - delay,
                            fps,
                            config: { damping: 15, stiffness: 100 },
                        });
                        const scale = interpolate(spr, [0, 1], [1.2, 1]);
                        const opacity = interpolate(spr, [0, 0.4], [0, 1]);
                        return (
                            <span key={i} style={{ transform: `scale(${scale})`, opacity, display: 'inline-block', marginRight: '0.3em' }}>
                                {word}
                            </span>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const EatsMoneyScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", color: props.textColor }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '120px',
                fontWeight: 800,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0 100px',
                lineHeight: 1.1,
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {props.eatsMoneyText.split(" ").map((word, i) => {
                        const delay = i * 4;
                        const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        return (
                            <span key={i} style={{ opacity, marginRight: '0.3em', display: 'inline-block' }}>
                                {word}
                            </span>
                        );
                    })}
                    {(() => {
                        const word = props.eatsMoneyWord;
                        const delay = (props.eatsMoneyText.split(" ").length * 4) + 4;
                        const opacity = interpolate(frame, [delay, delay + 1], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        const eatStart = delay;
                        const eatProgress = interpolate(frame, [eatStart, eatStart + 40], [0, 0.85], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        });
                        return (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <span style={{ 
                                    opacity, 
                                    display: 'inline-block',
                                    clipPath: `inset(0 ${Math.min(eatProgress * 100, 100)}% 0 0)`,
                                }}>
                                    {word}
                                </span>
                                {frame >= eatStart && (
                                    <PacMan 
                                        direction="left"
                                        color={props.accentColor}
                                        size={180}
                                        style={{
                                            left: `${(1 - eatProgress) * 100}%`,
                                            top: '50%',
                                            transform: `translate(-50%, -50%) rotate(180deg)`,
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })()}
                </div>

                {[
                    { pos: { top: '100px', left: '100px' }, dir: 'right' },
                    { pos: { top: '100px', right: '100px' }, dir: 'down' },
                    { pos: { bottom: '100px', right: '100px' }, dir: 'left' },
                    { pos: { bottom: '100px', left: '100px' }, dir: 'up' },
                ].map((config, idx) => {
                    const move = interpolate(frame, [0, 100], [0, 500]);
                    const dots = [1, 2, 3, 4, 5, 6, 7];
                    return (
                        <div key={idx} style={{ position: 'absolute', ...config.pos }}>
                            {dots.map(d => {
                                const dotPos = d * 70;
                                if (move > dotPos) return null;
                                return (
                                    <div key={d} style={{
                                        position: 'absolute',
                                        width: '35px',
                                        height: '35px',
                                        backgroundColor: props.accentColor,
                                        borderRadius: '50%',
                                        left: config.dir === 'right' ? dotPos : config.dir === 'left' ? -dotPos : 0,
                                        top: config.dir === 'up' ? -dotPos : config.dir === 'down' ? dotPos : 0,
                                    }} />
                                );
                            })}
                            <PacMan 
                                direction={config.dir as any}
                                color={props.accentColor}
                                size={100}
                                style={{
                                    left: config.dir === 'right' ? move : config.dir === 'left' ? -move : 0,
                                    top: config.dir === 'up' ? -move : config.dir === 'down' ? move : 0,
                                    transform: `translate(-50%, -50%) rotate(${
                                        config.dir === 'right' ? 0 : 
                                        config.dir === 'left' ? 180 : 
                                        config.dir === 'up' ? 270 : 90
                                    }deg)`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const WordScene: React.FC<{ text: string, color: string }> = ({ text, color }) => (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", color }}>
        <div style={{ fontSize: '280px', fontWeight: 800, textAlign: 'center', width: '100%', textTransform: 'uppercase' }}>
            {text}
        </div>
    </AbsoluteFill>
);

const BrandIntroScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const logoDelay = 15;
    const logoSpr = spring({
        frame: frame - logoDelay,
        fps,
        config: { damping: 12, stiffness: 100 },
    });
    let logoScale = interpolate(logoSpr, [0, 1], [0, 1]);
    const clickStart = 45;
    const clickPeak = 55;
    const clickEnd = 60;
    if (frame >= clickStart) {
        const clickProgress = interpolate(frame, [clickStart, clickPeak, clickEnd], [1, 1.6, 1], { extrapolateRight: 'clamp' });
        logoScale *= clickProgress;
    }
    const exitStart = 55;
    const exitDuration = 10;
    const exitProgress = interpolate(frame, [exitStart, exitStart + exitDuration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const meetTranslateX = -exitProgress * 2000;
    const brandTranslateX = exitProgress * 2000;
    const meetOpacity = interpolate(exitProgress, [0, 0.3], [1, 0]);
    const brandOpacity = interpolate(exitProgress, [0, 0.3], [1, 0]);
    const logoOpacity = interpolate(frame, [55, 58], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const spacerWidth = interpolate(logoSpr, [0, 1], [30, 200]);

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", color: props.textColor }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: '120px',
                fontWeight: 800,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0 100px',
                lineHeight: 1.2,
            }}>
                <span style={{ 
                    opacity: meetOpacity * interpolate(frame, [0, 1], [0, 1], { extrapolateLeft: 'clamp' }),
                    transform: `translateX(${meetTranslateX}px)`,
                    display: 'inline-block' 
                }}>
                    {props.meetText}
                </span>
                <div style={{ width: spacerWidth, height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'visible', opacity: logoOpacity }}>
                    <div style={{ transform: `scale(${logoScale})`, width: '150px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Img src={getSrc(props.logo)} style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>
                <span style={{ 
                    opacity: brandOpacity * interpolate(frame, [6, 7], [0, 1], { extrapolateLeft: 'clamp' }),
                    transform: `translateX(${brandTranslateX}px)`,
                    display: 'inline-block' 
                }}>
                    {props.brandName}
                </span>
            </div>
        </AbsoluteFill>
    );
};

const AIExpertScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const imgEntranceSpr = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
    const textStart = 75;
    const transitionStart = 150;
    const transitionEnd = 175;
    const swapFrame = 162;
    const initialRotateY = interpolate(frame, [0, 40], [0, 360], { extrapolateRight: 'clamp' });
    const transitionRotateY = interpolate(frame, [transitionStart, transitionEnd], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const imgRotateY = initialRotateY + transitionRotateY;
    const imgTranslateY = interpolate(imgEntranceSpr, [0, 1], [800, 0]);
    const imgOpacity = interpolate(imgEntranceSpr, [0, 0.5], [0, 1]);
    const imgLeft = interpolate(frame, [0, 40, 60, transitionStart, transitionEnd], [50, 50, 80, 80, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const textOpacity = interpolate(frame, [transitionStart, transitionStart + 10], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const textDisplayDelay = transitionEnd + 10;
    const newTextOpacity = interpolate(frame, [textDisplayDelay, textDisplayDelay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
            <div style={{
                position: 'absolute',
                left: `${imgLeft}%`,
                top: '50%',
                transform: `translate(-50%, -50%) translateY(${imgTranslateY}px) rotateY(${imgRotateY}deg)`,
                width: '45%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: imgOpacity,
                zIndex: 2,
            }}>
                <Img 
                    src={frame >= swapFrame ? getSrc(props.analyticsImage) : getSrc(props.mockup1)}
                    style={{ 
                        height: '1000px',
                        width: 'auto',
                        transform: (transitionRotateY > 90 && transitionRotateY < 270) ? 'scaleX(-1)' : 'none'
                    }} 
                />
            </div>

            <div style={{ position: 'absolute', left: '120px', top: '160px', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1, opacity: textOpacity }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontSize: '120px', fontWeight: 800, lineHeight: 1.05, textAlign: 'left', color: props.textColor }}>
                    {props.aiExpertTitle.split(" ").map((word, i) => {
                        const delay = textStart + (i * 4);
                        const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
                        const translateY = interpolate(spr, [0, 1], [50, 0]);
                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        return <span key={i} style={{ display: 'inline-block', marginRight: '0.3em', transform: `translateY(${translateY}px)`, opacity }}>{word}</span>;
                    })}
                </div>
                {(() => {
                    const spr = spring({ frame: frame - (textStart + 40), fps, config: { damping: 15, stiffness: 100 } });
                    const opacity = interpolate(spr, [0, 1], [0, 0.7]);
                    const translateY = interpolate(spr, [0, 1], [20, 0]);
                    return <div style={{ fontSize: '50px', fontWeight: 600, marginTop: '50px', color: props.textColor, opacity, transform: `translateY(${translateY}px)` }}>{props.aiExpertSub}</div>;
                })()}
            </div>

            <div style={{ position: 'absolute', right: '120px', top: '200px', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1, opacity: newTextOpacity }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontSize: '100px', fontWeight: 800, lineHeight: 1.1, color: props.textColor }}>
                    {props.scoreTitle.split(" ").map((word, i) => {
                        const delay = textDisplayDelay + (i * 4);
                        const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
                        const translateY = interpolate(spr, [0, 1], [50, 0]);
                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        return <span key={i} style={{ display: 'inline-block', marginRight: '0.3em', transform: `translateY(${translateY}px)`, opacity }}>{word}</span>;
                    })}
                </div>
                {(() => {
                    const subtitleDelay = textDisplayDelay + (props.scoreTitle.split(" ").length * 4) + 10;
                    const spr = spring({ frame: frame - subtitleDelay, fps, config: { damping: 15, stiffness: 100 } });
                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    const translateY = interpolate(spr, [0, 1], [20, 0]);
                    return <div style={{ fontSize: '50px', fontWeight: 600, marginTop: '50px', color: props.textColor, opacity, transform: `translateY(${translateY}px)` }}>{props.scoreSub}</div>;
                })()}
            </div>
        </AbsoluteFill>
    );
};

const ScanScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const textStart = 5;
    const flip1End = 20, flip2Start = 40, flip2End = 60, flip3Start = 80, flip3End = 100;
    let currentRotation = 0, currentImg = props.analyticsImage;
    if (frame < flip1End) {
        currentRotation = interpolate(frame, [0, flip1End], [0, 180]);
        currentImg = frame < 10 ? props.analyticsImage : props.receiptImage;
    } else if (frame < flip2Start) {
        currentRotation = 180;
        currentImg = props.receiptImage;
    } else if (frame < flip2End) {
        currentRotation = interpolate(frame, [flip2Start, flip2End], [180, 360]);
        currentImg = frame < 50 ? props.receiptImage : props.smsImage;
    } else if (frame < flip3Start) {
        currentRotation = 360;
        currentImg = props.smsImage;
    } else if (frame < flip3End) {
        currentRotation = interpolate(frame, [flip3Start, flip3End], [360, 540]);
        currentImg = frame < 90 ? props.smsImage : props.quickAddImage;
    } else {
        currentRotation = 540;
        currentImg = props.quickAddImage;
    }
    const words = props.scanTitle.split(" ");
    const subtitleDelay = textStart + (words.length * 4) + 8;

    return (
        <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
            <div style={{ position: 'absolute', left: '20%', top: '50%', transform: `translate(-50%, -50%) rotateY(${currentRotation}deg)`, width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                <Img src={getSrc(currentImg)} style={{ height: '1000px', width: 'auto', transform: (Math.floor((currentRotation + 90) / 180) % 2 === 1) ? 'scaleX(-1)' : 'none' }} />
            </div>
            <div style={{ position: 'absolute', right: '120px', top: '200px', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontSize: '100px', fontWeight: 800, lineHeight: 1.1, color: props.textColor }}>
                    {words.map((word, i) => {
                        const delay = textStart + (i * 4);
                        const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
                        const translateY = interpolate(spr, [0, 1], [50, 0]);
                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        return <span key={i} style={{ display: 'inline-block', marginRight: '0.3em', transform: `translateY(${translateY}px)`, opacity }}>{word}</span>;
                    })}
                </div>
                {(() => {
                    const spr = spring({ frame: frame - subtitleDelay, fps, config: { damping: 15, stiffness: 100 } });
                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    const translateY = interpolate(spr, [0, 1], [20, 0]);
                    return <div style={{ fontSize: '50px', fontWeight: 600, marginTop: '50px', color: props.textColor, opacity, transform: `translateY(${translateY}px)` }}>{props.scanSub}</div>;
                })()}
            </div>
        </AbsoluteFill>
    );
};

const CompeteScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const imgOpacity = interpolate(frame, [0, 3], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const words = props.competeTitle.split(" ");
    const subtitleDelay = 15 + (words.length * 4) + 8;

    return (
        <AbsoluteFill style={{ padding: '80px', perspective: '1200px' }}>
            <div style={{ position: 'absolute', left: '20%', top: '50%', transform: `translate(-50%, -50%) rotateY(540deg)`, width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2, opacity: imgOpacity }}>
                <Img src={getSrc(props.quickAddImage)} style={{ height: '1000px', width: 'auto', transform: 'scaleX(-1)' }} />
            </div>
            <div style={{ position: 'absolute', left: '16%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
                {(() => {
                    const spr = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
                    const translateX = interpolate(spr, [0, 1], [-200, 0]);
                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    return <Img src={getSrc(props.leaderboard1)} style={{ height: '900px', width: 'auto', transform: `translateX(${translateX}px)`, opacity }} />;
                })()}
            </div>
            <div style={{ position: 'absolute', right: '16%', top: '50%', transform: 'translate(50%, -50%)', zIndex: 3 }}>
                {(() => {
                    const spr = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
                    const translateX = interpolate(spr, [0, 1], [200, 0]);
                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    return <Img src={getSrc(props.leaderboard2)} style={{ height: '900px', width: 'auto', transform: `translateX(${translateX}px)`, opacity }} />;
                })()}
            </div>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '40%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', fontSize: '100px', fontWeight: 800, lineHeight: 1.1, color: props.textColor, justifyContent: 'center', textAlign: 'center' }}>
                    {words.map((word, i) => {
                        const delay = 15 + (i * 4);
                        const spr = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
                        const translateY = interpolate(spr, [0, 1], [50, 0]);
                        const opacity = interpolate(spr, [0, 1], [0, 1]);
                        return <span key={i} style={{ display: 'inline-block', marginRight: '0.3em', transform: `translateY(${translateY}px)`, opacity }}>{word}</span>;
                    })}
                </div>
                {(() => {
                    const spr = spring({ frame: frame - subtitleDelay, fps, config: { damping: 15, stiffness: 100 } });
                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    const translateY = interpolate(spr, [0, 1], [20, 0]);
                    return <div style={{ fontSize: '45px', fontWeight: 600, marginTop: '40px', color: props.textColor, opacity, transform: `translateY(${translateY}px)`, textAlign: 'center', width: '80%' }}>{props.competeSub}</div>;
                })()}
            </div>
        </AbsoluteFill>
    );
};

const FinalScene: React.FC<{ props: AppLaunchProps }> = ({ props }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const moveDuration = 15;
    const imgLeft = interpolate(frame, [0, moveDuration], [50, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const imgRotate = interpolate(frame, [0, moveDuration], [10, -5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const brandStart = moveDuration + 3;
    const flashStart = brandStart + 16 + 25;
    const flash1 = flashStart + 4, flash2 = flashStart + 8, flash3 = flashStart + 12, flash4 = flashStart + 16;
    let flashBg = props.backgroundColor, flashText = props.textColor;
    if (frame >= flashStart && frame < flash1) { flashBg = '#22c55e'; flashText = '#ffffff'; }
    else if (frame >= flash1 && frame < flash2) { flashBg = '#eab308'; flashText = '#000000'; }
    else if (frame >= flash2 && frame < flash3) { flashBg = '#ef4444'; flashText = '#ffffff'; }
    else if (frame >= flash3 && frame < flash4) { flashBg = '#ec4899'; flashText = '#000000'; }
    else if (frame >= flash4) { flashBg = '#f97316'; flashText = '#ffffff'; }

    return (
        <AbsoluteFill style={{ padding: '100px', backgroundColor: flashBg }}>
            <div style={{ position: 'absolute', left: `${imgLeft}%`, top: `53%`, transform: `translate(-50%, -50%) rotate(${imgRotate}deg)`, width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
                <Img src={getSrc(props.finalMockup)} style={{ height: '1120px', width: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }} />
            </div>
            <div style={{ position: 'absolute', left: '160px', top: '50%', transform: `translateY(-50%)`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 1 }}>
                {(() => {
                    const spr = spring({ frame: frame - brandStart, fps, config: { damping: 15, stiffness: 100 } });
                    const opacity = interpolate(spr, [0, 1], [0, 1]);
                    const translateY = interpolate(spr, [0, 1], [40, 0]);
                    return (
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', opacity, transform: `translateY(${translateY}px)` }}>
                            <Img src={getSrc(props.logo)} style={{ width: '140px', height: '140px', marginRight: '30px' }} />
                            <div style={{ fontSize: '120px', fontWeight: 700, color: flashText, letterSpacing: '-2px' }}>{props.brandName}</div>
                        </div>
                    );
                })()}
                {(() => {
                    const spr = spring({ frame: frame - (brandStart + 8), fps, config: { damping: 15, stiffness: 100 } });
                    const opacity = interpolate(spr, [0, 1], [0, 0.8]);
                    const translateY = interpolate(spr, [0, 1], [30, 0]);
                    return <div style={{ fontSize: '55px', fontWeight: 600, color: flashText, marginBottom: '60px', opacity, transform: `translateY(${translateY}px)` }}>{props.finalTagline}</div>;
                })()}
                <div style={{ opacity: interpolate(spring({ frame: frame - (brandStart + 16), fps }), [0, 1], [0, 1]) }}>
                    <Img src="https://freelogopng.com/images/all_img/1664287128google-play-store-logo-png.png" style={{ height: '140px', width: 'auto' }} />
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Main Component
export const AppLaunch: React.FC<AppLaunchProps> = (props) => {
    const inflationWords = props.calledInflationText.split(" ");
    const fifthWordInterval = 16;
    const allWordsDone = (inflationWords.length - 1) * fifthWordInterval;
    const waveStagger = 4;
    const waveEnd = allWordsDone + 15 + ((inflationWords.length - 1) * waveStagger) + 6;

    const timings = {
        intro: 60,
        notRent: 30,
        notEmi: 30,
        worksStealing: 160,
        inflationText: waveEnd,
        transitionVideo: 75,
        badIdea: 60,
        eatsMoney: 60,
        every: 15,
        single: 15,
        month: 15,
        brandIntro: 60,
        aiExpert: 280,
        scan: 108,
        compete: 90,
        final: 200
    };

    return (
        <AbsoluteFill style={{ fontFamily: "'Geist', sans-serif", backgroundColor: props.backgroundColor }}>
            {/* Background Fill for circle scenes */}
            <Sequence durationInFrames={timings.intro + timings.notRent + timings.notEmi}>
                <AbsoluteFill>
                    {/* The IntroScene renders the black expanding circle over this cream background */}
                </AbsoluteFill>
            </Sequence>

            <Sequence durationInFrames={timings.intro}>
                <IntroScene props={props} />
            </Sequence>
            
            <Sequence from={timings.intro} durationInFrames={timings.notRent}>
                <TextScene text={props.notRentText} color={props.secondaryTextColor} backgroundColor={props.secondaryBackgroundColor} />
            </Sequence>

            <Sequence from={timings.intro + timings.notRent} durationInFrames={timings.notEmi}>
                <TextScene text={props.notEmiText} color={props.secondaryTextColor} backgroundColor={props.secondaryBackgroundColor} />
            </Sequence>

            <Sequence from={timings.intro + timings.notRent + timings.notEmi} durationInFrames={timings.worksStealing}>
                <WorksStealingScene props={props} />
            </Sequence>

            <Sequence from={timings.intro + timings.notRent + timings.notEmi + timings.worksStealing + 10} durationInFrames={timings.inflationText}>
                <InflationTextScene props={props} />
            </Sequence>

            {(() => {
                const nextStart = timings.intro + timings.notRent + timings.notEmi + timings.worksStealing + 10 + timings.inflationText;
                return (
                    <Sequence from={nextStart} durationInFrames={timings.transitionVideo}>
                        <AbsoluteFill>
                            <Video src={getSrc(props.transitionVideo)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </AbsoluteFill>
                    </Sequence>
                );
            })()}

            {(() => {
                const nextStart = timings.intro + timings.notRent + timings.notEmi + timings.worksStealing + 10 + timings.inflationText + timings.transitionVideo;
                return (
                    <>
                        <Sequence from={nextStart} durationInFrames={timings.badIdea}><BadIdeaScene props={props} /></Sequence>
                        <Sequence from={nextStart + timings.badIdea} durationInFrames={timings.eatsMoney}><EatsMoneyScene props={props} /></Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney} durationInFrames={timings.every}>
                            <WordScene text={props.everyText} color={props.textColor} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every} durationInFrames={timings.single}>
                            <WordScene text={props.singleText} color={props.textColor} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every + timings.single} durationInFrames={timings.month}>
                            <WordScene text={props.monthText} color={props.textColor} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every + timings.single + timings.month} durationInFrames={timings.brandIntro}>
                            <BrandIntroScene props={props} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every + timings.single + timings.month + timings.brandIntro} durationInFrames={timings.aiExpert}>
                            <AIExpertScene props={props} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every + timings.single + timings.month + timings.brandIntro + timings.aiExpert} durationInFrames={timings.scan}>
                            <ScanScene props={props} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every + timings.single + timings.month + timings.brandIntro + timings.aiExpert + timings.scan} durationInFrames={timings.compete}>
                            <CompeteScene props={props} />
                        </Sequence>
                        <Sequence from={nextStart + timings.badIdea + timings.eatsMoney + timings.every + timings.single + timings.month + timings.brandIntro + timings.aiExpert + timings.scan + timings.compete} durationInFrames={timings.final}>
                            <FinalScene props={props} />
                        </Sequence>
                    </>
                );
            })()}

            {/* Noise Overlay */}
            <AbsoluteFill style={{ backgroundImage: `url("${noiseUrl}")`, pointerEvents: 'none', opacity: 1, zIndex: 1000 }} />

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </AbsoluteFill>
    );
};