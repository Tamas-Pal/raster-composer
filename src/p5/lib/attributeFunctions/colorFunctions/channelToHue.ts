import { ColorParams } from '../../../types';

export default function channelToHue(colorParams: ColorParams) {
  const { pixel, pixelIndex = 2 } = colorParams;
  return `hsl(${Math.floor((pixel![pixelIndex] / 255) * 360)}, 100%, 50%)`;
}
