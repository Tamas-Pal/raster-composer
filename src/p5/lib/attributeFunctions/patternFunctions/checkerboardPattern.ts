import p5 from 'p5';
import { ColorFunction, Pixel } from '../../../types';

export default function checkerboardPattern(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  rasterSizeX: number,
  rasterSizeY: number,
  pixel: Pixel,
  channelIndex: number,
  patternResolutionXY = [1, 1],
  patternColor: {
    patternColorF: ColorFunction;
    inputColor: number[] | undefined;
  }
) {
  p.blendMode(p.BLEND);
  p.noStroke();
  for (let y = 0; y < patternResolutionXY[1]; y++) {
    for (let x = 0; x < patternResolutionXY[0]; x++) {
      const xPos =
        (pixel[0] -
          rasterSizeX / 2 +
          (x / patternResolutionXY[0]) * rasterSizeX) *
        outputGridUnitX;
      const yPos =
        (pixel[1] -
          rasterSizeY / 2 +
          (y / patternResolutionXY[1]) * rasterSizeY) *
        outputGridUnitY;

      if ((x + y) % 2 === 0) {
        p.fill(
          p.color(
            patternColor.patternColorF({
              pixel,
              pixelIndex: channelIndex,
              inputColor: patternColor.inputColor,
            })
          )
        );
        p.rect(
          xPos,
          yPos,
          (outputGridUnitX * rasterSizeX) / patternResolutionXY[0],
          (outputGridUnitY * rasterSizeY) / patternResolutionXY[1]
        );
      }
    }
  }
}
