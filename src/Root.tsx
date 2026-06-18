import React from "react";
import "./index.css";
import { Composition } from "remotion";
import { MarketingVideo } from "./MarketingVideo";
import { ExpenseIQVideo } from "./ExpenseIQ/ExpenseIQVideo";
import { ExpenseIQReel1 } from "./ExpenseIQ/ExpenseIQReel1";
import { OreVideo } from "./Ore/OreVideo";
import { Yt1 } from "./Yt1";

// import { preloadAssets } from "./preload";

// preloadAssets();

import { ProductLaunch, productLaunchSchema, defaultProps } from "./ProductLaunch";
import { AppLaunch, appLaunchSchema, defaultProps as appLaunchDefaultProps } from "./AppLaunch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AppLaunch"
        component={AppLaunch}
        durationInFrames={1230}
        fps={30}
        width={1920}
        height={1080}
        schema={appLaunchSchema}
        defaultProps={appLaunchDefaultProps}
      />
      <Composition
        id="ProductLaunch"
        component={ProductLaunch}
        durationInFrames={348}
        fps={30}
        width={1920}
        height={1080}
        schema={productLaunchSchema}
        defaultProps={defaultProps}
      />
      <Composition
        id="Yt1"
        component={Yt1}
        durationInFrames={5319}
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
        durationInFrames={1230}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="expenseiqreel1"
        component={ExpenseIQReel1}
        durationInFrames={585}
        fps={30}
        width={2160}
        height={3840}
      />

      <Composition
        id="Ore"
        component={OreVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
