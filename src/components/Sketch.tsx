import p5, { Image } from 'p5';
//import sketch from '../p5/sketch';
import { useEffect, useRef } from 'react';
import { Config, Preset } from '../p5/types';
import composer from '../p5/composer';

export default function Sketch({
  config,
  preset,
}: {
  config: Config;
  preset: Preset;
}) {
  const containerRef = useRef(null!);

  let img0: Image;
  let img1: Image;

  const outputImage = (p: p5) => {
    //console.log(config);
    if (config.images[0]) {
      p.preload = () => {
        img0 = p.loadImage(config.images[0]);
        if (config.images[1]) img1 = p.loadImage(config.images[1]);
      };

      p.setup = () => {
        const aspectRatio = img0.width / img0.height;
        //config.resolutionX = img0.width * config.outputMultiplier;
        config.resolutionX = 512;
        //config.resolutionY = img0.height * config.outputMultiplier;
        config.resolutionY = 512 / aspectRatio;
        const imgGFXArray = []

        p.createCanvas(config.resolutionX, config.resolutionY);
        p.pixelDensity(1);
        config.outputGridUnitX = p.width / config.resolutionX;
        config.outputGridUnitY = p.height / config.resolutionY;

        // console.log(config.resolutionX, config.resolutionY);
        const img0GFX = p.createGraphics(
          config.resolutionX,
          config.resolutionY
        );
        img0GFX.pixelDensity(1);
        img0GFX.image(img0, 0, 0, p.width, p.height);
        img0GFX.loadPixels();
        imgGFXArray.push(img0GFX.pixels)
        const img1GFX = p.createGraphics(
          config.resolutionX,
          config.resolutionY
        );
        img1GFX.pixelDensity(1);
        if (config.images[1]) {img1GFX.image(img1, 0, 0, p.width, p.height);
        //p.image(img0, 0, 0, p.width, p.height);
        img1GFX.loadPixels();
        imgGFXArray.push(img1GFX.pixels)
        }
        composer(p, config, preset, imgGFXArray);
      };

      p.keyPressed = () => {
        if (p.keyCode === 83) {
          p.saveCanvas(`rasterComposition.png`);
        }
      };
    }
  };

  useEffect(() => {
    const instance = new p5(outputImage, containerRef.current);
    return () => instance.remove();
  }, [config, preset]);

  return <div id='p5' ref={containerRef}></div>;
}