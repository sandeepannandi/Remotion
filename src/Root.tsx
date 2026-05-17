import "./index.css";
import { Composition } from "remotion";
import { MarketingVideo } from "./MarketingVideo";
import { ExpenseIQVideo } from "./ExpenseIQ/ExpenseIQVideo";
import { OreVideo } from "./Ore/OreVideo";
import { Yt1 } from "./Yt1";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Yt1"
        component={Yt1}
        durationInFrames={3067}
        fps={30}
        width={7680}
        height={4320}
      />
      <Composition
        id="MarketingVideo"
        component={MarketingVideo}
        durationInFrames={1410}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          name: "Your Name",
          role: "Creative Professional",
        }}
      />
      <Composition
        id="ExpenseIQ"
        component={ExpenseIQVideo}
        durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Ore"
        component={OreVideo}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
