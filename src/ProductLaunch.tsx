import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
} from 'remotion';
import { z } from 'zod';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

export const productLaunchSchema = z.object({
	primaryColor: z.string(),
	secondaryColor: z.string(),
	backgroundColor: z.string(),
	textColor: z.string(),
	title: z.string(),
	subtitle: z.string(),
	featureText1: z.string(),
	featureText2: z.string(),
	ctaText: z.string(),
	logoUrl: z.string().optional(),
});

type ProductLaunchProps = z.infer<typeof productLaunchSchema>;

export const defaultProps: ProductLaunchProps = {
	primaryColor: '#2563eb',
	secondaryColor: '#60a5fa',
	backgroundColor: '#0f172a',
	textColor: '#ffffff',
	title: 'Managing electric car charging stations',
	subtitle: "shouldn't be rocket science",
	featureText1: 'Lightning Fast Performance',
	featureText2: 'Beautifully Designed UI',
	ctaText: 'Start Your Free Trial',
};

const Intro: React.FC<{ textColor: string; exitStartFrame: number }> = ({ textColor, exitStartFrame }) => {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();

	const managingSpring = spring({ frame, fps, config: { damping: 12, stiffness: 150 } });
	const managingY = interpolate(managingSpring, [0, 1], [60, 0]);
	const managingOpacity = interpolate(managingSpring, [0, 1], [0, 1]);

	const blinkStart = 10;
	const electricBlink = interpolate(frame, [blinkStart, blinkStart + 2, blinkStart + 4, blinkStart + 6, blinkStart + 8], [0, 1, 0.2, 1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	const wordsStart = 20;
	const carOpacity = interpolate(frame, [wordsStart, wordsStart + 3], [0, 1], { extrapolateLeft: 'clamp' });
	const chargingOpacity = interpolate(frame, [wordsStart + 8, wordsStart + 11], [0, 1], { extrapolateLeft: 'clamp' });
	const stationsOpacity = interpolate(frame, [wordsStart + 16, wordsStart + 19], [0, 1], { extrapolateLeft: 'clamp' });

	const exitProgress = frame - exitStartFrame;
	const exitDuration = 12; 
	const slideRight = frame >= exitStartFrame 
		? interpolate(exitProgress, [0, exitDuration], [0, width + 500], { extrapolateRight: 'clamp' }) 
		: 0;
	
	const otherTextOpacity = frame >= exitStartFrame ? 0 : 1;
	
	return (
		<AbsoluteFill style={{ backgroundColor: '#2563eb', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap', justifyContent: 'center', color: textColor, fontFamily, fontSize: '85px', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, textAlign: 'center' }}>
				<div style={{ opacity: otherTextOpacity, display: 'flex' }}>
					<div style={{ transform: `translateY(${managingY}px)`, opacity: managingOpacity, marginRight: '18px' }}>Managing</div>
					<div style={{ opacity: electricBlink, marginRight: '18px' }}>electric</div>
					<div style={{ opacity: carOpacity, marginRight: '18px' }}>car</div>
					<div style={{ opacity: chargingOpacity, marginRight: '18px' }}>charging</div>
				</div>
				<div style={{ opacity: stationsOpacity, transform: `translateX(${slideRight}px)` }}>stations</div>
			</div>
		</AbsoluteFill>
	);
};

const RocketScience: React.FC<{ textColor: string }> = ({ textColor }) => {
	const frame = useCurrentFrame();
	const { height } = useVideoConfig();
	const words = ["shouldn't", "be", "rocket", "science."];
	
	const carImagesTop = ["https://plus.unsplash.com/premium_photo-1715639312136-56a01f236440?w=600&q=80", "https://plus.unsplash.com/premium_photo-1715789261470-fb25ffbf70d3?w=600&q=80", "https://images.unsplash.com/photo-1704475336842-0ab3798abf0e?w=600&q=80", "https://images.unsplash.com/photo-1617886322009-e02db73a70ee?w=600&q=80"];
	const carImagesBottom = ["https://images.unsplash.com/photo-1607171028974-319ba56cb013?w=600&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?w=600&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&auto=format&fit=crop&q=80", "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80"];

	const textCompleteFrame = 20;
	const crunchDelay = 45; 
	const snapStart = textCompleteFrame + crunchDelay;
	const scatterStart = snapStart + 5; 
	const textShowStart = scatterStart + 15;
	const intimidatingStart = textShowStart + 30;

	// Initial horizontal drift: Top moves Right, Bottom moves Left
	const initialTopX = frame * 3; // Drifting right
	const initialBottomX = frame * 3; // Container is right-aligned, so increasing 'right' moves it left
	
	const topY = interpolate(frame, [snapStart, scatterStart, scatterStart + 10], [20, height / 2 - 175, -800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const bottomY = interpolate(frame, [snapStart, scatterStart, scatterStart + 10], [height - 370, height / 2 - 175, height + 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	return (
		<AbsoluteFill style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			{frame < snapStart && (
				<div style={{ display: 'flex', gap: '18px', fontSize: '85px', fontWeight: 900, color: textColor, fontFamily, letterSpacing: '-0.03em' }}>
					{words.map((word, i) => <div key={i} style={{ opacity: interpolate(frame, [i * 5, i * 5 + 4], [0, 1], { extrapolateLeft: 'clamp' }) }}>{word}</div>)}
				</div>
			)}
			
			{frame >= textShowStart && (
				<div style={{ fontSize: '120px', fontWeight: 900, color: textColor, fontFamily, letterSpacing: '-0.05em', textAlign: 'center' }}>
					{frame < intimidatingStart ? "complicated" : "intimidating"}
				</div>
			)}

			<div style={{ position: 'absolute', top: topY, left: initialTopX, display: 'flex', gap: '20px', width: '300%' }}>
				{[...carImagesTop, ...carImagesTop, ...carImagesTop].map((img, i) => <Img key={i} src={img} style={{ width: '450px', height: '350px', objectFit: 'cover', borderRadius: '32px' }} />)}
			</div>
			<div style={{ position: 'absolute', top: bottomY, right: initialBottomX, display: 'flex', gap: '20px', width: '300%' }}>
				{[...carImagesBottom, ...carImagesBottom, ...carImagesBottom].map((img, i) => <Img key={i} src={img} style={{ width: '450px', height: '350px', objectFit: 'cover', borderRadius: '32px' }} />)}
			</div>
		</AbsoluteFill>
	);
};

const ChareScene: React.FC<{ textColor: string }> = ({ textColor }) => {
	const frame = useCurrentFrame();
	
	const showChare = frame >= 25;
	const chareDuration = 36; // 1.2s total (original 600ms + extra 600ms)

	return (
		<AbsoluteFill style={{ backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center' }}>
			{!showChare && (
				<div style={{ fontSize: '140px', fontWeight: 900, color: textColor, fontFamily, letterSpacing: '-0.03em', textAlign: 'center' }}>
					so we built
				</div>
			)}
			{showChare && frame < 25 + chareDuration && (
				<div style={{ fontSize: '200px', fontWeight: 900, color: textColor, fontFamily, letterSpacing: '-0.05em', textAlign: 'center' }}>
					Chare
				</div>
			)}
		</AbsoluteFill>
	);
};

const SoftwareScene: React.FC<{ textColor: string }> = ({ textColor }) => {
	const frame = useCurrentFrame();
	const words = ["its", "the", "charging", "management", "software"];
	const chargingFlicker = interpolate(frame, [15, 17, 19, 21, 23], [0, 1, 0.2, 1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	return (
		<AbsoluteFill style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ display: 'flex', gap: '20px', fontSize: '80px', fontWeight: 900, color: textColor, fontFamily, letterSpacing: '-0.03em', flexWrap: 'wrap', justifyContent: 'center', padding: '0 40px' }}>
				{words.map((word, i) => {
					const opacity = i === 2 ? chargingFlicker : interpolate(frame, [i * 6, i * 6 + 5], [0, 1], { extrapolateLeft: 'clamp' });
					return <div key={i} style={{ opacity }}>{word}</div>;
				})}
			</div>
		</AbsoluteFill>
	);
};

const Outro: React.FC<{ textColor: string }> = ({ textColor }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const springAnim = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

	return (
		<AbsoluteFill style={{ backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center' }}>
			<div style={{ fontSize: '120px', fontWeight: 900, color: textColor, fontFamily, letterSpacing: '-0.03em', transform: `scale(${springAnim})` }}>
				Join the future.
			</div>
		</AbsoluteFill>
	);
};

export const ProductLaunch: React.FC<ProductLaunchProps> = (props) => {
	const introFrames = 60;
	const stationsExitFrames = 12; 
	const rocketScienceDuration = 140; 
	const chareDuration = 61; // so we built (25) + Chare (36)
	const softwareDuration = 45; // Cuts instantly after text ends (5 words * 6 frames + buffer)
	const outroDuration = 30; // Exactly 1 sec

	const rocketStart = introFrames + stationsExitFrames;
	const chareStart = rocketStart + rocketScienceDuration;
	const softwareStart = chareStart + chareDuration;
	const outroStart = softwareStart + softwareDuration;

	return (
		<AbsoluteFill style={{ backgroundColor: props.backgroundColor }}>
			<Sequence durationInFrames={rocketStart}>
				<Intro textColor={props.textColor} exitStartFrame={introFrames} />
			</Sequence>

			<Sequence from={rocketStart} durationInFrames={rocketScienceDuration}>
				<RocketScience textColor={props.textColor} />
			</Sequence>

			<Sequence from={chareStart} durationInFrames={chareDuration}>
				<ChareScene textColor={props.textColor} />
			</Sequence>
			
			<Sequence from={softwareStart} durationInFrames={softwareDuration}>
				<SoftwareScene textColor={props.textColor} />
			</Sequence>

			<Sequence from={outroStart} durationInFrames={outroDuration}>
				<Outro textColor={props.textColor} />
			</Sequence>
		</AbsoluteFill>
	);
};
