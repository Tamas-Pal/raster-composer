import p5, { Image } from 'p5';
import { defaultConfig, defaultPreset } from './configs/config-default.ts';
import composer from './composer.js';

let img0: Image;
let img1: Image;

export default function sketch(p: p5) {
  p.preload = () => {
    //img = loadImage('assets/StateCraft01.png');
    img0 = p.loadImage(defaultConfig.images[0]);
    img1 = p.loadImage(defaultConfig.images[1]);
  };

  p.setup = () => {
    const aspectRatio = img0.width / img0.height;
    //defaultConfig.resolutionX = img0.width * defaultConfig.outputMultiplier;
    defaultConfig.resolutionX = 1024;
    //defaultConfig.resolutionY = img0.height * defaultConfig.outputMultiplier;
    defaultConfig.resolutionY = 1024 / aspectRatio;
    p.createCanvas(defaultConfig.resolutionX, defaultConfig.resolutionY);
    // console.log(defaultConfig.resolutionX, defaultConfig.resolutionY);
    const img0Graphics = p.createGraphics(
      defaultConfig.resolutionX,
      defaultConfig.resolutionY
    );
    const img1Graphics = p.createGraphics(
      defaultConfig.resolutionX,
      defaultConfig.resolutionY
    );
    img0Graphics.image(img0, 0, 0, p.width, p.height);
    img1Graphics.image(img1, 0, 0, p.width, p.height);
    //p.image(img0, 0, 0, p.width, p.height);
    img0Graphics.loadPixels();
    img1Graphics.loadPixels();
    defaultConfig.outputGridUnitX = p.width / defaultConfig.resolutionX;
    defaultConfig.outputGridUnitY = p.height / defaultConfig.resolutionY;

    composer(p, defaultConfig, defaultPreset, [img0Graphics.pixels, img1Graphics.pixels]);
  };

  p.keyPressed = () => {
    if (p.keyCode === 83) {
      p.saveCanvas(`rasterComposition.png`);
    }
  };
}
