import p5, { Image } from 'p5';
import { config } from './configs/config00.js';
import composer from './composer.js';

let fileIndex = 0;
let img1: Image;
let img2: Image;

export default function sketch(p: p5) {
  p.preload = () => {
    //img = loadImage('assets/StateCraft01.png');
    img1 = p.loadImage(config.images[0]);
    img2 = p.loadImage(config.images[1]);
  };

  p.setup = () => {
    config.resolutionX = img1.width * config.outputMultiplier;
    config.resolutionY = img1.height * config.outputMultiplier;
    p.createCanvas(config.resolutionX, config.resolutionY);
    console.log(config.resolutionX, config.resolutionY);
    let img1Graphics = p.createGraphics(config.resolutionX, config.resolutionY);
    let img2Graphics = p.createGraphics(config.resolutionX, config.resolutionY);
    img1Graphics.image(img1, 0, 0, p.width, p.height);
    img2Graphics.image(img2, 0, 0, p.width, p.height);
    //p.image(img1, 0, 0, p.width, p.height);
    img1Graphics.loadPixels();
    img2Graphics.loadPixels();
    config.outputGridUnitX = p.width / config.resolutionX;
    config.outputGridUnitY = p.height / config.resolutionY;

    p.background(config.backgroundColor);
    composer(p, config, [img1Graphics.pixels, img2Graphics.pixels]);
  };

  p.keyPressed = () => {
    if (p.keyCode === 83) {
      let fileIndexStr =
        fileIndex < 10 ? `0${fileIndex}` : fileIndex.toString();
      p.saveCanvas(`rasterComposition_${fileIndexStr}.png`);
      fileIndex++;
    }
  };
}
