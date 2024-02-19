import p5 from 'p5';
import { Config, Operation, Preset } from './types.js';
import matrixSampler from './lib/sampler/matrixSampler.js';

export default function composer(
  p: p5,
  config: Config,
  preset: Preset,
  pixelArrays: number[][]
) {
  p.background(preset.backgroundColor);

  preset.operations.map((operation: Operation) => {
    const pixels = pixelArrays[operation.samplerConfig.imageIndex];
    const buffer = matrixSampler(
      config.resolutionX,
      config.resolutionY,
      pixels,
      operation.samplerConfig
    );

    operation.renderer(
      p,
      config.outputGridUnitX,
      config.outputGridUnitY,
      buffer,
      operation.rendererConfig
    );
  });
}
