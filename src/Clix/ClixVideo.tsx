import React from 'react';
import { Sequence } from 'remotion';
import { IntroFrame } from './IntroFrame';

export const ClixVideo: React.FC = () => {
    return (
        <>
            <Sequence durationInFrames={150}>
                <IntroFrame />
            </Sequence>
        </>
    );
};
