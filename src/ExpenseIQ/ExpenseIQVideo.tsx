import React from 'react';
import { Sequence } from 'remotion';
import { FirstFrame } from './FirstFrame';

export const ExpenseIQVideo: React.FC = () => {
    return (
        <>
            <Sequence durationInFrames={90}>
                <FirstFrame />
            </Sequence>
        </>
    );
};
