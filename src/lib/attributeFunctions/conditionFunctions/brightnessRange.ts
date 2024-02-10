import { BufferColor } from '../../../types';

export default function brightnessRange(
  outputColor: BufferColor,
  threshold: number[] = [0, 255]
) {
    let brightness = (outputColor[0] + outputColor[1] + outputColor[2]) / 3
  return brightness > threshold[0] && brightness < threshold[1];
}
