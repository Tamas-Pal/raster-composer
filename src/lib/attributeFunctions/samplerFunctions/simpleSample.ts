export default function simpleSample(
  resolutionX: number,
  resolutionY: number,
  x: number,
  y: number
) {
  return (x * 2 + y * resolutionX * 4) * 4;
}
