import p5 from 'p5';
import { ShapeParams } from '../../../types';

export default function marchBlobs(p: p5, shapeParams: ShapeParams) {
  const {
    pixel,
    outputGridUnitX,
    outputGridUnitY,
    rasterSizeX,
    rasterSizeY,
    neighbors,
  } = shapeParams;
  let { transformConfig } = shapeParams;

  if (transformConfig === undefined) {
    transformConfig = {
      transformF: () => 0,
      transformScaleXY: [1, 1],
    };
  }
  const { transformF, transformScaleXY } = transformConfig;

  const pX =
    pixel![0] * outputGridUnitX +
    transformF(p, outputGridUnitX * rasterSizeX * transformScaleXY[0]); // - (outputGridUnitX * rasterSizeX) / 2;
  const pY =
    pixel![1] * outputGridUnitY +
    transformF(p, outputGridUnitY * rasterSizeY * transformScaleXY[1]); // - (outputGridUnitY * rasterSizeY) / 2;
  const unitX = outputGridUnitX * rasterSizeX;
  const unitY = outputGridUnitY * rasterSizeY;

  p.noStroke();

  p.push();
  p.translate(pX, pY);
  p.scale(unitX, unitY);
  blob();
  extensions();
  p.pop();

  function blob() {
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
  }

  function extensions() {
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 2; x++) {
        let neighborL = 0;
        let neighborMid = 0;
        let neighborR = 0;

        if (x === 0 && y === 0) {
          neighborL = 1;
          neighborMid = 0;
          neighborR = 3;
        }
        if (x === 1 && y === 0) {
          neighborL = 4;
          neighborMid = 2;
          neighborR = 1;
        }
        if (x === 0 && y === 1) {
          neighborL = 3;
          neighborMid = 5;
          neighborR = 6;
        }
        if (x === 1 && y === 1) {
          neighborL = 6;
          neighborMid = 7;
          neighborR = 4;
        }
        let extensionL = () => {};
        let extensionR = () => {};

        if (neighbors![neighborL] !== true) {
          if (neighbors![neighborMid] === true) {
            extensionL = () => wedge(0, 0.25, -0.25);
          } else if (neighbors![neighborR] === true) {
            extensionL = () => bridge(0, 0.25, -0.11);
          }
        }
        if (neighbors![neighborR] !== true) {
          if (neighbors![neighborMid] === true) {
            extensionR = () => wedge(2, 0.25, -0.25);
          } else if (neighbors![neighborL] === true) {
            extensionR = () => bridge(-1, -0.25, -0.11);
          }
        }
        const rotation = x === 0 && y === 1 ? 3 : x + y;
        p.push();
        p.translate(x, y);
        p.rotate(rotation * p.HALF_PI);
        //  p.fill(0, 255 - rotation * 64, 255);
        extensionL();
        // p.fill(255, 255 - rotation * 64, 0);
        extensionR();
        p.pop();
      }
    }
  }

  function bridge(rotation: number, translateX: number, translateY: number) {
    p.push();
    p.rotate(p.HALF_PI * rotation);
    p.translate(translateX, translateY);
    p.rect(-0.25, -0.11, 0.5, 0.22);
    p.pop();
  }

  function wedge(rotation: number, translateX: number, translateY: number) {
    p.push();
    p.rotate(p.HALF_PI * rotation);
    p.translate(translateX, translateY);
    p.beginShape();
    p.vertex(-0.25, 0.25);
    p.bezierVertex(-0.1, 0.11, 0.07, 0.03, 0.25, 0.03);
    p.bezierVertex(0.25, 0.03, 0.25, 0.03, 0.25, 0.03);
    p.bezierVertex(0.25, 0.03, 0.22, 0.03, 0.22, 0.03);
    p.bezierVertex(0.08, 0.03, -0.03, -0.08, -0.03, -0.22);
    p.bezierVertex(-0.03, -0.22, -0.03, -0.25, -0.03, -0.25);
    p.bezierVertex(-0.03, -0.25, -0.03, -0.25, -0.03, -0.25);
    p.bezierVertex(-0.03, -0.07, -0.11, 0.1, -0.25, 0.25);
    p.bezierVertex(-0.25, 0.25, -0.25, 0.25, -0.25, 0.25);
    p.bezierVertex(-0.25, 0.25, -0.25, 0.25, -0.25, 0.25);
    p.endShape();
    p.pop();
  }
}
