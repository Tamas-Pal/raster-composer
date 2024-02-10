export default function chaoticYSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number
) {
  let simpleSample = x * 4 + y * resolutionX * 2 * -x;
  return simpleSample % (resolutionX * resolutionY * 4);
}
