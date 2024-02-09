import p5 from 'p5';
import { Pixel, TransformFunction } from '../../../types';

export default function rasterDots(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformF = (p: p5, outputGridUnitX: number) => 0
) {
  p.ellipse(
    pixel[0] * outputGridUnitX +
      //  (outputGridUnitX * rasterSizeX) / 2 +
      transformF(p, rasterSizeX),
    pixel[1] * outputGridUnitY +
      // (outputGridUnitX * rasterSizeY) / 2 +
      transformF(p, outputGridUnitX * rasterSizeY),
    outputGridUnitX * rasterSizeX * (1 - pixel[pixelIndex] / 255),
    outputGridUnitX * rasterSizeY * (1 - pixel[pixelIndex] / 255)
  );
}
