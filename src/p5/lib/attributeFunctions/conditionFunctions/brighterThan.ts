import { BufferColor } from '../../../types';

export default function brighterThan(
  outputColor: BufferColor,
  threshold: number[] = [127]
) {
  //console.log((outputColor[0] + outputColor[1] + outputColor[2]) / 3);

  return (outputColor[0] + outputColor[1] + outputColor[2]) / 3 > threshold[0];
}