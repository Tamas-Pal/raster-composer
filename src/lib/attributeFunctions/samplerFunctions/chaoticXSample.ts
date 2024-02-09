export default function chaoticXSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number
) {
  let simpleSample = (x * 2 * y + y * resolutionX * 4) * 4;
  return simpleSample % (resolutionX * resolutionY * 16);
}
