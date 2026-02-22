import { Sequence, Video, staticFile } from 'remotion';
import { FirstFrame } from './FirstFrame';
import { VideoOverlay } from './VideoOverlay';

export const ExpenseIQVideo: React.FC = () => {
    const videoDuration = 18 * 30; // 18 seconds * 30 fps = 540 frames

    return (
        <>
            {/* Show the expense video for the first 18 seconds, muted */}
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
                    endAt={videoDuration}
                />
                <VideoOverlay />
            </Sequence>

            {/* Show the What if animation after 18 seconds */}
            <Sequence from={videoDuration} durationInFrames={300}>
                <FirstFrame />
            </Sequence>
        </>
    );
};
