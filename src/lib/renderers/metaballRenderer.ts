import p5 from 'p5';
import { Buffer, Pixel, RendererConfig } from '../../types';
import { config } from '../../configs/config00';

export default function metaballRenderer(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  {
    colorParams,
    shapeF,
    transformParams = undefined,
    channels = [true, false, false, false],
    patternParams = undefined,
    metaballParams = {
      metaballRasterSizeXY: [4, 4],
      evaluationDistanceRatio: 0.5,
    },
  }: RendererConfig
) {
  p.blendMode(p.BLEND);
  //p.strokeWeight(4);
  let metaballRasterSizeX =
    metaballParams.metaballRasterSizeXY[0] * config.outputMultiplier;
  let metaballRasterSizeY =
    metaballParams.metaballRasterSizeXY[1] * config.outputMultiplier;
  let distanceBounds: [number | undefined, number | undefined] = [
    undefined,
    undefined,
  ];
  let evaluatedPixels: [number, number, number][] = [];
  for (let y = 0; y < buffer.resolutionY; y += metaballRasterSizeY) {
    for (let x = 0; x < buffer.resolutionX; x += metaballRasterSizeX) {
      let maxDistance = p.dist(0, 0, buffer.resolutionX, buffer.resolutionY);
      let evaluationDistance =
        maxDistance * (metaballParams.evaluationDistanceRatio / 10);
      let evaluationCount = 0;
      let distanceSum = 0;
      for (let i = 0; i < buffer.pixels.length; i++) {
        let distance = p.dist(buffer.pixels[i][0], buffer.pixels[i][1], x, y);
        if (distance < evaluationDistance) {
          evaluationCount += 1;
          distanceSum += distance;
        }
      }

      if (evaluationCount > 0) {
        let distanceAvg = distanceSum / evaluationCount;
        if (
          distanceBounds[0] === undefined ||
          distanceBounds[0] > distanceAvg
        ) {
          distanceBounds[0] = distanceAvg;
        }
        if (
          distanceBounds[1] === undefined ||
          distanceBounds[1] < distanceAvg
        ) {
          distanceBounds[1] = distanceAvg;
        }
        evaluatedPixels.push([x, y, distanceAvg]);
      }
    }
  }
  //console.log('distanceBounds', distanceBounds);
  if (distanceBounds[0] && distanceBounds[1]) {
    //p.blendMode(p.BLEND);
    p.noStroke();
    for (let j = 0; j < evaluatedPixels.length; j++) {
      for (let i = 0; i < channels.length; i++) {
        if (channels[i]) {
          let mappedDistance = Math.floor(
            p.map(
              evaluatedPixels[j][2],
              distanceBounds[0],
              distanceBounds[1],
              0,
              255
            )
          );
          let pixel = [
            evaluatedPixels[j][0],
            evaluatedPixels[j][1],
            mappedDistance,
            0,
            0,
            255,
          ] as Pixel;

          p.fill(p.color(colorParams.colorF(pixel, i + 2, colorParams.inputColor)));

          shapeF(
            p,
            outputGridUnitX,
            outputGridUnitY,
            metaballRasterSizeX, //*buffer.rasterSizeX,
            metaballRasterSizeY, //*buffer.rasterSizeY,
            pixel,
            i + 2,
            transformParams
          );
        }
      }
    }
  }
}
