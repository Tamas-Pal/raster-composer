import p5 from 'p5';
import { Pixel } from '../../../types';

export default function pixelRects(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  pixelIndex = 0,
  transformParams = { transformF: (p: p5, transformScaleXY: number) => 0, transformScaleXY: [0,0]}
) {
  //console.log(pixel[0]);
/*
  let transformF = (p: p5, transformScaleXY: number) => 0;
  let transformScaleXY = [0, 0];
  if (transformParams) {
    transformF = transformParams.transformF;
    transformScaleXY = transformParams.transformScaleXY;
  }
  */
  const {transformF, transformScaleXY} = transformParams;

  p.rect(
    pixel[0] * outputGridUnitX -
      (outputGridUnitX * rasterSizeX) / 2 +
      transformF(p, outputGridUnitX * transformScaleXY[0]),
    pixel[1] * outputGridUnitY -
      (outputGridUnitX * rasterSizeY) / 2 +
      transformF(p, outputGridUnitY * transformScaleXY[1]),
    outputGridUnitX * rasterSizeX,
    outputGridUnitX * rasterSizeY
  );
}
