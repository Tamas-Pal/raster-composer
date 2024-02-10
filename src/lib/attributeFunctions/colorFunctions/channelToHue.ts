import { Pixel } from '../../../types';

export default function channelToHue(pixel: Pixel, pixelIndex = 0) {
  return `hsl(${Math.floor(pixel[pixelIndex] / 255 * 360)}, 100%, 50%)`;
}
