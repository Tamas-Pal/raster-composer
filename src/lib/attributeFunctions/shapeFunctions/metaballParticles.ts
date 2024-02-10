import p5 from 'p5';
import { Pixel } from '../../../types';

export default function metaballParticles(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  metaballRasterSizeX: number,
  metaballRasterSizeY: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformParams = {
    transformF: (p: p5, transformScaleXY: number) => 0,
    transformScaleXY: [0, 0],
  }
) {
  const { transformF, transformScaleXY } = transformParams;
  p.rect(
    pixel[0] + transformF(p, outputGridUnitX * transformScaleXY[0]),
    pixel[1] + transformF(p, outputGridUnitY * transformScaleXY[1]),
    metaballRasterSizeX,
    metaballRasterSizeY
  );
}
