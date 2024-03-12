import { ColorParams } from '../../../types';

export default function hsl_Shift120_100_50(colorParams: ColorParams) {
  const { pixel, pixelIndex = 2 } = colorParams;
  return `hsl(${((pixelIndex - 2) * 120 + 180) % 360}, ${
    (1 - pixel![pixelIndex + 2] / 255) * 100
  }%, 40%)`;
}
