import p5 from 'p5';
import { Buffer, Pixel, RendererConfig } from '../../types';

export default function metaballRenderer(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  {
    blendMode = 'normal',
    colorConfig,
    shapeF,
    transformConfig = undefined,
    channels = [true, false, false, false],
    patternConfig = undefined,
    metaballConfig = {
      metaballRasterSizeXY: [4, 4],
      evaluationDistanceRatio: 0.5,
    },
  }: RendererConfig
) {
  let blendModeParam;
  switch (blendMode.toLowerCase()) {
    case 'multiply':
      blendModeParam = p.MULTIPLY;
      break;
    case 'normal':
      blendModeParam = p.BLEND;
      break;
    case 'difference':
      blendModeParam = p.DIFFERENCE;
      break;
    case 'screen':
      blendModeParam = p.SCREEN;
      break;
    default:
      blendModeParam = p.BLEND;
  }
  p.blendMode(blendModeParam);
  //p.strokeWeight(4);
  const metaballRasterSizeX =
    metaballConfig.metaballRasterSizeXY[0] * outputGridUnitX;
  const metaballRasterSizeY =
    metaballConfig.metaballRasterSizeXY[1] * outputGridUnitY;
  const distanceBounds: [number | undefined, number | undefined] = [
    undefined,
    undefined,
  ];
  const evaluatedPixels: [number, number, number][] = [];
  for (let y = 0; y < buffer.resolutionY; y += metaballRasterSizeY) {
    for (let x = 0; x < buffer.resolutionX; x += metaballRasterSizeX) {
      const maxDistance = p.dist(0, 0, buffer.resolutionX, buffer.resolutionY);
      const evaluationDistance =
        maxDistance * (metaballConfig.evaluationDistanceRatio / 10);
      let evaluationCount = 0;
      let distanceSum = 0;
      for (let i = 0; i < buffer.pixels.length; i++) {
        const distance = p.dist(buffer.pixels[i][0], buffer.pixels[i][1], x, y);
        if (distance < evaluationDistance) {
          evaluationCount += 1;
          distanceSum += distance;
        }
      }

      if (evaluationCount > 0) {
        const distanceAvg = distanceSum / evaluationCount;
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
          const mappedDistance = Math.floor(
            p.map(
              evaluatedPixels[j][2],
              distanceBounds[0],
              distanceBounds[1],
              0,
              255
            )
          );
          const pixel = [
            evaluatedPixels[j][0],
            evaluatedPixels[j][1],
            mappedDistance,
            0,
            0,
            255,
          ] as Pixel;

          p.fill(
            p.color(
              colorConfig.colorF({
                pixel: pixel,
                pixelIndex: i + 2,
                inputColor: colorConfig.inputColor,
              })
            )
          );

          shapeF(p, {
            outputGridUnitX: outputGridUnitX,
            outputGridUnitY: outputGridUnitX,
            rasterSizeX: buffer.rasterSizeX,
            rasterSizeY: buffer.rasterSizeY,
            pixel: pixel,
            pixelIndex: i + 2,
            transformConfig: transformConfig,
            metaballRasterSizeXY: [metaballRasterSizeX, metaballRasterSizeY],
          });

          if (patternConfig) {
            patternConfig.patternF(p, {
              outputGridUnitX: outputGridUnitX,
              outputGridUnitY: outputGridUnitY,
              rasterSizeX: buffer.rasterSizeX,
              rasterSizeY: buffer.rasterSizeY,
              pixel: pixel,
              channelIndex: i + 2,
              patternResolutionXY: patternConfig.patternResolutionXY,
              patternColor: patternConfig.patternColor,
            });
          }
        }
      }
    }
  }
}
