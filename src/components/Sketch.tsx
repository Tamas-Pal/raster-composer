import p5, { Image } from 'p5';
import { useEffect, useRef } from 'react';
import { Config, Preset } from '../p5/types';
import composer from '../p5/composer';

export default function Sketch({
  config,
  preset,
  triggerUpdate,
}: {
  config: Config;
  preset: Preset;
  triggerUpdate: () => void;
}) {
  const containerRef = useRef(null!);

  let img0: Image;
  let img1: Image;
  const outputWidth = preset.outputWidth;

  const outputImage = (p: p5) => {
    if (config.images[0]) {
      p.preload = () => {
        img0 = p.loadImage(config.images[0]);
        if (config.images[1]) img1 = p.loadImage(config.images[1]);
      };

      p.setup = () => {
        const aspectRatio = img0.width / img0.height;
        config.resolutionX = outputWidth;
        config.resolutionY = outputWidth / aspectRatio;
        const imgGFXArray = [];

        p.createCanvas(config.resolutionX, config.resolutionY);
        p.pixelDensity(1);
        config.outputGridUnitX = p.width / config.resolutionX;
        config.outputGridUnitY = p.height / config.resolutionY;

        const img0GFX = p.createGraphics(
          config.resolutionX,
          config.resolutionY
        );
        img0GFX.pixelDensity(1);
        img0GFX.image(img0, 0, 0, p.width, p.height);
        img0GFX.loadPixels();
        imgGFXArray.push(img0GFX.pixels);
        const img1GFX = p.createGraphics(
          config.resolutionX,
          config.resolutionY
        );
        img1GFX.pixelDensity(1);
        if (config.images[1]) {
          img1GFX.image(img1, 0, 0, p.width, p.height);
          //p.image(img0, 0, 0, p.width, p.height);
          img1GFX.loadPixels();
          imgGFXArray.push(img1GFX.pixels);
        }

        composer(p, config, preset, imgGFXArray);
        const downloadButton = p.createButton('Download');
        downloadButton.parent('save-output');
        downloadButton.mousePressed(() => {
          p.saveCanvas(`rasterComposition.png`);
        });
      };


      p.keyPressed = () => {
        if (p.keyCode === 83) {
          p.saveCanvas(`rasterComposition.png`);
        }
        if (p.keyCode === 85) {
          triggerUpdate();
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
