import rasterDots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import dots from '../lib/attributeFunctions/shapeFunctions/rasterDots';
import pixelRects from '../lib/attributeFunctions/shapeFunctions/pixelRects';
import dotRenderer from '../lib/renderers/dotRenderer';
import matrixSampler from '../lib/samplers/matrixSampler';
import { Config, Operations } from '../types';
import hsl_Shift180_inverted_40 from '../lib/attributeFunctions/colorFunctions/hsl_Shift180_inverted_40';
import translateRandom from '../lib/attributeFunctions/transformFunctions/translateRandom';
import rgb from '../lib/attributeFunctions/colorFunctions/rgb';
import pixelRenderer from '../lib/renderers/pixelRenderer';
import brighterThan from '../lib/attributeFunctions/conditionFunctions/brighterThan';
import darkerThan from '../lib/attributeFunctions/conditionFunctions/darkerThan';
import simpleSample from '../lib/attributeFunctions/samplerFunctions/simpleSample';
import { operation_noisyDots } from './operations/operation_noisyDots';
import lessOpaqueThan from '../lib/attributeFunctions/conditionFunctions/lessOpaqueThan';
import justRed from '../lib/attributeFunctions/colorFunctions/justRed';
import repeatSample from '../lib/attributeFunctions/samplerFunctions/repeatSample';
import { operation_whiteReplace } from './operations/operation_whiteReplace';

export let config: Config = {
  image: 'images/assets/' + '00.png',
  outputMultiplier: 1.5,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export let operations: Operations = [
  //operation_noisyDots,
  {
    sampler: matrixSampler,
    samplerConfig: {
      rasterSizeX: 8,
      rasterSizeY: 1,
      sampleRadius: 0,
      stepFX: undefined,
      stepFY: undefined,
      conditionF: darkerThan,
      threshold: 32,
      samplerF: repeatSample,
    },
    renderer: pixelRenderer,
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
  //operation_whiteReplace,
];
