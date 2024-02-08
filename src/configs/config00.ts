import rasterDots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import dots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import pixelRects from '../lib/attributeFunctions/shapeFunctions/pixelRects';
import dotRenderer from '../lib/renderers/dotRenderer';
import matrixSampler from '../lib/samplers/matrixSampler';
import { Config, Operations } from '../types';
import hsl_Shift180_inverted_40 from '../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import translateRandom from '../lib/attributeFunctions/transformFunctions/translateRandom';
import rgb from '../lib/attributeFunctions/colorFunctions/rgb';

export let config: Config = {
  outputMultiplier: 1.5,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export let operations: Operations = [
  {
    sampler: matrixSampler,
    samplerConfig: {
      inputGridUnitX: 4,
      inputGridUnitY: 4,
      rasterSize: 4,
      sampleRange: 0,
      stepFX: undefined,
      stepFY: undefined,
    },
    renderer: dotRenderer,
    rendererConfig: {
      colorF: hsl_Shift180_inverted_40,
      shapeF: rasterDots,
      transformF: translateRandom,
      patternColorF: undefined,
      patternF: undefined,
      patternResolution: 8,
      channels: [true, true, true, false],
    },
  },
  {
    sampler: matrixSampler,
    samplerConfig: {
      inputGridUnitX: 4,
      inputGridUnitY: 4,
      rasterSize: 16,
      sampleRange: 0,
      stepFX: undefined,
      stepFY: undefined,
    },
    renderer: dotRenderer,
    rendererConfig: {
      colorF: rgb,
      shapeF: pixelRects,
      transformF: undefined,
      patternColorF: undefined,
      patternF: undefined,
      patternResolution: 8,
      channels: [true, false, false, false],
    },
  },
];
