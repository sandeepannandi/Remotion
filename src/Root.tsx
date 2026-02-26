import "./index.css";
import { Composition } from "remotion";
import { MarketingVideo } from "./MarketingVideo";
import { ExpenseIQVideo } from "./ExpenseIQ/ExpenseIQVideo";
import { ClixVideo } from "./Clix/ClixVideo";
import { OreVideo } from "./Ore/OreVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
        durationInFrames={867}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Clix"
        component={ClixVideo}
        durationInFrames={1100}
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
