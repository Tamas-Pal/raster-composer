import p5 from 'p5';
import { ShapeParams } from '../../../types';

export default function rasterBlobs(p: p5, shapeParams: ShapeParams) {
  const { pixel, outputGridUnitX, outputGridUnitY, rasterSizeX, rasterSizeY } =
    shapeParams;
  let { transformConfig } = shapeParams;

  if (transformConfig === undefined) {
    transformConfig = {
      transformF: () => 0,
      transformScaleXY: [1, 1],
    };
  }
  /*const { transformF, transformScaleXY } = transformConfig;*/

  const pX = pixel![0] * outputGridUnitX; // - (outputGridUnitX * rasterSizeX) / 2;
  const pY = pixel![1] * outputGridUnitY; // - (outputGridUnitY * rasterSizeY) / 2;
  const unitX = outputGridUnitX * rasterSizeX;
  const unitY = outputGridUnitY * rasterSizeY;
  console.log(pX, pY, unitX, unitY);

  p.noStroke();

  p.push();
  p.translate(pX, pY);
  p.scale(unitX, unitY);
  p.beginShape();
  p.vertex(1, 0);

  p.bezierVertex(0.83, -0.17, 0.65, -0.22, 0.5, -0.22);
  p.bezierVertex(0.35, -0.22, 0.17, -0.17, 0, 0);

  p.bezierVertex(-0.17, 0.17, -0.22, 0.35, -0.22, 0.5);
  p.bezierVertex(-0.22, 0.65, -0.17, 0.83, 0, 1);

  p.bezierVertex(0.17, 1.17, 0.35, 1.22, 0.5, 1.22);
  p.bezierVertex(0.65, 1.22, 0.83, 1.17, 1, 1);

  p.bezierVertex(1.17, 0.83, 1.22, 0.65, 1.22, 0.5);
  p.bezierVertex(1.22, 0.35, 1.17, 0.17, 1, 0);

  p.bezierVertex(1, 0, 1, 0, 1, 0);
  p.endShape();
  p.pop();
}
