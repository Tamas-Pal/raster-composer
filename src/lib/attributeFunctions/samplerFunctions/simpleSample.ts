import { config } from '../../../configs/config00';

export default function simpleSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number
) {
  return x * 4 + y * resolutionX * 4;
}
