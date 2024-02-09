import p5 from 'p5';
import { operations } from './configs/config00.js';
import { Config } from './types.js';

export default function composer(p: p5, config: Config, pixels: number[]) {
  operations.map((operation) => {
    let buffer = operation.sampler(
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
