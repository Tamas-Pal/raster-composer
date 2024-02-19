import { BufferColor } from '../../../types';

export default function blueRange(
  outputColor: BufferColor,
  threshold: number[] = [0, 255]
) {
  return outputColor[2] > threshold[0] && outputColor[2] < threshold[1];
}
