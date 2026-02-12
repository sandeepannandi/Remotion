import "./index.css";
import { Composition } from "remotion";
import { MarketingVideo } from "./MarketingVideo";
import { ClixVideo } from "./ClixVideo";

// Each <Composition> is an entry in the sidebar!

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
        id="ClixVideo"
        component={ClixVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
