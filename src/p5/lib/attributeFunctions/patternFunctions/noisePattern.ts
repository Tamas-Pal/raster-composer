import p5 from 'p5';
import { PatternParams } from '../../../types';

export default function noisePattern(
  p: p5,
  patternParams: PatternParams
) {
  const {outputGridUnitX,
    outputGridUnitY,
    rasterSizeX,
    rasterSizeY,
    pixel,
    channelIndex,
    patternResolutionXY = [1, 1],
    patternColor: {
      patternColorF,
      inputColor,
    }} = patternParams
  p.blendMode(p.BLEND);
  p.noStroke();
  for (let y = 0; y < patternResolutionXY[1]; y++) {
    for (let x = 0; x < patternResolutionXY[0]; x++) {
      const xPos =
        (pixel![0] -
          rasterSizeX / 2 +
          (x / patternResolutionXY[0]) * rasterSizeX) *
        outputGridUnitX;
      const yPos =
        (pixel![1] -
          rasterSizeY / 2 +
          (y / patternResolutionXY[1]) * rasterSizeY) *
        outputGridUnitY;
      p.noiseDetail(12, 0.5);
      const noiseVal = p.noise(
        (xPos / p.width) * 20.1,
        (yPos / p.height) * 20.1
      );
      if (noiseVal > 0.5) {
        p.fill(
          p.color(
            patternColorF({
              pixel,
              pixelIndex: channelIndex,
              inputColor: inputColor,
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
