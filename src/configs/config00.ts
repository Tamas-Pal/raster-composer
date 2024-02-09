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
import { operation_chaoticPixels } from './operations/operation_chaoticPixels';
import noisePattern from '../lib/attributeFunctions/patternFunctions/noisePattern';
import hsl_Shift120_100_50 from '../lib/attributeFunctions/colorFunctions/hsl_Shift120_100_50';
import transparent from '../lib/attributeFunctions/colorFunctions/transparent';
import checkerboardPattern from '../lib/attributeFunctions/patternFunctions/checkerboardPattern';

export let config: Config = {
  image: 'images/assets/' + '001.png',
  backgroundColor: [191, 0, 63],
  outputMultiplier: 2,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export let operations: Operations = [
  operation_noisyDots,

  //operation_chaoticPixels,
  /*
  {
    sampler: matrixSampler,
    samplerConfig: {
      rasterSizeX: 2,
      rasterSizeY: 2,
      sampleRadius: 0,
      stepFX: undefined,
      stepFY: undefined,
      conditionF: darkerThan,
      threshold: 47,
      samplerF: repeatSample,
      samplerFParams: [2, 2],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorF: rgb,
      shapeF: pixelRects,
      transformF: undefined,
      channels: [true, false, false, false],
      patternParams: undefined
    },
  },
  */
  {
    sampler: matrixSampler,
    samplerConfig: {
      rasterSizeX: 64,
      rasterSizeY: 64,
      sampleRadius: 0,
      stepFX: undefined,
      stepFY: undefined,
      conditionF: brighterThan,
      threshold: 127,
      samplerF: simpleSample,
      samplerFParams: [],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorF: justRed,
      shapeF: pixelRects,
      transformParams: undefined,
      /*
      {
        transformF: translateRandom,
        transformScaleXY: [32, 8],
      },
      */
      channels: [true, false, false, false],
      patternParams: {
        patternF: noisePattern,
        patternResolutionXY: [8, 8],
        patternColorF: hsl_Shift180_inverted_40,
      },
    },
  },
  //operation_whiteReplace,
];
