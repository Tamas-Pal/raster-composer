import { SamplerConfig, BufferColor, Pixels } from '../../types';

export default function matrixSampler(
  resolutionX: number,
  resolutionY: number,
  pixels: number[],
  {
    inputGridUnitX,
    inputGridUnitY,
    rasterSize,
    sampleRange,
    stepFX = undefined,
    stepFY = undefined,
  }: SamplerConfig
) {
  if (stepFX === undefined) {
    stepFX = (resolutionX, inputGridUnitX, rasterSize) => rasterSize;
  }
  if (stepFY === undefined) {
    stepFY = (resolutionY, inputGridUnitY, rasterSize) => rasterSize;
  }
  let buffer = {
    resolutionY: resolutionX,
    resolutionX: resolutionY,
    inputGridUnitX: inputGridUnitX,
    inputGridUnitY: inputGridUnitY,
    rasterSize: rasterSize,
    pixels: [] as Pixels,
  };

  for (
    let y = 0;
    y < resolutionY;
    y += stepFY(resolutionY, inputGridUnitY, rasterSize)
  ) {
    for (
      let x = 0;
      x < resolutionX;
      x += stepFX(resolutionX, inputGridUnitX, rasterSize)
    ) {
      //console.log(x, y);

      let matrixSize = sampleRange * 2 + 1;
      let outputCol = [0, 0, 0, 0] as BufferColor;
      for (
        let matrixX = 0 - sampleRange;
        matrixX < matrixSize - sampleRange;
        matrixX++
      ) {
        for (
          let matrixY = 0 - sampleRange;
          matrixY < matrixSize - sampleRange;
          matrixY++
        ) {
          // if not image edge
          if (
            x + matrixX >= 0 &&
            y + matrixY >= 0 &&
            x + matrixX < resolutionX &&
            y + matrixY < resolutionY
          ) {
            //let index = (x + resolutionX * 4 * y * rasterSize) * 4 * rasterSize;
            let index = (x * 2 + y * resolutionX * 4) * 4;
            let pixel = pixels.slice(index, index + 4);
            outputCol = outputCol.map(
              (channel, index) => channel + pixel[index]
            ) as BufferColor;
            // if image edge go with full intensity
            // and no alpha
          } else {
            outputCol = outputCol.map((channel, index) =>
              index < 3 ? channel + 1 : channel
            ) as BufferColor;
          }
        }
      }
      outputCol = outputCol.map(
        (channel) => channel / (matrixSize * matrixSize)
      ) as BufferColor;
      buffer.pixels.push([x, y, ...outputCol]);
    }
  }
  // console.log('matrixSampler', buffer);

  return buffer;
}
