import p5 from 'p5';
import { PatternParams } from '../../../types';

export default function crossPattern(p: p5, patternParams: PatternParams) {
  const {
    outputGridUnitX,
    outputGridUnitY,
    rasterSizeX,
    rasterSizeY,
    pixel,
    channelIndex,
    patternResolutionXY = [1, 1],
    patternColor: { patternColorF, inputColor },
  } = patternParams;
  const x1 = pixel![0] - (outputGridUnitX * rasterSizeX) / 2;
  const y1 = pixel![1] - (outputGridUnitY * rasterSizeY) / 2;
  const x2 = pixel![0] + (outputGridUnitX * rasterSizeX) / 2;
  const y2 = pixel![1] + (outputGridUnitY * rasterSizeY) / 2;
  p.blendMode(p.BLEND);
  p.stroke(
    p.color(patternColorF({ pixel, pixelIndex: channelIndex, inputColor }))
    );
    p.strokeWeight(
      ((outputGridUnitX * rasterSizeX) / patternResolutionXY[0])
    );
  p.line(x1, y1, x2, y2);
  p.strokeWeight(
    ((outputGridUnitX * rasterSizeX) / patternResolutionXY[1])
  );
  p.line(x1, y2, x2, y1);
}
