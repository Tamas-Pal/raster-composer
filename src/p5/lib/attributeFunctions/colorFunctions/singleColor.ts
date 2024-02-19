import { ColorParams } from '../../../types';

export default function singleColor(
  colorParams: ColorParams
) {
  const {inputColor = [255,0,0,255]} = colorParams;
  return `rgba(${inputColor[0]}, ${inputColor[1]}, ${inputColor[2]}, ${inputColor[3]})`;
}
