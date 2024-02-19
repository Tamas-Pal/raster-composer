import { ColorParams } from '../../../types';

export default function hsl_Shift180_inverted_40(colorParams: ColorParams) {
  const { pixel = [0, 0, 255, 0, 0, 255], pixelIndex = 2 } = colorParams;
  return `hsl(${((pixelIndex - 2) * 120 + 180) % 360}, ${
    (1 - pixel[pixelIndex + 2] / 255) * 100
  }%, 40%)`;
}
