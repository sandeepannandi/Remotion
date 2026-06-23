import { preloadImage } from "@remotion/preload";
import { preloadGif } from "@remotion/gif";
import { staticFile } from "remotion";

// add every image and gif your video uses
export const preloadAssets = () => {
  // Images
  preloadImage(staticFile("letmeexplain.jpg"));
  preloadImage(staticFile("post.png"));
  preloadImage(staticFile("thispost.jfif"));
  preloadImage(staticFile("slapmacwin.png"));
  preloadImage(staticFile("slapit.png"));
  preloadImage(staticFile("mac.png"));
  preloadImage(staticFile("accelerometer.png"));
  preloadImage(staticFile("detected.png"));
  preloadImage(staticFile("fun.png"));
  preloadImage(staticFile("source.png"));
  preloadImage(staticFile("gigachad.png"));
  preloadImage(staticFile("windows.png"));
  preloadImage(staticFile("laptop.png"));
  preloadImage(staticFile("wecan.jpg"));
  preloadImage(staticFile("python.png"));
  preloadImage(staticFile("libraries.png"));
  preloadImage(staticFile("whystop.jpg"));
  preloadImage(staticFile("moresounds.png"));
  preloadImage(staticFile("sui.webp"));
  preloadImage(staticFile("yk.jpg"));
  preloadImage(staticFile("kiscolor.webp"));
  preloadImage(staticFile("onemore.jfif"));
  preloadImage(staticFile("usbmeme.png"));
  preloadImage(staticFile("github.png"));
  preloadImage(staticFile("githubicon.png"));

  // Yt1 Gifs - Preload as both Image and Gif as per user guidance
  preloadImage(staticFile("easy.gif"));
  preloadGif(staticFile("easy.gif"));
  preloadImage(staticFile("think.gif"));
  preloadGif(staticFile("think.gif"));
  preloadImage(staticFile("simple.gif"));
  preloadGif(staticFile("simple.gif"));
  preloadImage(staticFile("elmo.gif"));
  preloadGif(staticFile("elmo.gif"));
  preloadImage(staticFile("sus.gif"));
  preloadGif(staticFile("sus.gif"));
  preloadImage(staticFile("feelbad.gif"));
  preloadGif(staticFile("feelbad.gif"));
  preloadImage(staticFile("rub.gif"));
  preloadGif(staticFile("rub.gif"));

  // Yt2 Gifs
  preloadImage(staticFile("cateating.gif"));
  preloadGif(staticFile("cateating.gif"));
  preloadImage(staticFile("cry.gif"));
  preloadGif(staticFile("cry.gif"));
  preloadImage(staticFile("smirk.gif"));
  preloadGif(staticFile("smirk.gif"));
};
