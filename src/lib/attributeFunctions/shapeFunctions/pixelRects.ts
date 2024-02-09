import p5 from 'p5';
import { Pixel, TransformFunction } from '../../../types';

export default function pixelRects(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformF = (p: p5, outputGridUnitX: number) => 0
) {
  //console.log(pixel[0]);

  p.rect(
    pixel[0] * outputGridUnitX -
      (outputGridUnitX * rasterSizeX) / 2 +
      transformF(p, outputGridUnitX * rasterSizeX),
    pixel[1] * outputGridUnitY -
      (outputGridUnitX * rasterSizeY) / 2 +
      transformF(p, outputGridUnitY * rasterSizeY),
      outputGridUnitX * rasterSizeX,
      outputGridUnitX * rasterSizeY
      );
}
