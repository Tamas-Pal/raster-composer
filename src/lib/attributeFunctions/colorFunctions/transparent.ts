import { Pixel } from '../../../types';

export default function transparent(
  pixel: Pixel,
  pixelIndex = 0
) {
  return `rgba(255, 255, 255, 0)`;
}
