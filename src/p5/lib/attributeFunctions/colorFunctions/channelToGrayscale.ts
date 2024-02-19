import { ColorParams } from '../../../types';

export default function channelToGrayscale(colorParams: ColorParams) {
  const { pixel = [0, 0, 255, 0, 0, 255], pixelIndex = 2 } = colorParams;
  return `rgb(${pixel[pixelIndex]}, ${pixel[pixelIndex]}, ${pixel[pixelIndex]})`;
}
