import p5 from 'p5';
import { Pixel, TransformFunction } from '../../../types';

export default function rasterDots(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSize: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformF = (p: p5, outputGridUnitX: number) => 0
) {
  p.circle(
    pixel[0] * outputGridUnitX +
    //  (outputGridUnitX * rasterSize) / 2 +
      transformF(p,  rasterSize),
    pixel[1] * outputGridUnitY +
     // (outputGridUnitX * rasterSize) / 2 +
      transformF(p, outputGridUnitX * rasterSize),
    outputGridUnitX * rasterSize * (1 - pixel[pixelIndex] / 255)
  );
}
