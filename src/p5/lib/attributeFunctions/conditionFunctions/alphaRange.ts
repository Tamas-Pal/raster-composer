import { BufferColor } from '../../../types';

export default function alphaRange(
  outputColor: BufferColor,
  threshold: number[] = [0, 255]
) {
  return outputColor[3] >= threshold[0] && outputColor[3] <= threshold[1];
}
