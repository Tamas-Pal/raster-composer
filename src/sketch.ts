import p5, { Image } from 'p5';
import { config } from './configs/config00.js';
import composer from './composer.js';

let fileIndex = 0;
let img: Image;

export default function sketch(p: p5) {
  p.preload = () => {
    //img = loadImage('assets/StateCraft01.png');
    img = p.loadImage(config.image);
  };

  p.setup = () => {
    config.resolutionX = img.width* config.outputMultiplier;
    config.resolutionY = img.height* config.outputMultiplier;
    p.createCanvas(
      config.resolutionX,
      config.resolutionY
    );
    p.image(img, 0, 0, p.width, p.height);
    p.loadPixels();
    config.outputGridUnitX = p.width / config.resolutionX;
    config.outputGridUnitY = p.height / config.resolutionY;

    p.background(255);
    composer(p, config, p.pixels);
  };

  p.keyPressed = () => {
    if (p.keyCode === 83) {
      let fileIndexStr =
        fileIndex < 10 ? `0${fileIndex}` : fileIndex.toString();
      p.saveCanvas(`myCanvas${fileIndexStr}.png`);
      fileIndex++;
    }
  };
}
