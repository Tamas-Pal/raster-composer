import { ColorParams } from '../../../types';

export default function rgb(colorParams: ColorParams) {
  const { pixel } = colorParams;

  return `rgb(${pixel![2]}, ${pixel![3]}, ${pixel![4]})`;
}
