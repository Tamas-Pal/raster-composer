import { Pixel } from '../../../types';

export default function channelToGrayscale(pixel: Pixel, pixelIndex = 0) {
  return `rgb(${pixel[pixelIndex]}, ${pixel[pixelIndex]}, ${pixel[pixelIndex]})`;
}
