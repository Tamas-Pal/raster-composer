import p5 from 'p5';
import { ShapeParams } from '../../../types';

export default function pixelRects(
  p: p5,
  shapeParams: ShapeParams
) {
  const { pixel, outputGridUnitX, outputGridUnitY, rasterSizeX, rasterSizeY } = shapeParams;
  let { transformConfig } = shapeParams;

  if (transformConfig === undefined) {
    transformConfig = {
      transformF: () => 0,
      transformScaleXY: [1, 1],
    };
  }
  const { transformF, transformScaleXY } = transformConfig;
p.noStroke();
  p.rect(
    pixel![0] * outputGridUnitX -
      (outputGridUnitX * rasterSizeX) / 2 +
      transformF(p, outputGridUnitX * rasterSizeX * transformScaleXY[0]),
    pixel![1] * outputGridUnitY -
      (outputGridUnitY * rasterSizeY) / 2 +
      transformF(p, outputGridUnitY * rasterSizeY * transformScaleXY[1]),
    outputGridUnitX * rasterSizeX,
    outputGridUnitY * rasterSizeY
  );
}
