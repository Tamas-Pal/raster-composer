import { Pixel } from '../../../types';

export default function rgb(
  pixel: Pixel,
  pixelIndex = 0
) {
  return `rgb(${pixel[pixelIndex]}, ${pixel[pixelIndex+1]}, ${pixel[pixelIndex+2]})`;
}
