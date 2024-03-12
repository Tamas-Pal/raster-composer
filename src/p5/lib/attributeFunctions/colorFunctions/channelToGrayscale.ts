import { ColorParams } from '../../../types';

export default function channelToGrayscale(colorParams: ColorParams) {
  const { pixel, pixelIndex = 2 } = colorParams;
  return `rgb(${pixel![pixelIndex]}, ${pixel![pixelIndex]}, ${
    pixel![pixelIndex]
  })`;
}
