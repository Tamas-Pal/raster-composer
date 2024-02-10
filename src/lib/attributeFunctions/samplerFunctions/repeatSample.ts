export default function repeatSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number,
  samplerFParams = [1, 1]
) {
  let simpleSample =
    x * 4 * samplerFParams[0] + y * resolutionX * 4 * samplerFParams[1];
  return simpleSample % (resolutionX * resolutionY * 4);
}
