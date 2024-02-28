import { ColorParams } from '../../../types';

export default function rgba(colorParams: ColorParams) {
  const { pixel = [0, 0, 255, 0, 0, 255] } = colorParams;
  return `rgba(${pixel[2]}, ${pixel[3]}, ${pixel[4]}, ${pixel[5]})`;
}
