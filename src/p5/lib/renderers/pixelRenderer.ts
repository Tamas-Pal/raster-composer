import p5 from 'p5';
import { Buffer, RendererConfig } from '../../types';

export default function pixelRenderer(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  buffer: Buffer,
  {
    blendMode = 'normal',
    colorConfig,
    shapeF,
    transformConfig = undefined,
    passes = [true, true, true, false],
    patternConfig = undefined,
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
  p.noStroke();
  buffer.pixels.map((pixel) => {
    if (pixel) {
      for (let i = 0; i < passes.length; i++) {
        if (passes[i]) {
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
            metaballRasterSizeXY: undefined,
            neighbors: undefined
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
  });
}
