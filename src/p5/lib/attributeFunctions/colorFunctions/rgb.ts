import { ColorParams } from '../../../types';

export default function rgb(colorParams: ColorParams) {
  const { pixel = [0, 0, 255, 0, 0, 255], pixelIndex = 0 } = colorParams;
  return `rgb(${pixel[pixelIndex]}, ${pixel[pixelIndex + 1]}, ${
    pixel[pixelIndex + 2]
  })`;
}
