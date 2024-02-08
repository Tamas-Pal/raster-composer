import p5 from 'p5';
import { ColorFunction, Pixel } from '../../../types';

export default function noisePattern(
  p: p5,
  outputGridUnitX: number,
  outputGridUnitY: number,
  pixel: Pixel,
  patternResolution: number,
  channelIndex: number,
  patternColorF: ColorFunction
) {
  for (let y = 0; y < patternResolution; y++) {
    for (let x = 0; x < patternResolution; x++) {
      let xPos = (pixel[0] + x / patternResolution) * outputGridUnitX;
      let yPos = (pixel[1] + y / patternResolution) * outputGridUnitY;
      p.noiseDetail(12, 0.5);
      let noiseVal = p.noise((xPos / p.width) * 20.1, (yPos / p.height) * 20.1);
      if (noiseVal > 0.5) {
        p.fill(p.color(patternColorF(pixel, channelIndex)));
        p.rect(
          xPos,
          yPos,
          outputGridUnitX / patternResolution,
          outputGridUnitY / patternResolution
        );
      }
    }
  }
}
