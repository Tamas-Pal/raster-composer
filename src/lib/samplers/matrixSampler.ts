import { SamplerConfig, BufferColor, Pixels } from '../../types';

export default function matrixSampler(
  resolutionX: number,
  resolutionY: number,
  pixels: number[],
  {
    rasterSizeX,
    rasterSizeY,
    sampleRadius,  
    stepFX = (resolutionX, rasterSizeX) => rasterSizeX,
    stepFY = (resolutionY, rasterSizeY) => rasterSizeY,
    conditionF = () => true,
    threshold,
    samplerF,
    samplerFParams = [1]
  }: SamplerConfig
) {
  
  let buffer = {
    resolutionY: resolutionX,
    resolutionX: resolutionY,
    rasterSizeX: rasterSizeX,
    rasterSizeY: rasterSizeY,
    pixels: [] as Pixels,
  };

  for (
    let y = 0;
    y < resolutionY;
    y += stepFY(resolutionY, rasterSizeY)
  ) {
    for (
      let x = 0;
      x < resolutionX;
      x += stepFX(resolutionX, rasterSizeX)
    ) {
      // define matrix for given radius to find average intensity for each color channel
      let matrixSize = sampleRadius * 2 + 1;
      let outputColor = [0, 0, 0, 0] as BufferColor;
      for (
        let matrixX = 0 - sampleRadius;
        matrixX < matrixSize - sampleRadius;
        matrixX++
      ) {
        for (
          let matrixY = 0 - sampleRadius;
          matrixY < matrixSize - sampleRadius;
          matrixY++
        ) {

          // if pixel is not on image edge
          if (
            x + matrixX >= 0 &&
            y + matrixY >= 0 &&
            x + matrixX < resolutionX &&
            y + matrixY < resolutionY
          ) {

            // find pixel's RGBA in pixels array for each matrix point
            let index = samplerF(resolutionX, resolutionY, x, y, samplerFParams);
            let pixel = pixels.slice(index, index + 4);
            // add intensity to existing
            outputColor = outputColor.map(
              (channel, index) => channel + pixel[index]
            ) as BufferColor;

            // if pixel is on image edge return full intensity
            // and no alpha
          } else {
            outputColor = outputColor.map((channel, index) =>
              index < 3 ? channel + 1 : channel
            ) as BufferColor;
          }
        }
      }

      // divide the channel color with matrix size
      outputColor = outputColor.map(
        (channel) => channel / (matrixSize * matrixSize)
      ) as BufferColor;
      if (conditionF(outputColor, threshold)) {
        buffer.pixels.push([x, y, ...outputColor]);
      }
    }
  }

  return buffer;
}
