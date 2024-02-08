import { Pixel } from '../../../types';

export default function hsl_Shift180_inverted_40(
  pixel: Pixel,
  pixelIndex = 0
) {
  return `hsl(${((pixelIndex - 2) * 120 + 180) % 360}, ${
    (1 - pixel[pixelIndex + 2] / 255) * 100
  }%, 40%)`;
}
