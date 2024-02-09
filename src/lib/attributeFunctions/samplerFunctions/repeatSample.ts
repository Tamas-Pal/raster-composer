export default function repeatSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number,
            
) {
  let simpleSample = (x * 2 * 2 + y * resolutionX * 4) * 4;
  return simpleSample % (resolutionX * resolutionY * 16);
}
