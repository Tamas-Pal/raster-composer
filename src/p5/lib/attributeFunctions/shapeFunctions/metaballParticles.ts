import p5 from 'p5';
import { ShapeParams } from '../../../types';

export default function metaballParticles(
  p: p5,
  shapeParams: ShapeParams
) {
  const { pixel, outputGridUnitX, outputGridUnitY } = shapeParams;
  let { transformConfig, metaballRasterSizeXY } = shapeParams;
  
  if (transformConfig === undefined) {
    transformConfig = {
      transformF: () => 0,
      transformScaleXY: [1, 1],
    };
  }
  const { transformF, transformScaleXY } = transformConfig;

  if (metaballRasterSizeXY === undefined) {
    metaballRasterSizeXY = [shapeParams.rasterSizeX, shapeParams.rasterSizeY];
  }

  p.rect(
    pixel[0] + transformF(p, outputGridUnitX * transformScaleXY[0]),
    pixel[1] + transformF(p, outputGridUnitY * transformScaleXY[1]),
    metaballRasterSizeXY[0],
    metaballRasterSizeXY[1]
  );
}
