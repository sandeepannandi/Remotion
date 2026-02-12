import {
    AbsoluteFill,
    Audio,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    spring,
    staticFile,
} from "remotion";
import React from "react";

export const MarketingVideo: React.FC<{
    name: string;
    role: string;
}> = ({ name, role }) => {
    // Animations
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Hi Entrance (0-10)
    const hiEntrance = spring({
        frame,
        fps,
        config: { damping: 20, stiffness: 200 },
    });

    // 2. Hi moves left & "my" appears (12-22)
    const shiftProgress = spring({
        frame: frame - 12,
        fps,
        config: { damping: 20, stiffness: 200 },
    });

    const myEntrance = spring({
        frame: frame - 12,
        fps,
        config: { damping: 20, stiffness: 200 },
    });

    // 3. First Flip: "Hi, my" -> "name is" (19-35)
    // Reduced arrival by 0.3s (-9 frames from 28)
    const rotationProgress1 = spring({
        frame: frame - 19,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 4. Second Flip: "name is" -> "Sandeepan" (32-47)
    // Reduced arrival by an additional 0.3s (-9 frames from 41)
    const rotationProgress2 = spring({
        frame: frame - 32,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 5. Third Flip: "Sandeepan" -> "& i make" (57-72)
    // Delayed by an additional 9 frames (0.3s) + previous offsets
    const rotationProgress3 = spring({
        frame: frame - 57,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 6. Fourth Flip: "& i make" -> "websites" (74-89)
    // Shifted by +6 frames
    const rotationProgress4 = spring({
        frame: frame - 74,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 7. website1 entrance (111-126) - Extended by 0.2s (6 frames)
    const website1Entrance = spring({
        frame: frame - 111,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 8. website2 entrance + website1 3D exit (156-171) - Extended by 0.15s (5 frames)
    const website2Entrance = spring({
        frame: frame - 156,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 9. website3 entrance (201-216)
    const website3Entrance = spring({
        frame: frame - 201,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 10. website4 entrance (246-261)
    const website4Entrance = spring({
        frame: frame - 246,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 11. website5 entrance (291-306)
    const website5Entrance = spring({
        frame: frame - 291,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 12. website6 entrance (336-351)
    const website6Entrance = spring({
        frame: frame - 336,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 13. website7 entrance (381-396)
    const website7Entrance = spring({
        frame: frame - 381,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 14. website8 entrance (426-441)
    const website8Entrance = spring({
        frame: frame - 426,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 15. website9 entrance (471-486)
    const website9Entrance = spring({
        frame: frame - 471,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 16. website10 entrance (516-531)
    const website10Entrance = spring({
        frame: frame - 516,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 17. website11 entrance (561-576)
    const website11Entrance = spring({
        frame: frame - 561,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 18. website12 entrance (606-621) - Reset to 45 frame gap
    const website12Entrance = spring({
        frame: frame - 606,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 19. website13 entrance (651-666)
    const website13Entrance = spring({
        frame: frame - 651,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 20. website14 entrance (696-711)
    const website14Entrance = spring({
        frame: frame - 696,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 21. apps entrance (744-759) - Reduced Website 14 show by 0.2s + 0.2s
    const appsEntrance = spring({
        frame: frame - 744,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 22. app1 entrance (800-815)
    const app1Entrance = spring({
        frame: frame - 800,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 23. app2 entrance (840-855) - Delay reduced by another 0.15s (4 frames)
    const app2Entrance = spring({
        frame: frame - 840,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 24. app3 entrance (880-895) - Delay reduced by another 0.15s (4 frames)
    const app3Entrance = spring({
        frame: frame - 880,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 25. Apps 1-3 Exit (Staggered 0.1s = 3 frames)
    const app1Exit = spring({
        frame: frame - 948,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app2Exit = spring({
        frame: frame - 951,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app3Exit = spring({
        frame: frame - 954,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 26. Apps 4-6 Entrance (Synchronized with 1-3 Exit, 0.1s stagger)
    const app4Entrance = spring({
        frame: frame - 948,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app5Entrance = spring({
        frame: frame - 951,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app6Entrance = spring({
        frame: frame - 954,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 27. Apps 4-6 Exit (Staggered 0.1s = 3 frames)
    const app4Exit = spring({
        frame: frame - 1009,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app5Exit = spring({
        frame: frame - 1012,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app6Exit = spring({
        frame: frame - 1015,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 28. Apps 7-9 Entrance (Synchronized with 4-6 Exit, 0.1s stagger)
    const app7Entrance = spring({
        frame: frame - 1009,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app8Entrance = spring({
        frame: frame - 1012,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app9Entrance = spring({
        frame: frame - 1015,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 29. Apps 7-9 Exit (Simultaneous - Reduced delay)
    const app7Exit = spring({
        frame: frame - 1070,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app8Exit = spring({
        frame: frame - 1070,
        fps,
        config: { damping: 20, stiffness: 150 },
    });
    const app9Exit = spring({
        frame: frame - 1070,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 30. Apps 10-11 Entrance (Bouncy, Simultaneous)
    const app10Entrance = spring({
        frame: frame - 1070,
        fps,
        config: { damping: 13, stiffness: 100 },
    });
    const app11Entrance = spring({
        frame: frame - 1070,
        fps,
        config: { damping: 13, stiffness: 100 },
    });

    // 31. Duo Flip 1 (10/11 -> 12/13) at frame 1130
    const flipDuo1 = spring({
        frame: frame - 1130,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 32. Duo Flip 2 (12/13 -> 14/15) at frame 1190
    const flipDuo2 = spring({
        frame: frame - 1190,
        fps,
        config: { damping: 20, stiffness: 150 },
    });

    // 33. Final Reveal (Zoom Out Apps) at frame 1240
    const finalReveal = spring({
        frame: frame - 1240,
        fps,
        config: { damping: 20, stiffness: 200 }, // Increased stiffness
    });

    // 34. Finale Text Sequence
    const finaleSpringConfig = { damping: 20, stiffness: 200 };

    const butEntrance = spring({
        frame: frame - 1240,
        fps,
        config: finaleSpringConfig,
    });

    const reallyEntrance = spring({
        frame: frame - 1250,
        fps,
        config: finaleSpringConfig,
    });

    const butReallyFlipExit = spring({
        frame: frame - 1280,
        fps,
        config: finaleSpringConfig,
    });

    const iWordSpring = spring({
        frame: frame - 1280, // Instant handover from butReallyFlipExit
        fps,
        config: finaleSpringConfig,
    });

    const justWordSpring = spring({
        frame: frame - 1286,
        fps,
        config: finaleSpringConfig,
    });

    const buildWordSpring = spring({
        frame: frame - 1298,
        fps,
        config: finaleSpringConfig,
    });

    const buildSentenceExitFlip = spring({
        frame: frame - 1350,
        fps,
        config: finaleSpringConfig,
    });

    const socialHandleFlip = spring({
        frame: frame - 1350, // Instant handover from buildSentenceExitFlip
        fps,
        config: finaleSpringConfig,
    });

    // Transforms
    const hiScale = hiEntrance;
    const hiRotate = interpolate(hiEntrance, [0, 1], [-45, 0]);
    // Shift left
    const hiXShift = interpolate(shiftProgress, [0, 1], [0, -140]);
    const myXShift = 140;

    // Transition 1 Values (Hi,my -> name is)
    const outRotation1 = interpolate(rotationProgress1, [0, 1], [0, -90]);
    const inRotation1 = interpolate(rotationProgress1, [0, 1], [90, 0]);
    const outOpacity1 = interpolate(rotationProgress1, [0, 0.5], [1, 0]);
    const inOpacity1 = interpolate(rotationProgress1, [0.5, 1], [0, 1]);

    // Transition 2 Values (name is -> Sandeepan)
    const outRotation2 = interpolate(rotationProgress2, [0, 1], [0, -90]);
    const inRotation2 = interpolate(rotationProgress2, [0, 1], [90, 0]);
    const inOpacity2 = interpolate(rotationProgress2, [0.5, 1], [0, 1]);

    // Transition 3 Values (Sandeepan -> & i make) - Slide + Fade
    const sandeepanXOut = interpolate(rotationProgress3, [0, 1], [0, -400]);
    const makeXIn = interpolate(rotationProgress3, [0, 1], [400, 0]);
    const sandeepanOpacityOut = interpolate(rotationProgress3, [0, 0.5], [1, 0]);
    const makeOpacityIn = interpolate(rotationProgress3, [0.2, 1], [0, 1]);

    // Transition 4 Values (& i make -> websites) - Zoom
    const makeZoomOut = interpolate(rotationProgress4, [0, 1], [1, 0]);
    const websiteZoomIn = interpolate(rotationProgress4, [0, 1], [5, 1]);
    const websiteOpacityIn = interpolate(rotationProgress4, [0.2, 1], [0, 1]);

    // Website Showcase Transforms
    // 1. websites text slides up
    const websitesTextY = interpolate(website1Entrance, [0, 1], [0, -400]);

    // 2. website1 slides in from bottom
    const website1Y = interpolate(website1Entrance, [0, 1], [1080, 0]);

    // 3. website1 -> website2 (3D Rotate Left)
    const website1RotateY = interpolate(website2Entrance, [0, 1], [0, -90]);
    const website1OpacityOut = interpolate(website2Entrance, [0, 0.5], [1, 0]);

    const website2OpacityIn = interpolate(website2Entrance, [0.5, 1], [0, 1]);
    const website2RotateYIn = interpolate(website2Entrance, [0, 1], [90, 0]);

    // 4. website2 -> website3 (3D Rotate Left - Matches 1->2)
    const website2RotateYOut = interpolate(website3Entrance, [0, 1], [0, -90]);
    const website2OpacityOut = interpolate(website3Entrance, [0, 0.5], [1, 0]);

    const website3OpacityIn = interpolate(website3Entrance, [0.5, 1], [0, 1]);
    const website3RotateYIn = interpolate(website3Entrance, [0, 1], [90, 0]);

    // 5. website3 -> website4 (3D Rotate Up - X Axis)
    const website3RotateXOut = interpolate(website4Entrance, [0, 1], [0, -90]);
    const website3OpacityOut = interpolate(website4Entrance, [0, 0.5], [1, 0]);

    const website4OpacityIn = interpolate(website4Entrance, [0.5, 1], [0, 1]);
    const website4RotateXIn = interpolate(website4Entrance, [0, 1], [90, 0]);

    // 6. website4 -> website5 (3D Rotate Up - X Axis)
    const website4RotateXOut = interpolate(website5Entrance, [0, 1], [0, -90]);
    const website4OpacityOut = interpolate(website5Entrance, [0, 0.5], [1, 0]);

    const website5OpacityIn = interpolate(website5Entrance, [0.5, 1], [0, 1]);
    const website5RotateXIn = interpolate(website5Entrance, [0, 1], [90, 0]);

    // 7. website5 -> website6 (3D Rotate Down - X Axis)
    const website5RotateXOut = interpolate(website6Entrance, [0, 1], [0, 90]);
    const website5OpacityOut = interpolate(website6Entrance, [0, 0.5], [1, 0]);

    const website6OpacityIn = interpolate(website6Entrance, [0.5, 1], [0, 1]);
    const website6RotateXIn = interpolate(website6Entrance, [0, 1], [-90, 0]);

    // 8. website6 -> website7 (3D Rotate Down - X Axis)
    const website6RotateXOut = interpolate(website7Entrance, [0, 1], [0, 90]);
    const website6OpacityOut = interpolate(website7Entrance, [0, 0.5], [1, 0]);

    const website7OpacityIn = interpolate(website7Entrance, [0.5, 1], [0, 1]);
    const website7RotateXIn = interpolate(website7Entrance, [0, 1], [-90, 0]);

    // 9. website7 -> website8 (3D Rotate Down - X Axis)
    const website7RotateXOut = interpolate(website8Entrance, [0, 1], [0, 90]);
    const website7OpacityOut = interpolate(website8Entrance, [0, 0.5], [1, 0]);

    const website8OpacityIn = interpolate(website8Entrance, [0.5, 1], [0, 1]);
    const website8RotateXIn = interpolate(website8Entrance, [0, 1], [-90, 0]);

    // 10. website8 -> website9 (Slide Down)
    const website8YOut = interpolate(website9Entrance, [0, 1], [0, 1080]);
    const website8OpacityOut = interpolate(website9Entrance, [0, 0.5], [1, 0]);

    const website9OpacityIn = interpolate(website9Entrance, [0, 1], [0, 1]);
    const website9YIn = interpolate(website9Entrance, [0, 1], [-1080, 0]);

    // 11. website9 -> website10 (Slide Down)
    const website9YOut = interpolate(website10Entrance, [0, 1], [0, 1080]);
    const website9OpacityOut = interpolate(website10Entrance, [0, 0.5], [1, 0]);

    const website10OpacityIn = interpolate(website10Entrance, [0, 1], [0, 1]);
    const website10YIn = interpolate(website10Entrance, [0, 1], [-1080, 0]);

    // 12. website10 -> website11 (Slide Down)
    const website10YOut = interpolate(website11Entrance, [0, 1], [0, 1080]);
    const website10OpacityOut = interpolate(website11Entrance, [0, 0.5], [1, 0]);

    const website11OpacityIn = interpolate(website11Entrance, [0, 1], [0, 1]);
    const website11YIn = interpolate(website11Entrance, [0, 1], [-1080, 0]);

    // 13. website11 -> website12 (Slide Up)
    const website11YOut = interpolate(website12Entrance, [0, 1], [0, -1080]);
    const website11OpacityOut = interpolate(website12Entrance, [0, 0.5], [1, 0]);

    const website12OpacityIn = interpolate(website12Entrance, [0, 1], [0, 1]);
    const website12YIn = interpolate(website12Entrance, [0, 1], [1080, 0]);

    // 14. website12 -> website13 (Slide Up)
    const website12YOut = interpolate(website13Entrance, [0, 1], [0, -1080]);
    const website12OpacityOut = interpolate(website13Entrance, [0, 0.5], [1, 0]);

    const website13OpacityIn = interpolate(website13Entrance, [0, 1], [0, 1]);
    const website13YIn = interpolate(website13Entrance, [0, 1], [1080, 0]);

    // 15. website13 -> website14 (Slide Up)
    const website13YOut = interpolate(website14Entrance, [0, 1], [0, -1080]);
    const website13OpacityOut = interpolate(website14Entrance, [0, 0.5], [1, 0]);

    const website14OpacityIn = interpolate(website14Entrance, [0, 1], [0, 1]);
    const website14YIn = interpolate(website14Entrance, [0, 1], [1080, 0]);

    // 16. website14 -> "& apps" (Zoom Out)
    const website14ZoomOut = interpolate(appsEntrance, [0, 1], [1, 0]);
    const website14OpacityOut = interpolate(appsEntrance, [0, 0.5], [1, 0]);

    const appsOpacityIn = interpolate(appsEntrance, [0.2, 1], [0, 1]);
    const appsZoomIn = interpolate(appsEntrance, [0, 1], [5, 1]);

    // 17. "& apps" -> app1 (Slide Down Text, Slide Top App)
    const appsTextYOut = interpolate(app1Entrance, [0, 1], [0, 1080]);
    const appsTextOpacityOut = interpolate(app1Entrance, [0, 0.5], [1, 0]);

    const app1YIn = interpolate(app1Entrance, [0, 1], [-1080, 0]);
    const app1OpacityIn = interpolate(app1Entrance, [0, 1], [0, 1]);

    // 18. app1 -> app2 (app1 shift left, app2 slide from right)
    // Spacing: 500px between centers
    const app1XShift = interpolate(app2Entrance, [0, 1], [0, -250]);
    const app2XIn = interpolate(app2Entrance, [0, 1], [1920, 250]);
    const app2OpacityIn = interpolate(app2Entrance, [0, 1], [0, 1]);

    // 19. app2 -> app3 (app1/app2 shift left, app3 slide from right)
    const app1XFinalShift = interpolate(app3Entrance, [0, 1], [0, -250]); // total -500
    const app2XShift = interpolate(app3Entrance, [0, 1], [0, -250]); // total 0
    const app3XIn = interpolate(app3Entrance, [0, 1], [1920, 500]);
    const app3OpacityIn = interpolate(app3Entrance, [0, 1], [0, 1]);

    // 20. Apps 1-3 Exit (Slide Down)
    const app1YExit = interpolate(app1Exit, [0, 1], [0, 1080]);
    const app2YExit = interpolate(app2Exit, [0, 1], [0, 1080]);
    const app3YExit = interpolate(app3Exit, [0, 1], [0, 1080]);

    // 21. Apps 4-6 Entrance (Slide From Top - 1-by-1 Replacement)
    const app4YIn = interpolate(app4Entrance, [0, 1], [-1080, 0]);
    const app4OpacityIn = interpolate(app4Entrance, [0, 1], [0, 1]);

    const app5YIn = interpolate(app5Entrance, [0, 1], [-1080, 0]);
    const app5OpacityIn = interpolate(app5Entrance, [0, 1], [0, 1]);

    const app6YIn = interpolate(app6Entrance, [0, 1], [-1080, 0]);
    const app6OpacityIn = interpolate(app6Entrance, [0, 1], [0, 1]);

    // 22. Apps 4-6 Exit (Slide Down)
    const app4YExit = interpolate(app4Exit, [0, 1], [0, 1080]);
    const app5YExit = interpolate(app5Exit, [0, 1], [0, 1080]);
    const app6YExit = interpolate(app6Exit, [0, 1], [0, 1080]);

    // 23. Apps 7-9 Entrance (Slide From Top)
    const app7YIn = interpolate(app7Entrance, [0, 1], [-1080, 0]);
    const app7OpacityIn = interpolate(app7Entrance, [0, 1], [0, 1]);

    const app8YIn = interpolate(app8Entrance, [0, 1], [-1080, 0]);
    const app8OpacityIn = interpolate(app8Entrance, [0, 1], [0, 1]);

    const app9YIn = interpolate(app9Entrance, [0, 1], [-1080, 0]);
    const app9OpacityIn = interpolate(app9Entrance, [0, 1], [0, 1]);

    // 24. Apps 7-9 Exit (Slide Down)
    const app7YExit = interpolate(app7Exit, [0, 1], [0, 1080]);
    const app8YExit = interpolate(app8Exit, [0, 1], [0, 1080]);
    const app9YExit = interpolate(app9Exit, [0, 1], [0, 1080]);

    // 25. Apps 10-11 Entrance (Bouncy Slide Up from bottom)
    const app10YIn = interpolate(app10Entrance, [0, 1], [1080, 0]);
    const app10OpacityIn = interpolate(app10Entrance, [0, 1], [0, 1]);

    const app11YIn = interpolate(app11Entrance, [0, 1], [1080, 0]);
    const app11OpacityIn = interpolate(app11Entrance, [0, 1], [0, 1]);

    // 26. Flip Duo 1 (10/11 Out, 12/13 In)
    const duoRotateOut1 = interpolate(flipDuo1, [0, 1], [0, 90]);
    const duoRotateIn1 = interpolate(flipDuo1, [0, 1], [-90, 0]);
    const duoOpacityOut1 = interpolate(flipDuo1, [0, 1], [1, 0]);
    const duoOpacityIn1 = interpolate(flipDuo1, [0, 1], [0, 1]);

    // 27. Flip Duo 2 (12/13 Out, 14/15 In)
    const duoRotateOut2 = interpolate(flipDuo2, [0, 1], [0, 90]);
    const duoRotateIn2 = interpolate(flipDuo2, [0, 1], [-90, 0]);
    const duoOpacityOut2 = interpolate(flipDuo2, [0, 1], [1, 0]);
    const duoOpacityIn2 = interpolate(flipDuo2, [0, 1], [0, 1]);

    // 28. Final Reveal Interpolations
    const appsZoomOut = 1;
    const appsOpacityOut = interpolate(finalReveal, [0, 1], [1, 0]);

    // 29. Finale Text Sequence Interpolations
    // "but"
    const butZoom = interpolate(butEntrance, [0, 1], [5, 1]);
    const butOpacity = interpolate(butEntrance, [0, 0.1], [0, 1]);
    const butXShift = interpolate(reallyEntrance, [0, 1], [0, -150]);

    // "really"
    const reallyOpacity = interpolate(reallyEntrance, [0, 0.1], [0, 1]);
    const reallyScale = interpolate(reallyEntrance, [0, 1], [0.5, 1]);

    // flip out "but really"
    const butReallyFlipOutRotate = interpolate(butReallyFlipExit, [0, 1], [0, 90]);
    const butReallyFlipOutOpacity = interpolate(butReallyFlipExit, [0, 0.5], [1, 0]);

    // "i just build:)" word-by-word (arriving from right)
    const iOpacity = interpolate(iWordSpring, [0, 0.1], [0, 1]);
    const iX = interpolate(justWordSpring, [0, 1], [0, -130]) + interpolate(buildWordSpring, [0, 1], [0, -270]);

    const justOpacity = interpolate(justWordSpring, [0, 0.1], [0, 1]);
    const justX = interpolate(justWordSpring, [0, 1], [400, 100]) + interpolate(buildWordSpring, [0, 1], [0, -270]);

    const buildOpacity = interpolate(buildWordSpring, [0, 0.1], [0, 1]);
    const buildX = interpolate(buildWordSpring, [0, 1], [800, 260]);

    // flip out i just build:)
    const buildFlipOutRotate = interpolate(buildSentenceExitFlip, [0, 1], [0, 90]);
    const buildFlipOutOpacity = interpolate(buildSentenceExitFlip, [0, 0.5], [1, 0]);

    const socialHandleRotate = interpolate(socialHandleFlip, [0, 1], [-90, 0]);
    const socialHandleOpacity = interpolate(socialHandleFlip, [0, 0.1], [0, 1]);
    // Background Noise SVG
    const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E`;

    // Audio volume ducking
    const audioVolume = interpolate(
        frame,
        [0, 10, 20, 101, 111, 724, 734, 790, 800, 1230, 1240, 1410],
        [0.005, 0.005, 0.005, 0.005, 1, 1, 0.005, 0.005, 1, 1, 0.005, 0.005],
        { extrapolateRight: "clamp" }
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#fff6e8ff",
                backgroundImage: `url("${noiseUrl}")`,
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Geist', 'Inter', sans-serif",
                perspective: "1200px",
            }}
        >
            {/* Stage 1: Hi, my */}
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1e1b4b",
                    opacity: outOpacity1,
                    transform: `scale(${hiScale}) rotate(${hiRotate + outRotation1}deg)`,
                }}
            >
                <h1 style={{ fontSize: "12rem", fontWeight: 900, margin: 0, letterSpacing: "-0.05em", transform: `translateX(${hiXShift}px)` }}>
                    Hi,
                </h1>
                <h1
                    style={{
                        fontSize: "12rem",
                        fontWeight: 900,
                        margin: 0,
                        letterSpacing: "-0.05em",
                        position: "absolute",
                        opacity: myEntrance,
                        transform: `translateX(${myXShift}px) scale(${myEntrance})`
                    }}
                >
                    my
                </h1>
            </div>

            {/* Stage 2: name is */}
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    color: "#1e1b4b",
                    opacity: inOpacity1 * (1 - rotationProgress2),
                    transform: `rotate(${inRotation1 + outRotation2}deg) scale(${rotationProgress1})`,
                }}
            >
                <h1 style={{ fontSize: "12rem", fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>name is</h1>
            </div>

            {/* Stage 3: Sandeepan */}
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    color: "#1e1b4b",
                    opacity: inOpacity2 * sandeepanOpacityOut,
                    transform: `rotate(${inRotation2}deg) scale(${rotationProgress2}) translateX(${sandeepanXOut}px)`,
                }}
            >
                <h1 style={{ fontSize: "12rem", fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>Sandeepan</h1>
            </div>

            {/* Stage 3 Photo: Strictly pinned to the bottom right of the frame */}
            <img
                src={staticFile("me.png")}
                style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    width: "450px",
                    height: "auto",
                    opacity: inOpacity2 * sandeepanOpacityOut,
                }}
            />

            {/* Stage 4: & i make */}
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    color: "#1e1b4b",
                    opacity: makeOpacityIn * makeZoomOut,
                    transform: `translateX(${makeXIn}px) scale(${makeZoomOut})`,
                }}
            >
                <h1 style={{ fontSize: "12rem", fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>& i make</h1>
            </div>

            {/* Stage 5: websites */}
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    color: "#1e1b4b",
                    opacity: websiteOpacityIn * (1 - website1Entrance),
                    transform: `scale(${websiteZoomIn}) translateY(${websitesTextY}px)`,
                }}
            >
                <h1 style={{ fontSize: "12rem", fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>websites</h1>
            </div>

            {/* Stage 6: Website 1 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website1Entrance * website1OpacityOut,
                    transform: `translateY(${website1Y}px) rotateY(${website1RotateY}deg)`,
                }}
            >
                <img
                    src={staticFile("website1.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 7: Website 2 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website2OpacityIn * website2OpacityOut,
                    transform: `rotateY(${website2RotateYIn + website2RotateYOut}deg)`,
                }}
            >
                <img
                    src={staticFile("website2.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 8: Website 3 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website3OpacityIn * website3OpacityOut,
                    transform: `rotateY(${website3RotateYIn}deg) rotateX(${website3RotateXOut}deg)`,
                }}
            >
                <img
                    src={staticFile("website3.jpg")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 9: Website 4 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website4OpacityIn * website4OpacityOut,
                    transform: `rotateX(${website4RotateXIn + website4RotateXOut}deg)`,
                }}
            >
                <img
                    src={staticFile("website4.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 10: Website 5 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website5OpacityIn * website5OpacityOut,
                    transform: `rotateX(${website5RotateXIn + website5RotateXOut}deg)`,
                }}
            >
                <img
                    src={staticFile("website5.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 11: Website 6 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website6OpacityIn * website6OpacityOut,
                    transform: `rotateX(${website6RotateXIn + website6RotateXOut}deg)`,
                }}
            >
                <img
                    src={staticFile("website6.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 12: Website 7 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website7OpacityIn * website7OpacityOut,
                    transform: `rotateX(${website7RotateXIn + website7RotateXOut}deg)`,
                }}
            >
                <img
                    src={staticFile("website7.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 13: Website 8 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website8OpacityIn * website8OpacityOut,
                    transform: `rotateX(${website8RotateXIn}deg) translateY(${website8YOut}px)`,
                }}
            >
                <img
                    src={staticFile("website8.png")}
                    style={{
                        width: "80%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 14: Website 9 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website9OpacityIn * website9OpacityOut,
                    transform: `translateY(${website9YIn + website9YOut}px)`,
                }}
            >
                <img
                    src={staticFile("website9.png")}
                    style={{
                        width: "70%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 15: Website 10 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website10OpacityIn * website10OpacityOut,
                    transform: `translateY(${website10YIn + website10YOut}px)`,
                }}
            >
                <img
                    src={staticFile("website10.png")}
                    style={{
                        width: "47%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 16: Website 11 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website11OpacityIn * website11OpacityOut,
                    transform: `translateY(${website11YIn + website11YOut}px)`,
                }}
            >
                <img
                    src={staticFile("website11.png")}
                    style={{
                        width: "60%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 17: Website 12 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website12OpacityIn * website12OpacityOut,
                    transform: `translateY(${website12YIn + website12YOut}px)`,
                }}
            >
                <img
                    src={staticFile("website12.png")}
                    style={{
                        width: "70%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 18: Website 13 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website13OpacityIn * website13OpacityOut,
                    transform: `translateY(${website13YIn + website13YOut}px)`,
                }}
            >
                <img
                    src={staticFile("website13.png")}
                    style={{
                        width: "70%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 19: Website 14 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: website14OpacityIn * website14OpacityOut,
                    transform: `translateY(${website14YIn}px) scale(${website14ZoomOut})`,
                }}
            >
                <img
                    src={staticFile("website14.png")}
                    style={{
                        width: "70%",
                        height: "auto",
                        borderRadius: "20px",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                    }}
                />
            </div>

            {/* Stage 20: & apps */}
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    color: "#1e1b4b",
                    opacity: appsOpacityIn * appsTextOpacityOut,
                    transform: `scale(${appsZoomIn}) translateY(${appsTextYOut}px)`,
                }}
            >
                <h1 style={{ fontSize: "12rem", fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>& apps</h1>
            </div>

            {/* Stage 21: App 1 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app1OpacityIn,
                    transform: `translateY(${app1YIn + app1YExit}px) translateX(${app1XShift + app1XFinalShift}px)`,
                }}
            >
                <img
                    src={staticFile("app1.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 22: App 2 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app2OpacityIn,
                    transform: `translateY(${app2YExit}px) translateX(${app2XIn + app2XShift}px)`,
                }}
            >
                <img
                    src={staticFile("app2.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 23: App 3 */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app3OpacityIn,
                    transform: `translateY(${app3YExit}px) translateX(${app3XIn}px)`,
                }}
            >
                <img
                    src={staticFile("app3.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>


            {/* Stage 24: App 4 (Replaces App 1) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app4OpacityIn,
                    transform: `translateY(${app4YIn + app4YExit}px) translateX(-500px)`,
                }}
            >
                <img
                    src={staticFile("app4.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 25: App 5 (Replaces App 2) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app5OpacityIn,
                    transform: `translateY(${app5YIn + app5YExit}px) translateX(0px)`,
                }}
            >
                <img
                    src={staticFile("app5.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 26: App 6 (Replaces App 3) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app6OpacityIn,
                    transform: `translateY(${app6YIn + app6YExit}px) translateX(500px)`,
                }}
            >
                <img
                    src={staticFile("app6.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 27: App 7 (Replaces App 4) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app7OpacityIn,
                    transform: `translateY(${app7YIn + app7YExit}px) translateX(-500px)`,
                }}
            >
                <img
                    src={staticFile("app7.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 28: App 8 (Replaces App 5) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app8OpacityIn,
                    transform: `translateY(${app8YIn + app8YExit}px) translateX(0px)`,
                }}
            >
                <img
                    src={staticFile("app8.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 29: App 9 (Replaces App 6) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app9OpacityIn,
                    transform: `translateY(${app9YIn + app9YExit}px) translateX(500px)`,
                }}
            >
                <img
                    src={staticFile("app9.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 30: App 10 (Bouncy Entrance) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app10OpacityIn * duoOpacityOut1,
                    transform: `translateY(${app10YIn}px) translateX(-300px) rotateY(${duoRotateOut1}deg)`,
                    perspective: "1000px",
                }}
            >
                <img
                    src={staticFile("app10.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 31: App 11 (Bouncy Entrance) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: app11OpacityIn * duoOpacityOut1,
                    transform: `translateY(${app11YIn}px) translateX(300px) rotateY(${duoRotateOut1}deg)`,
                    perspective: "1000px",
                }}
            >
                <img
                    src={staticFile("app11.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 32: App 12 (Reveal from Flip 1) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: duoOpacityIn1 * duoOpacityOut2,
                    transform: `translateX(-300px) rotateY(${duoRotateIn1 + duoRotateOut2}deg)`,
                    perspective: "1000px",
                }}
            >
                <img
                    src={staticFile("app12.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 33: App 13 (Reveal from Flip 1) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: duoOpacityIn1 * duoOpacityOut2,
                    transform: `translateX(300px) rotateY(${duoRotateIn1 + duoRotateOut2}deg)`,
                    perspective: "1000px",
                }}
            >
                <img
                    src={staticFile("app13.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 34: App 14 (Reveal from Flip 2) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: duoOpacityIn2 * appsOpacityOut,
                    transform: `translateX(-300px) rotateY(${duoRotateIn2}deg) scale(${appsZoomOut})`,
                    perspective: "1000px",
                }}
            >
                <img
                    src={staticFile("app14.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Stage 35: App 15 (Reveal from Flip 2) */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: duoOpacityIn2 * appsOpacityOut,
                    transform: `translateX(300px) rotateY(${duoRotateIn2}deg) scale(${appsZoomOut})`,
                    perspective: "1000px",
                }}
            >
                <img
                    src={staticFile("app15.png")}
                    style={{
                        width: "22%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                />
            </div>

            {/* Final Stage: Finale Text Sequence */}

            {/* "but" and "really" */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: butOpacity * butReallyFlipOutOpacity,
                    transform: `perspective(1000px) rotateX(${butReallyFlipOutRotate}deg)`,
                }}
            >
                <h1 style={{
                    position: "absolute",
                    fontSize: "120px",
                    color: "#1e1b4b",
                    fontWeight: "900",
                    opacity: 1, // Parent handles opacity
                    transform: `translateX(${butXShift}px) scale(${butZoom})`
                }}>
                    but
                </h1>
                <h1 style={{
                    position: "absolute",
                    fontSize: "120px",
                    color: "#1e1b4b",
                    fontWeight: "900",
                    opacity: reallyOpacity,
                    transform: `translateX(180px) scale(${reallyScale})`
                }}>
                    really
                </h1>
            </div>

            {/* "i just build:)" word by word */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: iOpacity * buildFlipOutOpacity,
                    transform: `perspective(1000px) rotateX(${buildFlipOutRotate}deg)`,
                }}
            >
                <h1 style={{
                    position: "absolute",
                    fontSize: "140px",
                    color: "#1e1b4b",
                    fontWeight: "900",
                    opacity: 1,
                    transform: `translateX(${iX}px)`
                }}>
                    i
                </h1>
                <h1 style={{
                    position: "absolute",
                    fontSize: "140px",
                    color: "#1e1b4b",
                    fontWeight: "900",
                    opacity: justOpacity,
                    transform: `translateX(${justX}px)`
                }}>
                    just
                </h1>
                <h1 style={{
                    position: "absolute",
                    fontSize: "140px",
                    color: "#1e1b4b",
                    fontWeight: "900",
                    opacity: buildOpacity,
                    transform: `translateX(${buildX}px)`
                }}>
                    build:)
                </h1>
            </div>

            {/* "@sandeepannandi" */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: socialHandleOpacity,
                    transform: `perspective(1000px) rotateX(${socialHandleRotate}deg)`,
                }}
            >
                <h1 style={{ fontSize: "100px", color: "#1e1b4b", fontWeight: "900" }}>
                    @sandeepannandi
                </h1>
            </div>

            {/* Background Audio - Loop 1 (0-30s) */}
            <Audio src={staticFile("audio.mp3")} volume={audioVolume} />

            {/* Background Audio - Loop 2 (30s+) */}
            <Sequence from={30 * fps}>
                <Audio src={staticFile("audio2.mp3")} volume={audioVolume} />
            </Sequence>

            {/* Segment-Specific Audio Tracks */}
            {/* Intro: "Hi, my name is..." */}
            <Audio src={staticFile("hiaudio.mp3")} />

            {/* "& Apps" Segment */}
            <Sequence from={734}>
                <Audio src={staticFile("appsaudio.mp3")} />
            </Sequence>

            {/* Finale: "but really..." */}
            <Sequence from={1240}>
                <Audio src={staticFile("justbiuldaudio.mp3")} />
            </Sequence>
        </AbsoluteFill>
    );
};
