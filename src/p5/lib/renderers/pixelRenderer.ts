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
    channels = [true, true, true, false],
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
    for (let i = 0; i < channels.length; i++) {
      if (channels[i]) {
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
  });
}
