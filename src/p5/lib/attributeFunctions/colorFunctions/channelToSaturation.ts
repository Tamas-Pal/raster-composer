import { ColorParams } from '../../../types';

export default function channelToSaturation(colorParams: ColorParams) {
  const { pixel, pixelIndex = 2, inputColor = [255, 0, 0, 255] } = colorParams;
  const r = inputColor[0] / 255;
  const g = inputColor[1] / 255;
  const b = inputColor[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0; // achromatic
  } else {
    const d = max - min;
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h ? (h /= 6) : (h = 0);
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(
    pixel![pixelIndex] * 100
  )}%, ${l * 50}%)`;
}
