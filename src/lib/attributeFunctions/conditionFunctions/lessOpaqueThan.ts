import { BufferColor } from '../../../types';

export default function lessOpaqueThan(
  outputColor: BufferColor,
  threshold: number
) {
  return outputColor[3] < threshold;
}
