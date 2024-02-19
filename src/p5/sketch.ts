import p5, { Image } from 'p5';
import { config, preset } from './configs/config02.ts';
import composer from './composer.js';

let img0: Image;
let img1: Image;

export default function sketch(p: p5) {
  p.preload = () => {
    //img = loadImage('assets/StateCraft01.png');
    img0 = p.loadImage(config.images[0]);
    img1 = p.loadImage(config.images[1]);
  };

  p.setup = () => {
    const aspectRatio = img0.width / img0.height;
    //config.resolutionX = img0.width * config.outputMultiplier;
    config.resolutionX = 1024;
    //config.resolutionY = img0.height * config.outputMultiplier;
    config.resolutionY = 1024 / aspectRatio;
    p.createCanvas(config.resolutionX, config.resolutionY);
    // console.log(config.resolutionX, config.resolutionY);
    const img0Graphics = p.createGraphics(
      config.resolutionX,
      config.resolutionY
    );
    const img1Graphics = p.createGraphics(
      config.resolutionX,
      config.resolutionY
    );
    img0Graphics.image(img0, 0, 0, p.width, p.height);
    img1Graphics.image(img1, 0, 0, p.width, p.height);
    //p.image(img0, 0, 0, p.width, p.height);
    img0Graphics.loadPixels();
    img1Graphics.loadPixels();
    config.outputGridUnitX = p.width / config.resolutionX;
    config.outputGridUnitY = p.height / config.resolutionY;

    composer(p, config, preset, [img0Graphics.pixels, img1Graphics.pixels]);
  };

  p.keyPressed = () => {
    if (p.keyCode === 83) {
      p.saveCanvas(`rasterComposition.png`);
    }
  };
}
