import { BufferColor } from '../../../types';

export default function lessOpaqueThan(
  outputColor: BufferColor,
  threshold: number[] = [127]
) {
  return outputColor[3] < threshold[0];
}
