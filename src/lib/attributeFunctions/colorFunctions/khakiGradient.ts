import { Pixel } from '../../../types';

export default function khakiGradient(pixel: Pixel, pixelIndex = 0) {
  return `hsl(${Math.floor((pixel[2] / 255) * 40 + 20)}, ${Math.floor(
    (Math.cos((pixel[0] + pixel[1]) / 512) + 1) * 8
  )}%, 40%)`;
}
