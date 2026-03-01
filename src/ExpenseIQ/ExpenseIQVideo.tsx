import React from 'react';
import { Audio, Sequence, Video, staticFile } from 'remotion';
import { FirstFrame } from './FirstFrame';
import { VideoOverlay } from './VideoOverlay';
import { ProsperityFlash } from './ProsperityFlash';

export const ExpenseIQVideo: React.FC = () => {
    // Reduced intro duration to 567 frames to reflect faster final segment
    const videoDuration = 567;

    return (
        <>
            {/* Background Audio */}
            <Audio src={staticFile("bills.wav")} />
            <Sequence from={53}>
                <Audio src={staticFile("subscriptions.wav")} />
            </Sequence>
            <Sequence from={106}>
                <Audio src={staticFile("expenses.wav")} />
            </Sequence>

            {/* Show the expense video for the intro, muted */}
            <Sequence durationInFrames={videoDuration}>
                <Video
                    src={staticFile("expensevideo.mp4")}
                    muted
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    startFrom={0}
                    // video is 540 frames, loop or stay on final frame
                    endAt={567}
                />
                <VideoOverlay />
            </Sequence>

            {/* Prosperity Flash Transition */}
            <Sequence from={videoDuration - 10} durationInFrames={20}>
                <ProsperityFlash />
            </Sequence>

            {/* Show the What if animation after the refined intro */}
            <Sequence from={videoDuration} durationInFrames={300}>
                <FirstFrame />
            </Sequence>
        </>
    );
};
