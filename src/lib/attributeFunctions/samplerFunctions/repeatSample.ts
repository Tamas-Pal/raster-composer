export default function repeatSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number,
  samplerFParams = [1, 1]
) {
  let simpleSample =
    (x * 2 * samplerFParams[0] + y * resolutionX * 4 * samplerFParams[1]) * 4;
  return simpleSample % (resolutionX * resolutionY * 16);
}
