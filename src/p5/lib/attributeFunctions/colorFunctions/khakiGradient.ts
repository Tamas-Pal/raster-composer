import { ColorParams } from '../../../types';

export default function khakiGradient(colorParams: ColorParams) {
  const {pixel = [0, 0, 255, 0, 0, 255]} = colorParams
  return `hsl(${Math.floor((pixel[2] / 255) * 40 + 20)}, ${Math.floor(
    (Math.cos((pixel[0] + pixel[1]) / 512) + 1) * 8
  )}%, 40%)`;
}
