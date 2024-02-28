import p5 from 'p5';
import { ShapeParams } from '../../../types';

export default function rasterDots(p: p5, shapeParams: ShapeParams) {
  const {
    pixel,
    pixelIndex = 2,
    outputGridUnitX,
    outputGridUnitY,
    rasterSizeX,
    rasterSizeY,
  } = shapeParams;

  let { transformConfig } = shapeParams;
  if (transformConfig === undefined) {
    transformConfig = {
      transformF: () => 0,
      transformScaleXY: [1, 1],
    };
  }
  const { transformF, transformScaleXY } = transformConfig;

  p.ellipse(
    pixel[0] * outputGridUnitX +
      transformF(p, outputGridUnitX * transformScaleXY[0]),
    pixel[1] * outputGridUnitY +
      transformF(p, outputGridUnitX * transformScaleXY[1]),
    outputGridUnitX * rasterSizeX * (1 - pixel[pixelIndex] / 255),
    outputGridUnitX * rasterSizeY * (1 - pixel[pixelIndex] / 255)
  );
}
