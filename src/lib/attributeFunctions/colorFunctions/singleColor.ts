import { Pixel } from '../../../types';

export default function singleColor(pixel: Pixel, pixelIndex = 0, inputColor = [255, 0, 0, 255]) {
  return `rgba(${inputColor[0]}, ${inputColor[1]}, ${inputColor[2]}, ${inputColor[3]})`;
}
