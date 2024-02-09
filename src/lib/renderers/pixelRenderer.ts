import p5 from 'p5';
import { Buffer, RendererConfig } from '../../types';

export default function pixelRenderer(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  {
    colorF,
    shapeF,
    transformParams = undefined,
    channels = [true, true, true, false],
    patternParams = undefined,
  }: RendererConfig
) {
  p.blendMode(p.BLEND);
  p.noStroke();
  buffer.pixels.map((pixel) => {
    for (let i = 0; i < channels.length; i++) {
      if (channels[i]) {
        p.fill(p.color(colorF(pixel, i + 2)));
        shapeF(
          p,
          outputGridUnitX,
          outputGridUnitY,
          buffer.rasterSizeX,
          buffer.rasterSizeY,
          pixel,
          i + 2,
          transformParams
        );
        if (patternParams) {
          patternParams.patternF(
            p,
            outputGridUnitX,
            outputGridUnitY,
            buffer.rasterSizeX,
            buffer.rasterSizeY,
            pixel,
            i + 2,
            [patternParams.patternResolutionXY, patternParams.patternColorF]
          );
        }
      }
    }
  });
}
