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
import { operation_chaoticXPixels } from './operations/operation_chaoticXPixels';
import noisePattern from '../lib/attributeFunctions/patternFunctions/noisePattern';
import hsl_Shift120_100_50 from '../lib/attributeFunctions/colorFunctions/hsl_Shift120_100_50';
import transparent from '../lib/attributeFunctions/colorFunctions/transparent';
import checkerboardPattern from '../lib/attributeFunctions/patternFunctions/checkerboardPattern';
import { operation_chaoticYPixels } from './operations/operation_chaoticYPixels';
import metaballRenderer from '../lib/renderers/metaballRenderer';
import metaballParticles from '../lib/attributeFunctions/shapeFunctions/metaballParticles';
import channelToGrayscale from '../lib/attributeFunctions/colorFunctions/channelToGrayscale';
import channelToHue from '../lib/attributeFunctions/colorFunctions/channelToHue';
import chaoticXSample from '../lib/attributeFunctions/samplerFunctions/chaoticXSample';
import chaoticYSample from '../lib/attributeFunctions/samplerFunctions/chaoticYSample';
import brightnessRange from '../lib/attributeFunctions/conditionFunctions/brightnessRange';
import justWhite from '../lib/attributeFunctions/colorFunctions/justWhite';
import justBlack from '../lib/attributeFunctions/colorFunctions/justBlack';
import justBlue from '../lib/attributeFunctions/colorFunctions/justBlue';

export let config: Config = {
  images: [
    'images/assets/' + '12.png',
    'images/assets/' + 'turkmenistan-dog-holiday-statue-alabai-alabay-president-740x491.png',
  ],
  //backgroundColor: [127, 63, 63],
  backgroundColor: [0, 0, 255],
  outputMultiplier: 2,
  resolutionX: 0,
  resolutionY: 0,
  outputGridUnitX: 0,
  outputGridUnitY: 0,
};

export let operations: Operations = [
  //operation_chaoticYPixels,

  //operation_chaoticXPixels,

  /*
  {
    sampler: matrixSampler,
    samplerConfig: {
      rasterSizeX: 64,
      rasterSizeY: 64,
      sampleRadius: 0,
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
      
     // {
     //   transformF: translateRandom,
     //   transformScaleXY: [32, 8],
     // },
      
      channels: [true, false, false, false],
      patternParams: {
        patternF: noisePattern,
        patternResolutionXY: [8, 8],
        patternColorF: hsl_Shift180_inverted_40,
      },
    },
  },*/

  //operation_whiteReplace,
  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 1,
      rasterSizeX: 16,
      rasterSizeY: 16,
      sampleRadius: 0,
      conditionF: darkerThan,
      threshold: [31],
      samplerF: simpleSample,
      samplerFParams: [],
    },
    renderer: metaballRenderer,
    rendererConfig: {
      colorF: justWhite,
      shapeF: metaballParticles,
      transformParams: undefined,
      channels: [true, false, false, false],
      patternParams: undefined,
      metaballParams: {
        metaballRasterSizeXY: [16, 2],
        evaluationDistanceRatio: 0.6,
      },
    },
  },
  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 0,
      rasterSizeX: 16,
      rasterSizeY: 16,
      sampleRadius: 0,
      conditionF: darkerThan,
      threshold: [111],
      samplerF: simpleSample,
      samplerFParams: [],
    },
    renderer: metaballRenderer,
    rendererConfig: {
      colorF: justRed,
      shapeF: metaballParticles,
      transformParams: undefined,
      channels: [true, false, false, false],
      patternParams: undefined,
      metaballParams: {
        metaballRasterSizeXY: [16, 16],
        evaluationDistanceRatio: 0.1,
      },
    },
  },
  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 1,
      rasterSizeX: 96,
      rasterSizeY: 16,
      sampleRadius: 0,
      conditionF: brightnessRange,
      threshold: [47, 144],
      samplerF: repeatSample,
      samplerFParams: [1, 1],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorF: justBlue,
      shapeF: pixelRects,
      transformParams: undefined,
      channels: [true, false, false, false],
      patternParams: {
        patternF: noisePattern,
        patternResolutionXY: [2, 2],
        patternColorF: justWhite,
      },
      metaballParams: undefined,
    },
  },
  {
    sampler: matrixSampler,
    samplerConfig: {
      imageIndex: 1,
      rasterSizeY: 16,
      rasterSizeX: 16,
      sampleRadius: 0,
      conditionF: brightnessRange,
      threshold: [0, 96],
      samplerF: repeatSample,
      samplerFParams: [1, 1],
    },
    renderer: pixelRenderer,
    rendererConfig: {
      colorF: justRed,
      shapeF: dots,
      transformParams: undefined,
      channels: [true, false, false, false],
      patternParams: undefined,
      metaballParams: undefined,
    },
  },

  //operation_noisyDots,
];
