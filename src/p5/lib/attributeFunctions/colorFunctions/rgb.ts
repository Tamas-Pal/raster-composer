import { ColorParams } from '../../../types';

export default function rgb(colorParams: ColorParams) {
  const { pixel = [0, 0, 255, 0, 0, 255] } = colorParams;

  return `rgb(${pixel[2]}, ${pixel[3]}, ${pixel[4]})`;
}
