import p5 from 'p5';
import { Pixel, TransformFunction } from '../../../types';

export default function pixelRects(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSize: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformF = (p: p5, outputGridUnitX: number) => 0
) {
  //console.log(pixel[0]);

  p.rect(
    pixel[0] * outputGridUnitX -
      (outputGridUnitX * rasterSize) / 2 +
      transformF(p, outputGridUnitX * rasterSize),
    pixel[1] * outputGridUnitY -
      (outputGridUnitX * rasterSize) / 2 +
      transformF(p, outputGridUnitY * rasterSize),
    outputGridUnitX * rasterSize
  );
}
