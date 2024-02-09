import p5 from 'p5';
import { Pixel } from '../../../types';

export default function rasterDots(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformParams = {
    transformF: (p: p5, outputGridUnitX: number) => 0,
    transformScaleXY: [0,0],
  }
) {
  const { transformF, transformScaleXY } = transformParams;
  p.ellipse(
    pixel[0] * outputGridUnitX +
      //  (outputGridUnitX * rasterSizeX) / 2 +
      transformF(p, outputGridUnitX * transformScaleXY[0]),
    pixel[1] * outputGridUnitY +
      // (outputGridUnitX * rasterSizeY) / 2 +
      transformF(p, outputGridUnitX * transformScaleXY[1]),
    outputGridUnitX * rasterSizeX * (1 - pixel[pixelIndex] / 255),
    outputGridUnitX * rasterSizeY * (1 - pixel[pixelIndex] / 255)
  );
}
