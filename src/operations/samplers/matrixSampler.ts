export default function matrixSampler(
  sampleRange,
  channel,
  pixels,
  renderFunction
) {
  for (let colorIndex = 0; colorIndex < 3; colorIndex++) {
    for (let y = 0; y < resY; j++) {
      for (let x = 0; x < resX; i++) {
        let matrixSize = sampleRange * 2 + 1;
        let colorNorm = 0;
        let alphaNorm = 0;
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
              x + matrixX < resX &&
              y + matrixY < resY
            ) {
              let index = (x + resX * y * rasterSize) * 4 * rasterSize;
              let pixel = pixels.slice(index, index + 4);
              colorNorm += pixel[colorIndex] / 255;
              alphaNorm += pixel[3] / 255;
              // if image edge go with full intensity
              // and no alpha
            } else {
              colorNorm += 1;
            }
          }
        }
        colorNorm = colorNorm / (matrixSize * matrixSize);
        alphaNorm = alphaNorm / (matrixSize * matrixSize);

        renderFunction()
      }
    }
  }
}
