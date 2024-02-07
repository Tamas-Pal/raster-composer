export default function dotRenderer(outputGridUnitX, outputGridUnitY, channel, colorNorm, alphaNorm) {
    blendMode(MULTIPLY);
    noStroke();
    if (colorNorm < 0.9 && alphaNorm >= 0.1) {
      fill(
        color(
          `hsl(${(channel * 120 + 180) % 360}, ${
            (1 - colorNorm) * 100
          }%, 40%)`
        )
      );
      circle(
        x * outputGridUnitX +
          random(-outputGridUnitX / 2, outputGridUnitX / 2),
        y * outputGridUnitY +
          random(-outputGridUnitY / 2, outputGridUnitY / 2),
        outputGridUnitX * (1 - colorNorm)
      );
    }
  }