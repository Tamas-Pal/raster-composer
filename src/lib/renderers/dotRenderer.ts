import p5 from 'p5';
import { Buffer, RendererConfig } from '../../types';

export default function dotRenderer(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  {
    colorF,
    shapeF,
    transformF = undefined,
    patternColorF = undefined,
    patternF = undefined,
    patternResolution = 8,
    channels = [true, true, true, false],
  }: RendererConfig
) {
  p.blendMode(p.MULTIPLY);
  p.noStroke();
  buffer.pixels.map((pixel) => {
    for (let i = 0; i < channels.length; i++) {
      if (channels[i]) {
        let channelNorm = pixel[i + 2] / 255;
        let alphaNorm = pixel[5] / 255;
        if (channelNorm < 0.9 && alphaNorm >= 0.1) {
          p.fill(p.color(colorF(pixel, i + 2)));
          shapeF(p, outputGridUnitX, outputGridUnitY, buffer.rasterSize, pixel, i + 2, transformF);
          if (patternColorF && patternF) {
            patternF(
              p,
              outputGridUnitX,
              outputGridUnitY,
              pixel,
              patternResolution,
              i + 2
            );
          }
        } else {

        //  p.fill(p.color(255 * pixel[0] / buffer.resolutionX, 0, 0));
        //  shapeF(p, outputGridUnitX, outputGridUnitY, buffer.rasterSize, pixel, i + 2, transformF);

        }

      }
    }
  });
}
